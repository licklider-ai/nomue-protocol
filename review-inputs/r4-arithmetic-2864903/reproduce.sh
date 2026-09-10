#!/usr/bin/env bash
set -euo pipefail
root=$(git rev-parse --show-toplevel)
output=${1:?Provide an empty scratch output directory}
mkdir -p "$output"
output=$(cd "$output" && pwd)
input="$output/input"
replay="$output/replay"
git -C "$root" worktree add --detach "$input" 2864903316b4b4b2b219a56b42c535bfec7935b3
export OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 PYTHONDONTWRITEBYTECODE=1
packet="$input/governance/drafts/release-4-preparation/arithmetic-candidate-20260910"
python "$packet/run.py" --out "$replay"
python "$packet/resources.py" --out "$replay/resources.json"
python "$packet/verify.py" --rerun "$replay"
python "$input/governance/drafts/release-4-preparation/probes/ss-f-propagation.py" > "$replay/historical-fresh.json"
python "$root/review-inputs/r4-arithmetic-2864903/check.py" --root "$input" --replay "$replay" --out "$output/reviewer-results.json"
test -z "$(git -C "$input" status --porcelain --untracked-files=all)"
