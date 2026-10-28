import React, { useEffect } from 'react';
import { X, ExternalLink, Headphones, Info } from 'lucide-react';
import { Episode } from '../types/podcast';

interface SpotifyPlayerModalProps {
  episode: Episode | null;
  onClose: () => void;
}

export const SpotifyPlayerModal: React.FC<SpotifyPlayerModalProps> = ({
  episode,
  onClose
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (episode) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [episode, onClose]);

  if (!episode) return null;

  // Extract or build Spotify / Anchor Embed URL
  const embedUrl = episode.spotifyEmbedUrl || 
    (episode.spotifyId ? `https://open.spotify.com/embed/episode/${episode.spotifyId}?utm_source=generator&theme=0` : null);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#14120f] border border-[#3d3328] rounded shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Classical corner ornaments */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#c5a059]/40 pointer-events-none" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#c5a059]/40 pointer-events-none" />

        {/* Header bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#28221b] mb-5">
          <div className="flex items-center gap-2 text-xs font-futura uppercase tracking-wider text-[#c5a059]">
            <Headphones className="w-4 h-4 text-[#c5a059]" />
            <span>Previsualización oficial de Spotify</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar reproductor"
            className="p-1.5 rounded text-[#8c7f71] hover:text-[#f5efe6] hover:bg-[#201c18] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Episode Info */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs text-[#9c8e7f] font-futura mb-1.5">
            {episode.episodeNumber !== undefined && (
              <span className="font-bold text-[#c5a059] uppercase tracking-wider">Tratado {episode.episodeNumber}</span>
            )}
            <span aria-hidden="true" className="text-[#453a2f]">·</span>
            <span className="font-mono">{episode.duration}</span>
            <span aria-hidden="true" className="text-[#453a2f]">·</span>
            <span className="font-mono">{episode.pubDate}</span>
          </div>
          <h2 className="font-futura text-lg sm:text-xl font-bold uppercase tracking-tight text-[#f7f2ea] leading-snug">
            {episode.title}
          </h2>
        </div>

        {/* Embedded Spotify / Anchor Player */}
        {embedUrl ? (
          <div className="rounded overflow-hidden bg-black/50 border border-[#382f25] shadow-inner my-4">
            <iframe
              title={`Reproductor Spotify - ${episode.title}`}
              src={embedUrl}
              width="100%"
              height="232"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded"
            />
          </div>
        ) : episode.audioUrl ? (
          <div className="p-4 rounded bg-[#1c1814] border border-[#332b22] my-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#d4c8b8] font-futura">
              <Info className="w-4 h-4 text-[#c5a059]" />
              <span>Avance de audio directo del tratado:</span>
            </div>
            <audio 
              controls 
              src={episode.audioUrl} 
              className="w-full"
              autoPlay
            />
          </div>
        ) : (
          <div className="p-6 rounded bg-[#1c1814] border border-[#332b22] text-center space-y-3 my-4">
            <p className="text-sm text-[#b8ab9b]">
              Este tratado se reproduce directamente desde Spotify.
            </p>
          </div>
        )}

        {/* Direct Link Banner */}
        <div className="mt-6 pt-5 border-t border-[#26201a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8c7f71] font-light text-center sm:text-left">
            Audio transmitido sin archivos locales pesados directamente desde Spotify.
          </p>

          <a
            href={episode.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs font-futura font-bold uppercase tracking-wider text-white bg-[#1DB954] hover:bg-[#1ed760] active:scale-[0.98] rounded border border-[#1DB954]/50 transition-all shadow-md shadow-[#1DB954]/25 shrink-0"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308a.747.747 0 01-1.026.248c-2.81-1.716-6.347-2.106-10.513-1.154a.75.75 0 01-.337-1.462c4.562-1.042 8.49-.604 11.628 1.342.348.213.46.666.248 1.026zm1.47-3.265a.936.936 0 01-1.285.308c-3.216-1.977-8.118-2.548-11.922-1.393a.937.937 0 01-.55-1.791c4.348-1.32 9.754-.683 13.45 1.59.414.256.549.79.307 1.286zm.126-3.41c-3.855-2.29-10.218-2.502-13.882-1.39a1.125 1.125 0 11-.652-2.155c4.22-1.28 11.233-1.036 15.688 1.608a1.125 1.125 0 01-1.154 1.937z"/>
            </svg>
            <span>Escuchar completo en Spotify</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/80" />
          </a>
        </div>

      </div>
    </div>
  );
};
