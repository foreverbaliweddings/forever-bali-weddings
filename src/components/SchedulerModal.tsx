import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  Video,
  MessageCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Lock,
  Globe,
  Users,
  ShieldCheck,
} from 'lucide-react';

/**
 * Multi-Language Dictionary for Ultra-Luxury Concierge Modal
 */
const DICTIONARY = {
  en: {
    badge: 'ARIA VIP CONCIERGE DESK',
    title: 'Schedule Your Discovery Session',
    subtitle:
      'Begin your bespoke destination journey. Select your preferred consultation format and private advisory window.',
    steps: {
      type: 'Consultation',
      datetime: 'Date & Time',
      details: 'Your Details',
    },
    types: {
      zoom: {
        title: '15-Min VIP Discovery Video Call',
        desc: 'Private high-touch video session via Zoom with Senior Director Aria. Visual mood board & portfolio walkthrough.',
        badge: 'Recommended for Global Couples',
      },
      whatsapp: {
        title: 'Direct VIP WhatsApp Discussion',
        desc: 'Instant priority correspondence, voice notes, off-market estate brochures & live date checks.',
        badge: 'Fast-Track Escalation',
      },
    },
    timeSlots: {
      morning: {
        title: 'Morning Sanctuary',
        time: '09:00 – 12:00 WITA (Bali Time)',
        desc: 'Ideal for Australia, NZ & East Asia timezones',
      },
      afternoon: {
        title: 'Afternoon Meridian',
        time: '13:00 – 16:30 WITA (Bali Time)',
        desc: 'Ideal for Asia & Western Australia',
      },
      sunset: {
        title: 'Sunset Twilight',
        time: '17:00 – 20:00 WITA (Bali Time)',
        desc: 'Ideal for Europe, UK & Middle East timezones',
      },
    },
    form: {
      nameLabel: 'Full Name(s)',
      namePlaceholder: 'e.g., Lady Eleanor & Lord Julian',
      emailLabel: 'Email Address',
      emailPlaceholder: 'client@domain.com',
      phoneLabel: 'WhatsApp Number (with Country Code)',
      phonePlaceholder: '+61 400 123 456 / +1 (555) 000-0000',
      guestLabel: 'Estimated Guest Count',
      guestPlaceholder: 'e.g., 30–50 Guests (Private Villa)',
      targetDateLabel: 'Target Wedding Date / Quarter',
      targetDatePlaceholder: 'e.g., October 2026 / Q3 2027',
      regionLabel: 'Preferred Region in Bali',
      notesLabel: 'Special Requests / Venue Preferences',
      notesPlaceholder: 'e.g., Cliff-edge sunset ceremony with helicopter arrival...',
    },
    buttons: {
      next: 'Continue to Schedule',
      back: 'Previous',
      submit: 'CONFIRM DISCOVERY SESSION VIA WHATSAPP',
      submitting: 'Preparing VIP Routing...',
    },
    guarantee:
      'Discreet & Confidential. Direct routing to Lead Wedding Planner Studio (+62 813-7007-4777).',
  },
  id: {
    badge: 'MEJA KONSULTASI VIP ARIA',
    title: 'Jadwalkan Sesi Konsultasi Eksklusif',
    subtitle:
      'Awali perancangan pernikahan impian Anda di Bali. Pilih format konsultasi dan waktu yang paling sesuai untuk Anda.',
    steps: {
      type: 'Tipe Sesi',
      datetime: 'Tanggal & Waktu',
      details: 'Data Kontak',
    },
    types: {
      zoom: {
        title: '15 Menit VIP Video Discovery Call',
        desc: 'Sesi video tatap muka privat via Zoom bersama Senior Director Aria. Pembahasan konsep, mood board & venue.',
        badge: 'Rekomendasi Internasional',
      },
      whatsapp: {
        title: 'Diskusi Langsung VIP via WhatsApp',
        desc: 'Konsultasi cepat via pesan & voice note, katalog venue off-market, serta pengecekan tanggal prioritas.',
        badge: 'Jalur Cepat Fast-Track',
      },
    },
    timeSlots: {
      morning: {
        title: 'Sesi Pagi (Morning Sanctuary)',
        time: '09:00 – 12:00 WITA (Waktu Bali)',
        desc: 'Cocok untuk zona waktu WIB, WITA, & Australia',
      },
      afternoon: {
        title: 'Sesi Siang (Afternoon Meridian)',
        time: '13:00 – 16:30 WITA (Waktu Bali)',
        desc: 'Waktu ideal untuk diskusi mendalam',
      },
      sunset: {
        title: 'Sesi Senja (Sunset Twilight)',
        time: '17:00 – 20:00 WITA (Waktu Bali)',
        desc: 'Nyaman untuk zona waktu Eropa & Timur Tengah',
      },
    },
    form: {
      nameLabel: 'Nama Lengkap Calon Pengantin',
      namePlaceholder: 'contoh: Nadia & Adrian Pratama',
      emailLabel: 'Alamat Email',
      emailPlaceholder: 'nama@domain.com',
      phoneLabel: 'Nomor WhatsApp (dengan Kode Negara)',
      phonePlaceholder: '+62 812 3456 7890',
      guestLabel: 'Perkiraan Jumlah Undangan',
      guestPlaceholder: 'contoh: 50 Tamu (Private Villa Buyout)',
      targetDateLabel: 'Target Tanggal / Bulan Pernikahan',
      targetDatePlaceholder: 'contoh: Oktober 2026 / Kuartal 3 2027',
      regionLabel: 'Wilayah Pilihan di Bali',
      notesLabel: 'Preferensi Khusus / Catatan Tambahan',
      notesPlaceholder: 'contoh: Upacara sunset tepi tebing Uluwatu dengan fine dining...',
    },
    buttons: {
      next: 'Lanjutkan Jadwal',
      back: 'Kembali',
      submit: 'KONFIRMASI JADWAL VIA WHATSAPP VIP',
      submitting: 'Menyiapkan Jalur VIP...',
    },
    guarantee:
      'Privasi Terjamin. Terhubung langsung ke WhatsApp Studio Direktur (+62 813-7007-4777).',
  },
};

