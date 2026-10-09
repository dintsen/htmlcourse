#!/usr/bin/env node
// Tiny static server for a built site (dist/) — correct MIME for glb/ktx2/wasm/mp4/woff2, Range requests for video,
// SPA fallback to index.html. Handy when you want to QA the production build instead of the Vite dev server.
//   node _tools/serve.mjs <dir> <port>
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const [dirArg, portArg] = process.argv.slice(2);
if (!dirArg || !portArg) { console.error('usage: serve.mjs <dir> <port>'); process.exit(2); }
const root = path.resolve(dirArg);
const MIME = { html: 'text/html; charset=utf-8', js: 'text/javascript', mjs: 'text/javascript', css: 'text/css', json: 'application/json', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', avif: 'image/avif', gif: 'image/gif', woff2: 'font/woff2', woff: 'font/woff', ttf: 'font/ttf', otf: 'font/otf', glb: 'model/gltf-binary', gltf: 'model/gltf+json', ktx2: 'image/ktx2', wasm: 'application/wasm', mp4: 'video/mp4', webm: 'video/webm', hdr: 'application/octet-stream', txt: 'text/plain', ico: 'image/x-icon', mp3: 'audio/mpeg', ogg: 'audio/ogg', wav: 'audio/wav' };

http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(root, 'index.html');
  const ext = path.extname(f).slice(1).toLowerCase();
  const size = fs.statSync(f).size;
  const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' };
  const range = req.headers.range;
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    const start = m[1] ? parseInt(m[1], 10) : 0; const end = m[2] ? parseInt(m[2], 10) : size - 1;
    res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
    fs.createReadStream(f, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { ...headers, 'Content-Length': size });
    fs.createReadStream(f).pipe(res);
  }
}).listen(parseInt(portArg, 10), '127.0.0.1', () => console.log(`serving ${root} on http://127.0.0.1:${portArg}`));
