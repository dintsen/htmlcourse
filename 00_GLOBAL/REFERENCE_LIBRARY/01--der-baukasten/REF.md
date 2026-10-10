# 01--der-baukasten — https://www.der-baukasten.com/ (opened = true; scout verdict, RQD pending)

Evidence: inspect-ref (10 desktop frames, hovers, 4 mobile, contact-d/m, inspect.json). Credit on page: "Crafted with ❤ by tubik" (tubik design studio). FWA of the Day, 80 pts (FWA /api/cases). Short piece: docHeight 9,034 px desktop (≈10 screens), 6,981 px mobile. Not verified: easing/timing (stills only), audio, the footer "Contact Us" target.

## WHAT IT IS
A concept site for a magnetic wooden/colour-block toy set: three animals (rooster, stork, horse) each assembled from scattered 3D pieces. A hero, then three steps; each step brings a saturated flat-colour panel with the animal's Ukrainian name, its phonetic spelling with a speaker button (Howler audio), a line of copy and a "Download 3D Model" button. Nav: wordmark top-left, "Contact Us →" top-right.

## WHY IT IS STRONG
- Pure colour system: black stage + three flat panels (#0581fe blue, #f54d25 red, #efc11b yellow) + one off-white (#effcfc). Nothing else.
- Stepwise, not free-flowing: each panel slides over the stage and the previous panel stays as a coloured strip on the left edge (blue, then red, then yellow), so the strips are the progress index and the memory of where you are.
- Type fills the screen: hero wordmark ~94% of viewport width at the bottom edge, 3D pieces passing between its letters.
- The 3D is the toy: pieces fly in scattered and assemble into the animal while the panel changes. Object and copy change in lockstep.

## COMPOSITION
Hero: black, tiny strapline top-left (18 px), Contact top-right, wordmark 289 px along the bottom edge, pieces scattered above. Step: stage left half (3D animal centred in x 0–708), panel from x=708 (49% of 1440) to the right edge, 24 px strip at its left, 75 px top inset, inner left padding 120 px, text column ≈ 480 px: IPA line, word 163 px, 1 px rule, h4 line, body 20/24, rule, outline button.

## TYPOGRAPHY
Real: Futura PT (Adobe Fonts/Typekit, weights 300/500; commercial; do not ship). Computed (1440): h1 wordmark 288.8 px / lh 199 (0.69) / ls −23.1 px (−0.08em); step word 162.7 px / 162.7 / −11.4 px (−0.07em); body 20 px / 24 / −0.8 px (−0.04em) w400; small 16 px. Mobile: wordmark 75 px, step word 104 px (26.7vw), body 16.25/19.5. Legal alternatives (geometric humanist, single-storey a; not rendered side by side): Jost (OFL), Outfit (OFL); for a friendlier quirkier cut see TYPOGRAPHY.md for this concept.

## SPACING & GRID
Half-and-half stage/panel (49/51). Panel strip 24 px. Hairlines at ~25% opacity. Margins ~35 px wordmark/nav on desktop, ~16 px mobile.

## MOTION & EASING
Lenis smooth scroll (we refuse the glide), scroll-linked assembly of GLB pieces, panel slide-ins. Timing not verified. Custom PNG cursor.

## INTERACTION
Scroll steps through three animals; speaker button plays the pronunciation; download button; Contact. Mobile: panel becomes a bottom sheet rising to ~60% of the height; a 3-colour bar (blue/red/yellow) is pinned to the bottom edge as the step index.

## MOBILE BEHAVIOUR
Not stacked: stage remains full-screen, the colour panel rises from the bottom as a sheet, strips relocate to a horizontal bar at the bottom edge, wordmark shrinks to 75 px but remains full-width, hero pieces stay large.

## 3D-WEBGL
Three.js, Draco GLB `three/model_desktop.glb` + `camera.glb`, single WebGL2 canvas, flat-shaded matte coloured pieces with a visible tooth/noise on the surfaces, no environment reflections, soft contact. One model, many piece transforms.

## PHOTOGRAPHY & IMAGE TREATMENT
None. Colour panels carry a fine grain texture (we refuse it).

## WHAT WE CAN ADOPT
Stage + sheet structure; strip index; wordmark across the bottom with objects interleaved; mobile bottom-sheet + bottom bar; the discipline of three flat colours plus one off-white; word-first panels with a rule, one h4 line, short body, one outline button.

## WHAT TO REFUSE
Grain on panels; Lenis glide; black stage (ours is yellow daylight); Futura-style type; "Download 3D Model" CTA; animal-assembly mechanic itself.

## BEST USED FOR
Playful object brands with 3 to 6 chapters, toys, hardware, anything where chapters can be colour-coded.

## TECH FINGERPRINT
Nuxt, Lenis, Three.js + Draco, Howler, Storyblok CMS, Vercel insights, Typekit (Futura PT).
