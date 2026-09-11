# Checkpoint implementation review

Date: 2026-09-11. Scope: the informative candidate.2 derivative based on commit
`7e7b73935d2cd256c4b6e24e7bc1059b8f0a5cb4`. Accountable implementation/review role:
repository contributor acting on the user's instruction, using OpenAI Codex.
This is an author-context adversarial pass, not a separate investigator or a new
independent numerical review. Exact served model identity is not attested here.

## Changed boundary

The existing reference processing-budget helper supplies comparison semantics.
The derivative adds a monotonic per-invocation wrapper, cumulative sampled heap,
checks at admission/result boundaries, and clean resource refusals. No numerical
algorithm, binary64 conversion, exact rational kernel, declaration bridge, or
worker calculation changes. Their pinned prior evidence remains applicable within
its recorded scope; execution checks are not numerical correctness evidence.

Reviewed failure paths include equality versus exceedance, simultaneous time/heap
exceedance, timeout after worker reply and after worker exception, nested catch
blocks swallowing Stop, expected-context I/O resetting the origin, partial report
and Record forwarding, final serialization crossing a budget, invalid clock/heap
observations, and higher-priority outer memory/cleanup failures. Predetermined
expectations are enforced by `test_budget.mjs`. The successful path uses the real
unchanged worker and verifies exact original-byte forwarding.

The first local run found source-pin drift in two changed refusal schemas. The
schemas were repinned after inspection and formatting; no drift check was disabled.
The revised envelope and public schemas explicitly cover the new refusal variants.

The default budget cannot preempt synchronous work and is not a claim that every
heap peak is sampled. The outer execution controller remains necessary. Real heap
allocation beyond 512 MiB is not claimed by injected heap-boundary tests. The
actual-host worker-delay control exercises elapsed time without a fake clock;
actual OOM/pids/lifecycle controls exercise the unchanged controller.

## Preservation and review limits

All source-template hashes are retained in `TEMPLATES.json`. The runtime closure
including the newly imported limits helper is pinned in `INPUTS.json`. The prior
candidate and its archived reviews are unchanged. The original controller code
changes only by adding a trusted test-probe selector; the new delay probe is never
selected from a Record. Standard repository CI and the dedicated actual-host job
are required before integration. Their run identifiers and exact observations are
recorded with integration evidence rather than fabricated here.

This review does not declare formal requirement satisfaction for adoption, issue
registered identifiers, certify arbitrary hosts, or close the remaining public
input-evidence decision. The adoption map's immutable candidate.1 inventory remains
a historical proposal and needs a separate coordinated candidate.2 revision.
