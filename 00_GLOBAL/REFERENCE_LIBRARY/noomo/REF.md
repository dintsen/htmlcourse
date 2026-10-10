# noomo — Noomo agency site (https://noomoagency.com/)

opened=true (inspect-ref.mjs run, 16 desktop + 8 mobile frames viewed, contact sheets viewed, inspect.json read, served Nuxt bundles read statically with curl for fingerprinting). Quality-anchor studio from the whitelist.
Capture limits: software GL (SwiftShader), headless Chromium, 1440x900 and 390x844. Frame rate, true GPU look and hover states are NOT judged from this. Intro timeline status: see MOTION.

## WHAT IT IS
Agency site of Noomo (Los Angeles, per its own meta/footer copy). The home is one fixed full-viewport WebGL2 canvas behind HTML text; the scroll is a scrubbed 3D showreel. Each featured project is a real 3D object standing on a stepped "pixel-cluster" plinth, passing in front of and behind a giant uppercase word (IMMERSIVE / INTERACTIVE / ENTERPRISE / BESPOKE). Then a statement section, services + clients lists, testimonial slider, awards table, footer contact form. Other pages: /work, /our-story, /insights, /connect; "Labs" is a separate site (labs.noomoagency.com). Nav: WORK, OUR STORY, LABS, INSIGHTS, CONNECT + "Let's work together".
Page height 24350 px desktop / 11050 px mobile.

## WHY IT IS STRONG
- One material idea carried through everything: the logo is built from stepped pixel blocks; the project plinth, the floating frosted-glass ornaments (heart, sun, bitcoin-like coin, stairs, the "m" letters) and the pill UI all come from that block language. The brand is recognisable from one screenshot (periwinkle field, black giant caps, frosted pixel blocks, saturated hero object).
- Type/3D depth interleaving: the object sits in the Z-space of the word. Jellyfish overlaps the S of IMMERSIVE (d-06), the gold ball sits between R and A of INTERACTIVE (d-08), the white scanner pierces the P of BESPOKE (d-12/d-13), the blue tile stack covers the P/R of ENTERPRISE (d-09). Letters are occluded by the object, not just overlaid.
- Real project hero objects, not generic spheres: gold basketball (Coinbase x Golden State Warriors), glass layer-cards (Salesforce), a convincing white/teal intraoral scanner (Dandy Vision; the GLB `Dendy3.glb` looks product-accurate), purple jellyfish (their Labs). Colour of the object is the only saturated thing on a pastel page, so it carries the scene.
- Restraint: UI is tiny (14 px nav, 12-16 px pills), all attention goes to type + object. Calm, soft pastel gradient with pink bloom reads premium, not techy.
- Recognition listed by the studio on the page itself (not independently verified by me): FWA 12 entries, Webby 8, Awwwards 23 (page counts).
Weaknesses (recorded honestly):
- Text is scroll-faded: project descriptions, category pills and CTA sit at low opacity for most of each scene (d-05, d-09, d-12) and are only fully legible at the end of the scrub; the hero tagline is readable once settled (computed colour rgb(35,27,53)) but is small (22 px) against the huge headline. Project description body is 16 px.
- The frosted "m" glass ornaments in the hero are blurry and half-hidden behind the headline (d-03): they read as smudges, not as a deliberate object.
- Mobile loses the whole idea in my captures: no 3D objects visible, only empty plinths with centred text (m-01, m-03). See MOBILE.
- Below the showreel (services list, clients list, testimonial cards, awards table, contact form) is standard agency furniture; it is much weaker than the first 60% of the page. Sections 2+ after the reel are not "as strong as section 1".
- On mobile the fixed logo/MENU header has no backing and collides with passing statement text (m-05: "VIDEOS" runs through the logo).
- Cold start is heavy: 30 GLBs and a showreel mp4 are referenced; time to stable was ~60 s under software GL (not representative of real GPUs, but indicates asset weight; not measured on real hardware).

