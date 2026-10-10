# REFERENCE_DNA — #01 Playdate

Numbers are computed styles at 1440×900 / 390×844 from each reference's `inspect.json` unless marked (est.) = measured off a screenshot. Motion timings were not verified (stills only).

## A. Der Baukasten (tubik): structure, colour, type
- **Type scale (1440):** wordmark 289 px, line-height 0.69, tracking −0.08em, spans ~94% of width at the bottom edge; step word 163 px / 1.0 / −0.07em; body 20/24 / −0.04em; small 16 px. Mobile: 75 px wordmark, 104 px step word (26.7vw), body 16.25/19.5. Real font Futura PT (do not ship).
- **Hero structure:** black stage; strapline top-left 18 px, one link top-right; scattered 3D pieces; wordmark on the bottom edge occluded by pieces.
- **Grid:** stage 0–49%, panel 49–100%; 24 px edge strip on the panel's left; 75 px top inset; inner left padding 120 px; text column ≈ 480 px; 1 px rules at ~25% opacity; palette: #0581fe, #f54d25, #efc11b, #000, #effcfc.
- **Nav / scroll:** scroll advances one chapter; a new panel slides over the stage and the old one remains as a strip (the strips are the index). Mobile: sheet rises to ~60% height, strips become a bottom bar (≈16 px, est.).
- **Image treatment:** flat-shaded matte 3D on the stage, no environment reflections.
- **Reproduce:** half-stage/half-panel desktop structure; strip-as-index; bottom-sheet + bottom-bar mobile; one rule, one h4, short body, one outline button per panel; wordmark across the bottom with the object interleaved.
- **Refuse:** grain on panels; Lenis glide; black stage; Futura-style geometric type; animal-assembly mechanic; "Download 3D Model" CTA.

## B. Oryzo (Lusion): object choreography, nav, voice
- **Type scale (1440):** h1 123 px / 110.7 / −0.018em; h2 51/51 uppercase w500; h3 33.75 uppercase; nav 12 px uppercase; stat words 146–226 px. Mobile h1 99.8, h2 39.5. Real font Halyard (do not ship).
- **Grid:** 16 columns, side padding 3.125vw (45 px), gap:column = 24:90.
- **Scene structure:** headline left (≈45 px margin), object centre third, caption right; wordmark top-left, nav top-right.
- **Scroll technique:** fixed WebGL canvas, pinned scene, scroll scrubs object rotation: top-down → 3/4 tilt → edge-on → underside → back (continuous; ours is quantised to detents). Document ≈ 55 screens.
- **Intro:** olive field → vector outline with anchor handles draws the object → pull-focus into the photographed object → chrome appears. Ours: the device resolves from a 1-bit dither/outline on its own screen colour.
- **Nav:** four text anchors, active one underlined, 5 px cream progress bar at the right edge; mobile pill "● MENU" with dashed outline.
- **Lighting:** one warm key light from upper left, dark falloff, soft contact shadow, rim light on edge-on poses. Ours: daylight window light on yellow, no black falloff.
- **Reproduce:** pinned single-object scene with caption/headline on either side; progress rail; poses chosen to show the real product (front, edge/thickness 9 mm, back, crank folded out); enlarged object on mobile.
- **Refuse:** smooth continuous scrub; dark brown palette; faded low-contrast captions; satire; cork scene.

## C. Noomo: hero depth, loader, canvas architecture
- **Type scale:** display 120/62/60/42 px, caps, line-height 1.0 (Neue Machina); nav 14 px caps (Neue Haas). Tiny UI (pills 12–16 px) around huge word.
- **Hero structure:** giant word centred, object overlaps letters (jellyfish over S, ball between R and A, scanner through P); info rail at bottom: category pill left, description right, CTA centre.
- **Motion:** loader `steps(2)` 3 s infinite on a flat colour; transition = clip-path polygon wipe with `steps(4)` strip; GSAP ScrollSmoother `smooth 1.5` desktop / 0.2 touch (refuse).
- **3D:** one fixed 1440×900 WebGL2 canvas, Draco GLBs, MeshPhysicalMaterial; mobile drops objects (refuse: ours keeps the device).
- **Reproduce:** stacking order word → device → (masked) front letter; `steps()` easing as the project's quantised language; bottom info rail.
- **Refuse:** pixel-block plinth and ornaments; frosted-glass blobs; faded copy; agency sections.

## Synthesis plan (no screen-by-screen copy)
**Idea:** the page is the device's own screen and launcher; the crank is the only input that advances it.
1. **Stage = A + B.** Persistent full-viewport canvas on a saturated Playdate-yellow field with one daylight key light; the official-silhouette device sits in the centre third. Poses per chapter follow B (front / tilted / edge-on / back, crank folded out).
2. **Chapters = A's panels, re-skinned.** Each detent of the crank slides in one panel (warm grey or black "screen card", not a rainbow); previous cards remain as edge strips (desktop left, mobile bottom bar) and are the index; purple stays the single action colour. Chapters from BRAND.md: System, Design, Crank, Season, Catalog, Buy (4–6 earned scenes).
3. **Hero = C.** Official stacked wordmark (vector from Media Kit) huge behind the device, device occluding letters; loader and chapter transition use `steps(n)` ticks.
4. **Input (gap, designed from the brief):** wheel/drag/crank rotates the device's crank in 15–30° detents; each detent = one `steps()` tick (visual click, optional sound later); no glide anywhere.
5. **Screen:** live canvas texture on the device screen shows each chapter as a 1-bit scene (real device UI/game art from the Media Kit); this is where pixel/dither type is allowed.
6. **Voice:** short deadpan lines in B's register, built from the brand's copy bank only.
7. **Mobile:** B's enlarged object + A's bottom sheet and bottom strip bar; crank becomes a touch dial arc.

**Lane separation:** not 05 (grid/spec density, BPM stepping): ours is single object, low density, crank-detent; not 04 (bounce physics): no bounce easing; not 07/02/03: bright chromatic, device-centred.
