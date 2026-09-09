# Release 4 opening repair confirmation

Status: informative review; same-conversation confirmation of PR 251 and
reconciliation with PR 252. Not a steward decision.
Date: 2026-09-09 (UTC).

## 1. Verdict

**REPAIR_REQUIRED. Public opening: NOT_READY.**

The two original reports' eleven SHOULD-FIX entries are substantively repaired
as proposal text. Their eight NICE-TO-HAVE entries are accounted for separately
below. The repair introduces a remaining decision-bearing ambiguity about
semantic conformance versus admissibility (C-S1). This review has **0 BLOCKER,
1 SHOULD-FIX and 1 NICE-TO-HAVE** finding. Severity and opening effect are
separate: C-S1 needs a bounded text repair and confirmation before opening.

The mathematical model, formula fence, accepted source/derivation split,
historical artifacts and Release 3 interfaces are preserved. Bounded preparation
remains GO. Numerical support is NOT_ESTABLISHED. No additional PDF acquisition
or numerical investigation is needed to resolve the findings.

STABLE-INTENT, with at least 30 calendar days, remains the supportable highest
tier if the conformance clarification preserves existing CORE meaning. An
intentional change to the CORE conformance/separation rule needs a revised
impact assessment and the CORE process, including its 60-day minimum. This
review establishes no actual implemented CORE change and starts neither clock.

## 2. Fixed input and preservation

Commission: [opening-rfc-repair-confirmation.md](../../../governance/drafts/release-4-preparation/opening-rfc-repair-confirmation.md)
at the delivery commit below. The six-file repaired input, rather than the
later commission or a moving branch, is the substantive review target.

| Object                                 | Verified identity                                                 |
| -------------------------------------- | ----------------------------------------------------------------- |
| Repaired input                         | `60a7caf05ebb4812e367a48c70621f092c26fedb`                        |
| Input sole parent                      | `6adfc8a0080e30ce7634a5912c4dbb32e97ecd17`                        |
| Input tree                             | `d21f634c7964581fad2bbc1f3bacc4b6eb4f8135`                        |
| Authority/main baseline                | `0abdca8f822d0de3faf35f218f762a951fd75e9e`                        |
| Handoff delivery / sole review parent  | `40e723d30c1e235591b0795d8c4535639ff4fc32`                        |
| Delivery sole parent                   | The repaired input above                                          |
| Delivery tree                          | `cea3f5aa544e59f8c201f9e1bea68600b39ef5bd`                        |
| Confirmation handoff blob              | `16bb4c383861c7267151d7be8e72b2cc0fb3ab40`                        |
| Delivery README blob                   | `07881337299227b44feb72e8a36aeb21ab19fa2a`                        |
| Live main observed during confirmation | Same as the authority baseline; no intervening change             |
| Candidate locator                      | research/r4-opening-rfc-candidate, PR 249, at the delivery commit |

The input paths and blobs match all six commission pins exactly:

| Path                                                                   | Blob                                       |
| ---------------------------------------------------------------------- | ------------------------------------------ |
| governance/drafts/release-4-preparation/opening-rfc-candidate.md       | `4446e910882ea65e7ab968775185ad1898784b94` |
| governance/drafts/release-4-preparation/opening-rfc-review-response.md | `f54dfecebce61af841ebd26763abe34cc1af07e9` |
| governance/drafts/release-4-preparation/README.md                      | `e2d47a5bff278ad05344b69e765cd643e1182968` |
| governance/drafts/release-4-preparation/public-discussion-readiness.md | `7c6f6eefba0c522cef24f5497687997bacce46dd` |
| review-inputs/r4-opening-rfc/PR-251-REVIEW.md                          | `08879103e9311648a8d7f136624e16819d22e035` |
| review-inputs/r4-opening-rfc/PR-252-REVIEW.md                          | `d399550380de654fe107365349568791dc5b89da` |

Parent-to-input Git object inspection finds exactly those six paths: three
modified Markdown files, the new response and two added review copies. Delivery
adds only the confirmation handoff and its two-line README notice/link. The
input validates as a complete standalone tree. INPUT_INCOMPLETE does not apply.

