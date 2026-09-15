# T04 EC3 / EC4 combined author evidence

Current status: `F-01 REPAIRED — READY FOR TARGETED T04 CLOSE RE-REVIEW`.
The independent close review rejected the original delivery boundary.
[F01-REPAIR.md](F01-REPAIR.md) supersedes the readiness/containment claim affected
by that finding. The original author report below retains its measured-source
scope; its historical 338 cases did not test the late-report race. T04 is not closed.

## 1. Executive summary

EC3 and EC4 are ready for the one subsequent T04 Independent Close Review.
This author packet does not close T04, adopt public policy, issue a reference
implementation or reopen T02/EC1/EC2.

The final Linux run completed 338 invocations with every assertion passing.
Normal/optimized results agree with the fixed G5 results and independent expected
22-value vectors. The selected unissued reference family is Medium.

## 2. Main / PR #331 delta impact

Execution baseline: `3880db43a64e1758494f3c78f6850daab0e3e9e9`.
Numerical candidate: `66fa2bc201c86c62f21bb94825479427c24d8522`.
Architecture: `cd9d780ac06a3b998ff5d4717429b0177a222fe8`.
They are composed as separate immutable snapshots from a new branch based on main.
[INPUTS.json](INPUTS.json) records exact ancestry, both commit lists, endpoint diff
and the 11 runtime pins. Classification: no material numerical impact; expected
material execution impact; no conflict resolution or historical rewrite performed.

## 3. Existing execution evidence

[EXECUTION-EVIDENCE.md](EXECUTION-EVIDENCE.md) distinguishes main-integrated
historical worker/supervisor claims, T02 mode coverage, SEC obligations, prior Linux
and Windows evidence, and G4/G5 numerical evidence. Historical n65/staged execution
is not relabelled S-C full invocation; the 17-value oracle is preserved.

## 4. Full-invocation boundary

[BOUNDARY.md](BOUNDARY.md) assigns time, memory, I/O and failure owners to raw
acquisition, strict parsing, parent preflight, transport, worker, parent result
validation, report construction, termination, descendants and final delivery.
The application runs inside a read-only, network-disabled container. The outer
observer begins timing before launch and ends after collection and cleanup.
The measurement observer/Docker daemon/kernel are trusted control-plane outside
the application's charged-memory limit; no whole-host memory or real-time claim
is made. The observer receives capped generated reports, never parses raw Records.

## 5. Validation host

Linux x86_64, CPython 3.12.14, kernel `6.17.0-1022-azure`, Docker 28.0.4 and
cgroup v2. [HOST.json](measurements/HOST.json) binds the image/executable identity.
Local Windows CPython 3.12.10 was used for preparation and saved-result checks.
Local Docker's Linux engine did not respond, so actual invocation measurement used
GitHub's Linux runner. Windows results are not substituted for Linux coverage.

## 6. Resource measurements

[RESOURCE-MEASUREMENTS.md](RESOURCE-MEASUREMENTS.md) separates worker CPU/internal
wall, ingress/parent preparation, full wall, cleanup, process RSS, charged tree peak
and output sizes. The raw evidence is [MEASUREMENTS.jsonl](measurements/MEASUREMENTS.jsonl).
Medium normal full wall max: 0.911920 seconds; observed charged tree peak:
44,953,600 bytes; full report max: 117,667 bytes. These are measurements, not caps.

## 7. Candidate safety profiles

[PROFILE-RATIONALE.md](PROFILE-RATIONALE.md) compares historical, Small, Medium and
Large values with constructive bounds, security rationale, observed headroom and
remaining uncertainty. Small's 1 MiB raw limit rejects the padded normal case;
Medium retains the existing 5 MiB allowance and passes the complete frozen corpus.
Large is a comparison subset and supplies no whole-domain advantage claim.

## 8. Selected reference safety profile

[CANDIDATE-PROFILE.json](CANDIDATE-PROFILE.json): Medium, unissued. Worker CPU
25/26 s; full invocation wall 30 s; worker address space 256 MiB; application tree
512 MiB; raw 5 MiB; internal transport 8 MiB; stdout 4 MiB; stderr 64 KiB; full
report 8 MiB. Cleanup uses existing child wait 2 s and outer TERM/KILL interval
2 s, with a separate 12 s control-plane command timeout. All are reference-side.
No standalone public n ceiling, numerical budget or eligibility rule is changed.

## 9. Failure / cleanup results

[FAILURE-MATRIX.md](FAILURE-MATRIX.md) records malformed raw input, duplicate keys,
negative zero, surrogate/nonfinite/depth rejection, transport/output overflow,
worker CPU/memory limits, cgroup OOM, crash, malformed/partial/wrong-bound output,
parent/worker/report timeout, report cap, kill escalation and descendants.
All tested real execution failures deliver no numerical result. Final cleanup
confirmation is also tested as a prerequisite to delivery; its synthetic receipt
fault is distinguished from actual process termination measurements.

