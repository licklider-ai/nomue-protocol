import { walkFiles } from "../lib/repo.js";

export const PUBLIC_RELEASE_FORBIDDEN_PREFIXES = ["governance/research-problems/"] as const;

export interface PublicReleaseBoundaryResult {
  ok: boolean;
  forbidden_paths: string[];
  message: string;
}

export function checkPublicReleaseBoundaryFromPaths(paths: string[]): PublicReleaseBoundaryResult {
  const forbidden = paths
    .filter((filePath) =>
      PUBLIC_RELEASE_FORBIDDEN_PREFIXES.some((prefix) => filePath.startsWith(prefix)),
    )
    .sort();
  if (forbidden.length > 0) {
    return {
      ok: false,
      forbidden_paths: forbidden,
      message:
        "private-only research material remains in the Protocol repository: " +
        forbidden.join(", "),
    };
  }
  return {
    ok: true,
    forbidden_paths: [],
    message: "no private-only research paths are present in the release repository tree",
  };
}

export function checkPublicReleaseBoundary(): PublicReleaseBoundaryResult {
  return checkPublicReleaseBoundaryFromPaths(walkFiles(".").map((entry) => entry.rel));
}

export function assertPublicReleaseBoundary(): void {
  const result = checkPublicReleaseBoundary();
  if (!result.ok) throw new Error(result.message);
}
