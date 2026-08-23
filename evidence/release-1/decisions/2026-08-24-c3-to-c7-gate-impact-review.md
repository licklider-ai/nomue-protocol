# Release 1 Candidate C3 → C7 Gate-Impact Review

**Date:** 2026-08-24  
**Prior candidate C3:** `8833ee02664903a69459fc178e4d2802f4241e0f`  
**Current candidate C7:** `f4206ac3f85dc8f783d14d63413cff87ab2ed82b`  
**C7 release-control pin P7:** `fb63509fed707de4033756238e8dacc23175e621`

## Purpose

Determine which prior Release 1 gate decisions remain valid after the complete C3 → C7 frozen-content delta. This review covers all candidate-frozen changes introduced after C3, including the C3 → C4 publication sanitization, the C/P/R/D release-identity repair, and the two release-control circularity fixes discovered during C5/C6 preparation.

The machine-readable full freeze-inventory comparison is recorded in `evidence/release-1/c3-to-c7-freeze-diff.json`.

## Mechanical inventory

Exact C3 and C7 freeze inventories were compared using the repository's candidate-freeze algorithm.

- C3 frozen files: **615**
- C7 frozen files: **608**
- added: **2**
- removed: **9**
- changed: **29**
- unchanged: **577**
- gate-index evidence references checked: **19**
- missing gate-index evidence references: **0**

The Release 1 gate-definition projection digest is unchanged:

`092836ca774f89b53d726998c8548468ea28b9ac7e13304ddeaf4cf92f66e32b`

Thus the candidate changed, but the gate criteria did not.

## Material delta review

### Canonicalization Unicode vector

C3's Unicode vector used the literal text `€ euro and 日本語 literal`. C7 uses `€ euro and Ω Unicode literal`. The vector's declared purpose is unchanged: non-ASCII characters remain literal while mandated control characters use the required escapes. The input hash, expected canonical bytes, and expected Record-content digest were regenerated for the substituted non-ASCII input.

This is a test-data sanitization change, not a change to canonicalization semantics. Exact C7 CI passed the canonicalization vector suite and the full Phase 1 / Phase 2A regression and conformance suites on Linux x64, Linux x64 / Node 24, Linux arm64, macOS arm64, and Windows x64.

### Approval statement wording

C3 bound `urn:nomue:approval-statement:content-reviewed-responsibility-accepted:1` to fixed Japanese wording and treated the English sentence as an informative gloss. C7 binds the same identifier to fixed English wording. This is a normative EXPERIMENTAL specification change, even though approval is not wired into any Release 1 Record schema or supported interpretation bundle and `checkApprovalScope` runtime behavior is unchanged.

Because the conformance suite includes approval fixtures, R1-03 receives fresh candidate-scoped implementation evidence rather than treating this normative change as automatically covered by C3 evidence.

### Release-control and signing identity model

C7 separates four release roles:

- C — frozen candidate content;
- P — release-control pin;
- R — exact release source archived and signed;
- D — final release-decision commit tagged for publication.

The tag target is defined by D's role rather than by embedding D's own impossible self-referential SHA inside D. Signed release manifests identify C and R only and use `release_source_commit` rather than the ambiguous `final_release_commit`. D is not a signing input; its exact SHA is published after D exists in the annotated tag and GitHub Release metadata.

This changes Release 1 publication mechanics and R1-14 evidence. It does not change Record semantics, statistical semantics, public-check semantics, or the supported interpretation bundle.

### Candidate-freeze output self-inclusion repair

The pre-C6 candidate-freeze workflow redirected its generated manifest into the checkout. Shell redirection created an untracked empty `candidate-freeze-manifest.json` before the repository walker executed, allowing the output file to enter its own inventory. C6 changed the permanent workflow to write under `runner.temp`, matching the existing Snapshot Runbook requirement that the freeze manifest be generated outside the checkout, and fails if the output filename appears in the inventory.

The exact C7 freeze was generated outside the checkout, contains 608 files, and does not self-include the output manifest.

### Generated README / mutable gate-state circularity repair

A second release-control circularity was found after P6: `generated/README.md` is candidate-frozen, but its generated header unnecessarily included the full-file SHA-256 of mutable `authority/release-1-gates.yaml`. Therefore an allowed post-freeze gate state/decision change followed by `pnpm generate` changed a frozen file and made `--check-candidate` fail.

C7 removes `authority/release-1-gates.yaml` from the source-dependency header of `generated/README.md`. `generated/RELEASE-1-GATES.md` remains dependent on the gate registry and remains explicitly excluded from the frozen inventory. A targeted regression test now requires the generated README not to claim the gate registry as a dependency while the generated release-gates view still does.

