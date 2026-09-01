# R2-D5 fixed-95 critical-value evidence review-sync adversarial review protocol

## Objective

Independently determine whether this add-only increment correctly synchronizes the already completed fixed-95 critical-value table evidence review into one machine-readable checkpoint without selecting a final table, final content hash, supported df range, confidence-interval truth contract, platform, runtime, or Release 2 authority.

Return exactly `GO` or `NO-GO`.

## A. Exact identity

Record the exact base, review-input head, tree, parent list, changed paths, and line delta. The intended increment adds exactly:

1. `governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-evidence-review-sync-candidate.json`;
2. `tooling/src/spikes/paired-t-fixed-95-evidence-review-sync-candidate.ts`;
3. `tooling/tests/paired-t-fixed-95-evidence-review-sync-candidate.test.ts`; and
4. this protocol.

No pre-existing file should change. Any numerical implementation, evidence byte, authority surface, support field, or Release 1 change is a blocker.

## B. Reconstruct the prior review chain

Do not trust the new checkpoint by itself. Resolve the existing repository artifacts and confirm:

- review disposition: `governance/drafts/release-2-candidate/reviews/d5-critical-value-table-evidence-adversarial-review-disposition.md`;
- reviewed implementation: `19139d51aad108125ef9854c304c698ce9b15ade`;
- review-result commit: `24456c9d3d7faef56bbb731dac57045401780ea6`;
- accepted N1 repair: `0738558902dbcc851adbfd037a4f8f157370a46d`;
- close-review input: `943a36fc82cacf163a20d49d58aff6e2e9988a27`;
- close-review result: `ca68deadae3ccd6cc24f1bb49f4ac97ec5babd52`;
- original verdict: `GO`;
- close verdict: `CLOSED`; and
- no outstanding finding.

Confirm that the disposition independently records the ordered-cell content hash as:

`sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`.

The original review must support exact df `1..200` evidence coverage, 200 entries, correct binary64 rounding-cell certification, and the closed N1 monotonicity repair.

## C. Semantic boundary

Confirm the new checkpoint makes only an evidence-review statement. It may record that the 200-cell candidate evidence has completed independent review and that the review ledger is synchronized.

It must keep all of the following separate and open:

- final table selection;
- final table content hash;
- supported degrees-of-freedom maximum;
- confidence-interval trace composition;
- confidence-interval endpoint truth ledger;
- supported platform matrix;
- supported-execution predicate;
- supported domain;
- runtime support;
- final reason codes;
- Public Check/bundle;
- R2-D5; and
- Release 2.

Confirm the checkpoint states the numerical distinction correctly:

- exact lookup of later-selected exact table bytes can have zero reproduction error; but
- the correctly rounded critical value still differs from the mathematical critical value by an absolute bound of at most one-half ULP of that cell.

The second statement is input to the later CI endpoint truth ledger, not evidence that the endpoint ledger is already closed.

## D. Evidence-independence boundary

Confirm the prior review describes the two numerical routes as method-distinct but sharing Arb/FLINT ball arithmetic. The synchronization must not convert this into a cross-library independence claim.

## E. Fail-closed checkpoint attacks

Attack at least:

- review-result commit substitution;
- close-review commit substitution;
- reviewed ordered-cell hash substitution;
- false outstanding-finding count;
- final table selection/hash promotion;
- supported df promotion;
- CI endpoint-truth or trace-composition promotion;
- platform/execution/domain/runtime promotion;
- final reason-code freeze;
- M3 closure;
- removal of prohibited claims;
- hidden own properties;
- symbol keys;
- accessors;
- sparse/extended arrays;
- throwing proxies; and
- cycles.

Caller-provided getters must not execute. Every hostile checkpoint must return a deterministic nonempty validation error without an uncaught exception.

## F. Regression and authority

Run the focused test and full repository validation, including `pnpm check`. Confirm Release 1 historical checks and authority guards remain green. Inspect exact-head hosted CI.

Confirm RFC #25 remains open and its earliest decision remains `2026-09-25T20:52:54Z`.

## G. GO criteria

Return `GO` only if:

1. exact identity and four-file add-only scope match;
2. every pinned review identity is independently resolved;
3. the ordered-cell hash and df=1..200 evidence facts match the prior reviewed disposition;
4. final selection, CI truth, support, runtime, and authority remain open;
5. the fail-closed mutation battery passes;
6. repository checks and exact-head CI are green; and
7. no new numerical claim is introduced beyond the prior independent review.

`GO` authorizes only merge of this review-ledger synchronization candidate. It does not select the critical-value table or close M3.
