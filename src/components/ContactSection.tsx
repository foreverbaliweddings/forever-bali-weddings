import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Mail,
  MessageCircle,
  Phone,
  Calendar,
  Users,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Language, ContactFormData } from '../types';
import { CONTACT_INFO, WEDDING_PACKAGES } from '../data/weddingData';

interface ContactSectionProps {
  lang: Language;
  selectedPackage: string;
  onClearSelectedPackage: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  selectedPackage,
  onClearSelectedPackage,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    estimatedDate: '',
    guestCount: '',
    preferredPackage: selectedPackage || '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedWhatsAppUrl, setLastSubmittedWhatsAppUrl] = useState('');

  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({ ...prev, preferredPackage: selectedPackage }));
    }
  }, [selectedPackage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct high-end formatted WhatsApp inquiry message
    const lines = [
      lang === 'ID'
        ? '🌸 *FORMULIR KONSULTASI PERNIKAHAN — FOREVER BALI WEDDING*'
        : '🌸 *WEDDING CONSULTATION INQUIRY — FOREVER BALI WEDDING*',
      '━━━━━━━━━━━━━━━━━━━━',
      `👤 *${lang === 'ID' ? 'Nama' : 'Name'}:* ${formData.name}`,
      `📧 *${lang === 'ID' ? 'Email' : 'Email'}:* ${formData.email}`,
      `📱 *${lang === 'ID' ? 'WhatsApp/Telepon' : 'WhatsApp/Phone'}:* ${formData.phone}`,
      `📅 *${lang === 'ID' ? 'Perkiraan Tanggal' : 'Estimated Date'}:* ${
        formData.estimatedDate || (lang === 'ID' ? 'Belum ditentukan' : 'To be determined')
      }`,
      `👥 *${lang === 'ID' ? 'Jumlah Tamu' : 'Guest Count'}:* ${
        formData.guestCount || (lang === 'ID' ? 'Belum pasti' : 'Flexible')
      }`,
      `💍 *${lang === 'ID' ? 'Pilihan Paket' : 'Preferred Package'}:* ${
        formData.preferredPackage || (lang === 'ID' ? 'Kustom / Belum Memilih' : 'Custom / Undecided')
      }`,
      '━━━━━━━━━━━━━━━━━━━━',
      `💬 *${lang === 'ID' ? 'Pesan & Harapan' : 'Vision & Message'}:*`,
      formData.message ||
        (lang === 'ID'
          ? 'Mohon informasi ketersediaan tanggal dan konsultasi privat.'
          : 'Please advise on availability and private consultation details.'),
    ];

    const messageText = lines.join('\n');
    const waUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
      messageText
    )}`;

    setLastSubmittedWhatsAppUrl(waUrl);
    setIsSubmitted(true);

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      estimatedDate: '',
      guestCount: '',
      preferredPackage: '',
      message: '',
    });
    onClearSelectedPackage();
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching Page 12 of PDF */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#E5E1D8] bg-[#F7F4EE] mb-4 rounded-sm">
            <span className="text-[#C9A96E] font-serif text-sm">✧</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'MULAI KISAH ABADI ANDA' : 'BEGIN YOUR FOREVER'}
            </span>
          </div>

          <h2
            id="contact-main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID'
              ? 'Mari Rencanakan Pernikahan Impian Anda'
              : "Let's Plan Your Dream Wedding"}
          </h2>

          <div className="w-16 h-[1.5px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#555555] font-light font-sans max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Jadwalkan konsultasi cuma-cuma 30 menit bersama tim perencana utama kami.'
              : 'Schedule a complimentary 30-minute consultation with our lead planning team.'}
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Contact Details Displayed (Page 12) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 rounded-sm bg-[#F7F4EE] border border-[#E5E1D8] shadow-sm space-y-6">
              
              <div>
                <span className="font-serif text-2xl text-[#222222] block font-light">
                  Forever Bali Weddings Studio
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold">
                  Luxury Destination Wedding Planner
                </span>
              </div>

              <div className="w-full h-[1px] bg-[#E5E1D8]" />

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm bg-white border border-[#E5E1D8] text-[#C9A96E] flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#888888] font-semibold">
                    {lang === 'ID' ? 'WhatsApp / Telepon Resmi' : 'Official WhatsApp & Phone'}
                  </h4>
                  <a
                    id="contact-whatsapp-link"
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-serif text-[#222222] hover:text-[#C9A96E] transition-colors mt-0.5 block font-normal"
                  >
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                  <p className="text-xs text-[#666666] font-light mt-0.5">
                    {lang === 'ID' ? 'Konsultasi cepat via WhatsApp' : 'Direct line with Lead Planning Director'}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm bg-white border border-[#E5E1D8] text-[#C9A96E] flex items-center justify-center shrink-0 mt-1">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#888888] font-semibold">
                    {lang === 'ID' ? 'Email Resmi' : 'Official Email'}
                  </h4>
                  <a
                    id="contact-email-link"
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm font-serif text-[#222222] hover:text-[#C9A96E] transition-colors mt-0.5 block break-all font-normal"
                  >
                    {CONTACT_INFO.email}
                  </a>
                  <p className="text-xs text-[#666666] font-light mt-0.5">
                    {lang === 'ID' ? 'Respon dalam 24 jam' : 'Inquiries answered within 24 hours'}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm bg-white border border-[#E5E1D8] text-[#C9A96E] flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#888888] font-semibold">
                    {lang === 'ID' ? 'Lokasi Studio' : 'Studio Location'}
                  </h4>
                  <p className="text-sm font-serif text-[#222222] mt-0.5 font-normal">
                    {CONTACT_INFO.address}
                  </p>
                  <p className="text-xs text-[#666666] font-light mt-1">
                    {lang === 'ID'
                      ? 'Melayani Uluwatu, Canggu, Ubud, Seminyak, dan seluruh Bali.'
                      : 'Covering Uluwatu, Canggu, Ubud, Seminyak, & Island-wide.'}
                  </p>
                </div>
              </div>

              {/* Consultation Hours */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm bg-white border border-[#E5E1D8] text-[#C9A96E] flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#888888] font-semibold">
                    {lang === 'ID' ? 'Jam Konsultasi' : 'Consultation Hours'}
                  </h4>
                  <p className="text-xs text-[#333333] font-light mt-0.5">
                    {CONTACT_INFO.hours}
                  </p>
                </div>
              </div>

            </div>

            {/* Direct Quick WhatsApp Banner */}
            <div className="p-6 rounded-sm bg-white border border-[#E5E1D8] shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-[#C9A96E] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] font-semibold text-[#222222]">
                    {lang === 'ID' ? 'Respon Cepat WhatsApp' : 'Instant WhatsApp Assistance'}
                  </p>
                  <p className="text-xs text-[#666666] font-light">
                    {lang === 'ID' ? 'Klik untuk membuka chat langsung' : 'Click to chat with our team'}
                  </p>
                </div>
              </div>
              <a
                id="direct-wa-box-btn"
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-sm bg-[#C9A96E] text-white text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#B8985D] transition-colors shrink-0 shadow-sm"
              >
                Chat
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-sm bg-white border border-[#E5E1D8] shadow-sm">
              
              {isSubmitted ? (
                <div
                  id="form-success-message"
                  className="py-12 px-4 text-center flex flex-col items-center animate-fadeIn"
                >
                  <div className="w-14 h-14 rounded-sm bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 stroke-[2]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#222222] mb-3 font-normal">
                    {lang === 'ID' ? 'Pesan Anda Telah Disiapkan!' : 'Inquiry Prepared Successfully!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] font-light max-w-md mx-auto mb-8 leading-relaxed">
                    {lang === 'ID'
                      ? 'WhatsApp telah dibuka dengan rincian data pernikahan Anda. Jika aplikasi WhatsApp tidak terbuka otomatis, silakan klik tombol di bawah.'
                      : 'WhatsApp has been launched with your wedding inquiry details. If it did not open automatically, please click the button below.'}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                    <a
                      id="reopen-wa-btn"
                      href={lastSubmittedWhatsAppUrl || CONTACT_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 rounded-sm bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-sm transition-all text-center"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>{lang === 'ID' ? 'Buka Chat WhatsApp' : 'Open WhatsApp'}</span>
                    </a>

                    <button
                      id="reset-form-btn"
                      type="button"
                      onClick={handleReset}
                      className="w-full py-3.5 px-6 rounded-sm border border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white text-xs font-semibold uppercase tracking-[0.15em] transition-colors cursor-pointer"
                    >
                      {lang === 'ID' ? 'Kirim Pesan Lain' : 'Submit Another'}
                    </button>
                  </div>
                </div>
              ) : (
                <form id="wedding-contact-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Field 1: Name */}
                    <div>
                      <label
                        htmlFor="form-name"
                        className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333] mb-2"
                      >
                        {lang === 'ID' ? 'Nama Lengkap *' : 'Full Name *'}
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={lang === 'ID' ? 'contoh: Olivia & James' : 'e.g. Olivia & James'}
                        className="w-full px-4 py-3 rounded-sm bg-[#FDFBF7] border border-[#E5E1D8] focus:border-[#C9A96E] focus:outline-none text-xs sm:text-sm text-[#222222] transition-colors"
                      />
                    </div>

                    {/* Field 2: Email */}
                    <div>
                      <label
                        htmlFor="form-email"
                        className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333] mb-2"
                      >
                        {lang === 'ID' ? 'Alamat Email *' : 'Email Address *'}
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@domain.com"
                        className="w-full px-4 py-3 rounded-sm bg-[#FDFBF7] border border-[#E5E1D8] focus:border-[#C9A96E] focus:outline-none text-xs sm:text-sm text-[#222222] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Field 3: Phone / WhatsApp */}
                    <div>
                      <label
                        htmlFor="form-phone"
                        className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333] mb-2"
                      >
                        {lang === 'ID' ? 'Nomor WhatsApp / HP *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+62 813..."
                        className="w-full px-4 py-3 rounded-sm bg-[#FDFBF7] border border-[#E5E1D8] focus:border-[#C9A96E] focus:outline-none text-xs sm:text-sm text-[#222222] transition-colors"
                      />
                    </div>

                    {/* Field 4: Estimated Wedding Date */}
                    <div>
                      <label
                        htmlFor="form-date"
                        className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333] mb-2"
                      >
                        {lang === 'ID' ? 'Perkiraan Tanggal Pernikahan' : 'Estimated Wedding Date'}
                      </label>
                      <input
                        id="form-date"
                        type="text"
                        name="estimatedDate"
                        value={formData.estimatedDate}
                        onChange={handleChange}
                        placeholder={lang === 'ID' ? 'contoh: Oktober 2026' : 'e.g. October 2026'}
                        className="w-full px-4 py-3 rounded-sm bg-[#FDFBF7] border border-[#E5E1D8] focus:border-[#C9A96E] focus:outline-none text-xs sm:text-sm text-[#222222] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Field 5: Guest Count */}
                    <div>
                      <label
                        htmlFor="form-guest-count"
                        className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333] mb-2"
                      >
                        {lang === 'ID' ? 'Perkiraan Jumlah Tamu' : 'Estimated Guest Count'}
                      </label>
                      <select
                        id="form-guest-count"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-sm bg-[#FDFBF7] border border-[#E5E1D8] focus:border-[#C9A96E] focus:outline-none text-xs sm:text-sm text-[#222222] transition-colors"
                      >
                        <option value="">
                          {lang === 'ID' ? '-- Pilih Perkiraan Tamu --' : '-- Select Guest Count --'}
                        </option>
                        <option value="2-10 Guests (Elopement)">
                          {lang === 'ID' ? '2 - 10 Tamu (Elopement)' : '2 - 10 Guests (Elopement)'}
                        </option>
                        <option value="11-30 Guests (Intimate)">
                          {lang === 'ID' ? '11 - 30 Tamu (Intimate)' : '11 - 30 Guests (Intimate)'}
                        </option>
                        <option value="31-50 Guests (Villa/Cliffside)">
                          {lang === 'ID' ? '31 - 50 Tamu (Villa/Cliffside)' : '31 - 50 Guests (Villa/Cliffside)'}
                        </option>
                        <option value="50-100 Guests (Grand)">
                          {lang === 'ID' ? '50 - 100 Tamu (Grand)' : '50 - 100 Guests (Grand)'}
                        </option>
                        <option value="100+ Guests (Royal)">
                          {lang === 'ID' ? '100+ Tamu (Royal Celebration)' : '100+ Guests (Royal Celebration)'}
                        </option>
                      </select>
                    </div>

                    {/* Field 6: Preferred Package */}
                    <div>
                      <label
                        htmlFor="form-preferred-package"
                        className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333] mb-2"
                      >
                        {lang === 'ID' ? 'Pilihan Paket' : 'Preferred Package'}
                      </label>
                      <select
                        id="form-preferred-package"
                        name="preferredPackage"
                        value={formData.preferredPackage}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-sm bg-[#FDFBF7] border border-[#E5E1D8] focus:border-[#C9A96E] focus:outline-none text-xs sm:text-sm text-[#222222] transition-colors"
                      >
                        <option value="">
                          {lang === 'ID' ? '-- Belum Memilih / Kustom --' : '-- Custom / Undecided --'}
                        </option>
                        {WEDDING_PACKAGES.map((p) => (
                          <option
                            key={p.id}
                            value={lang === 'ID' ? p.nameId : p.nameEn}
                          >
                            {lang === 'ID' ? p.nameId : p.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Field 7: Message */}
                  <div>
                    <label
                      htmlFor="form-message"
                      className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333] mb-2"
                    >
                      {lang === 'ID' ? 'Pesan & Visi Pernikahan Anda' : 'Vision, Style & Questions'}
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={
                        lang === 'ID'
                          ? 'Ceritakan tentang impian venue (Uluwatu, Ubud, Pantai), tema warna, atau pertanyaan spesifik...'
                          : 'Tell us about your dream location (Uluwatu cliff, Ubud jungle, Beachfront), aesthetic preferences, or specific inquiries...'
                      }
                      className="w-full px-4 py-3 rounded-sm bg-[#FDFBF7] border border-[#E5E1D8] focus:border-[#C9A96E] focus:outline-none text-xs sm:text-sm text-[#222222] transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Action */}
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    className="w-full py-4 px-6 rounded-sm bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs font-semibold uppercase tracking-[0.15em] shadow-sm transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'ID' ? 'Kirim via WhatsApp & Email' : 'Submit & Connect on WhatsApp'}</span>
                  </button>

                  <p className="text-[10px] text-center text-[#888888] font-light">
                    {lang === 'ID'
                      ? 'Dengan menekan tombol, pesan Anda akan terformat rapi dan terkirim langsung ke nomor WhatsApp resmi kami.'
                      : 'Submitting will format your wedding details and connect you directly to our official WhatsApp line.'}
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
