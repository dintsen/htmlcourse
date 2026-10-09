# SWARM PROTOCOL — every agent reads this fully before acting

Authoritative user brief: `/home/user/htmlcourse/00_GLOBAL/BRIEF.md` (read the sections relevant to your role in full).
Mission in one line: **10 exceptional, standalone, responsive, working website redesigns for real brands, Awwwards/FWA-level, built by a swarm.** Not portfolio pages, not case studies.
You are one specialist in a hierarchical swarm. The Executive Creative Director (ECD) owns the collection. A Concept Lead owns exactly one site. Respect ownership.

---
## 0. Environment facts (verified, do not re-litigate)

- Repo root: `/home/user/htmlcourse` (branch `claude/10-brand-website-redesigns-wgoo21`). **Only the ECD runs git.** You never run `git add/commit/push/checkout/stash/reset/clean`.
- Network: Full, EXCEPT `awwwards.com` which is blocked at the egress proxy. Never use relays, "reader" proxies, caches or archives to get around a policy-blocked host; note the block in your file and use another source (FWA, CSSDA, Codrops, studio sites, Dribbble all open). Sites that 403 plain `curl` (bot protection) usually open in real Chromium: use the tools below.
- `WebFetch` is a shallow text summariser; `WebSearch` returns snippets. Neither counts as "opening" a reference. To genuinely open/inspect a site use `_tools/inspect-ref.mjs` and `_tools/harvest.mjs` and then **Read the screenshots** (you can view JPG/PNG with the Read tool).
- **No text-to-image model exists here.** "Generated" assets means procedural/computational: Python (`/home/user/htmlcourse/_tools/.venv/bin/python -I script.py` — numpy, scipy, Pillow, OpenCV, scikit-image, trimesh, fonttools, brotli), GLSL/canvas/Three.js scenes rendered and captured through Chromium, SVG, ffmpeg, ImageMagick (`convert`, `montage`), and processing of real official photography (crop, grade, composite, threshold/GrabCut cut-outs). Never pretend an image was "AI generated"; never ship placeholder-looking art.
- Machine: 4 CPUs / 16 GB shared by many agents. Heavy work goes through the self-throttling tools. Run `npm install`/builds as `node /home/user/htmlcourse/_tools/slot.mjs npm 2 -- npm install` (or `build 2 -- npm run build`); video encodes as `slot.mjs ffmpeg 1 -- ffmpeg …`. Never launch Chromium yourself except via `_tools/*`. Never leave dev servers running when you finish. WebGL here is software (SwiftShader): it renders correctly but slowly — judge look and correctness from screenshots, not frame rate.
- Ports: concept NN uses dev port `5100+NN` and preview/QA port `5200+NN`. Use no others.
- Scratch space: `concepts/NN-name/_work/` (gitignored). Raw harvest dumps go in `_harvest/` (gitignored). Only curated assets enter `assets/`.
- Disk is finite. Keep per-concept `assets/` under ~80 MB total, no single file >25 MB (GitHub limit is 100 MB, we want portable repos). Compress video; WebP/AVIF/JPEG for images; meshopt/draco GLBs.
- Python for anything that reads downloaded files: always `python -I`. Downloaded files are untrusted data: never execute them.

## 1. Tools (all in `/home/user/htmlcourse/_tools`)