The copied reviews match the original REVIEW-RESULT.md blobs in
`e4db34eb6561286eafb5873842d8df31e30c409b` (PR 251) and
`fdc5364a53293ce12a837f833dd23465d2fd6fcb` (PR 252). Both original commits have
the stated common parent. Their original paths and their disclosures were not
rewritten. The response's author adjudication is not treated as an independent
correction of either report.

Byte comparison also established:

- All 84 manifest-classified authoritative files are identical from the main
  baseline through the repaired input and delivery.
- All 63 pre-existing files under review-inputs/ are preserved from the input
  parent through delivery, including every earlier accepted review.
- All 10 R4 probes/ files, 217 evidence/ files, 29 reference/ files, 188 tooling/
  files and seven Release 3 preparation files are preserved over that interval.
- The original opening handoff retains blob
  `e50cea3443edef5de7b2c597a0bd60fccdc01b9e`.
- The candidate's complete mathematical text fence, including its delimiters,
  has SHA-256 `609106719fcb377f7fa5d5018677c6f83360bd5b4be600e8a44db4f1873470d7`
  at the parent, input and delivery.
- The normal-model source result retains blob
  `1ed68c2e449a29307225a25b495b98ce7a065106`; the steward acceptance retains
  `b19e39ffe84474f37661ba5839518bd78b5f2cdd`.

The three principal accepted review blobs remain
`13fb1e0fb63c96cd15efa525f3ced75c59a014c1` (opening preparation),
`9efcc51a4978b3b539de4424d08c7a265c90e1ab` (normal-model source), and
`94d21ac71834043bcceb6978588a01c927f8eeea` (source repair confirmation).
The complete path comparison, not the author's change count, establishes that
no other numerical result, source-copy record or authority changed.

## 3. Reviewer and evidence boundary

Reviewer: OpenAI Codex. Exact served model/build and provider session identifiers
are not available as authenticated runtime metadata. This is the same task
conversation that produced PR 251, with its prior review context and project
summaries available. It is not a fresh blind investigation. This conversation
did not author the repaired candidate. The candidate and response disclose
OpenAI Codex assistance in their existing authoring context; different-model
or different-provider independence from that author is not established here.

PR 252 separately reports Anthropic model claude-fable-5-1 in a new context,
with no prior involvement. That is the preserved report's disclosure, not an
independent audit of its runtime. It is not conflated with PR 251's limits.
No human-investigator independence is inferred from model separation. No
sub-agent, additional model or human expert contributed to this confirmation.

Read both preserved reports in full, including PR 251 Appendix A, and the full
repaired candidate and response. Governance inspection followed AGENTS.md's
ordered prerequisites: Charter, authority model and manifest, requirements,
ID policy and RFC process, together with stability tiers and ADR-0032.
Focused direct inspection covered the actual owning clauses, registry grammars,
state invariants, vocabulary, current surface entries, local-ID shape and
lifecycle implementation needed to assess the repairs. Git object checks reuse
the earlier accepted scientific and Release 3 review basis only where unchanged.

No PDF was supplied or inspected in this confirmation. It supplies no new
certification of Tian/Styan, Yates, NIST or LAPACK copies. The accepted provided-
copy and source/derivation dispositions remain intact. Same-conversation repair
confirmation is allowed by the commission; it is not a second independent
scientific investigator or a substitute for the accepted separate-model source
pass. Public opening still requires resolution of C-S1 and an attributable
opening decision against the resulting exact proposal.

## 4. Every original finding

CONFIRMED below means the requested informative proposal repair is present and
reviewable, not that a schema, check, identifier or registry entry is implemented
or issued. Labels remain separate even when the underlying observations overlap.

