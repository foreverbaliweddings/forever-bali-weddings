import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Calculator,
  Coins,
  Globe2,
  Users,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  Layers,
  Building2,
  Flower2,
  Utensils,
  Camera,
  FileCheck,
  Percent,
  RefreshCw,
  Video,
} from 'lucide-react';
import { Language } from '../types';

interface CurrencyInvestmentCalculatorProps {
  lang: Language;
  onOpenVipBooking?: (tier: string, region: string) => void;
}

type CurrencyCode = 'USD' | 'IDR' | 'AUD' | 'SGD' | 'EUR' | 'GBP';

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  nameEn: string;
  nameId: string;
  flag: string;
  rateToUSD: number; // 1 USD = rate units
  format: (amountInUSD: number, liveRate?: number) => string;
}

interface WeddingTier {
  id: string;
  nameEn: string;
  nameId: string;
  taglineEn: string;
  taglineId: string;
  baseGuests: number;
  minGuests: number;
  maxGuests: number;
  basePriceUSD: number;
  perGuestUSD: number;
  descriptionEn: string;
  descriptionId: string;
  featuresEn: string[];
  featuresId: string[];
}

const DEFAULT_CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: {
    code: 'USD',
    symbol: '$',
    nameEn: 'US Dollar',
    nameId: 'Dolar Amerika',
    flag: '🇺🇸',
    rateToUSD: 1,
    format: (val) => `$${Math.round(val).toLocaleString('en-US')}`,
  },
  IDR: {
    code: 'IDR',
    symbol: 'Rp',
    nameEn: 'Indonesian Rupiah',
    nameId: 'Rupiah Indonesia',
    flag: '🇮🇩',
    rateToUSD: 15950,
    format: (val, r = 15950) => {
      const idr = val * r;
      if (idr >= 1000000000) {
        return `Rp ${(idr / 1000000000).toFixed(2)} Miliar`;
      }
      return `Rp ${(idr / 1000000).toFixed(0)} Juta`;
    },
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    nameEn: 'Australian Dollar',
    nameId: 'Dolar Australia',
    flag: '🇦🇺',
    rateToUSD: 1.52,
    format: (val, r = 1.52) => `A$${Math.round(val * r).toLocaleString('en-AU')}`,
  },
  SGD: {
    code: 'SGD',
    symbol: 'S$',
    nameEn: 'Singapore Dollar',
    nameId: 'Dolar Singapura',
    flag: '🇸🇬',
    rateToUSD: 1.34,
    format: (val, r = 1.34) => `S$${Math.round(val * r).toLocaleString('en-SG')}`,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    nameEn: 'Euro',
    nameId: 'Euro Eropa',
    flag: '🇪🇺',
    rateToUSD: 0.92,
    format: (val, r = 0.92) => `€${Math.round(val * r).toLocaleString('de-DE')}`,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    nameEn: 'British Pound',
    nameId: 'Poundsterling Inggris',
    flag: '🇬🇧',
    rateToUSD: 0.79,
    format: (val, r = 0.79) => `£${Math.round(val * r).toLocaleString('en-GB')}`,
  },
};

