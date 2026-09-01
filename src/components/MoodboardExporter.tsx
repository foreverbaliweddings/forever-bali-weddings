import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  Printer,
  MessageCircle,
  ArrowUpRight,
  Palette,
  MapPin,
  Flame,
  Flower2,
  Calendar,
  Layers,
  CheckCircle2,
  Share2,
  Eye,
  Camera,
  Shirt,
  Wine,
  Music,
  ShieldCheck,
  Heart,
  Copy,
  Check,
} from 'lucide-react';
import { Language } from '../types';

interface MoodboardExporterProps {
  lang: Language;
}

interface MoodboardTheme {
  id: string;
  nameEn: string;
  nameId: string;
  subtitleEn: string;
  subtitleId: string;
  regionEn: string;
  regionId: string;
  heroImage: string;
  gallery: string[];
  swatches: { nameEn: string; nameId: string; hex: string }[];
  floralConceptEn: string;
  floralConceptId: string;
  lightingConceptEn: string;
  lightingConceptId: string;
  gastronomyEn: string;
  gastronomyId: string;
  musicVibeEn: string;
  musicVibeId: string;
  dressCodeEn: string;
  dressCodeId: string;
  tagsEn: string[];
  tagsId: string[];
}

const MOODBOARD_THEMES: MoodboardTheme[] = [
  {
    id: 'obsidian_gold',
    nameEn: 'Obsidian Clifftop Gala',
    nameId: 'Gala Tebing Obsidian & Emas',
    subtitleEn: 'Quiet Luxury Clifftop Drama with 2400K Candlelight',
    subtitleId: 'Keanggunan Tebing Samudera dengan Ribuan Lilin 2400K',
    regionEn: 'Uluwatu & Bukit Peninsula',
    regionId: 'Tebing Uluwatu & Semenanjung Bukit',
    heroImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80',
    ],
    swatches: [
      { nameEn: 'Forest Obsidian', nameId: 'Hitam Obsidian', hex: '#111816' },
      { nameEn: 'Champagne Gold', nameId: 'Emas Sampanye', hex: '#C9A96E' },
      { nameEn: 'Soft Sand', nameId: 'Pasir Lembut', hex: '#FDFBF7' },
      { nameEn: 'Basalt Stone', nameId: 'Batu Basal', hex: '#2A3632' },
    ],
    floralConceptEn:
      'Architectural white phalaenopsis orchids suspended from monolithic basalt plinths, accented with lush tropical monstera and clean olive foliage.',
    floralConceptId:
      'Anggrek bulan putih arsitektural melayang di atas tatanan batu basal hitam, dipadukan daun monstera dan dedaunan zaitun minimalis.',
    lightingConceptEn:
      'Over 1,200 real wax drip candles, concealed warm 2400K ground up-lighting, and delicate bistro filament strings framing the cliff edge.',
    lightingConceptId:
      'Lebih dari 1.200 lilin asli, tata cahaya tanah hangat 2400K tersembunyi, dan string filamen bistro membingkai bibir tebing.',
    gastronomyEn:
      '5-course Wagyu & Butter-poached Jimbaran Lobster degustation with French Champagne pairings.',
    gastronomyId:
      'Degustasi 5-course Wagyu & Lobster Jimbaran dengan padanan Champagne Prancis.',
    musicVibeEn: 'Sunset Harp Prelude transitioning to 7-piece Jazz Ensemble and Midnight DJ.',
    musicVibeId: 'Alunan Harpa Senja berlanjut ke 7-piece Ensemble Jazz dan Live DJ Tengah Malam.',
    dressCodeEn: 'Black Tie / Timeless High-Contrast Formal',
    dressCodeId: 'Black Tie / Busana Formal Kontras Abadi',
    tagsEn: ['Quiet Luxury', 'Clifftop Sunset', 'Black Tie', 'Midnight Pyrotechnics'],
    tagsId: ['Quiet Luxury', 'Sunset Tebing', 'Black Tie', 'Kembang Api Tengah Malam'],
  },
  {
    id: 'botanical_sanctuary',
    nameEn: 'Ubud Jungle Sanctuary',
    nameId: 'Suaka Rimba Sakral Ubud',
    subtitleEn: 'Sacred River Valley Mist with Teakwood Organic Restraint',
    subtitleId: 'Kabut Lembah Sungai Suci dengan Kemurnian Kayu Jati',
    regionEn: 'Ayung River Valley, Ubud',
    regionId: 'Lembah Sungai Ayung, Ubud',
    heroImage:
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
    ],
    swatches: [
      { nameEn: 'Emerald Canopy', nameId: 'Hijau Kanopi', hex: '#1C3328' },
      { nameEn: 'Antique Teak', nameId: 'Jati Antik', hex: '#8B6A47' },
      { nameEn: 'River Stone Grey', nameId: 'Abu Sungai', hex: '#D1CCC4' },
      { nameEn: 'Lotus White', nameId: 'Putih Teratai', hex: '#FAF8F5' },
    ],
    floralConceptEn:
      'Cascading wild ferns, ivory garden roses, bamboo arches, and floating water lily installations along the riverbank.',
    floralConceptId:
      'Untaian pakis liar, mawar taman putih gading, lengkungan bambu alami, dan instalasi teratai air mengapung di tepi sungai.',
    lightingConceptEn:
      'Handcrafted bamboo lantern spheres, low-glow fairy lights, and misty riverbank fire pits.',
    lightingConceptId:
      'Lentera bambu anyam tangan, kerlap-kerlip peri halus, dan perapian santai di tepi sungai berkabut.',
    gastronomyEn:
      'Organic Farm-to-Table Balinese royal feast, duck breast with smoked torch ginger, and artisan vegan degustations.',
    gastronomyId:
      'Pesta kuliner organik khas istana Bali, bebek asap kecombrang, dan menu degustasi vegan eksklusif.',
    musicVibeEn:
      'Acoustic cello & traditional Rindik bamboo harmony with peaceful eco-silent zone at 22:00.',
    musicVibeId:
      'Alunan selo akustik & gamelan Rindik bambu dengan transisi zona hening damai pukul 22:00 WITA.',
    dressCodeEn: 'Botanical Elegance / Earthy Linen Pastels',
    dressCodeId: 'Elegan Botani / Busana Linen Nuansa Alami',
    tagsEn: ['Sacred Mist', 'Eco Sanctuary', 'Acoustic Soul', 'Melukat Blessing'],
    tagsId: ['Kabut Sakral', 'Suaka Alam', 'Akustik Tenang', 'Pemberkatan Melukat'],
  },
  {
    id: 'coastal_bohemian',
    nameEn: 'Pererenan Sunset Oceanfront',
    nameId: 'Selebrasi Tepi Laut Pererenan',
    subtitleEn: 'Black-Sand Horizon, Raw Linen, and Contemporary Warmth',
    subtitleId: 'Cakrawala Pasir Hitam, Linen Alami, dan Kehangatan Kontemporer',
    regionEn: 'Canggu & Pererenan Coastline',
    regionId: 'Pesisir Pantai Canggu & Pererenan',
    heroImage:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=600&q=80',
    ],
    swatches: [
      { nameEn: 'Volcanic Sand', nameId: 'Pasir Vulkanik', hex: '#222326' },
      { nameEn: 'Terracotta Clay', nameId: 'Terracotta', hex: '#C27653' },
      { nameEn: 'Warm Oat', nameId: 'Gandum Hangat', hex: '#EBE2D5' },
      { nameEn: 'Sea Foam Mist', nameId: 'Buih Lautan', hex: '#A3B4AB' },
    ],
    floralConceptEn:
      'Feathery pampas grass clusters, dried palm spears, toffee roses, and organic driftwood aisle arches.',
    floralConceptId:
      'Gumpalan pampas grass megah, daun palem kering, mawar toffee, dan gerbang kayu hanyut alami.',
    lightingConceptEn:
      'Rattan pendant clusters suspended from timber pergolas, pathway lanterns, and bonfire lounge circles.',
    lightingConceptId:
      'Kelompok kap lampu rotan gantung, lentera lorong jalan, dan lingkaran api unggun santai.',
    gastronomyEn:
      'Wood-fired seafood barbecue, charred octopus, fresh coconut ceviche, and craft mezcal cocktails.',
    gastronomyId:
      'Barbekyu hidangan laut kayu bakar, gurita panggang, ceviche kelapa segar, dan koktail khas racikan master mixologist.',
    musicVibeEn: 'Deep sunset house DJ sets with live bongo percussion and acoustic saxophone.',
    musicVibeId: 'Irama Deep Sunset House DJ dengan bongo perkusi dan saksofon langsung.',
    dressCodeEn: 'Bohemian Luxe / Crisp Summer Whites',
    dressCodeId: 'Bohemian Luxe / Gaun & Kemeja Putih Tropis',
    tagsEn: ['Ocean Horizon', 'Sunset Bonfire', 'Live Saxophone', 'Barefoot Luxury'],
    tagsId: ['Cakrawala Samudera', 'Api Unggun Senja', 'Live Saxophone', 'Kemewahan Alami'],
  },
];

