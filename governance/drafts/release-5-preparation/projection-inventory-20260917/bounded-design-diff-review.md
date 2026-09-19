# Release 5 bounded design diff review

Status: independent preparation-diff review with narrow repair confirmation,
2026-09-17. The two should-fix findings and one nice-to-have below are resolved in
the separately identified repair tree. No blocker was found to retaining this
increment as informative preparation; this is not unconditional design approval.

## Target, scope and provenance

- Baseline commit: `f7786eb58ae45a23ae5cee3a63061ee8eef20d9e`.
- Reviewed immutable Git tree: `4238ff92f66d0482291b82c353a3234163854898`.
- The coordinator subsequently reported that commit
  `cfb72958b74ae6a1b35261c68eace19e720efd81` preserves that exact tree. Inspection
  and findings in this report are bound to the tree, not a moving branch.
- Changed scope: `README.md`, `record-and-report-draft.md`,
  `decision-binding-proposal.md` and `case-specifications.md` in this directory.
  Locations below refer to their lines in the reviewed tree.
- Accountable role: separately commissioned design-diff reviewer, using OpenAI
  Codex in a fresh review context. The reviewer did not author the target and
  received the bounded commission and immutable identifiers, then inspected the
  public repository sources. This is a separate review context, not a claim of
  model/provider diversity, human expert review or an independent primary-source
  investigation. Coordinator-reported mechanical checks were not treated as
  design clearance.
- The reviewer made no changes to the four target files, schemas, registries,
  implementation, index or branch. This separately attributable report is outside
  the reviewed tree. External paper access remains pending; no literature review
  or scientific-source acceptance was performed.

The review considered the repository contribution instructions, Charter,
authority model, relevant manifest/requirement assignments, ID policy and RFC
Research Gate. Supporting inspection covered the unchanged opening RFC,
conditional mapping draft, original verification cases, report integration
follow-up, public-check registry and meta-schema, verification reason/propagation
clauses, closed historical evidence schema and four-result R2 candidate report.

## Findings

### Should-fix: T09 does not distinguish a foreign owner from an identical key

Location: `case-specifications.md`, line 110 (T09); compare
`decision-binding-proposal.md`, lines 80–85.

T09 requires rejection of a report mutation described as a “key from another
owning check.” The reference proposal expressly allows identical local keys under
different check identifiers. For example, two distinct configured checks can
both use the explanatory local key `projection`. Copying that key from the other
check while leaving the owning check identifier, version and configured table
unchanged creates identical report bytes. Its supposed provenance is unavailable
to the checker and cannot justify rejection. Conversely, rejecting all reused
key spellings would impose global key uniqueness absent from the proposal.

Repair the subvariant to change the mapping's owning check reference while keeping
the same local key, with the executed check/configuration fixed. If the schema
reuses the result's check identity, name the corresponding comparison against the
expected executed check. Keep a separately tested wrong local key that differs
from the configured key, and a positive control showing that identical local keys
under their respective correct owners remain valid. No new label is necessary.

### Should-fix: T08 needs an explicit execution-admission precondition

Location: `case-specifications.md`, line 109 (T08), read with lines 38–42 and
52–56; compare the Record/report draft's execution-state contract and R04.

The first T08 variant injects failure after conformance but before dependency
evidence is acquired, then requires an R5 `error`. Conformance alone does not
establish that the applicable dependency permits R5 execution. A dependency that
is itself errored or not run instead yields dependent R5 `not_run` under the
proposed contract and current registry propagation. The case does not say whether
the dependency has passed but its evidence has not yet been copied into R5, or
whether the fault prevents obtaining a usable dependency result at all. Those
constructions do not justify the same expected state.

This is an underspecified planned fault, not a demonstrated runtime defect. Make
the executable-error variant conditional on an exact, correctly scoped dependency
pass and accepted R5 execution admission; identify the failure as occurring before
R5 retains that already-established result. If the accepted design cannot expose
that stage, keep the variant blocked. Keep dependency execution failures in R04,
and leave any genuinely missing-dependency handling unresolved until its owner
defines it. The generic reachability instruction is useful, but the row should
state this concrete distinction before its expected error becomes a fixture oracle.

### Nice-to-have: exercise the newly explicit ambiguous-identity prohibition

Location: `decision-binding-proposal.md`, lines 20–26;
`case-specifications.md`, M03/M12 and T02.

