# Release 1 Candidate C2 — External Operator Evidence Review

**Review date:** 2026-08-21  
**Candidate:** `2f31c424951a1606563a1f7575d0d5688d34b410`  
**External operator:** Cursor Grok 4.6, acting as an independent External Operator  
**Evidence package SHA-256:** `19c38b5c770c96d1aa8fef8b245ef2f8c98687b70417668726e200f75761d096`

## Integrity review

The received ZIP contained 38 evidence files. The package's internal `hashes.sha256` manifest was verified against every file: **38/38 hashes matched**.

Both R1-04 and R1-09 evidence identify exact Candidate C2:

`2f31c424951a1606563a1f7575d0d5688d34b410`

The external operator disclosed that the host machine had previously been used for nomue development and that the R1-09 pnpm install reused packages from the host pnpm store. The operator used new work directories and separate fresh clones for R1-04 and R1-09 and did not reuse Licklider CI or precomputed verifier results.

## R1-04 — External offline verification

**Review disposition: PASS — ready for steward decision.**

Evidence reviewed:

- fresh clone `nomue-protocol-r1-04`, detached at exact Candidate C2;
- Docker Linux verification environment (`Debian 12`, Node `v24.19.0`) with `--network none`;
- frozen dependency install completed before isolation, exit `0`;
- pre-verification network probe failed as required (`curl` exit `6`, could not resolve host);
- verifier invoked through the locally installed `./node_modules/.bin/tsx`, not through pnpm after isolation;
- verification exit code `0`;
- verification report: conformance `pass`; four verification checks all `pass`;
- verifier report `source_commit` equals exact Candidate C2;
- post-verification network probe again failed (`curl` exit `6`);
- no tracked Candidate changes after verification; only untracked `.pnpm-store/` was present.

The prior failed operator attempt that invoked `pnpm` under network isolation was not reused. The successful run correctly isolates verifier offline behavior from package-manager registry behavior.

The fact that the physical host had previously been used for nomue development is recorded as a deviation, but does not invalidate this gate under the authoritative R1-04 requirements. The gate requires external-operator clean-environment verification, environment manifests, and network-isolation evidence; it does not require a never-before-used physical host. The new clone, container filesystem, explicit network isolation, external operator, and exact candidate binding satisfy the intended independence boundary.

## R1-09 — Verifier provenance and rebuildability

**Review disposition: PASS — ready for steward decision.**

Evidence reviewed:

- separate fresh clone `nomue-protocol-r1-09`, detached at exact Candidate C2;
- Windows 11 / AMD64 / Node `v24.19.0` / pnpm `11.7.0` build environment manifest;
- dependency provenance hashes recorded for `package.json` and `pnpm-lock.yaml`;
- dependency tree captured;
- `pnpm install --frozen-lockfile` exit `0`;
- `pnpm generate` exit `0`;
- generated tracked tree remained unchanged;
- `pnpm check` exit `0`, including 225/225 tests passed, schema/authority validation, generated-file checks, Phase 1, Phase 2A and 0.2.1 conformance suites;
- rebuilt verifier execution exit `0`, with conformance and all four checks `pass`;
- final `git status --short` empty.

The pnpm install reused 387 packages from the machine's pnpm store and downloaded 0 packages. This is disclosed but does not invalidate rebuildability: the install remained lockfile-constrained, dependency provenance was captured, no Candidate file changed, generation was reproducible, and the complete check/verifier path passed in the independent clone.

The first PowerShell wrapper around `pnpm generate` failed because of operator quoting before the command was started; the Candidate was not modified and the subsequent direct `pnpm generate` run succeeded. This is treated as an operator-script setup deviation rather than a Candidate defect.

## Steward decision boundary

This record does **not** close R1-04 or R1-09. It records the evidence review and recommends both gates for **PASS** on Candidate C2.

Formal gate closure remains an explicit Founder/Steward decision.

## Remaining Release 1 path if approved

1. close R1-04 and R1-09 as `pass` for Candidate C2;
2. execute R1-14 production release signing ceremony;
3. verify final signed release targets and checksums;
4. complete final publication check and publish Release 1 Public Draft.