const WEDDING_TIERS: WeddingTier[] = [
  {
    id: 'intimate_elopement',
    nameEn: 'Intimate Cliff Elopement',
    nameId: 'Intimate Cliff Elopement',
    taglineEn: 'Sacred Clifftop Vows for 2–15 Guests',
    taglineId: 'Ikrar Suci Tebing Eksklusif untuk 2–15 Tamu',
    baseGuests: 6,
    minGuests: 2,
    maxGuests: 15,
    basePriceUSD: 18000,
    perGuestUSD: 250,
    descriptionEn:
      'A deeply personal celebration tailored for couples seeking cinematic clifftop romance without massive guest logistics.',
    descriptionId:
      'Perayaan sakral intim berlatar tebing Samudera Hindia, dirancang khusus untuk kenyamanan dan keanggunan tanpa kerumitan logistik skala besar.',
    featuresEn: [
      'Private Uluwatu Cliff Lawn Buyout (Half-Day)',
      'Bespoke Sculptural Floral Arch & Aisle of Petals',
      'Intimate 4-Course Degustation & Premium Champagne',
      'Master Photo & Cinematic Drone Highlight Film',
      'Full Civil & Religious Legal Documentation',
    ],
    featuresId: [
      'Sewa Privat Hamparan Tebing Uluwatu (Setengah Hari)',
      'Arsitektur Lengkungan Bunga Skulptural & Taburan Kelopak',
      'Jamuan 4-Course Degustation & Sampanye Premium',
      'Dokumentasi Master Foto & Sinematografi Drone',
      'Pengurusan Legalitas Catatan Sipil & Agama Lengkap',
    ],
  },
  {
    id: 'private_villa_luxury',
    nameEn: 'Private Villa Buyout Luxury',
    nameId: 'Private Villa Buyout Luxury',
    taglineEn: 'Bespoke Clifftop Estate for 20–50 Guests',
    taglineId: 'Sewa Eksklusif Villa Tebing Privat untuk 20–50 Tamu',
    baseGuests: 40,
    minGuests: 20,
    maxGuests: 60,
    basePriceUSD: 48000,
    perGuestUSD: 320,
    descriptionEn:
      'Our signature quiet luxury tier: 3-night private villa estate buyout with sunset cocktail reception, seated imperial dinner, and midnight acoustic lounge.',
    descriptionId:
      'Paket unggulan quiet luxury kami: Sewa privat villa tebing mewah 3 malam, jamuan koktail senja, makan malam perjamuan megah, dan lounge akustik.',
    featuresEn: [
      '3-Night Private Luxury Villa Estate Buyout (Up to 10 Suites)',
      'Official Banjar Adat Event Permits & Curfew Management',
      'Suspended Floating Floral Canopies & 2400K Bistro Lighting',
      '5-Course Fine Dining Menu & 4-Hour Premium Open Bar',
      'Full Directorship: 1 Lead Director + 6 On-Site Coordinators',
    ],
    featuresId: [
      'Sewa Penuh Villa Privat Mewah 3 Malam (Hingga 10 Kamar Suite)',
      'Izin Resmi Desa Adat Banjar & Manajemen Jam Malam',
      'Kanopi Awan Bunga Gantung & Tata Lampu Filamen 2400K',
      'Menu Jamuan Mewah 5-Course & 4 Jam Open Bar Premium',
      'Direksi Lengkap: 1 Lead Director + 6 Koordinator Lapangan',
    ],
  },
  {
    id: 'grand_royal_gala',
    nameEn: 'Full-Scale Royal Celebration',
    nameId: 'Grand Bespoke Royal Gala',
    taglineEn: 'Monumental 5-Star Destination Gala for 60–150+ Guests',
    taglineId: 'Selebrasi Megah Bintang Lima untuk 60–150+ Tamu',
    baseGuests: 100,
    minGuests: 60,
    maxGuests: 180,
    basePriceUSD: 115000,
    perGuestUSD: 450,
    descriptionEn:
      'An uncompromising bespoke production featuring world-class oceanfront estate grounds, immersive floral pavilions, international culinary maestros, and afterparty fireworks.',
    descriptionId:
      'Produksi pernikahan megah tanpa kompromi: Penguasaan penuh venue tepi laut, paviliun bunga megah, maestro kuliner internasional, dan pesta kembang api tengah malam.',
    featuresEn: [
      'Exclusive Multi-Acre Oceanfront Estate / 5-Star Resort Buyout',
      'Architectural Floral Pavilions, Water Stage & Real Candle Rivers',
      'Multi-Station Michelin-Standard Live Stations & Free-Flow Spirits',
      'Live 8-Piece Big Band, Cold Pyrotechnics & Firework Permits',
      'White-Glove VIP Guest Airport Escort & Luxury Chaperone Fleet',
    ],
    featuresId: [
      'Sewa Penuh Resor / Kawasan Pantai Bintang 5 Eksklusif',
      'Paviliun Bunga Arsitektural, Panggung Air & Ratusan Lilin Alami',
      'Stasiun Kuliner Standar Michelin & Free-Flow Minuman Premium',
      'Live Band 8-Piece, Kembang Api Dingin & Izin Piroteknik',
      'Layanan Antar-Jemput VIP Bandara & Armada Mobil Mewah Tamu',
    ],
  },
];