The proposal explicitly rejects duplicate or ambiguous analysis identities before
projection. The current cases use distinct identities and exercise reordering,
timing omission and wrong dependency scope; none explicitly creates the duplicate
identity counterexample. Add a subvariant under an existing binding case with two
otherwise structurally valid occurrences sharing one analysis identity and
different timing declarations. The expected boundary is owning conformance/binding
failure, never merging the occurrences or choosing one by array order. This would
test the guard that makes per-analysis timing unambiguous without increasing the
claimed count of 37 original labels.

## Assessment of the bounded choices

The timing proposal gives a concrete unit while preserving the RFC's supplied-
dataset access event, including observations outside an analysis population. It
retains existing identity carriers, makes omission fail whole-Record conformance
and carries shared declarations into each consuming decision. Its argument that
one timing value per projection does not introduce another kind of non-Profile
input is plausible as a proposed refinement. Acceptance still requires the family
composition owner and assessment of any material RFC-question change, as the
proposal itself states; this review does not settle that decision.

The qualified mapping reference is resolvable from an exact check identifier,
local key and check version without minting another identifier family. It retains
cross-cutting specification ownership, local snapshot resolution and immutable old
meanings. The one-consistent-table rule for an exact Profile version prevents the
check-version coupling from silently granting contradictory meanings to different
bundles. T09 should test the owning identity explicitly, as described above.

All 37 original labels are present exactly once: M01–M14, T01–T11, H01–H06 and
R01–R06. An independent label comparison against the two unchanged source tables
found no missing or added labels. This establishes locator coverage only. M12's
unequal-population variant remains expressly held when no owner admits it; the
available reordering variant is not evidence that this held population behavior
has been exercised. Similar research, successor and encoding holds remain visible
throughout the table. No fixture bytes or executed R5 results are present.

The expanded cases appropriately separate registration conflicts, Record
conformance, admissibility blocking, report comparisons and producer instructions.
M06/M11 acknowledge early-stage rejection instead of claiming an unreachable
dependency test. R04 leaves a reachable dependency-indeterminate outcome open.
T03–T06 and T11 do not turn hidden event history into a detectable Record-only
failure. The legacy report-count, closed-evidence and URN-validator observations
used by R01/R02/R06 are supported by the inspected retained schemas. These are
bounded positive findings, not claims that future successor schemas will work.

## Initial verdict and limits

Disposition: retain as informative preparation, repair or explicitly disposition
the two should-fix case findings, and keep the stated pause for source and owner
decisions. No runtime or schema implementation is authorized by this review.

The reviewed diff does not change the opening RFC, issue identifiers, alter
historical bundles, freeze scientific mappings or close gates. In particular,
this review does not close R5-P2/P3/P5/P6/P7, broaden opening-only P8, satisfy the
Research Gate's separate primary-source requirement, adopt the timing cardinality
or mapping method, or establish 37 passing tests. Subsequent repairs are outside
this immutable target until checked in their own attributable disposition.

## Narrow repair verification

Repair target tree: `bd92e3511ec68a8040350321d1f38c4b13adf962`.
The coordinator reports that commit
`c38dd69efbdd07adb924fe72eed23096175cc09a` preserves that tree, with parent
`cfb72958b74ae6a1b35261c68eace19e720efd81`. The reviewer directly compared the
original reviewed tree to this exact repair tree; commit availability was not
needed to inspect its immutable content.

Only `case-specifications.md` differs. Excluding table alignment whitespace, the
diff changes M03, T08 and T09 only. This was a narrow verification of the listed
repairs, not a new literature investigation or a full review of other work.

| Initial finding                       | Repair observed                                                                                                                                                                                                                                                                   | Disposition                                                                                              |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| T09 foreign-key ambiguity             | Mutates the owning check component with the local key unchanged; adds a correct-owner control valid despite the same key spelling elsewhere.                                                                                                                                      | Resolved for this preparation scope.                                                                     |
| T08 execution-admission ambiguity     | Requires successful conformance and actual applicable dependency pass for the same subject/revision before R5 starts. Faults occur before projection cells or after some cells, retain the passing dependency, and exclude dependency blocking from the injected execution stage. | Resolved. Removing the under-specified pre-dependency-acquisition fault is an acceptable bounded repair. |
| Missing ambiguous-identity subvariant | M03 now duplicates an existing analysis identity or makes its binding ambiguous and expects owning conformance failure before projection.                                                                                                                                         | Resolved as a planned negative subvariant.                                                               |

The repair retains all 37 labels exactly once. No additional findings arose from
this narrow diff. Final review disposition: no outstanding blocker or should-fix
finding for retaining the repaired informative preparation increment. Source,
family-owner, schema, reason-code, Research Gate and adoption holds remain exactly
as described above. This confirmation authorizes no further implementation and
does not convert planned cases into executed tests.
