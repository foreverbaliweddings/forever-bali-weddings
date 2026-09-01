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
  MapPin,
  DollarSign,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/weddingData';

interface VipBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialTier?: string;
  initialRegion?: string;
}

interface TimezoneOption {
  code: string;
  label: string;
  city: string;
  offsetHours: number; // offset from WITA (UTC+8)
}

const TIMEZONES: TimezoneOption[] = [
  { code: 'WITA', label: 'WITA (Bali / Singapore / Perth)', city: 'Bali (UTC+8)', offsetHours: 0 },
  { code: 'WIB', label: 'WIB (Jakarta / Bangkok)', city: 'Jakarta (UTC+7)', offsetHours: -1 },
  { code: 'AEST', label: 'AEST (Sydney / Melbourne)', city: 'Sydney (UTC+10)', offsetHours: 2 },
  { code: 'ACST', label: 'ACST (Adelaide / Darwin)', city: 'Adelaide (UTC+9.5)', offsetHours: 1.5 },
  { code: 'BST', label: 'BST / GMT (London / UK)', city: 'London (UTC+1)', offsetHours: -7 },
  { code: 'CET', label: 'CET (Paris / Frankfurt / Milan)', city: 'Paris (UTC+2)', offsetHours: -6 },
  { code: 'GST', label: 'GST (Dubai / UAE)', city: 'Dubai (UTC+4)', offsetHours: -4 },
  { code: 'EDT', label: 'EDT (New York / Miami)', city: 'New York (UTC-4)', offsetHours: -12 },
  { code: 'PDT', label: 'PDT (Los Angeles / SF)', city: 'Los Angeles (UTC-7)', offsetHours: -15 },
];

