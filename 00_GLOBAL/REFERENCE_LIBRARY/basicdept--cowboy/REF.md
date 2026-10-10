# basicdept--cowboy — https://cowboy.com/  (opened = true)

Opened with `inspect-ref.mjs` (16 desktop + 8 mobile frames, --wait 9000) and `shoot.mjs` timeline (0/300/700/1200/2000/3200/5000 ms). Looked at: contact-d, contact-m, d-01-load, d-03, d-09, d-11, d-13, timeline montage t-00000..t-05000. Hero video does NOT decode in this headless Chromium (console "Failed to parse video contentType avc1/hev1"); the hero is therefore seen as its poster frame only. Not seen: footer (an auto-opening "New to Cowboy?" modal covers d-14..d-17), the "Explore" click result, the checkout/configurator.
AUTHORSHIP CAVEAT: BASIC/DEPT lists Cowboy as a case study (search snippets of basicagency.com/case-studies/cowboy and deptagency.com: gallery-like site, Shopify Plus custom theme, First Things Studio CGI, configurator merged into one flow, Webby nomination). Those pages are blocked/not opened by me. The live site I opened is a different build (assets from `cdn.shopify.com/oxygen-v2` = Shopify Hydrogen/Oxygen, Tailwind utility classes, current models Cruiser / Cross, "Riding reinvented"), so I cannot verify that what is on screen today is BASIC's work. Treat it as a strong live e-bike flagship in the BASIC lineage, not as proven BASIC output.

## WHAT IT IS
Brand + shop homepage of Cowboy (Belgian connected e-bikes; footer language rows BE/NL/FR/DK; geo banner offers us.cowboy.com). One long page, 18814 px tall at 1440 (16893 at 390): video hero, two product modules (Cruiser/Cruiser ST, Cross/Cross ST), press cards, AdaptivePower explainer, sticky feature list, app/connected section, community mosaic with a km counter, test-ride block.

## WHY IT IS STRONG
- Product is the hero: studio-lit CGI bike cropped hard (handlebar+head tube fill the frame, d-03), on a warm off-white gradient. Reads as a product page that behaves like a gallery.
- Clean alternation of dark #1d1d1d film/headline slabs and white product slabs gives a clear rhythm without any ornament.
- One typeface, only three weights, big tight headlines, nearly no UI chrome: copy, bike, pill.
- Sticky feature list (13 lines, active line black, rest ~20% grey) beside a rounded media card whose caption pill changes (d-11): an economical way to present 13 features without 13 cards.
- Community mosaic (d-13) of real riders in 7 offset portrait columns + flip-digit odometer "281509735 Kilometres ridden together": real proof, not logos.

## COMPOSITION
- 1440x900. Side margin 60 px, content to x=1380. Hero: H2 100/90 at left, subline 20 px at 60% white, one white pill CTA, hairline then three equal fact columns (x=60/500/940, 440 px pitch) pinned to hero bottom.
- Product module (d-03): title 42 px top-left, chip stack of "+ Step-over frame / + Removable battery ..." (14 px, grey pills) under it, segmented control (Cruiser | Cruiser ST) top-right, bike render bleeding off the bottom edge, round "Explore" cursor pill on the bike, prev/next arrow squares bottom-left.
- Cross module is the same layout inverted (dark headline slab "Shockingly smooth" then white spec module): consistent template, differentiated by colour of bike (cream vs black).
- Statement slabs (72/72): "Power so natural, you're always in flow." centred on #f5f5f5; "Magic for real" on a scroll-driven grey-to-black gradient with three 80 px circular icons (d-09).
- Press: five white cards (TechCrunch, Red Dot, The Verge, TIME, GQ) in a horizontal strip.

