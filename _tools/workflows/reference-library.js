export const meta = {
  name: 'reference-library',
  description: 'Open and decompose reference websites in real Chromium; a fresh Reference Quality Director admits or rejects each one',
  phases: [
    { title: 'Research', detail: 'inspect live sites, scroll, screenshot, write REF.md' },
    { title: 'Admission', detail: 'fresh Reference Quality Director verdict per reference' },
  ],
}

const ROOT = '/home/user/htmlcourse'
const LIB = ROOT + '/00_GLOBAL/REFERENCE_LIBRARY'

const ENTRY = {
  type: 'object',
  properties: {
    slug: { type: 'string' }, url: { type: 'string' }, title: { type: 'string' },
    dir: { type: 'string' }, opened: { type: 'boolean' }, note: { type: 'string' },
  },
  required: ['slug', 'url', 'dir', 'opened'],
}
const RES_SCHEMA = {
  type: 'object',
  properties: { entries: { type: 'array', items: ENTRY }, blockers: { type: 'array', items: { type: 'string' } } },
  required: ['entries'],
}
const VERDICT_ITEM = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    verdict: { type: 'string', enum: ['PRIMARY', 'SECONDARY', 'REJECTED'] },
    total: { type: 'number' },
    dna: { type: 'array', items: { type: 'string' } },
    bestFor: { type: 'array', items: { type: 'string' } },
    realFont: { type: 'string' },
    legalFontAlternatives: { type: 'array', items: { type: 'string' } },
    reason: { type: 'string' },
  },
  required: ['slug', 'verdict', 'total', 'dna', 'bestFor', 'reason'],
}

const BATCH_SCHEMA = { type: 'object', properties: { verdicts: { type: 'array', items: VERDICT_ITEM } }, required: ['verdicts'] }

const PRE = `You are a specialist in a design swarm that will build ten award-level brand website redesigns. FIRST read ${ROOT}/00_GLOBAL/SWARM_PROTOCOL.md completely (environment facts, tools, hard rules, reference discipline). The authoritative user brief is ${ROOT}/00_GLOBAL/BRIEF.md (sections "ACTUALLY OPEN REFERENCES", "REFERENCE ADMISSION TEST", "REFERENCE QUALITY DIRECTOR", "TYPOGRAPHY FREEDOM", "PRIMARY REFERENCE UNIVERSE"). Shared reference library root: ${LIB}. awwwards.com is blocked at the egress proxy: do NOT try relays/readers/archives to reach it.`

const REF_HEADINGS = `WHAT IT IS / WHY IT IS STRONG / COMPOSITION / TYPOGRAPHY (real font, how identified, closest LEGAL alternative with source) / SPACING & GRID / MOTION & EASING (observed — say 'not verified' if only stills) / INTERACTION (cursor, hover, nav, sticky, transitions) / MOBILE BEHAVIOUR / 3D-WEBGL (what it is, how, which libs) / PHOTOGRAPHY & IMAGE TREATMENT / WHAT WE CAN ADOPT / WHAT TO REFUSE / BEST USED FOR (brand types) / TECH FINGERPRINT (libs, fonts, canvas, scroll engine)`

const ECON = `ECONOMY & REUSE (usage is rationed — waste is a defect): an earlier run was interrupted; artifacts may already exist on disk. Before running any tool for an entry, check ${LIB}/<slug>/inspect.json (and screenshots, contact sheets, REF.md). If they exist, DO NOT re-run inspect-ref: Read them and carry on (refine an existing REF.md rather than redoing it). Look at each entry's contact-d.jpg and contact-m.jpg plus at most 6 individual frames. Keep each REF.md to ~450–700 words of evidence-based notes. Do not re-read files you already read, do not narrate, do not re-verify things twice.`

