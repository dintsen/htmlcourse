export const meta = {
  name: 'concept-qa',
  description: 'One concept: evaluator->optimizer loop (render, 5 fresh evaluators, router, specialist fixes) until gates pass; then fresh Red Team and fresh final evaluator',
  phases: [
    { title: 'Render', detail: 'build + multi-viewport capture' },
    { title: 'Evaluate', detail: 'screenshot-first visual QA, typography, motion/3D, anti-slop, reference benchmark' },
    { title: 'Route', detail: 'merge defects into work orders, decide pass/fail honestly' },
    { title: 'Fix', detail: 'specialists change the actual site' },
    { title: 'Release', detail: 'fresh Red Team + fresh final evaluator' },
  ],
}

const ROOT = '/home/user/htmlcourse'
const C = args // { nn, dirName, slug, name, url, category, startRound?, maxRounds? }
const DIR = `${ROOT}/concepts/${C.dirName}`
const QA_PORT = 5200 + parseInt(C.nn, 10)
const MAXR = C.maxRounds || 12
let round = C.startRound || 1

const DEFECT = {
  type: 'object',
  properties: {
    id: { type: 'string' }, severity: { type: 'string', enum: ['critical', 'major', 'minor'] },
    owner: { type: 'string', enum: ['developer', 'typography', 'imagery', 'threeD', 'motion'] },
    where: { type: 'string' }, what: { type: 'string' }, fix: { type: 'string' },
  },
  required: ['id', 'severity', 'owner', 'where', 'what', 'fix'],
}
const EVAL = {
  type: 'object',
  properties: {
    verdicts: { type: 'array', items: { type: 'object', properties: { gate: { type: 'string' }, verdict: { type: 'string', enum: ['PASS', 'FAIL', 'N/A'] }, why: { type: 'string' } }, required: ['gate', 'verdict', 'why'] } },
    scores: { type: 'object', properties: { artDirection: { type: 'number' }, typography: { type: 'number' }, composition: { type: 'number' }, imagery: { type: 'number' }, brandFit: { type: 'number' }, interactionMotion: { type: 'number' }, creativeTech: { type: 'number' }, responsive: { type: 'number' }, technical: { type: 'number' }, synthesis: { type: 'number' } } },
    defects: { type: 'array', items: DEFECT },
    summary: { type: 'string' },
  },
  required: ['verdicts', 'defects', 'summary'],
}
const ROUTE = {
  type: 'object',
  properties: {
    pass: { type: 'boolean' }, score: { type: 'number' },
    gates: { type: 'array', items: { type: 'object', properties: { gate: { type: 'string' }, verdict: { type: 'string' } }, required: ['gate', 'verdict'] } },
    workOrders: { type: 'array', items: { type: 'object', properties: { owner: { type: 'string', enum: ['developer', 'typography', 'imagery', 'threeD', 'motion'] }, items: { type: 'array', items: { type: 'string' } } }, required: ['owner', 'items'] } },
    summary: { type: 'string' },
  },
  required: ['pass', 'score', 'gates', 'workOrders', 'summary'],
}
const RENDER = { type: 'object', properties: { ok: { type: 'boolean' }, outDir: { type: 'string' }, notes: { type: 'string' } }, required: ['ok', 'notes'] }

const PRE = `You are a specialist in a design swarm building ten award-level, standalone website redesigns of real brands (independent speculative concepts for a designer's portfolio; target: Awwwards/FWA/CSSDA calibre). Read ${ROOT}/00_GLOBAL/SWARM_PROTOCOL.md first (skim sections 0–2, read 4, 5, 8 fully). Concept #${C.nn} ${C.name}, directory ${DIR}. Dev/QA port ${QA_PORT}. Never run git. Never trust source code as proof of quality: judge what is RENDERED. Be demanding and honest; do not inflate scores; a serious visual flaw fails the site even if the arithmetic is high. A reviewer's defects must be CONCRETE and LOCATED: viewport + screenshot filename (or scroll position) + element + what is wrong + exactly what to change + which specialist owns it (developer | typography | imagery | threeD | motion). Severity: critical = broken/ugly/embarrassing, would disqualify; major = clearly below award standard; minor = polish.`

