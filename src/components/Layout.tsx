import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu overlay saat berpindah halaman
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: lang === 'id' ? 'BERANDA' : 'HOME', href: '/' },
    { label: lang === 'id' ? 'TENTANG KAMI' : 'ABOUT', href: '/about' },
    { label: lang === 'id' ? 'PAKET PERNIKAHAN' : 'PACKAGES', href: '/packages' },
    { label: lang === 'id' ? 'KATALOG VENUE' : 'VENUES', href: '/venues' },
    { label: lang === 'id' ? 'GALERI & HERITAGE' : 'SERVICES', href: '/services' },
    { label: lang === 'id' ? 'ALUR PERENCANAAN' : 'JOURNEY', href: '/#journey' },
    { label: lang === 'id' ? 'LAYANAN CONCIERGE' : 'CONCIERGE', href: '/#concierge' },
    { label: lang === 'id' ? 'HUBUNGI KAMI' : 'CONTACT', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-[#111816] text-[#FDFBF7] font-sans">
      {/* Top Floating Clean Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 flex justify-between items-center ${
          scrolled ? 'bg-[#111816]/95 backdrop-blur-md border-b border-[#C9A96E]/20' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span className="font-serif text-[#C9A96E] tracking-[3px] text-base font-bold">
            FOREVER BALI
          </span>
          <span className="text-[9px] text-[#FDFBF7]/80 tracking-[2px] -mt-1">
            WEDDINGS STUDIO
          </span>
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <button
              onClick={() => setLang('id')}
              className={`transition-colors ${lang === 'id' ? 'text-[#C9A96E]' : 'text-[#8A9A86]'}`}
            >
              ID
            </button>
            <span className="text-[#C9A96E]/40">|</span>
            <button
              onClick={() => setLang('en')}
              className={`transition-colors ${lang === 'en' ? 'text-[#C9A96E]' : 'text-[#8A9A86]'}`}
            >
              EN
            </button>
          </div>

          {/* WhatsApp Direct Pill Button */}
          <a
            href="https://wa.me/6281370074777?text=Hello%20Forever%20Bali%20Weddings%2C%20I%20would%20like%20to%20consult%20with%20Aria."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C9A96E] text-[#111816] px-4 py-2 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 hover:bg-[#b5955a] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WA ↗</span>
          </a>

          {/* Hamburger Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 border border-[#C9A96E]/40 px-3 py-1.5 rounded text-xs font-medium text-[#FDFBF7] hover:border-[#C9A96E] transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-4 h-4 text-[#C9A96E]" />
            <span className="tracking-widest">MENU</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Quiet Luxury Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#111816]/98 backdrop-blur-2xl flex flex-col justify-center items-center px-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 md:right-12 text-[#C9A96E] hover:text-[#FDFBF7] transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="text-center max-w-lg w-full">
              <p className="font-serif text-[#C9A96E] text-xs tracking-[4px] mb-1">
                FOREVER BALI WEDDINGS
              </p>
              <p className="text-[#8A9A86] text-[10px] tracking-[2px] mb-8">
                PRIVATE DESTINATION WEDDING STUDIO
              </p>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4">
                {navItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-serif text-xl md:text-2xl text-[#FDFBF7] hover:text-[#C9A96E] tracking-[3px] transition-colors py-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Concierge Desk Information */}
              <div className="mt-10 pt-6 border-t border-[#C9A96E]/20">
                <p className="text-[#C9A96E] text-[11px] tracking-[2px] mb-1 font-semibold">
                  DIRECT VIP CONCIERGE DESK
                </p>
                <p className="text-[#8A9A86] text-xs">
                  +62 813-7007-4777 • Uluwatu | Ubud | Canggu
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outlet Page Content */}
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}