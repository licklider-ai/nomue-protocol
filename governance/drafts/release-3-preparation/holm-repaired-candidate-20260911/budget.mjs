// Existing checkpoint semantics, with one monotonic origin per invocation.
import { performance } from "node:perf_hooks";
import {
  startProcessingBudget,
  checkProcessingBudget,
} from "../../../../reference/verifier/src/limits.ts";
export const POLICY = Object.freeze({ maxProcessingMs: 5000, maxHeapBytes: 536870912 });

export function createBudget({
  now = () => performance.now(),
  heapUsedBytes = () => process.memoryUsage().heapUsed,
  onCheckpoint = () => {},
} = {}) {
  const started = now();
  if (!Number.isFinite(started)) throw Error("invalid monotonic origin");
  let last = started;
  let peak = 0;
  // startProcessingBudget reads its clock twice. Both receive the same captured origin.
  const base = startProcessingBudget({ ...POLICY, now: () => started });
  const budget = Object.freeze({
    ...base,
    now() {
      const value = now();
      if (!Number.isFinite(value) || value < last) throw Error("invalid monotonic clock");
      last = value;
      return value;
    },
    heapUsedBytes() {
      const value = heapUsedBytes();
      if (!Number.isSafeInteger(value) || value < 0) throw Error("invalid heap observation");
      peak = Math.max(peak, value);
      return peak;
    },
  });
  return Object.freeze({
    budget,
    onCheckpoint,
    observations: () => ({ elapsedMs: last - started, sampledPeakHeapBytes: peak }),
  });
}

export function exhausted(state, checkpoint) {
  state.onCheckpoint(checkpoint); // Trusted harness hook only; never a CLI or Record option.
  const violation = checkProcessingBudget(state.budget);
  return violation
    ? violation.limit === "maxProcessingMs"
      ? "processing_timeout"
      : "processing_heap"
    : null;
}
