export const meta = {
  name: 'concept-incubate',
  description: 'One concept: brand research + real-asset hunt + reference set (RQD gate) + three directions + fresh five-judge jury + locked DIRECTION.md',
  phases: [
    { title: 'Foundations', detail: 'asset hunt || (brand research -> reference scout -> RQD gate loop)' },
    { title: 'Directions', detail: 'three independent authors: A, B, C' },
    { title: 'Jury', detail: 'five fresh judges; loop if research-again/restart' },
    { title: 'Lock', detail: 'synthesizer writes DIRECTION.md + fingerprint' },
  ],
}

const ROOT = '/home/user/htmlcourse'
const C = args // { nn, dirName, slug, name, url, category }
const DIR = `${ROOT}/concepts/${C.dirName}`
const LIB = `${ROOT}/00_GLOBAL/REFERENCE_LIBRARY`

const ECON = `ECONOMY (usage is rationed; waste is a defect): reuse existing artifacts on disk before running any tool; look at contact sheets and at most 3–5 full frames per source (images dominate context cost), never loop-read many images; keep every markdown file tight (roughly 300–700 words unless a file's spec demands more); do not re-read files you already read; do not narrate; stop as soon as the deliverable is complete and verified.`

const PRE = `You are a specialist in a design swarm building ten award-level, standalone website redesigns of real brands (independent speculative concepts for a designer's portfolio). ${ECON} FIRST read ${ROOT}/00_GLOBAL/SWARM_PROTOCOL.md completely, and the sections of ${ROOT}/00_GLOBAL/BRIEF.md relevant to your role. Your concept: #${C.nn} ${C.name} (${C.url}) — category: ${C.category}. Your concept directory (the ONLY place you write, apart from reference-library entries): ${DIR}. Binding concept brief with creative lane constraints and the territories you must NOT occupy: ${DIR}/BRIEF.md. The other lanes: ${ROOT}/00_GLOBAL/SELECTED_TEN.md and DIVERSITY_MATRIX.md.`

// ---------- schemas ----------
const ASSET_VERDICT = {
  type: 'object',
  properties: {
    logo: { type: 'object', properties: { vector: { type: 'boolean' }, file: { type: 'string' }, note: { type: 'string' } }, required: ['vector', 'note'] },
    heroGradeImages: { type: 'number' }, packshots: { type: 'number' }, videoClips: { type: 'number' },
    models3d: { type: 'array', items: { type: 'object', properties: { file: { type: 'string' }, source: { type: 'string' }, licence: { type: 'string' }, quality: { type: 'string' } }, required: ['file', 'source'] } },
    gaps: { type: 'array', items: { type: 'string' } },
    constraintsForDirection: { type: 'array', items: { type: 'string' } },
    blockers: { type: 'array', items: { type: 'string' } },
  },
  required: ['logo', 'heroGradeImages', 'packshots', 'models3d', 'gaps', 'constraintsForDirection'],
}
const RQD_SCHEMA = {
  type: 'object',
  properties: { verdict: { type: 'string', enum: ['REFERENCE SET APPROVED', 'REFERENCE SET REJECTED'] }, required: { type: 'array', items: { type: 'string' } }, reason: { type: 'string' } },
  required: ['verdict', 'reason'],
}
const DIR_SUMMARY = {
  type: 'object',
  properties: {
    key: { type: 'string' }, centralIdea: { type: 'string' }, dominantDevice: { type: 'string' }, oneScreenshotTest: { type: 'string' },
    scenes: { type: 'array', items: { type: 'string' } }, palette: { type: 'array', items: { type: 'string' } }, typeAttitude: { type: 'string' },
    navigation: { type: 'string' }, scrollModel: { type: 'string' }, heroComposition: { type: 'string' }, threeDPlan: { type: 'string' }, risk: { type: 'string' },
  },
  required: ['key', 'centralIdea', 'dominantDevice', 'scenes', 'palette', 'typeAttitude', 'navigation', 'scrollModel', 'heroComposition', 'threeDPlan', 'risk'],
}
const VOTE = {
  type: 'object',
  properties: {
    scores: { type: 'object', properties: { A: { type: 'number' }, B: { type: 'number' }, C: { type: 'number' } }, required: ['A', 'B', 'C'] },
    verdict: { type: 'string', enum: ['APPROVE_A', 'APPROVE_B', 'APPROVE_C', 'MERGE_AB', 'MERGE_AC', 'MERGE_BC', 'RESEARCH_AGAIN', 'RESTART'] },
    reasons: { type: 'string' }, mustFix: { type: 'array', items: { type: 'string' } },
  },
  required: ['scores', 'verdict', 'reasons', 'mustFix'],
}
const FINGERPRINT = {
  type: 'object',
  properties: {
    slug: { type: 'string' }, chosen: { type: 'string' }, centralIdea: { type: 'string' }, heroComposition: { type: 'string' }, navigation: { type: 'string' },
    scrollMechanic: { type: 'string' }, palette: { type: 'array', items: { type: 'string' } }, colourCharacter: { type: 'string' }, typeAttitude: { type: 'string' },
    threeDMechanic: { type: 'string' }, shaderEffect: { type: 'string' }, density: { type: 'string' }, photographyTreatment: { type: 'string' },
    signatureInteraction: { type: 'string' }, scenes: { type: 'array', items: { type: 'string' } }, techStack: { type: 'array', items: { type: 'string' } }, openRisks: { type: 'array', items: { type: 'string' } },
  },
  required: ['slug', 'chosen', 'centralIdea', 'heroComposition', 'navigation', 'scrollMechanic', 'palette', 'colourCharacter', 'typeAttitude', 'threeDMechanic', 'shaderEffect', 'density', 'photographyTreatment', 'signatureInteraction', 'scenes', 'techStack', 'openRisks'],
}

