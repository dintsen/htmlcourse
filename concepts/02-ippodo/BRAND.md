# BRAND — Ippodo Tea (一保堂茶舗), Kyoto
Researched 2026-10-10. G = https://global.ippodo-tea.co.jp, JP = https://www.ippodo-tea.co.jp. Prices: G is JPY excl. tax; JP shows tax-inclusive. Raw data (gitignored): `_work/raw/` (products.json, jp_products.json, prod_summary.json, saved pages), `_work/packs/*.png` (24 can/box packshots), `_work/film/ippodo.mp4`, `_work/qa/` (contact sheets), `_work/site-current/`. Note: inspect-ref alone captured only the geo-popup (see Site). Screens in `_work/qa/home/` were taken with the popup DOM-hidden.

## 1. History and positioning
- 1717: Rihei Watanabe of Omi (Shiga) opens Omiya, tea and ceramics, near the Imperial Palace, Kyoto. 1846: Prince Yamashina renames it Ippodo, "preserve one" (keep one tradition: high-quality tea). 1864: burnt in the Hamaguri Gomon Incident, rebuilt on the present site. Meiji: exports to the US, ships in tin-lined wooden boxes when others used ceramic jars. 1935: Yojiro Sado develops Uji-Shimizu. 1952: first in-store shop (Hanshin, Umeda) selling 100 g bags when 400 g was normal. 1995 Kaboku Tearoom (Kyoto main store); 2006 tea workshops; 2010 Tokyo Marunouchi; 2013 New York (temporarily closed Sep 2022); 2019 USA/Canada shop; 2025 Tokyo Shin-Marunouchi, Tokyo Aoyama (opens 29 Aug 2025), Room Ippodo event space (Kojimachi). Source: G/pages/about-ippodo.
- Family business; HQ 52 Tokiwagi-cho, Nakagyo-ku, Kyoto. President Masakazu Watanabe. Customers mainly department stores; 100+ stores in Japan. Same page.
- Positioning (G/pages/about-tea): leaf grown in hills between the Uji and Kizu river basins (Kyoto, Nara, Shiga), river mist, big day/night swing; in-house blends of procured leaf; each brand tastes the same year to year ("blends based on each brand's flavor, rather than on the season or the tea field"); four categories matcha / gyokuro / sencha / bancha; higher price = richer, lower = lighter. Tone: calm, domestic, practical. Not luxury-mystic, not wellness.

## 2. Real product line (G/products.json + product pages, 2026-10-10)
Range: ~100 SKUs (matcha 15, gyokuro 18, sencha 15, bancha 8, teabags 14, utensils 24, gifts 4). Kanji names from JP/products.json.
Gyokuro cans (G, small/medium): 天下一 Tenka-ichi 90g ¥16,000 / 160g ¥35,000 · 一保園 Ippoen 80g ¥10,000 / 160g ¥20,000 · 甘露 Kanro 80g ¥7,000 / 160g ¥14,000 · 鶴齢 Kakurei 160g ¥8,000 · 麟鳳 Rimpo 180g ¥9,500 · 滴露 Tekiro 150g ¥7,000 · 萬徳 Mantoku 150g ¥4,500.
Sencha cans: 薫風 Kumpu 150g ¥5,000 · 嘉木 Kaboku 155g ¥6,000 · 芳泉 Hosen 150g ¥4,000 · 正池の尾 Shoike-no-o 155g ¥3,000 · 日月 Nichigetsu 160g ¥2,500. Bags (50–120 g) of the same blends ¥800–¥3,500.
Matcha 20g boxes: 閑坐 Kanza ¥15,000 · 久遠 Kuon ¥9,000 (both "premium select", online exclusive, shade-grown) · 雲門の昔 Ummon-no-mukashi ¥5,000 · 松韻の昔 Shoin-no-mukashi ¥4,000 · 明昔 Sayaka-no-mukashi ¥2,800 · 関の白 Kan-no-shiro ¥2,000 · 幾世の昔 Ikuyo-no-mukashi ¥1,400 · 若き白 Wakaki-shiro ¥1,000 · 初昔 Hatsu-mukashi ¥800 · Organic ¥1,800 · 月影 Tsukikage (seasonal) ¥2,300. 100 g bags: Sayaka ¥14,000, Ikuyo ¥7,000.
Bancha/bags/teabags: Wakayanagi 100g ¥700, Gokujo Genmaicha ¥600, Iribancha ¥700, One-Cup Teabag (22 bags) ¥1,800–¥2,300, One-Pot Teabag series (8 teas), Drip Tea Bags, Matcha To-Go Packets ¥1,800. Utensils: kyusu ¥8,000–¥20,000, bamboo whisk ¥4,000–¥6,300, ladle, sieve, strainer, bowls ¥15,000, Matcha Starter Kit ¥8,300, pink insulated travel bottles ¥2,500–¥6,500.
Specs (can pages): small can box W7.5×D7.1×H12.2 cm; medium W8.6×D8.2×H14.1 cm; matcha box W5.2×D5.0×H6.5 cm; ingredient "Green tea (Japan)"; shelf life 180 days; 10 g per pot. Each page also has Strength / Taste / Fragrance sliders and tags (Rich, Balanced, Light, By itself, Koicha, Usucha, Latte, Standard preparation, Simple cold-brewing). Site taste-colour tokens: clean #ffcb37, rice #dfb23f, light #bae61c, balance #82d900, rich #4fb000, roast #d88232 (main--global.css).

