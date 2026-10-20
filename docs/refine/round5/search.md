# Round 5 - search improvements (src/search.js, scripts/build-search-index.mjs)

Index FORMAT 2 (same 32 shards + meta/titles; rebuilt by build.mjs, not committed).

- **Prefix**: Latin terms are sharded by their first two characters (`shardOf`), so all terms sharing a 2+ letter prefix sit in one
  sorted shard. The last word of a query (when the query does not end in a space, 3+ letters) matches every indexed term that
  starts with it (top 16 by posting size; union of postings, no duplicated data). "leviath" -> Leviathan(s); "crisis bea" -> "crisis beacon".
  Earlier words stay exact. Cost: still one shard for the first query.
- **Single CJK character**: unigram terms are indexed (name/text/choice/effect masks, so titles rank first). Characters in more
  than 5% of documents (557 of ~3700) are not stored (they would be ~75% of the unigram bytes and match everything); those fall
  back to the old chapter-title scan. Results from a single character are capped at the best 400 documents. 2+ characters: bigrams as before.
- **Typo tolerance**: only when the exact/prefix search finds no row at all (including story titles). A Latin word of 5+ letters
  with no term is replaced by terms one edit away (substitute/insert/delete/transpose; same first two letters, or those two swapped;
  best 8 by posting size). `search()` returns `approx: true` and `countText(n)`, which appends " - 相近结果 / Close matches".
  Snippets highlight the matched real word, never the typo.
- **Ranking**: story title exact 130 > prefix 90 > contains 50; chapter/specimen title exact +80, prefix +30 on top of the field score
  (name 10 > choice 3.2 > text 3 > effect 1.5, unchanged).
- All snippets are still built with esc() before `<mark>`; prefix needle = typed prefix, approximate needle = matched term.

## Required app.js patch (not applied; app.js is not ours)
In `renderFullSearch` replace the two count lines:
```js
$("#search-count").textContent = r.countText(r.total);
...
if (dropped > 0) $("#search-count").textContent = r.countText(r.total - dropped);
```
Without it everything works, but the "Close matches" note is not shown (verify-search then prints a hint).

## Measurements (desktop Chrome, bench.mjs search, headless)
| | before | after |
|---|---|---|
| index raw / gzip | 5329 KB / 3605 KB | 5543 KB / 3838 KB (+4% / +6%) |
| first query ("crisis"), shards fetched | 138 ms, 1 shard | 132 ms, 1 shard |
| typing result update p50 / p95 | 68.8 / 91.6 ms | 68.5 / 78.5 ms (debounce-dominated) |

Node-side lookups on the real index: "leviath" 23 docs 6.5 ms cold; "龙" 98 docs; "虫" 389 docs (capped to 400); "leviathn" -> Leviathan (approx), "beacn" -> Beacon.

Checks: tests/search.test.mjs 13 pass (new: partial parse, withinOne, shardOf, prefix, unigram, typo, 5-letter floor); verify-search 24 (16 old + 8 new); smoke 15/15; all 103 node tests pass.
Limits: typo in the first two letters (other than a swap) is not corrected; a prefix under 3 letters is exact; a 2nd-word typo is only corrected when the whole query is empty.