// ---------- prompts ----------
const brandPrompt = () => `${PRE}
ROLE: BRAND RESEARCHER. Write ${DIR}/BRAND.md — the factual foundation every later specialist relies on. Cover, with sources (URLs) for every factual claim: the brand's history and positioning; the real product line (exact product names, variants, specs, prices where public — copied from official pages, never invented); packaging and its design language; recent campaigns; visual identity (logo forms, colours WITH hex values taken from the real CSS/logo/packaging, typography used by the brand and its likely foundry/typeface identity, shape language, photography language, illustration, tone of voice, real taglines/copy snippets worth keeping); the existing website decomposed (structure, what works, what is wasted/weak, scroll/motion/tech fingerprint); competitors and how their sites feel; what the brand OWNS visually that a redesign must honour; what a redesign must avoid (brand clichés, legal/representation pitfalls). Open the real site with node ${ROOT}/_tools/inspect-ref.mjs <url> ${DIR}/_work/site-current --shots 10 --mshots 4 and look at the screenshots; open product pages too; use WebSearch for history/newsroom. Finish with a section 'REDESIGN HEADROOM' (candid, specific) and 'COPY BANK' (real copy lines/product facts safe to reuse, each with source). Return the handoff only.`

const assetPrompt = () => `${PRE}
ROLE: ASSET HUNTER. Acquire the real, official raw material for this brand's redesign and judge honestly whether it supports an expensive-looking site. Read BRIEF sections "REAL BRAND ASSETS", "BRAND ASSET RULE", "ASSET PRODUCTION IS PART OF THE TASK", "ASSET MANIFEST", "3D ASSET QUALITY", "3D MODEL QUALITY".
Method:
1. Inspect the official site, newsroom/press/media kit pages (try /press, /media, /newsroom, /brand, /brand-assets, /downloads, /about/press, press subdomains), campaign pages, product pages, public brand-guideline PDFs, public CDNs. Use node ${ROOT}/_tools/harvest.mjs <url> ${DIR}/_harvest/<name> --scroll 10 --links on MANY pages (home, 3–6 product pages, campaign/editorial pages, press pages). Read harvest.json and LOOK at the images (Read tool) — judge real quality, not file size. Request larger renditions through the site's own image-CDN parameters where the CDN exposes them (a normal public request; e.g. width params), and record the exact URL used.
2. LOGO: obtain the official vector logo (SVG from the page/DOM/press kit). Never redraw an available logo. If only raster exists, search harder (press kit, DOM, favicon/manifest, social resources); only as a last resort trace the official high-res raster faithfully (verify by overlaying against the original) and record it as 'traced from official raster'.
3. 3D: look for official GLB/USDZ/AR files on product pages (model-viewer, AR Quick Look, <model-viewer> src, network requests to .glb/.usdz), manufacturer press 3D/CAD, official brand Sketchfab accounts with downloadable permissive licences. Note licences. Open-licence libraries (Smithsonian Open Access, NASA 3D, Poly Haven, Khronos samples) only if genuinely relevant to the product. Convert/optimise with ${ROOT}/_tools/optimize-glb.sh and gltf-transform. Do NOT ship visibly cheap stand-ins for a recognisable product — if no suitable model exists say so plainly (the Image/3D directors will model a high-quality approximation later).
4. Curate: copy the genuinely usable finals into ${DIR}/assets/{brand,images,video,3d,textures} (create folders), optimised with sharp/ImageMagick (hero ≤ 2400px wide, WebP/AVIF/JPEG q≈80; keep PNG only where alpha is needed; transparent packshot cut-outs where the original has a clean background — GrabCut/threshold via OpenCV, verified at edge level). Keep raw dumps in _harvest (gitignored). Total assets budget ≈ 80 MB, no file > 25 MB. Videos: short loops only, H.264/WebM, compressed.
5. Write ${DIR}/ASSET_SOURCES.md (what was found where; an ASSET VERDICT section up top: hero-grade images count, packshots, video, models, logo status, gaps and exactly what must be produced procedurally, bot-block/licence notes) and ${DIR}/ASSET_MANIFEST.md in the protocol table format (mark everything final unless truly temporary; include the one-line © note at the top). Brand assets are © their owners, used for a non-commercial speculative concept.
Be honest: if the official material is too thin or locked for the lane in BRIEF.md, say so in constraintsForDirection (e.g. 'no large product photography → must be typographic/illustrative/procedural'). Return the structured verdict.`

