import { t, language } from "./i18n.js";
import { isConstrained, networkQuiet } from "./glyph-warmup.js";

export const nextTrack = (index, direction, count) =>
  (((index + direction) % count) + count) % count;

/** "vocal" | "instrumental" | null, from a track's title / id. */
export function classifyVersion(track) {
  const text = `${track?.title ?? ""} ${track?.id ?? ""}`.toLowerCase();
  if (/instrumental/.test(text)) return "instrumental";
  if (/feat\.|featuring|vocal/.test(text)) return "vocal";
  return null;
}

/** Default track: the vocal "Faster Than Light"; else the first track. */
export function defaultTrackIndex(tracks) {
  const i = tracks.findIndex(
    (track) => /fasterthanlight/.test(track.id ?? "") && classifyVersion(track) === "vocal",
  );
  return i >= 0 ? i : 0;
}

/**
 * Initial track from saved preferences. `savedId` (st-track-id) wins; the legacy
 * index (st-track) is honoured only when non-zero, because older builds wrote 0 on
 * every first visit.
 */
export function chooseInitialIndex(tracks, { savedId = null, legacyIndex = null } = {}) {
  const byId = savedId ? tracks.findIndex((track) => track.id === savedId) : -1;
  if (byId >= 0) return byId;
  const legacy = Number(legacyIndex);
  if (Number.isInteger(legacy) && legacy > 0 && legacy < tracks.length) return legacy;
  return defaultTrackIndex(tracks);
}

/** Autoplay is attempted unless the visitor last paused or muted the music. */
export function shouldAutoplay({ paused = false, volume = 1 } = {}) {
  return !paused && Number(volume) > 0;
}

/** Whether a keydown is a deliberate gesture (not Tab / modifiers / Escape). */
export const isEligibleKey = (key) =>
  !["Tab", "Shift", "Control", "Alt", "Meta", "CapsLock", "Escape", "ContextMenu"].includes(key);

const time = (value) =>
  `${Math.floor((value || 0) / 60)}:${String(Math.floor((value || 0) % 60)).padStart(2, "0")}`;
const $ = (id) => document.getElementById(id);
const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

