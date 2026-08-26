import { describe, expect, it } from "vitest";
import { checkRelease1HistoricalIntegrity } from "../src/release/release-1-history.js";

describe("Release 1 historical integrity", () => {
  it("accepts the signed Release 1 baseline in a successor checkout", () => {
    expect(checkRelease1HistoricalIntegrity()).toEqual([]);
  });
});
