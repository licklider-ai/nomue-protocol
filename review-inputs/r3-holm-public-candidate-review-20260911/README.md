# Holm public candidate review receipts

Informative evidence archive. These receipts support candidate preparation,
not identifier issuance, formal R3 adoption or publication.

## Independent numerical evidence

| Receipt                                                          | Investigator scope and disposition                                                                                                 | Provenance boundary                                                                                                                |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [Numerical applicability](numerical-applicability/REPORT.md.txt) | 21,763 independent checks in normal and optimized Python; exact identical result files; no numerical defect                        | Separate context using the parent's inherited model; no distinct-model closure asserted                                            |
| [B-2 closing](b2-closing/REPORT.md.txt)                          | Configured gpt-5.5 reviewer; 1,414 fresh checks; bounded B1/IEEE/B2 closing recommendation; no blocker in inspected public mapping | Explicit model configuration, no served-build or author-model attestation; archived primary evidence reused within unchanged scope |

The [closing addendum](b2-closing/ADDENDUM.md.txt) additionally pins the complete
Contract, coupling proposal and declaration-shape adapter, and qualifies the
reviewer test-replay writes.

The coordinator accepts the second report as a bounded research handoff for
preparing this unissued candidate. It does not change historical gate rows or
claim that a model's exact served build was independently authenticated. Formal
RFC/steward disposition of evidence and the coupled adoption delta remains open.

The reports distinguish arithmetic consistency from p-generator validity,
family selection, scientific FWER and all other unimplemented R3 capabilities.
The inherited-model review is preserved as useful corroboration, not relabeled
as a different-model review. Earlier primary-source facts retain their original
source hashes and review provenance.

All supplied files are stored with an extra .txt suffix to retain exact bytes
without formatting historical evidence. Original basenames, absolute execution
paths and reviewer timestamps remain unchanged inside the receipts. The paths
refer only to this public repository and scratch review directories. The review
scripts are evidence code, not part of the candidate runtime. To reproduce them,
copy them to a scratch directory under their original basenames; the applicability
script accepts the public repository root argument. The closing script's original
workspace paths are recorded verbatim and need an explicit local path relocation
on another host. Do not silently rewrite the archived originals.

INPUTS records pin commit/blob identities for previously tracked sources and
SHA-256 bytes for the then-untracked candidate. INTEGRATION.json records the
coordinator's comparison to final candidate files, any later addendum, and the
new candidate commit/CI receipt when available. SHA256SUMS.txt covers archive
bytes excluding itself. Examples generated during reviewer test replay are
distinguished from authored source changes.

## Candidate integration and CI

The [candidate](../../governance/drafts/release-3-preparation/holm-public-candidate-20260911/README.md)
includes the Contract, coupling proposal, self-contained schemas, exact candidate
dispatch, scoped public outcomes and real-host workflow. The numerical kernel and
private bridge remain unchanged. The ordinary registered verifier continues to
refuse the proposed bundle; legacy conformance fixtures remain authoritative for
their own bundles.

[PR #321](https://github.com/licklider-ai/nomue-protocol/pull/321) merged the candidate
at `732368e88e10a18f3bc53cca289fd5a399aadb37`; tested head was
`f34dcbf7db4ddff44437f952af613b93a7bda9d8`.

| Final evidence                                                                          | Result                                                                                                       |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [Standard CI](https://github.com/licklider-ai/nomue-protocol/actions/runs/34608405741)  | All five jobs passed, including full checks on Linux x64 Node 22/24 and Windows/Linux arm64/macOS checks     |
| [Candidate CI](https://github.com/licklider-ai/nomue-protocol/actions/runs/34608405863) | 32/32 controlled-execution checks passed on the dedicated host                                               |
| [Actual private receipts](ci/execution-cgroup-results.json.txt)                         | 27 receipts; all 26 launched invocations have complete cleanup evidence                                      |
| [Public projection](ci/candidate-public-receipts.json.txt)                              | All 27 outputs valid; original bytes forwarded only for the five expected complete successes                 |
| [Host distribution check](ci/execution-host.json.txt)                                   | Internal-process controller write rejected with EBUSY; sibling placement then enabled controllers            |
| Candidate and local regression                                                          | 82 envelope controls, 91 public controls and 132 legacy fixtures; local unit suite 520 tests across 55 files |

The artifact ZIP (ID 10265969680) was downloaded and its SHA-256 verified as
`3ac349aac9970e226bb31c4c01dc66d1033bd6bf564a53225846b9f02ef98154`.
The five exact artifact members are retained under ci/ with .txt suffixes;
INTEGRATION.json maps original paths, sizes and hashes. CI-JOBS.json is a
normalized connector API snapshot, not a claim to preserve raw HTTP response bytes.
The candidate passed on its first CI attempt; no failed run is omitted.

This closes the missing candidate-specific real-host evidence within the declared
trusted-program boundary. It does not establish a universal whole-service memory
maximum or supervisor-crash recovery. The local cgroup NOT_RUN receipt remains
historical evidence; the real-host result does not rewrite it. No green check
closes the RFC, existing in-process-budget applicability question or publication
gate. The next authoritative delta remains explicitly proposed in COUPLING.md.
