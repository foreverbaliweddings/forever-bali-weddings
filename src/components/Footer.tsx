import React from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Instagram,
  Heart,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/weddingData';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-[#1A1815] text-[#FDFBF7] pt-20 pb-12 border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Mission (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span
                className="font-serif tracking-[0.15em] text-2xl font-light text-[#C9A96E]"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                FOREVER BALI
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-light -mt-0.5">
                Weddings Studio
              </span>
            </div>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-md pt-2">
              {lang === 'ID'
                ? 'Studio perencana pernikahan mewah & bespoke destination celebrations di Bali. Harmoni keindahan alam tropis dengan standar internasional pasangan global.'
                : 'Bespoke destination celebrations, refined tropical aesthetics, and seamless international planning services for discerning global couples.'}
            </p>

            {/* Social Links */}
            <div className="pt-4 flex items-center space-x-3">
              {/* Instagram */}
              <a
                id="footer-instagram-link"
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-sm bg-white/5 hover:bg-[#C9A96E] text-neutral-300 hover:text-white border border-white/10 transition-all duration-300 flex items-center justify-center"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Pinterest */}
              <a
                id="footer-pinterest-link"
                href={CONTACT_INFO.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-sm bg-white/5 hover:bg-[#C9A96E] text-neutral-300 hover:text-white border border-white/10 transition-all duration-300 flex items-center justify-center font-serif text-sm font-semibold"
              >
                P
              </a>

              {/* TikTok */}
              <a
                id="footer-tiktok-link"
                href={CONTACT_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-sm bg-white/5 hover:bg-[#C9A96E] text-neutral-300 hover:text-white border border-white/10 transition-all duration-300 flex items-center justify-center font-sans text-xs font-bold"
              >
                TT
              </a>

              {/* WhatsApp */}
              <a
                id="footer-wa-social-link"
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-sm bg-white/5 hover:bg-[#C9A96E] text-neutral-300 hover:text-white border border-white/10 transition-all duration-300 flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (Col 6-8) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold">
              {lang === 'ID' ? 'Navigasi' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
              <li>
                <a
                  href="#home"
                  onClick={(e) => scrollToSection(e, 'home')}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {lang === 'ID' ? 'Beranda' : 'Home'}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, 'about')}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {lang === 'ID' ? 'Tentang Kami' : 'About Us'}
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  onClick={(e) => scrollToSection(e, 'packages')}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {lang === 'ID' ? 'Paket Wedding' : 'Wedding Packages'}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => scrollToSection(e, 'gallery')}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {lang === 'ID' ? 'Galeri & Portofolio' : 'Gallery & Portfolio'}
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => scrollToSection(e, 'testimonials')}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {lang === 'ID' ? 'Ulasan Pasangan' : 'Love Stories & Reviews'}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {lang === 'ID' ? 'Kontak & Konsultasi' : 'Contact & Inquiries'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Summary (Col 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold">
              {lang === 'ID' ? 'Kontak Resmi' : 'Official Contact'}
            </h4>
            <div className="space-y-3 text-xs text-neutral-400 font-light">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 fill-current" />
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </p>
            </div>

            <div className="pt-3">
              <a
                id="footer-book-consultation-btn"
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs font-semibold uppercase tracking-[0.15em] transition-all shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>{lang === 'ID' ? 'Jadwalkan Konsultasi' : 'Book Consultation'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-light">
          <p id="footer-copyright">
            © {new Date().getFullYear()} Forever Bali Wedding. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-neutral-400">
            <span>Crafted with quiet luxury for Bali destination celebrations</span>
            <span className="text-[#C9A96E]">✧</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
