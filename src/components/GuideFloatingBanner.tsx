import React, { useState, useEffect } from 'react';
import { FileText, Download, X, Sparkles, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface GuideFloatingBannerProps {
  lang: Language;
  onOpenGuideModal: () => void;
}

export const GuideFloatingBanner: React.FC<GuideFloatingBannerProps> = ({
  lang,
  onOpenGuideModal,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show banner after 2.5 seconds for subtle luxury lead capture
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  return (
    <aside
      id="guide-floating-banner"
      aria-label="Wedding guide lead capture"
      className="fixed bottom-6 left-4 sm:left-6 z-[990] max-w-sm w-[calc(100vw-2rem)] sm:w-auto bg-[#1A2421]/95 text-[#FDFBF7] backdrop-blur-md border border-[#C9A96E]/50 rounded-sm shadow-2xl p-4 transition-all duration-500 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-start justify-between gap-3">
        
        {/* Guide Icon & Badge */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xs bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{lang === 'ID' ? 'PANDUAN EKSKLUSIF 2026' : '2026 WEDDING GUIDE'}</span>
            </div>

            <h4
              className="text-xs sm:text-sm font-serif font-normal text-white leading-snug"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {lang === 'ID'
                ? 'Unduh Panduan Pernikahan Bali & Katalog Biaya (PDF)'
                : 'Download 2026 Luxury Bali Wedding Guide (PDF)'}
            </h4>

            <p className="text-[11px] text-neutral-300 font-light line-clamp-2">
              {lang === 'ID'
                ? '30+ Venue privat, estimasi anggaran, & panduan legal lengkap.'
                : 'Curated 30+ private venues, price matrix & legal blueprint.'}
            </p>

            {/* Trigger Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onOpenGuideModal();
                }}
                className="px-3.5 py-1.5 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-[10px] uppercase tracking-[0.16em] font-semibold rounded-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group"
              >
                <Download className="w-3 h-3" />
                <span>{lang === 'ID' ? 'Unduh Gratis Sekarang' : 'Get Free PDF Guide'}</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Close / Dismiss Button */}
        <button
          type="button"
          aria-label="Dismiss banner"
          onClick={() => {
            setIsVisible(false);
            setIsDismissed(true);
          }}
          className="text-white/50 hover:text-white p-1 rounded-xs hover:bg-white/10 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </aside>
  );
};
