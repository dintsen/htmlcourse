# BRAND — Playdate (Panic) — research foundation
Captured 2026-10-10. Primary evidence: live play.date opened with inspect-ref (desktop 1440 + mobile 390; `_work/site-current/`), raw HTML/CSS/JS pulled from play.date/static (`_work/html/`), the official Media Kit 4.0 and Season 2 kit already on disk (`00_GLOBAL/DISCOVERY/_harvest/playdate-mediakit/`). "(sec.)" = secondary source (Wikipedia/press), use only for context, never as site copy. play.date resolves in Chromium/curl but not in WebFetch.

## 1. History and positioning
- Panic: Portland, OR software company; "Founded in 1999" per the media-kit boilerplate (https://help.play.date/press/is-there-a-media-kit/). Panic's own blog says Mac apps "since 1997" (https://panic.com/blog/the-story-of-playdate/): do not print a founding year on the site. Makes Transmit, Nova, Prompt; publishes Firewatch, Untitled Goose Game, Thank Goodness You're Here!, Arco (media kit). Independent: "we haven't sold the company or taken investments" (Cabel Sasser, Panic blog).
- Origin (Panic blog, 24 Aug 2021): c.2011 Steven Frank and Cabel Sasser wanted a tangible 15th-anniversary keepsake; first idea a clock; Cabel found the Sharp Memory LCD; idea became a Game & Watch-style device that surprises you with new games weekly. A big Portland industrial-design firm dismissed it; Teenage Engineering (Jesper Kouthoofd) said yes. Crank was a TE idea, in early sketches.
- Timeline (sec., Wikipedia https://en.wikipedia.org/wiki/Playdate_(console)): announced 22 May 2019; pre-orders 29 Jul 2021 (first 20,000 sold in 20 min); shipping from 18 Apr 2022; Catalog store 7 Mar 2023; >70,000 sold by Feb 2024; Season Two 29 May–3 Jul 2025 with surprise series Blippo+; Season Three announced 16 Apr 2026, shipped 8 Oct 2026 (https://play.date/games/seasons/three/ "Out now… Week 1 October 8–15"). Internal codename "Asheville" (Wikipedia; also the model path assets.play.date/assets/asheville/).
- Positioning, verbatim: "It's a new, tiny handheld game system with a bunch of brand-new games. We made Playdate just for fun." Idea statement: "If we made hardware, and built a tiny little game system that came with lots of surprise games, would that make people happy?" (https://play.date/). Platform stance: an open system, free SDK, sideloading, Pulp no-code editor; Education line with 15% discount. News post (Apr 2026) says nearly 2,000 games exist (https://news.play.date/); education page says "more than 1,300" (https://play.date/education/): numbers disagree, avoid counts.

## 2. Product line (official, https://play.date/shop/ , captured 2026-10-10; all items showed "Out of stock")
| item | USD | note |
|---|---|---|
| Playdate | 229 | "Fun. Yellow. Fits in your pocket. Includes Season One (24 original games)… and a crank." Yellow USB-C to USB-A cable; needs Wi-Fi for setup |
| Cover Bundle | 249 | Playdate + any Cover, "save $14" |
| Cover | 34 | magnetic folding PU cover; 4 designs: Yellow, Purple, Aqua, Pizza; "looks a bit like an ice cream sandwich" |
| Season Two / Season Three | 39 each | S2: 12 games + Blippo+; S3: 8 games, two per week for four weeks from 8 Oct (season pages) |
| Merch | Keychain 12, Tote 14, Twist Hat 14, Pin 10, Sticker Pack 5, Patch Pack 10, Yellow USB Cable 5, AC Adapter 5, Crank Thumb Repair Kit 10 | |
Specs (https://play.date/): display 400 × 240, 1-bit, "not backlit, but super reflective"; 168 MHz Cortex-M7; 16 MB RAM, 4 GB flash; Lua + C SDK; 802.11bgn 2.4 GHz; mono speaker, stereo headphone jack, condenser mic + TRRS mic-in; inputs D-pad, A, B, Sleep + Menu, 3-axis accelerometer, crank; size 76 × 74 × 9 mm; battery "14 days standby clock, 8 hours active"; 1-year warranty (shop). Display 2.7 in / Sharp Memory LCD (sec.). Software: Catalog (on-device store), Mirror (desktop streaming app), Pulp, Playdate Podcast, Caps font editor.
Do not show: the "stereo dock" (announced 2021, shelved 2024, sec.); Blippo+ third-party platforms.

## 3. Packaging (Media Kit `Playdate photos/Playdate-box-photo-1.png`, viewed)
Square-ish yellow carton (photographed ≈#EBB015 in shade), no gloss. Front: thin black line-drawing of the device, tilted ~8°, its screen filled solid black carrying the stacked white "play date" wordmark; crank drawn as an open outline. Top: wordmark upside-down with ®. Side: "Made by **Panic** with help from **teenage engineering**" with Panic × TE logos. Reviews: device sits at a slight angle inside; purple/yellow scheme; yellow cable; booklet (https://clipcontent.substack.com/p/the-playful-design-details-of-the, https://www.minimalgoods.co/article/playdate-console-review). The tilt is a brand gesture worth reusing.

## 4. Campaigns and cultural moments
Weekly "Mondays feel like Christmas morning" drop mechanic (gift-wrap bow, confetti, purple flashing lock button; reviewer description, clipcontent link above). "Crank to buy" in Catalog (same source). Season reveals as sealed-game grids with a "Wait! No spoilers, please!" toggle (play.date home). Season 3 "GET IT NOW" tilted sticker (callout-s3.png). Playdate Update Showcase on YouTube, 9 Sep 2026 (sec., https://engadget.com/2254393/playdate-season-3-kicks-off-on-october-8/). Blippo+ surprise series (sec.). Playdate Podcast (https://podcast.play.date).

## 5. Visual identity
**Colours, from the real CSS** (https://play.date/static/assets/colors/colors.45e2a71d042c.css): brand yellow `#ffc833` (P3 1 .784 .2); device yellow `#fbc651` (declared in the CSS but commented "UNUSED": the site never paints the plastic colour as a field, so use it only for the device itself); logo "play" `#ffcd3f`, "date" `#f5b528` (logo.svg); screen black `#312f28` (text, never pure black); screen white `#b1afa8`; dark gray `#57554e`; mid gray `#7e7b75`; hero/nav gray `#7a8085` with mid `#64676c` and darkest `#212223`; light gray `#bbb`; lightest `#efefef`; white `#fff`. Accents used with discipline: purple `#6c00ff` for every purchase button, aqua `#00a88a`/`#21c6a9` (Pulp/Cover/dev sections), red-orange `#ef5023`. Section sequence is colour-changing (gray → yellow → white catalog → yellow → aqua-light → purple/dark), nav recolours to match (`data-color`).
**Logo**: stacked lowercase "play/date" in a heavy, soft, humanist-grotesque with a double-storey 'a' and 'y' with straight tail; two-tone yellow on gray, white on black, or black on yellow. Vector: `00_GLOBAL/DISCOVERY/_harvest/playdate/svg/6e404a_logo.28192db8adaf.svg` and media-kit PDFs (stacked, one-colour, yellow). Co-logos: Panic cloud-P (svg 530030), TE glyph (svg 238a9f). Catalog logo svg c2f833. Don't redraw.
**Typography**: Roobert (Light 300–Heavy 800), fallback Helvetica (rendered fonts confirmed by inspect: Roobert 400/700/800). Commercial, Displaay Type Foundry, originally made for Moogfest (https://itsnicethat.com/articles/anymade-displaay-type-roobert-moogfest-graphic-design-020518): cannot be shipped. On-device UI uses Panic bitmap fonts (Asheville Sans family, plus Roobert sizes, per https://devforum.play.date/t/use-the-different-playdate-system-fonts-instead-of-the-default-one/25373); licence unstated, so do not ship; 1-bit pixel type inside the screen must be redrawn/chosen from open fonts. Scale on site: h2 68px/800 with 68px line-height (tight, sentence + full stop: "The System."), body 28.5px/400, hero line 57px/700.
**Shape language**: rounded-square slab, 4 corner screws (silver, slotted), round A/B buttons, plus-shaped D-pad, side speaker grille, silver fold-out crank with yellow dot. Speech-bubble "Hello." tile; "game cards" are 700×310 1-bit art with ripped/torn-paper top-bottom edges (catalog banner).
**Photography**: clean CGI/packshot on flat colour, plus one hand-in-yellow-sleeve lifestyle shot (`Playdate-in-hand1.png`, 2107×1761 alpha); no stock. Illustration: 1-bit dithered game art, glyph icons (tech-*.svg). Exploded-view layers PNG (`playdate-layers.png`). 
**Tone**: breezy, parenthetical, self-aware, short declaratives, double-exclamation, emoji in shop ("🟨 Yellow"). Sentences end in full stops as headings.

## 6. Existing site decomposition (inspect-ref + HTML)
Structure (15,396 px desktop, 10,254 px mobile): gray hero (3D device + big "play/date" wordmark + Shop Now!!) → yellow block: The System / The Design (exploded view, hand photo) / The Crank (3D device, crank opens on scroll, game video) / The Season (sealed 24-game grid) → white Catalog carousel → yellow SDK/Pulp/Mirror → aqua-light Education → yellow "All for just $229" + Cover + Specs table + gallery → The Idea / Who Made It → purple/dark footer.
Tech: custom three.js-based `model-viewer.min.js` (webpack bundle, THREE + lodash, matcap + irradiance json); parts `asheville_base`, `_crank`, `_screen`, `_screen_border`, crank-open variants; screen texture = video (`launcher-scroll-animation-v4.mp4`, `crankin.mp4` on assets.play.date); drag-rotate; crank opens when device is 75% visible; `prefers-reduced-motion` fallback = static PNG + "Watch the game!" button; 30 s load watchdog. No GSAP/Lenis; native scroll; IntersectionObserver carousel; umami analytics. No GLB/OBJ obtainable in the harvest (`models/` empty); official PBR textures (albedo/metallic-AO per part, 512²) exist but without the mesh.
What works: the device is genuinely the hero; yellow-as-page works; copy voice is excellent; section colour changes; static fallback.
What is wasted/weak: hero text collides with the viewport bottom (headline starts at y≈830 of 900) and the "Hello." screen is dim grey-on-dark (not the reflective-white 1-bit look); crank is not scroll- or drag-linked; spec table, gallery, price and Education are stacked as ordinary web blocks; Season grid is a wall of thumbnails; nav is a row of tiny icon+label links (Games, Dev, Education, Help, Sign In, purple Shop) with an emoji-weight look; the DOM callout link `#calloutSeasonThree` still reads "Preorder Season 3" while the visible hero sticker says "GET IT NOW" (stale copy, verified in `_work/html/home.html`); long page, sections 5–7 lose the device entirely.

## 7. Competitors (opened via inspect-ref, contact sheets viewed)
- Steam Deck (steamdeck.com): dark, video-led hero, glowing screen, tilted floating game tiles, "Your games, everywhere"; white nav bar, red Buy Now; premium, loud, cinematic.
- Evercade (evercade.co.uk): black page, neon-blue cyber grid, cartridge walls, red CTAs, aeromatic/supreme fonts; Lenis + GSAP; busy, nostalgia-by-density.
- Analogue (analogue.co, from `00_GLOBAL/DISCOVERY/candidates/analogue.md`): quiet grey Next.js, small hero on flat grey, commercial pixel/mono type.
Pattern: all competitors are dark/neon "gamer"; Playdate's bright, daylight, matte-plastic world is unoccupied.

## 8. What the brand owns (honour)
Yellow-on-matte-plastic; the crank (silver, fold-out, side slot); the four screws; 1-bit black/white screen with dither; stacked lowercase wordmark; full-stop headings; "Hello."; the tilt; weekly surprise/unwrapping; purple as the single action colour; warm greys (never cold neutral black).
## 9. Avoid
Neon/gamer-dark, glow, chrome, glass; redrawn or recoloured logo; Roobert/Asheville files; invented specs, game counts, review stars, sales numbers; third-party game art beyond what the Media Kit/Catalog publicly shows (credit developers; Season grid art belongs to each developer); Teenage Engineering marks beyond Panic's own "with help from" credit; the shelved stereo dock; implying the crank charges the battery (official copy says it does not); claiming availability (shop shows Out of stock) or implying orders can be placed here (link out to play.date/shop instead); Blippo+ and the pizza cover as hero content; date-bound status ("Preorder"/"Out now") in headlines, since it changes weekly. Mark as not affiliated with Panic/TE; Playdate is a registered trademark of Panic.

## REDESIGN HEADROOM
1. Device is already the hero but passive: no crank loop. Biggest gain: make crank rotation the only navigation, each detent = one "frame" of a game-like scene on a bright reflective 1-bit screen (the real display is the brand's best idea and the site hides it).
2. Real screen look is dull on-site: a true 400×240 pixel grid in `#312f28` on `#b1afa8` with dither beats the current dim "Hello." tile and is faithful to a reflective Memory LCD.
3. Page is long, colour-block web; replace with stepwise scenes (System / Design / Crank / Season / Catalog / Make your own / Buy), keeping brand colour-change idea.
4. Hero typography: current headline is cut off by the fold; a composed statement at 1440×900 and 390×844 is free upside.
5. Specs, price, cover, Season sit in bland blocks; the real specs are rich (76×74×9 mm, 400×240, 14 days clock) and can drive an exploded-view/spec scene.
6. Mobile is the desktop stacked; crank should become a touch dial/drag arc.
7. Sections 5–7 abandon the device: keep it present everywhere (screen content changes).
8. Avoid claiming stock (all shop items out of stock on capture date).

## COPY BANK (verbatim, source in brackets)
- "It's yellow. It fits in your pocket. There's a crank. It comes with 24 free games to get you started. Say hi to Playdate from Panic." [meta description, https://play.date/]
- "The little yellow game system with a crank." [og:title, https://play.date/]
- "We made Playdate just for fun." [home hero]
- "The System." / "The Design." / "The Crank." / "The Season." [home h2s]
- "Yes, the crank. Is it a gimmick? Nah. Does it charge Playdate's battery? Nope. Is it really fun? Yes yes yes." [The Crank, home]
- "It's an analog controller that flips out from the side, allowing you to precisely dial in the action." [home]
- "Once you set up your Playdate, you'll start to receive two brand new games… every week. For 12 weeks." / "That's 24 free games, in lots of genres." / "Will you love them all? Probably not. Will you have a great time trying them? Absolutely." [The Season]
- "Wait! No spoilers, please!" [home]
- "Big Screen Optional." [Mirror section]
- "Playdate is familiar, but unlike anything you've ever seen. It has a very special black and white screen – not backlit, but super reflective…" "when you're not using it, the screen doesn't turn off – it becomes a very nice low-power clock!" [The System]
- "Thanks to our friends at Teenage Engineering, Playdate looks incredible." [The Design]
- "All for just $229. Includes the full Season One of games – 24 original Playdate games, delivered weekly, at no extra charge." [home]
- "Does not include shipping. But you do get a very nice yellow USB-C to USB-A cable." [home]
- "A cute, clean way to protect your Playdate… when folded, it looks like a delicious electronic ice cream sandwich." [home]
- Season Three: "Out now: Another bundle of the best games on Playdate, available only here." "All games in Season Three were created without the use of generative AI." [https://play.date/games/seasons/three/]
- Spec block (400 × 240 1-bit; 168 MHz Cortex M7; 16 MB RAM; 4 GB Flash; 76 × 74 × 9 mm; 14 days standby clock, 8 hours active; D-Pad, A + B, Sleep + Menu, 3-Axis Accelerometer, Crank) [https://play.date/]
- "Made by Panic with help from teenage engineering." [box side, Media Kit]
- "© Panic · Playdate is a registered trademark of Panic" [footer]
- Catalog: "The fun continues with awesome new Playdate games made by developers around the world." / "Grab some games!" [home]
- "Your games?… Our SDK is free to download, no special hardware required. And with the Pulp game maker, all you need is a web browser." [home]
