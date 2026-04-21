import { Activity, Cloud, Github, HardDrive, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { formatAbsolute, formatRelative } from "@/lib/format";
import { FEED_BASE, FEED_BASE_KIND } from "@/lib/api";

interface HeaderProps {
  lastUpdated: string | null;
  onRefresh: () => void;
  refreshing?: boolean;
}

const SOURCE_LABEL: Record<typeof FEED_BASE_KIND, string> = {
  remote: "GitHub Raw · auto-updated daily",
  local: "Local cache (public/feeds)",
  custom: "Custom source",
};

export function Header({ lastUpdated, onRefresh, refreshing }: HeaderProps) {
  const SourceIcon = FEED_BASE_KIND === "local" ? HardDrive : Cloud;
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border bg-gradient-to-br from-primary to-secondary text-background shadow-lg shadow-primary/30">
            <span className="font-mono text-sm font-bold">FB</span>
            <span className="absolute -inset-px rounded-xl ring-1 ring-primary/40" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-semibold leading-tight sm:text-lg">
              <span className="gradient-text">Follow Builders</span>
            </h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Track AI builders, not influencers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="hidden items-center gap-1.5 rounded-full border bg-card/60 px-2.5 py-1.5 text-xs text-muted-foreground lg:inline-flex"
            title={`Source: ${FEED_BASE}`}
          >
            <SourceIcon className="size-3.5 text-secondary" />
            <span className="font-mono">{SOURCE_LABEL[FEED_BASE_KIND]}</span>
          </div>

          {lastUpdated ? (
            <div
              className="hidden items-center gap-2 rounded-full border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground md:inline-flex"
              title={formatAbsolute(lastUpdated)}
            >
              <Activity className="size-3.5 animate-pulse-glow text-primary" />
              <span className="font-mono">
                {formatRelative(lastUpdated)} · {formatAbsolute(lastUpdated)}
              </span>
            </div>
          ) : null}

          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
            disabled={refreshing}
            aria-label="Refresh"
            title="Refresh data"
          >
            <RefreshCw className={refreshing ? "animate-spin" : ""} />
          </Button>

          <a
            href="https://github.com/zarazhangrui/follow-builders"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
            aria-label="GitHub"
            title="Source repository"
          >
            <Button variant="outline" size="icon">
              <Github />
            </Button>
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
