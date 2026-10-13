// Reader surface lifetime (after RhineLabUI ui-transitions): enter ~460 ms, exit
// ~200 ms, transform/opacity only so the compositor runs it. A close that
// interrupts an opening continues from the current opacity and offset; the
// element stays in the tree (and focusable content stays inert) until the exit
// finishes.
const ENTER = "cubic-bezier(0.22, 1, 0.36, 1)";
const EXIT = "cubic-bezier(0.4, 0, 1, 1)";
let animations = [];
let revision = 0;

export function revealReader(root, open, reduced) {
  const id = ++revision;
  const panel = root.querySelector(".reader-panel");
  const mobile = innerWidth <= 700;
  const wasHidden = root.hidden;
  const from = wasHidden ? null : panel && getComputedStyle(panel);
  animations.forEach((a) => a.cancel());
  animations = [];
  root.hidden = false;
  root.dataset.transition = open ? "opening" : "closing";
  root.inert = !open;
  const done = () => {
    if (id !== revision) return;
    root.hidden = !open;
    root.dataset.transition = open ? "open" : "closed";
    animations.forEach((a) => a.cancel());
    animations = [];
    panel?.style.removeProperty("will-change");
  };
  if (reduced || (!open && wasHidden) || !panel) {
    done();
    return;
  }
  const offset = mobile ? "translate3d(0, 28px, 0)" : "translate3d(36px, 0, 0)";
  const startOpacity = from ? from.opacity : open ? "0" : "1";
  const startTransform = from && from.transform !== "none" ? from.transform : open ? offset : "none";
  const options = { duration: open ? 460 : 200, easing: open ? ENTER : EXIT, fill: "both" };
  panel.style.willChange = "transform, opacity";
  animations.push(
    panel.animate(
      [
        { opacity: startOpacity, transform: startTransform },
        { opacity: open ? 1 : 0, transform: open ? "translate3d(0, 0, 0)" : mobile ? "translate3d(0, 16px, 0)" : "translate3d(20px, 0, 0)" },
      ],
      { ...options, delay: open && wasHidden && !mobile ? 90 : 0 },
    ),
  );
  // The card caption is shown by CSS once the card has settled (#flow-surface.card-ready).
  Promise.all(animations.map((a) => a.finished)).then(done, () => {});
}