const evalPrompt = (key, r) => {
  const qa = `${DIR}/_qa/r${r}`
  const common = `Captures for this round are in ${qa}/<viewport>/ (t-*.jpg = intro timeline, s-*.jpg = scroll journey, state-*.jpg = interaction states, contact.jpg = tiled overview; report.json = console/network/overflow/font/tap-target audit). Viewports in loop rounds: desktop 1440 and mobile 390 (the FINAL capture adds xl 1920, laptop 1280, tablet 820, small 360). Look at the contact sheets first, then the individual frames that matter (Read tool).`
  const lens = {
    visual: `ROLE: VISUAL QA (screenshot-first). ${common}
STEP 1 — BEFORE reading any markdown in the concept folder, look at the screenshots and write your raw, unprompted judgement to ${qa}/visualqa-raw.md: Would I save this as a reference? Does it look professionally art-directed and expensive? Is typography memorable? Is the composition strong WITHOUT motion? Are sections 2–6 as strong as section 1? Does anything look like filler or obviously AI-generated? Does the brand feel intentionally redesigned? Would it sit comfortably beside high-quality Awwwards/FWA work? Check desktop (xl/desktop/laptop), tablet and mobile (mobile/small) — is mobile genuinely re-art-directed or just stacked? Check imagery/asset quality (resolution, edges/halos on cut-outs, crops, colour grading, logo fidelity), spacing, hierarchy, alignment, overflow, clipped text, broken layouts, empty areas.
STEP 2 — only then read ${DIR}/DIRECTION.md and compare the rendered result to the locked plan and acceptance criteria. Gates to return verdicts for: 'Desktop Visual QA', 'Mobile Visual QA', 'Asset Quality', 'Art Direction'. Provide scores for every rubric field.`,
    typography: `ROLE: TYPOGRAPHY REVIEWER. ${common} Also read ${DIR}/TYPOGRAPHY.md and report.json (fonts, fontsFailed, h1Font*). Inspect: the ACTUAL rendered font vs intended (fallback failures!), font loading/FOUT, x-height, leading, tracking, headline line breaks (orphans/widows/ugly rags), mobile wrapping, optical spacing, paragraph measure, button labels, nav typography, numerals, hierarchy and scale contrast, contrast ratio of text over imagery. Reject generic typography: a technically correct implementation can still be visually poor. Compare against the primary references' typography (${DIR}/REFERENCES.md, screenshots in ${ROOT}/00_GLOBAL/REFERENCE_LIBRARY/). Gate: 'Typography'.`,
    motion: `ROLE: MOTION / INTERACTION / 3D-WEBGL REVIEWER. ${common} Judge motion from OBSERVATION, not intent: the intro timeline frames (t-*.jpg), scroll-journey frames (are intermediate states beautiful or broken?), state-*.jpg. Capture additional intermediate states yourself where needed (node ${ROOT}/_tools/shoot.mjs --url http://127.0.0.1:${QA_PORT} … requires the site to be served: start node ${ROOT}/_tools/serve.mjs ${DIR}/dist ${QA_PORT} in the background and kill it after; or write a --script that scrolls/hovers/clicks to specific states). Read ${DIR}/MOTION.md and TECH.md and the source to check eases/durations/engine use. Reject: identical reveals everywhere, over-easing, slow animation that obstructs use, gratuitous parallax, smooth-scroll gimmicks, motion masking weak layout, animation on every object; check dead buttons and broken interactions (click everything important; keyboard path; reduced-motion capture r${r}-reduced if present at ${DIR}/_qa/r${r}-reduced). If the site uses 3D/WebGL judge it independently: would the site be stronger without it? does it communicate product/brand character? are materials believable, lighting considered, camera authored, model expensive-looking? does mobile degrade gracefully? Gates: 'Motion/Interaction QA' and '3D/WebGL QA' (N/A if none).`,
    slop: `ROLE: ANTI-SLOP DIRECTOR. ${common} Read BRIEF "ANTI-SLOP DIRECTOR"/"ANTI-SLOP REVIEW" and SWARM_PROTOCOL §5. Inspect every viewport for: random decorative dots, meaningless numbers/numbering, unnecessary UI labels/eyebrows, fake technical diagrams/metadata, purple/AI gradients, default glass cards, card grids without reason, random grain, fake statistics, generic bento, glowing blobs, random floating objects, meaningless particles, excessive rounded corners/pills, generic startup copy, template section order, generic Tailwind/shadcn appearance, repeated upward fades, HUD ornaments, arrows on every link. Also the logo-swap test, the one-screenshot test, and a deletion pass (what could be removed with no loss). Anything AI-generic must be removed or redesigned. Gate: 'Anti-Slop'.`,
    benchmark: `ROLE: REFERENCE BENCHMARK EVALUATOR. ${common} Read ${DIR}/REFERENCES.md. For each primary reference choose representative states (hero, a mid-scroll key section, the signature interaction/nav, mobile hero) from its library screenshots (${ROOT}/00_GLOBAL/REFERENCE_LIBRARY/<slug>/d-*.jpg, m-*.jpg, contact sheets) and the MATCHING states from our captures; build side-by-side composites with node ${ROOT}/_tools/compare.mjs --ref <ref.jpg> --ours <ours.jpg> --out ${qa}/benchmark/<name>.jpg and LOOK at them. Judge: type, scale, composition, photography/image quality, spacing, contrast, hierarchy, detail, interaction, motion ambition, visual confidence. If our version looks obviously cheaper, that is a FAIL: do not explain the weakness away — name it. Gate: 'Reference Comparison'.`,
  }
  lens.design = lens.visual + '\n\nALSO YOU ARE THE TYPOGRAPHY REVIEWER (gate \'Typography\'):\n' + lens.typography
  lens.craft = lens.motion + '\n\nALSO YOU ARE THE ANTI-SLOP DIRECTOR (gate \'Anti-Slop\'):\n' + lens.slop + '\n\nALSO YOU ARE THE REFERENCE BENCHMARK EVALUATOR (gate \'Reference Comparison\'):\n' + lens.benchmark
  return `${PRE}\n${lens[key]}\nProvide scores for ALL rubric fields (artDirection/20, typography/15, composition/15, imagery/10, brandFit/10, interactionMotion/10, creativeTech/5, responsive/5, technical/5, synthesis/5), honestly and unflatteringly. Return the structured evaluation (verdicts for your gates, scores for the rubric fields you can judge, concrete defects, a short summary).`
}

