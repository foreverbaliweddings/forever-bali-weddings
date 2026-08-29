import React from 'react';
import { Check, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { NUSANTARA_HERITAGE, CONTACT_INFO } from '../data/weddingData';

interface NusantaraHeritageSectionProps {
  lang: Language;
}

export const NusantaraHeritageSection: React.FC<NusantaraHeritageSectionProps> = ({ lang }) => {
  const getWhatsAppHeritageLink = () => {
    const text =
      lang === 'ID'
        ? 'Halo Forever Bali Weddings Studio, saya tertarik untuk mempelajari lebih lanjut tentang paket upacara adat "Nusantara Heritage".'
        : 'Hello Forever Bali Weddings Studio, I would like to inquire about the "Nusantara Heritage" traditional blessing experience.';
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const inclusions = lang === 'ID' ? NUSANTARA_HERITAGE.inclusionsId : NUSANTARA_HERITAGE.inclusionsEn;

  return (
    <section id="heritage" className="py-24 sm:py-32 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#E5E1D8] bg-[#F7F4EE] mb-4 rounded-sm">
            <span className="text-[#C9A96E] font-serif text-sm">✧</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? NUSANTARA_HERITAGE.eyebrowId : NUSANTARA_HERITAGE.eyebrowEn}
            </span>
          </div>
          
          <h2
            id="heritage-main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-4 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? NUSANTARA_HERITAGE.titleId : NUSANTARA_HERITAGE.titleEn}
          </h2>
          
          <div className="w-16 h-[1.5px] bg-[#C9A96E] mx-auto mb-4" />

          <p className="text-xs uppercase tracking-[0.2em] text-[#888888] font-medium">
            {lang === 'ID' ? NUSANTARA_HERITAGE.subtitleId : NUSANTARA_HERITAGE.subtitleEn}
          </p>
        </div>

        {/* Page 6 Layout: Circular Image + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left: Circular Image Frame matching Page 6 */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-2 border-2 border-[#C9A96E]/50 shadow-2xl bg-white group">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img
                  src={NUSANTARA_HERITAGE.image}
                  alt="Nusantara Heritage Traditional Balinese Blessing"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#222222] text-[#C9A96E] text-[10px] uppercase tracking-[0.2em] font-semibold px-4 py-1.5 rounded-full border border-[#C9A96E]/40 shadow-lg">
                Balinese Blessings
              </div>
            </div>
          </div>

          {/* Right: Text & Key Inclusions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3
              className="text-2xl sm:text-3xl font-serif text-[#222222] font-normal leading-snug mb-4"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {lang === 'ID' ? NUSANTARA_HERITAGE.subtitleId : NUSANTARA_HERITAGE.subtitleEn}
            </h3>

            <p className="text-sm sm:text-base text-[#555555] font-light leading-relaxed mb-8">
              {lang === 'ID' ? NUSANTARA_HERITAGE.descriptionId : NUSANTARA_HERITAGE.descriptionEn}
            </p>

            {/* Inclusions List matching Page 6 of PDF */}
            <div className="space-y-4 mb-8 bg-[#F7F4EE] p-6 sm:p-8 rounded-sm border border-[#E5E1D8]">
              {inclusions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#333333] font-light leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                id="heritage-inquiry-btn"
                href={getWhatsAppHeritageLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 rounded-sm shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{lang === 'ID' ? 'Konsultasi Upacara Adat' : 'Inquire Heritage Blessing'}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
