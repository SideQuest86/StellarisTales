#!/usr/bin/env python3
"""Build the self-hosted Chinese web fonts (public/fonts/).

Noto Serif SC (400, 600) and Noto Sans SC (400, 500) are cut from Google's variable TTFs into static instances and
subset to the characters the site can display, in three disjoint tiers per face (files):

  t1  first paint: ASCII, every non-Han symbol the site uses, the characters of the interface (src/*, index.html) and
      the most frequent story characters (first T1_HAN entries of public/stories/glyphs.json)
  t2  the rest of the reading text: remaining glyphs.json characters, then the next most frequent characters of the
      stories/summaries/effects/museum text, up to HAN_FIRST_TWO_TIERS Han characters in t1 + t2
  t3  everything else the data can show (rare names, search index, effect labels)

Characters are collected from public/{stories,summaries,effects,museum,data,search}, src/ and index.html. The
unicode-range of each @font-face rule lists the characters of the file actually written (from its cmap, so a character the
font lacks is never claimed); the tiers are disjoint, which matters: document.fonts.load() downloads every face whose range
overlaps the text, so overlapping ranges (e.g. a broad t2 overridden by t1) would fetch t2 for plain t1 text. verify()
resolves every site character the way a browser does and checks that the file it lands in has the glyph. Output:
public/fonts/*.woff2 and OFL.txt, and src/fonts.css (linked from index.html; its urls are ../fonts/*, the layout of the
built site: src/ -> dist/src/, public/ -> dist/). Deterministic for a given source font, site data and fontTools/brotli
version. The layout features the typography relies on (kern, palt, halt, chws for text-spacing-trim, ccmp, locl, liga)
are kept.

Usage (st-tools venv has fonttools + brotli; run from anywhere):
  D:/Saving/Living/CodexProjects/st-tools/venv/Scripts/python.exe scripts/fonts/build-subsets.py
         [--src D:/Saving/Living/CodexProjects/st-tools/fonts-src] [--stats | --check]
Source fonts (URLs, hashes: docs/refine/round6/fonts.md and the header of public/fonts/OFL.txt): NotoSerifSC-wght.ttf,
NotoSansSC-wght.ttf and the two OFL.txt files, downloaded unmodified from github.com/google/fonts (ofl/notoserifsc,
ofl/notosanssc) into --src. Re-run whenever the stories, summaries, effects, museum data or src/ text change.
"""
import argparse
import collections
import hashlib
import io
import json
import os
import re
import sys
import unicodedata

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "public", "fonts")
CSS_OUT = os.path.join(ROOT, "src", "fonts.css")
CSS_URL_PREFIX = "../fonts/"  # src/fonts.css -> fonts/ (dist layout; scripts/build.mjs copies src/ to dist/src/ and public/ to dist/)

T1_HAN = 1000  # glyphs.json entries in tier 1 (93.7 % of story occurrences), plus the interface's own characters
HAN_FIRST_TWO_TIERS = 3500  # t1 + t2 Han characters; the rest is t3

# Unmodified variable TTFs from google/fonts main (OFL 1.1), downloaded 2026-10-25 (US Pacific). The git blob ids are the
# ones GitHub lists for ofl/<dir>/ (checked: same file size and blob id as the local copies); sha256 is of the file itself.
GOOGLE_FONTS = "https://github.com/google/fonts/tree/main/ofl/"
RAW = "https://raw.githubusercontent.com/google/fonts/main/ofl/"
SOURCES = {
    "NotoSerifSC-wght.ttf": {
        "url": RAW + "notoserifsc/NotoSerifSC%5Bwght%5D.ttf", "bytes": 25125512,
        "sha256": "050080D9255A86808F2945BFFAC582B31EF32BC36411CE29563B4961670C66F9",
        "blob": "eab063faf229160a52d3760f5555150e4eb9e5bf",
        "upstream": "https://www.github.com/notofonts/noto-cjk @ 985fa52c81c1d6692ccdd82bc3656e8fb932fd89",
    },
    "NotoSansSC-wght.ttf": {
        "url": RAW + "notosanssc/NotoSansSC%5Bwght%5D.ttf", "bytes": 17772300,
        "sha256": "A3041811A78C361B1DE50F953C805E0244951C21C5BD412F7232EF0D899AF0DA",
        "blob": "fb0637bafbcd804fe32152370a1225990745b4bc",
        "upstream": "https://github.com/notofonts/noto-cjk @ 523d033d6cb47f4a80c58a35753646f5c3608a78",
    },
    "OFL-NotoSerifSC.txt": {"url": RAW + "notoserifsc/OFL.txt", "bytes": 4350, "sha256": "5E0DA210FB04058A8C0087985D2D456B931C2579811A49655721D3CF0C36B6D6", "blob": "94d1bf7b52481343e2983fb7751e8b7abe1ea07b"},
    "OFL-NotoSansSC.txt": {"url": RAW + "notosanssc/OFL.txt", "bytes": 4388, "sha256": "1C05C68C34F9708415AADA51F17E1B0092D2CEA709BF4A94CD38114F9E73D7D9", "blob": "1c9f43281b8f216c5461fe9ac729afbade7724e4"},
}
# (css family, source file, file stem, weights)
FACES = [
    ("Noto Serif SC", "NotoSerifSC-wght.ttf", "noto-serif-sc", (400, 600)),
    ("Noto Sans SC", "NotoSansSC-wght.ttf", "noto-sans-sc", (400, 500)),
]
# Range endpoints written as literals in src/ (glyph-warmup.js etc.), not text the page shows.
NOT_TEXT = set("\u3400\u9fff\uf900\ufaff\uff00\uffef\ufeff")


