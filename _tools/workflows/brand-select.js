export const meta = {
  name: 'brand-select',
  description: 'Selector panel ranks all scouted brands; Collection Diversity Director composes the final ten and assigns creative lanes',
  phases: [
    { title: 'Rank', detail: 'three independent selectors with different lenses' },
    { title: 'Compose', detail: 'Diversity Director picks ten + alternates, writes matrix and concept briefs' },
  ],
}

const ROOT = '/home/user/htmlcourse'
const DISC = ROOT + '/00_GLOBAL/DISCOVERY'

const RANK = {
  type: 'object',
  properties: {
    top: { type: 'array', items: { type: 'object', properties: { slug: { type: 'string' }, why: { type: 'string' } }, required: ['slug', 'why'] } },
    vetoes: { type: 'array', items: { type: 'object', properties: { slug: { type: 'string' }, why: { type: 'string' } }, required: ['slug', 'why'] } },
  },
  required: ['top', 'vetoes'],
}

const LENSES = [
  { key: 'feasibility', text: `LENS = BUILD FEASIBILITY & ASSET REALITY. Which brands can really yield an Awwwards-level site with REAL material: vector logo available, abundant hi-res official photography/packshots, press kit, official 3D/AR models, bot-protection/licensing friction, thin imagery. Verify claims by opening the candidate .md/.json evidence and, where a claim decides the ranking, spot-check the harvested files under ${DISC}/_harvest/<slug> (look at actual images with the Read tool). Veto brands whose assets cannot support the ambition.` },
  { key: 'upside', text: `LENS = CREATIVE UPSIDE & PORTFOLIO IMPACT. Which brands would produce the most memorable, award-calibre websites: distinctive product/identity, headroom over today's site, typography potential, motion and 3D potential, cultural weight among design audiences. Look at the current-site screenshots under ${DISC}/_inspect/<slug>. Fame is neutral. Veto brands whose current site is already essentially perfect or whose identity is too generic to redesign memorably.` },
  { key: 'balance', text: `LENS = COLLECTION BALANCE. Assemble the best COLLECTION of ten (not the ten best individuals): many physical consumer products and places; broad mix of ice cream/food, beverage, fashion/eyewear, sport/performance, consumer technology, automotive/mobility, beauty/fragrance, hospitality/culture, premium physical objects, one experimental wildcard — but the Diversity Director may find a stronger combination. No more than ~1–2 tech brands; no AI/SaaS/fintech/crypto/dashboard. The ten must be visibly diverse in colour character, typographic attitude, density, motion and 3D usage potential. Rank by contribution to the collection.` },
]

function rankPrompt(l) {
  return `You are a SELECTOR on the brand-selection panel of a design swarm that will build ten award-level website redesigns of real brands. Read ${ROOT}/00_GLOBAL/SWARM_PROTOCOL.md (skim) and the BRIEF sections "BRAND DISCOVERY", "FORCE CATEGORY DIVERSITY", "INITIAL DISCOVERY SWARM", "DESIRED COLLECTION DIVERSITY" in ${ROOT}/00_GLOBAL/BRIEF.md.
Scouts have written ${DISC}/candidates/<slug>.md and .json for every candidate (scores, asset evidence, hunches, risks). Read ALL candidate .json files (ls ${DISC}/candidates) and then the .md of those you consider seriously.
${l.text}
Return your TOP 14 (best first) with a one-line reason each, plus vetoes (slugs that must not be selected, with a concrete reason). Think independently: do not simply sort by the scouts' totals; scouts score their own nominees generously.`
}

const SEL = {
  type: 'object',
  properties: {
    selected: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nn: { type: 'string' }, dirName: { type: 'string' }, slug: { type: 'string' }, name: { type: 'string' }, url: { type: 'string' },
          category: { type: 'string' }, why: { type: 'string' },
          lane: {
            type: 'object',
            properties: {
              colourCharacter: { type: 'string' }, typographyDirection: { type: 'string' }, layoutPhilosophy: { type: 'string' }, density: { type: 'string' },
              motionCharacter: { type: 'string' }, threeD: { type: 'string' }, webgl: { type: 'string' }, photography: { type: 'string' },
              navigation: { type: 'string' }, heroComposition: { type: 'string' }, signatureInteractionSeed: { type: 'string' },
            },
            required: ['colourCharacter', 'typographyDirection', 'layoutPhilosophy', 'density', 'motionCharacter', 'threeD', 'webgl', 'photography', 'navigation', 'heroComposition', 'signatureInteractionSeed'],
          },
        },
        required: ['nn', 'dirName', 'slug', 'name', 'url', 'category', 'why', 'lane'],
      },
    },
    alternates: { type: 'array', items: { type: 'object', properties: { slug: { type: 'string' }, why: { type: 'string' } }, required: ['slug', 'why'] } },
  },
  required: ['selected', 'alternates'],
}