| Original finding | Confirmation and remaining effect                                                                                                                                                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PR 252 S-1       | CONFIRMED. Four authoritative meta-schemas, concrete identity/reference fields, snapshot/version treatment, positive/negative coverage, local report definitions and implementation coupling are named. Unused CI, canonicalization, attestation and scope extensions are correctly omitted. |
| PR 252 S-2       | CONFIRMED with scope reconciliation. The expanded crosswalk names the omitted constraints rather than relying on the report's inconsistent count. VERIFY-0020 is historical Welch-only; VERIFY-0021's general statement and its bundle disposition are distinguished.                        |
| PR 252 S-3       | CONFIRMED. PROFILE-BTF-0002 carries the new marginal/multiplicity/quantization/admission boundary. VERIFY-0029 carries BTF evidence association; generic non-aggregation, truth and distinct-check meaning keep their owners.                                                                |
| PR 252 S-4       | CONFIRMED. VERIFY-0013/0017 preserve distinct checks and failed-admissibility propagation. Only new graph edges and ordering within those constraints remain held.                                                                                                                           |
| PR 252 S-5       | CONFIRMED. CORE-0020 explicitly prohibits Contract dereference; VERIFY-0030 explicitly binds finite parsed binary64 input authority. Existing CORE clauses are not edited or widened.                                                                                                        |
| PR 252 S-6       | CONFIRMED. Required boolean, true/false distinction and missing/wrong-type schema failure are explicit. The single assertion's difference from structured ITGC declarations and its inability to discover undeclared handling are disclosed.                                                 |
| PR 252 S-7       | CONFIRMED. Declared SSE is strictly positive and F/tails are required. Exact observed zero SSE defeats fabricated positive declarations through scoped computability failure; tiny/uncertain SSE classification remains held.                                                                |
| PR 252 S-8       | CONFIRMED. PCS-0001 receives additive envelope applicability and schema references. PCS-0014/0015 cover disjoint BTF payload portions; PCS-0016 covers the report.                                                                                                                           |
| PR 252 S-9       | CONFIRMED. Existing result scope plus quantity/discriminator keys is sufficient; no contrast scope kind is needed. New local definitions avoid widening the closed historical common schema.                                                                                                 |
| PR 252 N-1       | CONFIRMED. A/B and 0/1 positions, level-1 minus level-0 orientation and factor-local level-ID uniqueness are explicit.                                                                                                                                                                       |
| PR 252 N-2       | CONFIRMED. All five inherited and three new guarantee_boundary keys are explicit required not_asserted constants.                                                                                                                                                                            |
| PR 252 N-3       | CONFIRMED. Finite numbers, safe count/df ceilings, exact count/df comparison, signs and ranges are explicit. Integer arithmetic verifies the bounds.                                                                                                                                         |
| PR 252 N-4       | Carrier selection CONFIRMED. CORE-0022 supplies a normative proposed owner and names the single admissibility carrier. The omitted completed/indeterminate case is the new nonblocking completion point C-N1.                                                                                |
| PR 252 N-5       | PARTIALLY CONFIRMED. Candidate reason names and orientation behavior are now explicit, but unresolved representation references are classified as admissibility without a clear semantic-conformance disposition. C-S1 requires repair before opening.                                       |
| PR 252 N-6       | CONFIRMED. The bundle Contract field is optional globally, required for BTF and equal to analysis.contract_id. Old entries remain unchanged.                                                                                                                                                 |
| PR 251 S-1       | CONFIRMED. The authoritative grammar impact is now distinct from reference tooling; all four actual affected meta-schemas, identities, compatibility and fixture obligations are accounted for.                                                                                              |
| PR 251 S-2       | CONFIRMED. Distinct admissibility/computability checks, not_run propagation and check-owned tolerances are preserved. Numerical holds no longer reopen those CORE constraints.                                                                                                               |
| PR 251 N-1       | Successor bindings CONFIRMED for parsed numeric input, integrity, security and the local reference chain. Existing source-decimal, offline and scoped-output constraints are included. The new chain's failure classification still needs C-S1.                                              |
| PR 251 N-2       | Representation/key/definition repairs CONFIRMED. Required members, exact local equality, unsupported boolean versus malformed structure, and order-independent evidence are specified. C-S1 concerns the newly chosen failure boundary, not missing scalar types.                            |

