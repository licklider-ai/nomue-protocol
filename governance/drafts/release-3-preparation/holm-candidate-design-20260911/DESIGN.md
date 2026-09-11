# Ordinary Holm supplied-p candidate design

## Status, provenance and scope

This is an informative proposal for a disposable candidate, dated 2026-09-11.
It is not frozen, implemented, registered or adopted. No public schema, Contract,
check version, tolerance, release gate or candidate classification changes.
The accountable preparation author used OpenAI Codex in the continuing author
context. The derivations and design choices below are author proposals requiring
independent B-2 review; they are not another independent original-source pass.

The first slice transforms a fixed finite family of supplied p-values using
ordinary unweighted Holm. It produces exact adjusted values and their proposed
binary64 displays. It does not calculate input p-values, output scientific
significance booleans, establish FWER for supplied numbers, or create confidence
intervals. Holm-Sidak, weighted Holm, Hochberg, FDR, selected-family inference,
and Welch implementation are outside this slice. Generic arithmetic exploration
does not widen the R3 one-way independent k>=3-group, single-outcome scope.

## Fixed evidence and what it establishes

| Input                                  | Identity                                 | Use and limit                                                                                                                                                        |
| -------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository base                        | dedd26a3e0655001b67e40ccfb741e43ecb07beb | AGENTS, charter, authority and RFC; existing accepted FND1-H01 retained                                                                                              |
| Candidate evidence map, PR #277        | 7f3321b5d8168611baba7647a864d862d87c0a55 | Ordinary Holm priority and distinction between supplied-p arithmetic and scientific validity                                                                         |
| Applicability review, PR #282          | a5213b446df0ec1de09d557c0c6933320f470452 | B-1 missing source-review connection; B-2 design obligations and alpha=1 counterexample                                                                              |
| Bounded original confirmation, PR #289 | 9793fd2f1540c26491651ff02bf51d0bd292f821 | New separate-model direct confirmation of ordinary Scheme 1, strong FWER under valid marginals and no joint-independence requirement; no B-2 implementation approval |
| R3 opening record                      | 7774242f0df81342c5abca97a8fbe40844306fa6 | Existing design scope, 49 classifications, enabling exclusions and numerical holds preserved                                                                         |

The source report is `review-inputs/r3-holm-welch-source-connection-20260911/REPORT.md`
at PR #289's fixed commit. The exact Holm PDF SHA-256 is
43a5a10279f8bf1752a3e8d4a8407f9717579f8f903be4bcd62d969e82d573af.
The original and accepted H01 supply Scheme 1, not the modern adjusted-p formula
or a software rounding/sort/resource policy. IEEE representation/rounding source
confirmation remains separately pending; the bit mapping proposed below is not
claimed to have passed that normative clause review.

## Proposed input and identity contract

Use an in-memory, typed experimental carrier; do not add a JSON parser or public
Record surface. Each p input is exactly eight bytes in network byte order,
interpreted as one finite nonnegative binary64 value in [0,1]. Negative zero,
NaN, infinity, out-of-range encodings and incorrect byte lengths are refused.
No conversion from decimal text, integer coercion or software-specific numeric
subclass is performed by the carrier. A future Record bridge uses the existing
strict parser and gets a separate review.

A carrier contains one family label, one revision label, and an ordered list of
members. Every member has a unique hypothesis label, an origin label, and its
p bytes. All labels are nonempty ASCII strings of at most 64 bytes using letters,
digits, underscore, dot or hyphen. Compare labels by case-sensitive exact ASCII
bytes without normalization: "A" and "a" are distinct hypotheses. Repeated origin
labels are allowed: one
upstream result may provide several distinct hypotheses. Duplicate hypothesis
labels are refused even if p-values agree. Equal p-values with distinct labels
are valid. Counts are derived from the list, never from a second untrusted m.

The returned evidence copies the complete validated carrier, ordered member
bijection and output values. Consumers compare the full carrier to the expected
one; no new digest scheme is needed for this small local experiment. Family,
revision, membership, order, hypothesis and origin substitution all change the
carrier. Labels and copied bytes demonstrate identity consistency only. They
cannot establish honest family selection, completeness or validity of p-values.
No origin URI is dereferenced and no origin-supplied code is executed.

## Exact mathematical target and proposed arithmetic

Let U=2^1074. Decode each accepted input as p_i=P_i/U with integer
0<=P_i<=U. For subnormal binary64 fraction field f, P=f. For normal biased
exponent e and fraction f, P=(2^52+f)*2^(e-1). The zero encoding maps to P=0.
This exact represented value is the target; an ideal unrounded p-value is not
silently substituted.

Sort by increasing P, breaking ties by original index. With one-based sorted
rank i and family size m, define

- T_i=(m-i+1)P_(i);
- C_i=max(T_1,...,T_i);
- A_i=min(U,C_i), and adjusted value a_(i)=A_i/U.

Map A back through the stored permutation. Retain P, T and A plus both index
orders as research evidence. A capped cumulative scan is algebraically equivalent
to capping only at the end; the implementation review verifies that equivalence.
No floating arithmetic is needed for decoding, multiplication, ordering or scan.

### Derivation and equality domain