def is_han(ch):
    c = ord(ch)
    return 0x3400 <= c <= 0x4DBF or 0x4E00 <= c <= 0x9FFF or 0xF900 <= c <= 0xFAFF or 0x20000 <= c <= 0x2FA1F


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def count_files(rel_dirs, exts, recursive=True):
    counts = collections.Counter()
    for rel in rel_dirs:
        base = os.path.join(ROOT, rel)
        for dirpath, dirnames, filenames in os.walk(base):
            dirnames.sort()
            for name in sorted(filenames):
                if name.endswith(exts):
                    counts.update(read(os.path.join(dirpath, name)))
            if not recursive:
                break
    return counts


def collect():
    """-> (reading, other, interface, data) Counters of characters, plus the glyphs.json order."""
    reading = count_files(["public/stories", "public/summaries"], (".json", ".md"))
    other = count_files(["public/effects", "public/museum"], (".json",))
    interface = count_files(["src"], (".js", ".css"), recursive=False) + count_files(["."], (".html",), recursive=False)
    data = count_files(["public/data", "public/search"], (".json",))
    glyphs = json.loads(read(os.path.join(ROOT, "public", "stories", "glyphs.json")))["zh"]
    return reading, other, interface, data, glyphs


def displayable(ch):
    return ch not in NOT_TEXT and unicodedata.category(ch)[0] not in "CZ" or ch in "\u00a0\u3000"


def plan_tiers():
    reading, other, interface, data, glyphs = collect()
    everything = reading + other + interface + data
    ui_han = {c for c in interface if is_han(c) and c not in NOT_TEXT}
    han_all = {c for c in everything if is_han(c) and c not in NOT_TEXT}
    rank = []  # Han characters, most important first
    seen = set()
    for c in glyphs:
        if is_han(c) and c not in seen:
            rank.append(c)
            seen.add(c)
    rest = sorted((c for c in han_all if c not in seen), key=lambda c: (-(reading[c] + other[c] + interface[c]), -data[c], c))
    rank += rest
    t1 = set(rank[:T1_HAN]) | ui_han
    t2 = set()
    for c in rank:
        if c in t1:
            continue
        if len(t1) + len(t2) >= HAN_FIRST_TWO_TIERS:
            break
        t2.add(c)
    t3 = han_all - t1 - t2
    # glyph-warmup.js lays out glyphs.json[:3000] and loads the faces for it: tiers 1 + 2 must hold all of them
    missing = [c for c in glyphs if is_han(c) and c not in t1 and c not in t2]
    if missing:
        raise SystemExit("glyphs.json characters outside tiers 1-2: %s" % "".join(missing[:40]))
    symbols = {c for c in everything if not is_han(c) and ord(c) > 0x7F and displayable(c)}
    t1 |= symbols | {chr(i) for i in range(0x20, 0x7F)}
    return {"t1": t1, "t2": t2, "t3": t3}, {"han_all": len(han_all), "ui_han": len(ui_han), "symbols": len(symbols), "rank": rank}


def ranges(codepoints):
    cps = sorted(codepoints)
    out = []
    start = prev = None
    for c in cps:
        if start is None:
            start = prev = c
        elif c == prev + 1:
            prev = c
        else:
            out.append((start, prev))
            start = prev = c
    if start is not None:
        out.append((start, prev))
    return ", ".join("U+%X" % a if a == b else "U+%X-%X" % (a, b) for a, b in out)


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        h.update(f.read())
    return h.hexdigest().upper()


