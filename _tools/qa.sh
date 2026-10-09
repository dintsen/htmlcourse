#!/usr/bin/env bash
# One-shot QA capture of a concept's PRODUCTION build.
#   _tools/qa.sh concepts/01-name <round> [shoot.mjs args...]
#   e.g. _tools/qa.sh concepts/01-name r3 --viewports desktop,mobile,tablet --steps 14 --script concepts/01-name/_qa/states.mjs
# Does: (npm install if needed) -> npm run build -> serve dist on port 5200+NN -> shoot.mjs -> stop server.
# Output: <concept>/_qa/<round>/{desktop,mobile,...}/ + report.json. Default viewports: desktop,mobile.
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CDIR="$(cd "$1" && pwd)"; ROUND="${2:-r1}"; shift 2 || true
NAME="$(basename "$CDIR")"; NN="${NAME%%-*}"; PORT=$((5200 + 10#$NN))
cd "$CDIR" || exit 1
if [ ! -d node_modules ]; then echo "[qa] npm install"; node "$ROOT/_tools/slot.mjs" npm 2 -- npm install --no-audit --no-fund --loglevel=error || exit 1; fi
echo "[qa] building"
if ! node "$ROOT/_tools/slot.mjs" build 2 -- npm run build --silent; then echo "[qa] BUILD FAILED"; exit 1; fi
DIST=dist; [ -d "$DIST" ] || DIST=build
# free the port if a stale server from this concept is still running
if [ -f _qa/server.pid ]; then kill "$(cat _qa/server.pid)" 2>/dev/null; fi
mkdir -p _qa
node "$ROOT/_tools/serve.mjs" "$DIST" "$PORT" > _qa/server.log 2>&1 &
echo $! > _qa/server.pid
for i in $(seq 1 30); do curl -s -o /dev/null "http://127.0.0.1:$PORT/" && break; sleep 0.5; done
echo "[qa] shooting http://127.0.0.1:$PORT -> _qa/$ROUND"
node "$ROOT/_tools/shoot.mjs" --url "http://127.0.0.1:$PORT" --out "$CDIR/_qa/$ROUND" "$@"
RC=$?
kill "$(cat _qa/server.pid)" 2>/dev/null; rm -f _qa/server.pid
exit $RC
