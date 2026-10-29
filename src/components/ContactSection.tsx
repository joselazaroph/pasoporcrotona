import React, { useState } from 'react';
import { Phone, MessageCircle, Copy, Check, Instagram, Send, ExternalLink, Sparkles } from 'lucide-react';
import { PodcastInfo } from '../types/podcast';

interface ContactSectionProps {
  podcast: PodcastInfo;
}

const CONTACT_TOPICS = [
  {
    label: 'Proponer un Tratado',
    msg: 'Hola José Lázaro, te escribo desde la web de De paso por Crotona para proponer un tema o tratado para el podcast:'
  },
  {
    label: 'Colaboración / Invitado',
    msg: 'Hola José Lázaro, te contacto desde la web de De paso por Crotona por una propuesta de colaboración / entrevista:'
  },
  {
    label: 'Unirme a los Crotonitas',
    msg: '¡Hola José Lázaro! Escucho De paso por Crotona y quería saludarte y sumarme a la comunidad crotonita. 🏛️'
  }
];

export const ContactSection: React.FC<ContactSectionProps> = ({ podcast }) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);

  const phoneDisplay = podcast.contactPhone || '+56 9 3746 0497';
  const phoneClean = '56937460497';
  const activeMessage = encodeURIComponent(CONTACT_TOPICS[selectedTopicIdx].msg);
  const whatsappDirectUrl = `https://wa.me/${phoneClean}?text=${activeMessage}`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneDisplay);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <section id="contacto" className="py-20 bg-[#090806] border-b border-[#2d251b] relative overflow-hidden">
      {/* Subtle golden ratio radial glow */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#d4af63]/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="crotona-card rounded-xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          {/* Corner Renaissance Golden Ratio accents */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#d4af63]/70 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#d4af63]/70 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#d4af63]/70 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#d4af63]/70 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Contact Narrative & Direct Channels */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14110c] border border-[#362c20] text-xs font-futura uppercase tracking-widest text-[#d4af63]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ágora & Contacto Directo</span>
              </div>

              <h2 className="font-futura text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#f3ebd8] leading-tight">
                Hablemos de Filosofía, <span className="gold-gradient-text">Fuerza & Propósito</span>
              </h2>

              <p className="text-sm sm:text-base text-[#bfb099] leading-relaxed font-light max-w-2xl">
                ¿Tienes una pregunta sobre algún tratado, quieres proponer un tema para el próximo episodio, prestar tu voz como crotonita o plantear una colaboración? Escríbele directamente a <strong className="text-[#f3ebd8] font-medium">{podcast.host}</strong>.
              </p>

              {/* Topic selector pills for WhatsApp */}
              <div className="space-y-2 pt-1">
                <span className="block text-[11px] font-futura uppercase tracking-widest text-[#9c8c74]">
                  Selecciona el motivo de tu mensaje para WhatsApp:
                </span>
                <div className="flex flex-wrap gap-2">
                  {CONTACT_TOPICS.map((topic, idx) => (
                    <button
                      key={topic.label}
                      type="button"
                      onClick={() => setSelectedTopicIdx(idx)}
                      className={`px-3.5 py-1.5 rounded text-xs font-futura uppercase tracking-wider transition-all cursor-pointer border ${
                        selectedTopicIdx === idx
                          ? 'bg-[#262016] text-[#d4af63] border-[#d4af63]/70 font-bold shadow-sm'
                          : 'bg-[#120f0b] text-[#a6957c] border-[#2d251b] hover:text-[#f3ebd8] hover:border-[#45392a]'
                      }`}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Social Channels */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href={podcast.telegramUrl || 'https://t.me/pasoporcrotona'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-futura uppercase tracking-wider font-bold text-[#f3ebd8] bg-[#15120d] hover:bg-[#0088cc] hover:text-white border border-[#2d251b] hover:border-[#0088cc] rounded transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-[#229ED9] group-hover:text-white" />
                  <span>Telegram @pasoporcrotona</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <a
                  href={podcast.instagramUrl || 'https://www.instagram.com/h_de_luz/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-futura uppercase tracking-wider font-bold text-[#f3ebd8] bg-[#15120d] hover:bg-[#833ab4] hover:text-white border border-[#2d251b] hover:border-[#a855f7] rounded transition-all"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />
                  <span>Instagram @h_de_luz</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>

            {/* Right Column: Highlighted Phone & WhatsApp Card */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-7 rounded-lg bg-[#100d09] border border-[#3a2f21] shadow-2xl space-y-5 relative">
                
                <div className="flex items-center gap-3.5 border-b border-[#261f16] pb-4">
                  <img
                    src="/crotona-logo.jpg"
                    alt="Milón de Crotona"
                    className="w-14 h-14 rounded-full border-2 border-[#d4af63] object-cover shadow-md shrink-0"
                  />
                  <div>
                    <div className="text-[11px] font-futura uppercase tracking-widest text-[#d4af63] font-bold">
                      Línea Directa & WhatsApp
                    </div>
                    <div className="font-futura text-base font-bold text-[#f3ebd8] uppercase">
                      {podcast.host}
                    </div>
                    <div className="text-xs text-[#9c8c74] font-serif-renaissance italic">
                      De paso por Crotona · Santiago de Chile
                    </div>
                  </div>
                </div>

                {/* Big Phone Number Plaque */}
                <div className="p-4 rounded bg-[#16130e] border border-[#30271c] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-[#211b13] border border-[#3d3122] flex items-center justify-center text-[#d4af63]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-futura uppercase tracking-widest text-[#8c7b65]">
                        Teléfono / WhatsApp
                      </div>
                      <a
                        href={`tel:+${phoneClean}`}
                        className="font-futura text-lg sm:text-xl font-bold tracking-wider text-[#f3ebd8] hover:text-[#d4af63] transition-colors tabular-nums"
                      >
                        {phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    title="Copiar número de teléfono"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-futura uppercase tracking-wider bg-[#211b13] hover:bg-[#2c2419] text-[#d4af63] border border-[#3d3122] transition-colors cursor-pointer"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Primary WhatsApp & Call Action Buttons */}
                <div className="space-y-2.5">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded font-futura text-xs uppercase tracking-widest font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2.5 border border-[#4ce683]/40"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Escribir por WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                  </a>

                  <a
                    href={`tel:+${phoneClean}`}
                    className="w-full py-2.5 px-4 rounded font-futura text-xs uppercase tracking-widest font-bold text-[#dccfb8] hover:text-[#f3ebd8] bg-[#18140f] hover:bg-[#221c15] border border-[#332a1e] transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d4af63]" />
                    <span>Llamar a {phoneDisplay}</span>
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
