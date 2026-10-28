import { Episode, PodcastInfo } from '../types/podcast';

// Format duration from seconds or string format (HH:MM:SS) to friendly readable string with exact seconds
export function formatDuration(durationRaw?: string | null): string {
  if (!durationRaw) return '20 min';
  
  // If it's pure seconds (e.g. "1478")
  if (/^\d+$/.test(durationRaw.trim())) {
    const totalSecs = parseInt(durationRaw, 10);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    const secStr = secs < 10 ? `0${secs}` : `${secs}`;
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}:${secStr} min`;
  }

  // If it's HH:MM:SS or MM:SS
  const parts = durationRaw.trim().split(':').map(p => parseInt(p, 10));
  if (parts.length === 3) {
    const [h, m, s] = parts;
    const secStr = (isNaN(s) ? 0 : s) < 10 ? `0${s}` : `${s}`;
    if (h > 0) return `${h}h ${m < 10 ? '0' + m : m}m`;
    return `${m}:${secStr} min`;
  }
  if (parts.length === 2) {
    const [m, s] = parts;
    const secStr = (isNaN(s) ? 0 : s) < 10 ? `0${s}` : `${s}`;
    return `${m}:${secStr} min`;
  }

  return durationRaw;
}

// Clean HTML tags for clean text previews, while preserving line breaks
export function stripHtml(html: string): string {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent || '').trim();
}

// Format publication date in Spanish
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

// Extract Spotify Episode ID if present
export function extractSpotifyEpisodeId(urlOrText: string): string | null {
  const match = urlOrText.match(/spotify\.com\/episode\/([a-zA-Z0-9]+)/);
  if (match) return match[1];
  const uriMatch = urlOrText.match(/spotify:episode:([a-zA-Z0-9]+)/);
  if (uriMatch) return uriMatch[1];
  return null;
}

// Helper to safely get tag content across standard and namespaced XML
function getTagContent(element: Element, tagNames: string[]): string {
  for (const name of tagNames) {
    const el = element.getElementsByTagName(name)[0];
    if (el && el.textContent) return el.textContent.trim();
    if (name.includes(':')) {
      const local = name.split(':')[1];
      const nsEl = element.getElementsByTagNameNS('*', local)[0];
      if (nsEl && nsEl.textContent) return nsEl.textContent.trim();
    }
  }
  return '';
}

// Dynamically extract core topic and concise subtitle from an episode
export function extractEpisodeTopic(episode?: Episode): { topic: string; subtitle: string } {
  if (!episode) {
    return { topic: "Azúcar", subtitle: "Nutrición" };
  }

  const titleLower = episode.title.toLowerCase();
  const descLower = (episode.description || '').toLowerCase();

  if (titleLower.includes('azúcar') || titleLower.includes('azucar') || descLower.includes('azúcar')) {
    return { topic: "Azúcar", subtitle: "Nutrición" };
  }
  if (titleLower.includes('por qué entrenamos') || titleLower.includes('por que entrenamos')) {
    return { topic: "Propósito", subtitle: "Filosofía" };
  }
  if (titleLower.includes('press de banca')) {
    return { topic: "Press Banca", subtitle: "Fuerza" };
  }
  if (titleLower.includes('taller de la noche')) {
    return { topic: "Nocturno", subtitle: "Enfoque" };
  }
  if (titleLower.includes('tierra bajo tus pies')) {
    return { topic: "Postura", subtitle: "Enraizado" };
  }
  if (titleLower.includes('dieta del subdesarrollo')) {
    return { topic: "Alimentación", subtitle: "Salud" };
  }
  if (titleLower.includes('anime')) {
    return { topic: "Anime", subtitle: "Disciplina" };
  }
  if (titleLower.includes('dominada')) {
    return { topic: "Dominadas", subtitle: "Calistenia" };
  }
  if (titleLower.includes('boxeador') || titleLower.includes('boxeo')) {
    return { topic: "Boxeo", subtitle: "Carácter" };
  }
  if (titleLower.includes('arnold') || titleLower.includes('heavy duty')) {
    return { topic: "Hipertrofia", subtitle: "Sistemas" };
  }
  if (titleLower.includes('squat') || titleLower.includes('sentadilla')) {
    return { topic: "Sentadilla", subtitle: "El Rey" };
  }
  if (titleLower.includes('becerro') || titleLower.includes('milón') || titleLower.includes('milon')) {
    return { topic: "Milón", subtitle: "Sobrecarga" };
  }

  // Fallback: clean title up to 2 words
  const cleanTitle = episode.title.replace(/^(episodio|e\d+)\s*[\.\:\-]?\s*/i, '');
  const words = cleanTitle.split(' ').slice(0, 2).join(' ');
  return { topic: words || "Tratado", subtitle: "Fuerza" };
}

// Fetch RSS XML with CORS fallbacks
async function fetchXmlWithCors(feedUrl: string): Promise<string> {
  const urlsToTry = [
    feedUrl,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(feedUrl)}`
  ];

  let lastError: Error | null = null;
  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, { headers: { 'Accept': 'application/rss+xml, application/xml, text/xml, */*' } });
      if (response.ok) {
        const text = await response.text();
        if (text && (text.includes('<rss') || text.includes('<feed') || text.includes('<channel>'))) {
          return text;
        }
      }
    } catch (err) {
      lastError = err as Error;
    }
  }

  throw new Error(lastError?.message || 'No se pudo obtener el feed RSS. Comprueba que la URL sea válida.');
}

