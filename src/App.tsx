/**
 * @license
 * @author José Lázaro Peña
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Search, RefreshCw, AlertCircle, Sparkles, MessageCircle, ArrowUpDown } from 'lucide-react';
import { PodcastInfo, Episode } from './types/podcast';
import { DEFAULT_PODCAST_INFO, INITIAL_EPISODES } from './data/defaultPodcast';
import { loadPodcastDataLocally, savePodcastDataLocally, parsePodcastRss } from './services/podcastSync';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EpisodeCard } from './components/EpisodeCard';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SpotifyPlayerModal } from './components/SpotifyPlayerModal';
import { EpisodeDetailModal } from './components/EpisodeDetailModal';
import { SyncSettingsModal } from './components/SyncSettingsModal';

const QUICK_TOPIC_TAGS = [
  'Azúcar',
  'Milón',
  'Press de banca',
  'Anime',
  'Mitos',
  'Rousseau'
];

export default function App() {
  // Load initial stored data or defaults (prioritize user's real Crotona podcast)
  const [podcast, setPodcast] = useState<PodcastInfo>(() => {
    const local = loadPodcastDataLocally();
    if (local.info && local.info.rssFeedUrl && !local.info.rssFeedUrl.includes('demo-podcast')) {
      return {
        ...DEFAULT_PODCAST_INFO,
        ...local.info,
        tagline: "Filosofía con mancuernas: porque las grandes preguntas de la filosofía también se responden con el cuerpo.",
        youtubeUrl: "https://www.youtube.com/@pasoporcrotona",
        telegramUrl: "https://t.me/pasoporcrotona",
        applePodcastsUrl: "https://podcasts.apple.com/us/podcast/de-paso-por-crotona/id6792611427",
        contactPhone: "+56 9 3746 0497",
        whatsappUrl: "https://wa.me/56937460497"
      };
    }
    return DEFAULT_PODCAST_INFO;
  });

  const [episodes, setEpisodes] = useState<Episode[]>(() => {
    const local = loadPodcastDataLocally();
    if (local.episodes && local.info && !local.info.rssFeedUrl?.includes('demo-podcast')) {
      return local.episodes;
    }
    return INITIAL_EPISODES;
  });

  // Modals state
  const [activePreviewEpisode, setActivePreviewEpisode] = useState<Episode | null>(null);
  const [selectedDetailEpisode, setSelectedDetailEpisode] = useState<Episode | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Search, Sort & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Auto-refresh on initial mount to ensure latest Spotify episodes and exact thumbnails
  useEffect(() => {
    const checkFeed = async () => {
      if (podcast.rssFeedUrl) {
        try {
          setIsSyncing(true);
          const result = await parsePodcastRss(podcast.rssFeedUrl, podcast.spotifyShowUrl);
          if (result.episodes.length > 0) {
            setEpisodes(result.episodes);
            setPodcast(prev => ({
              ...prev,
              totalEpisodes: result.episodes.length,
              lastSyncTime: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
            }));
          }
        } catch (e) {
          console.warn('Auto-sync notice:', e);
        } finally {
          setIsSyncing(false);
        }
      }
    };
    checkFeed();
  }, []);

  const handleUpdatePodcast = (newInfo: PodcastInfo, newEpisodes?: Episode[]) => {
    setPodcast(newInfo);
    if (newEpisodes && newEpisodes.length > 0) {
      setEpisodes(newEpisodes);
    }
  };

  const handleQuickSync = async () => {
    setIsSyncing(true);
    try {
      const res = await parsePodcastRss(podcast.rssFeedUrl, podcast.spotifyShowUrl);
      setEpisodes(res.episodes);
      const updatedInfo = {
        ...podcast,
        totalEpisodes: res.episodes.length,
        lastSyncTime: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setPodcast(updatedInfo);
      savePodcastDataLocally(updatedInfo, res.episodes);
      setSyncToast(`¡Sincronizado! ${res.episodes.length} tratados y portadas actualizados.`);
      setTimeout(() => setSyncToast(null), 3500);
    } catch {
      setSyncToast('Error al sincronizar. Revisa la URL del feed.');
      setTimeout(() => setSyncToast(null), 3500);
    } finally {
      setIsSyncing(false);
    }
  };

  // Filter and search logic
  const filteredEpisodes = useMemo(() => {
    let list = [...episodes];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(ep => 
        ep.title.toLowerCase().includes(q) || 
        ep.description.toLowerCase().includes(q) ||
        (ep.summary && ep.summary.toLowerCase().includes(q))
      );
    }

    if (activeFilter === 'recent') {
      list = list.slice(0, 4);
    }

    if (sortOrder === 'oldest') {
      list.reverse();
    }

    return list;
  }, [episodes, searchQuery, activeFilter, sortOrder]);

  const latestEpisode = episodes.length > 0 ? episodes[0] : undefined;

  return (
    <div className="min-h-screen bg-[#090806] text-[#f3ebd8] flex flex-col selection:bg-[#d4af63] selection:text-[#0e0b08]">
      
      {/* Toast Notification in Antique Gold */}
      {syncToast && (
        <div className="fixed bottom-6 left-6 z-50 gold-button font-futura font-bold px-4 py-3 rounded shadow-2xl flex items-center gap-2 text-xs animate-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Floating WhatsApp Direct Contact Pill */}
      <a
        href="https://wa.me/56937460497?text=Hola%20Jos%C3%A9%20L%C3%A1zaro,%20vengo%20desde%20la%20web%20De%20paso%20por%20Crotona"
        target="_blank"
        rel="noopener noreferrer"
        title="Escribir por WhatsApp (+56 9 3746 0497)"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#13100b]/95 hover:bg-[#25D366] text-[#f3ebd8] hover:text-white border border-[#d4af63]/50 hover:border-[#25D366] shadow-2xl backdrop-blur-md transition-all duration-300 group"
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] group-hover:bg-white animate-ping" />
        <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
        <span className="font-futura text-xs font-bold tracking-wider hidden sm:inline">
          +56 9 3746 0497
        </span>
      </a>

      {/* Top Bar Navigation */}
      <Header
        podcast={podcast}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        isSyncing={isSyncing}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          podcast={podcast}
          latestEpisode={latestEpisode}
          onPlayEpisode={(ep) => setActivePreviewEpisode(ep)}
          onOpenSyncModal={() => setIsSyncModalOpen(true)}
        />

        {/* Episodes Explorer Section */}
        <section id="episodios" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2d251b]">
            <div>
              <div className="text-xs font-futura uppercase tracking-widest text-[#d4af63] mb-1 flex items-center gap-2 font-semibold">
                <span>Índice de Tratados & Audio</span>
              </div>
              <h2 className="font-futura text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#f3ebd8]">
                Todos los <span className="gold-gradient-text">Episodios</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#a6957c] mt-1 font-light">
                Cada tratado cuenta con su grabado original de Spotify, notas completas y reproductor embebido.
              </p>
            </div>

            {/* Sync Status & Quick Sync Button */}
            <div className="flex items-center gap-3">
              {podcast.lastSyncTime && (
                <span className="text-xs text-[#8c7b65] font-futura hidden sm:inline">
                  Sincronizado: <strong className="text-[#d4af63] font-medium">{podcast.lastSyncTime}</strong>
                </span>
              )}
              <button
                type="button"
                onClick={handleQuickSync}
                disabled={isSyncing}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-futura uppercase tracking-wider font-bold text-[#dccfb8] bg-[#16130e] hover:bg-[#221d15] active:scale-95 border border-[#3a3023] hover:border-[#d4af63]/50 rounded transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#d4af63]' : 'text-[#d4af63]'}`} />
                <span>{isSyncing ? 'Actualizando...' : 'Actualizar'}</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Interactive Segmented Filter Controls */}
          <div className="pt-6 pb-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7b65]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por tratado o tema (azúcar, press de banca, Milón, anime...)"
                className="w-full pl-10 pr-16 py-2.5 bg-[#13100c] border border-[#2d251b] rounded text-xs sm:text-sm text-[#f3ebd8] placeholder-[#736450] focus:outline-none focus:border-[#d4af63] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-futura uppercase tracking-wider text-[#d4af63] hover:text-[#f3ebd8] cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Filter & Sort Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1 p-1 bg-[#13100c] border border-[#2d251b] rounded font-futura text-xs">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded uppercase tracking-wider transition-colors cursor-pointer ${
                    activeFilter === 'all' 
                      ? 'bg-[#262016] text-[#d4af63] font-bold shadow-sm border border-[#3d3224]' 
                      : 'text-[#9c8c74] hover:text-[#f3ebd8]'
                  }`}
                >
                  Todos ({episodes.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('recent')}
                  className={`px-3 py-1.5 rounded uppercase tracking-wider transition-colors cursor-pointer ${
                    activeFilter === 'recent' 
                      ? 'bg-[#262016] text-[#d4af63] font-bold shadow-sm border border-[#3d3224]' 
                      : 'text-[#9c8c74] hover:text-[#f3ebd8]'
                  }`}
                >
                  Últimos 4
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#13100c] hover:bg-[#1c1812] border border-[#2d251b] rounded font-futura text-xs uppercase tracking-wider text-[#cbbba2] hover:text-[#d4af63] transition-colors cursor-pointer"
                title="Cambiar orden cronológico"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-[#d4af63]" />
                <span>{sortOrder === 'newest' ? 'Más recientes' : 'Desde el origen'}</span>
              </button>
            </div>

          </div>

          {/* Quick Topic Tag Pills */}
          <div className="pb-7 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-futura uppercase tracking-widest text-[#7c6e5b]">
              Temas frecuentes:
            </span>
            {QUICK_TOPIC_TAGS.map((tag) => {
              const isSelected = searchQuery.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(isSelected ? '' : tag)}
                  className={`px-2.5 py-1 rounded text-[11px] font-futura uppercase tracking-wider transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#d4af63] text-[#0e0b08] border-[#e8cb88] font-bold'
                      : 'bg-[#120f0b] text-[#a6957c] border-[#261f16] hover:border-[#d4af63]/50 hover:text-[#f3ebd8]'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>

          {/* Episodes Grid with Exact Spotify Miniatures */}
          {filteredEpisodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {filteredEpisodes.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  onPreview={(ep) => setActivePreviewEpisode(ep)}
                  onOpenDetails={(ep) => setSelectedDetailEpisode(ep)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 crotona-card rounded-lg p-8 space-y-3">
              <AlertCircle className="w-8 h-8 text-[#d4af63] mx-auto" />
              <h3 className="font-futura text-base font-bold uppercase tracking-wide text-[#f3ebd8]">No se encontraron tratados</h3>
              <p className="text-xs text-[#a6957c] max-w-sm mx-auto font-serif-renaissance text-base italic">
                No hay episodios que coincidan con &ldquo;{searchQuery}&rdquo;. Intenta otra búsqueda o limpia el filtro.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-2 px-4 py-2 text-xs font-futura uppercase tracking-wider font-bold text-[#d4af63] bg-[#1a1610] border border-[#3a3023] hover:bg-[#251f17] rounded transition-colors cursor-pointer"
              >
                Restablecer búsqueda
              </button>
            </div>
          )}

        </section>

        {/* About the Show & Manifesto */}
        <AboutSection podcast={podcast} />

        {/* Dedicated Contact Section (+56 9 3746 0497) */}
        <ContactSection podcast={podcast} />
      </main>

      {/* Footer */}
      <Footer
        podcast={podcast}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
      />

      {/* Modals */}
      <SpotifyPlayerModal
        episode={activePreviewEpisode}
        onClose={() => setActivePreviewEpisode(null)}
      />

      <EpisodeDetailModal
        episode={selectedDetailEpisode}
        onClose={() => setSelectedDetailEpisode(null)}
        onPlay={(ep) => setActivePreviewEpisode(ep)}
      />

      <SyncSettingsModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        podcast={podcast}
        onUpdatePodcast={handleUpdatePodcast}
      />

    </div>
  );
}
