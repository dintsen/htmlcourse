#!/usr/bin/env bash
# Kill orphaned Chromium trees (main browser re-parented to init after its tool process was killed) and clear stale slot locks.
for pid in $(pgrep -f 'chrome-linux/chrome' 2>/dev/null); do
  cmd=$(tr '\0' ' ' < /proc/$pid/cmdline 2>/dev/null) || continue
  case "$cmd" in *chrome-linux/chrome*) ;; *) continue;; esac
  case "$cmd" in *--type=*) continue;; esac
  pp=$(awk '{print $4}' /proc/$pid/stat 2>/dev/null)
  if [ "$pp" = "1" ]; then kill -9 -- -"$pid" 2>/dev/null || kill -9 "$pid" 2>/dev/null; pkill -9 -P "$pid" 2>/dev/null; echo "reaped orphan browser $pid"; fi
done
# orphan renderer/gpu processes whose browser is gone
for pid in $(pgrep -f 'chrome-linux/chrome.*--type=' 2>/dev/null); do
  pp=$(awk '{print $4}' /proc/$pid/stat 2>/dev/null)
  if [ "$pp" = "1" ]; then kill -9 "$pid" 2>/dev/null; fi
done
