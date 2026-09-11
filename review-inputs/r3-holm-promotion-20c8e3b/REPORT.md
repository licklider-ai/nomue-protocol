# Bounded review of the R3 Holm promotion proposal

## Fixed identities

| Item                        | Identity                                                                                                                                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed proposal commit    | `20c8e3b01f3f8983eba4f05e60c4b64ee946d795`, tree `7d990af49a2224d15a01adc7e6b032517bbc8ed2`, sole parent `dedd26a3e0655001b67e40ccfb741e43ecb07beb` |
| Experimental baseline       | PR #300 `cc87234d27b7a0d51bc172d0e661845a3b1f9b15`, tree `e6944ca82664264bf1b9f9af62ba944d8d32ef1e`; verified, not the proposal's parent            |
| Proposal input pins         | All 27 entries of the proposal's INPUTS.json match by commit, blob, size and SHA-256 (verified here)                                                |
| Public opening              | Issue #274 `created_at` 2026-09-09T11:50:18Z (read from GitHub); matches the proposal's opening and earliest-decision timestamps                    |
| This review's own inventory | INPUTS.json in this directory pins every file this review read to a decision                                                                        |

## Role and independence disclosure

Accountable role: external bounded reviewer, requested by the repository owner
through a Claude Code session. Provider and configuration actually available: an
Anthropic Claude Code session whose session telemetry reports the configured
model `claude-fable-5-1` and the last served model `claude-fable-5-1` (read from
the session tool during this review). That is tool-reported configuration, not a
model-build attestation. No human reviewer participated. No additional agents
were started.

Prior involvement, which the commission requires to be disclosed: this same
session performed the external reviews recorded for PR #285, #288, #290,
PR #292, #293, #295, #296, #297, #299 and #300, and authored the repair commits
`c4ad231` (Holm experiment), `26847d5`, `a3c51c0`, `97ef292` (R4 packets),
`e170ced` (binding design) and `cf6ae85` (binding experiment). The #290
derivation review predates every repair; the Holm `transform`, `project`,
`decode` and `ordered` functions executed by the PR #300 bridge are
AST-identical between the author's `b4b80de` and the repaired `c4ad231`
(verified here; the repair added only `evidence_view` and tests). Because this
session later modified candidate packet files, it is not a clean separate
investigator for the implementation-level B-2 closure of those packets, and it
does not issue that closure. It is a separate model provider from the proposal
author (OpenAI Codex), and its derivation-level findings are reported as such.

Accessible history: this session's own conversation and the repository at the
pinned commits. Tools: git, Python 3.11, Node 22.22, the GitHub connector. No
original Holm or IEEE PDF was read in this review; #289 and #294 are reused
within their exact claims. Actual executions in this review: pin verification,
issue metadata read, AST comparison, and `derivation_checks.py` (standard
library only, expected values from closed-testing enumeration and correctly
rounded float conversion) in normal and optimized Python.

## Determination A: basis for the next design work

**GO with SHOULD-FIX repairs.** The proposal states one bounded claim
(declaration-bound, arithmetic-only supplied-p Holm for a selected all-pairs
family), keeps every non-claim explicit, reuses the completed experiment round
without replaying it, and inventories the remaining conditions in a way that
prevents experimental success from reading as supported behavior. Nothing found
blocks using it as the basis for the supported-execution and public-surface
design work. The SHOULD-FIX items below are provenance and wording repairs.

## Determination B: claim-to-evidence mapping

