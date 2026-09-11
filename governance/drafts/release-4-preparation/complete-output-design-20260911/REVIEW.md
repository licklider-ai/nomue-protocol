# Review handoff and work boundary

## What this round delivers

PR #291 left output completeness and representation open. This packet proposes
one concrete minimum set, explicit finite/zero behavior, full-analysis admission
ordering and counterexamples for the successor wrapper. No numerical code or
existing evidence was modified. It does not report wrapper tests as passing.

Authoring role: preparation worker using OpenAI Codex in the continuing author
context, 2026-09-11. Existing fixed code and proposal records were inspected;
no new external primary source was read and no independent review was performed.
The original IEEE acquisition limitation remains open. The hand-derived witness
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

IEEE clause confirmation can run when supplied; no additional paper acquisition
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
