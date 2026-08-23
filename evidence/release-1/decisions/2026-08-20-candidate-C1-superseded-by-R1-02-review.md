# Release 1 Candidate C1 Supersession — R1-02 Primary-Source Review

**Date:** 2026-08-20
**Reviewer:** release steward / adversarial review agent
**Affected gate:** R1-02
**Disposition:** candidate replacement required

## Finding

Candidate C1's public comparison stated that IEEE 2791-2020 BCO did not define how its
`etag` is computed and treated several elements as wholly unrepresentable. The
candidate-scoped review checked the BioCompute Consortium guide and the JSON Schema
files in `biocompute-objects/BCO_Documentation` at commit
`026553409157283c8644feee1624c0b9dba963a9`.

The sources establish that:

- the BCO guide defines `etag` as SHA-256 over object content excluding `etag`,
  `object_id`, and `spec_version`;
- `extension_domain` permits schema-identified user-defined structured fields;
- `error_domain` is deliberately open-ended under `empirical_error` and
  `algorithmic_error`;
- the checked-in comparative BCO used obsolete/invalid fields, extra `_note`
  properties, and a placeholder `etag`.

These findings do not show that BCO provides nomue's native statistical-verification
semantics. They do show that C1 overstated the absence of BCO mechanisms and used an
unvalidated comparison artifact.

## Required repair

1. replace the comparative BCO with an IEEE 2791 schema-valid representation;
2. compute a real example `etag` and document the serialization boundary honestly;
3. revise the comparison to distinguish native BCO semantics from custom extensions;
4. preserve the narrower differentiation claim: nomue natively defines scoped
   statistical declarations, recomputation evidence, and guarantee boundaries;
5. reset candidate C1 and rerun all candidate-scoped Evidence against a successor.

## Release-control consequence

This is a frozen public-surface change, not mutable evidence-only state. Therefore:

- C1 is superseded;
- `release_candidate_id` returns to `null`;
- the current freeze manifest is removed;
- all gates remain open;
- the successful C1 internal Evidence run `32354295095` closes no gate and is not
  reused as successor-candidate Evidence.
