import React, { useState } from 'react';
import { Play, ExternalLink, Rss, Sparkles, Compass, Phone } from 'lucide-react';
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
  const [showMainEmblem, setShowMainEmblem] = useState(false);

  // Dynamic topic intelligently extracted from the latest episode
  const latestTopic = extractEpisodeTopic(latestEpisode);

  // Use the latest episode's authentic thumbnail; fallback to local official Milón de Crotona cover
  const heroThumbnail = showMainEmblem
    ? './crotona-logo.jpg'
    : (!imageFailed && latestEpisode?.thumbnail)
      ? latestEpisode.thumbnail
      : './crotona-logo.jpg';

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-18 lg:pb-24 border-b border-[#2d251b] bg-[#090806]">
      
      {/* Architectural Fibonacci / Vitruvian radial glow & subtle dot matrix */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#d4af63_1px,transparent_1px)] [background-size:28px_28px]"
      />
      
      {/* Subtle Golden Ratio geometric circles watermark */}
      <div aria-hidden="true" className="absolute -right-32 -top-32 w-[620px] h-[620px] rounded-full border border-[#d4af63]/10 pointer-events-none" />
      <div aria-hidden="true" className="absolute -right-12 -top-12 w-[380px] h-[380px] rounded-full border border-[#d4af63]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Futura Titles & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Metadata Inscription Pill */}
            <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#15120d] border border-[#332a1e] text-xs uppercase tracking-widest font-futura font-semibold text-[#d4af63] shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#d4af63] animate-pulse" />
              <span>Por {podcast.host}</span>
              <span aria-hidden="true" className="text-[#594d41]">·</span>
              <span className="text-[#dccfb8]">{podcast.totalEpisodes} Tratados en Spotify</span>
            </div>

            {/* Main Headline in Futura Bold with Parchment-Gold Hierarchy */}
            <h1 className="font-futura text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.03] text-balance">
              <span className="text-[#f3ebd8]">De paso por </span>
              <span className="gold-gradient-text">Crotona</span>
            </h1>

            {/* Tagline / Subtitle in Renaissance Serif */}
            <p className="font-serif-renaissance text-xl sm:text-2xl lg:text-[26px] text-[#e2d6c1] italic font-normal leading-relaxed text-balance border-l-2 border-[#d4af63]/60 pl-4">
              &ldquo;{podcast.tagline}&rdquo;
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#b0a089] leading-relaxed max-w-2xl font-light">
              {podcast.description}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              {latestEpisode && (
                <button
                  type="button"
                  onClick={() => onPlayEpisode(latestEpisode)}
                  className="gold-button inline-flex items-center gap-3 px-6 py-3.5 text-xs font-futura uppercase tracking-widest font-bold rounded transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Escuchar último tratado</span>
                </button>
              )}

              <a
                href="#contacto"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 text-xs font-futura uppercase tracking-widest font-bold text-[#f3ebd8] bg-[#16130e] hover:bg-[#221d15] border border-[#382e22] hover:border-[#d4af63]/60 rounded transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af63]" />
                <span>Contacto Directo</span>
              </a>
            </div>

            {/* Platform Direct Actions */}
            <div className="pt-3 space-y-2">
              <div className="text-[10px] font-futura uppercase tracking-[0.2em] text-[#857661]">
                Escúchalo y síguenos en nuestras plataformas oficiales:
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                
                {/* Spotify Button */}
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

                {/* YouTube Button */}
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

                {/* Telegram Button */}
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

                {/* Apple Podcasts Button */}
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
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-futura tracking-wider text-[#a6957c] hover:text-[#d4af63] transition-colors cursor-pointer"
                >
                  <Rss className="w-3.5 h-3.5" />
                  <span>RSS</span>
                </button>

              </div>
            </div>

          </div>

          {/* Right Column: Latest Episode Miniature & Official Milón de Crotona Emblem Switcher */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-md">
              
              {/* Classical architectural double-frame */}
              <div className="p-3.5 crotona-card rounded-lg relative group">
                
                {/* Corner Renaissance Golden Ratio accents */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[#d4af63]/70 pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[#d4af63]/70 pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[#d4af63]/70 pointer-events-none" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[#d4af63]/70 pointer-events-none" />

                {/* Top bar switcher between Latest Episode Art and Main Crotona ICO */}
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <span className="text-[11px] font-futura uppercase tracking-widest text-[#d4af63] flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>{showMainEmblem ? 'Emblema Oficial · Milón de Crotona' : ` Tratado Destacado · ${latestTopic.topic}`}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowMainEmblem(!showMainEmblem)}
                    className="text-[10px] font-futura uppercase tracking-wider text-[#a6957c] hover:text-[#f3ebd8] underline decoration-[#d4af63]/50 underline-offset-2 cursor-pointer transition-colors"
                  >
                    {showMainEmblem ? 'Ver portada episodio' : 'Ver emblema Crotona'}
                  </button>
                </div>

                {/* Primary Artwork: Clean Unobstructed Miniature */}
                <div className="relative aspect-square w-full bg-[#12100c] border border-[#332a1f] overflow-hidden rounded">
                  <img
                    key={heroThumbnail}
                    src={heroThumbnail}
                    alt={latestEpisode?.title || podcast.title}
                    referrerPolicy="no-referrer"
                    onError={() => setImageFailed(true)}
                    className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  
                  {/* Floating Official ICO Medallion Badge in Top-Right of Artwork */}
                  {!showMainEmblem && (
                    <button
                      type="button"
                      onClick={() => setShowMainEmblem(true)}
                      title="Ver Emblema Oficial de Milón de Crotona"
                      className="absolute top-3 right-3 w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-[#e8cb88] to-[#8e6f36] shadow-xl hover:scale-110 transition-transform cursor-pointer"
                    >
                      <img
                        src="./crotona-logo.jpg"
                        alt="Milón de Crotona"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </button>
                  )}

                  {/* Subtle vignette for bottom readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090806] via-transparent to-transparent opacity-70 pointer-events-none" />

                  {/* Overlay latest episode teaser tag */}
                  {latestEpisode && (
                    <div className="absolute bottom-3 left-3 right-3 p-4 bg-[#110f0b]/95 backdrop-blur-md border border-[#3d3225] text-white rounded shadow-2xl">
                      <div className="flex items-center justify-between text-[11px] text-[#d4af63] font-futura uppercase tracking-wider mb-1">
                        <span className="font-semibold">Último Tratado {latestEpisode.episodeNumber ? `· Ep. ${latestEpisode.episodeNumber}` : ''}</span>
                        <span className="tabular-nums font-mono text-[#dccfb8]/80">{latestEpisode.duration}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-futura font-bold uppercase tracking-wide line-clamp-1 text-[#f3ebd8]">
                        {latestEpisode.title}
                      </p>
                      <button
                        type="button"
                        onClick={() => onPlayEpisode(latestEpisode)}
                        className="mt-2.5 w-full py-2 px-3 text-xs font-futura uppercase tracking-widest font-bold bg-[#1f1a13] hover:bg-[#d4af63] hover:text-[#0e0b08] text-[#f3ebd8] border border-[#3d3225] hover:border-[#e8cb88] rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Previsualizar audio</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Caption under the Frame */}
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-futura text-[#8f7f68] px-1">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#d4af63]" />
                    <span>Proporción Áurea & Fuerza</span>
                  </span>
                  <span className="uppercase tracking-wider text-[#d4af63]/90">{podcast.rating || '5.0 ★ Spotify'}</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
