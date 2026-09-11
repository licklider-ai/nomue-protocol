# R4 bounded primary-source and derivation review

Date: 2026-09-11. Commission input:
`bc1c1ace426d51e55c9551090f6e400af2ac17d2`.

## Disposition

**REPAIR_REQUIRED** for treating the combined packet as a fully closed Research
Gate input. The mathematical and proof-to-code claims reviewed below receive
bounded **GO** findings. The exact IEEE representation/rounding source claim is
**INPUT_INCOMPLETE** because the normative text was not directly available from
the official publisher. Promotion should either supply a lawfully accessible
pinned copy for clause-level inspection or narrow the record so the field formula
and rounding rule are explicit project assumptions/derived conventions rather
than claims said to have been directly verified against IEEE 754-2019.

This is not a whole-Release GO, adapter GO, runtime-platform GO, public-comparison
GO, or approval of an unknown p-generating model.

## Independence and provenance

This pass was performed by a separate GPT model instance commissioned expressly
as the repository's separate-model review. It used OpenAI Codex Work Mode with
web-search retrieval and local CPython execution. The exact served build and an
authenticated model binary/version attestation were unavailable. The target
author contexts were not used to generate this review, and no subagent was used.
The earlier limited reviews at `87adcec...` and `e7ddd16...` were inputs, not
treated as primary-source substitutes. There was no human expert, external peer,
or institutional review.

The review used an isolated clone detached at the commission commit. It did not
inspect or depend on concurrent adapter work. Author inputs were the exact Git
objects `2864903316b4b4b2b219a56b42c535bfec7935b3` and
`8d1979a4cf91012d86d57df40e5a847e2f00a358`.

## Claim-level findings

