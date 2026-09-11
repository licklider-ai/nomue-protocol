# Bounded declaration-binding design review

Review this fixed design before implementing a successor. No code repair or
scientific source survey is commissioned by this document. Record reviewer/model,
prior involvement and independence limits; the author is OpenAI Codex in the
continuing implementation context. New context alone is not independence proof.

## Questions that can block the next experiment

1. Does full canonical D0 plus expected-sidecar comparison prevent another valid
   analysis, family, member direction, origin or population from substituting its
   results? Can any submitter-selected field determine the supposed expected input?
2. Are the exact field sets, ID domains, family order, source/hypothesis tuple,
   p bytes and exact adjusted-value encodings sufficient and unambiguous? Does
   the smaller internal Holm carrier lose information not checked elsewhere?
3. Are all external JSON texts screened through the existing strict parser, with
   bounded preflight before recursive work? Does the private worker channel stay
   separate from external input and reject malformed/excess output?
4. Can runtime diagnostics accidentally become evidence identity again? Can a
   partial result or equal display conceal a different exact adjusted value?
5. Are D0's unissued descriptors, supplied-p scientific limits, deliberately
   narrower 3..16 all-pairs scope and declaration-only sidedness accurately stated?
6. Is the resource plan executable across Node plus Python without confusing
   heap limits, address space, sampled RSS and hard memory guarantees? Are the
   endpoint tests and combined maximum document probes adequate before claiming
   even a measured experiment envelope?

Inspect the pinned D0 schema/checker/example, Holm code and relevant source
boundaries in INPUTS.json. Return BLOCKER / SHOULD-FIX / optional observations
with concrete witnesses. Design review does not close scientific or public release
gates. After small repairs, the author may build one disposable bridge and request
bounded implementation review; do not add other methods to this review round.

## Author preparation checks

The design's three-member numerical witness was checked by independent rational
arithmetic and binary64 packing, without a bridge implementation. The D0 example
and schema were inspected for actual field names, member coverage, IDs and deferred
payloads. Pinned source files are recorded with commit/blob/hash identities.
Formatting, Markdown lint and repository validation are checked on this packet.
These activities are author preparation, not this requested external review.

## External design review receipt

A user-supplied bounded adversarial design review of commit
`517cb7dcfc02556ea8a91b583bbfdce91b7921f0` found no BLOCKER. Reviewer/model
identity and raw artifacts were not supplied; the receipt is attributed to the
user. The repair was prepared in that reviewer's session on 2026-09-11, not by
the original author context, and is not an independent close review of itself.

Reported checks: all twenty pinned inputs matched by commit, blob, size and
SHA-256; the three-member vector, its displays and lattice values, the
`3fd0000000000003` collision input, the adjusted value 3/4+9*2^-54 and the
shared display `3fe8000000000004` for the distinct exact value 3/4+8*2^-54 were
reproduced with independent lattice arithmetic; the 269-digit adjusted-hex
width was confirmed; the pinned D0 schema, example and checker were inspected
for the field names, `all_pairs`/`pair` kinds with stored minuend/subtrahend
direction, `member_ids` set coverage, `method_payload_deferred`, the
`example-contract-multiplicity-adjustment-v0` descriptor, the `before`/`after`/
`not_declared` timing enum, unordered sorted relation codes and `DUPLICATE_ID`
on family members; the strict parser's duplicate-member, unpaired-surrogate and
negative-zero rejections and the JCS shortest-number serialization were
confirmed, as was the checker's `numeric_domain` stage for non-finite numbers.

| Finding                                                                                                                                                                                                                                                 | Repair                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A uniform per-text budget of 20,000 nodes and 32 levels cannot hold: submitted evidence embeds the whole expected D0 and sidecar, so a D0 near either limit could never be bound, and a D0 at every stated count limit already needs about 23,000 nodes | Budgets now distinguish expected texts from submitted evidence (24,576 / 2,048 / 28,672 nodes; 32 versus 34 levels) and state the embedding rule; two acceptance rows and the witness script cover it |
| Step 4 did not say where duplicate member IDs are refused, although the acceptance matrix promises refusal before worker start                                                                                                                          | Step 4 names D0's `DUPLICATE_ID` at step 3; an acceptance row records the code and zero launches                                                                                                      |
| The strict parser runs `JSON.parse` before its eligibility scan, which the processing order did not make explicit                                                                                                                                       | The limits section states that the step 1 preflight is the only pre-parse guard                                                                                                                       |

Repair validation: `check_design_witnesses.py` passed with normal Python and
`python -O`. No bridge was implemented; no pinned input, numerical code or
historical packet changed.

## Author intake and node-estimate correction

The return `e170cedcd85fe1fae2c777609a4058f8f8891d74` has sole parent
`517cb7dcfc02556ea8a91b583bbfdce91b7921f0` and tree
`1bbafbbf20269cce809edfdcac47186f4fa7aac4`. Its review receipt is preserved
above. OpenAI Codex performed this intake in the continuing author context;
this is not an independent close review of the repair.

The duplicate-ID and pre-parser clarification are retained. The split node/depth
budgets are retained, but intake found the count-max estimate omitted growth of
analysis population references and design units. A materialized, schema-valid
16-group / 16-analysis / 16-family / 16-slot / 120-member / 1024-observation
D0 example has **42450** nodes, not about 23000. It is refused by the 24576-node
cap; the other count caps are not promises of simultaneous admission.

The corrected witness constructs that document from the hash-pinned example and
counts values iteratively. It also verifies the actual embedding upper bound:
24576+2048+481+3=27108, below 28672. Numerical witnesses and both normal and
optimized runs agree. All twenty input commit/blob/byte/hash identities match;
the count-max witness passes the pinned D0 JSON Schema. No bridge execution or
full resource benchmark is claimed. The expected refusal remains a design target.

This author correction avoids increasing unmeasured resource admission to fit a
mistaken estimate. Preserve the reviewer's report as an attributed historical
finding, with this section superseding the estimate. The next limited check should
confirm the corrected node definition, embedding arithmetic and conjunctive limits;
then a disposable implementation can proceed. No new original-source review is
needed for this counting correction. No schema, numerical algorithm, gate,
classification, public support or release decision changes.
