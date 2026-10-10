#!/usr/bin/env bash
# Checkpoint loop run by the ECD only: commits and pushes whatever agents have written, so work survives a container restart.
cd /home/user/htmlcourse || exit 1
while true; do
  sleep 240
  exec 9>/tmp/autocommit.lock; flock -n 9 || continue
  if [ -n "$(git status --porcelain)" ]; then
    git add -A && git commit -q -m "Checkpoint: swarm work in progress

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0155VqScNuXoq3FZiroHgr9B" >/dev/null 2>&1
    for i in 1 2 3 4; do git push -q origin claude/10-brand-website-redesigns-wgoo21 >/dev/null 2>&1 && break; sleep $((2**i)); done
  fi
  flock -u 9
done