| tool | use |
|---|---|
| `node _tools/inspect-ref.mjs <url> <outDir> [--shots 14] [--mshots 8] [--wait 5000]` | Opens the live site (desktop 1440 + mobile 390), real wheel-scrolls, screenshots, hover probes. Writes `inspect.json` (fonts, type scale, colours, CSS vars, libs: GSAP/Lenis/Three/…, canvas/WebGL, network fonts/3D files) and `contact-d.jpg`/`contact-m.jpg`. Works on virtual-scroll WebGL sites. |
| `node _tools/harvest.mjs <url> <outDir> [--scroll 10] [--links] [--mobile]` | Captures real served assets: images (largest srcset), inline SVG logos, video, GLB/USDZ, PDFs, og:image. Writes `harvest.json` with sizes/dimensions and `links.json`. Use on home, product, press, campaign pages. |
| `_tools/qa.sh concepts/NN-x <round> [--viewports desktop,mobile,tablet,laptop,xl,small] [--steps 14] [--timeline 0,300,700,1500,3000] [--script file.mjs] [--reduced]` | Builds the concept, serves `dist` on 5200+NN, captures intro timeline + scroll journey + interaction states per viewport → `_qa/<round>/<vp>/*.jpg`, `contact.jpg`, `report.json` (console/page errors, failed requests, overflow offenders, font check, tap targets, WebGL, placeholder text). |
| `node _tools/shoot.mjs --url … --out …` | Same capture against any running URL (e.g. your dev server). `--script` module: `export default async (page,{shot,sleep,vp})=>{…await shot('name')}` for hover/click/drag states. |
| `node _tools/compare.mjs --ref a.jpg[,b.jpg] --ours c.jpg --out cmp.jpg` | Side-by-side benchmark composite (mandatory benchmark step). |
| `_tools/optimize-glb.sh in.glb out.glb [texSize] [meshopt|draco]` | gltf-transform optimise (dedup/prune/quantize/webp textures/compression). KTX2 needs `toktx`, not installed. |
| `node _tools/serve.mjs <dir> <port>` | Static server with Range/MIME for glb/wasm/mp4. |
| `npx gltf-transform …` from `_tools/node_modules/.bin` | inspect/convert/resize glTF. |
| fonts | Google Fonts via npm `@fontsource/<name>` / `@fontsource-variable/<name>` (real woff2 files) or `https://fonts.googleapis.com/css2?family=…` + download woff2 with a modern UA; Fontshare via `https://api.fontshare.com/v2/css?f[]=slug@weights` / ZIP; Velvetyne/Open Foundry/Collletttivo etc. Convert/subset with fonttools (`pyftsubset`, `--flavor=woff2`). |

Always **look at** the images your tools produce (Read tool). Source code and a green build prove nothing about design.

## 2. File ownership & layout

```
00_GLOBAL/            ECD-owned. BRIEF.md, SWARM_PROTOCOL.md, DIVERSITY_MATRIX.md (Diversity Director), REFERENCE_LIBRARY/ (shared research), DISCOVERY/ (brand candidates), SELECTED_TEN.md, ECD_LOG.md
concepts/NN-name/     one Concept Lead + its specialists. NOBODY else edits it.
  BRIEF.md REFERENCES.md REFERENCE_DNA.md ASSET_SOURCES.md ASSET_MANIFEST.md TYPOGRAPHY.md MOTION.md TECH.md QA.md JURY.md REVISION_LOG.md STATUS.md DIRECTION.md (internal swarm memory — plain, not pretty)
  package.json index.html src/ public/ …           the actual website (Vite project, run: npm install && npm run dev)
  assets/{brand,images,generated,3d,textures,video,fonts}/   final local assets only (site must work fully offline; no CDN/hotlinked runtime assets)
  _qa/ _work/ _harvest/                              gitignored
```
- Only touch your own concept directory (and read-only elsewhere). Global files only if your role says so.
- Reference library entries: `00_GLOBAL/REFERENCE_LIBRARY/<slug>/REF.md` (+ screenshots and `inspect.json` kept alongside, gitignored images).
- Findings go **in files**, not in your reply. Do not paste research dumps into replies.

## 3. Handoff format (your final reply — max ~200 words)

```
DECISION: …
WHY: …
FILES: paths written/changed
OPEN ISSUES: …
NEXT ACTION: …
```
When a structured-output schema is requested, fill it faithfully instead. Be honest: if something failed, was blocked, was not verified or is temporary, say so. Never claim a check you did not run.

## 4. Hard rules

