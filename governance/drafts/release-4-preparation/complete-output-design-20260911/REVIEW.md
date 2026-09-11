# Review handoff and work boundary

## What this round delivers

PR #291 left output completeness and representation open. This packet proposes
one concrete minimum set, explicit finite/zero behavior, full-analysis admission
ordering and counterexamples for the successor wrapper. No numerical code or
existing evidence was modified. It does not report wrapper tests as passing.

Authoring role: preparation worker using OpenAI Codex in the continuing author
context, 2026-09-11. Existing fixed code and proposal records were inspected;
no new external primary source was read and no independent review was performed.
The original IEEE acquisition limitation was subsequently addressed by PR #294;
its bounded source finding does not approve this output policy. The hand-derived witness
is an author-side rational cross-check, not an independent investigator's result.

## Bounded external adversarial review requested next

Review this design before implementing the complete-output wrapper. Focus on:

- Is requiring positive displayed SSE while allowing rounded-zero SS/F coherent
  and clearly narrower than mathematical computability?
- Can any missing contrast, failed mandatory projection or unresolved tail be
  misrepresented as a complete output?
- Does preflight cover all contrasts before expensive tails, and does the later
  interval variant cover both endpoints without implying it already exists?
- Are identity, primitive types, revision limits and refusal precedence bounded
  without changing existing authoritative Record semantics?
- Is any source-dependent convention presented as settled, or a three-tail runtime
  guarantee inferred from a one-tail benchmark?

Record the exact reviewed commit and tree, scope, findings, dispositions and
provided reviewer/model identity. Do not infer independence from a new thread.
Small repairs can be made in one intake round; material disagreement about output
semantics is a separate bounded design task. Review closure means this proposal
is ready for a disposable experiment, not a source-gate or release decision.

## Next execution and closure conditions

After design intake, implement one raw-input wrapper reusing the pinned exact
arithmetic and tail code. Pin dependencies and expected-value evidence at runtime;
keep the source modules unchanged. Supply the acceptance coverage and full-call
resource evidence under ordinary and optimized execution. Commission another
bounded code review when that executable trust boundary exists. Defer the interval
carrier extension and probability-evidence consumer to distinct follow-ups.

IEEE clause confirmation is recorded in PR #294; no additional paper acquisition
is needed for this design round. Promotion to an implementation intended for
merge, interface freeze and supported-domain selection still require the
applicable research gate. Public discussion and steward decisions are unchanged.

## Validation

The ordinary and power-of-two witnesses were checked with standard-library exact
fractions independently of the candidate code. Prettier and Markdown lint (402 files) passed, as did repository validation.
The tsx CLI encountered an environment IPC restriction; invoking the unchanged
validator through the Node import loader with the existing dependency installation
succeeded against this worktree. No statistical coverage,
wrapper execution or runtime benchmark is claimed by those checks.

## Adversarial design review intake

The user supplied a review of `15c8c38f8f391d0361472892ebca6492bc968d37`:
no blockers, three should-fix findings and two optional findings. The received
reviewer identity/model was not provided; no independent-model attestation is
inferred. OpenAI Codex made this author-side repair in the existing context.

| Finding                                   | Disposition                                                                                                                |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| F overflow while SS/SSE are representable | Added exact witness and explicit domain narrowing relative to PR #288                                                      |
| SSE-positive versus SS/F-zero asymmetry   | Explained as denominator/display policy; rejected any implication that a rounded-zero effect is scientifically negligible  |
| Runtime candidate versus oracle           | Candidate enclosure only at runtime; probability oracle comparison in tests; projection helper is not a probability oracle |
| Half-minimum-subnormal SSE tie            | Added explicit four-cell witness                                                                                           |
| Missing/duplicate contrast example        | Classified as internal construction invariant, not an externally reachable malformed raw-input case                        |

The supplied overflow witness's SSE is near minimum subnormal, not minimum
normal; exact computation establishes `3*2^-1075`. Its main conclusion remains
valid. The repair retains the reviewed formulas, mandatory outputs and staged
refusal policy. No wrapper implementation, public check or supported domain is
introduced. The old head preserves the original text and review target.

This bounded intake closes the listed design-document repairs on the author
side. Next is the disposable raw-input wrapper experiment, followed by bounded
implementation review; a full repeated design/source review is unnecessary
unless a new material disagreement or changed claim appears.

Repair validation: `check_review_witnesses.py` passed with normal Python and
Python -O. Prettier, Markdown lint (402 files), repository validation through
the Node import loader, and staged whitespace checks passed. These validate
the documented witnesses and packet, not a yet-unimplemented wrapper.
