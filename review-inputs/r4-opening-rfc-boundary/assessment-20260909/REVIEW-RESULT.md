# Release 4 conformance boundary confirmation

Status: informative bounded review; not a steward decision or an opening action.
Date: 2026-09-09 (UTC).

## 1. Verdict

**GO for the bounded opening proposal. C-S1: CONFIRMED. C-N1: CONFIRMED.**

New findings: **0 BLOCKER, 0 SHOULD-FIX, 0 NICE-TO-HAVE**.
R4-P5 and R4-P6 receive an opening-review GO for this fixed proposal, using the
preserved prior reviews only within their recorded scopes and independence
limits. The remaining C-S1 opening impediment identified by PR 257 is resolved.
C-N1's newly chosen carrier-domain restriction is assessed here, rather than
being attributed to PR 257 as an already confirmed choice.

Public-opening disposition: **READY FOR A SEPARATE OPENING ACTION** on this
reviewed text. Discussion has not been opened. That action still records its
exact input, discussion URL, timestamp, highest tier and earliest decision date,
and rechecks intervening main changes. This record neither performs that action
nor changes the historical NOT_READY verdicts at their original inputs.

Highest affected tier: **STABLE-INTENT; at least 30 calendar days**. The repaired
proposal preserves the actual CORE conformance, execution/outcome, propagation
and lifecycle meanings. An actual CORE change in a later proposal requires a
new assessment and the CORE process, including its 60-day minimum.

Numerical support remains **NOT_ESTABLISHED / ISSUANCE HELD**. The proposed
mathematical scope and explicit numerical holds are suitable for discussion;
this is not certification of a BTF implementation, supported domain or check.

## 2. Fixed input and delivery

Commission: [opening-rfc-boundary-confirmation.md](../../../governance/drafts/release-4-preparation/opening-rfc-boundary-confirmation.md)
at the pinned delivery below. The four-path substantive input is reviewed
separately from its later handoff. Branch and PR names are locators only.

| Object                                          | Verified identity                                     |
| ----------------------------------------------- | ----------------------------------------------------- |
| Repository                                      | licklider-ai/nomue-protocol                           |
| Locator                                         | research/r4-opening-rfc-candidate, PR 249             |
| Substantive input                               | `21453d82109106e9e811571383228dcef8f60fac`            |
| Input sole parent                               | `40e723d30c1e235591b0795d8c4535639ff4fc32`            |
| Input tree                                      | `0194cdc31aa4e8463776cdb6d86863586d4981a3`            |
| Authority baseline                              | `0abdca8f822d0de3faf35f218f762a951fd75e9e`            |
| Handoff delivery / sole review parent           | `5b2adfb0e350a191a3c8b0d118db67242605ff0b`            |
| Delivery sole parent                            | The substantive input above                           |
| Delivery tree                                   | `f0a6974801f16901c461d08f7d8f29f054905cd3`            |
| Commission blob                                 | `40c56abbf3c63f754ad7837c9cf49308e3d11ba3`            |
| Delivery README blob                            | `8e89bd10c0c16b4451be13969c503c0d53ee705e`            |
| Live main, separately checked on 2026-09-09 UTC | Same as the authority baseline; no intervening change |
| Live candidate branch at that check             | Same as the handoff delivery                          |

All four input path/blob pins match:

| Path                                                                     | Blob                                       |
| ------------------------------------------------------------------------ | ------------------------------------------ |
| governance/drafts/release-4-preparation/opening-rfc-candidate.md         | `807e4bf0c22e5270b8fc15824329d04b5c37b146` |
| governance/drafts/release-4-preparation/opening-rfc-boundary-response.md | `61625085e3df0d5f283b9db51d8f3bbc35d15a40` |
| governance/drafts/release-4-preparation/README.md                        | `953a88da7749dfdb9d9831e4ecb194dc5da4d252` |
| review-inputs/r4-opening-rfc-repair/assessment-20260909/REVIEW-RESULT.md | `d114c65903c97570dc157a5fc1a80314301134c5` |

The input changes exactly these four paths: candidate/README modifications,
response addition and exact PR 257 intake. Delivery adds only the commission
and its README link. The substantive input has no dependency on that later
commission and passes validation independently. INPUT_INCOMPLETE does not apply.

