# locomotive--scout-motors — https://www.scoutmotors.com/ (opened = true)

Evidence base: inspect-ref.mjs run (16 desktop frames d-00..d-17 incl. hover d-hover-0..2, 9 mobile frames m-00..m-08, contact-d/contact-m, inspect.json) + direct reading of the site's own public HTML and `_astro` JS bundles via curl (component names, sequence config, font-face rules). Frames were looked at. Anything not seen is marked "not verified". Credits (Locomotive case page https://locomotive.ca/en/work/scout-motors, self-reported): Creative Director Dust Leblanc, Art Director Bastien Allard, Technical Director Mathieu Ducharme; awards listed there: Awwwards E-Commerce of the Year, Site of the Day, Developer Award (not independently checked, Awwwards is blocked here).

## WHAT IT IS
Launch / reservation site of Scout Motors, the revived American off-road EV marque (Traveler SUV and Terra truck). A single long home page (document height 17,890 px at 1440x900, about 20 screens; 15,226 px at 390 wide) that is almost entirely scroll-scrubbed film: hero autoplay video, then a 384-frame image sequence, then a 193-frame sequence, then a camp video, interleaved with heritage (1961) archive material and text beats. Built with Astro (`/_astro/*` bundles), custom elements (`<c-sequence>`, `<c-sequence-key>`, `<c-viewfinder-title>`, `<c-home-treadmill>`), GSAP, Lenis. Commerce layer = Stripe + reservation flow (RESERVE is the persistent CTA).

## WHY IT IS STRONG
- Product is shown only as large cinematic film/CGI at golden hour and night, never as a catalogue; the page reads as a short film you scrub with the wheel. One idea (return of a legend) carried by one visual language across ~20 screens.
- Type is the second hero: a brand-owned wide grotesque used huge (270 px "An Icon From Day One") over archival cards, against small calm 16 px body. The big type is tied to an object (arc of numbered archive brochure cards) so it is composition, not decoration.
- Strong restraint in palette: cream #EDE9E8, ink navy #11232F, white, one orange #FF5432 (CTA, "Day One", small tick marks). Photography carries all the colour.
- Persistent but quiet CTA: the orange "Be one of the pioneers. RESERVE NOW" card sits bottom-right in the frame while content changes behind it.
- Desktop and mobile use different sequences (1280x720 landscape vs 720x1280 portrait frames) — mobile is re-framed, not cropped.
- Heritage section earns the revival story with real archive imagery (brochures, 1970s lake/fishing, balloon) and a B&W/grain treatment of the original Scout.

