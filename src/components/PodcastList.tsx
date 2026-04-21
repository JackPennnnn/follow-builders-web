import { Headphones } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { PodcastCard } from "@/components/PodcastCard";
import type { FeedPodcastsResponse } from "@/lib/types";

interface PodcastListProps {
  data: FeedPodcastsResponse;
}

export function PodcastList({ data }: PodcastListProps) {
  const items = data.podcasts ?? [];
  if (items.length === 0) {
    return (
      <EmptyState
        title="No new podcast episodes in the last 14 days"
        description="The generator hasn't picked up any new episodes recently."
        icon={<Headphones className="size-5" />}
      />
    );
  }
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {items.map((ep) => (
        <PodcastCard key={ep.guid} episode={ep} />
      ))}
    </div>
  );
}
