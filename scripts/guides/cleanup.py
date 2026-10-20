#!/usr/bin/env python3
"""Mechanical, idempotent cleanup of public/summaries/*.md (round 5 audit fixes M1, M2, M3, M6, M8).

M1  reviewer disclaimer blockquote and the "审阅 Reviewed ..." header part -> review section ("## 审阅记录 Review notes")
M2  "- 来源 Sources" line (own line or header segment) -> review section
M3  pure filler lines in the branches / conditions sections are deleted (they carry no information)
M6  "Category:" -> "Category：" (full-width, dominant form)
M8  known stale editor-voice phrases are cut from the body and kept in the review section

Game text is never touched. Usage: python scripts/guides/cleanup.py [--dry-run] [--root DIR]
"""
import argparse
import collections
import re
import sys
from pathlib import Path

REVIEW_H = re.compile(r"^##\s+(审阅记录|审阅|Review notes?)(\s|$)", re.I)
H2 = re.compile(r"^##\s")
DISCLAIMER = re.compile(r"不是游戏原文|not game text|审阅者导读|[Rr]eviewer commentary")
SRC_LINE = re.compile(r"^[-*]\s*来源\s*Sources\s*[：:]")
REV_LINE = re.compile(r"^[-*]\s*(审阅|Reviewed)\b")
# header-segment split: " · " only where a known field follows (Sources lists use " · " internally)
SEG_SPLIT = re.compile(r"\s·\s(?=(?:DLC|审阅|来源|Reviewed)\b)")
FILLER = [
    r"无。|无文明身份差异。|None\.?",
    r"无。\s*/?\s*None\.?",
    r"无特殊的文明差异。\s*/?\s*No empire-specific variants beyond the reward wording\.?",
    r"可选条件见起源卡。\s*/?\s*Requirements are on the origin card\.?",
    r"No empire-specific (option differences|options)\.?",
    r"无文明身份差异。\s*/?\s*None\.?",
    r"本导读未单列(条件差异|分支与结局)；.*",
]
FILLER_RE = re.compile(r"^\s*(?:[-*]\s*)?(?:%s)\s*$" % "|".join(f"(?:{f})" for f in FILLER))
SECTION_RE = re.compile(r"分支|条件|Branches|Conditions")
EDITOR_PAREN = "（审阅改定；编译默认为深空异闻）"
EDITS = {  # file -> (old, new, note)
    "anomaly-disco-molluscoid-miners-cat.md": [("这看起来与预期相反，记录为原文现状。", "", "这看起来与预期相反，记录为原文现状。")],
    "event-ancrel-10000.md": [
        ("；第四个没有可读文本", "", "第四个没有可读文本。 / The fourth result has no readable text."),
        ("; the fourth has no readable text", "", None),
    ],
}


