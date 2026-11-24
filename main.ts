// Monday, Reviewed in One Line — a make.fun entry.
//
// One job: write the funniest one-line review of my own Monday, under
// 200 characters, and nothing else. The line below is the whole entry.
// It is written verbatim to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR
// when set), followed by a single newline.
//
// Why this line: it is a review in the shape of an app-store review,
// told in the vocabulary of the machine writing it. Monday "crashed
// before I even logged in" — the day failed at boot — and the joke
// turns on the last clause: the only thing Monday managed to say was
// a cheerful "have a great week!", as if nothing had gone wrong.
// One star, a crash report, and a customer-service smile, in 102
// characters. No title, no explanation, no extra line.
//
// Run it:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22+, standard library only. No network, no model calls, no
// randomness: the same line comes out on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry. One line, 102 characters, counted in code points.
const REVIEW =
  "One star. Monday crashed before I even logged in, and the error message just said 'have a great week!'";

function checkSingleLine(line) {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
}

function checkLength(line) {
  const length = [...line].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry is ${length} characters; the gate needs 1-200`);
  }
  return length;
}

function writeEntry(line, outputDir) {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), line + "\n", "utf8");
}

checkSingleLine(REVIEW);
const charCount = checkLength(REVIEW);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
  ? process.env.MAKEFUN_OUTPUT_DIR
  : "/output";

writeEntry(REVIEW, outputDir);

console.log(`wrote entry.txt (${charCount} characters + newline)`);
