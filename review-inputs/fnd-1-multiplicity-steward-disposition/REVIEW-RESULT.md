# FND-1 Multiplicity Steward Disposition - Adversarial Review Result

Verdict: **GO**

No BLOCKER, SHOULD-FIX, or NICE-TO-HAVE findings. The steward disposition
records the completed multiplicity primary-text closure and its independent
close-only review faithfully, hash for hash and claim for claim; it closes
exactly the three commissioned holds in narrowed form while explicitly
preserving every other hold, the all-pairs successor-source requirement,
and the open Research Gate; its documentation, manifest, and index changes
are accurate and mechanically regenerated; and nothing normative,
authoritative, or Release-2-related is touched. Regression and CI are green
at the exact head.

`GO` means only that this steward disposition may be recorded as
informative, non-normative FND-1 research state. The full non-claims list
is in section 7.

## 1. Identity (independently verified in a fresh clone)

| Item                 | Value                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Review-input head    | `7ee7bdfeff469fbb9c4590ddaffcee9c63206f02` (tree `fc4017db...`), one commit                       |
| Direct parent        | `fb437c88449b649dc80a92d4a66c8be6081e67a8` (the PR #66 intake head, per the declared stacking)    |
| Declared base        | `main` at `6c3d9acf...`; the PR body's "merge #66 first" ordering is enforced by construction     |
| Delta vs intake head | exactly 5 paths, +200/-12 (disposition document +172, FND-1 README +19/-10, manifest +6, indexes) |
| Delta vs `main`      | the 6-path union of this increment and the PR #66 intake, nothing else                            |
| Environment          | fresh clone, detached checkouts; Node v22.22.2, pnpm 11.7.0, Linux x86_64                         |

The head did not move during the review.

## 2. Chain fidelity

Every identity and claim in
`2026-08-31-multiplicity-steward-disposition.md` was checked against the
primary artifacts:

- primary-text result commit `bf35ef43...`, close-review result commit
  `a09a5aa4...`, and intake commit `fb437c88...` all match the verified git
  objects, and the close-review record blob (`b3f06eb8...`) is
  byte-identical at the review commit, the intake head, and this head;
- "GO; C-01 through C-12 passed; no findings" matches the recorded
  close-review result exactly, as does the statement that the review was
  rooted at the result commit, changed only its assigned file, and recorded
  the source-access limit instead of reconstructing content;
- the intake-preservation statement (review commit retained as a merge
  parent, an immutable object rather than a copy) matches the verified
  topology;
- the three `NARROW_AND_CLOSE` hold closures match the primary-text closure
  result's dispositions, and each per-hold scope summary (Holm procedure /
  strong free-combinations control via the Boole inequality /
  dependence-free main result / separate independence-based product-form
  and weighted constructions; Benjamini-Hochberg definitions with the
  no-rejection convention / step-up procedure / Theorem 1 independence
  condition with the `(m0/m)q*` bound / Appendix A conditions; Dunnett
  many-to-one family with the general arbitrary-group-size construction and
  the recorded table limits; Tukey 1949 as the three-stage procedure
  without the later all-pairs or unequal-size methods) restates the
  closure result's ledger without exceeding it;
- the preserved-holds table matches the reconciled result's Section 9.2
  rows for `FND1-H04` through `FND1-H08` in substance, the all-pairs
  successor-source requirement is retained in the same terms as the closure
  result, and "3 of 8 closed, 5 open, Gate open" is arithmetically and
  semantically consistent with all prior records;
- the "evidence carried forward" items restate reconciled-result
  conclusions (guarantee boundaries, name-versus-conditions, FWER/FDR
  distinctness, distinct family questions, later variants bound to their
  own sources) explicitly as research evidence, not Protocol surface.

One statement is the steward's own attestation rather than a repository
fact: that the steward independently recomputed the four received-PDF
SHA-256 values before the primary-text result was recorded and confirmed
agreement. It is correctly attributed to the steward, does not enlarge any
reviewed claim, and cannot be independently re-derived from repository
contents alone; this review records that boundary rather than treating the
attestation as verified.

## 3. Documentation consistency

The FND-1 README's "Current disposition" is updated accurately: the
follow-up is complete, the disposition closes `FND1-H01` through `FND1-H03`
in narrowed form, `FND1-H04` through `FND1-H08` and the successor-source
requirement remain open, the full Research Gate remains open, and no
Protocol adoption is authorized. The stale "next bounded investigation"
framing is replaced by "completed follow-up" without touching the
commission/result table. The reconciled result's dated "NOT READY FOR FND-1
RESEARCH GATE ADJUDICATION" final line is not contradicted: the disposition
itself records the Gate as "Not ready; not closed". The explicit
non-decisions list and the final sentinel line ("... FULL RESEARCH GATE
OPEN - NOT PROTOCOL ADOPTION") bound the record correctly.

## 4. Delta audit and invariance

The increment adds the disposition document, updates the FND-1 README, adds
one informative authority-manifest entry whose note accurately summarizes
the disposition (NARROW_AND_CLOSE for the three holds; Gate open; no
adoption), and regenerates the two indexes (manifest hash line plus one new
informative row). The four FND-1 primary artifacts (reconciled result, both
commissions, the primary-text closure result) are blob-identical to `main`.
No registry, authoritative schema, `spec/`, `conformance/`, `bindings/`,
Public Check, bundle, Release 1, Release 2, or numerical-candidate path is
touched anywhere in the stacked delta.

## 5. Regression and CI

At the exact head: `pnpm install --frozen-lockfile` and the full
`pnpm check` pass end to end (exit 0; 41 test files, 431 tests), with a
clean tree afterward; the generated-file check passing proves the
regenerated indexes are exactly what the generator produces from the
updated manifest. The content-addressed authority snapshot moves from the
intake value (`sha256:59487b80...`) to
`sha256:fa17feb5456efaf97094f8d486139076db937488bc4dd56dc716cd853877beac`
solely through the one added informative manifest entry, and the
repository's authority validation accepts the head state. All five CI
check runs succeeded on the exact head on the first attempt (CI #195, run
`33437359503`). CI was used as corroboration only.

## 6. Reviewer separation

The close-only review this disposition accepts was produced by the same
reviewing role that wrote this report. All fidelity checks here were
re-derived from git objects and committed artifacts, not from memory of the
earlier review.

## 7. Verdict meaning and non-claims

`GO` means only that this steward disposition may be recorded as
informative, non-normative FND-1 research state, with `FND1-H01` through
`FND1-H03` closed in narrowed form on the recorded scopes. It does not:
close `FND1-H04` through `FND1-H08`, the all-pairs/unequal-size
successor-source requirement, the full FND-1 Research Gate, or any release
gate; add or select any Record field, schema, identifier, vocabulary,
profile, bundle, or relation label; adopt the E/P/H/M/D/V decomposition as
Protocol surface; select Holm, Benjamini-Hochberg, Dunnett, Tukey, or any
later variant as a supported method or default; define any multiplicity
family, error criterion, refusal code, public check, API, or implementation
contract; or affect Release 2, paired-t, or t-family numerical-contract
work.

## 8. Deliverable identity

- Branch: `review/fnd-1-multiplicity-steward-disposition-7ee7bdf`, based on
  the PR head `7ee7bdfe...`.
- This file is the only addition; no implementation, evidence, manifest,
  governance, or authority file is modified, and the working tree was clean
  after all verification runs.
