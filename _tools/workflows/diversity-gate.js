export const meta = {
  name: 'diversity-gate',
  description: 'Global Diversity Gate: compare all ten locked directions simultaneously; two independent reviewers + anti-slop director; force changes where territories overlap',
  phases: [
    { title: 'Compare', detail: 'diversity director, screenshot-test reviewer, anti-slop director' },
    { title: 'Merge', detail: 'resolve into per-concept verdicts and required changes' },
  ],
}

const ROOT = '/home/user/htmlcourse'

const VERDICTS = {
  type: 'object',
  properties: {
    perConcept: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nn: { type: 'string' }, status: { type: 'string', enum: ['OK', 'CHANGE', 'RESTART'] },
          overlapsWith: { type: 'array', items: { type: 'string' } }, axes: { type: 'array', items: { type: 'string' } },
          requiredChange: { type: 'string' }, mustKeep: { type: 'string' },
        },
        required: ['nn', 'status', 'overlapsWith', 'axes', 'requiredChange'],
      },
    },
    collectionNotes: { type: 'string' },
  },
  required: ['perConcept', 'collectionNotes'],
}

const READ = `Read ${ROOT}/00_GLOBAL/SWARM_PROTOCOL.md (skim), the BRIEF sections "COLLECTION DIVERSITY DIRECTOR", "GLOBAL DIVERSITY GATE", "ANTI-SLOP DIRECTOR", "DESIRED COLLECTION DIVERSITY" in ${ROOT}/00_GLOBAL/BRIEF.md, ${ROOT}/00_GLOBAL/SELECTED_TEN.md, ${ROOT}/00_GLOBAL/DIVERSITY_MATRIX.md and ALL ten locked plans: ${ROOT}/concepts/*/DIRECTION.md (also each concept's BRIEF.md for its lane).`

phase('Compare')
const [dd, shot, slop] = await parallel([
  () => agent(`You are the COLLECTION DIVERSITY DIRECTOR. ${READ}
Compare all ten directions SIMULTANEOUSLY on: hero composition, giant-typography treatment, colour palette, navigation model, 3D mechanic, scroll mechanic, layout philosophy, editorial style, photographic treatment, shader/WebGL effect, density, motion character, signature interaction, typographic attitude. Update ${ROOT}/00_GLOBAL/DIVERSITY_MATRIX.md with the REAL (post-lock) values per concept plus a 'collection checks' section (light/dark/chromatic counts; 3D-led vs typographic-led vs image-led vs object-led counts; scroll-mechanic counts; nav-model counts; how many use Lenis+GSAP-style smooth scroll; how many use a scroll-controlled 3D object — brief forbids 10 of any of these). Identify every pair/cluster that occupies nearly identical territory and decide WHICH concept changes (the one with the weaker claim to that territory), not both. Be strict: 'looks different in a table but would feel the same on screen' counts as overlap. Return per-concept verdicts (OK / CHANGE with the exact axes and a concrete required change that still respects the brand's lane / RESTART only if the concept itself is generic).`, { label: 'diversity-director', phase: 'Compare', schema: VERDICTS, effort: 'high' }),
  () => agent(`You are an independent SCREENSHOT-TEST REVIEWER on the diversity gate (you did not write any direction). ${READ}
For each concept imagine its first viewport (desktop 1440×900 and mobile 390×844) from the ASCII wireframes and scene descriptions, then imagine all ten hero screenshots tiled on a wall: which two or three would a juror mistake for siblings (same composition, same big-type-on-photo, same dark cinematic mood, same centred object, same layout skeleton)? Also check scenes 2–6, not only the hero: repeated section skeletons count. Return per-concept verdicts (OK / CHANGE with concrete changes / RESTART).`, { label: 'screenshot-test', phase: 'Compare', schema: VERDICTS, effort: 'high' }),
  () => agent(`You are the ANTI-SLOP DIRECTOR. ${READ}
Read the BRIEF's "ANTI-SLOP DIRECTOR" and "ANTI-SLOP REVIEW" and the catalogue in SWARM_PROTOCOL §5. Inspect every locked direction at plan level for AI-design clichés or generic structure: template section order, three-card feature rows, bento, fake dashboards/metrics, decorative dots/numbering/labels, glow/gradient defaults, floating-object 3D, fade-up-everything motion plans, cream+serif or black+acid defaults, generic copy. Also run the logo-swap test on each plan. Return per-concept verdicts: OK, CHANGE (list the slop and the replacement), or RESTART (concept generic at its core). Put only slop findings in 'requiredChange'; overlap fields can stay empty.`, { label: 'antislop-plan', phase: 'Compare', schema: VERDICTS, effort: 'high' }),
])

phase('Merge')
const merged = await agent(`You are the EXECUTIVE CREATIVE DIRECTOR's chief of staff. Three independent reviewers produced per-concept verdicts on the ten locked directions (data): ${JSON.stringify({ diversity: dd, screenshotTest: shot, antiSlop: slop })}.
Resolve them into ONE final verdict per concept: a concept needs CHANGE if any reviewer demands a justified change; merge compatible change requests; where two concepts overlap, make sure exactly one of them changes and say which and how, in terms the Concept Lead can execute (e.g. 'move palette from near-black to a saturated light field; replace pinned horizontal gallery with a stepwise full-screen product index'). Never ask a concept to leave its brand lane or drop what makes it good (mustKeep). Write ${ROOT}/00_GLOBAL/DIVERSITY_GATE_RESULT.md with the final table and rationale. Return the final per-concept verdicts.`, { label: 'gate-merge', phase: 'Merge', schema: VERDICTS, effort: 'high' })
return merged
