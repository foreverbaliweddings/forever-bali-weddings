import React from 'react';
import { Language } from '../types';
import { TRACK_RECORD_STATS } from '../data/weddingData';

interface TrackRecordSectionProps {
  lang: Language;
}

export const TrackRecordSection: React.FC<TrackRecordSectionProps> = ({ lang }) => {
  return (
    <section id="track-record" className="py-24 sm:py-32 bg-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#E5E1D8] bg-white mb-4 rounded-sm">
            <span className="text-[#C9A96E] font-serif text-sm">✧</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'REKAM JEJAK TERBUKTI' : 'PROVEN TRACK RECORD'}
            </span>
          </div>
          
          <h2
            id="track-record-main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? 'Satu Dekade Keunggulan' : 'Decade of Excellence'}
          </h2>
          
          <div className="w-16 h-[1.5px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#555555] font-light font-sans max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Standar integritas dan komitmen tanpa batas yang telah dipercaya oleh pasangan di seluruh belahan dunia.'
              : 'Our uncompromising dedication to total transparency, island mastery, and international standards.'}
          </p>
        </div>

        {/* 3 Metrics Cards matching Page 9 of PDF */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TRACK_RECORD_STATS.map((item, idx) => {
            const label = lang === 'ID' ? item.labelId : item.labelEn;
            const desc = lang === 'ID' ? item.descId : item.descEn;

            return (
              <div
                key={idx}
                id={`track-record-card-${idx}`}
                className="bg-white rounded-sm p-10 border border-[#E5E1D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Big Stat Value */}
                <span
                  className="text-5xl sm:text-6xl font-serif font-light text-[#222222] mb-4 tracking-tight group-hover:text-[#C9A96E] transition-colors"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {item.value}
                </span>

                {/* Subtitle / Label */}
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A96E] mb-4">
                  {label}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-[#666666] font-light leading-relaxed">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
