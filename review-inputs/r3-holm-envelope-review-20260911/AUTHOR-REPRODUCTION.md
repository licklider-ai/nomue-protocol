# Author reproduction record

Fixed candidate: `180d6551a48c7d2f8018c21ccbab1fcf33ab6a02`.
Detached checkout: `/workspace/scratch/367118710fbf/r3-envelope-review`.
Environment: Linux; Node v24.19.0; Python 3.12.14. Public-repository installed
node_modules was copied into the detached checkout, preserving internal links.

Executed from the detached repository root:

```sh
NOMUE_EXPERIMENT_PYTHON=/opt/codex/runtimes/codex-primary-runtime/dependencies/python/bin/python3 node --import tsx governance/drafts/release-3-preparation/holm-envelope-experiment-20260911/test_envelope.mjs
```

Exit code 0; stdout:

```text
82 controls in 24 groups passed; 132 legacy fixtures passed
```

Then executed:

```sh
python3 governance/drafts/release-3-preparation/holm-envelope-experiment-20260911/build_schemas.py
node node_modules/prettier/bin/prettier.cjs --config /workspace/scratch/367118710fbf/nomue-protocol/.prettierrc.json --write 'governance/drafts/release-3-preparation/holm-envelope-experiment-20260911/*.json'
git diff --stat
```

Both reproduction commands exited 0. The final diff was empty. Author replay
rewrites only its packet examples/results; schema generation rewrites only its
packet schemas/identities/manifest. No author branch, supported verifier or
registered expectation was edited. The independent script does not run these
mutating author commands and writes its own output beside itself only.

During independent harness development, an initial CommonJS import of the
ESM-only canonicalize package failed before any test ran. The harness now imports
its ESM implementation from the reviewed repository's dependency installation.
The corrected run passed 93/93 controls. This was a review-harness setup correction,
not a candidate defect.
