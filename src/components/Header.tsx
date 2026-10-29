import React, { useState } from 'react';
import { RefreshCw, Menu, X, Phone } from 'lucide-react';
import { PodcastInfo } from '../types/podcast';

interface HeaderProps {
  podcast: PodcastInfo;
  onOpenSyncModal: () => void;
  isSyncing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  podcast,
  onOpenSyncModal,
  isSyncing
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090806]/90 backdrop-blur-xl border-b border-[#2d251b] shadow-lg shadow-black/50">
      {/* Subtle top golden ratio hairline */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af63]/45 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Zone 1: Official Milón de Crotona ICO Emblem & Wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-3 text-white whitespace-nowrap shrink-0 group"
        >
          <div className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-br from-[#e8cb88] via-[#d4af63] to-[#6e5223] shadow-md shadow-[#d4af63]/15 group-hover:shadow-[#d4af63]/35 transition-all duration-300">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#100e0b] flex items-center justify-center">
              <img
                src="/crotona-logo-dark.jpg"
                alt="Emblema De paso por Crotona"
                className="w-full h-full object-cover scale-105 group-hover:scale-115 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-futura text-base sm:text-lg font-bold uppercase tracking-wider text-[#f3ebd8] group-hover:text-[#d4af63] transition-colors">
              {podcast.title}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#a6957c] font-futura -mt-0.5 hidden sm:block">
              Filosofía con mancuernas
            </span>
          </div>
        </a>

        {/* Zone 2: Desktop Navigation links in Futura */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest font-futura font-semibold text-[#cfc0a8]">
          <a 
            href="#episodios" 
            className="hover:text-[#d4af63] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#d4af63]/60"
          >
            Tratados
          </a>
          <a 
            href="#sobre-el-show" 
            className="hover:text-[#d4af63] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#d4af63]/60"
          >
            La Filosofía
          </a>
          <a 
            href="#contacto" 
            className="hover:text-[#d4af63] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#d4af63]/60 flex items-center gap-1.5"
          >
            <Phone className="w-3 h-3 text-[#d4af63]" />
            <span>Contacto</span>
          </a>
          <button 
            type="button"
            onClick={onOpenSyncModal}
            className="flex items-center gap-1.5 text-[#a6957c] hover:text-[#d4af63] transition-colors whitespace-nowrap cursor-pointer py-1"
            title="Sincronizar Feed RSS"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#d4af63]' : ''}`} />
            <span>Sincronizar</span>
          </button>
        </nav>

        {/* Zone 3: Official Platform Channels & Mobile Menu Button */}
        <div className="flex items-center gap-2 shrink-0">

          {/* 1. Spotify */}
          <a
            href={podcast.spotifyShowUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Escuchar en Spotify"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-futura font-bold uppercase tracking-wider text-[#f3ebd8] hover:text-white bg-[#17140f] hover:bg-[#1DB954] active:scale-[0.98] rounded border border-[#2d251b] hover:border-[#1DB954] transition-all duration-200 shadow-sm whitespace-nowrap shrink-0 group/sp"
          >
            <svg className="w-3.5 h-3.5 fill-[#1DB954] group-hover/sp:fill-white transition-colors shrink-0" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308a.747.747 0 01-1.026.248c-2.81-1.716-6.347-2.106-10.513-1.154a.75.75 0 01-.337-1.462c4.562-1.042 8.49-.604 11.628 1.342.348.213.46.666.248 1.026zm1.47-3.265a.936.936 0 01-1.285.308c-3.216-1.977-8.118-2.548-11.922-1.393a.937.937 0 01-.55-1.791c4.348-1.32 9.754-.683 13.45 1.59.414.256.549.79.307 1.286zm.126-3.41c-3.855-2.29-10.218-2.502-13.882-1.39a1.125 1.125 0 11-.652-2.155c4.22-1.28 11.233-1.036 15.688 1.608a1.125 1.125 0 01-1.154 1.937z"/>
            </svg>
            <span className="hidden sm:inline">Spotify</span>
          </a>

          {/* 2. YouTube */}
          <a
            href={podcast.youtubeUrl || 'https://www.youtube.com/@pasoporcrotona'}
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube de De paso por Crotona"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-futura font-bold uppercase tracking-wider text-[#f3ebd8] hover:text-white bg-[#17140f] hover:bg-[#FF0000] active:scale-[0.98] rounded border border-[#2d251b] hover:border-[#FF0000] transition-all duration-200 shadow-sm whitespace-nowrap shrink-0 group/yt"
          >
            <svg className="w-3.5 h-3.5 fill-[#FF0000] group-hover/yt:fill-white transition-colors shrink-0" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="hidden md:inline">YouTube</span>
          </a>

          {/* 3. Telegram */}
          <a
            href={podcast.telegramUrl || 'https://t.me/pasoporcrotona'}
            target="_blank"
            rel="noopener noreferrer"
            title="Canal oficial de Telegram (@pasoporcrotona)"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-futura font-bold uppercase tracking-wider text-[#f3ebd8] hover:text-white bg-[#17140f] hover:bg-[#0088cc] active:scale-[0.98] rounded border border-[#2d251b] hover:border-[#0088cc] transition-all duration-200 shadow-sm whitespace-nowrap shrink-0 group/tg"
          >
            <svg className="w-3.5 h-3.5 fill-[#229ED9] group-hover/tg:fill-white transition-colors shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.673c.46 0 .663-.211.921-.46l2.211-2.15 4.6 3.398c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
            </svg>
            <span className="hidden md:inline">Telegram</span>
          </a>

          {/* 4. Apple Podcast */}
          <a
            href={podcast.applePodcastsUrl || 'https://podcasts.apple.com/us/podcast/de-paso-por-crotona/id6792611427'}
            target="_blank"
            rel="noopener noreferrer"
            title="Apple Podcast"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-futura font-bold uppercase tracking-wider text-[#f3ebd8] hover:text-white bg-[#17140f] hover:bg-[#872996] active:scale-[0.98] rounded border border-[#2d251b] hover:border-[#a855f7] transition-all duration-200 shadow-sm whitespace-nowrap shrink-0 group/ap"
          >
            <svg className="w-3.5 h-3.5 fill-[#b566ff] group-hover/ap:fill-white transition-colors shrink-0" viewBox="0 0 24 24">
              <path d="M5.34 0C2.39 0 0 2.39 0 5.34v13.32C0 21.61 2.39 24 5.34 24h13.32c2.95 0 5.34-2.39 5.34-5.34V5.34C24 2.39 21.61 0 18.66 0H5.34zm6.66 2.6c3.27 0 6.08 1.84 7.48 4.54a8.4 8.4 0 0 1 .92 3.86c0 1.95-.67 3.75-1.8 5.17l-1.3-1.04a6.76 6.76 0 0 0 1.45-4.13c0-3.73-3.04-6.76-6.75-6.76s-6.75 3.03-6.75 6.76c0 1.58.55 3.03 1.46 4.17l-1.3 1.04a8.4 8.4 0 0 1-1.81-5.21c0-1.4.34-2.72.93-3.89 1.4-2.67 4.2-4.51 7.47-4.51zm0 3.33c2.46 0 4.47 2.01 4.47 4.47 0 1.45-.69 2.73-1.76 3.55l-1.1-1.22c.73-.59 1.2-1.48 1.2-2.48 0-1.72-1.39-3.11-3.11-3.11-1.72 0-3.11 1.39-3.11 3.11 0 .97.45 1.84 1.15 2.44l-1.13 1.25a4.44 4.44 0 0 1-1.72-3.54c0-2.46 2.01-4.47 4.47-4.47zm0 2.92c.86 0 1.55.7 1.55 1.55 0 .61-.35 1.13-.86 1.39v6.52h-1.38v-6.52c-.51-.26-.86-.78-.86-1.39 0-.85.7-1.55 1.55-1.55z"/>
            </svg>
            <span className="hidden xl:inline">Apple</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú de navegación"
            className="lg:hidden p-2 rounded border border-[#2d251b] bg-[#16130e] text-[#d4af63] hover:bg-[#211c15] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2d251b] bg-[#0e0c09]/98 backdrop-blur-xl px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2.5 font-futura text-xs uppercase tracking-widest text-[#f3ebd8]">
            <a
              href="#episodios"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#1a1610] hover:text-[#d4af63] transition-colors flex items-center justify-between"
            >
              <span>Tratados & Episodios</span>
              <span className="text-[#d4af63] text-[10px]">{podcast.totalEpisodes} Ep.</span>
            </a>
            <a
              href="#sobre-el-show"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#1a1610] hover:text-[#d4af63] transition-colors"
            >
              La Filosofía Crotonita
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#1a1610] hover:text-[#d4af63] transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af63]" />
                <span>Contacto Directo</span>
              </span>
              <span className="text-[#d4af63] font-mono text-[11px]">{podcast.contactPhone || '+56 9 3746 0497'}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSyncModal();
              }}
              className="py-2 px-3 rounded hover:bg-[#1a1610] text-left text-[#a6957c] hover:text-[#d4af63] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#d4af63]' : ''}`} />
              <span>Sincronizar Feed RSS</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
