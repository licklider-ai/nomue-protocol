# G4 working budget/domain decision for G5

Status: **WORKING BUDGET — PENDING G5 AND EC1/EC2 CLOSE REVIEW**

Freeze level: Level 2 working candidate semantics. Not public policy adoption,
EC1/EC2 closure, resource/support closure or Public Check issuance.

## Fixed candidate and exact constant

- Domain: J-cost(B,S-C).
- Eligibility: Z-B exact positive projection eligibility.
- Procedure: S-C exact-sign tail projection.
- Historical precision schedule: excluded from public semantics.
- Working B, exact decimal integer: `52969003320369754284032`.
- Cost revision: G4 cost candidate 1, unchanged reviewed S_C.
- Cost definition SHA-256:
  `f1eb1fd866d3a48589c3e7d37b3536f700e4d5271f9a85834fa3575f034512d2`.
- Direct source base: `225eca96d485978ee01cbe08d535387900252bca`.

B is a check-version candidate constant, not a parameter supplied by Records.
Use an arbitrary-precision integer; conversion to binary64 can move the exact
admission boundary. The literal's being longer than a safe JSON integer does
not introduce a new Record field or weaken existing canonicalization rules.

## Exact G5 admission predicate

For this candidate only, define R as the unchanged RFC/T03 admissibility and
representation conditions for the full required quantities. The actual G5
implementation still needs to apply them in their correct scopes; the G4
corpus does not implement a complete Record or report.

1. Apply existing input conformance, admissibility and identity prerequisites.
   Four complete cells have equal n, finite binary64 observations and the
   existing token/experimental-unit rules. Keep the RFC representation ceiling
   `2 <= n <= 2251799813685247`. Do not infer membership from an unvalidated
   declared count or declared numerical output.
2. Perform bounded count admission before expensive arithmetic. Cpre alone is
   a safe early rejection test; additionally `C(n,[1,1,1])>B` is an equivalent
   necessary-condition shortcut. For this B it rejects every n>=443 without
   computing F. This adds no independent n policy. Handle excess input without
   unbounded numerical scanning; raw-document parsing remains its own boundary.
3. Decode the finite binary64 lattice; form exact sums/squares, contrasts, E,
   means/effects/SS/SSE and exact F. Exact SSE zero fails computability before
   division. Keep all mandatory finite-range and SSE-representation conditions.
4. Reduce each exact F to coprime numerator and positive denominator. Set
   `w_i=max(1,bit_length(abs(num_i)),bit_length(den_i))`. Never use displayed F,
   observed runtime or a producer-supplied interval to choose the widths.
5. Compute C with exact integers using the fixed expression below. If C>B,
   reject the numerical work domain before S-C. Otherwise reserve the full
   three-tail/evidence allowance even when tails coincide or F=0.
6. Apply S-C and Z-B. Each finite exact upper-tail p is positive. Exact
   `p<=2^-1075` is positive-tail zero-underflow and is not eligible for public
   comparison pass. Require `p>2^-1075` for every mandatory p projection,
   retaining positive subnormals. Use exact-sign tests, including midpoint ties.
7. The mathematical working domain is R AND C<=B, where R includes the exact
   positive-projection gate in step 6. Result mismatch is not a domain refusal:
   an otherwise admitted input with incorrect declared values remains admitted
   and can produce scoped fail. D07 architecture remains, without relabeling
   error, refusal or not_run as indeterminate.

Work admission can be known before tail eligibility. The latter is determined
within reserved work. Failure to execute does not change mathematical membership
or become a new budget reason. Scope/aggregation and actual mandatory execution
remain G5 integration obligations; all executable mandatory comparisons continue
according to the fixed architecture.

## Frozen charged expression

```text
r = ceil(log2 n)
a = 2(n-1)
ell = ceil(log2(2a))
U(K) = 64(K+1)^3
K0 = 2*2098 + 4r + 2200
Cpre = (128n+2048)*U(K0)
Kx_i = 8a*(w_i+2ell+6)+8192
Cx_i = (32a+256)*U(Kx_i)
Ebits = 22*(8*max(K0,Kx_A,Kx_B,Kx_AB)+512)+320
C = Cpre + Cx_A + Cx_B + Cx_AB + Ebits^2
work_admission = C <= 52969003320369754284032
```

The expression owns no measured resource unit. It is the review-backed charged
integer construction, including the fixed bounded evidence envelope. The
separate implementation in check_evidence.py is cross-checked against the
reviewed source; the source, plan and expression hashes are fixed.

## Selection reasoning, separated by kind

- Domain usefulness: all authored ordinary cases through n128 plus three
  n256 ordinary cases, all four dyadic scaling series, useful offset/contrast
  cases and eligible boundary witnesses meet the prewritten criterion.
  This is engineering evidence, not a business demand model.
- Mathematical boundedness: supplied by the unchanged reviewed cost model,
  exact input-derived widths and finite exact-sign method, not sample speed.
- Reference feasibility: every selected admitted numerical-component probe
  completed in both modes and reproduced exact outputs. This is limited to
  the pinned research implementations and observed host, not public verifier
  support or Linux controlled-worker validation.
- Refusal behavior: 11 of 87 raw cases exceed Medium's cost; 12 further cases
  fail independent representation/eligibility conditions. All retain explicit
  reasons, and no observation timeout enters the predicate.
- Evidence quality: deterministic recipes, exact source hashes, moment/residual
  cross-checks, reviewed boundary expectations, B/B-1 controls, monotonicity,
  separately captured telemetry and reproducible analysis.

Small fails two minimum-usefulness conditions. Large supplies additional scope
and greater coefficient/operand burden without a demonstrated requirement for
that additional scope at this working stage. Medium is the smallest of these
three candidates satisfying the specified conditions, not a claimed globally
optimal B. New concrete G5/close-review evidence can change the working choice.

## Standalone count bound and reference limitations

Choose A: no additional standalone n ceiling. The derived minimum-width cost
frontier is n442, with n443 exceeding B. It is a consequence of J-cost, not
historical 65 or the corpus's observed maximum n256. Width combinations and
representation gates determine membership below that frontier.

The reviewed raw-input F width bound is 4353, so the historical reference-only
6500 width ceiling does not further restrict this raw domain. Do not shrink
public meaning to 6500 for arbitrary rational interfaces. Legacy n65/work
limits and the old finite-sum worker do not implement the new candidate;
address their implementation limitations in G5/EC4 at the appropriate scope.
G4 changes none of those files and issues no new support claim.

## G5 handoff and stopping boundary

G5 receives this exact B/cost/predicate plus the fixed T03/T04 semantics. It
still needs full 22-quantity integration, actual conformance/admissibility
routing, representation/eligibility ordering, honest candidate/witness output,
scoped aggregation, mismatch/refusal/not_run controls and the numerical evidence
representation check against Ebits. Do not infer those from G4's abstract
controls or put unlimited report text under the numerical evidence bound.

If mandatory numerical work exceeds the reviewed expression/envelope, record
that concrete discrepancy as a new cost-version candidate and rerun the B
comparison; do not silently modify this expression while keeping its result.
A new G4-only review stage is not required or commissioned. The planned
independent numerical close review follows G5 once, covering EC1/EC2 together.
G4 stops now without performing G5, EC1/EC2 close, EC3/EC4 or T05+.
