export const nextTrack = (index, direction, count) =>
  (((index + direction) % count) + count) % count;
const time = (value) =>
  `${Math.floor((value || 0) / 60)}:${String(Math.floor((value || 0) % 60)).padStart(2, "0")}`;
const $ = (id) => document.getElementById(id);
export class SoundtrackPlayer {
  constructor(playlist, asset, notify) {
    this.tracks = playlist.tracks;
    this.asset = asset;
    this.notify = notify;
    this.index = 0;
    this.ticket = 0;
    this.audio = $("ost-audio");
    this.audio.volume = 0.28;
    try {
      this.audio.volume = Math.max(
        0,
        Math.min(1, Number(localStorage.getItem("st-volume") ?? 0.28)),
      );
      this.index = Math.max(
        0,
        Math.min(
          this.tracks.length - 1,
          Number(localStorage.getItem("st-track") || 0),
        ),
      );
    } catch {}
    $("music-volume").value = String(this.audio.volume * 100);
    $("album-cover").src = asset(playlist.cover);
    $("playlist-description").textContent =
      `${this.tracks.length} 首原版配乐 · 按专辑顺序循环播放`;
    for (const [i, t] of this.tracks.entries()) {
      const button = document.createElement("button");
      button.dataset.track = i;
      button.innerHTML = `<span class="track-number">${String(i + 1).padStart(2, "0")}</span><span class="track-name"></span><small>${time(t.duration)}</small>`;
      button.querySelector(".track-name").textContent = t.title;
      button.onclick = () => this.select(i, true);
      $("track-list").append(button);
    }
    $("play-pause").onclick = () =>
      this.audio.paused ? this.play() : this.audio.pause();
    $("track-next").onclick = () =>
      this.select(
        nextTrack(this.index, 1, this.tracks.length),
        !this.audio.paused,
      );
    $("track-previous").onclick = () =>
      this.select(
        nextTrack(this.index, -1, this.tracks.length),
        !this.audio.paused,
      );
    $("playlist-toggle").onclick = () => this.togglePlaylist();
    $("playlist-close").onclick = () => this.togglePlaylist(false);
    $("music-volume").oninput = (e) => {
      this.audio.volume = Number(e.target.value) / 100;
      try {
        localStorage.setItem("st-volume", String(this.audio.volume));
      } catch {}
    };
    $("music-seek").oninput = (e) => {
      if (Number.isFinite(this.audio.duration))
        this.audio.currentTime =
          (Number(e.target.value) / 1000) * this.audio.duration;
    };
    this.audio.addEventListener("timeupdate", () => {
      if (!Number.isFinite(this.audio.duration)) return;
      $("elapsed").textContent = time(this.audio.currentTime);
      $("music-seek").value = String(
        (this.audio.currentTime / this.audio.duration) * 1000,
      );
    });
    this.audio.addEventListener("loadedmetadata", () => {
      $("duration").textContent = time(this.audio.duration);
    });
    for (const event of ["play", "pause", "ended"])
      this.audio.addEventListener(event, () => this.updatePlaying());
    this.audio.addEventListener("ended", () =>
      this.select(nextTrack(this.index, 1, this.tracks.length), true),
    );
    this.audio.addEventListener("error", () => {
      this.updatePlaying();
      notify("这一首暂时未能加载，可以重试或切换下一首。");
    });
    this.select(this.index, false);
  }
  togglePlaylist(open = $("playlist").hidden) {
    $("playlist").hidden = !open;
    $("playlist-toggle").setAttribute("aria-expanded", String(open));
    if (open)
      $("track-list")
        .querySelector(`[data-track="${this.index}"]`)
        ?.scrollIntoView({ block: "nearest" });
  }
  select(index, play) {
    this.ticket++;
    this.index = index;
    this.audio.pause();
    const t = this.tracks[index];
    this.audio.src = this.asset(t.url);
    $("track-title").textContent = t.title;
    $("track-artist").textContent = t.artist;
    $("duration").textContent = time(t.duration);
    $("elapsed").textContent = "0:00";
    $("music-seek").value = "0";
    for (const b of $("track-list").children) {
      b.classList.toggle("active", Number(b.dataset.track) === index);
      b.setAttribute("aria-current", String(Number(b.dataset.track) === index));
    }
    try {
      localStorage.setItem("st-track", String(index));
    } catch {}
    if (play) this.play();
  }
  async play() {
    const ticket = this.ticket;
    try {
      await this.audio.play();
    } catch (e) {
      if (ticket !== this.ticket || e.name === "AbortError") return;
      this.notify("点击播放按钮，开始聆听银河。");
    }
    this.updatePlaying();
  }
  updatePlaying() {
    const playing = !this.audio.paused && !this.audio.ended;
    $("play-pause").textContent = playing ? "Ⅱ" : "▶";
    $("play-pause").setAttribute(
      "aria-label",
      playing ? "暂停音乐" : "播放音乐",
    );
    $("music-player").classList.toggle("playing", playing);
  }
}
