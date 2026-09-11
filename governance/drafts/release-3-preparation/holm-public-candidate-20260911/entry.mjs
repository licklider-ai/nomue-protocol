if (process.version !== "v24.19.0" || process.platform !== "linux" || process.arch !== "x64")
  process.exit(78);
// Trusted file transport for the pinned envelope; no loader or Record-controlled options.
import fs from "node:fs";
import { verify, validateOutput, CAPS } from "./envelope.mjs";

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

export async function run(recordPath, expectedPath) {
  const record = readBounded(recordPath, CAPS.recordBytes);
  // Preserve record-first admission. Expected I/O starts only when verify requests context.
  // A first pass uses a sentinel context; a digest/schema refusal never opens expected input.
  const first = await verify("", record);
  if (first.output.reason !== "expected_malformed_json") return first;
  const raw = readBounded(expectedPath, CAPS.expectedBytes);
  // Oversize context has the existing expected_bytes refusal regardless of UTF-8 validity.
  const expected =
    raw.length > CAPS.expectedBytes
      ? " ".repeat(CAPS.expectedBytes + 1)
      : new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(raw);
  return verify(expected, record);
}

try {
  if (process.argv.length !== 4) throw Error("two file paths required");
  const r = await run(process.argv[2], process.argv[3]);
  if (!(await validateOutput(r.output))) throw Error("invalid output");
  const result = { output: r.output };
  if (r.verified_bytes) result.verified_record_base64 = r.verified_bytes.toString("base64");
  process.stdout.write(JSON.stringify(result) + "\n");
} catch {
  // Trusted transport failure, never a new public refusal or an arithmetic result.
  process.exitCode = 65;
}
