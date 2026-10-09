#!/usr/bin/env node
// Open a live reference site in real Chromium, scroll it, screenshot it, and extract how it is built.
//
//   node _tools/inspect-ref.mjs <url> <outDir> [--shots 14] [--mshots 8] [--wait 5000] [--step 0.85] [--no-mobile]
//
// Output in <outDir>: d-00-load-early.jpg, d-01-load.jpg, d-02.. (desktop scroll steps), m-00.. (mobile 390x844),
// inspect.json  (fonts, type scale, colours, libs, canvas/webgl, nav, meta, network summary, scroll metrics),
// contact-d.jpg / contact-m.jpg (all shots tiled in one sheet).
// Scrolling uses real mouse-wheel events so Lenis / GSAP ScrollTrigger / virtual-scroll sites actually move.
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { launch, withSlot, dismissCookies, parseArgs, ensureDir, writeJSON, DESKTOP_UA, MOBILE_UA } from './lib/common.mjs';

const args = parseArgs(process.argv.slice(2));
const [url, outDirArg] = args._;
if (!url || !outDirArg) { console.error('usage: inspect-ref.mjs <url> <outDir> [--shots N] [--mshots N] [--wait ms] [--step 0.85] [--no-mobile]'); process.exit(2); }
const outDir = ensureDir(path.resolve(outDirArg));
const MAXSHOTS = parseInt(args.shots || '14', 10);
const MSHOTS = parseInt(args.mshots || '8', 10);
const WAIT = parseInt(args.wait || '5000', 10);
const STEP = parseFloat(args.step || '0.85');

const INIT = `
  (() => {
    window.__ctx = { webgl: [], rafCount: 0, errors: [] };
    const orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
      if (/webgl|experimental-webgl|webgpu|bitmaprenderer/.test(type)) window.__ctx.webgl.push({ type, w: this.width, h: this.height, cls: this.className && String(this.className).slice(0, 60) });
      return orig.call(this, type, ...rest);
    };
    window.addEventListener('error', (e) => window.__ctx.errors.push(String(e.message).slice(0, 200)));
  })();
`;

