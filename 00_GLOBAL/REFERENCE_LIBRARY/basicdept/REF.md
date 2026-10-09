# basicdept — https://www.basicagency.com/  (opened = true, with one major caveat)

Opened with `inspect-ref.mjs` (16 desktop + 8 mobile frames, hover probes) and `shoot.mjs` timeline (0/300/700/1200/2000/3200/5000 ms). Frames looked at: contact-d, contact-m, d-02..d-09, d-17, d-hover-0/1/2, m-00, m-03, timeline t-00000 / t-00700 / t-05000.
CAVEAT (important): the hero is a full-bleed looping H.264 video. Headless Chromium here has no H.264 decoder (pageErrors: "Failed to load because no supported source was found" x3), so the hero renders as an empty #f4f4f4 field with white nav text on top. I did NOT see the hero playing in a browser. To understand it I downloaded the two mp4s the page references (cdn.sanity.io, 1920x1080 h264; loop/muted = 19 s hero loop; second = 59 s reel with audio, opened by the WATCH REEL cursor) into scratchpad only (not in the library) and looked at sampled frames. Motion of the hero video itself is therefore: content known from frames, timing/transition not verified.
WebFetch of basicagency.com is blocked at the egress proxy; the real-browser path worked. The /services (Work) page and case-study pages were NOT opened by me for this entry (harvest of /services was queued behind the shared Chromium slot and never returned in time) - nothing below claims anything about them.

## WHAT IT IS
Studio site of BASIC/DEPT(R) (the San Diego agency BASIC, now part of DEPT; home page states "global branding and digital design agency building products, services, and eCommerce experiences"). Next.js/React page, 9866 px tall at 1440 (9261 px at 390). Sections found in DOM: menu overlay, home-intro (hero reel + award row), home-overview (statement + B/D(R) mark), home-case-studies (3-up strip of Patagonia / Wilson / Google Store), home-clients ("Featured Engagements" draggable strip: Google, KFC, Wilson, AT&T ...), home-spotlight ("BASIC/DEPT(R) helps brands connect w/ culture", Adweek Agency Spotlight), home-news (list of 8+ press/news rows), footer. Nav: Work (/services), About, News (/blog), Thinking, Careers, Contact.

