# Release 4 Programme Audit — Bounded Independent Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension                       | Result                                                                                                                                                                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input integrity                 | **`MATCH`**: head, parent, tree, the seven listed blobs, the nine-file PR 227 increment and the two-file wording-repair commit all match the handoff (Section 3)                                                                                                                                  |
| SF-R1 / SF-R2 closure           | **`CLOSED`** and **`CLOSED`** at `68a8726e…`, checked against the three graph implementations, `governance/ID-POLICY.md` and ADR-0032; PR 225's historical verdict at `ed7bfeb9…` is not rewritten (Section 5)                                                                                    |
| Audit and algebra accuracy      | **`GO`** (bounded): A1–A6 are accurate against the pinned research and preserved reviews; the scale fixture was reconstructed with reviewer-side exact arithmetic and the floating observations were reproduced bit-for-bit by a reviewer-written graph and by the submitted script (Section 6–7) |
| Corpus reproduction             | **`REPRODUCED`**: corpus digest `558b6e65…` and every non-environment field of the pinned result are identical on CPython 3.12.3 / NumPy 2.3.5 / OpenBLAS 0.3.30; the 19845 versus 8505 counting qualification is arithmetically correct (Section 7)                                              |
| Preservation                    | **`INTACT`**: original probe/result, QR supplement and intake, three review records and the NIST/LAPACK provided-copy records are byte-identical to their sources (Section 4)                                                                                                                     |
| Source state by claim           | **`INPUT_INCOMPLETE`** unchanged for S1–S6 and P1; no hold closed by this review; no acquisition attempted (Section 8)                                                                                                                                                                            |
| Workplan / handoff comments     | 0 `BLOCKER`, 2 `SHOULD-FIX`, 5 `NICE-TO-HAVE`, reported separately from the audit verdict (Section 9)                                                                                                                                                                                             |
| Findings on the audit increment | 0 `BLOCKER`, 0 `SHOULD-FIX`, 5 `NICE-TO-HAVE` (Section 10)                                                                                                                                                                                                                                        |
| Public-opening readiness        | **`NOT_READY`**; unchanged, and not claimed otherwise by the audit (Section 11)                                                                                                                                                                                                                   |
| Independence                    | model, provider and work-context independence from the OpenAI-assisted author; same provider and model identifier as the three preserved reviews; this session previously reviewed the handoff itself (Section 2)                                                                                 |

`GO` here means only that the programme self-audit at the exact head `f01b870b…` states its
findings, evidence, limits and remaining work accurately, that its scale witnesses and corpus
reproduction are independently confirmed, that the two wording repairs it carries satisfy SF-R1
and SF-R2, and that every historical artifact it claims to preserve is preserved. It does not
close R4-P1 through R4-P6, adopt a numerical method, allocate identifiers or namespace tokens,
approve execution support, open an RFC window, authorize public discussion, change Release 3,
or convert any earlier steward approval into approval of this increment.

## 2. Independence, roles and boundary

- **Commission.** `governance/drafts/release-4-preparation/programme-review-handoff.md` at PR 229
  head `176d92551185245916b5c83cbb279b2783ccc998` (blob
  `63a4bc1a985b022fe6b6895695f2ac119d0d9ea9`), with the companion
  `numerical-feasibility-workplan.md` (blob `69eeb4b7d47a5c611490a560a6374c7134c20df1`). Both
  are later author-side instructions and are not part of the reviewed PR 227 input. The user
  described the handoff as a revised version; the branch still carries the original wording
  above, and the review scope item 2 was applied as corrected in Section 9 (three graph
  implementations, three builtin-sum sites).
- **Reviewer.** An Anthropic model, `claude-fable-5-1`, in Claude Code remote session
  `session_0161XbYyVUYMC9stxNhpwdUU`. The session service reported `session_context.model` and
  `last_served_model` as `claude-fable-5-1` for this session. Exact model-build identity beyond
  that identifier is not available as authenticated runtime metadata.
