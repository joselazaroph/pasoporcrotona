import React from 'react';
import { ExternalLink, RefreshCw, Phone, MessageCircle } from 'lucide-react';
import { PodcastInfo } from '../types/podcast';

interface FooterProps {
  podcast: PodcastInfo;
  onOpenSyncModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  podcast,
  onOpenSyncModal
}) => {
  const contactPhone = podcast.contactPhone || '+56 9 3746 0497';

  return (
    <footer className="bg-[#070605] border-t border-[#2d251b] py-14 text-[#9c8c74] text-xs relative">
      {/* Subtle top golden hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af63]/35 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Classical Renaissance motto block */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 pb-8 border-b border-[#221c15]">
          <p className="font-serif-renaissance text-base sm:text-xl text-[#e2d6c1] italic">
            &ldquo;El entrenamiento merece ser pensado, no solo ejecutado. Aquí, la ciencia se estudia, se cuestiona y se cuenta con rigor, pensamiento crítico y honestidad.&rdquo;
          </p>
          <span className="block text-xs uppercase tracking-widest font-futura font-bold text-[#d4af63]">
            — De paso por Crotona · Filosofía con mancuernas
          </span>
        </div>

        {/* Main Footer Block: Symmetrical distribution matching Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-[#221c15]">
          
          {/* Brand & Host Identity with Official ICO Medallion */}
          <div className="space-y-3 max-w-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-br from-[#e8cb88] via-[#d4af63] to-[#6e5223] shrink-0">
                <img
                  src="/crotona-logo-dark.jpg"
                  alt="Emblema De paso por Crotona"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-futura text-lg sm:text-xl font-bold uppercase tracking-wide text-[#f3ebd8]">
                  De paso por Crotona
                </h3>
                <div className="text-xs font-futura tracking-wide text-[#d4af63] font-medium flex items-center gap-1.5 flex-wrap">
                  <span>Por</span>
                  <a 
                    href="https://www.instagram.com/h_de_luz/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#f3ebd8] hover:text-[#d4af63] font-semibold underline decoration-[#d4af63]/60 underline-offset-4 transition-colors"
                    title="Instagram de José Lázaro Peña (@h_de_luz)"
                  >
                    José Lázaro Peña
                  </a>
                  <span className="text-[#695d50]">·</span>
                  <span className="text-[#a6957c] font-normal">Filosofía con mancuernas</span>
                </div>
              </div>
            </div>

            <p className="text-[#9c8c74] text-xs leading-relaxed max-w-md">
              Porque las grandes preguntas de la filosofía también se responden con el cuerpo.
            </p>

            {/* Direct Contact Phone in Footer */}
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-futura">
              <a
                href="https://wa.me/56937460497?text=Hola%20Jos%C3%A9%20L%C3%A1zaro,%20vengo%20desde%20la%20web%20De%20paso%20por%20Crotona"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#14110c] hover:bg-[#1e1912] border border-[#332a1e] hover:border-[#d4af63]/60 text-[#f3ebd8] hover:text-[#d4af63] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span className="font-bold tracking-wider">{contactPhone}</span>
              </a>
              <a
                href="tel:+56937460497"
                className="inline-flex items-center gap-1.5 text-[#a6957c] hover:text-[#d4af63] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af63]" />
                <span>Llamada directa</span>
              </a>
            </div>
          </div>

          {/* Platforms: Identical ordered distribution to top (1. Spotify, 2. YouTube, 3. Telegram, 4. Apple Podcast) */}
          <div className="space-y-2.5 w-full lg:w-auto">
            <div className="text-[10px] font-futura uppercase tracking-widest text-[#a6957c] font-semibold">
              Canales & Plataformas Oficiales:
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              
              {/* 1. Spotify */}
              <a
                href={podcast.spotifyShowUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Spotify"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-futura font-bold uppercase tracking-wider text-white bg-[#1DB954] hover:bg-[#1ed760] active:scale-[0.98] rounded border border-[#1DB954]/50 transition-all shadow-sm shadow-[#1DB954]/20 whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308a.747.747 0 01-1.026.248c-2.81-1.716-6.347-2.106-10.513-1.154a.75.75 0 01-.337-1.462c4.562-1.042 8.49-.604 11.628 1.342.348.213.46.666.248 1.026zm1.47-3.265a.936.936 0 01-1.285.308c-3.216-1.977-8.118-2.548-11.922-1.393a.937.937 0 01-.55-1.791c4.348-1.32 9.754-.683 13.45 1.59.414.256.549.79.307 1.286zm.126-3.41c-3.855-2.29-10.218-2.502-13.882-1.39a1.125 1.125 0 11-.652-2.155c4.22-1.28 11.233-1.036 15.688 1.608a1.125 1.125 0 01-1.154 1.937z"/>
                </svg>
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>

              {/* 2. YouTube */}
              <a
                href={podcast.youtubeUrl || 'https://www.youtube.com/@pasoporcrotona'}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-futura font-bold uppercase tracking-wider text-white bg-[#FF0000] hover:bg-[#ff2b2b] active:scale-[0.98] rounded border border-[#FF0000]/50 transition-all shadow-sm shadow-[#FF0000]/20 whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>

              {/* 3. Telegram */}
              <a
                href={podcast.telegramUrl || 'https://t.me/pasoporcrotona'}
                target="_blank"
                rel="noopener noreferrer"
                title="Canal oficial de Telegram (@pasoporcrotona)"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-futura font-bold uppercase tracking-wider text-white bg-[#0088cc] hover:bg-[#0099e6] active:scale-[0.98] rounded border border-[#38a9e8]/50 transition-all shadow-sm shadow-[#0088cc]/25 whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.673c.46 0 .663-.211.921-.46l2.211-2.15 4.6 3.398c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
                </svg>
                <span>Telegram</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>

              {/* 4. Apple Podcast */}
              <a
                href={podcast.applePodcastsUrl || 'https://podcasts.apple.com/us/podcast/de-paso-por-crotona/id6792611427'}
                target="_blank"
                rel="noopener noreferrer"
                title="Apple Podcast"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-futura font-bold uppercase tracking-wider text-white bg-[#872996] hover:bg-[#9c32ad] active:scale-[0.98] rounded border border-[#a855f7]/50 transition-all shadow-sm shadow-[#872996]/20 whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M5.34 0C2.39 0 0 2.39 0 5.34v13.32C0 21.61 2.39 24 5.34 24h13.32c2.95 0 5.34-2.39 5.34-5.34V5.34C24 2.39 21.61 0 18.66 0H5.34zm6.66 2.6c3.27 0 6.08 1.84 7.48 4.54a8.4 8.4 0 0 1 .92 3.86c0 1.95-.67 3.75-1.8 5.17l-1.3-1.04a6.76 6.76 0 0 0 1.45-4.13c0-3.73-3.04-6.76-6.75-6.76s-6.75 3.03-6.75 6.76c0 1.58.55 3.03 1.46 4.17l-1.3 1.04a8.4 8.4 0 0 1-1.81-5.21c0-1.4.34-2.72.93-3.89 1.4-2.67 4.2-4.51 7.47-4.51zm0 3.33c2.46 0 4.47 2.01 4.47 4.47 0 1.45-.69 2.73-1.76 3.55l-1.1-1.22c.73-.59 1.2-1.48 1.2-2.48 0-1.72-1.39-3.11-3.11-3.11-1.72 0-3.11 1.39-3.11 3.11 0 .97.45 1.84 1.15 2.44l-1.13 1.25a4.44 4.44 0 0 1-1.72-3.54c0-2.46 2.01-4.47 4.47-4.47zm0 2.92c.86 0 1.55.7 1.55 1.55 0 .61-.35 1.13-.86 1.39v6.52h-1.38v-6.52c-.51-.26-.86-.78-.86-1.39 0-.85.7-1.55 1.55-1.55z"/>
                </svg>
                <span>Apple Podcast</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>

            </div>
          </div>

        </div>

        {/* Navigation & Utilities Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          
          <nav className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-wider font-futura text-[#c4b49b]">
            <a 
              href="#episodios" 
              className="hover:text-[#d4af63] transition-colors"
            >
              Tratados
            </a>
            <a 
              href="#sobre-el-show" 
              className="hover:text-[#d4af63] transition-colors"
            >
              La Filosofía
            </a>
            <a 
              href="#contacto" 
              className="hover:text-[#d4af63] transition-colors"
            >
              Contacto ({contactPhone})
            </a>
            <button
              type="button"
              onClick={onOpenSyncModal}
              className="inline-flex items-center gap-1.5 hover:text-[#d4af63] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sincronizar Feed</span>
            </button>
          </nav>

          <div className="text-[11px] text-[#7c6e5b] font-futura tracking-wide">
            Audio & Miniaturas sincronizadas vía Spotify / Anchor RSS
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-6 border-t border-[#1c1711] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#7c6e5b] font-futura text-xs tracking-wide">
          <div>
            © {new Date().getFullYear()} {podcast.title} · Por José Lázaro Peña. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#6e604e]">
            <span>Filosofía con mancuernas</span>
            <span aria-hidden="true">·</span>
            <span>Proporción Áurea & Hierros</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