| Proposal claim (locator)                                                     | Reusable evidence                                                                                                                                         | Candidate-specific derivation still needed                                                          | Provenance status                                                                                                                                                     |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ordinary unweighted Scheme 1 with inclusive comparison (S3)                  | PR #289 REPORT, claim table rows "Procedure" and "Excluded variants", printed pp. 66-69                                                                   | None for the procedure itself                                                                       | **Covered**: separate-model primary pass (`gpt-5.6-sol` configuration disclosure)                                                                                     |
| Strong FWER for valid marginal levels without joint independence (S7)        | PR #289 rows "Strong family-wise scope" and "Marginal validity and dependence"; FND1-H01                                                                  | None; scientific use still needs valid-marginal evidence per input (S7)                             | **Covered** for the theorem; the input-validity connection is correctly left open                                                                                     |
| Adjusted-p formula: rank products, cumulative maximum, cap, inverse map (S3) | HOLM-APPLICABILITY row 4 (downstream derivation, not quoted from Holm); #290 design derivation; #290 external review and #292 closed-testing oracle       | Equivalence to Scheme 1 on `0<alpha<1`, tie invariance, cap-mid-scan behavior: all re-executed here | **Partially covered**: derivation reviewed by a separate model provider (this session); reviewer identity now disclosed above; implementation-level closing pass open |
| alpha=1 exclusion; no alpha input; binary64 0.05 is not 1/20 (S3)            | HOLM-APPLICABILITY closing paragraph (alpha=1 example); #290 repair (DESIGN alpha identity); re-executed here                                             | None beyond a future versioned check's level ownership                                              | **Covered** at derivation level; ownership deferred to the check version, as the proposal says                                                                        |
| Exact A plus display comparison; display collision is real (S3)              | #290 ACCEPTANCE collision vector; #292 tests; re-executed here (a=3/4+9·2^-54 versus b=3/4+8·2^-54 both display `3fe8000000000004`)                       | None                                                                                                | **Covered**                                                                                                                                                           |
| Binary64 field mapping, lattice unit, nearest/even, interval projection (S3) | PR #294 REPORT rows "Represented set and lattice", "Binary64 fields", "Nearest/ties-to-even", "Interval projection" (clauses 3.3, 3.4, 3.6, 4.3.1)        | None for the mapping                                                                                | **Covered**: separate-model primary pass, scoped to the R4 projection; Holm applicability is the author's intake                                                      |
| Positive zero admitted, negative zero refused, above-one refused (S2)        | PR #294 rows "Signed zero" and "Above maximum finite" (GO with qualification / conservative policy); #294 AUTHOR-INTAKE says these are project choices    | None; they are policy, not source facts, and S2 presents them that way                              | **Covered** as project choices; correctly not attributed to IEEE                                                                                                      |
| Expected context independent of submission; full-document JCS binding (S2)   | #299 DESIGN and #300 bridge (`prepare`: caller texts select context; canonical binding compares `{declaration, inputs}`); #300 external review and intake | None                                                                                                | **Covered** at experiment level; public expected-context entry remains a design task (S4)                                                                             |
| Conjunctive limits, 42,450-node refusal, 27,108-node embedding bound (S6)    | #300 NODE-CONFIRMATION and `check_nodes.py`; executed by this session on `45bd42f`, whose `check_nodes.py` bytes are unchanged at `cc87234`               | New bound only if the public envelope changes fields or nesting (S6 says so)                        | **Covered** as attributed and reproduced evidence                                                                                                                     |
| Resource settings and their non-equivalence (S6)                             | #300 REPORT, LIVE-RSS.json and author intake                                                                                                              | Enforceable whole-call control in the selected environment                                          | **Unestablished** as a supported bound; the proposal correctly lists it as open                                                                                       |

No decision-bearing source claim in the proposal relies on model memory. The
one provenance gap the proposal names, the missing reviewer identity for
the #290 receipt, is closed above to the extent tool telemetry allows.

## Determination C: residual conditions

The PROMOTION-CONDITIONS inventory is complete enough: every path from
experimental success to supported behavior, scientific validity or release
crosses at least one open row (scope decision, B-2 closing pass, public
surface, supported execution, outcome mapping, coupled conformance, RFC decision,
publication). No falsely retained blocker was found; the NB mapping changes no
historical state and the out-of-slice rows are correctly labeled as not closing
the R3-wide holds. Two omissions are recorded as SHOULD-FIX 1 and 2 below.

## Specific checks

1. Scope: S1 matches the bridge (3..16 groups, exactly all pairs, 3..120
   members). The 49 dispositions (15/27/5/2) match issue #274. The other fourteen
   candidates are enumerated (PVL-01/02/04/07, CLS-01, OMN-01/02, APR-01/02/09,
   MTO-01, HET-01, FDR-01/02). No omnibus, Naik, R4 or NB work is required.
2. Expected context: S2 binds full declarations, origins, hypothesis identity,
   sidedness, member order, result ownership and unrelated context, and separates
   binding from truth and chronology. Verified against `bridge.mjs` `prepare`.
3. Derivation: `derivation_checks.py` re-establishes closed-testing equivalence
   (400 random families with ties), step-down equivalence on `0<alpha<1`, the
   alpha=1 counterexample, the three-member vector, the display collision, the
   269-digit width and the 0.05 identity. Exact represented p is the target;
   S3 and S7 keep the ideal p-variable distinct.
4. IEEE: #294's scope is the R4 projection; its Holm applicability is the
   author's intake and S7 says so. Positive-zero admission and negative-zero
   refusal are presented as project choices. The #290 metadata gap is filled by
   disclosure, not invention; no model-build attestation gate is added.
5. Public attachment: S4 states that identifiers, sidecars and the deferred D0
   payload are unissued and blocking, and separates canonical storage ingress
   from pretty-JSON semantic comparison. Future coupled artifacts are listed by
   category in S8; the concrete registry files are named in NICE-TO-HAVE 1.