## 10. SEC compatibility

Existing strict ingress, resource inspection and Node in-process budget checks
are reused unchanged. Outer isolation supplements them. Record content selects
neither commands nor network resources. Numerical failure/indeterminate and
execution refusal remain different. This research receipt is not an issued public
refusal schema instance; production reason-code/CLI/report integration remains
T08 work. No claim is made that PR #331 alone discharged all SEC obligations.

## 11. EC3 verdict

`EC3 READY FOR T04 CLOSE REVIEW`

Full invocation, host, concrete candidate limits, enforcement/measurement split,
time/memory/output/cleanup evidence, failure semantics and reproduction are
recorded. This is a readiness verdict with explicit finite-corpus and platform
limitations, not independent acceptance or universal completion under B.

## 12. Support-layer definitions

[SUPPORT-MAPPING.md](SUPPORT-MAPPING.md) separates scientific/admissible,
public-supported candidate semantics, unissued reference profile/validation basis,
and the observed finite set. Candidate reference support uses option B.

## 13. Current main reference capability

Main contains the old trusted supervisor and historical tail worker. Its transport
has n<=65 and legacy numerical guards. It does not integrate the fixed G5 S-C
22-value procedure as an issued production implementation. G5 remains research-only.

## 14. Public / reference mapping

The mapping covers ordinary, near-B, exact B, above B, D04, exact SSE zero,
positive SSE projecting zero, positive-p underflow/subnormals, malformed inputs,
resource failures and public-eligible cases the old worker cannot execute.
The exact-B witness is `ordinary_decimal_n128`. Literal scalar B+1 is not claimed
to be a realized raw Record score. Every measured C>B case is refused by parent
preflight before the numerical worker starts.

## 15. Reference gaps

Production S-C/dispatch/refusal integration is an implementation gap for T08.
Whole-public-domain completion under a particular seconds/bytes profile is an
unestablished validation/resource-profile claim. Other hosts are a host gap.
Reference refusals do not shrink J-cost(B,S-C), and harness success does not mean
production completion. The tested set is identified exactly; no equality between
public and reference support sets is inferred from it.

## 16. Versioning boundary

J-cost, B, Z-B and S-C changes affect the public version/bundle contract.
Reference-only caps or host expansion do not automatically change the Public
Check version when numerical decisions remain unchanged; security evidence,
interface compatibility and change control still apply. No discussion clock is
reset and no public discussion is posted.

## 17. EC4 verdict

`EC4 READY FOR T04 CLOSE REVIEW`

The support statement, main capability, finite evidence basis and unvalidated
gaps are explicit. This does not claim issued production support or equality of
public-domain and reference-completion ranges.

## 18. Reproducibility

Measurement source: `a6cddeba659ae2c52e6a7901d3e5a41102080274`.
[Linux run 34830324114](https://github.com/licklider-ai/nomue-protocol/actions/runs/34830324114)
passed all measurement, normal/optimized saved-result and delivery checks.
CAPTURE records downloaded hashes; SOURCE-MANIFEST binds both complete snapshots
and compiled ingress; CASE-MANIFEST binds raw inputs and fixed expected evidence.
Host/image/commands/limits are retained. Timings and kernel counters vary on replay;
semantic comparisons and source/artifact bindings are the deterministic checks.
Docker tags and package mirrors are not a promise of bit-identical image rebuild;
compare recorded image/executable identity and record new host evidence on replay.

## 19. Historical preservation

Opening RFC, T03, Architecture, G1-G5, historical POLICY/COUPLING, results, receipts
and the reviewed numerical branch are unchanged. The only additions are this
research directory and its new measurement workflow. Runtime 11 hashes match the
fixed baseline. No shared source, registry, schema, Requirement, CLI or bundle is
changed. [ATTEMPTS.json](ATTEMPTS.json) preserves failed/intermediate author trials
without relabelling them as final successful evidence.

## 20. Git state and review target

Branch: `research/r4-t04-ec3-ec4-evidence-20260914`, based on `3880db4`.
The measurement source SHA above binds execution. The final documentation/capture
commit and remote equality are reported at handoff; MANIFEST binds the final
artifact bytes without a self-referential commit claim.

## 21. Overall verdict

`T04 EC3/EC4 EVIDENCE READY — READY FOR T04 INDEPENDENT CLOSE REVIEW`

T04 is not yet closed by this work. The next review is one combined independent
T04 close review, not new EC3 and EC4 review chains. T05/T06/T08 and public adoption
have not been started. AI-assisted author preparation is not independent review.
