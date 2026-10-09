// Shared helpers for the swarm tooling.
// - launch(): Chromium with software WebGL (SwiftShader) — verified to give WebGL2 in this container
// - withSlot(): file-lock semaphore so ten concurrent agents cannot overload the 4-core box
// - dismissCookies(): best-effort consent-banner dismissal for reference/brand sites
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const TOOLS_DIR = path.resolve(HERE, '..');
export const REPO_ROOT = path.resolve(TOOLS_DIR, '..');
const LOCK_DIR = path.join(TOOLS_DIR, '.locks');

export function findChromium() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  const cands = fs.existsSync(base)
    ? fs.readdirSync(base).filter((d) => d.startsWith('chromium-')).sort().reverse()
    : [];
  for (const d of cands) {
    const p = path.join(base, d, 'chrome-linux', 'chrome');
    if (fs.existsSync(p)) return p;
  }
  throw new Error('No Chromium found under ' + base);
}

export const CHROMIUM_ARGS = [
  '--no-sandbox',
  '--use-gl=angle',
  '--use-angle=swiftshader',
  '--enable-unsafe-swiftshader',
  '--ignore-gpu-blocklist',
  '--enable-webgl',
  '--autoplay-policy=no-user-gesture-required',
  '--disable-dev-shm-usage',
  '--hide-scrollbars',
];

export async function launch(extraArgs = []) {
  return chromium.launch({ executablePath: findChromium(), args: [...CHROMIUM_ARGS, ...extraArgs] });
}

const pidAlive = (pid) => {
  try { process.kill(pid, 0); return true; } catch { return false; }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Acquire one of `n` named slots (cross-process). Returns release(). */
export async function acquireSlot(name, n = 2, timeoutMs = 20 * 60 * 1000) {
  fs.mkdirSync(LOCK_DIR, { recursive: true });
  const start = Date.now();
  for (;;) {
    for (let i = 0; i < n; i++) {
      const f = path.join(LOCK_DIR, `${name}.${i}`);
      try {
        const fd = fs.openSync(f, 'wx');
        fs.writeSync(fd, String(process.pid));
        fs.closeSync(fd);
        let released = false;
        const release = () => {
          if (released) return;
          released = true;
          try { fs.unlinkSync(f); } catch {}
        };
        process.on('exit', release);
        process.on('SIGINT', () => { release(); process.exit(130); });
        process.on('SIGTERM', () => { release(); process.exit(143); });
        return release;
      } catch (e) {
        if (e.code !== 'EEXIST') throw e;
        try {
          const owner = parseInt(fs.readFileSync(f, 'utf8'), 10);
          if (!owner || !pidAlive(owner)) fs.unlinkSync(f); // stale
        } catch {}
      }
    }
    if (Date.now() - start > timeoutMs) throw new Error(`slot ${name} timeout`);
    await sleep(750 + Math.random() * 500);
  }
}

export async function withSlot(name, n, fn) {
  const release = await acquireSlot(name, n);
  try { return await fn(); } finally { release(); }
}

export async function dismissCookies(page) {
  const labels = [
    /^(accept|allow|agree|ok|got it|i agree|accept all|allow all|accept cookies|alle akzeptieren|accepter|tout accepter|akzeptieren|zustimmen|continue)$/i,
  ];
  try {
    const btns = await page.$$('button, a[role="button"], [role="button"]');
    for (const b of btns.slice(0, 80)) {
      const t = ((await b.innerText().catch(() => '')) || '').trim();
      if (t && t.length < 30 && labels.some((r) => r.test(t))) {
        await b.click({ timeout: 800 }).catch(() => {});
        await page.waitForTimeout(400);
        return t;
      }
    }
    const sel = await page.$('#onetrust-accept-btn-handler, #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll, .cc-allow, [data-testid="uc-accept-all-button"]');
    if (sel) { await sel.click({ timeout: 800 }).catch(() => {}); return 'selector'; }
  } catch {}
  return null;
}

export function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const nxt = argv[i + 1];
      if (nxt === undefined || nxt.startsWith('--')) out[k] = true;
      else { out[k] = nxt; i++; }
    } else out._.push(a);
  }
  return out;
}

export const VIEWPORTS = {
  xl:      { width: 1920, height: 1080, dpr: 1, mobile: false },
  desktop: { width: 1440, height: 900,  dpr: 1, mobile: false },
  laptop:  { width: 1280, height: 720,  dpr: 1, mobile: false },
  tablet:  { width: 820,  height: 1180, dpr: 1, mobile: true  },
  mobile:  { width: 390,  height: 844,  dpr: 2, mobile: true  },
  small:   { width: 360,  height: 740,  dpr: 2, mobile: true  },
};

export const DESKTOP_UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
export const MOBILE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1';

export function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); return d; }
export function writeJSON(f, o) { fs.writeFileSync(f, JSON.stringify(o, null, 2)); }
