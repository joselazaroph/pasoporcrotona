/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Search, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { PodcastInfo, Episode } from './types/podcast';
import { DEFAULT_PODCAST_INFO, INITIAL_EPISODES } from './data/defaultPodcast';
import { loadPodcastDataLocally, savePodcastDataLocally, parsePodcastRss } from './services/podcastSync';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EpisodeCard } from './components/EpisodeCard';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { SpotifyPlayerModal } from './components/SpotifyPlayerModal';
import { EpisodeDetailModal } from './components/EpisodeDetailModal';
import { SyncSettingsModal } from './components/SyncSettingsModal';

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
        applePodcastsUrl: "https://podcasts.apple.com/us/podcast/de-paso-por-crotona/id6792611427"
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

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent'>('all');
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
      setSyncToast(`¡Sincronizado! ${res.episodes.length} episodios y portadas cargados.`);
      setTimeout(() => setSyncToast(null), 3500);
    } catch (err) {
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

    return list;
  }, [episodes, searchQuery, activeFilter]);

  const latestEpisode = episodes.length > 0 ? episodes[0] : undefined;

  return (
    <div className="min-h-screen bg-[#0d0c0a] text-[#ede7de] flex flex-col selection:bg-[#c5a059] selection:text-[#120f0c]">
      
      {/* Toast Notification in Antique Bronze */}
      {syncToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#c5a059] text-[#120f0c] font-futura font-bold px-4 py-3 rounded shadow-2xl flex items-center gap-2 text-xs border border-[#f0d499] animate-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{syncToast}</span>
        </div>
      )}

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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#28221b]">
            <div>
              {/* Unboxed metadata kicker in Futura */}
              <div className="text-xs font-futura uppercase tracking-widest text-[#c5a059] mb-1">
                Índice de Tratados & Audio
              </div>
              <h2 className="font-futura text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#f7f2ea]">
                Todos los Episodios
              </h2>
              <p className="text-xs sm:text-sm text-[#9c8e7f] mt-1 font-light">
                Cada episodio cuenta con su miniatura original de Spotify, notas completas y reproductor embebido.
              </p>
            </div>

            {/* Sync Status & Quick Sync Button */}
            <div className="flex items-center gap-3">
              {podcast.lastSyncTime && (
                <span className="text-xs text-[#827466] font-futura hidden sm:inline">
                  Sincronizado: <strong className="text-[#c5a059] font-medium">{podcast.lastSyncTime}</strong>
                </span>
              )}
              <button
                type="button"
                onClick={handleQuickSync}
                disabled={isSyncing}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-futura uppercase tracking-wider font-bold text-[#d4c8b8] bg-[#1a1714] hover:bg-[#25201b] active:scale-95 border border-[#3b3228] rounded transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#c5a059]' : ''}`} />
                <span>{isSyncing ? 'Actualizando...' : 'Actualizar'}</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Interactive Segmented Filter Controls in Futura */}
          <div className="pt-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#736657]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por tema (azúcar, press de banca, Milón, anime...)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#14120f] border border-[#2b241d] rounded text-xs sm:text-sm text-[#f5efe6] placeholder-[#6e6153] focus:outline-none focus:border-[#c5a059] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8c7f71] hover:text-white"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Interactive Segmented Filter Controls in Futura */}
            <div className="flex items-center gap-1 p-1 bg-[#14120f] border border-[#2b241d] rounded self-stretch sm:self-auto shrink-0 font-futura text-xs">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded uppercase tracking-wider transition-colors cursor-pointer ${
                  activeFilter === 'all' 
                    ? 'bg-[#26201b] text-[#c5a059] font-bold shadow-sm border border-[#3d3328]' 
                    : 'text-[#8c7f71] hover:text-[#d4c8b8]'
                }`}
              >
                Todos ({episodes.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('recent')}
                className={`px-3 py-1.5 rounded uppercase tracking-wider transition-colors cursor-pointer ${
                  activeFilter === 'recent' 
                    ? 'bg-[#26201b] text-[#c5a059] font-bold shadow-sm border border-[#3d3328]' 
                    : 'text-[#8c7f71] hover:text-[#d4c8b8]'
                }`}
              >
                Últimos tratados
              </button>
            </div>

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
            <div className="text-center py-16 bg-[#13110e] border border-[#2b241d] rounded p-8 space-y-3">
              <AlertCircle className="w-8 h-8 text-[#8c7f71] mx-auto" />
              <h3 className="font-futura text-base font-bold uppercase tracking-wide text-[#f7f2ea]">No se encontraron tratados</h3>
              <p className="text-xs text-[#8c7f71] max-w-sm mx-auto font-serif">
                No hay episodios que coincidan con &ldquo;{searchQuery}&rdquo;. Intenta otra búsqueda o limpia el filtro.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-2 px-4 py-2 text-xs font-futura uppercase tracking-wider font-bold text-[#c5a059] bg-[#1a1714] border border-[#3b3228] hover:bg-[#25201b] rounded transition-colors cursor-pointer"
              >
                Restablecer búsqueda
              </button>
            </div>
          )}

        </section>

        {/* About the Show & Manifesto */}
        <AboutSection podcast={podcast} />
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
