import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUpRight, Menu, X, Sparkles, Phone, Mail, Calendar } from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/weddingData';

interface HeaderProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  onOpenConsultation?: () => void;
  onOpenGuideModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenConsultation,
  onOpenGuideModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when fullscreen menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // 8 Core Luxury Navigation Links
  const navLinks = [
    {
      href: '#home',
      num: '01',
      labelEn: 'Home',
      labelId: 'Beranda',
      subEn: 'Sanctuary & Introduction',
      subId: 'Pengantar & Suaka Pernikahan',
    },
    {
      href: '#about',
      num: '02',
      labelEn: 'About',
      labelId: 'Tentang Kami',
      subEn: 'Our Heritage & Artistry',
      subId: 'Filosofi & Dedikasi Kami',
    },
    {
      href: '#packages',
      num: '03',
      labelEn: 'Packages',
      labelId: 'Paket Pernikahan',
      subEn: 'Bespoke Collections & Investment',
      subId: 'Koleksi & Investasi Terkurasi',
    },
    {
      href: '#venues',
      num: '04',
      labelEn: 'Venues',
      labelId: 'Katalog Venue',
      subEn: 'Off-Market Clifftop & Jungle Estates',
      subId: 'Suaka Tebing & Rimba Privat',
    },
    {
      href: '#services',
      num: '05',
      labelEn: 'Heritage & Services',
      labelId: 'Heritage & Layanan',
      subEn: 'Haute Floral & Banjar Protocol',
      subId: 'Tata Bunga & Manajemen Adat',
    },
    {
      href: '#journey',
      num: '06',
      labelEn: 'Journey',
      labelId: 'Alur Perencanaan',
      subEn: 'Curated 6-Phase Milestone Voyage',
      subId: '6 Tahapan Perencanaan Sempurna',
    },
    {
      href: '#concierge',
      num: '07',
      labelEn: 'Concierge',
      labelId: 'Layanan Concierge',
      subEn: 'Guest Logistics & VIP Aviation',
      subId: 'Hospitality & Logistik Tamu',
    },
    {
      href: '#contact',
      num: '08',
      labelEn: 'Contact',
      labelId: 'Hubungi Kami',
      subEn: 'Discovery Consultation & WhatsApp',
      subId: 'Konsultasi & Reservasi Kalender',
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Close any other active modals and restore body scroll
    window.dispatchEvent(new CustomEvent('close-all-modals'));
    document.body.style.overflow = 'unset';

    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
      if (window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <>
      {/* ─── MINIMALIST LUXURY HEADER ─── */}
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-300 pointer-events-auto text-[#FDFBF7] h-[75px] sm:h-[80px] flex items-center shadow-lg ${
          isScrolled
            ? 'bg-[#111816]/95 backdrop-blur-md border-b border-[#C9A96E]/20'
            : 'bg-[#1A2421]/90 backdrop-blur-sm border-b border-[#C9A96E]/15'
        }`}
        style={{ zIndex: 10000 }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* 1. Brand Logo */}
            <a
              id="brand-logo-link"
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex flex-col text-left cursor-pointer group shrink-0 pointer-events-auto"
              title="Forever Bali Weddings Studio - Home"
            >
              <span
                className="font-serif text-lg sm:text-xl md:text-2xl text-[#C9A96E] tracking-[0.14em] font-light leading-tight transition-colors group-hover:text-[#DEBA7E]"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                FOREVER BALI
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-white/70 font-light -mt-0.5">
                Weddings Studio
              </span>
            </a>

            {/* 2. Right Side Controls: Language + WhatsApp Pill + Hamburger Button */}
            <div className="flex items-center gap-2.5 sm:gap-4 pointer-events-auto">
              {/* Language Switcher [ID | EN] */}
              <div
                id="header-lang-container"
                className="flex items-center p-0.5 rounded-xs border border-white/20 bg-black/40 text-[10px] sm:text-[11px] font-bold"
              >
                <button
                  id="lang-btn-id"
                  type="button"
                  onClick={() => onToggleLang('ID')}
                  className={`px-2 py-0.5 rounded-xs transition-all cursor-pointer pointer-events-auto ${
                    lang === 'ID'
                      ? 'bg-[#C9A96E] text-[#111816] font-semibold shadow-xs'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  ID
                </button>
                <button
                  id="lang-btn-en"
                  type="button"
                  onClick={() => onToggleLang('EN')}
                  className={`px-2 py-0.5 rounded-xs transition-all cursor-pointer pointer-events-auto ${
                    lang === 'EN'
                      ? 'bg-[#C9A96E] text-[#111816] font-semibold shadow-xs'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Direct WhatsApp Action Pill */}
              <a
                id="header-whatsapp-cta"
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-[11px] uppercase tracking-[0.15em] font-bold rounded-xs transition-all cursor-pointer shadow-md pointer-events-auto"
                title="Connect with VIP WhatsApp Desk"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span className="hidden xs:inline">WA</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Minimalist Hamburger Menu Button */}
              <button
                id="header-menu-toggle-btn"
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open Fullscreen Menu"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#C9A96E]/50 hover:border-[#C9A96E] bg-white/5 hover:bg-[#C9A96E]/15 text-[#C9A96E] text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold rounded-xs transition-all cursor-pointer pointer-events-auto shadow-xs"
              >
                <Menu className="w-4 h-4" />
                <span>MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── FULLSCREEN VIP OVERLAY MENU (OPTION A) ─── */}
      {isMenuOpen && (
        <div
          id="fullscreen-vip-menu-overlay"
          className="fixed inset-0 z-[10001] bg-[#111816] text-[#FDFBF7] flex flex-col justify-between overflow-y-auto animate-fadeIn"
          style={{ zIndex: 10001 }}
        >
          {/* Ambient Glow Elements */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A96E]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#1A2421] blur-3xl pointer-events-none" />

          {/* Top Bar inside Overlay */}
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex items-center justify-between border-b border-white/10 pb-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-medium">
                {lang === 'ID'
                  ? 'DIREKTORI VIP FOREVER BALI WEDDINGS'
                  : 'FOREVER BALI WEDDINGS VIP DIRECTORY'}
              </span>
            </div>

            {/* Close Button */}
            <button
              id="fullscreen-menu-close-btn"
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/20 hover:border-[#C9A96E] text-white/80 hover:text-[#C9A96E] rounded-xs text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <span>{lang === 'ID' ? 'TUTUP' : 'CLOSE'}</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Navigation Links Grid */}
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 my-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-12 lg:gap-x-20">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  id={`overlay-link-${link.href.replace('#', '')}`}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="group flex items-start gap-4 p-3 rounded-md hover:bg-white/[0.03] border-b border-white/5 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-xs font-mono text-[#C9A96E]/60 group-hover:text-[#C9A96E] tracking-widest pt-1 transition-colors">
                    {link.num}
                  </span>
                  <div className="flex-1">
                    <h3
                      className="text-2xl sm:text-3xl lg:text-4xl text-[#FDFBF7] group-hover:text-[#C9A96E] font-serif transition-colors tracking-wide leading-tight"
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    >
                      {lang === 'ID' ? link.labelId : link.labelEn}
                    </h3>
                    <p className="text-xs text-white/50 group-hover:text-white/70 font-light mt-1 transition-colors">
                      {lang === 'ID' ? link.subId : link.subEn}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-[#C9A96E] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Concierge & Fast-Action Footer */}
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4 text-white/60">
              <span className="text-[#C9A96E] font-serif italic text-sm">
                Aria Concierge Desk:
              </span>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C9A96E] transition-colors flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>+62 813-7007-4777</span>
              </a>
              <span className="hidden sm:inline text-white/20">|</span>
              <a
                href="mailto:foreverbaliwedding@gmail.com"
                className="hidden sm:flex hover:text-[#C9A96E] transition-colors items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>foreverbaliwedding@gmail.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              {onOpenGuideModal && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenGuideModal();
                  }}
                  className="px-4 py-2 border border-[#C9A96E]/40 hover:border-[#C9A96E] bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                >
                  {lang === 'ID' ? '2026 PDF GUIDE' : '2026 PDF GUIDE'}
                </button>
              )}

              {onOpenConsultation && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="px-5 py-2 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer shadow-md"
                >
                  {lang === 'ID' ? 'JADWALKAN DISCOVERY' : 'SCHEDULE DISCOVERY'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

