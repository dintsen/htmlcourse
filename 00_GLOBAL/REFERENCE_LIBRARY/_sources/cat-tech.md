# cat-tech — source log (Consumer electronics: audio, headphones, speakers, cameras, phones, wearables, drones, synths, gaming hardware)

Status: IN PROGRESS (draft written while the shared browser queue was saturated; final verdicts appended below when REF.md files exist).

## Discovery methods used (and what each yielded)

- FWA (thefwa.com): the site is a JS app, but its own public JSON endpoint `/api/cases` (`?limit=100&offset=N`) returns case metadata (title, description, live URL, categories, award type, date). Paged the latest 3,000 cases (to Jan 2025) and filtered by keyword (headphone, earbud, speaker, synth, camera, drone, keyboard, wearable, watch, hardware, device ...) and by category (Promotional, eCommerce, Commercial, Music & Sound, Mobile). FWA has no "consumer electronics" category. Result leads: KINORIA, iyO, ZIRKA Interceptor, KASANE Urushi Keyboard, Aether 1, Haptikos, Lidar Drone Scanning, Augen Pro, The Watch (60fps), Ceramic Beats. Used for award level and brief only; every entry below was then opened in Chromium.
- CSS Design Awards (cssdesignawards.com): plain curl works (Chromium got 403). Scraped `website-gallery?industry=products` pages 1-13 (Oct 2026 back to Nov 2024), `feature=WebGL` pages 1-8, WOTM list. Leads: Oryzo AI (WOTM Apr 2026), HiKeys-1977, Haptikos, OXI Instruments / OXI ONE MKII, NOVA Speaker, HEAVN One, Vaonis, Aether 1, Radian (belongs to cat-auto), KASANE, Lidar Drone Scanning, The Watch, YLEM, Nivis Gear (apparel, not this category).
- Codrops (tympanus.net/codrops): plain curl 403; Chromium opens it (Cloudflare rate-limits after a few pages). Read the Case Studies tag pages 1-2 (Oct 2026 back to Apr 2026) as links only: almost all portfolios/agencies; no consumer-electronics case study there. WebSearch (allowed_domains tympanus.net) surfaced the Aether 1 case study (Aug 2025) which led to the Aether 1 entry.
- Dribbble: `dribbble.com/search/...` returns an empty bot-gate page to curl; not browsed for this category. Not a source of any entry.
- Whitelist studio portfolios (Chromium link dump of work pages): Immersive Garden (watches/jewellery/hospitality only), Locomotive (no electronics; Lightship RV and Scout Motors belong to cat-auto), Unseen (projects page empty without scroll engine), Active Theory (blocked "Not Supported" to the dump script), others not opened for this category. No consumer-electronics work found at these studios in the listings I could read.
- WebSearch general queries ("best hardware product launch websites 2026", "FWA site of the day headphones" etc.): returned old/irrelevant listicles. Recorded so nobody repeats it. webdesignawards.io and oilstainlab.com/kasane/tympanus via WebFetch are egress-blocked (WebFetch only; Chromium is the tool that reached them).
- awwwards.com: blocked at the proxy; not attempted beyond search snippets; nothing used from it.

## Triage procedure
Each candidate was opened once in Chromium 1440x900 (6 s wait, consent click attempt, 6 wheel-scroll steps) and the 3x2 contact sheet was looked at. Only survivors were run through inspect-ref.mjs for the full treatment.

(candidate table, verdicts and rejections appended below)