Exact C7 CI passed this regression and the full suite on all five configured environments. This repair changes no Protocol or gate semantics; it makes the existing freeze policy mechanically self-consistent with its permitted release-state mutations.

### Licensing

`LICENSE.md` removes the Japanese-language company-name rendering from the Licensor, copyright, and suggested-attribution lines and retains `Licklider, Inc.`. The CC BY 4.0 / Apache-2.0 / Essential-Claims patent-grant structure and operative grant/termination terms are unchanged.

Because R1-12 applies to every candidate and the legal artifact bytes changed, C7 receives a fresh candidate-scoped confirmation that the adopted legal package remains present and unchanged in substance. This delta alone does not require a new substantive legal design review.

### Comparison material and removed files

The WRROC/BCO comparison keeps its classifications, source boundary, and substantive conclusions; Japanese classification labels were replaced by English labels. The removed Galaxy comparison/development files and templates are not referenced by the current gate index. The mechanical reference check found zero missing gate-index evidence paths.

No current Release 1 canonical-case data, registered public-check surface, verification-report/refusal schema, numerical contract, numerical kernel, oracle corpus, or interpretation-bundle registration was removed by the C3 → C7 delta.

### Verifier / rebuild relevance

`reference/verifier/src/approval.ts` changes only explanatory text for the fixed approval wording; the `checkApprovalScope` runtime logic and public identifiers are unchanged. No dependency or verifier build procedure changed. Release-signing tooling changed, but that tooling belongs to R1-14 publication mechanics rather than the Record verifier's relying-party interface.

## Gate impact

| Gate | C7 impact | Disposition |
| --- | --- | --- |
| R1-01 | No registered public-check, capability-matrix, verification-depth, or guarantee-boundary semantic change. | Prior PASS remains valid. |
| R1-02 | Comparison labels/public wording were sanitized to English; substantive WRROC/BCO classifications and canonical-case differentiation are unchanged. Removed comparison/template files are not gate-index evidence references. | Prior PASS remains valid. |
| R1-03 | Normative EXPERIMENTAL approval statement wording changed; conformance includes approval fixtures. | **Reopen; refresh candidate-scoped conformance/verifier/test evidence against C7.** |
| R1-04 | Offline verifier path, dependencies, supported Record bundle, and verification behavior relevant to the external operator are unchanged. | Prior external PASS remains valid. |
| R1-05 | Threat model, adversarial/refusal semantics, and supported verification path are unchanged. | Prior PASS remains valid. |
| R1-06 | Release 1 canonical-case data, rights, licensing, and epistemic claims are unchanged. | Prior PASS remains valid. |
| R1-07 | Candidate identity, frozen inventory, public-surface language, snapshot/signing role model, freeze workflow, and generated-view freeze coupling changed. | **Reopen; refresh C7 freeze/equivalence/public-surface evidence.** |
| R1-08 | Numerical kernel, numerical contracts, tolerance semantics, and independent-oracle corpus are unchanged. Unicode fixture substitution is not a numerical-method change. | Prior PASS remains valid. |
| R1-09 | Verifier runtime/build inputs relevant to rebuildability are unchanged; the approval source delta is comment-only and dependencies/build procedure are unchanged. | Prior external PASS remains valid. |
| R1-10 | Canonical-case preregistration/case identity and failed-case disclosure are unchanged. | Prior PASS remains valid. |
| R1-11 | Attestation support remains `none`; cryptosuite/trust semantics and test-only attestation behavior are unchanged. Release signing is separately governed by R1-14. | Prior PASS remains valid. |
| R1-12 | Operative legal package is unchanged, but `LICENSE.md` candidate bytes changed in licensor/attribution presentation. | **Reopen for candidate-scoped confirmation; no new substantive legal design review required by this delta alone.** |
| R1-13 | Verification-report/refusal schemas, CLI output contract, exit codes, and relying-party interface semantics are unchanged. | Prior PASS remains valid. |
| R1-14 | Prior signatures and close evidence bind C3 and its prior release source, not C7/R7; the release identity/signing tooling also changed. | **Reopen; execute a fresh release-g2 signing ceremony for C7/R7 and close only after verification.** |

## Decision

Candidate C7 replaces C3 for Release 1. Intermediate C4, C5, and C6 are superseded pre-publication candidates and are not Release 1 publication targets.

R1-03, R1-07, R1-12, and R1-14 are reopened. R1-01, R1-02, R1-04, R1-05, R1-06, R1-08, R1-09, R1-10, R1-11, and R1-13 retain their prior PASS decisions for C7 for the reasons above.

This decision does not authorize publication. Release 1 remains **DO NOT SHIP** until the four reopened gates are explicitly reclosed and the final D/tag checks pass.