const renderPrompt = (r) => `${PRE}
ROLE: RENDER OPERATOR. Produce the capture set for QA round ${r}. Run, from ${ROOT}:
 1) ${ROOT}/_tools/qa.sh ${DIR} r${r} --viewports desktop,mobile --steps 14 --timeline 0,400,900,1600,2600,4000 --script ${DIR}/qa-states.mjs   (omit --script if qa-states.mjs does not exist). Use a long Bash timeout (≥ 590000 ms) or run it in the background and wait: capture on a shared 4-core box can take many minutes and may sit in a queue.
 2) ${ROOT}/_tools/qa.sh ${DIR} r${r}-reduced --viewports desktop --steps 6 --reduced
If the build fails or the capture crashes, read the error, and report it precisely (do not fix the site — fixing is another specialist's job — except for trivially broken tooling arguments). Confirm the output folders exist and contain jpgs and report.json; summarise report.json headline numbers (console errors, failed requests, overflow, fonts failed, tap targets, placeholders). Return ok + notes.`

const routePrompt = (r, evals) => `${PRE}
ROLE: DEFECT ROUTER / QA LEAD (you are not the designer). Round ${r}. Five fresh evaluators returned (data): ${JSON.stringify(evals)}.
Also read ${DIR}/_qa/r${r}/*/report.json headline numbers and look at the contact sheets yourself (Read tool) to sanity-check the evaluators — do not simply average them. Tasks: (1) merge duplicate defects, drop false alarms with a reason, keep every real critical/major defect; (2) decide each release gate honestly: 'Desktop Visual QA','Mobile Visual QA','Typography','Asset Quality','Motion/Interaction QA','3D/WebGL QA','Anti-Slop','Reference Comparison','Art Direction' (PASS only if no critical/major defect remains in it); (3) give an honest overall score /100 using the rubric (Art Direction 20, Typography 15, Composition 15, Imagery/Asset quality 10, Brand fit 10, Interaction/Motion 10, Creative technology 5, Responsive 5, Technical polish 5, Reference synthesis/distinction 5) — release target 92+, no inflation; (4) pass=true ONLY if every gate is PASS/N/A, there are no critical/major defects, and the score is ≥ 92; (5) produce WORK ORDERS grouped by owner (developer | typography | imagery | threeD | motion): each item concrete, located, and actionable, in priority order, written so a specialist can act without re-reading the evaluations. If the site is structurally weak (a concept problem that polish cannot fix) say so in the summary and name what would have to change. Write ${DIR}/QA.md (append a round section: gates, score, defects, work orders) and update the GATES/LAST SCORE lines in ${DIR}/STATUS.md. Return the structured routing.`

