# cat-drink--santioni-spirits

URL: https://santionispirits.com/  |  opened: true (needed a GPU-string override to get past the site's own "browser not supported" gate, see TECH)
What I looked at: inspect-ref run (age gate only, because the gate blocks scrolling), then a scripted run that passes the gate and wheel-scrolls 16 steps on desktop (frames `_timeline/desktop/state-s00..s19`) and 10 steps on mobile (`_timeline/mobile`), plus intro timeline t-*.jpg. Read: contact sheets, s02/s03/s05/s06/s08/s09/s10-s19, mobile contact.
Credit (CSS Design Awards listing): Active Theory (USA), collaborator Plan8 (sound); CSSDA Website of the Day Aug 26 2026 and Website of the Month Aug 2026 (judge scores 9.0-9.5). Product: ready-to-pour cocktails (meta description: "Cocktails to Indulge Now, Atone Later").
Verdict: PRIMARY CANDIDATE - the strongest art direction in this category. Whitelist-level (it is an Active Theory build).

## WHAT IT IS
A narrative brand experience for a cocktail brand: loader -> age gate -> "The Notturno Experience", a scroll-driven graphic-novel about a hooded pilgrim ("the Saint") crossing a mist land to a gate, a red disc, a cathedral, ending in a drink pour and a drink/collection selection. Top-right nav has two real destinations, EXPERIENCE and COLLECTION. The whole site is one WebGL stage (html overflow hidden, touch-action none), there is no conventional page scroll.
Not seen by me: the pour scene, the drink selection and the Collection UI (the 16-step desktop journey ends in the red cathedral; a second capture that jumps to COLLECTION via the nav is queued - see the end of this file for its result if it ran).

## WHY IT IS STRONG
- One graphic idea executed everywhere: engraved/linocut illustration (hatched robes, stipple, woodcut crowd strokes) on a paper-white page with a four-colour world - near-black, paper, tan robe and one saturated red - so every frame is recognisable from one screenshot.
- The brand is a character and a story, the product arrives as the payoff of a narrative (pour -> selection), not as a hero shot.
- The interface is drawn in the same language: hard-bordered white caption boxes with a hard offset shadow, scribbled-rectangle YES/NO buttons, a red scroll thumb on the right edge, a sound-bars audio toggle bottom-right.
- Typography is an Art Nouveau/Deco wedge-serif for titles and a heavy uppercase rounded grotesk for captions - the two voices never blur.
- The age gate (a legal necessity for spirits) is turned into the first art-directed scene ("ARE YOU OF / LEGAL AGE?" set at 159px, top and bottom of the viewport, answer buttons in the middle).

## COMPOSITION
- Gate: two-line headline pinned to top and bottom edges, a 2-button row at the vertical centre with a small ornament between them. Nothing else on screen.
- Hero: "THE NOTTURNO EXPERIENCE" two-line title centred at 30-65% height over brush-stroke waves on #1d1d1d, white ink splash rising from the bottom edge, logo (saint seal + script wordmark) top-left, nav pill top-right.
- Story scenes: full-bleed comic panels, each panel a quad that is skewed/cropped/slid by scroll; caption boxes placed off-axis (left-mid, right-low) so the eye zig-zags across the figure; large negative space on the paper background between panels (s09 is almost empty paper with two fragments - it reads as a deliberate pause).
- Palette change as pacing: white paper (pilgrimage) -> red wood-grain (the gate/disc) -> black + red cathedral (climax with a panel of eyes) - the colour of the page, not text, signals the chapter.

