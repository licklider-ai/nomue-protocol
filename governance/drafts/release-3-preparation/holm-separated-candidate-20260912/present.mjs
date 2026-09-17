// Present a locally trusted supervisor receipt; never accept a submitter's receipt as evidence.
import fs from "node:fs";
import { parseStrictJson } from "../../../../reference/verifier/src/strict-json.ts";
import { publishReceipt } from "./public.mjs";
try {
  if (process.argv.length !== 3) throw Error("one trusted receipt path required");
  const fd = fs.openSync(
    process.argv[2],
    fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK,
  );
  let data;
  try {
    if (!fs.fstatSync(fd).isFile()) throw Error("regular receipt required");
    const b = Buffer.alloc(6 * 1024 * 1024 + 1);
    let n = 0;
    while (n < b.length) {
      const count = fs.readSync(fd, b, n, b.length - n, null);
      if (!count) break;
      n += count;
    }
    if (n === b.length) throw Error("receipt too large");
    data = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(b.subarray(0, n));
  } finally {
    fs.closeSync(fd);
  }
  const result = await publishReceipt(parseStrictJson(data));
  process.stdout.write(JSON.stringify(result) + "\n");
} catch {
  // No report when the presentation transport itself fails.
  process.exitCode = 65;
}
