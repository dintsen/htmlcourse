# locomotive — https://locomotive.ca/en (opened = true)

Evidence: inspect-ref run (d-00..d-13 incl. hover d-hover-0..2, m-00..m-08, contact sheets, inspect.json), all looked at; plus the site's own public HTML/CSS (main.css, home HTML) read with curl. Page is 6,598 px tall at 1440 (5,385 at 390): a short agency home. Capture caveat: Lenis smooth scroll under software rendering produced offset frames (header drawn mid-page in d-03, d-09); treated as capture artefacts, not design.

## WHAT IT IS
Montreal agency home (also the studio that built scout-motors, mate-libre, the-drake-hotel). Sections: c-home-hero (900 px looping muted Vimeo 1080p video), an about block with two small real-time 3D canvases, c-featured-links (ruled list of giant project names), c-home-extras (Extras (13): articles, annual trips, store), footer.

## WHY IT IS STRONG
- Type is the whole interface: a light condensed serif at 70-115 px over a plain Helvetica-style grotesque at 26 px, black and white, hairline rules, nothing else. One screenshot is recognisable (d-04, d-05, d-11).
- Inline pictograms are typeset as glyphs inside sentences (OPS/DES/DEV lockup, asterisk, "LOCO" superscript, diamond-L, Q box, arrows between lines of the address in d-10/d-11). In the DOM they are emoji codepoints (h1 text contains them), so the display font appears to carry a custom glyph set mapped onto them (inferred; font file not opened). The footer address, set at 115 px with real coordinates and phone, is the best footer in this set.
- Hero: red-lit portrait video; the header and parts of the h1 use mix-blend-mode difference (CSS: `.is-over-home-hero .c-header{mix-blend-mode:difference}`), so white text turns cyan on the red and stays white on the dark face (d-02 crop). Cheap, memorable colour move.
- Featured work is a typographic menu, not a card grid (d-04, d-05): 110 px names centred between hairlines, with a tiny preview image beside the active row. The Lightship row was caught mid text-scramble ("ghihsptLi") and its preview mid pixel-reveal: motion is in the type.
- Restraint: only the hero and the two 3D canvases are not type.

Weaknesses: transparent header with no backdrop collides with content text (d-03, d-10..d-12 "30 USD" under the nav); home shows almost no client imagery; hover states for the work list not captured (probes landed on the hero), so reveal behaviour is unverified; mobile frames m-05, m-07, m-08 show large blank white bands (probably reveal-on-scroll not yet fired; unverified); default cursor; keyboard focus styling not checked.

## COMPOSITION
12 columns, 20 px gutter, 40 px margin. Header (4rem): logo left at x=40, asterisk mark at ~x=290, nav as one comma-separated sentence "Work, Agency, Careers, Store" starting at column 7 (x=730), "Let's talk" right. Hero h1 bottom-left, two lines. After the hero: label/copy pairs offset by grid (e.g. "Running" right-aligned at x=480, black 440 px canvas at col 3-5, "2018-2024" at x=960; "Seven Years Running / The dynasty" is a gold ring in a canvas). About: 70 px paragraph spanning full width, then a 440x586 black canvas (rigged person) at col 3-5 with 26 px copy and two ruled link rows at col 7-9. Extras: label column left, list from col 7 to the right edge, hairline between rows. Store: two products, one 670 px wide, one 440 px at the far right (asymmetric). Footer: 4 link columns above the giant address.

## TYPOGRAPHY
- Display: **PP Locomotive New Light** (`LocomotiveNew`, PPLocomotiveNew-Light.woff2; from @font-face and computed styles). "PP" prefix and a Pangram Pangram project in Locomotive's work list suggest a Pangram Pangram cut; commissioned/custom status not verified. Do not ship.
- Text/UI: **Helvetica Now Display Regular** (HelveticaNowDisplay-Regular.woff2), Monotype, commercial.
- Scale (computed): html 15 px (17/19/21 at 1600/2000/2400 px); h1 70 px / 77 lh (1.1), ls normal; huge 7.64vw = 110 px (work names) and 115.2 px (footer); body/nav/h2 26 px / 31.2; h3 15 px. Mobile h1 36/39.6. All at weight 400, no tracking changes.
- Legal alternatives: display **Instrument Serif Regular** (OFL, Google Fonts, @fontsource/instrument-serif). Tested: "Digital-first Design Agency" measures 636 px at 70 px vs about 698 px in d-02; at 77 px it matches and the character (narrow, high contrast, flared serifs) is close, stroke slightly heavier than the Light original (scratchpad render loco-font-test.png). Text: Fontshare **Switzer** (ITF Free Font License) or Google Inter Tight / Hanken Grotesk for Helvetica Now proportions (not rendered side by side).