const fixPrompt = (owner, items, r) => {
  const roles = {
    developer: 'CREATIVE DEVELOPER',
    typography: 'TYPOGRAPHY DIRECTOR (fix the actual type system in the site: fonts files/CSS tokens/line breaks/rendering — then verify rendered result)',
    imagery: 'IMAGE ART DIRECTOR (fix/produce the actual image assets and wire any crops/paths; update manifest)',
    threeD: '3D / WEBGL DIRECTOR (fix the actual model/materials/lighting/camera/scene code and mobile fallback)',
    motion: 'MOTION DIRECTOR (fix the actual choreography/eases/timings/transitions in code)',
  }
  return `${PRE}
ROLE: ${roles[owner]}. QA round ${r} produced work orders for you. Read ${DIR}/DIRECTION.md, the relevant md (TYPOGRAPHY.md/MOTION.md/TECH.md/ASSET_MANIFEST.md), QA.md (latest section) and the source. The rendered site must actually CHANGE — editing markdown does not fix anything. For each item: locate it in the captures (${DIR}/_qa/r${r}/), implement the fix in the real code/assets, then verify visually: re-run ${ROOT}/_tools/qa.sh ${DIR} r${r}-fix-${owner} --viewports desktop,mobile (add --script ${DIR}/qa-states.mjs if present; long Bash timeout) and LOOK at the affected frames. Do not introduce regressions elsewhere; keep within the locked direction (if an item cannot be fixed within it, say why and propose the nearest sound fix in REVISION_LOG.md). WORK ORDERS (priority order):\n${items.map((t, i) => `${i + 1}. ${t}`).join('\n')}\nAppend what you changed to ${DIR}/REVISION_LOG.md. Return a handoff (DECISION / WHY / FILES / OPEN ISSUES / NEXT ACTION).`
}

const redTeamPrompt = (r) => `${PRE}
ROLE: ADVERSARIAL RED TEAM (fresh; you did not build or review this site). Your job: find reasons this site should NOT enter the final set of ten. Captures: ${DIR}/_qa/r${r}/<viewport>/ (all viewports, intro timeline, scroll journey, states) and ${DIR}/_qa/r${r}-reduced. You may serve ${DIR}/dist on ${QA_PORT} (node ${ROOT}/_tools/serve.mjs ${DIR}/dist ${QA_PORT}, background, kill after) and capture more with shoot.mjs scripts to probe interactions, odd viewports (320, 430, 768, 1024, 1920+) and states. Read ${DIR}/REFERENCES.md and the references' screenshots in ${ROOT}/00_GLOBAL/REFERENCE_LIBRARY/. Actively hunt for: weak sections hidden beneath a good hero; obvious copied compositions (screen-by-screen resemblance to a reference); bad synthesis of references; cheap AI-looking imagery; cheap 3D; responsive compromises; poor spacing/alignment; inconsistent typography; technical failures (console errors, 404s, layout shift, jank, WebGL failure handling); overdesign; underdesign; brand mismatch/misrepresentation; dead buttons; placeholder content; fake claims. Return concrete defects (severity critical/major/minor, owner, where, what, fix) and verdict 'Red Team' PASS only if you could not find a critical/major defect after a genuinely adversarial effort.`

