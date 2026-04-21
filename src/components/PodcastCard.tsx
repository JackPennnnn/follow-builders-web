import { useState } from "react";
import { ChevronDown, ExternalLink, Headphones, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PodcastEpisode } from "@/lib/types";
import { formatAbsolute, formatRelative } from "@/lib/format";

interface PodcastCardProps {
  episode: PodcastEpisode;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

const PREVIEW_CHARS = 600;

export function PodcastCard({ episode }: PodcastCardProps) {
  const [open, setOpen] = useState(false);
  const transcript = (episode.transcript || "").trim();
  const charCount = transcript.length;
  const truncated = transcript.length > PREVIEW_CHARS;
  const preview = truncated
    ? transcript.slice(0, PREVIEW_CHARS).trimEnd() + "…"
    : transcript;

  return (
    <article className="tech-card flex flex-col gap-4 p-5 animate-fade-in">
      <header className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br from-secondary/30 to-primary/30 text-foreground">
          <Headphones className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Radio className="size-3.5 text-secondary" />
              <span className="truncate">{episode.name}</span>
            </span>
            <span aria-hidden>·</span>
            <span title={formatAbsolute(episode.publishedAt)}>
              {formatRelative(episode.publishedAt)}
            </span>
          </div>
          <h3 className="text-base font-semibold leading-snug">
            {decodeHtmlEntities(episode.title)}
          </h3>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="muted">
          {charCount.toLocaleString()} chars transcript
        </Badge>
        <a
          href={episode.url}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex items-center gap-1 rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-mono text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          Episode
          <ExternalLink className="size-3" />
        </a>
      </div>

      {transcript ? (
        <div className="rounded-xl border bg-muted/30 p-4">
          <div
            className={`scrollbar-thin overflow-y-auto whitespace-pre-wrap break-words font-sans text-xs leading-relaxed text-foreground/85 ${
              open ? "max-h-[28rem]" : "max-h-48"
            }`}
          >
            {open ? transcript : preview}
          </div>
          {truncated ? (
            <div className="mt-3 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
              >
                <ChevronDown
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
                {open ? "Collapse transcript" : "Show full transcript"}
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="rounded-xl border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
          No transcript available
        </p>
      )}
    </article>
  );
}
