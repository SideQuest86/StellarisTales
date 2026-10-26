import { test } from "node:test";
import assert from "node:assert/strict";
import { typeset, leadLine, markIds, noteBody } from "../src/typeset.js";
import { trimGlueSpaces } from "../src/guide-links.js";

// Expected strings are written with ASCII tokens so that no look-alike glyph can be mistaken for another.
const GLYPH = {
  "{lq}": 0x201c, "{rq}": 0x201d, "{ls}": 0x2018, "{rs}": 0x2019, "{el}": 0x2026, "{en}": 0x2013,
  "{dash}": [0x2009, 0x2060, 0x2013, 0x2060, 0x2009], // thin space, word joiner, en dash, word joiner, thin space
  "{!}": 0xff01, "{?}": 0xff1f, "{:}": 0xff1a, "{zel}": [0x2026, 0x2026],
};
const cu = (s) => s.replace(/\{[^}]+\}/g, (t) => (t in GLYPH ? String.fromCodePoint(...[].concat(GLYPH[t])) : t));
const words = (s) => s.replace(/[^\p{L}\p{N}]/gu, ""); // what a reader reads: letters and digits only

test("apostrophes", () => {
  assert.equal(typeset("It's the Kael's ship, can't you see?"), cu("It{rs}s the Kael{rs}s ship, can{rs}t you see?"));
  assert.equal(typeset("the players' ships"), cu("the players{rs} ships"));
  assert.equal(typeset("'Tis said, and 'em too"), cu("{rs}Tis said, and {rs}em too"));
  assert.equal(typeset("back in the '90s"), cu("back in the {rs}90s"));
});

test("ambiguous apostrophes and quotes stay as shipped", () => {
  assert.equal(typeset("a 5'6 man"), "a 5'6 man");
  assert.equal(typeset("a 5' pole"), "a 5' pole");
  assert.equal(typeset("a 12\" pipe"), "a 12\" pipe");
  assert.equal(typeset("'Come all you young spacefarers, listen to"), "'Come all you young spacefarers, listen to");
  assert.equal(typeset("call it ''Fluffy''"), "call it ''Fluffy''");
  assert.equal(typeset("word\"word"), "word\"word");
});

test("double and nested quotes", () => {
  assert.equal(typeset('"Hello," she said. "Goodbye."'), cu("{lq}Hello,{rq} she said. {lq}Goodbye.{rq}"));
  assert.equal(typeset("He said \"don't go 'there' again\" twice."), cu("He said {lq}don{rs}t go {ls}there{rs} again{rq} twice."));
  assert.equal(typeset("\"'Tis the season,\" he said"), cu("{lq}{rs}Tis the season,{rq} he said"));
  assert.equal(typeset('called "Telisa the Teller of Tales."The record'), cu("called {lq}Telisa the Teller of Tales.{rq}The record"));
  assert.equal(typeset("says:\"Stress is low\""), cu("says:{lq}Stress is low{rq}"));
  assert.equal(typeset("the word 'library' as 'armory'."), cu("the word {ls}library{rs} as {ls}armory{rs}."));
  assert.equal(typeset("counter equals '3' here"), cu("counter equals {ls}3{rs} here"));
  assert.equal(typeset("(\"quoted\") text"), cu("({lq}quoted{rq}) text"));
});

test("spaced hyphens used as dashes become an en dash with thin spacing", () => {
  assert.equal(typeset("here - faint, but real"), cu("here{dash}faint, but real"));
  assert.equal(typeset("A - B - C"), cu("A{dash}B{dash}C"));
});

test("ranges, negatives, bullets and compounds keep their hyphen", () => {
  for (const s of ["lasts 1-6 days", "-1 Organic Pop", "gain -0.1 per empire", "10 - 5 = 5", "Day 3 - 7", "well-known, high-tech", "----CRITICAL ERROR----", "-.-. --- --", "- Sets the Stance\n- Gain a trait", "Message\n - indented"]) {
    assert.equal(typeset(s), s, s);
  }
});

test("ellipsis", () => {
  assert.equal(typeset("Wait... what? Wait..."), cu("Wait{el} what? Wait{el}"));
  assert.equal(typeset("...and so"), cu("{el}and so"));
  assert.equal(typeset("a....b and 1...5"), "a....b and 1...5");
});

test("ids, file names, URLs, brackets and variables are untouched", () => {
  for (const [s, ...tokens] of [
    ["hidden event akx.8000 designates, enclave.410.b - and enclave.5556", "akx.8000", "enclave.410.b", "enclave.5556"],
    ["script flag is_dialog_only or FROZ_ILLUMINATED_CAT's own", "is_dialog_only", "FROZ_ILLUMINATED_CAT"],
    ["see overlord_enclaves_events.txt:9615 and 00_on_actions.txt:4946-4958...", "overlord_enclaves_events.txt:9615", "00_on_actions.txt:4946-4958"],
    ["open https://example.com/it's-here?a=1&b='x' now", "https://example.com/it's-here?a=1&b='x'"],
    ["Sets the ['concept_animal_handler_stance'] Stance", "['concept_animal_handler_stance']"],
    ["Unlocks ['building:building_pinniped_sanctuary']: yes", "['building:building_pinniped_sanctuary']"],
    ["event_target:synth_queen_system said", "event_target:synth_queen_system"],
    ["-200$pop$ Pops! Any kind", "-200$pop$"],
  ]) {
    const out = typeset(s);
    for (const token of tokens) assert.ok(out.includes(token), `${token} in ${out}`);
  }
  assert.equal(typeset("see ['concept_a_b'] - and 'x' next"), cu("see ['concept_a_b']{dash}and {ls}x{rs} next"));
});