const finalPrompt = () => `${PRE}
ROLE: FRESH FINAL EVALUATOR. You did NOT participate in production and you have seen no previous scores. Inputs: final captures in ${DIR}/_qa/final/ (viewports xl, desktop, laptop, tablet, mobile, small; intro timeline; scroll journey; interaction states), the primary references (${DIR}/REFERENCES.md + screenshots under ${ROOT}/00_GLOBAL/REFERENCE_LIBRARY/<slug>/), and the rubric (SWARM_PROTOCOL §8). DO NOT read QA.md, STATUS.md, JURY.md, REVISION_LOG.md or any earlier score. Judge as a juror at Awwwards/FWA would: art direction, typography, composition, imagery/asset quality, brand fit, interaction/motion, creative technology, responsive quality, technical polish, reference synthesis/distinction. Score honestly /100 (target 92+); any serious visual flaw fails regardless. Verdicts: 'Fresh Final Evaluation' (PASS/FAIL) and 'Art Direction' (PASS/FAIL). List concrete defects. If you would not save this as a reference, FAIL it.`

const runShots = async (name) => {
  return agent(`${PRE}
ROLE: RENDER OPERATOR. Produce the FINAL capture set into ${DIR}/_qa/${name}: ${ROOT}/_tools/qa.sh ${DIR} ${name} --viewports xl,desktop,laptop,tablet,mobile,small --steps 16 --timeline 0,300,700,1200,2000,3200,5000 --script ${DIR}/qa-states.mjs (omit --script if absent; long Bash timeout ≥ 590000 ms or background+wait). Confirm images and report.json exist. Return ok + notes.`, { label: `render:${C.slug}:${name}`, phase: 'Render', schema: RENDER, effort: 'low' })
}


function routeLocal(evals) {
  const defects = evals.flatMap((e) => e.defects || [])
  const gates = []
  for (const e of evals) for (const v of e.verdicts || []) gates.push({ gate: v.gate, verdict: v.verdict })
  const fields = ['artDirection', 'typography', 'composition', 'imagery', 'brandFit', 'interactionMotion', 'creativeTech', 'responsive', 'technical', 'synthesis']
  let score = 0
  for (const f of fields) {
    const vals = evals.map((e) => e.scores && e.scores[f]).filter((v) => typeof v === 'number')
    score += vals.length ? Math.min(...vals) : 0
  }
  const blocking = defects.filter((d) => d.severity !== 'minor')
  const failed = gates.some((g) => g.verdict === 'FAIL')
  const byOwner = {}
  for (const d of [...blocking, ...defects.filter((d) => d.severity === 'minor')]) (byOwner[d.owner] = byOwner[d.owner] || []).push(`[${d.severity}] ${d.where}: ${d.what} -> ${d.fix}`)
  return {
    pass: !failed && blocking.length === 0 && score >= 92, score, gates,
    workOrders: Object.entries(byOwner).map(([owner, items]) => ({ owner, items })),
    summary: `${blocking.length} blocking defects, ${defects.length - blocking.length} minor; failed gates: ${gates.filter((g) => g.verdict === 'FAIL').map((g) => g.gate).join(', ') || 'none'}`,
  }
}

// ---------------- main loop ----------------
const history = []
let released = false
let status = 'RUNNING'
let pendingRelease = false

