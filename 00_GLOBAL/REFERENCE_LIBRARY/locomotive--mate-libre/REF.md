# locomotive--mate-libre — https://matelibre.com/ (opened = true)

Evidence base: inspect-ref.mjs run (14 desktop frames d-02..d-15, hover d-hover-0..2, 9 mobile frames m-00..m-08, contact-d/contact-m, inspect.json) + the site's own public HTML/CSS/JS fetched with curl (theme assets `/cdn/shop/t/26/assets/{main.css,app.js,vendors.js}`, @font-face, section ids). Frames looked at. Locomotive case page https://locomotive.ca/en/work/mate-libre (self-reported): ©2023, "Digital, E-commerce", brand by Caserne, Creative Director Julien Jean, Art Director Pier-Luc Cossette, front-end Deven Caron + Pier-Luc Cossette; awards listed there: Awwwards SOTD + Developer award, FWA of the Day (not independently checked).

Important capture caveat: from d-05 on, a Klaviyo "Get 10% your first order!" modal opens over the desktop frames and dims everything (the modal does not appear in the mobile frames). Desktop frames d-05..d-15 therefore show the content only through a ~55 % dark overlay. A clean re-shoot with the modal dismissed is queued in `_timeline/` (see end of file).

## WHAT IT IS
Shopify storefront (custom theme — asset names are `main.css`/`app.js`/`vendors.js`, not stock Dawn; theme id folder `t/26`) for Mate Libre, a Montreal yerba-mate energy-infusion can brand. One long home page, 11,291 px tall at 1440 (8,535 px at 390). Sections in DOM order (from section ids): hero-carousel (900 px), feature-products (3,860 px, includes a text marquee, product carousel and benefits), splash-yerba (3,217 px), block-cta-compact (643), carousel-quotes (598), feature-articles (686), cta-faq (216), then footer. Real shop behaviours present: add to cart, bag counter, currency switch (CAD/USD), FR toggle, "build your box" CTA, newsletter capture.

