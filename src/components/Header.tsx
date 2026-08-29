import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/weddingData';

interface HeaderProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  onOpenConsultation: () => void;
  onOpenGuideModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenConsultation,
  onOpenGuideModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedMobileRoute, setSelectedMobileRoute] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', labelId: 'HOME', labelEn: 'HOME' },
    { href: '#about', labelId: 'ABOUT', labelEn: 'ABOUT' },
    { href: '#packages', labelId: 'PACKAGES', labelEn: 'PACKAGES' },
    { href: '#venues', labelId: 'VENUES', labelEn: 'VENUES' },
    { href: '#heritage', labelId: 'HERITAGE', labelEn: 'HERITAGE' },
    { href: '#services', labelId: 'SERVICES', labelEn: 'SERVICES' },
    { href: '#journey', labelId: 'JOURNEY', labelEn: 'JOURNEY' },
    { href: '#concierge', labelId: 'CONCIERGE', labelEn: 'CONCIERGE' },
    { href: '#contact', labelId: 'CONTACT', labelEn: 'CONTACT' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Force close any active lightboxes or modals and restore scroll
    window.dispatchEvent(new CustomEvent('close-all-modals'));
    document.body.style.overflow = 'unset';

    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const headerOffset = 75;
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

  const handleMobileSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const href = e.target.value;
    if (!href) return;
    setSelectedMobileRoute(href);

    // Force close any active lightboxes or modals and restore scroll
    window.dispatchEvent(new CustomEvent('close-all-modals'));
    document.body.style.overflow = 'unset';

    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const headerOffset = 75;
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
    // Reset selection after trigger
    setTimeout(() => setSelectedMobileRoute(''), 300);
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-[10000] transition-all duration-300 pointer-events-auto bg-[#1A2421]/95 backdrop-blur-md border-b border-[#C9A96E]/20 text-[#FDFBF7] h-[75px] sm:h-[80px] flex items-center shadow-lg"
      style={{ zIndex: 10000 }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          {/* Left Side: Forever Bali Weddings Brand Logo */}
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

          {/* Center: Desktop Horizontal Navigation Links */}
          <nav
            id="desktop-header-nav"
            className="hidden xl:flex items-center gap-5 lg:gap-6 pointer-events-auto"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/80 hover:text-[#C9A96E] transition-colors py-1 cursor-pointer pointer-events-auto"
              >
                {lang === 'ID' ? item.labelId : item.labelEn}
              </a>
            ))}
          </nav>

          {/* Right Side: Language Toggle + WhatsApp CTA + Mobile Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
            {/* Mobile Native Dropdown Selector (No overlay/backdrop required) */}
            <div className="xl:hidden relative">
              <select
                id="mobile-navigation-select"
                value={selectedMobileRoute}
                onChange={handleMobileSelectChange}
                aria-label="Navigate to section"
                className="appearance-none bg-[#24312D] text-[#C9A96E] text-xs uppercase tracking-[0.15em] font-medium py-1.5 px-3 pr-7 rounded-xs border border-[#C9A96E]/40 focus:outline-none focus:border-[#C9A96E] cursor-pointer pointer-events-auto shadow-xs"
              >
                <option value="" disabled className="text-white/60 bg-[#1A2421]">
                  MENU ▾
                </option>
                {navLinks.map((item) => (
                  <option
                    key={item.href}
                    value={item.href}
                    className="text-white bg-[#1A2421] py-1"
                  >
                    {lang === 'ID' ? item.labelId : item.labelEn}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#C9A96E]">
                <span className="text-[10px]">▼</span>
              </div>
            </div>

            {/* Language Switcher [ID | EN] */}
            <div
              id="header-lang-container"
              className="flex items-center p-0.5 rounded-xs border border-white/20 bg-black/30 text-[10px] sm:text-[11px] font-bold"
            >
              <button
                id="lang-btn-id"
                type="button"
                onClick={() => onToggleLang('ID')}
                className={`px-2 py-0.5 rounded-xs transition-all cursor-pointer pointer-events-auto ${
                  lang === 'ID'
                    ? 'bg-[#C9A96E] text-white shadow-xs'
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
                    ? 'bg-[#C9A96E] text-white shadow-xs'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* 2026 Wedding Guide PDF Quick Trigger */}
            {onOpenGuideModal && (
              <button
                id="header-guide-cta"
                type="button"
                onClick={onOpenGuideModal}
                className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 border border-[#C9A96E]/40 hover:border-[#C9A96E] bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] text-[11px] uppercase tracking-[0.15em] font-medium rounded-xs transition-colors cursor-pointer pointer-events-auto"
              >
                <span>{lang === 'ID' ? '2026 GUIDE (PDF)' : '2026 GUIDE (PDF)'}</span>
              </button>
            )}

            {/* Direct WhatsApp Action Button */}
            <a
              id="header-whatsapp-cta"
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-[11px] uppercase tracking-[0.15em] font-semibold rounded-xs transition-all cursor-pointer shadow-md pointer-events-auto"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WA</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Fast Consultation Trigger Button */}
            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden md:inline-flex items-center px-3.5 py-1.5 border border-[#C9A96E]/50 hover:border-[#C9A96E] bg-white/5 hover:bg-white/10 text-[#C9A96E] text-[11px] uppercase tracking-[0.15em] font-medium rounded-xs transition-colors cursor-pointer pointer-events-auto"
            >
              {lang === 'ID' ? 'KONSULTASI' : 'INQUIRE'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
