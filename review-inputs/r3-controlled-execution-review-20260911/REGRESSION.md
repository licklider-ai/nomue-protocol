# Coordinator regression receipt

Date: 2026-09-11. Public repository only. Linux x86_64, Node v24.19.0,
Python 3.12.14. The local cgroup mount is read-only; local controls do not
establish kernel enforcement. Dedicated CI supplies that separate evidence.

The coordinator reran the unchanged envelope author suite and archived prior
reviewer suite with NOMUE_EXPERIMENT_PYTHON selecting the absolute Python 3.12.14
executable. The author suite printed 82 controls in 24 groups passed and 132
legacy fixtures passed. The archived investigator script printed 93 controls,
93 passed and no failures. After restoring generated JSON formatting through the
repository Prettier configuration, those earlier tracked files had no diff.
These are coordinator reproductions, not a new independent numerical review.

The current file transport/preflight suite passed 7 local controls; its exact
output is local-results.json.txt. Its private-output control contains five
ineligible-number/string cases and four precedence cases. Test grouping is not
a count of distinct scientific expectations.

Two implementation-review repairs were made before final integration:

1. Check elapsed time after the last selector wait/leader exit as well as before
   it. This prevents a just-late completion from bypassing the deadline.
2. Reject escaped lone surrogates, exponent overflow, negative zero/underflow and
   integer tokens outside finite binary64 range in the generated-output transport.

The original 20-control dedicated CI run passed on e2c998124078b737d5e0776a7fc0c2094b51fa36.
Later controls add scoped output preservation, cancellation, inherited-descriptor
sanitization and private-output eligibility. Final CI evidence is pinned in the
integration receipt; the earlier run is not substituted for the final candidate.
