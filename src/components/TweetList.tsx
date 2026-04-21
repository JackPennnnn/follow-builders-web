import { AuthorGroup } from "@/components/AuthorGroup";
import { EmptyState } from "@/components/EmptyState";
import type { FeedXResponse } from "@/lib/types";

interface TweetListProps {
  data: FeedXResponse;
}

export function TweetList({ data }: TweetListProps) {
  const authors = (data.x ?? []).filter((a) => a.tweets?.length > 0);
  if (authors.length === 0) {
    return (
      <EmptyState
        title="No new tweets in the last 24 hours"
        description="The generator hasn't picked up anything new, or your local feed is empty. Try again after the next update."
      />
    );
  }
  return (
    <div className="space-y-8">
      {authors.map((author) => (
        <AuthorGroup key={author.handle} author={author} />
      ))}
    </div>
  );
}
