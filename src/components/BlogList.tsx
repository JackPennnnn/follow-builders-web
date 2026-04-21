import { FileText } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { BlogCard } from "@/components/BlogCard";
import type { FeedBlogsResponse } from "@/lib/types";

interface BlogListProps {
  data: FeedBlogsResponse;
}

export function BlogList({ data }: BlogListProps) {
  const items = data.blogs ?? [];
  if (items.length === 0) {
    return (
      <EmptyState
        title="No blog updates in the last 72 hours"
        description="Anthropic / Claude blogs haven't published anything new recently."
        icon={<FileText className="size-5" />}
      />
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((p, i) => (
        <BlogCard key={`${p.url}-${i}`} post={p} />
      ))}
    </div>
  );
}
