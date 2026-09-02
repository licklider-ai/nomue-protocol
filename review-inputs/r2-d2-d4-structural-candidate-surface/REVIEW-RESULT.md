# Release 2 D2-D4 structural candidate surface independent review result

## Verdict

GO

The exact PR #158 head `ba7f2e1052d6b5ccd71d8f06d029c61cc854cd04` may be
considered for merge as the review protocol for the existing
non-authoritative, unissued Release 2 D2-D4 structural candidate surface,
and that surface, as pinned by the protocol, was independently revalidated
as internally consistent, closed, collision-free, and fail-closed. Findings:
zero BLOCKER, zero SHOULD-FIX, one NICE-TO-HAVE (section 9).

Per protocol section L, `GO` means only that the exact head contains an
internally consistent, independently revalidated, non-authoritative and
unissued D2-D4 structural decision-preparation surface whose namespace,
identifier, schema, fixture, dispatch, bundle, and public-surface bindings
are suitable for later Steward consideration after the RFC window. It does
not approve or dispose R2-D2, R2-D3, or R2-D4; it does not allocate a
namespace or Requirement ID, issue any identifier, schema, Public Check,
surface, or bundle, register conformance or verifier support, close
RFC #25, or complete Release 2. Any different head requires a new
independent exact-head review.

## 1. Exact identity and permitted delta (protocol B)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#158` (branch `r2-d2-d4/structural-candidate-review-protocol`)
- Reviewed head: `ba7f2e1052d6b5ccd71d8f06d029c61cc854cd04`
- Reviewed tree: `82fc8bf0498be1bac622151c3d38676de55e9985`
- Sole parent, base, and merge base:
  `a57fb63c5fe067a4d64c57a27d5cd94ed76502ba` (the final R2-D5
  review-result preservation merge, tree
  `b424447c7e1fe6ff64ab3c5646dd784ae60d4ece`; live `main` at review start
  and end)
- Delta: exactly one added path, `+303/-0` — the review protocol itself
- Review date: `2026-09-02` (UTC)

The live PR head was compared with the pinned head before review began and
after all review work completed; it matched both times, and `main` did not
advance, so no synthetic merge was required. Because the increment adds
only the protocol, every candidate, authority, registry, schema, fixture,
conformance, generated, spec, reference, tooling, test, durable review,
RFC, Release 1, and R2-D5 byte is identical to the base by construction of
the one-path delta, and this was confirmed with a whole-tree diff.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context. No declared blob SHA, count, identifier,
registry claim, or fixture expectation was trusted: all sixteen pinned
source blobs were resolved from Git objects; every candidate value was
reconstructed from the authoritative registries and repository bytes with
an independent Python harness (including an independent JSON Schema
implementation) plus a reviewer-owned TypeScript battery; and every
fixture disposition was re-executed from its declared source. All
harnesses were temporary files outside the repository; this result file is
the review's only repository artifact.

## 3. Source identity and authority boundary (protocol C)

