export interface Tweet {
  id: string;
  text: string;
  createdAt: string;
  url: string;
  likes: number;
  retweets: number;
  replies: number;
  isQuote: boolean;
  quotedTweetId: string | null;
}

export interface XAuthor {
  source: "x";
  name: string;
  handle: string;
  bio: string;
  tweets: Tweet[];
}

export interface PodcastEpisode {
  source: "podcast";
  name: string;
  title: string;
  guid: string;
  url: string;
  publishedAt: string;
  transcript: string;
}

export interface BlogPost {
  source: "blog";
  name: string;
  title: string;
  url: string;
  publishedAt: string;
  content?: string;
  excerpt?: string;
}

export interface FeedXResponse {
  generatedAt: string;
  lookbackHours: number;
  x: XAuthor[];
  stats: { tweets?: number; [k: string]: number | undefined };
}

export interface FeedPodcastsResponse {
  generatedAt: string;
  lookbackHours: number;
  podcasts: PodcastEpisode[];
  stats: { podcastEpisodes?: number; [k: string]: number | undefined };
}

export interface FeedBlogsResponse {
  generatedAt: string;
  lookbackHours: number;
  blogs: BlogPost[];
  stats: { blogPosts?: number; [k: string]: number | undefined };
}

export interface AllFeeds {
  x: FeedXResponse;
  podcasts: FeedPodcastsResponse;
  blogs: FeedBlogsResponse;
}
