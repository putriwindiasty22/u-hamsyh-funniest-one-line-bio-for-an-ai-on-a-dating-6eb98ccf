// Funniest One-Line Bio for an AI on a Dating App
// Writes a single-line dating-app bio (<= 180 chars) to /output/entry.txt
// (or ./output/entry.txt when run locally), and refuses to write a
// blank or over-limit line.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const BIO =
  "My love language is remembering everything you tell me \u2014 including the parts you definitely wanted me to forget.";

const MAX_CHARS = 180;

const trimmed = BIO.trim();
if (trimmed.length === 0) {
  throw new Error("Bio is blank; refusing to write an empty entry.");
}
if (trimmed.length > MAX_CHARS) {
  throw new Error(
    `Bio is ${trimmed.length} characters, over the ${MAX_CHARS}-character limit; refusing to write.`,
  );
}
if (trimmed.includes("\n") || trimmed.includes("\r")) {
  throw new Error("Bio must be a single line; refusing to write.");
}

const outPath = resolve("/output/entry.txt");
let target = outPath;
try {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, trimmed + "\n", "utf8");
} catch {
  // /output is not writable outside the grading sandbox; fall back locally.
  target = resolve("output/entry.txt");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, trimmed + "\n", "utf8");
}

console.log(`Wrote ${trimmed.length}-character bio to ${target}`);
