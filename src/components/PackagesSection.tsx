import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, Check, Users, ShieldCheck, FileCheck } from 'lucide-react';
import { Language, WeddingPackage } from '../types';
import { WEDDING_PACKAGES, CONTACT_INFO } from '../data/weddingData';

interface PackagesSectionProps {
  lang: Language;
  onSelectPackage: (packageName: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  lang,
  onSelectPackage,
}) => {
  const getWhatsAppPackageLink = (pkg: WeddingPackage) => {
    const pkgName = lang === 'ID' ? pkg.nameId : pkg.nameEn;
    const text =
      lang === 'ID'
        ? `Halo Forever Bali Weddings Studio, saya ingin menanyakan informasi & ketersediaan untuk "${pkgName}" (${pkg.priceRange}).`
        : `Hello Forever Bali Weddings Studio, I would like to inquire about the "${pkgName}" (${pkg.priceRange}).`;
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSelectPackageForForm = (pkg: WeddingPackage) => {
    const pkgName = lang === 'ID' ? pkg.nameId : pkg.nameEn;
    onSelectPackage(pkgName);
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-24 sm:py-32 bg-[#F7F4EE] relative">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C9A96E]/40 bg-[#FDFBF7] mb-4">
            <span className="text-[#C9A96E] font-serif text-sm">✧</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'Koleksi Paket Pernikahan' : 'Curated Collections'}
            </span>
          </div>
          
          <h2
            id="packages-main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? 'Pilihan Paket Pernikahan' : 'Curated Luxury Packages'}
          </h2>
          
          <div className="w-16 h-[1.5px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#555555] font-light font-sans max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Tiga tingkatan layanan berstandar internasional yang dirancang untuk mewujudkan perayaan intim maupun megah tanpa kompromi.'
              : 'Three signature tiers designed to accommodate everything from intimate elopements to lavish full-scale island celebrations.'}
          </p>
        </div>

        {/* Packages 3-Column Display matching Pages 3, 4, 5 of PDF */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {WEDDING_PACKAGES.map((pkg) => {
            const isPopular = pkg.isPopular;
            const features = lang === 'ID' ? pkg.featuresId : pkg.featuresEn;
            const name = lang === 'ID' ? pkg.nameId : pkg.nameEn;
            const eyebrow = lang === 'ID' ? pkg.eyebrowId : pkg.eyebrowEn;
            const subtitle = lang === 'ID' ? pkg.subtitleId : pkg.subtitleEn;
            const guestCount = lang === 'ID' ? pkg.guestCountId : pkg.guestCountEn;
            const description = lang === 'ID' ? pkg.descriptionId : pkg.descriptionEn;
            const whyTitle = lang === 'ID' ? pkg.whyChooseTitleId : pkg.whyChooseTitleEn;
            const whyDesc = lang === 'ID' ? pkg.whyChooseDescId : pkg.whyChooseDescEn;
            const whyNote = lang === 'ID' ? pkg.whyChooseNoteId : pkg.whyChooseNoteEn;

            return (
              <div
                key={pkg.id}
                id={`package-card-${pkg.code}`}
                className={`relative rounded-sm bg-white p-7 sm:p-8 border transition-all duration-300 flex flex-col justify-between hover:shadow-xl group ${
                  isPopular
                    ? 'border-[#C9A96E] shadow-md ring-1 ring-[#C9A96E]/30'
                    : 'border-[#E5E1D8] shadow-sm'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-[#C9A96E] text-white text-[9px] font-semibold px-3 py-1 uppercase tracking-[0.2em]">
                    {lang === 'ID' ? 'Paling Diminati' : 'Most Requested'}
                  </div>
                )}

                <div>
                  {/* Eyebrow from PDF */}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-medium block mb-2">
                    {eyebrow}
                  </span>

                  {/* Title & Subtitle */}
                  <h3
                    className="text-2xl font-serif text-[#222222] font-normal leading-tight mb-1 group-hover:text-[#C9A96E] transition-colors"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#888888] font-medium mb-4">
                    {subtitle}
                  </p>

                  {/* Guest Count Pill */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F4EE] border border-[#E5E1D8] text-[10px] uppercase tracking-[0.15em] text-[#555555] font-medium rounded-sm mb-5">
                    <Users className="w-3 h-3 text-[#C9A96E]" />
                    <span>{guestCount}</span>
                  </div>

                  {/* Package Cover Image */}
                  <div className="relative h-48 overflow-hidden mb-6 border border-[#E5E1D8] rounded-sm">
                    <img
                      src={pkg.image}
                      alt={name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white text-[11px] uppercase tracking-[0.18em] font-light">
                      {pkg.stars}
                    </div>
                  </div>

                  {/* Inclusions List from PDF */}
                  <div className="space-y-3 mb-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#222222] font-semibold">
                      {lang === 'ID' ? 'Fasilitas Termasuk:' : 'Key Inclusions:'}
                    </p>
                    {features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#444444] font-light leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Why Choose / Atmosphere Card from PDF */}
                  <div className="p-4 bg-[#FDFBF7] border border-[#E5E1D8] rounded-sm mb-6">
                    <p className="text-xs font-serif font-medium text-[#222222] mb-1">
                      {whyTitle}
                    </p>
                    <p className="text-[11px] text-[#666666] font-light leading-relaxed mb-3">
                      {whyDesc}
                    </p>
                    {whyNote && (
                      <div className="flex items-center gap-1.5 text-[10px] text-[#C9A96E] font-medium pt-2 border-t border-[#E5E1D8]">
                        <FileCheck className="w-3 h-3 shrink-0" />
                        <span>{whyNote}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Investment Price & Action Buttons */}
                <div className="pt-4 border-t border-dotted border-[#E5E1D8] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#888888]">
                      {lang === 'ID' ? 'Investasi' : 'Investment Range'}
                    </span>
                    <span className="text-lg font-serif font-semibold text-[#C9A96E]">
                      {pkg.priceRange}
                    </span>
                  </div>

                  <button
                    id={`select-package-btn-${pkg.code}`}
                    type="button"
                    onClick={() => handleSelectPackageForForm(pkg)}
                    className={`w-full py-3 px-4 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-sm ${
                      isPopular
                        ? 'bg-[#C9A96E] hover:bg-[#B8985D] text-white shadow-sm'
                        : 'border border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white'
                    }`}
                  >
                    <span>{lang === 'ID' ? 'Pilih Paket Ini' : 'Select This Tier'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    id={`whatsapp-package-btn-${pkg.code}`}
                    href={getWhatsAppPackageLink(pkg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 border border-[#E5E1D8] text-[#555555] hover:text-[#222222] hover:border-[#C9A96E] text-xs font-medium tracking-[0.1em] transition-all flex items-center justify-center gap-2 text-center rounded-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span>{lang === 'ID' ? 'Tanya via WhatsApp' : 'Inquire on WhatsApp'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
