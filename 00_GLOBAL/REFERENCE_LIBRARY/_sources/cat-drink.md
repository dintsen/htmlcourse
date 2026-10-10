# cat-drink - category scouting log (Drinks)

Researcher: reference researcher, category "Drinks: soft drinks, juice, coffee, tea, beer, spirits, wine, water, functional drinks".
Date of scouting: 2026-10-09. Brief for this category: beverage brand sites - expressive product worlds, liquid/glass/can presentation, bold typography.

## 0. Method and what could NOT be used

- Discovery lists actually read: CSS Design Awards (cssdesignawards.com) - food/drink industry gallery pages 1-6 (Oct 2024 - Oct 2026), WOTD winners pages 1-70 (about 1,260 WOTD entries, Apr 2023 - Oct 2026, titles scanned by eye), site search for ~40 beverage terms, and ~55 detail pages (about-text, tags, agency, judge scores). FWA (thefwa.com) home "recent winners" via real Chromium. WebSearch (shallow, snippets only) for FWA / beverage terms.
- Blocked or unusable (recorded, not circumvented): awwwards.com (egress proxy blocks), tympanus.net / Codrops (WebFetch: EGRESS_BLOCKED; curl returns a Cloudflare challenge page), dribbble.com (WebFetch: EGRESS_BLOCKED; curl returns HTTP 202 with an empty body), behance.net (HTTP 403 to curl), siteinspire (HTTP 429), lapa.ninja (Cloudflare challenge), onepagelove (HTTP 525). Not pursued further.
- FWA: the site is a client-rendered shell; `thefwa.com/search/?q=` ignores the query (same home content comes back for every term), and `/awards/page/N` returned HTTP 500 to curl. Result: only the current "recent winners" strip was readable, which contained no beverage brand (FunTech, 1minus1, Nocturnal Dream, D&G Velvet, Inherited, Kinoria, Night Drive Racing Game, Awards Racing, Cyera, Agrumea Farm, No Mercy Michel, ...). Agrumea Farm (citrus farm, Italy) is the only food/farm-adjacent item; queued as a low-priority look.
- CSSDA industry filter combined with the WebGL feature filter did not narrow results (second filter ignored), so WebGL + drink had to be cross-read from tags on individual detail pages.
- Environment note: Active Theory (Hydra engine) sites show "YOUR BROWSER IS NOT SUPPORTED" under the software-GL browser here because their bundled GPU blocklist contains "swiftshader" (read from the served bundle: `GPU.BLOCKLIST` -> unsupported). Those sites were opened with a renderer-string override on the WebGL debug-renderer-info parameter (init script in my own copy of the inspect tool, scratch only). The site is then rendered by the same software GL, so timings are not meaningful. This is a capture-environment workaround, not a way around any access policy.
- Machine was heavily oversubscribed (load average 20-50, browser slots queued 5-20 minutes per job) - several first runs of the stock tools died on page timeouts; I re-ran through a copy with longer timeouts and a single held browser slot. Timeline/interaction captures therefore exist only for some entries (stated per entry in REF.md).

## 1. Screened by metadata only (NOT opened; therefore never a reference)

CSSDA entries read through the detail page (about text, tags, judge scores) and rejected without opening - listed so nobody re-scouts them:

| site | what | CSSDA | why not opened |
|---|---|---|---|
| Tractor Beverage (drinktractor.com) | organic drink | Special Kudos Jun 2025, scores ~7.0-7.4 | below WOTD bar; tags animated/colorful/one page |
| Royal Beverage (royalbev.com) | beverage | Special Kudos Jun 2025, ~7.0-7.3 | below bar |
| Teh Tarik Nation | teh tarik | Special Kudos Jun 2025, ~7.2-7.5 | below bar |
| Done Drinks (donedrinks.com) | drinks | Special Kudos Aug 2025, ~7.2-7.8 | below bar |
| Slight Twist (NZ) | cocktail shop (Webflow) | Special Kudos Aug 2025, ~7.4-8.2 | Webflow shop, below bar |
| elev8 h2o | sparkling water/energy | Special Kudos Feb 2026, ~6.8-8 | below bar |
| Bragg | wellness staples (ACV) | Special Kudos Jun 2026, ~7.0-7.7 | commerce template, below bar |
| 3DCC (cocktailtheory.github.io) | 26 cocktails in a 3D taste space | Special Kudos Sep 2026, 6.6-7.4 | a data toy, not a brand site |
| Lipton Kombucha range | big-brand launch page | Special Kudos May 2025, 7.6-8.2 | one-page launch, no distinctive world |
| Huckleberry Roasters | coffee e-commerce | Special Kudos Jan 2025, 6.9-7.8 | best coffee find in CSSDA 2024-26; still below bar |
| Shiner Brewery | beer | Special Kudos Jun 2024, 7.0-8.1 | best beer find; below bar |
| Bijou Wines, Ampevino | wine | Special Kudos, 7.0-8.1 | below bar |
| Jiddo Tea | tea e-commerce | WOTD Oct 2024, 8.0-8.2 | e-commerce template feel (judged from tags: animated, eCommerce, typographic); low priority |
| Tea Flow | tea | WOTD Jan 2025 (webflow.io) | agency-made concept brand on Webflow |
| Kettmeir | winery | WOTD Dec 2025, 8.0-8.5 | tags animated/scroll/SVG - heritage winery, not a product world |
| Gini Vini, Enoteca della Valpolicella | wine | WOTD 2025, 8.2-8.8 | typographic grid wine sites (ET Studio) - good but quiet; see franc-lizer for the one wine site queued |
| Cask Exchange, Impossible Drinks, Finn Thomson Whisky | whisky/wine trading | WOTD (2023-25) | fintech/marketplace or pre-2024 |
| Læsk Kombucha, Marussia Beverages, Trop Hop, Curation Beverage | various | 2020-2023 | older than 2024 |
| IVRESS SPIN A TALE, sakazuki | Japanese brand/membership | WOTD May 2026 | not a drink product site (brand philosophy / sake membership) |
| Cantina del Sol | restaurant | WOTD Aug 2024 | restaurant |
| Slosh Seltzer | see entries - opened |
| Impossible Drinks | see above | | |

## 2. Opened (inspect-ref run, frames looked at). Outcome per site is in each entry's REF.md. Summary at the bottom of this file once all runs finished.

(see section 3, written last)
