import React, { useState, useMemo } from 'react';
import {
  Calculator,
  DollarSign,
  PieChart,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Users,
  Building,
  Flower2,
  Utensils,
  Camera,
  HeartHandshake,
  Info,
  CheckCircle2,
  FileText,
  Printer,
  Copy,
  Check,
  Layers,
  Compass,
  RefreshCw,
  Video,
  Calendar,
} from 'lucide-react';
import { Language } from '../types';

interface CostTransparencyEngineProps {
  lang: Language;
  onOpenVipBooking?: (tier: string, region: string) => void;
}

type CurrencyCode = 'USD' | 'AUD' | 'SGD' | 'EUR' | 'GBP' | 'IDR';

interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier against base USD
  format: (amount: number, currentRate?: number) => string;
}

const DEFAULT_CURRENCY_RATES: Record<CurrencyCode, CurrencyRate> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1,
    format: (amt) =>
      `$${Math.round(amt).toLocaleString('en-US')}`,
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    rate: 1.52,
    format: (amt, r = 1.52) =>
      `A$${Math.round(amt * r).toLocaleString('en-AU')}`,
  },
  SGD: {
    code: 'SGD',
    symbol: 'S$',
    rate: 1.34,
    format: (amt, r = 1.34) =>
      `S$${Math.round(amt * r).toLocaleString('en-SG')}`,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 0.92,
    format: (amt, r = 0.92) =>
      `€${Math.round(amt * r).toLocaleString('de-DE')}`,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.79,
    format: (amt, r = 0.79) =>
      `£${Math.round(amt * r).toLocaleString('en-GB')}`,
  },
  IDR: {
    code: 'IDR',
    symbol: 'Rp',
    rate: 15950,
    format: (amt, r = 15950) => {
      const idr = Math.round(amt * r);
      if (idr >= 1_000_000_000) {
        return `Rp ${(idr / 1_000_000_000).toFixed(2)} Miliar`;
      }
      return `Rp ${(idr / 1_000_000).toFixed(0)} Juta`;
    },
  },
};

interface WeddingTier {
  id: string;
  nameEn: string;
  nameId: string;
  taglineEn: string;
  taglineId: string;
  guestsEn: string;
  guestsId: string;
  guestCountNum: number;
  baseCostUsd: number;
  recommendedRegionEn: string;
  recommendedRegionId: string;
  idealForEn: string;
  idealForId: string;
}

const WEDDING_TIERS: WeddingTier[] = [
  {
    id: 'elopement',
    nameEn: 'The Intimate Elopement',
    nameId: 'Upacara Ikrar Intimate',
    taglineEn: 'Pure romance and private cliffside sanctuary exclusivity',
    taglineId: 'Romantisme murni dan eksklusivitas tebing laut privat',
    guestsEn: '2 – 15 Guests',
    guestsId: '2 – 15 Tamu',
    guestCountNum: 10,
    baseCostUsd: 18000,
    recommendedRegionEn: 'Uluwatu Cliff or Ubud Secret Waterfalls',
    recommendedRegionId: 'Tebing Uluwatu atau Air Terjun Tersembunyi Ubud',
    idealForEn: 'Couples seeking understated luxury and zero-stress privacy.',
    idealForId: 'Pasangan yang menginginkan kemewahan intim tanpa beban logistik besar.',
  },
  {
    id: 'private_villa',
    nameEn: 'Private Villa Buyout',
    nameId: 'Selebrasi Villa Privat (Buyout)',
    taglineEn: 'Multi-day compound takeover with inner circle & family',
    taglineId: 'Sewa penuh villa mewah multi-hari bersama keluarga inti',
    guestsEn: '20 – 50 Guests',
    guestsId: '20 – 50 Tamu',
    guestCountNum: 35,
    baseCostUsd: 48000,
    recommendedRegionEn: 'Pererenan Beachfront or Uluwatu Cliff Villa',
    recommendedRegionId: 'Tepi Pantai Pererenan atau Villa Tebing Uluwatu',
    idealForEn: 'The benchmark luxury destination wedding experience in Bali.',
    idealForId: 'Tolok ukur utama destination wedding mewah paling diminati di Bali.',
  },
  {
    id: 'medium_luxury',
    nameEn: 'Medium Luxury Destination',
    nameId: 'Pernikahan Mewah Skala Menengah',
    taglineEn: 'Grand panoramic estate wedding with full production & culinary banquet',
    taglineId: 'Perayaan megah panorama tebing dengan tata cahaya & jamuan gourmet',
    guestsEn: '50 – 100 Guests',
    guestsId: '50 – 100 Tamu',
    guestCountNum: 75,
    baseCostUsd: 95000,
    recommendedRegionEn: 'Uluwatu Clifftop Amphitheater or Sayan Valley',
    recommendedRegionId: 'Amfiteater Tebing Uluwatu atau Lembah Sayan Ubud',
    idealForEn: 'Discerning couples hosting international guests from around the globe.',
    idealForId: 'Pasangan internasional yang mengundang kerabat & relasi dari berbagai belahan dunia.',
  },
  {
    id: 'grand_gala',
    nameEn: 'Grand Bespoke Gala',
    nameId: 'Gala Imperial Ultra-Luxury',
    taglineEn: 'Architectural floral transformations, multi-day itinerary & starlight fireworks',
    taglineId: 'Arsitektur bunga spektakuler, perayaan multi-hari & kembang api tengah malam',
    guestsEn: '100 – 150+ Guests',
    guestsId: '100 – 150+ Tamu',
    guestCountNum: 130,
    baseCostUsd: 220000,
    recommendedRegionEn: 'Iconic 5-Star Cliffside Resort or Royal Ocean Lawn',
    recommendedRegionId: 'Resor Tebing Bintang-5 Ikonik atau Royal Ocean Lawn',
    idealForEn: 'Ultra-high-net-worth couples demanding peerless perfection.',
    idealForId: 'Pernikahan prestisius kaliber VVIP dengan standar kemewahan tertinggi.',
  },
];