test("name annotation spans written by prose() are left alone", () => {
  const [open, close, end] = [0xe000, 0xe001, 0xe002].map((c) => String.fromCharCode(c)); // markers of src/name-fill.js
  const s = `${open}Reviewed: the game's 'own' wording${end}Kael's${close} ship - gone`;
  assert.equal(typeset(s), cu(`${open}Reviewed: the game's 'own' wording${end}Kael{rs}s${close} ship{dash}gone`));
});

test("Chinese: full-width ! ? : after a Hanzi, double ellipsis next to Hanzi", () => {
  assert.equal(typeset("你被囚禁了多久?"), cu("你被囚禁了多久{?}"));
  assert.equal(typeset("繁荣昌盛!\n因此:不要屈服"), cu("繁荣昌盛{!}\n因此{:}不要屈服"));
  assert.equal(typeset("也许这位官员只是犯了个错误..."), cu("也许这位官员只是犯了个错误{zel}"));
  assert.equal(typeset("但不...你们并不是"), cu("但不{zel}你们并不是"));
  assert.equal(typeset("“菊”号上吗?"), cu("“菊”号上吗{?}"));
});

test("Chinese: Latin neighbours, numbers, ids, quotes and corrupted text stay", () => {
  for (const s of ["比例是3:1", "On the Syzygy: ready!", "https://example.com/a?b=1", "禁用['concept_psionic_ascension']。", "<</<#?^&}|>!^/塞塔娜的弱点!+<;纳米机*;'_>", "“The Study Is Over”: the sphere", "他说\"你好\"", "wait... 好的", "(on_system_gained，:4256)"]) {
    assert.equal(typeset(s), s, s);
  }
});

test("a Chinese string in the English UI gets the Chinese rules, not English ones", () => {
  assert.equal(typeset("他说:'好的' - 然后离开..."), cu("他说{:}'好的' - 然后离开{zel}"));
});

test("the visible words are identical before and after", () => {
  const samples = [
    "\"I'm through,\" they add. \"It's dark - and they're 'quiet'...\" No!",
    "At game start, hidden event akx.8000 (weight 4 of 20) fires - once per game...",
    "She said: \"The 'Drone-Prime' from [pre_ftl_planet.GetName] isn't ours.\"",
    "Lab 17 - Progress update - Research 'complete' (see 00_on_actions.txt:4946-4958).",
    "players' ships and 'Tis the season; back in the '90s",
    "你被囚禁了多久?我们才华横溢,顽强不屈!他说:好。..." + "...",
  ];
  for (const s of samples) assert.equal(words(typeset(s)), words(s), s);
});

test("plain text without candidates is returned unchanged and typeset is idempotent", () => {
  assert.equal(typeset("Plain words only."), "Plain words only.");
  assert.equal(typeset(""), "");
  assert.equal(typeset(null), "");
  const once = typeset('"It\'s here - now..." he said');
  assert.equal(typeset(once), once);
});

test("lead lines: a hyphen-led first line followed by text", () => {
  assert.deepEqual(leadLine("-警告：具有挑战性的起源\n\n与同化他们的机器被切断联系之后。"), { lead: "-警告：具有挑战性的起源", rest: "与同化他们的机器被切断联系之后。" });
  assert.deepEqual(leadLine("-警告：具有挑战性的起源\n警告：禁用['concept_psionic_ascension']。\n\n这个文明"), { lead: "-警告：具有挑战性的起源", rest: "警告：禁用['concept_psionic_ascension']。\n\n这个文明" });
  assert.deepEqual(leadLine("-Warning: Challenging Origin\nA nascent civilization."), { lead: "-Warning: Challenging Origin", rest: "A nascent civilization." });
  for (const s of ["- The Galactic Crucible expansion\n- Another", "-1所有所属殖民地内有机体人口", "-0.1 per opposing empire", "----CRITICAL ERROR----\n\nmore", "-当我们将处理器切换为翻译来自未知外星人——被我们标记为某某——的信号", "-强制全帝国系统重装-", "Plain\ntext", ""]) {
    assert.equal(leadLine(s), null, s);
  }
});

test("reviewer notes: engine ids in <code>, the in-text label dropped", () => {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  assert.equal(markIds("begins after paying (enclave.410.b); see 00_on_actions.txt:4946-4958 & is_dialog_only.", esc),
    "begins after paying (<code>enclave.410.b</code>); see <code>00_on_actions.txt:4946-4958</code> &amp; <code>is_dialog_only</code>.");
  assert.equal(markIds("hidden event akx.8000 at weight 4 of 20", esc), "hidden event <code>akx.8000</code> at weight 4 of 20");
  assert.equal(markIds("plain words, v3.5 and 1.5x", esc), "plain words, v3.5 and 1.5x");
  assert.equal(noteBody("Review note: begins after paying"), "begins after paying");
  assert.equal(noteBody("审阅注：在虚境行者城邦菜单中询问"), "在虚境行者城邦菜单中询问");
  assert.equal(noteBody("Reviewer note: x"), "x");
  assert.equal(noteBody("The first three questions"), "The first three questions");
});

test("guide links: one space beside a Chinese character is trimmed, spaces beside Latin text stay", () => {
  const link = { id: "origin.1199", raw: "origin.1199" };
  assert.deepEqual(trimGlueSpaces(["路线以 ", link, " 结束局势"]), ["路线以", link, "结束局势"]);
  assert.deepEqual(trimGlueSpaces(["then ", link, " continues"]), ["then ", link, " continues"]);
  assert.deepEqual(trimGlueSpaces(["A ", link, " → ", link, " B"]), ["A ", link, " → ", link, " B"]);
  assert.deepEqual(trimGlueSpaces([link, " ", link]), [link, " ", link]);
});