PR 257's original commit is `901733a551b560aef544191d937b517f2f87c896`,
with sole parent `40e723d30c1e235591b0795d8c4535639ff4fc32`, tree
`e9a821ab32f79d9492a8325db6f141b5c2632ad9` and review blob
`d114c65903c97570dc157a5fc1a80314301134c5`. Its intake keeps its original
path and exact bytes. The complete report was read, including all nineteen
original-label dispositions, C-S1/C-N1, evidence limits and verification record.

## 3. Reviewer, prior involvement and evidence limits

Reviewer/provider: OpenAI Codex, a GPT-based assistant in ChatGPT Work Mode.
The precise served model identifier, model build and provider session ID are
not exposed as authenticated runtime metadata; none is guessed here.

This task conversation did not author the candidate, its response, PR 251 or
PR 257. Supplied continuity summaries nevertheless describe earlier OpenAI
review involvement, and those summaries and the preserved reports were
available. This is an informed follow-up assessment, not a blind investigation
or a claim of another independent investigator. The author documents disclose
OpenAI Codex assistance in an existing authoring context. Different-model or
different-provider independence from that author is not established here.
No sub-agent, second model or human investigator performed this confirmation.

PR 257 explicitly limits itself to same-conversation confirmation following
PR 251. That limit remains. PR 252 separately discloses an Anthropic
`claude-fable-5-1` reviewer in a different context, without prior involvement
and with model/provider/context independence from the OpenAI-assisted author.
This preserves its disclosure, not an audit of its runtime or a claim of human
investigator independence. Neither its old repair findings nor PR 257's old
NOT_READY verdict is rewritten by this successor assessment.

Read AGENTS.md and its ordered governance prerequisites, the tier registry,
the full candidate and boundary response, and the full preserved PR 257 report.
The manifest and requirement registry were also parsed for exhaustive object
preservation and ownership checks. Direct semantic inspection covered the
owning VERIFY-0005/0010/0013/0017 clauses, verification-report definitions,
CORE-0013 through 0019 lifecycle authority, relevant public-check/reason/state
invariant entries, vocabulary, common execution/outcome definitions, current
Record/report structures, state-view schema and CANON-0023 refusal priority.
The PR 252 disclosure, normal-model steward acceptance and earlier source
repair's scope/limits were inspected for bounded reuse.

No reference implementation was used to fill a semantic or projection gap.
No PDF was received or inspected; no new source-copy certification, probability
derivation or numerical-algorithm investigation is claimed. The accepted source
paper/independent derivation split remains the evidence basis, not model memory.

## 4. C-S1: conformance versus admissibility

**CONFIRMED.** Candidate lines 204-209 and 288-340 explicitly bind the new
representation chain to PROFILE-BTF-0004 and its gating to VERIFY-0032.
Structural success is followed by semantic conformance of local references,
identity and factor/cell associations. Both are necessary for conformance pass.
The versioned conformance judgment is placed only in `conformance`, never
`verification_results`, consistently with the actual NRS-VERIFY-0005 clause.

A failure has `completed/fail`, `reason_codes` and `violations` carrying stage,
reason and a Record JSON Pointer. A structural failure skips semantic evaluation.
Every verification check, including integrity and admissibility, is `not_run`
until conformance completes with pass. Blocked checks omit outcome and propagate
the blocker. Errored or unavailable conformance cannot permit execution either.
These rules preserve VERIFY-0010; they do not create an aggregate verified status.

The following are logical witnesses read against the proposal, not executed
tests of a working BTF implementation. They assume a future registered exact
BTF bundle and satisfaction of earlier raw-input/resource/routing gates unless
the row says otherwise. The current repository registers no such bundle.
Unmentioned fields and declarations are otherwise valid. `Runs` means execution
is permitted/required by this boundary, not that a digest or number passes.

