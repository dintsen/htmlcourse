#!/usr/bin/env node
// QA harness: render a running site in real Chromium and capture what a visitor actually sees.
//
//   node _tools/shoot.mjs --url http://127.0.0.1:5101 --out concepts/01-x/_qa/r1 \
//        [--viewports desktop,mobile,tablet,laptop,xl,small] [--steps 12] [--wait 3500] [--step 0.85]
//        [--timeline 0,300,700,1200,2000,3500] [--script concepts/01-x/_qa/states.mjs] [--reduced] [--only desktop]
//
// Per viewport -> <out>/<vp>/ : t-<ms>.jpg (intro timeline), s-00.. (scroll journey), state-*.jpg (from --script),
// contact.jpg (everything tiled) and a single report.json at <out>/report.json.
// Scrolls with real wheel events (works with Lenis / GSAP / virtual scroll). Stops when pixels stop changing.
//
// --script <file.mjs>:  export default async function (page, { shot, vp, wait, sleep }) { ... await shot('hover-cta') }
//   Called once per viewport after the scroll journey (page is scrolled back to top first).
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { launch, withSlot, parseArgs, ensureDir, writeJSON, VIEWPORTS, DESKTOP_UA, MOBILE_UA } from './lib/common.mjs';

const args = parseArgs(process.argv.slice(2));
const url = args.url || args._[0];
const outArg = args.out || args._[1];
if (!url || !outArg) { console.error('usage: shoot.mjs --url <url> --out <dir> [--viewports a,b] [--steps N] [--wait ms] [--timeline 0,300,..] [--script f.mjs] [--reduced]'); process.exit(2); }
const OUT = ensureDir(path.resolve(outArg));
const vpNames = (args.viewports || 'desktop,mobile').split(',').filter((v) => VIEWPORTS[v]);
const STEPS = parseInt(args.steps || '12', 10);
const WAIT = parseInt(args.wait || '3500', 10);
const STEP = parseFloat(args.step || '0.85');
const TIMELINE = (args.timeline || '0,400,900,1600,2600').split(',').map((n) => parseInt(n, 10)).filter((n) => !isNaN(n));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const INIT = `
  (() => {
    window.__qa = { webgl: [], lost: 0, errors: [], longTasks: 0 };
    const orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
      const ctx = orig.call(this, type, ...rest);
      if (/webgl/.test(type) && ctx) { window.__qa.webgl.push({ type, w: this.width, h: this.height }); this.addEventListener('webglcontextlost', () => { window.__qa.lost++; }); }
      return ctx;
    };
    try { new PerformanceObserver((l) => { window.__qa.longTasks += l.getEntries().filter(e => e.duration > 120).length; }).observe({ entryTypes: ['longtask'] }); } catch {}
  })();
`;

