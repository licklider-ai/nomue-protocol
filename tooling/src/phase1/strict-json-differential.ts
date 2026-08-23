/**
 * Independent duplicate/Unicode classifier for the strict-JSON differential
 * check (ADR-0018). Deliberately implemented with a DIFFERENT strategy from
 * the reference scanner (reference/verifier/src/strict-json.ts):
 *
 *  - two-stage: full tokenization into a token list first, then a
 *    recursive-descent walk over tokens (the reference scanner is a
 *    single-pass iterative state machine over characters);
 *  - duplicate detection via sorting the decoded member names of each
 *    object (the reference uses a per-frame Set during the pass);
 *  - Unicode validation via `for...of` code-point iteration over the fully
 *    decoded string (lone surrogates surface as code points in the
 *    surrogate range), instead of explicit code-unit pairing state.
 *
 * The two implementations must agree on every fixture and adversarial
 * sample; the reference scanner is never its own only witness.
 */

export interface StrictJsonClassification {
  duplicates: boolean;
  invalidUnicode: boolean;
}

interface StringToken {
  kind: "string";
  decoded: string;
}
interface PunctToken {
  kind: "punct";
  value: "{" | "}" | "[" | "]" | ":" | ",";
}
interface ScalarToken {
  kind: "scalar";
}
type Token = StringToken | PunctToken | ScalarToken;

const ESCAPE_MAP = new Map<string, string>([
  ['"', '"'],
  ["\\", "\\"],
  ["/", "/"],
  ["b", "\b"],
  ["f", "\f"],
  ["n", "\n"],
  ["r", "\r"],
  ["t", "\t"],
]);

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i] as string;
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      i += 1;
    } else if (ch === "{" || ch === "}" || ch === "[" || ch === "]" || ch === ":" || ch === ",") {
      tokens.push({ kind: "punct", value: ch });
      i += 1;
    } else if (ch === '"') {
      i += 1;
      const parts: string[] = [];
      while (text[i] !== '"') {
        if (text[i] === "\\") {
          const esc = text[i + 1] as string;
          if (esc === "u") {
            parts.push(String.fromCharCode(Number.parseInt(text.slice(i + 2, i + 6), 16)));
            i += 6;
          } else {
            parts.push(ESCAPE_MAP.get(esc) as string);
            i += 2;
          }
        } else {
          parts.push(text[i] as string);
          i += 1;
        }
      }
      i += 1;
      tokens.push({ kind: "string", decoded: parts.join("") });
    } else {
      // Scalar literal (number, true, false, null).
      while (i < text.length && !',:{}[]"'.includes(text[i] as string)) {
        const c = text[i] as string;
        if (c === " " || c === "\t" || c === "\n" || c === "\r") break;
        i += 1;
      }
      tokens.push({ kind: "scalar" });
    }
  }
  return tokens;
}

function hasSurrogateCodePoint(decoded: string): boolean {
  for (const ch of decoded) {
    const cp = ch.codePointAt(0) as number;
    if (cp >= 0xd800 && cp <= 0xdfff) return true;
  }
  return false;
}

export function classifyStrictJsonIndependently(text: string): StrictJsonClassification {
  const tokens = tokenize(text);
  let duplicates = false;
  let invalidUnicode = false;
  let pos = 0;
  let depth = 0;

  const walkValue = (): void => {
    depth += 1;
    if (depth > 10000) throw new Error("differential classifier depth limit");
    const token = tokens[pos] as Token;
    if (token.kind === "string") {
      if (hasSurrogateCodePoint(token.decoded)) invalidUnicode = true;
      pos += 1;
    } else if (token.kind === "scalar") {
      pos += 1;
    } else if (token.value === "{") {
      pos += 1;
      const names: string[] = [];
      if ((tokens[pos] as PunctToken).value !== "}") {
        for (;;) {
          const name = tokens[pos] as StringToken;
          if (hasSurrogateCodePoint(name.decoded)) invalidUnicode = true;
          names.push(name.decoded);
          pos += 2; // name, colon
          walkValue();
          const sep = tokens[pos] as PunctToken;
          pos += 1;
          if (sep.value === "}") break;
        }
      } else {
        pos += 1;
      }
      const sorted = [...names].sort();
      for (let j = 1; j < sorted.length; j += 1) {
        if (sorted[j] === sorted[j - 1]) duplicates = true;
      }
    } else {
      // "["
      pos += 1;
      if ((tokens[pos] as PunctToken).value !== "]") {
        for (;;) {
          walkValue();
          const sep = tokens[pos] as PunctToken;
          pos += 1;
          if (sep.value === "]") break;
        }
      } else {
        pos += 1;
      }
    }
    depth -= 1;
  };

  walkValue();
  return { duplicates, invalidUnicode };
}
