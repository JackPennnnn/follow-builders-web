import { Twitter, Headphones, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TweetList } from "@/components/TweetList";
import { PodcastList } from "@/components/PodcastList";
import { BlogList } from "@/components/BlogList";
import type { AllFeeds } from "@/lib/types";

interface FeedTabsProps {
  data: AllFeeds;
}

export function FeedTabs({ data }: FeedTabsProps) {
  const tweetCount = (data.x.x ?? []).reduce(
    (sum, a) => sum + (a.tweets?.length ?? 0),
    0,
  );
  const podcastCount = data.podcasts.podcasts?.length ?? 0;
  const blogCount = data.blogs.blogs?.length ?? 0;

  return (
    <Tabs defaultValue="tweets" className="w-full">
      <div className="flex items-center justify-between gap-3">
        <TabsList className="overflow-x-auto">
          <TabsTrigger value="tweets">
            <Twitter className="size-4" />
            <span>X</span>
            <Badge variant="muted" className="ml-1">
              {tweetCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="podcasts">
            <Headphones className="size-4" />
            <span>Podcasts</span>
            <Badge variant="muted" className="ml-1">
              {podcastCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="blogs">
            <FileText className="size-4" />
            <span>Blogs</span>
            <Badge variant="muted" className="ml-1">
              {blogCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <div className="hidden font-mono text-xs text-muted-foreground sm:flex sm:items-center sm:gap-3">
          <span title="X lookback window">X · {data.x.lookbackHours}h</span>
          <span title="Podcast lookback window">
            PODCAST · {data.podcasts.lookbackHours}h
          </span>
          <span title="Blog lookback window">
            BLOG · {data.blogs.lookbackHours}h
          </span>
        </div>
      </div>

      <TabsContent value="tweets">
        <TweetList data={data.x} />
      </TabsContent>
      <TabsContent value="podcasts">
        <PodcastList data={data.podcasts} />
      </TabsContent>
      <TabsContent value="blogs">
        <BlogList data={data.blogs} />
      </TabsContent>
    </Tabs>
  );
}