### Official brewing guide (G/blogs/tea-recipe/*; this is the data for the steeping interaction)
| method | leaf | water | temp | time |
|---|---|---|---|---|
| Basic gyokuro | 10 g (2 tbsp) | 80 ml | 60°C | 90 s |
| Basic sencha | 10 g (2 tbsp) | 210 ml | 80°C | 60 s |
| Piping-hot gyokuro/sencha | 10 g | 210 ml | 100°C | 30 s |
| Basic bancha (hojicha 4 tbsp; genmaicha 2 tbsp) | 10 g | 240 ml | 100°C | 30 s |
| Usucha (sift, whisk) | 2 g | 60 ml | 80°C | 15 s |
| Koicha (sift, slow whisk) | 4 g | 30 ml | 80°C | 15 s |
| Cold-brewed gyokuro | 10 g | 210 ml | chilled | 15 min |
| Gyokuro/sencha over ice | 10 g | 210 ml | boiling | 1 min, pour over ice |
| One-Cup teabag | 1 bag | 150 ml | gyokuro/sencha just off boil, 90 s; hojicha boiling, 60 s | |
Rules stated by the brand (about-tea): first pot sweet/umami/fragrant, second milder, third very light; raising water temperature gives a lighter taste, lowering it a smoother, rounder one; boiling water "brings out a lot of astringency. Brewing quickly is vital." Kaboku: up to five pots from the same leaf.