All sixteen Section C bindings were independently recomputed from Git
objects: 16/16 blob SHA-1 values match at the exact head and are
byte-identical at the base. `AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, the
authority manifest, the Requirement registry, the identifier policy
(ADR-0031/ADR-0032), the RFC process, the stability-tier registry, the
interpretation-bundle registry, the public-check registry, the
public-contract-surface registry, and the Release 2 Steward ratification
package were read; all are byte-identical to the extensively reviewed
R2-D5 closure state. The candidate root is absent from the authority
manifest, every reviewed candidate file declares
`non_authoritative_candidate` and `unissued`, and the reference verifier
does not consume any candidate artifact. A programmatic search of every
authoritative artifact named by the authority manifest found no candidate
HTTPS spelling and no candidate surface ID; no candidate namespace,
Requirement ID, identifier, Public Check, bundle, surface ID, or future
authoritative schema path is issued, occupied, aliased, or treated as
supported.

## 4. R2-D2 Requirement namespace candidates (protocol D)

Independently reconstructed from `registries/requirements.yaml` and the
candidate file: exactly one Contract namespace (token `PT`, prefix
`NRS-CONTRACT-PT`) and one Profile namespace (token `PTCC`, prefix
`NRS-PROFILE-PTCC`); six contiguous first candidate IDs `0001`-`0006` in
each namespace; twelve distinct candidate IDs, every state `unissued`,
every future anchor equal to its candidate ID, every future document under
a safe normalized `spec/` Markdown path, and non-empty titles, meanings,
and rationales. The ADR-0032 token grammar (uppercase, `A-Z` start,
`A-Z0-9`, 2-12 characters) was verified independently against the policy
text. No collision exists with any registered namespace prefix, issued or
tombstoned Requirement ID, or the existing `NRS-PROFILE-ITGC` namespace.
`PT` is Contract-specific; `PTCC` remains Profile-specific and explicitly
reusable by a later non-t Contract. Cross-reference coverage is exact: the
six new public-surface candidates reference all twelve D2 candidate IDs
and nothing unknown, and every non-candidate Requirement reference
resolves to an issued, non-withdrawn registered Requirement.

## 5. R2-D3 permanent identifier candidates (protocol E)

All twelve candidate identifiers were parsed with an independent lexical
implementation and re-run through the repository HTTPS validator: exact
canonical `https://nomue.ai/id/<family>/<name>/<revision>` spellings,
spelling equal to its components, kebab-case family and name, draft
revision grammar, uniqueness of keys and spellings, and `unissued` state.
The role set is complete and exact: one Contract, one Profile, four
schemas, one Interpretation Bundle, and five ordered Public Checks. No
identifier uses the `method` family, so the paired-t Contract receives no
duplicate method identity. Twenty-one reviewer lexical attacks (scheme,
host case, port, userinfo, query, fragment, percent-encoding, dot and
empty segments, trailing slash, family/name case, Unicode hyphens and
homoglyph host, malformed kebab case, extra segments, unrecognized family)
were all rejected; exact string identity governs equality.

The four exact legacy reuses (JCS canonicalization, common identifier
schema, routing envelope, verifier refusal) retain their existing
`urn:nomue:` identifiers with no HTTPS alias; each URN was verified to
exist in the repository with its declared meaning (registry pin or schema
`$id`). The bundle binding binds exactly one Contract, one Profile, four
schema roles, the exact reused canonicalization identifier, and five
ordered Public Checks with `ordered_as_listed` semantics;
`attestation_support` is `none`; conformance and verifier support states
are `candidate_not_registered`. All four future authoritative schema paths
are unoccupied and the legacy reuse path exists.

## 6. R2-D4 closed schema surface (protocols F)

All four candidate schemas were compiled with the repository Ajv 2020-12
validator and independently with Python `jsonschema` 4.26; both accept the
valid Record and report fixtures. Every candidate `$id`, `$ref`, and const
Contract/Profile/Check identity equals the D3 candidate in both
directions, including the payload `$ref` to the Profile schema, the
`contract_id` const, the conformance check const, the execution-outcome
check-identity set with versions, and the report's ordered `prefixItems`.
Every owned object boundary is closed with `additionalProperties: false`;
the fifteen remaining object nodes without that keyword were individually
proven to be constraint applicators (if/then invariants, check-identity
`oneOf` pins, and report `prefixItems` refinements) whose property sets
lie entirely within the closed `checkResult`/`conformanceResult` bases
they compose with via `allOf`. The schemas declare explicit dataset,
observation, experimental-unit, pair, condition, and outcome identities;
exactly two conditions with explicit unique order; explicit one-to-one
pair membership with no position- or label-inferred pairing; the
design-to-dataset, analysis-to-design, and result-to-analysis links;
explicit grouping, independence, repeated-measurement, clustering,
population, missingness, transformation, and weighting declarations;
direct `analysis.contract_id` with no `method_id` alias anywhere in the
candidate surface; and the first-condition-minus-second-condition
direction, arithmetic-mean estimand, two-sided alternative, and fixed-95
interval fields at the declared result shape. The report surface carries
only scoped results with explicit `not_asserted` guarantee boundaries — no
overall `VERIFIED`, significance boolean, scientific-validity pass,
attestation, approval, standardized effect size, or extension point.
A boundary numeric probe confirmed the schema layer also rejects a
non-finite JSON encoding (`1e999`) for outcome values.

