import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Maximize2, X, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { ICONIC_BACKDROPS, GALLERY_ITEMS, CONTACT_INFO } from '../data/weddingData';

interface BackdropsSectionProps {
  lang: Language;
}

export const BackdropsSection: React.FC<BackdropsSectionProps> = ({ lang }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [showFullGallery, setShowFullGallery] = useState(false);

  // Lock body scroll when backdrop lightbox is active
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Support ESC keyboard trigger & global close-all-modals event to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setSelectedImage(null);
        setSelectedTitle(null);
        document.body.style.overflow = 'unset';
      }
    };
    const handleGlobalClose = () => {
      setSelectedImage(null);
      setSelectedTitle(null);
      document.body.style.overflow = 'unset';
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('close-all-modals', handleGlobalClose);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('close-all-modals', handleGlobalClose);
    };
  }, []);

  return (
    <section id="backdrops" className="py-24 sm:py-32 bg-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#C9A96E]/40 bg-white mb-4 rounded-sm">
            <span className="text-[#C9A96E] font-serif text-sm">✧</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'INSPIRASI VISUAL' : 'VISUAL INSPIRATION'}
            </span>
          </div>
          
          <h2
            id="backdrops-main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? 'Latar Belakang Ikonik Bali' : 'Iconic Backdrops'}
          </h2>
          
          <div className="w-16 h-[1.5px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#555555] font-light font-sans max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Temukan lokasi pernikahan paling memesona di Bali, dari estate privat hingga tebing laut berlatar senja keemasan.'
              : 'Discover Bali’s most mesmerizing settings, from secluded architectural villas to cliff tops overlooking the Indian Ocean.'}
          </p>
        </div>

        {/* 3 Main Highlight Cards matching Page 11 of PDF */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {ICONIC_BACKDROPS.map((item) => {
            const title = lang === 'ID' ? item.titleId : item.titleEn;
            const desc = lang === 'ID' ? item.descId : item.descEn;
            const tag = lang === 'ID' ? item.tagId : item.tagEn;

            return (
              <div
                key={item.id}
                id={`backdrop-card-${item.id}`}
                className="bg-white rounded-sm overflow-hidden border border-[#E5E1D8] shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col cursor-pointer"
                onClick={() => {
                  setSelectedImage(item.image);
                  setSelectedTitle(title);
                }}
              >
                {/* Image Container with Exact Aspect Ratio from Page 11 */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  
                  {/* Zoom indicator icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-sm bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-[#C9A96E]" />
                  </div>

                  {/* Location Tag */}
                  <div className="absolute bottom-3 left-3 text-white text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                    <MapPin className="w-3 h-3 text-[#C9A96E]" />
                    <span>{tag}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3
                      className="text-xl font-serif text-[#222222] font-normal mb-2 group-hover:text-[#C9A96E] transition-colors"
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    >
                      {title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#666666] font-light leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extended Gallery Toggle */}
        <div className="text-center">
          <button
            id="toggle-full-gallery-btn"
            type="button"
            onClick={() => setShowFullGallery(!showFullGallery)}
            className="px-8 py-3 bg-white border border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all rounded-sm shadow-sm cursor-pointer"
          >
            {showFullGallery
              ? lang === 'ID'
                ? 'Tutup Portofolio Tambahan'
                : 'Hide Extended Gallery'
              : lang === 'ID'
              ? 'Lihat Portofolio Lengkap'
              : 'Explore Extended Portfolio'}
          </button>
        </div>

        {/* Extended Gallery Grid */}
        {showFullGallery && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 animate-fadeIn">
            {GALLERY_ITEMS.map((item) => {
              const title = lang === 'ID' ? item.titleId : item.titleEn;
              const desc = lang === 'ID' ? item.descriptionId : item.descriptionEn;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-sm overflow-hidden border border-[#E5E1D8] shadow-sm hover:shadow-md transition-all group cursor-pointer"
                  onClick={() => {
                    setSelectedImage(item.image);
                    setSelectedTitle(title);
                  }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white text-[11px] font-serif">
                      {item.location}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-serif text-sm font-normal text-[#222222] mb-1">
                      {title}
                    </h4>
                    <p className="text-[11px] text-[#666666] font-light leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Lightbox Preview */}
        {selectedImage && (
          <div
            id="backdrop-lightbox"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
            onClick={() => {
              setSelectedImage(null);
              setSelectedTitle(null);
            }}
          >
            {/* Prominent Floating Close / Kembali Action Button */}
            <button
              id="close-backdrop-lightbox-btn"
              type="button"
              aria-label="Close backdrop image"
              onClick={() => {
                setSelectedImage(null);
                setSelectedTitle(null);
              }}
              className="fixed top-5 right-5 sm:top-7 sm:right-7 z-[60] px-4 py-2 rounded-sm bg-black/75 hover:bg-[#222222] text-white hover:text-[#C9A96E] border border-white/25 hover:border-[#C9A96E] backdrop-blur-md text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-2xl group"
            >
              <X className="w-4 h-4 text-[#C9A96E] transition-transform duration-300 group-hover:rotate-90" />
              <span>{lang === 'ID' ? '✕ Kembali' : '✕ Close / Kembali'}</span>
            </button>

            <div
              className="relative max-w-4xl w-full bg-[#111111] rounded-sm overflow-hidden border border-[#C9A96E]/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[75vh] bg-black flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt={selectedTitle || 'Bali Backdrop'}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>
              <div className="p-6 bg-[#1a1a1a] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg text-white font-normal">
                    {selectedTitle}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light">
                    Forever Bali Weddings Studio • Curated Destination Enclaves
                  </p>
                </div>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Halo Forever Bali Weddings Studio, saya tertarik dengan venue "${selectedTitle}".`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs font-semibold uppercase tracking-[0.15em] rounded-sm flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{lang === 'ID' ? 'Tanya Venue Ini' : 'Inquire This Venue'}</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