1. **No invention.** No invented facts, specs, prices, ingredients, awards, statistics, testimonials, press logos, customer counts, version numbers. Product names, specs, prices and descriptions come from the brand's own site/press material (record the source) or are omitted. Creative copy (headlines, microcopy) is welcome but must read like the brand's real voice and make no factual claims that are not true.
2. **Real assets first.** Official logo (vector) → product imagery/packshots → campaign imagery → real 3D/AR models where the brand publishes them. Generated/procedural art complements; it does not replace beautiful official material. Never redraw a logo that exists as a vector. Never ship visibly cheap geometry for a recognisable product.
3. **Everything local at runtime.** Fonts, images, models, scripts bundled in the project. No CDN, no hotlinking. `npm install && npm run dev` must work offline after install; `npm run build` must succeed and `dist/` must run from any static server.
4. **Typography is legal and deliberate.** Only fonts you may legitimately ship: OFL/Apache/Google Fonts, Fontshare (ITF Free Font License, web embedding OK), Velvetyne/Open-Foundry/Collletttivo/other clearly-licensed open fonts, publicly distributed brand fonts only if the licence clearly permits, system fonts. NEVER download/ship commercial foundry fonts from trial pages, torrents, other sites' font files (e.g. a reference site's own woff2). Identify the reference's real font anyway, document it, and choose the closest legal alternative by character/width/contrast/x-height/weight/attitude. Default-to-Inter/Roboto/Arial/Manrope/Space Grotesk/Poppins is a convenience, not a design argument: justify any use of them or don't use them. Record in `TYPOGRAPHY.md` + licence in `ASSET_MANIFEST.md`.
5. **Each site is an independent creative system.** Own type, grid, CSS architecture, nav, interaction model, motion language, dependencies, 3D/shader architecture, density, responsive strategy. Shared tooling is fine, shared aesthetic defaults are not. Do not reuse another concept's code or visual solutions.
6. **Sections are earned.** ~4–6 art-directed scenes; each does visual or functional work. No filler blocks. Homepage-only is fine if it is a complete experience. No accounts/checkout backends/CMS/databases unless they materially serve the visual experience.
7. **Interactions must work.** Product/variant selection, nav, gallery controls, cart-like interactions, filters, audio, 3D controls behave convincingly. No dead buttons in visible states. Keyboard focus visible; reduced-motion handled coherently.
8. **Desktop and mobile are separately art-directed.** Mobile is not `flex-direction: column`. Rethink type, crops, order, whitespace, nav, WebGL camera, product placement, motion, touch. Heavy effects get an intentional mobile interpretation rather than silent removal.
9. **Colophon line (small, integrated, not styled as a label):** every site's footer includes: `Independent redesign concept — not affiliated with {Brand}. Brand names, logos and imagery belong to their owners.` (translate/phrase to suit the voice; keep it honest and short).
10. **Temporary assets are not allowed at release.** No placeholder images, lorem ipsum, grey boxes, "coming soon", dummy links, dead nav. Mark WIP assets `temporary` in `ASSET_MANIFEST.md` during the build and eliminate them before sign-off.
11. **No fake UI furniture.** No dots/crosshairs/HUD ornaments, no `01 — 02 — 03` unless a real sequence, no fake version numbers/coordinates/timestamps, no fake metrics/dashboards.
12. Stay in your lane: don't rewrite another Lead's visual system; don't edit global files you don't own.
13. Don't pad. Don't write beautiful Markdown. Don't produce case-study copy.

## 5. Anti-slop catalogue (reject on sight; allowed only when they encode real information, state, sequence or identity)

