#!/usr/bin/env bash
# Optimise a glTF/GLB for the web without visibly hurting it.
#   _tools/optimize-glb.sh in.glb out.glb [textureSize=2048] [meshopt|draco]
# Uses gltf-transform (dedup, prune, weld, quantize, texture resize -> webp, mesh compression).
# KTX2 needs the external `toktx` binary which is NOT installed here; WebP textures + meshopt/draco are the supported path.
set -euo pipefail
IN="$1"; OUT="$2"; TEX="${3:-2048}"; COMP="${4:-meshopt}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
"$DIR/node_modules/.bin/gltf-transform" optimize "$IN" "$OUT" --compress "$COMP" --texture-compress webp --texture-size "$TEX"
ls -la "$IN" "$OUT"