- **Author.** The reviewed increment records OpenAI Codex assistance in the existing maintainer
  context. The reviewer shares no context with that authoring session.
- **Prior context reuse.** Before this review, the same session read PR 229 and produced a
  review of the handoff and workplan documents. The findings in Section 9 restate that work.
  No other prior review context was reused; the three preserved reviews were read as inputs.
- **Provider overlap.** The three preserved reviews (`r4-public-discussion-preparation`,
  `r4-rfc-preparation`, `r4-preparation-repair`) record the same model identifier in different
  sessions. Independence is at the model, provider and work-context level relative to the author.
  It is not human-investigator independence and is not claimed as such.
- **Assistance.** No other model, service or person contributed. External code executed: the
  submitted probes `ss-f-propagation.py` and `scale-boundary-audit.py` at the reviewed head, and
  a reviewer-written exact-arithmetic script described in Section 6.
- **Not performed.** No source acquisition, purchase, message, merge, RFC action, identifier
  allocation, Release 3 change or steward decision.

## 3. Exact identity

All objects were fetched by exact commit; branches were used only as locators.

| Input                                    | Expected (handoff)                                      | Observed                                                                                             | Result |
| ---------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------ |
| PR 227 head                              | `f01b870bdce4e051476e4b74d56b4deb4217307e`              | same; sole parent `68a8726e…`                                                                        | match  |
| Parent (two-site wording repair)         | `68a8726ea564a88fe3663dfd84bfde8c4550d6e6`              | same; sole parent `ed7bfeb9…`                                                                        | match  |
| PR 227 tree                              | `af6606a1f85af83c36714a4c64708688a9308068`              | same                                                                                                 | match  |
| Pre-repair input reviewed in PR 225      | `ed7bfeb9f9ca2cee6e8766e90d9ee6a5091cb68b`              | same; parent `bf400469…`                                                                             | match  |
| Preserved PR 225 review blob             | `28aa4f8dcefe5bc0285c65c6374a5ae5040b2bbe`              | `review-inputs/r4-preparation-repair/REVIEW-RESULT.md` at head; identical to PR 225 head `f505a1f0…` | match  |
| Original SS/F probe blob                 | `a3f9a9a4ad3e031ae0e63857400359c0c08f2fba`              | `probes/ss-f-propagation.py` at head; identical to PR 218 input `4cf3e12a…`                          | match  |
| Original SS/F result blob                | `38bd5d8eadcbcc91dc1ae8630eb05ba4be4daa53`              | `probes/ss-f-propagation-result.json` at head; identical to `4cf3e12a…`                              | match  |
| PR 227 increment versus parent           | nine files                                              | nine files, 812 insertions, 20 deletions                                                             | match  |
| Wording repair `ed7bfeb9…` → `68a8726e…` | two files                                               | one commit, two files (`rfc-impact-inventory.md`, `ss-f-propagation-supplement.md`)                  | match  |
| Repository main                          | `cd217f88238a2ecc57b72f5835a813d92270f5ad` (self-audit) | `origin/main` resolved to the same commit                                                            | match  |

Blobs of the nine changed files at the head: `README.md` `8c7ef90d…`,
`numerical-research-commission.md` `08bf59be…`, `probes/scale-boundary-audit-result.json`
`64b1ca32…`, `probes/scale-boundary-audit.py` `ef0f26e3…`,
`programme-self-audit-2026-09-09.md` `74dfc0d2…`, `public-discussion-readiness.md`
`c37733a8…`, `rfc-impact-inventory.md` `0c96df67…`, `rfc-preparation-draft.md` `12ddab1a…`,
`review-inputs/r4-preparation-repair/REVIEW-RESULT.md` `28aa4f8d…`.

The file SHA-256 values recorded inside `scale-boundary-audit-result.json` match the bytes at the
head: `source_sha256` `8c68703f…` is `ss-f-propagation.py`, `script_sha256` `68c22f57…` is
`scale-boundary-audit.py`. These are file hashes; the corpus digest in Section 7 is a hash of the
serialized result rows and is a different object.

