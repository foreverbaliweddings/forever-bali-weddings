import React, { useState } from 'react';
import {
  Plane,
  Home,
  Ship,
  Coffee,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Compass,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { Language, GuestConciergeService } from '../types';
import { GUEST_CONCIERGE_SERVICES, CONTACT_INFO } from '../data/weddingData';

interface GuestConciergeSectionProps {
  lang: Language;
  onOpenConsultation?: () => void;
}

export const GuestConciergeSection: React.FC<GuestConciergeSectionProps> = ({
  lang,
  onOpenConsultation,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(
    GUEST_CONCIERGE_SERVICES[0]?.id || ''
  );

  const getServiceIcon = (type: GuestConciergeService['iconType']) => {
    switch (type) {
      case 'plane':
        return <Plane className="w-5 h-5" />;
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'ship':
        return <Ship className="w-5 h-5" />;
      case 'coffee':
        return <Coffee className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getServiceWhatsAppUrl = (service: GuestConciergeService) => {
    const text =
      lang === 'ID'
        ? `Halo Forever Bali Weddings Studio, saya tertarik untuk mendiskusikan layanan Guest Concierge: "${service.titleId}". Kami ingin mempersiapkan akomodasi & pengalaman terbaik untuk tamu pernikahan kami.`
        : `Hello Forever Bali Weddings Studio, I would like to inquire about your Guest Concierge service: "${service.titleEn}". We want to arrange a luxury hospitality experience for our destination wedding guests.`;
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const generalConciergeWhatsAppUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    lang === 'ID'
      ? 'Halo Forever Bali Weddings Studio, saya ingin berkonsultasi mengenai layanan Destination Experience & Guest Concierge (akomodasi, airport VIP transfer, sunset cruise & recovery brunch) untuk pernikahan kami di Bali.'
      : 'Hello Forever Bali Weddings Studio, I would like to inquire about your Destination Experience & Guest Concierge services (guest accommodation, airport VIP fast-track, sunset cruise & recovery brunch) for our Bali destination celebration.'
  )}`;

  return (
    <section
      id="concierge"
      className="py-24 sm:py-32 bg-[#FDFBF7] relative overflow-hidden border-t border-[#E5E1D8]"
    >
      <div id="guest-concierge" className="absolute -top-24 left-0" />
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F7F4EE] border border-[#E5E1D8] text-[10px] uppercase tracking-[0.22em] text-[#C9A96E] font-semibold mb-4 rounded-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>
              {lang === 'ID'
                ? 'PENGALAMAN DESTINASI & HOSPITALITY TAMU'
                : 'DESTINATION EXPERIENCE & GUEST CONCIERGE'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#222222] font-normal tracking-tight mb-5"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID'
              ? 'Pengalaman Mewah Bagi Anda & Tamu'
              : 'Destination Experience & Guest Concierge'}
          </h2>

          {/* Micro-copy requirement */}
          <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Kami tidak hanya mengurus hari pernikahan Anda, tetapi menciptakan pengalaman liburan mewah yang berkesan bagi seluruh tamu undangan Anda di Bali.'
              : 'We go beyond the wedding day to curate unforgettable, high-end travel and hospitality experiences for you and your guests in Bali.'}
          </p>

          <div className="w-12 h-0.5 bg-[#C9A96E] mx-auto mt-6" />
        </div>

        {/* 4 Luxury Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {GUEST_CONCIERGE_SERVICES.map((service, index) => {
            const isSelected = activeServiceId === service.id;
            return (
              <div
                key={service.id}
                id={`concierge-card-${service.id}`}
                onClick={() => setActiveServiceId(service.id)}
                className={`group bg-white rounded-sm border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#C9A96E] shadow-xl ring-1 ring-[#C9A96E]/30 -translate-y-1'
                    : 'border-[#E5E1D8] hover:border-[#C9A96E]/60 hover:shadow-lg'
                }`}
              >
                {/* Visual Image Banner with Gradient & Badge */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={lang === 'ID' ? service.titleId : service.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/90 via-[#222222]/40 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-xs text-[#222222] text-[10px] uppercase tracking-[0.16em] font-semibold rounded-xs shadow-xs">
                      {lang === 'ID' ? service.badgeId : service.badgeEn}
                    </span>
                  </div>

                  {/* Step / Number indicator */}
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#222222]/80 border border-[#C9A96E] text-[#C9A96E] text-xs font-serif flex items-center justify-center font-bold">
                    0{index + 1}
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-[#C9A96E] text-xs uppercase tracking-[0.16em] font-medium mb-1">
                      <span className="p-1 bg-[#222222]/60 rounded-xs">
                        {getServiceIcon(service.iconType)}
                      </span>
                      <span>{lang === 'ID' ? service.subtitleId : service.subtitleEn}</span>
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-serif text-white font-medium leading-snug"
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    >
                      {lang === 'ID' ? service.titleId : service.titleEn}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  
                  <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed">
                    {lang === 'ID' ? service.descriptionId : service.descriptionEn}
                  </p>

                  {/* Highlight Points */}
                  <div className="space-y-2.5 pt-4 border-t border-[#F0ECE1]">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] font-semibold">
                      {lang === 'ID' ? 'Fasilitas & Layanan Unggulan:' : 'Signature Inclusions:'}
                    </p>
                    <div className="space-y-2">
                      {(lang === 'ID' ? service.highlightsId : service.highlightsEn).map(
                        (highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5" />
                            <span className="text-xs text-[#444444] font-light leading-relaxed">
                              {highlight}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
                    <a
                      id={`inquire-service-${service.id}`}
                      href={getServiceWhatsAppUrl(service)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-[#C9A96E] hover:text-[#B8985D] transition-colors group/link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>
                        {lang === 'ID'
                          ? 'Konsultasi Layanan Ini'
                          : 'Inquire This Service'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>

                    <span className="text-[10px] text-neutral-400 font-light flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C9A96E]" />
                      Bali Wide
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Global Action Banner with Micro-copy and Direct WhatsApp CTA */}
        <div className="bg-[#222222] rounded-sm p-8 sm:p-12 border border-[#C9A96E]/30 relative overflow-hidden text-center max-w-4xl mx-auto shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ID' ? 'LAYANAN CONCIERGE TERPADU' : 'FULL CONCIERGE SUITE'}</span>
            </div>

            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-normal leading-tight"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {lang === 'ID'
                ? 'Rencanakan Pengalaman Liburan Mewah Tamu Anda'
                : 'Elevate Your Guests’ Destination Experience'}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
              {lang === 'ID'
                ? 'Hubungi tim Concierge kami untuk menyusun itinerary eksklusif, charter helikopter, akomodasi villa privat, dan pelayaran matahari terbenam untuk seluruh tamu undangan Anda.'
                : 'Connect with our dedicated Hospitality Concierge to coordinate seamless airport fast-tracks, villa accommodations, pre-wedding yacht gatherings, and bespoke Bali excursions.'}
            </p>

            {/* Direct CTA as requested */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <a
                id="inquire-guest-concierge-cta"
                href={generalConciergeWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[50px] px-7 py-3.5 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2.5 rounded-sm shadow-lg cursor-pointer group whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span className="whitespace-nowrap">
                  {lang === 'ID' ? 'HUBUNGI VIA WHATSAPP' : 'CHAT ON WHATSAPP'}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </a>

              {onOpenConsultation && (
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto min-h-[50px] px-7 py-3.5 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/20 hover:border-[#C9A96E] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2.5 rounded-sm cursor-pointer whitespace-nowrap"
                >
                  <span className="whitespace-nowrap">
                    {lang === 'ID' ? 'KIRIM FORMULIR' : 'SUBMIT INQUIRY'}
                  </span>
                  <ChevronRight className="w-4 h-4 shrink-0 text-[#C9A96E]" />
                </button>
              )}
            </div>

            <p className="text-[11px] text-neutral-400 font-light pt-2">
              {lang === 'ID'
                ? 'Tersedia layanan kurasi bespoke sesuai kebutuhan & jumlah tamu Anda.'
                : 'Tailored bespoke itineraries available upon private request.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