## COMPOSITION
Desktop 1440x900 frames:
- Loader: flat #dee7f1, the pixel "noomo" wordmark centred (d-01), "SCROLL" + chevron at bottom centre.
- Hero (d-03): H1 in 3 lines, uppercase, justified across the full measure with big word gaps ("ELEVATES [gap] YOUR"), left x≈85 px, cap height ≈ 95 px. Tagline small, right column at x≈1130, y≈700. Frosted m-blocks drift over the type.
- Project scene (d-06/d-08/d-09/d-12): ONE composition repeated four times with a different word + object: giant word centred at y≈150-350; object centred on plinth around y≈500; bottom row: outline pill "Website" + category text at left (x=40,y≈658); project name (bold 18 px) + 6-line description in a right column starting x≈1076; dark pill "VIEW PROJECT →" centred at y≈813. Floating frosted ornaments left and right of the word, different for each project.
- Statement (d-15): left column, Neue Machina 60/60 px caps, about 860 px wide, 6+ lines; small paragraph in the far right column (x≈1137). Ghost glass "m" behind it.
- Services / Clients (d-16): three columns, outline pill as column label, plain list 16 px.
- Next: testimonials (swiper cards, white cards with logos AMD etc.), awards accordion table with counts, contact form, footer (not all frames viewed in detail).
Mobile 390x844: see MOBILE.

## TYPOGRAPHY (real font, how identified, closest LEGAL alternative with source)
Real fonts, identified from network + @font-face + computed styles (inspect.json):
- `NeueMachina` -> `/_nuxt/NeueMachina-Regular.*.otf` = Neue Machina Regular (commercial foundry font; foundry attribution Pangram Pangram is from my general knowledge, not verified in this session). Used for H1, section statements (60/60 px caps, tracking normal), the giant project words (42-120 px computed values, caps), buttons (12 px caps). Hero H1 computed 62 px / 62 px, uppercase, `font-stretch:100%`; but the visible hero cap height is far bigger than 62 px, so the heading is scaled/transformed or sized on a child (computed vs rendered mismatch, not resolved).
- `NeueRoman` / `NeueLight` -> both `NeueHaasDisplayRoman.*.ttf` = Neue Haas Grotesk Display Roman (commercial; Monotype/Linotype attribution from general knowledge, not verified here). Used for nav (14 px caps, ls 0.28 px = 0.02em, weight 500 faux/medium), taglines (22 px / 28.6 px, w500), project names (18 px w600) and body (16 px). Both are single-weight files with no weight range in @font-face, so weight 600 is browser faux-bold and 500 renders as the regular.
- Do NOT download or reuse the .otf/.ttf.
Closest legal alternatives (all fetched OK from source, none rendered side by side yet, so choose by testing):
- For Neue Machina (wide, techno grotesque caps with mono-like slab I): Martian Mono, wdth 112 / wght 400 (Google Fonts, OFL) https://fonts.google.com/specimen/Martian+Mono ; closest on width/attitude: Anybody at wdth 140-150 (Google Fonts, OFL) https://fonts.google.com/specimen/Anybody ; also Krona One (OFL) and Unbounded (OFL, rounder, not the same cut).
- For Neue Haas Grotesk Display Roman: Switzer (Fontshare, ITF Free Font License) https://www.fontshare.com/fonts/switzer ; second: General Sans (Fontshare) or Hanken Grotesk (Google, OFL). Avoid Inter as default.
Type scale seen: 120 / 62 / 60 / 42 / 40 / 28 / 22 / 18 / 16 / 14 / 12 px (desktop). Line-height 1.0 on all Machina display. Almost all display text uppercase; body sentence case.

## SPACING & GRID
- Header 96 px tall, padding 0 40 px (80 px/40 px at <=1024; 60 px/20 px at <=767) from CSS.
- Content left edge 40 px, project info column left edge ≈1076 px (desktop 1440), statement paragraph column ≈1137 px. Not a strict 12-col grid; asymmetric two-zone layout: wide type zone left/centre, small text zone right.
- Vertical rhythm: scenes are one viewport tall (scrub-length scroll per project, about 765 px steps in my screenshots), the statement and services blocks use generous empty space (>200 px between groups).
- Hero uses justified full-bleed type; side margins ~85 px on the hero but 40 px elsewhere (inconsistent).

