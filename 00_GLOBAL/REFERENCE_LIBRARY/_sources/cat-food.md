# cat-food — source log (Food: ice cream, chocolate, confectionery, snacks, bakery, FMCG)

Status: IN PROGRESS (draft written while browser slots were queued; final verdicts appended below).

## What was browsed for discovery (and how)

- CSS Design Awards (cssdesignawards.com): fetched the `industry=food/drink` gallery pages 1-14 (252 entries, Oct 2026 back to Mar 2023) and read each entry page (award level, studio, live URL, one-line brief). Also fetched `industry=products`, `feature=illustrated|colorful|eCommerce` galleries (418 further entries) and keyword-filtered for food. Result: the "food/drink" bucket is dominated by restaurants, wine and spirits; real FMCG / confectionery / snack / ice-cream product sites are a small minority.
- FWA (thefwa.com): site is a JS app; its own public JSON endpoint `/api/cases` (the one the site itself calls) was paged for the latest 2,400 cases (Mar 2020 - Oct 2026) and filtered on category "Food & Drink" (119 cases). Used for award level (FOTD/FOTM), studio and live URL only.
- Codrops: `tympanus.net/codrops` returns 403 to plain curl; searched via WebSearch only (allowed_domains tympanus.net). Nothing food-relevant surfaced. Not opened in a browser (browser slots were scarce). NOT a source of any entry.
- Dribbble: `dribbble.com/search/...` returned HTTP 202 / empty to curl (bot gate); not browsed. Not a source of any entry.
- Studio portfolios: WebSearch for food/FMCG work by Cuberto, Studio Freight/Darkroom, Unseen, Immersive Garden returned nothing relevant (their food-adjacent work is drinks/wellness, covered by other scouts: Active Theory x Santioni/Slosh, Unseen x Organimo, Locomotive x Mate Libre). Resn (not whitelist, respected FWA studio) found via FWA: Savor.
- WebSearch general ("best food brand website 2026" etc.): returned packaging-award roundups (Dieline) and no website lists. Useless for discovery; recorded so nobody repeats it.
- awwwards.com: blocked at the egress proxy; not attempted beyond WebSearch snippets; nothing used from it.

## Overlap with other category scouts (not duplicated here)
cat-drink already holds: grink, santioni-spirits, slosh-seltzer, som-power, still, yaas-energy, zeroz. Drinks (La Revoltosa, Done Drinks, Zoi Ice Tea etc.) deliberately left to cat-drink.

(candidate table, opened-site verdicts and rejections follow once screenshots exist)