const HOW = `HOW TO OPEN A SITE PROPERLY (mandatory, per entry):
1. node ${ROOT}/_tools/inspect-ref.mjs <url> ${LIB}/<slug> --shots 16 --mshots 8   (use --wait 9000 for slow preloaders). It writes screenshots d-*.jpg / m-*.jpg, contact-d.jpg, contact-m.jpg and inspect.json.
2. LOOK at contact-d.jpg and contact-m.jpg with the Read tool, then open individual frames that matter (hero, a mid-scroll frame, the most distinctive section, the footer, mobile hero). Read inspect.json (fonts, type scale, colours, libs, canvas/WebGL, network fonts/3D files).
3. For motion: node ${ROOT}/_tools/shoot.mjs --url <url> --out ${LIB}/<slug>/_timeline --viewports desktop --steps 6 --timeline 0,300,700,1200,2000,3200,5000  then view the t-*.jpg frames (intro/preloader/hero choreography). Hover frames d-hover-*.jpg show cursor/hover treatment.
4. Understand HOW it works: scroll engine (native / Lenis / virtual), whether the page is WebGL-driven, type system, grid, image crops, transitions. Identify the real font(s) from network font file names, @font-face rules and computed styles; name the closest legal alternative (Google Fonts / Fontshare / other open fonts) — never download or reuse the reference's own font files.
5. Write ${LIB}/<slug>/REF.md with exactly these headings: ${REF_HEADINGS}. Base every claim on evidence you actually saw; mark anything unverified as such. No flattery: also record weaknesses.
If a site does not open, record why in REF.md (opened=false) and do not invent anything.`

function researchPrompt(it) {
  let job
  if (it.kind === 'studio') {
    job = `TARGET: ${it.name} — ${it.url}. This is a QUALITY ANCHOR studio from the user's whitelist.
Entry 1 (slug "${it.slug}"): the studio's own site.
Then identify their up to 2 strongest LIVE client/product projects that are most useful for brand websites (prefer consumer / physical / product brands: food, drink, fashion, shoes, electronics, cars, beauty, hospitality, culture). Find them from the studio's work pages and via WebSearch; use the live site URLs (not Behance/Awwwards write-ups). Each gets its own entry with slug "${it.slug}--<project>" and the full treatment. If a project site is dead or blocked, say so and pick another.
${it.focus ? 'Specific focus: ' + it.focus : ''}`
  } else if (it.kind === 'dribbble') {
    job = `TARGET: ${it.name} — ${it.url} (Dribbble: static shots, not a live site). Run inspect-ref on the page for screenshots, AND use node ${ROOT}/_tools/harvest.mjs <url> ${LIB}/<slug>/_harvest --scroll 6 --links to download the actual shot images at full resolution; LOOK at the full-res images (Read tool). Choose the 3–4 strongest shots as separate entries (slug "${it.slug}--shotN"; dir under ${LIB}); decompose the visual system: grid, type (identify the real fonts as far as the image allows), colour logic, imagery, UI mechanics. Motion/interaction is 'not verified' unless a video/GIF is attached (harvest video). If an underlying live site/project for a shot exists, open it as its own entry.
${it.focus ? 'Specific focus: ' + it.focus : ''}`
  } else if (it.kind === 'awwwards-element') {
    job = `TARGET: the user supplied this Awwwards Inspiration element as reference DNA: ${it.url}. awwwards.com itself is egress-blocked, so you cannot open it and you must not route around that. Instead use WebSearch (several queries, extended mode if the first fails) to identify the studio/developer and the UNDERLYING live website or demo this element was built for (the slug "${it.name}" is a hint). If you can identify it with confidence, open that live site/demo as entry "${it.slug}". If you cannot identify it, return an entry with opened=false and note "UNRESOLVED" — never guess or fabricate what the element looked like.`
  } else {
    job = `TARGET: category scouting — "${it.name}". Find 6–8 EXCEPTIONAL, recent (prefer 2024–2026), LIVE websites for: ${it.focus}. Discovery sources (all open except Awwwards): FWA (thefwa.com — SOTD/SOTM/ SOTY archives and category pages), CSS Design Awards (cssdesignawards.com — WOTD/WOTM/WOTY), Codrops (tympanus.net/codrops, incl. the collective/inspiration posts), Dribbble, studio portfolios of the whitelist (OBYS, Studio Freight/Darkroom, Active Theory, Immersive Garden, Locomotive, Unseen, Cuberto, Noomo, Basement, Build in Amsterdam, BASIC/DEPT, AREA 17), plus WebSearch. Prefer brand/product/commerce/hospitality sites over agency portfolios; prefer full experiences (not one pretty hero). Log what you browsed and what you rejected (and why) in ${LIB}/_sources/${it.slug}.md. Each chosen site becomes an entry slug "${it.slug}--<site>" with the full treatment. Do NOT pick a site just because a thumbnail looked nice: open it and judge the whole experience.`
  }
  return `${PRE}\n\nROLE: REFERENCE RESEARCHER.\n${job}\n\n${ECON}\n\n${HOW}\n\nReturn the structured list of entries you produced (slug, url, title, dir (absolute), opened, note) plus any blockers. Keep your reply short — the detail lives in REF.md files.`
}

