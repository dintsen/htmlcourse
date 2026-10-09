export const meta = {
  name: 'brand-scouts',
  description: 'Category scouts nominate and probe real brands (asset availability, current site, redesign upside) and score them',
  phases: [{ title: 'Scout', detail: 'probe real assets, score 10 criteria, write candidate files' }],
}

const ROOT = '/home/user/htmlcourse'
const DISC = ROOT + '/00_GLOBAL/DISCOVERY'

const SCORES = {
  type: 'object',
  properties: Object.fromEntries(['assets', 'distinct', 'artDirection', 'typography', 'motion', 'threeD', 'imageAvail', 'redesign', 'culture', 'differentiation'].map((k) => [k, { type: 'number' }])),
  required: ['assets', 'distinct', 'artDirection', 'typography', 'motion', 'threeD', 'imageAvail', 'redesign', 'culture', 'differentiation'],
}
const CAND = {
  type: 'object',
  properties: {
    slug: { type: 'string' }, name: { type: 'string' }, url: { type: 'string' }, category: { type: 'string' },
    scores: SCORES, total: { type: 'number' },
    heroImagesFound: { type: 'number' }, vectorLogo: { type: 'boolean' }, logoNote: { type: 'string' },
    officialModelFound: { type: 'boolean' }, pressKitUrl: { type: 'string' },
    hunch: { type: 'string' }, risks: { type: 'array', items: { type: 'string' } }, openedLive: { type: 'boolean' },
  },
  required: ['slug', 'name', 'url', 'category', 'scores', 'total', 'heroImagesFound', 'vectorLogo', 'hunch', 'risks', 'openedLive'],
}
const SCHEMA = { type: 'object', properties: { candidates: { type: 'array', items: CAND }, dropped: { type: 'array', items: { type: 'string' } } }, required: ['candidates'] }

function prompt(it) {
  return `You are a BRAND SCOUT in a design swarm that will build ten award-level website redesigns for real, existing brands/products (independent speculative redesigns for a designer's portfolio). FIRST read ${ROOT}/00_GLOBAL/SWARM_PROTOCOL.md completely, then the BRIEF sections "BRAND DISCOVERY", "FORCE CATEGORY DIVERSITY", "REAL BRAND ASSETS", "INITIAL DISCOVERY SWARM", "DESIRED COLLECTION DIVERSITY" in ${ROOT}/00_GLOBAL/BRIEF.md.

YOUR CATEGORY: ${it.name}
Focus: ${it.focus}

ECONOMY & REUSE (usage is rationed — waste is a defect). An earlier run was interrupted after many brands had already been probed; the captured data is on disk but its agents' conclusions were lost. ALREADY PROBED brands plausibly in your category: ${(it.probed || []).join(', ') || '(none listed)'}. For each, check ${DISC}/_harvest/<slug>*/harvest.json and ${DISC}/_inspect/<slug>/inspect.json — if they exist DO NOT re-run harvest/inspect: read them, look at the contact sheet and the best 4–8 images (Read tool), and judge. Prefer completing candidate files from this probed pool when a probed brand genuinely fits your category and is strong; probe NEW brands only to fill gaps or replace weak ones. View at most ~6 images per brand; keep each candidate .md to ~250–400 words; do not re-read files twice; do not narrate.

TASK: nominate 5–6 real brands/products in this category and PROBE each one for real. A nomination is worthless if its assets cannot actually be obtained or its brand cannot be opened. The goal is the strongest possible raw material for an Awwwards/FWA-level redesign: distinctive physical product or place, beautiful official imagery, a recognisable identity with strong typographic/colour character, motion & 3D potential.
Rules:
- No SaaS / AI / fintech / crypto / dashboard brands. At least 3 of your nominees must centre on a real physical product, packaging, or place.
- At least 2 of your nominees must NOT be household names (fame is neutral, not a plus: a famous brand with weak/locked assets or a site that is already perfect is a poor candidate).
- Do NOT nominate a brand you could not open live. Do NOT invent assets, models or press kits.
For EACH nominee:
 1. node ${ROOT}/_tools/harvest.mjs <home or product url> ${DISC}/_harvest/<slug> --scroll 8 --links   (run on the home page and, separately, 1–2 product/campaign pages with a different out dir suffix, e.g. ${DISC}/_harvest/<slug>-p1). Read harvest.json: count genuinely usable hi-res official images (>=1600px wide, non-UI), find the vector logo (inline SVG / svg file / press page), check for official 3D/AR models (glb/usdz/model-viewer) and video. Check for press/media/brand pages (look in links.json; try /press, /media, /newsroom, /brand, /brand-assets, /about/press with curl or the harvester) and public brand guidelines. LOOK at the best images (Read tool) to judge photography quality.
 2. node ${ROOT}/_tools/inspect-ref.mjs <home url> ${DISC}/_inspect/<slug> --shots 6 --mshots 3  and LOOK at contact-d.jpg: what is the current site like, what is its visual language, what is wasted or weak, what does the brand own (colour, type, shape, product, tone)?
 3. Score 0–5 each (be critical; spread your scores — a field of all 4s is useless): assets (obtainable official assets: logo vector, photography, packshots, press kit), distinct (product/identity distinctiveness), artDirection (opportunity for bold art direction), typography (potential for memorable typography), motion (motion potential), threeD (3D potential for the actual product), imageAvail (quantity and quality of usable imagery), redesign (headroom: how much better could it be than today's site), culture (cultural relevance/recognition among design audiences), differentiation (how different it would feel from the other likely picks of an AI-built collection — not another black tech site). total = sum (max 50).
 4. Write ${DISC}/candidates/<slug>.md (evidence: concrete asset URLs and counts, what the current site is, the opportunity, licensing/bot-block/thin-imagery risks, one-sentence redesign hunch — a hunch, not a locked concept) AND ${DISC}/candidates/<slug>.json (the same structured record you return).
Be honest about weak candidates: drop them (list in "dropped" with the reason) and replace them. Return the structured candidates. Keep the reply short; the detail lives in the files.`
}

phase('Scout')
const results = await pipeline(args.items, (it) => agent(prompt(it), { label: `scout:${it.slug}`, phase: 'Scout', schema: SCHEMA }))
const all = results.filter(Boolean).flatMap((r) => r.candidates || [])
log(`brand-scouts: ${all.length} candidates`)
return all.map((c) => ({ slug: c.slug, name: c.name, cat: c.category, total: c.total, hero: c.heroImagesFound, logo: c.vectorLogo, model: c.officialModelFound }))