phase('Rank')
const ranks = (await parallel(LENSES.map((l) => () => agent(rankPrompt(l), { label: `selector:${l.key}`, phase: 'Rank', schema: RANK, effort: 'high' })))).filter(Boolean)
const points = {}
const vetoed = new Set()
for (const r of ranks) {
  r.top.slice(0, 14).forEach((t, i) => { points[t.slug] = (points[t.slug] || 0) + (14 - i) })
  r.vetoes.forEach((v) => vetoed.add(v.slug))
}
const shortlist = Object.entries(points).filter(([s]) => !vetoed.has(s)).sort((a, b) => b[1] - a[1]).slice(0, 20)
log(`shortlist ${shortlist.length}: ${shortlist.map(([s, p]) => s + ':' + p).join(', ')}`)
const notes = ranks.map((r, i) => ({ lens: LENSES[i] && LENSES[i].key, top: r.top.map((t) => `${t.slug}: ${t.why}`), vetoes: r.vetoes.map((v) => `${v.slug}: ${v.why}`) }))

phase('Compose')
const dd = await agent(`You are the COLLECTION DIVERSITY DIRECTOR (and brand-selection chair) of a design swarm that will build ten award-level website redesigns of real brands. Read ${ROOT}/00_GLOBAL/SWARM_PROTOCOL.md and the BRIEF sections "COLLECTION DIVERSITY DIRECTOR", "BRAND DISCOVERY", "FORCE CATEGORY DIVERSITY", "DESIRED COLLECTION DIVERSITY", "GLOBAL DIVERSITY GATE" in ${ROOT}/00_GLOBAL/BRIEF.md.

Three independent selectors ranked the scouted candidates (${DISC}/candidates/*.md|json hold the evidence). Aggregated shortlist (slug:points): ${shortlist.map(([s, p]) => s + ':' + p).join(', ')}.
Selector notes (data, weigh them yourself): ${JSON.stringify(notes)}

TASK:
1. Choose the final TEN (and two alternates) from the shortlist (you may pull in a non-shortlisted candidate with a concrete reason). Optimise for the strongest COLLECTION: visibly diverse categories and creative territories; several physical consumer products; at most 1–2 technology brands; every pick must have the real asset base to support an expensive-looking site (verify the asset evidence yourself for any brand where it matters). Not the ten most famous brands. Reject overlap hard (no two ice-creams-as-fashion-editorial, no two black cinematic car/tech sites, no two white Swiss layouts).
2. For each pick assign a creative LANE — the territory boundaries that make the collection diverse by construction, without dictating the whole concept: colour character, typography direction (attitude, not a font name), layout philosophy, density, motion character, 3D usage (none / hero object / environment / etc. — at least FIVE sites should have NO scroll-controlled 3D object and at least THREE should be strongly 3D/WebGL), WebGL usage (shader/image/3D/none), photography treatment, navigation model, hero composition, signature interaction SEED. Lanes must be mutually distinct on the axes that readers notice: hero composition, nav model, scroll mechanic, palette, type attitude, density. Between them the ten lanes must cover: light vs dark vs chromatic; typographic-led vs image-led vs object-led vs 3D-led; dense vs spacious; vertical scroll vs horizontal/pinned/non-scroll/stepwise navigation; DOM-native vs canvas-native.
3. Write (a) ${ROOT}/00_GLOBAL/SELECTED_TEN.md (per pick: nn, brand, url, category, why chosen, evidence summary, lane; plus alternates and what was rejected for overlap), (b) ${ROOT}/00_GLOBAL/DIVERSITY_MATRIX.md (the table in the BRIEF's column list, one row per concept, plus a 'collection checks' section: counts of light/dark/chromatic, 3D-led, typographic-led, etc.), (c) for each selected brand create ${ROOT}/concepts/<nn>-<slug>/BRIEF.md containing: brand, URL, category, why chosen, the lane (as binding constraints), pointers to its candidate file/harvest dir, the other nine lanes as 'territories you must NOT occupy', and the standing deliverable (one central idea sentence; 4–6 art-directed scenes; real brand assets; desktop+mobile re-art-directed). Use two-digit nn 01..10 and dir names like 01-slug.
Return the structured selection (same content as SELECTED_TEN.md).`, { label: 'diversity-director', phase: 'Compose', schema: SEL, effort: 'high' })
return { shortlist: shortlist.map(([s, p]) => `${s}:${p}`), selected: dd && dd.selected && dd.selected.map((s) => `${s.nn} ${s.slug} (${s.category})`), alternates: dd && dd.alternates && dd.alternates.map((a) => a.slug) }