| Witness                                                                                             | Conformance judgment / applicable reason                      | Integrity | Admissibility and dependent numerical checks                                                         | profile_eligibility               |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------- | --------------------------------- |
| D1 exists; analysis references absent D2                                                            | Semantic fail; NRS-BTF-LOCAL-REFERENCE-INVALID                | not_run   | All not_run with conformance blocker                                                                 | not_evaluated                     |
| Duplicate observation_id, even with distinct unit IDs                                               | Semantic fail; NRS-BTF-IDENTITY-AMBIGUOUS                     | not_run   | All not_run with conformance blocker                                                                 | not_evaluated                     |
| Distinct observation IDs share a unit ID                                                            | Pass                                                          | Runs      | Admissibility completed/fail, NRS-BTF-UNIT-NOT-UNIQUE; dependent numerical checks not_run            | ineligible                        |
| Observation references an unknown cell                                                              | Semantic fail; NRS-BTF-LOCAL-REFERENCE-INVALID                | not_run   | All not_run with conformance blocker                                                                 | not_evaluated                     |
| Duplicate factor/cell identity or invalid factor_order association                                  | Semantic fail; NRS-BTF-IDENTITY-AMBIGUOUS                     | not_run   | All not_run with conformance blocker                                                                 | not_evaluated                     |
| Declared level tuples duplicate or omit a Cartesian-product association                             | Semantic fail; NRS-BTF-CELL-COVERAGE-INVALID                  | not_run   | All not_run with conformance blocker                                                                 | not_evaluated                     |
| Four uniquely declared cells, but one has no observations, fewer than two, or unequal actual counts | Pass if declared result fields still satisfy structural shape | Runs      | Admissibility completed/fail, NRS-BTF-CELL-COUNTS-UNSUPPORTED; dependents not_run                    | ineligible                        |
| Explicit well-formed false model assertion                                                          | Pass                                                          | Runs      | Admissibility completed/fail, NRS-BTF-MODEL-NOT-DECLARED; dependents not_run                         | ineligible                        |
| Missing/non-boolean assertion, unknown member, or wrong exact Contract                              | Structural fail; NRS-SCHEMA-INVALID                           | not_run   | All not_run with conformance blocker                                                                 | not_evaluated                     |
| Structurally valid declared n/df disagree with otherwise supported observations                     | Pass                                                          | Runs      | Admissibility can pass; discrepancies belong to exact numerical comparison, not identity conformance | eligible after admissibility pass |
| Valid reordering with references preserved                                                          | Pass                                                          | Runs      | Admissibility passes; numerical association uses explicit keys                                       | eligible                          |
| Valid factor reversal/exchange, but stale signed claims                                             | Pass                                                          | Runs      | Admissibility passes; incorrect retained claims become keyed numerical mismatches                    | eligible                          |

For D1/D2 the failing reference location is `/payload/analysis/design_id`.
The proposal now fixes one boundary outcome: semantic conformance fail,
integrity/admissibility not_run, eligibility not_evaluated. It no longer permits
the competing report in which broken representation is treated as completed
scientific-design ineligibility. The same logic covers result-to-analysis,
design-to-dataset and observation-to-cell links.

The earlier payload summary's statement that units are unique describes the
supported slice. The explicit later condition table states that repeated unit
IDs are representable but unsupported, whereas duplicate observation identity
is semantic nonconformance. Reading the full candidate gives an explicit
classification rather than requiring an implementation to infer it from the
word "unique". Old ITGC invariants are not automatically extended to BTF.

### Combined faults and refusal precedence

| Combined case                                                                                     | Required boundary behavior                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing assertion plus D1/D2, repeated units or exact zero observed SSE                           | Structural conformance fails first; semantic evaluation and all verification checks are skipped. No downstream outcome or eligibility verdict is invented.                                               |
| D1/D2 plus false assertion, repeated units, unequal counts or exact zero SSE                      | Semantic conformance fails first; integrity/admissibility/numerical checks are not_run; eligibility is not_evaluated.                                                                                    |
| Conformance passes; false assertion or unsupported units/counts coexist with exact zero SSE       | Admissibility fails; numerical checks are not_run with its blocker. Zero SSE is not separately reported as a completed computability result when that check never ran. Integrity remains independent.    |
| Conformance and admissibility pass; observations have exact zero SSE but declared SSE is positive | Computability completed/fail with NRS-BTF-ZERO-RESIDUAL; dependent recomputation not_run. Integrity runs and eligibility remains eligible.                                                               |
| Declared SSE itself is zero                                                                       | Structural failure precedes any check of observed SSE; all verification checks not_run and eligibility not_evaluated.                                                                                    |
| Conformance passes; digest mismatch coexists with failed admissibility                            | Integrity may complete/fail in its own scope; admissibility completes/fails independently and blocks its numerical dependents. Neither result overwrites the other.                                      |
| Conformance errors, is absent/unavailable, or has any result other than completed/pass            | No verification execution is licensed. Admissibility cannot provide an eligibility judgment; no numeric success is inferred. Applicable error/blocker assignments remain check-set issuance obligations. |
| A raw-input refusal coexists with any payload fault                                               | The existing pre-routing refusal is returned; there is no BTF conformance report or lifecycle projection for refused input.                                                                              |

