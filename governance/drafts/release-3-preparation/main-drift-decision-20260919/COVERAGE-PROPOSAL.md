# Pre-push evidence visibility — proposal only

No new local or hosted gate is adopted here. Resolve the archived/current source
generation decision in the accompanying README before implementing these checks.

| Option                                                  | What it would expose                                                                                                                                                                                | Scope consequence                                                                                                                                                                                 |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Optional `pnpm check:pins`                              | Existing contribution-pin tests; every declared adoption-map digest; unexpected added conformance fixtures; snapshot counts versus manifest; current evidence's declared source-generation bindings | Fast and read-only, without numerical replay. Opt-in script does not itself create a required GitHub gate. R3 pin failure remains separately named.                                               |
| Explicit R3 replay command                              | The above plus candidate, public, budget and archive reconstruction tests under Node 24.19.0 / Python 3.12.14                                                                                       | More expensive and runtime-specific. Maintainers can run it before pushing changes to its declared inputs; hosted cgroup tests remain separate.                                                   |
| Fold all R3 checks into `pnpm check` or `pnpm validate` | Broad local coverage                                                                                                                                                                                | Makes an unfinished R3 experiment block unrelated repository work and adds its runtime needs to the standard suite. Requires an explicit scope decision; not recommended as an incidental repair. |

Recommended first step, if authorized: an optional fast inventory command with
clear failure paths and an explicit instruction to run the affected R3 workflow
commands. A successful inventory scan would mean only that inputs match their
declared generation; it would not mean the candidate replay passed. The scanner
would never update hashes or expected values, ignore new files, suppress failed
checks, or claim a source change is harmless.

To catch this specific regression, inventory membership needs a declared scope,
not just iteration over old entries. At minimum, every fixture referenced by the
current conformance manifest belongs in the conservative map closure. Changes to
that inventory scope require review; files cannot become exempt because a hash
is inconvenient. Snapshot counts need checks at both `legacy_fixtures` and the
`legacy_regression` row, and the archived integration's inventory pin needs an
explicit generation-aware comparison.

Acceptance criteria for a future implementation: the PR #358 eight-file drift
and two additions are reported together; changing either snapshot count is
detected; an unauthorized AGENTS revision still fails; removing an archived
source/member still fails; command execution leaves the worktree unchanged.
Whether the command becomes required locally or remotely is a separate steward
choice, not implied by adding it to package.json.
