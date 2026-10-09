#!/usr/bin/env node
// Harvest the real assets a live page serves: images (incl. largest srcset candidates, CSS backgrounds, og:image),
// inline SVG logos, video, 3D models (glb/gltf/usdz/obj), PDFs (brand guidelines / press kits). Records dimensions & role hints.
//
//   node _tools/harvest.mjs <url> <outDir> [--scroll 10] [--wait 4000] [--min-bytes 12000] [--links] [--mobile]
//
// <outDir>/images, /svg, /video, /models, /pdf  + harvest.json (inventory) + links.json (same-origin links, with --links).
// Dump dirs named _harvest/ are gitignored: COPY only the curated, licensed assets into the concept's assets/ folder and
// record each one in ASSET_MANIFEST.md.
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { launch, withSlot, dismissCookies, parseArgs, ensureDir, writeJSON, DESKTOP_UA, MOBILE_UA } from './lib/common.mjs';

const args = parseArgs(process.argv.slice(2));
const [url, outArg] = args._;
if (!url || !outArg) { console.error('usage: harvest.mjs <url> <outDir> [--scroll N] [--wait ms] [--min-bytes N] [--links] [--mobile]'); process.exit(2); }
const out = ensureDir(path.resolve(outArg));
const dirs = Object.fromEntries(['images', 'svg', 'video', 'models', 'pdf'].map((d) => [d, ensureDir(path.join(out, d))]));
const SCROLL = parseInt(args.scroll || '10', 10);
const WAIT = parseInt(args.wait || '4000', 10);
const MINB = parseInt(args['min-bytes'] || '12000', 10);

