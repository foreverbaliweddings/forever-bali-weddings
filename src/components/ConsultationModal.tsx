import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Calendar, Sparkles, MapPin, Check } from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO, WEDDING_PACKAGES } from '../data/weddingData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [coupleName, setCoupleName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [venuePreference, setVenuePreference] = useState('Uluwatu Cliffside');
  const [consultationType, setConsultationType] = useState('WhatsApp Video Call');

  // Lock body scroll when consultation modal is open
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

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      lang === 'ID'
        ? `🌸 *KONSULTASI PERENCANAAN WEDDING BALI*\n\n` +
          `• Nama: ${coupleName}\n` +
          `• Pilihan Waktu/Tanggal: ${selectedDate || 'Menyesuaikan'}\n` +
          `• Preferensi Venue: ${venuePreference}\n` +
          `• Format Konsultasi: ${consultationType}\n\n` +
          `Mohon jadwal konsultasi privat dengan senior wedding planner.`
        : `🌸 *PRIVATE BALI WEDDING CONSULTATION REQUEST*\n\n` +
          `• Couple Name: ${coupleName}\n` +
          `• Preferred Date/Time: ${selectedDate || 'Flexible'}\n` +
          `• Venue Preference: ${venuePreference}\n` +
          `• Consultation Format: ${consultationType}\n\n` +
          `Please advise availability for a private consultation with your senior planner.`;

    const url = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      id="consultation-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      {/* Floating Viewport Close Button */}
      <button
        id="consultation-floating-close-btn"
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="fixed top-5 right-5 sm:top-7 sm:right-7 z-[60] px-4 py-2 rounded-sm bg-black/75 hover:bg-[#222222] text-white hover:text-[#C9A96E] border border-white/25 hover:border-[#C9A96E] backdrop-blur-md text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-2xl group"
      >
        <X className="w-4 h-4 text-[#C9A96E] transition-transform duration-300 group-hover:rotate-90" />
        <span>{lang === 'ID' ? '✕ Kembali' : '✕ Close / Kembali'}</span>
      </button>

      <div
        id="consultation-modal-content"
        className="bg-white rounded-sm max-w-lg w-full p-6 sm:p-8 border border-[#E5E1D8] shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="consultation-modal-close-btn"
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-sm text-neutral-400 hover:text-neutral-700 hover:bg-[#F7F4EE] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-[#E5E1D8] bg-[#F7F4EE] mb-2 text-[#C9A96E] text-[10px] font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3" />
            <span>VIP Consultation</span>
          </div>
          <h3
            className="text-2xl font-serif text-[#222222] font-light"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID'
              ? 'Jadwalkan Konsultasi Privat'
              : 'Book a Private Consultation'}
          </h3>
          <p className="text-xs text-[#666666] font-light mt-1.5">
            {lang === 'ID'
              ? 'Diskusikan impian pernikahan Anda langsung dengan tim planner berpengalaman kami.'
              : 'Speak directly with our senior destination wedding planner.'}
          </p>
        </div>

        <form onSubmit={handleBook} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333] mb-1.5">
              {lang === 'ID' ? 'Nama Pasangan *' : 'Couple Names *'}
            </label>
            <input
              type="text"
              required
              value={coupleName}
              onChange={(e) => setCoupleName(e.target.value)}
              placeholder="e.g. Jessica & David"
              className="w-full px-3.5 py-2.5 rounded-sm bg-[#FDFBF7] border border-[#E5E1D8] text-xs text-[#222222] focus:outline-none focus:border-[#C9A96E]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333] mb-1.5">
              {lang === 'ID' ? 'Preferensi Venue' : 'Venue Style Preference'}
            </label>
            <select
              value={venuePreference}
              onChange={(e) => setVenuePreference(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-sm bg-[#FDFBF7] border border-[#E5E1D8] text-xs text-[#222222] focus:outline-none focus:border-[#C9A96E]"
            >
              <option value="Uluwatu Cliffside">Uluwatu Cliffside (Dramatic Sunset)</option>
              <option value="Ubud River Jungle">Ubud River & Jungle Sanctuary</option>
              <option value="Nusa Dua Beachfront">Nusa Dua Beachfront (Pristine White Sand)</option>
              <option value="Canggu / Seminyak Villa">Canggu / Seminyak Luxury Private Villa</option>
              <option value="Undecided / Open to Recommendations">Open to Recommendations</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333] mb-1.5">
              {lang === 'ID' ? 'Format Konsultasi' : 'Consultation Method'}
            </label>
            <select
              value={consultationType}
              onChange={(e) => setConsultationType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-sm bg-[#FDFBF7] border border-[#E5E1D8] text-xs text-[#222222] focus:outline-none focus:border-[#C9A96E]"
            >
              <option value="WhatsApp Video Call">WhatsApp Video / Audio Call</option>
              <option value="Google Meet">Google Meet Video Call</option>
              <option value="In-Person in Bali (Denpasar/Seminyak)">In-Person Meeting in Bali</option>
              <option value="WhatsApp Chat Message">Direct WhatsApp Chat</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333] mb-1.5">
              {lang === 'ID' ? 'Perkiraan Tanggal / Waktu Luang' : 'Preferred Date / Timing'}
            </label>
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder={lang === 'ID' ? 'contoh: Sabtu Depan, Jam 14:00 WITA' : 'e.g. Next Saturday, 2 PM WITA'}
              className="w-full px-3.5 py-2.5 rounded-sm bg-[#FDFBF7] border border-[#E5E1D8] text-xs text-[#222222] focus:outline-none focus:border-[#C9A96E]"
            />
          </div>

          <button
            id="modal-confirm-btn"
            type="submit"
            className="w-full mt-4 py-3.5 px-6 rounded-sm bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{lang === 'ID' ? 'Konfirmasi via WhatsApp' : 'Confirm via WhatsApp'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
