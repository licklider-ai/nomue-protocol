# Release 2 Paired-t Numerical Candidate

**Status: non-authoritative, unissued, and not numerically frozen.** The Steward has
approved this direction for continued candidate development. That approval does not
complete R2-D5, end the open RFC review, issue a Public Check, register a supported
bundle, or select numerical bounds and tolerances.

The machine-readable checkpoint is `evidence-readiness.json`. It deliberately marks
the p-value and fixed-95-percent critical-value evidence as incomplete. A passing
structural validator test is not an oracle result.

## Operation-stage support-domain candidate

`support-domain-candidate.json` is the first machine-readable support-domain
structure. It is not a supported-domain claim. It orders only the predicates that
the current G4 feasibility spike can execute, binds each predicate to its candidate
failure class and boundary fixture, and keeps runtime support disabled.

`support-domain-boundary-cases.json` exercises every active refusal predicate plus
one ordinary algebra example through `reference/spikes/paired-t.ts`. The corpus
pins exact stage classification for candidate testing; it does not establish a
neighborhood, a rectangular numerical bound, or complete validated scope.

The final support expression remains a conjunction of operation-stage predicates,
a declared validation corpus, and an oracle-enclosure predicate. The latter two
parts remain incomplete. Confidence-interval endpoint representability and p-value
target-format projection are also deferred because the critical-value table,
endpoint truth ledger, and runtime Student-t tail procedure are not ratified.

No blanket subnormal refusal is active. The condition-number and cross-graph
disagreement observations remain diagnostics rather than runtime gates. No `df`
ceiling, statistic bound, tolerance, final table hash, or public refusal-code
spelling is introduced by this increment.

## Candidate four-layer separation

| Layer               | Candidate responsibility                                                                                                      | Current state                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Mathematical target | Paired differences, mean, sample variance, standard error, Student-t statistic, two-sided tail, and fixed 95 percent interval | Defined by the existing informative P1-A design; not issued here  |
| Binary64 procedure  | Canonical pair order, G4 pairwise two-pass algebra, explicit operation-stage failures                                         | Selected for candidate testing                                    |
| Oracle certificate  | Exact-rational input, Arb enclosure, a method-distinct secondary path, target-format-aware projection, provenance             | Nine-cell research seed generated; complete evidence remains open |
| Comparison policy   | Quantity-specific recomputation and truth-error ledgers                                                                       | No tolerance is selected                                          |

The secondary oracle path is method-distinct but not library-independent. It
shares Arb ball arithmetic with the primary and closed-form paths, so their
agreement supplies only weak independence against shared-library defects.

The exact mathematical difference for one pair is the subtraction of the two parsed
binary64 operands after each operand is lifted to its exact dyadic-rational value.
The binary64 procedure then performs one binary64 subtraction. These two levels are
not interchangeable. In particular, different exact differences can round to the
same binary64 difference.

The G4 candidate uses a fixed recursive reduction tree for the mean and for the sum
of squared centered deviations. Each non-leaf range is split after `floor(n / 2)`
items, recursively, so the tree is defined for non-power-of-two pair counts as well
as powers of two. It then divides by `n - 1`, divides by `n`, applies the host native
square root, and divides the mean by the standard error. Fused multiply-add and
implicit extended intermediates are outside this candidate graph.

The graph does not claim cross-runtime bit identity after native square root. The
basic operation order remains pinned, while the square-root and downstream
quantities require an oracle-derived comparison policy unless a later decision
selects a canonical software square root.

## Failure classification

Exact equality of all exact dyadic paired differences is the mathematical
zero-variance state and a Contract-computability refusal. It is not a Profile-
admissibility failure. It stays separate from representational failures such as:

- finite operands whose binary64 subtraction overflows;
- unequal exact differences that binary64 subtraction maps to one value;
- a positive variance or standard-error-squared value that underflows to zero;
- a later intermediate that overflows; and
- confidence-interval endpoints that collapse under binary64 rounding.

This separation prevents a well-defined input whose information is lost by the
candidate graph from being mislabeled as mathematically degenerate.

## Certificate closure rules

`tooling/src/spikes/paired-t-certificate-candidate.ts` checks certificate-bundle
structure without calculating the statistical quantity. It requires:

- exact rational enclosure endpoints rather than display-only ball strings;
- exact binary64 rounding-cell endpoints and strict containment;
- a real interval-overlap check for the secondary path;
- the df=1 and df=2 closed-form path where applicable;
- monotonic midpoint bracketing for every fixed 95 percent critical value;
- increasing precision history with a declared ceiling; and
- generator-commit, generator-file, and environment hashes.

This closes the earlier test-harness holes in which overlap could be forced true,
closed-form paths were labels rather than executed evidence, and summary JSON lacked
the exact cells needed for independent verification. The dedicated CI route now
regenerates a reproducible candidate bundle with the pinned Arb/FLINT dependency.
That bundle is an evidence artifact for the explicit research seed, not a complete
critical-value table or an authoritative numerical contract.

`tooling/r2-paired-t-evidence/` now supplies a pinned, fail-closed pilot generator
and a dedicated CI artifact route. Its current corpus exercises three p-value
certificates, nine fixed-95-percent critical-value certificates at the explicit
research-seed degrees of freedom `1, 2, 4, 5, 6, 10, 30, 100, 1000`, and six
boundary probes. The generated bundle is hash-bound to the generator commit, copied
generator, environment, case manifest, and raw oracle output, then passed through
the candidate certificate validator. A separate table manifest also binds the
ordered df/binary64 cells, the complete certificate bundle, and each individual
certificate.

The missing degrees of freedom are deliberate. The manifest records that the seed
is not contiguous runtime support and leaves `supported_df_max` null. For df greater
than 2, the secondary critical-value route uses segmented rigorous density
quadrature and expands its finite endpoint until the analytic tail bound is below a
case-derived evidence ceiling. For df=1 and df=2, the executed closed form is the
secondary route. The evidence ceiling is only a proof-construction condition; it is
not a runtime tolerance or supported-domain predicate. This increment establishes
that the expanded evidence route is executable. It does not establish table
completeness or change either closure field from `incomplete`.

For a certified binary64 critical value `t_c`, table lookup has zero reproduction
error. Its truth error is different: correct rounding establishes the absolute bound
`|t_c - t_true| <= 0.5 * ULP(t_c)`. The interval endpoint truth ledger must propagate
that absolute quantization term together with mean and standard-error error. It must
not multiply the ULP by `|t_c|` a second time.

## Items intentionally still open

- the maximum supported pair count or integer degrees of freedom;
- the supported input, variance, standard-error, statistic, and p-value domain;
- whether any subnormal stage is supported through target-format-aware evidence or
  refused;
- the runtime Student-t tail procedure and its branch boundary;
- all quantity-specific comparison tolerances;
- the complete critical-value table and its final content hash (the current hash
  binds only the explicit research seed); and
- the final reason-code spellings and authoritative Public Check revision.

Support will be expressed as machine-testable operation-stage predicates plus a
declared validation corpus and oracle claim. It will not be inferred from a single
rectangular `|t|` bound or from agreement among SciPy, R, and Boost.
