# R2-D5 selected fixed-95 critical-value table adversarial review protocol

## Objective

Independently determine whether the exact reviewed 200-cell fixed-95 critical-value evidence may be materialized as the table content selected for non-authoritative candidate confidence-interval work.

Return exactly `GO` or `NO-GO`.

This review concerns candidate table-content selection only. It does not select a supported df maximum, complete confidence-interval endpoint truth, activate runtime support, freeze final reason codes, complete R2-D5, or publish Release 2.

## A. Exact identity and delta

Record the exact base, review-input head, tree, parent list, changed paths, and line delta.

The intended increment adds exactly four files:

1. `governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-selected-candidate.json`;
2. `tooling/src/spikes/paired-t-selected-fixed-95-table-candidate.ts`;
3. `tooling/tests/paired-t-selected-fixed-95-table-candidate.test.ts`; and
4. this protocol.

No existing evidence generator, certificate validator, numerical readiness record, runtime graph, authority surface, schema, registry, conformance fixture, Public Check, bundle, or Release 1 file should change.

## B. Required M3-A review maturity

Resolve and read:

- `governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-evidence-review-sync-candidate.json`;
- `review-inputs/r2-d5-fixed-95-evidence-review-sync/REVIEW-RESULT.md`; and
- `governance/drafts/release-2-candidate/reviews/d5-critical-value-table-evidence-adversarial-review-disposition.md`.

Require the evidence review chain to be independently reviewed with zero outstanding findings. Do not infer review completion solely from the new selected table.

## C. Source artifact identity

Independently fetch GitHub Actions run `33323884790` for reviewed implementation:

`19139d51aad108125ef9854c304c698ce9b15ade`.

Fetch artifact:

- id: `9735667748`;
- name: `release-2-paired-t-critical-value-table-19139d51aad108125ef9854c304c698ce9b15ade`;
- expected ZIP digest:
  `sha256:bebf3e84edcb5e9b5aa63882d80f105e823786aec1dd155334483ca71b1826bd`.

Require the extracted `fixed-95-critical-value-table.json` SHA-256 to be:

`sha256:666bf952e205a3a2fb54f2d197e3e9d613a3c9833b295ba6526cfc516b231bbb`.

If the artifact is unavailable or any identity differs, return `NO-GO`; do not reconstruct the selection from a different run.

## D. Exact cell materialization

From the source artifact:

1. extract all 200 ordered cells;
2. compare every `(df, critical_value_binary64_hex)` pair byte-for-value with the new selected table;
3. require df to be exactly the contiguous integer sequence `1..200`;
4. require every critical value to be positive finite binary64;
5. require the critical values to decrease strictly with df; and
6. independently recompute the ordered-cell byte format:

```text
nomue-paired-t-fixed-95-table-v1
two-sided-tail-target=1/20
df=1;binary64=...
...
df=200;binary64=...
```

The SHA-256 must equal:

`sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`.

Confirm at least the endpoint cells:

- df 1 -> `40296993aacc4d24`;
- df 200 -> `3fff8ce30df9d113`.

Any cell mismatch is a blocker.

## E. Selection meaning

The selected table may state that the exact reviewed content is selected for candidate confidence-interval work. It must not state or imply that:

- all df `1..200` are Protocol-supported;
- `200` is the supported df maximum;
- the table is an authoritative/final Protocol table;
- runtime support is enabled;
- confidence-interval endpoint truth is closed; or
- Release 2 authority is issued.

The reviewed evidence coverage and later support-domain selection remain separate ledgers.

## F. Numerical truth boundary

Confirm that selecting a correctly rounded binary64 critical-value cell does not erase mathematical quantization error.

For a selected cell `t_c` and mathematical critical value `t_*`, the later CI endpoint truth ledger must still account for:

`|t_c - t_*| <= 0.5 ULP(t_c)`

as an absolute error term, together with G4 mean/SE truth bounds and the binary64 multiply/add/subtract rounding of the endpoint trace.

This PR must not claim that exact table lookup means zero mathematical truth error.

## G. Fail-closed validator attacks

At minimum attack:

- one-cell value mutation;
- adjacent-cell mutation;
- cell reordering;
- duplicate/missing df;
- non-contiguous df;
- source artifact digest substitution;
- source table-file hash substitution;
- reviewed content-hash substitution;
- supported-df promotion;
- runtime-support promotion;
- Protocol-support coverage promotion;
- held-decision deletion;
- prohibited-claim deletion;
- hidden own properties;
- symbol keys;
- accessors;
- sparse/extended cell arrays;
- throwing proxies; and
- cycles.

Caller-provided getters must execute zero times. All hostile inputs must return a nonempty error list without an uncaught exception.

## H. Regression and RFC boundary

Run the focused tests and full `pnpm check`. Inspect exact-head hosted CI and paired-t evidence workflows.

Confirm RFC #25 remains open with earliest decision:

`2026-09-25T20:52:54Z`.

Confirm no Release 1 or authority surface changes.

## I. GO criteria

Return `GO` only if:

1. exact four-file add-only identity is correct;
2. M3-A review maturity is independently resolved;
3. source artifact identity and ZIP/file hashes match;
4. all 200 materialized cells exactly match the reviewed artifact;
5. the ordered-cell content hash independently reproduces;
6. no support/runtime/CI-truth/authority promotion occurs;
7. hostile mutations fail closed;
8. full checks and exact-head CI are green; and
9. no numerical claim expands beyond the already reviewed table evidence.

`GO` authorizes only merge consideration of this candidate table-content selection. Confidence-interval trace composition and endpoint truth remain separate subsequent increments.