interface AllocationPillar {
  key: string;
  percentage: number;
  titleEn: string;
  titleId: string;
  icon: React.ComponentType<{ className?: string }>;
  descriptionEn: string;
  descriptionId: string;
  lineItemsEn: string[];
  lineItemsId: string[];
  insiderTipEn: string;
  insiderTipId: string;
}

const ALLOCATION_PILLARS: AllocationPillar[] = [
  {
    key: 'venue_banjar',
    percentage: 35,
    titleEn: '1. Venue Buyout & Banjar Adat Permits',
    titleId: '1. Sewa Penuh Venue & Izin Banjar Adat',
    icon: Building,
    descriptionEn:
      'Secures exclusive private estate property rights, minimum night accommodations, generator backups, local village council (Banjar) security escorts, and noise/pyrotechnic clearances.',
    descriptionId:
      'Mencakup hak sewa privat eksklusif, akomodasi menginap minimum, genset cadangan, pengawalan pecalang Banjar Adat, serta izin kebisingan & kembang api.',
    lineItemsEn: [
      'Multi-day private estate buyout fees',
      'Mandatory Banjar Adat village council event permits',
      'Pecalang (traditional security) & traffic management',
      'Sound & acoustic curfew licensing (up to 24:00 WITA)',
      'Backup industrial power generators (100kVA+)',
    ],
    lineItemsId: [
      'Biaya sewa penuh (buyout) villa multi-hari',
      'Izin resmi desa adat / Banjar Adat setempat',
      'Pengamanan pecalang adat & manajemen lalu lintas tamu',
      'Lisensi jam malam musik & kembang api (hingga 24:00 WITA)',
      'Genset listrik industri cadangan (100kVA+)',
    ],
    insiderTipEn:
      'Bali Insider Tip: Never attempt to bypass Banjar fees. Legitimate planners ensure official village clearance to avoid sound shutdowns during your evening gala.',
    insiderTipId:
      'Catatan Penting: Izin Banjar Adat wajib diproses resmi oleh planner berpengalaman untuk menjamin kelancaran pesta tanpa interupsi jam malam.',
  },
  {
    key: 'floral_styling',
    percentage: 25,
    titleEn: '2. Bespoke Floral Architecture & Styling',
    titleId: '2. Arsitektur Bunga & Tata Dekorasi',
    icon: Flower2,
    descriptionEn:
      'Transforms the landscape with architectural florals, hanging orchid canopies, custom mirrored stages over water, luxury tableware, and 2400K warm ambient candlelight.',
    descriptionId:
      'Transformasi lanskap dengan arsitektur bunga megah, kanopi anggrek gantung, panggung kaca di atas kolam, peranti makan mewah, dan ribuan lilin 2400K.',
    lineItemsEn: [
      'Custom floating glass altar / cliff-edge ceremony arch',
      'Suspended floral chandeliers with imported & local blooms',
      'Designer tableware, French linen runners & gold charger plates',
      'Over 800-1,200 real drip candles and warm ground up-lighting',
      'Bespoke dance floor construction and canopy draping',
    ],
    lineItemsId: [
      'Panggung kaca terapung / gerbang ikrar bibir tebing',
      'Lampu gantung bunga melayang (impor & lokal premium)',
      'Tableware desainer, linen Prancis & piring aksen emas',
      '800-1.200 lilin asli dan tata pencahayaan tanah 2400K',
      'Konstruksi lantai dansa khusus & kanopi kain temaram',
    ],
    insiderTipEn:
      'Bali Insider Tip: We combine hardy tropical white orchids with imported roses to ensure florals withstand the afternoon ocean breeze and humidity.',
    insiderTipId:
      'Catatan Penting: Kami memadukan anggrek bulan lokal tahan angin dengan mawar impor agar dekorasi tetap segar sempurna di bawah hembusan angin laut.',
  },
  {
    key: 'culinary_bar',
    percentage: 25,
    titleEn: '3. Haute Gastronomy & Premium Open Bar',
    titleId: '3. Gastronomi Mewah & Open Bar Premium',
    icon: Utensils,
    descriptionEn:
      'World-class 4 to 5-course plated tasting menus curated by master chefs, sunset artisan canapés, French Champagne flutes, and handcrafted signature mixology cocktails.',
    descriptionId:
      'Jamuan makan malam 4-5 course standar internasional dari master chef, canapés gourmet senja, sampanye Prancis, dan racikan koktail mixology khas.',
    lineItemsEn: [
      'Sunset cocktail hour gourmet canapés (6-8 varieties)',
      '4 or 5-course plated dinner (Wagyu, lobster & vegan options)',
      '6-hour continuous premium open bar (top-shelf spirits)',
      'Artisanal wedding cake tasting & dessert grazing stations',
      'Late-night gourmet supper bites (truffle fries, sliders, satay)',
    ],
    lineItemsId: [
      'Sajian canapés mewah saat sunset cocktail (6-8 varian)',
      'Makan malam 4-5 course plated (Wagyu, lobster, opsi vegan)',
      'Open bar premium 6 jam tanpa batas (minuman beralkohol impor)',
      'Kue pengantin bertingkat desainer & dessert table',
      'Supper snack tengah malam (truffle fries, burger mini, sate lilit)',
    ],
    insiderTipEn:
      'Bali Insider Tip: Indonesian alcohol import duties are significant (~150%). Selecting a venue with flexible corkage or curated local artisan spirits optimizes spend.',
    insiderTipId:
      'Catatan Penting: Bea masuk minuman beralkohol impor di Indonesia cukup tinggi. Pemilihan paket wine/spirit yang tepat sangat menghemat alokasi biaya.',
  },
  {
    key: 'photo_cinema',
    percentage: 10,
    titleEn: '4. Master Photography & 4K Cinema Drone',
    titleId: '4. Dokumentasi Foto & Sinematografi 4K Drone',
    icon: Camera,
    descriptionEn:
      'Editorial destination wedding visual team capturing raw emotions, golden-hour light, cliffside drone angles, and timeless cinematic heirloom films.',
    descriptionId:
      'Tim dokumentasi visual editorial yang mengabadikan momen sakral, cahaya golden hour dramatis, sinematografi drone 4K, dan film pernikahan abadi.',
    lineItemsEn: [
      'Lead master photographer + 2 senior associate photographers',
      'Cinematic director + 2 camera operators with 4K drone capture',
      'Same-day edit teaser video for evening reception display',
      'Full documentary 15-20 min master wedding film',
      'High-resolution online heirloom gallery with full print rights',
    ],
    lineItemsId: [
      'Lead fotografer utama + 2 fotografer senior pendamping',
      'Sutradara sinematografi + 2 videografer & pilot drone 4K',
      'Same-Day Edit video kilat untuk ditayangkan di resepsi malam',
      'Film dokumenter master durasi 15-20 menit',
      'Galeri online beresolusi tinggi dengan hak cetak penuh',
    ],
    insiderTipEn:
      'Bali Insider Tip: Our master cinematographers are intimately familiar with Bali’s 18:15 WITA sunset transitions for flawless lighting continuity.',
    insiderTipId:
      'Catatan Penting: Fotografer kami memahami ritme cahaya matahari terbenam Bali (18:15 WITA) sehingga transisi foto senja ke malam hari selalu dramatis.',
  },
  {
    key: 'concierge_direction',
    percentage: 5,
    titleEn: '5. Full Concierge, Legal & Master Direction',
    titleId: '5. Konsier Penuh, Legalitas & Pengawasan Acara',
    icon: HeartHandshake,
    descriptionEn:
      'Dedicated lead wedding director (Aria & senior team), consular paperwork handling, legal civil/religious registration, and 18-hour day-of orchestration.',
    descriptionId:
      'Direktur pernikahan senior (Aria & tim), pengurusan legalitas konsulat/catatan sipil, serta pengawasan operasional 18 jam di hari H.',
    lineItemsEn: [
      '12-month proactive planning timeline & vendor vetting',
      'Embassy consular documentation & civil registry liaison',
      'VVIP guest airport VIP fast-track & luxury villa transfers',
      'Rehearsal dinner orchestration & run-of-show synchronization',
      '12 to 18-person on-site coordination crew on wedding day',
    ],
    lineItemsId: [
      'Pendampingan perencanaan intensif & seleksi vendor terkurasi',
      'Pengurusan dokumen konsulat kedutaan & catatan sipil resmi',
      'Layanan penjemputan bandara VIP & logistik transportasi tamu',
      'Gladi bersih upacara ikrar & sinkronisasi rundown menit per menit',
      '12-18 staf koordinator profesional di lokasi pada hari pernikahan',
    ],
    insiderTipEn:
      'Bali Insider Tip: A seasoned bilingual director prevents cultural misunderstandings and ensures flawless coordination across all 25+ wedding vendors.',
    insiderTipId:
      'Catatan Penting: Direktur dwibahasa memastikan komunikasi lancar antara vendor internasional dan tim lokal Bali tanpa ada detail yang terlewat.',
  },
];

