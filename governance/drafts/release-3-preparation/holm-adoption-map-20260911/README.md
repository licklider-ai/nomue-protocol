# Holm adoption map and restart point

Informative continuation of the [public candidate](../holm-public-candidate-20260911/README.md)
and its [review/CI evidence](../../../../review-inputs/r3-holm-public-candidate-review-20260911/README.md).
Base: `2ee34a5eae70ca2913dffeb4e42b155d344d2023`. No runtime or authoritative
surface is changed by this packet.

## Concrete adoption preparation

- REQUIREMENTS.json and generated WORDING.md propose 16 capability-scoped
  Requirement allocations and their exact candidate wording/evidence locators.
- SURFACES.json and generated FIELD-INVENTORY.json account for 357 property
  declarations across all four public schemas, including definitions and variants.
- REGISTRY-PREVIEW.json contains concrete prospective registry rows checked
  against the existing meta-schema. They are unallocated and non-operative.
- [AUTHORITY-DELTA.md](AUTHORITY-DELTA.md) connects each artifact to its existing
  authority target and final destination.
- [DECISIONS.md](DECISIONS.md) recommends retaining NRS-SEC-0006 through actual
  in-process checkpoints, truthful input-size evidence and the reviewed scoped
  report/declaration design. It lists predetermined checkpoint tests.

No statistical code or comparison policy changes. Reuse PR #321's bounded
configured-model review and PR #322's exact source-bound host evidence. This
coordinator authored the prior integration and does not claim a new independent
scientific review. Static checks verify the map, not numerical validity or adoption.

## Reproduce and resume without scratch assets

All necessary sources, review receipts, examples, scripts and exact CI artifact
members are committed in the public repository. No scratch review directory,
temporary download URL or expiring Actions artifact is required to resume.
INPUTS.json pins every source used by this map to its bytes at the recorded base.

```sh
pnpm install --frozen-lockfile
node governance/drafts/release-3-preparation/holm-adoption-map-20260911/check.mjs
```

The check verifies source hashes, unallocated ID grammar/collisions, candidate
test locators, complete schema-property ownership, registry row shape and generated
output drift. Three negative controls exercise map failures. To intentionally
regenerate the local informative views, add --write; inspect resulting differences
before committing. A source mismatch calls for explicit rebase/review and new
pins, not silently replacing the expected hashes.

Next work, in order:

1. Implement the declared in-process budget and output-evidence decision on a new
   candidate revision, preserving the current candidate and historical receipts.
2. Run the predetermined boundaries and actual-host controls; independently
   review changed execution/output behavior within its real scope.
3. Complete permanent fixture/surface references and all authoritative destinations
   together; assess exact RFC/stability impact and record the required decision.
4. Only after adoption prepare R3 release conditions, freeze and publication.

Do not activate the registry preview by itself. The map reports
NOT_READY_FOR_ADOPTION while these conditions remain. It creates no new RFC
window and does not alter the other R3 capabilities or old bundles.

## Preservation discipline

Keep each implementation increment, its tests and evidence in a reviewable commit
and push it before moving to the next increment. Merge reviewed informative
assets into main so the recovery path never depends on an abandoned branch.
Retain raw review/CI bytes with hashes; append a new receipt when results change.
Do not overwrite historical failures or label an unrun control as passed.
The merge commit containing this packet is the restart point; resolving its
commit ID from Git history avoids embedding a self-referential hash in its files.
