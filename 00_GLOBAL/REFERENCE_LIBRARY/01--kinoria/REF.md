# 01--kinoria — https://kinoria.studio/ (opened = TRUE on 2026-10-10; scout verdict PRIMARY-conditional, RQD pending)

Evidence: own Chromium sessions at 1100x650 and 1440x900 (software GL starves rAF, so 120 s screenshot timeouts at a small viewport were needed; the earlier failures were the 30 s default). Frames: intro focus-pull (3), 26 wheel steps (contact-d-scroll.jpg, d-03/06/10), nav click interstitials (nav-02-shot-interstitial.jpg), pointer state of the ARCHIVE scene (contact-states-...jpg), mobile m-00. Network list in `requests.json`. FWA's own 60 fps preview clips (develop/archive/intro, 9 s each) were decoded to stills (fwa-preview-*.jpg) to see the SHOT / DEVELOP scenes I could not drive. NOT verified: the live SHOT interaction itself (taking four frames), millisecond timings of wheel response (rAF stalled; log in my notes: 4 frames in 14 s), audio.
Credit: Seunghyuk Kim (solo). FWA of the Day 2026-09-30, 82 pts (FWA /api/cases). Not a whitelist studio: admitted on execution depth, not pedigree.

## WHAT IT IS
Launch/portfolio site for a fully mechanical 35 mm camera "and a site that makes you use it": load a roll, look through the finder, take four frames, they develop in the dark and join an archive of 4,104 photographs. Nav: 01 DETAILS / 02 SHOT / 03 ARCHIVE / 04 ABOUT. Virtual scroll (document height = viewport).

## WHY IT IS STRONG
- The product is experienced as an object you operate: copy is about the mechanism ("ONE STROKE ONE FRAME", "THIRTY-FIVE DECISIONS", "NO RETRIES"), a counter is consumed (36 exposures, "THE OTHER 36 ARE OUT THERE" ticking down), and the spec list names real parts (lens, film advancer, aperture ring, rewind knob).
- Intro IS a viewfinder: blurred field, focus readout 23% to 100%, bracket resolves, camera snaps sharp.
- Section jumps are not cuts: clicking a nav item plays a film-strip interstitial (perforations, 35 mm canister, "02 SHOT") before the next scene.
- 41 audio files (advance, shutter, click, whir, paper) under /sound/v2: feedback is sound-first.
- A designed failure state ("THE ROLL DID NOT LOAD", RELOAD) in the same voice.

## COMPOSITION
Camera pinned centre; giant uppercase statements cross it (object in front of/behind letters, blurred pre/post state); spec list at right with active row white and others dimmed, tiny label under the object; left vertical rail; one white-on-black palette with fire-light orange.

## TYPOGRAPHY
Archivo variable (self-hosted woff2; OFL, Google Fonts: shippable as is). Rail/nav 13 px / 500 / +1.82 px, uppercase; brand 14 / 600 / +3.08 px; error 12 / 600 / +3.84 px. Mobile menu list 36.7 px / 700 / +0.18 px uppercase, index numerals 12 px / 500 / +2.64 px. Display statements est. 7-8 vw, 700-800, uppercase, leading about 0.95 (measured off screenshots).

## SPACING & GRID
Left rail about 40 px wide: 14 px vertical-rl labels (x = 12.5), four labels on a 118 px pitch at 650 px height, wordmark top, sound toggle bottom. No visible column grid; centre-axis composition.

## MOTION & EASING
Cinematic, smooth (text fade-in about 0.3 s in the 60 fps preview), blur-to-sharp focus pulls, camera idles with fire-light flicker; interstitials and sound carry the tactility, not stepped easing. Refuse the smoothness; keep the principle.

## INTERACTION
Wheel/drag moves scenes; nav rail with active tab filled cream; ARCHIVE scene is drag-to-look-around plus click-a-film-to-enter; custom focus-bracket cursor with orange centre dot; sound toggle.

## MOBILE BEHAVIOUR
Re-composed: portrait viewfinder crop, rail replaced by MENU / CLOSE button and a full-screen list (36.7 px) with numerals; contact line at the end.

## 3D-WEBGL
4 canvases at 1440x900 (1 fixed WebGL + 2D layers), KTX2-compressed GLBs (`loop_camera_premwhite_eye_ktx2_2048.glb`, `loop_hand_scan_ktx2.glb`), photoreal PBR, no GSAP/Lenis/THREE globals (custom engine).

## PHOTOGRAPHY & IMAGE TREATMENT
Archive photos arrive in a distorted perspective wall; warm low-key grade; grain only where it is the subject (film).

## WHAT WE CAN ADOPT
One gesture = one consumed unit with a visible counter; interstitial that visualises the object's own mechanism; sound toggle in the rail; vertical rotated-label rail (desktop) and numbered full-screen list (mobile); spec list with dimmed siblings; designed failure copy; object occluding giant type.

## WHAT TO REFUSE
Dark brown fire-light palette; smooth blur/fade easing; four-canvas weight; fake HUD readouts (focus %, f/2.0, 1/60 are real here only because the object is a camera: do not transplant).

## BEST USED FOR
Hardware whose value is in operating it (cameras, instruments, handhelds with a physical control).

## TECH FINGERPRINT
Custom engine, WebGL + 2D canvases, KTX2 GLBs, 41 mp3/wav, Archivo variable.
