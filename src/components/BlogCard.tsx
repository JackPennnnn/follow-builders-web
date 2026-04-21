import { ExternalLink, FileText } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { formatAbsolute, formatRelative } from "@/lib/format";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
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

      {post.excerpt || post.content ? (
        <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt || post.content}
        </p>
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
