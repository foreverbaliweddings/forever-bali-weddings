import React, { useState } from 'react';
import { Calculator, Sparkles, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/weddingData';

export interface EstimateData {
  region: string;
  guestCount: number;
  tier: string;
  estimatedUSD: number;
  estimatedIDR: string;
  breakdown: Array<{
    label: string;
    pct: string;
    val: number;
  }>;
}

interface BudgetEstimatorProps {
  lang?: Language;
  onLockEstimate?: (data: EstimateData) => void;
}

export default function BudgetEstimator({
  lang = 'EN',
  onLockEstimate,
}: BudgetEstimatorProps) {
  const [region, setRegion] = useState<'uluwatu' | 'ubud' | 'canggu' | 'nusadua'>('uluwatu');
  const [guestCount, setGuestCount] = useState<number>(30);
  const [tier, setTier] = useState<'intimate' | 'signature' | 'royal'>('signature');

  // Logic Estimasi Sederhana (dalam USD)
  const calculateTotal = (): number => {
    let base = guestCount * 350; // Konsumsi & Per tamu
    if (region === 'uluwatu') base += 12000;
    else if (region === 'ubud') base += 9000;
    else if (region === 'canggu') base += 10000;
    else base += 8000; // Nusa Dua

    if (tier === 'intimate') base *= 0.85;
    if (tier === 'royal') base *= 1.4;

    return Math.round(base);
  };

  const totalUSD = calculateTotal();
  const totalIDR = (totalUSD * 15800).toLocaleString('id-ID'); // Estimasi konversi IDR

  // Alokasi Estimasi Anggaran
  const breakdown = [
    {
      label: lang === 'ID' ? 'Sewa Venue & Biaya Izin' : 'Venue & Permit Fees',
      pct: '35%',
      val: Math.round(totalUSD * 0.35),
    },
    {
      label: lang === 'ID' ? 'Bespoke Floral & Tata Ruang' : 'Bespoke Floral & Styling',
      pct: '25%',
      val: Math.round(totalUSD * 0.25),
    },
    {
      label: lang === 'ID' ? 'Jamuan Kuliner & Open Bar' : 'Fine Dining & Open Bar',
      pct: '25%',
      val: Math.round(totalUSD * 0.25),
    },
    {
      label: lang === 'ID' ? 'Fotografi & Videografi Master' : 'Photo & Videography Master',
      pct: '10%',
      val: Math.round(totalUSD * 0.10),
    },
    {
      label: lang === 'ID' ? 'Koordinasi Hari-H & Legalitas' : 'Coordination & Legal',
      pct: '5%',
      val: Math.round(totalUSD * 0.05),
    },
  ];

  const getRegionName = (r: string) => {
    switch (r) {
      case 'uluwatu':
        return 'Uluwatu (Cliff-top & Sunset)';
      case 'ubud':
        return 'Ubud (Rainforest & River Valley)';
      case 'canggu':
        return 'Canggu & Seseh (Beachfront Villa)';
      case 'nusadua':
        return 'Nusa Dua (5-Star Luxury Resort)';
      default:
        return r;
    }
  };

  const getTierName = (t: string) => {
    switch (t) {
      case 'intimate':
        return 'INTIMATE (Essential Elegance)';
      case 'signature':
        return 'SIGNATURE (Artisan Bespoke)';
      case 'royal':
        return 'ROYAL (Full Haute Couture)';
      default:
        return t.toUpperCase();
    }
  };

  const getWhatsAppUrl = () => {
    const regionText = getRegionName(region);
    const tierText = getTierName(tier);
    const message =
      lang === 'ID'
        ? `Halo Forever Bali Weddings, saya telah mengkalkulasi perkiraan anggaran pernikahan saya di website:\n• Wilayah: ${regionText}\n• Jumlah Tamu: ${guestCount} Tamu\n• Paket Styling: ${tierText}\n• Estimasi Investasi: $${totalUSD.toLocaleString()} USD (~Rp ${totalIDR})\n\nMohon informasi ketersediaan tanggal dan detail proposalnya.`
        : `Hello Forever Bali Weddings, I just calculated my estimated celebration investment on your website:\n• Preferred Region: ${regionText}\n• Guest Count: ${guestCount} Guests\n• Styling Tier: ${tierText}\n• Estimated Investment: $${totalUSD.toLocaleString()} USD (~IDR ${totalIDR})\n\nCould we discuss this custom estimate with a senior wedding planner?`;

    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleLockClick = () => {
    const data: EstimateData = {
      region,
      guestCount,
      tier,
      estimatedUSD: totalUSD,
      estimatedIDR: totalIDR,
      breakdown,
    };
    if (onLockEstimate) {
      onLockEstimate(data);
      return;
    }

    // Default WhatsApp message template if no custom handler is provided
    const text = `Hello Forever Bali Weddings, I calculated a target budget estimate for ${guestCount} guests in ${region.toUpperCase()} (${tier.toUpperCase()} tier), estimated around $${totalUSD.toLocaleString()} USD. I would like to confirm venue availability.`;
    const waUrl = `https://wa.me/6281370074777?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="budget-estimator-card"
      className="bg-[#111816] text-[#FDFBF7] border border-[#C9A96E]/30 rounded-lg p-6 sm:p-10 max-w-4xl mx-auto shadow-2xl transition-all"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold">
            {lang === 'ID' ? 'KALKULATOR INVESTASI' : 'INVESTMENT BENCHMARK'}
          </span>
        </div>

        <h3
          id="budget-estimator-heading"
          className="text-2xl sm:text-3xl font-serif text-[#C9A96E] tracking-wider mb-2"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {lang === 'ID' ? 'ESTIMASI INVESTASI PERNIKAHAN' : 'ESTIMATE YOUR CELEBRATION'}
        </h3>
        <p className="text-xs sm:text-sm text-[#8A9A86] max-w-lg mx-auto font-light">
          {lang === 'ID'
            ? 'Pilih preferensi wilayah, jumlah tamu, dan kelas styling untuk kalkulasi alokasi anggaran transparan.'
            : 'Select your preferences to calculate tailor-made investment benchmarks.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Controls */}
        <div className="space-y-6 bg-white/[0.02] p-5 sm:p-6 rounded-md border border-white/5">
          {/* Field: Region Selection */}
          <div className="space-y-2">
            <label
              htmlFor="estimator-region-select"
              className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] font-semibold block"
            >
              {lang === 'ID' ? 'Wilayah Pilihan (Region)' : 'Preferred Region'}
            </label>
            <select
              id="estimator-region-select"
              value={region}
              onChange={(e) => setRegion(e.target.value as any)}
              className="w-full bg-[#1A2421] border border-[#C9A96E]/30 text-[#FDFBF7] p-3 rounded-md outline-none text-xs sm:text-sm focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-colors cursor-pointer"
            >
              <option value="uluwatu">Uluwatu (Cliff-top & Sunset)</option>
              <option value="ubud">Ubud (Rainforest & River)</option>
              <option value="canggu">Canggu & Seseh (Beachfront Villa)</option>
              <option value="nusadua">Nusa Dua (5-Star Resort)</option>
            </select>
          </div>

          {/* Field: Guest Count Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="estimator-guest-range"
                className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] font-semibold"
              >
                {lang === 'ID' ? 'Jumlah Tamu Undangan' : 'Guest Count'}
              </label>
              <span className="text-xs font-mono font-bold text-[#FDFBF7] bg-[#C9A96E]/20 px-2.5 py-1 rounded border border-[#C9A96E]/40">
                {guestCount} {lang === 'ID' ? 'Tamu' : 'Guests'}
              </span>
            </div>
            <input
              id="estimator-guest-range"
              type="range"
              min="10"
              max="150"
              step="5"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
            />
            <div className="flex justify-between text-[10px] text-white/40 font-mono">
              <span>10 Pax</span>
              <span>50 Pax</span>
              <span>100 Pax</span>
              <span>150 Pax</span>
            </div>
          </div>

          {/* Field: Styling Tier */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] font-semibold block">
              {lang === 'ID' ? 'Kelas Styling (Tier)' : 'Styling Tier'}
            </label>
            <div className="flex gap-2">
              {(['intimate', 'signature', 'royal'] as const).map((t) => {
                const isActive = tier === t;
                return (
                  <button
                    key={t}
                    id={`tier-btn-${t}`}
                    type="button"
                    onClick={() => setTier(t)}
                    className={`flex-1 py-2.5 px-2 rounded-md border text-[11px] font-semibold tracking-wider transition-all duration-300 uppercase cursor-pointer ${
                      isActive
                        ? 'bg-[#C9A96E] text-[#111816] border-[#C9A96E] shadow-md scale-[1.02]'
                        : 'bg-transparent text-[#FDFBF7] border-[#C9A96E]/50 hover:border-[#C9A96E] hover:bg-[#C9A96E]/10'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-white/50 font-light mt-1">
              {tier === 'intimate' && (lang === 'ID' ? 'Fokus keintiman, esensial, & romantis (2-20 tamu)' : 'Essential intimate elegance, refined florals & core masters')}
              {tier === 'signature' && (lang === 'ID' ? 'Artisan bespoke, instalasi lengkap & tata cahaya' : 'Signature artisan aesthetics, multi-structure floral & ambient lighting')}
              {tier === 'royal' && (lang === 'ID' ? 'Haute couture, custom marquee, live orchestra & pyro' : 'Royal full-scale production, bespoke installations & VIP orchestration')}
            </p>
          </div>
        </div>

        {/* Dynamic Result Display */}
        <div
          id="estimator-result-card"
          className="bg-[#1A2421] border border-[#C9A96E]/30 rounded-md p-6 flex flex-col justify-between shadow-xl space-y-6"
        >
          {/* Total Header */}
          <div className="border-b border-[#C9A96E]/20 pb-4 text-center">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A9A86] font-semibold block mb-1">
              {lang === 'ID' ? 'ESTIMASI NILAI INVESTASI' : 'ESTIMATED INVESTMENT'}
            </span>
            <div
              className="text-3xl sm:text-4xl font-serif text-[#C9A96E] font-medium tracking-tight my-1"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              ${totalUSD.toLocaleString()} <span className="text-sm font-sans text-white/70 font-normal">USD</span>
            </div>
            <div className="text-xs text-[#8A9A86] font-mono">
              ≈ IDR {totalIDR} (Nett)
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-2.5">
            <div className="text-[11px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-1 flex items-center justify-between">
              <span>{lang === 'ID' ? 'Alokasi Estimasi Anggaran' : 'Budget Allocation Breakdown'}</span>
              <span className="text-[10px] text-white/40 font-mono">100% Total</span>
            </div>
            {breakdown.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-white/5 last:border-0">
                <span className="text-neutral-300 font-light flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]/60 inline-block" />
                  {item.label} <span className="text-[10px] text-white/40 font-mono">({item.pct})</span>
                </span>
                <span className="text-[#C9A96E] font-mono font-semibold">
                  ${item.val.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Action Button: Lock Estimate via WhatsApp */}
          <div className="pt-2">
            <button
              id="lock-estimate-whatsapp-btn"
              type="button"
              onClick={handleLockClick}
              className="w-full py-3.5 px-4 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] font-bold text-xs uppercase tracking-[0.16em] rounded-md transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer group"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>
                {lang === 'ID'
                  ? 'KUNCI ESTIMASI INI VIA WHATSAPP'
                  : 'LOCK THIS ESTIMATE VIA WHATSAPP'}
              </span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-[10px] text-center text-white/40 font-light mt-2">
              {lang === 'ID'
                ? 'Terhubung langsung dengan Lead Wedding Planner via WhatsApp Studio +62 813-7007-4777.'
                : 'Directly routes this configuration to our WhatsApp Studio concierge (+62 813-7007-4777).'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
