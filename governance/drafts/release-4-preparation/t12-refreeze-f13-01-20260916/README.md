# Release 4 T12 re-freeze after F13-01

Status: **UNISSUED CANDIDATE**.

This is a new freeze record after the independent T13 finding F13-01. It preserves the original T12 target `752a3ef876f27595cca31c4a106e70ffc7bd04df` and its manifest SHA-256 `f43cd0d1b3ba0042425139e77975199ba24a0e1db96aa65d18bf8bf997bfe3fb` as historical evidence.

The candidate source is `12bf1b767963fbfc5382ba9734d595f6da428832`. It consists of the original freeze, the limited repair `84627967352206e9d1ecc54c5ca6a735319d9785`, and repair evidence at the candidate source. The containing commit is the new exact T13 review target.

- `FREEZE-MANIFEST.json` binds the historical inventory and F13-01 lineage.
- `REPORT.md` describes the scope and preserved boundaries.
- `REPRODUCTION-RECEIPT.json` binds target-specific validation.
- `verify_refreeze.py` verifies bindings without regenerating numerical evidence.