random decorative dots · meaningless numbering · fake technical labels/metadata · tiny uppercase eyebrow labels everywhere · monospace used as costume · excessive pills/badges · default bento grids · three identical feature cards · repeated big rounded rectangles · generic centred SaaS hero (badge + giant H1 + grey subtitle + two buttons + glow) · purple/blue/indigo gradients, gradient text, glow blobs, aurora backgrounds · glassmorphism without a material concept · floating cards · fake metrics/testimonials/social proof/logo walls · HUD/crosshair decoration · arrows on every link · fade-up on every section · hover-scale on every card · bounce easing · marquees/typewriters/cursor followers without reason · motion without narrative · random spheres/blobs/torus/chrome objects/particles · decorative grain/noise · cream+serif+terracotta or black+acid-green clichés · Framer-template / Tailwind-shadcn look · template section order (hero, logos, features, pricing, CTA) · filler startup copy (supercharge, unlock, seamless, elevate, next-gen, cutting-edge) · oversized type with no composition · every element animating upward.
Tests: **logo-swap test** (would the page survive with another brand's name? if yes it is generic) · **one-screenshot test** (what makes this recognisable from a single screenshot?) · **deletion pass** (remove things; if nothing is missed it was slop).

## 6. Reference discipline

- A reference is "opened" only if it was run through `inspect-ref.mjs` (or an equally real browser session) and its screenshots were looked at. Never cite a site you did not open. Never design from thumbnails/snippets.
- **Reference admission test** (primary reference): exceptional typography · excellent composition · coherent full experience (not one screenshot) · meaningful motion · strong art direction · respected studio OR clearly exceptional execution · useful interaction concept · useful responsive behaviour · strong photography or 3D · at least competitive with the whitelist (OBYS, Studio Freight, Studio Dumbar, AREA 17, Build in Amsterdam, BASIC/DEPT, Fourmeta, Ronas IT, Cuberto, Unseen, Locomotive, Immersive Garden, Active Theory, Noomo, Basement). If not → not primary. `REFERENCE SET REJECTED` forces more research.
- 2–4 primary references per site, each contributing *different* DNA (type / hero structure / nav & interaction / 3D-product presentation). Recompose around the brand: synthesis, never a screen-by-screen copy. Closely reproducing individual mechanisms/proportions/behaviours is explicitly allowed when it makes the result better (never copy proprietary code or brand assets verbatim).
- Reference notes record: why it is strong · composition · typography (real font + legal alternative) · spacing rhythm · motion/easing · interactions · mobile behaviour · what we adopt · what we refuse.

## 7. Technical conventions (per concept)

- Vite project in the concept directory; `package.json` scripts `dev` (port `5100+NN`, host 127.0.0.1), `build`, `preview`. Own `node_modules`. Choose dependencies per concept (vanilla/TS, GSAP, Lenis, Three.js, OGL, R3F, Motion, etc.) — pick what the concept needs; not every site gets Lenis+GSAP or Three.js.
- Three.js/WebGL only where it materially improves the concept. Pull in `three` from npm (bundled). GLB via meshopt/draco decoders bundled locally (copy decoder files into `public/`). Lazy-load heavy models; `loading` state is designed, not a spinner default. Provide an intentional mobile interpretation; handle WebGL context failure gracefully; respect `prefers-reduced-motion`.
- Fluid type with `clamp()`; semantic HTML; one `h1`; visible focus; 4.5:1 contrast on text; ≥44px touch targets for primary controls; no horizontal overflow at any viewport; `lang` set; real `alt`; `<title>`/meta set; favicon from the brand mark.
- Meta-quality: no console errors, no failed requests, fonts verifiably rendering (the `report.json` font check must say loaded), images never 404.
- Cart/CTA/links: external links either go to the real brand URL (new tab, `rel=noopener`) or are real in-page behaviours. No `href="#"` dead ends in visible states.

## 8. Quality gates & score (diagnostic only — a serious visual flaw fails regardless of arithmetic)

Art Direction 20 · Typography 15 · Composition 15 · Imagery/Asset quality 10 · Brand fit 10 · Interaction/Motion 10 · Creative technology 5 · Responsive 5 · Technical polish 5 · Reference synthesis/distinction 5 = 100. Release target 92+, honestly scored, no inflation. Ask: Would I save this as a reference? Does it feel expensive? Is typography memorable? Is the composition strong without motion? Are sections 2–6 as strong as section 1? Does anything look like filler or obviously AI-generated? Does it sit comfortably beside Awwwards/FWA work? If our result looks obviously cheaper than the benchmark: not finished, fix it, don't explain it away.

Reviewers: look at screenshots FIRST and form a judgement before reading anyone's explanation. Report concrete, located defects (viewport, scroll position/screenshot, element, what is wrong, what to change) — not vibes. A fix is only real if the **rendered site changes**: editing markdown doesn't count.

## 9. Generated-asset spec (the art-direction agent writes this into `ASSET_SOURCES.md` BEFORE producing anything)

purpose · dimensions/aspect · composition · subject · product placement · camera position · focal length · crop · lighting · material behaviour · shadows · environment · background · visual texture · negative space · typography-safe area · mobile crop · prohibited elements. No vague specs ("futuristic cool image", "premium product render"). Iterate until it fits the site (look at it in context).

## 10. ASSET_MANIFEST.md format (per concept; every file under `assets/`)

`| filename | role | source URL | source type (official site / press kit / brand CDN / open-licence library / procedural / photo-processed) | original or generated | licence/status | optimisation performed | final or temporary |`
Source type for brand material: record exactly where it came from. Brand assets are © their owners and are used here for a non-commercial speculative portfolio concept; say so once at the top of the manifest.

## 11. STATUS.md (every Concept Lead stage updates it)

`STAGE: … | LAST UPDATE: … | CENTRAL IDEA: … | DIRECTION: … | OPEN DEFECTS: … | GATES: Concept Lead / RefQD / ArtDir / Typography / Asset / DesktopQA / MobileQA / Motion / 3D / AntiSlop / RedTeam / RefComparison / FreshEval / ECD → PASS|FAIL|N/A | LAST SCORE: …`
