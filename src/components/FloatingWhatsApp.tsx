import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/weddingData';

interface FloatingWhatsAppProps {
  lang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div
      id="floating-whatsapp-container"
      className="fixed bottom-6 right-6 z-40 flex items-end gap-3"
    >
      {/* Friendly Invitation Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-3 bg-white text-[#222222] py-2.5 px-4 rounded-sm shadow-lg border border-[#E5E1D8] text-xs tracking-wide animate-fadeIn">
          <div className="flex flex-col">
            <span className="font-serif text-[#222222] font-normal text-xs">
              Forever Bali Wedding
            </span>
            <span className="text-[10px] text-[#555555] font-light">
              {lang === 'ID'
                ? 'Ada pertanyaan seputar paket wedding Bali?'
                : 'Need help planning your Bali wedding?'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button with gold luxury styling */}
      <a
        id="floating-whatsapp-btn"
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Direct WhatsApp Consultation"
      >
        <MessageCircle className="w-6 h-6 fill-current relative z-10" />

        {/* Small Gold Online Badge */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-[#C9A96E] rounded-full border-2 border-white z-20" />
      </a>
    </div>
  );
};
