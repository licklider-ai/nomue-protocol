# T12 re-freeze reproducibility

Status: **UNISSUED CANDIDATE**.

Checkout the exact containing re-freeze commit. Confirm that its parent is candidate source `12bf1b767963fbfc5382ba9734d595f6da428832`, whose ancestry contains original target `752a3ef876f27595cca31c4a106e70ffc7bd04df` and repair `84627967352206e9d1ecc54c5ca6a735319d9785`.

Run the binding checker:

```console
python -B governance/drafts/release-4-preparation/t12-refreeze-f13-01-20260916/verify_refreeze.py
```

For the full packet suite, use the recorded F13-01 Linux T09/T11 receipts and rerun the established workflows on the exact target when required. Focused local controls are:

```console
python -B governance/drafts/release-4-preparation/t13-f13-01-repair-20260915/verify_repair.py
python -B governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/test_f01.py
python -O -B governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/test_f01.py
```

The original T12, T09, T10, and T11 stage-scoped checkers remain historical and must be run at their recorded immutable source commits when their scope requires it. Their recorded receipts are reused by exact hash; this re-freeze does not regenerate historical numerical evidence.
