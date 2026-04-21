#!/usr/bin/env node
import { copyFile, mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = resolve(__dirname, "..", "..", "follow-builders");
const DEST_DIR = resolve(__dirname, "..", "public", "feeds");

const FILES = ["feed-x.json", "feed-podcasts.json", "feed-blogs.json"];

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(DEST_DIR, { recursive: true });

  let okCount = 0;
  for (const file of FILES) {
    const src = join(SRC_DIR, file);
    const dest = join(DEST_DIR, file);
    if (!(await exists(src))) {
      console.warn(`[copy-feeds] missing source: ${src}`);
      continue;
    }
    await copyFile(src, dest);
    console.log(`[copy-feeds] ${file} -> public/feeds/`);
    okCount += 1;
  }

  if (okCount === 0) {
    console.warn(
      "[copy-feeds] no feed files were copied. The web app will show empty states.",
    );
  }
}

main().catch((err) => {
  console.error("[copy-feeds] failed:", err);
  process.exit(1);
});
