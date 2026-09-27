# RFC: Contract-bearing Welch successor with exact-value numerical checks

Status: public discussion proposal; no adoption, issued identifiers, release,
freeze, or verifier support is implied. Author and accountable steward:
Tasuku Kobayashi. Date: 2026-09-28 (Asia/Tokyo).

This proposes an additive EXPERIMENTAL successor to the Release 1 Welch
checks in response to [ER-2](../../ERRATA.md). Release 1, its signed artifacts,
Records, identifiers and historical verdicts retain their existing meanings.
The proposal does not promise reproduction of a historical implementation.

## Scope and exact artifact changes

The [proposed registry](../../registries/proposals/welch-successor-20260928/proposal.json)
names the complete new Contract/Profile/bundle/schema/check tuple and dependencies.
The [selected examples](../../conformance/proposals/welch-successor-20260928/manifest.json)
pin inputs and expected per-check outcomes. The three proposed schemas cover the
[Record](../../schemas/proposals/welch-successor-20260928/record.schema.json),
[payload](../../schemas/proposals/welch-successor-20260928/payload.schema.json), and
[closed report](../../schemas/proposals/welch-successor-20260928/verification-report.schema.json).
These files are discussion snapshots, not additions to live registry membership.
They have no authoritative assignment and do not activate support in a verifier.

The proposed normative numerical clauses are NRS-VERIFY-0037 through 0040,
all EXPERIMENTAL. Existing requirement IDs are referenced for unchanged
behavior, not reassigned. Final carrier/admission/report requirement allocation
and clause binding remain an explicit landing prerequisite; this RFC does not
claim that a schema alone supplies those clauses.

| Surface | Proposed change | Existing meaning |
| --- | --- | --- |
| Record, Profile, Contract, bundle | New exact HTTPS tuple with analysis `contract_id` | No alias of the legacy `method_id` or bundle |
| Five Public Checks | New conformance, integrity, admission, computability, recompute identities | Old checks unchanged |
| Numerical requirements | Exact inputs/quantities, ordered domain, scaled comparison, established decisions | Predecessor method restriction remains with predecessor checks |
| Report | Separate conformance and four ordered, closed verification slots | No generic report acceptance or overall verdict |
| Reasons | Domain, subnormal-p and unsupported-Contract reasons; explicit applicability additions | Existing registered reasons retain their meanings |
| Registry meta-schemas and contract surfaces | Add support for the new identities and tolerance/domain representation at landing | No in-place reinterpretation |
| Conformance and generated views | Selected new fixtures and bindings at landing | Released fixtures and snapshots unchanged |

## Proposed carrier and admission meaning

Select the complete tuple by exact string equality; do not retrieve an identifier
URI, follow redirects, normalize spelling, guess a nearby version or infer aliases.
Unknown bundles are refused before checking. An unknown analysis Contract completes
admission with fail and `NRS-UNSUPPORTED-CONTRACT`; numerical dependants are
not_run with that same blocking reason. The CI construction retains its distinct
legacy method identifier.

Scientific admission retains the declared independent two-group continuous slice:
unique observations and experimental units, consistent dataset/design/analysis
references, two ordered groups with at least two observations each, and declared
absence of pairing, repeats, clustering, weights, transforms, missing outcomes
and exclusions. Two-sided alternative, mean-difference estimand and 95% interval
remain the supported declarations. Admission judges declarations, not their truth.
Schema validation and semantic conformance remain separate checks.

## Proposed NRS-VERIFY-0037: exact quantities

Interpret each parsed binary64 observation as its exact rational value. Use the
group order in the design. The meanings of m_g, v_g, D, SE, t and nu are the
[Welch formulas](../profiles/independent-two-group-continuous/welch-calculation.md),
with n_g observations and k_g = n_g - 1, evaluated as exact real values.
Use the exact, generally noninteger Welch-Satterthwaite nu, the two-sided
Student-t probability p at that nu, and its 0.975 quantile q for
[L = D - q SE and U = D + q SE](../profiles/independent-two-group-continuous/confidence-interval.md).

An implementation or operation graph does not define a different target value.
Any exact identity is permitted when its resulting comparisons are established.
For these successor checks this replaces the predecessor evaluation-method
restriction NRS-VERIFY-0019; that requirement remains unchanged for Release 1.
Exact evaluation of the Welch formula does not make its sampling approximation
an exact finite-sample test or coverage guarantee.

## Proposed NRS-VERIFY-0038: ordered computability

After admissibility, evaluate these steps in order. The first failing step ends
the check with completed/fail and the reason array shown, in that order.

1. Require n_1 <= 201, n_2 <= 201 and max |x_gi| <= 2^250.
   Otherwise: [`NRS-WELCH-OUTSIDE-PUBLIC-CHECK-DOMAIN`].
