# Steward Decision Record: Release-1 Gate Close Review (2026-08-13)

**Class: Evidence.** Authoritative only about what was decided and observed,
never about specification meaning.

## Decision

On 2026-08-13 the steward approved the integrator's gate-close ruling
proposal and authorized recording the rulings below as steward decisions.
The delegation explicitly excludes closing any gate whose registered
evidence is incomplete; every close recorded here was therefore audited
against the gate's `required_evidence` in
[authority/release-1-gates.yaml](../../../authority/release-1-gates.yaml)
before recording, and the per-gate audit is filed as a close record under
[evidence/release-1/gates/](../gates/).

Evidence state basis: commit `e429a58` (branch `feat/record-lifecycle-v0`),
working tree clean at audit time. Snapshot manifest hash at audit time:
`sha256:e32f6e469c26da0f387358dfa81e05308f1f82aedcbc9b54b4d2aad5f1c6f2b1`
([gates/R1-07/snapshot-manifest-hash.txt](../gates/R1-07/snapshot-manifest-hash.txt)).

## Rulings

1. **Close (evidence complete): R1-01, R1-05, R1-07, R1-13.**
   - R1-01 (verification depth and capability matrix): generated matrix,
     per-check depth analysis, and check-to-requirement mapping were already
     in place; the remaining item - the adversarial review of overclaim risk
     in public wording - is a steward review action, performed and accepted
     through this decision. See
     [gates/R1-01/close-record.md](../gates/R1-01/close-record.md).
   - R1-05 (threat model and adversarial corpus): threat model, adversarial
     corpus with pinned expectations, resource-limit evidence, fuzz runs,
     and the 18-item input-hardening inspection ledger. See
     [gates/R1-05/close-record.md](../gates/R1-05/close-record.md).
   - R1-07 (immutable public surface and version authority): snapshot
     manifest mechanism, snapshot runbook, and the six-identifier version
     map. See [gates/R1-07/close-record.md](../gates/R1-07/close-record.md).
   - R1-13 (relying-party interface): published interface section,
     machine-readable CLI output, drift-tested exit-code contract, and CI
     integration example. See
     [gates/R1-13/close-record.md](../gates/R1-13/close-record.md).
2. **Conditional close: R1-11 (cryptosuite and trust semantics).** The
   cryptosuite structure, trust-root mechanism, and negative tests are
   complete. The outstanding production item - entering the first
   production trust-root key generation after the steward's key ceremony -
   is moved to the pre-publication checklist
   ([evidence/release-1/pre-publication-checklist.md](../pre-publication-checklist.md))
   and the gate is closed. See
   [gates/R1-11/close-record.md](../gates/R1-11/close-record.md).
3. **Remain open: R1-12** (legal implementation boundary - awaiting legal
   adoption; the only publication blocker), **R1-14** (release signing -
   remains at the plan-documented state), and every gate that depends on a
   canonical Record, an external confirmer, or an external party's offline
   completion (human-queue items).
4. **Gates not named above** were adjudicated by the same standard -
   registered close conditions checked against present evidence - and
   recorded. Result: R1-02, R1-03, R1-04, R1-06, R1-09, and R1-10 remain
   open; each depends on at least one human-queue item (a rights-cleared
   canonical Record, external operators, or an independent rebuild). The
   residual evidence per gate is recorded in the gate registry notes and in
   the ledger below.
5. **Output:** a single gate ledger (closed/open with residual evidence),
   maintained as the gate registry plus this decision record;
   [gate-index.json](../gate-index.json) is the machine-readable form.

## Resulting gate states (14 gates)

| Gate  | State  | Decision | Residual evidence (if open)                                                             |
| ----- | ------ | -------- | --------------------------------------------------------------------------------------- |
| R1-01 | closed | pass     | -                                                                                       |
| R1-02 | open   | -        | Rights-cleared canonical-case walkthroughs; honest-overlap documentation completion     |
| R1-03 | open   | -        | Run logs against released fixtures; verifier runs over real canonical cases             |
| R1-04 | open   | -        | Clean-environment reports from external operators; network-isolation evidence           |
| R1-05 | closed | pass     | -                                                                                       |
| R1-06 | open   | -        | Rights/consent/licensing for real canonical cases; epistemic integrity review           |
| R1-07 | closed | pass     | -                                                                                       |
| R1-08 | closed | pass     | - (closed 2026-08-11, prior decision)                                                   |
| R1-09 | open   | -        | Independent rebuild log from an external party; build environment manifest              |
| R1-10 | open   | -        | Preregistration execution on real canonical cases; failed-case disclosure               |
| R1-11 | closed | pass     | Production trust-root generation 1 entry moved to the pre-publication checklist         |
| R1-12 | open   | -        | Licenses, patent grant, contribution terms, legal review (legal adoption pending)       |
| R1-13 | closed | pass     | -                                                                                       |
| R1-14 | open   | -        | Plan-documented state maintained; signatures and walkthrough deferred to implementation |

## Delegation note

The original ruling text was provided in Japanese by the steward on
2026-08-13; this record is its English registration per ADR-0004. Closing
gates with incomplete evidence was outside the delegation; no such close
was made. The R1-01 label in the original ruling text ("Record contract")
differs from the registry title ("Verification depth and capability
matrix"); the gate identity was confirmed by elimination against the other
named gates, whose labels all match their registry titles.
