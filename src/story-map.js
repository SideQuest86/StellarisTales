const escape = (s) =>
  String(s || "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function nextUnread(order, current, visited) {
  const at = order.indexOf(current);
  return (
    [...order.slice(at + 1), ...order.slice(0, Math.max(0, at))].find(
      (id) => !visited.has(id),
    ) || null
  );
}
export function storyMap(story, chapters, current, visited, language, prose) {
  const nodes =
    story.navigation?.tree ||
    chapters.map((c) => ({
      id: c.id,
      parent: null,
      depth: 0,
      kind: "reading",
    }));
  const lookup = new Map(chapters.map((c) => [c.id, c]));
  const positions = new Map(
    nodes.map((n, i) => [
      n.id,
      { x: Math.min(n.depth, 4) * 19 + 10, y: i * 65 + 30 },
    ]),
  );
  const paths = nodes
    .filter((n) => n.parent && positions.has(n.parent))
    .map((n) => {
      const a = positions.get(n.parent),
        b = positions.get(n.id);
      return `<path class="${n.kind === "reading" ? "reading-edge" : "event-edge"}" d="M${a.x} ${a.y} V${b.y - 15} Q${a.x} ${b.y} ${b.x} ${b.y}"/>`;
    })
    .join("");
  return `<div class="story-map"><svg aria-hidden="true" width="100%" height="${nodes.length * 65}">${paths}</svg>${nodes
    .map((n, i) => {
      const c = lookup.get(n.id);
      const title = prose(c?.title?.[language] || c?.title?.zh || "篇章");
      const label = n.label?.[language] || n.label?.zh || "";
      return `<button data-chapter="${escape(n.id)}" class="map-chapter ${n.id === current ? "active" : ""} ${visited.has(n.id) ? "visited" : ""}" style="--branch-indent:${Math.min(n.depth, 4) * 19}px" aria-current="${n.id === current ? "step" : "false"}" title="${escape(title)}"><span class="map-dot"></span><span class="map-number">${String(i + 1).padStart(2, "0")}</span><span class="map-title">${escape(title)}${label ? `<small>${escape(prose(label))}</small>` : ""}</span></button>`;
    })
    .join("")}</div>`;
}
