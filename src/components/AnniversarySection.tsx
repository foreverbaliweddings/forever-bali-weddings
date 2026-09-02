import React, { useState } from 'react';
import {
  HeartHandshake,
  Sparkles,
  Calendar,
  Camera,
  UtensilsCrossed,
  Palmtree,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Gift,
  Star,
  Award,
  ChevronRight,
} from 'lucide-react';
import { Language, AnniversaryOffering } from '../types';
import { ANNIVERSARY_OFFERINGS, CONTACT_INFO } from '../data/weddingData';

interface AnniversarySectionProps {
  lang: Language;
  onOpenConsultation?: () => void;
}

export const AnniversarySection: React.FC<AnniversarySectionProps> = ({
  lang,
  onOpenConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<string>(ANNIVERSARY_OFFERINGS[0]?.id || '');

  const getOfferingWhatsAppUrl = (offering: AnniversaryOffering) => {
    const message =
      lang === 'ID'
        ? `Halo Forever Bali Weddings Studio, saya tertarik untuk mendiskusikan "${offering.titleId}". Kami ingin merencanakan momen anniversary / vow renewal spesial di Bali.`
        : `Hello Forever Bali Weddings Studio, I would love to discuss "${offering.titleEn}". We are planning a milestone anniversary / vow renewal celebration in Bali.`;

    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const generalAnniversaryWhatsAppUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    lang === 'ID'
      ? 'Halo Forever Bali Weddings Studio, saya ingin berkonsultasi mengenai perayaan Anniversary & Vow Renewal di Bali untuk memperingati ulang tahun pernikahan kami.'
      : 'Hello Forever Bali Weddings Studio, I would like to plan our milestone Anniversary Trip & Vow Renewal in Bali.'
  )}`;

  return (
    <section
      id="anniversary"
      className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-[#E5E1D8]"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F7F4EE] border border-[#E5E1D8] text-[10px] uppercase tracking-[0.22em] text-[#C9A96E] font-semibold mb-4 rounded-sm">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>
              {lang === 'ID'
                ? 'FOREVER COUPLES & LOYALTY PRIVILEGES'
                : 'FOREVER COUPLES & LOYALTY PRIVILEGES'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#222222] font-normal tracking-tight mb-5"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID'
              ? 'Forever Couples & Anniversary Celebrations'
              : 'Forever Couples & Anniversary Celebrations'}
          </h2>

          {/* Micro-copy requirement */}
          <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Perjalanan Anda tidak berakhir di pelaminan. Kami siap merancang perayaan ulang tahun pernikahan dan pembaruan janji suci Anda di Bali.'
              : "Your journey doesn't end at the altar. We continue to curate your milestone anniversaries and vow renewals in Bali."}
          </p>

          <div className="w-12 h-0.5 bg-[#C9A96E] mx-auto mt-6" />
        </div>

        {/* Loyalty Alumni Banner Card */}
        <div className="mb-14 bg-[#FDFBF7] border border-[#E5E1D8] rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[#222222] text-[#C9A96E] flex items-center justify-center shrink-0 shadow-xs border border-[#C9A96E]/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.16em] text-[#C9A96E] font-semibold">
                  {lang === 'ID' ? 'PROGRAM FOREVER ALUMNI' : 'FOREVER ALUMNI PROGRAM'}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-xs">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Lifetime Privilege
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#444444] font-light mt-0.5">
                {lang === 'ID'
                  ? 'Bagi pasangan alumni Forever Bali: Nikmati upgrade villa komplimen, complimentary sunset champagne toast, dan prioritas fotografer senior.'
                  : 'For past Forever Bali couples: Enjoy complimentary villa room upgrades, sunset champagne service, and priority access to senior artists.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs text-[#888888] font-light">
              {lang === 'ID' ? 'Berlaku Seumur Hidup' : 'Lifetime Access'}
            </span>
          </div>
        </div>

        {/* Offerings Grid: Vow Renewals & Dedicated Anniversary Trip Planning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {ANNIVERSARY_OFFERINGS.map((offering, idx) => {
            const isSelected = activeTab === offering.id;
            return (
              <div
                key={offering.id}
                id={`anniversary-offering-${offering.id}`}
                onClick={() => setActiveTab(offering.id)}
                className={`bg-white rounded-sm border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#C9A96E] shadow-xl ring-1 ring-[#C9A96E]/30 -translate-y-1'
                    : 'border-[#E5E1D8] hover:border-[#C9A96E]/60 hover:shadow-lg'
                }`}
              >
                {/* Visual Image Header */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={offering.imageUrl}
                    alt={lang === 'ID' ? offering.titleId : offering.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/90 via-[#222222]/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/95 text-[#222222] text-[10px] uppercase tracking-[0.16em] font-semibold rounded-xs shadow-xs">
                      {lang === 'ID' ? offering.badgeId : offering.badgeEn}
                    </span>
                    <span className="ml-2 px-3 py-1 bg-[#222222]/80 border border-[#C9A96E]/50 text-[#C9A96E] text-[10px] uppercase tracking-[0.14em] font-medium rounded-xs backdrop-blur-xs">
                      {lang === 'ID' ? offering.milestoneId : offering.milestoneEn}
                    </span>
                  </div>

                  {/* Bottom Text in Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[#C9A96E] text-xs uppercase tracking-[0.18em] font-medium mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{lang === 'ID' ? offering.subtitleId : offering.subtitleEn}</span>
                    </p>
                    <h3
                      className="text-xl sm:text-2xl font-serif text-white font-medium leading-snug"
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    >
                      {lang === 'ID' ? offering.titleId : offering.titleEn}
                    </h3>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 bg-white">
                  
                  <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed">
                    {lang === 'ID' ? offering.descriptionId : offering.descriptionEn}
                  </p>

                  {/* Curated Inclusions List */}
                  <div className="space-y-3 pt-4 border-t border-[#F0ECE1]">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] font-semibold">
                      {lang === 'ID' ? 'Fasilitas & Kurasi Eksklusif:' : 'Curated Inclusions & Features:'}
                    </p>

                    <div className="space-y-2.5">
                      {(lang === 'ID' ? offering.featuresId : offering.featuresEn).map(
                        (feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-[#C9A96E]/15 text-[#C9A96E] flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" />
                            </div>
                            <span className="text-xs text-[#444444] font-light leading-relaxed">
                              {feat}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-5 border-t border-[#F0ECE1] flex items-center justify-between">
                    <a
                      id={`inquire-offering-${offering.id}`}
                      href={getOfferingWhatsAppUrl(offering)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#C9A96E] hover:text-[#B8985D] transition-colors group/link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>
                        {lang === 'ID'
                          ? 'Konsultasi Paket Ini'
                          : 'Inquire This Offering'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>

                    <span className="text-[11px] text-neutral-400 font-light flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5 text-[#C9A96E]" />
                      Customized
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Action Trigger Banner */}
        <div className="bg-[#222222] rounded-sm p-8 sm:p-12 border border-[#C9A96E]/30 relative overflow-hidden text-center max-w-4xl mx-auto shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ID' ? 'KONSULTASI PERAYAAN ULANG TAHUN PERNIKAHAN' : 'ANNIVERSARY CELEBRATION CONCIERGE'}</span>
            </div>

            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-normal leading-tight"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {lang === 'ID'
                ? 'Rayakan Kembali Babak Baru Kisah Cinta Anda di Bali'
                : 'Recommit Your Vows & Celebrate Your Next Chapter'}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
              {lang === 'ID'
                ? 'Baik untuk perayaan 5 tahun, 10 tahun, maupun liburan intim berdua, tim desainer Forever Bali Weddings siap merangkai setiap detail momen istimewa Anda.'
                : 'Whether celebrating a 5th, 10th milestone or an intimate couple escape, our dedicated planners craft every moment with refined intimacy and grace.'}
            </p>

            {/* Direct Action Button as specified */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <a
                id="plan-anniversary-trip-btn"
                href={generalAnniversaryWhatsAppUrl}
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

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-light pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>
                {lang === 'ID'
                  ? 'Konsultasi privat & jadwal fleksibel disesuaikan dengan rencana perjalanan Anda.'
                  : 'Private consultation & flexible scheduling tailored to your Bali travel dates.'}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
