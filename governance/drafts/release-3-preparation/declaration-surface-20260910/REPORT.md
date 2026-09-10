# Release 3 D0 declaration and result-binding candidate

2026-09-10. Lane 4 authoring return. Informative, reversible, unissued exploration.
This directory makes a bounded common declaration surface executable for review.
It is not a nomue Record, a supported Contract, a Public Check, or a completed D0
specification. There is no statistical or numerical implementation here.

## 1. Inputs, authority and process

The branch starts at **dedd26a3e0655001b67e40ccfb741e43ecb07beb**, tree
**31cade5ea601c896a1841296a3d3aca14bae479d**. GitHub main observed on
2026-09-10 was that same commit: no related main delta to reconcile. The separate
R3 source is **7774242f0df81342c5abca97a8fbe40844306fa6**, tree
**be7e2e0a400e20219f305e587640022a3587e140**, sole parent
**c97e1dacd779f7e3ecf9167630ecb2de9c15a231**. It is read as input, not merged
or substituted for the branch base. [INPUTS.json](INPUTS.json) pins 25 used files
by commit, Git blob, byte count and SHA-256, with immutable GitHub links.

AGENTS and its ordered Read-first material were inspected before candidate work.
No directory-local instruction applies to this new directory. The supplied user
commission authorizes exploratory schema/code/fixtures in this directory only;
no authority, registry, dependency, conformance, Release 2/4 or verifier file changes.
No identifier reservation, issuance, adoption, merge or publication is performed.

Source locators used below (all at the separate fixed R3 input):

