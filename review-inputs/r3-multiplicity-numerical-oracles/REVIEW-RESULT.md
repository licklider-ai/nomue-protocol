# Release 3 Multiplicity Numerical and Oracle Result — Exact-Head Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

**`NO_GO`** for pull request 174 at the exact head recorded below.

- `BLOCKER`: 3
- `SHOULD-FIX`: 1
- `NICE-TO-HAVE`: 1

The result contains substantial, useful preliminary numerical work, and the repository
identity, one-path boundary, embedded script digests, formatting, lint, type checking,
validation, and hosted checks are internally consistent. The present verdict is caused by
the commission's explicit stop condition, public-artifact neutrality and portability
defects, and output-integrity failures. It is not a rejection of the executed probe
observations.

## 2. Independence and scope

This review was performed in a work context that did not author the candidate result or
its probes and is independent of any future Release 3 numerical implementation. The
candidate was assessed against the exact issue instruction, the numerical commission,
repository contribution rules, Git objects, the fixed semantic input, and the candidate
artifact itself.

The durable repository commit is recorded through the steward account. Its Git author and
committer metadata record the intake actor, not the identity of the independent reviewer;
the review role, scope, and independence boundary are stated in this section.

Because the candidate expressly records that the required primary numerical sources were
not inspected, this review does not repeat or endorse their mathematical content from
memory. The commission-conformance finding below follows from the candidate's own access
record and the controlling stop condition. Selected self-contained derivations and
machine-checkable bookkeeping were reviewed, but a final primary-source and numerical
approval is intentionally withheld.

## 3. Exact identity

| Field                      | Re-derived value                                                            |
| -------------------------- | --------------------------------------------------------------------------- |
| Repository                 | `licklider-ai/nomue-protocol`                                               |
| Pull request               | 174, open and unmerged at review time                                       |
| Candidate branch           | `research/r3-multiplicity-numerical-oracles-65a53a4`                        |
| Candidate commit           | `18563ccf8cb50a7cf1c9d74718b2adf3e2cf0537`                                  |
| Candidate tree             | `1e3eacfb348ea7a77f362c49f40ad282cab906ab`                                  |
| Sole parent                | `65a53a4f2e54c691ccd76f71814c5a6e507f0046`                                  |
| Result blob                | `2feb9c9b6b362000e5a46aa985ce19c825e5f7fa`                                  |
| Changed path               | `governance/drafts/release-3-preparation/numerical-research-result.md` only |
| Parent diff                | one added path, 2,608 insertions, zero deletions                            |
| Numerical commission blob  | `5125d5411f398269660a7a3428be733a0fcc6f30`                                  |
| Fixed semantic result blob | `8f21526040924b891f64724c2d0fde9ea94eff92`                                  |

The live pull-request head remained the candidate commit throughout this review. The base
was the commissioned starting commit when the candidate was produced. A later, independent
semantic source-acquisition result on `main` does not change the findings below.

## 4. Checks performed

1. Re-derived the candidate commit, tree, sole parent, result blob, path count, and diff
   statistics from Git objects.
2. Read issue 171 and the numerical commission, including the independence requirement,
   required report, and stop conditions.
3. Read the candidate's source access record, method, numerical facts, coverage matrix,
   blocker ledger, dispositions, claim-to-evidence table, embedded scripts, and captured
   outputs.
4. Recomputed the SHA-256 digest of every embedded script directly from its fenced bytes.
   All eight digests match the Appendix A table.
5. Recomputed the SHA-256 digest of every embedded console-output block. Only two of the
   eight digests match the Appendix B headings.
6. Recounted the coverage matrix: it contains 49 distinct catalogue identifiers.
7. Recounted the summary classes and confirmed that one identifier is represented in two
   scope-dependent classes.
8. Searched the public result, commit message, branch, and pull-request text for prohibited
   drafting-mechanism identifiers and environment-specific paths.
9. Ran the required repository checks at the detached candidate head.

## 5. Findings

### B-1 — Mandatory primary-source stop condition is not applied

**Severity: `BLOCKER`.**

Issue 171 and the commission require `INPUT_INCOMPLETE` without a numerical disposition
when required primary sources cannot be identified or inspected. The commission also
requires the investigator to inspect primary numerical literature, standards, or
authoritative upstream documentation directly.

The candidate instead states all of the following:

- Section 2.1 reuses prior inspection records and explicitly says that the investigator
  re-inspected no PDF.
- Section 2.2 records every identified primary numerical source NSR-01 through NSR-17 as
  `ACCESS_FAILED_IN_ENVIRONMENT`.
- NB-03 confirms that the primary algorithmic literature for NF-C and NF-D and the relevant
  standards texts were not inspectable.
- Sections 6 and 17 nevertheless assign a `NARROW` program disposition and numerical
  dispositions to every catalogue entry.

Self-contained derivations and executed probes are valuable preliminary evidence, but the
controlling text does not permit them to replace the missing primary-source inspection for
this execution. The candidate must either receive and inspect the required lawful source
copies, or record `INPUT_INCOMPLETE` and withhold numerical dispositions. Until then the
result cannot satisfy the commissioned research gate.

### B-2 — Public result exposes a prohibited environment identity and is not portable

**Severity: `BLOCKER`.**

The public result contains four occurrences of an environment-specific absolute path whose
prefix identifies the drafting mechanism. Two occurrences are executable `sys.path`
insertions in the embedded Probe G and Probe C-2 scripts, and two occur in a captured Probe C
stack trace.

