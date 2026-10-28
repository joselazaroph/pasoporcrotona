import React, { useState } from 'react';
import { BookOpen, Scroll, ExternalLink, X, Instagram } from 'lucide-react';
import { PodcastInfo } from '../types/podcast';

interface AboutSectionProps {
  podcast: PodcastInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ podcast }) => {
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  return (
    <section id="sobre-el-show" className="py-20 border-b border-[#28221c] bg-[#100e0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Portrait Framing of José Lázaro Peña */}
          <div className="lg:col-span-5">
            <div className="p-3 bg-[#14120f] border border-[#3b3127] rounded shadow-2xl relative">
              
              {/* Corner Renaissance accents */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#c5a059]/60 pointer-events-none" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#c5a059]/60 pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#c5a059]/60 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#c5a059]/60 pointer-events-none" />

              <div 
                onClick={() => setIsBioModalOpen(true)}
                className="relative rounded overflow-hidden bg-[#1c1814] border border-[#2e261e] cursor-pointer group"
                title="Haz clic para ver la semblanza de José Lázaro Peña"
              >
                <img
                  src="/jose-lazaro-pena.jpg"
                  alt="José Lázaro Peña - La Voz de Crotona"
                  className="w-full h-96 sm:h-[430px] object-cover object-top filter contrast-[1.04] group-hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-black/25 to-transparent opacity-90" />
                
                {/* Clickable Plaque on Photo */}
                <div className="absolute bottom-3 left-3 right-3 p-4 rounded bg-[#13110e]/95 backdrop-blur-md border border-[#3d3328] group-hover:border-[#c5a059]/80 transition-all text-white shadow-xl">
                  
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                    <span className="font-futura text-lg font-bold uppercase tracking-wide text-[#f5efe6] group-hover:text-[#c5a059] transition-colors">
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
                  <div className="pt-0.5 flex items-center justify-between gap-2 text-xs text-[#d6c7b7] leading-relaxed">
                    <p className="line-clamp-2 text-[#c9bcae]">
                      Periodista, podcaster, fotógrafo y guía de turismo...
                    </p>
                    <span className="text-[11px] text-[#c5a059] font-futura uppercase font-bold tracking-wider shrink-0 underline decoration-[#c5a059]/50 underline-offset-2 group-hover:text-[#e0c284] transition-colors">
                      Leer más &rarr;
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom label under the photo frame as requested */}
              <div className="mt-2.5 text-center">
                <span className="text-xs font-futura uppercase tracking-widest text-[#c5a059] font-bold flex items-center justify-center gap-2">
                  <span>🏛️ La Voz de Crotona</span>
                  <span aria-hidden="true" className="text-[#59493a]">·</span>
                  <span className="text-[#9e8f7e] font-normal">Filosofía con mancuernas</span>
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Futura Manifesto Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Inscription */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-futura font-semibold text-[#c5a059]">
              <span>🏛️ El Manifiesto Crotonita</span>
              <span aria-hidden="true" className="text-[#453a2f]">·</span>
              <span>Cuerpo & Intelecto</span>
            </div>

            <h2 className="font-futura text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#f7f2ea] leading-tight text-balance">
              Donde el hierro se piensa y la fuerza se forja con propósito
            </h2>

            {/* Epictetus Quote */}
            <blockquote className="font-serif-renaissance text-lg sm:text-xl text-[#d9cebf] italic leading-relaxed border-l-2 border-[#c5a059] pl-4 py-1">
              &laquo;Primero decide quién quieres ser; después, actúa en consecuencia. Así se entrenan los atletas: determinan en qué quieren convertirse y ordenan su vida para lograrlo&raquo;.
              <cite className="block text-xs uppercase tracking-widest font-futura font-bold text-[#c5a059] not-italic mt-2">
                — Epicteto, Disertaciones, III.23 (adaptación libre)
              </cite>
            </blockquote>

            {/* Podcast Core Premise (The personal bio text is reserved exclusively for the modal) */}
            <div className="space-y-4 text-sm sm:text-base text-[#c7bbb0] leading-relaxed font-light">
              <p className="text-balance">
                En la antigua Crotona, la escuela de Pitágoras no separaba la dialéctica filosófica del gimnasio atlético. La fuerza corporal nunca fue entendida como vanidad, sino como virtud: paciencia, proporción, templanza y dominio sobre el caos cotidiano.
              </p>

              <p className="text-[#a89b8d]">
                Este espacio recupera esa tradición clásica: un punto de encuentro donde la ciencia del entrenamiento con pesas, la fisiología del esfuerzo y las grandes preguntas humanas convergen. Sin dogmas comerciales, con honestidad intelectual y criterio propio.
              </p>
            </div>

            {/* Explanatory Plaque Cards (Without the removed audio platforms row) */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded bg-[#161310] border border-[#2d251d] space-y-1.5">
                <div className="text-xs font-futura uppercase tracking-wider font-bold text-[#c5a059] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#c5a059]" />
                  <span>Historia & Filosofía</span>
                </div>
                <p className="text-xs text-[#9c8e7e] leading-relaxed">
                  Desde los tratados de Rousseau y Theodore Porter hasta la periodización de Milón y la ciencia metabólica moderna.
                </p>
              </div>

              <div className="p-4 rounded bg-[#161310] border border-[#2d251d] space-y-1.5">
                <div className="text-xs font-futura uppercase tracking-wider font-bold text-[#c5a059] flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-[#c5a059]" />
                  <span>Sincronización Transparente</span>
                </div>
                <p className="text-xs text-[#9c8e7e] leading-relaxed">
                  Tus episodios de Spotify y Anchor se actualizan solos al instante, con sus miniaturas oficiales y notas completas.
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
            className="relative w-full max-w-2xl bg-[#14120f] border border-[#3d3328] rounded shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#28221b] bg-[#100e0c]">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🏛️</span>
                <div>
                  <h3 className="font-futura text-lg font-bold uppercase tracking-wider text-[#f7f2ea]">
                    La Voz de Crotona
                  </h3>
                  <p className="text-xs text-[#c5a059] font-futura uppercase tracking-wider">
                    José Lázaro Peña · Trinidad, Cuba (1998) · Santiago de Chile
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBioModalOpen(false)}
                className="p-1.5 rounded text-[#8c7f71] hover:text-[#f5efe6] hover:bg-[#1a1714] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="w-36 h-36 sm:w-44 sm:h-44 shrink-0 rounded overflow-hidden border border-[#382f25] shadow-lg">
                  <img
                    src="/jose-lazaro-pena.jpg"
                    alt="José Lázaro Peña"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-3 text-left">
                  <h4 className="font-futura text-xl font-bold uppercase tracking-wide text-[#f5efe6]">
                    José Lázaro Peña
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-futura uppercase tracking-wider bg-[#1d1915] text-[#c5a059] rounded border border-[#3d3328]">
                      Periodista
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-futura uppercase tracking-wider bg-[#1d1915] text-[#c5a059] rounded border border-[#3d3328]">
                      Podcaster
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-futura uppercase tracking-wider bg-[#1d1915] text-[#c5a059] rounded border border-[#3d3328]">
                      Fotógrafo
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-futura uppercase tracking-wider bg-[#1d1915] text-[#c5a059] rounded border border-[#3d3328]">
                      Guía de Turismo
                    </span>
                  </div>

                  <a
                    href="https://www.instagram.com/h_de_luz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-futura font-bold text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 rounded border border-white/20 transition-all shadow"
                  >
                    <Instagram className="w-4 h-4 text-white" />
                    <span>Instagram: @h_de_luz</span>
                    <ExternalLink className="w-3 h-3 text-white/80" />
                  </a>
                </div>
              </div>

              {/* Text */}
              <div className="space-y-4 text-xs sm:text-sm text-[#b8ab9b] leading-relaxed border-t border-[#241f19] pt-5">
                <p>
                  <strong className="text-[#f5efe6]">De paso por Crotona</strong> nace de una convicción contracultural: el entrenamiento merece ser pensado, no solo ejecutado. Aquí, la ciencia se estudia, se cuestiona y se cuenta con rigor, pensamiento crítico y honestidad.
                </p>
                <p>
                  Cada episodio es un viaje por la historia, la fisiología y la filosofía del esfuerzo humano.
                </p>
                <p>
                  José Lázaro Peña es periodista, fotógrafo y guía de turismo, nacido en Trinidad, Cuba, en 1998. Apasionado por el entrenamiento de fuerza, la filosofía, la literatura y la historia, combina el rigor de la investigación periodística con la experiencia de quien también entrena, cuestiona y se equivoca.
                </p>
                <p className="font-serif-renaissance italic text-sm text-[#c5a059]">
                  De paso por Crotona es el punto de encuentro de todas esas inquietudes en una sola voz.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#28221b] bg-[#100e0c] flex items-center justify-between">
              <span className="text-xs text-[#8c7f71] font-serif">
                Crotona 🏛️ Filosofía con mancuernas
              </span>

              <button
                type="button"
                onClick={() => setIsBioModalOpen(false)}
                className="px-5 py-2 text-xs font-futura uppercase tracking-wider font-bold text-[#14110d] bg-[#c5a059] hover:bg-[#d6b26b] rounded transition-colors cursor-pointer border border-[#e0c284]"
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