def parse_css():
    """[(family, weight, file name, set of code points)] of src/fonts.css, in declaration order."""
    rules = []
    for rule in re.finditer(r"@font-face\s*\{(.*?)\}", read(CSS_OUT), re.S):
        body = rule.group(1)
        cps = set()
        for part in re.search(r"unicode-range:\s*([^;]+);", body).group(1).split(","):
            lo, _, hi = part.strip()[2:].partition("-")
            cps.update(range(int(lo, 16), int(hi or lo, 16) + 1))
        rules.append((re.search(r'font-family:\s*"([^"]+)"', body).group(1), int(re.search(r"font-weight:\s*(\d+)", body).group(1)),
                      re.search(r"url\([^)]*?([\w-]+\.woff2)\)", body).group(1), cps))
    return rules


def verify(tiers, src):
    """Exit 1 unless, for every character of the site that the source font has, the rule the browser would pick in src/fonts.css
    (the last one whose unicode-range holds it) names a file that really contains the glyph. Fails when the site text has
    changed since the last build, or the css and the files disagree."""
    rules = parse_css()
    site = sorted(set().union(*tiers.values()))
    cmaps = {}
    problems = 0
    for family, src_name, _stem, weights in FACES:
        source_cmap = TTFont(os.path.join(src, src_name), lazy=True).getBestCmap()
        for weight in weights:
            mine = [r for r in rules if r[0] == family and r[1] == weight]
            bad = []
            for c in site:
                if ord(c) not in source_cmap:
                    continue
                hit = next((r for r in reversed(mine) if ord(c) in r[3]), None)
                if hit is None:
                    bad.append(c)
                    continue
                if hit[2] not in cmaps:
                    cmaps[hit[2]] = TTFont(os.path.join(OUT, hit[2]), lazy=True).getBestCmap()
                if ord(c) not in cmaps[hit[2]]:
                    bad.append(c)
            if bad:
                problems += 1
                print("%s %d: %d site characters resolve to no glyph in src/fonts.css / public/fonts: %s" % (family, weight, len(bad), "".join(bad[:60])))
    if problems:
        sys.exit("fonts are out of date: run scripts/fonts/build-subsets.py")
    print("src/fonts.css serves every character of the site from a file that has it (%d characters, %d Han)" % (len(site), sum(1 for c in site if is_han(c))))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default="D:/Saving/Living/CodexProjects/st-tools/fonts-src")
    ap.add_argument("--stats", action="store_true", help="print the tier plan and exit")
    ap.add_argument("--check", action="store_true", help="fail if some character of the site text is not served from a font file that has it (text changed since the last build), and exit")
    args = ap.parse_args()
    tiers, info = plan_tiers()
    print("Han characters on the site: %d (interface %d), symbols %d" % (info["han_all"], info["ui_han"], info["symbols"]))
    for name in ("t1", "t2", "t3"):
        print("  %s: %d characters (%d Han)" % (name, len(tiers[name]), sum(1 for c in tiers[name] if is_han(c))))
    if args.stats:
        return
    if args.check:
        verify(tiers, args.src)
        return
    os.makedirs(OUT, exist_ok=True)
    for name, meta in SOURCES.items():
        digest = sha256(os.path.join(args.src, name))
        if digest != meta["sha256"]:
            sys.exit("%s: sha256 %s differs from the pinned %s" % (name, digest, meta["sha256"]))
    css = [
        "/* Generated by scripts/fonts/build-subsets.py; do not edit. Noto Serif SC (400, 600) and Noto Sans SC (400, 500), subset to the",
        "   characters the site can show (SIL OFL 1.1, public/fonts/OFL.txt). Three tiers per face: t1 = ASCII, symbols, the interface and",
        "   the ~1,000 most frequent story characters; t2 = the rest of the reading text (t1 + t2 = the 3,500 most frequent Han",
        "   characters); t3 = rare characters (names, search index, effect labels). The unicode-ranges are disjoint, so a page (and",
        "   document.fonts.load) downloads only the tiers whose characters it shows. urls are relative to this file: src/ and fonts/ sit",
        "   side by side in the built site. */",
    ]
    face_rules = {}  # (family, tier, weight) -> css text
    report = []
    for family, src_name, stem, weights in FACES:
        src_path = os.path.join(args.src, src_name)
        site = set().union(*tiers.values())
        source_cmap = TTFont(src_path).getBestCmap()
        in_font = {c for c in site if ord(c) in source_cmap}
        print("%s: %d site characters, %d not in the font (system fallback): %s" % (
            family, len(site), len(site) - len(in_font), "".join(sorted(site - in_font))))
        for weight in weights:
            written = set()
            # updateFontNames: the name table says "Noto Serif SC SemiBold", not the variable font's default instance ("ExtraLight").
            instance = instancer.instantiateVariableFont(TTFont(src_path, recalcTimestamp=False), {"wght": weight}, updateFontNames=True)
            buf = io.BytesIO()
            instance.save(buf)
            blob = buf.getvalue()
            for tier in ("t1", "t2", "t3"):
                font = TTFont(io.BytesIO(blob), recalcTimestamp=False)
                opts = subset.Options()
                opts.flavor = "woff2"
                opts.hinting = False
                opts.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
                opts.notdef_outline = True
                sub = subset.Subsetter(opts)
                sub.populate(unicodes=[ord(c) for c in tiers[tier]])
                sub.subset(font)
                font.flavor = "woff2"
                fname = "%s-%d-%s.woff2" % (stem, weight, tier)
                path = os.path.join(OUT, fname)
                font.save(path)
                cmap = TTFont(path).getBestCmap()
                wanted = {ord(x) for x in tiers[tier]}
                covered = {c for c in cmap if c in wanted}
                written |= {chr(c) for c in covered}
                size = os.path.getsize(path)
                report.append((fname, size, len(covered)))
                face_rules[(family, tier, weight)] = (
                    "@font-face {\n  font-family: \"%s\";\n  font-style: normal;\n  font-weight: %d;\n  font-display: swap;\n"
                    "  src: url(%s%s) format(\"woff2\");\n  unicode-range: %s;\n}" % (
                        family, weight, CSS_URL_PREFIX, fname, ranges(covered))
                )
                print("%-34s %8d bytes  %4d characters" % (fname, size, len(covered)))
            if written != in_font:
                sys.exit("%s %d: tiers do not cover every site character the font has: %s" % (family, weight, "".join(sorted(in_font - written))[:80]))
    # tier by tier, so the weights' identical lists sit side by side and compress
    for tier in ("t1", "t2", "t3"):
        for family, _src, _stem, weights in FACES:
            css.extend(face_rules[(family, tier, weight)] for weight in weights)
    with open(CSS_OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(css) + "\n")
    verify(tiers, args.src)
    stale = os.path.join(OUT, "fonts.css")  # an earlier layout kept the stylesheet next to the fonts
    if os.path.exists(stale):
        os.remove(stale)
    # OFL.txt: provenance of the sources, both copyright notices, then the licence text (as published for each family)
    ofl = []
    for n, label, src_name in (("OFL-NotoSerifSC.txt", "Noto Serif SC", FACES[0][1]), ("OFL-NotoSansSC.txt", "Noto Sans SC", FACES[1][1])):
        # The OFL.txt in google/fonts carries an older copyright line than the font itself: record the font's own notice too.
        notice = TTFont(os.path.join(args.src, src_name), lazy=True)["name"].getDebugName(0)
        meta = SOURCES[src_name]
        ofl.append((label, "Source font: %s\n  %d bytes, sha256 %s, git blob %s\n  upstream: %s\n\n" % (meta["url"], meta["bytes"], meta["sha256"], meta["blob"], meta["upstream"])
                    + "Copyright notice embedded in the font (name table, kept in the subsets): %s\n\n" % notice
                    + "Licence text, as published at %s:\n\n" % SOURCES[n]["url"]
                    + read(os.path.join(args.src, n)).replace("\r\n", "\n")))
    with open(os.path.join(OUT, "OFL.txt"), "w", encoding="utf-8", newline="\n") as f:
        f.write("Noto Serif SC and Noto Sans SC, subset to the characters this site shows (public/fonts/*.woff2; built by scripts/fonts/build-subsets.py).\n")
        f.write("Fonts: SIL Open Font License 1.1, from %s (variable TTF, cut to static instances at the weights used and\n" % GOOGLE_FONTS)
        f.write("subset: the glyph shapes, the layout features the site uses and the copyright / licence entries of the name table are those of the source).\n")
        for label, text in ofl:
            f.write("\n\n==== %s ====\n\n%s" % (label, text))
    total = sum(r[1] for r in report)
    print("total %d bytes in %d files; src/fonts.css %d bytes" % (total, len(report), os.path.getsize(CSS_OUT)))


if __name__ == "__main__":
    main()
