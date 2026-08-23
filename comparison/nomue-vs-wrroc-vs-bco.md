**Informative, non-normative. Candidate-scoped source review completed for Release 1.**
Field-by-field comparison of the semantic elements in the synthetic canonical case
([../examples/canonical-case-wetlab-01/](../examples/canonical-case-wetlab-01/README.md))
against how the same content is represented in a Workflow Run RO-Crate (WRROC) and an
IEEE 2791-2020 BioCompute Object (BCO). Both comparison targets were actually built
for this case:

- [WRROC representation](../examples/canonical-case-wetlab-01/wrroc/ro-crate-metadata.json)
- [BCO representation](../examples/canonical-case-wetlab-01/bco/bco.json)

The comparison asks whether each format defines a **native, interoperable semantic
contract** for the element. A custom extension can always carry additional JSON, but
that does not make the extension's meaning part of the base format.

## Source and validation boundary

WRROC classifications are based on the Workflow Run RO-Crate 0.5 profile pages and
the RO-Crate 1.1 context consulted during authoring. The example remains syntactically
valid JSON and structurally plausible, but it has not been validator-certified.

BCO classifications were rechecked on 2026-08-20 against the BioCompute Consortium
user guide and the IEEE 2791 JSON Schema files in
`biocompute-objects/BCO_Documentation` at commit
`026553409157283c8644feee1624c0b9dba963a9`. The checked-in `bco.json` validates
against that schema set. The upstream repository describes these files as historical
supporting material and points to IEEE 2791-2020 as the definitive standard, so this
document does not claim to replace an IEEE standards interpretation.

The BCO example uses a real SHA-256 `etag`. The BCO guide defines the fields excluded
from that hash; because it does not pin nomue's JCS/domain-separated digest procedure,
this example uses a documented sorted-key compact UTF-8 JSON serialization. That is an
example implementation choice, not a claim of universal BCO canonicalization.

## Classification key

| Code                                                | Meaning                                                                                                                                                                                                |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ① No native representation                          | The base format defines no native standard field or convention for this element. A custom extension or opaque linked file may carry it, but the base format does not define the extension's semantics. |
| ② Representable, but semantics are not standardized | A native generic field can hold the value, but the base format does not standardize the intended meaning strongly enough for independent implementers to agree.                                        |
| ③ Representable, but no check rule                  | A well-defined field and meaning exist, but the base format does not define a machine-checkable rule establishing correctness or consistency for this use.                                             |
| ④ Already addressed by existing mechanisms          | The format already has a standard, checkable mechanism for this; nomue adds nothing material for this row.                                                                                             |