2. Require at least two observations per group and SE > 0.
   A small group: [`NRS-GROUP-SIZE-BELOW-TWO`, `NRS-NUMERICAL-COMPUTABILITY-FAILED`].
   Zero SE: [`NRS-ZERO-STANDARD-ERROR`, `NRS-NUMERICAL-COMPUTABILITY-FAILED`].
3. For each group with v_g > 0 require kappa_v,g <= 10^6 and v_g >= 2^-480;
   also require kappa_d <= 10^6. Otherwise:
   [`NRS-WELCH-OUTSIDE-PUBLIC-CHECK-DOMAIN`].
4. Let RN denote binary64 rounding to nearest, ties to even.
   RN(p) = 0: [`NRS-P-VALUE-UNDERFLOW`, `NRS-NUMERICAL-COMPUTABILITY-FAILED`].
   Positive subnormal RN(p): [`NRS-WELCH-P-VALUE-SUBNORMAL`].

If no step fails, the check completes/pass. The exact scales are:

```text
A_m,g = (1/n_g) sum_i |x_gi|
A_v,g = (2/k_g) sum_i |x_gi - m_g| |x_gi|
kappa_v,g = A_v,g / v_g        (only when v_g > 0)
A_D = A_m,1 + A_m,2
kappa_d = A_D / SE
```

Steps 1 and 3 define this version's public-check domain. Outside-domain fail
means only that this version does not check those numerical declarations; it
does not judge the study or the data. Dependent recomputation is not_run,
without outcome, preserving the actual blocking reasons. Zero-SE and underflow
retain their specific-then-generic arrays; subnormal p has its singleton array.

## Proposed NRS-VERIFY-0039: comparison

Exact fields are ordered group IDs, n_g, the supported estimand kind, CI method
`urn:nomue:method:welch-satterthwaite-mean-difference-ci:1`, and
confidence_level = RN(0.95). Missing or unequal exact fields do not pass.
Other declared quantities agree iff |declared - exact| <= their tolerance.
The constants below belong to the check version, never to a Record.

Set tau = 10^-12, sigma = 10^-10; a = v_1/n_1, b = v_2/n_2;
A_a = A_v,1/n_1, A_b = A_v,2/n_2. Let f_nu be the Student-t density.
All quantities and derivatives in these formulas use the exact values.

```text
tol_m,g = tau (|m_g| + A_m,g)
E_g = (n_g/k_g) tol_m,g^2
B_a = tau A_a + E_1/n_1
B_b = tau A_b + E_2/n_2
tol_D = tau (|D| + A_D)
tol_se = tau SE + (B_a + B_b)/(2 SE)
tol_t = tau |t| + (tau A_D + |t| (B_a + B_b)/(2 SE))/SE
tol_nu = tau nu + |d nu/d a| B_a + |d nu/d b| B_b
dp_nu = max(|p(t,nu-tol_nu)-p(t,nu)|, |p(t,nu+tol_nu)-p(t,nu)|)
dq_nu = max(|q(nu-tol_nu)-q(nu)|, |q(nu+tol_nu)-q(nu)|)
```

Here nu = (a+b)^2/(a^2/k_1+b^2/k_2), and q(nu) is its 0.975 quantile.

| Declared quantity | Tolerance |
| --- | --- |
| Group mean | tol_m,g |
| Group sample variance | tau (v_g + A_v,g) + E_g |
| Mean difference | tol_D |
| Standard error | tol_se |
| Test statistic | tol_t |
| Degrees of freedom | tol_nu |
| Two-sided p | sigma p + 2 f_nu(t) tol_t + dp_nu |
| Lower endpoint L | tau \|L\| + tol_D + q tol_se + sigma q SE + SE dq_nu |
| Upper endpoint U | tau \|U\| + tol_D + q tol_se + sigma q SE + SE dq_nu |

The declared p is in (0,1]; zero never agrees with a positive exact p.
A subnormal declaration may agree when the exact p passes the range check.
The declared lower endpoint does not exceed the upper endpoint.
Any disagreement completes/fail with `NRS-DECLARED-RESULT-MISMATCH` and the
applicable specific mismatch reasons. Serialization is the general mismatch
reason first, then standard error, confidence level, confidence interval and
interval order, omitting absent reasons; this is separate from the specific-then-
generic computability arrays above.
The selected examples preserve the exact arrays; order is not normalized.
Specific reasons are `NRS-STANDARD-ERROR-MISMATCH`,
`NRS-CONFIDENCE-LEVEL-MISMATCH`, `NRS-CONFIDENCE-INTERVAL-MISMATCH`
(endpoint or CI method), and `NRS-CONFIDENCE-INTERVAL-ORDER-INVALID`.
Otherwise the check completes/pass. Evidence identifies each mismatch and its
declared value and RN(exact value).

These acceptance widths are a Protocol design choice, not a universal
algorithm-error guarantee. Passing does not establish the sign of D or t
within its tolerance, or p < alpha versus p >= alpha near a significance
threshold. No significance boolean or extra significance rule is proposed.

## Proposed NRS-VERIFY-0040: established decisions

