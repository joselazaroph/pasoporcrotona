import React, { useEffect, useState } from 'react';
import { X, Play, ExternalLink, Calendar, Clock, Share2, Check } from 'lucide-react';
import { Episode } from '../types/podcast';

interface EpisodeDetailModalProps {
  episode: Episode | null;
  onClose: () => void;
  onPlay: (episode: Episode) => void;
}

export const EpisodeDetailModal: React.FC<EpisodeDetailModalProps> = ({
  episode,
  onClose,
  onPlay
}) => {
  const [copied, setCopied] = useState(false);

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

  const handleShare = () => {
    navigator.clipboard.writeText(episode.spotifyUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#14120f] border border-[#3d3328] rounded shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#28221b] bg-[#100e0c]">
          <div className="flex items-center gap-2 text-xs font-futura uppercase tracking-wider text-[#c5a059]">
            <span>Tratado & Notas del Episodio</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 rounded text-[#8c7f71] hover:text-[#c5a059] hover:bg-[#1a1714] transition-colors cursor-pointer"
              title="Copiar enlace del episodio"
            >
              {copied ? <Check className="w-5 h-5 text-[#c5a059]" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded text-[#8c7f71] hover:text-[#f5efe6] hover:bg-[#1a1714] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Thumbnail */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded overflow-hidden bg-[#1f1b17] border border-[#382f25] shadow-lg">
              <img
                src={episode.thumbnail}
                alt={episode.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-[1.03]"
              />
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9c8e7f] font-futura">
                {episode.episodeNumber !== undefined && (
                  <span className="font-bold text-[#c5a059] uppercase tracking-wider">Tratado {episode.episodeNumber}</span>
                )}
                <span aria-hidden="true" className="text-[#453a2f]">·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#6e6153]" />
                  <span>{episode.duration}</span>
                </span>
                <span aria-hidden="true" className="text-[#453a2f]">·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#6e6153]" />
                  <span>{episode.pubDate}</span>
                </span>
              </div>

              <h2 className="font-futura text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#f7f2ea] leading-snug">
                {episode.title}
              </h2>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onPlay(episode);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-futura uppercase tracking-wider font-bold text-[#14110d] bg-[#c5a059] hover:bg-[#d6b26b] rounded transition-colors cursor-pointer border border-[#e0c284]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Previsualizar audio</span>
                </button>

                <a
                  href={episode.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-futura uppercase tracking-wider font-bold text-white bg-[#1DB954] hover:bg-[#1ed760] rounded border border-[#1DB954]/50 transition-colors shadow-sm shadow-[#1DB954]/20"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308a.747.747 0 01-1.026.248c-2.81-1.716-6.347-2.106-10.513-1.154a.75.75 0 01-.337-1.462c4.562-1.042 8.49-.604 11.628 1.342.348.213.46.666.248 1.026zm1.47-3.265a.936.936 0 01-1.285.308c-3.216-1.977-8.118-2.548-11.922-1.393a.937.937 0 01-.55-1.791c4.348-1.32 9.754-.683 13.45 1.59.414.256.549.79.307 1.286zm.126-3.41c-3.855-2.29-10.218-2.502-13.882-1.39a1.125 1.125 0 11-.652-2.155c4.22-1.28 11.233-1.036 15.688 1.608a1.125 1.125 0 01-1.154 1.937z"/>
                  </svg>
                  <span>Abrir en Spotify</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                </a>
              </div>
            </div>
          </div>

          {/* Full description */}
          <div className="pt-6 border-t border-[#26201a] space-y-3">
            <h4 className="text-xs font-futura uppercase tracking-widest text-[#c5a059]">
              Descripción sincronizada del tratado
            </h4>
            
            <div className="text-sm text-[#d4c8b8] leading-relaxed whitespace-pre-line bg-[#0e0d0b] p-5 rounded border border-[#26201a] font-light">
              {episode.description}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#28221b] bg-[#100e0c] flex items-center justify-between">
          <span className="text-xs text-[#8c7f71] font-futura">
            Tratado disponible en Spotify & Spotify for Podcasters
          </span>

          <a
            href={episode.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-futura uppercase tracking-wider font-bold text-[#c5a059] hover:text-[#e0c284]"
          >
            <span>Escuchar en Spotify</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
