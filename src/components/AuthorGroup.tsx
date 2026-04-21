import { ExternalLink, Sparkles } from "lucide-react";
import type { XAuthor } from "@/lib/types";
import { TweetCard } from "@/components/TweetCard";
import { Badge } from "@/components/ui/badge";

interface AuthorGroupProps {
  author: XAuthor;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AuthorGroup({ author }: AuthorGroupProps) {
  if (!author.tweets?.length) return null;
  const initials = getInitials(author.name);
  return (
    <section className="space-y-3 animate-fade-in">
      <header className="flex items-start gap-3 rounded-2xl border bg-card/50 p-4 backdrop-blur-md sm:p-5">
        <div
          className="relative flex size-11 shrink-0 items-center justify-center rounded-full border bg-gradient-to-br from-primary/30 to-secondary/30 font-mono text-sm font-bold text-foreground"
          aria-hidden
        >
          {initials || <Sparkles className="size-4" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="truncate text-base font-semibold">{author.name}</h3>
            <a
              href={`https://x.com/${author.handle}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-primary"
            >
              @{author.handle}
              <ExternalLink className="size-3" />
            </a>
            <Badge variant="muted" className="ml-auto">
              {author.tweets.length}{" "}
              {author.tweets.length === 1 ? "tweet" : "tweets"}
            </Badge>
          </div>
          {author.bio ? (
            <p className="mt-1.5 line-clamp-2 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
              {author.bio}
            </p>
          ) : null}
        </div>
      </header>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {author.tweets.map((t) => (
          <TweetCard key={t.id} tweet={t} />
        ))}
      </div>
    </section>
  );
}
