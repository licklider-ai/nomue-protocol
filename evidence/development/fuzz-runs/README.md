# Schema-Guided Fuzz Runs (Development Evidence)

**Status: Informative, development evidence.** Evidence toward gate R1-05
(threat model and adversarial corpus,
[../../../authority/release-1-gates.yaml](../../../authority/release-1-gates.yaml)).
Publishing this evidence does not close the gate.

## What is here

`run-seed-<N>.json`: one report per fuzz run of
`tooling/src/fuzz/schema-guided-fuzzer.ts`, each fully reproducible from
its logged `seed_value` (a deterministic PRNG, not `Math.random()`).

## What the fuzzer actually does

Starts from two real, valid seed Records (`V-001`, `A2-V-001`) and applies
one of eight schema-informed mutation strategies per iteration (delete a
random field, add an unknown field, type-confuse a random value, set a
numeric field to an extreme value, inject a huge string, inject deep
nesting, duplicate a top-level JSON member name in the raw text, or
substitute a raw `NaN` token) for a time-bounded budget
(`FUZZ_BUDGET_MS`, default 10s). Every outcome is classified as exactly one
of two buckets:

- **safe**: the verifier returned a report or a refusal without throwing,
  hanging, or crashing - this includes every documented refusal kind and
  every report outcome (pass or fail). A mutation that happens to still
  verify cleanly is exactly as "safe" as one that is explicitly refused.
- **unsafe**: an exception escaped `verifyRecordText` past its own internal
  `try`/`catch` (`reference/verifier/src/verify.ts`), which is designed to
  convert any caught error into an `internal_error` refusal - an unsafe
  finding would mean something got past that wrapper.

## Run this yourself

```bash
FUZZ_BUDGET_MS=15000 pnpm exec tsx tooling/src/fuzz/schema-guided-fuzzer.ts
```

The run recorded in this directory (`run-seed-42.json`, 15,000 ms budget)
found **13,871 iterations, 0 unsafe outcomes**, with all eight strategies
firing roughly evenly (~1,700-1,800 each - see `strategy_counts` in the
report). A zero-unsafe-outcomes result is reported as exactly that, not
omitted for lack of a "finding" to show.

## From a fuzz finding to an adversarial fixture

If a future run ever reports an unsafe outcome, the reflow procedure is:

1. **Do not fix it silently.** Record the finding (the fuzz report already
   has the exact `input_sha256` and a full `input_excerpt`/mutation
   `strategy`) in a governance decision record
   (`governance/decisions/ADR-XXXX-*.md`) describing what escaped and why.
2. **Reproduce it as a standalone input file** under
   `conformance/fixtures/verifier_behavior/` (or a new family, if the
   finding doesn't fit the existing ones), following the existing
   authoring discipline in `conformance/AGENTS.md` - expected values come
   from the specification, not from "whatever the fixed version now
   outputs."
3. **Fix the underlying gap** in `reference/verifier/` so the new fixture's
   expectation is a safe refusal (or a correctly handled report), never a
   crash.
4. **Add the fixture to `tooling/src/phase1/author-fixtures.ts`** (or the
   relevant family's dedicated authoring module) so
   `pnpm conformance:test` replays it on every commit going forward - a
   fuzz finding that isn't captured as a permanent regression fixture will
   eventually recur silently.
5. **Re-run the fuzzer** with the same seed that found the issue
   (`FUZZ_SEED=<value>`) to confirm the specific mutation now classifies as
   safe.

## Nightly CI (authored, not yet wired to run automatically)

`.github/workflows/fuzz-nightly.yml` runs this fuzzer on a schedule. It was
added in the same batch as this README but has not been triggered by this
agent - GitHub Actions `schedule:` triggers only fire once a workflow is on
the default branch of a repository actually hosted on GitHub with Actions
enabled, which is a remote-infrastructure state this agent does not create
autonomously (see this repository's standing rule about not creating
releases, tags, or - by the same reasoning - relying on unverified remote
trigger scheduling).
