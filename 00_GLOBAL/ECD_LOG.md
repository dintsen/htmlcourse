# ECD LOG — read this first after any restart / usage reset

## Hard facts learned (do not re-learn)
- Usage limits are the binding constraint, not wall-clock. Window 1 (12:30→17:30 UTC) was exhausted at ~15:30 by 18 parallel agents (~4.4M subagent tokens). Window 2 (17:30→22:30) was exhausted in <1h by 12 parallel agents. EVERY workflow agent then fails with "You've hit your session limit · resets HH:MM (UTC)". When that happens: stop launching, schedule a resume (send_later) for reset+5min, do only cheap work.
- Main-loop turns are expensive (huge context). Do NOT run periodic Monitors; do NOT narrate while waiting. Wake only on workflow completion or scheduled resume.
- Images are the biggest context cost. Agents must use contact sheets, open ≤3–4 full frames, never loop-read many images.
- Container restarts happen (worker restarts, `up 0 min`): disk persists, processes do not. After a restart: `rm -f _tools/.locks/*`, restart `_tools/reap.sh` loop and `_tools/autocommit.sh` (background), then continue. Git: only the ECD commits (autocommit loop does it every 4 min).
- Network: Full, except awwwards.com (egress-blocked; do not route around it). Real Chromium opens everything else incl. bot-protected brand sites. 4 CPUs/16 GB: browsers are globally pooled (3) inside `_tools/lib/common.mjs launch()`; orphans are reaped; per-browser watchdog kills trees if a tool dies.
- No text-to-image model. "Generated" = procedural/computational + processed official photography.

## Strategy change (budget realism): DEPTH-FIRST, not breadth-first
Ten half-built sites are worth nothing; finished sites are. From now on every concept runs the FULL pipeline (incubate → diversity-checked direction → build → evaluator/optimizer loop → fresh final evaluation) to completion before the next big spend. Per-site standards are NOT lowered; the ORDER of work changes and each stage is made leaner:
- Selection of the ten + creative lanes is done by the ECD directly from data already on disk (cheap), then lanes are fixed.
- Concept pipelines are launched in priority order, 2–3 at a time, not ten.
- Prompts demand: reuse existing artifacts, contact sheets not frame dumps, concise md, no re-reading, no narration.
- Reference library: only what each concept needs (its scout opens the references it will use, via inspect-ref, and records REF.md). The whitelist studios are still opened for real, but by the concept scouts that need their DNA, not as a standalone 30-site survey.

## State on disk (survived restarts)
- Tools: `_tools/{inspect-ref,harvest,shoot,serve,compare}.mjs`, `qa.sh`, `slot.mjs`, `optimize-glb.sh`, `reap.sh`, `autocommit.sh`, `lib/common.mjs`; workflows in `_tools/workflows/*.js` (reference-library, brand-scouts, brand-select, concept-incubate, concept-build, concept-qa, diversity-gate). Run any with `Workflow({scriptPath, args})`.
- Brief: `00_GLOBAL/BRIEF.md` (authoritative). Protocol: `00_GLOBAL/SWARM_PROTOCOL.md`.
- Reference inspections on disk: `00_GLOBAL/REFERENCE_LIBRARY/<slug>/{inspect.json,d-*.jpg,m-*.jpg,contact-*.jpg}` (~25 entries; only ~8 have REF.md). No VERDICT.json yet.
- Brand probes on disk (harvest.json + inspect.json): `00_GLOBAL/DISCOVERY/_harvest/<slug>*`, `_inspect/<slug>`; only 3 candidate files written. Probed pool: omnom lakrids tonys raaka zotter omnipollo fritz-kola liquiddeath seedlip ghia ippodo mouton fillico friedhats brompton campagnolo kask norda nnormal vibram petzl analogue elektron grado ricoh-gr teenage-engineering moog playdate lomography polaroid buly1803 diptyque drbronners perfumerh smnovella tangleteezer nealsyard casa-batllo benesse-naoshima faroe-islands fogo-island-inn icehotel louisiana tivoli treehotel.

## Next actions (in order)
1. (ECD, cheap, no subagents) compute asset stats from harvest.json; choose the ten + lanes; write SELECTED_TEN.md, DIVERSITY_MATRIX.md, concepts/NN-slug/BRIEF.md.
2. Launch concept-incubate for the first 2–3 priority concepts (lean). Then diversity-check, build, QA — per concept, to completion.
3. Continue concept by concept until ten are released; collection jury at the end.