At level alpha, Scheme 1 reaches and rejects rank i precisely when all ranks
j<=i satisfy p_(j)<=alpha/(m-j+1). Positive integer multiplication makes this
C_i/U<=alpha. For 0<alpha<1, clipping C_i/U at 1 preserves that comparison.
Therefore a_(i)<=alpha is equivalent to the sequential rule on this domain.
This is a downstream derivation, not a quotation from Holm's paper.

At alpha=1, clipping destroys this equivalence: p=(3/4,1) gives adjusted=(1,1),
although the first sequential threshold 1/2 fails. Exclude alpha=1 from every
claimed equivalence. The first candidate takes no alpha input and returns no
rejection decisions. Review diagnostics may compare exact adjusted values with
an exactly identified rational alpha strictly between zero and one. Supply
diagnostic alpha as explicit integers numerator/denominator: binary64 0.05 is
not the exact rational 1/20 and is not silently accepted as that level. Any future
scientific level and comparison rule belong to the check version, not the Record.

For a tie block p_(r)=...=p_(s)=p, T is nonincreasing within the block. Its first
term dominates all later block terms, so all adjusted values in the block agree.
Changing tie labels or order changes only the trace, not member-adjusted values.
The cumulative maximum is nondecreasing, and clipping preserves that order.
With m=1 the map is the identity. Genuine represented zero and one stay supported;
a supplied zero does not establish that the upstream mathematical p was zero.

## Proposed projection and output comparison

Exact A/U is the comparison target. A binary64 display is supplementary and
never substitutes for exact evidence. Proposed projection is nearest, ties to
even, using integer arithmetic once after the final cap. For A>0, let
s=max(bit_length(A)-53,0), divide A=q*2^s+r, and increment q when
2r>2^s or when equality holds and q is odd. The projected lattice integer is
q*2^s. Handle A=0 separately. Exact subnormals need no rounding because s=0;
a carry across a binade is allowed. The proposed support [0,1] prevents overflow.
This convention and its encoding still need the independent numerical and IEEE
mapping review. There is no Decimal calculation or ambient rounding context.

The future checker recomputes the exact A, permutation and display encoding.
Require integer/bit equality, not an absolute or relative tolerance. A changed
exact value is rejected even if its displayed float collides with the original.
A wider probability interval is not an accepted alternative: this slice has no
submitted-interval interface. Uncertain or approximate upstream p-values require
another design; the present result attests only the transformation of the exact
supplied encodings, with scientific validity not asserted.

## Admission, work and refusal proposal

| Limit               | Proposed value and rationale                                                                                                        |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Family size         | 1<=m<=1024, checked before decoding or sorting                                                                                      |
| Label widths        | At most 64 ASCII bytes each, checked before character scans                                                                         |
| P operand           | At most 1075 bits by the validated input domain                                                                                     |
| Uncapped T operand  | T<=1024*2^1074, at most 1085 bits                                                                                                   |
| Sorting of p-values | Deterministic key (P, original index); at most 10240 integer comparisons, with explicit experiment refusal if exhausted             |
| Transform           | m products by integers <=1024, m scan/cap steps, m projections and one inverse permutation                                          |
| Retained carrier    | At most 139392 scalar payload bytes: family/revision labels plus 1024*(64+64+8) member bytes; object/container overhead is separate |
| Trace               | O(m) bounded-width integer/index entries; no all-subset oracle in production candidate                                              |

For unique hypothesis identity, sort exact label bytes and check adjacent
equality: at most 10240 comparisons of at most 64 bytes each, with explicit
experiment refusal if exhausted. Prefer the selected runtime's standard sort;
handwritten mergesort is not required. The implementation packet documents its
comparison/temporary-memory behavior and verifies the admitted worst cases.
Do not assume worst-case constant-time hash-table behavior.

These limits are intentionally proposed rather than inferred from benchmarks.
They bound loops and operands, not wall time or interpreter memory. The first
implementation experiment measures the admitted m=1024 extreme in an isolated
process with a 10-second/256-MiB exploratory harness limit, including output
construction. Timeout or memory termination is an experiment failure, not a
numerical result or a portable support claim. Tune a smaller m before promotion
if this fails; do not silently raise caps. No extra precision loop is needed.

Refusal precedence: carrier shape; label/count lengths; label characters and
unique hypothesis identity; p-byte lengths and value domain; arithmetic; output
identity comparison. Reject the whole carrier, never silently drop an invalid
member and reduce m. Invalid evidence and a harness resource failure remain
separate outcomes. Exact accepted language and reason names await the reviewed
implementation; these are not registered Protocol reason codes.

## Scientific boundary and D0 connection

A future scientific claim requires that, for every relevant model and every true
null i, Pr(P_i<=u)<=u for all u in [0,1], with the family and selection conditions
covered. Neither [0,1] checking nor an origin label proves this. Merely rounding
an ideal valid p-variable may invalidate that property. This slice makes no
conditional FWER acceptance decision for particular submitted inputs.

Map the carrier later to D0's declared family, hypotheses, analysis identity,
origin and result kind. Keep adjusted p-values distinct from omnibus tests,
intervals and FDR outputs. PR #276's unissued example identifiers are not issued
here. This draft does not edit or register its schema. No R2 numeric callback,
range distribution or multivariate-t algorithm is needed for supplied-p arithmetic;
any future upstream integration retains its own gate and validity requirements.
