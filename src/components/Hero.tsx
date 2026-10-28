import React, { useState } from 'react';
import { Play, ExternalLink, Rss } from 'lucide-react';
import { PodcastInfo, Episode } from '../types/podcast';
import { extractEpisodeTopic } from '../services/podcastSync';

interface HeroProps {
  podcast: PodcastInfo;
  latestEpisode?: Episode;
  onPlayEpisode: (episode: Episode) => void;
  onOpenSyncModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  podcast,
  latestEpisode,
  onPlayEpisode,
  onOpenSyncModal
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  // Dynamic topic intelligently extracted from the latest episode
  const latestTopic = extractEpisodeTopic(latestEpisode);

  // Use the latest episode's authentic thumbnail; fallback to show cover if not found
  const heroThumbnail = (!imageFailed && latestEpisode?.thumbnail) 
    ? latestEpisode.thumbnail 
    : podcast.coverImage;

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#28221c] bg-[#0d0c0a]">
      
      {/* Subtle classical architectural grid watermark */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Futura Titles & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Metadata Inscription in Futura (Clean, without repeated tagline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest font-futura font-semibold text-[#c5a059]">
              <span>Por {podcast.host}</span>
              <span aria-hidden="true" className="text-[#594d41]">·</span>
              <span>{podcast.totalEpisodes} Tratados en Spotify</span>
            </div>

            {/* Main Headline in Futura Bold (Wes Anderson style) */}
            <h1 className="font-futura text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#f7f2ea] leading-[1.05] text-balance">
              {podcast.title}
            </h1>

            {/* Tagline / Subtitle */}
            <p className="font-serif-renaissance text-xl sm:text-2xl text-[#d4c8b8] italic font-normal leading-relaxed text-balance">
              &ldquo;{podcast.tagline}&rdquo;
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#a89b8d] leading-relaxed max-w-2xl font-light">
              {podcast.description}
            </p>

            {/* Primary Action Button: Escuchar último tratado */}
            {latestEpisode && (
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onPlayEpisode(latestEpisode)}
                  className="inline-flex items-center gap-3 px-6 py-3.5 text-xs font-futura uppercase tracking-wider font-bold text-[#14110d] bg-[#c5a059] hover:bg-[#d6b26b] active:scale-[0.98] rounded transition-all shadow-md shadow-[#c5a059]/15 cursor-pointer border border-[#e0c284]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Escuchar último tratado</span>
                </button>
              </div>
            )}

            {/* Platform Direct Actions: Spotify (Verde), YouTube (Rojo), Telegram (Azul), Apple Podcasts (Morado) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              
              {/* Spotify Button (Verde Oficial) */}
              <a
                href={podcast.spotifyShowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-futura uppercase tracking-wider font-bold text-white bg-[#1DB954] hover:bg-[#1ed760] active:scale-[0.98] rounded border border-[#1DB954]/50 transition-all shadow-sm shadow-[#1DB954]/20"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308a.747.747 0 01-1.026.248c-2.81-1.716-6.347-2.106-10.513-1.154a.75.75 0 01-.337-1.462c4.562-1.042 8.49-.604 11.628 1.342.348.213.46.666.248 1.026zm1.47-3.265a.936.936 0 01-1.285.308c-3.216-1.977-8.118-2.548-11.922-1.393a.937.937 0 01-.55-1.791c4.348-1.32 9.754-.683 13.45 1.59.414.256.549.79.307 1.286zm.126-3.41c-3.855-2.29-10.218-2.502-13.882-1.39a1.125 1.125 0 11-.652-2.155c4.22-1.28 11.233-1.036 15.688 1.608a1.125 1.125 0 01-1.154 1.937z"/>
                </svg>
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>

              {/* YouTube Button (Rojo Oficial) */}
              <a
                href={podcast.youtubeUrl || 'https://www.youtube.com/@pasoporcrotona'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-futura uppercase tracking-wider font-bold text-white bg-[#FF0000] hover:bg-[#ff2626] active:scale-[0.98] rounded border border-[#FF0000]/50 transition-all shadow-sm shadow-[#FF0000]/20"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>

              {/* Telegram Button (Azul Oficial) */}
              <a
                href={podcast.telegramUrl || 'https://t.me/pasoporcrotona'}
                target="_blank"
                rel="noopener noreferrer"
                title="Canal oficial de Telegram (@pasoporcrotona)"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-futura uppercase tracking-wider font-bold text-white bg-[#0088cc] hover:bg-[#0099e6] active:scale-[0.98] rounded border border-[#38a9e8]/50 transition-all shadow-sm shadow-[#0088cc]/25"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.673c.46 0 .663-.211.921-.46l2.211-2.15 4.6 3.398c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
                </svg>
                <span>Telegram</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>

              {/* Apple Podcasts Button (Morado Oficial) */}
              <a
                href={podcast.applePodcastsUrl || 'https://podcasts.apple.com/us/podcast/de-paso-por-crotona/id6792611427'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-futura uppercase tracking-wider font-bold text-white bg-[#872996] hover:bg-[#9c32ad] active:scale-[0.98] rounded border border-[#a855f7]/50 transition-all shadow-sm shadow-[#872996]/20"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M5.34 0C2.39 0 0 2.39 0 5.34v13.32C0 21.61 2.39 24 5.34 24h13.32c2.95 0 5.34-2.39 5.34-5.34V5.34C24 2.39 21.61 0 18.66 0H5.34zm6.66 2.6c3.27 0 6.08 1.84 7.48 4.54a8.4 8.4 0 0 1 .92 3.86c0 1.95-.67 3.75-1.8 5.17l-1.3-1.04a6.76 6.76 0 0 0 1.45-4.13c0-3.73-3.04-6.76-6.75-6.76s-6.75 3.03-6.75 6.76c0 1.58.55 3.03 1.46 4.17l-1.3 1.04a8.4 8.4 0 0 1-1.81-5.21c0-1.4.34-2.72.93-3.89 1.4-2.67 4.2-4.51 7.47-4.51zm0 3.33c2.46 0 4.47 2.01 4.47 4.47 0 1.45-.69 2.73-1.76 3.55l-1.1-1.22c.73-.59 1.2-1.48 1.2-2.48 0-1.72-1.39-3.11-3.11-3.11-1.72 0-3.11 1.39-3.11 3.11 0 .97.45 1.84 1.15 2.44l-1.13 1.25a4.44 4.44 0 0 1-1.72-3.54c0-2.46 2.01-4.47 4.47-4.47zm0 2.92c.86 0 1.55.7 1.55 1.55 0 .61-.35 1.13-.86 1.39v6.52h-1.38v-6.52c-.51-.26-.86-.78-.86-1.39 0-.85.7-1.55 1.55-1.55z"/>
                </svg>
                <span>Apple Podcast</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>

              {/* RSS Feed Button */}
              <button
                type="button"
                onClick={onOpenSyncModal}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-futura tracking-wider text-[#a39483] hover:text-[#c5a059] transition-colors cursor-pointer"
              >
                <Rss className="w-3.5 h-3.5" />
                <span>RSS</span>
              </button>

            </div>

          </div>

          {/* Right Column: Latest Episode Miniature Synced Directly (Without overlay banner) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-md">
              
              {/* Classical architectural double-frame */}
              <div className="p-3 bg-[#13110e] border border-[#383027] rounded shadow-2xl relative">
                
                {/* Corner Renaissance accents */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#c5a059]/60 pointer-events-none" />
                <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#c5a059]/60 pointer-events-none" />
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#c5a059]/60 pointer-events-none" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#c5a059]/60 pointer-events-none" />

                {/* Primary Artwork: Clean Unobstructed Miniature */}
                <div className="relative aspect-square w-full bg-[#181512] border border-[#2b241d] overflow-hidden rounded">
                  <img
                    key={heroThumbnail}
                    src={heroThumbnail}
                    alt={latestEpisode?.title || podcast.title}
                    referrerPolicy="no-referrer"
                    onError={() => setImageFailed(true)}
                    className="w-full h-full object-cover filter contrast-[1.03]"
                  />
                  
                  {/* Subtle vignette for bottom readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-transparent to-transparent opacity-60" />

                  {/* Overlay latest episode teaser tag */}
                  {latestEpisode && (
                    <div className="absolute bottom-3 left-3 right-3 p-3.5 bg-[#14110e]/95 backdrop-blur-md border border-[#3b3127] text-white rounded">
                      <div className="flex items-center justify-between text-[11px] text-[#c5a059] font-futura uppercase tracking-wider mb-1">
                        <span>Último Tratado {latestEpisode.episodeNumber ? `· Ep. ${latestEpisode.episodeNumber}` : ''}</span>
                        <span className="tabular-nums font-mono text-white/70">{latestEpisode.duration}</span>
                      </div>
                      <p className="text-xs font-futura font-bold uppercase tracking-wide line-clamp-1 text-[#f5efe6]">
                        {latestEpisode.title}
                      </p>
                      <button
                        type="button"
                        onClick={() => onPlayEpisode(latestEpisode)}
                        className="mt-2 w-full py-1.5 px-3 text-xs font-futura uppercase tracking-wider font-bold bg-[#221d18] hover:bg-[#c5a059] hover:text-[#120f0c] text-[#d4c8b8] border border-[#3d3328] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Previsualizar audio</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-2.5 text-center">
                  <span className="text-[10px] font-futura uppercase tracking-widest text-[#7a6d5f]">
                    Crotona 🏛️ Filosofía con mancuernas
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Inscription Strip in Futura with Dynamic Topic from Latest Episode (Clean, no text truncation) */}
        <div className="mt-14 pt-8 border-t border-[#26201a] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          
          <div className="border-l border-[#2e2720] pl-4">
            <div className="font-futura text-2xl font-bold text-[#f5efe6] tabular-nums">15</div>
            <div className="text-xs text-[#96897b] font-futura uppercase tracking-wider mt-0.5">Tratados publicados</div>
          </div>

          {/* Detección inteligente del tema del último episodio (sin puntos suspensivos ni cortes) */}
          <div className="border-l border-[#2e2720] pl-4">
            <div className="font-futura text-2xl font-bold uppercase tracking-tight text-[#c5a059]">
              {latestTopic.topic}
            </div>
            <div className="text-xs text-[#96897b] font-futura uppercase tracking-wider mt-0.5">
              {latestTopic.subtitle}
            </div>
          </div>

          <div className="border-l border-[#2e2720] pl-4">
            <div className="font-futura text-2xl font-bold text-[#f5efe6]">Spotify</div>
            <div className="text-xs text-[#96897b] font-futura uppercase tracking-wider mt-0.5">Sincronizado vía RSS</div>
          </div>

          <div className="border-l border-[#2e2720] pl-4 col-span-2 md:col-span-1 flex flex-col justify-center">
            <p className="font-serif-renaissance italic text-xs text-[#d4c8b8] leading-snug">
              &ldquo;Nadie tiene derecho a ser un aficionado en materia de entrenamiento físico. Qué desgracia es para un ser humano envejecer sin haber contemplado la belleza y la fuerza de la que su cuerpo es capaz.&rdquo;
            </p>
            <div className="text-[10px] text-[#c5a059] font-futura uppercase tracking-wider mt-1 font-bold">
              — Sócrates (Jenofonte)
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
