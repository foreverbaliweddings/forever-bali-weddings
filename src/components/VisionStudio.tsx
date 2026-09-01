import React, { useState } from 'react';
import {
  Sparkles,
  Palette,
  Sun,
  Moon,
  Flower2,
  Eye,
  CheckCircle2,
  MessageCircle,
  ArrowUpRight,
  Sliders,
  Flame,
  Layers,
  Camera,
  Share2,
} from 'lucide-react';
import { Language } from '../types';

interface VisionStudioProps {
  lang: Language;
}

interface PaletteOption {
  id: string;
  nameEn: string;
  nameId: string;
  descEn: string;
  descId: string;
  colors: string[];
  vibeEn: string;
  vibeId: string;
}

interface LightingOption {
  id: string;
  nameEn: string;
  nameId: string;
  timeEn: string;
  timeId: string;
  descEn: string;
  descId: string;
  icon: React.ElementType;
  glowClass: string;
}

interface FloralOption {
  id: string;
  nameEn: string;
  nameId: string;
  descEn: string;
  descId: string;
  botanicalsEn: string;
  botanicalsId: string;
  icon: React.ElementType;
}

export const VisionStudio: React.FC<VisionStudioProps> = ({ lang }) => {
  // State for selections
  const [selectedPalette, setSelectedPalette] = useState<string>('obsidian_gold');
  const [selectedLighting, setSelectedLighting] = useState<string>('golden_sunset');
  const [selectedFloral, setSelectedFloral] = useState<string>('grand_sculptural');
  const [activeTab, setActiveTab] = useState<'palette' | 'lighting' | 'floral'>('palette');

  // Options Data
  const PALETTES: PaletteOption[] = [
    {
      id: 'obsidian_gold',
      nameEn: 'Forest Obsidian & Champagne Gold',
      nameId: 'Forest Obsidian & Champagne Gold',
      descEn: 'Deep botanical obsidian canvas accented with brushed champagne gold and warm cream.',
      descId: 'Latar hijau botani obsidian mewah dengan aksen emas sampanye dan krem hangat.',
      colors: ['#111816', '#1A2421', '#C9A96E', '#FDFBF7'],
      vibeEn: 'Timeless Luxury • Dramatic • Architectural',
      vibeId: 'Kemewahan Abadi • Dramatis • Arsitektural',
    },
    {
      id: 'pure_ivory',
      nameEn: 'Pure Ivory & White Sand Whisper',
      nameId: 'Pure Ivory & White Sand Whisper',
      descEn: 'Soft alabaster, pearl white silks, and natural bleached wood with gentle parchment tones.',
      descId: 'Nuansa sutra putih gading, pasir putih mutiara, dan kayu alami yang teduh serta anggun.',
      colors: ['#FDFBF7', '#EFECE6', '#D6C7B2', '#8C7B6B'],
      vibeEn: 'Ethereal • Serene • Quiet Elegance',
      vibeId: 'Anggun & Suci • Tenang • Elegan Murni',
    },
    {
      id: 'tropical_amber',
      nameEn: 'Tropical Warm Amber & Terracotta',
      nameId: 'Tropical Warm Amber & Terracotta',
      descEn: 'Sun-drenched terracotta, saffron undertones, woven rattan, and warm golden hour glows.',
      descId: 'Sentuhan terakota hangat senja, aksen kunyit emas, anyaman alami, dan atmosfer eksotis.',
      colors: ['#2A1810', '#8C4827', '#E0924E', '#F3D2A2'],
      vibeEn: 'Warm Bohemian • Exotic • Sunset Glow',
      vibeId: 'Bohemian Hangat • Eksotis • Pendar Senja',
    },
  ];

  const LIGHTINGS: LightingOption[] = [
    {
      id: 'golden_sunset',
      nameEn: 'Golden Hour Sunset (17:30 WITA)',
      nameId: 'Golden Hour Sunset (17:30 WITA)',
      timeEn: '17:30 – 18:30 WITA',
      timeId: '17:30 – 18:30 WITA (Senja Bali)',
      descEn: 'Soft horizontal amber rays, Indian Ocean horizon glimmers, and flattering natural portraits.',
      descId: 'Pendaran cahaya emas horizontal senja, silau lembut samudera, dan foto potret alami terbaik.',
      icon: Sun,
      glowClass: 'from-[#E0924E]/25 via-[#C9A96E]/15 to-transparent',
    },
    {
      id: 'candlelit_night',
      nameEn: 'Candlelit Romantic Night',
      nameId: 'Candlelit Romantic Night',
      timeEn: '19:00 – 22:30 WITA',
      timeId: '19:00 – 22:30 WITA (Malam Romantis)',
      descEn: 'Hundreds of suspended hurricane lanterns, pillar candles, and ambient table-level flames.',
      descId: 'Ratusan lentera kaca temaram, lilin pilar elegan, dan kehangatan cahaya lilin meja perjamuan.',
      icon: Flame,
      glowClass: 'from-[#C9A96E]/20 via-[#8C4827]/15 to-transparent',
    },
    {
      id: 'modern_ambient',
      nameEn: 'Modern Ambient Luminescence',
      nameId: 'Modern Ambient Luminescence',
      timeEn: '20:00 – 24:00 WITA',
      timeId: '20:00 – 24:00 WITA (Pesta & Dansa)',
      descEn: 'Architectural pin-spotting, warm fairy-light canopies, and submerged pool uplighting.',
      descId: 'Sorot tata lampu arsitektural terarah, kanopi fairy lights hangat, dan pencahayaan kolam.',
      icon: Moon,
      glowClass: 'from-[#2A3B35]/40 via-[#C9A96E]/15 to-transparent',
    },
  ];

  const FLORALS: FloralOption[] = [
    {
      id: 'minimalist_organic',
      nameEn: 'Minimalist Organic Botanicals',
      nameId: 'Minimalist Organic Botanicals',
      descEn: 'Monochrome white orchids, sculpted monstera leaves, local ferns, and negative space mastery.',
      descId: 'Anggrek putih monokrom, daun monstera berkarakter, pakis lokal, dan keindahan ruang bernapas.',
      botanicalsEn: 'White Phalaenopsis, Anthuriums, Wild Ferns, Bleached Palms',
      botanicalsId: 'Anggrek Bulan Putih, Anthurium, Pakis Hutan, Palem Kering',
      icon: Flower2,
    },
    {
      id: 'grand_sculptural',
      nameEn: 'Grand Cliffside Sculptural Florals',
      nameId: 'Grand Cliffside Sculptural Florals',
      descEn: 'Towering organic floral arches, suspended ceiling clouds, and dramatic cascading blooms.',
      descId: 'Gapura bunga monumental tepi tebing, awan bunga gantung megah, dan untaian krisan mewah.',
      botanicalsEn: 'David Austin Roses, Imported Hydrangeas, White Lotus, Cascading Orchids',
      botanicalsId: 'Mawar David Austin, Hortensia Impor, Teratai Putih, Untaian Anggrek',
      icon: Layers,
    },
    {
      id: 'tuscan_bali',
      nameEn: 'Tuscan-Bali Coastal Fusion',
      nameId: 'Tuscan-Bali Coastal Fusion',
      descEn: 'Olive branch foliage paired with local white tuberose, dried pampas, and terracotta urns.',
      descId: 'Dedaunan zaitun elegan berpadu dengan sedap malam Bali, pampas alami, dan guci terakota.',
      botanicalsEn: 'Olive Foliage, Sedap Malam (Tuberose), Eucalyptus, Terracotta Urns',
      botanicalsId: 'Daun Zaitun, Bunga Sedap Malam, Eucalyptus, Guci Antik Terakota',
      icon: Palette,
    },
  ];

  // Selected Object references
  const currentPaletteObj = PALETTES.find((p) => p.id === selectedPalette) || PALETTES[0];
  const currentLightingObj = LIGHTINGS.find((l) => l.id === selectedLighting) || LIGHTINGS[0];
  const currentFloralObj = FLORALS.find((f) => f.id === selectedFloral) || FLORALS[0];

  // Dynamic Moodboard Image based on combination
  const getVisualPreviewImage = () => {
    if (selectedPalette === 'obsidian_gold') {
      return 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80';
    }
    if (selectedPalette === 'pure_ivory') {
      return 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80';
    }
    return 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80';
  };

  // WhatsApp Routing Link Generation
  const generateWhatsAppInquiry = () => {
    const paletteName = lang === 'ID' ? currentPaletteObj.nameId : currentPaletteObj.nameEn;
    const lightingName = lang === 'ID' ? currentLightingObj.nameId : currentLightingObj.nameEn;
    const floralName = lang === 'ID' ? currentFloralObj.nameId : currentFloralObj.nameEn;

    let message = '';
    if (lang === 'ID') {
      message =
        `Halo Aria & Forever Bali Weddings,\n\n` +
        `Saya telah merancang konsep pernikahan impian di Live Vision Studio website Forever Bali Weddings:\n\n` +
        `• Tema Palet Warna: ${paletteName}\n` +
        `• Pilihan Pencahayaan & Waktu: ${lightingName}\n` +
        `• Gaya Dekorasi & Bunga: ${floralName}\n` +
        `• Detail Botani: ${currentFloralObj.botanicalsId}\n\n` +
        `Saya ingin mendiskusikan implementasi konsep visual ini bersama tim wedding director Anda serta mengecek estimasi biayanya. Terima kasih.`;
    } else {
      message =
        `Hello Aria & Forever Bali Weddings,\n\n` +
        `I have curated my bespoke wedding aesthetic on the Live Vision Studio website:\n\n` +
        `• Palette Theme: ${paletteName}\n` +
        `• Lighting Atmosphere: ${lightingName}\n` +
        `• Floral & Decor Architecture: ${floralName}\n` +
        `• Botanicals Focus: ${currentFloralObj.botanicalsEn}\n\n` +
        `I would love to explore bringing this custom aesthetic to life and receive a personalized mood board consultation with Aria. Thank you.`;
    }

    return `https://wa.me/6281370074777?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="vision-studio"
      className="py-20 lg:py-28 bg-[#111816] text-[#FDFBF7] relative overflow-hidden border-t border-white/5"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Dynamic Ambient Background Glow based on lighting selection */}
      <div
        className={`absolute top-0 right-0 w-full h-full bg-gradient-to-b ${currentLightingObj.glowClass} pointer-events-none transition-all duration-700`}
      />
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/15 border border-[#C9A96E]/40 rounded-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold">
              {lang === 'ID' ? 'STUDIO VISUALISASI INTERAKTIF VVIP' : 'VVIP LIVE WEDDING VISION STUDIO'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FDFBF7] tracking-wide leading-tight mb-4"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? (
              <>
                Rancang Estetika <span className="text-[#C9A96E] italic">Pernikahan Impian</span> Anda
              </>
            ) : (
              <>
                Curate Your <span className="text-[#C9A96E] italic">Bespoke Vision</span> Live
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Padukan tema warna quiet luxury, suasana pencahayaan senja Bali, dan tata bunga arsitektural untuk melihat pratinjau konsep visual selebrasi Anda secara langsung.'
              : 'Harmonize quiet luxury palettes, Bali golden hour luminescence, and haute floral architecture to generate your real-time aesthetic mood board.'}
          </p>
        </div>

        {/* Vision Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Interactive Customization Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Navigation Tabs */}
            <div className="flex rounded-md bg-[#1A2421] p-1 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('palette')}
                className={`flex-1 py-2.5 px-3 rounded-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'palette'
                    ? 'bg-[#C9A96E] text-[#111816] shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>{lang === 'ID' ? 'Palet Warna' : '1. Palette'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('lighting')}
                className={`flex-1 py-2.5 px-3 rounded-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'lighting'
                    ? 'bg-[#C9A96E] text-[#111816] shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>{lang === 'ID' ? 'Pencahayaan' : '2. Lighting'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('floral')}
                className={`flex-1 py-2.5 px-3 rounded-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'floral'
                    ? 'bg-[#C9A96E] text-[#111816] shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Flower2 className="w-4 h-4" />
                <span>{lang === 'ID' ? 'Tata Bunga' : '3. Floral'}</span>
              </button>
            </div>

            {/* TAB 1: Palette Selection */}
            {activeTab === 'palette' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] font-semibold">
                  {lang === 'ID'
                    ? 'PILIH TEMA WARNA SIGNATURE QUIET LUXURY'
                    : 'SELECT YOUR SIGNATURE COLOR PALETTE'}
                </div>

                <div className="space-y-3">
                  {PALETTES.map((p) => {
                    const isSelected = selectedPalette === p.id;
                    return (
                      <div
                        key={p.id}
                        id={`palette-opt-${p.id}`}
                        onClick={() => setSelectedPalette(p.id)}
                        className={`p-5 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#1A2421] border-[#C9A96E] ring-1 ring-[#C9A96E] shadow-lg'
                            : 'bg-white/[0.02] border-white/10 hover:border-[#C9A96E]/50 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-[#FDFBF7]">
                              {lang === 'ID' ? p.nameId : p.nameEn}
                            </h3>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-[#C9A96E]" />
                            )}
                          </div>
                          <p className="text-xs text-neutral-300 font-light leading-relaxed mb-2">
                            {lang === 'ID' ? p.descId : p.descEn}
                          </p>
                          <span className="text-[10px] text-[#C9A96E] font-mono uppercase tracking-wider">
                            {lang === 'ID' ? p.vibeId : p.vibeEn}
                          </span>
                        </div>

                        {/* Color Swatch Dots */}
                        <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-center p-2 rounded-md bg-black/40 border border-white/10">
                          {p.colors.map((c, idx) => (
                            <div
                              key={idx}
                              className="w-5 h-5 rounded-full border border-white/20 shadow-xs"
                              style={{ backgroundColor: c }}
                              title={c}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: Lighting Selection */}
            {activeTab === 'lighting' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] font-semibold">
                  {lang === 'ID'
                    ? 'PILIH WAKTU & ATMOSFER PENCAHAYAAN'
                    : 'SELECT ATMOSPHERIC LIGHTING & TIMING'}
                </div>

                <div className="space-y-3">
                  {LIGHTINGS.map((l) => {
                    const Icon = l.icon;
                    const isSelected = selectedLighting === l.id;
                    return (
                      <div
                        key={l.id}
                        id={`lighting-opt-${l.id}`}
                        onClick={() => setSelectedLighting(l.id)}
                        className={`p-5 rounded-lg border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                          isSelected
                            ? 'bg-[#1A2421] border-[#C9A96E] ring-1 ring-[#C9A96E] shadow-lg'
                            : 'bg-white/[0.02] border-white/10 hover:border-[#C9A96E]/50 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#C9A96E] text-[#111816]'
                              : 'bg-white/5 text-[#C9A96E]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                            <h3 className="text-sm font-semibold text-[#FDFBF7]">
                              {lang === 'ID' ? l.nameId : l.nameEn}
                            </h3>
                            <span className="text-[10px] bg-[#C9A96E]/20 text-[#C9A96E] px-2 py-0.5 rounded border border-[#C9A96E]/30 font-mono">
                              {lang === 'ID' ? l.timeId : l.timeEn}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-300 font-light leading-relaxed">
                            {lang === 'ID' ? l.descId : l.descEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: Floral Selection */}
            {activeTab === 'floral' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#C9A96E] font-semibold">
                  {lang === 'ID'
                    ? 'PILIH ARSITEKTUR TATA BUNGA & DEKORASI'
                    : 'SELECT FLORAL ARCHITECTURE & BOTANICALS'}
                </div>

                <div className="space-y-3">
                  {FLORALS.map((f) => {
                    const Icon = f.icon;
                    const isSelected = selectedFloral === f.id;
                    return (
                      <div
                        key={f.id}
                        id={`floral-opt-${f.id}`}
                        onClick={() => setSelectedFloral(f.id)}
                        className={`p-5 rounded-lg border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                          isSelected
                            ? 'bg-[#1A2421] border-[#C9A96E] ring-1 ring-[#C9A96E] shadow-lg'
                            : 'bg-white/[0.02] border-white/10 hover:border-[#C9A96E]/50 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#C9A96E] text-[#111816]'
                              : 'bg-white/5 text-[#C9A96E]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-[#FDFBF7]">
                              {lang === 'ID' ? f.nameId : f.nameEn}
                            </h3>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-[#C9A96E]" />
                            )}
                          </div>
                          <p className="text-xs text-neutral-300 font-light leading-relaxed mb-2">
                            {lang === 'ID' ? f.descId : f.descEn}
                          </p>
                          <div className="text-[10px] text-[#C9A96E] font-mono">
                            <span className="text-white/50">
                              {lang === 'ID' ? 'Spesies Botani: ' : 'Key Botanicals: '}
                            </span>
                            {lang === 'ID' ? f.botanicalsId : f.botanicalsEn}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Magazine-Grade Editorial Preview Card (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#1A2421] border border-[#C9A96E]/40 rounded-xl overflow-hidden shadow-2xl relative">
              {/* Card Header Tag */}
              <div className="px-6 py-4 bg-[#111816] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#C9A96E]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold">
                    {lang === 'ID' ? 'PRATINJAU REAL-TIME MOOD BOARD' : 'LIVE EDITORIAL MOOD BOARD'}
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-white/50 font-mono">
                  CURATED BY ARIA
                </span>
              </div>

              {/* Visual Imagery */}
              <div className="relative h-60 sm:h-64 overflow-hidden">
                <img
                  src={getVisualPreviewImage()}
                  alt="Live Wedding Vision"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421] via-transparent to-transparent" />

                {/* Color Swatch Badge Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-black/75 backdrop-blur-xs border border-white/20">
                    {currentPaletteObj.colors.map((c, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-white/40"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider bg-[#C9A96E]/90 text-[#111816] font-bold px-2.5 py-1 rounded-xs font-mono">
                    BESPOKE V10
                  </span>
                </div>
              </div>

              {/* Live Editorial Details */}
              <div className="p-6 space-y-4 text-left">
                <div>
                  <h3
                    className="text-xl sm:text-2xl font-serif text-[#C9A96E] font-normal leading-tight"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {lang === 'ID' ? currentPaletteObj.nameId : currentPaletteObj.nameEn}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light mt-1">
                    {lang === 'ID' ? currentPaletteObj.descId : currentPaletteObj.descEn}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-white/50 uppercase tracking-wider text-[10px]">
                      {lang === 'ID' ? 'Atmosfer Pencahayaan' : 'Lighting Aura'}
                    </span>
                    <span className="text-[#FDFBF7] font-medium text-right">
                      {lang === 'ID' ? currentLightingObj.nameId : currentLightingObj.nameEn}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <span className="text-white/50 uppercase tracking-wider text-[10px]">
                      {lang === 'ID' ? 'Arsitektur Bunga' : 'Floral Style'}
                    </span>
                    <span className="text-[#FDFBF7] font-medium text-right">
                      {lang === 'ID' ? currentFloralObj.nameId : currentFloralObj.nameEn}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <span className="text-white/50 uppercase tracking-wider text-[10px]">
                      {lang === 'ID' ? 'Aksen Botani' : 'Signature Flora'}
                    </span>
                    <span className="text-[#C9A96E] font-mono text-[11px] text-right">
                      {lang === 'ID' ? currentFloralObj.botanicalsId : currentFloralObj.botanicalsEn}
                    </span>
                  </div>
                </div>

                {/* Direct VIP WhatsApp Consultation CTA */}
                <div className="pt-3">
                  <a
                    id="vision-studio-whatsapp-cta"
                    href={generateWhatsAppInquiry()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-lg group cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>
                      {lang === 'ID'
                        ? 'KONSULTASIKAN VISI INI VIA WHATSAPP'
                        : 'EXPLORE THIS VISION VIA WHATSAPP'}
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <p className="text-[10px] text-[#8A9A86] text-center mt-2 font-light">
                    {lang === 'ID'
                      ? 'Diteruskan langsung ke WhatsApp Studio Direktur (+62 813-7007-4777)'
                      : 'Direct escalation to Lead Wedding Planner (+62 813-7007-4777)'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