export interface SyncResult {
  podcast: Partial<PodcastInfo>;
  episodes: Episode[];
}

export async function parsePodcastRss(feedUrl: string, existingSpotifyShowUrl?: string): Promise<SyncResult> {
  const xmlText = await fetchXmlWithCors(feedUrl);
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, 'text/xml');

  // Check parse error
  const parseError = xml.querySelector('parsererror');
  if (parseError) {
    throw new Error('Error al interpretar el formato XML del feed RSS.');
  }

  const channel = xml.querySelector('channel');
  if (!channel) {
    throw new Error('El feed RSS no contiene un canal válido de podcast.');
  }

  const channelTitle = channel.querySelector('title')?.textContent?.trim() || 'De paso por Crotona';
  const channelDescription = channel.querySelector('description')?.textContent?.trim() || '';
  const channelAuthor = getTagContent(channel, ['itunes:author', 'author']) || 'joselazaroph';
  
  // Channel Image extraction
  let channelImage = '';
  const channelItunesImgs = channel.getElementsByTagName('itunes:image');
  if (channelItunesImgs.length > 0 && channelItunesImgs[0].getAttribute('href')) {
    channelImage = channelItunesImgs[0].getAttribute('href') || '';
  } else {
    const nsChannelImgs = channel.getElementsByTagNameNS('*', 'image');
    if (nsChannelImgs.length > 0 && nsChannelImgs[0].getAttribute('href')) {
      channelImage = nsChannelImgs[0].getAttribute('href') || '';
    } else {
      const standardImg = channel.querySelector('image > url');
      if (standardImg && standardImg.textContent) {
        channelImage = standardImg.textContent.trim();
      }
    }
  }

  const itemElements = Array.from(channel.querySelectorAll('item'));
  const episodes: Episode[] = itemElements.map((item, index) => {
    const title = item.querySelector('title')?.textContent?.trim() || `Episodio #${itemElements.length - index}`;
    
    // Description could be in description or content:encoded
    const rawDesc = getTagContent(item, ['content:encoded', 'description']) || '';
    const plainDesc = stripHtml(rawDesc);
    const summary = plainDesc.slice(0, 180) + (plainDesc.length > 180 ? '...' : '');

    const pubDateRaw = getTagContent(item, ['pubDate']) || new Date().toISOString();
    const durationRaw = getTagContent(item, ['itunes:duration', 'duration']);
    const duration = formatDuration(durationRaw);

    // Episode thumbnail with bulletproof namespace fallback
    let epImageUrl = '';
    const itunesImg = item.getElementsByTagName('itunes:image');
    if (itunesImg && itunesImg.length > 0 && itunesImg[0].getAttribute('href')) {
      epImageUrl = itunesImg[0].getAttribute('href')!;
    } else {
      const nsImgs = item.getElementsByTagNameNS('*', 'image');
      if (nsImgs && nsImgs.length > 0 && nsImgs[0].getAttribute('href')) {
        epImageUrl = nsImgs[0].getAttribute('href')!;
      } else {
        const queryImg = item.querySelector('image > url');
        if (queryImg && queryImg.textContent) {
          epImageUrl = queryImg.textContent.trim();
        }
      }
    }
    if (!epImageUrl) {
      epImageUrl = channelImage;
    }

    // Audio enclosure
    const enclosure = item.querySelector('enclosure');
    const audioUrl = enclosure?.getAttribute('url') || undefined;

    // Link & Spotify identification
    const link = item.querySelector('link')?.textContent?.trim() || '';
    const guid = item.querySelector('guid')?.textContent?.trim() || '';
    
    let spotifyId = extractSpotifyEpisodeId(link) || extractSpotifyEpisodeId(guid) || extractSpotifyEpisodeId(rawDesc);
    
    // Direct link to Spotify
    let spotifyUrl = link;
    let spotifyEmbedUrl: string | undefined = undefined;

    if (spotifyId) {
      spotifyUrl = `https://open.spotify.com/episode/${spotifyId}`;
      spotifyEmbedUrl = `https://open.spotify.com/embed/episode/${spotifyId}?utm_source=generator&theme=0`;
    } else if (link && (link.includes('podcasters.spotify.com') || link.includes('anchor.fm'))) {
      spotifyUrl = link;
      if (link.includes('/episodes/')) {
        spotifyEmbedUrl = link.replace('/episodes/', '/embed/episodes/');
      }
    } else if (!spotifyUrl || !spotifyUrl.includes('spotify.com')) {
      if (existingSpotifyShowUrl) {
        spotifyUrl = existingSpotifyShowUrl;
      } else {
        spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(title)}`;
      }
    }

    const episodeNumAttr = getTagContent(item, ['itunes:episode']);
    const episodeNumber = episodeNumAttr ? parseInt(episodeNumAttr, 10) : (itemElements.length - index);

    return {
      id: guid || `ep-${index}-${Date.now()}`,
      spotifyId: spotifyId || undefined,
      episodeNumber,
      title,
      summary,
      description: plainDesc || 'Sin descripción disponible.',
      pubDate: formatDate(pubDateRaw),
      duration,
      thumbnail: epImageUrl || channelImage,
      spotifyUrl,
      spotifyEmbedUrl,
      audioUrl
    };
  });

  return {
    podcast: {
      title: channelTitle,
      description: plainDescSnippet(channelDescription),
      host: channelAuthor,
      coverImage: channelImage,
      totalEpisodes: episodes.length,
      lastSyncTime: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    },
    episodes
  };
}

function plainDescSnippet(desc: string): string {
  return stripHtml(desc).slice(0, 400);
}

// LocalStorage helpers for user customizations
const STORAGE_PODCAST_KEY = 'crotona_podcast_info';
const STORAGE_EPISODES_KEY = 'crotona_podcast_episodes';

export function savePodcastDataLocally(info: PodcastInfo, episodes: Episode[]): void {
  try {
    localStorage.setItem(STORAGE_PODCAST_KEY, JSON.stringify(info));
    localStorage.setItem(STORAGE_EPISODES_KEY, JSON.stringify(episodes));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

export function loadPodcastDataLocally(): { info: PodcastInfo | null; episodes: Episode[] | null } {
  try {
    const rawInfo = localStorage.getItem(STORAGE_PODCAST_KEY);
    const rawEp = localStorage.getItem(STORAGE_EPISODES_KEY);
    return {
      info: rawInfo ? JSON.parse(rawInfo) : null,
      episodes: rawEp ? JSON.parse(rawEp) : null
    };
  } catch {
    return { info: null, episodes: null };
  }
}
