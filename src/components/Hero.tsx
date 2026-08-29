import React from 'react';
import { MessageCircle, Sparkles, ChevronDown, Award, HeartHandshake, Compass, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO, HERO_DATA } from '../data/weddingData';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const scrollToPackages = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('packages');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* High-Resolution Luxury Bali Wedding Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_DATA.heroImage}
          alt="Curated Luxury Bali Wedding Packages"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Multi-layer luxury gradients for perfect text readability and quiet luxury mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/70" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-32 pb-20 flex flex-col items-center">
        
        {/* Exact Eyebrow from Page 1 of PDF */}
        <div
          id="hero-eyebrow-pill"
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C9A96E]/60 bg-black/40 backdrop-blur-md mb-6 rounded-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-medium">
            {lang === 'ID' ? HERO_DATA.eyebrowId : HERO_DATA.eyebrowEn}
          </span>
        </div>

        {/* Main Headline from Page 1 of PDF */}
        <h1
          id="hero-main-headline"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight text-white leading-[1.1] max-w-4xl drop-shadow-md mb-6"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {lang === 'ID' ? (
            <>
              Paket Pernikahan Mewah <br />
              <span className="italic text-[#C9A96E] font-light">Terkurasi di Bali</span>
            </>
          ) : (
            <>
              Curated Luxury <br />
              <span className="italic text-[#C9A96E] font-light">Bali Wedding</span> Packages
            </>
          )}
        </h1>

        {/* Sub-headline from Page 1 of PDF */}
        <p
          id="hero-subheadline"
          className="text-sm sm:text-base md:text-lg text-neutral-200 font-light max-w-3xl mx-auto leading-relaxed mb-10 tracking-wide"
        >
          {lang === 'ID' ? HERO_DATA.subtitleId : HERO_DATA.subtitleEn}
        </p>

        {/* CTA Buttons - Luxury Prestige Style */}
        <div
          id="hero-cta-buttons"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
        >
          {/* CTA Button 1: "Explore Packages" */}
          <a
            id="hero-explore-packages-btn"
            href="#packages"
            onClick={scrollToPackages}
            className="w-full sm:w-auto border border-white/80 text-white hover:border-[#C9A96E] hover:bg-white/10 px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-medium transition-all text-center rounded-sm min-w-[200px] flex items-center justify-center gap-2"
          >
            <span>{lang === 'ID' ? 'Jelajahi Paket' : 'Explore Packages'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A96E]" />
          </a>

          {/* CTA Button 2: "WhatsApp Consultation" */}
          <a
            id="hero-whatsapp-consultation-btn"
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#C9A96E] hover:bg-[#B8985D] text-white px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-md text-center flex items-center justify-center gap-2 rounded-sm min-w-[200px]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{lang === 'ID' ? 'Konsultasi WhatsApp' : 'WhatsApp Us'}</span>
          </a>
        </div>

        {/* Trust Badges Minimalist Strip */}
        <div
          id="hero-trust-strip"
          className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-white">Modern Minimalism</p>
              <p className="text-[11px] text-neutral-300 font-light">
                {lang === 'ID' ? 'Estetika Tropis Elegan' : 'Refined Aesthetics'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center shrink-0">
              <Compass className="w-3.5 h-3.5 text-[#C9A96E]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-white">Island-Wide</p>
              <p className="text-[11px] text-neutral-300 font-light">
                {lang === 'ID' ? 'Uluwatu, Canggu & Ubud' : 'Cliffside & Private Villas'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-3.5 h-3.5 text-[#C9A96E]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-white">100% Bespoke</p>
              <p className="text-[11px] text-neutral-300 font-light">
                {lang === 'ID' ? 'Perencanaan Personal' : 'Tailored Coordination'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center shrink-0">
              <Award className="w-3.5 h-3.5 text-[#C9A96E]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-white">10+ Years</p>
              <p className="text-[11px] text-neutral-300 font-light">
                {lang === 'ID' ? 'Standar Internasional' : 'Global Discerning Couples'}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <a
        id="hero-scroll-indicator"
        href="#about"
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/70 hover:text-[#C9A96E] transition-colors flex flex-col items-center gap-1 cursor-pointer"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-light">
          {lang === 'ID' ? 'Pelajari Lebih Lanjut' : 'Discover More'}
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};

