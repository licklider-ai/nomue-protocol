# Input-Hardening Inspection Ledger (Batch 5, Y5)

**Status: verification ledger.** The 18-item integrated inspection list
(two R-B surveys + targeted falsification, ratified E1'-E5') verified with
a three-way verdict per item - specified / implemented / tested - and an
evidence path per verdict. ○ = holds; △ = holds
with the stated limitation; explanations follow the table. Verified at the
Batch 5 commit; regenerating fixtures or vectors re-executes every ○ in
the Tested column via `pnpm check`.

| #   | Item                                       | Specified                                                           | Implemented                                                                        | Tested                                                                  |
| --- | ------------------------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1   | Duplicate-key lexical rejection            | ○ NRS-CANON-0007/0014                                               | ○ strict-json.ts raw-text scanner; no `JSON.parse`-only path (audit)               | ○ JSON-DUP-001..009 + `auditStrictJsonInputPath` in `pnpm validate`     |
| 2   | Lone surrogate / NaN-Inf / non-binary64    | ○ NRS-CANON-0008, NRS-CANON-0003/0005                               | ○ strict-json.ts; JSON.parse (NaN/Inf); jcs.ts (non-finite)                        | ○ JSON-UNI-001..003, B-008, vectors invalid-nan/infinity-token          |
| 3   | -0 input rejection (MUST)                  | ○ NRS-CANON-0015                                                    | ○ strict-json.ts lexical token check                                               | ○ JSON-NEG-001..003, vectors negative-zero(+exponent), unit tests       |
| 4   | Ingress canonicalize-then-compare          | ○ NRS-CANON-0016                                                    | ○ reference/verifier/src/ingress.ts                                                | ○ canonicalization-hardening.test.ts (accept/reject/no-rewrite)         |
| 5   | Verify digest + idempotency fixture        | ○ NRS-CANON-0017                                                    | ○ integrity check (stored-bytes digest); vector runner idempotency assert          | ○ every canonical vector asserts canonicalize∘canonicalize=canonicalize |
| 6   | Single-parser principle                    | ○ NRS-CANON-0014 (detection stage)                                  | ○ parseStrictJson is the single input path; AJV consumes parsed values only        | ○ `auditStrictJsonInputPath` (validate) + code-path audits              |
| 7   | No post-verification re-parse (DSSE)       | ○ NRS-VERIFY-0027 (verbatim adoption)                               | ○ ingress returns ORIGINAL bytes; attestation verifies recomputed PAE              | ○ hardening test: original-reference return + non-canonical rejection   |
| 8   | Display = digest scope                     | ○ NRS-CORE-0006 (projection = record minus integrity, nothing else) | ○ digestProjection excludes exactly `integrity`                                    | ○ vector integrity-exclusion (projection kind)                          |
| 9   | Zero signing indirection                   | ○ NRS-EMIT-0003 (prohibition norm); no Reference/Transform exists   | ○ nothing to implement - the mechanism is absent by design                         | △ absence proven by spec review, not executable (see note 9)            |
| 10  | Confusable Unicode fixtures + display link | ○ NRS-CANON-0019 informative (display-contract route)               | ○ no normalization anywhere (NRS-CANON-0018)                                       | △ JSON-UNI-005 (NFC/NFD distinct); display-side warning is future work  |
| 11  | Numeric endpoint fixtures                  | ○ NRS-CANON-0003 + numeric model                                    | ○ jcs.ts shortest round-trip                                                       | ○ vectors numeric-endpoints (max/min normal, 5e-324, 1e±308), zero      |
| 12  | Non-UTF-8 / BOM / invalid bytes rejection  | ○ pre-routing class 2 (NRS-PARSE-FAILED)                            | ○ JSON.parse rejects BOM; CLI reads bytes as UTF-8, invalid input fails parse      | ○ vector bom-rejected; strict-json review note 12                       |
| 13  | Size/depth limits before canonicalization  | ○ NRS-SEC-0003 + pre-routing priority order (class 1 first)         | ○ checkRawSize pre-parse; checkParsedLimits pre-canonicalization (verify.ts order) | ○ A2-R-001..004, B-007 + priority order pinned in spec                  |
| 14  | Domain-tag context separation              | ○ NRS-CANON-0020                                                    | ○ digest.ts tags + attestation PAE + snapshot tag                                  | ○ hardening tests: 3-way digest inequality + context-swap negative      |
| 15  | Snapshot entry determinism, no leaf/node   | ○ NRS-VERSION-0001 + NRS-CANON-0020                                 | ○ JCS-structured manifest (typed fields, not concatenation) + snapshot tag         | ○ checkSnapshotManifestMechanism determinism (validate) + tag test      |
| 16  | Embedded artifact-hash recomputation path  | △ no such field exists in v0 (see note 16)                          | △ nothing to recompute - vacuous                                                   | △ vacuous                                                               |
| 17  | Hash-id field vs canonicalization version  | ○ NRS-CANON-0021                                                    | ○ integrity.digest_algorithm (const sha-256) separate from canonicalization_id     | ○ schema consts enforced in every record fixture                        |
| 18  | Identifier-domain boundary declaration     | ○ NRS-CANON-0019                                                    | ○ v0 set empty in practice (attester = key fingerprint binding)                    | △ declaration verified by review; nothing executable exists to test     |

## Notes on the non-○ verdicts

- **Item 9 (Tested △)**: the claim is the ABSENCE of a Reference/Transform
  mechanism; there is no code path to execute. Verified by specification
  review (no such construct in any schema or spec document) and fixed
  against regression by the NRS-EMIT-0003 prohibition; any future addition
  would have to repeal a normative clause, which is the strongest
  executable-equivalent guard available for an absence.
- **Item 10 (Tested △)**: fixtures pin that confusable-adjacent content
  (NFC/NFD) stays distinct and un-normalized. The display-side warning
  itself belongs to the display contract, which does not exist yet; the
  ledger records this as future work rather than claiming a test that
  isn't there. The route (display/public-check side, never
  canonicalization) is normatively fixed.
- **Item 12 (Implementation note)**: the reference CLI reads input with Node's UTF-8
  decoding; byte sequences that are not valid UTF-8 do not survive into a
  parseable JSON text and fail at class 2 (parse error). A BOM is rejected
  by JSON.parse itself (pinned by the `bom-rejected` vector). No lossy
  re-decoding path exists in the repository (no `latin1`/`binary` reads of
  verifier input).
- **Item 16 (all △)**: v0 Records embed no external-artifact hash
  references (the provenance model is minimal and carries identifiers,
  not hashes). The item is vacuously satisfied; recorded here so that any
  future field carrying an artifact hash must arrive with its
  recomputation path, per the same zero-untracked-gaps principle.
- **Item 18 (Tested △)**: a boundary DECLARATION is verified by its
  existence and review (NRS-CANON-0019); the executable half (PRECIS
  profile enforcement) only becomes testable when a future
  identifier-domain field exists.

## Cross-cutting evidence

- Full suite: `pnpm check` green at the Batch 5 commit (183 vitest tests,
  120 conformance fixtures, 16 golden vectors).
- Destructive-revision negative (Y4 requirement): the legacy untagged
  digest of a valid Record fails integrity verification -
  `tooling/tests/canonicalization-hardening.test.ts`
  ("NEGATIVE: the legacy (untagged) digest ...").
- ADR: governance/decisions/ADR-0027-canonicalization-hardening-revision.md.