const scoutPrompt = (feedback) => `${PRE}
ROLE: REFERENCE SCOUT. Select the 2–4 PRIMARY references for this concept, each contributing DIFFERENT DNA (e.g. A → typography, B → hero structure, C → navigation/interaction, D → 3D/product presentation), then recompose around this brand. Read BRIEF sections "REFERENCE MIXING", "REFERENCE ADMISSION TEST", "ACTUALLY OPEN REFERENCES", "USER-SUPPLIED REFERENCE DNA".
Resources: the shared library ${LIB}/ (each entry has REF.md + VERDICT.json from a Reference Quality Director; ${LIB}/INDEX.md if present). Start from entries with verdict PRIMARY/SECONDARY whose bestFor/dna matches this brand and lane (read ${DIR}/BRIEF.md and ${DIR}/BRAND.md if present). If the library lacks a strong match for a needed DNA, do your own additional research: find exceptional live sites (FWA, CSSDA, Codrops, studios, search), open each properly (node ${ROOT}/_tools/inspect-ref.mjs <url> ${LIB}/${C.nn}--<site> --shots 10 --mshots 4, view screenshots, write REF.md with the library headings: WHAT IT IS / WHY IT IS STRONG / COMPOSITION / TYPOGRAPHY (real font + legal alternative) / SPACING & GRID / MOTION & EASING / INTERACTION / MOBILE BEHAVIOUR / 3D-WEBGL / PHOTOGRAPHY & IMAGE TREATMENT / WHAT WE CAN ADOPT / WHAT TO REFUSE / BEST USED FOR / TECH FINGERPRINT).
Never admit a reference because it merely looked good in search or on Pinterest/Behance/Dribbble. Only references that meet the admission test and are at least competitive with the whitelist may be PRIMARY.
Write ${DIR}/REFERENCES.md (the 2–4 primaries + the DNA each supplies + why it suits this brand + screenshot paths) and ${DIR}/REFERENCE_DNA.md (CONCRETE decomposition per reference: type scale/proportions, hero structure, grid and spacing numbers, nav mechanism, scroll/transition technique, image treatment, what exactly we reproduce and what we refuse; plus the synthesis plan: how the primaries recombine around this brand without becoming a screen-by-screen copy).
${feedback ? 'THE REFERENCE QUALITY DIRECTOR REJECTED YOUR PREVIOUS SET. Required changes: ' + feedback + '\nResearch again; replace weak references; do not just re-argue.' : ''}
Return the handoff only.`