Three axes per row: **Representation** (native representation), **Check**
(machine-checkable correctness rather than human-readable presence), and
**Acceptance input** (whether the base format's own semantics provide scoped input to an acceptance decision). Custom
extensions are acknowledged explicitly but are not counted as native semantics.

---

## nomue Record vs. Workflow Run RO-Crate (WRROC)

| Semantic element                                                                                                | Representation | Check | Acceptance input | Basis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------- | -------------- | ----- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Record/revision identity, revision immutability                                                                 | ②              | ①     | ①                | RO-Crate's root `@id`/`identifier` hold an ID ([ro-crate-metadata.json](../examples/canonical-case-wetlab-01/wrroc/ro-crate-metadata.json) `"./"` entity), but WRROC defines no "this exact revision is immutable and content-addressed" contract analogous to nomue's `NRS-CORE-0004`/`NRS-CORE-0005` ([../spec/core/record-envelope.md](../spec/core/record-envelope.md)); nothing revision-scoped to check.                                                                                              |
| Whole-document content integrity (digest)                                                                       | ①              | ①     | ①                | RO-Crate's `sha256` property exists per-File entity (e.g. usable on `dataset.csv`), not on the crate as a whole; no analog to nomue's `integrity.content_digest` over the entire canonical form (`NRS-CORE-0006`, [../canonicalization/record-canonicalization.md](../canonicalization/record-canonicalization.md)). Confirmed by attempting it: `ro-crate-metadata.json` has no whole-crate digest field to fill.                                                                                          |
| Raw per-observation dataset with stable per-row IDs                                                             | ②              | ①     | ①                | No native tabular-observation model; represented as a plain `File` pointing at [dataset.csv](../examples/canonical-case-wetlab-01/wrroc/dataset.csv) with a free-text `description`, exactly as filled in during authoring - the per-observation `observation_id`/`experimental_unit_id` structure nomue's schema requires (`schemas/profiles/itgc-guarantee-0.2.schema.json`) has no counterpart csv-schema-level check in the crate itself.                                                               |
| Admissibility declarations (pairing, repeated measurements, clustering, missingness, transformation, weighting) | ①              | ①     | ①                | No field of any kind was found for this in the pages consulted; nomue's `design.declarations`/`design.data_handling` ([../spec/profiles/independent-two-group-continuous/admissibility.md](../spec/profiles/independent-two-group-continuous/admissibility.md)) has no WRROC counterpart, and none was added to `ro-crate-metadata.json` for lack of anywhere to put it.                                                                                                                                    |
| Pinned analysis method + estimand + confidence level                                                            | ②              | ③     | ②                | `#pv-alternative`/`#pv-confidence_level` `PropertyValue` entities hold the values as free-standing name/value pairs (`exampleOfWork` could in principle point at a `FormalParameter` definition, per the Provenance Run Crate page, but none was authored here); a value is present and typed, but no schema constrains it against a fixed method identifier the way `NRS-VERIFY-0009`/`registries/public-checks.yaml` tolerance policy does.                                                               |
| Declared statistical results (group summaries, effect estimate, CI, test statistic)                             | ③              | ②     | ②                | Each number got its own `PropertyValue` (`#pv-mean-difference` etc.) with a `name` and `value` - real fields exist and are individually inspectable - but WRROC has no schema saying "an effect estimate has an estimate, a standard error, and a CI with a named method" the way `schemas/profiles/itgc-guarantee-0.2.schema.json`'s `effect_estimate` def does; the CI's method and confidence level had to go into a free-text `description`, not a structured field.                                    |
| Independent recomputation verification evidence (per-check execution/outcome/reason codes, tied to scope)       | ①              | ①     | ①                | WRROC's `CreateAction` records that a run happened and connects `object`/`result`, but has no concept of "this specific number was independently recomputed and compared, and here is the pass/fail per check" - nomue's `verification_results` ([../spec/verification/verification-report.md](../spec/verification/verification-report.md)) is a different kind of artifact (a report ABOUT a run) that WRROC does not model at all.                                                                       |
| Verification depth classification (calculation/consistency/signature evidence, claim posture)                   | ①              | ①     | ①                | No WRROC concept corresponds to `registries/public-checks.yaml`'s four-way depth classification (`generated/PUBLIC-CHECKS.md`); this is specific to nomue's verification-report model, not a research-object packaging concern WRROC addresses.                                                                                                                                                                                                                                                             |
| Explicit non-claim boundary (`guarantee_boundary`: `not_asserted`, distinct from `unknown`/`passed`)            | ①              | ①     | ①                | No WRROC field states "this claim was not evaluated, as distinct from evaluated-and-unknown or evaluated-and-passed" ([../spec/core/verification-principles.md](../spec/core/verification-principles.md) `NRS-VERIFY-0003`); the entire concept of a guarantee boundary is absent.                                                                                                                                                                                                                          |
| No single overall status; relying party reads scoped results independently                                      | ④              | ④     | ④                | This is arguably not something WRROC needs to solve, since WRROC (correctly, for its own purpose) also has no overall-status concept - a `CreateAction` succeeding or failing is itself already scoped to that one action. Listed as "existing method already solves this" honestly: WRROC's silence here is not a gap relative to nomue's own no-overall-status requirement (`NRS-VERIFY-0001`), it is the same design choice for a different reason (WRROC never tried to assert one in the first place). |

## nomue Record vs. IEEE 2791-2020 BioCompute Object (BCO)

The BCO base schema includes `object_id`, `spec_version`, an `etag`, provenance,
workflow description/execution, parameter, I/O, and error domains. It also permits
schema-identified extensions. The distinctions below therefore separate **native BCO
semantics** from information that can only be added through a project-specific
extension.

| Semantic element                                                                                                | Representation | Check | Acceptance input | Basis                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------- | -------------- | ----- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Record/revision identity, revision immutability                                                                 | ③              | ③     | ②                | BCO natively defines `object_id`, `spec_version`, provenance versioning, and `etag`. The guide defines the `etag` as SHA-256 over all top-level content except `etag`, `object_id`, and `spec_version`. This is meaningful integrity/version metadata, not an absence. Unlike nomue's pinned domain-separated JCS projection, however, the public guide/schema does not itself provide the same revision-scoped canonicalization and verifier outcome contract. |
| Whole-document content integrity (digest)                                                                       | ②              | ③     | ②                | The BCO `etag` covers most object content but deliberately excludes three top-level identity/version fields. It therefore does not bind the exact whole document in the same way as nomue's `integrity.content_digest`. The checked-in example computes a real SHA-256 `etag` using a documented deterministic serialization, while making no cross-implementation canonicalization claim.                                                                      |
| Raw per-observation dataset with stable per-row IDs                                                             | ①              | ①     | ①                | `io_domain.input_subdomain` natively references input files. It does not define a tabular observation model with per-row observation and experimental-unit identifiers. A schema-identified extension could add one, but that meaning would come from the extension rather than IEEE 2791 itself.                                                                                                                                                               |
| Admissibility declarations (pairing, repeated measurements, clustering, missingness, transformation, weighting) | ①              | ①     | ①                | No native BCO domain standardizes this declaration set. Free text or a custom extension can carry it, but independent BCO implementations do not receive the nomue ITGC admissibility semantics from the base standard.                                                                                                                                                                                                                                         |
| Pinned analysis method + estimand + confidence level                                                            | ②              | ③     | ②                | `parametric_domain` natively carries `{param, value, step}` entries tied to a pipeline. It can hold `alternative`, `confidence_level`, or a method identifier as generic parameters, but the base schema does not distinguish a statistical method identity and estimand contract from ordinary implementation parameters.                                                                                                                                      |
| Declared statistical results (group summaries, effect estimate, CI, test statistic)                             | ①              | ①     | ①                | Native `io_domain.output_subdomain` points to output files rather than defining individually typed statistical result values. A custom extension can define those values, but the base BCO schema does not supply the result semantics or consistency rules used by nomue's profile.                                                                                                                                                                            |
| Independent recomputation verification evidence (per-check execution/outcome/reason codes, tied to scope)       | ①              | ①     | ①                | BCO's `error_domain` describes empirical and algorithmic error information; it does not natively define a separate scoped recomputation report with execution, outcome, reason codes, and evidence. Such a report can be linked or extension-defined, but is not a base BCO semantic.                                                                                                                                                                           |
| Verification depth classification (calculation/consistency/signature evidence, claim posture)                   | ①              | ①     | ①                | The execution domain identifies scripts and prerequisites, but the base standard does not classify a verification check as recomputation, consistency checking, or signature verification with an explicit claim posture.                                                                                                                                                                                                                                       |
| Explicit non-claim boundary (`guarantee_boundary`: `not_asserted`, distinct from `unknown`/`passed`)            | ②              | ②     | ②                | BCO's open-ended `error_domain` or a schema-identified extension can carry externally defined non-claim fields. IEEE 2791 does not natively define nomue's `not_asserted` vocabulary or its distinction from a completed pass/fail outcome, so interoperability depends on that external definition.                                                                                                                                                            |
| No single overall status; relying party reads scoped results independently                                      | ④              | ③     | ③                | BCO does not impose a top-level computational `PASS/FAIL`. Its provenance `review.status` describes review state of the BCO, not a universal scientific-verification result. This avoids one kind of overclaim, but BCO domains are not themselves a set of scoped verifier outcomes comparable to nomue's per-check execution/outcome pairs.                                                                                                                   |

## Summary of the biggest gaps (for a reviewer to prioritize)

1. **Native, individually typed statistical result semantics.** WRROC can use generic
   `PropertyValue` entities and BCO can link an output or define an extension, but
   neither base format defines nomue's group-summary/effect/CI/test result contract.
2. **Per-check recomputation evidence and depth classification.** Neither base format
   natively packages a scoped verification report describing what was recomputed,
   what merely passed consistency checks, and why a check passed, failed, or did not
   run.
3. **Admissibility declarations.** Neither base format natively standardizes the
   pairing, repeated-measurement, clustering, missingness, transformation, and
   weighting declarations used by the ITGC profile.
4. **A native non-claim vocabulary.** BCO's open error/extension mechanisms can carry
   project-defined semantics, but neither BCO nor WRROC defines nomue's interoperable
   `not_asserted` boundary in its base model.

BCO already provides meaningful provenance, versioning, workflow, I/O, parameter,
error, extension, and `etag` mechanisms. WRROC already provides rich workflow-run
provenance and, like nomue, does not need a universal overall status. The comparison
therefore does **not** claim that nomue replaces or outperforms either system at its
own purpose. It identifies the narrower semantic layer nomue adds: independently
checkable statistical declarations and scoped verification outcomes linked to an
explicit guarantee boundary.