export const VipBookingModal: React.FC<VipBookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialTier = 'Private Villa Celebration (20–50 Guests)',
  initialRegion = 'Uluwatu & Bukit Clifftop Estate',
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [consultationFormat, setConsultationFormat] = useState<'zoom' | 'gmeet' | 'whatsapp'>('zoom');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('WITA');
  
  // Date selection
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  
  const [selectedSlot, setSelectedSlot] = useState<string>('morning');
  const [selectedSpecificTime, setSelectedSpecificTime] = useState<string>('10:00 WITA');

  // Couple & Event Details
  const [coupleNames, setCoupleNames] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState('30–50 Guests');
  const [targetQuarter, setTargetQuarter] = useState('Q2/Q3 2026 (Dry Season)');
  const [preferredRegion, setPreferredRegion] = useState(initialRegion);
  const [budgetTier, setBudgetTier] = useState(initialTier);
  const [visionNotes, setVisionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lock body scroll
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

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeTz = TIMEZONES.find((t) => t.code === selectedTimezone) || TIMEZONES[0];

  const slots = [
    {
      id: 'morning',
      baliTime: '09:00 – 12:00 WITA',
      titleEn: 'Morning Sanctuary',
      titleId: 'Sesi Pagi (Morning Sanctuary)',
      descEn: 'Ideal for Australia, NZ & East Asia timezones',
      descId: 'Waktu ideal untuk WIB, WITA, & Australia',
      specificTimes: ['09:30 WITA', '10:30 WITA', '11:30 WITA'],
    },
    {
      id: 'afternoon',
      baliTime: '13:00 – 16:30 WITA',
      titleEn: 'Afternoon Meridian',
      titleId: 'Sesi Siang (Afternoon Meridian)',
      descEn: 'Ideal for Asia, WA & Middle East early afternoon',
      descId: 'Sesi tenang untuk diskusi konsep & anggaran mendalam',
      specificTimes: ['13:30 WITA', '14:30 WITA', '15:30 WITA'],
    },
    {
      id: 'sunset',
      baliTime: '17:00 – 20:30 WITA',
      titleEn: 'Sunset Twilight',
      titleId: 'Sesi Senja (Sunset Twilight)',
      descEn: 'Ideal for Europe, UK & Middle East timezones',
      descId: 'Waktu ideal untuk pasangan di Eropa, UK & Timur Tengah',
      specificTimes: ['17:30 WITA', '18:30 WITA', '19:30 WITA'],
    },
  ];

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formatLabel =
      consultationFormat === 'zoom'
        ? 'VIP 15-Min Zoom Video Discovery'
        : consultationFormat === 'gmeet'
        ? 'Google Meet Executive Call'
        : 'VIP Direct WhatsApp Video / Voice';

    let message = '';

    if (lang === 'ID') {
      message =
        `🌸 *PENGAJUAN SESI KONSULTASI EKSKLUSIF VVIP*\n` +
        `*Forever Bali Weddings Studio (+62 813-7007-4777)*\n\n` +
        `• *Nama Pasangan*: ${coupleNames || 'Calon Pengantin VVIP'}\n` +
        `• *Format Konsultasi*: ${formatLabel}\n` +
        `• *Tanggal Pilihan*: ${selectedDate}\n` +
        `• *Waktu Sesi*: ${selectedSpecificTime} (${selectedTimezone} / ${activeTz.city})\n` +
        `• *Estimasi Tamu*: ${guestCount}\n` +
        `• *Target Periode*: ${targetQuarter}\n` +
        `• *Preferensi Wilayah*: ${preferredRegion}\n` +
        `• *Kategori Anggaran*: ${budgetTier}\n` +
        `• *WhatsApp*: ${phone || '-'}\n` +
        `• *Email*: ${email || '-'}\n` +
        (visionNotes ? `• *Catatan Konsep*: ${visionNotes}\n\n` : `\n`) +
        `Mohon konfirmasi ketersediaan kalender Direktur Aria untuk sesi privat ini. Terima kasih.`;
    } else {
      message =
        `🌸 *VVIP DISCOVERY CONSULTATION REQUEST*\n` +
        `*Forever Bali Weddings Studio (+62 813-7007-4777)*\n\n` +
        `• *Couple Name(s)*: ${coupleNames || 'Distinguished Couple'}\n` +
        `• *Consultation Format*: ${formatLabel}\n` +
        `• *Selected Date*: ${selectedDate}\n` +
        `• *Selected Window*: ${selectedSpecificTime} (${selectedTimezone} / ${activeTz.city})\n` +
        `• *Estimated Guest Count*: ${guestCount}\n` +
        `• *Target Quarter*: ${targetQuarter}\n` +
        `• *Preferred Region*: ${preferredRegion}\n` +
        `• *Investment Tier*: ${budgetTier}\n` +
        `• *Client WhatsApp*: ${phone || '-'}\n` +
        `• *Client Email*: ${email || '-'}\n` +
        (visionNotes ? `• *Vision Notes*: ${visionNotes}\n\n` : `\n`) +
        `Please confirm Senior Director Aria's calendar availability for our private discovery session.`;
    }

    const whatsappUrl = `https://wa.me/6281370074777?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      onClose();
    }, 400);
  };

  return (
    <div
      id="vip-booking-modal-overlay"
      className="fixed inset-0 z-50 bg-[#111816]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Floating Close Button */}
      <button
        id="vip-booking-close-btn"
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] px-4 py-2 rounded-xs bg-[#1A2421]/90 hover:bg-[#222E2A] text-white hover:text-[#C9A96E] border border-white/20 hover:border-[#C9A96E] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-2xl flex items-center gap-2 cursor-pointer"
      >
        <X className="w-4 h-4 text-[#C9A96E]" />
        <span>{lang === 'ID' ? 'Tutup' : 'Close'}</span>
      </button>

      <div
        id="vip-booking-modal-container"
        className="bg-[#1A2421] text-[#FDFBF7] border border-white/15 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center pb-6 border-b border-white/10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/15 border border-[#C9A96E]/40 rounded-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C9A96E] font-semibold">
              {lang === 'ID'
                ? 'MEJA KONSULTASI DIREKTUR VVIP ARIA'
                : 'ARIA VVIP DISCOVERY & CONSULTATION DESK'}
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl font-serif text-white font-bold leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID'
              ? 'Jadwalkan Sesi Perencanaan Eksklusif'
              : 'Reserve Your Private Discovery Session'}
          </h2>

          <p className="text-xs text-neutral-300 font-light mt-2 max-w-lg mx-auto">
            {lang === 'ID'
              ? 'Pilih format tatap muka privat, zona waktu Anda, dan slot kalender untuk mendiskusikan konsep, venue tebing privat, serta alokasi anggaran bersama tim direktur kami.'
              : 'Select your preferred executive session format, global timezone, and private window for a bespoke venue portfolio & budget walkthrough.'}
          </p>

          {/* Stepper Indicator */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6">
            {[
              { num: 1, labelEn: '1. Format & Timezone', labelId: '1. Format & Zona Waktu' },
              { num: 2, labelEn: '2. Date & Window', labelId: '2. Tanggal & Slot' },
              { num: 3, labelEn: '3. Vision & Details', labelId: '3. Detail Acara' },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num as 1 | 2 | 3)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-[11px] font-mono transition-all cursor-pointer border ${
                  step === s.num
                    ? 'bg-[#C9A96E] text-[#111816] font-bold border-[#C9A96E] shadow-sm'
                    : step > s.num
                    ? 'bg-[#111816] text-[#C9A96E] border-[#C9A96E]/40'
                    : 'bg-[#111816]/60 text-neutral-400 border-white/10'
                }`}
              >
                <span>{lang === 'ID' ? s.labelId : s.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 1: Format & Timezone Selection */}
        {step === 1 && (
          <div className="py-6 space-y-6 relative z-10 animate-fadeIn">
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#C9A96E] font-semibold mb-3">
                {lang === 'ID' ? 'Pilih Format Konsultasi:' : 'Select Consultation Format:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'zoom',
                    title: 'VIP Zoom Video',
                    subEn: '15-Min Screen Share & Moodboard Walkthrough',
                    subId: 'Tatap muka video 15 menit & presentasi portfolio',
                    badge: 'Recommended',
                    icon: Video,
                  },
                  {
                    id: 'gmeet',
                    title: 'Google Meet',
                    subEn: 'Executive Audio/Video Room',
                    subId: 'Ruang virtual privat berkecepatan tinggi',
                    badge: 'Instant Link',
                    icon: Globe,
                  },
                  {
                    id: 'whatsapp',
                    title: 'VIP WhatsApp Call',
                    subEn: 'Direct Video Call + Instant Document Routing',
                    subId: 'Panggilan video langsung + pengiriman katalog',
                    badge: 'Fast-Track',
                    icon: MessageCircle,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = consultationFormat === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setConsultationFormat(item.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#111816] border-[#C9A96E] ring-2 ring-[#C9A96E]/40 shadow-lg'
                          : 'bg-[#111816]/50 border-white/10 hover:border-white/25 text-neutral-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C9A96E]' : 'text-neutral-400'}`} />
                          <span
                            className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-xs ${
                              isSelected ? 'bg-[#C9A96E] text-[#111816] font-bold' : 'bg-white/5 text-neutral-400'
                            }`}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <h4 className="text-xs font-serif font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-[10px] text-neutral-300 font-light leading-snug">
                          {lang === 'ID' ? item.subId : item.subEn}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timezone Selector */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#C9A96E] font-semibold mb-2">
                {lang === 'ID' ? 'Pilih Zona Waktu Anda (Global):' : 'Select Your Global Timezone:'}
              </label>
              <div className="relative">
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="w-full bg-[#111816] text-white border border-white/15 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C9A96E] cursor-pointer"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.code} value={tz.code} className="bg-[#111816] text-white">
                      {tz.label} — {tz.city}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[11px] text-neutral-400 font-light mt-1.5">
                {lang === 'ID'
                  ? `* Seluruh slot waktu akan disinkronkan ke zona ${activeTz.city}.`
                  : `* All consultation slots will be coordinated to your local timezone (${activeTz.city}).`}
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{lang === 'ID' ? 'Pilih Tanggal & Waktu' : 'Proceed to Date & Time'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Window Picker */}
        {step === 2 && (
          <div className="py-6 space-y-6 relative z-10 animate-fadeIn">
            {/* Preferred Date Input */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#C9A96E] font-semibold mb-2">
                {lang === 'ID' ? 'Pilih Tanggal Konsultasi:' : 'Select Desired Consultation Date:'}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#111816] text-white border border-white/15 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C9A96E] cursor-pointer"
                />
              </div>
            </div>

            {/* Time Slot Windows */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#C9A96E] font-semibold mb-3">
                {lang === 'ID' ? 'Pilih Slot Waktu Konsultasi:' : 'Select Available Advisory Window:'}
              </label>
              <div className="space-y-3">
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot.id;
                  return (
                    <div
                      key={slot.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#111816] border-[#C9A96E] ring-1 ring-[#C9A96E]/40'
                          : 'bg-[#111816]/50 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSlot(slot.id);
                          setSelectedSpecificTime(slot.specificTimes[0]);
                        }}
                        className="w-full flex items-center justify-between text-left cursor-pointer mb-2"
                      >
                        <div className="flex items-center gap-2.5">
                          <Clock className={`w-4 h-4 ${isSelected ? 'text-[#C9A96E]' : 'text-neutral-400'}`} />
                          <span className="text-xs font-serif font-bold text-white">
                            {lang === 'ID' ? slot.titleId : slot.titleEn}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#C9A96E] font-semibold">
                          {slot.baliTime}
                        </span>
                      </button>

                      <p className="text-[10px] text-neutral-400 font-light mb-3">
                        {lang === 'ID' ? slot.descId : slot.descEn}
                      </p>

                      {/* Specific Time Chips */}
                      {isSelected && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                          {slot.specificTimes.map((timeStr) => (
                            <button
                              key={timeStr}
                              type="button"
                              onClick={() => setSelectedSpecificTime(timeStr)}
                              className={`px-3 py-1 rounded-xs text-[11px] font-mono cursor-pointer transition-all border ${
                                selectedSpecificTime === timeStr
                                  ? 'bg-[#C9A96E] text-[#111816] font-bold border-[#C9A96E]'
                                  : 'bg-[#1A2421] text-neutral-300 border-white/10 hover:border-white/30'
                              }`}
                            >
                              {timeStr}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 bg-transparent hover:bg-white/5 text-neutral-400 text-xs rounded-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'ID' ? 'Kembali' : 'Back'}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{lang === 'ID' ? 'Lengkapi Data VVIP' : 'Enter Event Details'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Event Scope & Client Information */}
        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="py-6 space-y-4 relative z-10 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-mono text-neutral-300 mb-1">
                  {lang === 'ID' ? 'Nama Pasangan (Wajib):' : 'Couple Full Names (Required):'}
                </label>
                <input
                  type="text"
                  required
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  placeholder="e.g., Lady Eleanor & Lord Julian"
                  className="w-full bg-[#111816] text-white border border-white/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-mono text-neutral-300 mb-1">
                  {lang === 'ID' ? 'Nomor WhatsApp (dengan Kode Negara):' : 'WhatsApp Number (with Country Code):'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+61 400 123 456 / +62 813..."
                  className="w-full bg-[#111816] text-white border border-white/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-mono text-neutral-300 mb-1">
                  {lang === 'ID' ? 'Alamat Email:' : 'Email Address:'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@luxurybali.com"
                  className="w-full bg-[#111816] text-white border border-white/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-mono text-neutral-300 mb-1">
                  {lang === 'ID' ? 'Estimasi Jumlah Tamu:' : 'Estimated Guest Count:'}
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full bg-[#111816] text-white border border-white/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A96E] cursor-pointer"
                >
                  <option value="2–15 Guests (Intimate Elopement)">2–15 Guests (Intimate Elopement)</option>
                  <option value="20–50 Guests (Private Villa Buyout)">20–50 Guests (Private Villa Buyout)</option>
                  <option value="50–100 Guests (Medium Luxury Destination)">50–100 Guests (Medium Luxury)</option>
                  <option value="100–150+ Guests (Grand Bespoke Gala)">100–150+ Guests (Grand Gala)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-mono text-neutral-300 mb-1">
                  {lang === 'ID' ? 'Preferensi Wilayah di Bali:' : 'Preferred Bali Region:'}
                </label>
                <select
                  value={preferredRegion}
                  onChange={(e) => setPreferredRegion(e.target.value)}
                  className="w-full bg-[#111816] text-white border border-white/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A96E] cursor-pointer"
                >
                  <option value="Uluwatu & Bukit Clifftop Estate">Uluwatu & Bukit Clifftop Estate</option>
                  <option value="Ubud & Sayan Valley Jungle Sanctuary">Ubud & Sayan Valley Sanctuary</option>
                  <option value="Canggu, Pererenan & Seseh Beachfront">Canggu & Pererenan Beachfront</option>
                  <option value="Nusa Dua 5-Star Ocean Lawn">Nusa Dua 5-Star Ocean Lawn</option>
                  <option value="Flexible / Need Aria Guidance">Flexible / Need Aria Guidance</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-mono text-neutral-300 mb-1">
                  {lang === 'ID' ? 'Target Periode Pernikahan:' : 'Target Wedding Quarter / Year:'}
                </label>
                <select
                  value={targetQuarter}
                  onChange={(e) => setTargetQuarter(e.target.value)}
                  className="w-full bg-[#111816] text-white border border-white/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A96E] cursor-pointer"
                >
                  <option value="Q2 2026 (April–June / Dry Season)">Q2 2026 (April–June / Dry Season)</option>
                  <option value="Q3 2026 (July–September / Peak Season)">Q3 2026 (July–September / Peak Season)</option>
                  <option value="Q4 2026 (October–December)">Q4 2026 (October–December)</option>
                  <option value="2027 (Advance Booking Reserve)">2027 (Advance Booking Reserve)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-mono text-neutral-300 mb-1">
                {lang === 'ID' ? 'Catatan Visi / Preferensi Khusus:' : 'Vision Notes & Special Requests:'}
              </label>
              <textarea
                rows={2}
                value={visionNotes}
                onChange={(e) => setVisionNotes(e.target.value)}
                placeholder="e.g., Sunset cliff ceremony, floating glass altar, fireworks permit, helicopter arrival..."
                className="w-full bg-[#111816] text-white border border-white/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A96E]"
              />
            </div>

            {/* Summary Box */}
            <div className="p-3.5 bg-[#111816] rounded-xl border border-[#C9A96E]/30 text-xs space-y-1 text-neutral-300">
              <div className="flex items-center justify-between text-[#C9A96E] font-mono font-bold text-[11px]">
                <span>{selectedSpecificTime} ({selectedTimezone})</span>
                <span>{selectedDate}</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-light">
                {lang === 'ID'
                  ? 'Konfirmasi instan akan dikirimkan langsung ke WhatsApp VIP Concierge (+62 813-7007-4777).'
                  : 'Instant confirmation is routed directly to VIP Concierge Desk (+62 813-7007-4777).'}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 bg-transparent hover:bg-white/5 text-neutral-400 text-xs rounded-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'ID' ? 'Kembali' : 'Back'}</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 px-4 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>
                  {isSubmitting
                    ? (lang === 'ID' ? 'Menyiapkan Jalur VIP...' : 'Routing VIP Request...')
                    : (lang === 'ID' ? 'KONFIRMASI KONSULTASI VIA WA' : 'CONFIRM SESSION VIA WHATSAPP')}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