- [RFC](https://github.com/licklider-ai/nomue-protocol/blob/7774242f0df81342c5abca97a8fbe40844306fa6/governance/drafts/release-3-independent-multigroup-rfc.md): Proposed semantic boundary; Comparison-family and multiplicity program; Identity and Release 2 dependency; Compatibility.
- [Map](https://github.com/licklider-ai/nomue-protocol/blob/7774242f0df81342c5abca97a8fbe40844306fa6/governance/drafts/release-3-preparation/supplied-scope-opening-record.md): Sections 2.1, 4, 5 and 9.
- [Semantic result](https://github.com/licklider-ai/nomue-protocol/blob/7774242f0df81342c5abca97a8fbe40844306fa6/governance/drafts/release-3-preparation/semantic-research-result.md): Sections 7, 10-15 and 17; historical proposals subject to Map 2.1.
- [Opening receipt](https://github.com/licklider-ai/nomue-protocol/blob/7774242f0df81342c5abca97a8fbe40844306fa6/governance/drafts/release-3-preparation/public-opening-record.md): Sections 1-3.
- [Repair review](https://github.com/licklider-ai/nomue-protocol/blob/7774242f0df81342c5abca97a8fbe40844306fa6/review-inputs/r3-opening-premise-repair-review/REVIEW-RESULT.md): Sections 3, 5 and 6.

These are repository proposal/review sources, not new primary-paper inspections.
The field layout below is an authoring choice motivated by those sources, never
attributed to them as an already adopted schema or scientific theorem.

Process disclosure: OpenAI Codex-assisted authoring in the current conversation,
with supplied project history visible. No subagents, separate investigator,
different-model review or authenticated human review was used. This return does
not satisfy the independent scientific review needed before methodology promotion.

## 2. Preserved status

[Issue #274](https://github.com/licklider-ai/nomue-protocol/issues/274) was checked:
open, created 2026-09-09T11:50:18Z, zero comments at observation. PR #275 remains
draft at the supplied source commit. The receipt's earliest decision is
2026-10-09T11:50:18Z; elapsed time is not acceptance. Historical pre-opening prose
at the fixed RFC is not interpreted as a demand to reopen discussion.

All 49 classifications remain 15 R3-CAND / 27 RES-ONLY / 5 TRANSFER / 2 REJECT,
plus two guidance entries and five exclusions. The ledger remains 9 CLOSED /
1 PARTIAL / 4 INPUT_INCOMPLETE, SOURCE_SET_READY=false, overall INPUT_INCOMPLETE,
NARROW. OMN-02 model/statistic/df/calibration, APR-09/SR-G coverage and SR-K
FDR/dependence positive claims remain excluded as enabling premises. Recent
Ge/James/Brown-Forsythe/Troendle findings remain context and conservative exclusions.
NB-01 through NB-10 and PR #265's B2/C3/G withdrawals remain effective. No
classification, historical approval, or hold is changed by a passing fixture.

## 3. Field meaning, ownership and source mapping

Producer owns declared instance content and local IDs. The eventual Profile owns
common admission rules; each eventual Contract owns scientific meaning and its
versioned Public Check owns computational support, estimand, level and tolerance.
The following syntax belongs only to this local candidate. Source references are
the fixed documents in Section 1, not current-main paths to missing material.

| Candidate field(s)                                                     | Meaning and owner                                               | Relation checked / boundary                                                                          | Fixed basis                                      |
| ---------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `artifact_kind`                                                        | Local exercise marker, authoring-owned                          | Exact const; no schema ID or bundle registration                                                     | RFC Candidate development; ID-POLICY at base     |
| `dataset.dataset_id`                                                   | Producer's represented input identity                           | Exact reference from every analysis; single dataset here                                             | Map 4; base NRS-PROV-0001 pattern                |
| `outcome_definition`, `scale_declaration`                              | Producer's outcome and continuous-scale declaration             | Required text/const; no proof of measurement scale                                                   | RFC semantic boundary; Semantic 11               |
| `observations[].observation_id`                                        | Identity of a represented outcome                               | Unique within dataset; all represented observations admitted                                         | Map 4; Semantic 11, 14 attack 16                 |
| `observations[].experimental_unit_id`, `group_id`, `value`             | Explicit unit/group and finite parsed outcome                   | Unit exists; group exists; bindings agree; one observation per unit                                  | RFC semantic boundary; Map 4                     |
| `design.design_id`, `kind`                                             | Producer's identified independent one-way design                | Analysis refers to it exactly; closed design kind                                                    | RFC semantic boundary                            |
| `experimental_unit_definition`                                         | What constitutes one unit, declared by producer                 | Nonempty text only; cannot infer from labels                                                         | Semantic 11, 14 attack 14                        |
| `independence_declared`, `not_flattened_declared`                      | Producer assertions about independence and non-flattening       | Require true to enter this bounded exercise; truth not asserted                                      | Map 4; Semantic 14 attacks 14, 17                |
| `groups[].group_id`                                                    | Explicit groups                                                 | At least three unique groups; each represented                                                       | RFC semantic boundary                            |
| `units[].experimental_unit_id`, `group_id`                             | Producer's unit assignment                                      | Unique unit IDs; exactly one known group; all units represented                                      | Map 4; Semantic 11                               |
| `analyses[].analysis_id`, `dataset_id`, `design_id`                    | Producer's analysis identity and inputs                         | Unique analysis ID and exact input refs                                                              | RFC Contract separation; base provenance pattern |
| `population.definition`, `observation_ids`                             | Declared analysis target set                                    | Unique IDs, exact coverage of this represented dataset; no exclusion/filter engine                   | Map 4; Semantic 11, 13.3                         |
| `analyses[].family_id`, `families[].analysis_id`                       | Reciprocal ownership of one comparison family                   | Exact bidirectional consistency; no orphan family                                                    | Map 4; Semantic 14 attacks 9, 18                 |
| `contract_ref`                                                         | Exact version-bearing fixture Contract label                    | Matched to a harness-owned synthetic descriptor; no prefix, alias, name lookup or network resolution | RFC Identity and R2 dependency; base ID-POLICY   |
| `procedure_selection`                                                  | When the procedure was reportedly selected                      | Separate from family/member selection; no chronology proof                                           | Map 4, 9; Semantic 14 attack 6                   |
| `variance_model.declaration`, `.selection`                             | Common, group-specific, or not-declared assumption and timing   | Carries declaration only; never selected from values or accepted scientifically                      | Map 4; Semantic 11, 14 attack 15                 |
| `assumption_statements`                                                | Producer's additional plain-text assertions                     | Inert strings; no executable predicates or implied theorem matching                                  | RFC Contract obligations; Map 2.1, 4             |
| `families[].family_id`, `kind`, `selection`                            | Family identity, enumerated class and reported selection timing | Omnibus, all-pairs, many-to-one, finite contrasts; no implicit follow-up                             | RFC comparison program; Map 4                    |
| `members[].member_id`, `kind`, `selection`                             | Family-local member identity and selection timing               | Unique within family; same ID in another family is separate                                          | Map 9; Semantic 14 attack 18                     |
| `omnibus member.group_ids`                                             | Scope of the one global member                                  | Exactly the declared groups; no per-pair conclusion                                                  | Map 4; Semantic 14 attacks 2-4                   |
| `minuend_group_id`, `subtrahend_group_id`                              | Explicit direction of a pair target                             | Known, distinct groups; array order never supplies direction                                         | Map 4; Semantic 11                               |
| `control_group_id`                                                     | Explicit reference group for many-to-one family                 | Known group; all other groups once as treatments, control as subtrahend                              | Map 4; Semantic 14 attack 11                     |
| `coefficients[].group_id`, `.value`                                    | Group-keyed finite coefficient vector                           | Each group exactly once; no positional inference or numerical equivalence rule                       | Map 4, 9; Semantic 11                            |
| `selection.relative_to_outcome_inspection`, `.statement`               | `before`, `after`, or `not_declared` plus producer explanation  | Explicit lack of assurance can be represented; no method admission follows                           | Map 9; Semantic 14 attack 6                      |
| `result_slots[].result_id`, `analysis_id`, `family_id`, `contract_ref` | Prospective result attachment, producer IDs                     | Unique result IDs, one slot per analysis, exact analysis/family/Contract match                       | Map 4; Semantic 12, 13.11                        |
| `result_slots[].kind`, `member_id` or `member_ids`, `payload_status`   | Disjoint result attachment shapes; payload deferred             | Exact member coverage; wrong output kind fails; numeric/guarantee fields forbidden                   | Map 4; Semantic 12 under Map 2.1                 |

Group count and group sample sizes are derived by counting explicit groups and
observations. They are not redundant declared fields that can disagree. This is a
candidate layout choice, not omission of those quantities or adoption of any
minimum sample size needed by a numerical method.

## 4. Deliberately bounded executable slice

[candidate.schema.json](candidate.schema.json) is a closed JSON Schema 2020-12
surface with no issued `$id`. [example.json](example.json) exercises six analyses
with separate families/result slots. The one observation per group example is
intentionally structural: no sample variance, F statistic or interval is promised.

The exercise handles one represented dataset, one design, complete admission,
one family and one result slot per analysis. Exclusion records, different analysis
subsets, mixed endpoints and partial result delivery are not silently invented.
They require a later bounded policy; an omitted observation currently fails.
Completeness here is only relative to represented input, not the real study.

All-pairs enumeration covers each distinct two-group set once. The explicit
minuend/subtrahend fields preserve direction; no sorting determines the sign.
Reversed duplicates are rejected for this all-pairs representation, not declared
numerically equivalent signed results. Many-to-one enumeration covers every
non-control group exactly once, treatment minus control. These are visible local
structural conventions, subject to review before any Contract adoption.

Array order is retained but not used as an inferential order. Relation checks use
IDs and coverage. Reordering arrays can leave relation results unchanged while
changing canonical bytes. Neither the checker nor JCS normalizes array order.
No rank, tie-break, stopping order, coefficient sum test, all-zero exclusion,
coefficient rescaling, sign normalization or tolerance is implemented. Identical
contrast vectors with different IDs are not deduplicated; semantic duplicate
hypotheses remain unresolved. Empty/unknown/malformed references fail explicitly.

The `finite_contrasts` family is representation of finite vectors, not a finding
that they are valid contrasts. `planned_contrast` is a prospective result-slot
category; an `after` declaration is representable but does not qualify as planned
analysis. Family-universe timing, vector timing and procedure timing are separate.
The infinite all-contrast universe/generating rule is deferred, so a finite list
is never presented as a universal contrast guarantee.

## 5. Result separation and future Contract connection

The executable result slots contain **no calculated result or guarantee**.
They are typed attachment candidates. Each has `method_payload_deferred` fixed;
unknown p-value, interval, significance, confidence or guarantee fields fail.
This permits testing cross-analysis contamination without adopting a method.

| Result kind             | Common binding now                                   | Contract-specific payload/meaning still held                                                                                              |
| ----------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Omnibus                 | One analysis, exact Contract, one global member      | Statistic, null, distribution/df, p-value, calibration; no inference that all pairs differ or means are equal                             |
| Pairwise                | Explicit directional members and complete family     | Target, standard error, covariance, tails, test outputs and applicability                                                                 |
| Many-to-one             | Explicit control and treatment-minus-control members | Control-specific constants, sidedness, correlation and guarantee; no reuse for all-pairs                                                  |
| Planned contrast        | Group-keyed vectors and member timing                | Contrast constraints, estimand, null, admissible selection and variance                                                                   |
| Multiplicity adjustment | Exact family and member coverage                     | Input p-value source binding, validity/dependence, ordering/ties, thresholds, stopping, adjusted values; distinct FWER and FDR procedures |
| Interval                | Exact family and member coverage                     | Estimand, sidedness, bounds, critical constant, simultaneous or other coverage; no automatic pairing with adjusted p-values               |

An omnibus test's per-test control, weak FWER, strong FWER, FDR and simultaneous
coverage are different obligations. No scalar `error_rate` or general guarantee
flag unifies them here. A later Contract descriptor needs its exact scientific
claim class, conditions and allowed result schema, backed by scoped review;
its Public Check supplies supported level and numerical policy. No present label
is claimed to attain one of those guarantees. In particular, no held SR-K or SR-G
claim enters the synthetic descriptors by default.

[fixture-contracts.json](fixture-contracts.json) is trusted test harness input,
not producer-supplied registration. Six local `example-contract-...-v0` strings
bind result shape and family kind only. They do not identify real statistical
procedures, carry the Protocol minting grammar, or reserve names. The checker
compares the entire label exactly; near versions and capitalization changes fail.
Collision scans found no occurrence of these seven labels (including the artifact
marker) in tracked content at base/current main or the fixed R3 input. This is
not a global reservation or a claim about unseen concurrent proposals.

Future promotion requires explicit Profile/schema/Contract/Public Check/
canonicalization/bundle identities and an exact registered tuple, coherent
specification/registries/conformance changes and the research/RFC gates. Release 2
candidate identifiers, shapes and support are not assumed issued. No Release 2
candidate implementation is imported here; reuse remains conditional.

## 6. What each check means

| Layer                | Executed here                                                                                                   | What it does not establish                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Raw JSON             | Existing `parseStrictJson`: duplicate decoded keys, invalid Unicode and negative zero rejected                  | Resource/execution admission for arbitrary untrusted candidate input            |
| Finite transport     | Existing JCS serializer rejects non-finite parsed values before candidate shape checks                          | Exact source-decimal fidelity, statistical or coefficient arithmetic            |
| JSON Schema          | Closed objects, required fields, types, variants, list minima and unique primitive refs                         | Cross-object ownership or scientific truth                                      |
| Relations            | Unique object IDs, references, group/unit membership, input/family/result coverage and synthetic Contract match | Hypothesis equivalence or theorem conditions                                    |
| Self-declaration     | Required design assertions and explicit timing/variance records                                                 | Independence, authentic design, preselection or population truth                |
| Method admissibility | Not run; no method predicates selected                                                                          | Support for a sample size, variance/dependence model or chosen family           |
| Computability        | Not run                                                                                                         | Defined statistic, convergence, projection, domain bounds or numerical accuracy |
| Recomputed agreement | Not run                                                                                                         | Agreement with declared numerical results or independent truth oracle           |

Diagnostics are local exercise labels, not registered reason codes. Relation
failures are an unordered set; alphabetical printing is presentation only, not an
adopted first-failure priority. The schema stage intentionally has the single
`SHAPE` label, with each fixture identifying the concrete condition. There is no
overall verified verdict. All output explicitly keeps declaration truth and
scientific validity `not_asserted`, computation and recomputation `not_run`.

## 7. Preservation of existing JSON, identity and release meaning

The checker imports the existing strict parser and JCS code read-only. It never
uses permissive raw `JSON.parse`, removes unknown fields, coerces numbers, fills
defaults, drops observations, or dereferences a producer URI. Pretty-printed
fixtures are authoring inputs to this exercise, not claimed canonical stored
Records. The candidate checker is not an ingress replacement and does not issue a
Record digest. Existing storage/exchange ingress still rejects noncanonical bytes
and returns the original bytes on acceptance. [compatibility.mjs](compatibility.mjs)
executes those boundaries, array-order preservation and exact existing bundle
routing, including refusal of the exercise marker as a bundle.

Old Record schemas, interpretations, bundle dispatch, digest contexts, numerical
results and conformance expectations are untouched. A later successor needs a new
versioned surface where required; no old method ID is aliased to a Contract ID,
no URI normalization occurs, and unsupported tuples fail closed. No R3 schema is
loaded by the current verifier. Twelve compatibility probes are bounded ingress/
routing evidence, not a claim to have rerun every numerical regression.

## 8. Decisions needed from Lane 3

[DEFERRED.md](DEFERRED.md) gives the handoff by subject. Before expanding these
slots into scientific results, Lane 3 should return fixed claim-to-review links
for the selected Contract, with its precise candidate variant, source limit,
assumptions and allowed result claims. Especially:

1. Resolve or retain the OMN-02, APR-09/SR-G and SR-K enabling-premise exclusions;
   a historical CLOSED status is not the missing scoped connection.
2. Identify each p-value's hypothesis, originating analysis/Contract/check,
   sidedness, validity basis, dependence and family membership; determine what
   can be checked locally versus only declared. Do not require omnibus execution
   as an implicit prerequisite for generic p-value transforms.
3. Distinguish family-universe selection, individual vector selection and
   procedure/variance selection. Specify whether an unknown or after-inspection
   declaration is outside a particular Contract, with no chronology certification.
4. Separate weak/strong FWER, FDR and coverage, and review any test-interval duality
   before binding adjustment and intervals together.
5. Establish variant-specific contrast, ordering, ties, stopping and boundary
   comparisons. Neither floating-point convenience nor sorted IDs is a source.

This return does not wait for those judgments: the explicit common declarations,
closed shape checks and ownership/reference checks are complete for this slice.

## 9. Reproduction and review focus

From the repository root after frozen-lockfile dependency installation:

```sh
node --import tsx governance/drafts/release-3-preparation/declaration-surface-20260910/check.mjs
node --import tsx governance/drafts/release-3-preparation/declaration-surface-20260910/compatibility.mjs
python governance/drafts/release-3-preparation/declaration-surface-20260910/preserve.py
pnpm format:check
pnpm lint:markdown
node --import tsx tooling/src/validate.ts
```

[cases.json](cases.json) contains hand-authored expected outcomes and concrete
edits against the full example (or raw JSON strings). The runner materializes them
without changing expectations. This is structural evidence, not numerical oracle
agreement. [VALIDATION.md](VALIDATION.md) records executed checks and environment.

An independent reviewer should prioritize: (a) whether a local representation
convention has accidentally become a statistical condition; (b) missing ownership
checks that permit another analysis/family's result to pass; (c) whether finite
vectors or selection declarations imply held guarantees; (d) exact identity and
no normalization; (e) synthetic Contract descriptors not being read as issued or
scientifically qualified; and (f) preservation of all held/excluded questions and
all files outside this directory. No author-context second pass is represented as
that independent review.