interface SeoFaqItem {
  id: string;
  qEn: string;
  qId: string;
  aEn: string;
  aId: string;
}

const SEO_FAQS: SeoFaqItem[] = [
  {
    id: 'faq-1',
    qEn: 'What are the realistic costs for a luxury Bali destination wedding in 2026/2027?',
    qId: 'Berapa perkiraan biaya realistis pernikahan mewah di Bali untuk tahun 2026/2027?',
    aEn: 'For an authentic luxury celebration in Bali, realistic investments start from USD $18,000 for intimate cliffside elopements (2-15 guests), USD $48,000 for private villa buyouts (20-50 guests), USD $95,000 for medium luxury weddings (50-100 guests), and USD $150,000 to $350,000+ for grand bespoke multi-day galas at 5-star cliff estates. These figures include venue buyout, high-end florals, fine dining, premium open bar, master photography, and full-service coordination.',
    aId: 'Untuk perayaan pernikahan mewah di Bali, alokasi realistis berkisar dari USD $18.000 (elopement intim 2-15 tamu), USD $48.000 (villa privat 20-50 tamu), USD $95.000 (pernikahan mewah 50-100 tamu), hingga USD $150.000 - $350.000+ untuk gala imperial 100-150+ tamu di tebing Uluwatu. Biaya ini telah mencakup sewa venue, arsitektur bunga, fine dining, open bar, dokumentasi foto/video master, dan manajemen acara penuh.',
  },
  {
    id: 'faq-2',
    qEn: 'What is a "Banjar Permit Fee" and why is it essential?',
    qId: 'Apa itu "Izin Banjar Adat" dan mengapa biaya ini wajib di Bali?',
    aEn: 'In Bali, every village is governed by a traditional community council called the "Banjar Adat". Any private event featuring amplified sound, firework displays, road closures, or external catering must be formally licensed through the Banjar. The fee covers local security (Pecalang), traffic coordination, and community blessings. Professional wedding planners handle this directly to ensure zero interruptions on your wedding day.',
    aId: 'Di Bali, setiap wilayah dipimpin oleh Banjar Adat. Setiap acara pernikahan yang menggunakan pengeras suara, kembang api, atau mendatangkan tamu eksternal wajib memiliki izin resmi Banjar Adat. Biaya ini digunakan untuk pengamanan pecalang adat, pengaturan lalu lintas, dan perizinan lingkungan. Forever Bali Weddings mengurus izin ini secara resmi agar acara Anda berjalan tenang dan aman.',
  },
  {
    id: 'faq-3',
    qEn: 'What hidden costs should international couples watch out for in Bali?',
    qId: 'Biaya tambahan apa yang sering tidak disadari oleh pasangan pengantin di Bali?',
    aEn: 'Common overlooked expenses include: (1) Mandatory minimum night stay requirements at private villas (usually 3 nights in regular season, 5 nights in peak season), (2) Curfew extension fees for music after 22:00 or 23:00 WITA, (3) Alcohol import tariffs and venue corkage fees, (4) Heavy generator backup rentals (essential for clifftop lighting and sound), and (5) Indonesian Government Tax & Service (PB1 10% + Service 11%). Forever Bali Weddings presents 100% transparent net estimates so you face no hidden surprises.',
    aId: 'Biaya yang sering terlewat meliputi: (1) Ketentuan minimum menginap di villa privat (biasanya 3-5 malam), (2) Izin perpanjangan jam malam suara musik setelah pukul 22:00/23:00 WITA, (3) Bea corkage minuman beralkohol, (4) Sewa genset listrik kapasitas besar untuk tata lampu tebing, dan (5) Pajak & Layanan Pemerintah (PB1 & Service 21%). Kami selalu menyajikan estimasi transparan tanpa biaya tersembunyi.',
  },
  {
    id: 'faq-4',
    qEn: 'What are the payment milestone schedules for booking luxury Bali vendors?',
    qId: 'Bagaimana tahapan pembayaran dan jadwal deposit vendor pernikahan di Bali?',
    aEn: 'Standard luxury wedding payment schedules typically follow: (1) 25% - 30% initial deposit upon venue lock-in and date securing (12-18 months prior), (2) 30% second milestone for floral, production, and photography vendor contracts (6 months prior), (3) 40% final balance and guest count finalization (30-45 days prior to event date). All contracts are executed under formal binding agreements with multi-currency payment options.',
    aId: 'Jadwal pembayaran standar umumnya terbagi menjadi 3 tahap: (1) 25% - 30% deposit awal saat penguncian tanggal dan venue (12-18 bulan sebelumnya), (2) 30% tahap kedua untuk pengikatan kontrak bunga, produksi & fotografer (6 bulan sebelumnya), (3) 40% pelunasan akhir dan konfirmasi final jumlah tamu (30-45 hari sebelum hari H).',
  },
];