CANON-0023's order remains raw resource limit, malformed JSON, duplicate member,
invalid Unicode, lexical negative zero, parsed resource limit, routing-envelope
fault, then unsupported bundle. For example, a duplicate member beats a negative
zero token or unsupported bundle, and malformed syntax beats duplicate-member
classification. The BTF conformance stages occur only after those gates. They
cannot turn a raw refusal into a failed conformance report, compute forbidden
canonical bytes/digests, or assign `not_evaluated` as a lifecycle view of a
verifier-refused artifact. CORE-0016's refusal boundary remains in force.

The table does not select diagnostic ordering among several faults within one
stage or invent the remaining numerical check graph. The draft fixes the
decision-bearing stage, propagation and eligibility distinctions; complete
check/reason entries and ordering remain explicitly coupled issuance work.

### Reasons, definitions and fixtures

New conformance reasons belong to the conformance judgment and propagate to
every blocked verification check, including integrity. Admissibility reasons
belong to that check and propagate to its numerical dependents. The reused
NRS-SCHEMA-INVALID also needs applicable entries for every new check carrying
it as a blocker; a familiar spelling grants no inherited applicability.
Candidate lines 306-315, 366-374, 385 and 461-466 together require this complete
registration and propagation coverage, not just a reason on the detecting check.

The new report's local conformanceResult owns violations and its stage/reason/
path fields. Its local checkResult preserves the outcome invariant, with
conditional carrier restrictions below. Neither the old closed common report
definitions nor the state-invariant registry is widened implicitly. The proposed
D1/D2, duplicate-observation/repeated-unit, unknown-target, ambiguous-tuple,
reordered-association and propagation fixtures expressly inspect report location,
blockers, integrity and eligibility. Combined-fault and old-bundle regression
coverage is also retained. No unused state-invariant/meta-schema extension is
required because no new BTF entry/reference is proposed there.

## 5. C-N1: admissibility carrier domain

**CONFIRMED as a new proposal decision.** Candidate lines 342-374 now restrict
this exact non-numerical check's completed outcomes to pass/fail. Its explicit
boolean, finite membership, unit and count judgments are determinate once the
conformance/resource gates permit evaluation. Execution failure is error,
and an earlier blocker is not_run; neither becomes a completed negative judgment.

| Carrier condition                                                 | Report-domain requirement                                  | Eligibility projection                                    |
| ----------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| completed/pass                                                    | Outcome present; no execution error                        | eligible                                                  |
| completed/fail                                                    | Outcome present; applicable failure reason present         | ineligible                                                |
| error                                                             | No outcome; error object and applicable reason present     | not_evaluated                                             |
| not_run                                                           | No outcome or execution error; blocking reason present     | not_evaluated                                             |
| Absent                                                            | No carrier evaluation to cite                              | not_evaluated                                             |
| completed/indeterminate for this BTF admissibility carrier        | Invalid under the check-specific conditional report rule   | No valid carrier; never coerce to ineligible              |
| completed without outcome, or error/not_run with outcome          | Invalid under preserved VERIFY-0010 and report constraints | No valid carrier                                          |
| completed/indeterminate for another check/version that permits it | Retains its own valid domain, with an applicable reason    | Does not replace this bundle's sole admissibility carrier |

NRS-VERIFY-0010 requires an outcome on completion; it does not require every
check version to use every globally available outcome. The new conditional
pass/fail restriction therefore preserves that CORE invariant and the other
checks' valid indeterminate results. The state-view's existing three eligibility
values also remain unchanged. CORE-0022 owns the bundle-specific projection;
VERIFY-0032 binds its check domain. These are proposed owners, not issued rules.

The conditional schema is tied to the eventual exact BTF admissibility check
identity, not an unversioned title, check-name prefix or global outcome enum.
The required fixture pairs reject indeterminate for this carrier, permit it
where another check version allows it, and cover pass/fail/error/not_run/absence.
An invalid carrier report is not repaired by silently treating its outcome as
ineligible. Reference lifecycle code supplies no authority for that conversion.
No numerical uncertainty, enclosure or near-zero decision policy is chosen here.

