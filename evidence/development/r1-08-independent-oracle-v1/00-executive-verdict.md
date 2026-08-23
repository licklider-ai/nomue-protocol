# Executive verdict

## R1-08 acceptance coverage

1. **Independent oracle:** python-flint acb incomplete-beta enclosure (FLINT/Arb lineage) is algorithmically disjoint from @stdlib Boost-port betainc used by the SUT. Exact rational oracle covers Welch summary algebra from binary64 bit patterns.
2. **Cross-check log:** `09-sut-replay-matrix.yaml` — summary stats vs exact rational; Welch outputs vs acb enclosure; degenerate cases fail-closed.
3. **Common-cause analysis:** `10-common-cause-analysis.md` + `02-sut-component-lineage.yaml`.

## Status

- Corpus: r1-08-canonical-oracle-corpus-v1 (15 cases)
- SUT replay failures: 0
- Metamorphic relations: PASS
- Third-oracle hold: R1-08_third_oracle_lineage satisfied_by_acb_independent_lineage
- Ready for close attempt: YES
- R1-08: **CLOSED** (decision: pass)
- Evidence commit: `6c4de5c1ac693f300efa424d56d3fb89e344558d`