Weaknesses (no flattery):
- Hero headline "Scouts always come back." is white on a bright copper car body in d-01; legibility depends on the video frame. Small legal copy (price / disclaimer) sits at 12–14 px over moving video.
- Weight and fragility: 3 big sequences + videos + a stack of third-party tags (GTM, Datadog RUM, Bing, Reddit pixel, TV Squared, reCAPTCHA, Stripe, TrustArc). Time-to-stable was ~30 s in our throttled run (machine was heavily shared; absolute number not meaningful).
- White bands: in 8 of 16 desktop frames (d-05, d-06, d-09, d-10, d-12, d-13, d-16, d-17) the top 30–60 % of the viewport is blank white while the next scene is entering from the bottom. This is either a real pin-release gap between scenes (page background is #fff) or a capture-timing artefact of wheel-scrolling under Lenis with software rendering. NOT VERIFIED either way. If real, it is a visible seam.
- TrustArc consent card (white, system Arial/Source Sans, 3 full-width buttons) is not dismissed by inspect-ref on mobile and covers about 40 % of every mobile frame (m-00..m-08); it is a generic, off-brand element sitting on top of an otherwise tightly art-directed page.
- Mono labels (IBM Plex Mono caps) on nav and buttons are small (12 px) and tracked normal; fine here because they are functional, but an easy cliché if copied.

## COMPOSITION
Seen in frames (desktop 1440x900):
1. d-01 hero: full-bleed video, nav as two white rounded rectangles (left: logo + TRAVELER SUV / TERRA TRUCK; right: RESERVE + hamburger) separated by a short orange tick; headline centred low at 72 px; hairline rule across the bottom with tiny labels: "AMERICAN BUILT" (left), "EST 2022" (right), price disclaimer centred.
2. d-03/d-04: scroll hands over to a dusk drive (two vehicles on a dirt road); orange card "Be one of the pioneers. RESERVE NOW" bottom-right.
3. d-05/d-06: "An off-road icon reborn." left-aligned, 72 px, with two ghost buttons (TRAVELER SUV / TERRA TRUCK) over a frontal shot of the Terra at sunset (copy + buttons sit in the left 35 %, vehicle centre).
4. d-07/d-08: "The one that started it all." in the same left-aligned slot, but the plate is desaturated 1960s-style grain with the original Scout; OUR STORY button. Same layout, different era = narrative device.
5. d-09/d-10/d-11: cream section (speckle texture), 1961 tag (orange outline pill), 9-line paragraph in left 25 %, then 270 px wide-grotesque "An Icon From Day One" (navy, "Day One" in orange) behind a semicircle of tilted archive brochure cards numbered 01–0n riding a thin circular arc, thin horizontal hairlines. Cards pass in front of the type as the arc rotates with scroll.
6. d-12/d-13: full-width photo plates with ~6 px radius and 75 px side margins (lake fishing, hot-air balloon with an International Scout) — archive-as-editorial.
7. d-14/d-15: night sequence (dust, lit front light bar) then camp (red truck, fire, tent, people at the lake) — the electric vehicle light bar is the visual signature.
8. d-17: navy #2F3566 section with 200+ px white "The Scout" and two lat/long micro labels (they read 41°03'36.0"N 85°04'33.2"W and 34°12'44.4"N 80°59'38.7"W; my inference: Fort Wayne IN and Blythewood SC — NOT verified on the page).
Not reached by the capture (stopped at scrollY 10,750 of 17,890): reveal-event slider, product tiles ("The duo that does it all"), "In it for the long haul", legal notes, newsletter, footer with a 504 px "RESERVE" word (computed styles only, not seen).

## TYPOGRAPHY (real font, how identified, closest LEGAL alternative with source)
- Real: **Scout Sans V4** custom family, 4 cuts loaded: Regular, Medium, Wide Medium (display), SemiCond Bold (the 504 px RESERVE). Identified from @font-face in the page CSS (`ScoutSansV4-Regular_ttf`, `ScoutSansV4-Medium_ttf`, `ScoutSansWideV4-Medium_ttf`, `ScoutSansSemiCondV4-Bold_ttf` .woff2) and computed `font-family` (scout-sans-wide-medium etc.). Proprietary brand font — do not download or reuse.
- Real (labels): **IBM Plex Mono** Regular 400 / Medium 500 (OFL — legal to ship), 12 px caps, used for nav, buttons, micro labels.
- Computed scale: h1/h2 hero beats 72 px / lh 64.8 px (0.9) / ls −1.44 px (−0.02em), weight 400 of Wide Medium; giant 270 px / 270 px (1.0) / −5.4 px (−0.02em), `text-transform: capitalize`; RESERVE 504 px / 504 px / −10.08 px uppercase; h3 28 px / 30.8 px / −0.56 px; body 16 px / 20 px (1.25). Mobile: h1 42 px / 37.9 px (0.9), giant 97.5 px / 97.5 px, ls −1.95 px.
- Closest legal alternative (tested): **Archivo** (variable, wdth 62–125, wght 100–900, SIL OFL, Google Fonts https://fonts.google.com/specimen/Archivo). I rendered "Scouts always come back." with Archivo instances against the d-01 crop: wdth 100 / wght ~600–620 with −0.02em tracking measures ~840 px at 72 px versus ~846 px in the reference, same double-storey a and round o character. wdth 104–108 is too wide, 125 far too wide. For the SemiCond Bold cut use Archivo wdth 75 / wght 700. Body: Archivo wdth 100 wght 400, or Fontshare Switzer if a more neutral text face is wanted. Labels: IBM Plex Mono is the same font (OFL, @fontsource/ibm-plex-mono).
- Nothing in the reference uses a serif; the system is one wide grotesque + mono labels.

## SPACING & GRID
- Root vars: `--grid-columns: 4` (mobile-first grid, gutter .25rem), `--grid-margin: clamp(1rem, -.5rem + 7.5vw, 6.25rem)` → 100 px side margin at 1440 (hero copy sits exactly on x=100 in d-06/d-08), `--container-large-margin: clamp(1rem, .43rem + 2.86vw, 3rem)`, `--header-max-width: 1240px`, `--header-height: 48px`, button radius 2 px, menu item radius 6 px.
- Header floats 24 px from the top with 100 px margins; the 1240 px bar is split into two plates with a 4 px gap bridged by an orange tick (d-01).
- Section rhythm is set by pin length, not padding: the main sequence has CSS var `--sequence-height: 6.4` (viewport heights), the second `6.43`.
- Text blocks are narrow (≈ 410 px copy column on desktop) and left-anchored; the huge type spans nearly the full width (≈ 900 px of 1440).

## MOTION & EASING (observed — say 'not verified' if only stills)
Verified from code, not from video: scroll-scrubbed WebP **image sequences drawn on `<canvas>`** (`c-sequence` element: `data-type="scroll"`, `data-images-sequence` JSON = 384 frames / 12.8 s / 30 fps / extension webp / desktop 1280x720 path `desktop_720_80/`, mobile 720x1280 path `mobile_720_70/`; second sequence 193 frames / 6.43 s), plus autoplay muted loop videos (`hp1017.webm`/`.mp4`, `camp1015-*.webm`, mobile variant `hp1017_mobile`). `c-sequence-key` elements fade text beats in/out between `data-from`/`data-to` seconds (e.g. 1.25→24; 3→6; 7→10). `c-viewfinder-title`: words masked and rising `y:100%`, GSAP `power4.out`, stagger 0.2, progress driven by scroll (not time). `c-home-treadmill`: `sine.inOut` timeline scrubbed by scroll progress into a CSS var `--progress`. Scroll engine attributes (`data-scroll`, `data-scroll-offset`, `data-scroll-call`, `data-scroll-event-progress`) match Locomotive's own Locomotive Scroll (Lenis based); Lenis detected on the page by inspect-ref.
Observed in stills only: each scene change happens by a new plate sliding up over the previous one (d-04/d-05, d-09/d-10). Real-time smoothness, easing curves, and the white-band question: **not verified**. A timeline/journey re-shoot is queued (`_timeline/`), see end of file for whether it arrived.

## INTERACTION (cursor, hover, nav, sticky, transitions)
- Cursor: browser default (`cursor:auto` on body), no custom cursor. Hover probes (d-hover-0..2) show no visible effect on the elements probed (they landed on the night/camp frame because the scroll did not return to top; not meaningful).
- Nav: floating split-plate header, mono caps; RESERVE is the only filled CTA; hamburger opens a full menu (links to /ourstory, /community, supply.scoutmotors.com, /newsroom, /events, /careers, support) — menu open state not captured.
- Sticky: headline copy and the "Be one of the pioneers" card stay fixed while sequences scrub (frames d-03 → d-08).
- Page transitions: none observed (separate pages /traveler, /terra exist; transition not captured).

## MOBILE BEHAVIOUR
From inspect-ref m-00..m-08 (the consent card hides the lower 40 % of each): header keeps the two-plate pattern, narrower (logo | RESERVE + burger, orange tick between). Hero uses the portrait 720x1280 sequence: vehicles sit in the lower half, the upper half is open sky (room for type). h1 drops to 42 px, giant "An Icon…" to 97.5 px stacked on 4 lines ("An / Icon / From / Day One"; the home also toggles `sm:u-hidden`/`to-sm:u-hidden` spans so desktop shows "An icon / from / day one"). Mobile page is ~15.2k px tall vs 17.9k desktop. Scroll progress on mobile: wheel 700 → only 350 px of movement per step under Lenis smoothing. Remaining mobile scenes beyond ~2,800 px: queued re-shoot (see end).

## 3D-WEBGL (what it is, how, which libs)
No WebGL context (`webgl: 0`). The "3D" look is pre-rendered CGI/film played back as WebP frames and videos on 2D canvases (2 canvases `c-sequence_media_element`, 1440x900). Libs on the page: GSAP, Swiper (react build), Lenis, Stripe, no Three.js. Lesson: a cinematic car page does not need real-time 3D; pre-rendered scrubbed sequences give far more control over light and material.

## PHOTOGRAPHY & IMAGE TREATMENT
- Hero/film: golden-hour and blue-hour CGI/film with strong rim light; night sequence is almost black with the light bar and dust as the only light — mood and brand device in one.
- Heritage: real archive imagery (brochures with illustrated cars, 1970s family and balloon photos) shown full-colour on cream, and a monochrome grain pass of the original truck in the "started it all" scene.
- Texture: cream sections carry a fine speckle/noise (visible in d-09, d-12); the original-Scout plate is halftone-like grain. Cards have white borders and a number in mono.
- Image corners: ~6 px radius on photo plates; sharp elsewhere.

## WHAT WE CAN ADOPT
- Scroll-scrubbed frame-sequence architecture: WebP frames (1280x720 desktop / 720x1280 portrait mobile, ~80 % / 70 % quality) on canvas with `from/to` text keys — directly usable for a car, shoe, drink-can or camera hero where we can produce frames (Three.js/Blender-like render captured through Chromium or ffmpeg from video).
- "Same layout, different era" device: repeat an identical text slot across scenes so the brand story (past / present) is read by contrast.
- A giant display word that is physically interacted with by objects (cards on an arc passing in front/behind).
- Persistent, tiny, brand-coloured CTA card that never leaves the frame.
- Two-plate floating header with a one-colour tick as brand accent.
- Separate portrait sequence for mobile.

## WHAT TO REFUSE
- White gaps between pinned scenes (if real).
- Consent card styled differently to the site.
- Mono caps as a universal label system; use only where data needs it.
- Reproducing Scout Sans or the Scout logotype; we use Archivo/Plex Mono equivalents only for a different brand's concept.
- Heavy third-party tag stack.

## BEST USED FOR (brand types)
Automotive / mobility, outdoor gear, any heritage-revival product (watches, motorcycles, audio), launch/reservation pages, products that can be filmed or rendered cinematically. Poor fit for dense catalogues or utilitarian shops.

## TECH FINGERPRINT (libs, fonts, canvas, scroll engine)
Astro; custom elements (c-sequence, c-sequence-key, c-viewfinder-title, c-home-treadmill, c-splitlines, c-product-tile, c-menu, c-autoplay-video); GSAP (`/_astro/gsap.*.js`), Swiper (react), Lenis (detected), Locomotive-Scroll style data attributes; canvas 2D x2 (1440x900), WebGL 0; webm/mp4 videos incl. Contentful-hosted reveal video; fonts: Scout Sans V4 (4 cuts, proprietary) + IBM Plex Mono 400/500 (+ TrustArc Source Sans Pro for the consent card); analytics/ads: GTM, GA4, Datadog RUM, Amplitude, Bing UET, Reddit pixel, TV Squared, Stripe.js, reCAPTCHA; consent: TrustArc; header 48 px; grid 4 cols.

## UPDATE (timeline / mobile re-shoot)
(pending — see below if appended)
