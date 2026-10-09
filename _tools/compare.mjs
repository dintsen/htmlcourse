#!/usr/bin/env node
// Side-by-side benchmark composite: reference state(s) on the left, our state(s) on the right, same height, labelled.
//   node _tools/compare.mjs --out cmp.jpg --ref refA.jpg[,refB.jpg] --ours ours1.jpg[,ours2.jpg] [--height 900] [--refLabel "OBYS hero"] [--oursLabel "ours"]
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { parseArgs, ensureDir } from './lib/common.mjs';
const a = parseArgs(process.argv.slice(2));
if (!a.out || !a.ref || !a.ours) { console.error('usage: compare.mjs --out f.jpg --ref a.jpg[,b.jpg] --ours c.jpg[,d.jpg] [--height 900] [--refLabel t] [--oursLabel t]'); process.exit(2); }
const H = String(a.height || 900);
ensureDir(path.dirname(path.resolve(a.out)));
const strip = (files, label, bg) => {
  const parts = files.split(',').flatMap((f) => [ '(', f, '-resize', `x${H}`, ')' ]);
  return [...parts, '+append', '-background', bg, '-gravity', 'north', '-splice', '0x34', '-fill', 'white', '-pointsize', '22', '-annotate', '+10+6', label];
};
const left = path.resolve(a.out) + '.L.jpg', right = path.resolve(a.out) + '.R.jpg';
execFileSync('convert', [...strip(a.ref, a.refLabel || 'REFERENCE', '#222'), left]);
execFileSync('convert', [...strip(a.ours, a.oursLabel || 'OURS', '#222'), right]);
execFileSync('convert', [left, '(', '-size', '12x1', 'xc:#ff3b30', ')', right, '+append', '-quality', '85', path.resolve(a.out)]);
execFileSync('rm', ['-f', left, right]);
console.log('wrote', a.out);