Other pinned inputs cited by the self-audit and resolved here: PR 181 head `a2687f10…` with
result blob `f70e89e9…` (`semantic-research-result.md`); PR 190 head `5962cc2d…` with result blob
`200296de…` (`numerical-research-result.md`, on a branch not reachable from the PR 227 head);
PR 191 head `2e3698ba…` (live metadata, unchanged); PR 225 head `f505a1f0…`; QR acceptance input
`0be8bb15…`; preserved-review source `c8ce35c5…`.

## 4. Governance inputs read and preservation checks

Read at the start: `AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, `authority/authority-manifest.yaml`,
`registries/requirements.yaml`, `governance/ID-POLICY.md`, `governance/RFC.md`, ADR-0032; then the
full Release 4 preparation directory at the head, the three preserved review records, the
semantic and numerical research results at their pinned blobs, and the QR source-access records.

| Artifact                                                                                                      | Compared against                | Result    |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------- | --------- |
| `probes/ss-f-propagation.py`, `probes/ss-f-propagation-result.json`                                           | PR 218 input `4cf3e12a…`        | identical |
| `qr-cancellation-supplement.md`, `qr-cancellation-review-prompt.md`                                           | QR acceptance input `0be8bb15…` | identical |
| `qr-cancellation-review-intake.md`, `qr-cancellation-close-review-prompt.md`, `qr-cancellation-supplement.md` | `main` `cd217f88…`              | identical |
| `review-inputs/r4-public-discussion-preparation/REVIEW-RESULT.md`                                             | `c8ce35c5…` (blob `4ee8f5fc…`)  | identical |
| `review-inputs/r4-rfc-preparation/REVIEW-RESULT.md`                                                           | `c8ce35c5…` (blob `ffd948d7…`)  | identical |
| `review-inputs/r4-preparation-repair/REVIEW-RESULT.md`                                                        | PR 225 head `f505a1f0…`         | identical |
| `review-inputs/r4-qr-cancellation-source-access/` (three files)                                               | `main` (tree `8936f044…`)       | identical |
| `review-inputs/r4-qr-cancellation-supplement/`, `…-supplement-close/`                                         | `main`                          | identical |

No file outside `governance/drafts/release-4-preparation/` and `review-inputs/r4-*` differs
between `main` and the head. No authoritative, registry, schema, conformance, reference, generated
or evidence artifact changed.

**NIST/LAPACK provided-copy scope.** The addendum in `r4-qr-cancellation-source-access` records
`COMPLETE_ON_PROVIDED_COPIES` for the two supporting-documentation pages only, with the retrieval
denials preserved verbatim. The readiness document's review-state row repeats exactly that
scope, and the self-audit keeps S1/S5 (original factorial methodology) as separate open holds.
The two are not confused anywhere in the increment.

## 5. SF-R1 / SF-R2 close check

PR 225 requested both repairs at `ed7bfeb9…`; the parent commit `68a8726e…` is the only change
between that input and the audit. The check below is on the parent's content; PR 225's verdict
stands as recorded.

**SF-R1 — `CLOSED`.** The supplement now reads: "The builtin sum is used at three sites:
`builtin_cell` cell means, `builtin_cell` contrast coefficients, and the squared-residual
aggregation of all three routes." Checked against `graphs()` in `ss-f-propagation.py`:

| Graph          | Coefficients                                                        | Residual aggregation                     |
| -------------- | ------------------------------------------------------------------- | ---------------------------------------- |
| `builtin_cell` | cell means by builtin `sum` over floats; contrasts by builtin `sum` | builtin `sum` of `float64(v)*float64(v)` |
| `qr`           | `np.linalg.qr(X, mode='reduced')` then `np.linalg.solve`            | same builtin `sum` site                  |
| `centered_qr`  | same QR/solve on `y - y[0]`                                         | same builtin `sum` site                  |

The wording is now the one PR 225 proposed, attributes coefficient summation to `builtin_cell`
only, and is consistent with the graph description earlier in the same document and with the
numerical review's Section 5.3. No number changed.

**SF-R2 — `CLOSED`.** The inventory now states that new Contract, Profile, schema, Public Check
and bundle identifiers use the `https://nomue.ai/id/<family>/<name>/<revision>` minting grammar
of ID-POLICY and ADR-0032, that existing `urn:nomue:*` identifiers remain immutable and are not
aliases, that the discipline reused is exact-version binding rather than legacy spelling, and
that no identifier is issued. Each statement matches ID-POLICY ("Protocol-issued identifiers
minted from now on use …", "Existing `urn:nomue:*` identifiers are immutable legacy identifiers
… never aliases") and ADR-0032 Decision 1–2. No identifier or token is allocated.

## 6. Scale fixture — independent reconstruction

The fixture was reconstructed from the prose statement only (four cells `[-0.5,0.5]`,
`[1.5,2.5]`, `[3.5,4.5]`, `[7.5,8.5]`, two observations per cell), using `fractions.Fraction`
in a reviewer-written script that neither imports nor calls the submitted `exact()`. Two
independent exact routes were used and asserted equal: a level-mean decomposition
(SS_A = 2n·Σ(mean_A − grand)², SS_B likewise, SS_AB = SS_cells − SS_A − SS_B) and the coded
contrast route (β = Σ s_c m_c / 4, SS = 4n·β²), with the total partition SST = SS_A + SS_B +
SS_AB + SSE asserted.

| Scale  | Inputs representable | Exact SS                          | Exact SSE | df  | Exact F    | SS/SSE representable in binary64                | F representable |
| ------ | -------------------- | --------------------------------- | --------- | --- | ---------- | ----------------------------------------------- | --------------- |
| 2^0    | yes                  | 50, 18, 2                         | 2         | 4   | 100, 36, 4 | yes                                             | yes             |
| 2^−600 | yes                  | 50·2^−1200, 18·2^−1200, 2·2^−1200 | 2^−1199   | 4   | 100, 36, 4 | no — below the smallest subnormal; project to 0 | yes             |
| 2^600  | yes                  | 50·2^1200, 18·2^1200, 2·2^1200    | 2^1201    | 4   | 100, 36, 4 | no — above the largest finite; overflow         | yes             |

All inputs at all three scales are exactly representable (dyadic rationals within the normal
range), which confirms the self-audit's conversion claim. Exact SSE is positive in every case,
so none of the three cases is a mathematically zero-residual case. The self-audit's statement
that "This is not the same case as mathematically zero residual variance" is correct.

**Floating observations, reproduced separately.** A reviewer-written implementation of the three
graphs (pure-Python floats for `builtin_cell`; NumPy 2.3.5 reduced QR and solve for the two QR
routes, squared in the stated `float64` order) produced hex outputs bit-identical to the pinned
`scale-boundary-audit-result.json` for all three graphs at all three scales: finite at 2^0 with
the recorded few-ulp QR differences, SS and SSE `0x0.0p+0` with F `nan` at 2^−600, SS and SSE
`inf` with F `nan` at 2^600. Running the submitted `scale-boundary-audit.py` here also
reproduced every case row identically (Section 12).

**Interpretation check.** The text distinguishes exact zero residual from numerical underflow,
records the NaN as a limitation of disposable graphs outside their corpus, and selects no
scaling, threshold, refusal code or supported magnitude. Two refinements are recorded as
NICE-TO-HAVE in Section 10: at the two extreme scales the exact SS and SSE targets are
themselves outside the binary64 range, so 0 and `inf` are the correctly rounded projections of
those targets and the failure is specifically at the F node (`0/0`, `inf/inf`) while the exact F
remains representable; and pure-Python float division raises `ZeroDivisionError` where the
submitted graph's `np.float64` division yields `nan`, so the observed NaN depends on the scalar
type used at the division node.

## 7. Corpus reproduction and counting qualification

Executed from a copy of the head's `probes/` directory:

| Item                                                                                                                      | Pinned result (PR 218)                                             | This review                                                         |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Interpreter                                                                                                               | CPython 3.12.13                                                    | CPython 3.12.3 (`uv` managed)                                       |
| NumPy                                                                                                                     | 2.3.5                                                              | 2.3.5 (wheel)                                                       |
| BLAS/LAPACK                                                                                                               | scipy-openblas, OpenBLAS 0.3.30                                    | scipy-openblas, OpenBLAS 0.3.30                                     |
| Threads                                                                                                                   | not pinned                                                         | not pinned; no `OMP_NUM_THREADS`/`OPENBLAS_NUM_THREADS` set; 4 CPUs |
| `corpus_sha256`                                                                                                           | `558b6e65da273bf836204f7d0f5b4bae08cfd85918a23374a475197c2e851ca3` | identical                                                           |
| `cases`, `summary`, `witnesses`, `zero_residual_diagnostics`, `comparison_values_per_quantity`, `status`, `script_sha256` | —                                                                  | all identical to the pinned JSON                                    |
| `environment.numpy_configuration`                                                                                         | build metadata                                                     | differs only in build-path/version strings; not a result field      |

The self-audit's own execution (CPython 3.12.14, same NumPy) also reproduced the digest, so the
digest is now reproduced on three CPython 3.12 patch levels. The known CPython 3.11 divergence
recorded by the numerical review was not re-tested here; it is not needed for this verdict.

**Counting qualification.** The pinned summary has `values` = 2835 for `ss`, 945 for `sse` and
2835 for `f` on each of three routes: 3 × (2835 + 945 + 2835) = 19845 quantity values, of which
3 × 2835 = 8505 are F values. The numerical review's Section 5.3 sentence "All 8505 evaluated
values were finite" therefore names the F count only. The `nonfinite` metric in the script is
incremented for every quantity, and it is zero for all nine route/quantity cells, so the
finiteness statement holds for all 19845 values as well. The self-audit's qualification is
correct and leaves the preserved review's text, its 54 metric values and its verdict untouched.

## 8. Audit accuracy (A1–A6) and source state by claim

| Finding | Check performed                                                                                                                                                                                                                                                                                    | Result                         |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| A1      | Parent readiness said "independent review pending", "No independent review of this increment yet" and carried the 50% sentence; README listed the start sequence as "Immediate sequence"                                                                                                           | accurate; all repaired at head |
| A2      | Parent readiness named S1/S5/S6 and the Williams role but no S2 or P1 entry; the head's hold map matches the semantic result's S1–S6 ledger and its P1 version/formula note (arXiv v2 record versus printed 2018-08-30 cover; p. 7 example vector inconsistent with its definition)                | accurate                       |
| A3      | PR 190 result: every effect SS has one numerator df; `require_even_nu` guards both tail routes; "does not provide a general Candidate B" oracle; six manifest tampering controls are "strict dictionary inequality only"                                                                           | accurate                       |
| A4      | Inventory now leaves the Contract/Profile split open under ADR-0032; the seven added clauses exist in `registries/requirements.yaml` with the stated tiers (NRS-VERSION-0002 CORE; NRS-VERIFY-0006/0007/0009 EXPERIMENTAL; NRS-SEC-0002 CORE; NRS-SEC-0003/0006 EXPERIMENTAL) and owning documents | accurate                       |
| A5      | README row now reads E. J. Williams, matching the publisher record in the semantic result; commission item 11 now distinguishes balanced B from unbalanced C, matching PR 190's Candidate B erratum; pinned commission/result inputs unchanged                                                     | accurate                       |
| A6      | Sections 6–7 above                                                                                                                                                                                                                                                                                 | confirmed                      |

**Source state by claim** (restating the pinned semantic result; nothing closed here):

| Hold | Claim                                              | State after this review                                                                                          |
| ---- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| S1   | Yates 1937 factorial basis; general balanced tests | `INPUT_INCOMPLETE`; no inspected original full text                                                              |
| S2   | Williams 1952 interaction interpretation           | publisher record only; full text uninspected                                                                     |
| S3   | Type I–IV mapping for Candidate C                  | incomplete; no portable default                                                                                  |
| S4   | Robust / permutation variants                      | incomplete; exclusion from A is not invalidity                                                                   |
| S5   | Normal-theory F calibration and intervals          | `INPUT_INCOMPLETE`; Cochran 1934 remains a candidate; the user's acquisition report remains attributed testimony |
| S6   | Two-system unbalanced comparison                   | not executed                                                                                                     |
| P1   | Dasgupta–Pillai–Rubin normalization                | version/date and p. 7 example ambiguity open; transcription not an oracle                                        |

The algebraic scale probe closes none of these; the audit says so and the readiness document
says so. Source acquisition was optional for this review and was not attempted; no host was
contacted. This verdict does not depend on the contents of any unacquired source, so the
access limitation has no claim-specific impact beyond the holds already recorded.

**Other item-6 checks.** PR 190's oracle limits are carried accurately into the readiness
numerical table. The Contract/Profile allocation, namespace-token registration, versioned schema
path and `applies_to_bundle_ids` work are listed as open, consistent with PR 225's N-R3. Release
3 reuse is stated as conditional by exact scope in the README, readiness and self-audit; no
Release 3 artifact changed.

## 9. Handoff and workplan comments (separate from the audit verdict)

Consumed at PR 229 head `176d9255…`. These documents supply no evidence and are not part of the
reviewed input.

- **H-SF-1 (`SHOULD-FIX`, handoff).** Review scope item 2 lists "three graph implementations:
  builtin-cell means, builtin-cell contrast coefficients, and all-three-route residual sums".
  Those are the three builtin-sum sites; the three graphs are `builtin_cell`, `qr` and
  `centered_qr`. The sentence reproduces the ambiguity SF-R1 corrected. This review applied the
  corrected reading (Section 5).
- **H-SF-2 (`SHOULD-FIX`, navigation).** Neither document is linked from the README's "Current
  navigation" or the readiness document, and the handoff refers to "the companion workplan"
  without a filename. Add links labelled as post-audit author-side instructions outside the
  pinned input.
- **H-N-1 (`NICE-TO-HAVE`).** Add to the fixed-input table the PR 190 input `5962cc2d…` and
  result blob `200296de…` (on a branch not reachable from the PR 227 head), the PR 225 head
  `f505a1f0…`, the locator branch, and the paths of the three listed blobs.
- **H-N-2 (`NICE-TO-HAVE`).** "Two wording repairs" / "two-file wording repair" is one commit
  touching two sites; say so.
- **H-N-3 (`NICE-TO-HAVE`).** "Three scale fixtures" is one fixture at three scales.
- **H-N-4 (`NICE-TO-HAVE`).** "A bounded GO does not close R4-P1/P3/P5/P6" omits R4-P2 and
  R4-P4, which the readiness table also lists as open; say "any of R4-P1 to R4-P6".
- **H-N-5 (`NICE-TO-HAVE`).** Item 4 could cite the recorded CPython patch levels (3.12.13,
  3.12.14, now 3.12.3) and the known 3.11 divergence so a reviewer recognizes an expected
  mismatch.

## 10. Findings on the audit increment

### BLOCKER

None.

### SHOULD-FIX

None.

### N-A1 (`NICE-TO-HAVE`) — state that exact SS/SSE leave the binary64 range at the extreme scales

In the self-audit's scale table, add that at 2^−600 and 2^600 the exact SS and SSE targets are
below the smallest subnormal and above the largest finite binary64 value respectively, so 0 and
`inf` are the correctly rounded projections of those targets; the failure is at the F node
(`0/0`, `inf/inf`) while the exact F is representable. This sharpens the workplan's
target/graph/projection distinction and shows why an output representation for SS/SSE, not
only the graph, is part of the computability decision.

### N-A2 (`NICE-TO-HAVE`) — record that the NaN depends on the scalar division type

`graphs()` divides `np.float64` scalars, which yields `nan`; pure-Python float division raises
`ZeroDivisionError` at the same node. The supplement's "Builtin cell arithmetic produces NaN or
infinity" is true for the graph as coded. A future refusal-policy investigation should name the
division semantics it assumes.

### N-A3 (`NICE-TO-HAVE`) — status lines that this review supersedes

The supplement's status line ("subsequent prose repairs await close review") and the readiness
row for PR 225 ("not yet independently closed") were accurate at the head. Once this record is
accepted, an author-side successor should cite this review's commit for the SF-R1/SF-R2
closure instead of editing the pinned head.

### N-A4 (`NICE-TO-HAVE`) — finiteness holds for all 19845 values

The counting qualification could add that the `nonfinite` metric is zero for all nine
route/quantity cells, so "all finite" holds for the full 19845-value set, not only for the 8505
F values.

### N-A5 (`NICE-TO-HAVE`) — pin the PR 190 locator in the readiness numerical table

The readiness table cites "PR 190's exact-rational and Decimal exploratory routes" without the
commit; the self-audit's input table carries it. Repeat `5962cc2d…` in the readiness row so the
table is self-contained.

## 11. Bounded verdict

| Determination                        | Verdict                                                                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Input integrity                      | **`MATCH`** for every listed identity                                                                                          |
| SF-R1 / SF-R2                        | **`CLOSED`** / **`CLOSED`** at `68a8726e…`; PR 225's verdict at `ed7bfeb9…` unchanged                                          |
| Programme self-audit at `f01b870b…`  | **`GO`** as an accurate bounded author-side audit; A1–A6 confirmed; scale witnesses and corpus digest independently reproduced |
| Source state                         | **`INPUT_INCOMPLETE`** for S1–S6 and P1; nothing closed                                                                        |
| R4-P1 to R4-P6                       | none closed                                                                                                                    |
| Public-opening readiness             | **`NOT_READY`**                                                                                                                |
| Adoption, allocation, opening, merge | none requested; none granted; no identifier or token allocated; Release 3 untouched                                            |

## 12. Validation record

Executed in the session clone (Node v22.22.2, pnpm 11.7.0, `pnpm install --frozen-lockfile`).

Numerical reproduction, from a copy of the head's `probes/` directory in a `uv` virtual
environment (CPython 3.12.3, NumPy 2.3.5 wheel with bundled scipy-openblas / OpenBLAS 0.3.30):

- `python ss-f-propagation.py`: exit 0; `corpus_sha256`, `script_sha256`, `cases`, `summary`,
  `witnesses`, `zero_residual_diagnostics`, `comparison_values_per_quantity` and `status`
  identical to the pinned result; only `environment.python` and NumPy build strings differ.
- `python scale-boundary-audit.py`: exit 0; `cases`, `status`, `numpy`, `original_corpus_sha256`,
  `script_sha256`, `source_sha256` and `threading` identical to the pinned JSON; `python`
  reports 3.12.3 instead of 3.12.14.
- Reviewer-written exact reconstruction (SHA-256 `1c42ce1bab661e29e689fc4b9004e380756298e23951b99c574e9353cf6dcbc2`,
  not committed): exact values and floating observations as reported in Section 6.

Repository checks on this branch (head plus this file), all exit 0: `pnpm exec prettier --check`
on this file (pass); `pnpm lint:markdown` (377 files, 0 issues); `pnpm typecheck` (pass);
`pnpm validate` ("registries, traceability, normative lint, authority, gates, conformance
manifest, links, private-dependency and language audits, phase-1 schemas, cross-checks,
code-path audits, and the snapshot manifest mechanism are clean"); `git diff --cached --check`
(pass). No aggregate `pnpm check` was run because no authoritative, generated or evidence
artifact changed. Repository hygiene is not evidence of numerical correctness.

RELEASE 4 PROGRAMME AUDIT REVIEW COMPLETE - BOUNDED GO AT f01b870b - SF-R1/SF-R2 CLOSED - CORPUS DIGEST REPRODUCED - SOURCE INPUT_INCOMPLETE - NOT READY TO OPEN - MODEL-LEVEL INDEPENDENCE ONLY - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
