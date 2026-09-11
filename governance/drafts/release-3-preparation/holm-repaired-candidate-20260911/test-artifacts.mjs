// Expected outcomes are assertions in tests. Example snapshots are regression artifacts.
import fs from "node:fs";
import assert from "node:assert/strict";
import path from "node:path";
import { format } from "prettier";
const local = (name) => new URL(name, import.meta.url);
export async function artifact(name, value) {
  const bytes = Buffer.isBuffer(value)
    ? value
    : Buffer.from(await format(JSON.stringify(value), { filepath: name, printWidth: 100 }));
  if (process.env.NOMUE_TEST_OUTPUT) {
    fs.mkdirSync(process.env.NOMUE_TEST_OUTPUT, { recursive: true });
    fs.writeFileSync(path.join(process.env.NOMUE_TEST_OUTPUT, name), bytes);
  }
  if (process.argv.includes("--refresh-examples")) {
    fs.writeFileSync(local(name), bytes);
    return;
  }
  const expected = fs.readFileSync(local(name));
  if (name.endsWith(".jcs")) assert.deepEqual(bytes, expected, name);
  else {
    const a = JSON.parse(bytes),
      b = JSON.parse(expected);
    // Runtime paths are observations, not portable fixture expectations.
    if (name === "RESULTS.json") {
      delete a.python;
      delete b.python;
    }
    assert.deepEqual(a, b, "snapshot drift: " + name);
  }
}
