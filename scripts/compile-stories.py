"""Compile story dossiers (V4 root-anchored story trees).

Kept as the runbook entry point. The implementation lives in scripts/story_tree.py; the retired V3 compiler is kept
for reference in scripts/v3/ (it reads the V3 configuration archived in content/chronology/v3/).
"""
from story_tree import Compiler

if __name__ == '__main__':
    Compiler().compile()
