# cat-drink--still

URL: https://www.drinkstill.nz  |  opened: true (inspect-ref run with 16 desktop + 8 mobile frames; read contact sheets and d-01, d-05, d-11..d-17, mobile contact)
Credit (CSS Design Awards listing): RefractWeb (USA) for STILL., a Wellington (NZ) nootropic drink brand; CSSDA Special Kudos Jul 29 2026 (judge scores 7.5-8.4 - NOT a Website of the Day). Tags minimal / typographic / WebGL. CSSDA about-text: "Your cursor cuts an aperture through the wordmark to a real-time 3D can behind it."
Verdict: PRIMARY CANDIDATE for typography and for can-in-the-wordmark hero + data-driven product scenes; a quieter, more restrained register than the rest of the category. Not a WOTD, but executed with whitelist-level control. Honest weakness: risk of reading as "premium minimal" (warm grey + serif) - cliche-adjacent, saved by the scale and the lens.

## WHAT IT IS
Brand site for a caffeine-free functional can (3 flavours: STILL.01 Clear - cucumber and yuzu, STILL.02 Dawn - ginger and bergamot, STILL.03 - third flavour, name not read). Flow: hero wordmark with a lens that reveals the 3D can -> "01 / The formula" dark scene with the can in a light cone -> "02 / Three flavors" sticky switcher with per-flavour colour tint and active-blend table -> "03 / Functional ingredients - Inside." dark scene with four pill tabs (L-Theanine, Lion's Mane, Rhodiola, Bacopa) each with source/role/dose -> "04 / Story - Quietly built over five years" horizontal timeline 2021-2024 with outline-numeral backdrops and real photographs -> footer with the wordmark again in the lens. Document height 18,794px at 1440 wide. Real data (mg per ingredient, 1,150 mg active blend, 0 mg caffeine) is shown - no invented metrics visible.

## WHY IT IS STRONG
- The hero is one idea: a 331px extra-wide wordmark, a circular lens cut into its second letter, the real can seen through it. Recognisable from one screenshot.
- Typography is deliberate and expensive: an extended heavy grotesk for brand moments, a light contrasty serif for sentences, tiny tracked-out uppercase for labels, tabular small caps for doses. Three voices, each with one job.
- Product information is treated as design material: ingredient rows as hairline tables (200 MG / L-Theanine ...), dose and role per ingredient, a total row. Reads like a lab sheet, not marketing.
- Colour by flavour is subtle (a blurred tint block + outline numeral) instead of a flood of colour - scenes switch light/dark (paper -> charcoal -> paper) to pace the scroll.
- Mobile is re-composed with its own interaction (drag to spin the can, swipe the flavour cards).

## COMPOSITION
- Hero: wordmark spans ~80% of the width at 25-60% height, can lens centred over the "I"; micro-copy at the three bottom anchors (left tagline in serif, centre scroll cue, right location line in tracked caps).
- Flavour scene: two columns - left text stack (small mono label, pill title, big serif flavour name with a coloured full stop, italic descriptor, 3-line copy, mg table, total), right a blurred tint rectangle with an outlined giant numeral and the can; page counter "1 / 3" top right and "01 02 03" bottom right.
- Ingredients: can centred in a dark stage, ingredient name large at left, data table at right (appears when a tab is active).
- Story: left text column with chapter label, serif headline, copy; right a single photograph with a figure caption; huge outline year numerals behind; a year index on the right edge.
- Persistent: light nav bar (STILL wordmark left, links Flavors / Inside / Story / Stockists, Shop + bag right).

## TYPOGRAPHY (real font, how identified, closest LEGAL alternative with source)
- Identified from `@font-face` (self-hosted woff2, read from computed fonts and network): **Soehne** (Klim Type Foundry; Buch, Kraftig, Halbfett, Extrafett + Buch Kursiv) for UI/body, **Soehne Breit** (Klim; Extrafett 800 + 900) for the wordmark and numerals, **Tiempos Headline** (Klim; Light 300 + Regular 400) for headings, **Tiempos Text** (Klim; Regular Italic) for descriptors. All commercial; do not reuse the files.
- Computed: hero wordmark 331px / line-height 0.78 / tracking -0.03em; section H2 58.5px/1.0, -0.02em; panel H2 40px/1.08; body 16px/26.4 (1.65); nav 14px, tracking +0.04em; counters/labels 12px uppercase, tracking +0.18em; outline numerals up to 576px (Soehne Breit 800, transparent fill with stroke); colours ink #1a1b1d, paper #efede6, grey #6a6965.
- Legal alternatives - rendered and compared (image `_font_test.jpg` in this folder; fonts from fontsource/npm, all OFL): wordmark -> **Archivo** (Google Fonts, variable, width axis 62-125) at wdth 125 / wght 900 is a close match to Soehne Breit Extrafett in proportion and weight (better than Unbounded 800 or Syne 800, which are rounder/wider with different letter shapes). Headings -> **Newsreader** (Google Fonts, variable with optical size) at wght 300 / opsz 72 is the closest of Newsreader / Source Serif 4 Light / Fraunces Light / Instrument Serif; it is slightly softer than Tiempos. Body -> Soehne is a Helvetica-lineage neo-grotesk: use a neutral grotesk with similar width (not rendered here; candidates Instrument Sans, Hanken Grotesk - both Google Fonts, OFL).

## SPACING & GRID
- Left margin 86px at 1440 (nav, headings and text columns share it); right content ends ~1350. Two-column scene split ~40/60. Vertical rhythm is loose: label -> 20px -> headline -> ~110px -> product block.
- Cards and pills are minimal: 1px hairlines, no shadows; tabs are fully rounded outline pills.

## MOTION & EASING (observed - say 'not verified' if only stills)
- Stills show: the hero lens in the middle of the wordmark (CSSDA says it follows the cursor - I did not move the pointer over it, so NOT verified); flavour scene tint and numeral change between 01/02/03 (frames d-05..d-07 are three states of one pinned scene - scroll-driven, sticky); ingredient tabs switch the can-side readout; the story timeline is a pinned horizontal scene (years change while the page scrolls vertically). Lenis is present (global detected) so scroll is smoothed.
- Easing curves/durations: NOT verified (no timeline captured for this entry).

## INTERACTION (cursor, hover, nav, sticky, transitions)
- Pinned/sticky scenes: flavour switcher, ingredients, story timeline - each holds the viewport while scroll progress drives the state; a small dot marker (center of the flavour scene) and counters show position.
- Ingredient pills are real buttons (hover/active states: filled light pill on dark).
- Mobile: "DRAG TO SPIN" label on the hero can, "SWIPE TO TASTE" on flavour cards - touch interactions exist for the 3D object.
- Nav links are section anchors; Shop leads to the store. Cursor: default (no custom cursor element detected).

## MOBILE BEHAVIOUR
- Re-composed: hero becomes a dark stage with the wordmark at the top and a tall can with a light cone (no lens); sections reorder to single column; flavour scene becomes swipeable cards with the can inside; ingredients become stacked cards with a data table per tab; story keeps the large serif headline.
- Nav collapses to Shop + bag + menu icon, wordmark stays.

## 3D-WEBGL (what it is, how, which libs)
- Real-time WebGL2: 3 contexts (hero lens, formula can, ingredients can), `models/can.glb` (a single can model, label swapped per flavour) lit with a 1k studio HDRI (`hdri/studio_small_03_1k.hdr`). 6 canvases in the DOM at the end of the scroll. Libraries not named in globals (bundled; Next.js app per the `/_next/static` chunk names) - Three.js/R3F is likely but UNVERIFIED.
- Material read: matte-white aluminium can with crisp black print, soft studio reflections, a floor contact shadow; no liquid.

## PHOTOGRAPHY & IMAGE TREATMENT
- Story scene uses real, natural-light documentary photographs (a whiteboard of can sketches in a window-lit office, a shop shelf with cans, a long laid table with cans) shown as one image at a time with a figure caption and a hairline - editorial, not lifestyle. Everything else is product render + type.

## WHAT WE CAN ADOPT
- Wordmark-with-lens hero where the product is visible only through a shape that the wordmark makes.
- Extended heavy grotesk + light serif + tracked caps system; labels as `NN / SECTION NAME` where the sequence is real.
- Ingredient/spec scenes with tabbed pills and a 3-row data table; a "dose" style number set in small caps.
- Pinned scene with per-state tint + giant outline numeral.
- Mobile product interactions (drag to spin, swipe to taste).
- Timeline-as-photography for a brand story, with figure captions.

## WHAT TO REFUSE
- Outline numerals at 500px+ as pure decoration behind everything (they look like template trims).
- Awwwards "Honors" side tab left in the page (an embedded badge overlays content in every frame).
- Cream + serif + pastel blur as the whole palette for a brand that has more personality than this.
- Hiding the shop behind a small "Shop ->" link only.

## BEST USED FOR (brand types)
Functional / wellness / premium soda or tonic cans, kombucha, adaptogens, anything with a recipe or ingredient story; also a base for a refined coffee or tea brand that wants a lab-sheet voice.

## TECH FINGERPRINT (libs, fonts, canvas, scroll engine)
Next.js (Turbopack chunks), Lenis, WebGL2 x3, `can.glb`, studio HDRI, fonts Soehne (5 files) + Soehne Breit + Tiempos Headline/Text (self-hosted woff2), 37 requests from one host, no console/page errors recorded. Awwwards "Honors" badge embedded.