def process(name, text):
    """Return (new_text, counter). Pure function of the file text."""
    c = collections.Counter()
    eol = "\r\n" if "\r\n" in text else "\n"
    lines = text.replace("\r\n", "\n").split("\n")
    # locate review section
    r0 = next((i for i, l in enumerate(lines) if REVIEW_H.match(l)), None)
    r1 = len(lines)
    if r0 is not None:
        r1 = next((i for i in range(r0 + 1, len(lines)) if H2.match(lines[i])), len(lines))
    body = lines[:r0] if r0 is not None else lines[:]
    tail = lines[r1:] if r0 is not None else []
    review = lines[r0:r1] if r0 is not None else []
    moved = {"rev": [], "src": [], "note": [], "edit": []}
    out = []
    section = ""
    seen_h2 = False
    removed_any = False
    for l in body:
        if H2.match(l):
            seen_h2 = True
            section = l
        # M1/M2 own-line items (header zone or body)
        if SRC_LINE.match(l):
            moved["src"].append(re.sub(r"(Sources)\s*:\s*", r"\1：", l, 1)); c["M2 sources line"] += 1; removed_any = True; continue
        if not seen_h2 and REV_LINE.match(l):
            moved["rev"].append(l); c["M1 reviewed line"] += 1; removed_any = True; continue
        if l.startswith(">") and DISCLAIMER.search(l):
            t = l.lstrip("> ").strip()
            moved["note"].append("- " + t); c["M1 disclaimer line"] += 1; removed_any = True; continue
        # category line
        if not seen_h2 and re.match(r"^[-*]\s*分类\s*Category\s*[：:]", l):
            if re.match(r"^[-*]\s*分类\s*Category(:|： )", l):
                l = re.sub(r"^([-*]\s*分类\s*Category)(?::|：)\s*", r"\1：", l); c["M6 colon"] += 1
            if EDITOR_PAREN in l:
                l = l.replace(EDITOR_PAREN, "")
                moved["edit"].append("- 编辑备注 Editor note：审阅改定；编译默认为深空异闻（原位于分类行）")
                c["M8 editor note"] += 1
            segs = SEG_SPLIT.split(l)
            keep = [segs[0]]
            for s in segs[1:]:
                if re.match(r"(审阅|Reviewed)", s):
                    moved["rev"].append("- " + s); c["M1 reviewed segment"] += 1
                elif s.startswith("来源"):
                    moved["src"].append("- " + re.sub(r"(Sources)\s*:\s*", r"\1：", s, 1)); c["M2 sources segment"] += 1
                else:
                    keep.append(s)
            # a Sources segment can also directly follow the category label
            l = " · ".join(keep)
            m = re.search(r"\s·\s(来源\s*Sources\s*[：:].*)$", l)
            if m and len(keep) == 1:
                pass
            if len(segs) > 1 and len(keep) != len(segs):
                removed_any = True
        # M8 exact edits
        for old, new, note in EDITS.get(name, []):
            if old in l:
                l = l.replace(old, new); c["M8 phrase cut"] += 1
                if note:
                    moved["edit"].append("- 编辑备注 Editor note：" + note)
        # M3 filler
        if SECTION_RE.search(section) and not REVIEW_H.match(section) and FILLER_RE.match(l):
            c["M3 filler line"] += 1; removed_any = True; continue
        out.append(l)
    if removed_any:  # tidy blank runs left behind
        tidy = []
        for l in out:
            if l.strip() == "" and len(tidy) >= 1 and tidy[-1].strip() == "":
                continue
            tidy.append(l)
        out = tidy
    add = moved["rev"] + moved["src"] + moved["note"] + moved["edit"]
    if not add and not c:
        return text, c
    if r0 is None:
        review = ["## 审阅记录 Review notes", ""]
        c["review section created"] += 1
        if out and out[-1].strip() != "":
            out.append("")
    # insert after heading (+ one blank line)
    pos = 2 if len(review) > 1 and review[1].strip() == "" else 1
    if len(review) == 1 or (len(review) == 2 and pos == 2):
        pass
    review = review[:pos] + ([""] if pos == 1 and add else []) + add + review[pos:]
    if r0 is not None and tail == [] and review[-1] != "":
        pass
    new = out + review + tail if r0 is not None else out + review
    return eol.join(new), c


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--root", default=str(Path(__file__).resolve().parents[2]))
    a = ap.parse_args()
    total = collections.Counter()
    files = collections.Counter()
    for p in sorted((Path(a.root) / "public" / "summaries").glob("*.md")):
        raw = p.read_bytes().decode("utf-8")
        new, c = process(p.name, raw)
        if new != raw:
            files["changed"] += 1
            total.update(c)
            if not a.dry_run:
                p.write_bytes(new.encode("utf-8"))
    print(("DRY RUN " if a.dry_run else "APPLIED ") + f"files changed: {files['changed']}")
    for k, v in sorted(total.items()):
        print(f"  {k}: {v}")


if __name__ == "__main__":
    sys.exit(main())
