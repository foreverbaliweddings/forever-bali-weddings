import React, { useState } from 'react';
import { Star, Quote, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { TESTIMONIALS } from '../data/weddingData';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#F7F4EE] relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#E5E1D8] bg-white mb-4 rounded-sm">
            <Heart className="w-3.5 h-3.5 text-[#C9A96E] fill-[#C9A96E]/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
              {lang === 'ID' ? 'Kisah Cinta Nyata' : 'Real Love Stories'}
            </span>
          </div>

          <h2
            id="testimonials-main-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? 'Apa Kata Pasangan Kami' : 'Love Stories & Reviews'}
          </h2>

          <div className="w-16 h-[1px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#555555] font-light font-sans max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Kepercayaan dan kebahagiaan pasangan kami adalah kehormatan terbesar dalam setiap perayaan yang kami rancang.'
              : 'The heartfelt memories and trust of our couples are the true foundation of our craft.'}
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TESTIMONIALS.map((item, idx) => {
            const quote = lang === 'ID' ? item.quoteId : item.quoteEn;

            return (
              <div
                key={item.id}
                id={`testimonial-card-${idx}`}
                className="rounded-sm bg-white border border-[#E5E1D8] p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Gold Quote Mark Top Corner */}
                <div className="absolute top-6 right-6 text-[#C9A96E]/20">
                  <Quote className="w-8 h-8 stroke-[1.5]" />
                </div>

                <div>
                  {/* Star Ratings */}
                  <div className="flex items-center gap-1 mb-6 text-[#C9A96E]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Quote Body */}
                  <p className="text-xs sm:text-sm text-[#4A4A4A] font-light italic leading-relaxed mb-8 relative z-10 font-serif">
                    “{quote}”
                  </p>
                </div>

                {/* Author Info & Venue */}
                <div className="pt-6 border-t border-dotted border-[#E5E1D8] flex items-center gap-4">
                  <img
                    src={item.avatar}
                    alt={item.coupleNames}
                    className="w-11 h-11 rounded-sm object-cover border border-[#E5E1D8]"
                  />
                  <div>
                    <h3 className="font-serif text-base font-normal text-[#222222]">
                      {item.coupleNames}
                    </h3>
                    <p className="text-[11px] text-[#888888] font-light">
                      {item.origin} • <span className="text-[#C9A96E]">{item.weddingDate}</span>
                    </p>
                    <p className="text-[10px] text-[#555555] uppercase tracking-wider font-medium mt-0.5">
                      📍 {item.venue}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Stat Bar */}
        <div className="mt-16 py-8 px-6 sm:px-12 rounded-sm bg-white border border-[#E5E1D8] max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6 text-center shadow-sm">
          <div>
            <span className="text-2xl sm:text-3xl font-serif text-[#C9A96E] font-light">5.0 / 5.0</span>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#555555] mt-1 font-medium">
              {lang === 'ID' ? 'Rating Kepuasan Klien' : 'Client Satisfaction Rating'}
            </p>
          </div>

          <div className="hidden sm:block w-[1px] h-10 bg-[#E5E1D8]" />

          <div>
            <span className="text-2xl sm:text-3xl font-serif text-[#C9A96E] font-light">250+</span>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#555555] mt-1 font-medium">
              {lang === 'ID' ? 'Pernikahan Terselenggara' : 'Weddings Curated'}
            </p>
          </div>

          <div className="hidden sm:block w-[1px] h-10 bg-[#E5E1D8]" />

          <div>
            <span className="text-2xl sm:text-3xl font-serif text-[#C9A96E] font-light">100%</span>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#555555] mt-1 font-medium">
              {lang === 'ID' ? 'Garansi Ketenangan Hari-H' : 'Stress-Free Delivery'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
