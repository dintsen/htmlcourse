# cat-drink--yaas-energy

URL: https://yaas-energy.com/  |  opened: true (inspect-ref run, 16 desktop + 8 mobile frames, read `contact-d.jpg`, `contact-m.jpg`, d-01/02/04/05/08/14/17, m-00)
Credit per CSS Design Awards listing: DVIGA (Singapore); CSSDA nominee Oct 8 2026 (UI 8.54 / UX 8.71 / INN 8.41 public vote at time of fetch; judges avg ~9 on first judge row). Zero-sugar energy drink, 5 flavours (real product line: lemon, blueberry, strawberry, orange, apple/green).
Verdict: STRONG SECONDARY reference (can/flavour product world, hero type-vs-can composition, mobile re-composition). Not a whitelist-level primary for the whole experience: lower half is thinner than the top.

## WHAT IT IS
Brand microsite/one-pager for an energy-drink launch. Flow seen in stills: preloader ("LOADING ENERGY" over a row of cans + 100% counter) -> hero (colossal YAAS wordmark in white, cans tilting in/over it on an iridescent pink-orange gradient) -> "5 Flavors. 1 Energy." flavour stage (one big 3D can, prev/next arrows, flavour thumbnails, whole background re-colours per flavour) -> white rounded-top panel rising over the flavour stage with a manifesto line -> horizontal tilted-card carousel of lifestyle photography with captions -> "Why YAAS beats whatever's in your fridge" 4 benefit cards on the gradient -> FAQ -> about/brand -> contact. Document height 20,100px at 1440 wide.

## WHY IT IS STRONG
- The wordmark is the layout. A 553px (38vw) display wordmark sits BEHIND tilted 3D cans that break out of the frame edges; type and product occupy the same plane so the hero is recognisable from one screenshot.
- Each flavour owns a full colour world (strawberry = hot pink, blueberry = blue, etc.) and the stage re-colours as the can changes. Product-colour logic, not decoration.
- One real glTF can is re-skinned per flavour (network: `/models/can.glb`), so the can looks like the real packaging (illustrated fruit mascots with sunglasses, 330ML print) rather than a generic cylinder.
- Display type has a genuine point of view (70s fat-contrast serif) and is used at every scale, including the numerals 01-04 in each flavour colour.
- Mobile hero is re-composed, not stacked: wordmark runs edge to edge at the top, copy + CTA in the middle, three cans rising from the bottom edge (m-00).

## COMPOSITION
- Desktop hero: nav pills top-left (Flavors / About us / FAQ) and Contacts top-right; wordmark centred at ~25-70% height; three cans placed on a diagonal (strawberry top-centre inverted, blueberry bottom-left, orange right edge), all cropped by the viewport edge; 3-line tagline bottom-centre. Cookie card bottom-right (overlaps content in every frame - weakness).
- Flavour stage: headline top-left, 3-line description + white pill CTA ("Learn more ->"), a single can large and tilted at right (~45% of width, bleeding off the bottom), flavour switcher thumbnails bottom-left (5 mini cans, selected one on a translucent tile), flavour name repeated bottom-centre.
- Transition into next section: white panel with a very large top-corner radius rises over the stage (d-05) - a clear "page curl" device between colour worlds.
- Photo carousel: 5 photos on a shallow 3D arc (outer ones rotated/perspective-skewed), rounded corners; caption overlay bottom-left on the focused card.
- Benefit cards: 4 white cards at slightly different rotations sliding horizontally across the gradient (d-17). Card faces are mostly empty white; weakest moment of the site.

## TYPOGRAPHY (real font, how identified, closest LEGAL alternative with source)
- Display: **Soledago** (from `@font-face`, `/fonts/Soledago.woff2`, weight 400) - extremely wide, high-contrast, ink-trap/bulbous 1970s display serif. Foundry NOT identified (web search returned nothing for the name) - treat as custom or small-foundry commercial. Do not reuse the file.
- UI/body: **Bounded Medium** (`/fonts/Bounded-Medium.woff2`, weight 500) - wide geometric grotesk. A free-download aggregator lists a family called "Bounded" credited to Vlad Churkin (licence unverified, aggregator only) - not confirmed to be the same font; do not use unless licence verified at the source.
- Body fallback is Helvetica Neue/Arial (computed on h1 and some links) - i.e. the font stack is incomplete in places.
- Computed: wordmark 553.6px / lh 1.0 / ls -0.01em; H2 82px/1.0; manifesto H2 60px/1.1, ls -0.025em, centred; body 16px/22.4px, ls -0.025em; nav 16px/500; numerals "01" 92px, tracking -0.02em. Colour tokens: ink #fff, ink-on-light #212121, paper #fdfaf1, accent per flavour (strawberry #e53a6b, blueberry #0085c6, etc.).
- Legal alternatives (NOT rendered side by side yet - Typography Director must test-render): display -> **Fraunces** (Google Fonts, OFL, variable with opsz 144 + SOFT 100 + WONK 1 at Black gives a bulbous 70s contrast serif) or **Shrikhand** (Google Fonts, OFL) for a fatter, more swashy groove; UI -> **Unbounded** or **Lexend Giga/Exa** or **Syne** (all Google Fonts, OFL) for the wide-geometric feel. Source: fonts.google.com. Mark as unverified match.

