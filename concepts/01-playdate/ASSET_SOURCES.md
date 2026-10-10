# ASSET SOURCES — #01 Playdate (Panic) — https://play.date/

Brand assets are © Panic Inc. / Teenage Engineering / the respective game authors; used for a non-commercial speculative portfolio concept. Per-file detail: `ASSET_MANIFEST.md`. Raw dumps: `_harvest/` (gitignored).

## ASSET VERDICT — strong. Official material fully supports an expensive-looking, object-led site.

| item | status |
|---|---|
| Logo | **Official vector, no tracing.** 6 Playdate lockups (stacked two-tone yellow from the site DOM, stacked/wordmark in black and flat yellow from the press-kit PDFs, viewBox-cropped) + Panic, Teenage Engineering, Catalog, starburst. Official favicons/touch icon. |
| Hero-grade images | **9** (≥1600 px long edge, studio/CGI quality, clean): packshots Playdate-1 (crank out) and Playdate-2 (3/4), box, closed purple Cover, hand-with-yellow-cuff cut-out; photographs hands-green, teal-Cover-grey, pizza-red, Cover-beige. Plus ~14 shop photos at 1200 px (supporting; soft above ~1200 css px). |
| Packshots (transparent) | **13** clean-alpha WebP (edges checked on magenta, no fringe): front/crank-out, 3/4, all-views orthographic sheet, box, 4 Cover states, front "Hello.", crank-out+game, exploded internals, hand cut-out, front/side/back group. +2 line-art blueprints. |
| 3D | **Real Playdate model, 15,467 tris, 1024 px PBR maps, 3-part crank rig**, `assets/3d/playdate.glb` (400 KB, meshopt + WebP, validator 0 errors). Plus unmodified official `playdate-flat.usdz`. |
| Video | **6 clips, 4.2 MB**: official device-screen footage 400x240 (launcher scroll 32.7 s/60 fps; Crankin' gameplay 30 s with audio) + 4 Season Two 1-bit gameplay loops. |
| 1-bit game art | **59** official screenshots at native 400x240 (23 Season One games), plus 31 colour catalog/season tiles. |
| Textures | 3 official (soft ground shadow, back legal-copy decal, default "Hello." screen). |
| Total | 17 MB, 152 files, largest file 2.9 MB (the USDZ). |

### What was NOT found / gaps (must be produced or designed around)
- No normal/micro-grain maps: photos show a fine soft-touch grain the model lacks. Add procedural roughness/normal noise in the 3D pass.
- Screen is one flat quad (full 0-1 UV): no glass layer, glare or bezel depth. Add a procedural glass/reflection layer.
- No 3D of the Covers, box or accessories (photos/packshots only). Body colour only yellow.
- Screen content for each site scene (specs, price, etc.) does not exist officially: must be produced as 1-bit dithered canvas (procedural). Official screens/videos are native 400x240, upscale nearest-neighbour only.
- Shop photos are opaque on colour fields (purple, green, red, coral, teal, blue). No cut-outs made; clean backgrounds make GrabCut feasible if the direction needs them on yellow.
- No public brand-guideline PDF. Colours sampled from official files: body albedo `#FFB300` (model texture); logo `#FFCD3F` (play) / `#F5B528` (date); screen LCD grey `#9CA39C`; photographed yellow reads about `#EABF4C` under studio light.
- Site body font is Roobert (commercial; not shippable). Typography Director to substitute. Pixel/1-bit type belongs only on the device screen (lane).
- No Season Three 1-bit screenshots harvested (only tile/key art).

### Access, licence, blocks
- No bot-block: play.date, help.play.date, assets.play.date answered plain curl and Chromium. No proxy issues.
- No image-CDN resize parameters exist (Django static/media, hashed filenames). Files are used at the largest size served; nothing was upscaled.
- No open licence on anything. Press kit is offered to press ("photos, logos, and more"). Site/shop images are public site assets. The USDZ is the site's own public AR download. Rig pivot numbers were read from the site's public WebGL scene JSON (geometry/textures are from the USDZ, not the scene bin). Treat all as © owners, non-commercial concept use only.

## Where everything came from
- **Press kit** `https://help.play.date/press/is-there-a-media-kit/` → `Playdate Media Kit 4.0.zip` (photos, Pulp shots, branding PDFs, games) and `Playdate-Season-Two-Media-Kit.zip` (key art, 400x240 gameplay GIFs). Used: 8 photos, 5 logo PDFs, S2 art + GIFs. Not used: Pulp editor screenshots (off lane), TE/Pulp logos, game title cards.
- **Home / shop / games / cover / season pages** harvested with `_tools/harvest.mjs` (home, shop, games, cover, pulp, season3, mirror, season1, dev, edu, credits). Product images live at `play.date/media/hardwareproducts/...`, site art at `play.date/static/images/...`.
- **Game pages** `play.date/games/<slug>/`: screenshots at `play.date/media/games/<id>/N.png` (23 Season One games; list in `_harvest/games_detail/index.json`).
- **Brand CDN** `assets.play.date`: `media/playdate-flat.usdz`, `assets/video/*.mp4`, `assets/scenes/asheville.json` (+ `data/asheville.bin`), `assets/asheville/Textures/*`. Codename of the device in these paths: "asheville".
- Not used on purpose: edu lifestyle photos (lane forbids lifestyle), 512 px WIP PBR maps (superseded by USDZ 1024 maps).

## 3D model: how it was made and how to drive it
Source: `playdate-flat.usdz` is a single mesh (7,994 pts, 9 material subsets, 1024 px BaseColor/AO/Roughness/Metallic, no normal maps) with the crank fused. The site's scene (`asheville.json`) holds the same geometry with the crank split into axle/arm/handle; vertex-by-vertex comparison matched the body mesh and the crank face counts (476 + 1,384 + 668). We kept the USDZ geometry and maps, split the crank faces by connected component, and took the pivot positions from the scene rig. No remodelling; nothing invented.

GLB conventions: metres (device 0.075 m wide), origin at body centre, **screen faces +Z, up +Y, crank on +X**. Nodes: `playdate` > `body`, `screen`, `crank_axle` > `crank_arm_pivot` > `crank_handle_pivot` (each node origin is its pivot). Materials: backplate, base, bolts, buttons, cavities, crank, dpad, screen, screen_border (ORM packed: R=AO, G=roughness, B=metal). Tiny solid textures (8 px) are intentional.

Rig (render-verified in Three.js, see `_work/prev4`): fold/unfold = `crank_arm_pivot.rotation.z` 0 → π (rest is folded). Turn = `crank_axle.rotation.x = θ` **and** `crank_handle_pivot.rotation.x = θ` (same value; the flipped arm frame makes this counter-rotate so the handle keeps its orientation; handle left at 0 visibly tilts it). Do not add an extra handle twist. Screen: `screen` mesh has full 0-1 UV; set `material.map` (flipY=false) to a CanvasTexture/VideoTexture; use emissive for self-lit look. Needs MeshoptDecoder + WebP support (Three.js has both).

Quality: faceting is invisible at hero scale and in macro of D-pad/buttons/screws; 15k tris is light, so a close crank/bezel hero is fine. Rendering quality will hinge on lighting/IBL and the missing grain and glass layers above.

## Reproduce
`_work/curate.py` (images), `_work/build_glb.py` (USD to rigged GLB; needs a venv with usd-core, numpy, scipy, Pillow), then `gltf-transform optimize --compress meshopt --texture-compress webp --texture-size 1024 --flatten false --join false --simplify false --instance false --palette false --prune-solid-textures false`. Harvests in `_harvest/`.
