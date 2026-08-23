# Targeted Independent Review Record - Strict JCS Input Repair (ADR-0018)

- Scope: the repair that made JCS input eligibility normative - rejection
  of duplicate JSON object member names (all depths, all values, after
  escape decoding) and of unpaired-surrogate strings, on the raw text,
  before routing, canonicalization, or digest computation; the fixed
  pre-routing rejection priority; the shared strict input path across the
  verify/canonicalize/digest CLI subcommands with strict UTF-8 decoding;
  requirements NRS-CANON-0007/0008; the strict_json fixture family; and
  the independent differential classifier.
- Reviewer: independent adversarial reviewer context (AI subagent),
  separate from the implementing context; read-and-execute only. Executed
  ~120 targeted probes (about 30 generated probe files through the real
  CLI and `verifyRecordText`, plus in-process scanner, differential,
  priority, and refusal-schema batteries), replayed all suites, and
  diffed pinned artifacts against commit ad9ff77.
- First pass result: **0 BLOCKER, 0 MAJOR, 3 MINOR** (all tooling-layer
  hygiene items).
- Verification pass after fixes: **0 BLOCKER, 0 MAJOR, 0 MINOR.**
  Verdict: "the repair plus this fix pass is clean for commit."

## Disposition of findings

| Finding                                                                                                                                                                                                                           | Severity | Disposition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MINOR-1: the strict-json input audit was a literal-substring lint - spacing variants (`JSON.parse (text)`) and a loose clone-idiom prefix (`JSON.stringifyLike`) evaded it, while its guarantee was stated stronger than a lint   | MINOR    | **Fixed and re-verified by execution.** The audit now uses whitespace-tolerant regexes with a paren-anchored clone-idiom exemption; the reviewer executed the exact constructed patterns (spacing variants flagged, clone idiom exempt, `stringifyLike` no longer exempt, no self-flagging on the current tree). The audit docstring and ADR-0018 now state explicitly that it is a lint over plain spellings - aliased or computed calls are declared out of scope - with the behavioral proof carried by the strict_json fixture suite through all three CLI entry points plus the parseStrictJson-presence check. |
| MINOR-2: the conformance runner parsed its OWN non-Record inputs (routing-invariance instruction files, report_schema fixture inputs) with plain `JSON.parse`, holding the suite's inputs to a laxer standard than verifier input | MINOR    | **Fixed.** Both paths now parse through `parseStrictJson`; zero raw `JSON.parse` remains in the runner.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| MINOR-3: the `refusal_schema_valid` manifest pin was dead data - declared but never read by the runner                                                                                                                            | MINOR    | **Fixed.** The runner still validates every refusal unconditionally and now additionally compares the observed schema-validation result against the pin whenever the manifest declares it.                                                                                                                                                                                                                                                                                                                                                                                                                           |

## Clean dimensions (first pass, all established by executed probes)

Duplicate coverage: depth-32/80 nesting, deep array positions, empty-string
member names, 100-member objects, 20k-character names, identical-value
duplicates - all refused; NFC-vs-NFD and case-differing names correctly
accepted as distinct (no normalization collision). Escaped equivalence:
the `\u0041BC` and `ABC` spellings, hex-case variants, the `\n` and
`\u000A` escapes, the `\/` and `/` spellings, and
literal-vs-surrogate-escaped astral names all collide; the double-escape
traps decide correctly (`"\\u0069"` as literal backslash text does NOT
collide with `"i"`; it DOES collide with its own escaped-equivalent
spelling). False positives: none - member-name-like text, escaped
quotes/braces/colons/commas, and structural characters inside string
values all pass, and JSON-DUP-010/011 verify exit 0. Unicode: lone
high/low in values and names, reversed pairs, high-high-low, and
lone-high-then-valid-pair all refused without misconsuming the following
valid pair; escaped and literal pairs accepted; the critical
`{"x": "\\uD800"}` backslash-text case correctly ACCEPTED versus the
escape form refused; JSON-UNI-005's canonical form retains both NFC and
NFD sequences with no U+FFFD anywhere. Priority: implementation matches
the normative order exactly (malformed beats duplicate; duplicate beats
invalid Unicode, parsed limits, and routing; raw size beats everything).
CLI: canonicalize and digest refuse duplicate/Unicode inputs with zero
stdout bytes; invalid UTF-8 and CESU-8 surrogate bytes refused by strict
decoding on all three subcommands; every refusal validates against the
unchanged draft.2 refusal schema (confirming no schema version bump was
needed). No dispatch under refusal; duplicate bundle declarations refuse
identically under reversed and shuffled registry orders (ROUTE-007/008
probes genuinely included). Valid outputs unchanged: 13 JCS vectors zero
diff; the only pin changes versus ad9ff77 are the B-002..B-006 and
ROUTE-007/008 input hashes and the verifier version string
(0.2.0-draft.2 -> 0.2.0-draft.3). Scanner quality: no tokenizer defect
found across escape handling, string termination, scientific notation,
whitespace forms, top-level scalars, empty containers, and the iterative
stack; the differential classifier is genuinely differently-strategied
(token list + recursive descent + sort-based duplicate detection +
code-point iteration) and agreed on the full corpus. Requirement wiring:
NRS-CANON-0007/0008 anchored exactly once, CORE, fully referenced; both
reason codes registered refusal-only; no document presents first-wins or
last-wins as current behavior. Suites green on both passes.

## Residual accepted items at close (documented, not open findings)

The strict-json input audit deliberately does not chase aliased or
computed call spellings; this boundary is declared in the audit docstring
and ADR-0018, and the guarantee rests on the behavioral fixture suite
exercised through all three CLI entry points plus the
parseStrictJson-presence check.

Blocker count at close: 0; major count at close: 0; minor count at
close: 0.
