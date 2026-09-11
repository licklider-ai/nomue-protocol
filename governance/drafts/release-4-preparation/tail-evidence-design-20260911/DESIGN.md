# R4 submitted probability-evidence design

## Status and fixed scope

Unfrozen informative proposal, 2026-09-11. Prepared by OpenAI Codex in the
continuing author context; no independent review is claimed. This proposal
specifies the previously deferred evidence consumer, not its implementation or
promotion to a public check. No authoritative surface or gate state changes.

| Input                                 | Fixed commit                               | Reuse                                                                       |
| ------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------- |
| Complete-output experiment / PR #295  | `f8f3feb71404962262d1a9f78b5d37f04454f746` | Exact raw-input target, complete-output admission, dependency-origin repair |
| Output design / PR #293               | `1ae29058f44dce65ba3a3ef0d018bdbea0d9f940` | All A/B/AB outputs and conservative finite representation                   |
| IEEE supplement / PR #294             | `864766232988181e72ae18c235dbc815466b3a1d` | Bounded binary64 and rounding source confirmation                           |
| Fixed-corpus checker repair / PR #285 | `bc1c1ace426d51e55c9551090f6e400af2ac17d2` | Conservative containment distinction, not a generic API                     |
| Original tail review / PR #283        | `e7ddd16f6d2272cb7c9267f7f2aa8d35103f1c44` | O2 false singleton witness                                                  |

The first consumer checks all three individual-null tail quantities against
independently supplied expected raw cells and revision. It reuses PR #295's
complete-output admission. The submitter does not supply its own authoritative
expected input, F, degrees of freedom, method identity or execution limits.
Fixed cell order remains A0B0, A0B1, A1B0, A1B1; contrasts remain A, B, AB.
This experimental identity is not a replacement for future Record/Contract and
analysis identifiers. Input authenticity and model validity are not established.

## In-memory submission proposal

The consumer takes `expected_cells`, `expected_revision`, and `submitted` as
separate arguments. Expected inputs come from the caller's own context, not from
fields selected by the submitted object. The envelope uses only exact built-in
Python dict, tuple, str and int values. No subclasses, bool-as-int, float interval
endpoints, Fraction objects, extra keys or optional diagnostic fields are accepted.
This is an in-memory experiment, not a JSON wire schema; arbitrary large JSON
numbers are not introduced into the Protocol's JCS-eligible input surface.

| Object            | Exact proposed fields and constraints                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Envelope          | `revision`, `digest`, `rows`; revision uses PR #295's bounded ASCII alphabet; digest is 64 lowercase hexadecimal characters                                       |
| Rows              | Tuple of exactly three row dictionaries, ordered A, B, AB                                                                                                         |
| Row               | `contrast`, `df`, `lower`, `upper`, `encoding`                                                                                                                    |
| Contrast          | Exact case-sensitive A, B or AB matching its required position                                                                                                    |
| df                | Tuple of two built-in ints, numerator exactly 1, denominator 4..256 and later equal to the recomputed target                                                      |
| Rational endpoint | Tuple `(numerator, denominator)`; nonnegative numerator and positive denominator, each at most 262144 bits; reduced by gcd=1; no sign or alternate-zero encodings |
| Encoding          | Built-in int in 0..0x3ff0000000000000, identifying a nonnegative binary64 value in [0,1]                                                                          |

The endpoint bound is a proposed consumer work limit, not a theorem that every
future producer interval fits it. Reviewer-supplied observation: over the
admission frontier (maximum admitted width at n=2, 7, 9, 33, 46 and 65) the
pinned candidate's 512-bit enclosure endpoints need at most 161,297 bits per
component, about 62 percent of the cap; a gcd or one comparison at the cap took
about 0.1 second on that host. See `check_design_witnesses.py`. Twelve bounded endpoint integers total at most
384 KiB of integer magnitude payload, excluding object overhead. Their gcd and
cross-products require separate measurement. Oversized integers are rejected
before gcd, Fraction construction or cross-multiplication. Reject numerator
larger than denominator before normalization. Zero is represented only as (0,1).
No submitted precision, provenance assertion, comparison counter, URI or code is
consumed. The consumer's fixed code identity defines the recomputation schedule.

