# Holm full-envelope review archive

This packet preserves the separate investigator’s exact outputs for
[PR #313](https://github.com/licklider-ai/nomue-protocol/pull/313), candidate
`180d6551a48c7d2f8018c21ccbab1fcf33ab6a02`.

The [review](REVIEW.md) finds no blocker to merging the unissued research asset.
Its 93 independent controls passed; the investigator reproduced the author’s
82 controls across 24 categories and all 132 legacy conformance fixtures.
Same inherited model and shared infrastructure are disclosed; no fresh primary
source inspection or formal adoption decision is claimed.

- [Inspected input hashes](INPUTS.json)
- [Independent controls](independent-tests.mjs) and [results](independent-results.json)
- [Author reproduction](AUTHOR-REPRODUCTION.md)
- [Exact reviewer output checksums](OUTPUT-SHA256SUMS.txt)
- [Integration receipt](INTEGRATION.json)
- [Coordinator promotion handoff](PROMOTION-HANDOFF.md)

The checksum list covers the investigator’s five original files. This README,
the integration receipt and promotion handoff are coordinator additions, outside
the fixed-candidate review. The candidate implementation remains unchanged.

## Reproduction

From the repository root, select an absolute Python executable:

```sh
NOMUE_EXPERIMENT_PYTHON=/absolute/path/to/python3 node --import tsx review-inputs/r3-holm-envelope-review-20260911/independent-tests.mjs
```

The script writes its results beside itself. Environment differences may change
recorded metadata; the archived checksum identifies the original review output.