## 7. Fixtures, relationships, dispatch, and public surfaces (protocol G)

All ten Record fixture dispositions and all ten report fixture
dispositions were re-executed from their declared sources with a
reviewer-owned strict JSON-pointer implementation: 20/20 match the pinned
schema judgments, pinned failing keywords, and pinned relationship code
sets. The candidate validator's 25 relationship classifications were
independently enumerated, and 35 reviewer-owned cases (including pair
duplication, missing mate, condition duplication, order coverage,
cross-dataset and cross-binding references, experimental-unit
inconsistency, undeclared properties at several depths, and boundary
numeric encodings) exercised every one of the 25 codes at least once;
an explicit condition-order reversal remains an explicitly declared
different analysis rather than a silent reinterpretation, and negative
zero remains structurally admissible with finiteness owned by the
numerical computability boundary.

The migration matrix was proven against the current registry and router:
all three registered legacy bundles route `selected` with
registry-pinned schema paths and identities; the three unsupported
exact-match probes and twelve additional reviewer near-match probes
(revision bumps, name variants, case, trailing slash, percent-encoding,
scheme, whitespace, URN case) are all refused as `unsupported_bundle`
with `NRS-UNSUPPORTED-BUNDLE`; a Release 2-shaped Record carrying each
legacy bundle routes to the legacy surface and fails its conformance
there, acquiring no Release 2 meaning; and a legacy Record carrying the
unissued candidate bundle is refused pre-dispatch. Public-contract-surface
impact was reconstructed independently: the thirteen registered surfaces
are classified exactly once (four exact reuses with no meaning change,
nine explicit non-applicable preservations), the six new candidates are
the contiguous, collision-free, unissued `NRS-PCS-0014`-`NRS-PCS-0019`,
every declared path resolves through the named candidate schema (verified
with an independent resolver), the reused Record surfaces' registered
paths resolve on the candidate Record schema, and every breaking-change
and silent-reinterpretation policy remains explicit.

## 8. Cross-artifact consistency (protocol H)

An independent graph over D2 IDs, D3 identifiers and bundle roles, D4
schema identities and refs, fixture roots, check order, migration rows,
and public-surface paths found no orphan, duplicate, cycle, alias,
missing edge, or conflicting semantic owner. The Section H equalities
hold in both directions, including: D2 IDs versus public-surface
references; D3 schema keys versus schema `$id` values versus bundle
schema bindings; Contract/Profile keys versus schema consts; Public Check
order versus execution-outcome identities versus report prefix order;
bundle key and spelling versus the migration matrix; valid fixture
identities versus schema consts and refs; and public-surface schema
keys and paths versus resolvable schema nodes.

## 9. Adversarial and fail-closed validation (protocol I)

A reviewer-owned battery ran against the five candidate validators, the
compiled schemas, and the router: 420 rejected attacks (399 structural
and semantic mutations across every decision-bearing scalar, object, and
array — issuance and support claims, collisions, aliases, anchor drift,
unsafe paths, grammar violations, order and count changes, duplicate and
dropped entries, registry drift, legacy-breaking rows — plus 21 lexical
identifier attacks); 70 prose-field mutations accepted by design
(titles, meanings, rationales, owners, policies, reasons — anchored by
the Git blob pins); 73 mutations whose rejection was demonstrated at
their anchoring layer (public-surface path strings at the resolution
layer; a dropped candidate Requirement at the cross-reference coverage
layer; probe and policy strings at the router-behavior and reviewer
verification layer); and 7 coherent multi-file substitutions (contract
revision rename, bundle rename, check-order swap, schema rename, opened
record root, opened Profile payload boundary, dropped D2 ID) each caught
by the cross-artifact consistency or fixture layer rather than accepted
on local agreement. All results were deterministic; accepted inputs were
not mutated; zero attacks were wrongly accepted; and on the declared
JSON-file surface there were zero exception leaks.

