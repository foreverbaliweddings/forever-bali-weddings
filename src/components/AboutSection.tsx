import React from 'react';
import { Sparkles, Globe2, ShieldCheck, Heart, Crown, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { ABOUT_DATA, CONTACT_INFO } from '../data/weddingData';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FDFBF7] relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page 2 Layout: Bespoke Hospitality / About Our Studio Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#E5E1D8] bg-[#F7F4EE] mb-6 rounded-sm w-fit">
              <span className="text-[#C9A96E] font-serif text-sm">✧</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
                {lang === 'ID' ? ABOUT_DATA.eyebrowId : ABOUT_DATA.eyebrowEn}
              </span>
            </div>

            {/* Title */}
            <h2
              id="about-main-title"
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-6 leading-tight"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {lang === 'ID' ? ABOUT_DATA.titleId : ABOUT_DATA.titleEn}
            </h2>

            <div className="w-16 h-[1.5px] bg-[#C9A96E] mb-8" />

            {/* Paragraph 1 from PDF */}
            <p className="text-base sm:text-lg text-[#333333] font-light leading-relaxed font-sans mb-6">
              {lang === 'ID' ? ABOUT_DATA.paragraph1Id : ABOUT_DATA.paragraph1En}
            </p>

            {/* Paragraph 2 from PDF */}
            <p className="text-sm sm:text-base text-[#555555] font-light leading-relaxed font-sans mb-8">
              {lang === 'ID' ? (
                <>
                  Filosofi kami berakar pada <strong className="text-[#222222] font-medium">Minimalisme Modern</strong>—di mana kemegahan alam tropis disempurnakan melalui perencanaan presisi, mitra artisanal terkemuka, dan ketenangan pikiran yang total.
                </>
              ) : (
                <>
                  Our philosophy is rooted in <strong className="text-[#222222] font-medium">Modern Minimalism</strong>—where natural tropical splendor is elevated through meticulous planning, high-end artisanal partners, and total peace of mind.
                </>
              )}
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E5E1D8] mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-[#F7F4EE] border border-[#E5E1D8] flex items-center justify-center text-[#C9A96E] shrink-0 mt-0.5">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#222222]">
                    {lang === 'ID' ? 'Standar Global' : 'International Concierge'}
                  </h4>
                  <p className="text-[11px] text-[#666666] font-light mt-0.5">
                    {lang === 'ID' ? 'Australia, Eropa, AS & Singapura' : 'Australia, Europe, US & SG'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-[#F7F4EE] border border-[#E5E1D8] flex items-center justify-center text-[#C9A96E] shrink-0 mt-0.5">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#222222]">
                    {lang === 'ID' ? 'Mitra Artisanal' : 'Artisanal Partners'}
                  </h4>
                  <p className="text-[11px] text-[#666666] font-light mt-0.5">
                    {lang === 'ID' ? 'Venue tebing & villa eksklusif' : 'Top cliffside & villa venues'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#222222] hover:bg-[#C9A96E] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors rounded-sm"
              >
                <span>{lang === 'ID' ? 'Konsultasi Perencanaan' : 'Start Planning Voyage'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Image Column (Matching Page 2) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-sm overflow-hidden border border-[#E5E1D8] shadow-xl group">
              <img
                src={ABOUT_DATA.image}
                alt="About Forever Bali Weddings Studio"
                className="w-full h-[460px] sm:h-[540px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#FDFBF7]/90 backdrop-blur-md border border-[#E5E1D8] text-[#222222] rounded-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold">
                    {lang === 'ID' ? 'Pengalaman Teruji' : 'Proven Heritage'}
                  </p>
                  <p className="font-serif text-base sm:text-lg font-light text-[#222222]">
                    {lang === 'ID' ? 'Satu Dekade Harmoni Bali' : 'A Decade of Harmonized Luxury'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl sm:text-3xl text-[#C9A96E] font-light">10+</span>
                  <p className="text-[9px] uppercase tracking-widest text-[#666666]">Years</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
