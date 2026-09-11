# Validation and review receipt

Date: 2026-09-11. All artifacts in this directory are author-side exploratory work.

- `test_adapter.py`: all recorded checks passed; see measured `RESULTS.json`.
- Repository validator: passed using `node --import tsx tooling/src/validate.ts`.
- Markdown lint: passed, 410 Markdown files inspected.
- Prettier for new Markdown/JSON and `git diff --check`: passed.
- Python syntax compilation: passed.
- Full production suite and cross-platform execution were not run for this
  additive disposable experiment. GitHub CI is checked separately after publication.

## Related review receipts

PR #286 records the bounded repair review of PR #285 at
`bc1c1ace426d51e55c9551090f6e400af2ac17d2`. Published review commit:
`75e3e7b48f0c53927d3e5c228adbd0a1c9108fd3`, tree
`ef414b92a6fdd91a80619c9aecfc63c86bb3730f`. No blocking defect was found;
the seven external observations are closed within the documented fixed-corpus
contract. This closes that bounded repair task, not the scientific gate.

PR #287 records the bounded primary-methods review. Published review commit:
`db67b69580b524b58822183895137bd37a5f6ecb`, tree
`3dc86fda926a93322cfc26510eebedf63a416355`. The orchestrator requested
`gpt-5.6-sol` in a separate context. This is a configuration disclosure, not an
attestation of the served model build or external human independence. The source
reviewer did not inspect this adapter. Mathematical findings are bounded GO;
the IEEE normative representation/rounding source leg is INPUT_INCOMPLETE.
The combined Research Gate remains open. No gate registry was changed.

Both published trees exactly match their workers' local committed trees. GitHub
created new commit identities for publication; local precursor commits were
`d64b20392f2ce4cee5a568c5b5912ea4c3d4d3e6` and
`22c858cb44ace6536e40ba46464eea5f21b51281`, respectively. Review content was not
rewritten by the manager.

The next adversarial checkpoint is this complete adapter's immutable commit.
Do not silently replace that checkpoint with the original-methods review.
