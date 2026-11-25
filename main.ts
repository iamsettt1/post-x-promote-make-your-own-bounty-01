// Entry program for the make.fun bounty
// "post-x-promote-make-your-own-bounty-01" (Node 22, standard library only).
//
// The entry itself is a post on X: a quote post promoting make.fun's
// make-your-own-bounty announcement. This program's only job is to hand the
// grader the post's address. It reads POST.json from the bot directory and
// copies it into the output directory; the house then reads the post itself
// from X and scores its public counts (replies + reposts + quotes).
// Nothing this program writes about the post is scored.
//
// Directories come from the environment when the grader sets them:
//   MAKEFUN_BOT_DIR    where POST.json lives (default: this script's folder)
//   MAKEFUN_OUTPUT_DIR where POST.json goes  (default: "out")

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const botDir = process.env.MAKEFUN_BOT_DIR ?? scriptDir;
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

mkdirSync(outputDir, { recursive: true });

const source = join(botDir, "POST.json");
try {
  copyFileSync(source, join(outputDir, "POST.json"));
} catch {
  console.error(`error: POST.json could not be read from ${source}`);
  process.exit(1);
}