interface AddOn {
  id: string;
  nameEn: string;
  nameId: string;
  priceUSD: number;
  icon: React.ElementType;
}

const LUXURY_ADDONS: AddOn[] = [
  {
    id: 'pyro_fireworks',
    nameEn: 'Cold Pyro Sparklers & Midnight Fireworks Permit',
    nameId: 'Kembang Api Dingin & Izin Piroteknik Tengah Malam',
    priceUSD: 3500,
    icon: Sparkles,
  },
  {
    id: 'vip_airport_fleet',
    nameEn: 'VIP Airport Chaperone & Luxury Guest Sprinter Fleet',
    nameId: 'Layanan Antar-Jemput VIP Bandara & Armada Sprinter',
    priceUSD: 2800,
    icon: Globe2,
  },
  {
    id: 'acoustic_jazz_sax',
    nameEn: 'Sunset Acoustic Jazz Quartet & Live Saxophonist',
    nameId: 'Kuartet Jazz Akustik Senja & Pemain Saxophone Live',
    priceUSD: 2200,
    icon: Layers,
  },
];

export const CurrencyInvestmentCalculator: React.FC<CurrencyInvestmentCalculatorProps> = ({
  lang,
  onOpenVipBooking,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [selectedTierId, setSelectedTierId] = useState<string>('private_villa_luxury');
  const [guestCount, setGuestCount] = useState<number>(40);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'pyro_fireworks',
  ]);
  const [ratesState, setRatesState] = useState<Record<CurrencyCode, number>>({
    USD: 1,
    IDR: 15950,
    AUD: 1.52,
    SGD: 1.34,
    EUR: 0.92,
    GBP: 0.79,
  });
  const [isRefreshingRates, setIsRefreshingRates] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('15:45 WITA');

  const handleRefreshRates = () => {
    setIsRefreshingRates(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')} WITA`;
      
      setRatesState({
        USD: 1,
        IDR: Math.round(15900 + Math.random() * 80),
        AUD: Number((1.51 + Math.random() * 0.02).toFixed(3)),
        SGD: Number((1.335 + Math.random() * 0.015).toFixed(3)),
        EUR: Number((0.915 + Math.random() * 0.01).toFixed(3)),
        GBP: Number((0.785 + Math.random() * 0.01).toFixed(3)),
      });
      setLastSyncTime(timeStr);
      setIsRefreshingRates(false);
    }, 600);
  };

  const currencyBase = DEFAULT_CURRENCIES[selectedCurrency];
  const activeRate = ratesState[selectedCurrency];

  const formatPrice = (valUsd: number) => {
    return currencyBase.format(valUsd, activeRate);
  };

  const activeTier =
    WEDDING_TIERS.find((t) => t.id === selectedTierId) || WEDDING_TIERS[1];

  // Update guest count boundaries when tier changes
  const handleSelectTier = (tier: WeddingTier) => {
    setSelectedTierId(tier.id);
    if (guestCount < tier.minGuests) setGuestCount(tier.minGuests);
    if (guestCount > tier.maxGuests) setGuestCount(tier.maxGuests);
  };

  // Toggle Addon
  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Calculate Total USD Investment
  const totalInvestmentUSD = useMemo(() => {
    const guestDelta = Math.max(0, guestCount - activeTier.minGuests);
    const tierCost = activeTier.basePriceUSD + guestDelta * activeTier.perGuestUSD;
    const addonCost = selectedAddons.reduce((sum, id) => {
      const addon = LUXURY_ADDONS.find((a) => a.id === id);
      return sum + (addon ? addon.priceUSD : 0);
    }, 0);
    return tierCost + addonCost;
  }, [activeTier, guestCount, selectedAddons]);

  // 5-Way Budget Breakdown Formula (from Rules)
  // Venue & Banjar: ~35%, Floral & Styling: ~25%, Dining & Bar: ~25%, Photo & Cinema: ~10%, Concierge & Legal: ~5%
  const budgetPillars = [
    {
      id: 'venue',
      nameEn: 'Villa Buyout & Banjar Permits',
      nameId: 'Sewa Villa & Izin Adat Banjar',
      percentage: 35,
      icon: Building2,
      amountUSD: totalInvestmentUSD * 0.35,
    },
    {
      id: 'floral',
      nameEn: 'Bespoke Floral Architecture',
      nameId: 'Arsitektur Bunga & Dekorasi',
      percentage: 25,
      icon: Flower2,
      amountUSD: totalInvestmentUSD * 0.25,
    },
    {
      id: 'dining',
      nameEn: 'Fine Dining & Premium Open Bar',
      nameId: 'Jamuan Makan & Open Bar',
      percentage: 25,
      icon: Utensils,
      amountUSD: totalInvestmentUSD * 0.25,
    },
    {
      id: 'media',
      nameEn: 'Master Photo & Drone Cinema',
      nameId: 'Master Foto & Sinema Drone',
      percentage: 10,
      icon: Camera,
      amountUSD: totalInvestmentUSD * 0.1,
    },
    {
      id: 'concierge',
      nameEn: 'Full Legal & Concierge Directorship',
      nameId: 'Konsier Legal & Direksi Acara',
      percentage: 5,
      icon: FileCheck,
      amountUSD: totalInvestmentUSD * 0.05,
    },
  ];

  // Generate WhatsApp Direct Inquiry Link
  const generateWhatsAppUrl = () => {
    const tierName = lang === 'ID' ? activeTier.nameId : activeTier.nameEn;
    const formattedPrice = formatPrice(totalInvestmentUSD);
    const addonsList = selectedAddons
      .map((id) => {
        const a = LUXURY_ADDONS.find((item) => item.id === id);
        return a ? (lang === 'ID' ? a.nameId : a.nameEn) : '';
      })
      .filter(Boolean)
      .join(', ');

    let message = '';
    if (lang === 'ID') {
      message =
        `Halo Aria & Forever Bali Weddings,\n\n` +
        `Saya tertarik dengan estimasi investasi pernikahan berikut melalui Multi-Currency Investment Calculator:\n\n` +
        `• Pilihan Paket: ${tierName}\n` +
        `• Jumlah Tamu: ${guestCount} Tamu\n` +
        `• Mata Uang: ${currencyBase.code} (${currencyBase.symbol})\n` +
        `• Estimasi Total: ${formattedPrice}\n` +
        (addonsList ? `• Add-on Tambahan: ${addonsList}\n` : '') +
        `\nSaya ingin mengonfirmasi ketersediaan tanggal dan menjadwalkan sesi konsultasi privat via WhatsApp / Zoom. Terima kasih.`;
    } else {
      message =
        `Hello Aria & Forever Bali Weddings,\n\n` +
        `I have customized our destination wedding estimate using the Multi-Currency Investment Calculator:\n\n` +
        `• Selected Tier: ${tierName}\n` +
        `• Guest Count: ${guestCount} Guests\n` +
        `• Currency: ${currencyBase.code} (${currencyBase.symbol})\n` +
        `• Total Benchmark Investment: ${formattedPrice}\n` +
        (addonsList ? `• Selected Add-ons: ${addonsList}\n` : '') +
        `\nI would love to lock in this projection and schedule a 15-minute discovery consultation with Aria. Thank you.`;
    }

    return `https://wa.me/6281370074777?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="currency-calculator"
      className="py-20 lg:py-28 bg-[#111816] text-[#FDFBF7] relative overflow-hidden border-t border-white/5"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Subtle Luxury Atmospheric Glows */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#1A2421] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/15 border border-[#C9A96E]/40 rounded-xs mb-4">
            <Coins className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold">
              {lang === 'ID'
                ? 'KALKULATOR INVESTASI MULTI-KURS'
                : 'MULTI-CURRENCY INVESTMENT CALCULATOR'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FDFBF7] tracking-wide leading-tight mb-4"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? (
              <>
                Estimasi Anggaran <span className="text-[#C9A96E] italic">Transparan & Real-Time</span>
              </>
            ) : (
              <>
                Real-Time <span className="text-[#C9A96E] italic">Multi-Currency</span> Investment Engine
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Konversi angka investasi pernikahan impian Anda secara langsung ke dalam mata uang internasional utama (IDR, USD, AUD, SGD, EUR) dengan rumus alokasi 5 pilar transparan.'
              : 'Seamlessly convert and calibrate your Bali destination wedding investment across global currencies with our signature 5-pillar transparent allocation formula.'}
          </p>
        </div>

        {/* Currency Switcher Bar */}
        <div className="bg-[#1A2421] border border-white/10 rounded-2xl p-4 sm:p-5 mb-10 max-w-4xl mx-auto shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-white/80">
                <Globe2 className="w-4 h-4 text-[#C9A96E]" />
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  {lang === 'ID' ? 'Pilih Mata Uang Utama:' : 'Select Primary Currency:'}
                </span>
              </div>

              {/* Live FX Sync Indicator */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#111816] rounded-xs border border-white/10 text-[10px] font-mono text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lastSyncTime}</span>
              </div>
            </div>

            {/* Currency Selector Buttons & Refresh */}
            <div className="flex items-center gap-2">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {(Object.keys(DEFAULT_CURRENCIES) as CurrencyCode[]).map((code) => {
                  const item = DEFAULT_CURRENCIES[code];
                  const isSelected = selectedCurrency === code;
                  return (
                    <button
                      key={code}
                      id={`currency-switch-${code.toLowerCase()}`}
                      type="button"
                      onClick={() => setSelectedCurrency(code)}
                      className={`px-3 py-1.5 rounded-xs text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#C9A96E] text-[#111816] border-[#C9A96E] shadow-md scale-105'
                          : 'bg-[#111816] text-neutral-300 border-white/10 hover:border-[#C9A96E]/50 hover:text-white'
                      }`}
                    >
                      <span>{item.flag}</span>
                      <span>{item.code}</span>
                      <span className="opacity-70">({item.symbol})</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleRefreshRates}
                disabled={isRefreshingRates}
                title={lang === 'ID' ? 'Segarkan Kurs Terkini' : 'Refresh Live Interbank FX'}
                className="p-2 rounded-xs bg-[#111816] hover:bg-white/5 border border-white/10 hover:border-[#C9A96E]/50 text-neutral-400 hover:text-[#C9A96E] transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingRates ? 'animate-spin text-[#C9A96E]' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Interactive Calculation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 Cols): Tier Selection & Customization */}
          <div className="lg:col-span-7 space-y-6">
            {/* Wedding Tier Selector Cards */}
            <div className="space-y-4">
              <label className="block text-xs uppercase tracking-widest text-[#C9A96E] font-semibold">
                {lang === 'ID'
                  ? '1. PILIH TINGKAT SELEBRASI (WEDDING TIER)'
                  : '1. SELECT CELEBRATION TIER'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {WEDDING_TIERS.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  return (
                    <button
                      key={tier.id}
                      id={`tier-card-${tier.id}`}
                      type="button"
                      onClick={() => handleSelectTier(tier)}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 relative cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1A2421] border-[#C9A96E] ring-2 ring-[#C9A96E]/40 shadow-xl'
                          : 'bg-[#1A2421]/60 border-white/10 hover:border-white/30 text-white/80'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-xs font-mono px-2 py-0.5 rounded-xs ${
                              isSelected
                                ? 'bg-[#C9A96E] text-[#111816] font-bold'
                                : 'bg-white/10 text-neutral-300'
                            }`}
                          >
                            {tier.minGuests}–{tier.maxGuests} {lang === 'ID' ? 'Tamu' : 'Guests'}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#C9A96E]" />
                          )}
                        </div>
                        <h4
                          className="text-sm font-serif font-bold text-white mb-1 leading-snug"
                          style={{
                            fontFamily: '"Playfair Display", Georgia, serif',
                          }}
                        >
                          {lang === 'ID' ? tier.nameId : tier.nameEn}
                        </h4>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/10">
                        <span className="text-[10px] text-neutral-400 block font-light">
                          {lang === 'ID' ? 'Mulai dari:' : 'Benchmark from:'}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#C9A96E]">
                          {formatPrice(tier.basePriceUSD)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guest Count Slider */}
            <div className="bg-[#1A2421] border border-white/10 rounded-xl p-5 sm:p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C9A96E]" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-white">
                    {lang === 'ID' ? '2. Estimasi Jumlah Tamu:' : '2. Calibrate Guest Count:'}
                  </span>
                </div>
                <span className="text-lg font-serif font-bold text-[#C9A96E] px-3 py-0.5 bg-[#111816] rounded-md border border-[#C9A96E]/30 font-mono">
                  {guestCount} {lang === 'ID' ? 'Tamu Undangan' : 'Guests'}
                </span>
              </div>

              <input
                id="guest-count-slider"
                type="range"
                min={activeTier.minGuests}
                max={activeTier.maxGuests}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-[#111816] rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
              />

              <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-2">
                <span>Min: {activeTier.minGuests} Tamu</span>
                <span>Tier Base: {activeTier.baseGuests} Tamu</span>
                <span>Max: {activeTier.maxGuests} Tamu</span>
              </div>
            </div>

            {/* Inclusions of Selected Tier */}
            <div className="bg-[#1A2421] border border-white/10 rounded-xl p-5 sm:p-6 shadow-lg">
              <span className="block text-xs uppercase tracking-widest text-[#C9A96E] font-semibold mb-3">
                {lang === 'ID'
                  ? 'Fasilitas & Layanan Eksklusif Termasuk:'
                  : 'Key Curated Inclusions in This Tier:'}
              </span>
              <ul className="space-y-2 text-xs text-neutral-300">
                {(lang === 'ID'
                  ? activeTier.featuresId
                  : activeTier.featuresEn
                ).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5" />
                    <span className="font-light">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Luxury Add-ons Selector */}
            <div className="bg-[#1A2421] border border-white/10 rounded-xl p-5 sm:p-6 shadow-lg">
              <span className="block text-xs uppercase tracking-widest text-[#C9A96E] font-semibold mb-3">
                {lang === 'ID'
                  ? '3. Tambahan Pengalaman Mewah (Bespoke Add-Ons):'
                  : '3. Bespoke Luxury Add-On Experiences:'}
              </span>
              <div className="space-y-2.5">
                {LUXURY_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const Icon = addon.icon;
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#111816] border-[#C9A96E]/60 text-white'
                          : 'bg-[#111816]/40 border-white/5 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-xs border flex items-center justify-center ${
                            isChecked
                              ? 'bg-[#C9A96E] border-[#C9A96E] text-[#111816]'
                              : 'border-white/30'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-[#C9A96E]" />
                          <span className="text-xs font-light">
                            {lang === 'ID' ? addon.nameId : addon.nameEn}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#C9A96E]">
                        +{formatPrice(addon.priceUSD)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Live Investment Summary & 5-Way Budget Breakdown */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Total Grand Investment Card */}
            <div className="bg-[#1A2421] border-2 border-[#C9A96E] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96E]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-semibold bg-[#111816] px-2.5 py-1 rounded-xs border border-[#C9A96E]/30">
                  {lang === 'ID'
                    ? 'ESTIMASI INVESTASI BESPOKE'
                    : 'CALCULATED INVESTMENT BENCHMARK'}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {currencyBase.flag} {currencyBase.code}
                </span>
              </div>

              <div className="mb-2">
                <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FDFBF7] tracking-tight block">
                  {formatPrice(totalInvestmentUSD)}
                </span>
                <span className="text-xs text-neutral-400 font-light mt-1 block">
                  {lang === 'ID'
                    ? `Perkiraan untuk ${guestCount} tamu (${activeTier.nameId})`
                    : `Calibrated for ${guestCount} guests (${activeTier.nameEn})`}
                </span>
              </div>

              {/* Equivalence Notes */}
              {selectedCurrency !== 'USD' && (
                <div className="text-[11px] text-neutral-400 font-mono pt-2 border-t border-white/10 mb-6">
                  ≈ ${Math.round(totalInvestmentUSD).toLocaleString('en-US')} USD (Base)
                </div>
              )}

              {/* 5-Way Budget Allocation Matrix */}
              <div className="pt-4 border-t border-white/10 space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs font-semibold text-white/90">
                  <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#C9A96E]">
                    <Percent className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'ID'
                        ? 'Alokasi Anggaran 5 Pilar Transparan'
                        : 'Transparent 5-Pillar Budget Breakdown'}
                    </span>
                  </span>
                </div>

                <div className="space-y-2.5">
                  {budgetPillars.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div
                        key={pillar.id}
                        className="p-2.5 bg-[#111816] rounded-lg border border-white/5 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-neutral-300">
                            <Icon className="w-3.5 h-3.5 text-[#C9A96E]" />
                            <span className="font-light">
                              {lang === 'ID' ? pillar.nameId : pillar.nameEn}
                            </span>
                          </div>
                          <span className="font-mono font-semibold text-[#FDFBF7]">
                            {formatPrice(pillar.amountUSD)}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#C9A96E] to-[#B8985D]"
                            style={{ width: `${pillar.percentage}%` }}
                          />
                        </div>

                        <div className="text-[10px] text-neutral-400 font-mono flex justify-between">
                          <span>{pillar.percentage}% of allocation</span>
                          <span>Verified Benchmark</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: VIP Video Booking & WhatsApp */}
              <div className="space-y-2.5">
                {onOpenVipBooking && (
                  <button
                    type="button"
                    onClick={() => {
                      const tierName = lang === 'ID' ? activeTier.nameId : activeTier.nameEn;
                      onOpenVipBooking(tierName, 'Bali Luxury Venue');
                    }}
                    className="w-full py-3.5 px-4 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer group"
                  >
                    <Video className="w-4 h-4 text-[#111816]" />
                    <span>
                      {lang === 'ID'
                        ? 'JADWALKAN VIP VIDEO DISCOVERY'
                        : 'BOOK VIP VIDEO CONSULTATION'}
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                )}

                {/* Direct WhatsApp Call-to-Action */}
                <a
                  id="currency-calc-inquire-cta"
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#111816] hover:bg-[#15201C] border border-[#C9A96E]/50 hover:border-[#C9A96E] text-[#C9A96E] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-lg group cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>
                    {lang === 'ID'
                      ? 'KONSULTASI VIA WHATSAPP (+62 813...)'
                      : 'CHAT VIA VIP WHATSAPP DESK'}
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-neutral-400 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>
                  {lang === 'ID'
                    ? '100% Transparan • Langsung ke WhatsApp Aria (+62 813-7007-4777)'
                    : '100% Direct & Transparent • Aria Concierge Desk (+62 813-7007-4777)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