This violates the repository's neutral-language rule for public artifacts. It also makes
the stated reproduction instruction inaccurate: the two dependent scripts do not reproduce
from an empty directory in a different environment unless that private temporary path
happens to exist.

The repair must not merely redact text that is claimed to be verbatim. Re-run the affected
scripts from a neutral temporary directory using sibling imports, replace the captured
output with the new verbatim output, and recompute every affected script and output digest.
Then confirm that the result, commit metadata, branch, and pull-request text contain no
provider, model, tool, service, or drafting-mechanism identity.

### B-3 — Six of eight recorded output digests do not match the embedded output

**Severity: `BLOCKER`.**

The report says that Appendix B reproduces the captured console outputs verbatim and gives
the SHA-256 of each output file. Recomputing the digest directly from each fenced output
block, including its final newline, produces this result:

| Output    | Digest match |
| --------- | ------------ |
| Probe A   | no           |
| Probe B   | no           |
| Probe G   | no           |
| Probe C   | no           |
| Probe C-2 | no           |
| Probe D   | yes          |
| Probe E   | no           |
| Probe F   | yes          |

Removing the final newline does not make any of the six failed values match. The embedded
text therefore cannot simultaneously be the claimed verbatim output and carry the stated
file digest. This breaks exact reproduction and review of the numerical evidence.

Repair by rerunning the probes from the declared neutral environment, embedding the exact
output bytes, and recomputing each heading digest. At minimum every changed or mismatched
output must be regenerated; rerunning all eight probes is the simplest way to establish one
coherent environment and provenance chain.

### S-1 — The disposition summary calls 50 scope labels a count of 49 entries

**Severity: `SHOULD-FIX`.**

The coverage matrix has 49 distinct identifiers. The stated class totals are 22 + 6 + 9 +
6 + 5 + 2 = 50 because MTO-01 is intentionally listed in both
`NUM-FEASIBLE-TABLE` for a bounded balanced or finite-grid scope and
`NUM-ORACLE-ONLY` for arbitrary size configurations. Calling these totals "Counts (49
entries)" is therefore misleading even though the underlying matrix is explicit.

Use one of two unambiguous forms:

- assign one primary per-entry class to MTO-01 and retain the narrower scope as a note; or
- state that there are 49 entries but 50 scope-classification labels, with MTO-01 counted
  twice by design.

If B-1 is repaired by withholding dispositions, the same clarification is still needed for
any retained preliminary assessment summary.

### N-1 — Add an automated neutral-path check for embedded evidence

**Severity: `NICE-TO-HAVE`.**

All required repository checks passed despite B-2. A later, separate change should consider
extending the public-language audit to catch common temporary-directory identities and
absolute authoring paths inside embedded scripts and captured outputs. This is not required
inside the one-result-file boundary of pull request 174.

## 6. Preserved observations

The findings above do not invalidate the following internal facts:

- all 49 semantic catalogue identifiers occur exactly once in the coverage matrix;
- all eight embedded script digests match their fenced bytes;
- the F/t, exact adjustment, interval, range, many-to-one, and replay sections distinguish
  proofs, probes, reused records, inference, candidates, and blockers;
- the candidate selects no authoritative algorithm, tolerance, platform, support domain,
  resource ceiling, stochastic contract, Contract, Public Check, or release outcome;
- no authoritative artifact, implementation, schema, registry, or fixed semantic result is
  modified; and
- the numerical observations may be retained as preliminary evidence in a repaired
  `INPUT_INCOMPLETE` record.

This review does not certify every expensive nested-integral result and does not provide the
separate primary-source approval required for a future numerical disposition.

## 7. Validation

At candidate commit `18563ccf…`:

- `pnpm format:check`: clean;
- `pnpm lint:markdown`: 350 files, zero issues;
- `pnpm typecheck`: success; and
- `node --import tsx tooling/src/validate.ts`: OK.

Hosted continuous integration run `33841002849` contains five successful checks. Those
checks establish repository health, not commission compliance.

## 8. Required successor

Before merge consideration, produce one successor candidate that:

1. applies B-1 by either supplying and directly inspecting the required primary numerical
   sources or returning `INPUT_INCOMPLETE` without numerical dispositions;
2. applies B-2 through a genuine neutral-path rerun with portable sibling imports;
3. applies B-3 by embedding exact rerun output bytes with matching SHA-256 values;
4. applies S-1 to the classification summary;
5. keeps the result PR to its one designated path and preserves all authority boundaries;
6. synchronizes the pull-request description to the successor identity; and
7. obtains a separate-context exact-head close-only review. That reviewer must reproduce
   the affected probes and, if a numerical disposition is restored, directly inspect the
   required primary sources.

This review does not authorize merge, implementation, a design freeze, an RFC update,
public discussion, or Protocol adoption.

---

RELEASE 3 MULTIPLICITY NUMERICAL AND ORACLE EXACT-HEAD REVIEW COMPLETE - NO_GO - THREE BLOCKERS - ONE SHOULD-FIX - ONE NICE-TO-HAVE - PRIMARY-SOURCE STOP CONDITION NOT APPLIED - PUBLIC EVIDENCE PATH NOT NEUTRAL OR PORTABLE - SIX OUTPUT DIGESTS DO NOT MATCH - 49 ENTRIES BUT 50 SCOPE LABELS - NOT MERGE-ELIGIBLE
