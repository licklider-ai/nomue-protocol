# Corrected independent expectation authority

Status: **UNISSUED CANDIDATE**. CORRECTED INDEPENDENT EXPECTATION FREEZE.

This revision corrects T10 expectation authorship before T09 implementation repair.
It derives from pre-existing authority, not from candidate actual output. No candidate
has been re-executed for this revision. INPUTS pins every source at the original stop
commit f18712ac5b9ca0a1facd60cb0d04184e5994c398.

## Exact reproducer and authority

The unchanged input is structure/overflow-number, token 1e400, input SHA-256
`a1f676db5dbe751ebcc0ffcc684890c48f98b9dc0c7815a341d610ff14c999e1`.
T07 evidence supports local structural rejection (NRS-SCHEMA-INVALID at the first
cell mean) and rejection before numerical work. It does not own the final output.

NRS-CANON-0005 forbids inferred/partial digests. Its existing explanatory clause
explicitly calls nonfinite values reaching canonicalization a canonicalization
failure, reported with NRS-CANONICALIZATION-FAILED. NRS-CORE-0011 requires a distinct
refusal instead of a fabricated report. The existing refusal table assigns valid
JSON outside the numeric model to canonicalization_failure. The refusal schema
requires a nonempty unique reason_codes array and no report/check carrier.
NRS-VERIFY-0025 binds this reportless refusal to exit 2. These sources jointly fix
the affected observable behavior without changing Protocol meaning.

## Revised observable expectation

- execution/refusal artifact, refusal_kind=canonicalization_failure;
- output_type=nomue-verifier-refusal;
- existing draft.3 refusal schema identity;
- reason_codes includes NRS-CANONICALIZATION-FAILED;
- no report, conformance report, verification_results or quantity evidence;
- existing external/reference CLI bucket 2.

Numerical call count 0 is an internal regression observation supported by T07's
pre-numerical rejection and the dependency contract. It is not invented as a new
external refusal member. No downstream four-not_run result is expected externally.

Authority does not mandate a sole reason, ordering of additional codes, message
wording, timestamps or implementation metadata. Those are deliberately not golden
expectations. The registered code's presence is fixed; optional extra diagnostics
are neither invented nor prohibited. This is not ambiguity about report presence,
failure kind or the meaning of the required reason. Existing candidate refusal
formatting can retain its single-code shape without a new public taxonomy choice.

## Preserved history and independence

Original failed expectations, manifest, builder, mismatch receipt and stop report
remain untouched in t10-independent-expectation-corpus-20260915 and Git f18712ac.
This revision changes only the final expectation for overflow-number. Its local
T07 diagnostic remains historical evidence. All other 173 expectations, every raw
input, 15 projection vectors and seven analytic tail vectors are byte/structure
preserved. A complete revised corpus is frozen, not a runtime override generated
from candidate observations.

The revision builder reads only the allowlisted pinned expected corpus and the two
analytic vector files. It does not import/invoke T07, T08, T09, G5, projection or
S-C helpers, and cannot read observation/result files through its source allowlist.
The checker verifies pins, source reads, imports, call shape, exact one-fixture
revision and original input identities. Shared Python stdlib is disclosed. New
scientific or mathematical derivations are not added in this correction.

Reproduce with build_revision.py before freezing only; check_revision.py is read-only.
The corrected expectation commit precedes both repair and any new candidate execution.
