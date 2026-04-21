#!/usr/bin/env node
// Pull the latest feed JSON from upstream GitHub Raw into web/public/feeds/.
// Usage: npm run pull-feeds
// Best for: caching the latest data locally for offline dev, or baking it
// into a static build via `npm run build`.

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEST_DIR = resolve(__dirname, "..", "public", "feeds");

const REMOTE_BASE =
  process.env.FEED_REMOTE_BASE ||
  "https://raw.githubusercontent.com/zarazhangrui/follow-builders/main";

const FILES = ["feed-x.json", "feed-podcasts.json", "feed-blogs.json"];

async function pull(file) {
  const url = `${REMOTE_BASE}/${file}?t=${Date.now()}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    throw new Error(`${file}: HTTP ${res.status} ${res.statusText}`);
  }
  const text = await res.text();
  // Sanity-check it's valid JSON before writing
  JSON.parse(text);
  await writeFile(join(DEST_DIR, file), text, "utf-8");
  let preview = "";
  try {
    const j = JSON.parse(text);
    if (j.generatedAt) preview = ` (generatedAt: ${j.generatedAt})`;
  } catch {
    /* ignore */
  }
  console.log(`[pull-feeds] ${file} <- ${REMOTE_BASE}${preview}`);
}

async function main() {
  await mkdir(DEST_DIR, { recursive: true });
  console.log(`[pull-feeds] base = ${REMOTE_BASE}`);
  for (const file of FILES) {
    try {
      await pull(file);
    } catch (err) {
      console.error(`[pull-feeds] failed ${file}:`, err.message || err);
      process.exitCode = 1;
    }
  }
}

main();
