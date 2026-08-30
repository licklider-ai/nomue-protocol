# R2-D5 runtime inverse-beta table evidence — independent adversarial review

## Review identity

- Repository: `licklider-ai/nomue-protocol`
- Pull request: `#37`
- Exact implementation commit: `5d58990e8cb25920bda791d0f0308ab29dcea3fb`
- Exact implementation tree: `43c1f96d881897935f556d9a79aef0513bcd46f7`
- Exact baseline commit: `6072dd2be046f25a1857db305ea9d526c867c41a`
- Declared delta: 12 files, 1,482 insertions, 8 deletions
- Workflow run: `33298573942`
- Official artifact ID: `9728184062`
- Official artifact name:
  `release-2-paired-t-runtime-inverse-beta-table-5d58990e8cb25920bda791d0f0308ab29dcea3fb`
- Official artifact ZIP digest:
  `sha256:0a2fa2448db4b03e4a2bc1c3876adfe1e0fe0f4a77d80cc3eefb91d4b0a6e998`
- Unpacked artifact: `review-inputs/r2-d5-runtime-inverse-beta-table/artifact/`
- Artifact-file checksums: `review-inputs/r2-d5-runtime-inverse-beta-table/SHA256SUMS`

Resolve and report every identity above before reviewing content. Stop with `NO-GO`
if the target, baseline, tree, delta, workflow artifact, or checksums do not match.

## Purpose and stop boundary

This change creates non-authoritative evidence for a contiguous candidate table of
the normalization constant

```text
C(df) = 1 / B(df / 2, 1 / 2)
```

at every integer `df` from 1 through 200. It is intended to supply one prerequisite
for later operation-graph truth-error work. It does not select a runtime table,
supported df maximum, supported domain, global truth-error bound, final table hash,
platform predicate, Public Check, bundle, or identifier.

The review must preserve that boundary. A mathematically correct table is still a
`NO-GO` if the change claims or activates Protocol support.

## Required review

### 1. Repository and bundle identity

1. Check out the exact implementation commit in a detached worktree.
2. Verify the implementation tree and baseline.
3. Confirm the declared 12-file delta and inspect every changed file.
4. Verify `SHA256SUMS`, the artifact's own `MANIFEST.sha256`, every source copy, the
   generator commit, environment hash, source hashes, and table content hash.
5. Confirm that the unpacked files are the official workflow artifact named above,
   not a locally substituted bundle.

### 2. Independent mathematical derivation

Do not trust the generator's formulas merely because its validator agrees. Derive
and check independently:

1. `C(df) = Gamma((df + 1) / 2) / (Gamma(df / 2) * Gamma(1 / 2))`.
2. `C(df + 2) = C(df) * (df + 1) / df`.
3. The seeds `C(1) = 1 / pi` and `C(2) = 1 / 2`.
4. The Machin identity `pi / 4 = 4 atan(1 / 5) - atan(1 / 239)`.
5. The alternating-series remainder direction and magnitude after exactly 96 terms
   for both arctangent series.
6. The interval inversion used to turn the pi enclosure into an enclosure of the
   odd-df constants.

Use an implementation path independent of both the Python generator and the
TypeScript validator. Recompute all 200 correctly rounded binary64 cells at high
precision. Report any disagreement, even if it occurs outside cases already used by
the runtime-series evidence.

### 3. Certificate and rounding-cell checks

For all 200 entries, verify:

- integer df coverage is exactly ascending `1..200`, with no omission or duplicate;
- the exact recurrence coefficient is correct;
- the exact secondary enclosure is reproduced byte-for-byte from the declared
  rational construction;
- the Arb primary enclosure contains the exact secondary enclosure;
- the declared binary64 cell is reconstructed from adjacent values using exact
  rational midpoints;
- both bounds are strictly inside that cell;
- the table bits equal the certified projection;
- the evidence-local table hash equals
  `sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`.

Do not treat the observed hash as a final runtime-table hash or the `df=200` endpoint
as a supported maximum.

### 4. Reproduction and fail-closed behavior

With the pinned Python 3.12 / python-flint 0.9.0 / FLINT 3.6.0 environment:

1. Generate the evidence twice from clean output paths.
2. Confirm byte-for-byte determinism apart from no field; the same checkout and
   environment should produce identical files.
3. Run the TypeScript validator and the built-in mutation probe.
4. Confirm missing python-flint fails closed.
5. Confirm an existing output path is not overwritten.
6. Confirm malformed JSON and malformed nested values produce structured failures,
   not uncaught stack traces.

### 5. Adversarial mutations

Rebuild hashes and manifests after each mutation. At minimum attack:

- a changed table bit with matching evidence and table hash;
- a false primary enclosure;
- a false secondary recurrence coefficient or enclosure;
- a false Machin term count or pi enclosure;
- a forged rounding cell that remains internally self-consistent;
- reordered, omitted, duplicated, and out-of-range df entries;
- a fabricated precision history;
- a changed environment with rebuilt environment hash;
- a changed source copy with rebuilt source hash;
- runtime support, final-table, supported-df, or final-hash promotion claims;
- extra undeclared keys, symlinks, and substituted files.

Determine whether the exact secondary route is sufficient to keep a forged but
truth-containing Arb enclosure from changing the mathematical table claim. If any
accepted mutation can cause a false cell, false support claim, or false provenance
claim to pass, report a blocker.

### 6. Repository-wide and authority checks

Run the complete repository check from the exact target. Confirm:

- Release 1 frozen content and behavior are unchanged;
- no authoritative specification, registry, schema, conformance expectation,
  identifier, Public Check, or interpretation bundle is changed;
- no runtime code loads or selects the generated table;
- readiness remains `incomplete_pending_independent_review`;
- `supported_degrees_of_freedom_max`, `final_content_hash`, and runtime support remain
  null or false as declared;
- private-dependency and public-language audits pass.

If the normal `tsx` launcher is blocked only by a local IPC restriction, rerun the
same entrypoint with `node --import tsx` and report both the launcher failure and the
underlying result separately.

### 7. Research-gate assessment

State whether this increment is a straightforward implementation and independent
reproduction of the already adjudicated candidate formula family, or whether it
introduces a new externally grounded numerical decision that requires additional
primary-source research before merge. Do not infer community consensus from a
software-library agreement.

## Required output

Return `GO` or `NO-GO` and classify each finding as:

- `BLOCKER`
- `SHOULD-FIX`
- `NICE-TO-HAVE`

Include exact commands, independent-method details, all 200-cell comparison results,
mutation results, repository-wide check results, authority-boundary findings, and a
clear statement of whether PR #37 may be marked Ready and merged solely as a
non-authoritative R2-D5 candidate increment.

Save the final result as:

`review-inputs/r2-d5-runtime-inverse-beta-table/REVIEW-RESULT.md`