## TYPOGRAPHY (real font, how identified, closest LEGAL alternative with source)
- Identified from the page's inline `@font-face` (read from served HTML) and computed styles: **Charles Rosie Regular** (`assets/fonts/CharlesRosie.woff2`, display, always uppercase, `letter-spacing .005em`, line-height 1.2) - foundry NOT identified (web search finds nothing under that name; probably custom or small-foundry); **PP Nikkei Maru** (Regular + Ultrabold, Pangram Pangram, rounded Japanese-inspired grotesk) for captions/UI, 15px uppercase, weight 800; **GT Era Text Light** (Grilli Type) for body text, 15px/1.5, weight 300.
- Scale from the served CSS: heading1 217px (>=768px, fluid down to 70px at 390), heading2 200px at >=1920 (70px at 390), heading3 82px (40px at 390), body-bold 15px, body-regular 15px. Gate headline computed 159px / line-height 1.0 / tracking +0.005em at 1440.
- Legal alternatives: I rendered 8 candidates against the gate headline (image kept as `_font_test.jpg` in this folder; all OFL from Google Fonts via fontsource): Instrument Serif, Gloock, Limelight, Federo, Playfair Display 700, Bodoni Moda 600, Rozha One, Bellefair. RESULT: none is a match. Instrument Serif has the closest condensed proportion and rhythm but is lighter and cleaner; Gloock/Playfair are wider and heavier; Limelight is the right era but too fat. Practical route: Instrument Serif at large sizes for titles, or draw the 3-4 hero titles as SVG lettering; captions -> a heavy rounded grotesk such as Zen Maru Gothic Bold (Google Fonts, OFL; NOT rendered/verified here); body -> any light humanist sans.

## SPACING & GRID
- No visible grid; a free-composed stage. UI inset: logo at x=22/y=18, nav pill right-aligned with ~24px right margin and 24px from top, caption boxes ~300-480px wide. Mobile nav pill shrinks to a single small white pill (m frames).
- Gate headline is positioned by the viewport edges (top/bottom), not by a rhythm.

## MOTION & EASING (observed - say 'not verified' if only stills)
- Observed in stills (software-rendered, so timings are meaningless here): loader = saint seal drawing itself with rays + a hand-drawn progress line under it; gate hover = YES/NO label glitches into scribbled rectangles (state-s01) and the box border thickens (mobile focus state); hero title seems to have a ghost/duplicate letter layer (the doubled "O" in "NOOTTURNO" - could be a mid-transition frame); caption text arrives with a jitter/echo-offset (letters shown doubled in s05/s06/s08, mid-reveal) and some words flip red; ink splash blobs change between frames; scroll moves panels with skew and crops.
- Easing/duration: NOT verified. Scroll is virtual (Hydra `Scroll` class) so wheel input is eased by the engine; I could not time it.
- Preloader on this machine lasted >5 s (t-05000 still shows it), software GL - not representative.

## INTERACTION (cursor, hover, nav, sticky, transitions)
- Nav: pill with two text items EXPERIENCE / COLLECTION and a small red glyph between them; the active item is black, the other grey. Fixed, always visible.
- Right edge: a red vertical scroll-progress thumb that changes length/position; bottom-right: audio toggle (sound bars) - the bundle contains an AudioManager with panner/filter effects and a voice-over timestamp file (`assets/data/vo/all_timestamps.json`), so captions are likely narrated (not heard here).
- Cursor: bundle contains `CursorShader` / `GLUICursor` classes; custom cursor not seen in stills (headless, mouse position only).
- Chapter changes are scene swaps driven by scroll (class names `ApproachScene`, `AntiGravityScene`, `CathedralScene`, `ColosseumScene`, `EyesOpenScene`, `DrinkPourScene`, `DrinkSelectionScene`, `CollectionScene`, `FooterScene` appear in the served JS, and a `geometry/story/pillarcrumble` asset folder).
- Accessibility: a hidden `GLA11y` DOM layer mirrors the text (headings and links were readable by the extractor), plus an "access denied" screen for NO.

## MOBILE BEHAVIOUR
- Desktop and mobile are separately composed: gate headline reflows to two big blocks at top/bottom; hero title fills the full width in two lines, the white ink splash is cropped to the bottom edge, nav shrinks to a single small pill (no red glyph), logo shrinks.
- The DOM contains a "Please rotate your device" overlay string (82px) - orientation handling exists; I did not see it triggered (portrait works through the hero).
- On mobile my wheel-driven scroll did not advance past the hero (frames identical) - the engine needs real touch gestures; mobile story scenes are NOT verified.