## MOTION & EASING (observed — say 'not verified' if only stills)
Observed from stills + served code (no video review):
- ScrollSmoother (GSAP) with `smooth: innerWidth>1024 ? 1.5 : 0.2, smoothTouch: 0, normalizeScroll: true` (home chunk). Other pages `smooth:1.5`.
- Home timeline code: 36 `scrub` settings (29 true, 7 false); eases used in the home chunk: power2.inOut (39), none (22), power1.inOut (12), sine.inOut (11), back.in(1.2) (8, likely exits), power1.out (3), power2.out (3). Tween durations seen in the entry bundle include 8, 1.2, 0.7, 0.6, 0.4, 0.3 (s).
- Preloader (CSS): stepped logo animation `steps(2)` 3 s infinite (pixel wordmark flipping between frames) on #dee7f1; page-transition panel #transition = full-screen clip-path polygon wipe from the bottom edge with a 40 px Neue Machina label and a 4-step logo strip (`steps(4)`).
- d-02 shows a light band (the #dee7f1 loader panel) in the top 300 px with the hero type cut off at its edge: consistent with a vertical clip-path reveal of the loader panel (to be confirmed by the t-*.jpg frames).
- Scenes: object enters, rotates/tilts with scroll (scanner is upright in d-12, tilted ~30deg in d-13, large and cropped in d-14), word translates horizontally/vertically; info text fades in at the end of each scene (text is faint in d-05, d-09, d-12 and full opacity in d-06, d-10, d-13: fade up/down tied to scroll position).
- Intro timeline frames t-*.jpg: see below (status note appended at the end if captured).
Not verified: real-time easing curves of the 3D objects, idle motion of ornaments, hover transitions.

## INTERACTION (cursor, hover, nav, sticky, transitions)
- No custom cursor (`cursor:auto`, no custom cursor elements in inspect.json).
- Fixed header: logo left, text nav right (WORK / OUR STORY / LABS / INSIGHTS / CONNECT; "MENU" on mobile). CSS: header `.back` is a 50% periwinkle blur(15 px) panel that fades in (opacity 0 initially); hovering the logo cross-fades between two logo images.
- Primary CTA: dark pill (#181520) with white 12-14 px caps text + small arrow, centred under each project scene.
- Page change: clip-path wipe (see MOTION).
- Hover states, drag, 3D pointer parallax: not verified (no hover frames reviewed).
- No project-switch UI: purely scroll-driven linear reel.

## MOBILE BEHAVIOUR
Observed m-00..m-08 (390x844):
- Header: logo left, "MENU" text right, 60 px, 20 px padding.
- Hero: H1 left aligned, 6 lines (DESIGN / THAT / ELEVATES / YOUR / DIGITAL / PRESENCE), ~62 px, pale gradient with pink bloom; tagline 22 px under it. No 3D visible.
- Project scenes: word centred (about 44 px) -> empty plinth -> centred name + description + dark pill. The hero objects (jellyfish, ball, tiles, scanner) are NOT visible in my captures (plinth only). The home chunk branches on `innerWidth>1024` 26 times, `<1024` twice, so the objects are probably simplified or not loaded on mobile, but I did not confirm why they are absent (could be capture timing or a real mobile cut).
- Statement section: 30 px caps text, wide left-aligned; services/clients in two columns.
- Mobile docHeight 11050 px vs 24350 px desktop.
Verdict: the mobile version is a stacked column version; it drops the signature (object in the type). Do not copy this.

## 3D-WEBGL (what it is, how, which libs)
- One fixed WebGL2 canvas (1440x900 at desktop), one context.
- Three.js bundled in the Nuxt entry (strings seen: WebGLRenderer, GLTFLoader, DRACOLoader, MeshPhysicalMaterial; `outputColorSpace` implies r152+; exact revision not read). `window.THREE` is not exposed, so inspect.json shows THREE:false.
- Models: ~30 Draco-compressed GLBs loaded from `/newModels/` (BG2, Platform-O, Jellyfish, Dendy3 (scanner), CoinbaseBall2, Cards2Anim, HeartLocation, Clouds, Sun, Rocket, Eye, Bitcoin, Plug, lightning, M/O/N letters, heart, Like, SoundOff, goblet, awwwardsModel, reddot, webbby, SFDF_op1, netrixtest3, playWithMesh…) with `draco_wasm_wrapper.js`. Files are the studio's own; we do not reuse them.
- Materials: the entry bundle contains MeshPhysicalMaterial settings `transmission`, `ior 1.5`, `thickness .1`, `roughness .3` (which objects they belong to was not traced; the frosted look of plinth and ornaments is visible in the frames and consistent with transmission). Whether custom shaders/FBOs are used for the soft pink-bloom background was not confirmed (ShaderMaterial/WebGLRenderTarget strings also occur inside Three.js itself, so their counts prove nothing).
- Camera/lighting: a soft overcast studio look, no hard shadows; objects float slightly above plinth, plinth has chamfered edges and glassy tint (gold edge on the Coinbase scene shows per-scene material variants).
- Lesson: a product-accurate GLB + frosted glass plinth + giant type in depth = very strong. Transmission materials are costly (extra render pass), which may be why mobile is cut, but that reason is my inference, not verified.

## PHOTOGRAPHY & IMAGE TREATMENT
No photography on the home reel. All imagery is rendered 3D. Project thumbnails on /work pages are 3D renders or UI captures (prismic.io CDN). Testimonial and client logos only. So: no photo treatment to adopt; the 3D render look (soft overcast light, pastel field, saturated hero object) is the treatment.

## WHAT WE CAN ADOPT
- Giant-type-in-depth: object occludes part of the headline (stencil/mask or real 3D with text in the scene). Works for product brands: the product between letters of the product name.
- Scroll-scrubbed object reel where each scene shares one stage (plinth) and one grid for text, swapping word + object. Good for product ranges (variants/flavours/colourways).
- A single material motif (here: stepped blocks + frosted glass) driving plinth, ornaments, buttons.
- Pastel field + one saturated hero object; tiny UI around it.
- Preloader as brand-mark stepped animation, then clip-path wipe reveal.
- ScrollSmoother-like gentle smoothing (1.5) desktop, nearly off (0.2) on touch with normalized scroll.
- Glass via MeshPhysicalMaterial transmission, with a cheaper mobile variant.
- Bottom info rail layout: category pill left, description right, CTA centred.

## WHAT TO REFUSE
- Their below-reel agency sections (services list/clients list/testimonials/awards table): generic.
- Information text that is mostly semi-transparent while the scene is on screen.
- Blurry frosted ornaments partly hidden behind the headline.
- Mobile with no 3D and a header that collides with copy.
- The pixel-block motif itself (it is their identity) and anything that resembles it (stepped block plinths, pixel hearts); also no reuse of their GLBs, fonts, copy.
- Same composition repeated four times without variation in scale: it is clear and powerful once, but a longer reel would need more varied camera/crop.

## BEST USED FOR (brand types)
Physical product brands with a hero object that has a recognisable silhouette (devices, bottles, shoes, headphones, tools, cars as a single object), range/variant reels, launch microsites; creative-technology brand presentations with a clean, calm tone. Not for photographic/editorial fashion or food that depends on texture photography.

## TECH FINGERPRINT (libs, fonts, canvas, scroll engine)
- Framework: Nuxt 3 (Vue), Prismic CMS (images.prismic.io), GTM/GA.
- Scroll: GSAP ScrollSmoother + ScrollTrigger + ScrollToPlugin; Swiper (testimonials).
- 3D: Three.js (bundled) + GLTFLoader + DRACOLoader (wasm), 1 WebGL2 canvas, ~30 GLBs, MeshPhysicalMaterial transmission params present.
- Fonts: Neue Machina Regular (otf) + Neue Haas Display Roman (ttf), both self-hosted from /_nuxt/.
- Video: showreel mp4 (autoplay muted loop) hosted on DigitalOcean Spaces.
- Page errors: none reported by inspect.json.
