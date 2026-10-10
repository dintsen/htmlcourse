# 01--oryzo — https://oryzo.ai/ (opened = true; scout verdict, RQD pending)

Evidence: inspect-ref (10 desktop frames + hovers, 4 mobile, contact-d/m, inspect.json) + shoot.mjs deep scroll (14 wheel steps, software GL). Credit on page: "Designed by Lusion". FWA of the Day + FWA of the Month, 90 pts (FWA /api/cases). Lusion = FWA Site of the Year studio (lusion.co). Not seen: everything after the pinned product-rotation scene (the wheel journey stalled there; docHeight 49,967 px desktop / 48,176 px mobile means FEATURES / PRODUCT / CONTACT exist but were not captured). Motion timing not verified (stills).

## WHAT IT IS
Satirical launch site for a cork coaster sold as an "AI" product ("Powered by AI*", footnote "*Adobe Illustrator"). One real-time WebGL2 product, a fixed canvas, a very long pinned scroll; nav = INTRO / FEATURES / PRODUCT / CONTACT with a right-edge progress bar.

## WHY IT IS STRONG
- One object, one idea: the whole page is the coaster turning in space, lit like a product shoot. Recognisable from a single frame.
- Intro constructs the product: olive field, Bezier-handle outline (orange anchor points, dashed guides) draws the ring, then blurs into the photographed object on a cutting mat, then the site chrome appears. The "making of the object" is the loader.
- Dry-deadpan copy carries the brand voice; type is quiet and tiny against the object.
- Navigation is honest information: current section underlined, progress bar always visible.

## COMPOSITION
Desktop product scene: headline left (x≈45 px, ~2 lines), object centre (~35% of viewport width), caption right (3 short lines); wordmark top-left, nav top-right, footnote bottom-right. Object occupies the middle third and rotates top-down, tilted, edge-on, underside, back with scroll.

## TYPOGRAPHY
Real: Halyard Display variable (display) + Halyard Text (Adobe Fonts / Typekit, commercial; do not ship). Secondary Literata + DM Mono (OFL, self-hosted woff2). Computed (1440): h1 123 px / lh 110.7 / ls −2.2 px (−0.018em); h2 51 px / 51 / 0, uppercase, w500; h3 33.75 px uppercase; nav + links 12 px uppercase w500; huge stat words 146–226 px (lh 1.2) sentence case w600; one 409 px numeral. Mobile h1 99.8 px / 80 / −1.8; h2 39.5 px. Legal alternatives (character: soft neo-grotesk, mild quirks, tall x-height; not rendered side by side): Instrument Sans, Schibsted Grotesk, Hanken Grotesk (all OFL).

## SPACING & GRID
`--grid-columns: 16`, `--site-padding-x: 3.125vw` (45 px), gap/column ratio 24:90. Everything sits on that 16-col grid; wordmark and nav share the 45 px margin.

## MOTION & EASING
Scroll-scrubbed rotation of the product (continuous, no steps). Text fades in/out on scene entry (headline from 20% to 100% opacity over ~100 px of scroll). Nav letters are doubled spans (roll-on-hover). Intro: construction lines draw (~3 s) then depth-of-field pull-focus to the photograph. No GSAP/Lenis/Three globals detected: custom engine (Astro build, `hoisted.*.js`).

## INTERACTION
Section nav with active underline (dotted), always-visible right progress bar (5 px cream), nav anchors #hero #features #testimonies #contact. Mobile: wordmark + dashed-outline "● MENU" pill.

## MOBILE BEHAVIOUR
Re-composed, not stacked: headline top-left at 40 px, product enlarged to ~75% of width and centred, caption bottom, progress bar kept, nav collapsed to MENU pill.

## 3D-WEBGL
Fixed 1440×900 WebGL2 canvas (+ small extra canvases for details). Photoreal cork (PBR, subsurface-like warm falloff), single warm key light from upper left, near-black falloff, soft contact shadow, rim light on the edge when edge-on. Product-accurate, not a primitive.

## PHOTOGRAPHY & IMAGE TREATMENT
No stock. Hero frame is a shallow-DOF photograph of the object on a green cutting mat, graded warm; the 3D matches that grade.

## WHAT WE CAN ADOPT
Single-object pinned rotation tied to scroll; construction-of-the-object intro; section index + progress rail as the only chrome; deadpan voice; product lit by one key light with falloff; mobile re-crop (object bigger than on desktop).

## WHAT TO REFUSE
Dark brown palette; smooth continuous scrub (our lane is quantised); satirical "AI" joke; tiny low-contrast captions during fades (legibility); the cork/coaster scene itself.

## BEST USED FOR
Single hero-object product pages where the object must feel physical; hardware with one strong silhouette.

## TECH FINGERPRINT
Astro, custom scroll engine, WebGL2 fixed canvas, Typekit (Halyard), self-hosted Literata/DM Mono, Vimeo player embeds, Cloudflare analytics. No GSAP/Lenis/Three globals exposed.

## DEEP-CAPTURE ADDENDUM (2026-10-10, scout; frames in `deep/desktop/`: contact-deep.jpg, contact-late.jpg, state-oz-*.jpg)
Later scenes ARE now evidenced (the RQD condition "only scene 1" is lifted). Scene sequence seen: (1) olive intro with vector outline and "ISN'T JUST A COASTER."; (2) "Powered by AI*" with the object over a hand photo and a neon-rim colour flash; (3) "It's wearable" (giant sentence-case word crossed by red ribbon cut-outs, object inside a thin frame); (4) scenes where the whole field changes world: purple-magenta thermal gradient with a spec caption, green cutting-mat photograph, macro texture close-ups of the material, a cream field with "sustainability" set at about 94% of viewport width in heavy sentence-case grotesk (cream is the only light scene), olive-yellow "Drop-Tested" with the headline overlapping the object and a photo strip sliding in, vertical-slit scene, and a final dark spec table of three variants. Rule to take: every scene changes the ground colour and the typographic scale completely while the object and the 16-col grid stay constant.
