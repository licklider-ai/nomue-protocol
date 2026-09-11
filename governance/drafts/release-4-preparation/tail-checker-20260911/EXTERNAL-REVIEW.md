# External adversarial review receipt and response

Received from the user on 2026-09-11 in the management conversation. Target:
PR 285, commit 431b0e7e30d9b8fe6f097f2a00f19124e4a880d0. The submission says
no GitHub review/comment was posted. Reviewer identity, model, exact environment
and separate-model eligibility were not supplied; none is inferred. This record
is an attributed summary of that external report, not authentication of its author
or an independent scientific Research Gate receipt. The manager is the repair author.

Reported verdict: no blocking defect; reproduce original 220 rows, 39 rejections
and six old-checker survivors. Reported additional checks: all rejection reasons
were intended ValueErrors, pure-Python Decimal agreed on seven sampled rows,
recomputed bounds overlapped on all rows, CI five jobs succeeded. Those external
observations are testimony; the local repair results below are separately executed.

| External observation                                                                | Response in this successor                                                                                                                                                   |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Medium: wording conflates truth containment with containing fixed recomputed bounds | Accepted distinction. REPORT and O2 test label narrowed. Added valid tighter oracle-interval rejection witness. Original O2 point's exclusion proof remains a separate fact. |
| Low: JSON 1e999 bypasses parse_constant                                             | Added finite parse_float hook; exact-message regression rejects overflowed literal.                                                                                          |
| Low: Context inherits rounding/traps from DefaultContext                            | Explicit ROUND_HALF_EVEN, trap set, flags, capitals and clamp. Regression mutates rounding and Inexact trap, clears cache and confirms unchanged target.                     |
| Low: TypeError/KeyError or wrong ValueError can count as rejection                  | Catch ValueError only and require exact expected message. Every rejection records its actual reason.                                                                         |
| Low: outcome counters are literals                                                  | Count accepted rows and old-checker survivors from execution; store evaluated O2 bound predicate. Fixed corpus size remains an input assertion.                              |
| Info: recomputed intervals are not explicitly compared                              | Added recomputed-interval overlap check before submitted evidence checks.                                                                                                    |
| Info: environment fields make result replay dirty                                   | Explicit reproduction note in REPORT.                                                                                                                                        |

The reviewer described five minor findings, then separately listed two Info
observations; all seven listed observations are tracked above. The broad phrase
"evidence checking" is retained only in historical records; current navigation
uses fixed-enclosure recomputation terminology. No external verdict is silently
extended to the repaired head.

Local follow-up: 220 original rows, 220 equivalent encodings and one wider valid
row pass; 41 rejections match the intended messages. The old checker still
accepts the five ancillary mutations and O2 point; the successor rejects them.
This confirms repair behavior, not a new independent review.

## Adversarial review checkpoints for the next work

This is a work plan, not a change to repository governance. Commission and record
external adversarial review after this bounded repair, at the first complete
rational/interval adapter, and before supporting a domain or freezing public
comparison/refusal rules. Reopen sooner for a counterexample, changed mathematical
target or input binding, widened domain, or evidence-checker trust change. Each
receipt records exact input identity, reviewer/provenance limits, findings, their
disposition and the reviewed successor; a new chat alone is not independence.
