#!/usr/bin/env node
// Run a command inside a named cross-process slot (limits concurrent heavy jobs on this 4-core box).
//   node _tools/slot.mjs <name> <n> -- <cmd> [args...]
import { spawn } from 'node:child_process';
import { acquireSlot } from './lib/common.mjs';
const [name, n, dash, ...cmd] = process.argv.slice(2);
if (!name || !n || dash !== '--' || !cmd.length) { console.error('usage: slot.mjs <name> <n> -- <cmd> [args]'); process.exit(2); }
const release = await acquireSlot(name, parseInt(n, 10));
const p = spawn(cmd[0], cmd.slice(1), { stdio: 'inherit' });
p.on('exit', (code, sig) => { release(); process.exit(code ?? (sig ? 1 : 0)); });
