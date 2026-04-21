import { useEffect, useState, useCallback } from "react";
import { http } from "@/lib/api";
import type {
  AllFeeds,
  FeedBlogsResponse,
  FeedPodcastsResponse,
  FeedXResponse,
} from "@/lib/types";

interface UseFeedsState {
  data: AllFeeds | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useFeeds(): UseFeedsState {
  const [data, setData] = useState<AllFeeds | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // Cache-buster query param forces browsers and CDN to fetch the latest copy
    const bust = `?t=${Date.now()}`;
    Promise.all([
      http.get<FeedXResponse>(`/feed-x.json${bust}`),
      http.get<FeedPodcastsResponse>(`/feed-podcasts.json${bust}`),
      http.get<FeedBlogsResponse>(`/feed-blogs.json${bust}`),
    ])
      .then(([xRes, podRes, blogRes]) => {
        if (cancelled) return;
        setData({
          x: xRes.data,
          podcasts: podRes.data,
          blogs: blogRes.data,
        });
      })
      .catch((err) => {
        if (cancelled) return;
        const msg =
          err?.message || (typeof err === "string" ? err : "Unknown error");
        setError(`Failed to load feeds: ${msg}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tick]);

  return { data, loading, error, refresh };
}