## 3. Packaging and design language (looked at 24 packshots)
- Cans (all gyokuro and sencha): silver tinplate canister with matte rim, wrapped in ONE shared chromolithograph-style label: amber-gold field (#fcba39), burnt-orange shading (#c06a24), forest green (#284831), grass green (#61b50c) leaves, white camellia blossoms, a turquoise vase (#04ad9f / #04c4bf) in the centre carrying the tea's kanji name, banner cartouche above, "IPPODO TEA CO." and 一保堂茶舗 with the roof mark below. Only the kanji changes between 12 cans. Sold as "Can w/box" (outer carton).
- Matcha boxes: pale lilac-grey woven/check wrap (#c7c0cf), copper or gold line botanical illustration, vertical brush-calligraphy name in sumi (#392d32), red square hanko seal (#de3d3b), small "SAYAKA / Matcha" line, "Net Wt. 20g 0.7oz". Lower grades (Ikuyo, Kan-no-shiro) switch the check to copper-orange (#df8952). Kanza/Kuon: plain silver-grey box, gold-foil vertical name. Organic: white, pale green line map. Tsukikage 2026: indigo (#254b80) and mustard (#d4aa07) diagonal "gradations in moonlight", silver-foil buds (G/blogs/news/matcha-tsukikage).
- Bags: white stand-up pouch with grey line botanical drawing. Shopping bag: white paper, teal square frame, orange 茶 seal (#e58b48 sampled). Travel bottle: pink with orange line drawing of a Kyoto scene.
- Asset limits: cans exist ONLY as 1000×1240 RGBA PNG with real alpha; the can itself is ~374×671 px (Ippoen 80g). Matcha boxes ~450×590 at 1000 px; Kanza/Kuon/Organic/100 g bags/teabags/utensils have 2500×3100 files. A hero tin larger than ~670 px tall is upscaled. Check `_work/packs/` and products.json `images[]` (alt text empty).

## 4. Recent campaigns (official news, G/blogs/news)
- 2026-10-02 Tsukikage autumn matcha on sale in Japan from 1 Oct, new moonlight package. 2026-10-01 One-Pot Teabag Hojicha (4g×8, ¥1,100) and Sencha (7g×6, ¥1,500) join the series. 2026-09-24 Takashimaya Singapore pop-up, SJ60 Japan Food Matsuri, 29 Sep–11 Oct, staff from Kyoto. 2026-09-28 DHL rate revision effective 1 Oct.
- Ongoing editorial: "Different ways to enjoy Japanese tea — Stories from Ippodo staff" (ink-drawn), "Food pairing pointers" 食卓ノート (watercolour pairings with real packs painted in), pink travel bottles, monthly classes, book "Ocha no Aji" ¥630 (essays by Miyako Watanabe).
- Brand film (home hero play button): 62 s hand-painted gouache animation, 1080×960 at 10 fps, with audio. The storefront, people of different eras walk past; ends on a lemon-yellow card, handwritten "Enjoy your tea time!" then 茶、一つを保つ / IPPODO TEA (read from frames, not text). File G/cdn/shop/t/6/assets/ippodo.mp4 (7.7 MB).

## 5. Visual identity
- Logo: roof mark (two crossing shallow chevrons) over three dots + "IPPODO TEA" wide-tracked serif caps; real vector at `00_GLOBAL/DISCOVERY/_harvest/ippodo/svg/9f3c41_logo_ippodo-en.svg`, fill #4e4e4e (ink grey, not black). Kanji lockup 一保堂茶舗 appears on cans; no vector found. ippodotea.com uses a different "Kyoto since 1717" framed lockup.
- Site colours (main--global.css, root vars): ink #4e4e4e, heading #3a3a3a, accent taupe #93806f, hover copper #ba876a, navy ink #1a263a, lemon story band #f9f971, blush recipe band #fcf7f7, page grey #f5f6f7, hairlines #b7b7b7/#c5c5c5, cart badge #ef5a24. Measured from screenshots: mustard torn-paper strip ≈ #e1bf68, footer beige ≈ #efebdf. Hero painting: pale sky wash, charcoal building, green trees, pink ground.
- Type on site (Adobe Fonts kit lgg1nqr, commercial, do not ship): Neuzeit Grotesk 300/400/700 (body, 16px, ls 0.02em; nav 20px/300), Goudy Old Style (section titles, 30px), Yu Mincho PR6 (vertical kanji headings 食卓ノート, 買う; ls 0.14–0.5em), Source Han Sans JP (OFL, shippable as Noto Sans JP), Cormorant Garamond 700 + Roboto only in the geo-popup. Wordmark is custom outlines, no identifiable foundry. Stand-in direction for Typography: Shippori Mincho / Zen Old Mincho (OFL) for mincho; Cormorant Garamond or EB Garamond for the Goudy role.
- Shape language: square corners (--media-radius 0, card radius 0), 1px hairline frames, pill-shaped outline buttons only for "See more". Vertical kanji label inside a thin frame with double vertical rules. Ink icons (matcha bowl+whisk, gyokuro cup, kyusu, cups, teabag, leaf, utensils, gift, bag).
- Imagery: studio packshots on pale grey/lilac, soft matte light, hands holding objects; gouache/watercolour scenes of real shop and street (people in today's clothes, sparrows, a dog); black brush-ink line drawings of staff stories; watercolour food vignettes. No tea-field photography seen on the home page.
- Voice: plain, warm, practical English translated from Japanese; second person, "How does it taste? / How/when to enjoy it? / What to enjoy it with? / How do Ippodo staff enjoy it?" is the product-page template.

## 6. Existing site (G/) decomposed
Shopify Dawn 7.0.1 base + heavy custom CSS, jQuery 3.6.3, video.js, a Swiper-style slider. No h1 on the page. No GSAP/Lenis/WebGL/canvas. Third parties: Klaviyo, Clarity, GTM, Swym wishlist, Promolayer, Pandectes. Height 8,244 px desktop, 7,325 px mobile; 69 images; stable after ~15 s.
Scroll order: mustard announcement strip → header (logo, search pill, 5 icons, 5 nav items: About Ippodo / About Tea / Shopping / Stories About Tea / Topics, hover colour #ba876a with illustrated mega-menu) → gouache hero built from separate transparent layers (building, tree+people left, tree+people right, birds) with ▶ play → three tiles (newsletter, "Matcha Large Packs", "Good picks for first time shoppers") → Best Sellers slider (4 items) → blush band 食卓ノート with vertical label and 3 watercolour cards → lemon-yellow "Different ways to enjoy Japanese tea" band with 3 ink-drawing cards → "買う / Shopping" interior painting + 9-icon category grid → Topics (dated news list) → 3 illustrated link tiles → beige footer with accordions on mobile.
Popup: a geo overlay "It looks like you're visiting from USA" (plmw-*, Cormorant Garamond 32px 700, Roboto button) locks scroll and covers the hero for US visitors; newsletter popup also.
Works: the gouache hero and film (only moment with a soul), vertical kanji labels, ink icon set, lemon band, real brewing numbers on every product page, bilingual naming.
Wasted/weak: catalogue-grid product browsing on pale grey; 4 small recipe figures where a whole ritual could sit; brewing guide buried in a blog 3 clicks deep; icon grid half-faded; mustard strip reads as sale banner; no motion language beyond 0.4 s colour hover; hamburger + stacked icon rows on mobile; popups on arrival; nothing links tea to its tin.

## 7. Competitors (opened with inspect-ref, contact sheets looked at)
- Marukyu Koyamaen EN (marukyu-koyamaen.co.jp/english/): jQuery, cream #f5f0e8, black/white noren photo with 久 mon, green leaf hero, pale-green footer #dff1cc; feels like a 2000s corporate portal with heritage claims (Uji 1704 per search) and a tin grid.
- ippodotea.com (Ippodo USA & Canada, same brand): Shopify; lilac-grey #e0e0eb hero with whisk + Tsukikage box photograph, rounded pill buttons, "Matcha Quiz / Green Tea Quiz", chat widget; modern DTC commerce, separate catalogue and USD prices.
- Mizuba Tea Co. (mizubatea.com): near-black + neon green (bg cream #fffdf8 on inner pages), Fraunces / BB Modern / GT Pressura, tasting-trio hero, emoji in copy; wellness-matcha DTC look. Others (Ito En, Jugetsudo, etc.) not opened, no claims.

## 8. What the brand owns / what a redesign must avoid
Owns: the shared-label silver tin (one design, many kanji); the painted Kyoto storefront and people; roof-mark logo and 一保堂茶舗; orange 茶 hanko and red name seals; vertical kanji in a hairline double-rule frame; lemon yellow as the "stories" colour; hand-drawn ink line; "preserve one" (一を保つ); numbers-on-the-page brewing service; 300-year continuity.
Avoid: neon-green wellness matcha, bamboo/zen/lotus/torii/geisha pastiche, "ancient secret" copy, health claims (site makes none), invented kanji or glyph-shaped decoration (copy kanji exactly from section 2), invented tea names/availability/prices (matcha purchase limits are real; do not show stock), quoting the Watanabe family except verbatim with attribution (Kanza page), redrawing the logo, using Wakayanagi imagery (page says its package changes 1 Nov). The ink-grey #4e4e4e logo is not black.
Legal/representation: illustrations are by third parties (credits not found in page text; treat as owned by rights-holders); footer disclaimer required; cart buttons go to the real site (new tab); brandguideline sites such as madegooddesigns.com are unofficial, ignore. Site contradicts itself: incorporated 1964 (timeline) vs April 1982 (profile), "about thirty brands" vs "40+ brands"; Organic Sencha spec says 100 g for a 50 g bag. Avoid printing those facts.

## REDESIGN HEADROOM
1. The lane says "deep tea green + washi ivory + sumi + indigo", but the real tin is amber/emerald/turquoise and loud. That is the asset: on a quiet washi page the tin is the only saturated object, which is what the lane's "objects float in whitespace" wants. Do not mute the tin. Deep green exists on the label (#284831), indigo is real (#1a263a, Tsukikage #254b80), sumi is #392d32.
2. The brand's real brewing numbers are already a complete interaction spec (table above). Today they are four tiny figures per product page; making them the ritual is the biggest functional headroom. Water temperature and time are the actual variables, with the brand's own rule that cooler water = smoother, hotter = more astringent, so ink density/colour can map to them honestly.
3. Hero asset constraint: the tin is only ~670 px tall; design the "tin in still water" at that scale (or a moderate hero crop) and pair it with the 2500 px matcha box (Kanza/Kuon). Do not promise a macro-sized tin.
4. Authentic ink language already exists (black brush drawings, vertical kanji labels, hand-drawn film at 10 fps). A diffusion shader should feel hand-painted (gouache bloom), not like a fluid-sim demo. The film's stepped 10 fps is the brand's own motion signature.
5. Vertical kanji is already used by the brand (食卓ノート, 買う), so a vertical rail is honest, not decoration.
6. Weak now: no h1, no mobile idea, pale grey catalogue, popups, buried brewing guide, no link between tin and brew. Strong now: hero painting layers (parallax-ready PNGs), icon set, lemon band.
7. Risk: cans only at 1000×1240; chasing "premium product render" would look cheaper than the real tin. Keep to cut-outs, light grade, soft shadow, reflection on water.

## COPY BANK (verbatim, safe)
- "preserve one" (Ippodo, meaning of the name). G/pages/about-ippodo
- "Japanese tea is at its best when bought in small amounts and consumed soon after opening." G/pages/about-ippodo
- "It's a time to rest and unwind while enjoying properly brewed Japanese tea." (tearoom text) G/pages/about-ippodo
- "Even one slight change to how Japanese tea is prepared can alter the way it tastes." G/pages/about-ippodo
- "The first pot is replete with sweetness, umami and fragrance. The second is milder. The third is very light." G/pages/about-tea
- "Raising the water temperature produces a lighter taste, while a lower water temperature gives the tea a smoother, more well-rounded flavor." G/pages/about-tea
- "Powerful punch of umami" / "The concentrated umami can feel as though it had been squeezed out of freshly-picked tea leaves. To get all the umami, make sure to cool the water sufficiently after boiling." G/blogs/tea-recipe/basic-gyokuro
- "A new experience from every cup." G/blogs/tea-recipe/basic-sencha
- "Aroma helps you to relax." / "Boiling hot water brings out a lot of astringency. Brewing quickly is vital." G/blogs/tea-recipe/basic-bancha-hojicha-genmaicha, .../piping-hot-gyokuro-and-sencha
- "Preparing the usucha quickly is the secret to enjoying the full fragrance." G/blogs/tea-recipe/basic-usucha-matcha
- "Taking the time to sift the matcha powder produces thick and creamy koicha." G/blogs/tea-recipe/basic-koicha-matcha
- "Blissful cup of tea for your days off." / "Wait in anticipation while the full deliciousness seeps out, then enjoy the ultimate taste." G/blogs/tea-recipe/cold-brewed-gyokuro
- Tenka-ichi: "A clear taste and fragrance that bring to mind the untainted waters of a bubbling spring deep in the mountains." Ippoen: "A mellow taste and fragrance, reminiscent of taking a deep breath in a coniferous forest." Kanro: "A taste and fragrance that bring back long-forgotten memories." Hosen: "The first tea Ippodo brings out is always Hosen." Kanza: "Kanza is the highest-ranking matcha in our lineup." G/products/gyokuro6401126 (Tenka-ichi), gyokuro6402126 (Ippoen), gyokuro6403101 (Kanro), sencha503226 (Hosen), matcha5038731 (Kanza)
- Tsukikage: "The new Tsukikage package depicts the gradations in moonlight in the changing autumn sky." G/blogs/news/matcha-tsukikage
- "For generations, we have upheld a tradition of aromatic, well-balanced teas by carefully selecting, blending, and crafting each of our 40+ brands." G/ (home, Shopping)
- "Enjoy your tea time!" and 茶、一つを保つ (brand film frames, G home hero film)
- Product-page questions: "How does it taste?" / "How/when to enjoy it?" / "What to enjoy it with?" / "How do Ippodo staff enjoy it?" G/products/*
- Facts safe to print (with source G/products/gyokuro6403101): Kanro 80g can, W7.5×D7.1×H12.2 cm, 80 g, 10 g per pot, shelf life 180 days, ingredient "Green tea (Japan)".
- Established 1717; head office Kyoto (G/pages/about-ippodo).
