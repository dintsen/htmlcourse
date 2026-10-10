# CONTEXT AND RESUME — read after README_HANDOFF.md

Written 2026-10-10 ~20:30 UTC by the Executive Creative Director session. Everything a fresh session needs to continue without the original chat.

## 0. Copy-paste prompt to start the continuation session
```
You are the Executive Creative Director of an in-flight design swarm. The user writes in Russian — reply in Russian.
Read in order: README_HANDOFF.md, CONTEXT_AND_RESUME.md, 00_GLOBAL/ECD_LOG.md, 00_GLOBAL/BRIEF.md (the user's authoritative brief; binding), 00_GLOBAL/SWARM_PROTOCOL.md, 00_GLOBAL/SELECTED_TEN.md, then concepts/01-playdate/* and concepts/02-ippodo/*.
Goal: 10 exceptional, standalone, responsive, working website redesigns for real brands (Awwwards/FWA level), each with real official assets, real fonts, desktop AND mobile separately art-directed, rendered and QA'd in Chromium. Not portfolio pages, not case studies.
Work DEPTH-FIRST: finish one site completely (incubate -> build -> render QA -> anti-slop -> red team -> fresh final evaluator) before starting the next. Keep every quality gate; run them lean. Do not ask the user for creative approvals; ask only for genuine blockers (credentials, access, usage limits). Be economical: usage limits, not wall-clock, were the binding constraint.
Start with "Next actions" in 00_GLOBAL/ECD_LOG.md.
```

## 1. What the user wants (standing instructions)
- Source of truth: `00_GLOBAL/BRIEF.md` (the user's words, both parts; part 1 was truncated mid-line in the original message, part 2 supplied the rest). Includes their personal preferences block at the end (research-first, no invention, anti-AI-slop, visually verify everything, concise answers, respond in the user's language = Russian now).
- Silent working mode: no research dumps, no candidate lists, no intermediate "which direction do you like" questions. Report only blockers.
- No portfolio/case-study material. Final deliverable = ten runnable sites + a concise index (name, directory, run command, one-sentence concept, major tech, asset/licence note).
- The user (in Russian) asked for the work to be kept here and later asked to receive everything packed with its context so they can download it and continue.

## 2. What happened (timeline)
1. Network was initially blocked by the cloud environment's egress policy (reference studios, brand sites, CDNs). The user switched Network access to Full; everything opened except `awwwards.com` (egress-blocked; not routed around). One early probe through a third-party reader was a mistake and was stopped.
2. Built shared tooling: real-Chromium reference inspector, asset harvester, multi-viewport QA harness, comparison composer, GLB optimiser, process throttling (global browser pool, watchdog, reaper, autocommit).
3. Ran a large parallel swarm (references + brand scouts). Result: the account's usage limit was exhausted in minutes–hours, repeatedly (reset windows ~every 5h: 17:30, 22:30, 09:40, 14:40, 19:40 UTC). Container/worker restarts also killed running workflows several times. Lesson: depth-first, lean prompts, resumable stages, no periodic polling.
4. Selected the ten brands (see section 4) from ~45 probed candidates using real asset statistics and contact sheets.
5. Concept 01 Playdate: brand research + asset hunt completed (excellent). First reference set REJECTED by the Reference Quality Director with concrete reasons; round 2 produced many new reference entries (Kinoria, Polaroid i2, Sigma BF, OXI Instruments, Kasane keyboard, IYO, Lusion/Oryzo, etc.; see `00_GLOBAL/REFERENCE_LIBRARY/01--*`) and updated REFERENCES.md / REFERENCE_DNA.md, but the gate re-review, the three directions, the jury and the lock were cut off by the usage limit.
6. Concept 02 Ippodo: BRAND.md and a large set of assets collected; references/directions not done.
7. Concept 03 Hasselblad: BRIEF only.

## 3. Key decisions and why
- Ten brands chosen for visible diversity and real assets; lanes (colour/type/layout/motion/3D/nav/hero/signature) fixed in `SELECTED_TEN.md` to make the collection diverse by construction. Fashion not selected (no brand with obtainable assets).
- Depth-first order of work; lean gates: 3 direction authors + 3-judge jury, 2 evaluators per QA round with a deterministic router (code, not an agent), fresh Red Team and fresh Final Evaluator at release.
- Reference discipline: references must be genuinely opened (inspect-ref + screenshots viewed), then judged by a separate Reference Quality Director. Playdate's first set was rejected — this gate works; keep it.
- Assets: official logos/photos/models only; Playdate has an official GLB with a rigged crank (re-rigged from the site's public AR/WebGL data). No AI image generation exists in this environment: "generated" = procedural or processed official photography.
- Fonts: only legally shippable ones (Google Fonts via @fontsource, Fontshare, other open). Playdate's body font Roobert is commercial: substitute.
- Each site's footer carries a small colophon: independent concept, not affiliated; assets belong to owners.

## 4. The ten (details in `00_GLOBAL/SELECTED_TEN.md`)
01 Playdate · 02 Ippodo Tea · 03 Hasselblad · 04 Lakrids by Bülow · 05 Teenage Engineering · 06 Buly 1803 · 07 Treehotel · 08 Polestar (298 official transparent renders = real 360° spin) · 09 Kask · 10 Moooi.
Priority order = numbering. 3D/WebGL-led: Playdate, Lakrids, Ippodo (liquid shader), Hasselblad (image shaders), Treehotel (depth parallax). No scroll-controlled 3D object: the other five.

## 5. Current state per concept
- 01-playdate: BRAND.md, ASSET_SOURCES.md, ASSET_MANIFEST.md, assets/ (17 MB: brand SVGs, 13 transparent packshots, 9 hero images, 6 video clips, playdate.glb + usdz, textures), REFERENCES.md + REFERENCE_DNA.md (round 2, un-reviewed), `_work/REFERENCE_REVIEW.md` (RQD rejection of round 1 + required changes). NEXT: re-run the Reference Quality Director gate on the round-2 set; then directions A/B/C -> jury -> DIRECTION.md -> build -> QA.
- 02-ippodo: BRAND.md, assets/ (16 MB). NEXT: asset verdict/manifest (ASSET_SOURCES.md, ASSET_MANIFEST.md missing), references + gate, directions, jury, lock.
- 03–10: BRIEF.md exists only for 03; create 04–10 from SELECTED_TEN.md lanes when each starts.

## 6. Practical notes for the next session
- Tools: `_tools/inspect-ref.mjs`, `harvest.mjs`, `shoot.mjs`, `qa.sh`, `compare.mjs`, `optimize-glb.sh`, `serve.mjs`, `slot.mjs`. Workflows: `_tools/workflows/*.js` (concept-incubate has resume flags skipAssets/skipBrand/assetVerdict/refFeedback/skipRefs; concept-build; concept-qa; diversity-gate).
- Software WebGL (SwiftShader) is slow but correct; judge by screenshots. 4 CPUs: keep browser concurrency ≤3.
- Each concept dev port 5100+NN, QA port 5200+NN. Only the ECD runs git. `.gitignore` excludes third-party screenshots, harvest dumps, QA output.
- The same state is in GitHub branch `claude/10-brand-website-redesigns-wgoo21` (PR https://github.com/dintsen/htmlcourse/pull/1).
- If usage limits hit: stop launching agents; resume after the reset time quoted in the error; do cheap work in between (selection, md, planning).