const rqdGatePrompt = () => `${PRE}
ROLE: REFERENCE QUALITY DIRECTOR (fresh; you do NOT design; you did not choose these references). Review ${DIR}/REFERENCES.md and ${DIR}/REFERENCE_DNA.md against the BRIEF's "REFERENCE QUALITY DIRECTOR" and "REFERENCE ADMISSION TEST". For each chosen primary: look at its screenshots in the library (Read tool) and its VERDICT.json/REF.md, and ask: is this actually exceptional? is the whole project strong or only one screenshot? useful DNA? strong typography? deliberate art direction? interaction that adds something? at least competitive with the whitelist (OBYS, Studio Freight, Studio Dumbar, AREA 17, Build in Amsterdam, BASIC/DEPT, Fourmeta, Cuberto, Unseen, Locomotive, Immersive Garden, Active Theory, Noomo, Basement)? Also: do the 2–4 references supply genuinely DIFFERENT DNA; do they suit THIS brand and lane; is there a screen-by-screen-copy risk; is the DNA decomposition concrete (numbers, mechanisms) or hand-wavy?
Verdict: 'REFERENCE SET APPROVED' or 'REFERENCE SET REJECTED' (with the exact required changes). Mediocre references must be rejected. Write your review to ${DIR}/_work/REFERENCE_REVIEW.md and return the verdict.`

const authorPrompt = (key, stance, verdict, feedback) => `${PRE}
ROLE: DIRECTION AUTHOR ${key} (one of three INDEPENDENT authors; you do not see the other two — do not try to; the point is genuinely different concepts). Read ${DIR}/BRIEF.md (lane = binding constraints; territories of the other nine = forbidden), ${DIR}/BRAND.md, ${DIR}/ASSET_SOURCES.md (ASSET VERDICT: what real material exists — your direction MUST be buildable with it plus procedurally producible assets; no direction may depend on assets that do not exist), ${DIR}/REFERENCES.md and ${DIR}/REFERENCE_DNA.md. Look at screenshots of the primary references and at the best harvested brand images (Read tool).
Asset verdict (data): ${JSON.stringify(verdict)}
YOUR CREATIVE STANCE (a starting axis, not a straitjacket; the concept must still be born from THIS brand): ${stance}
${feedback ? 'JURY FEEDBACK FROM A PREVIOUS ROUND (address it; a restart means a different concept, not a polish): ' + feedback : ''}
Write ${DIR}/_work/directions/DIRECTION_${key}.md with: (1) CENTRAL IDEA in ONE sentence; (2) the ONE dominant visual device and 'what makes this recognisable from a single screenshot'; (3) 4–6 art-directed scenes — for each: purpose, composition, typography behaviour, imagery used (real asset names), interaction, mobile re-interpretation (not just stacking), and how it differs from the scene before; (4) palette — 4–6 named hex colours with roles, derived from the real brand; (5) type direction (legal families to be confirmed; scale; contrast) ; (6) motion personality + ONE orchestrated signature moment (not fade-up everywhere); (7) imagery treatment — real assets vs procedural; (8) tech plan — scroll engine, DOM vs canvas, 3D/WebGL or deliberately none, and why; mobile plan; (9) ASCII wireframe of the first viewport at 1440×900 AND 390×844; (10) reference DNA mapping (which primary supplies what); (11) anti-slop self-check: logo-swap test, one-screenshot test, what you deleted; (12) risks. The direction must be a real art direction idea (e.g. 'a freezer-as-storefront', 'a running shoe explored like an aerospace object'), not a colour/font variant, and must stay inside the lane. A sophisticated typography-led site without 3D beats bad 3D. Return the structured summary.`