const extFromCT = (ct, u) => {
  const m = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif', 'image/svg+xml': 'svg', 'video/mp4': 'mp4', 'video/webm': 'webm', 'model/gltf-binary': 'glb', 'model/gltf+json': 'gltf', 'application/pdf': 'pdf' };
  if (m[ct]) return m[ct];
  const e = (u.split('?')[0].match(/\.([a-z0-9]{2,5})$/i) || [])[1];
  return e ? e.toLowerCase() : 'bin';
};
const kindOf = (ct, u) => {
  if (/^image\/svg/.test(ct) || /\.svg(\?|$)/i.test(u)) return 'svg';
  if (/^image\//.test(ct)) return 'images';
  if (/^video\//.test(ct) || /\.(mp4|webm|mov)(\?|$)/i.test(u)) return 'video';
  if (/model\/|\.(glb|gltf|usdz|obj|fbx)(\?|$)/i.test(u)) return 'models';
  if (/pdf/.test(ct) || /\.pdf(\?|$)/i.test(u)) return 'pdf';
  return null;
};
const slug = (u) => {
  const base = decodeURIComponent((u.split('?')[0].split('/').pop() || 'file')).replace(/[^a-z0-9._-]+/gi, '_').slice(-60);
  return crypto.createHash('md5').update(u).digest('hex').slice(0, 6) + '_' + base;
};

const inventory = new Map(); // url -> record
const save = async (u, buf, ct, via) => {
  const kind = kindOf(ct, u);
  if (!kind || inventory.has(u)) return;
  if (kind !== 'svg' && buf.length < MINB && kind !== 'pdf') return;
  const ext = extFromCT(ct, u);
  let name = slug(u); if (!name.toLowerCase().endsWith('.' + ext)) name += '.' + ext;
  fs.writeFileSync(path.join(dirs[kind], name), buf);
  const rec = { url: u, file: `${kind}/${name}`, kind, bytes: buf.length, contentType: ct, via };
  if (kind === 'images') {
    try { const m = await sharp(buf).metadata(); rec.w = m.width; rec.h = m.height; rec.alpha = !!m.hasAlpha; } catch {}
  }
  inventory.set(u, rec);
};

await withSlot('chromium', 3, async () => {
  const browser = await launch();
  const ctx = await browser.newContext(args.mobile
    ? { viewport: { width: 390, height: 844 }, userAgent: MOBILE_UA, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { viewport: { width: 1440, height: 900 }, userAgent: DESKTOP_UA, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const pending = [];
  page.on('response', (r) => {
    const u = r.url(); const ct = (r.headers()['content-type'] || '').split(';')[0];
    if (!kindOf(ct, u) || r.status() >= 400 || u.startsWith('data:')) return;
    pending.push(r.body().then((b) => save(u, b, ct, 'network')).catch(() => {}));
  });
  await page.goto(url, { waitUntil: 'commit', timeout: 45000 }).catch(() => {});
  await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(WAIT);
  await dismissCookies(page);
  for (let i = 0; i < SCROLL; i++) {
    await page.mouse.move(700, 450); await page.mouse.wheel(0, 800); await page.waitForTimeout(900);
    await page.evaluate(() => window.scrollBy(0, 800)).catch(() => {});
  }
  await page.waitForTimeout(1500);

  const dom = await page.evaluate(() => {
    const abs = (u) => { try { return new URL(u, location.href).href; } catch { return null; } };
    const nearestHeading = (el) => { let n = el; for (let i = 0; i < 6 && n; i++, n = n.parentElement) { const h = n.querySelector && n.querySelector('h1,h2,h3'); if (h) return (h.innerText || '').trim().slice(0, 60); } return ''; };
    const images = [...document.images].map((im) => {
      let best = im.currentSrc || im.src; let bw = 0;
      (im.getAttribute('srcset') || '').split(',').forEach((c) => { const [u, w] = c.trim().split(/\s+/); const n = parseFloat(w) || 0; if (u && n >= bw) { bw = n; best = abs(u); } });
      const r = im.getBoundingClientRect();
      return { src: abs(best), cur: im.currentSrc, alt: im.alt, nw: im.naturalWidth, nh: im.naturalHeight, w: Math.round(r.width), h: Math.round(r.height), near: nearestHeading(im) };
    });
    const sources = [...document.querySelectorAll('picture source[srcset], source[srcset]')].map((s) => {
      let best = null; let bw = 0;
      (s.getAttribute('srcset') || '').split(',').forEach((c) => { const [u, w] = c.trim().split(/\s+/); const n = parseFloat(w) || 0; if (u && n >= bw) { bw = n; best = abs(u); } });
      return { src: best, media: s.media };
    });
    const bgs = [];
    document.querySelectorAll('*').forEach((el) => { const b = getComputedStyle(el).backgroundImage; const m = b && b.match(/url\(["']?([^"')]+)["']?\)/); if (m && !m[1].startsWith('data:')) bgs.push({ src: abs(m[1]), near: nearestHeading(el) }); });
    const svgs = [];
    const logoish = (el) => /logo|brand|wordmark/i.test((el.getAttribute('class') || '') + ' ' + (el.getAttribute('aria-label') || '') + ' ' + (el.getAttribute('id') || '') + ' ' + (el.closest('a')?.getAttribute('aria-label') || ''));
    document.querySelectorAll('svg').forEach((s) => {
      const r = s.getBoundingClientRect();
      const inHeaderHome = s.closest('header, nav, [class*="header" i], a[href="/"], a[href$="/"]');
      if ((logoish(s) || (inHeaderHome && r.width > 40 && r.width < 500)) && s.outerHTML.length > 200 && s.outerHTML.length < 120000) {
        svgs.push({ html: s.outerHTML, w: Math.round(r.width), h: Math.round(r.height), cls: String(s.getAttribute('class') || '').slice(0, 50), aria: s.getAttribute('aria-label') || s.querySelector('title')?.textContent || '' });
      }
    });
    const meta = {
      og: document.querySelector('meta[property="og:image"]')?.content, twitter: document.querySelector('meta[name="twitter:image"]')?.content,
      icons: [...document.querySelectorAll('link[rel*="icon"]')].map((l) => abs(l.href)),
      preloadImages: [...document.querySelectorAll('link[rel="preload"][as="image"]')].map((l) => abs(l.href)),
      title: document.title, theme: document.querySelector('meta[name="theme-color"]')?.content,
    };
    const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent.slice(0, 4000));
    const models = [...document.querySelectorAll('model-viewer')].map((m) => ({ src: abs(m.getAttribute('src')), ios: abs(m.getAttribute('ios-src')), poster: abs(m.getAttribute('poster')) }));
    const links = [...document.querySelectorAll('a[href]')].map((a) => ({ t: (a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 50), h: abs(a.getAttribute('href')) })).filter((l) => l.h && l.h.startsWith('http'));
    return { images, sources, bgs, svgs, meta, jsonld, models, links, themeFonts: getComputedStyle(document.body).fontFamily };
  });

  // fetch the declared-largest srcset / source / og / background candidates directly (full-res originals)
  const extra = new Set();
  for (const i of dom.images) if (i.src) extra.add(i.src);
  for (const s of dom.sources) if (s.src) extra.add(s.src);
  for (const b of dom.bgs) if (b.src) extra.add(b.src);
  for (const k of [dom.meta.og, dom.meta.twitter, ...dom.meta.preloadImages, ...dom.meta.icons]) if (k) extra.add(k);
  for (const m of dom.models) for (const k of [m.src, m.ios, m.poster]) if (k) extra.add(k);
  for (const u of [...extra].slice(0, 200)) {
    if (inventory.has(u) || u.startsWith('data:')) continue;
    try {
      const r = await ctx.request.get(u, { timeout: 20000 });
      if (r.ok()) await save(u, await r.body(), (r.headers()['content-type'] || '').split(';')[0], 'dom');
    } catch {}
  }
  await Promise.all(pending);

  let svgN = 0;
  const svgRecs = [];
  for (const s of dom.svgs.slice(0, 12)) {
    let html = s.html; if (!/xmlns=/.test(html)) html = html.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    const name = `inline_${String(++svgN).padStart(2, '0')}_${(s.aria || s.cls || 'svg').replace(/[^a-z0-9]+/gi, '_').slice(0, 30)}.svg`;
    fs.writeFileSync(path.join(dirs.svg, name), html);
    svgRecs.push({ file: `svg/${name}`, w: s.w, h: s.h, aria: s.aria, cls: s.cls, bytes: html.length });
  }
  if (args.links) {
    const origin = new URL(url).origin;
    const uniq = new Map(); for (const l of dom.links) if (!uniq.has(l.h)) uniq.set(l.h, l);
    writeJSON(path.join(out, 'links.json'), { sameOrigin: [...uniq.values()].filter((l) => l.h.startsWith(origin)).slice(0, 150), external: [...uniq.values()].filter((l) => !l.h.startsWith(origin)).slice(0, 60) });
  }
  await browser.close();

  const recs = [...inventory.values()].sort((a, b) => (b.w || 0) * (b.h || 0) - (a.w || 0) * (a.h || 0) || b.bytes - a.bytes);
  const domMap = new Map(); for (const i of dom.images) if (i.src) domMap.set(i.src, i);
  for (const r of recs) { const d = domMap.get(r.url); if (d) { r.alt = d.alt; r.near = d.near; r.renderedW = d.w; } }
  writeJSON(path.join(out, 'harvest.json'), { url, meta: dom.meta, jsonld: dom.jsonld, bodyFont: dom.themeFonts, svgLogos: svgRecs, assets: recs });
  const by = (k) => recs.filter((r) => r.kind === k).length;
  console.log(JSON.stringify({ ok: true, out, images: by('images'), svgFiles: by('svg'), inlineSvgs: svgRecs.length, video: by('video'), models: by('models'), pdf: by('pdf'),
    biggest: recs.filter((r) => r.kind === 'images').slice(0, 5).map((r) => `${r.w}x${r.h} ${r.file}`) }, null, 1));
});
