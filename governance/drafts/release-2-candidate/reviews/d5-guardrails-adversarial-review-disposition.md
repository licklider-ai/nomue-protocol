# D5 guardrails adversarial-review disposition

## Review identity

- Product head reviewed: `c935611523bac4b85578fd8eddef74056b6b53cc`
- Base: `f626fcc1f81cace73569739f3c26f7a544b3c417`
- Review type: external, adversarial, diff-scoped
- Verdict: **GO**
- Blockers: none
- Targeted external research requested by the reviewer: none

The reviewer verified the 732-file bundle manifest, reproduced the exact product
tree and diff, ran the full repository check in a clean checkout, and executed about
92 additional mutation and numerical probes. Evidence generation may proceed after
the two SHOULD-FIX findings below are repaired. The p-value and critical-value
certificate work is independent of the first finding and was not blocked.

## Finding disposition

| Finding                                                                                                                                                   | Severity     | Disposition                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The spike used a bottom-up adjacent-pair tree while the selected G4 research prototype used a recursive `floor(n / 2)` split for non-power-of-two counts. | SHOULD-FIX   | Accepted. The spike, readiness record, documentation, and tests now pin the recursive floor-half split.                                                                                     |
| The readiness validator accepted undeclared keys and did not pin three operation-graph fields.                                                            | SHOULD-FIX   | Accepted and broadened to the complete checkpoint boundary. Every object-level key set, operation stage, evidence route, refusal class, review binding, and open-state claim is now pinned. |
| A secondary p-value enclosure of `[0, 1]` carried no independent information but passed the overlap check.                                                | NICE-TO-HAVE | Accepted. Secondary and low-df closed-form probability paths now reject the vacuous full probability interval.                                                                              |
| The illustrative df=2 confidence interval used a slightly incorrect critical value.                                                                       | NICE-TO-HAVE | Accepted. The two endpoint values were replaced with the binary64 result from the independently confirmed df=2 fixed-95-percent critical value.                                             |

## Review-window classification

These repairs do not change the RFC semantic scope, issue an identifier, register
support, freeze a numerical contract, or complete R2-D5. They do not restart the
public review window.

The following work remains open as already declared:

- reproducible Arb/FLINT p-value enclosure evidence;
- method-distinct secondary evidence and executed df=1/df=2 closed forms;
- fixed-95-percent critical-value table certificates and table-level completeness;
- generator, environment, and output hash binding;
- the supported domain, df limit, subnormal policy, runtime tail procedure,
  tolerances, and final refusal-code spellings; and
- independent numerical-review disposition before final R2-D5 approval.