| Claim                                                               | Finding                                           | Source fact, independent derivation, convention, and limit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Binary64 values decode as integer multiples of `U^-1`, `U=2^1074`   | **GO algebra; INPUT_INCOMPLETE source**           | The candidate formula is internally exact: subnormal field `f` maps to `f/U`; normal fields map to `(2^52+f)2^(e-1)/U`, with the sign bit applied. Independent checks matched `as_integer_ratio` at zero, signed zero, minimum subnormal, minimum normal, unity, and maximum finite. The official IEEE catalog establishes the standard identity, but the normative format clauses were not directly inspected. The target is the represented observation, never a pre-quantization decimal or measurement.                                                                             |
| Integer moments, contrasts, coefficients, SS, SSE and df            | **GO**                                            | With orthogonal sign columns of squared length `4n`, `beta_j=C_j/(4nU)`, so `SS_j=C_j^2/(4nU^2)`. The declared estimates give `beta_A=d_A/2`, `beta_B=d_B/2`, `beta_AB=d_AB/4`. The pairwise identity `sum_(i<j)(z_i-z_j)^2=n sum z_i^2-(sum z_i)^2` gives `SSE=E/(nU^2)` and residual df `4(n-1)`. These are displayed algebra, not external-source claims; accepted normal-model scope supplies the already-reviewed design interpretation.                                                                                                                                           |
| Rational F and exact SSE-zero boundary                              | **GO**                                            | Substitution yields `F=(n-1)C^2/E` for `E>0`. Since `E` is a sum of within-cell pairwise squares, `E=0` exactly when every cell is internally constant; cells need not equal each other. Under the retained proposal, this boundary has no F/tail. Positive SSE whose binary64 projection is zero remains positive.                                                                                                                                                                                                                                                                     |
| Adjacent-float ordering, midpoint parity, reflection and subnormals | **GO algebra/code; INPUT_INCOMPLETE source**      | Positive finite binary64 encodings are monotonically ordered by their unsigned bit patterns; exact integer comparison finds the floor encoding. Comparing twice the target with the sum of adjacent endpoints implements nearest distance, and choosing the endpoint with even low significand bit resolves ties. Negating and swapping endpoints preserves distances and evenness, including negative zero. The fixed `2^-1074` lattice includes subnormals without a separate approximation. Full IEEE clauses were unavailable, so the mapping to the standard is not source-closed. |
| Refusal beyond maximum finite                                       | **GO as project convention**                      | Returning no point projection for every exact magnitude above maximum finite is stricter than ordinary IEEE round-to-nearest overflow behavior. The author discloses this accurately. It is an admission/range convention and must not be presented as the standard's rounding result.                                                                                                                                                                                                                                                                                                  |
| Central F-to-beta transformation                                    | **GO**                                            | NIST's F CDF formula gives `CDF(f)=1-I_x(nu/2,1/2)` for numerator df 1 and `x=nu/(nu+f)`; hence the survival probability is `I_x(a,1/2)`, `a=nu/2=2(n-1)`. DLMF 8.17.1--4 supplies the regularized-beta definitions and symmetry.                                                                                                                                                                                                                                                                                                                                                       |
| Positive finite sum and normalization                               | **GO**                                            | Substituting `t=1-u^2` gives `I_x(a,1/2)=int_r^1(1-u^2)^(a-1)du/h_a`, `r=sqrt(1-x)`. Expanding after `u=r+(1-r)v` and integrating the beta monomials produces exactly the stated `a` positive terms. Independent expansion verifies `h_a=sum_j (-1)^j C(a-1,j)/(2j+1)=2^(2a-1)a!(a-1)!/(2a)!`. This finite sum is derived here; DLMF 8.17.5 does not apply because its two parameters are integers and the second R4 parameter is `1/2`.                                                                                                                                                |
| Root bracket and positive-monomial enclosure                        | **GO**                                            | Integer square root gives `l^2<=z<=u^2`. The identities `d=x/(1+r)` and `s=1+r` yield ordered endpoint bounds. Every coefficient and exponent in every monomial is nonnegative, so endpoint substitution encloses each term and their sum. No independence assumption between `d` and `s` is needed.                                                                                                                                                                                                                                                                                    |
| Relative enclosure width                                            | **GO, bounded**                                   | Both endpoint ratios equal `rho=(1+u)/(1+l)` and each monomial has total degree `2a-1`, so the sum's unclipped upper/lower ratio is at most `rho^(2a-1)`, with `rho<=1+2^-b`. This is valid for finite positive F and fixed integer `a`; it does not prove binary64/Decimal runtime error or a practical full-domain budget.                                                                                                                                                                                                                                                            |
| Polynomial oracle orientation                                       | **GO**                                            | `H'_a(r)=(1-r^2)^(a-1)>=0`; therefore `l<=r<=u` implies `1-H(u)/h_a <= Q <= 1-H(l)/h_a`. The lower/upper orientation is correct. Exact rational cancellation is allowed, but the route is not claimed as a floating implementation.                                                                                                                                                                                                                                                                                                                                                     |
| Positive-series oracle and remainder indexing                       | **GO**                                            | Expanding `(1-t)^(-1/2)` gives positive `c_k`, and the implemented ratio is `<x`. After a current term has been included, `next/(1-x)` bounds the entire unadded remainder. The code checks that bound before adding `next`, then returns `[prefactor*total, prefactor*(total+remainder)]`; the indexing is consistent. A cap raises an error, so no value is guessed.                                                                                                                                                                                                                  |
| Projection of intervals and monotone composition                    | **GO, conditional**                               | Round-to-nearest/even is nondecreasing. Equal rounded encodings of valid lower and upper bounds therefore determine the enclosed target's encoding; unequal encodings correctly remain unresolved. Since the central-F survival function decreases, `[L,U]` for exact F transports to `[Q(U),Q(L)]`. This does not certify an adapter implementation or turn a rounded F into exact F.                                                                                                                                                                                                  |
| Conservative resource claims                                        | **GO as upper-bound reasoning; no support claim** | The integer bit bounds and finite loop counts are deliberately loose but conservative under `n<2^51` and `abs(z)<2^2098`. The tail monomial and series growth descriptions are also conservative operation/operand reasoning. Benchmarks and the observed 251-series-step maximum cannot establish a supported count, memory, latency, or platform domain.                                                                                                                                                                                                                              |

## Independent bounded checks

`independent_checks.py` uses only Python integers, `Fraction`, `isqrt`, and bit
packing. It does not import either author candidate. It checks selected binary64
class boundaries, pairwise versus moment SSE, both normalization forms for
`a=1..16`, the exact `n=4, f=4` tail witness `35995/524288`, and four rational
root enclosures. `RESULTS.json` records the passing run. These checks support the
derivations; they are not exhaustive implementation verification or a runtime
support study.

## Gate and reuse boundary

The separate-model requirement is satisfied as to investigator/model separation
for this bounded pass. The DLMF and NIST F/beta primary-source basis is directly
inspected and the dependent algebra receives GO. The IEEE-dependent source leg
remains incomplete at clause level, so the combined Research Gate should remain
open until that source defect is repaired or the claim is explicitly narrowed.

The accepted normal-model source split is reused only for the balanced complete
replicated 2x2 contrasts, normalization, rank/df, and individual-null F meaning.
Nothing here reopens or extends that model. Reopen this review for different
degrees of freedom, unbalanced/missing cells, different rounding or output rules,
an adapter implementation, finite-precision operation graph, source conflict, or
expanded resource/platform support.
