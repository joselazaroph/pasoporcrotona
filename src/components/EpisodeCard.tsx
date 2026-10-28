import React, { useState } from 'react';
import { Play, ExternalLink, FileText, Share2, Check } from 'lucide-react';
import { Episode } from '../types/podcast';

interface EpisodeCardProps {
  episode: Episode;
  onPreview: (episode: Episode) => void;
  onOpenDetails: (episode: Episode) => void;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  onPreview,
  onOpenDetails
}) => {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(episode.spotifyUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="group crotona-card rounded-lg p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Subtle classical architectural corner accents */}
      <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#d4af63]/30 group-hover:border-[#d4af63]/80 transition-colors pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#d4af63]/20 group-hover:border-[#d4af63]/60 transition-colors pointer-events-none" />

      <div>
        {/* Top: Thumbnail & Episode Title */}
        <div className="flex gap-4 sm:gap-5 items-start">
          
          {/* Episode Thumbnail from Spotify (or Official Milón de Crotona fallback) */}
          <div 
            onClick={() => onPreview(episode)}
            className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded overflow-hidden bg-[#12100c] border border-[#3a3023] group-hover:border-[#d4af63]/50 cursor-pointer group/thumb shadow-lg transition-colors"
          >
            <img
              src={!imageError && episode.thumbnail ? episode.thumbnail : '/crotona-logo.jpg'}
              alt={episode.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 filter contrast-[1.03]"
            />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/45 group-hover/thumb:bg-black/25 flex items-center justify-center transition-colors">
              <div className="w-9 h-9 rounded-full gold-button flex items-center justify-center shadow-lg group-hover/thumb:scale-110 active:scale-95 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          {/* Metadata & Title */}
          <div className="flex-1 min-w-0">
            {/* Metadata in Futura */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#a6957c] mb-1.5 font-futura">
              {episode.episodeNumber !== undefined && (
                <>
                  <span className="font-bold text-[#d4af63] tracking-wider uppercase">
                    Tratado {episode.episodeNumber}
                  </span>
                  <span aria-hidden="true" className="text-[#453a2f]">·</span>
                </>
              )}
              <span className="tabular-nums font-mono text-xs text-[#cbbba2]">{episode.duration}</span>
              <span aria-hidden="true" className="text-[#453a2f]">·</span>
              <span className="tabular-nums font-mono text-xs">{episode.pubDate}</span>
            </div>

            {/* Episode Title in Futura */}
            <h3 
              onClick={() => onOpenDetails(episode)}
              className="font-futura text-base sm:text-lg font-bold uppercase tracking-tight text-[#f3ebd8] group-hover:text-[#d4af63] transition-colors cursor-pointer line-clamp-2 leading-snug"
            >
              {episode.title}
            </h3>

            {/* Truncated Summary */}
            <p className="mt-2 text-xs sm:text-sm text-[#a6957c] line-clamp-2 leading-relaxed font-light">
              {episode.summary || episode.description}
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Bar: Action buttons in Futura */}
      <div className="mt-5 pt-4 border-t border-[#282017] flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Previsualizar */}
          <button
            type="button"
            onClick={() => onPreview(episode)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-futura uppercase tracking-wider font-bold text-[#f3ebd8] bg-[#1e1912] hover:bg-[#d4af63] hover:text-[#0e0b08] active:scale-95 rounded border border-[#3a3023] hover:border-[#e8cb88] transition-all cursor-pointer group/btn"
          >
            <Play className="w-3 h-3 fill-current text-[#d4af63] group-hover/btn:text-[#0e0b08] transition-colors" />
            <span>Previsualizar</span>
          </button>

          {/* Ver notas */}
          <button
            type="button"
            onClick={() => onOpenDetails(episode)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-futura uppercase tracking-wider text-[#a6957c] hover:text-[#f3ebd8] hover:bg-[#1a1610] rounded transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#d4af63]/80" />
            <span>Leer tratado</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            title="Copiar enlace del episodio"
            className="p-1.5 text-[#8c7b65] hover:text-[#d4af63] hover:bg-[#1e1912] rounded border border-transparent hover:border-[#332a1e] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#d4af63]" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Enlace directo a Spotify */}
          <a
            href={episode.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-futura uppercase tracking-wider font-bold text-white bg-[#1DB954] hover:bg-[#1ed760] active:scale-95 rounded border border-[#1DB954]/40 transition-colors shadow-sm shadow-[#1DB954]/20"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308a.747.747 0 01-1.026.248c-2.81-1.716-6.347-2.106-10.513-1.154a.75.75 0 01-.337-1.462c4.562-1.042 8.49-.604 11.628 1.342.348.213.46.666.248 1.026zm1.47-3.265a.936.936 0 01-1.285.308c-3.216-1.977-8.118-2.548-11.922-1.393a.937.937 0 01-.55-1.791c4.348-1.32 9.754-.683 13.45 1.59.414.256.549.79.307 1.286zm.126-3.41c-3.855-2.29-10.218-2.502-13.882-1.39a1.125 1.125 0 11-.652-2.155c4.22-1.28 11.233-1.036 15.688 1.608a1.125 1.125 0 01-1.154 1.937z"/>
            </svg>
            <span>Spotify</span>
            <ExternalLink className="w-3 h-3 text-white/70" />
          </a>
        </div>
      </div>
    </article>
  );
};
