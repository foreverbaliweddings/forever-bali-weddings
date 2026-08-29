import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  FileText,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  MessageCircle,
  Calendar,
  Users,
  Mail,
  User,
  Phone,
} from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/weddingData';
import { generateLuxuryWeddingGuidePDF } from '../utils/generateGuidePdf';

interface WeddingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const WeddingGuideModal: React.FC<WeddingGuideModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('50 Guests');

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    whatsappNumber?: string;
    eventDate?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Support ESC keyboard trigger & global close-all-modals to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      }
    };
    const handleGlobalClose = () => {
      onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('close-all-modals', handleGlobalClose);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('close-all-modals', handleGlobalClose);
    };
  }, [isOpen, onClose]);

  // Countdown timer for automatic WhatsApp redirection upon successful submission
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitted && redirectCountdown !== null && redirectCountdown > 0) {
      timer = setTimeout(() => {
        setRedirectCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (isSubmitted && redirectCountdown === 0) {
      // Execute WhatsApp nurturing redirect
      const waUrl = getWhatsAppNurtureUrl();
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setRedirectCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [isSubmitted, redirectCountdown]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      whatsappNumber?: string;
      eventDate?: string;
    } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name =
        lang === 'ID'
          ? 'Mohon masukkan nama lengkap Anda (minimal 2 karakter).'
          : 'Please enter your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email =
        lang === 'ID'
          ? 'Mohon masukkan alamat email yang valid.'
          : 'Please enter a valid email address.';
    }

    if (!whatsappNumber.trim() || whatsappNumber.trim().length < 6) {
      newErrors.whatsappNumber =
        lang === 'ID'
          ? 'Mohon masukkan nomor WhatsApp yang aktif.'
          : 'Please enter an active WhatsApp number with country code.';
    }

    if (!eventDate.trim()) {
      newErrors.eventDate =
        lang === 'ID'
          ? 'Mohon cantumkan perkiraan tanggal atau bulan pernikahan (misal: Q3 2026 atau Oktober 2026).'
          : 'Please enter estimated wedding date/month (e.g. October 2026 or Spring 2027).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getWhatsAppNurtureUrl = () => {
    const formattedGuestCount = guestCount || '50 Guests';
    const formattedDate = eventDate.trim() || '2026/2027';
    const formattedName = name.trim() || 'Valued Couple';

    // Format requested by user:
    // "Hello Forever Bali Weddings, I just requested the 2026 Wedding Guide for [Name]. I am planning a wedding for approximately [Guest Count] guests around [Event Date]."
    const message =
      lang === 'ID'
        ? `Hello Forever Bali Weddings, I just requested the 2026 Wedding Guide for ${formattedName}. I am planning a wedding for approximately ${formattedGuestCount} around ${formattedDate}.`
        : `Hello Forever Bali Weddings, I just requested the 2026 Wedding Guide for ${formattedName}. I am planning a wedding for approximately ${formattedGuestCount} around ${formattedDate}.`;

    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const leadData = {
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsappNumber.trim(),
      eventDate: eventDate.trim(),
      guestCount: guestCount,
      country: 'International / Indonesia',
    };

    // 1. Generate & Trigger Instant PDF Download
    try {
      generateLuxuryWeddingGuidePDF(leadData, lang);
    } catch (err) {
      console.error('Failed to trigger PDF download:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    // Start 3 second countdown for automatic WhatsApp router transition
    setRedirectCountdown(3);
  };

  return (
    <div
      id="wedding-guide-modal-overlay"
      className="fixed inset-0 z-[10001] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="wedding-guide-modal-card"
        className="relative max-w-2xl w-full bg-[#1A2421] text-[#FDFBF7] rounded-sm border border-[#C9A96E]/40 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          type="button"
          aria-label="Close guide modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-[#C9A96E] border border-white/20 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Banner */}
        <div className="p-6 sm:p-8 pb-4 border-b border-white/10 bg-gradient-to-r from-[#1A2421] via-[#24312D] to-[#1A2421]">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 border border-[#C9A96E]/40 bg-[#C9A96E]/10 rounded-xs mb-3">
            <Sparkles className="w-3 h-3 text-[#C9A96E]" />
            <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'UNDUH PANDUAN RESMI 2026' : 'BESPOKE 2026 WEDDING GUIDE'}
            </span>
          </div>

          <h3
            className="text-2xl sm:text-3xl font-serif font-light text-white leading-snug"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            2026 Bali Luxury Destination Wedding Guide (PDF)
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1.5 leading-relaxed">
            {lang === 'ID'
              ? 'Dapatkan katalog lengkap estimasi investasi, 30+ enklave privat off-market, checklist legal, dan panduan perencanaan 5 tahap langsung ke perangkat Anda.'
              : 'Receive our complete 2026 investment portfolio, 30+ off-market private sanctuary directory, legal marriage checklist, and 5-stage destination roadmap.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Field 1: Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] text-[#C9A96E] font-semibold mb-1.5">
                  {lang === 'ID' ? 'Nama Lengkap Calon Pengantin *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder={lang === 'ID' ? 'cth. Jessica & Alexander' : 'e.g. Jessica & Alexander'}
                    className={`w-full bg-white/5 border ${
                      errors.name ? 'border-red-400' : 'border-white/15 focus:border-[#C9A96E]'
                    } rounded-xs py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#C9A96E] transition-all`}
                  />
                </div>
                {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* Two Column Row: Email & WhatsApp Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field 2: Email */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] text-[#C9A96E] font-semibold mb-1.5">
                    {lang === 'ID' ? 'Alamat Email *' : 'Email Address *'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="alexander@domain.com"
                      className={`w-full bg-white/5 border ${
                        errors.email ? 'border-red-400' : 'border-white/15 focus:border-[#C9A96E]'
                      } rounded-xs py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#C9A96E] transition-all`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Field 3: WhatsApp Number */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] text-[#C9A96E] font-semibold mb-1.5">
                    {lang === 'ID' ? 'Nomor WhatsApp *' : 'WhatsApp Number *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={whatsappNumber}
                      onChange={(e) => {
                        setWhatsappNumber(e.target.value);
                        if (errors.whatsappNumber) setErrors((prev) => ({ ...prev, whatsappNumber: undefined }));
                      }}
                      placeholder="+61 400 000 000 / +62 812..."
                      className={`w-full bg-white/5 border ${
                        errors.whatsappNumber ? 'border-red-400' : 'border-white/15 focus:border-[#C9A96E]'
                      } rounded-xs py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#C9A96E] transition-all`}
                    />
                  </div>
                  {errors.whatsappNumber && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.whatsappNumber}</p>
                  )}
                </div>
              </div>

              {/* Two Column Row: Estimated Event Date & Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field 4: Estimated Event Date */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] text-[#C9A96E] font-semibold mb-1.5">
                    {lang === 'ID' ? 'Perkiraan Tanggal / Periode *' : 'Estimated Event Date *'}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={eventDate}
                      onChange={(e) => {
                        setEventDate(e.target.value);
                        if (errors.eventDate) setErrors((prev) => ({ ...prev, eventDate: undefined }));
                      }}
                      placeholder={lang === 'ID' ? 'cth. Oktober 2026 atau Q3 2026' : 'e.g. October 2026 or Spring 2027'}
                      className={`w-full bg-white/5 border ${
                        errors.eventDate ? 'border-red-400' : 'border-white/15 focus:border-[#C9A96E]'
                      } rounded-xs py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#C9A96E] transition-all`}
                    />
                  </div>
                  {errors.eventDate && <p className="text-[11px] text-red-400 mt-1">{errors.eventDate}</p>}
                </div>

                {/* Field 5: Guest Count */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] text-[#C9A96E] font-semibold mb-1.5">
                    {lang === 'ID' ? 'Estimasi Jumlah Tamu *' : 'Estimated Guest Count *'}
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-[#1A2421] border border-white/15 focus:border-[#C9A96E] rounded-xs py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#C9A96E] transition-all cursor-pointer"
                    >
                      <option value="2-15 Guests (Elopement)">2 - 15 Guests (Intimate Elopement)</option>
                      <option value="20-50 Guests">20 - 50 Guests (Intimate Villa)</option>
                      <option value="50-100 Guests">50 - 100 Guests (Medium Clifftop/Resort)</option>
                      <option value="100-150 Guests">100 - 150 Guests (Grand Beachfront)</option>
                      <option value="150+ Guests">150+ Guests (Royal Destination Event)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-3">
                <button
                  id="submit-guide-download-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 rounded-xs shadow-lg group cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? lang === 'ID'
                        ? 'MEMPROSES PANDUAN...'
                        : 'GENERATING PDF GUIDE...'
                      : lang === 'ID'
                      ? 'UNDUH PDF & SAMBUNGKAN KE WHATSAPP'
                      : 'DOWNLOAD PDF & CONNECT TO WHATSAPP'}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-white/50 font-light mt-3">
                  <Lock className="w-3 h-3 text-[#C9A96E]" />
                  <span>
                    {lang === 'ID'
                      ? 'Privasi 100% aman. Panduan resmi langsung terunduh & terhubung ke WhatsApp Studio.'
                      : '100% Privacy guaranteed. Instant PDF download & immediate WhatsApp VIP routing.'}
                  </span>
                </div>
              </div>

            </form>
          ) : (
            /* Success State with WhatsApp Nurturing Router */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4
                  className="text-2xl font-serif font-light text-white mb-2"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {lang === 'ID' ? 'Panduan Berhasil Terunduh!' : 'Wedding Guide Downloaded!'}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
                  {lang === 'ID'
                    ? `Terima kasih, ${name}. Dokumen 2026 Bali Luxury Destination Wedding Guide telah terunduh ke perangkat Anda.`
                    : `Thank you, ${name}. The 2026 Bali Luxury Destination Wedding Guide has been generated and downloaded.`}
                </p>
              </div>

              {/* Nurturing Redirect Card */}
              <div className="p-5 bg-black/40 border border-[#C9A96E]/40 rounded-xs text-left space-y-3">
                <div className="flex items-center justify-between text-xs text-[#C9A96E] font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 fill-current" />
                    WhatsApp VIP Nurturing
                  </span>
                  {redirectCountdown !== null && (
                    <span className="text-[11px] font-mono text-white/60">
                      Redirecting in {redirectCountdown}s...
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-300 font-mono bg-white/5 p-3 rounded-xs border border-white/10 leading-relaxed">
                  "Hello Forever Bali Weddings, I just requested the 2026 Wedding Guide for {name}. I am planning a wedding for approximately {guestCount} around {eventDate}."
                </p>

                <a
                  id="nurture-whatsapp-direct-link"
                  href={getWhatsAppNurtureUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all rounded-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{lang === 'ID' ? 'BUKA WHATSAPP SEKARANG' : 'LAUNCH WHATSAPP CONCIERGE NOW'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    generateLuxuryWeddingGuidePDF(
                      {
                        name,
                        email,
                        whatsapp: whatsappNumber,
                        eventDate,
                        guestCount,
                      },
                      lang
                    );
                  }}
                  className="text-[#C9A96E] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'ID' ? 'Unduh Ulang Dokumen' : 'Re-download PDF'}</span>
                </button>

                <span className="text-white/30">•</span>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-white/60 hover:text-white cursor-pointer"
                >
                  {lang === 'ID' ? 'Tutup Jendela' : 'Close Modal'}
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
