export interface Episode {
  id: string;
  spotifyId?: string;
  title: string;
  description: string;
  summary?: string;
  pubDate: string;
  duration: string;
  thumbnail: string;
  spotifyUrl: string;
  spotifyEmbedUrl?: string;
  audioUrl?: string;
  episodeNumber?: number;
  season?: number;
  explicit?: boolean;
  tags?: string[];
}

export interface PodcastInfo {
  title: string;
  tagline: string;
  description: string;
  host: string;
  hostBio: string;
  coverImage: string;
  heroImage: string;
  spotifyShowUrl: string;
  rssFeedUrl: string;
  applePodcastsUrl?: string;
  youtubeUrl?: string;
  telegramUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  genres: string[];
  totalEpisodes: number;
  rating?: string;
  lastSyncTime?: string;
}

export interface SyncState {
  isSyncing: boolean;
  lastSynced: string | null;
  error: string | null;
  source: 'rss' | 'preset' | 'spotify';
}