## 6. Regression and preservation

The complete parent-to-input candidate diff is confined to the boundary notice,
two successor clause descriptions and replacement of the old reasons/carrier
section. The other proposal decisions remain intact and were reread in the
assembled candidate. The response explicitly supersedes only the old local-
reference classification and incomplete carrier domain.

| Previously confirmed boundary | Current assessment                                                                                                                                                                                                                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Declaration                   | One required boolean; false is representable but unsupported, missing/wrong type is structural failure, and true proves neither model assumptions nor unreported data handling.                                                                                                                 |
| Number domain                 | Finite parsed binary64, safe integer count/df limits, signed means/estimates, nonnegative SS/F, strictly positive declared SSE and p in [0,1] remain. Representational ceilings do not establish runtime support.                                                                               |
| Zero SSE                      | No truthful complete exact-zero result is representable; fabricated positive SSE cannot bypass scoped computability failure after earlier gates pass. Tiny positive/uncertain SSE remains numerical work.                                                                                       |
| Result keys                   | Exact result scope, contrast_kind/cell_id/quantity discriminators, uniqueness and complete successful coverage remain. The 22 comparison keys and eight not_asserted guarantee keys are unchanged.                                                                                              |
| Surface ownership             | PCS-0001 envelope reuse, PCS-0014/0015 partition, new PCS-0016 report, unchanged historical definitions and additive canonicalization/refusal/routing applicability remain.                                                                                                                     |
| Grammar and issuance          | Four named authoritative meta-schema changes retain legacy forms and add appropriate HTTPS family/capability grammar. Exact membership/Contract pins, registry versioning and positive/negative fixtures remain required. All sixteen proposed Requirement IDs remain unissued.                 |
| Numerical contracts           | Parsed-input authority, check-owned tolerances, no underflow-as-exact-zero claim and Welch-specific endpoint scope remain. No graph, projection, domain or error policy was silently adopted.                                                                                                   |
| Source and model              | Accepted fixed 2-by-2 common-positive-variance normal model, n at least two, full interaction, three marginal contrasts and nuisance-unrestricted individual nulls remain. No confidence interval, multiplicity, causal, historical, quantization or conditional-admission guarantee was added. |
| Release 3                     | No R3 identifier, protected-family procedure, schema or runtime dependency is introduced. The unchanged main-tree reconciliation is reused; it is not a new audit of every R3 research branch.                                                                                                  |

Git object equality, including file modes, establishes the following preservation:

- All 84 manifest-classified authoritative artifacts match the authority
  baseline, input parent, substantive input and delivery.
- All 65 pre-existing review-inputs files match from the input parent through
  delivery. The exact PR 257 review is the sole additional review at input.
- The same comparison preserves all 10 R4 probes, 217 evidence files,
  29 reference files, 188 tooling files and seven R3 preparation files.
- PR 251's copied review matches original commit
  `e4db34eb6561286eafb5873842d8df31e30c409b`, blob
  `08879103e9311648a8d7f136624e16819d22e035`; PR 252's copy matches
  `fdc5364a53293ce12a837f833dd23465d2fd6fcb`, blob
  `d399550380de654fe107365349568791dc5b89da`. Their distinct original
  reports shared a path; the two preserved copies retain both byte sequences.
- The mathematical fence, including delimiters, has unchanged SHA-256
  `609106719fcb377f7fa5d5018677c6f83360bd5b4be600e8a44db4f1873470d7`.
- Original opening and repair handoffs retain blobs
  `e50cea3443edef5de7b2c597a0bd60fccdc01b9e` and
  `16bb4c383861c7267151d7be8e72b2cc0fb3ab40`; the other original R4
  handoffs also remain byte-identical.
- Accepted opening-preparation, normal-model source and source-repair review
  blobs remain `13fb1e0fb63c96cd15efa525f3ced75c59a014c1`,
  `9efcc51a4978b3b539de4424d08c7a265c90e1ab` and
  `94d21ac71834043bcceb6978588a01c927f8eeea` respectively.
- The normal-model source-result and steward-acceptance blobs remain
  `1ed68c2e449a29307225a25b495b98ce7a065106` and
  `b19e39ffe84474f37661ba5839518bd78b5f2cdd`.
