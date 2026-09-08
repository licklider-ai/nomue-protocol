# Agent Session Instructions

Read `AGENTS.md` first. It is the authoritative contribution guide for this repository. This
file adds only the session-tooling rules that `AGENTS.md` cannot enforce on its own. Its
filename and the `.claude/` directory are fixed lookup names of the coding tool, not
attribution.

## Naming and signatures (repository owner's standing instruction)

- Never put the word "claude", in any letter case, into a branch name, commit message,
  commit trailer, pull request title or body, label, filename, or any other work signature.
  Use durable domain, task, and accountable-role names as `AGENTS.md` requires, for example
  `review/<topic>`, `research/<topic>`, or `governance/<topic>`.
- If the session harness assigned a working branch whose name starts with `claude/`, do not
  push to it. Create the domain-named branch from the correct base commit, push there, and
  state in the final report which branch carries the work. This file is the repository
  owner's explicit standing permission to push to that differently named branch instead of
  the harness-assigned one.
- Do not append `Co-Authored-By` trailers, session-link trailers, or "Generated with"
  footers to commits, pull requests, or comments. `.claude/settings.json` disables the
  built-in attribution; do not re-add it by hand.
- Required provenance (model or provider used, execution environment, independence
  boundary) belongs inside the governance, review, or methodology record itself, as
  `AGENTS.md` requires. Disclosure inside such a record is not a signature and is not
  affected by this rule.
- The pre-tool hook `.claude/hooks/naming-guard.mjs` refuses shell commands that push,
  create, or check out `claude/`-named branches, or that write assistant signature trailers
  into commits or pull requests. If it fires, rename the branch or remove the trailer. Do
  not bypass it.
