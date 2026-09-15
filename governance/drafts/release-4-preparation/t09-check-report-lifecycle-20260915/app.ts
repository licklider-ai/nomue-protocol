/** UNISSUED CANDIDATE. Contained application; stdout is not final delivery. */
import { openSync, readSync, closeSync, writeFileSync, readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { evaluate, refusal, validateFinal, ensure, profile } from "./report.js";
const here = dirname(fileURLToPath(import.meta.url));
const mode = Number(process.argv[2] ?? 0),
  control = process.argv[3] ?? "normal";
const receipts: any = {};
let failure: string | undefined;
let diagnostic = "";
async function invoke(packet: string): Promise<any> {
  const transport =
    control === "transport" ? packet + " ".repeat(profile.internal_transport_bytes + 1) : packet;
  if (Buffer.byteLength(transport) > profile.internal_transport_bytes) {
    failure = "transport_bound";
    throw Error(failure);
  }
  return new Promise((resolveResult, reject) => {
    const child = spawn(
      "/usr/local/bin/python",
      [...(mode ? ["-O"] : []), "-B", resolve(here, "supervise.py"), String(mode), control],
      { stdio: ["pipe", "pipe", "pipe"] },
    );
    const chunks: Buffer[] = [];
    let bytes = 0,
      errBytes = 0;
    let bad = false;
    child.stdout.on("data", (b: Buffer) => {
      bytes += b.length;
      if (bytes > profile.internal_transport_bytes) {
        bad = true;
        failure = "output_overflow";
        child.kill("SIGTERM");
      } else chunks.push(b);
    });
    child.stderr.on("data", (b: Buffer) => {
      errBytes += b.length;
      diagnostic = (diagnostic + b.toString("utf8")).slice(0, 2000);
      if (errBytes > profile.worker_stderr_bytes) {
        bad = true;
        failure = "output_overflow";
        child.kill("SIGTERM");
      }
    });
    child.on("error", reject);
    child.stdin.on("error", () => {
      bad = true;
      failure = "execution_error";
    });
    child.on("close", (code) => {
      try {
        ensure(!bad && code === 0 && errBytes === 0, "supervisor transport");
        const x = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        receipts.worker = x.receipt;
        receipts.mode = { supervisor: x.supervisor_optimize };
        ensure(x.supervisor_optimize === mode && x.python === "3.12.14", "supervisor environment");
        if (x.receipt.category !== "completed_transport") {
          failure = x.receipt.category;
          throw Error(failure);
        }
        const t = x.receipt.transport;
        delete x.receipt.transport;
        ensure(t.worker_optimize === mode, "worker mode");
        receipts.mode.worker = t.worker_optimize;
        receipts.worker.enforced_limits = t.limits;
        receipts.worker.python = x.python;
        ensure(
          JSON.stringify(t.limits) ===
            JSON.stringify({
              cpu: profile.cpu_soft_hard_seconds,
              address_space: [
                profile.worker_address_space_bytes,
                profile.worker_address_space_bytes,
              ],
            }),
          "worker limits",
        );
        ensure(
          t.result.numerical.candidate_identity ===
            "f14664e1082a7a346e6587a23384552aa543f8f1ec76fca07c402383734a7471",
          "G5 candidate identity",
        );
        resolveResult(t.result);
      } catch (e) {
        failure ??= "invalid_worker_output";
        diagnostic = (diagnostic + String(e)).slice(0, 2000);
        reject(e);
      }
    });
    child.stdin.end(transport + "\n");
  });
}
let result: any;
let bytes = 0;
try {
  const fd = openSync("/out/input.json", "r");
  const b = Buffer.alloc(profile.raw_bytes + 1);
  try {
    bytes = readSync(fd, b);
  } finally {
    closeSync(fd);
  }
  if (bytes > profile.raw_bytes) result = refusal("NRS-FILE-SIZE-LIMIT-EXCEEDED", bytes);
  else {
    let text: string;
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(b.subarray(0, bytes));
    } catch {
      throw Error("invalid_utf8");
    }
    result = await evaluate(text, invoke);
  }
  if (failure) {
    const code =
      failure === "deadline"
        ? "NRS-TIMEOUT-LIMIT-EXCEEDED"
        : failure === "allocation_failure"
          ? "NRS-MEMORY-LIMIT-EXCEEDED"
          : ["cpu_limit", "output_overflow", "transport_bound"].includes(failure)
            ? "NRS-RESOURCE-LIMIT-EXCEEDED"
            : "NRS-INTERNAL-VERIFIER-ERROR";
    result = refusal(code, bytes);
  }
  ensure(validateFinal(result), "final report validation");
} catch (e) {
  failure ??=
    e instanceof Error && e.message === "invalid_utf8" ? "invalid_utf8" : "execution_error";
  result = refusal(
    failure === "invalid_utf8" ? "NRS-PARSE-FAILED" : "NRS-INTERNAL-VERIFIER-ERROR",
    bytes,
  );
}
const refused = result.execution === "execution_refusal";
const audit = {
  execution: refused || failure ? "execution_refusal" : "completed_candidate",
  result: refused || failure ? null : result,
  candidate_refusal: refused ? result : null,
  reason: failure ?? (refused ? result.refusal.reason_codes[0] : null),
  receipts: Object.fromEntries(Object.entries(receipts).filter(([k]) => k !== "mode")),
  modes: receipts.mode ?? null,
  diagnostic,
};
if (control === "tree-memory") {
  const blocks: Buffer[] = [];
  for (;;) blocks.push(Buffer.alloc(16 * 1024 ** 2, 1));
}
if (control === "report-timeout")
  await new Promise(() => {
    setInterval(() => {}, 1000);
  });
let encoded = Buffer.from(JSON.stringify(audit));
if (control === "report-cap") encoded = Buffer.alloc(profile.full_report_bytes + 1);
if (encoded.length > profile.full_report_bytes) {
  audit.execution = "execution_refusal";
  audit.reason = "report_bound";
  audit.result = null;
  audit.candidate_refusal = refusal("NRS-RESOURCE-LIMIT-EXCEEDED", bytes);
  encoded = Buffer.from(JSON.stringify(audit));
}
writeFileSync("/out/report.json", encoded);
writeFileSync("/out/ready", "ready");
// The outer observer is the only delivery owner, after namespace/cgroup cleanup.
process.on("SIGTERM", () => process.exit(0));
setInterval(() => {}, 1000);
