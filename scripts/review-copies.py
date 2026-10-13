"""Private working copies for parallel story reviewers, and merging their results back.

  python scripts/review-copies.py create <agent> [...]    copy the project to ../st-agents/<agent> (no .git, dist,
                                                           node_modules, verification)
  python scripts/review-copies.py merge [<agent> ...] [--dry-run]

Ownership: a story id belongs to the agent whose list content/chronology/review/assignments/<agent>.txt contains it.
Merging copies, for each agent, only changed files it owns: fragments content/stories/<id>.json and guides
public/summaries/<id>.md of its stories (plus new ids it created that nobody else owns or created), and its ledger
content/chronology/review/<agent>*. Other agents' copies of a story are never authoritative. After merging run
scripts/compile-stories.py, the tests and scripts/audit-categories.mjs, then commit. Reviewers never run git.
"""
import filecmp, json, shutil, sys
from pathlib import Path

MAIN = Path(__file__).resolve().parents[1]
AGENTS = MAIN.parent / 'st-agents'
IGNORE = shutil.ignore_patterns('.git', 'dist', 'node_modules', 'verification')


def owners():
    owner = {}
    for f in sorted((MAIN / 'content/chronology/review/assignments').glob('*.txt')):
        for sid in f.read_text(encoding='utf-8').split():
            owner[sid] = f.stem
    return owner


def create(agents):
    for agent in agents:
        target = AGENTS / agent
        shutil.copytree(MAIN, target, ignore=IGNORE, dirs_exist_ok=True)
        (target / '.review-copy').write_text('created\n', encoding='utf-8')
        print('copy ready:', target)


def created_at(agent_dir):
    """When the copy was made: only files the agent changed after this are merged, and only fragments main has not
    changed since then are deleted (so an old copy can never revert newer work in main)."""
    marker = agent_dir / '.review-copy'
    return marker.stat().st_mtime if marker.exists() else agent_dir.stat().st_ctime


def merge(agents, dry):
    owner = owners()
    created, report = {}, {}
    # Finished copies are moved to st-agents/_done/ once merged; they are never merged again.
    for agent_dir in sorted(p for p in AGENTS.iterdir() if p.is_dir() and not p.name.startswith('_')):
        agent = agent_dir.name
        if agents and agent not in agents:
            continue
        copied, skipped = [], []
        since = created_at(agent_dir)

        def take(src, dst):
            if src.stat().st_mtime <= since or (dst.exists() and filecmp.cmp(src, dst, shallow=False)):
                return
            if dst.exists() and dst.stat().st_mtime > src.stat().st_mtime:
                skipped.append(f'NEWER IN MAIN {dst.relative_to(MAIN)}')
                return
            copied.append(str(dst.relative_to(MAIN)))
            if not dry:
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dst)

        for frag in (agent_dir / 'content/stories').glob('*.json'):
            sid = frag.stem
            if owner.get(sid) not in (agent, None):
                continue
            if sid not in owner:
                main_frag = MAIN / 'content/stories' / frag.name
                if main_frag.exists() and filecmp.cmp(frag, main_frag, shallow=False):
                    continue  # unchanged shared fragment present in every copy
                if created.get(sid, agent) != agent:
                    skipped.append(f'CONFLICT new id {sid} also created by {created[sid]}')
                    continue
                created[sid] = agent
            take(frag, MAIN / 'content/stories' / frag.name)
        for guide in (agent_dir / 'public/summaries').glob('*.md'):
            sid = guide.stem
            if owner.get(sid, agent) == agent and (sid in owner or created.get(sid) == agent
                                                   or not (MAIN / 'public/summaries' / guide.name).exists()):
                take(guide, MAIN / 'public/summaries' / guide.name)
        review = agent_dir / 'content/chronology/review'
        for item in review.glob(agent + '*'):
            for f in ([item] if item.is_file() else [x for x in item.rglob('*') if x.is_file()]):
                take(f, MAIN / 'content/chronology/review' / f.relative_to(review))
        # Fragments/guides the agent deleted for stories it owns (absorbed into a family it owns).
        for frag in (MAIN / 'content/stories').glob('*.json'):
            if (owner.get(frag.stem) == agent and not (agent_dir / 'content/stories' / frag.name).exists()
                    and frag.stat().st_mtime <= since):
                copied.append('DELETE ' + str(frag.relative_to(MAIN)))
                guide = MAIN / 'public/summaries' / (frag.stem + '.md')
                if not dry:
                    frag.unlink()
                    if guide.exists() and not (agent_dir / 'public/summaries' / guide.name).exists():
                        guide.unlink()
        report[agent] = {'copied': len(copied), 'skipped': skipped, 'files': copied[:12]}
    print(json.dumps(report, ensure_ascii=False, indent=1))


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if not args or args[0] not in ('create', 'merge'):
        sys.exit(__doc__)
    if args[0] == 'create':
        create(args[1:])
    else:
        merge(args[1:], '--dry-run' in sys.argv)
