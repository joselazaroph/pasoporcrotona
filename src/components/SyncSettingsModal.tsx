import React, { useState } from 'react';
import { X, RefreshCw, Rss, AlertCircle, CheckCircle2, HelpCircle, Save } from 'lucide-react';
import { PodcastInfo, Episode } from '../types/podcast';
import { PRESET_SHOWS, DEFAULT_PODCAST_INFO, INITIAL_EPISODES } from '../data/defaultPodcast';
import { parsePodcastRss, savePodcastDataLocally } from '../services/podcastSync';

interface SyncSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  podcast: PodcastInfo;
  onUpdatePodcast: (newInfo: PodcastInfo, newEpisodes?: Episode[]) => void;
}

export const SyncSettingsModal: React.FC<SyncSettingsModalProps> = ({
  isOpen,
  onClose,
  podcast,
  onUpdatePodcast
}) => {
  const [feedUrl, setFeedUrl] = useState(podcast.rssFeedUrl || '');
  const [spotifyShowUrl, setSpotifyShowUrl] = useState(podcast.spotifyShowUrl || '');
  const [youtubeUrl, setYoutubeUrl] = useState(podcast.youtubeUrl || 'https://www.youtube.com/@pasoporcrotona');
  const [telegramUrl, setTelegramUrl] = useState(podcast.telegramUrl || 'https://t.me/pasoporcrotona');
  const [podcastTitle, setPodcastTitle] = useState(podcast.title || '');
  const [hostName, setHostName] = useState(podcast.host || '');
  const [tagline, setTagline] = useState(podcast.tagline || '');
  const [description, setDescription] = useState(podcast.description || '');
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  if (!isOpen) return null;

  const handleSyncFeed = async (urlToUse?: string) => {
    const targetUrl = urlToUse || feedUrl.trim();
    if (!targetUrl) {
      setSyncStatus({
        type: 'error',
        message: 'Por favor introduce la URL del feed RSS de tu podcast.'
      });
      return;
    }

    setIsSyncing(true);
    setSyncStatus({ type: null, message: '' });

    try {
      const result = await parsePodcastRss(targetUrl, spotifyShowUrl);
      
      const updatedInfo: PodcastInfo = {
        ...podcast,
        title: result.podcast.title || podcastTitle || podcast.title,
        description: result.podcast.description || description || podcast.description,
        host: result.podcast.host || hostName || podcast.host,
        coverImage: result.podcast.coverImage || podcast.coverImage,
        rssFeedUrl: targetUrl,
        spotifyShowUrl: spotifyShowUrl || podcast.spotifyShowUrl,
        totalEpisodes: result.episodes.length,
        lastSyncTime: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };

      setPodcastTitle(updatedInfo.title);
      setHostName(updatedInfo.host);
      setDescription(updatedInfo.description);

      savePodcastDataLocally(updatedInfo, result.episodes);
      onUpdatePodcast(updatedInfo, result.episodes);

      setSyncStatus({
        type: 'success',
        message: `¡Sincronización exitosa! Se cargaron ${result.episodes.length} episodios con sus descripciones y miniaturas originales.`
      });
    } catch (err) {
      setSyncStatus({
        type: 'error',
        message: (err as Error).message || 'No se pudo sincronizar el feed RSS.'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleApplyPreset = (preset: typeof PRESET_SHOWS[0]) => {
    setFeedUrl(preset.feedUrl);
    setSpotifyShowUrl(preset.spotifyUrl);
    handleSyncFeed(preset.feedUrl);
  };

  const handleManualSave = () => {
    const updatedInfo: PodcastInfo = {
      ...podcast,
      title: podcastTitle,
      tagline,
      description,
      host: hostName,
      spotifyShowUrl,
      youtubeUrl,
      telegramUrl,
      rssFeedUrl: feedUrl,
      lastSyncTime: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
    onUpdatePodcast(updatedInfo);
    setSyncStatus({
      type: 'success',
      message: 'Configuración guardada correctamente.'
    });
  };

  const handleResetToDefault = () => {
    savePodcastDataLocally(DEFAULT_PODCAST_INFO, INITIAL_EPISODES);
    onUpdatePodcast(DEFAULT_PODCAST_INFO, INITIAL_EPISODES);
    setFeedUrl(DEFAULT_PODCAST_INFO.rssFeedUrl);
    setSpotifyShowUrl(DEFAULT_PODCAST_INFO.spotifyShowUrl);
    setPodcastTitle(DEFAULT_PODCAST_INFO.title);
    setHostName(DEFAULT_PODCAST_INFO.host);
    setTagline(DEFAULT_PODCAST_INFO.tagline);
    setDescription(DEFAULT_PODCAST_INFO.description);
    setSyncStatus({
      type: 'success',
      message: 'Feed oficial de De paso por Crotona restaurado.'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#14120f] border border-[#3d3328] rounded shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#28221b] bg-[#100e0c]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded border border-[#c5a059]/40 bg-[#1c1814] flex items-center justify-center text-[#c5a059]">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-[#f7f2ea]">Sincronización con Spotify & RSS</h2>
              <p className="text-xs text-[#8c7f71] font-serif">Actualiza automáticamente tus episodios y portadas en tiempo real</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded text-[#8c7f71] hover:text-[#f5efe6] hover:bg-[#1a1714] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* How Spotify Sync Works Banner in Renaissance theme */}
          <div className="p-4 rounded bg-[#161310] border border-[#332a21] space-y-2 text-xs text-[#d4c8b8]">
            <div className="flex items-center gap-2 font-serif uppercase tracking-wider font-semibold text-[#c5a059]">
              <HelpCircle className="w-4 h-4" />
              <span>Sincronización con miniaturas automáticas</span>
            </div>
            <p className="leading-relaxed text-[#9c8e7f] font-light">
              Cada vez que publicas un nuevo episodio en Spotify / Anchor, tu feed RSS se actualiza al instante con la miniatura exclusiva del episodio, su duración y su descripción. Esta web lee directamente ese feed en tu navegador sin necesidad de servidor.
            </p>
          </div>

          {/* Sync Status Feedback */}
          {syncStatus.type && (
            <div className={`p-4 rounded flex items-start gap-3 text-sm font-serif ${
              syncStatus.type === 'success' 
                ? 'bg-[#1c1913] border border-[#c5a059]/40 text-[#e0c284]' 
                : 'bg-[#211210] border border-red-900/40 text-red-300'
            }`}>
              {syncStatus.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#c5a059]" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
              )}
              <span className="leading-relaxed">{syncStatus.message}</span>
            </div>
          )}

          {/* Primary Input: Feed RSS URL */}
          <div className="space-y-2">
            <label className="block text-xs font-serif uppercase tracking-wider text-[#c5a059]">
              URL del Feed RSS de tu Podcast
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Rss className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#736657]" />
                <input
                  type="url"
                  value={feedUrl}
                  onChange={(e) => setFeedUrl(e.target.value)}
                  placeholder="https://anchor.fm/s/112b570e4/podcast/rss"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0e0d0b] border border-[#2e261f] rounded text-sm text-[#f5efe6] placeholder-[#6e6153] focus:outline-none focus:border-[#c5a059] transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={() => handleSyncFeed()}
                disabled={isSyncing}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-serif uppercase tracking-wider font-bold text-[#14110d] bg-[#c5a059] hover:bg-[#d6b26b] disabled:opacity-50 rounded transition-all shadow-md shadow-[#c5a059]/15 cursor-pointer shrink-0 border border-[#e0c284]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar ahora'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#8c7f71] font-serif">
              Tu feed actual: <code className="text-[#c5a059]">{feedUrl}</code>
            </p>
          </div>

          {/* Spotify Show Link */}
          <div className="space-y-2">
            <label className="block text-xs font-serif uppercase tracking-wider text-[#c5a059]">
              Enlace de tu Show en Spotify
            </label>
            <input
              type="url"
              value={spotifyShowUrl}
              onChange={(e) => setSpotifyShowUrl(e.target.value)}
              placeholder="https://open.spotify.com/show/033inbTrwcYemhXpFYhcd0"
              className="w-full px-4 py-2.5 bg-[#0e0d0b] border border-[#2e261f] rounded text-sm text-[#f5efe6] placeholder-[#6e6153] focus:outline-none focus:border-[#c5a059] transition-colors"
            />
          </div>

          {/* YouTube Channel Link */}
          <div className="space-y-2">
            <label className="block text-xs font-serif uppercase tracking-wider text-[#FF0000]">
              Canal de YouTube
            </label>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/@pasoporcrotona"
              className="w-full px-4 py-2.5 bg-[#0e0d0b] border border-[#2e261f] rounded text-sm text-[#f5efe6] placeholder-[#6e6153] focus:outline-none focus:border-[#FF0000] transition-colors"
            />
          </div>

          {/* Telegram Channel Link */}
          <div className="space-y-2">
            <label className="block text-xs font-serif uppercase tracking-wider text-[#229ED9]">
              Canal de Telegram
            </label>
            <input
              type="url"
              value={telegramUrl}
              onChange={(e) => setTelegramUrl(e.target.value)}
              placeholder="https://t.me/pasoporcrotona"
              className="w-full px-4 py-2.5 bg-[#0e0d0b] border border-[#2e261f] rounded text-sm text-[#f5efe6] placeholder-[#6e6153] focus:outline-none focus:border-[#229ED9] transition-colors"
            />
          </div>

          {/* Quick Preset Selector for Testing */}
          <div className="pt-2 border-t border-[#26201a] space-y-3">
            <span className="block text-xs font-serif uppercase tracking-wider text-[#9c8e7f]">
              O prueba con otros podcasts de referencia:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_SHOWS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="p-3 text-left rounded bg-[#161310] hover:bg-[#1f1b16] border border-[#2b241d] hover:border-[#4d3f31] transition-colors cursor-pointer group"
                >
                  <div className="text-xs font-bold font-serif text-[#f5efe6] group-hover:text-[#c5a059] transition-colors">
                    {preset.name}
                  </div>
                  <div className="text-[11px] text-[#8c7f71] line-clamp-1 mt-0.5 font-light">
                    {preset.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Metadata Customization */}
          <div className="pt-4 border-t border-[#26201a] space-y-4">
            <h3 className="text-xs font-serif uppercase tracking-widest text-[#c5a059]">
              Datos Generales del Podcast
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-[#8c7f71] font-serif">Nombre del Podcast</label>
                <input
                  type="text"
                  value={podcastTitle}
                  onChange={(e) => setPodcastTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0e0d0b] border border-[#2e261f] rounded text-sm text-[#f5efe6] focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#8c7f71] font-serif">Anfitrión</label>
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0e0d0b] border border-[#2e261f] rounded text-sm text-[#f5efe6] focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#8c7f71] font-serif">Lema o Frase Destacada</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#0e0d0b] border border-[#2e261f] rounded text-sm text-[#f5efe6] focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#8c7f71] font-serif">Descripción del Show</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#0e0d0b] border border-[#2e261f] rounded text-sm text-[#f5efe6] focus:outline-none focus:border-[#c5a059] leading-relaxed"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#28221b] bg-[#100e0c] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="text-xs text-[#8c7f71] hover:text-[#c5a059] transition-colors cursor-pointer font-serif"
          >
            Restaurar De paso por Crotona
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-serif uppercase tracking-wider text-[#8c7f71] hover:text-[#f5efe6] transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={handleManualSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-serif uppercase tracking-wider font-bold text-[#14110d] bg-[#c5a059] hover:bg-[#d6b26b] rounded transition-colors cursor-pointer border border-[#e0c284]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar cambios</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