const EXTRACT = () => {
  const cs = (el, p) => getComputedStyle(el)[p];
  const pick = (el) => ({
    tag: el.tagName.toLowerCase(),
    text: (el.innerText || '').trim().slice(0, 70),
    font: cs(el, 'fontFamily').slice(0, 120),
    size: cs(el, 'fontSize'), weight: cs(el, 'fontWeight'), lh: cs(el, 'lineHeight'),
    ls: cs(el, 'letterSpacing'), tt: cs(el, 'textTransform'), color: cs(el, 'color'),
    fvs: cs(el, 'fontVariationSettings'), stretch: cs(el, 'fontStretch'),
  });
  const take = (sel, n) => [...document.querySelectorAll(sel)].filter((e) => (e.innerText || '').trim()).slice(0, n).map(pick);
  // biggest rendered text blocks (hero type is usually the largest)
  const texts = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  let n = 0;
  while (walker.nextNode() && n < 4000) {
    n++;
    const el = walker.currentNode;
    if (!el.childNodes.length) continue;
    const own = [...el.childNodes].filter((c) => c.nodeType === 3 && c.textContent.trim().length > 1);
    if (!own.length) continue;
    const fs = parseFloat(cs(el, 'fontSize'));
    texts.push({ fs, el });
  }
  texts.sort((a, b) => b.fs - a.fs);
  const biggest = texts.slice(0, 8).map((t) => pick(t.el));

  const colors = {};
  const bgs = {};
  [...document.querySelectorAll('body *')].slice(0, 2500).forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return;
    const area = Math.min(r.width, innerWidth) * Math.min(r.height, innerHeight * 3);
    const c = cs(el, 'color'); const b = cs(el, 'backgroundColor');
    if (el.innerText && el.innerText.trim()) colors[c] = (colors[c] || 0) + 1;
    if (b && b !== 'rgba(0, 0, 0, 0)') bgs[b] = (bgs[b] || 0) + area;
  });
  const top = (o, k) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, k).map(([c, v]) => [c, Math.round(v)]);

  const rootVars = {};
  try {
    for (const sheet of document.styleSheets) {
      let rules; try { rules = sheet.cssRules; } catch { continue; }
      for (const r of rules || []) {
        if (r.selectorText === ':root' || r.selectorText === 'html') {
          for (const p of r.style) if (p.startsWith('--') && Object.keys(rootVars).length < 60) rootVars[p] = r.style.getPropertyValue(p).trim().slice(0, 60);
        }
      }
    }
  } catch {}

  const fontFaces = [];
  try {
    for (const sheet of document.styleSheets) {
      let rules; try { rules = sheet.cssRules; } catch { continue; }
      for (const r of rules || []) {
        if (r.type === CSSRule.FONT_FACE_RULE) {
          fontFaces.push({ family: r.style.getPropertyValue('font-family').replace(/["']/g, ''), weight: r.style.getPropertyValue('font-weight'), style: r.style.getPropertyValue('font-style'), src: r.style.getPropertyValue('src').slice(0, 200) });
        }
      }
    }
  } catch {}
  const loadedFonts = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight} ${f.style}`);

  const g = window;
  const libs = {
    gsap: !!g.gsap && (g.gsap.version || true), ScrollTrigger: !!g.ScrollTrigger, ScrollSmoother: !!g.ScrollSmoother, SplitText: !!g.SplitText,
    Lenis: !!g.Lenis || !!g.lenis || !!document.documentElement.classList.contains('lenis'), locomotive: !!g.LocomotiveScroll || !!document.querySelector('[data-scroll-container]'),
    THREE: !!g.THREE, PIXI: !!g.PIXI, barba: !!g.barba, Swiper: !!g.Swiper, Webflow: !!g.Webflow, Shopify: !!g.Shopify, jQuery: !!g.jQuery,
    nextjs: !!g.__NEXT_DATA__, nuxt: !!g.__NUXT__, react: !!document.querySelector('[data-reactroot], #__next, #root'), framerMotion: !!document.querySelector('[data-framer-name], [data-framer-component-type]'),
    lottie: !!g.lottie, rive: !!g.rive, p5: !!g.p5, Matter: !!g.Matter, Howler: !!g.Howl,
  };
  const scripts = [...document.scripts].map((s) => s.src).filter(Boolean).slice(0, 40);

  const nav = [...document.querySelectorAll('header a, nav a, [role="navigation"] a')].slice(0, 16).map((a) => ({ t: (a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 30), h: a.getAttribute('href') }));
  const canvases = [...document.querySelectorAll('canvas')].map((c) => ({ w: c.width, h: c.height, cls: String(c.className).slice(0, 50), fixed: getComputedStyle(c).position }));
  const videos = [...document.querySelectorAll('video')].map((v) => ({ src: (v.currentSrc || v.src || '').slice(0, 120), loop: v.loop, muted: v.muted }));
  const imgs = document.images.length;
  const sections = [...document.querySelectorAll('section, [data-section], main > div')].slice(0, 30).map((s) => ({ id: s.id, cls: String(s.className).slice(0, 40), h: Math.round(s.getBoundingClientRect().height), bg: getComputedStyle(s).backgroundColor }));
  const cursor = { bodyCursor: cs(document.body, 'cursor'), customCursorEls: [...document.querySelectorAll('[class*="cursor" i]')].slice(0, 4).map((e) => String(e.className).slice(0, 50)) };

  return {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || '',
    lang: document.documentElement.lang,
    docHeight: document.documentElement.scrollHeight, docWidth: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight,
    htmlClasses: document.documentElement.className.slice(0, 120),
    h1: take('h1', 2), h2: take('h2', 4), h3: take('h3', 3), p: take('p', 3), a: take('a', 3), button: take('button', 3), navLinks: take('nav a, header a', 4),
    biggestText: biggest,
    topTextColors: top(colors, 8), topBackgrounds: top(bgs, 8),
    rootVars, fontFaces: fontFaces.slice(0, 40), loadedFonts, libs, scripts, nav, canvases, videos, imgs, sections, cursor,
    webglContexts: window.__ctx?.webgl || [], pageErrors: window.__ctx?.errors || [],
  };
};

// Stops when the rendered pixels stop changing (works for native scroll AND virtual-scroll / WebGL-driven sites
// where window.scrollY never moves).
async function scrollSteps(page, vh, max, prefix, outDir, results) {
  let lastHash = ''; let stagnant = 0;
  for (let i = 0; i < max; i++) {
    const y = await page.evaluate(() => window.scrollY);
    const file = `${prefix}-${String(i + 2).padStart(2, '0')}.jpg`;
    const buf = await page.screenshot({ type: 'jpeg', quality: 72 });
    fs.writeFileSync(path.join(outDir, file), buf);
    const hash = crypto.createHash('md5').update(buf).digest('hex');
    results.push({ file, scrollY: Math.round(y), hash: hash.slice(0, 8) });
    if (hash === lastHash) { stagnant++; if (stagnant >= 2) break; } else stagnant = 0;
    lastHash = hash;
    await page.mouse.move(vh * 0.8, vh * 0.5);
    await page.mouse.wheel(0, Math.round(vh * STEP));
    await page.waitForTimeout(1200);
  }
}

function contact(outDir, prefix, name) {
  const files = fs.readdirSync(outDir).filter((f) => f.startsWith(prefix + '-') && f.endsWith('.jpg')).sort();
  if (!files.length) return;
  try {
    execFileSync('montage', [...files.map((f) => path.join(outDir, f)), '-tile', prefix === 'm' ? '8x' : '4x', '-geometry', prefix === 'm' ? '260x560+4+4' : '560x350+4+4', '-background', '#111', path.join(outDir, name)], { stdio: 'ignore' });
  } catch {
    try { execFileSync('convert', [...files.map((f) => path.join(outDir, f)), '+append', '-resize', '3000x', path.join(outDir, name)], { stdio: 'ignore' }); } catch {}
  }
}

await withSlot('chromium', 3, async () => {
  const browser = await launch();
  const report = { url, capturedAt: 'see file mtime', desktop: {}, mobile: {} };
  const netFonts = new Set(); const netLibs = new Set(); const hosts = {};
  try {
    // ---------- desktop ----------
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: DESKTOP_UA, deviceScaleFactor: 1 });
    await ctx.addInitScript(INIT);
    const page = await ctx.newPage();
    page.on('response', (r) => {
      const u = r.url(); const ct = r.headers()['content-type'] || '';
      try { const h = new URL(u).host; hosts[h] = (hosts[h] || 0) + 1; } catch {}
      if (/font|woff|ttf|otf/i.test(ct) || /\.(woff2?|ttf|otf)(\?|$)/i.test(u)) netFonts.add(u);
      if (/\.js(\?|$)/.test(u) && /(gsap|three|lenis|locomotive|scrolltrigger|pixi|barba|swiper|lottie|rive|ogl|regl|matter|cannon|rapier|postprocessing|draco|basis|ktx)/i.test(u)) netLibs.add(u);
      if (/\.(glb|gltf|ktx2|hdr|exr|usdz)(\?|$)/i.test(u) || /model\/gltf/.test(ct)) netLibs.add('[3D] ' + u);
    });
    const t0 = Date.now();
    await page.goto(url, { waitUntil: 'commit', timeout: 45000 }).catch((e) => { report.desktop.gotoError = e.message.slice(0, 200); });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(outDir, 'd-00-load-early.jpg'), type: 'jpeg', quality: 72 }).catch(() => {});
    await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(WAIT);
    const ck = await dismissCookies(page); if (ck) await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, 'd-01-load.jpg'), type: 'jpeg', quality: 72 });
    report.desktop.timeToStableMs = Date.now() - t0;
    report.desktop.extract = await page.evaluate(EXTRACT).catch((e) => ({ error: e.message }));
    report.desktop.shots = [];
    await scrollSteps(page, 900, MAXSHOTS, 'd', outDir, report.desktop.shots);
    // post-scroll extraction picks up lazily mounted libs/canvases
    report.desktop.libsAfterScroll = await page.evaluate(() => ({ canvases: document.querySelectorAll('canvas').length, webgl: (window.__ctx?.webgl || []).length, docHeight: document.documentElement.scrollHeight })).catch(() => ({}));
    // hover probe on first few interactive elements (captures hover/cursor treatment)
    try {
      await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800);
      const links = await page.$$('header a, nav a, main a, a');
      let k = 0;
      for (const l of links.slice(0, 40)) {
        const box = await l.boundingBox().catch(() => null);
        if (!box || box.width < 30 || box.y < 0 || box.y > 880) continue;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 6 });
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(outDir, `d-hover-${k}.jpg`), type: 'jpeg', quality: 70, clip: { x: Math.max(0, box.x - 160), y: Math.max(0, box.y - 120), width: 520, height: 300 } }).catch(() => {});
        if (++k >= 3) break;
      }
    } catch {}
    await ctx.close();

    // ---------- mobile ----------
    if (!args['no-mobile']) {
      const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: MOBILE_UA, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
      await mctx.addInitScript(INIT);
      const mp = await mctx.newPage();
      await mp.goto(url, { waitUntil: 'commit', timeout: 45000 }).catch((e) => { report.mobile.gotoError = e.message.slice(0, 200); });
      await mp.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
      await mp.waitForTimeout(WAIT);
      await dismissCookies(mp);
      await mp.screenshot({ path: path.join(outDir, 'm-00.jpg'), type: 'jpeg', quality: 72 });
      report.mobile.extract = await mp.evaluate(EXTRACT).catch((e) => ({ error: e.message }));
      report.mobile.shots = [];
      // mobile: use touch-like wheel scroll too (wheel works for Lenis; fall back to scrollBy)
      for (let i = 0; i < MSHOTS; i++) {
        const y = await mp.evaluate(() => window.scrollY);
        await mp.mouse.move(195, 420); await mp.mouse.wheel(0, 700);
        await mp.waitForTimeout(1100);
        const y2 = await mp.evaluate(() => window.scrollY);
        if (y2 === y) await mp.evaluate(() => window.scrollBy(0, 700));
        await mp.waitForTimeout(500);
        const file = `m-${String(i + 1).padStart(2, '0')}.jpg`;
        await mp.screenshot({ path: path.join(outDir, file), type: 'jpeg', quality: 72 });
        report.mobile.shots.push({ file, scrollY: Math.round(await mp.evaluate(() => window.scrollY)) });
      }
      await mctx.close();
    }
  } finally {
    await browser.close();
  }
  report.network = { fontFiles: [...netFonts].slice(0, 30), libraryFiles: [...netLibs].slice(0, 40), topHosts: Object.entries(hosts).sort((a, b) => b[1] - a[1]).slice(0, 12) };
  writeJSON(path.join(outDir, 'inspect.json'), report);
  contact(outDir, 'd', 'contact-d.jpg');
  contact(outDir, 'm', 'contact-m.jpg');
  const e = report.desktop.extract || {};
  console.log(JSON.stringify({
    ok: true, outDir, title: e.title, docHeight: e.docHeight,
    libs: Object.entries(e.libs || {}).filter(([, v]) => v).map(([k]) => k),
    webgl: (e.webglContexts || []).length, canvases: (e.canvases || []).length,
    fonts: [...new Set((e.biggestText || []).map((b) => b.font.split(',')[0].replace(/["']/g, '')))],
    netFonts: report.network.fontFiles.length, shots: report.desktop.shots.length,
  }, null, 1));
});
