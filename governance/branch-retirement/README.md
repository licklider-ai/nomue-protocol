# Merged branch retirement register

This directory records the retirement of merged working branches without
altering historical review and research artifacts. Historical documents may
name a branch because it was observed at the time of a review. Those names are
historical facts, not current locators.

`merged-branches-20260925.csv` is the retirement register. For every retired
branch it records the final head commit, its date, and the fact that the commit
is reachable from `main` at the time of retirement.

To inspect a historical artifact, resolve the recorded `head_sha` directly:

```sh
git show <head_sha>
```

Do not reinterpret an historical branch name as a required live remote ref.
The four Release 4 research workflows that formerly ran only on their temporary
working branches are retained for manual dispatch. They have no push trigger
after the corresponding branches are retired.
