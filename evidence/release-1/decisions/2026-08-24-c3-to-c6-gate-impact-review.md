# Release 1 Candidate C3 → C6 Gate-Impact Review

**Date:** 2026-08-24  
**Prior candidate C3:** `8833ee02664903a69459fc178e4d2802f4241e0f`  
**Current candidate C6:** `03f1c8bc32b06d86a0169113799ab27cb8f737c3`  
**C6 release-control pin P6:** `2167316ebbdf75340ef6c2a2200b487d5d1003fd`

## Purpose

Determine which prior Release 1 gate decisions remain valid after the complete C3 → C6 frozen-content delta. This review does not limit itself to the final C5/C6 repair commits; it covers all candidate-frozen changes introduced after C3, including the earlier C3 → C4 sanitization changes.

## Mechanical inventory

The exact freeze inventories were compared using the repository's own candidate-freeze tooling. The resulting machine-readable report is `evidence/release-1/c3-to-c6-freeze-diff.json`.

- C3 frozen files: **615**
- C6 frozen files: **608**
- added: **2**
- removed: **9**
- changed: **27**
- unchanged: **579**
- gate-index evidence references checked: **19**
- missing gate-index evidence references: **0**

The Release 1 gate-definition projection digest is unchanged:

`092836ca774f89b53d726998c8548468ea28b9ac7e13304ddeaf4cf92f66e32b`

Therefore the candidate changed, but the gate criteria did not.

## Material delta review

### Canonicalization Unicode vector

C3's Unicode vector used the literal text `€ euro and 日本語 literal`. C6 uses `€ euro and Ω Unicode literal`. The vector's declared purpose is unchanged: non-ASCII characters remain literal while mandated control characters use the required escapes. The input hash, expected canonical bytes, and expected Record-content digest were regenerated for the substituted non-ASCII input.

This is a test-data sanitization change, not a change to canonicalization semantics. Exact C6 CI passed the canonicalization vector suite and the full Phase 1/Phase 2A regression/conformance suites on Linux x64, Linux x64 / Node 24, Linux arm64, macOS arm64, and Windows x64.

### Approval statement wording

C3 bound `urn:nomue:approval-statement:content-reviewed-responsibility-accepted:1` to fixed Japanese wording and treated the English sentence as an informative gloss. C6 binds the same identifier to fixed English wording. This is a normative EXPERIMENTAL specification change, even though approval is not wired into any Release 1 Record schema or supported interpretation bundle and the `checkApprovalScope` runtime behavior is unchanged.

Because the conformance suite includes approval fixtures, R1-03 receives fresh candidate-scoped implementation evidence rather than treating this normative change as automatically covered by C3 evidence.

### Release-control and signing model

C6 repairs the release identity model by separating candidate content C, release-control pin P, signed release source R, and tagged release-decision D. The release tag is defined by the D role rather than by embedding D's own SHA inside D. Signed release manifests identify C and R; D is not a signing input. Release-signing metadata now uses `release_source_commit` rather than the ambiguous `final_release_commit` term.

This change affects Release 1 publication mechanics and R1-14 evidence. It does not change Record semantics, statistical semantics, public-check semantics, or the Release 1 supported interpretation bundle.

### Candidate-freeze workflow

C6 changes `.github/workflows/release1-candidate-freeze.yml` so the generated freeze manifest is written under `runner.temp`, outside the checkout. The prior in-checkout redirection could create an untracked empty `candidate-freeze-manifest.json` before the repository walker ran and thereby include the output file in its own freeze inventory. C6 additionally fails if that filename appears in the generated inventory.

The exact C6 freeze generated outside the checkout contains 608 files and does not self-include the output manifest. P6 stores that C6 inventory, and `pnpm snapshot:manifest --check-candidate` passed before P6 was finalized.

### Licensing

`LICENSE.md` removes the Japanese-language company-name rendering from the Licensor, copyright, and suggested-attribution lines and retains `Licklider, Inc.`. The CC BY 4.0 / Apache-2.0 / Essential-Claims patent-grant structure and operative grant/termination terms are unchanged. Because R1-12 applies to every candidate and the legal artifact itself changed, C6 still receives a fresh candidate-scoped legal-package confirmation before R1-12 is reclosed; a new substantive legal design review is not required by this delta alone.

