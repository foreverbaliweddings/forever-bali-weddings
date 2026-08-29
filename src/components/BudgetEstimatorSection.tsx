import React, { useState } from 'react';
import { Calculator, Sparkles, Users, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/weddingData';

interface BudgetEstimatorProps {
  lang: Language;
}

export const BudgetEstimatorSection: React.FC<BudgetEstimatorProps> = ({ lang }) => {
  const [guestCount, setGuestCount] = useState<number>(50);
  const [serviceScope, setServiceScope] = useState<'elopement' | 'styling' | 'full'>('full');
  const [venuePreference, setVenuePreference] = useState<'cliffside' | 'villa' | 'beach' | 'jungle'>('cliffside');
  const [includeNusantara, setIncludeNusantara] = useState<boolean>(false);

  // Dynamic pricing algorithm (in USD & IDR)
  const calculateBudget = () => {
    let baseMinUSD = 6500;
    let baseMaxUSD = 9500;

    if (serviceScope === 'elopement') {
      baseMinUSD = 4500;
      baseMaxUSD = 7500;
    } else if (serviceScope === 'styling') {
      baseMinUSD = 7000;
      baseMaxUSD = 11000;
    } else if (serviceScope === 'full') {
      baseMinUSD = 12000;
      baseMaxUSD = 18000;
    }

    // Per guest catering and beverage allowance multiplier
    const guestCostPerPersonMin = 95;
    const guestCostPerPersonMax = 160;
    const guestAddMin = guestCount * guestCostPerPersonMin;
    const guestAddMax = guestCount * guestCostPerPersonMax;

    // Venue premium
    let venuePremiumMin = 0;
    let venuePremiumMax = 0;
    if (venuePreference === 'cliffside') {
      venuePremiumMin = 4000;
      venuePremiumMax = 7000;
    } else if (venuePreference === 'beach') {
      venuePremiumMin = 3000;
      venuePremiumMax = 5500;
    } else if (venuePreference === 'jungle') {
      venuePremiumMin = 2500;
      venuePremiumMax = 4500;
    } else {
      venuePremiumMin = 2000;
      venuePremiumMax = 4000;
    }

    // Cultural blessing add-on
    const culturalAdd = includeNusantara ? 1800 : 0;

    const totalMinUSD = baseMinUSD + guestAddMin + venuePremiumMin + culturalAdd;
    const totalMaxUSD = baseMaxUSD + guestAddMax + venuePremiumMax + culturalAdd;

    const totalMinIDR = Math.round((totalMinUSD * 16200) / 1000000);
    const totalMaxIDR = Math.round((totalMaxUSD * 16200) / 1000000);

    return {
      minUSD: totalMinUSD.toLocaleString('en-US'),
      maxUSD: totalMaxUSD.toLocaleString('en-US'),
      minIDR: totalMinIDR,
      maxIDR: totalMaxIDR,
    };
  };

  const budget = calculateBudget();

  const getScopeLabel = (scopeKey: string) => {
    switch (scopeKey) {
      case 'elopement':
        return lang === 'ID' ? 'Intimate Elopement (2-15 Pax)' : 'Intimate Elopement (2-15 Pax)';
      case 'styling':
        return lang === 'ID' ? 'Design & Styling Only' : 'Design & Styling Only';
      case 'full':
      default:
        return lang === 'ID' ? 'Full Planning & 360° Production' : 'Full Planning & 360° Production';
    }
  };

  const getVenueLabel = (vKey: string) => {
    switch (vKey) {
      case 'cliffside':
        return lang === 'ID' ? 'Uluwatu Clifftop Estate' : 'Uluwatu Clifftop Estate';
      case 'beach':
        return lang === 'ID' ? 'Nusa Dua Beachfront' : 'Nusa Dua Beachfront';
      case 'jungle':
        return lang === 'ID' ? 'Ubud Rainforest Sanctuary' : 'Ubud Rainforest Sanctuary';
      case 'villa':
      default:
        return lang === 'ID' ? 'Private Canggu / Seminyak Villa' : 'Private Canggu / Seminyak Villa';
    }
  };

  const getWhatsAppEstimateUrl = () => {
    const scopeName = getScopeLabel(serviceScope);
    const venueName = getVenueLabel(venuePreference);
    const heritageStr = includeNusantara
      ? lang === 'ID'
        ? 'Termasuk Upacara Adat Nusantara'
        : 'Includes Nusantara Heritage Blessing'
      : lang === 'ID'
      ? 'Tanpa Upacara Adat'
      : 'Standard Ceremony';

    const message =
      lang === 'ID'
        ? `Halo Forever Bali Weddings Studio, saya telah melakukan kalkulasi perkiraan investasi pernikahan di website:\n- Jumlah Tamu: ${guestCount} orang\n- Lingkup Layanan: ${scopeName}\n- Preferensi Lokasi: ${venueName}\n- Detail Budaya: ${heritageStr}\n- Estimasi Kisaran: $${budget.minUSD} - $${budget.maxUSD} (Rp ${budget.minIDR}jt - Rp ${budget.maxIDR}jt)\n\nMohon bantu konsultasi dan penyesuaian detail proposal resminya. Terima kasih!`
        : `Hello Forever Bali Weddings Studio, I generated an estimated wedding investment calculation from your website:\n- Guest Count: ${guestCount} guests\n- Service Scope: ${scopeName}\n- Venue Preference: ${venueName}\n- Cultural Ritual: ${heritageStr}\n- Estimated Range: $${budget.minUSD} - $${budget.maxUSD}\n\nCould we schedule a discovery call to discuss our tailored proposal? Thank you!`;

    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="budget-estimator"
      className="py-24 sm:py-32 bg-[#1A2421] text-[#FDFBF7] relative overflow-hidden border-t border-[#C9A96E]/20"
    >
      {/* Background Lighting Gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#C9A96E]/30 bg-white/5 mb-4 rounded-sm">
            <Calculator className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'TRANSPARANSI ANGGARAN' : 'TRANSPARENT INVESTMENT'}
            </span>
          </div>

          <h2
            id="budget-estimator-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? 'Estimasi Investasi Pernikahan' : 'Wedding Investment Estimator'}
          </h2>

          <div className="w-16 h-[1.5px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            {lang === 'ID'
              ? 'Gunakan kalkulator interaktif kami untuk mendapatkan gambaran alokasi investasi berdasarkan jumlah tamu, tipe lokasi, dan tingkat layanan perencana.'
              : 'Calculate an immediate indicative investment range tailored to your guest size, enclave preference, and planning scope with absolute pricing transparency.'}
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* Left Column: Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-sm p-6 sm:p-8 backdrop-blur-sm space-y-8">
            
            {/* 1. Guest Count Slider (20 to 150+ guests) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="guest-slider-input"
                  className="text-xs uppercase tracking-[0.18em] text-[#C9A96E] font-semibold flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>{lang === 'ID' ? 'Jumlah Tamu Undangan' : 'Estimated Guest Count'}</span>
                </label>
                <span className="px-3 py-1 bg-[#C9A96E] text-[#1A2421] font-mono text-sm font-bold rounded-xs">
                  {guestCount} {guestCount >= 150 ? '+ Guests' : 'Guests'}
                </span>
              </div>

              <input
                id="guest-slider-input"
                type="range"
                min="20"
                max="160"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
              />

              <div className="flex justify-between text-[11px] text-white/50 font-mono">
                <span>20 {lang === 'ID' ? 'Tamu (Intim)' : 'Pax (Intimate)'}</span>
                <span>80 {lang === 'ID' ? 'Tamu (Medium)' : 'Pax (Medium)'}</span>
                <span>150+ {lang === 'ID' ? 'Tamu (Grand)' : 'Pax (Grand)'}</span>
              </div>
            </div>

            {/* 2. Service Scope Selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.18em] text-[#C9A96E] font-semibold block">
                {lang === 'ID' ? 'Tingkat Lingkup Layanan' : 'Service Scope Selection'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'elopement',
                    title: 'Elopement',
                    sub: lang === 'ID' ? '2-15 Tamu' : '2-15 Guests',
                  },
                  {
                    id: 'styling',
                    title: 'Design & Styling',
                    sub: lang === 'ID' ? 'Dekorasi & Konsep' : 'Aesthetics Only',
                  },
                  {
                    id: 'full',
                    title: 'Full Planning',
                    sub: lang === 'ID' ? '360° Orkestrasi' : 'Turnkey VIP',
                  },
                ].map((s) => {
                  const isSelected = serviceScope === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceScope(s.id as any)}
                      className={`p-3.5 rounded-xs border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C9A96E] bg-[#C9A96E]/20 text-white shadow-md'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider">{s.title}</div>
                      <div className="text-[10px] text-[#C9A96E] mt-0.5">{s.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Venue Preference */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.18em] text-[#C9A96E] font-semibold block">
                {lang === 'ID' ? 'Preferensi Tipe Venue' : 'Enclave & Venue Preference'}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'cliffside', label: 'Uluwatu Cliff' },
                  { id: 'villa', label: 'Private Villa' },
                  { id: 'jungle', label: 'Ubud Forest' },
                  { id: 'beach', label: 'Beachfront' },
                ].map((v) => {
                  const isSelected = venuePreference === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVenuePreference(v.id as any)}
                      className={`py-2 px-3 rounded-xs border text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C9A96E] bg-[#C9A96E] text-[#1A2421] font-bold shadow-md'
                          : 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10'
                      }`}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Nusantara Cultural Add-on */}
            <div className="pt-2 border-t border-white/10">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={includeNusantara}
                  onChange={(e) => setIncludeNusantara(e.target.checked)}
                  className="w-4 h-4 rounded-xs text-[#C9A96E] accent-[#C9A96E] cursor-pointer"
                />
                <span className="text-xs text-white/90 group-hover:text-[#C9A96E] transition-colors">
                  {lang === 'ID'
                    ? 'Sertakan Upacara Adat Bali / Nusantara Heritage Blessing (+ Legal Concierge)'
                    : 'Include Traditional Balinese Blessing / Nusantara Heritage Rituals (+ Legal)'}
                </span>
              </label>
            </div>

          </div>

          {/* Right Column: Dynamic Price Range Output & Action Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#24312D] to-[#1A2421] border border-[#C9A96E]/40 rounded-sm p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold block mb-1">
                {lang === 'ID' ? 'HASIL ESTIMASI INVESTASI' : 'ESTIMATED INVESTMENT RANGE'}
              </span>
              <h3
                className="text-2xl font-serif text-white font-normal"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {lang === 'ID' ? 'Transparansi Bebas Biaya Tersembunyi' : 'Transparent & Bespoke'}
              </h3>
            </div>

            {/* Prominent Price Display */}
            <div className="p-5 bg-black/40 border border-[#C9A96E]/30 rounded-xs space-y-2">
              <div className="text-xs text-white/60 uppercase tracking-widest">
                {lang === 'ID' ? 'Kisaran Nilai Investasi (USD)' : 'Estimated Range (USD)'}
              </div>
              <div className="text-3xl sm:text-4xl font-serif text-[#C9A96E] font-medium tracking-tight">
                ${budget.minUSD} <span className="text-white/60 text-2xl font-light">–</span> ${budget.maxUSD}
              </div>
              <div className="text-xs text-white/70 font-mono pt-1 border-t border-white/10">
                ≈ IDR {budget.minIDR} Juta – {budget.maxIDR} Juta (Nett)
              </div>
            </div>

            {/* Inclusions summary list */}
            <div className="space-y-2 text-xs text-neutral-300 font-light">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                <span>{guestCount} {lang === 'ID' ? 'Pax Jamuan Makan & Minuman' : 'Guests Banquet Allowance'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                <span>{getScopeLabel(serviceScope)}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                <span>{getVenueLabel(venuePreference)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                <span>{lang === 'ID' ? 'Garansi Tidak Ada Biaya Tersembunyi' : '100% Zero Hidden Fees Guarantee'}</span>
              </div>
            </div>

            {/* Direct WhatsApp Consultation Button */}
            <div className="pt-2">
              <a
                id="whatsapp-budget-estimate-btn"
                href={getWhatsAppEstimateUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 rounded-xs shadow-lg group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{lang === 'ID' ? 'KONSULTASI HASIL ESTIMASI' : 'INQUIRE ESTIMATE VIA WHATSAPP'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="text-[10px] text-center text-white/50 font-light mt-2">
                {lang === 'ID'
                  ? 'Kirim kalkulasi ini langsung ke WhatsApp tim perencana utama untuk penawaran resmi.'
                  : 'Sends this exact breakdown directly to our Lead Wedding Planner via WhatsApp.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
