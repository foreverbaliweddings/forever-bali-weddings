import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/weddingData';

interface FloatingWhatsAppProps {
  lang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  return (
    <div
      id="floating-whatsapp-container"
      className="fixed bottom-6 right-6 z-[1000]"
    >
      {/* Icon-Only Floating WhatsApp Button */}
      <a
        id="floating-whatsapp-btn"
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ring-4 ring-black/20 border border-white/20"
        aria-label={
          lang === 'ID'
            ? 'Konsultasi WhatsApp VIP (+62 813-7007-4777)'
            : 'VIP WhatsApp Concierge (+62 813-7007-4777)'
        }
        title={
          lang === 'ID'
            ? 'Konsultasi WhatsApp VIP (+62 813-7007-4777)'
            : 'VIP WhatsApp Concierge (+62 813-7007-4777)'
        }
      >
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />

        {/* Luxury Gold Online Badge */}
        <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#C9A96E] rounded-full border-2 border-[#111816] z-20 shadow-xs" />
      </a>
    </div>
  );
};
