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
    <article className="group bg-[#14120f] hover:bg-[#1a1714] border border-[#2b241d] hover:border-[#4d3f31] rounded-lg p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between shadow-lg relative">
      
      {/* Subtle classical architectural corner accent */}
      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#c5a059]/30 group-hover:border-[#c5a059]/70 transition-colors pointer-events-none" />

      <div>
        {/* Top: Thumbnail & Episode Title */}
        <div className="flex gap-4 sm:gap-5 items-start">
          
          {/* Episode Thumbnail from Spotify */}
          <div 
            onClick={() => onPreview(episode)}
            className="relative w-22 h-22 sm:w-28 sm:h-28 shrink-0 rounded overflow-hidden bg-[#1f1b17] border border-[#382f25] cursor-pointer group/thumb shadow-md"
          >
            {!imageError ? (
              <img
                src={episode.thumbnail}
                alt={episode.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300 filter contrast-[1.02]"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#1c1814] text-[#8c7f71] p-2 text-center text-[10px]">
                <span className="font-futura font-bold text-[#c5a059] text-xs">🏛️ TRATADO</span>
                <span>{episode.episodeNumber || ''}</span>
              </div>
            )}
            
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 flex items-center justify-center transition-colors">
              <div className="w-9 h-9 rounded-full bg-[#c5a059] text-[#120f0c] flex items-center justify-center shadow-lg group-hover/thumb:scale-110 active:scale-95 transition-transform border border-[#f0d499]">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          {/* Metadata & Title */}
          <div className="flex-1 min-w-0">
            {/* Unboxed Metadata in Futura (Zero-Pill discipline) */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#9c8e7f] mb-1.5 font-futura">
              {episode.episodeNumber !== undefined && (
                <>
                  <span className="font-bold text-[#c5a059] tracking-wider uppercase">
                    Tratado {episode.episodeNumber}
                  </span>
                  <span aria-hidden="true" className="text-[#453a2f]">·</span>
                </>
              )}
              <span className="tabular-nums font-mono text-xs">{episode.duration}</span>
              <span aria-hidden="true" className="text-[#453a2f]">·</span>
              <span className="tabular-nums font-mono text-xs">{episode.pubDate}</span>
            </div>

            {/* Episode Title in Futura (Wes Anderson style) */}
            <h3 
              onClick={() => onOpenDetails(episode)}
              className="font-futura text-base sm:text-lg font-bold uppercase tracking-tight text-[#f7f2ea] group-hover:text-[#c5a059] transition-colors cursor-pointer line-clamp-2 leading-snug"
            >
              {episode.title}
            </h3>

            {/* Truncated Summary */}
            <p className="mt-2 text-xs sm:text-sm text-[#a89b8d] line-clamp-2 leading-relaxed font-light">
              {episode.summary || episode.description}
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Bar: Action buttons in Futura */}
      <div className="mt-5 pt-4 border-t border-[#26201a] flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Previsualizar */}
          <button
            type="button"
            onClick={() => onPreview(episode)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-futura uppercase tracking-wider font-bold text-[#d4c8b8] bg-[#1d1915] hover:bg-[#28221b] active:scale-95 rounded border border-[#382f25] transition-colors cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current text-[#c5a059]" />
            <span>Previsualizar</span>
          </button>

          {/* Ver notas */}
          <button
            type="button"
            onClick={() => onOpenDetails(episode)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-futura uppercase tracking-wider text-[#96897b] hover:text-[#f5efe6] rounded transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Leer tratado</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            title="Copiar enlace"
            className="p-1.5 text-[#827466] hover:text-[#c5a059] hover:bg-[#1f1b17] rounded transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#c5a059]" /> : <Share2 className="w-4 h-4" />}
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
