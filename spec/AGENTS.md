# Agent Instructions - spec/

Rules for editing specification documents. Root rules in
[../AGENTS.md](../AGENTS.md) also apply.

## Normative writing rules

- Binding clauses use the uppercase keywords `MUST`, `MUST NOT`, `SHOULD`,
  `SHOULD NOT`, `MAY`. In any other text (informative notes, readmes, examples)
  write these words in lowercase or wrap mentions in backticks; the normative lint
  treats every uppercase, non-code occurrence as a binding clause.
- Each binding clause lives in a single paragraph bound to exactly one Requirement
  ID. Do not mix two Requirement IDs in one paragraph.
- Requirement anchor format, inside the same paragraph as the clause:

  ```markdown
  <a id="NRS-GOV-0001"></a>
  **NRS-GOV-0001 - Title** (stability: CORE, status: active)
  The nomue Record repository MUST ...
  ```

- Informative text is introduced explicitly (for example a paragraph starting with
  `Informative note:`) and is never mixed into a requirement paragraph.
- The normative text in the document is the single source of the clause wording.
  The registry entry in `../registries/requirements.yaml` carries the ID, status,
  stability, location, and references - never a duplicate copy of the wording.

## Change discipline

- These rules also apply to the normative documents under
  `../canonicalization/`, which are part of the same lint and traceability
  scope.
- Adding, changing, or removing a binding clause requires updating
  `../registries/requirements.yaml` in the same change set, following
  [../governance/ID-POLICY.md](../governance/ID-POLICY.md). A new normative
  field requires a Requirement ID.
- A change that touches the public contract also updates the affected schemas,
  positive and negative conformance fixtures, and
  `../registries/public-contract-surfaces.yaml` (recording schema-version
  impact), or records the gap in a release gate.
- A public-check semantic or tolerance change is a check-version change in
  `../registries/public-checks.yaml` with rationale and test vectors; a Record
  never carries tolerances.
- Formulas are written once, human-readably, in their owning document
  (`profiles/independent-two-group-continuous/welch-calculation.md`); other
  documents reference them instead of restating them.
- Do not invent fields for out-of-phase capabilities (attestation, approvals,
  figures, effect sizes, missingness, extensions).
- Open questions go into a release gate or an explicitly informative reserved
  section, never into a binding clause.
