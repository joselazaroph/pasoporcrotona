import React, { useState } from 'react';
import { BookOpen, Scroll, ExternalLink, X, Instagram, Phone, MessageCircle } from 'lucide-react';
import { PodcastInfo } from '../types/podcast';

interface AboutSectionProps {
  podcast: PodcastInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ podcast }) => {
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const contactPhone = podcast.contactPhone || '+56 9 3746 0497';
  const whatsappUrl = podcast.whatsappUrl || 'https://wa.me/56937460497';

  return (
    <section id="sobre-el-show" className="py-20 border-t border-b border-[#2d251b] bg-[#0d0b08] relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div aria-hidden="true" className="absolute -left-40 top-1/3 w-96 h-96 rounded-full bg-[#d4af63]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Portrait Framing of José Lázaro Peña */}
          <div className="lg:col-span-5">
            <div className="p-3.5 crotona-card rounded-lg relative">
              
              {/* Corner Renaissance accents */}
              <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#d4af63]/70 pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#d4af63]/70 pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#d4af63]/70 pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#d4af63]/70 pointer-events-none" />

              <div 
                onClick={() => setIsBioModalOpen(true)}
                className="relative rounded overflow-hidden bg-[#181510] border border-[#332a1e] cursor-pointer group"
                title="Haz clic para ver la semblanza de José Lázaro Peña"
              >
                <img
                  src="./jose-lazaro-pena.jpg"
                  alt="José Lázaro Peña - La Voz de Crotona"
                  className="w-full h-96 sm:h-[430px] object-cover object-top filter contrast-[1.04] group-hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090806] via-black/25 to-transparent opacity-90" />
                
                {/* Clickable Plaque on Photo */}
                <div className="absolute bottom-3 left-3 right-3 p-4 rounded bg-[#120f0b]/95 backdrop-blur-md border border-[#3d3224] group-hover:border-[#d4af63]/80 transition-all text-white shadow-xl">
                  
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                    <span className="font-futura text-lg font-bold uppercase tracking-wide text-[#f3ebd8] group-hover:text-[#d4af63] transition-colors">
                      José Lázaro Peña
                    </span>

                    {/* Instagram click link */}
                    <a
                      href="https://www.instagram.com/h_de_luz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-futura font-bold text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 rounded border border-white/20 transition-all shadow-sm"
                      title="Visitar perfil de Instagram de José Lázaro Peña (@h_de_luz)"
                    >
                      <Instagram className="w-3 h-3 text-white" />
                      <span>@h_de_luz</span>
                      <ExternalLink className="w-2.5 h-2.5 text-white/80" />
                    </a>
                  </div>

                  {/* Subtitle & Clickable trigger */}
                  <div className="pt-0.5 flex items-center justify-between gap-2 text-xs text-[#dccfb8] leading-relaxed">
                    <p className="line-clamp-2 text-[#cbbba2]">
                      Periodista, podcaster, fotógrafo y guía de turismo...
                    </p>
                    <span className="text-[11px] text-[#d4af63] font-futura uppercase font-bold tracking-wider shrink-0 underline decoration-[#d4af63]/50 underline-offset-2 group-hover:text-[#e8cb88] transition-colors">
                      Leer semblanza &rarr;
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom label under the photo frame with Official ICO Medallion */}
              <div className="mt-3 flex items-center justify-center gap-2.5 text-center">
                <img
                  src="./crotona-logo-dark.jpg"
                  alt="Emblema Crotona"
                  className="w-5 h-5 rounded-full border border-[#d4af63]/60 object-cover"
                />
                <span className="text-xs font-futura uppercase tracking-widest text-[#d4af63] font-bold flex items-center gap-2">
                  <span>La Voz de Crotona</span>
                  <span aria-hidden="true" className="text-[#59493a]">·</span>
                  <span className="text-[#a6957c] font-normal">Filosofía con mancuernas</span>
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Futura Manifesto Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Inscription */}
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest font-futura font-semibold text-[#d4af63]">
              <img
                src="./crotona-logo-dark.jpg"
                alt=""
                className="w-5 h-5 rounded-full border border-[#d4af63]/50 object-cover"
              />
              <span>El Manifiesto Crotonita</span>
              <span aria-hidden="true" className="text-[#453a2f]">·</span>
              <span className="text-[#cbbba2]">Cuerpo & Intelecto</span>
            </div>

            <h2 className="font-futura text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#f3ebd8] leading-tight text-balance">
              Donde el hierro se piensa y la fuerza se forja con <span className="gold-gradient-text">propósito</span>
            </h2>

            {/* Epictetus Quote */}
            <blockquote className="font-serif-renaissance text-lg sm:text-xl text-[#e2d6c1] italic leading-relaxed border-l-2 border-[#d4af63] pl-4 py-1.5 bg-[#13100c]/60 rounded-r">
              &laquo;Primero decide quién quieres ser; después, actúa en consecuencia. Así se entrenan los atletas: determinan en qué quieren convertirse y ordenan su vida para lograrlo&raquo;.
              <cite className="block text-xs uppercase tracking-widest font-futura font-bold text-[#d4af63] not-italic mt-2">
                — Epicteto, Disertaciones, III.23 (adaptación libre)
              </cite>
            </blockquote>

            {/* Podcast Core Premise */}
            <div className="space-y-4 text-sm sm:text-base text-[#cfc0a8] leading-relaxed font-light">
              <p className="text-balance">
                En la antigua Crotona, la escuela de Pitágoras y la gesta atlética de Milón no separaban la dialéctica filosófica del gimnasio. La fuerza corporal nunca fue entendida como vanidad, sino como virtud: paciencia, proporción áurea, templanza y dominio sobre el caos cotidiano.
              </p>

              <p className="text-[#a6957c]">
                Este espacio recupera esa tradición clásica: un punto de encuentro donde la ciencia del entrenamiento con pesas, la fisiología del esfuerzo y las grandes preguntas humanas convergen. Sin dogmas comerciales, con honestidad intelectual y criterio propio.
              </p>
            </div>

            {/* Explanatory Plaque Cards */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded crotona-card space-y-1.5">
                <div className="text-xs font-futura uppercase tracking-wider font-bold text-[#d4af63] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#d4af63]" />
                  <span>Historia & Filosofía</span>
                </div>
                <p className="text-xs text-[#a6957c] leading-relaxed">
                  Desde los tratados de Rousseau y Theodore Porter hasta la periodización de Milón de Crotona y la ciencia metabólica moderna.
                </p>
              </div>

              <div className="p-4 rounded crotona-card space-y-1.5">
                <div className="text-xs font-futura uppercase tracking-wider font-bold text-[#d4af63] flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-[#d4af63]" />
                  <span>Sincronización Transparente</span>
                </div>
                <p className="text-xs text-[#a6957c] leading-relaxed">
                  Tus episodios de Spotify y Anchor se actualizan solos al instante, con sus grabados estilo pergamino y notas completas.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Dedicated Bio Modal when clicking "La Voz de Crotona" */}
      {isBioModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsBioModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#13100c] border border-[#3d3224] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2d251b] bg-[#0d0b08]">
              <div className="flex items-center gap-3">
                <img
                  src="./crotona-logo-dark.jpg"
                  alt="Emblema Crotona"
                  className="w-9 h-9 rounded-full border border-[#d4af63]/60 object-cover"
                />
                <div>
                  <h3 className="font-futura text-lg font-bold uppercase tracking-wider text-[#f3ebd8]">
                    La Voz de Crotona
                  </h3>
                  <p className="text-xs text-[#d4af63] font-futura uppercase tracking-wider">
                    José Lázaro Peña · Trinidad, Cuba (1998) · Santiago de Chile
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBioModalOpen(false)}
                className="p-1.5 rounded text-[#a6957c] hover:text-[#f3ebd8] hover:bg-[#1e1912] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="w-36 h-36 sm:w-44 sm:h-44 shrink-0 rounded overflow-hidden border border-[#3d3224] shadow-lg">
                  <img
                    src="./jose-lazaro-pena.jpg"
                    alt="José Lázaro Peña"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-3 text-left">
                  <h4 className="font-futura text-xl font-bold uppercase tracking-wide text-[#f3ebd8]">
                    José Lázaro Peña
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-futura uppercase tracking-wider bg-[#1c1812] text-[#d4af63] rounded border border-[#3d3224]">
                      Periodista
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-futura uppercase tracking-wider bg-[#1c1812] text-[#d4af63] rounded border border-[#3d3224]">
                      Podcaster
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-futura uppercase tracking-wider bg-[#1c1812] text-[#d4af63] rounded border border-[#3d3224]">
                      Fotógrafo
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-futura uppercase tracking-wider bg-[#1c1812] text-[#d4af63] rounded border border-[#3d3224]">
                      Guía de Turismo
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <a
                      href="https://www.instagram.com/h_de_luz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-futura font-bold text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 rounded border border-white/20 transition-all shadow"
                    >
                      <Instagram className="w-4 h-4 text-white" />
                      <span>@h_de_luz</span>
                      <ExternalLink className="w-3 h-3 text-white/80" />
                    </a>

                    <a
                      href={`${whatsappUrl}?text=Hola%20Jos%C3%A9%20L%C3%A1zaro,%20te%20escribo%20desde%20la%20web%20De%20paso%20por%20Crotona`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-futura font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded border border-white/20 transition-all shadow"
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                      <span>{contactPhone}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="space-y-4 text-xs sm:text-sm text-[#cfc0a8] leading-relaxed border-t border-[#282017] pt-5">
                <p>
                  <strong className="text-[#f3ebd8]">De paso por Crotona</strong> nace de una convicción contracultural: el entrenamiento merece ser pensado, no solo ejecutado. Aquí, la ciencia se estudia, se cuestiona y se cuenta con rigor, pensamiento crítico y honestidad.
                </p>
                <p>
                  Cada episodio es un viaje por la historia, la fisiología y la filosofía del esfuerzo humano.
                </p>
                <p>
                  José Lázaro Peña es periodista, fotógrafo y guía de turismo, nacido en Trinidad, Cuba, en 1998. Apasionado por el entrenamiento de fuerza, la filosofía, la literatura y la historia, combina el rigor de la investigación periodística con la experiencia de quien también entrena, cuestiona y se equivoca.
                </p>
                <p className="font-serif-renaissance italic text-base text-[#d4af63]">
                  De paso por Crotona es el punto de encuentro de todas esas inquietudes en una sola voz.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#2d251b] bg-[#0d0b08] flex items-center justify-between">
              <span className="text-xs text-[#a6957c] font-serif-renaissance italic flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af63]" />
                <span>Contacto: {contactPhone}</span>
              </span>

              <button
                type="button"
                onClick={() => setIsBioModalOpen(false)}
                className="gold-button px-5 py-2 text-xs font-futura uppercase tracking-wider font-bold rounded transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