const REGIONS = [
  'Uluwatu & Bukit Peninsula',
  'Ubud & Sayan Valley',
  'Canggu, Pererenan & Seseh',
  'Nusa Dua & Jimbaran',
  'Undecided / Open to Aria’s Recommendation',
];

/**
 * SchedulerModal Component
 *
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Closes the modal
 * @param {'en' | 'id'} lang - Selected language
 * @param {object} currency - Currency object { code: 'USD', symbol: '$' }
 */
export default function SchedulerModal({
  isOpen = false,
  onClose,
  lang = 'en',
  currency = { code: 'USD', symbol: '$' },
}) {
  const t = DICTIONARY[lang] || DICTIONARY.en;

  // Step Management
  const [step, setStep] = useState(1);

  // Form State
  const [consultationType, setConsultationType] = useState('zoom'); // 'zoom' | 'whatsapp'
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('sunset'); // 'morning' | 'afternoon' | 'sunset'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    guestCount: '',
    targetDate: '',
    region: REGIONS[0],
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set minimum date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setPreferredDate(dateStr);
  }, []);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setStep(1); // Reset step on close
      setErrors({});
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Form validation
  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = lang === 'id' ? 'Nama wajib diisi' : 'Full name is required';
    }
    if (!formData.whatsapp.trim()) {
      errs.whatsapp =
        lang === 'id' ? 'Nomor WhatsApp wajib diisi' : 'WhatsApp number is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email =
        lang === 'id' ? 'Alamat email tidak valid' : 'Valid email is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Final WhatsApp Routing Protocol
  const handleConfirm = () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);

    const typeLabel =
      consultationType === 'zoom'
        ? 'VIP 15-Min Zoom Discovery Call'
        : 'Direct VIP WhatsApp Discussion';

    const slotLabel =
      preferredSlot === 'morning'
        ? 'Morning (09:00 - 12:00 WITA)'
        : preferredSlot === 'afternoon'
        ? 'Afternoon (13:00 - 16:30 WITA)'
        : 'Sunset (17:00 - 20:00 WITA)';

    // Constructing high-touch formatted pre-filled message
    let message = '';
    if (lang === 'id') {
      message =
        `Halo Forever Bali Weddings & Aria,\n\n` +
        `Saya ingin mengonfirmasi penjadwalan Sesi Konsultasi Discovery VIP:\n\n` +
        `• Nama Klien: ${formData.fullName}\n` +
        `• Format Sesi: ${typeLabel}\n` +
        `• Preferensi Tanggal: ${preferredDate}\n` +
        `• Slot Waktu: ${slotLabel}\n` +
        `• Perkiraan Undangan: ${formData.guestCount || 'Belum Ditentukan'}\n` +
        `• Target Acara: ${formData.targetDate || '2026/2027'}\n` +
        `• Wilayah Pilihan: ${formData.region}\n` +
        `• Preferensi Mata Uang: ${currency.code || 'USD'}\n` +
        (formData.notes ? `• Catatan Khusus: ${formData.notes}\n\n` : `\n`) +
        `Mohon konfirmasi ketersediaan slot Aria dan tautan pertemuannya. Terima kasih.`;
    } else {
      message =
        `Hello Forever Bali Weddings & Aria,\n\n` +
        `I would like to confirm my VIP Discovery Consultation booking:\n\n` +
        `• Client Name: ${formData.fullName}\n` +
        `• Format: ${typeLabel}\n` +
        `• Preferred Date: ${preferredDate}\n` +
        `• Time Slot: ${slotLabel}\n` +
        `• Guest Count: ${formData.guestCount || 'To be determined'}\n` +
        `• Target Event Date: ${formData.targetDate || '2026 / 2027'}\n` +
        `• Preferred Region: ${formData.region}\n` +
        `• Preferred Currency: ${currency.code || 'USD'}\n` +
        (formData.notes ? `• Special Notes: ${formData.notes}\n\n` : `\n`) +
        `Could you please confirm Aria's calendar availability and provide the meeting link? Thank you.`;
    }

    const waUrl = `https://wa.me/6281370074777?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      if (onClose) onClose();
    }, 400);
  };

  return (
    <div
      id="scheduler-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Modal Container */}
      <div
        id="scheduler-modal-card"
        className="relative w-full max-w-2xl bg-[#111816] text-[#FDFBF7] border border-[#C9A96E]/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#C9A96E]/15 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 sm:px-8 sm:pt-8 border-b border-white/5 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#C9A96E]/15 border border-[#C9A96E]/40 rounded-xs mb-2">
              <Sparkles className="w-3 h-3 text-[#C9A96E]" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold">
                {t.badge}
              </span>
            </div>
            <h2
              id="scheduler-title"
              className="text-xl sm:text-2xl font-serif text-[#C9A96E] font-normal tracking-wide"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {t.title}
            </h2>
            <p className="text-xs text-[#8A9A86] mt-1 max-w-lg font-light leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <button
            id="scheduler-close-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-white/60 hover:text-[#C9A96E] hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="px-6 sm:px-8 py-3 bg-[#1A2421]/60 border-b border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 1
                  ? 'bg-[#C9A96E] text-[#111816]'
                  : 'bg-white/10 text-white/40'
              }`}
            >
              1
            </span>
            <span
              className={`text-[11px] uppercase tracking-wider ${
                step === 1 ? 'text-[#C9A96E] font-semibold' : 'text-white/40'
              }`}
            >
              {t.steps.type}
            </span>
          </div>

          <div className="w-8 h-[1px] bg-white/10" />

          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 2
                  ? 'bg-[#C9A96E] text-[#111816]'
                  : 'bg-white/10 text-white/40'
              }`}
            >
              2
            </span>
            <span
              className={`text-[11px] uppercase tracking-wider ${
                step === 2 ? 'text-[#C9A96E] font-semibold' : 'text-white/40'
              }`}
            >
              {t.steps.datetime}
            </span>
          </div>

          <div className="w-8 h-[1px] bg-white/10" />

          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 3
                  ? 'bg-[#C9A96E] text-[#111816]'
                  : 'bg-white/10 text-white/40'
              }`}
            >
              3
            </span>
            <span
              className={`text-[11px] uppercase tracking-wider ${
                step === 3 ? 'text-[#C9A96E] font-semibold' : 'text-white/40'
              }`}
            >
              {t.steps.details}
            </span>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="px-6 py-6 sm:px-8 sm:py-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
          {/* STEP 1: Consultation Type Selection */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] font-semibold">
                {lang === 'id'
                  ? 'PILIH FORMAT KONSULTASI PRIORITAS'
                  : 'CHOOSE YOUR CONSULTATION FORMAT'}
              </div>

              {/* Option 1: VIP Zoom Video Call */}
              <div
                id="type-option-zoom"
                onClick={() => setConsultationType('zoom')}
                className={`p-5 rounded-lg border transition-all duration-300 cursor-pointer flex gap-4 relative ${
                  consultationType === 'zoom'
                    ? 'bg-[#1A2421] border-[#C9A96E] shadow-lg ring-1 ring-[#C9A96E]/50'
                    : 'bg-white/[0.02] border-white/10 hover:border-[#C9A96E]/40 hover:bg-white/[0.04]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    consultationType === 'zoom'
                      ? 'bg-[#C9A96E] text-[#111816]'
                      : 'bg-white/10 text-[#C9A96E]'
                  }`}
                >
                  <Video className="w-5 h-5" />
                </div>
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm font-semibold text-[#FDFBF7]">
                      {t.types.zoom.title}
                    </h3>
                    <span className="text-[9px] uppercase tracking-wider bg-[#C9A96E]/20 text-[#C9A96E] px-2 py-0.5 rounded border border-[#C9A96E]/40 font-mono">
                      {t.types.zoom.badge}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {t.types.zoom.desc}
                  </p>
                </div>
                {consultationType === 'zoom' && (
                  <CheckCircle2 className="w-5 h-5 text-[#C9A96E] absolute top-5 right-5" />
                )}
              </div>

              {/* Option 2: VIP Direct WhatsApp */}
              <div
                id="type-option-whatsapp"
                onClick={() => setConsultationType('whatsapp')}
                className={`p-5 rounded-lg border transition-all duration-300 cursor-pointer flex gap-4 relative ${
                  consultationType === 'whatsapp'
                    ? 'bg-[#1A2421] border-[#C9A96E] shadow-lg ring-1 ring-[#C9A96E]/50'
                    : 'bg-white/[0.02] border-white/10 hover:border-[#C9A96E]/40 hover:bg-white/[0.04]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    consultationType === 'whatsapp'
                      ? 'bg-[#C9A96E] text-[#111816]'
                      : 'bg-white/10 text-[#C9A96E]'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm font-semibold text-[#FDFBF7]">
                      {t.types.whatsapp.title}
                    </h3>
                    <span className="text-[9px] uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 font-mono">
                      {t.types.whatsapp.badge}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {t.types.whatsapp.desc}
                  </p>
                </div>
                {consultationType === 'whatsapp' && (
                  <CheckCircle2 className="w-5 h-5 text-[#C9A96E] absolute top-5 right-5" />
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Date & Slot Selection */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Date Input */}
              <div>
                <label
                  htmlFor="scheduler-date-input"
                  className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] font-semibold block mb-2"
                >
                  {lang === 'id'
                    ? 'TANGGAL KONSULTASI YANG DIHARAPKAN'
                    : 'PREFERRED CONSULTATION DATE'}
                </label>
                <div className="relative">
                  <input
                    id="scheduler-date-input"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#1A2421] border border-[#C9A96E]/40 text-[#FDFBF7] p-3 pl-11 rounded-md outline-none text-xs sm:text-sm focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-colors cursor-pointer"
                  />
                  <CalendarIcon className="w-4 h-4 text-[#C9A96E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] font-semibold block mb-2">
                  {lang === 'id' ? 'PILIHAN WAKTU (WITA/BALI)' : 'PREFERRED TIME WINDOW (BALI TIME)'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['morning', 'afternoon', 'sunset'] as const).map((slotKey) => {
                    const slot = t.timeSlots[slotKey];
                    const isSelected = preferredSlot === slotKey;
                    return (
                      <div
                        key={slotKey}
                        id={`slot-btn-${slotKey}`}
                        onClick={() => setPreferredSlot(slotKey)}
                        className={`p-3.5 rounded-md border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#1A2421] border-[#C9A96E] ring-1 ring-[#C9A96E]'
                            : 'bg-white/[0.02] border-white/10 hover:border-[#C9A96E]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold text-[#FDFBF7]">
                            {slot.title}
                          </span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                          )}
                        </div>
                        <div className="text-[10px] text-[#C9A96E] font-mono mb-1 font-semibold">
                          {slot.time}
                        </div>
                        <div className="text-[9px] text-white/50 font-light">
                          {slot.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Client Contact Details Form */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] font-semibold mb-1">
                {lang === 'id' ? 'DATA KONTAK & PREFERENSI' : 'CONFIRM YOUR DETAILS'}
              </div>

              {/* Full Name */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-300 font-medium block mb-1">
                  {t.form.nameLabel} *
                </label>
                <input
                  id="client-name-input"
                  type="text"
                  placeholder={t.form.namePlaceholder}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={`w-full bg-[#1A2421] border text-[#FDFBF7] p-2.5 rounded-md outline-none text-xs focus:ring-1 focus:ring-[#C9A96E] transition-all ${
                    errors.fullName ? 'border-red-500' : 'border-[#C9A96E]/30 focus:border-[#C9A96E]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[10px] text-red-400 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Dual Column: Email & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-300 font-medium block mb-1">
                    {t.form.emailLabel} *
                  </label>
                  <input
                    id="client-email-input"
                    type="email"
                    placeholder={t.form.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full bg-[#1A2421] border text-[#FDFBF7] p-2.5 rounded-md outline-none text-xs focus:ring-1 focus:ring-[#C9A96E] transition-all ${
                      errors.email ? 'border-red-500' : 'border-[#C9A96E]/30 focus:border-[#C9A96E]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-300 font-medium block mb-1">
                    {t.form.phoneLabel} *
                  </label>
                  <input
                    id="client-whatsapp-input"
                    type="tel"
                    placeholder={t.form.phonePlaceholder}
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    className={`w-full bg-[#1A2421] border text-[#FDFBF7] p-2.5 rounded-md outline-none text-xs focus:ring-1 focus:ring-[#C9A96E] transition-all ${
                      errors.whatsapp ? 'border-red-500' : 'border-[#C9A96E]/30 focus:border-[#C9A96E]'
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-[10px] text-red-400 mt-1">{errors.whatsapp}</p>
                  )}
                </div>
              </div>

              {/* Dual Column: Guest Count & Target Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-300 font-medium block mb-1">
                    {t.form.guestLabel}
                  </label>
                  <input
                    id="client-guest-input"
                    type="text"
                    placeholder={t.form.guestPlaceholder}
                    value={formData.guestCount}
                    onChange={(e) =>
                      setFormData({ ...formData, guestCount: e.target.value })
                    }
                    className="w-full bg-[#1A2421] border border-[#C9A96E]/30 text-[#FDFBF7] p-2.5 rounded-md outline-none text-xs focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-300 font-medium block mb-1">
                    {t.form.targetDateLabel}
                  </label>
                  <input
                    id="client-targetdate-input"
                    type="text"
                    placeholder={t.form.targetDatePlaceholder}
                    value={formData.targetDate}
                    onChange={(e) =>
                      setFormData({ ...formData, targetDate: e.target.value })
                    }
                    className="w-full bg-[#1A2421] border border-[#C9A96E]/30 text-[#FDFBF7] p-2.5 rounded-md outline-none text-xs focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all"
                  />
                </div>
              </div>

              {/* Preferred Region Select */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-300 font-medium block mb-1">
                  {t.form.regionLabel}
                </label>
                <select
                  id="client-region-select"
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  className="w-full bg-[#1A2421] border border-[#C9A96E]/30 text-[#FDFBF7] p-2.5 rounded-md outline-none text-xs focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all cursor-pointer"
                >
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Notes / Request */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-300 font-medium block mb-1">
                  {t.form.notesLabel}
                </label>
                <textarea
                  id="client-notes-input"
                  rows={2}
                  placeholder={t.form.notesPlaceholder}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full bg-[#1A2421] border border-[#C9A96E]/30 text-[#FDFBF7] p-2.5 rounded-md outline-none text-xs focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer & Navigation Controls */}
        <div className="px-6 py-4 sm:px-8 bg-[#1A2421]/90 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-[#8A9A86] font-light">
            <Lock className="w-3 h-3 text-[#C9A96E]" />
            <span>{t.guarantee}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {step > 1 && (
              <button
                id="scheduler-back-btn"
                type="button"
                onClick={handleBack}
                className="py-2.5 px-4 rounded-md border border-white/20 hover:border-[#C9A96E] text-xs text-white font-semibold transition-all cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.buttons.back}</span>
              </button>
            )}

            {step < 3 ? (
              <button
                id="scheduler-next-btn"
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto py-2.5 px-6 rounded-md bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>{t.buttons.next}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="scheduler-confirm-btn"
                type="button"
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="w-full sm:w-auto py-2.5 px-6 rounded-md bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg group"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>
                  {isSubmitting ? t.buttons.submitting : t.buttons.submit}
                </span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
