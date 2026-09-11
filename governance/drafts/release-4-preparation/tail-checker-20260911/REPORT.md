# Fixed-corpus tail evidence checker repair candidate

Date: 2026-09-11. Disposable research code; independent review pending.

## Purpose and disposition

PR 283 identified two concrete limitations in the fixed-F evidence checker:
unchecked fields/corpus membership (O1), and overlap mistaken for candidate
interval containment (O2). This additive successor implements the review's
minimum fixed-enclosure containment remedy and checks the fixed research packet more completely.
It does not change the probability algorithm, author results, historical reviews,
Protocol verifier, supported domain, public checks or Release 4 gate state.

The author-side regression passes. O1/O2 now have executable repair candidates;
this is not an independent close verdict or a production certificate system.
The new checker is restricted to the fixed 220-case corpus. It is not a generic
F API or the proposed arithmetic-to-tail adapter.

## Provenance and fixed inputs

Prepared by the OpenAI Codex management/implementation session that commissioned
and read the previous work. The session is not independent of that history.
No separate model, subagent, human review or new primary-source reading was used.
The research gate remains incomplete; this disposable candidate is not promoted
into authoritative or production implementation behavior.

Parent: `e7ddd16f6d2272cb7c9267f7f2aa8d35103f1c44` (PR 283 review).
Author input: `8d1979a4cf91012d86d57df40e5a847e2f00a358` (PR 278).
Observed main remains `dedd26a3e0655001b67e40ccfb741e43ecb07beb`.
INPUTS.json pins the four runtime inputs by SHA-256. Their hashes are checked
before loading trusted code. The reviewed directory and parent files are preserved.
The previous local clone depended on an unavailable alternate object directory;
a fresh full public-repository clone was used for this work.

Read scope: repository AGENTS and the previously consulted Charter, Authority,
authority manifest, requirements, ID policy and RFC discipline; fixed author
candidate/oracle/probe/checker; PR 283 proof-to-code mapping, O1/O2 and executable
counterexample. No applicable local governance AGENTS was found. Prior reviews
are reused with their disclosed limits, not restated as this author's review.

## Behavior

This is a fixed-recomputation evidence contract, not a decision procedure for
whether an arbitrary interval contains the mathematical truth. A narrower valid
384-bit oracle interval can be rejected as candidate_bounds because it does not
contain the prescribed 128-bit candidate enclosure. The regression now records
that conservative rejection. The O2 witness itself is below a rigorous lower
bound, but the checker rejects it for missing the fixed enclosure, not by directly
deciding truth membership.

- Fixed row count, order, n, exact F spelling and family come from the separately
  hash-pinned original packet, never from the submitted packet's summary.
- Each candidate interval contains a fresh 128-bit candidate enclosure; each
  oracle interval contains a fresh 256-bit oracle enclosure. The independent
  oracle projection and overlap checks remain additional conditions.
- Exact degrees, route/work, output bits, projection class and mathematical-tail
  label are checked. The Decimal diagnostic is recomputed at the recorded 80
  digits in an explicit context; its supplied error upper bound covers the
  recomputed error against the oracle interval. Decimal is not a truth oracle.
- Packet and row fields are closed. Historical summary counters/status/witness
  are matched to the pinned original; this is metadata preservation, not a claim
  that the checker re-executes every old rejection/refinement experiment.
- Equivalent dyadic representations are accepted. A submitted interval may be
  wider than the recomputed enclosure if both independent enclosure requirements
  and unique-rounding conditions still hold. Error upper bounds may be conservative.
- The file entry point rejects duplicate JSON keys/nonfinite constants and overflowing numeric literals and files
  over 2 MB. Dyadic significands are at most 128 hex digits; integer exponents
  are bounded by 200,000 in magnitude before shifting. These are local research
  budgets, not Protocol admission rules or a full adversarial resource proof.

The trusted boundary includes this checker, its INPUTS.json, hash-pinned candidate
and oracle implementations, Python integer/Fraction/Decimal behavior and the
previous bounded derivations. Recomputing the candidate is not a second independent
proof of its algorithm; it ties submitted bounds to that fixed reviewed algorithm.
An attacker replacing the checker and its trusted pins is outside this model.
No Record input, external URI, signature/authentication or arbitrary family is used.

## Reproduction and evidence

From the repository root, with Python standard library only:

```sh
PYTHONDONTWRITEBYTECODE=1 python governance/drafts/release-4-preparation/tail-checker-20260911/test_check.py
PYTHONDONTWRITEBYTECODE=1 python governance/drafts/release-4-preparation/tail-checker-20260911/check.py
```

The first command rewrites this directory's RESULTS.json, including Python and
platform fields that may differ on another environment and leave a dirty tree. The second checks
the original packet read-only; an optional file argument checks a submitted copy
against the same fixed roster. Numeric caches are process-local, capped at 220
entries and depend only on the trusted row index, never on submitted bounds.

RESULTS.json records:

- 220 original rows accepted with candidate and oracle recomputation.
- 220 equivalent-encoding rows accepted, demonstrating no packet byte-equality
  shortcut for interval evidence.
- 41 altered/malformed cases rejected, including all 13 missing row fields,
  roster size/order/duplicate changes, summary corruption and interval budgets.
- Five O1 field changes and one O2 point interval accepted by the old checker
  but rejected by the successor.

For O2, the stored dyadic point lies inside the 256-bit oracle interval but
strictly below the 384-bit lower bound. Thus its singleton interval excludes
the target. This expectation uses the distinct oracle's rigorous refinement,
not a value generated by the candidate under test. The fixed original 220 rows
still agree with both routes. No new F-law theorem or algorithm was introduced.

## Review and next action

A limited follow-up review can reproduce O1/O2, examine every trusted/untrusted
boundary, test valid widened/equivalent intervals and verify preservation. Review
only these additions against the stated parent; report any repair without editing
old evidence. The review need not repeat all primary-source work merely to assess
this repair, but it cannot close the numerical Research Gate.

After a limited repair review, proceed to a bounded rational/interval adapter and
upstream identity/error composition research, with separate-model source/derivation
confirmation and supported-domain decisions still outstanding. R3 Holm provenance
and design work remains in the previous round handoff; R2 is unchanged. This
repair improves the reliability of evidence checking, not end-to-end R4 maturity
or the set of supported user capabilities.

## External review response

See EXTERNAL-REVIEW.md for the user-supplied adversarial review of commit
431b0e7e30d9b8fe6f097f2a00f19124e4a880d0 and item-by-item response. The follow-up
regression includes explicit rejection reasons, DefaultContext mutation, JSON
1e999 and a narrower valid enclosure. No repaired-head external GO is claimed.
