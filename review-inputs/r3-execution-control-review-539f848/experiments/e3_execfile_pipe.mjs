// E3: does execFile({ timeout, killSignal: "SIGKILL" }) settle when a setsid grandchild still
// holds the stdout pipe, and does the grandchild survive? (bridge.runWorker uses this API shape.)
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs";
const execute = promisify(execFile);
const python = process.env.NOMUE_EXPERIMENT_PYTHON ?? "/usr/local/bin/python3";
const t0 = performance.now();
const script = `
import os, subprocess, sys, time
g = subprocess.Popen([sys.executable, "-c", "import time; time.sleep(4)"], start_new_session=True)
print("worker", os.getpid(), "grandchild", g.pid, flush=True)
time.sleep(100)
`;
const p = execute(python, ["-I", "-c", script], {
  timeout: 1000,
  killSignal: "SIGKILL",
  maxBuffer: 262144,
  encoding: "utf8",
});
let exitAt = null;
p.child.on("exit", () => {
  exitAt = Math.round(performance.now() - t0);
});
try {
  await p;
  console.log(JSON.stringify({ unexpected: "resolved without error" }));
} catch (e) {
  const grand = Number(e.stdout.trim().split(" ")[3]);
  const alive = fs.existsSync(`/proc/${grand}`);
  console.log(
    JSON.stringify({
      exit_event_ms: exitAt,
      promise_rejected_ms: Math.round(performance.now() - t0),
      killed: e.killed,
      signal: e.signal,
      stdout: e.stdout.trim(),
      grandchild_alive_after_rejection: alive,
    }),
  );
  if (alive) process.kill(grand, "SIGKILL");
}
