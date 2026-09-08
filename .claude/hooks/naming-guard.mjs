// PreToolUse guard for shell commands. Refuses commands that would push, create, or check
// out a branch whose name contains "claude/", or that write assistant signature trailers
// into a commit or pull request. Deleting such a branch stays allowed. The payload arrives
// as JSON on stdin; a refusal is returned as a PreToolUse permission decision.
let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  raw += chunk;
});
process.stdin.on("end", () => {
  let command = "";
  try {
    command = String(JSON.parse(raw).tool_input?.command ?? "");
  } catch {
    command = "";
  }
  // A segment is one shell command between separators. The branch check applies only to
  // segments whose first word is git followed by a branch-affecting subcommand, so a commit
  // message or a file path that merely mentions ".claude/" does not trigger it.
  const segments = command.split(/\n|;|&&|\|\|?/);
  const branchSubcommand =
    /^\s*(?:\w+=\S*\s+)*git(?:\s+-[-\w]+(?:\s+\S+)?)*\s+(push|checkout|switch|branch|merge|rebase|worktree)\b/i;
  const branchName = /(?<![.\w])claude\//i;
  const branchDeletion = /--delete\b|\s-[dD]\b|:refs\/heads\/claude\/|\s:claude\//;
  const signature =
    /co-authored-by:[^\n]*claude|claude-session:|generated (with|by) \[claude code\]/i;
  const commitOrPullRequest = /\bgit\b[^\n;&|]*\bcommit\b|\bgh\b[^\n;&|]*\bpr\b/i;
  const namesBranch = segments.some(
    (segment) =>
      branchSubcommand.test(segment) && branchName.test(segment) && !branchDeletion.test(segment),
  );
  let reason = "";
  if (namesBranch) {
    reason =
      'Branch names containing "claude" are not allowed in this repository (AGENTS.md naming rule, CLAUDE.md). Use a domain-named branch such as review/<topic>, research/<topic>, or governance/<topic>.';
  } else if (signature.test(command) && commitOrPullRequest.test(command)) {
    reason =
      "Assistant signature trailers and footers are not allowed in commits or pull requests in this repository (CLAUDE.md). Remove the Co-Authored-By, session-link, or Generated-with text.";
  }
  if (reason) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: reason,
        },
      }),
    );
  }
  process.exit(0);
});