- R3 README/readiness-audit blobs remain
  `4dbb5170f839f83ef22d3297dae832098d5cc95d` and
  `bc0bb942d429fe9a9ee4e959ea483972d4dbae4d`.

S5 is nonblocking only for the accepted bounded marginal-F claim. Wider S5 and
S1/S2/P1/S3/S4/S6 obligations remain staged, not globally closed or represented
as newly executed. No Yates, Tian/Styan, NIST or LAPACK source-copy inspection is
certified here. No changed retained scientific premise calls for new acquisition.

## 7. Separate dispositions

| Item                                               | Disposition                                                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Fixed input/delivery                               | MATCH; complete and preserved                                                                                                        |
| C-S1                                               | CONFIRMED; prior opening impediment resolved                                                                                         |
| C-N1                                               | CONFIRMED; new pass/fail-only carrier decision and conditional validation are coherent                                               |
| R4-P1/P2                                           | BOUNDED GO through accepted unchanged evidence, scope and exclusions; no new source certification                                    |
| R4-P3                                              | BOUNDED GO for discussion of the evidence/hold map; numerical support not established                                                |
| R4-P4                                              | BOUNDED GO at unchanged live main; no R3 dependency or calendar gate                                                                 |
| R4-P5                                              | GO for the standalone proposal's clauses, boundaries, identifier/surface plan and explicit holds                                     |
| R4-P6                                              | GO for the assembled opening proposal by bounded confirmation plus scoped prior-review reuse, with the disclosed independence limits |
| Numerical support / identifier and bundle issuance | NOT_ESTABLISHED / HELD pending complete versioned procedures, independent oracles and coupled implementation/conformance             |
| Tier                                               | STABLE-INTENT, minimum 30 calendar days; actual CORE changes require reassessment and CORE's 60-day process                          |
| Public opening                                     | READY FOR A SEPARATE OPENING ACTION; no URL, opening time or decision date is created by this review                                 |

The P5/P6 judgments rest on resolving the actual representation/carrier choices
and checking regression in the whole candidate. They do not follow merely from
a source GO, an author's repair assertion, or successful repository validators.
This record is evidence for the next opening decision; it is not a gate-registry
edit, blanket release authorization or new independent scientific pass.

## 8. Verification and submission

Environment: Node v24.19.0, pnpm 11.19.0, Python 3.12.14, Git 2.51.1.
The repository requests pnpm 11.7.0; 11.19.0 is the actual executable.
The fixed worktree used `pnpm install --frozen-lockfile`; the review worktree
used `pnpm install --frozen-lockfile --ignore-scripts --offline`. The unchanged
lockfile installed 387 cached packages; no dependency file changed.

| Actual command                                    | Fixed input                    | Final review tree                              |
| ------------------------------------------------- | ------------------------------ | ---------------------------------------------- |
| pnpm format:check                                 | PASS                           | PASS                                           |
| pnpm lint:markdown                                | PASS; 406 files, zero issues   | PASS; 408 files, zero issues                   |
| pnpm typecheck                                    | PASS                           | PASS                                           |
| node --import tsx tooling/src/validate.ts         | PASS                           | PASS                                           |
| node --import tsx tooling/src/generate.ts --check | PASS; 19 generated files match | PASS; 19 generated files match                 |
| git diff --check                                  | PASS, input parent to input    | PASS, input to delivery and delivery to review |

Direct node/tsx entry points are permitted by the commission and were used
from the outset. Git object checks used `git show`, `git rev-parse`,
`git ls-tree -r`, `git diff` and a Python equality/hash audit. Live refs were
queried separately with `git ls-remote`. Required verification covers both
the substantive fixed input and the final review content, not a substituted
live candidate.

The full numerical/runtime suites and earlier structural-mutation probe were
not rerun: their inputs/artifacts and the mathematical fence are unchanged,
and this bounded confirmation resolves prose semantics rather than a numerical
algorithm. Logical witness tables above do not claim to test a BTF schema or
runtime. Future fixture obligations are reviewed obligations, not passing tests
of an implementation that does not yet exist.

The fresh branch `review/r4-opening-rfc-boundary-confirmation-20260909` is based
on the exact delivery and adds only this previously unused review record.
The draft PR targets `research/r4-opening-rfc-candidate`; submission metadata
pins the resulting commit, tree and review blob. No candidate, specification,
registry, historical review or Release 3 file is edited; no merge, ratification,
identifier issuance or discussion opening is performed.
