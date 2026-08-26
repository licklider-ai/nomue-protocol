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
  owners, versioning policies, legacy coexistence, and a bundle binding;
- `schemas/` contains closed successor Record and Profile schema candidates;
- `fixtures/` contains hand-authored candidate examples with expected schema and
  relationship outcomes; and
- `tooling/src/spikes/release-2-candidate.ts` validates the candidate manifests and
  the pair relationships that JSON Schema cannot express.

The files are deliberately outside `registries/`, `schemas/`, `conformance/`, and
`spec/`. They are not listed in the authority manifest or loaded by the reference
verifier. The candidate Record schema reuses the existing legacy JCS canonicalization
and common-identifier schema by exact identifier. Reuse is not aliasing, and no HTTPS
replacement is proposed for either legacy identifier.

Every candidate token, spelling, field, and fixture disposition remains replaceable
until ratification. Updating this draft PR is not issuance.

Numerical fields in the fixture Record are illustrative payload values only. The
fixture manifest asserts schema validity and non-numerical relationship outcomes; it
does not assert any p-value, interval endpoint, tolerance, or supported numerical
domain.

This increment does not implement Student-t tails, confidence-interval critical
values, numerical tolerances, support bounds, Public Check execution, or bundle
dispatch. Those remain gated by R2-D5 and the final Release 2 decision.
