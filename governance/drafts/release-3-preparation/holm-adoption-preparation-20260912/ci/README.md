# Exact-byte CI receipt custody

Run [34726549437](https://github.com/licklider-ai/nomue-protocol/actions/runs/34726549437),
job 103641555358, tested head `c999d8b3bf5ff3b8c58b0f018eb6c85b038c65ca`.
Its synthetic PR merge checkout had the same tree as the submitted head:
`25388544b5f2094c1be497de6d09ab73487ed1ea`.
All six workflows on that head completed successfully.

The workflow emitted ten allowlisted public synthetic receipt files, their
lengths and SHA-256 digests, and selected run/checkout metadata in a compressed
payload through authenticated job logs. `MEMBERS.json` records the extraction;
the numbered `.txt` files preserve each member's original bytes. The base64 file
preserves the compressed payload. This is an exact-byte log transport, not a
claim to have retrieved or hashed the GitHub artifact ZIP. The earlier download
limitation remains recorded in `../ci-initial/`.

Run `python3 governance/drafts/release-3-preparation/holm-adoption-preparation-20260912/check_ci_evidence.py`
from the repository root. This validates the payload digest, metadata joins,
all ten member hashes and bytes, 33 passing execution controls, 28 valid public
receipts, five original-byte forwards, and the actual Node 22 refusal receipt.
Hashes establish byte custody; they do not constitute independent review.

The subsequent custody commit adds this archive, its offline checker and status
documentation only. The candidate runtime, numerical dependencies, 530 pinned
packet inputs, and executed workflow are unchanged from the tested head.
New-wrapper independent review, operative conformance/dispatcher/authority
coupling, formal adoption and release remain open as described in `../RESTART.md`.