const AUDIT = (vwArg) => {
  const vw = vwArg || innerWidth; const res = {};
  res.scrollWidth = document.documentElement.scrollWidth; res.vw = vw; res.docHeight = document.documentElement.scrollHeight;
  res.overflowX = res.scrollWidth > vw + 1;
  const off = [];
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    if (r.width > 0 && r.height > 0 && (r.right > vw + 2 || r.left < -2) && cs.position !== 'fixed' && cs.visibility !== 'hidden') {
      let p = el.parentElement; let clipped = false;
      while (p && p !== document.body) { const o = getComputedStyle(p); if (/(hidden|clip|auto|scroll)/.test(o.overflowX)) { clipped = true; break; } p = p.parentElement; }
      if (!clipped && off.length < 8) off.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} right=${Math.round(r.right)}`);
    }
  });
  res.overflowOffenders = off;
  res.h1Count = document.querySelectorAll('h1').length;
  res.imgsNoAlt = [...document.images].filter((i) => !i.hasAttribute('alt')).length;
  res.unlabeled = [...document.querySelectorAll('button, a')].filter((e) => !(e.innerText || '').trim() && !e.getAttribute('aria-label') && !e.getAttribute('title') && !e.querySelector('img[alt], svg title')).length;
  res.lang = document.documentElement.lang;
  const small = [];
  document.querySelectorAll('a, button, [role="button"], input, select, textarea, summary').forEach((e) => {
    const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
    if (r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && (r.width < 40 || r.height < 40) && r.top < innerHeight * 4) small.push(`${e.tagName.toLowerCase()}:${(e.innerText || e.getAttribute('aria-label') || '').trim().slice(0, 18)} ${Math.round(r.width)}x${Math.round(r.height)}`);
  });
  res.smallTapTargets = small.slice(0, 10); res.smallTapTargetCount = small.length;
  const fontPresent = (fam, wt) => {
    // true only if the family renders differently from BOTH generic fallbacks (i.e. it is really installed/loaded)
    const c = document.createElement('canvas').getContext('2d'); const t = 'mmmmmmmmmmlliWWW@@';
    const w = (f) => { c.font = `${wt} 72px ${f}`; return c.measureText(t).width; };
    return Math.abs(w(`"${fam}", monospace`) - w('monospace')) > 0.5 || Math.abs(w(`"${fam}", serif`) - w('serif')) > 0.5 || Math.abs(w(`"${fam}", sans-serif`) - w('sans-serif')) > 0.5;
  };
  const key = ['h1', 'h2', 'p', 'button', 'a', 'nav a'];
  res.fonts = {};
  for (const sel of key) { const el = document.querySelector(sel); if (el) { const cs = getComputedStyle(el); const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(); res.fonts[sel] = { fam, size: cs.fontSize, weight: cs.fontWeight, lh: cs.lineHeight, ls: cs.letterSpacing, loaded: fontPresent(fam, cs.fontWeight) }; } }
  res.fontsFailed = [...document.fonts].filter((f) => f.status === 'error').map((f) => f.family);
  res.fontsLoaded = [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`))].slice(0, 20);
  res.canvases = [...document.querySelectorAll('canvas')].map((c) => `${c.width}x${c.height}`);
  res.webgl = window.__qa?.webgl.length || 0; res.webglLost = window.__qa?.lost || 0; res.longTasks = window.__qa?.longTasks || 0;
  res.reducedMotionCSS = (() => { try { for (const s of document.styleSheets) { for (const r of s.cssRules || []) { if (r.media && /prefers-reduced-motion/.test(r.media.mediaText)) return true; } } } catch {} return false; })();
  res.placeholderText = (document.body.innerText.match(/lorem ipsum|placeholder|todo|tbd|coming soon|your text here/gi) || []).slice(0, 5);
  res.emptyImages = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => (i.currentSrc || i.src).slice(-60)).slice(0, 8);
  res.title = document.title;
  return res;
};

function contact(dir, vp) {
  const files = fs.readdirSync(dir).filter((f) => /^(t-|s-|state-).*\.jpg$/.test(f)).sort();
  if (!files.length) return;
  const mobile = VIEWPORTS[vp].mobile && VIEWPORTS[vp].width < 500;
  try {
    execFileSync('montage', [...files.map((f) => path.join(dir, f)), '-tile', mobile ? '8x' : '4x', '-geometry', mobile ? '240x520+3+3' : '520x330+3+3', '-background', '#0b0b0b', path.join(dir, 'contact.jpg')], { stdio: 'ignore' });
  } catch {}
}