## SPACING & GRID
Spacing tokens (px, desktop/mobile): tiny 20/20, small 30/30, medium 40/40, large 80/52, big 150/80, huge 200/100, enormous 250/140. Tablet 8 cols, mobile 4 cols with 10 px gutter and about 20 px margin. Rhythm is hairline rules (1 px, `--border-size`) between rows rather than padding. Themes via `data-theme`: default black on white; primary #DA382E; secondary #312DFB (white on blue); menu overlay colour #312DFB (menu not opened in capture).

## MOTION & EASING
Observed in stills: first-load screen is black with the logo lockup, then lines of text stacked with staggered horizontal offsets ("Digital-First Agency / Based in Montreal, Canada" caught mid roll in d-01), then the hero video. Code: only `cubic-bezier(.215,.61,.355,1)` (43 uses, easeOutCubic) and `(.23,1,.32,1)` (9 uses, easeOutQuint); body locked with `.is-first-loading`. No GSAP detected; Lenis present; own `data-module-*` / `data-scroll-*` modules (their article titles say they avoid frameworks). Timing and scramble/pixel mechanics not verified (see timeline note below if added).

## INTERACTION
Cursor default (no custom cursor). Header links underline on hover (CSS: thickness = border size, offset .1em). Work rows are links with a preview image. Mobile uses a "Menu" button. Not verified: menu open state, work-row hover, page transitions.

## MOBILE BEHAVIOUR
Hero uses a tighter portrait crop of the same video, h1 36 px bottom-left, the lockup keeps its bordered OPS/DES/DEV mark; a block mosaic over the eyes was visible in m-00 (a pixel reveal in progress; unverified). Work names stacked with rules (size estimated from frames, about 38 px, not computed); the 3D canvases scale to 170x238 (ring) and 350x466 (person); footer address wraps to five lines at full serif size and stays the hero of the page. Header = logo, asterisk, Menu.

## 3D-WEBGL
Small, purposeful: `ring.compressed.glb` and `uploads/team/3d/laurence-rigged.compressed.glb` (a rigged team member shown on black), Three.js 0.165 bundled (global not exposed), Draco decoder fetched from unpkg, 3 contexts (1 webgl, 2 webgl2), two canvases 440x616 and 440x586. Hero is plain video, not WebGL.

## PHOTOGRAPHY & IMAGE TREATMENT
One saturated hero video (red gel, blue light dots), then near-no photography: black canvases, flat product packshots on #F1EFEF for the store. Images sit square-cornered.

## WHAT WE CAN ADOPT
Typographic list as primary navigation to products/rooms/models with a small preview; inline glyph/pictogram typesetting; difference-blend header on a hero; address/contact as a giant footer sentence; hairline-ruled label/value tables; one tiny real-time 3D object per page instead of a full scene.

## WHAT TO REFUSE
Unbacked transparent header over body text; emoji-codepoint glyph hacks (build proper icon glyphs/SVG); blank reveal gaps; copying the Locomotive lockup or its fonts.

## BEST USED FOR
Brands whose product is culture, craft or editorial voice (hospitality, publishing, fashion house, furniture); contact/footers; list-based collection menus. Weak for product-tech or cinematic launches (see scout-motors).

## TECH FINGERPRINT
Custom CMS site, vanilla JS modules (`app.js`, `vendors.js`), Lenis, Three.js 0.165 + Draco, Vimeo video, matomo + GA + Cloudflare insights, reCAPTCHA; fonts PP Locomotive New Light + Helvetica Now Display; 12-col grid; easings above; canvases 2 (440x616, 440x586).
