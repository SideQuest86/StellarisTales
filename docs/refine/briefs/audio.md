# Brief: audio agent (playlist default and autoplay)

Read docs/refine/RULES.md first. Project: D:/Saving/Living/CodexProjects/StellarisTales.

Ownership: `src/audio-player.js`; you may append keys to `src/i18n.js` in one block marked `// audio-refine`; new tests
`tests/audio.test.mjs`, new browser check `scripts/verify-refine-audio.mjs`. Read (do not edit) `public/music/playlist.json`
and how app.js creates the player. If app.js must call something new, describe the one-line change in your report
instead of editing app.js.

## 8. Faster Than Light by default
- Tracks: `02_fasterthanlight_bonus_featuringmiastegmar` ("Faster Than Light - Feat. Mia Stegmar", the main vocal
  version) and `20_fasterthanlight_instrumental`. Distinguish vocal / instrumental versions generally (titles with
  "Instrumental" vs "Feat."/vocal) and show the distinction discreetly in the playlist (bilingual label 人声 / 纯音乐,
  Vocal / Instrumental).
- Default track = the vocal Faster Than Light unless a saved preference (last track / position, existing localStorage
  keys — inspect the current code) overrides it.
- On entry, attempt playback, respecting saved mute / pause preferences (if the user paused or muted last time, do not
  start). If `audio.play()` rejects (autoplay policy), arm a one-time listener for the first eligible user gesture
  (pointerdown/keydown/touchend — not scroll or mouse move) that starts playback once, and show a discreet play
  affordance (the existing play button state is enough; optionally a subtle pulse, respecting reduced motion). No
  policy bypasses (no muted-autoplay trick that unmutes later), no repeated prompts, never two overlapping playbacks
  (guard re-entrancy; one `<audio>` element; pending play promises).
- Remember the user's explicit pause/mute so the next visit respects it.
Tests: unit-test the pure decision logic (default track choice, should-autoplay given prefs, vocal/instrumental
classification) in `tests/audio.test.mjs`; browser check with Playwright: (a) Chrome with
`--autoplay-policy=no-user-gesture-required` → plays FTL vocal on load; (b) default policy → not playing until the
first click, then playing exactly one stream; (c) saved paused preference → stays paused; (d) saved other track →
that track. Report: files changed, check results.
