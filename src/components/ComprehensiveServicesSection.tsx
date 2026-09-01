import React from 'react';
import { Scale, UtensilsCrossed, Sparkles, Palette } from 'lucide-react';
import { Language } from '../types';
import { COMPREHENSIVE_SERVICES } from '../data/weddingData';

interface ComprehensiveServicesSectionProps {
  lang: Language;
}

export const ComprehensiveServicesSection: React.FC<ComprehensiveServicesSectionProps> = ({ lang }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'scale':
        return <Scale className="w-5 h-5" />;
      case 'utensils':
        return <UtensilsCrossed className="w-5 h-5" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'palette':
        return <Palette className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#C9A96E]/40 bg-white mb-4 rounded-sm">
            <span className="text-[#C9A96E] font-serif text-sm">✧</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'EKSEKUSI 360 DERAJAT' : '360-DEGREE EXECUTION'}
            </span>
          </div>
          
          <h2
            id="services-main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? 'Layanan Komprehensif' : 'Comprehensive Services'}
          </h2>
          
          <div className="w-16 h-[1.5px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#555555] font-light font-sans max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Dukungan menyeluruh mulai dari legalitas internasional, seni kuliner gourmet, tata rias editorial, hingga karya seni warisan abadi.'
              : 'End-to-end luxury management covering consular legalities, gourmet gastronomy, humidity-proof bridal styling, and live heirloom painting.'}
          </p>
        </div>

        {/* 4 Cards Grid matching Page 7 of PDF */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {COMPREHENSIVE_SERVICES.map((srv) => {
            const title = lang === 'ID' ? srv.titleId : srv.titleEn;
            const desc = lang === 'ID' ? srv.descriptionId : srv.descriptionEn;

            return (
              <div
                key={srv.id}
                id={`service-card-${srv.id}`}
                className="bg-white rounded-sm p-8 border border-[#E5E1D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
              >
                {/* Circular Icon Pill with Gold Tint */}
                <div className="w-14 h-14 rounded-full bg-[#F7F4EE] border border-[#E5E1D8] text-[#C9A96E] flex items-center justify-center mb-6 group-hover:bg-[#C9A96E] group-hover:text-white transition-colors duration-300">
                  {getIcon(srv.iconName)}
                </div>

                {/* Service Title */}
                <h3
                  className="text-xl font-serif text-[#222222] font-normal mb-4 group-hover:text-[#C9A96E] transition-colors"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {title}
                </h3>

                {/* Service Description */}
                <p className="text-xs sm:text-[13px] text-[#666666] font-light leading-relaxed">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Curated Artisan Partners Quick Spotlight Bar */}
        <div className="mt-12 p-6 sm:p-8 bg-white border border-[#E5E1D8] rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1A2421] text-[#C9A96E] flex items-center justify-center shrink-0 border border-[#C9A96E]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#F7F4EE] px-2.5 py-0.5 rounded-full border border-[#E5E1D8]">
                  {lang === 'ID' ? 'KOLABORASI RESMI' : 'OFFICIAL COLLABORATIONS'}
                </span>
                <span className="text-xs text-[#888888] font-light">Cosma Florist • Ayu Hairstylist</span>
              </div>
              <h4 className="text-base sm:text-lg font-serif text-[#222222] font-medium mt-1">
                {lang === 'ID'
                  ? 'Didukung oleh Artisan Terbaik di Industri Pernikahan Mewah'
                  : 'Empowered by Renowned Master Artisans in Luxury Weddings'}
              </h4>
            </div>
          </div>

          <a
            id="services-view-partners-btn"
            href="#partners"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A2421] hover:bg-[#25332f] text-[#FDFBF7] text-xs font-semibold uppercase tracking-wider rounded-md transition-all shadow-md shrink-0 hover:scale-105"
          >
            <span>{lang === 'ID' ? 'Lihat Profil & Portofolio Artisan' : 'View Artisan Portfolios'}</span>
            <span className="text-[#C9A96E]">→</span>
          </a>
        </div>

      </div>
    </section>
  );
};