export class SoundtrackPlayer {
  constructor(playlist, asset, notify) {
    this.tracks = playlist.tracks;
    this.asset = asset;
    this.notify = notify;
    this.ticket = 0;
    this.pending = null;
    this.resumeAt = 0;
    this.lastSaved = 0;
    this.audio = $("ost-audio");
    this.audio.volume = 0.28;
    const volume = Number(read("st-volume") ?? 0.28);
    this.audio.volume = Math.max(0, Math.min(1, Number.isFinite(volume) ? volume : 0.28));
    const savedId = read("st-track-id");
    this.index = chooseInitialIndex(this.tracks, { savedId, legacyIndex: read("st-track") });
    if (savedId === this.tracks[this.index].id) this.resumeAt = Number(read("st-position")) || 0;
    $("music-volume").value = String(this.audio.volume * 100);
    $("album-cover").src = asset(playlist.cover);
    this.renderDescription();
    for (const [i, track] of this.tracks.entries()) {
      const button = document.createElement("button");
      button.dataset.track = i;
      button.innerHTML = `<span class="track-number">${String(i + 1).padStart(2, "0")}</span><span class="track-name"></span><small>${time(track.duration)}</small>`;
      button.querySelector(".track-name").textContent = track.title;
      button.onclick = () => this.select(i, true, true);
      $("track-list").append(button);
    }
    this.renderVersions();
    document.addEventListener("st-language", (e) => {
      this.renderDescription(e.detail);
      this.renderVersions(e.detail);
      this.updatePlaying();
    });
    $("play-pause").onclick = () => {
      if (this.audio.paused) {
        write("st-music-paused", "0");
        this.play(true);
      } else {
        write("st-music-paused", "1");
        this.audio.pause();
      }
    };
    $("track-next").onclick = () =>
      this.select(nextTrack(this.index, 1, this.tracks.length), !this.audio.paused, true);
    $("track-previous").onclick = () =>
      this.select(nextTrack(this.index, -1, this.tracks.length), !this.audio.paused, true);
    $("playlist-toggle").onclick = () => this.togglePlaylist();
    $("playlist-close").onclick = () => this.togglePlaylist(false);
    $("music-volume").oninput = (e) => {
      this.audio.volume = Number(e.target.value) / 100;
      write("st-volume", String(this.audio.volume));
    };
    $("music-seek").oninput = (e) => {
      if (Number.isFinite(this.audio.duration))
        this.audio.currentTime = (Number(e.target.value) / 1000) * this.audio.duration;
      if (Number.isFinite(this.audio.duration))
        e.target.setAttribute("aria-valuetext", `${time(this.audio.currentTime)} / ${time(this.audio.duration)}`);
    };
    this.audio.addEventListener("timeupdate", () => {
      if (!Number.isFinite(this.audio.duration)) return;
      $("elapsed").textContent = time(this.audio.currentTime);
      $("music-seek").setAttribute("aria-valuetext", `${time(this.audio.currentTime)} / ${time(this.audio.duration)}`);
      $("music-seek").value = String((this.audio.currentTime / this.audio.duration) * 1000);
      const now = Date.now();
      if (!this.audio.paused && now - this.lastSaved > 5000) {
        this.lastSaved = now;
        write("st-position", String(Math.floor(this.audio.currentTime)));
      }
    });
    this.audio.addEventListener("loadedmetadata", () => {
      $("duration").textContent = time(this.audio.duration);
      $("music-seek").setAttribute("aria-valuetext", `${time(this.audio.currentTime)} / ${time(this.audio.duration)}`);
      if (this.resumeAt > 0 && this.resumeAt < this.audio.duration - 5) this.audio.currentTime = this.resumeAt;
      this.resumeAt = 0;
    });
    for (const event of ["play", "pause", "ended"])
      this.audio.addEventListener(event, () => this.updatePlaying());
    this.audio.addEventListener("ended", () =>
      this.select(nextTrack(this.index, 1, this.tracks.length), true, true),
    );
    this.audio.addEventListener("error", () => {
      this.updatePlaying();
      this.showFailure(t("music.loadFailed"));
    });
    this.select(this.index, false, false);
    this.autoplay();
  }
  renderDescription(lang = language()) {
    $("playlist-description").textContent = t("music.description", { n: this.tracks.length }, lang);
  }
  renderVersions(lang = language()) {
    for (const [i, track] of this.tracks.entries()) {
      const row = $("track-list").children[i];
      const kind = classifyVersion(track);
      let tag = row.querySelector(".track-version");
      if (!kind) {
        tag?.remove();
        continue;
      }
      if (!tag) {
        tag = document.createElement("span");
        tag.className = "track-version";
        row.querySelector(".track-name").after(tag);
      }
      tag.dataset.kind = kind;
      tag.textContent = t(kind === "vocal" ? "music.vocal" : "music.instrumental", null, lang);
    }
  }
  /** Try to start on entry; if the browser refuses, wait once for a real gesture. */
  async autoplay() {
    if (!shouldAutoplay({ paused: read("st-music-paused") === "1", volume: this.audio.volume })) return;
    // Do not compete with covers/fonts: slow links wait for a gesture, others for a quiet network.
    if (isConstrained()) return this.armGesture();
    // A first gesture while the page is still loading starts the music at once (no hint shown while waiting).
    this.armGesture(false);
    await networkQuiet();
    if (!this.gestureArmed) return; // a gesture already started it
    if (read("st-music-paused") === "1" || !this.audio.paused) return this.disarmGesture?.();
    if (await this.play(false)) return this.disarmGesture?.();
    $("music-player").classList.add("autoplay-blocked");
  }
  /** Visible failure message in the player itself (artist line) plus the toast; cleared when a track is selected. */
  showFailure(message) {
    const line = $("track-artist");
    line.textContent = message;
    line.setAttribute("role", "alert");
    $("music-player").classList.add("load-failed");
    this.notify(message);
  }
  armGesture(hint = true) {
    if (this.gestureArmed) return;
    this.gestureArmed = true;
    if (hint) $("music-player").classList.add("autoplay-blocked");
    const events = ["pointerdown", "keydown", "touchend"];
    const disarm = (this.disarmGesture = () => {
      for (const name of events) document.removeEventListener(name, handler, true);
      this.gestureArmed = false;
      $("music-player").classList.remove("autoplay-blocked");
    });
    const handler = (e) => {
      if (e.type === "keydown" && !isEligibleKey(e.key)) return;
      disarm();
      // Gestures on the player's own controls are the visitor's explicit choice.
      if (e.target?.closest?.("#music-player, #playlist")) return;
      if (read("st-music-paused") === "1" || !this.audio.paused) return;
      this.play(false);
    };
    for (const name of events) document.addEventListener(name, handler, true);
  }
  togglePlaylist(open = $("playlist").hidden) {
    $("playlist").hidden = !open;
    $("playlist-toggle").setAttribute("aria-expanded", String(open));
    if (open)
      $("track-list")
        .querySelector(`[data-track="${this.index}"]`)
        ?.scrollIntoView({ block: "nearest" });
  }
  select(index, play, remember = false) {
    this.ticket++;
    this.pending = null;
    this.index = index;
    this.audio.pause();
    const track = this.tracks[index];
    this.audio.src = this.asset(track.url);
    $("track-title").textContent = track.title;
    $("track-artist").textContent = track.artist;
    $("track-artist").removeAttribute("role");
    $("music-player").classList.remove("load-failed");
    $("duration").textContent = time(track.duration);
    $("elapsed").textContent = "0:00";
    $("music-seek").value = "0";
    for (const b of $("track-list").children) {
      b.classList.toggle("active", Number(b.dataset.track) === index);
      b.setAttribute("aria-current", String(Number(b.dataset.track) === index));
    }
    if (remember) {
      this.resumeAt = 0;
      write("st-track", String(index));
      write("st-track-id", track.id);
      write("st-position", "0");
      if (play) write("st-music-paused", "0");
    }
    if (play) this.play(false);
  }
  /** Start playback once; returns true when it started. Never overlaps. */
  play(userInitiated = false) {
    if (this.pending) return this.pending;
    const ticket = this.ticket;
    const run = (async () => {
      let ok = false;
      try {
        await this.audio.play();
        ok = true;
      } catch (e) {
        if (ticket === this.ticket && e.name !== "AbortError" && userInitiated)
          if (this.audio.error || e.name === "NotSupportedError") this.showFailure(t("music.loadFailed"));
          else this.notify(t("music.playFailed"));
      }
      if (this.pending === run) this.pending = null;
      this.updatePlaying();
      return ok;
    })();
    this.pending = run;
    return run;
  }
  updatePlaying() {
    const playing = !this.audio.paused && !this.audio.ended;
    $("play-pause").textContent = playing ? "Ⅱ" : "▶";
    $("play-pause").setAttribute("aria-label", t(playing ? "music.pause" : "music.play"));
    $("music-player").classList.toggle("playing", playing);
  }
}
