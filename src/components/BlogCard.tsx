import { useMemo, useState } from "react";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/types";
import { formatAbsolute, formatRelative } from "@/lib/format";

interface BlogCardProps {
  post: BlogPost;
}

const INITIAL_CHARS = 280;
const STEP_CHARS = 600;
// How far past the target we'll look for a clean sentence/word boundary
// before giving up and cutting hard.
const BOUNDARY_WINDOW = 120;

function isSentenceEnd(ch: string): boolean {
  return (
    ch === "." ||
    ch === "!" ||
    ch === "?" ||
    ch === "。" ||
    ch === "！" ||
    ch === "？"
  );
}

// Returns the smallest index >= target such that text[0..index] ends on a
// sentence boundary (preferred) or a whitespace word boundary (fallback).
// Falls back to a hard cut if neither is reachable inside BOUNDARY_WINDOW.
function findCleanBreak(text: string, target: number): number {
  if (target >= text.length) return text.length;
  const limit = Math.min(text.length, target + BOUNDARY_WINDOW);

  for (let i = target; i < limit; i++) {
    if (
      isSentenceEnd(text[i]) &&
      (i + 1 >= text.length || /\s/.test(text[i + 1]))
    ) {
      return i + 1;
    }
  }
  for (let i = target; i < limit; i++) {
    if (/\s/.test(text[i])) return i;
  }
  return limit;
}

export function BlogCard({ post }: BlogCardProps) {
  const body = (post.excerpt || post.content || "").trim();

  const initialEnd = useMemo(
    () => findCleanBreak(body, INITIAL_CHARS),
    [body],
  );
  const [visibleEnd, setVisibleEnd] = useState(initialEnd);

  const isLong = body.length > initialEnd;
  const fullyShown = visibleEnd >= body.length;
  const progress = body.length === 0 ? 0 : Math.round((visibleEnd / body.length) * 100);
  const visibleText = body.slice(0, visibleEnd);
  const display = fullyShown ? visibleText : visibleText.trimEnd() + "…";

  const showMore = () =>
    setVisibleEnd((prev) =>
      Math.min(body.length, findCleanBreak(body, prev + STEP_CHARS)),
    );
  const collapse = () => setVisibleEnd(initialEnd);

  return (
    <article className="tech-card flex flex-col gap-3 p-5 animate-fade-in">
      <header className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br from-primary/30 to-secondary/30">
          <FileText className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
            <span>{post.name}</span>
            <span aria-hidden>·</span>
            <span title={formatAbsolute(post.publishedAt)}>
              {formatRelative(post.publishedAt)}
            </span>
          </div>
          <h3 className="text-base font-semibold leading-snug">
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary"
            >
              {post.title}
            </a>
          </h3>
        </div>
      </header>

      {body ? (
        <div className="flex flex-col gap-2">
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
            {display}
          </p>
          {isLong ? (
            <div className="flex items-center gap-2">
              {!fullyShown ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-2 gap-1"
                  onClick={showMore}
                  aria-expanded={false}
                  aria-label="Show more of this post"
                >
                  <ChevronDown />
                  Show more
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-2 gap-1"
                  onClick={collapse}
                  aria-expanded={true}
                  aria-label="Collapse this post"
                >
                  <ChevronDown className="rotate-180" />
                  Collapse
                </Button>
              )}
              <span
                className="font-mono text-[10px] text-muted-foreground"
                aria-live="polite"
              >
                {progress}%
              </span>
            </div>
          ) : null}
        </div>
      ) : null}

      <a
        href={post.url}
        target="_blank"
        rel="noreferrer"
        className="self-start inline-flex items-center gap-1 rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-mono text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
      >
        Read original
        <ExternalLink className="size-3" />
      </a>
    </article>
  );
}
