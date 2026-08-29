import React, { useState } from 'react';
import { MapPin, Users, Clock, DollarSign, MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { Language } from '../types';

export interface VenueCatalogItem {
  id: string;
  name: string;
  region: string;
  category: string;
  capacity: string;
  curfew: string;
  description: string;
  startingPrice: string;
  image: string;
}

export const VENUES: VenueCatalogItem[] = [
  {
    id: 'v1',
    name: 'The Cliff Estate Uluwatu',
    region: 'Uluwatu',
    category: 'Cliff-top Villa',
    capacity: '120 Guests',
    curfew: '24:00 WITA (Acoustic after 23:00)',
    description: 'Panoramic Indian Ocean views perched on 150-meter limestone cliffs. Features private helipad and amphitheater.',
    startingPrice: 'USD $18,000 / event permit',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'v2',
    name: 'Sayan Valley Sanctuary',
    region: 'Ubud',
    category: 'Jungle Retreat',
    capacity: '40 Guests',
    curfew: '22:00 WITA (Strict eco-silent zone)',
    description: 'Secluded riverfront sanctuary surrounded by sacred rice terraces and bamboo architecture. Perfect for intimate elopements.',
    startingPrice: 'USD $12,000 / event permit',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'v3',
    name: 'Pererenan Beachfront Compound',
    region: 'Canggu',
    category: 'Private Estate',
    capacity: '80 Guests',
    curfew: '23:00 WITA',
    description: 'Black-sand oceanfront villa with expansive manicured lawns, 30-meter infinity pool, and contemporary minimalist luxury.',
    startingPrice: 'USD $15,000 / event permit',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  }
];

interface VenueCatalogProps {
  lang?: Language;
}

export default function VenueCatalog({ lang = 'EN' }: VenueCatalogProps) {
  const [selectedRegion, setSelectedRegion] = useState('All');

  const filteredVenues = selectedRegion === 'All' 
    ? VENUES 
    : VENUES.filter(v => v.region.toLowerCase() === selectedRegion.toLowerCase());

  const handleInquireVenue = (venueName: string, region: string) => {
    const text = `Hello Forever Bali Weddings, I am interested in checking off-market dates and availability for ${venueName} in ${region}.`;
    const waUrl = `https://wa.me/6281370074777?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="venue-catalog" className="bg-[#111816] text-[#FDFBF7] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-[#C9A96E]/20 relative overflow-hidden" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold">
              {lang === 'ID' ? 'KATALOG VENUE EKSKLUSIF' : 'PRIVATE ESTATE CATALOG'}
            </span>
          </div>

          <h3
            id="venue-catalog-title"
            className="text-2xl sm:text-4xl font-serif text-[#C9A96E] tracking-[0.08em] mb-3"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? 'VENUE EKSKLUSIF OFF-MARKET' : 'CURATED OFF-MARKET VENUES'}
          </h3>
          <p className="text-xs sm:text-sm text-[#8A9A86] max-w-xl mx-auto font-light leading-relaxed">
            {lang === 'ID'
              ? 'Jelajahi pilihan sanctum privat, villa tebing, dan estate tepi pantai terkurasi di penjuru Bali.'
              : 'Explore our handpicked selection of private sanctuaries and luxury estates across Bali.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {['All', 'Uluwatu', 'Ubud', 'Canggu'].map((reg) => {
            const isActive = selectedRegion === reg;
            return (
              <button
                key={reg}
                id={`filter-reg-${reg.toLowerCase()}`}
                type="button"
                onClick={() => setSelectedRegion(reg)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 uppercase cursor-pointer border ${
                  isActive
                    ? 'bg-[#C9A96E] text-[#111816] border-[#C9A96E] shadow-md scale-105'
                    : 'bg-transparent text-[#FDFBF7] border-[#C9A96E]/40 hover:border-[#C9A96E] hover:bg-[#C9A96E]/10'
                }`}
              >
                {reg.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Venue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              id={`venue-card-${venue.id}`}
              className="bg-[#1A2421] border border-[#C9A96E]/25 hover:border-[#C9A96E]/60 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
            >
              {/* Image & Category Tag */}
              <div className="relative h-56 w-full overflow-hidden bg-black/40">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421] via-transparent to-black/30" />
                <span className="absolute top-3 left-3 bg-[#111816]/90 backdrop-blur-xs text-[#C9A96E] px-2.5 py-1 rounded text-[10px] uppercase font-semibold tracking-wider border border-[#C9A96E]/30">
                  {venue.category}
                </span>
                <span className="absolute bottom-3 right-3 text-[11px] font-mono text-white/90 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C9A96E]" />
                  {venue.region}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h4
                  className="text-lg sm:text-xl font-serif text-[#FDFBF7] mb-1 group-hover:text-[#C9A96E] transition-colors"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {venue.name}
                </h4>
                <p className="text-[#C9A96E] text-xs font-mono mb-3">
                  {venue.region}, Bali
                </p>
                <p className="text-neutral-300 text-xs font-light leading-relaxed mb-5 line-clamp-3">
                  {venue.description}
                </p>

                {/* Specs Box */}
                <div className="bg-[#111816] p-3.5 rounded-md flex flex-col gap-2 mb-5 text-xs border border-white/5">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="text-[#8A9A86] flex items-center gap-1.5 font-light">
                      <Users className="w-3.5 h-3.5 text-[#C9A96E]" />
                      Max Capacity:
                    </span>
                    <span className="font-semibold text-[#FDFBF7]">{venue.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="text-[#8A9A86] flex items-center gap-1.5 font-light">
                      <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                      Banjar Curfew:
                    </span>
                    <span className="text-[#FDFBF7] text-[11px]">{venue.curfew}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300 pt-1 border-t border-white/5">
                    <span className="text-[#8A9A86] flex items-center gap-1.5 font-light">
                      <DollarSign className="w-3.5 h-3.5 text-[#C9A96E]" />
                      Est. Buyout:
                    </span>
                    <span className="text-[#C9A96E] font-semibold font-mono text-[11px]">
                      {venue.startingPrice}
                    </span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  id={`inquire-btn-${venue.id}`}
                  type="button"
                  onClick={() => handleInquireVenue(venue.name, venue.region)}
                  className="mt-auto w-full py-3 px-4 bg-transparent hover:bg-[#C9A96E] text-[#C9A96E] hover:text-[#111816] border border-[#C9A96E] rounded-md font-semibold tracking-wider text-[11px] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group/btn"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>REQUEST AVAILABILITY VIA WHATSAPP</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
