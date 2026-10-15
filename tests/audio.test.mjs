import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { classifyVersion, defaultTrackIndex, chooseInitialIndex, shouldAutoplay, isEligibleKey, nextTrack } from "../src/audio-player.js";
import { UI } from "../src/i18n.js";

const { tracks } = JSON.parse(await readFile(new URL("../public/music/playlist.json", import.meta.url), "utf8"));
const idx = (id) => tracks.findIndex((track) => track.id === id);

test("vocal and instrumental versions are classified", () => {
  assert.equal(classifyVersion(tracks[idx("02_fasterthanlight_bonus_featuringmiastegmar")]), "vocal");
  assert.equal(classifyVersion(tracks[idx("20_fasterthanlight_instrumental")]), "instrumental");
  assert.equal(classifyVersion(tracks[idx("04_totheendsofthegalaxy")]), "instrumental");
  assert.equal(classifyVersion(tracks[idx("19_distantnebula_bonus_featuringmiastegmar")]), "vocal");
  assert.equal(classifyVersion(tracks[idx("03_deepspacetravels")]), null);
});

test("default track is the vocal Faster Than Light", () => {
  assert.equal(tracks[defaultTrackIndex(tracks)].id, "02_fasterthanlight_bonus_featuringmiastegmar");
  assert.equal(defaultTrackIndex([{ id: "a", title: "A" }]), 0);
});

test("saved preferences override the default", () => {
  const def = defaultTrackIndex(tracks);
  assert.equal(chooseInitialIndex(tracks), def);
  assert.equal(chooseInitialIndex(tracks, { legacyIndex: "0" }), def);
  assert.equal(chooseInitialIndex(tracks, { legacyIndex: "5" }), 5);
  assert.equal(chooseInitialIndex(tracks, { legacyIndex: "999" }), def);
  assert.equal(chooseInitialIndex(tracks, { savedId: "08_alphacentauri", legacyIndex: "0" }), idx("08_alphacentauri"));
  assert.equal(chooseInitialIndex(tracks, { savedId: "gone" }), def);
});

test("autoplay respects saved pause and mute", () => {
  assert.equal(shouldAutoplay({ paused: false, volume: 0.28 }), true);
  assert.equal(shouldAutoplay({ paused: true, volume: 0.28 }), false);
  assert.equal(shouldAutoplay({ paused: false, volume: 0 }), false);
  assert.equal(shouldAutoplay(), true);
});

test("only deliberate keys count as a gesture", () => {
  assert.equal(isEligibleKey("Enter"), true);
  assert.equal(isEligibleKey("ArrowDown"), true);
  assert.equal(isEligibleKey("Tab"), false);
  assert.equal(isEligibleKey("Shift"), false);
});

test("track navigation wraps and new strings are bilingual", () => {
  assert.equal(nextTrack(0, -1, 5), 4);
  assert.equal(nextTrack(4, 1, 5), 0);
  for (const key of ["music.vocal", "music.instrumental", "music.playFailed", "music.loadFailed", "music.pause", "music.description"]) {
    assert.ok(UI[key]?.zh && UI[key]?.en, key);
  }
  assert.equal(UI["music.vocal"].zh, "人声");
  assert.equal(UI["music.instrumental"].zh, "纯音乐");
});
