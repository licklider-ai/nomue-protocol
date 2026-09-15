# T07 report

Status: **UNISSUED CANDIDATE**.

## Assessment

T07 CLOSED SCHEMAS / RELATIONAL VALIDATOR — GO. T07 COMPLETE is candidate
preparation completion, not issuance, runtime support or release approval.

The exact T06 branch is the direct base. At start, origin/main remained
`3880db43a64e1758494f3c78f6850daab0e3e9e9`; no material drift audit was necessary.
The 35 T06 source pins and its file manifest verified before work. INPUTS.json pins
all twelve direct T06 files and fourteen convention/parser sources by commit, blob
and SHA-256. T06 files remain unchanged.

## Repository schema conventions

| Convention           | Repository example                                       | Authority                                    | T07 reuse                                                                | Note                                                                                                   |
| -------------------- | -------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Dialect              | schemas/record/record-0.2.schema.json                    | Repository schemas / authority manifest      | JSON Schema 2020-12                                                      | Ajv2020, strict numeric validation                                                                     |
| Naming / identity    | T06 IDENTIFIERS.md                                       | Fixed T06 / ID-POLICY                        | Three exact BTF IDs; candidate filenames                                 | No issued path or registry edit                                                                        |
| $ref / $defs         | schemas/common/identifier.schema.json                    | Existing scalar definitions                  | Local $defs plus one exact common schema                                 | No network resolution or R2 analytical schema dependency                                               |
| Closed objects       | R2 paired-two-condition candidate schema                 | RFC and T06 required sets                    | Explicit required, additionalProperties false                            | No extensions, producer intervals or helper metadata                                                   |
| Enums / numbers      | execution-outcome-0.2; T06 quantity ranges               | T06 representation and lifecycle             | Closed kind/outcome/check enums; finite parsed numbers and safe integers | Reason lexical grammar remains existing extensible NRS grammar, not an invented closed allocation list |
| Instance identifiers | common localId / uri                                     | Existing identifier scalar schema            | Exact case-sensitive typed namespace references                          | localId max 256 and ASCII shape inherited, no normalization                                            |
| Input parser         | reference/verifier/src/strict-json.ts                    | CANON strict ingress                         | parseStrictJson before interpretation                                    | Duplicate names, surrogate errors and negative zero rejected                                           |
| Tooling              | TypeScript, Ajv, tsx, assertions in repository           | Existing package/lock and contribution rules | Candidate TypeScript module and deterministic test runner                | No runtime source edits; isolated config includes these files                                          |
| Fixtures             | R2 candidate fixtures / hand-authored expected judgments | Conformance fixture practice                 | Valid, invalid and closure mutations                                     | Representation evidence only; zero placeholder digest not truth evidence                               |
| Schema publication   | registries/public-contract-surfaces.yaml                 | AUTHORITY / ID-POLICY                        | Unissued local loader only                                               | No production dispatcher or supported-bundle registration                                              |
| R3 relevance         | Independent-multigroup draft preparation                 | Informative precedent only                   | No extra R3 surface needed for BTF representation                        | No Holm or multi-group meaning imported                                                                |

## Representational decisions

Three schema IDs are inherited exactly, not inferred from this task's wording.
Record and payload roots are closed complete shapes. The report ID hosts local
closed components and an intentionally rejecting root: consumers select a named
$defs boundary. Final report assembly, guarantee/eligibility placement, refusal
reason allocation, transactional publication and CLI codes remain T09. This follows
T06's ownership and the explicit T07 report boundary, not a new public surface.

Quantity outcomes use existing pass/fail/indeterminate values. An established
recomputed zero requires projection_state exact_zero or nonzero_rounded_to_zero.
This is the T06 semantic distinction expressed locally; it supplies no new numerical
meaning. No rational/tail intermediate is added to required public evidence.

Diagnostic output is one deterministic first issue. This is the candidate validator's
local API, not a new Public Check primary-reason requirement. It retains existing
phase ordering; the within-phase order is documented and tested. T09 can serialize
all applicable reasons without interpreting the first diagnostic as exclusive truth.
No new numerical precedence, public reason allocation or material normative decision
is made. No separate review chain is started.

## Scope, resource and implementation boundaries

The implementation loads only pinned repository schemas/metadata; validation calls
are deterministic, local, clock-free and non-mutating. It reuses only the pure size
and parsed-limit inspection functions of existing reference ingress. These local
harness resource refusals do not constrain public J-cost membership or reselect the
T04 safety profile. Arrays have fixed nesting; observations have no new public count
cap in the schema. Work and memory are bounded for inputs admitted by those existing
local ingress guards. This is not a new full-invocation safety proof.

T07 supplies structural admissibility facts (model boolean, observed equal counts,
unit uniqueness). T08 consumes those facts; it should not implement a competing
relational truth source. T08 still owns executable numerical/computability judgments;
T09 owns lifecycle publication. Declared counts and df are not compared to observed
counts here. Their truth comparison is part of the fixed 22 and remains T08.

## Tests and preservation

The saved result files record hand-authored fixture outcomes and generated closure
mutations, repeated deterministic validation, local refs, exact 22-key evidence
association, scope/version binding and schema compilation. Default Node and --jitless
exercise the same TypeScript source; neither is a CPython -O or Linux supervisor test.
Fixture digest and numeric declarations are intentionally not verified; acceptance
proves representation only. Generic indeterminate fixtures do not claim S-C ambiguity.

No J-cost/B admission, exact F, S-C, Z-B, correctly rounded target, digest computation,
22 numerical comparison or final aggregate is implemented. No production worker is
invoked. Main, schemas/, registries/, reference/, prior candidate/evidence snapshots
and formal Requirement anchors are unchanged. Only the new T07 directory is added.

## Gap audit

No T07 SEMANTIC GAP or unresolved material representation decision was found.
The report root, full failure-delivery and CLI contract are explicit T09 work;
reference/audit witness byte formats retain their fixed research source rather than
being promoted into required public schema. No new evidence semantics are chosen.
The candidate fixture corpus is T07 representation coverage, not the later T10
numerical/independent-oracle corpus.

## Provenance

Prepared and tested by the task's Codex assistant, 2026-09-15, Windows with the Node
version recorded in RESULTS.json. This is author implementation/testing, not a new
independent numerical review. T03-T06 fixed semantics and T05 sufficiency are reused.