while (round <= MAXR && !released) {
  phase('Render')
  const rr = await agent(renderPrompt(round), { label: `render:${C.slug}:r${round}`, phase: 'Render', schema: RENDER, effort: 'low' })
  let evals = []
  if (!rr || !rr.ok) {
    log(`${C.slug} r${round}: render failed: ${rr && rr.notes}`)
    // route a developer fix for the build/capture failure
    const fixed = await agent(fixPrompt('developer', [`The build or capture failed in round ${round}: ${rr ? rr.notes : 'render operator died'}. Make the site build and run cleanly (npm install && npm run build must succeed, the page must load without crashing), then confirm with qa.sh.`], round), { label: `fix:${C.slug}:developer:r${round}`, phase: 'Fix' })
    round++
    continue
  }
  phase('Evaluate')
  evals = (await parallel(['design', 'craft'].map((k) => () => agent(evalPrompt(k, round), { label: `eval-${k}:${C.slug}:r${round}`, phase: 'Evaluate', schema: EVAL, effort: 'high' })))).filter(Boolean)
  phase('Route')
  const route = routeLocal(evals)
  history.push({ round, score: route && route.score, pass: route && route.pass })
  log(`${C.slug} r${round}: score ${route && route.score} pass=${route && route.pass}; work orders ${route && route.workOrders.map((w) => w.owner + ':' + w.items.length).join(' ')}`)
  if (route && route.pass) {
    // ---- release stage: fresh red team, then fresh final evaluator ----
    phase('Release')
    const rt = await agent(redTeamPrompt(round), { label: `redteam:${C.slug}:r${round}`, phase: 'Release', schema: EVAL, effort: 'high' })
    const rtBad = rt ? rt.defects.filter((d) => d.severity !== 'minor') : []
    if (rtBad.length) {
      log(`${C.slug} r${round}: red team found ${rtBad.length} critical/major defects — reopening`)
      const byOwner = {}
      for (const d of rtBad) (byOwner[d.owner] = byOwner[d.owner] || []).push(`[${d.severity}] ${d.where}: ${d.what} → ${d.fix}`)
      phase('Fix')
      for (const owner of ['imagery', 'typography', 'threeD', 'motion', 'developer']) {
        if (byOwner[owner]) await agent(fixPrompt(owner, byOwner[owner], round), { label: `fix:${C.slug}:${owner}:r${round}rt`, phase: 'Fix' })
      }
      round++
      continue
    }
    const fr = await runShots('final')
    if (!fr || !fr.ok) { round++; continue }
    const fin = await agent(finalPrompt(), { label: `final-eval:${C.slug}`, phase: 'Release', schema: EVAL, effort: 'max' })
    const finBad = fin ? fin.defects.filter((d) => d.severity !== 'minor') : []
    const finFail = !fin || fin.verdicts.some((v) => v.verdict === 'FAIL') || finBad.length > 0
    if (finFail) {
      log(`${C.slug}: fresh final evaluator rejected — reopening (${finBad.length} defects)`)
      const byOwner = {}
      for (const d of finBad) (byOwner[d.owner] = byOwner[d.owner] || []).push(`[${d.severity}] ${d.where}: ${d.what} → ${d.fix}`)
      phase('Fix')
      for (const owner of ['imagery', 'typography', 'threeD', 'motion', 'developer']) {
        if (byOwner[owner]) await agent(fixPrompt(owner, byOwner[owner], round), { label: `fix:${C.slug}:${owner}:r${round}fe`, phase: 'Fix' })
      }
      round++
      continue
    }
    released = true
    status = 'RELEASE-CANDIDATE'
    break
  }
  // ---- not passed: fix by specialist, in a sensible order ----
  phase('Fix')
  const wo = route ? route.workOrders : []
  for (const owner of ['imagery', 'typography', 'threeD', 'motion', 'developer']) {
    const w = wo.find((x) => x.owner === owner)
    if (w && w.items.length) await agent(fixPrompt(owner, w.items, round), { label: `fix:${C.slug}:${owner}:r${round}`, phase: 'Fix' })
  }
  // stagnation: no meaningful improvement for 3 consecutive rounds
  if (history.length >= 4) {
    const last = history.slice(-4).map((h) => h.score || 0)
    if (Math.max(last[1], last[2], last[3]) - last[0] < 2) { status = 'STAGNANT'; log(`${C.slug}: score stagnant ${last.join(',')} — recommend restart`); break }
  }
  round++
}
if (!released && status === 'RUNNING') status = round > MAXR ? 'EXHAUSTED' : status
return { concept: C.dirName, status, released, rounds: history }
