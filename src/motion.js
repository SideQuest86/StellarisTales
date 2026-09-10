// Reference: RhineLabUI archive extraction + damped waves. Original implementation.
// Only a bounded visible deck is transformed; the loop stops when settled/hidden.
export function createDeckMotion(root, reduced) {
  let selected = 0,
    frame = 0,
    last = 0,
    elapsed = 0;
  let states = [];
  function setup() {
    states = [...root.children].map(() => ({
      x: 0,
      y: 0,
      r: 0,
      vx: 0,
      vy: 0,
      vr: 0,
    }));
  }
  function tick(now) {
    frame = 0;
    if (document.hidden) return;
    const dt = Math.min((now - last) / 1000 || 1 / 60, 1 / 30);
    last = now;
    elapsed += dt;
    let moving = false;
    [...root.children].forEach((el, i) => {
      const s = states[i];
      if (!s) return;
      const length = states.length;
      const distance =
        ((i - selected + Math.floor(length / 2) + length) % length) -
        Math.floor(length / 2);
      const target = {
        x: distance * 65,
        y: Math.abs(distance) * 19 + (distance === 0 ? -36 : 10),
        r: distance * -5,
      };
      for (const k of ["x", "y", "r"]) {
        const v = "v" + k;
        if (reduced()) {
          s[k] = target[k];
          s[v] = 0;
        } else {
          s[v] += (target[k] - s[k]) * 125 * dt;
          s[v] *= Math.exp(-19 * dt);
          s[k] += s[v] * dt;
        }
        if (Math.abs(target[k] - s[k]) > 0.02 || Math.abs(s[v]) > 0.02)
          moving = true;
      }
      el.style.transform = `translate3d(${s.x}px,${s.y}px,${-Math.abs(distance) * 42}px) rotateY(-22deg) rotateZ(${s.r}deg)`;
      el.style.zIndex = String(20 - Math.abs(distance));
      el.classList.toggle("selected", distance === 0);
      el.setAttribute("aria-pressed", String(distance === 0));
    });
    if (moving && !reduced()) frame = requestAnimationFrame(tick);
  }
  function wake() {
    if (!frame) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else wake();
  });
  return {
    select(i) {
      selected = i;
      wake();
    },
    reset() {
      setup();
      wake();
    },
    refresh: wake,
  };
}
