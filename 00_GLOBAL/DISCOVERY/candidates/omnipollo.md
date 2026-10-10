# Omnipollo (beer) — https://omnipollo.com
Category: Drinks / beer. Packaging-led. Not a household name outside beer + design circles.
Total 43/50 (assets 4, distinct 5, artDirection 5, typography 4, motion 3, threeD 3, imageAvail 5, redesign 5, culture 4, differentiation 5)

## What it is
Brewery founded 2010 by brewer Henok Fentie and graphic artist Karl Grandin (about page); every beer is a brewer + artist collaboration, each with its own can/bottle art. Physical places: Omnipollos kyrka (a church bar, Sundbyberg), hatt, Flora, Tokyo (pages/bars).

## Evidence (probed)
- Live: opened via inspect-ref (home/about; age-gate modal "Are you above the legal drinking age" covers the page; harvester only reaches 1 image behind the gate, `_harvest/omnipollo/harvest.json`).
- Shopify store; `/products.json` (pages 1–2, 500 products) is public: 409 "Beer" products (the Archive, /collections/beers), 89 merch. Beer images: 955, of which 948 are >=1600px wide (standard packshot 1740x2727 on white, 3–5 angles per beer; some 4647px). Samples already downloaded and viewed: `_harvest/omnipollo-samples/` (Midsommar, Drip, Unholy Church, Cake) — clean, evenly lit, cut-out friendly.
- Place photography: `omnipollos_kyrka_start.jpg` 1160x1818 (church bar, daylight) in `_harvest/omnipollo/images/`.
- Vector logo: inline SVG `omniLogo` (viewBox 1000x166) = `_harvest/omnipollo/svg/inline_02_svg.svg`; smiley "Vending Machine" circle seal `svg/d03bef_omni_vm_logocircle-01.svg`.
- 3D/AR: none official. Video: none found. Press/brand page: none (/pages/press 429-rate-limited, /pages/media-kit 404). Brand guidelines: none.
- Fonts on site: one commercial webfont (`37B369_0_0.woff2`, MyFonts-style id) + Times fallback — do not ship; can lettering is hand-drawn per beer.

## Current site
White page, default Times serif "Omnipollo®" wordmark in grey, mono nav (STORE ARCHIVE JOBS ABOUT BARS CONTACT), thin rules, a Mailchimp popup and age gate. jQuery + lottie. Practically no use of the product art that is the whole brand. The archive of 400+ psychedelic can designs is a plain grid.

## What the brand owns
Hand-lettered, maximalist, per-beer artwork; the lopsided "Omnipollo" lettering; the smiley vending-machine seal; art-collab culture; a church bar.

## Opportunity
An archive-as-gallery experience: each can is a poster; sorting by artist/style/colour; the church as the physical "gallery". Typography is the content (lettering from the cans). Strong colour variety makes it very unlike a black tech site.

## Risks
- Can art is © Karl Grandin / collaborating artists: fine for speculative portfolio, flag in manifest.
- Age gate must be handled honestly in redesign (keep a designed gate).
- No official 3D; a can/bottle would need a procedural cylinder with label wraps cut from packshots (label art is not published flat) — keep 3D modest.
- Shopify image CDN hotlink only for harvest; everything copied local.
- Omnipollo rate-limits curl (429) — harvest politely.

## Hunch
The archive as a wall of cans that rotates/arranges like record sleeves, with the church as the "gallery" scene, headline type taken from can lettering.