## 3D-WEBGL (what it is, how, which libs)
- Active Theory's proprietary Hydra engine (page sets `CREATED_WITH_HYDRAX = "1.1.20"`), WebGL2, a UIL scene-layout JSON (`assets/data/uil.*.json`), Lottie loader (`lottie.min.js`), Draco decoder, Basis/KTX2 textures (`cap_label.ktx2`, `cap_basecolor.ktx2` -> a bottle cap with a PBR material), PBR lookup `pbr/lut.png`, RGBM diffuse/specular environment maps, blue-noise texture, spline JSON for "wind curves/ground curves" (`geometry/story/...`).
- Scenes are shader-drawn illustration: the comic panels are quads with masked/hatched textures and noise (`perlin.png`, `cell_noise.png`, `clouds_noise.png`, `skylines.png`), not video. Drink pour uses a fluid solver class (`FluidScene`, `PourFX`, `DrinkPourGlassShader`, `DrinkPourBackgroundShader`) and a PBR bottle (`BottlePBR`, `BottleShader`). These class names come from the served bundle; I did not see the pour itself.
- Platform gate: the engine's `UnsupportedRedirect` marks any browser whose GPU string matches its blocklist (list includes "swiftshader") as unsupported and shows "YOUR BROWSER IS NOT SUPPORTED". On a real GPU this does not apply.

## PHOTOGRAPHY & IMAGE TREATMENT
- No photography. All imagery is illustration: engraved line art with stipple and hatch, flat tan (#786640-ish in shadow, lighter on lit areas), black, paper #f5f5f5, a saturated red (pillars read ~#b3231c) and a deep red wood-grain (#6b2a22-ish). Paper-grain overlay on the white pages. Faces are drawn, never photographed; eyes are used as a punctuation panel (s19). Colours quoted are eyedropped from JPEG frames, approximate.

## WHAT WE CAN ADOPT
- Turning the legal age gate into a first scene with its own type, glitch-scribble answer buttons and an honest "access denied" screen.
- Scroll-driven comic-panel storytelling with panel skew/crop/slide transitions, captions in hard-bordered boxes, off-axis placement, long negative-space pauses.
- Restricted palette per chapter (paper / red / black) as the pacing device.
- Nav pill with a hard 1-2px border + offset shadow, a red edge scroll thumb, a sound toggle that is tied to a real narrated track.
- Product revealed as the payoff of a story (pour -> selection -> collection).

## WHAT TO REFUSE
- GPU blocklist that locks out software-rendered/older machines with a dead-end message - ship a lighter fallback instead.
- Virtual-scroll-only stage with `overflow:hidden` (no native scroll, keyboard/AT dependence on a hidden mirror layer).
- Jittering caption text at 15px while the text is being revealed - unreadable mid-reveal; and captions in all-caps heavy weight for long sentences.
- Very long preloader before anything is visible; a "rotate your device" prompt.
- Stories where the product waits until the end - fine for an awards piece, risky for commerce.

## BEST USED FOR (brand types)
Spirits, wine, aperitifs, craft beer, any heritage or premium brand whose strongest asset is a story/world and whose product reveal can be a climax; also coffee/tea rituals if illustrated.

## TECH FINGERPRINT (libs, fonts, canvas, scroll engine)
Hydra-X 1.1.20 engine (Active Theory), single full-screen WebGL2 canvas (2160x1350 at 1440x900 viewport), virtual scroll, Lottie, Draco, Basis/KTX2, Google Analytics, no GSAP/Lenis/Three globals. Fonts: Charles Rosie, PP Nikkei Maru (Regular, Ultrabold), GT Era Text Light (self-hosted woff2). 219 requests from one host. No console/page errors in the shoot report; overflowX false; 0 failed requests.
