import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  MapPin,
  Check,
  MessageCircle,
  Maximize2,
  X,
  Compass,
  ArrowRight,
  Clock,
  DollarSign,
  Flame,
} from 'lucide-react';
import { Language, VenueItem } from '../types';
import { VENUES_DATA, CONTACT_INFO } from '../data/weddingData';

interface VenuesSectionProps {
  lang: Language;
}

export const VenuesSection: React.FC<VenuesSectionProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLightboxVenue, setSelectedLightboxVenue] = useState<VenueItem | null>(null);

  // Lock body scroll when lightbox is active
  React.useEffect(() => {
    if (selectedLightboxVenue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedLightboxVenue]);

  // Support ESC keyboard trigger & global close-all-modals event to close lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setSelectedLightboxVenue(null);
        document.body.style.overflow = 'unset';
      }
    };
    const handleGlobalClose = () => {
      setSelectedLightboxVenue(null);
      document.body.style.overflow = 'unset';
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('close-all-modals', handleGlobalClose);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('close-all-modals', handleGlobalClose);
    };
  }, []);

  // Filter tabs requested: [ALL] [ULUWATU CLIFFS] [PRIVATE VILLAS] [UBUD FOREST] [BEACHFRONT]
  const categories = [
    {
      id: 'all',
      labelId: 'ALL',
      labelEn: 'ALL',
      subId: 'Semua Venue',
      subEn: 'All Sanctuaries',
      count: VENUES_DATA.length,
    },
    {
      id: 'uluwatu',
      labelId: 'ULUWATU CLIFFS',
      labelEn: 'ULUWATU CLIFFS',
      subId: 'Tebing Limestone',
      subEn: 'Cliffside Oceanfront',
      count: VENUES_DATA.filter((v) => v.category === 'uluwatu').length,
    },
    {
      id: 'canggu-seminyak',
      labelId: 'PRIVATE VILLAS',
      labelEn: 'PRIVATE VILLAS',
      subId: 'Villa Tropis Chic',
      subEn: 'Intimate Estates',
      count: VENUES_DATA.filter((v) => v.category === 'canggu-seminyak').length,
    },
    {
      id: 'ubud',
      labelId: 'UBUD FOREST',
      labelEn: 'UBUD FOREST',
      subId: 'Hutan & Lembah Ayung',
      subEn: 'Sacred Rainforest',
      count: VENUES_DATA.filter((v) => v.category === 'ubud').length,
    },
    {
      id: 'nusa-dua',
      labelId: 'BEACHFRONT',
      labelEn: 'BEACHFRONT',
      subId: 'Pasir Putih Nusa Dua',
      subEn: 'White Sand Resorts',
      count: VENUES_DATA.filter((v) => v.category === 'nusa-dua').length,
    },
  ];

  const filteredVenues =
    activeCategory === 'all'
      ? VENUES_DATA
      : VENUES_DATA.filter((venue) => venue.category === activeCategory);

  const getWhatsAppVenueUrl = (venue: VenueItem) => {
    const venueName = lang === 'ID' ? venue.nameId : venue.nameEn;
    const capacity = lang === 'ID' ? venue.capacityId : venue.capacityEn;
    const vibe = lang === 'ID' ? venue.vibeId : venue.vibeEn;
    const location = lang === 'ID' ? venue.locationId : venue.locationEn;

    const message =
      lang === 'ID'
        ? `Halo Forever Bali Weddings Studio, saya tertarik untuk menanyakan ketersediaan dan penawaran untuk venue "${venueName}" (${location}, Kapasitas: ${capacity}, Vibe: ${vibe}).`
        : `Hello Forever Bali Weddings Studio, I would like to inquire about availability and pricing for the venue "${venueName}" (${location}, Capacity: ${capacity}, Vibe: ${vibe}).`;

    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="venues" className="py-24 sm:py-32 bg-[#FDFBF7] relative overflow-hidden">
      {/* Subtle Luxury Gradient Blur Background Accents */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#E5E1D8] bg-[#F7F4EE] mb-4 rounded-sm">
            <span className="text-[#C9A96E] font-serif text-sm">✧</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'LOKASI & ENKLAVE MEWAH' : 'CURATED DESTINATIONS'}
            </span>
          </div>

          <h2
            id="venues-main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? 'Venues & Lokasi Pernikahan Bali' : 'Venues & Iconic Enclaves'}
          </h2>

          <div className="w-16 h-[1.5px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#555555] font-light font-sans max-w-2xl mx-auto leading-relaxed">
            {lang === 'ID'
              ? 'Dari tebing megah Uluwatu hingga ketenangan hutan Ubud, temukan lokasi perayaan pernikahan impian yang dikurasi khusus dengan privasi penuh dan standar internasional.'
              : 'From Uluwatu’s dramatic limestone cliffs to serene Ubud rainforest retreats, explore our curated private wedding sanctuaries across the Island of the Gods.'}
          </p>
        </div>

        {/* Requested Filter Tabs: [ALL] [ULUWATU CLIFFS] [PRIVATE VILLAS] [UBUD FOREST] [BEACHFRONT] */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12 sm:mb-16">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const label = lang === 'ID' ? cat.labelId : cat.labelEn;

            return (
              <button
                key={cat.id}
                id={`filter-btn-${cat.id}`}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 rounded-xs cursor-pointer flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-[#1A2421] text-[#FDFBF7] shadow-md border border-[#C9A96E]/50'
                    : 'bg-[#F7F4EE] text-[#555555] hover:text-[#222222] hover:bg-white border border-[#E5E1D8]'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-[#C9A96E] text-white font-bold' : 'bg-[#E5E1D8] text-[#666666]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filterable Venue Grid (2 Columns on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-stretch">
          {filteredVenues.map((venue) => {
            const name = lang === 'ID' ? venue.nameId : venue.nameEn;
            const location = lang === 'ID' ? venue.locationId : venue.locationEn;
            const capacity = lang === 'ID' ? venue.capacityId : venue.capacityEn;
            const vibe = lang === 'ID' ? venue.vibeId : venue.vibeEn;
            const curfew = lang === 'ID' ? venue.curfewId : venue.curfewEn;
            const badge = lang === 'ID' ? venue.badgeId : venue.badgeEn;
            const description = lang === 'ID' ? venue.descriptionId : venue.descriptionEn;
            const features = lang === 'ID' ? venue.featuresId : venue.featuresEn;
            const bestFor = lang === 'ID' ? venue.bestForId : venue.bestForEn;

            return (
              <div
                key={venue.id}
                id={`venue-card-${venue.id}`}
                className="bg-white rounded-sm border border-[#E5E1D8] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden group hover:border-[#C9A96E]/60"
              >
                <div>
                  {/* Top Image Container */}
                  <div
                    className="relative h-64 sm:h-80 overflow-hidden bg-neutral-900 cursor-pointer"
                    onClick={() => setSelectedLightboxVenue(venue)}
                  >
                    <img
                      src={venue.image}
                      alt={name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay for Text Protection */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 opacity-75 group-hover:opacity-60 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm">
                        {badge}
                      </span>
                      
                      {/* Zoom Indicator */}
                      <button
                        type="button"
                        aria-label="Enlarge venue photograph"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLightboxVenue(venue);
                        }}
                        className="pointer-events-auto w-8 h-8 rounded-sm bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-[#C9A96E] hover:border-[#C9A96E] transition-colors"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Image Info */}
                    <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                      <div className="flex items-center gap-1.5 text-xs text-[#C9A96E] font-medium uppercase tracking-wider mb-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{location}</span>
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl font-serif font-normal text-white leading-tight drop-shadow-sm"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                      >
                        {name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    
                    {/* Luxury Spec Icons Grid: Guest Capacity, Curfew, Ambience, and Price Range */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-[#F7F4EE] border border-[#E5E1D8] rounded-xs">
                      
                      {/* 1. Guest Capacity */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#888888] font-semibold">
                          <Users className="w-3 h-3 text-[#C9A96E]" />
                          <span>{lang === 'ID' ? 'Kapasitas' : 'Capacity'}</span>
                        </div>
                        <span className="text-xs font-semibold text-[#222222] mt-0.5">
                          {capacity}
                        </span>
                      </div>

                      {/* 2. Curfew Policy */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#888888] font-semibold">
                          <Clock className="w-3 h-3 text-[#C9A96E]" />
                          <span>{lang === 'ID' ? 'Curfew' : 'Curfew'}</span>
                        </div>
                        <span className="text-xs font-semibold text-[#222222] mt-0.5 truncate" title={curfew}>
                          {curfew || '23:00 WITA'}
                        </span>
                      </div>

                      {/* 3. Ambience */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#888888] font-semibold">
                          <Sparkles className="w-3 h-3 text-[#C9A96E]" />
                          <span>{lang === 'ID' ? 'Ambience' : 'Ambience'}</span>
                        </div>
                        <span className="text-xs font-semibold text-[#C9A96E] mt-0.5 truncate" title={vibe}>
                          {vibe}
                        </span>
                      </div>

                      {/* 4. Price Indicator */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#888888] font-semibold">
                          <DollarSign className="w-3 h-3 text-[#C9A96E]" />
                          <span>{lang === 'ID' ? 'Tier Biaya' : 'Price Tier'}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#222222] mt-0.5 tracking-widest">
                          {venue.priceIndicator || '$$$$'}
                        </span>
                      </div>

                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#555555] font-light leading-relaxed font-sans">
                      {description}
                    </p>

                    {/* Key Features List */}
                    <div className="space-y-2.5 pt-2 border-t border-[#E5E1D8]">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#222222] font-semibold mb-2">
                        {lang === 'ID' ? 'Fitur & Keunggulan Utama:' : 'Key Features & Amenities:'}
                      </p>
                      {features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-[13px] text-[#444444] font-light leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Best For Highlight */}
                    {bestFor && (
                      <div className="p-3.5 bg-[#F7F4EE] border-l-2 border-[#C9A96E] rounded-sm text-xs text-[#555555] font-light">
                        <strong className="text-[#222222] font-medium">
                          {lang === 'ID' ? 'Sangat Ideal Untuk: ' : 'Best Suited For: '}
                        </strong>
                        {bestFor}
                      </div>
                    )}

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 sm:p-8 pt-0 border-t border-[#E5E1D8]/60 mt-4 space-y-3">
                  <a
                    id={`inquire-venue-btn-${venue.id}`}
                    href={getWhatsAppVenueUrl(venue)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 rounded-sm shadow-sm group/btn cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{lang === 'ID' ? 'Tanya Venue Ini' : 'Inquire Venue'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </a>

                  <p className="text-[10px] text-center text-[#888888] font-light">
                    {lang === 'ID'
                      ? 'Terhubung langsung dengan Lead Wedding Planner via WhatsApp resmi (+62 813-7007-4777)'
                      : 'Connects directly with Lead Wedding Planner via official WhatsApp (+62 813-7007-4777)'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Destination Concierge Banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 bg-[#222222] text-white rounded-sm border border-[#C9A96E]/30 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A96E]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold block mb-2">
                {lang === 'ID' ? 'KURASI VENUE KHUSUS' : 'BESPOKE VENUE SOURCING'}
              </span>
              <h3
                className="text-2xl sm:text-3xl font-serif font-light text-white mb-3"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {lang === 'ID'
                  ? 'Mencari Enklave Privat Lain di Seluruh Bali?'
                  : 'Looking for a Secret Private Estate in Bali?'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {lang === 'ID'
                  ? 'Kami memiliki akses ke lebih dari 30+ villa privat off-market, tebing rahasia Tabanan, dan pantai eksklusif yang tidak dipublikasikan secara umum.'
                  : 'We hold exclusive relationships with 30+ off-market private estates, secluded Tabanan clifftops, and private bays across Bali.'}
              </p>
            </div>

            <a
              id="concierge-venue-consult-btn"
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                lang === 'ID'
                  ? 'Halo Forever Bali Weddings Studio, saya ingin berkonsultasi mengenai kurasi venue eksklusif untuk pernikahan kami di Bali.'
                  : 'Hello Forever Bali Weddings Studio, I would like to schedule a bespoke venue curation consultation for our Bali wedding.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all rounded-sm shrink-0 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>{lang === 'ID' ? 'Konsultasi Venue Privat' : 'Schedule Venue Scouting'}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox / Modal Image Enlargement */}
      {selectedLightboxVenue && (
        <div
          id="venue-image-lightbox"
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedLightboxVenue(null)}
        >
          {/* Dedicated Outside Floating Close Button */}
          <button
            type="button"
            aria-label="Close image lightbox"
            onClick={() => setSelectedLightboxVenue(null)}
            className="fixed top-6 right-6 z-[1010] p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer border border-white/20 shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl w-full bg-[#111111] rounded-sm overflow-hidden border border-[#C9A96E]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dedicated Inside Card Top-Right Close Button */}
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={() => setSelectedLightboxVenue(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-[#222222] text-white hover:text-[#C9A96E] border border-white/20 hover:border-[#C9A96E] flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedLightboxVenue.image}
                alt={lang === 'ID' ? selectedLightboxVenue.nameId : selectedLightboxVenue.nameEn}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="p-6 sm:p-8 bg-[#1A2421] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#C9A96E] uppercase tracking-widest mb-1">
                  {lang === 'ID' ? selectedLightboxVenue.locationId : selectedLightboxVenue.locationEn}
                </div>
                <h4
                  className="text-xl sm:text-2xl font-serif text-white font-normal"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {lang === 'ID' ? selectedLightboxVenue.nameId : selectedLightboxVenue.nameEn}
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  {lang === 'ID' ? selectedLightboxVenue.capacityId : selectedLightboxVenue.capacityEn} • {lang === 'ID' ? selectedLightboxVenue.vibeId : selectedLightboxVenue.vibeEn}
                </p>
              </div>

              <a
                href={getWhatsAppVenueUrl(selectedLightboxVenue)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors shrink-0 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{lang === 'ID' ? 'Tanya Venue Ini' : 'Inquire Venue'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
