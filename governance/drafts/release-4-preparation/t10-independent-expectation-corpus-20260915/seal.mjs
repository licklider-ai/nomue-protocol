// UNISSUED CANDIDATE. Input sealing only; no checker or numerical imports.
import canonicalize from "canonicalize";
import { createHash } from "node:crypto";
let text = "";
for await (const chunk of process.stdin) text += chunk;
const records = JSON.parse(text);
process.stdout.write(
  JSON.stringify(
    records.map((r) => {
      const body = Object.fromEntries(Object.entries(r).filter(([key]) => key !== "integrity"));
      r.integrity.content_digest =
        "sha256:" +
        createHash("sha256")
          .update("nomue/record-content/v1\n" + canonicalize(body))
          .digest("hex");
      return canonicalize(r);
    }),
  ),
);
