# REFERENCE_DNA — #01 Playdate

(est.) = measured off screenshots. Computed styles come from `inspect.json` / my own DOM probes at 1440x900 and 390 wide. Motion milliseconds are NOT verified for any reference (stills; software GL starves rAF). KINORIA's only timing evidence is FWA's 60 fps preview clip: text lines fade in over about 0.3 s, smooth.

## A. Oryzo (Lusion): stage, scene worlds, grid
- **Type (1440):** h1 123 px / 110.7 / -0.018em; h2 51 uppercase 500; nav 12 px uppercase 500; stat words 146-226 px sentence-case 600; "sustainability" set bold at about 94% of viewport width (est.). Mobile h1 99.8, h2 39.5. Real font Halyard (do not ship); candidates for the Typography Director to test, not decided: Instrument Sans, Hanken Grotesk, Schibsted Grotesk, Bricolage Grotesque for the quirk the lane asks for.
- **Grid:** 16 columns, side padding 3.125vw (45 px), gap:column 24:90. Headline left at the 45 px margin, object in the centre third (about 35% width), caption right.
- **Scene rule:** each scene swaps ground colour AND type scale (olive / magenta thermal gradient / green mat photo / macro texture / cream / olive-yellow / black table) while the object, grid and nav never move.
- **Stage:** fixed 1440x900 WebGL2 canvas, pinned object, scroll scrubs rotation (top-down, 3/4, edge-on, underside). One key light upper left, soft contact shadow, rim light when edge-on.
- **Nav:** four text anchors, active one underlined; 5 px cream progress bar on the right edge. Mobile: "MENU" pill, object enlarged to about 75% width.
- **Intro:** vector outline with anchor handles draws the object, pull-focus into the real thing, chrome appears.
- **Reproduce:** pinned single object; left/centre/right scene composition on 16 cols; ground-colour flips; right-edge progress bar; construct-the-object intro; poses that show real product facts (front, edge-on 9 mm thickness, back, crank out).
- **Refuse:** continuous scrub, dark brown palette, faded low-contrast captions, joke copy, cork scenes.

## B. KINORIA: input model, feedback, rail, interstitial
- **Mechanism:** one stroke = one frame; a counter is consumed (36 down to 32 in the preview); the object is operated, not displayed. 41 sound files; sound toggle at the rail's foot.
- **Intro:** the viewfinder doubles as the loader: focus readout 23% to 100% while the scene resolves, then the object snaps sharp (duration under software GL is not representative).
- **Rail (1440):** vertical-rl labels 13 px / 500 / +1.82 px uppercase (index numeral + word), strip about 40 px wide, labels on a 118 px pitch, wordmark 14 / 600 / +3.08 px at top, active tab filled cream.
- **Interstitial:** nav click shows a film strip with perforations and canister titled "02 SHOT" before the scene arrives.
- **Mobile:** rail becomes MENU / CLOSE (11 px / 600 / +1.32 px); full-screen list 36.7 px / 700 / +0.18 px uppercase with 12 px numerals.
- **Spec list:** parts named like a datasheet, active row white, others dimmed.
- **Failure state** in voice: "THE ROLL DID NOT LOAD" 12 / 600 / +3.84 px, RELOAD.
- **Font:** Archivo variable (OFL, shippable). **3D:** KTX2 GLBs + 4 canvases.
- **Reproduce:** gesture-consumes-unit logic, rail geometry, interstitial concept, numbered mobile menu, dimmed-sibling spec list, sound toggle, designed failure copy, object occluding giant type.
- **Refuse:** fire-light brown, blur-heavy easing, camera HUD readouts (focus %, f-stop), four-canvas weight.

## Secondary snippets
Baukasten: edge strips as index, bottom sheet on mobile (not its half/half layout). Radian: sticky list, ink #121714 active vs 20% alpha siblings; yellow only on one pill. OXI: title 302 px / lh 211 / -0.09em split around the device. Nota: black block staircase wipe. Sigma BF: annotated diagram tiles. Noomo: `steps(2)` loader, `steps(4)` clip-path wipe.

## Synthesis (recompose, never a screen-by-screen copy)
**Idea:** the page is the Playdate's own launcher; the crank is the only way to move through it, one click at a time.
1. **Stage (A).** Fixed canvas, device pinned in the centre third on flat brand yellow `#ffc833`; daylight key from upper left, matte plastic (device plastic `#fbc651`), soft contact shadow. Left headline / right caption on a 16-col grid with 3.125vw padding. Each chapter flips ground and type scale (yellow, black, warm grey, yellow) and changes pose: front, 3/4, edge-on 9 mm, crank out, back.
2. **Input (B, designed).** Accumulate angle: 1 wheel notch (100 px) = about 35 degrees, drag on the crank or the touch dial = true angle. 12 detents per revolution (30 degrees), one revolution per chapter, about 70 ticks site-wide. Each tick: crank snaps 30 degrees in `steps(3)` over 90 ms, body rocks 0.6 degrees for 2 frames, the screen advances one sub-state (no empty ticks). 60 ms lockout after a tick to tame trackpad inertia. Keys: arrows = 1 detent, PgUp/PgDn = 1 chapter. Reduced motion: instant state change, no snap, no sound.
3. **Chapter change (B + Noomo/Nota technique).** 480 ms interstitial: the on-device launcher cards slide (real Media Kit UI), field colour flips hard on step 3 of 6, `steps(4)` stair-step clip wipe on the page. Interruptible, queue depth 1.
4. **Index (B + Baukasten).** Desktop: left rotated-label rail (readout and click targets). Right-edge 5 px progress bar quantised to detents (honest sequence, not decoration). Nav on the device itself: D-pad up/down selects chapter, A confirms, B returns to hello. Mobile: bottom touch dial arc, MENU opens B's numbered full-screen list; Baukasten-style bottom bar of chapter ticks.
5. **Hero (OXI/Noomo).** Stacked official wordmark at about 90% width behind the device, crank visible, screen already alive; device occludes letters.
6. **Screen.** Live canvas texture on the 400x240 screen: `#312f28` on `#b1afa8` with dither (BRAND.md); 1-bit type only here.
7. **Specs (Sigma + Radian).** Annotated diagram with leader lines for parts the brand names; sticky list with dimmed siblings.
8. **Feedback.** Sound toggle in the rail (default off): one synthesised click per tick, heavier clunk per chapter. Failure copy in brand voice for WebGL loss.
9. **Voice.** Short deadpan lines from the copy bank only.

**Lane separation:** 05 Teenage Engineering is time-quantised, dense, grid-first; ours is angle-quantised, one object, low density. 04 owns bounce physics (we use none). 07/02/03 are dark, quiet or light-grey.
**Verify in build:** tick feel and pose stepping in QA timeline frames, since no benchmark timing exists.