## WHY IT IS STRONG
- The product is the colour system: each flavour has its own tint and text colour carried through cards, headlines and buttons (peach card bg #FFE8DE with copy #FF8154; mint & lime pale green card with deep green #235C1B copy; passion yellow/orange #FF9500). The can labels in the hero photo already use those hues, so brand and UI are one palette.
- Hero: a ring of cans on white sweep, shot at an angle with strong depth of field — a tactile product photo that makes the range legible at a glance (original / mint & lime / passion / ginger / watermelon visible in d-02).
- Single type voice: one bold neo-grotesque, all lowercase for display, tight tracking, large sizes; the lowercase headlines match the friendly, informal brand tone.
- Lifestyle photography (camping, friends, beach grass with a can mid-air) is warm and real, balancing the studio can shots; mobile frames show it works well in the narrow view.
- Practical commerce is integrated without breaking the look (add-to-cart pill sits inside the flavour card).

Weaknesses (no flattery):
- The hero headline is white on a near-white backdrop: "the ideal dose of energy" is faint in d-02 (white #fff on a ~#e8e8e8 sweep). Legibility depends on the slide.
- Large rounded plates (radius ~26–30 px) repeated for slides, flavour cards, blog tiles, quote block and FAQ pills: this is the "repeated big rounded rectangles" pattern from our anti-slop list; here it is held together by the flavour colours but it is a generic Shopify-section rhythm.
- Klaviyo discount modal on first desktop visit (and tracker/forms stack: Klaviyo ×25 requests, Shopify telemetry, reCAPTCHA) — standard e-commerce furniture that damages the first screenshot.
- Little spatial or typographic ambition beyond the hero and the marquee; the lower two-thirds (benefits list, carbon-neutral block, quotes, articles, FAQ) is conventional content blocks. Not a Studio-Freight-level concept; strongest as a colour-coding and photography reference.
- Doc height 11,291 px but nothing in scroll behaviour is narrative; Lenis only smooths.

## COMPOSITION
(from d-02..d-04 and the mobile frames; later desktop frames are dimmed by the modal)
1. d-02 hero: full-bleed carousel, plate inset ~19 px from the viewport edge with big radius; logo "mate libre" stacked two-line lowercase wordmark top-left, burger chip, nav (products, explore ▾, community) left of centre; right cluster: build your box, USD $ ▾, FR, account, bag(0). Headline 86 px lowercase left at x=60, sub-copy 24 px, white pill CTA "discover" (black text), circular prev/next arrows bottom-right. Three slides: "the ideal dose of energy" (cans ring, white), "the ideal dose of nature" (camp scene with tent, organic & fair trade), "the ideal dose of creativity" (balanced energy, no crash, no jitters).
2. d-04: section lead "Discover our most popular yerba mate infusions" (24 px, two lines, left) with a horizontal carousel of flavour cards bleeding off the right edge: peach (new pill), mint & lime, passion; each card = name in flavour colour, 1 can packshot bottom-left, short description bottom-right, round add-to-cart and arrow buttons.
3. d-03/d-04 bottom: giant marquee line "energy infusions · 65 mg of caffeine · awakens the mind · no crash" at ~86 px bold, alternating black and grey (#949494).
4. Mobile m-02/m-03: "the benefits of yerba maté?" 3 benefit rows with line icons (stimulates your mind, no crash, sport & recovery) + citation superscripts; image of a bonsai-like plant on sage backdrop; black pill "discover yerba maté".
5. Mobile m-04: "Committed from our raw material to packaging." three icon rows (carbon-free delivery in greater montreal, fair trade, certified organic) + black pill.
6. Mobile m-05..: quote plate ("Our vision extends beyond mere 'mate' sales …", signed Edouard), "Our community" article cards with large-radius photos, FAQ accordion with rounded outlined rows and +.
7. Footer area (d-13..d-15, dimmed): newsletter row with big pill input + arrow button, "…and receive … first order." heading.

## TYPOGRAPHY (real font, how identified, closest LEGAL alternative with source)
- Real: **Studio Pro** (family declared as `StudioProBold` for display/nav/buttons and `StudioProRegular` for small UI text; files `StudioPro-Bold.woff2`, `StudioPro-Regular.woff2` served from the Shopify CDN). Identified from @font-face and computed styles. Typewolf credits Studio Pro to Alberto Moreu, published through Multi Form (WebSearch result; another catalogue lists Think Work Observe; foundry attribution unresolved). Commercial; do not ship.
- Computed scale (desktop): display 86.4 px / lh 86.4 (1.0) / ls −1.728 px (−0.02em), lowercase; h-lead 40 px / 40 / −0.8; marquee 86.4; flavour name 50.4 px / 50.4 / −1.008 px lowercase; lead copy 24 px / 24 (1.0) / −0.48 px; small 14, large 18; nav links 18 px lowercase. Mobile display 48 px / 48 / −0.96 px. Everything is set solid (line-height 1.0) with −0.02em tracking.
- Design-token clamps in CSS: `--font-size-huge-sans: clamp(48px, 120/2000*100vw, 120px)`, h1 `clamp(50px,70/2000*100vw,70px)`, h2 55, h3 40, h4–h6 24 — note the tokens (max 120 px) are larger than what the home page actually uses (86 px).
- Closest legal alternative (character: friendly Helvetica/Akzidenz-like neo-grotesque with slightly tall x-height, bold weight, tight): **Hanken Grotesk 700** (OFL, Google Fonts) or **Instrument Sans** (OFL, wdth/wght variable, Google Fonts) at −0.02em; for a rounder, more characterful bold use Fontshare **General Sans Semibold** (ITF Free Font License, https://www.fontshare.com/fonts/general-sans). Not rendered side-by-side (not verified visually).
- Lowercase display set solid is the personality; keep that treatment rather than a specific face.

## SPACING & GRID
- CSS: `--grid-columns: 4`, `--grid-gutter: 1.25rem`; spacing tokens (px): tiny 20, small 30, medium 40, large 80 (60 mobile), big 120 (80 mobile), huge 180 (100 mobile), enormous 250 (140 mobile).
- Side margin 60 px on desktop (hero copy x=60), 16 px on mobile; hero plate inset ~19 px.
- Section heights are driven by content (hero exactly 100vh = 900 px).
- Colours (computed): black #000, white #fff, light grey bg #f4f4f4, accent grey #949494 / #d6d6d6, flavour tints.

## MOTION & EASING (observed — say 'not verified' if only stills)
- Code: one dominant easing `cubic-bezier(.38,.005,.215,1)` used 622 times in main.css (a slow-in, long-out ease), plus `(.23,1,.32,1)` ×4 and `(.215,.61,.355,1)` ×1. GSAP (≈41 refs) + ScrollTrigger + SplitText + Flip, Lenis (39 refs), Swiper (114 refs) in `app.js`/`vendors.js`.
- Hero slides change with prev/next arrows (Swiper); marquee presumably runs continuously (static frames only — speed and direction not verified).
- Scroll feel: Lenis smoothing (mobile wheel step 700 px produced ~350–850 px of movement per step in the capture).
- Everything beyond this is not verified (no video capture; `_timeline` re-shoot queued).

## INTERACTION (cursor, hover, nav, sticky, transitions)
- Cursor: browser default (`cursor:auto`, no custom cursor elements).
- Nav: transparent over hero (white text), burger chip next to the logo (opens drawer/menu; open state not captured), explore dropdown with chevron, currency dropdown, bag counter. Header persists on scroll (frames show it only at top; sticky behaviour not verified).
- Product cards: add-to-cart pill + round arrow link inside the card; carousels with round prev/next buttons.
- Modal: Klaviyo discount modal after a few seconds on desktop.
- Page transitions: none observed.

## MOBILE BEHAVIOUR
Real, usable mobile layout (m-00..m-08, no modal/consent in the frames): hero keeps the full-bleed cans photo, headline drops to 48 px lowercase at the bottom-left over the cans (more legible than desktop because the cans are darker under it), pill CTA, arrows bottom-right; header = logo + burger + account + bag (0). Product carousel cards ~85 % width with the next card peeking; benefits turn into stacked rows with icons; photos have large rounded corners; FAQ rows full width; footer newsletter. It is a clean single-column rethink with consistent 16 px margins, but it is mainly the desktop sections stacked (no mobile-specific interaction).

## 3D-WEBGL (what it is, how, which libs)
None. No canvas, no WebGL context (inspect-ref: canvases 0, webgl 0), no video elements. All depth comes from photography.

## PHOTOGRAPHY & IMAGE TREATMENT
- Studio: cans on a white cyclorama, ring composition shot from high-oblique with shallow focus (near cans blurred), bright high-key, soft contact shadows — consistent and clean.
- Lifestyle: warm natural light, outdoor (tent at a lake, friends on a beach log, can tossed in tall grass), real people, slight film warmth; cropped into large-radius plates.
- Cut-out packshots (single can with transparent bg) for cards; bonsai-type still life on sage for the "benefits" story.
- Full-bleed overlays use text in white; flavour cards use tinted flat backgrounds (no gradients).

## WHAT WE CAN ADOPT
- Flavour/variant colour-coding across card, headline and button — one tint pair per product, applied everywhere.
- Lowercase, solid-leading, −0.02em display type for friendly consumer drink/food brands.
- Hero slide structure: three claims ("the ideal dose of …") each with its own image, one pill CTA + two arrow buttons.
- Marquee statement line as a typographic divider carrying real product facts (e.g. caffeine content) — only if the facts are real and sourced.
- Product-in-card micro layout (name top, packshot bottom-left, description bottom-right, add-to-cart + arrow).

## WHAT TO REFUSE
- White headline on light imagery.
- Stacks of uniform large rounded rectangles for every section.
- Newsletter discount modal on first visit.
- Generic Shopify-section order (hero, product carousel, benefits, quote, blog, FAQ); a concept site needs an idea, not a storefront template.
- Reusing Studio Pro or the Mate Libre wordmark/photography.

## BEST USED FOR (brand types)
Canned drinks, snacks, wellness FMCG with several variants/flavours; friendly lifestyle brands; shops where colour coding by SKU is the main device. Weak reference for luxury, technical or cinematic brands.

## TECH FINGERPRINT (libs, fonts, canvas, scroll engine)
Shopify (custom theme, section ids `shopify-section-template--…`), GSAP + ScrollTrigger + SplitText + Flip, Lenis, Swiper, Klaviyo onsite JS, reCAPTCHA, Shop Pay preloads; no Three.js, no canvas; fonts Studio Pro Bold/Regular (woff2, commercial) plus Roboto (Google, fallback in a widget); 4-column grid, 1.25 rem gutter; main easing `cubic-bezier(.38,.005,.215,1)`.

## UPDATE (clean re-shoot)
(pending)