await withSlot('chromium', 2, async () => {
  const browser = await launch();
  const report = { url, viewports: {} };
  try {
    for (const vpName of vpNames) {
      const vp = VIEWPORTS[vpName];
      const dir = ensureDir(path.join(OUT, vpName));
      for (const f of fs.readdirSync(dir)) if (/\.(jpg|png)$/.test(f)) fs.unlinkSync(path.join(dir, f));
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.dpr, isMobile: vp.mobile, hasTouch: vp.mobile,
        userAgent: vp.mobile ? MOBILE_UA : DESKTOP_UA, reducedMotion: args.reduced ? 'reduce' : 'no-preference',
      });
      await ctx.addInitScript(INIT);
      const page = await ctx.newPage();
      const R = { console: [], pageErrors: [], failed: [], http: [], shots: [] };
      page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) { const t = m.text().slice(0, 240); if (!/Download the React DevTools|GPU stall due to ReadPixels|GL Driver Message|swiftshader/i.test(t)) R.console.push(`${m.type()}: ${t}`); } });
      page.on('pageerror', (e) => R.pageErrors.push(String(e.message || e).slice(0, 300)));
      page.on('requestfailed', (r) => { const f = r.failure()?.errorText || ''; if (!/ERR_ABORTED/.test(f)) R.failed.push(`${r.url().slice(0, 140)} ${f}`); });
      page.on('response', (r) => { if (r.status() >= 400) R.http.push(`${r.status()} ${r.url().slice(0, 140)}`); });
      const shot = async (name, opts = {}) => {
        const buf = await page.screenshot({ type: 'jpeg', quality: vp.mobile ? 78 : 80, ...opts });
        fs.writeFileSync(path.join(dir, name.endsWith('.jpg') ? name : name + '.jpg'), buf);
        return crypto.createHash('md5').update(buf).digest('hex').slice(0, 8);
      };

      // ---- intro timeline (what the first seconds look like) ----
      const t0 = Date.now();
      await page.goto(url, { waitUntil: 'commit', timeout: 60000 }).catch((e) => R.pageErrors.push('goto: ' + e.message.slice(0, 160)));
      for (const t of TIMELINE) {
        const wait = t - (Date.now() - t0); if (wait > 0) await sleep(wait);
        await shot(`t-${String(t).padStart(5, '0')}`);
      }
      await page.waitForLoadState('load', { timeout: 40000 }).catch(() => {});
      await sleep(WAIT);

      // ---- scroll journey ----
      let last = ''; let stagnant = 0; const hashes = [];
      for (let i = 0; i < STEPS; i++) {
        const y = await page.evaluate(() => Math.round(window.scrollY));
        const h = await shot(`s-${String(i).padStart(2, '0')}`);
        R.shots.push({ i, scrollY: y, hash: h });
        hashes.push(h);
        if (h === last) { stagnant++; if (stagnant >= 2) break; } else stagnant = 0;
        last = h;
        await page.mouse.move(vp.width * 0.6, vp.height * 0.5);
        await page.mouse.wheel(0, Math.round(vp.height * STEP));
        await sleep(1100);
        if (vp.mobile) { const y2 = await page.evaluate(() => Math.round(window.scrollY)); if (y2 === y) await page.evaluate((d) => window.scrollBy(0, d), Math.round(vp.height * STEP)); await sleep(400); }
      }
      R.audit = await page.evaluate(AUDIT, vp.width).catch((e) => ({ error: e.message }));
      R.uniqueFrames = new Set(hashes).size;

      // ---- interaction states ----
      if (args.script) {
        try {
          await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
          await page.mouse.wheel(0, -20000).catch(() => {});
          await sleep(1200);
          const mod = await import(pathToFileURL(path.resolve(args.script)).href);
          await mod.default(page, { shot: (n, o) => shot('state-' + n, o), vp: vpName, wait: WAIT, sleep, viewport: vp });
          R.states = fs.readdirSync(dir).filter((f) => f.startsWith('state-'));
        } catch (e) { R.scriptError = String(e.message || e).slice(0, 300); }
      }
      await ctx.close();
      contact(dir, vpName);
      report.viewports[vpName] = R;
    }
  } finally { await browser.close(); }
  writeJSON(path.join(OUT, 'report.json'), report);
  // concise console summary (agents read report.json for the rest)
  const sum = {};
  for (const [k, v] of Object.entries(report.viewports)) {
    const a = v.audit || {};
    sum[k] = { shots: v.shots.length, uniqueFrames: v.uniqueFrames, consoleErrors: v.console.length, pageErrors: v.pageErrors.length, failedReq: v.failed.length, http4xx5xx: v.http.length,
      overflowX: a.overflowX, h1: a.h1Count, fontsFailed: a.fontsFailed, h1Font: a.fonts?.h1?.fam, h1FontLoaded: a.fonts?.h1?.loaded, webgl: a.webgl, webglLost: a.webglLost, smallTapTargets: a.smallTapTargetCount, placeholders: a.placeholderText, emptyImages: a.emptyImages?.length, scriptError: v.scriptError };
  }
  console.log(JSON.stringify({ ok: true, out: OUT, summary: sum }, null, 1));
});