## WHY IT IS STRONG
- One typeface, one idea: ultra-tight uppercase bold grotesk against a quiet paper-grey field. The whole page is recognisable from the type alone (the 90px "B/D(R)" lockup at x=835..1360, d-04).
- Disciplined 1280 px content column with 80 px margins and a 20 px gutter, hairline rules instead of boxes, tiny uppercase captions: it reads as editorial print, not as a template.
- Photography does the colour work (Patagonia climbers, Wilson tennis crop, red Telfar-style bag, Glossy summit). UI chrome stays black / grey / one pink.
- Light-to-dark scroll transition (d-07 mid-grey -> d-08 dark #252422 with pink #f9cdcd type) is the single dramatic move and it is strong; footer is a clean inversion.
- Custom cursors carry real information (WATCH REEL label with "BASIC/DEPT(R) 2010-oo" sub-label; pink DRAG disc on the carousel).
- The client work it links to is the real quality evidence (see basicdept--* entries); the studio site itself is the restrained wrapper.

## COMPOSITION
- Desktop frame 1440x900. Left margin 80, right edge 1360. Hero: full-viewport video, logo top-left, six nav links centred-left (x 400..1040), "..." menu top-right (x 1340..1360).
- Award row (d-03): three centred logos (AdAge / Webby / Campaign) with two-line uppercase captions, large empty space above and below, hairline rule below.
- Statement row (d-04): left a 36 px (approx., measured from frame) sentence block ~570 px wide, "SEE THE WORK" outlined pill under it; right a gigantic bold "B/D(R)" wordmark ~525 px wide. Asymmetric two-column balance, mark bleeds to the right margin.
- Case strip (d-05): portrait 4:5 crops (413x517 px) in a 3-column grid, 20 px gutters; caption block (name 24 px bold uppercase, 14 px uppercase descriptor) directly under each image; third project's caption sits in column 3 while its image is not yet present (lazy / scroll-driven, not verified). Bottom hairline with counter "00 /05" and a single dot at the right.
- Engagements strip (d-06): headline "FEATURED ENGAGEMENTS" 42 px; below, 4 columns (logo, short rule "-", name, paragraph). Fourth column deliberately cut off by the viewport edge to signal drag. Progress hairline at the bottom (thick dark segment on a light track).
- Spotlight (d-07): left-aligned 5-line headline (the 90/81 "q" style, line pitch ~81 px measured) on a background that is mid-transition; a filled disc replaces a word-space ("BRANDS (disc) CONNECT W/ CULTURE"). Right 55% of the frame intentionally empty.
- News (d-08/d-09): rows = 1px rule, 413x303 thumbnail left, headline 42 px uppercase (weight 400) in columns 2-3, "PRESS 10.11.24" label bottom-aligned to the thumbnail, arrow top-right. ~403 px row pitch.
- Footer (d-17): dark panel, B/D(R) small mark top-left, 32 px statement + underlined e-mail top-right, then left newsletter field (underline input + arrow), right three columns SOCIAL / INITIATIVES / OFFICES with filled-dot bullets, bottom bar #191918 with copyright, tagline "EASY TO UNDERSTAND, IMPOSSIBLE TO IGNORE.(TM)", terms.

## TYPOGRAPHY (real font, how identified, closest LEGAL alternative with source)
- REAL FONT: **Scto Grotesk A** (CSS family name `SctoGroteskA`). Identified from `document.fonts` / @font-face in inspect.json: files `/_next/static/media/SctoGroteskA-Bold.d6497298.woff2`, `SctoGroteskA-Medium.2ede3563.woff2`, `SctoGroteskA-Regular.1e986128.woff2` (+ .woff). Mapping oddity in their CSS: font-weight 700 = Bold file, 400 = Medium file, 300 = Regular file. All three reported loaded (`loadedFonts`). Foundry: per aggregator sites (maxibestof.one etc., not verified against the foundry's own site) Schick Toikka, Florian Schick / Lauri Toikka, 2018, commercial, the wider sibling of Scto Grotesk B. Do NOT ship their files.
- Computed scale, desktop 1440: "q" (the spotlight statement, line pitch matches) 90/81 (lh 0.9) tracking -4.5px (-0.05em) 700 uppercase; h2 42/46.2 (lh 1.1) -2.1px (-0.05em) 700 uppercase; h5 (news titles) 42/46.2 -2.1px weight 400 (=Medium file) uppercase; menu/nav links 24/24 700 uppercase tracking -0.18px; captions 14/15.96 uppercase -0.28px (-0.02em); body 14/19.6 -0.18px; cookie button 12px/700 uppercase. Mobile 390: q 40/36 -2px; h2/h5 24/26.4 -1.2px.
- The rule: all display type is uppercase, leading 0.9-1.1, tracking -0.05em, mixed with plain sentence-case regular text in the large statements. Tight tracking is the whole trick; with a loose grotesk it falls apart.
- Colour of type: #252422 on #f4f4f4; #f9cdcd on #252422; white on photo/video. Nav is white over the video, turns dark on light sections (d-hover-0 crop shows black nav) - inversion is by section.
- CLOSEST LEGAL ALTERNATIVES (judged by eye from the frames, not measured against font metrics): (1) **Switzer** (Indian Type Foundry, Fontshare, free incl. web embedding, https://www.fontshare.com/fonts/switzer) - Helvetica/Akzidenz-family neo-grotesk with horizontal terminals, good at tight negative tracking in Bold; (2) **Hanken Grotesk** or **Schibsted Grotesk** (OFL, Google Fonts) for a looser, more humanist fallback; (3) **Instrument Sans** (OFL) if a slightly wider/squarer feel is wanted. Avoid defaulting to Inter/Roboto/Arial. Test: set "B/D(R)" and a 42px uppercase H2 at -0.05em and compare terminal cuts (Scto cuts strokes horizontally/vertically, square dots) before accepting.

## SPACING & GRID
- Container 1280 px (80 px side margins at 1440; ~21 px at 390). 3 columns of 413.3 px with 20 px gutter reproduce the strip, news thumbs and column starts (x=80, 513, 947). Vertical rhythm is generous and uneven: large dead zones (200-350 px) between a rule and the next block, small gaps (10-20 px) inside blocks (image -> title -> descriptor). Hairline rules (1px #252422) are the only dividers. Pill buttons: ~150x32 px, 1px outline, 12px bold uppercase.

## MOTION & EASING (observed - say 'not verified' if only stills)
- Page scroll is native: no Lenis/GSAP/ScrollTrigger/Locomotive/Framer Motion detected (inspect.json libs: only nextjs + react). Scroll step 765 px per shot gave consistent offsets, consistent with native scroll.
- Observed in stills: scroll-linked background change from #f4f4f4 to #252422 (mid-state seen in d-07, finished in d-08); WATCH REEL disc positioned wherever the headless mouse was (t-00000 top-left, t-00700 centre-left): it follows the pointer with lag/position change; at t-00000 the label text is mid-swap (glyph overlap with the logo) - a text swap on entry.
- NOT verified: easing curves/durations, hero video-to-page transition, reveal animations (frames show no reveal animation artefacts, items appeared in place), the horizontal strip mechanics (pinned vs native overflow), logo/menu transitions. Hero video content known only from extracted frames (see below).

## INTERACTION (cursor, hover, nav, sticky, transitions)
- Custom cursors (DOM classes `cursor-takeover_*`, `carousel_cursor`; body cursor auto): WATCH REEL white disc 120 px (hero), DRAG pink #f9cdcd disc 120 px (engagements strip). Opens the 59 s reel (audio mp4) - behaviour of the opening not verified.
- Top nav is a plain row of 6 links + "..." button for the overlay `menu` (dark #252422 panel, links 24 px bold pink). Mobile: wordmark + "MENU" text.
- Section-aware colour inversion; news rows show arrow + underline on hover (underlined titles seen in several frames, presumably hover/active, not verified).
- Cookie bar (#191918, "ACCEPT COOKIES" pill) and accessiBe widget (round black icon bottom-left) sit permanently on top; both are third-party noise to refuse.

## MOBILE BEHAVIOUR
- Re-sized, not re-composed in many places: type drops to 40/24 px, 21 px gutters, news rows become stacked cards (image above, headline, label + arrow row). The "B/D(R)" lockup stays and is cropped / right-aligned above the case strip (m-02). The 3-up case strip becomes a horizontal swipe strip of two visible portrait cards (m-02) and Featured Engagements becomes one full-width card with a clipped next card (m-03). Menu becomes text "MENU". WATCH REEL disc docks to bottom-right (m-00).
- Weakness: the mobile hero is the same empty-looking field in headless (video not decoded) and the white logo/menu sit on near-white if the video does not load - in the capture the logo is barely legible.

## 3D-WEBGL (what it is, how, which libs)
None on this site: `canvases: 0`, `webgl: 0`, no THREE/PIXI. Everything is DOM + video. The studio's 3D/WebGL credentials must be sought in client projects (see basicdept--* entries); the studio home does not demonstrate them.

## PHOTOGRAPHY & IMAGE TREATMENT
- Real campaign/editorial photography, uncropped to a rigid 4:5 (cases) or ~4:3 (news), no overlays, no rounded corners, no shadows. Colour is left natural (Patagonia ochre rock + red climbers, Wilson white-on-cyan). News thumbnails mix editorial stills with graphic pixel art (magenta/violet pixel-scribble on maroon).
- Hero loop frames (from the downloaded mp4, not seen live): lifestyle clips (Wilson basketball, KFC fries splash, a woman stretching in a living room) cut with client UI shown inside flat device frames on a coloured field (Patagonia mobile PDP, Google Pixel 6 store hero on a blue field, Cowboy 4 bike on black, Wilson sportswear brand-kit flat-lay on black/white, Webby trophy on purple). Technique: cut between full-bleed film and screen-mockups on solid colour backdrops.
- A fine paper-grain noise is laid over the #f4f4f4 background (visible in all light frames). Our anti-slop catalogue rejects decorative grain: refuse, or use only if the brand has a printed-paper concept.

## WHAT WE CAN ADOPT
- Type system recipe: one grotesk, uppercase 700 at -0.05em / leading 0.9-1.1 for display, mixed with sentence-case regular at the same size for statements; 12-14px uppercase captions at -0.02em; nothing else.
- Single-column-width logic: 3 equal columns with 20 px gutter, hairline rules for structure, descriptor text hanging under images; cut the last column off the viewport edge to signal drag.
- Cursor labels that carry meaning (WATCH REEL / DRAG) instead of generic circle followers.
- Scroll-linked light-to-dark background hand-over into a one-colour (pink) type section, and the matching footer inversion.
- Giant wordmark/monogram as a layout anchor next to a small paragraph (the B/D(R) block).
- Hero as a short muted 19 s loop that alternates film and flat-device screens on coloured fields: a good way to show a brand's website next to its film.

## WHAT TO REFUSE
- The empty-hero failure mode: if the hero depends on video, provide a poster and ensure the nav is legible without it (white nav on #f4f4f4 fails).
- Award/logo rows and "Featured Engagements" client-logo carousels (social proof / logo wall - banned for our sites).
- Third-party furniture: cookie bar, accessiBe icon, tiny 00 /05 counters with a decorative dot.
- The paper-grain overlay; arrow-on-every-row pattern.
- Long uppercase 42 px headlines as body-adjacent text: legibility drops on the five-line news titles; and the page has no h1/h2 semantic headings detected (`h1: []`, `h2: []` in extract), do not copy.

## BEST USED FOR (brand types)
Fashion/apparel and sport flagships, agency-style editorial pages, consumer brands whose strength is photography and a confident wordmark; type-led layouts that need strong hierarchy without 3D. Not a model for 3D/WebGL product experiences.

## TECH FINGERPRINT (libs, fonts, canvas, scroll engine)
- Next.js (pages router: `_next/static/chunks/pages/index-*.js`), React; assets via Sanity CDN (cdn.sanity.io, 31 requests, videos and images).
- Fonts: SctoGroteskA Regular/Medium/Bold woff2.
- No GSAP / ScrollTrigger / Lenis / Three / Framer Motion detected; no canvas, no WebGL; native scroll.
- Third party: Google Tag Manager / GA, Hotjar, LinkedIn insight, accessiBe (acsbapp.com). Their CSP blocks Hotjar/LinkedIn connections in the headless run (console errors are CSP refusals, not site bugs).
- Design tokens exposed as CSS custom properties `--bd-color-*`: background light #f4f4f4, dark #252422, footer-secondary #191918, pink #f9cdcd (azalea), grey #eaeaea / #5e5e5e, status red #d64121, blue #3a97f9, green #088843 (tokens only; not seen on screen), borders #252422/#fff/#f9cdcd.
- Report: no horizontal overflow; 16 small tap targets flagged by shoot.mjs; no h1 detected.