export const MoodboardExporter: React.FC<MoodboardExporterProps> = ({ lang }) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>('obsidian_gold');
  const [coupleNames, setCoupleNames] = useState<string>('Sarah & Marcus');
  const [targetSeason, setTargetSeason] = useState<string>('Autumn / October 2026');
  const [guestCount, setGuestCount] = useState<string>('60 Guests');
  const [customVibeNote, setCustomVibeNote] = useState<string>(
    'Intimate cliff ceremony followed by a black-tie candlelight banquet and fireworks.'
  );
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const selectedTheme =
    MOODBOARD_THEMES.find((t) => t.id === selectedThemeId) || MOODBOARD_THEMES[0];

  // Copy Summary to Clipboard
  const handleCopySummary = () => {
    const themeName = lang === 'ID' ? selectedTheme.nameId : selectedTheme.nameEn;
    const region = lang === 'ID' ? selectedTheme.regionId : selectedTheme.regionEn;
    const summary = `FOREVER BALI WEDDINGS • MOODBOARD SPECIFICATION\n\nCouple: ${coupleNames}\nSeason: ${targetSeason}\nGuest Count: ${guestCount}\nTheme: ${themeName}\nRegion: ${region}\nPalette: ${selectedTheme.swatches
      .map((s) => `${s.nameEn} (${s.hex})`)
      .join(', ')}\nFloral Concept: ${
      lang === 'ID' ? selectedTheme.floralConceptId : selectedTheme.floralConceptEn
    }\nLighting: ${
      lang === 'ID' ? selectedTheme.lightingConceptId : selectedTheme.lightingConceptEn
    }\nDirect Concierge: +62 813-7007-4777`;

    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Trigger Print Mode for PDF export
  const handlePrintMoodboard = () => {
    window.print();
  };

  // Generate WhatsApp Direct Consultation Link
  const generateWhatsAppMoodboardUrl = () => {
    const themeName = lang === 'ID' ? selectedTheme.nameId : selectedTheme.nameEn;
    const region = lang === 'ID' ? selectedTheme.regionId : selectedTheme.regionEn;

    let text = '';
    if (lang === 'ID') {
      text =
        `Halo Aria & Tim Forever Bali Weddings (+62 813-7007-4777),\n\n` +
        `Saya telah merancang Moodboard & Visi Estetika Pernikahan melalui VVIP Moodboard Exporter:\n\n` +
        `• Pasangan: ${coupleNames}\n` +
        `• Target Waktu: ${targetSeason}\n` +
        `• Perkiraan Tamu: ${guestCount}\n` +
        `• Tema & Konsep: ${themeName} (${region})\n` +
        `• Palet Warna: ${selectedTheme.swatches
          .map((s) => `${s.nameId} [${s.hex}]`)
          .join(', ')}\n` +
        `• Konsep Bunga: ${selectedTheme.floralConceptId}\n` +
        `• Ambience Lampu: ${selectedTheme.lightingConceptId}\n` +
        `• Catatan Khusus: ${customVibeNote}\n\n` +
        `Mohon info ketersediaan venue yang cocok dan jadwal sesi discovery bersama Senior Wedding Director. Terima kasih.`;
    } else {
      text =
        `Hello Aria & Forever Bali Weddings (+62 813-7007-4777),\n\n` +
        `I have exported our Wedding Aesthetic Specification via the VVIP Moodboard Exporter:\n\n` +
        `• Couple: ${coupleNames}\n` +
        `• Target Timeline: ${targetSeason}\n` +
        `• Expected Guests: ${guestCount}\n` +
        `• Curated Aesthetic: ${themeName} (${region})\n` +
        `• Color Architecture: ${selectedTheme.swatches
          .map((s) => `${s.nameEn} [${s.hex}]`)
          .join(', ')}\n` +
        `• Botanical Concept: ${selectedTheme.floralConceptEn}\n` +
        `• Lighting Atmosphere: ${selectedTheme.lightingConceptEn}\n` +
        `• Special Vision: ${customVibeNote}\n\n` +
        `Please advise on venue availability aligned with this aesthetic and schedule a private discovery consultation. Thank you.`;
    }

    return `https://wa.me/6281370074777?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="moodboard-exporter"
      className="py-20 lg:py-28 bg-[#111816] text-[#FDFBF7] relative overflow-hidden border-t border-white/5"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Ambient Lighting Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#1A2421] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/15 border border-[#C9A96E]/40 rounded-xs mb-4">
            <Palette className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold">
              {lang === 'ID'
                ? 'PUSAT EKSPOR PORTOFOLIO VVIP'
                : 'VVIP MOODBOARD & AESTHETIC EXPORTER'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FDFBF7] tracking-wide leading-tight mb-4"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? (
              <>
                Ekspor Visi Pernikahan & <span className="text-[#C9A96E] italic">Palet Estetika Anda</span>
              </>
            ) : (
              <>
                Export Your Bespoke <span className="text-[#C9A96E] italic">Wedding Vision & Palette</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Rangkum konsep desain, arsitektur bunga, tata cahaya 2400K, dan alur selebrasi Anda ke dalam satu lembar Moodboard Portofolio yang siap dicetak atau disinkronkan langsung ke WhatsApp VIP Desk.'
              : 'Synthesize your color harmonies, botanical styling, candlelight atmosphere, and celebration blueprint into an exquisite ready-to-print specification or transmit directly to our VIP Concierge.'}
          </p>
        </div>

        {/* Master Control Bar: Couple Info & Theme Switcher */}
        <div className="bg-[#1A2421] border border-white/10 rounded-2xl p-6 mb-8 max-w-5xl mx-auto shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-white/10 items-center">
            {/* Couple Names Input */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-1.5">
                {lang === 'ID' ? 'Nama Pasangan' : 'Couple Names'}
              </label>
              <input
                type="text"
                value={coupleNames}
                onChange={(e) => setCoupleNames(e.target.value)}
                placeholder="Sarah & Marcus"
                className="w-full px-3.5 py-2 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
              />
            </div>

            {/* Target Season & Guest Count */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-1.5">
                  {lang === 'ID' ? 'Bulan / Musim' : 'Target Season'}
                </label>
                <input
                  type="text"
                  value={targetSeason}
                  onChange={(e) => setTargetSeason(e.target.value)}
                  className="w-full px-2.5 py-2 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-1.5">
                  {lang === 'ID' ? 'Estimasi Tamu' : 'Guest Count'}
                </label>
                <input
                  type="text"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-2.5 py-2 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                />
              </div>
            </div>

            {/* Theme Selector */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-1.5">
                {lang === 'ID' ? 'Pilih Arketipe Estetika' : 'Select Curated Archetype'}
              </label>
              <div className="flex gap-2">
                {MOODBOARD_THEMES.map((theme) => {
                  const isSelected = selectedThemeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedThemeId(theme.id)}
                      className={`flex-1 py-2 px-2 rounded-xs text-[11px] font-semibold transition-all cursor-pointer border text-center truncate ${
                        isSelected
                          ? 'bg-[#C9A96E] text-[#111816] border-[#C9A96E] shadow-md'
                          : 'bg-[#111816] text-neutral-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {lang === 'ID'
                        ? theme.id === 'obsidian_gold'
                          ? 'Tebing Uluwatu'
                          : theme.id === 'botanical_sanctuary'
                          ? 'Rimba Ubud'
                          : 'Pantai Pererenan'
                        : theme.id === 'obsidian_gold'
                        ? 'Uluwatu Cliff'
                        : theme.id === 'botanical_sanctuary'
                        ? 'Ubud Jungle'
                        : 'Pererenan Beach'}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons for Export */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>
                {lang === 'ID'
                  ? 'Portofolio siap dicetak atau dikirim ke Direktur Pernikahan Anda.'
                  : 'Ready for client presentation, printable PDF, and WhatsApp synchronization.'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Copy Summary Button */}
              <button
                type="button"
                onClick={handleCopySummary}
                className="px-3 py-2 bg-[#111816] hover:bg-white/10 text-neutral-200 text-xs rounded-xs border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Salin Rincian Teks"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">
                      {lang === 'ID' ? 'Tersalin!' : 'Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span>{lang === 'ID' ? 'Salin Ringkasan' : 'Copy Summary'}</span>
                  </>
                )}
              </button>

              {/* Print / PDF Button */}
              <button
                type="button"
                onClick={handlePrintMoodboard}
                className="px-4 py-2 bg-[#111816] hover:bg-white/10 text-[#C9A96E] text-xs font-semibold rounded-xs border border-[#C9A96E]/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{lang === 'ID' ? 'Cetak / Unduh PDF' : 'Print / PDF Export'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Printable/Exportable Moodboard Master Canvas */}
        <div
          id="printable-moodboard-card"
          className="bg-[#1A2421] border-2 border-[#C9A96E] rounded-2xl p-6 sm:p-10 max-w-5xl mx-auto shadow-2xl relative overflow-hidden"
        >
          {/* Watermark Logo in Corner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#C9A96E] uppercase font-bold block mb-1">
                FOREVER BALI WEDDINGS • ATELIER DE DESIGN
              </span>
              <h3
                className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {coupleNames}
              </h3>
              <p className="text-xs text-neutral-400 font-light mt-1">
                {lang === 'ID' ? selectedTheme.subtitleId : selectedTheme.subtitleEn}
              </p>
            </div>

            <div className="sm:text-right text-xs text-neutral-300 font-mono space-y-1">
              <div className="text-[#C9A96E] font-semibold">📍 {selectedTheme.regionEn}</div>
              <div>📅 {targetSeason}</div>
              <div className="text-neutral-400">👥 {guestCount}</div>
            </div>
          </div>

          {/* Visual Imagery & Color Architecture Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Hero Moodboard Image (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-white/15 shadow-lg group">
                <img
                  src={selectedTheme.heroImage}
                  alt={selectedTheme.nameEn}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111816] via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#111816]/90 border border-[#C9A96E]/50 text-[#C9A96E] text-xs font-serif font-bold rounded-xs backdrop-blur-xs">
                    {lang === 'ID' ? selectedTheme.nameId : selectedTheme.nameEn}
                  </span>
                  <span className="text-[10px] text-white/80 font-mono bg-black/60 px-2 py-0.5 rounded-xs">
                    Master Atmosphere
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {selectedTheme.gallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="h-20 sm:h-24 rounded-lg overflow-hidden border border-white/10 shadow-md"
                  >
                    <img
                      src={imgUrl}
                      alt="Moodboard detail"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Color Swatches & Aesthetic DNA (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* Color Architecture Bar */}
              <div className="bg-[#111816] p-4 rounded-xl border border-white/10 shadow-md">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#C9A96E] font-bold block mb-3">
                  {lang === 'ID' ? 'ARSITEKTUR PALET WARNA' : 'COLOR ARCHITECTURE PALETTE'}
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {selectedTheme.swatches.map((swatch, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className="w-full h-12 rounded-lg border border-white/20 shadow-md mb-1.5 transition-transform hover:scale-105"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="text-[10px] text-white font-medium text-center truncate w-full">
                        {lang === 'ID' ? swatch.nameId : swatch.nameEn}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-400 uppercase">
                        {swatch.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & Atmosphere DNA */}
              <div className="bg-[#111816] p-4 rounded-xl border border-white/10 shadow-md flex-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#C9A96E] font-bold block mb-2">
                  {lang === 'ID' ? 'DNA ATMOSFER & KARAKTER' : 'ATMOSPHERE & VIBE DNA'}
                </span>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(lang === 'ID' ? selectedTheme.tagsId : selectedTheme.tagsEn).map(
                    (tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#1A2421] border border-white/10 text-neutral-200 rounded-xs text-[10px] font-light"
                      >
                        #{tag}
                      </span>
                    )
                  )}
                </div>

                <div className="text-[11px] text-neutral-300 font-light space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Shirt className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                    <span>
                      <strong>{lang === 'ID' ? 'Dress Code:' : 'Dress Code:'}</strong>{' '}
                      {lang === 'ID' ? selectedTheme.dressCodeId : selectedTheme.dressCodeEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Music className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                    <span className="truncate">
                      <strong>{lang === 'ID' ? 'Musik:' : 'Soundscape:'}</strong>{' '}
                      {lang === 'ID' ? selectedTheme.musicVibeId : selectedTheme.musicVibeEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Key Pillar Highlights: Florals, Lighting, Gastronomy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 pt-6 border-t border-white/10">
            {/* Floral Architecture */}
            <div className="p-4 bg-[#111816] rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-[#C9A96E]">
                <Flower2 className="w-4 h-4" />
                <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-white">
                  {lang === 'ID' ? 'Arsitektur Bunga' : 'Floral Architecture'}
                </h4>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {lang === 'ID'
                  ? selectedTheme.floralConceptId
                  : selectedTheme.floralConceptEn}
              </p>
            </div>

            {/* 2400K Lighting Design */}
            <div className="p-4 bg-[#111816] rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-[#C9A96E]">
                <Flame className="w-4 h-4" />
                <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-white">
                  {lang === 'ID' ? 'Pencahayaan 2400K' : '2400K Candlelight'}
                </h4>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {lang === 'ID'
                  ? selectedTheme.lightingConceptId
                  : selectedTheme.lightingConceptEn}
              </p>
            </div>

            {/* Culinary & Pairings */}
            <div className="p-4 bg-[#111816] rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-[#C9A96E]">
                <Wine className="w-4 h-4" />
                <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-white">
                  {lang === 'ID' ? 'Gastronomi Mewah' : 'Haute Gastronomy'}
                </h4>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {lang === 'ID' ? selectedTheme.gastronomyId : selectedTheme.gastronomyEn}
              </p>
            </div>
          </div>

          {/* Personal Vision Notes Input */}
          <div className="mb-8">
            <label className="block text-[11px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-2">
              {lang === 'ID'
                ? 'Catatan Visi Pribadi & Preferensi Khusus:'
                : 'Custom Vision Statement & Bespoke Notes:'}
            </label>
            <textarea
              rows={2}
              value={customVibeNote}
              onChange={(e) => setCustomVibeNote(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#111816] border border-white/20 rounded-lg text-xs text-neutral-200 placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E] leading-relaxed"
            />
          </div>

          {/* Primary Action Button: WhatsApp Sync */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-300 font-light">
              <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
              <span>
                {lang === 'ID'
                  ? 'Sinkronisasi instan ke WhatsApp Senior Director (+62 813-7007-4777)'
                  : 'Direct transmission to Senior Wedding Director (+62 813-7007-4777)'}
              </span>
            </div>

            <a
              id="moodboard-send-whatsapp-cta"
              href={generateWhatsAppMoodboardUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-xl group cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>
                {lang === 'ID'
                  ? 'KIRIM RINGKASAN DESAIN KE WHATSAPP'
                  : 'TRANSMIT MOODBOARD VIA WHATSAPP'}
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