Report a numerical outcome only after establishing every domain, range and
comparison decision on which it depends. Refine an unresolved decision until
it is established or a declared processing-time or memory limit is actually
reached. In the latter case emit the existing resource_limit refusal for
processing_timeout or memory_limit instead of inventing a statistical fail,
outside-domain decision or report. Tool failures remain execution failures.
No fixed precision ceiling certifies a mathematical decision.

## Reports and migration

The separate conformance result is followed by exactly four verification slots:
integrity, admissibility, computability, recompute. Each has its exact check ID,
version and scope; evidence is closed by role. No overall VERIFIED flag exists.
An execution error has error information and no statistical outcome. A blocked
dependent has not_run and no outcome. Reason arrays retain their order.

Report acceptance additionally binds the Record ID, revision, independently
recomputed digest, exact bundle, selected analysis, owning dataset/design/result
and scope kind/ID. Schema acceptance does not establish these equalities.
The examples use explicitly synthetic analysis/result scope URIs. Final
production local-ID-to-scope-URI mapping and pre-conformance failure cases remain
landing questions; the RFC does not silently adopt the example mapping.
The closed Welch report is self-contained except for the existing public common
identifier schema. It neither accepts another family's report nor changes that
family's proposed schema.

Migration never consists of relabeling an old Record. Preserve its original
bytes, digest, interpretation and outcomes. A successor needs the complete new
tuple, validated method-to-Contract transformation, preserved payload assertions,
a new revision/time/digest and its own verification. Do not copy a signature or
pass, invent a missing declaration or infer original analysis timing. Record-ID
continuity requires a producer choice. No conversion tool is supplied here.

Data in R1 cases A2-V-006 and A2-1-V-003 become outside this proposed domain,
although R1 passed them. A2-C-002 also becomes outside-domain; it was already an
R1 numerical-computability failure, not a pass. Groups above 201 are excluded.
These are consequences for new successor Records, not edits of historical R1
judgments. No statement about the older document/conformance tension is made.

## Research basis and review disposition

The statistical definition follows Welch (1947),
https://doi.org/10.1093/biomet/34.1-2.28, and the Welch-Satterthwaite formulation;
an inspectable formula reference is the NIST/SEMATECH unequal-variance t section,
https://www.itl.nist.gov/div898/handbook/eda/section3/eda353.htm.
Pinelis, https://arxiv.org/abs/1101.3289, Theorem 1.1, establishes positive-tail
monotonicity over positive real degrees of freedom; inversion gives the quantile
ordering used in the endpoint sensitivity terms. These sources do not prescribe
the chosen constants, domain cutoffs or machine tolerance.

The exact mean/variance derivatives give componentwise sensitivity scales.
For a two-pass variance centered at m+delta, the exact extra term is
n delta^2/(n-1), which explains E_g. This motivation is distinct from an
end-to-end accuracy theorem for an arbitrary library or producer. No global
maximum relative-p acceptance width or universal stable-producer guarantee is
claimed. Implementations remain responsible for meeting the comparison rule.

An independent source-first cross-family review dated 2026-09-28 returned
GO_WITH_NITS for the numerical and coupled carrier subject. The resulting
wording and identifier repairs received a separate fresh-conversation
CONFIRMED_WITH_NITS review the same day; the remaining two editorial nits do
not block discussion. Neither verdict grants adoption or runtime support.
The accountable author is Tasuku Kobayashi; candidate preparation used Claude,
and those two reviews used Cursor-hosted Grok 4.6. This is a summary of their
bounded dispositions, not a claim of human statistical certification. The public
projection and its schema packaging were checked by OpenAI Codex; that check is
not a new source-first Research Gate review.

## Questions and decision boundary

Please comment on: the exact successor tuple; acceptance widths; the bounded
domain and its loss of coverage; ordered unsupported/underflow/subnormal outcomes;
the established-decision rule; reason-code applicability; migration; shared
registry coordination; sign/significance non-claims; and proposed requirement
IDs. Alternatives that widen scope require their own evidence and review.

The highest proposed changed tier is EXPERIMENTAL. Existing CORE and
STABLE-INTENT clauses are reused without changing their meaning; if discussion
requires changing one, its longer window applies. The public discussion lasts
at least seven full days from the RFC issue's creation timestamp, as required by
[the tier registry](../../registries/stability-tiers.yaml). A material proposal
revision restarts the applicable discussion period. Posting starts discussion;
adoption, coordinated landing, freeze and issuance require later decisions.

Before landing, resolve the explicit carrier/report mapping questions, bind
the proposed requirements and check/reason/schema identities in the live
registries, add the selected conformance manifest rows, update public contract
surfaces and generated views, and run the complete public validation suite.
Until that later landing, ER-2 is not marked "successor available".
R5 acceptance, analysis-timing assurance and any other family's RFC are outside
this RFC; successful recomputation is not added as a prerequisite to declaration
projection. Security reporting, licensing and patent terms remain those already
published in this repository.
