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

This increment does not implement a runtime Student-t tail, freeze confidence-
interval critical values, select a supported domain or mathematical-truth error
bound, execute a Public Check, or dispatch the candidate bundle. Exact binary64
identity is only the selected candidate rule for reproducing the pinned graph; it is
not a claim of mathematical accuracy or cross-platform closure. The numerical
directory and certificate validator make the next R2-D5 evidence increment fail
closed; they do not dispose R2-D5 or supply an oracle result.