## SPACING & GRID
- Tokens read from `:root`: `--block-gap: 120px`, `--heading-gap: 50px`, `--content-gutter: 30px`, `--block-heading: clamp(30px, 4.17vw, 80px)`, `--ui-scale: 1`. Content inset 100px at 1440 in the hero/flavour stage (nav and headline start at x=100). Photo cards centred, 1240px wide frames at 1440.
- No visible column grid; layout is centre-axis and edge-bleed composition rather than grid.

## MOTION & EASING (observed - say 'not verified' if only stills)
- Observed in stills only: preloader state with can row + counter; hero cans in two different rotation states between frames d-01 and d-02 (cans are scroll- or time-driven); flavour headline cross-fading ("WILD STRAWBERRY" over "5 FLAVORS. 1 ENERGY." in d-04 mid-transition); white panel rising over the flavour stage; photo carousel in perspective. Lenis is bundled (`lenis-*.js` chunk in network) so scroll is smooth/virtual.
- Easing curves, durations and the exact scroll mapping: NOT verified (no timeline captured for this entry at time of writing).
- Black bands appear in several scroll frames (d-08..d-16) where the pinned photo section has not painted - could be a software-render artefact or a real pinned-section gap; unverified.

## INTERACTION (cursor, hover, nav, sticky, transitions)
- Nav: pill outlines (translucent fill + 1px white border), anchor links to #flavors, #why-yaas, #about, #faq, #contact. A second nav list (Flavors / Why YAAS / About Us / FAQ / Contacts) exists in the DOM (likely the mobile/overlay menu).
- Flavour switching: arrows + thumbnails; thumbnails are rendered 3D mini-cans. Hover on the cookie buttons only was captured; no custom cursor (body cursor auto).
- Cookie banner is a branded card ("Yes, we use cookies. Sugar-free.") with two pill buttons - good voice, but it sits on top of the art in every frame.
- FAQ is an accordion-style list (button text "Is this an energy drink or a soda?" found in DOM); not opened.

## MOBILE BEHAVIOUR
- Re-composed (m-00..m-08): nav becomes 4 pills in one row; wordmark spans full width; copy and CTA below it; cans rise from the bottom. Flavour stage becomes a single centred can with arrows left/right and the description below. Manifesto headline wraps to 6 short lines (large, legible). Photo carousel stays as a swipe strip with cropped neighbours.
- The cookie card occupies ~25% of the mobile viewport on every frame - heavy.

## 3D-WEBGL (what it is, how, which libs)
- Real WebGL: 3-4 WebGL contexts created (preloader/hero/flavour stage), one GLB (`/models/can.glb`), per-flavour textures. Library not named in the page globals (THREE flag false because bundled); build is Vite (`/assets/index-*.js`) with React; Lenis chunk. Likely Three.js/R3F-style bundle - UNVERIFIED which.
- Material read: brushed-aluminium rim and neck with clean printed body; soft studio lighting; no refraction/liquid.

## PHOTOGRAPHY & IMAGE TREATMENT
- Lifestyle photography is flash-lit, candid, saturated, with the can held toward camera in every frame (nightclub, car, skate park, lecture hall, gaming chair). Cropped into rounded rectangles on a 3D arc. Product is always legible. Looks real/commissioned (not verifiable); faces are central.
- Packaging illustrations (mascot fruits with sunglasses) carry the brand character; they are the only illustration.

## WHAT WE CAN ADOPT
- Wordmark-behind-cans hero; cans cropped by the viewport edge on a diagonal.
- Per-flavour full-screen colour worlds driven by the selected can; thumbnails as live mini 3D models.
- White panel with giant corner radius as a section transition between colour worlds.
- Mobile hero re-composition (wordmark full width, product rising from bottom edge).
- A cookie/consent line written in brand voice.

## WHAT TO REFUSE
- Iridescent pink-purple-orange mesh gradient as a default background (it is justified here by flavour colours but is close to generic "AI gradient" in the hero).
- Benefit cards with big empty white faces and 01-04 numbering.
- Cookie card covering the hero at all times; stacked card carousels without product in them.
- Incomplete font stack (Helvetica Neue leaking into h1/links).

## BEST USED FOR (brand types)
Energy/functional/soda/kids-adjacent sparkling drinks with a character-led can; any flavour-range product where each SKU has its own colour.

## TECH FINGERPRINT (libs, fonts, canvas, scroll engine)
Vite + React (bundled `/assets/index-*.js`), Lenis chunk, WebGL (3-4 contexts) with `/models/can.glb`, fonts Soledago + Bounded Medium (self-hosted woff2), 54 requests, single host. No GSAP global detected. Weakness list: cookie overlap, empty cards, black gaps in scroll frames (unverified cause), `h1` is 32px Helvetica (visually hidden SEO heading).