const juryLens = {
  art: 'ART DIRECTION JUDGE: originality, visual power, confidence, typography and composition potential, would this be Awwwards/FWA calibre, is it recognisable from one screenshot, does it feel expensive and authored rather than assembled.',
  interaction: 'INTERACTION JUDGE: quality, clarity and buildability of the signature interaction and navigation model; usability; mobile/touch interpretation; functional realism (no dead UI); does the interaction add meaning or is it a gimmick.',
  brand: 'BRAND JUDGE: does it honour AND elevate the real brand; would the brand\'s own creative director plausibly commission it; use of real product/identity/voice; any misrepresentation or cliché risk; does it make the brand feel intentionally redesigned.',
  tech: 'TECHNICAL / CREATIVE DEVELOPMENT JUDGE: can this be built to a high standard with Vite + web tech (GSAP/Lenis/Three.js/shaders) inside this environment (software-WebGL for QA), with the REAL assets in hand plus procedural ones; performance and mobile risk; every scene checked against the ASSET VERDICT; what will probably fail or look cheap.',
  differentiation: 'PORTFOLIO DIFFERENTIATION JUDGE: against the other nine lanes (SELECTED_TEN.md / DIVERSITY_MATRIX.md) and against the references: is it distinct; is any part a screen-by-screen copy; logo-swap test; does it risk generic AI-site aesthetics; does it deserve to sit beside the best of the other nine.',
}
const juryPrompt = (key) => `${PRE}
ROLE: ${juryLens[key]}
You are a FRESH evaluator. Read ${DIR}/_work/directions/DIRECTION_A.md, DIRECTION_B.md, DIRECTION_C.md (and BRIEF.md, ASSET_SOURCES.md, REFERENCES.md for context). Evaluate each direction SEPARATELY and demandingly (0–10; spread your scores; 7+ means genuinely strong). Verdict options: APPROVE_A / APPROVE_B / APPROVE_C / MERGE_AB / MERGE_AC / MERGE_BC (say exactly what to take from each in reasons) / RESEARCH_AGAIN / RESTART. Do not preserve a weak idea because research was expensive; RESEARCH_AGAIN or RESTART is right if none of the three would produce award-level work. List concrete mustFix items. Return the structured vote.`

const STANCES = {
  A: 'EDITORIAL / TYPOGRAPHIC-LED — the experience is a composed sequence where typography, photography and layout rhythm carry the idea (a title sequence, a lookbook, a catalogue, a poster system…), whatever suits this brand.',
  B: 'OBJECT / INTERFACE METAPHOR — the site becomes a tangible thing the visitor operates or inhabits (a mechanism, a machine, a shelf, a freezer, a lab bench, a dashboard of the product…): the interface IS the concept.',
  C: 'SPATIAL / CINEMATIC / COMPUTATIONAL — the experience is a world, scene, shader, 3D space or time-based film the visitor moves through (camera, light, material, depth, procedural image) — only if it truly serves the brand; otherwise the most radical image-led or kinetic-type alternative.',
}

// ---------- run ----------
phase('Foundations')
const [assetVerdict, refResult] = await parallel([
  () => (C.skipAssets ? Promise.resolve(C.assetVerdict) : agent(assetPrompt(), { label: `assets:${C.slug}`, phase: 'Foundations', schema: ASSET_VERDICT })),
  async () => {
    if (!C.skipBrand) await agent(brandPrompt(), { label: `brand:${C.slug}`, phase: 'Foundations' })
    let feedback = C.refFeedback || ''
    let verdict = null
    if (C.skipRefs) return { verdict: 'ECD-ACCEPTED', reason: C.skipRefs }
    for (let i = 0; i < 2; i++) {
      await agent(scoutPrompt(feedback), { label: `refscout:${C.slug}#${i + 1}`, phase: 'Foundations' })
      verdict = await agent(rqdGatePrompt(), { label: `refgate:${C.slug}#${i + 1}`, phase: 'Foundations', schema: RQD_SCHEMA, effort: 'high' })
      if (verdict && verdict.verdict === 'REFERENCE SET APPROVED') break
      feedback = verdict ? `${verdict.reason}\nRequired: ${(verdict.required || []).join('; ')}` : 'previous review failed; strengthen the set'
      log(`${C.slug}: reference set rejected (round ${i + 1})`)
    }
    return verdict
  },
])
log(`${C.slug}: assets verdict logo=${assetVerdict && assetVerdict.logo && assetVerdict.logo.vector} hero=${assetVerdict && assetVerdict.heroGradeImages} models=${assetVerdict && assetVerdict.models3d && assetVerdict.models3d.length}; refs ${refResult && refResult.verdict}`)