### Comparison material and removed files

The WRROC/BCO comparison keeps its classifications, source boundary, and substantive conclusions; Japanese classification labels were replaced by English labels. The removed Galaxy comparison/development files and templates are not referenced by the current gate index. The mechanical reference check found zero missing gate-index evidence paths.

No current Release 1 canonical-case data, registered public-check surface, verification-report/refusal schema, numerical contract, numerical kernel, oracle corpus, or interpretation-bundle registration was removed by the C3 → C6 delta.

### Verifier / build relevance

`reference/verifier/src/approval.ts` changes only the explanatory comment for the fixed approval wording; `checkApprovalScope` runtime logic and its public identifiers are unchanged. No dependency or verifier build procedure changed. Release-signing tooling changed, but that tooling belongs to R1-14 publication mechanics rather than the Record verifier's relying-party interface.

## Gate impact

| Gate | C6 impact | Disposition |
| --- | --- | --- |
| R1-01 | No registered public-check, capability-matrix, verification-depth, or guarantee-boundary semantic change. | Prior PASS remains valid. |
| R1-02 | Comparison labels/public wording were sanitized to English; substantive WRROC/BCO classifications and canonical-case differentiation are unchanged. Removed comparison/template files are not gate-index evidence references. | Prior PASS remains valid. |
| R1-03 | Normative EXPERIMENTAL approval statement wording changed; conformance includes approval fixtures. | **Reopen; refresh candidate-scoped conformance/verifier/test evidence against C6.** |
| R1-04 | Offline verifier path, dependencies, supported Record bundle, and verification behavior relevant to the external operator are unchanged. | Prior external PASS remains valid. |
| R1-05 | Threat model, adversarial/refusal semantics, and supported verification path are unchanged. | Prior PASS remains valid. |
| R1-06 | Release 1 canonical-case data, rights, licensing, and epistemic claims are unchanged. | Prior PASS remains valid. |
| R1-07 | Candidate identity, frozen inventory, public-surface language, snapshot/signing role model, and freeze workflow changed. | **Reopen; refresh C6 freeze/equivalence/public-surface evidence.** |
| R1-08 | Numerical kernel, numerical contracts, tolerance semantics, and independent-oracle corpus are unchanged. Unicode canonicalization fixture substitution is not a numerical-method change. | Prior PASS remains valid. |
| R1-09 | Verifier runtime/build inputs relevant to rebuildability are unchanged; the approval source delta is comment-only and dependencies/build procedure are unchanged. | Prior external PASS remains valid. |
| R1-10 | Canonical-case preregistration/case identity and failed-case disclosure are unchanged. | Prior PASS remains valid. |
| R1-11 | Attestation support remains `none`; cryptosuite/trust semantics and test-only attestation behavior are unchanged. Release-signing identity is separately governed by R1-14. | Prior PASS remains valid. |
| R1-12 | Operative legal package is unchanged, but `LICENSE.md` candidate bytes changed in licensor/attribution presentation. | **Reopen for candidate-scoped confirmation; no new substantive legal design review required by this delta alone.** |
| R1-13 | Verification-report/refusal schemas, CLI output contract, exit codes, and relying-party interface semantics are unchanged. | Prior PASS remains valid. |
| R1-14 | Prior signatures and close evidence bind C3/its prior release source, not C6/R6; release signing model/tooling also changed. | **Reopen; execute a fresh release-g2 signing ceremony for C6/R6 and close only after verification.** |

## Decision

Candidate C6 replaces C3 for Release 1.

R1-03, R1-07, R1-12, and R1-14 are reopened. R1-01, R1-02, R1-04, R1-05, R1-06, R1-08, R1-09, R1-10, R1-11, and R1-13 retain their prior PASS decisions for C6 for the reasons above.

This decision does not authorize publication. Release 1 remains **DO NOT SHIP** until the four reopened gates are explicitly reclosed and the final release-decision/tag checks pass.