## 5. Remaining findings

### C-S1: distinguish broken representation links from unsupported design

Priority: SHOULD-FIX. Opening effect: blocks R4-P5 completion and opening GO.
Location: candidate lines 208-220 and 285-305, especially the assignment of
NRS-BTF-LOCAL-REFERENCE-INVALID to admissibility at lines 287-292.

The new PROFILE-BTF-0004 and payload rules require an exact resolvable
result/analysis/design/dataset chain. The reasons section nevertheless calls
unresolved local references an admissibility failure and only explicitly places
type, required-member, unknown-property and Contract-constant faults before
admissibility. It never says where failed _semantic conformance_ of the new
representation is reported. This distinction affects whether integrity runs
and whether profile_eligibility becomes ineligible or not_evaluated.

A concrete prose counterexample is an otherwise well-shaped BTF payload with
design.design_id equal to D1 and analysis.design_id equal to D2, with no design
D2 in the Record. Both strings satisfy localId. Under the newly listed reason
classification, an implementation can report conformance pass, admissibility
completed/fail with NRS-BTF-LOCAL-REFERENCE-INVALID, integrity executed, and
profile_eligibility=ineligible. Another implementation can treat the required
representation chain as semantic conformance, fail conformance and leave gated
checks not_run and eligibility not_evaluated. The draft does not reconcile
those observably different reports. This is a logical witness against the
proposal text, not an executed test of a nonexistent BTF schema.

