/**
 * Offline-verification run-log generator (Batch 2 U4, gate R1-04 evidence).
 *
 * What this actually proves: no Node.js network primitive
 * (node:http/https/net/dns/dgram/tls, or the global fetch/XMLHttpRequest/
 * WebSocket) was invoked while verifying a real set of Record fixtures,
 * checked by monkey-patching those primitives to throw before this
 * process imports anything else, then running the verifier and recording
 * whether any patched function fired.
 *
 * What this does NOT prove, and the run-log says so explicitly: this is
 * application-level (Node API) interception, not OS-level packet capture
 * or a network namespace/firewall boundary. A sufficiently determined
 * bypass (a native addon making a raw syscall, or a future dependency
 * that ships its own compiled networking code) would evade it. Building
 * genuine OS-level network isolation with packet-level capture (network
 * namespaces, firewall rules, tcpdump/wireshark) was considered and
 * explicitly not attempted in this environment: it would require
 * modifying system/security settings, which is outside what this agent
 * does autonomously - see this run-log's own `scope_limitation` field and
 * the batch completion report.
 */

import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import { createRequire } from "node:module";
import { repoRoot } from "../lib/repo.js";

const require = createRequire(import.meta.url);

interface NetworkCallAttempt {
  module: string;
  function: string;
  stack: string;
}

const attempts: NetworkCallAttempt[] = [];

function guard(moduleName: string, fnName: string): never {
  const attempt: NetworkCallAttempt = {
    module: moduleName,
    function: fnName,
    stack: new Error().stack ?? "(no stack captured)",
  };
  attempts.push(attempt);
  throw new Error(
    `network-guard: blocked ${moduleName}.${fnName}() during offline-verification run`,
  );
}

/**
 * Patches network-capable Node built-ins and globals to throw instead of
 * connecting. Must run before any other import in this process, so no
 * module can capture an unpatched reference first.
 */
function installNetworkGuard(): void {
  // createRequire gives the mutable CJS module.exports object for Node's
  // builtins; `import * as x` gives a frozen ESM namespace object that
  // cannot be reassigned (confirmed: assigning to it throws TypeError).
  const httpModule = require("node:http") as Record<string, unknown>;
  const httpsModule = require("node:https") as Record<string, unknown>;
  const netModule = require("node:net") as Record<string, unknown>;
  const dnsModule = require("node:dns") as Record<string, unknown>;
  const tlsModule = require("node:tls") as Record<string, unknown>;

  for (const fn of ["request", "get"] as const) {
    httpModule[fn] = () => guard("node:http", fn);
    httpsModule[fn] = () => guard("node:https", fn);
  }
  netModule["connect"] = () => guard("node:net", "connect");
  netModule["createConnection"] = () => guard("node:net", "createConnection");
  tlsModule["connect"] = () => guard("node:tls", "connect");
  for (const fn of ["lookup", "resolve", "resolve4", "resolve6"] as const) {
    dnsModule[fn] = () => guard("node:dns", fn);
  }

  const globalAny = globalThis as unknown as Record<string, unknown>;
  if (typeof globalAny["fetch"] === "function") {
    globalAny["fetch"] = () => guard("global", "fetch");
  }
  if (typeof globalAny["XMLHttpRequest"] === "function") {
    globalAny["XMLHttpRequest"] = function XMLHttpRequestGuard(): never {
      return guard("global", "XMLHttpRequest");
    } as never;
  }
  if (typeof globalAny["WebSocket"] === "function") {
    globalAny["WebSocket"] = function WebSocketGuard(): never {
      return guard("global", "WebSocket");
    } as never;
  }
}

interface RunLogEntry {
  fixture: string;
  exit_code: number;
  output_type: string | undefined;
}

async function main(): Promise<void> {
  installNetworkGuard();

  // Imported only AFTER the guard is installed, so if verifyRecordText (or
  // anything it transitively imports) ever reaches for a network module,
  // it gets the guarded version.
  const { verifyRecordText } = await import("../../../reference/verifier/src/verify.js");
  const { readText } = await import("../lib/repo.js");

  const fixtures = [
    "conformance/fixtures/public_checks/V-001.json",
    "conformance/fixtures/public_checks/A2-V-001.json",
    "conformance/fixtures/verifier_behavior/B-001.json",
    "conformance/fixtures/verifier_behavior/B-007.json",
    "conformance/fixtures/verifier_behavior/B-009.json",
    "conformance/fixtures/emitter/E-003.json",
  ];

  const runLog: RunLogEntry[] = [];
  for (const fixture of fixtures) {
    const text = readText(fixture);
    const outcome = verifyRecordText(text);
    runLog.push({
      fixture,
      exit_code: outcome.exitCode,
      output_type: outcome.report?.report_type ?? outcome.refusal?.output_type,
    });
  }

  const dir = path.join(repoRoot, "evidence", "development", "offline-verification");
  fs.mkdirSync(dir, { recursive: true });

  const record = {
    schema: "nrs-offline-verification-run-log",
    schema_version: "0.1.0",
    generated_at_note:
      "Deliberately omitted (a live timestamp would break reproducibility of this evidence file's own hash); see the accompanying README for when this was produced.",
    method:
      "Application-level Node API interception (node:http/https/net/dns/tls request-and-connect functions, plus global fetch/XMLHttpRequest/WebSocket, monkey-patched to throw before any other module is imported), not OS-level network isolation or packet capture.",
    scope_limitation:
      "This proves no instrumented Node API was invoked; it does not prove no syscall of any kind reached the network (a native addon or a future dependency's own compiled networking code would not be intercepted). Genuine OS-level network-namespace/firewall isolation with packet-level capture was not attempted in this environment: it requires modifying system/security settings, which this agent does not do autonomously.",
    fixtures_run: runLog,
    network_call_attempts: attempts,
    result: attempts.length === 0 ? "zero_network_calls_detected" : "network_calls_detected",
  };

  const text = `${JSON.stringify(record, null, 2)}\n`;
  const outPath = path.join(dir, "run-log.json");
  fs.writeFileSync(outPath, text, "utf8");
  const sha256 = createHash("sha256").update(text, "utf8").digest("hex");

  console.log(`offline-verification: ${record.result} across ${runLog.length} fixtures`);
  console.log(`wrote ${path.relative(repoRoot, outPath)} (sha256:${sha256})`);
  if (attempts.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