## TYPOGRAPHY
- REAL FONT: **Suisse Int'l** (Swiss Typefaces, commercial). Identified from computed `font-family: SuisseIntl` and network files `SuisseIntl-Book / Regular / SemiBold *.woff2` on cdn.shopify.com (loadedFonts: 400, 500, 600). Do NOT use their files.
- Scale at 1440: hero 100/90 -2.5px (-0.025em) w400; product titles 42/42 -1.05px w500; statements 72/72 -1.8px w400; nav 16/16 w500 -0.4px; CTA 14 w500 -0.35px; subline 20/29 at rgba(248,248,245,.6); body 16/23.5; cart/eyebrows 12 uppercase w600. Mobile: hero 44/39.6, product 36/45.
- Recipe: sentence case, leading 0.9-1.0, tracking -0.025em, weight 400 for the big statement and 500 only for smaller titles. Calm, not shouty (contrast with BASIC's own uppercase -0.05em).
- CLOSEST LEGAL ALTERNATIVES (by eye, not metric-matched): **Switzer** (Indian Type Foundry, Fontshare, free incl. web embedding) first; **Hanken Grotesk** or **Schibsted Grotesk** (OFL, Google Fonts) second. Not Inter/Roboto by default.

## SPACING & GRID
60 px margin (`px-section-x`), full-bleed dark slabs, 900 px (100vh) module height, 10 px gutters in the mosaic, 180x275 portrait tiles with deliberate vertical offsets between columns. Generous empty space around statements (rows of ~300 px above "Magic for real").

## MOTION & EASING (not verified except where stated)
- Timeline 0-5000 ms: no preloader, nav and headline present from first frame, no entrance choreography visible; hero is static in stills (video not decodable here).
- Sections `features` (h-[200vh]) and one h-[500vh] block are tall scroll sections (sticky pin inferred from class names + the d-11 state); the gradient slab in d-09 is caught mid-transition = scroll-linked. Easings/durations not verified. No GSAP/Lenis/ScrollTrigger detected (inspect libs all false): native scroll + CSS/own JS.

## INTERACTION
Cursor-following "Explore" pill (black, ~104x56) over the product render, carousel arrows, segmented model toggle, test-ride CTA repeated in nav, flip-digit counter, newsletter/guide modal that opens by itself near the end (annoying, covers the footer in 4 of the last frames), persistent chat bubble bottom-right.

## MOBILE BEHAVIOUR
Properly recomposed, better than most: centred hero text 44 px, logo + bag + hamburger, segmented toggle moves above the centred title, chips wrap centred, bike crop enlarged, prev/next buttons and Explore pill sit at the render's bottom corners (m-02, m-04). Feature list becomes a full-width white card; the inset photo overlaps and clips list text (m-08, defect).

## 3D-WEBGL
None live: `canvases: 0`, `webglContexts: []`. The "3D" is pre-rendered CGI (stills and looping muted mp4s, 11 videos, 112 imgs, all Shopify CDN). The Cowboy case study credits First Things Studio for CGI (from search snippets only). Interaction of "Explore" unknown.

## PHOTOGRAPHY & IMAGE TREATMENT
Hero: street film in Paris-like stone facade, natural grade, bike in warm cream. Product: soft studio CGI, shallow gradient floor, no shadows-as-drama. Community: real rider photos, uniform 2:3 crop, no overlays. Weak: low-contrast subline over a busy photo (the "thinks for itself" line collides with the handlebar).

## WHAT WE CAN ADOPT
Dark/white slab alternation; hard-cropped hero product with pill CTA; chip row + segmented model toggle; sticky 13-line feature list with caption pill; scroll-driven white-to-black slab; real-rider mosaic with an odometer when the brand has real numbers; cursor label that says what it does.

## WHAT TO REFUSE
Auto-opening email modal, chat bubble, press-card strip as logo wall, geo banner, third-party pixels (Hotjar, Pinterest, LinkedIn, Reddit, Twitter, Bing), hero text legibility on busy video, overlapping photo on mobile list.

## BEST USED FOR
Hardware/mobility/consumer-electronics flagships (bikes, cars, audio, appliances) that need a calm, expensive, product-first scroll with photography/CGI, not for WebGL-led experiences.

## TECH FINGERPRINT
Shopify Hydrogen/Oxygen (assets `cdn.shopify.com/oxygen-v2`, `libs.Shopify: true`), Tailwind-style utilities, custom JS; SuisseIntl woff2 x3; no GSAP/Lenis/Three; Google Maps (store locator), Cloudflare Turnstile, GTM + ad pixels; no overflow in report; h1 present but wrongly equals the page title (16 px).