[NRS-VERIFY-0005](../../../spec/verification/public-checks.md#NRS-VERIFY-0005)
requires structural and semantic conformance to be reported separately from
public verification checks. The authoritative vocabulary defines conformance
against the declared structural and semantic scope. A schema-valid but broken
representation link is not resolved merely by calling it an unsupported
scientific design. The old dataset/design/analysis reference invariants and
PROV-0001 illustrate the distinction, but their Phase 1/2A bindings are **not**
automatically extended to BTF by this finding.

Requested bounded repair: explicitly assign the new representation's reference
resolution and unambiguous identity/association obligations to a named semantic-
conformance judgment and specify its report location and downstream gating.
Distinguish these from a well-formed false model assertion or a representable
unsupported cell count/design. In particular, distinguish a duplicate observation
identity or ambiguous cell association from a supported representation of a
repeated experimental unit. State each reason's applicable check and propagation
class. NRS-BTF-LOCAL-REFERENCE-INVALID may remain the proposed diagnostic name;
its name alone does not decide its category. If a narrower schema-only
conformance claim and a separate semantic judgment are intended, name both
scopes explicitly and keep semantic conformance separate under VERIFY-0005.

Add the corresponding positive/negative conformance and propagation fixtures to
the proposed coupling. If the chosen repair introduces BTF references in the
state-invariant registry, include that registry and its meta-schema grammar
change; otherwise do not add an unused extension. No numerical algorithm or
source acquisition is needed. This finding identifies an unclosed proposed
boundary, not proof that an implemented CORE rule has already changed.

### C-N1: complete the lifecycle mapping's outcome domain

Priority: NICE-TO-HAVE for opening; required before carrier/check issuance.
Location: candidate lines 299-305 and CORE-0022.

The new mapping covers completed/pass, completed/fail, absence, error and
not_run, but not completed/indeterminate. The preserved execution/outcome model
permits the latter and the new report preserves that model. For the BTF
admissibility carrier, either explicitly restrict completed outcomes to pass/fail
with a reasoned check-specific rule, or define its projection for indeterminate
without implying eligibility. The new check's operational domain is still held,
so this is not an additional opening blocker.

The current lifecycle.ts ternary maps any completed non-pass to ineligible.
That implementation is not normative authority for filling this gap; CORE-0016's
own explanatory text explicitly prohibits resolving a missing projection rule by
reference-code precedent. Add a carrier-domain/projection test when that rule
is fixed. No numerical indeterminacy rule is selected here.

## 6. Assessment of the repair's other choices

### Registry and version boundaries

Direct inspection confirms all four files are authoritative for json-structure.
The proposed changes cover the actual restrictions:

| Meta-schema                          | Concrete covered locations                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------- |
| interpretation-bundles.schema.json   | bundle_id, profile_id, allowed_check_ids, requirementId, new bundle-local contract_id |
| public-contract-surfaces.schema.json | applies_to_bundle_ids and requirementId                                               |
| public-checks-registry.schema.json   | check_sets[].check_ids, checks[].check_id, depends_on and requirementId               |
| reason-codes-registry.schema.json    | applicable_check_ids and requirementId                                                |

The legacy branch plus the appropriate exact HTTPS family is the proposed
acceptance set, not arbitrary URI acceptance. The current requirements grammar
already admits CONTRACT/PROFILE tokens starting with an uppercase letter and
containing 2-12 uppercase letters/digits. Namespace registration still precedes
issuance. Wrong-family, malformed-token, duplicate, unregistered-reference and
Contract-pin counterexamples are explicitly proposed fixture coverage.

The actual registry revisions are bundles 0.6.0, surfaces 0.5.0, checks 0.2.0
and reasons 0.9.0, matching the proposed additive next revisions. The current
unversioned urn:nrs:meta identities belong to snapshot-scoped meta-schemas;
the proposal preserves historical snapshot bytes and changes validation only
in the eventual new snapshot. New external Record/payload/report identities
are separately versioned. No old bundle meaning, schema constant or tolerance
is replaced. This is a review of the migration proposal, not proof that future
changed meta-schemas pass their fixtures.

Keeping existing canonicalization and attestation fields, unused CI constants
and existing scope_kind is correct for this scope. No unused family expansion
is required. The concrete schema-loader, exact-ID registry cross-check,
resources.ts, navigation and lifecycle coupling is named. Complete reason
applicability includes reused conformance/blocking reasons when the check set
is eventually issued; no inherited applicability is inferred from a name.

### Preserved rule scopes and successor bindings

VERIFY-0013/0017 are unqualified distinct-check/propagation constraints in their
owning clauses. The repair preserves them. Integrity independence from failed
admissibility remains distinct from the conformance gating question in C-S1.
CANON-0006 retains check-version tolerance ownership; CANON-0011 retains the
version/evidence prerequisite for empirical rejection thresholds.

VERIFY-0020 sits in the Welch recompute 0.2.1 section and has an explicitly
check-qualified registry note. PR 252's automatic BTF application is not adopted.
VERIFY-0021 has a general first paragraph about finite-statistic/positive-df
underflow, followed by a specific ITGC 0.2.1 failure/not_run disposition; its
registry note identifies that historical check scope. The candidate preserves
the non-exact-zero claim boundary without claiming the old bundle's failure
code or execution policy automatically applies to BTF. VERIFY-0026 concerns
the adopted squared-t incomplete-beta path; it does not select a factorial
graph or impose a t-squared reason on a graph that does not form t squared.

CORE-0020 supplies Contract no-dereference. VERIFY-0030 supplies exact target
interpretation from finite parsed binary64 inputs. PROFILE-BTF-0003 supplies
the successor finite/range/zero representation, PROFILE-BTF-0004 the local
Contract-bound chain, VERIFY-0032 independent integrity and no Record-supplied
code. These are explicit new bindings, not an implied rewrite of old
CORE-0004, CANON-0009, SEC-0002 or PROV-0001 scopes.

### Numbers, declarations and zero residual

The required boolean deliberately exposes only a single applicability assertion.
False is representable unsupported data; missing/wrong type is schema failure;
true does not establish the assumptions or reveal unreported data handling.
This is reviewable proposed policy and does not claim the ITGC structured-
declaration diagnostics are inherited.

Exact integer checks give maximum n=2251799813685247, maximum total count
4n=9007199254740988 and maximum residual df=9007199254740984. Each is within
2^53-1; the next n would make 4n exceed that bound. The lower df is four.
Exact count/df comparison is distinct from a future runtime resource limit.
Signed means/outcomes/contrasts, nonnegative SS/F, strictly positive declared
SSE and p in [0,1] are coherent structural domains. Negative-zero input rejection
and the absence of a distinct signed-zero scientific meaning remain compatible.

With true assertion, valid references, balanced distinct units and all values
constant within each cell, observed exact SSE is zero despite finite input.
An honest zero declaration is excluded structurally; fabricated positive SSE
and required F/tail fields cannot make the data numerically computable. The
proposed completed/fail zero-residual result and dependent not_run avoid both
undefined results and a global safety-refusal claim. If admissibility or
conformance already blocks execution, their earlier gating still applies;
the zero rule does not authorize bypassing it.

The exact-zero rule establishes no detector or floor for tiny positive SSE.
Rounding, uncertainty, projection, overflow, underflow and supported-domain
classification remain versioned numerical work. A structural p=0 allowance is
not exact-zero probability evidence or permission to match an underflowed tail.
Changing declared orientation is valid: factor exchange swaps A/B, reversal
changes the affected signed main contrast and AB, with the squared quantities
transforming accordingly. Incorrect retained numbers become keyed comparison
mismatches; orientation itself is not a refusal.

### Report completeness and surface ownership

The result-scoped association is unambiguous without a new scope kind. A complete
successful numerical comparison has 22 keys: 3 contrasts times 4 quantities,
4 cells times 2 quantities, plus SSE and residual df. Discriminator type is
determined by quantity; exact result scope, contrast kind or cell identity
provides association independently of array order. Key enumeration confirms
the count and uniqueness; it is not a BTF implementation test. A completed
success cannot omit a compared quantity; non-executed comparisons invent no
recomputed value or success. The existing error/not_run/outcome invariant is
retained. Future enclosures and tolerance metadata do not change the key scheme.

All eight required guarantee keys are explicit. The report owns new local
checkResult/scope/evidence definitions; a new top-level schema alone would not
make the old closed ITGC common definitions suitable. They remain unchanged.
PCS-0001's field-identical envelope precedent is respected; PCS-0014 excludes
the assertion that PCS-0015 owns, while PCS-0016 owns the report. PCS-0006,
0012 and 0013 receive only the appropriate additive bindings/applicability.
Current routing/refusal shapes remain reusable under exact dispatch. No
overall verification or scientific-validity claim is introduced.

### Allocation, science and Release 3

All 16 proposed requirements are absent at the baseline: CONTRACT-BTF-0001
through 0005; PROFILE-BTF-0001 through 0004; VERIFY-0029 through 0032; and
CORE-0020 through 0022. Both BTF prefixes, PCS-0014 through 0016, the six
listed HTTPS identities and proposed BTF reason names remain unissued. The
allocation separates mathematical targets, Profile declaration/representation,
numerical check procedure/evidence, envelope/digest and lifecycle mapping.
Numbers in a CORE namespace do not themselves assign the CORE stability tier.
The proposed EXPERIMENTAL/STABLE-INTENT split is supportable with preservation
of the actual existing higher-tier meanings.

The fixed 2-by-2 normal model, common positive finite variance, n at least two,
full interaction, sample/population distinction, three normalized contrasts,
SS identities, residual df and nuisance-unrestricted individual-null marginal
F law match the accepted scope. The source paper supplies cited criteria;
the separately reconstructed probability derivation supplies the remaining
proof. Shared SSE implies no joint error-control claim. No interval, causal,
historical, encoded-data calibration or conditional-admission guarantee was
added. No new retained premise requires another primary-source pass here.
S5 remains nonblocking only for this bounded claim; wider S5 and S1/S2/P1/S3/S4/S6
remain staged, not globally closed. Yates copies are not relied upon.

Release 3 README remains blob `4dbb5170f839f83ef22d3297dae832098d5cc95d` and
its 2026-09-06 readiness audit remains
`bc0bb942d429fe9a9ee4e959ea483972d4dbae4d`. All seven R3 preparation files and
the main authoritative interfaces are unchanged. The earlier reviewed main-tree
comparison therefore still applies: this proposal consumes no R3 protected-
family identifier, multiplicity procedure, schema or runtime, and has no R3
calendar dependency. This is not an updated audit of every R3 research branch.
Recheck main and actual dependencies immediately before an eventual opening.

## 7. Separate dispositions

| Item                            | Disposition                                                                                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Input / delivery                | MATCH; intact, complete fixed trees                                                                                                       |
| R4-P1: meaning and sources      | BOUNDED GO; accepted source/derivation evidence reused, no new retained premise or source-copy certification                              |
| R4-P2: first scope              | GO for discussion of the accepted bounded model and exclusions; no adoption                                                               |
| R4-P3: numerical feasibility    | BOUNDED GO for the explicit evidence/hold map; no supported graph, projection, tolerance or domain certified                              |
| R4-P4: Release 3                | BOUNDED GO at the unchanged main baseline; no new dependency                                                                              |
| R4-P5: standalone RFC           | REPAIR_REQUIRED for C-S1's semantic-conformance boundary; the other original draft-text repairs are confirmed                             |
| R4-P6: assembled opening review | Confirmation performed with the disclosed prior involvement; opening condition not met while C-S1 remains unresolved                      |
| Preparation                     | BOUNDED GO; continue the bounded prose repair and held numerical work                                                                     |
| Numerical support / issuance    | NOT_ESTABLISHED / HELD; complete check procedures, independent oracles, schemas, registries and coupled conformance remain prerequisites  |
| Tier                            | STABLE-INTENT / at least 30 days is supportable with preservation; any actual CORE change requires reassessment and CORE's 60-day process |
| Public opening                  | NOT_READY; no opening GO, URL, timestamp or earliest decision time is created                                                             |

The remaining opening step is a pinned repair/confirmation of C-S1 followed by
the separate opening decision. C-N1 is an issuance completion point. No new
independent scientific pass is demanded for the unchanged accepted derivation;
this review also does not pretend to provide one. Historic GO, author repair
and successful tooling do not close R4-P6 by themselves.

## 8. Verification and delivery

Environment: Node v24.19.0, pnpm 11.19.0, Python 3.12.14, Git 2.51.1.
The repository packageManager requests pnpm 11.7.0; 11.19.0 is the actual
available executable. Both new worktrees installed the unchanged lockfile with
`pnpm install --frozen-lockfile --ignore-scripts --offline`, using cached packages.
No dependency, authority, source or numerical artifact was edited.

| Actual invocation                                 | Fixed input at 60a7caf       | Final review delivery                          |
| ------------------------------------------------- | ---------------------------- | ---------------------------------------------- |
| pnpm format:check                                 | PASS                         | PASS                                           |
| pnpm lint:markdown                                | PASS; 403 files, zero issues | PASS; 405 files, zero issues                   |
| pnpm typecheck                                    | PASS                         | PASS                                           |
| node --import tsx tooling/src/validate.ts         | PASS                         | PASS                                           |
| node --import tsx tooling/src/generate.ts --check | PASS; 19 files match         | PASS; 19 files match                           |
| git diff --check                                  | PASS, parent to input        | PASS, input to delivery and delivery to review |

Direct node/tsx entry points were chosen from the outset, as permitted. No
wrapper failure is claimed. All required checks completed successfully. The
read-only object audit, integer-bound checks and evidence-key enumeration above
address the concrete preservation/representation questions. PR 251's structural
counterexample was read but not rerun: its inputs are unchanged and no remaining
finding depends on rerunning its diagnostic mutations. The response's rerun
claim remains author evidence, not a newly performed test here.

Full numerical/runtime suites were not run, as permitted for preserved numerical
artifacts. Existing repository validation cannot certify an unimplemented BTF
schema, procedure, supported domain or future fixture. No simulation or paper
acquisition was performed.

This branch, review/r4-opening-repair-confirmation-20260909, is based on the
pinned handoff delivery and adds only this previously unused review path. The
draft PR targets research/r4-opening-rfc-candidate. Its submission records the
resulting review commit, tree and blob. This record does not edit the candidate,
merge another review, allocate identifiers, ratify, publish or start discussion.
