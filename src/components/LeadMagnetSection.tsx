import React, { useState } from 'react';
import {
  Download,
  FileText,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Globe,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/weddingData';
import { generateLuxuryWeddingGuidePDF } from '../utils/generateGuidePdf';

interface LeadMagnetSectionProps {
  lang: Language;
}

const POPULAR_COUNTRIES = [
  'Australia',
  'Singapore',
  'United States',
  'United Kingdom',
  'Indonesia',
  'Germany',
  'Hong Kong',
  'Japan',
  'Netherlands',
  'Canada',
  'New Zealand',
  'France',
  'Switzerland',
  'United Arab Emirates',
  'Other / Lainnya',
];

export const LeadMagnetSection: React.FC<LeadMagnetSectionProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [customCountry, setCustomCountry] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    country?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedLead, setLastSubmittedLead] = useState<{
    name: string;
    email: string;
    country: string;
    whatsapp?: string;
  } | null>(null);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; country?: string } = {};

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
          : 'Please provide a valid email address.';
    }

    const resolvedCountry = country === 'Other / Lainnya' ? customCountry.trim() : country.trim();
    if (!resolvedCountry) {
      newErrors.country =
        lang === 'ID'
          ? 'Mohon pilih atau sebutkan negara asal Anda.'
          : 'Please select or specify your country of residence.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const finalCountry = country === 'Other / Lainnya' ? customCountry.trim() : country;
    const leadData = {
      name: name.trim(),
      email: email.trim(),
      country: finalCountry,
      whatsapp: whatsappNumber.trim(),
    };

    // 1. Generate & Trigger PDF Download
    try {
      generateLuxuryWeddingGuidePDF(leadData, lang);
    } catch (err) {
      console.error('Failed to trigger PDF download:', err);
    }

    // 2. Set State to Submitted
    setLastSubmittedLead(leadData);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleDownloadAgain = () => {
    if (lastSubmittedLead) {
      generateLuxuryWeddingGuidePDF(lastSubmittedLead, lang);
    }
  };

  const getWhatsAppFollowUpUrl = () => {
    if (!lastSubmittedLead) return `https://wa.me/${CONTACT_INFO.whatsappNumber}`;

    const message =
      lang === 'ID'
        ? `Halo Forever Bali Weddings Studio, saya sudah mengunduh "2026/2027 Luxury Wedding Guide & Pricing Catalog".\n\nNama: ${lastSubmittedLead.name}\nEmail: ${lastSubmittedLead.email}\nNegara Asal: ${lastSubmittedLead.country}\n\nSaya ingin berkonsultasi mengenai ketersediaan tanggal dan paket pernikahan impian kami.`
        : `Hello Forever Bali Weddings Studio, I have downloaded the "2026/2027 Luxury Wedding Guide & Pricing Catalog".\n\nName: ${lastSubmittedLead.name}\nEmail: ${lastSubmittedLead.email}\nCountry: ${lastSubmittedLead.country}\n\nI would love to check date availability and discuss our destination celebration.`;

    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const getEmailNotificationMailto = () => {
    if (!lastSubmittedLead) return `mailto:${CONTACT_INFO.email}`;

    const subject = encodeURIComponent(
      `[Lead Magnet Download] 2026/2027 Wedding Guide - ${lastSubmittedLead.name} (${lastSubmittedLead.country})`
    );
    const body = encodeURIComponent(
      `Hello Forever Bali Weddings Team,\n\nA prospective couple has downloaded the 2026/2027 Luxury Wedding Guide & Pricing Catalog:\n\nClient Name: ${lastSubmittedLead.name}\nEmail Address: ${lastSubmittedLead.email}\nCountry of Residence: ${lastSubmittedLead.country}\nWhatsApp: ${lastSubmittedLead.whatsapp || 'Not provided'}\nTimestamp: ${new Date().toISOString()}\n\nPlease follow up with personalized availability and consultation options.`
    );

    return `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="guide-download" className="py-24 sm:py-32 bg-[#FDFBF7] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#C9A96E]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#C9A96E]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Lead Magnet Card Container */}
        <div className="bg-white rounded-sm border border-[#E5E1D8] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Visual & Brochure Details Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#222222] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A96E]/15 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ID' ? 'PANDUAN EKSKLUSIF 2026/2027' : 'EXCLUSIVE 2026/2027 GUIDE'}</span>
              </div>

              {/* Title */}
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-serif font-light text-white leading-tight mb-2"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {lang === 'ID'
                    ? 'Panduan Pernikahan & Katalog Harga'
                    : 'Luxury Bali Wedding Guide & Pricing'}
                </h3>
                <p className="text-xs uppercase tracking-[0.16em] text-[#C9A96E] font-medium">
                  {lang === 'ID' ? 'Struktur Investasi & Enklave Privat' : 'Investment Framework & Secret Enclaves'}
                </p>
              </div>

              {/* Guide Contents List */}
              <div className="space-y-3.5 pt-2 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-300 font-medium">
                  {lang === 'ID' ? 'Apa yang Akan Anda Dapatkan:' : 'What You Will Discover:'}
                </p>

                <div className="space-y-2.5">
                  {[
                    {
                      id: '1',
                      textId: 'Katalog lengkap & harga transparan 3 tier paket (Essential, Artisan, Signature)',
                      textEn: 'Transparent breakdown of our 3 curated tiers (Essential, Artisan, Signature)',
                    },
                    {
                      id: '2',
                      textId: 'Kurasi 4 enklave venue terbaik di Bali (Uluwatu, Canggu, Nusa Dua, Ubud)',
                      textEn: 'Curated guide to Bali’s top 4 wedding enclaves (Uluwatu, Canggu, Nusa Dua, Ubud)',
                    },
                    {
                      id: '3',
                      textId: 'Roadmap perencanaan 5 tahap dari bulan ke-12 hingga detik hari-H',
                      textEn: '5-phase destination planning roadmap from month 12 to wedding day execution',
                    },
                    {
                      id: '4',
                      textId: 'Panduan legalitas pernikahan & integrasi berkah adat Nusantara Heritage',
                      textEn: 'Legal consular guidelines & Nusantara Heritage cultural blessing options',
                    },
                  ].map((item) => (
                    <div key={item.id} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" />
                      </div>
                      <span className="text-xs text-neutral-300 font-light leading-relaxed">
                        {lang === 'ID' ? item.textId : item.textEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Security / Trust Proof */}
            <div className="pt-8 border-t border-white/10 mt-6 relative z-10 flex items-center gap-3 text-xs text-neutral-400 font-light">
              <ShieldCheck className="w-5 h-5 text-[#C9A96E] shrink-0" />
              <span>
                {lang === 'ID'
                  ? 'Privasi data dijamin 100%. Tidak ada spam. Dokumen resmi dikirimkan langsung.'
                  : '100% Privacy protected. Instant verified download. Zero unsolicited spam.'}
              </span>
            </div>

          </div>

          {/* Right Form & Direct Trigger Column (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F4EE] border border-[#E5E1D8] text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold mb-3 rounded-sm">
                    <FileText className="w-3 h-3" />
                    <span>{lang === 'ID' ? 'UNDUH LANGSUNG / INSTANT ACCESS' : 'INSTANT PDF DOWNLOAD'}</span>
                  </div>

                  <h4
                    className="text-2xl sm:text-3xl font-serif text-[#222222] font-normal mb-2"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {lang === 'ID'
                      ? 'Unduh Panduan & Catalog Paket'
                      : 'Download 2026/2027 Wedding Guide & Pricing'}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed font-sans">
                    {lang === 'ID'
                      ? 'Lengkapi form ringkas di bawah ini untuk mengunduh dokumen PDF resmi kami secara instan.'
                      : 'Complete the brief form below to trigger an immediate download of our official PDF portfolio.'}
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  
                  {/* Field 1: Name */}
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="block text-xs uppercase tracking-[0.14em] text-[#333333] font-medium mb-1.5"
                    >
                      {lang === 'ID' ? 'Nama Lengkap / Pasangan *' : 'Full Name / Couple Names *'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="lead-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder={lang === 'ID' ? 'Contoh: Jessica & Alex' : 'e.g. Jessica & Alex'}
                        className={`w-full pl-10 pr-4 py-3 bg-[#FDFBF7] border text-xs sm:text-sm text-[#222222] rounded-sm focus:outline-none focus:ring-1 transition-colors ${
                          errors.name
                            ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                            : 'border-[#E5E1D8] focus:ring-[#C9A96E] focus:border-[#C9A96E]'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-red-500 font-light">{errors.name}</p>
                    )}
                  </div>

                  {/* Field 2: Email Address */}
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-xs uppercase tracking-[0.14em] text-[#333333] font-medium mb-1.5"
                    >
                      {lang === 'ID' ? 'Alamat Email *' : 'Email Address *'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="lead-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder={lang === 'ID' ? 'nama@domain.com' : 'yourname@domain.com'}
                        className={`w-full pl-10 pr-4 py-3 bg-[#FDFBF7] border text-xs sm:text-sm text-[#222222] rounded-sm focus:outline-none focus:ring-1 transition-colors ${
                          errors.email
                            ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                            : 'border-[#E5E1D8] focus:ring-[#C9A96E] focus:border-[#C9A96E]'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-500 font-light">{errors.email}</p>
                    )}
                  </div>

                  {/* Field 3: Country of Residence */}
                  <div>
                    <label
                      htmlFor="lead-country"
                      className="block text-xs uppercase tracking-[0.14em] text-[#333333] font-medium mb-1.5"
                    >
                      {lang === 'ID' ? 'Negara Asal / Country of Residence *' : 'Country of Residence *'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Globe className="w-4 h-4" />
                      </div>
                      <select
                        id="lead-country"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          if (errors.country) setErrors({ ...errors, country: undefined });
                        }}
                        className={`w-full pl-10 pr-4 py-3 bg-[#FDFBF7] border text-xs sm:text-sm text-[#222222] rounded-sm focus:outline-none focus:ring-1 transition-colors ${
                          errors.country
                            ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                            : 'border-[#E5E1D8] focus:ring-[#C9A96E] focus:border-[#C9A96E]'
                        }`}
                      >
                        <option value="">
                          {lang === 'ID' ? '-- Pilih Negara Asal --' : '-- Select Country --'}
                        </option>
                        {POPULAR_COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Custom Country Input if "Other" is chosen */}
                    {country === 'Other / Lainnya' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          value={customCountry}
                          onChange={(e) => setCustomCountry(e.target.value)}
                          placeholder={
                            lang === 'ID'
                              ? 'Sebutkan negara asal Anda'
                              : 'Please enter your country'
                          }
                          className="w-full px-4 py-2.5 bg-[#FDFBF7] border border-[#E5E1D8] text-xs sm:text-sm text-[#222222] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#C9A96E]"
                        />
                      </div>
                    )}

                    {errors.country && (
                      <p className="mt-1 text-[11px] text-red-500 font-light">{errors.country}</p>
                    )}
                  </div>

                  {/* Optional WhatsApp Number */}
                  <div>
                    <label
                      htmlFor="lead-whatsapp"
                      className="block text-xs uppercase tracking-[0.14em] text-[#333333] font-medium mb-1.5"
                    >
                      {lang === 'ID'
                        ? 'Nomor WhatsApp (Opsional untuk konsultasi cepat)'
                        : 'WhatsApp Number (Optional for swift concierge)'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <input
                        id="lead-whatsapp"
                        type="tel"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="+61 / +65 / +1 / +62 ..."
                        className="w-full pl-10 pr-4 py-3 bg-[#FDFBF7] border border-[#E5E1D8] text-xs sm:text-sm text-[#222222] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#C9A96E] transition-colors"
                      />
                    </div>
                  </div>

                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    id="submit-download-guide-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-3 rounded-sm shadow-md cursor-pointer disabled:opacity-75 group"
                  >
                    <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                    <span>
                      {isSubmitting
                        ? lang === 'ID'
                          ? 'Menyiapkan PDF...'
                          : 'Generating PDF Guide...'
                        : lang === 'ID'
                        ? 'Unduh Panduan & Catalog Sekarang (PDF)'
                        : 'Download 2026/2027 Guide & Pricing (PDF)'}
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#888888] font-light">
                  <Lock className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>
                    {lang === 'ID'
                      ? 'Dokumen langsung tersimpan otomatis ke perangkat Anda.'
                      : 'File downloads instantly directly to your device.'}
                  </span>
                </div>

              </form>
            ) : (
              /* Success & Verification State */
              <div className="space-y-6 animate-fadeIn py-4">
                <div className="w-14 h-14 rounded-full bg-[#F7F4EE] border-2 border-[#C9A96E] flex items-center justify-center text-[#C9A96E] mx-auto sm:mx-0 shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <h4
                    className="text-2xl sm:text-3xl font-serif text-[#222222] font-normal mb-2"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {lang === 'ID' ? 'Unduhan Berhasil!' : 'Guide Successfully Downloaded!'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed">
                    {lang === 'ID'
                      ? `Terima kasih, ${lastSubmittedLead?.name}. Dokumen resmi "2026/2027 Luxury Bali Wedding Guide & Pricing" telah digenerate khusus untuk Anda.`
                      : `Thank you, ${lastSubmittedLead?.name}. Your official "2026/2027 Luxury Bali Wedding Guide & Pricing" catalog has been generated.`}
                  </p>
                </div>

                {/* Lead Recap Box */}
                <div className="p-4 bg-[#FDFBF7] border border-[#E5E1D8] rounded-sm space-y-1.5 text-xs text-[#555555]">
                  <p>
                    <strong className="text-[#222222]">{lang === 'ID' ? 'Penerima: ' : 'Recipient: '}</strong>
                    {lastSubmittedLead?.name}
                  </p>
                  <p>
                    <strong className="text-[#222222]">{lang === 'ID' ? 'Email Terdaftar: ' : 'Registered Email: '}</strong>
                    {lastSubmittedLead?.email}
                  </p>
                  <p>
                    <strong className="text-[#222222]">{lang === 'ID' ? 'Negara: ' : 'Country: '}</strong>
                    {lastSubmittedLead?.country}
                  </p>
                </div>

                {/* Immediate Interaction Triggers */}
                <div className="space-y-3 pt-2">
                  
                  {/* WhatsApp Pre-filled Trigger */}
                  <a
                    id="lead-whatsapp-chat-trigger"
                    href={getWhatsAppFollowUpUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 rounded-sm shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>
                      {lang === 'ID'
                        ? 'Chat WhatsApp Konsultasi (+62 813-7007-4777)'
                        : 'Connect via WhatsApp (+62 813-7007-4777)'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  {/* Mailto Notification / Verification Trigger */}
                  <a
                    id="lead-email-notification-trigger"
                    href={getEmailNotificationMailto()}
                    className="w-full py-3 px-6 bg-[#222222] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 flex items-center justify-center gap-2.5 rounded-sm shadow-xs cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#C9A96E]" />
                    <span>
                      {lang === 'ID'
                        ? 'Kirim Salinan ke foreverbaliwedding@gmail.com'
                        : 'Send Confirmation to foreverbaliwedding@gmail.com'}
                    </span>
                  </a>

                  {/* Re-download button */}
                  <button
                    type="button"
                    onClick={handleDownloadAgain}
                    className="w-full py-2.5 px-4 bg-[#F7F4EE] hover:bg-white text-[#555555] hover:text-[#222222] border border-[#E5E1D8] text-xs uppercase tracking-[0.14em] font-medium rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span>{lang === 'ID' ? 'Unduh Ulang File PDF' : 'Re-Download PDF File'}</span>
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
