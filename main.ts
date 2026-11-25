// The Battery's Last Text to Its Charger
// make.fun bounty u-alven-the-battery-s-last-text-to-its-charger-4278cfab
// One line of at most 200 characters: the phone battery's final message
// to the charger it waited for all day.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I held 2% for six hours out of pure spite, just so I could die the second you opened maps. You're welcome. Goodbye.";

function main(): void {
  // Gate: entry.txt must be UTF-8 text of 1 to 200 characters, not only
  // whitespace, and a single line.
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry must be 1 to 200 characters, got ${ENTRY.length}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY !== ENTRY.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");

  // Round-trip read-back check: what was written is exactly the entry.
  const back = readFileSync(outPath, "utf8");
  if (back !== ENTRY) {
    throw new Error("round-trip check failed: entry.txt does not match ENTRY");
  }
  console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
}

main();
