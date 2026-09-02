# Release 2 Paired-t Candidate Surface

**Status: non-authoritative and unissued.** Every artifact in this directory is
decision-preparation material for the open Release 2 review. Nothing here allocates
a Requirement namespace, issues a Protocol identifier, registers support, changes a
public contract surface, or defines conformance judgment.

The candidate surface supplies concrete inputs for R2-D2 through R2-D4 without
crossing the current ratification stop:

- `requirement-namespaces.json` proposes collision-checked namespace tokens and the
  first unissued Requirement IDs and future anchors;
- `protocol-identifiers.json` proposes exact unissued HTTPS spellings, semantic
  owners, versioning policies, legacy coexistence, and an exact candidate bundle
  binding, including future schema paths and an explicitly ordered Public Check set;
- `schemas/` contains closed successor Record, Profile, execution-outcome, and
  verification-report schema candidates;
- `fixtures/` contains hand-authored candidate Record and report examples with
  expected schema and non-numerical relationship outcomes;
- `exact-dispatch-migration-matrix.json` pins the unchanged current routes and
  demonstrates that the unissued candidate and nearby spellings remain unsupported;
- `public-contract-surface-impact.json` classifies every existing surface as reused
  or intentionally non-applicable and proposes six contiguous, unissued successor
  surface candidates;
- `numerical/` records the approved candidate-development direction for the G4
  pairwise algebra graph, explicit computability classes, certificate-bundle closure
  rules, an exact-bit comparison and target-format projection decision candidate,
  and the numerical decisions that remain deliberately unfrozen; and
- `tooling/src/spikes/release-2-candidate.ts` validates the candidate manifests and
  the pair relationships that JSON Schema cannot express.

The files are deliberately outside `registries/`, `schemas/`, `conformance/`, and
`spec/`. They are not listed in the authority manifest or loaded by the reference
verifier. The candidate Record schema reuses the existing legacy JCS canonicalization
and common-identifier schema by exact identifier. Reuse is not aliasing, and no HTTPS
replacement is proposed for either legacy identifier.

Every candidate token, spelling, field, and fixture disposition remains replaceable
until ratification. Updating this draft PR is not issuance.

Numerical fields in the fixture Record and report are illustrative payload values
only. The fixture manifests assert structural validity, closed output shape, and
non-numerical relationship outcomes; they do not assert any p-value, interval
endpoint, tolerance, or supported numerical domain.

The report candidate retains the scoped execution/outcome model and the five
explicit `not_asserted` guarantee-boundary fields. It has no overall status,
significance boolean, whole-Record validity boolean, or attestation member. The
candidate bundle explicitly declares `attestation_support: none`.

The numerical directory now includes an executable Student-t series evaluation
candidate, a separate Arb evidence route, pointwise target-format transition
evidence, and a hash-bound evaluation connection to the independently reviewed
contiguous inverse-beta candidate table. The table-to-graph connection has also
passed independent adversarial review as a non-authoritative candidate integration.
It now also contains a fail-closed input-specific truth-error and projection-margin
candidate. That evaluator reproduces the unchanged graph, derives its bound with
exact rational arithmetic, and refuses inputs outside its proof preconditions. Its
analytic derivation and accepted repairs passed independent adversarial review as
non-authoritative candidate proof engineering. None is a supported runtime tail, a
selected truth-error predicate, or a final runtime-table selection. A separate
runtime-input and reason-code checkpoint now gives both candidate evaluation
entrypoints the same closed two-field input shape and proposes unissued spellings
only for the eleven already reviewed operation-stage failures. The input contract
and this partial inventory passed independent adversarial review as non-authoritative
decision-preparation material. The separate Group 4 successor preserves those eleven
entries exactly, maps the complete candidate relationship and declared-result
surfaces, and resolves the ten support-dependent vocabulary decisions against the
now-closed Groups 1–3 candidate boundaries. That successor is still unissued,
unfrozen, and pending exact-head independent review; it changes no registry or Public
Check.

A separate upstream G4 candidate derives the paired differences, mean difference,
sample variance, standard error, test statistic, and degrees of freedom from one
immutable actual-execution trace. Every recorded binary64 arithmetic or square-root
node is checked by the same exact primitive verifier used by the reviewed tail-only
candidate, and the verifier reconstructs the fixed recursive schedule and result
from the trace-bound paired observations. The existing G4 reference graph remains
unchanged. The implementation's independent adversarial review found two refusal-
classification blockers; the bounded repair closed both in a fixed close-only review
with no additional findings. The G4 trace is therefore recorded as independently
reviewed, unissued, non-authoritative decision-preparation material. The 201-pair and
2,048-node ceilings remain review evaluation limits, not supported resource bounds.

The G4 trace is now connected to the reviewed Student-t tail trace by a separate
immutable composition candidate. That composition starts from raw paired
observations, re-verifies both nested traces, requires exact bit-level equality of
the G4 test statistic and integer df at the tail handoff, and binds the returned
p-value to the verified tail outcome. Its independent adversarial review returned
`GO` with no findings after 291 reviewer-owned checks. The actual-execution composition review requirement is closed. The separate G4
mathematical-truth error candidate has also passed independent adversarial review
against an independently constructed exact-rational oracle. Its bounded disposition
closes the G4 truth-error readiness requirement for the trace-bound algebraic
quantities only. Student-t tail numerical truth and confidence-interval composition
remain pending, so the candidate still claims no supported execution, platform,
domain, or runtime. The bounded dispositions are in
`reviews/d5-g4-execution-trace-adversarial-review-disposition.md`,
`reviews/d5-g4-tail-trace-composition-adversarial-review-disposition.md`, and
`reviews/d5-g4-truth-error-adversarial-review-disposition.md`.

The supported-execution research is followed by a separate candidate evaluator that
derives the returned tail value and its proof inputs from one immutable trace. It
exactly rechecks every traced binary64 arithmetic primitive and square root and adds
startup plus per-invocation diagnostics. The existing reviewed graph and proof
sources remain unchanged. The tail-only implementation passed independent
adversarial review as an unissued, non-authoritative candidate. A close-only Section
H supplement also reproduced the platform-neutral trace and proof projection across
the fixed five-runner set, with retained cold and warmed manifests. That finite review
evidence is not a complete admission matrix. The candidate intentionally contains no
selected runtime allowlist, does not yet enforce the controlled process profile, and
has no complete cross-platform admission corpus; consequently it cannot claim a
supported execution, platform, domain, or runtime. The bounded disposition is in
`reviews/d5-supported-execution-predicate-adversarial-review-disposition.md`.

This increment does not freeze confidence-interval critical values, select a
supported domain or mathematical-truth error bound, execute a Public Check, or
dispatch the candidate bundle. Exact binary64 identity is only the selected
candidate rule for reproducing a pinned graph; it is not a claim of mathematical
accuracy or cross-platform closure. The numerical validators make R2-D5 evidence
fail closed; they do not dispose R2-D5 or authorize support.