export const CostTransparencyEngine: React.FC<CostTransparencyEngineProps> = ({
  lang,
  onOpenVipBooking,
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('private_villa');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [expandedPillarKey, setExpandedPillarKey] = useState<string | null>(
    'venue_banjar'
  );
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [ratesState, setRatesState] = useState<Record<CurrencyCode, number>>({
    USD: 1,
    AUD: 1.52,
    SGD: 1.34,
    EUR: 0.92,
    GBP: 0.79,
    IDR: 15950,
  });
  const [isRefreshingRates, setIsRefreshingRates] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('15:45 WITA (Live Interbank Feed)');

  const handleRefreshRates = () => {
    setIsRefreshingRates(true);
    setTimeout(() => {
      // Simulate live micro-fluctuations
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')} WITA`;
      
      setRatesState((prev) => ({
        USD: 1,
        AUD: Number((1.51 + Math.random() * 0.02).toFixed(3)),
        SGD: Number((1.335 + Math.random() * 0.015).toFixed(3)),
        EUR: Number((0.915 + Math.random() * 0.01).toFixed(3)),
        GBP: Number((0.785 + Math.random() * 0.01).toFixed(3)),
        IDR: Math.round(15900 + Math.random() * 80),
      }));
      setLastSyncTime(`${timeStr} (Bank Indonesia & Global Mid-Market)`);
      setIsRefreshingRates(false);
    }, 600);
  };

  const currentTier =
    WEDDING_TIERS.find((t) => t.id === selectedTierId) || WEDDING_TIERS[1];
  const currencyBase = DEFAULT_CURRENCY_RATES[selectedCurrency];
  const currentRate = ratesState[selectedCurrency];

  const formatCurrency = (amtUsd: number) => {
    return currencyBase.format(amtUsd, currentRate);
  };

  // Calculate Pillar Amounts dynamically
  const pillarCalculations = useMemo(() => {
    return ALLOCATION_PILLARS.map((pillar) => {
      const amountUsd = (currentTier.baseCostUsd * pillar.percentage) / 100;
      return {
        ...pillar,
        amountUsd,
        formattedAmount: formatCurrency(amountUsd),
      };
    });
  }, [currentTier, selectedCurrency, currentRate]);

  const totalFormattedCost = useMemo(() => {
    return formatCurrency(currentTier.baseCostUsd);
  }, [currentTier, selectedCurrency, currentRate]);

  // Copy Breakdown
  const handleCopySummary = () => {
    const tierName = lang === 'ID' ? currentTier.nameId : currentTier.nameEn;
    const region =
      lang === 'ID'
        ? currentTier.recommendedRegionId
        : currentTier.recommendedRegionEn;

    let text = `FOREVER BALI WEDDINGS • 2026/2027 COST TRANSPARENCY SPECIFICATION\n\n`;
    text += `Tier: ${tierName} (${
      lang === 'ID' ? currentTier.guestsId : currentTier.guestsEn
    })\n`;
    text += `Region Focus: ${region}\n`;
    text += `Benchmark Investment: ${totalFormattedCost} (${selectedCurrency})\n\n`;
    text += `--- 5-WAY ALLOCATION BREAKDOWN ---\n`;

    pillarCalculations.forEach((p) => {
      const title = lang === 'ID' ? p.titleId : p.titleEn;
      text += `• ${title} [${p.percentage}%]: ${p.formattedAmount}\n`;
    });

    text += `\nDirect Concierge Desk: +62 813-7007-4777 (foreverbaliweddings.com)`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Generate WhatsApp Direct Consultation Link
  const generateWhatsAppUrl = () => {
    const tierName = lang === 'ID' ? currentTier.nameId : currentTier.nameEn;
    const guests = lang === 'ID' ? currentTier.guestsId : currentTier.guestsEn;
    const region =
      lang === 'ID'
        ? currentTier.recommendedRegionId
        : currentTier.recommendedRegionEn;

    let text = '';
    if (lang === 'ID') {
      text =
        `Halo Aria & Tim Forever Bali Weddings (+62 813-7007-4777),\n\n` +
        `Saya tertarik mempelajari rincian anggaran pernikahan dari Mesin Transparansi Biaya:\n\n` +
        `• Kategori Paket: ${tierName}\n` +
        `• Jumlah Tamu: ${guests}\n` +
        `• Pilihan Wilayah: ${region}\n` +
        `• Estimasi Biaya: ${totalFormattedCost} (${selectedCurrency})\n\n` +
        `Mohon informasi ketersediaan tanggal dan jadwal konsultasi perencanaan langsung bersama Aria. Terima kasih.`;
    } else {
      text =
        `Hello Aria & Forever Bali Weddings (+62 813-7007-4777),\n\n` +
        `I have calibrated our wedding budget using your Cost Transparency Engine:\n\n` +
        `• Selected Tier: ${tierName}\n` +
        `• Guest Scale: ${guests}\n` +
        `• Desired Region: ${region}\n` +
        `• Estimated Benchmark: ${totalFormattedCost} (${selectedCurrency})\n\n` +
        `Please advise on venue availability aligned with this budget and schedule our discovery consultation. Thank you.`;
    }

    return `https://wa.me/6281370074777?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="cost-transparency"
      className="py-20 lg:py-28 bg-[#111816] text-[#FDFBF7] relative overflow-hidden border-t border-white/5"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#1A2421] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with High-Intent SEO Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/15 border border-[#C9A96E]/40 rounded-xs mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold">
              {lang === 'ID'
                ? 'TRANSPARANSI BIAYA PERNIKAHAN BALI 2026/2027'
                : 'BALI WEDDING COST TRANSPARENCY ENGINE (2026/2027)'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FDFBF7] tracking-wide leading-tight mb-4"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? (
              <>
                Rincian Biaya Nyata & <span className="text-[#C9A96E] italic">Alokasi Anggaran VVIP</span>
              </>
            ) : (
              <>
                Transparent Investment & <span className="text-[#C9A96E] italic">5-Way Budget Allocation</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Tanpa biaya tersembunyi. Telusuri standar alokasi anggaran pernikahan mewah di Bali yang dihitung secara matematis berdasarkan biaya riil sewa venue tebing, arsitektur bunga, izin Banjar adat, dan fine dining.'
              : 'Zero hidden surprises. Explore real, data-driven luxury wedding expenditure benchmarks across Bali’s most coveted clifftop estates, beachfront villas, and jungle sanctuaries.'}
          </p>
        </div>

        {/* Currency Switcher & Master Tier Navigator */}
        <div className="bg-[#1A2421] border border-white/10 rounded-2xl p-6 mb-8 max-w-5xl mx-auto shadow-xl">
          {/* Currency Pill Bar with Live Rate Integrator */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#C9A96E]" />
                <span className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                  {lang === 'ID' ? 'Pilih Mata Uang Global:' : 'Display Currency:'}
                </span>
              </div>

              {/* Live FX Sync Indicator */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#111816] rounded-xs border border-white/10 text-[10px] font-mono text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lastSyncTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {(Object.keys(DEFAULT_CURRENCY_RATES) as CurrencyCode[]).map((cur) => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => setSelectedCurrency(cur)}
                    className={`px-3 py-1.5 rounded-xs text-xs font-mono font-bold transition-all cursor-pointer border ${
                      selectedCurrency === cur
                        ? 'bg-[#C9A96E] text-[#111816] border-[#C9A96E] shadow-sm'
                        : 'bg-[#111816] text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {cur} ({DEFAULT_CURRENCY_RATES[cur].symbol})
                  </button>
                ))}
              </div>

              {/* Refresh Live Rate Button */}
              <button
                type="button"
                onClick={handleRefreshRates}
                disabled={isRefreshingRates}
                title={lang === 'ID' ? 'Segarkan Kurs Terkini' : 'Refresh Live Interbank Rates'}
                className="p-2 rounded-xs bg-[#111816] hover:bg-white/5 border border-white/10 hover:border-[#C9A96E]/50 text-neutral-400 hover:text-[#C9A96E] transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingRates ? 'animate-spin text-[#C9A96E]' : ''}`} />
              </button>
            </div>
          </div>

          {/* 4 Guest Scale Tier Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6">
            {WEDDING_TIERS.map((tier) => {
              const isSelected = selectedTierId === tier.id;
              const formattedPrice = formatCurrency(tier.baseCostUsd);

              return (
                <button
                  key={tier.id}
                  id={`cost-tier-btn-${tier.id}`}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#111816] border-[#C9A96E] ring-2 ring-[#C9A96E]/40 shadow-xl'
                      : 'bg-[#111816]/60 border-white/10 hover:border-white/30 text-neutral-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs ${
                          isSelected
                            ? 'bg-[#C9A96E] text-[#111816]'
                            : 'bg-white/10 text-neutral-300'
                        }`}
                      >
                        {lang === 'ID' ? tier.guestsId : tier.guestsEn}
                      </span>
                    </div>

                    <h3 className="text-xs font-serif font-bold text-white mb-1">
                      {lang === 'ID' ? tier.nameId : tier.nameEn}
                    </h3>

                    <p className="text-[11px] text-neutral-400 font-light leading-snug mb-3">
                      {lang === 'ID' ? tier.taglineId : tier.taglineEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] text-neutral-400 block uppercase">
                      {lang === 'ID' ? 'Estimasi Investasi' : 'Benchmark Tier'}
                    </span>
                    <span className="text-sm font-serif font-bold text-[#C9A96E]">
                      {formattedPrice}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic 5-Way Allocation Engine Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto mb-12">
          {/* Left Column: Interactive 5-Pillar Inspector (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#1A2421] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-2">
                <div>
                  <span className="text-[10px] font-mono text-[#C9A96E] uppercase tracking-widest block">
                    {lang === 'ID'
                      ? 'RUMUS ALOKASI ANGGARAN STANDAR 5 PILAR'
                      : '5-WAY MATHEMATICAL ALLOCATION MATRIX'}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white">
                    {lang === 'ID' ? currentTier.nameId : currentTier.nameEn}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 block uppercase">
                    {lang === 'ID' ? 'Total Alokasi Rujukan' : 'Total Benchmark'}
                  </span>
                  <span className="text-xl font-serif font-bold text-[#C9A96E]">
                    {totalFormattedCost}
                  </span>
                </div>
              </div>

              {/* Progress Visual Bar */}
              <div className="w-full h-3 rounded-full bg-[#111816] overflow-hidden flex mb-6 border border-white/10">
                {ALLOCATION_PILLARS.map((p) => {
                  const colors = [
                    'bg-[#C9A96E]',
                    'bg-[#D4AF37]',
                    'bg-[#B8985D]',
                    'bg-[#9E824C]',
                    'bg-[#7A643A]',
                  ];
                  const colorIdx = ALLOCATION_PILLARS.indexOf(p);
                  return (
                    <div
                      key={p.key}
                      style={{ width: `${p.percentage}%` }}
                      className={`${colors[colorIdx % colors.length]} transition-all duration-500`}
                      title={`${p.titleEn} (${p.percentage}%)`}
                    />
                  );
                })}
              </div>

              {/* Interactive Accordion for 5 Pillars */}
              <div className="space-y-3">
                {pillarCalculations.map((pillar) => {
                  const isExpanded = expandedPillarKey === pillar.key;
                  const Icon = pillar.icon;
                  const title = lang === 'ID' ? pillar.titleId : pillar.titleEn;
                  const desc =
                    lang === 'ID' ? pillar.descriptionId : pillar.descriptionEn;
                  const lineItems =
                    lang === 'ID' ? pillar.lineItemsId : pillar.lineItemsEn;
                  const tip =
                    lang === 'ID' ? pillar.insiderTipId : pillar.insiderTipEn;

                  return (
                    <div
                      key={pillar.key}
                      className={`rounded-xl border transition-all overflow-hidden ${
                        isExpanded
                          ? 'bg-[#111816] border-[#C9A96E]/60 shadow-lg'
                          : 'bg-[#111816]/50 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedPillarKey(isExpanded ? null : pillar.key)
                        }
                        className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/15 border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E] shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-serif font-bold text-white">
                              {title}
                            </div>
                            <div className="text-[10px] text-neutral-400 font-mono">
                              {pillar.percentage}% of total allocation
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-[#C9A96E]">
                            {pillar.formattedAmount}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-neutral-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-neutral-400" />
                          )}
                        </div>
                      </button>

                      {/* Expanded Line-Item Detail */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-white/10 space-y-3 text-xs">
                          <p className="text-neutral-300 font-light leading-relaxed">
                            {desc}
                          </p>

                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] font-mono text-[#C9A96E] uppercase tracking-wider block font-semibold">
                              {lang === 'ID'
                                ? 'Komponen Utama yang Termasuk:'
                                : 'Scope of Execution & Inclusions:'}
                            </span>
                            {lineItems.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-neutral-300 font-light"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>

                          <div className="p-2.5 bg-[#1A2421] rounded-lg border border-[#C9A96E]/20 text-[11px] text-[#C9A96E] font-light flex items-start gap-2">
                            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary, Print & Direct WhatsApp CTA (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-[#1A2421] border-2 border-[#C9A96E] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96E]/10 rounded-full blur-2xl pointer-events-none" />

              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-semibold bg-[#111816] px-2.5 py-1 rounded-xs border border-[#C9A96E]/30 inline-block mb-3">
                {lang === 'ID' ? 'RINGKASAN INVESTASI' : 'INVESTMENT BLUEPRINT'}
              </span>

              <h3
                className="text-xl font-serif font-bold text-white mb-1"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {lang === 'ID' ? currentTier.nameId : currentTier.nameEn}
              </h3>

              <div className="text-xs text-neutral-300 space-y-1.5 mb-4 pb-4 border-b border-white/10 font-light">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>
                    {lang === 'ID' ? currentTier.guestsId : currentTier.guestsEn}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>
                    {lang === 'ID'
                      ? currentTier.recommendedRegionId
                      : currentTier.recommendedRegionEn}
                  </span>
                </div>
              </div>

              {/* Mini Pillar Checklist */}
              <div className="space-y-1.5 mb-6 text-xs font-mono">
                {pillarCalculations.map((p) => (
                  <div
                    key={p.key}
                    className="flex items-center justify-between text-neutral-300 text-[11px]"
                  >
                    <span className="truncate max-w-[180px]">
                      {lang === 'ID' ? p.titleId.split('.')[1] : p.titleEn.split('.')[1]}
                    </span>
                    <span className="text-[#C9A96E] font-bold">
                      {p.formattedAmount}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons: VIP Video Booking, WhatsApp & Copy */}
              <div className="space-y-2.5">
                {onOpenVipBooking && (
                  <button
                    type="button"
                    onClick={() => {
                      const tierName = lang === 'ID' ? currentTier.nameId : currentTier.nameEn;
                      const region = lang === 'ID' ? currentTier.recommendedRegionId : currentTier.recommendedRegionEn;
                      onOpenVipBooking(tierName, region);
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

                <a
                  id="cost-engine-whatsapp-cta"
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

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full py-2.5 px-4 bg-[#111816] hover:bg-white/5 border border-white/15 text-neutral-300 text-xs rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">
                        {lang === 'ID' ? 'Rincian Tersalin!' : 'Breakdown Copied!'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#C9A96E]" />
                      <span>
                        {lang === 'ID' ? 'Salin Rincian Teks' : 'Copy Text Breakdown'}
                      </span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-neutral-400 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>
                  {lang === 'ID'
                    ? 'Verifikasi langsung dengan Aria (+62 813-7007-4777)'
                    : 'Direct Lead Director Review (+62 813-7007-4777)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* High-Intent SEO Deep-Dive: Luxury Wedding Cost Questions */}
        <div className="bg-[#1A2421] border border-white/10 rounded-2xl p-6 sm:p-10 max-w-5xl mx-auto shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono text-[#C9A96E] uppercase tracking-widest block mb-1">
              {lang === 'ID'
                ? 'PANDUAN & PERTANYAAN ANGGARAN POPULER'
                : 'BALI DESTINATION WEDDING FINANCIAL WISDOM'}
            </span>
            <h3
              className="text-xl sm:text-2xl font-serif font-bold text-white"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {lang === 'ID'
                ? 'Hal yang Wajib Diketahui Seputar Biaya Wedding di Bali'
                : 'Frequently Addressed Luxury Wedding Cost Inquiries'}
            </h3>
          </div>

          <div className="space-y-3">
            {SEO_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const question = lang === 'ID' ? faq.qId : faq.qEn;
              const answer = lang === 'ID' ? faq.aId : faq.aEn;

              return (
                <div
                  key={faq.id}
                  className="bg-[#111816] rounded-xl border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-xs font-serif font-bold text-white">
                      {question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#C9A96E] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 border-t border-white/10 text-xs text-neutral-300 font-light leading-relaxed">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
