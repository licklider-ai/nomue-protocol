if (process.version !== "v24.19.0" || process.platform !== "linux" || process.arch !== "x64")
  process.exit(78);
// Trusted supervisor tests only. No selection from Record data.
import fs from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import { Worker } from "node:worker_threads";
const mode = process.argv[2];
const python = process.env.NOMUE_EXPERIMENT_PYTHON;
const success = () => process.stdout.write(JSON.stringify({ output: { kind: "trusted-probe" } }));
if (mode === "node-memory") {
  const a = [];
  for (;;) a.push(Buffer.alloc(8 * 1024 * 1024, 1));
} else if (mode === "worker-memory") {
  // If a partial OOM ever occurs, deliberately try to produce a valid-looking exit-zero reply.
  const p = spawn(python, ["-I", "-c", "a=[]\nwhile True: a.append(bytearray(8*1024*1024))"]);
  p.on("exit", success);
} else if (mode === "pids") {
  const workers = [];
  try {
    for (;;) workers.push(new Worker("setInterval(()=>{}, 1000)", { eval: true }));
  } catch {
    success();
    for (const w of workers) w.terminate();
  }
} else if (mode === "descendant") {
  const p = spawn(python, ["-I", "-c", "import time; time.sleep(120)"], {
    detached: true,
    stdio: "ignore",
  });
  fs.writeFileSync(process.env.TMPDIR + "/descendant.pid", String(p.pid));
  p.unref();
  success();
} else if (mode === "stdout" || mode === "stderr") {
  const fd = mode === "stdout" ? 1 : 2;
  for (;;) fs.writeSync(fd, Buffer.alloc(65536, 65));
} else if (mode === "hang") {
  for (;;) {} // A JavaScript timer cannot interrupt this loop.
} else if (mode === "invalid") {
  process.stdout.write('{"output":');
} else if (mode === "environment") {
  if (["NODE_OPTIONS", "NODE_PATH", "PYTHONPATH", "LD_PRELOAD"].some((k) => k in process.env))
    process.exit(66);
  for (const fd of fs.readdirSync("/proc/self/fd")) {
    try {
      if (fs.readlinkSync("/proc/self/fd/" + fd).endsWith("nomue-inherited-descriptor-sentinel"))
        process.exit(68);
    } catch {
      /* Descriptor can close during inspection. */
    }
  }
  // The fixed child interpreter also sees the fixed environment.
  if (
    spawnSync(python, ["-I", "-c", "import os; assert 'NODE_OPTIONS' not in os.environ"]).status !==
    0
  )
    process.exit(67);
  success();
}
