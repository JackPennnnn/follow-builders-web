import { AlertTriangle } from "lucide-react";
import { Header } from "@/components/Header";
import { FeedTabs } from "@/components/FeedTabs";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useFeeds } from "@/hooks/useFeeds";
import { pickLatest } from "@/lib/format";

export default function App() {
  const { data, loading, error, refresh } = useFeeds();

  const lastUpdated = data
    ? pickLatest(
        data.x.generatedAt,
        data.podcasts.generatedAt,
        data.blogs.generatedAt,
      )
    : null;

  return (
    <div className="tech-bg min-h-screen">
      <div className="glow-orb cyan" aria-hidden />
      <div className="glow-orb violet" aria-hidden />

      <Header
        lastUpdated={lastUpdated}
        onRefresh={refresh}
        refreshing={loading}
      />

      <main className="container py-8 md:py-10">
        {loading && !data ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 px-6 py-16 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full border bg-destructive/10 text-destructive">
              <AlertTriangle className="size-5" />
            </div>
            <p className="font-medium">Failed to load</p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {error}
            </p>
            <Button onClick={refresh} className="mt-4">
              Retry
            </Button>
          </div>
        ) : data ? (
          <FeedTabs data={data} />
        ) : null}
      </main>

      <footer className="container pb-10 pt-4 text-center font-mono text-xs text-muted-foreground">
        <span>
          Powered by{" "}
          <a
            href="https://github.com/zarazhangrui/follow-builders"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline hover:text-primary"
          >
            follow-builders
          </a>
          {" · "}
          UI built with React + Tailwind
        </span>
      </footer>
    </div>
  );
}
