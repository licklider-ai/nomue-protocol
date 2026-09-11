if (process.version !== "v24.19.0" || process.platform !== "linux" || process.arch !== "x64")
  process.exit(78);
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { verify, validateOutput, CAPS, IDS } from "./envelope.mjs";
import { createBudget, exhausted } from "./budget.mjs";

function readBounded(name, cap) {
  const fd = fs.openSync(
    name,
    fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK,
  );
  try {
    if (!fs.fstatSync(fd).isFile()) throw Error("regular input required");
    const buffer = Buffer.alloc(cap + 1);
    let n = 0;
    while (n < buffer.length) {
      const count = fs.readSync(fd, buffer, n, buffer.length - n, null);
      if (!count) break;
      n += count;
    }
    return buffer.subarray(0, n);
  } finally {
    fs.closeSync(fd);
  }
}
const refusal = (reason) => ({
  output: { kind: IDS.refusal, stage: "processing", refusal_kind: "resource_limit", reason },
});
const earlyRaw = (r) => ["raw", "parsed"].includes(r.output.stage);

export async function run(recordPath, expectedPath, options = {}) {
  const budget = options.budget ?? createBudget();
  const read = options.read ?? readBounded;
  const record = read(recordPath, CAPS.recordBytes);
  const first = await verify("", record, { ...options, budget });
  if (first.output.reason !== "expected_malformed_json") return first;
  const beforeExpected = exhausted(budget, "expected_io");
  if (beforeExpected) return refusal(beforeExpected);
  const raw = read(expectedPath, CAPS.expectedBytes);
  const expected =
    raw.length > CAPS.expectedBytes
      ? " ".repeat(CAPS.expectedBytes + 1)
      : new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(raw);
  return verify(expected, record, { ...options, budget });
}

export async function transport(recordPath, expectedPath, options = {}) {
  const budget = options.budget ?? createBudget(); // Before any Record file I/O; shared by both passes.
  const r = await run(recordPath, expectedPath, { ...options, budget });
  if (!(await validateOutput(r.output))) throw Error("invalid output");
  const result = { output: r.output };
  if (r.verified_bytes) result.verified_record_base64 = r.verified_bytes.toString("base64");
  const encoded = JSON.stringify(result) + "\n";
  // Check after output validation, snapshot/base64 and serialization, before any write.
  // Raw syntax/parsed-size refusals retain ingress priority and contain no success bytes.
  const reason = earlyRaw(r) ? null : exhausted(budget, "transport");
  return reason ? JSON.stringify(refusal(reason)) + "\n" : encoded;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 4) throw Error("two file paths required");
    process.stdout.write(await transport(process.argv[2], process.argv[3]));
  } catch {
    process.exitCode = 65;
  }
}
