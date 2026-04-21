import axios from "axios";

/**
 * Feed source strategy:
 *
 * 1) Remote (default): fetch directly from upstream zarazhangrui/follow-builders
 *    GitHub Raw. Auto-updated daily at 6am UTC by upstream GitHub Actions.
 *    CORS-friendly. Best when you always want the freshest data and no backend.
 *
 * 2) Local cache: copy ../follow-builders/feed-*.json into public/feeds/ via
 *    `npm run copy-feeds` (or `npm run pull-feeds` to fetch from upstream).
 *    Best for offline dev, stable demos, or your own fork.
 *
 * 3) Custom: point `VITE_FEED_BASE` at your own CDN / fork raw URL.
 *
 * Switch by setting VITE_FEED_BASE in web/.env.local. See .env.example.
 */

const REMOTE_DEFAULT =
  "https://raw.githubusercontent.com/zarazhangrui/follow-builders/main";
const LOCAL_BASE = "/feeds";

const envBase = (import.meta.env.VITE_FEED_BASE as string | undefined)?.trim();

export const FEED_BASE = envBase && envBase.length > 0 ? envBase : REMOTE_DEFAULT;

export const FEED_BASE_KIND: "remote" | "local" | "custom" =
  envBase === LOCAL_BASE
    ? "local"
    : envBase && envBase !== REMOTE_DEFAULT
      ? "custom"
      : "remote";

export const http = axios.create({
  baseURL: FEED_BASE,
  timeout: 20000,
  headers: { Accept: "application/json" },
  // GitHub Raw serves .json as text/plain, so force JSON parsing
  responseType: "json",
  transformResponse: [
    (data) => {
      if (typeof data !== "string") return data;
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    },
  ],
});
