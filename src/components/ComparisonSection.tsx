import React from 'react';
import { Language } from '../types';
import { COMPARISON_ROWS } from '../data/weddingData';

interface ComparisonSectionProps {
  lang: Language;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ lang }) => {
  return (
    <section id="comparison" className="py-24 sm:py-32 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#E5E1D8] bg-[#F7F4EE] mb-4 rounded-sm">
            <span className="text-[#C9A96E] font-serif text-sm">✧</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'RINGKASAN CEPAT' : 'AT A GLANCE'}
            </span>
          </div>
          
          <h2
            id="comparison-main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? 'Perbandingan Paket' : 'Package Comparison'}
          </h2>
          
          <div className="w-16 h-[1.5px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#555555] font-light font-sans max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Tabel komparasi transparan untuk membantu Anda memilih tingkatan paket yang paling sesuai dengan kebutuhan perayaan Anda.'
              : 'A transparent feature matrix to help guide your decision across our three curated collections.'}
          </p>
        </div>

        {/* Comparison Table matching Page 8 of PDF */}
        <div className="max-w-5xl mx-auto overflow-hidden rounded-sm border border-[#E5E1D8] shadow-md bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Dark Luxury Table Header */}
              <thead>
                <tr className="bg-[#111111] text-white">
                  <th className="py-5 px-6 font-serif text-sm sm:text-base font-normal tracking-wide border-b border-white/10 w-1/4">
                    {lang === 'ID' ? 'Fitur / Layanan' : 'Feature / Service'}
                  </th>
                  <th className="py-5 px-6 font-serif text-sm sm:text-base font-normal tracking-wide border-b border-white/10 w-1/4 text-center">
                    {lang === 'ID' ? 'Essential Tier' : 'Essential Tier'}
                  </th>
                  <th className="py-5 px-6 font-serif text-sm sm:text-base font-normal tracking-wide border-b border-white/10 w-1/4 text-center bg-[#1a1a1a] text-[#C9A96E]">
                    {lang === 'ID' ? 'Artisan Tier' : 'Artisan Tier'}
                  </th>
                  <th className="py-5 px-6 font-serif text-sm sm:text-base font-normal tracking-wide border-b border-white/10 w-1/4 text-center">
                    {lang === 'ID' ? 'Signature Elite' : 'Signature Elite'}
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-[#E5E1D8] text-xs sm:text-sm font-light text-[#444444]">
                {COMPARISON_ROWS.map((row, idx) => {
                  const featureName = lang === 'ID' ? row.featureId : row.featureEn;
                  const isInvestmentRow = idx === COMPARISON_ROWS.length - 1;

                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-[#F7F4EE]/60 transition-colors ${
                        isInvestmentRow ? 'bg-[#FDFBF7] font-medium' : ''
                      }`}
                    >
                      <td className="py-4 sm:py-5 px-6 font-medium text-[#222222]">
                        {featureName}
                      </td>
                      <td className={`py-4 sm:py-5 px-6 text-center ${isInvestmentRow ? 'font-serif text-[#C9A96E] font-semibold text-sm sm:text-base' : ''}`}>
                        {row.essential}
                      </td>
                      <td className={`py-4 sm:py-5 px-6 text-center bg-[#F7F4EE]/30 ${isInvestmentRow ? 'font-serif text-[#C9A96E] font-semibold text-sm sm:text-base' : ''}`}>
                        {row.artisan}
                      </td>
                      <td className={`py-4 sm:py-5 px-6 text-center ${isInvestmentRow ? 'font-serif text-[#C9A96E] font-semibold text-sm sm:text-base' : ''}`}>
                        {row.signature}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