let finalVotes = null, decision = null
let feedback = ''
for (let round = 0; round < 3; round++) {
  phase('Directions')
  await parallel(['A', 'B', 'C'].map((k) => () => agent(authorPrompt(k, STANCES[k], assetVerdict, feedback), { label: `direction-${k}:${C.slug}${round ? '#' + (round + 1) : ''}`, phase: 'Directions', schema: DIR_SUMMARY })))
  phase('Jury')
  const votes = (await parallel(Object.keys(juryLens).map((k) => () => agent(juryPrompt(k), { label: `jury-${k}:${C.slug}${round ? '#' + (round + 1) : ''}`, phase: 'Jury', schema: VOTE, effort: 'high' })))).filter(Boolean)
  finalVotes = votes
  const again = votes.filter((v) => v.verdict === 'RESEARCH_AGAIN' || v.verdict === 'RESTART').length
  const mean = (k) => votes.reduce((s, v) => s + (v.scores[k] || 0), 0) / Math.max(1, votes.length)
  const means = { A: mean('A'), B: mean('B'), C: mean('C') }
  const best = Object.entries(means).sort((a, b) => b[1] - a[1])
  log(`${C.slug} jury round ${round + 1}: means ${JSON.stringify(means)} again=${again}/${votes.length}`)
  decision = { round: round + 1, means, againVotes: again, verdicts: votes.map((v) => v.verdict), best: best[0][0], second: best[1][0], gap: best[0][1] - best[1][1] }
  if (again >= 3 && round < 2) {
    feedback = votes.map((v) => `${v.verdict}: ${v.reasons} MUSTFIX: ${(v.mustFix || []).join('; ')}`).join('\n')
    continue
  }
  break
}

phase('Lock')
const fp = await agent(`${PRE}
ROLE: CONCEPT LEAD (synthesizer). You do NOT get to pick your preferred direction: the fresh jury decides. Jury result (data): ${JSON.stringify(decision)}; full votes: ${JSON.stringify(finalVotes)}.
Rule: if one direction leads clearly (gap ≥ 0.7 and most judges approve it) lock THAT direction; if the top two are close and ≥2 judges proposed a MERGE, lock the merge exactly as the judges described (say precisely what is taken from each); incorporate every mustFix. If the jury was still unconvinced after the allowed rounds, lock the best-scoring direction and list the weaknesses as OPEN RISKS to be attacked at build time.
Read ${DIR}/_work/directions/DIRECTION_A.md, B, C and the supporting files. Write:
 - ${DIR}/DIRECTION.md — the LOCKED creative plan the build team executes: central idea (one sentence), dominant visual device, 4–6 scenes (purpose, composition, typography behaviour, imagery with real asset filenames, interaction, mobile re-interpretation, acceptance criteria), palette (hex + roles), type direction, motion personality + signature moment, imagery plan (real vs procedural; what must be produced), tech plan (scroll engine, DOM/canvas, 3D/WebGL or none, mobile fallback), reference DNA mapping, anti-slop commitments, risks.
 - ${DIR}/JURY.md (votes, scores, decision, what was merged/rejected and why)
 - ${DIR}/STATUS.md (protocol format; STAGE: incubated) and ${DIR}/REVISION_LOG.md (first entry)
Return the fingerprint used by the Global Diversity Gate.`, { label: `lock:${C.slug}`, phase: 'Lock', schema: FINGERPRINT, effort: 'high' })

return { concept: C.dirName, assets: assetVerdict && { logoVector: assetVerdict.logo && assetVerdict.logo.vector, hero: assetVerdict.heroGradeImages, packshots: assetVerdict.packshots, models: (assetVerdict.models3d || []).length, gaps: assetVerdict.gaps }, refs: refResult && refResult.verdict, decision, fingerprint: fp }
