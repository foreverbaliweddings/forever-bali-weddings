import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, MapPin, MessageCircle } from 'lucide-react';
import { Language, GalleryItem } from '../types';
import { GALLERY_ITEMS, CONTACT_INFO } from '../data/weddingData';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', labelId: 'Semua Portofolio', labelEn: 'All Venues' },
    { id: 'cliffside', labelId: 'Cliffside', labelEn: 'Cliffside' },
    { id: 'beachfront', labelId: 'Beachfront', labelEn: 'Beachfront' },
    { id: 'villa', labelId: 'Luxury Villa', labelEn: 'Luxury Villa' },
    { id: 'jungle', labelId: 'Jungle Romance', labelEn: 'Jungle Romance' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleNextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev! + 1) % filteredItems.length));
  };

  const handlePrevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#E5E1D8] bg-[#F7F4EE] mb-4 rounded-sm">
            <span className="text-[#C9A96E] font-serif text-sm">✧</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
              {lang === 'ID' ? 'Dokumentasi & Portofolio' : 'Visual Masterpieces'}
            </span>
          </div>

          <h2
            id="gallery-main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? 'Galeri Pernikahan Mewah' : 'Wedding Gallery & Portfolio'}
          </h2>

          <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#555555] font-light font-sans max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Momen sakral abadi berlatar pemandangan alam magis Pulau Dewata yang dirancang dengan kemewahan autentik.'
              : 'Timeless sacred moments framed by the awe-inspiring landscapes and quiet luxury of Bali.'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          id="gallery-category-filters"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-tab-${cat.id}`}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-all cursor-pointer rounded-sm ${
                activeCategory === cat.id
                  ? 'bg-[#222222] text-white shadow-sm'
                  : 'bg-white text-[#555555] hover:text-[#222222] hover:border-[#C9A96E] border border-[#E5E1D8]'
              }`}
            >
              {lang === 'ID' ? cat.labelId : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => {
            const title = lang === 'ID' ? item.titleId : item.titleEn;
            const categoryLabel = lang === 'ID' ? item.categoryLabelId : item.categoryLabelEn;

            return (
              <div
                key={item.id}
                id={`gallery-card-${item.id}`}
                onClick={() => handleOpenLightbox(idx)}
                className="group relative rounded-sm overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E5E1D8] bg-white h-80 flex flex-col justify-end"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Hover Maximize Icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-sm bg-black/50 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C9A96E]" />
                </div>

                {/* Card Info Content */}
                <div className="relative z-10 p-5 text-white transform transition-transform duration-300">
                  <div className="flex items-center gap-1.5 text-[#C9A96E] text-[10px] uppercase tracking-[0.18em] font-medium mb-1.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{item.location}</span>
                    <span>•</span>
                    <span>{categoryLabel}</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-normal leading-snug text-white group-hover:text-[#C9A96E] transition-colors">
                    {title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Lightbox Modal */}
        {lightboxIndex !== null && currentItem && (
          <div
            id="gallery-lightbox-modal"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              id="lightbox-close-btn"
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              id="lightbox-prev-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              id="lightbox-next-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Main Box */}
            <div
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-[#111111] rounded-2xl overflow-hidden border border-[#C9A96E]/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Area */}
              <div className="md:w-2/3 h-72 sm:h-96 md:h-auto bg-black flex items-center justify-center relative">
                <img
                  src={currentItem.image}
                  alt={lang === 'ID' ? currentItem.titleId : currentItem.titleEn}
                  className="w-full h-full object-contain max-h-[75vh]"
                />
              </div>

              {/* Photo Details Sidebar */}
              <div className="md:w-1/3 p-6 sm:p-8 flex flex-col justify-between text-white bg-[#1a1a1a]">
                <div>
                  <div className="flex items-center gap-2 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{currentItem.location}</span>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-serif text-white mb-3"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {lang === 'ID' ? currentItem.titleId : currentItem.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                    {lang === 'ID' ? currentItem.descriptionId : currentItem.descriptionEn}
                  </p>

                  <div className="py-2.5 px-3.5 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-400">
                    <span className="text-[#C9A96E] font-medium">
                      {lang === 'ID' ? 'Kategori Venue:' : 'Venue Category:'}
                    </span>{' '}
                    {lang === 'ID' ? currentItem.categoryLabelId : currentItem.categoryLabelEn}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
                  <p className="text-xs text-neutral-400 font-light">
                    {lang === 'ID'
                      ? 'Tertarik merancang pernikahan dengan konsep venue seperti ini?'
                      : 'Envisioning your wedding in a similar idyllic setting?'}
                  </p>
                  <a
                    id="lightbox-inquire-whatsapp-btn"
                    href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                      lang === 'ID'
                        ? `Halo Forever Bali Wedding, saya tertarik dengan konsep venue "${currentItem.titleId}" (${currentItem.location}).`
                        : `Hello Forever Bali Wedding, I am interested in the venue concept "${currentItem.titleEn}" (${currentItem.location}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-full bg-[#C9A96E] hover:bg-[#B39055] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors text-center"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{lang === 'ID' ? 'Tanya Konsep Ini' : 'Inquire This Style'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