Hostile-shape characterization (60 cases) established the declared
boundary of these decision-preparation validators, recorded as the single
finding below.

### Finding N-1 (NICE-TO-HAVE): decision-file validators do not close their own key surface

The five D2-D4 validators validate only their declared field surface:
they silently accept undeclared keys (JSON-expressible) and JS-only
hostile values attached to unread fields; they throw on non-object roots
instead of returning a fail-closed error list; they invoke
caller-provided accessors (5/5 surfaces); and they do not themselves pin
the routing-envelope and verifier-refusal reuse URNs, the two
cross-shape policy strings, or the illustrative near-match probe IDs.
They therefore must not be cited as fail-closed evidence outside the
declared-field JSON surface they actually validate. This is a missing
hardening claim rather than an accepted semantic attack: every real call
path (loadJson of Git-pinned files inside Vitest) fails loudly on a
thrown error, the reviewed files carry zero undeclared keys (audited),
every non-validator-pinned value was independently verified correct at
this head (URNs against real schema `$id`s, policy strings against
router behavior, probes re-run), and byte integrity rests on the Section
C Git blob pins plus the cross-artifact checks and the closed Ajv layer.
Recommended hardening, not required for this decision-preparation
surface: exact-key, fail-closed validation in the style of the R2-D5
checkpoint validators.

## 10. Regression, hosted checks, and environment (protocol J)

`pnpm install --frozen-lockfile` succeeded. In this review environment
the full `pnpm check` wrapper reached `pnpm test`, where the full Vitest
suite ran 55 files / 520 tests with 518 passing and two failing solely by
exceeding their in-source 30-second and 60-second time limits on this
slowed container: the pre-existing R2-D5 heavy numerical replays in
`paired-t-candidate-supported-scope-resource-bounds.test.ts` and
`paired-t-supported-execution-candidate.test.ts`, both untouched by this
one-path delta. Both were proven environment-only by timeout-free
reviewer replays of the same staged checks at the exact head (17/17
boundary/witness checks; 200/200 df graph/proof equivalence). Every other
wrapper stage was green at the exact head: format, Markdown lint,
typecheck, `validate: OK`, `check:generated` (19), Phase 1, Phase 2A, and
Phase 2A-021 (the post-test stages run individually). The focused
`https-identifier` and `release-2-candidate` suites pass 2 files /
33 tests. Hosted CI on the exact head is green: run `33629108914`, 5/5
jobs (Full check Linux x64, Full check Linux x64 Node 24, Phase 1 + 2A on
Linux arm64, macOS arm64, Windows x64), independently verified to report
head SHA `ba7f2e1052d6b5ccd71d8f06d029c61cc854cd04`.

## 11. RFC and mandatory non-promotions (protocol K)

Issue #25 was inspected live at review start and end: open, public review
window OPEN, earliest decision `2026-09-25T20:52:54Z` unchanged. Every
reviewed artifact remains non-authoritative and unissued: no Requirement
namespace or ID is allocated; no HTTPS identifier, schema, Public Check,
surface, or bundle is issued; no conformance or verifier support is
registered; no legacy identifier is aliased; no Release 1 byte or meaning
changes; and no R2-D2, R2-D3, R2-D4, R2-D5, RFC, or Release 2 decision is
made or advanced by this review.

## 12. Binding

This result is bound to exactly
`ba7f2e1052d6b5ccd71d8f06d029c61cc854cd04` and approves merge
consideration of the D2-D4 structural-candidate review protocol only,
with the reviewed candidate surface revalidated as decision-preparation
input. It does not merge the PR and does not approve or dispose R2-D2,
R2-D3, or R2-D4, which remain separate Steward decisions no earlier than
the RFC boundary.
