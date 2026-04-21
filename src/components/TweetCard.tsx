import { Heart, MessageCircle, Repeat2, ExternalLink, Quote } from "lucide-react";
import type { Tweet } from "@/lib/types";
import { formatAbsolute, formatCount, formatRelative } from "@/lib/format";

interface TweetCardProps {
  tweet: Tweet;
}

const TCO_REGEX = /https?:\/\/t\.co\/\w+/g;

function renderTweetText(text: string) {
  const cleaned = text.replace(TCO_REGEX, "").trim();
  return cleaned;
}

export function TweetCard({ tweet }: TweetCardProps) {
  const text = renderTweetText(tweet.text);
  return (
    <article className="tech-card group flex flex-col gap-3 p-4 sm:p-5">
      <div className="flex items-start gap-2">
        {tweet.isQuote ? (
          <Quote className="mt-1 size-3.5 shrink-0 text-secondary" />
        ) : null}
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/90">
          {text || (
            <span className="italic text-muted-foreground">[media only]</span>
          )}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3">
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span
            className="inline-flex items-center gap-1"
            title={`Likes ${tweet.likes}`}
          >
            <Heart className="size-3.5" />
            {formatCount(tweet.likes)}
          </span>
          <span
            className="inline-flex items-center gap-1"
            title={`Retweets ${tweet.retweets}`}
          >
            <Repeat2 className="size-3.5" />
            {formatCount(tweet.retweets)}
          </span>
          <span
            className="inline-flex items-center gap-1"
            title={`Replies ${tweet.replies}`}
          >
            <MessageCircle className="size-3.5" />
            {formatCount(tweet.replies)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="font-mono text-[11px] text-muted-foreground"
            title={formatAbsolute(tweet.createdAt)}
          >
            {formatRelative(tweet.createdAt)}
          </span>
          <a
            href={tweet.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border bg-muted/40 px-2 py-0.5 text-[11px] font-mono text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            title="Open original on X"
          >
            Source
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </article>
  );
}