function rqdBatchPrompt(entries) {
  const list = entries.map((e) => `- ${e.slug} — ${e.url} — dir ${e.dir}`).join('\n')
  return `${PRE}

ROLE: REFERENCE QUALITY DIRECTOR (fresh evaluator; you do NOT design and you did NOT research these entries). Your only job: for EACH entry below decide whether it is genuinely exceptional enough to be a PRIMARY reference for award-level work, and what DNA it is good for. Be demanding: mediocre references are worse than none ('REFERENCE SET REJECTED' is the correct response to mediocre work).
ENTRIES:
${list}

${ECON}
Procedure per entry:
1. BEFORE reading its REF.md, look at <dir>/contact-d.jpg, <dir>/contact-m.jpg and up to 4 individual frames (Read tool). Write your raw first impression (3–6 plain sentences: expensive? memorable typography? confident composition? does mobile hold up?) to <dir>/RQD.md.
2. Then read REF.md and inspect.json; check the researcher's claims against the evidence.
3. Score the BRIEF's admission criteria 0–3 each: exceptional typography · excellent composition · coherent full experience (not one screenshot) · meaningful motion · strong art direction · respected studio OR clearly exceptional execution · useful interaction concept · useful responsive behaviour · strong photography or 3D · competitive with the whitelist (OBYS / Studio Freight / Active Theory / Immersive Garden / Locomotive / Unseen / Cuberto / Build in Amsterdam / BASIC-DEPT …). total = sum (max 30).
4. Verdict: PRIMARY (total ≥ 23, competitive with the whitelist across the board, not just one strong screenshot); SECONDARY (only strong for specific DNA — name exactly which: typography, hero, nav, transitions, cursor, 3d, product-presentation, motion, mobile, commerce, editorial, layout, imagery); REJECTED.
5. Write <dir>/VERDICT.json (verdict, total, scores, dna[], bestFor[] brand/product types, realFont, legalFontAlternatives[], reason).
Return all verdicts via the schema.`
}

phase('Research')
const items = args.items
log(`reference-library: ${items.length} research items`)
const results = await pipeline(
  items,
  (it) => agent(researchPrompt(it), { label: `research:${it.slug}`, phase: 'Research', schema: RES_SCHEMA }),
  (res, it) => {
    const opened = ((res && res.entries) || []).filter((e) => e.opened)
    log(`${it.slug}: ${opened.length}/${((res && res.entries) || []).length} entries opened`)
    if (!opened.length) return []
    return agent(rqdBatchPrompt(opened), { label: `rqd:${it.slug}`, phase: 'Admission', schema: BATCH_SCHEMA, effort: 'high' }).then((r) => (r && r.verdicts) || [])
  },
)
const flat = results.filter(Boolean).flat().filter(Boolean)
return {
  count: flat.length,
  primary: flat.filter((f) => f.verdict === 'PRIMARY').map((f) => f.slug),
  secondary: flat.filter((f) => f.verdict === 'SECONDARY').map((f) => f.slug),
  rejected: flat.filter((f) => f.verdict === 'REJECTED').map((f) => f.slug),
}