6. Limits: S6 is conjunctive, states the 42,450 refusal and the 27,108 bound,
   and requires a new bound for envelope changes.
7. Execution: S6 separates old-space, address space and sampled RSS, and asks
   for startup trust, native allocations, process lifetimes, termination tests
   and no surviving partial result, within the declared threat model.
8. PR #300 is reused at `cc87234` with its live measurement and intake
   correction preserved; no code was replayed here.
9. `NRS-CONTRACT-<TOKEN>-<NNNN>` is adopted grammar in ID-POLICY; S8 does not
   treat unissued R2 surfaces as adopted. The fixed RFC draft still says "public
   discussion not open"; issue #274 records the actual opening. The proposal is
   an additive successor surface; no CORE change is identified here, and the
   material-change assessment is correctly left to the steward.
10. No FWER, p-generation, interval, selection attestation, public identifier,
    scientific guarantee or new resource bound is introduced.

## Findings

No BLOCKER.

| Kind           | Finding                                                                                                                                                                                                                                                                                                                      | Recommended repair                                                                                                                                                                                                                                                                                                                                                                             |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SHOULD-FIX 1   | PROMOTION-CONDITIONS records the #290 receipt as lacking reviewer/model identity but does not say that the same reviewer session later authored candidate repairs. Without that, the "separate qualifying investigator/model pass" row cannot be scoped and risks either a full re-review or a closure by an involved party. | In the B-2 row and the paragraph below the table, record the disclosure above (provider, session-reported model, reviews performed, repair commits) and scope the residual pass to the implementation-level closing determination for the pinned `transform`/`project`/`decode` bytes by an investigator who did not author those packets. Derivation-level claims are covered as mapped here. |
| SHOULD-FIX 2   | S6 lists a "512-MiB sampled process-tree RSS ceiling" among current experiment settings. Sampling ran only on the reviewer host; the author host recorded process-peak sums and the #300 intake corrected the earlier bound statement.                                                                                       | Say "512-MiB process-tree RSS ceiling, live-sampled on the reviewer host only; the author host substituted process-peak sums" so the setting is not read as uniformly enforced.                                                                                                                                                                                                                |
| SHOULD-FIX 3   | S2's semantic table binds "selected member order" (the family array). Result-slot `member_ids` has set-coverage semantics in D0 while its array order is still bound by the full-document comparison; the table does not say which.                                                                                          | Add one sentence to S2: the result slot's member list is compared as a set by D0 relations and as an exact array by the full binding.                                                                                                                                                                                                                                                          |
| NICE-TO-HAVE 1 | S8 lists coupled artifacts by category only.                                                                                                                                                                                                                                                                                 | Name the files: `registries/requirements.yaml`, `registries/public-contract-surfaces.yaml`, `registries/interpretation-bundles.yaml`, `authority/authority-manifest.yaml`, the conformance manifest and fixtures, and `generated/`.                                                                                                                                                            |
| NICE-TO-HAVE 2 | README cites the #300 CI run as observed successful.                                                                                                                                                                                                                                                                         | Keep it labeled as attributed observation; no change required.                                                                                                                                                                                                                                                                                                                                 |

## Open conditions: closing evidence and what they block

| Condition                                 | Evidence that closes it                                                                                                                                | Blocks                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| B-2 implementation-level closing pass     | A separate investigator who did not author the candidate packets confirms the pinned `transform`/`project`/`decode` bytes realize S3 and the S2 domain | Promotion of the candidate; not the design work   |
| Input marginal validity (S7)              | Per-input evidence of a valid p-producing procedure and permitted family/selection conditions                                                          | Only a later scientific FWER claim                |
| Public surface and expected-context entry | Closed successor schema, ownership, losslessness and the storage-byte versus canonical-value fixtures                                                  | Any public identifier, check or Record attachment |
| Supported execution                       | Trusted launcher, runtime identities, enforceable whole-call control and observed timeout/memory termination in the selected Linux x64 scope           | Supported-execution admission; not the semantics  |
| Outcome mapping                           | Versioned reasons and reports registered against existing verifier refusal rules                                                                       | Public check registration                         |
| RFC decision                              | Public window (earliest 2026-10-09T11:50:18Z), disposition and explicit decision                                                                       | Adoption                                          |
| Publication                               | Separate R3 release conditions                                                                                                                         | Release only                                      |

## Non-actions

No merge, adoption, gate-state change, catalogue change, identifier issuance,
public-specification or registry modification, release or public-discussion
post was made. This review directory is additive; the proposal bytes are
unchanged. The three SHOULD-FIX items are wording repairs for the author's
intake, not authorized here.
