# Independent review commission: Release 4 formal decision packet

Status: **REQUEST; do not treat this commission as a completed review**.

## Purpose

Review whether this packet accurately assembles the existing unissued Release 4
candidate and RFC records for an eventual steward decision. This is not a new
scientific or numerical investigation, an implementation review, a formal
FD1-FD6 decision, an RFC disposition, or authorization to change authoritative
artifacts.

## Fixed review target

Fix the exact pull-request head, parent, tree and base before review. Review this
directory together with only:

- RFC #261, its opening proposal at
  `21453d82109106e9e811571383228dcef8f60fac`, and every public comment through
  the review timestamp;
- the D01/D07 amendment package at
  `5996da5a7869f2b21ae8f73407c434285c9862bb`;
- `r4-adoption-readiness-a1-20260917/`, including its T13/T14 and close-review
  intakes and disclosed custody limits;
- the exact T03-T14 artifacts named by the A1 review-evidence map; and
- current authority, RFC, stability-tier, Requirement, identifier, schema, Check,
  reason, Bundle, public-surface, source-pin and CLI contracts needed to verify the
  stated preservation boundary.

Do not modify files, Issues, pull requests, branches, registries, schemas, release
state, RFC clocks or authoritative artifacts.

## Failure questions

1. Does the ledger distinguish closed candidate choices and review findings from
   pending formal FD1-FD6 decisions?
2. Does the packet omit any scientific, numerical, execution, output, identity,
   schema, reason, Bundle, compatibility or publication disposition required for
   a coupled Release 4 decision?
3. Are both RFC clocks and fixed inputs accurate, are the amendment body's
   `2026-09-18T01:50:49Z` declaration and GitHub's `2026-09-18T01:51:08Z`
   `created_at` distinguished, and does the unified decision conservatively wait
   for `2026-10-18T01:51:08Z`?
4. Does any path silently issue a draft identifier, reinterpret an existing schema
   or Bundle, promote finite observations to a supported-domain claim, or turn a
   review receipt into adoption?
5. Does D07 remain entirely in the detailed report while NRS-VERIFY-0025 retains
   its five existing meanings?
6. Does the landing outline include public-surface schema impact, authority
   assignment, generated views, shared-verifier/source-pin ownership, independent
   conformance, Release 1 preservation and final freeze/publication review?
7. Is post-A1 drift correctly bounded, including PR #351, without claiming that
   unchanged candidate bytes eliminate the need for landing-time compatibility
   evidence?
8. Do the evidence-custody and reviewer-independence statements avoid inventing
   human expertise, original receipt bytes or served-model identity?

## Required return

Return `GO`, `REPAIR_REQUIRED`, or `BLOCKED`, followed by:

1. exact reviewed head, parent, tree and base;
2. reviewer independence and scope disclosure;
3. findings classified as BLOCKER, MAJOR, MINOR or NONE;
4. separate conclusions for FD1, FD2-FD4, FD5 and FD6 readiness;
5. explicit confirmation or correction of the two clocks and D07 CLI boundary;
6. drift and evidence-custody disposition; and
7. a statement that no adoption, issuance, implementation, RFC action, support
   activation, merge or publication was performed by the review.