## Verification order

1. Validate expected cell shape/count, revision and primitive observations using
   the same bounded checks as PR #295, before any exact arithmetic. The successor
   can extract that small input-validation stage without changing its decisions;
   avoid a second drifting implementation. This extraction requires regression
   checks against the fixed wrapper. Own one snapshot for the rest of the call.
2. Check all submission container shapes and lengths, then key types before key
   equality/hashing, then all scalar types and size/range limits. Do not compare
   unchecked nested objects. Reject the entire envelope on a malformed row.
3. Compare revision and recomputed input digest, fixed contrast order and df to
   the expected context. These inexpensive identity checks precede tail work.
   A numerically equal F from different raw data is not equivalent evidence.
4. Validate reduced rational form, endpoint probability domain and lower<=upper.
   Use bounded integer operations only after every operand size has passed.
5. Run the fixed complete-output recomputation exactly once for the owned expected
   input. Reuse its full representation and all-contrast resource preflight. Any
   refusal or unresolved tail ends the consumer without probability acceptance.
6. For each contrast compare the submitted interval and encoding as below. Accept
   the scoped probability evidence only after all three rows pass. An earlier
   successful row never becomes an overall acceptance if a later row fails.

The implementation should reuse the wrapper's snapshot/identity helpers and exact
failure ordering through a bounded refactor, rather than hash a second differently
serialized snapshot. Submitted intervals never influence precision, cache keys,
source selection or expected numeric values. No new interval-F entry point is
introduced; the trusted target is the exact F from raw-data recomputation.

## Precise acceptance claim

Let C=[cL,cU] be the pinned candidate enclosure returned at the first resolving
precision in the fixed (128,256,512) schedule. Let S=[sL,sU] be the submitted
interval and E the submitted binary64 encoding. The local check requires:

- `0 <= sL <= cL <= cU <= sU <= 1`;
- both endpoints of S round to E under the fixed nearest/even projection;
- E equals the encoding of the recomputed complete-output target;
- exact expected input identity, contrast and df match for every row.

The third condition is implied by the first two, because rounding is monotone
and C lies inside S; it is retained as an explicit defensive check, not as an
independent source of evidence.

Assuming the fixed candidate enclosure contains the mathematical target, these
conditions establish that the submitted interval contains that target and its
encoding is the determined rounded value. This is a conditional numerical
statement, not an independent proof of candidate correctness or model validity.
The runtime probability oracle is not executed; its separate formula supports
test evidence only. Source, interpreter and dependency-origin trust boundaries
from PR #295 remain applicable, including the absence of a hostile-code sandbox.

Widening C is permitted only inside one rounding cell. Widening to [0,1] fails the
encoding test. A tighter valid interval may fail containment and is therefore
rejected conservatively, not declared mathematically false. A singleton excluding
the target fails containment even if it shares the displayed encoding. No relative
or absolute tolerance, approximate equality or overlap-only shortcut is used.

The scoped success means probability-evidence consistency for this expected
experiment. It does not certify submitted estimates/SS/SSE/F (none are accepted),
authorship, real-world data authenticity, or scientific validity. Recomputed
mandatory arithmetic is used for admission, not as validation of a submitted
full Record. No overall VERIFIED status is introduced.

## Resource and closure boundary

The next experiment measures the whole consumer, including decoding, gcd and
containment, under a 30-second / 256-MiB isolated-process test envelope. The
wrapper's 12.45-second author observation and 14.6-second reviewer frontier
observation do not establish a consumer bound. Large submitted denominators and
cross-products need their own worst-admitted probes. A timeout/crash is a failed
experiment, not a successful designed refusal. Narrow limits if evidence demands.

PR #288's submitted-evidence acceptance row is now designed here but remains
UNIMPLEMENTED. Close it only after the consumer, O2 regression and independent
checks exist and receive bounded review. No official schema, public reason code,
check-version comparison rule, runtime certification or release decision follows
from this design. Interval-F carriers and R3 integration remain separate work.
