import {
  WeddingPackage,
  HeritageOffering,
  ComprehensiveService,
  ComparisonRow,
  TrackRecordStat,
  PlanningStep,
  BackdropItem,
  GalleryItem,
  TestimonialItem,
  VenueItem,
  GuestConciergeService,
  AnniversaryOffering,
} from '../types';

export const CONTACT_INFO = {
  studioName: 'Forever Bali Weddings Studio',
  address: 'Denpasar, Bali, Indonesia',
  email: 'foreverbaliwedding@gmail.com',
  website: 'foreverbaliweddings.com',
  phoneDisplay: '+62 813-7007-4777',
  whatsappUrl: 'https://wa.me/6281370074777',
  whatsappNumber: '6281370074777',
  instagram: 'https://instagram.com/foreverbaliwedding',
  pinterest: 'https://pinterest.com/foreverbaliwedding',
  tiktok: 'https://tiktok.com/@foreverbaliwedding',
  hours: 'Mon - Sun: 09:00 - 18:00 (WITA / GMT+8)',
};

// Page 1: Hero Data
export const HERO_DATA = {
  eyebrowEn: 'FOREVER BALI WEDDINGS STUDIO',
  eyebrowId: 'FOREVER BALI WEDDINGS STUDIO',
  headlineEn: 'Curated Luxury Bali Wedding Packages',
  headlineId: 'Paket Pernikahan Mewah Terkurasi di Bali',
  subtitleEn:
    'Bespoke Destination Celebrations, Refined Tropical Aesthetics & Seamless International Planning Services',
  subtitleId:
    'Perayaan Pernikahan Eksklusif, Estetika Tropis Elegan & Layanan Perencanaan Internasional Tanpa Kendala',
  heroImage: 'https://vanara.life/weddings-d.webp',
};

// Page 2: About Our Studio (Bespoke Hospitality)
export const ABOUT_DATA = {
  eyebrowEn: 'BESPOKE HOSPITALITY',
  eyebrowId: 'KERAMAHAN EKSKLUSIF',
  titleEn: 'About Our Studio',
  titleId: 'Tentang Studio Kami',
  paragraph1En:
    "For over a decade, Forever Bali Weddings has harmonized Bali's ethereal beauty with the discerning standards of global couples from Australia, Europe, the US, and Singapore.",
  paragraph1Id:
    'Selama lebih dari satu dekade, Forever Bali Weddings telah memadukan keindahan magis Bali dengan standar tinggi pasangan global dari Australia, Eropa, Amerika Serikat, dan Singapura.',
  paragraph2En:
    'Our philosophy is rooted in Modern Minimalism—where natural tropical splendor is elevated through meticulous planning, high-end artisanal partners, and total peace of mind.',
  paragraph2Id:
    'Filosofi kami berakar pada Minimalisme Modern—di mana kemegahan alam tropis disempurnakan melalui perencanaan yang presisi, mitra artisanal terkemuka, dan ketenangan pikiran yang total.',
  image: 'https://vanara.life/weddings-d.webp',
};

// Page 3, 4, 5: Packages Data
export const WEDDING_PACKAGES: WeddingPackage[] = [
  {
    id: 'pkg-essential',
    code: 'essential',
    eyebrowEn: 'FOUNDATIONAL COLLECTION',
    eyebrowId: 'KOLEKSI PONDASI ELEGAN',
    nameEn: 'Essential Luxury Package',
    nameId: 'Essential Luxury Package',
    subtitleEn: 'Intimate Elegance',
    subtitleId: 'Keanggunan Intim',
    guestCountEn: '10 - 20 GUESTS',
    guestCountId: '10 - 20 TAMU',
    priceRange: '$5,000 – $8,000',
    image: 'https://media.theyoungvillas.com/spio/ret_img,q_cdnize,to_auto,s_webp:avif/www.theyoungvillas.com/wp-content/uploads/2025/06/white-minimalist-villa-design-bali-copy.jpg',
    descriptionEn:
      'Ideal for intimate elopements or micro-weddings. This tier provides a flawless structural foundation without compromising on visual elegance or planning support.',
    descriptionId:
      'Ideal untuk intimate elopement atau micro-wedding. Paket ini memberikan fondasi struktural yang sempurna tanpa mengorbankan keanggunan visual atau dukungan perencanaan.',
    featuresEn: [
      'Strategic ceremony design & minimalist styling',
      'Professional English-speaking celebrant & audio system',
      'Signature tropical bridal bouquet & boutonnieres',
      'Dedicated ground coordination for seamless flow',
    ],
    featuresId: [
      'Desain upacara strategis & penataan gaya minimalis',
      'Celebrant profesional berbahasa Inggris & sistem audio',
      'Signature buket pengantin tropis & boutonniere',
      'Koordinasi lapangan berdedikasi untuk kelancaran acara',
    ],
    whyChooseTitleEn: 'Why Choose Essential',
    whyChooseTitleId: 'Mengapa Memilih Essential',
    whyChooseDescEn:
      'Ideal for intimate elopements or micro-weddings. This tier provides a flawless structural foundation without compromising on visual elegance or planning support. Includes full vendor management and luxury concierge services from day one.',
    whyChooseDescId:
      'Sangat cocok untuk pernikahan intim atau elopement. Memberikan fondasi tanpa cela, keanggunan visual tinggi, serta manajemen vendor dan concierge mewah sejak hari pertama.',
    whyChooseNoteEn: 'Includes complete administrative and vendor coordination.',
    whyChooseNoteId: 'Termasuk koordinasi administratif dan manajemen vendor lengkap.',
    isPopular: false,
    stars: '★ ★ ★',
  },
  {
    id: 'pkg-artisan',
    code: 'artisan',
    eyebrowEn: 'MID-SCALE EXCELLENCE',
    eyebrowId: 'KEUNGGULAN SKALA MENENGAH',
    nameEn: 'Artisan Wedding Tier',
    nameId: 'Artisan Wedding Tier',
    subtitleEn: 'Enhanced Sophistication',
    subtitleId: 'Kemewahan & Kecanggihan Menyeluruh',
    guestCountEn: '30 - 50 GUESTS',
    guestCountId: '30 - 50 TAMU',
    priceRange: '$8,000 – $15,000',
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=1200&auto=format&fit=crop',
    descriptionEn:
      'Designed for medium-sized celebrations seeking sophisticated design, bespoke catering integration, and complete end-to-end event production.',
    descriptionId:
      'Dirancang untuk perayaan skala menengah yang menginginkan desain berkelas, integrasi katering eksklusif, dan produksi acara terpadu dari awal hingga akhir.',
    featuresEn: [
      'Full ceremony and reception design suite',
      'Premium level floral installations & tabletop styling',
      'Full-day editorial photo & cinematic coverage',
      'Comprehensive guest concierge & transport logistics',
    ],
    featuresId: [
      'Paket desain lengkap upacara & resepsi',
      'Instalasi bunga premium & penataan meja banquet',
      'Dokumentasi foto editorial & sinematik sepanjang hari',
      'Layanan concierge tamu & logistik transportasi komprehensif',
    ],
    whyChooseTitleEn: 'Curated Atmosphere',
    whyChooseTitleId: 'Atmosfer Terkurasi',
    whyChooseDescEn:
      'Designed for medium-sized celebrations seeking sophisticated design, bespoke catering integration, and complete end-to-end event production. Includes spatial planning, lighting installations, and dedicated on-site directors.',
    whyChooseDescId:
      'Menghadirkan perencanaan tata ruang, instalasi pencahayaan artistik, dan direktur acara berdedikasi di lokasi sepanjang hari perayaan Anda.',
    whyChooseNoteEn: 'Includes full high-resolution digital media archives.',
    whyChooseNoteId: 'Termasuk arsip media digital beresolusi tinggi lengkap.',
    isPopular: true,
    stars: '★ ★ ★ ★',
  },
  {
    id: 'pkg-signature-elite',
    code: 'signature-elite',
    eyebrowEn: 'OUR PRESTIGE TIER',
    eyebrowId: 'TIER PRESTISIUS UTAMA',
    nameEn: 'Signature Elite Package',
    nameId: 'Signature Elite Package',
    subtitleEn: 'Lavish Island Celebrations',
    subtitleId: 'Perayaan Megah & Prestisius',
    guestCountEn: '60+ GUESTS | FULL-SERVICE LUXURY',
    guestCountId: '60+ TAMU | FULL-SERVICE LUXURY',
    priceRange: '$15,000+',
    image: 'https://www.greatdestinationweddings.com.au/wp-content/uploads/2026/04/royal-santrian-luxury-beach-villas-bali-weddings-beach-ceremony-setup-with-colorful-flowers-1024x683.jpg',
    descriptionEn:
      "Our flagship offering delivers uncompromised grandeur at Bali's most iconic cliffside estates and oceanfront villas.",
    descriptionId:
      'Penawaran mahakarya unggulan kami yang menghadirkan kemegahan tanpa kompromi di tebing estate dan villa tepi laut paling ikonik di Bali.',
    featuresEn: [
      'Exclusive access to elite private island estates',
      'Master-level botanical artistry & custom builds',
      'Full cinematography team with drone aerial coverage',
      'Senior planning leads overseeing every detail',
    ],
    featuresId: [
      'Akses eksklusif ke private luxury estate terbaik Bali',
      'Keahlian botani tingkat master & custom architectural build',
      'Tim sinematografi lengkap dengan liputan drone aerial',
      'Direktur perencana senior mengawal setiap detik detail',
    ],
    whyChooseTitleEn: 'Lavish Grandeur',
    whyChooseTitleId: 'Kemegahan Mahakarya',
    whyChooseDescEn:
      'Unrivaled prestige with bespoke architectural setups, world-class entertainment curations, and private island estate access with dedicated senior planning leads.',
    whyChooseDescId:
      'Prestise tiada tanding dengan konsep arsitektur megah, kurasi hiburan kelas dunia, dan koordinasi VIP oleh tim direktur utama.',
    whyChooseNoteEn: 'Includes VIP private villa estate access & senior director.',
    whyChooseNoteId: 'Termasuk akses villa estate privat VIP & pengawasan direktur senior.',
    isPopular: false,
    stars: '★ ★ ★ ★ ★',
  },
];

// Page 6: Nusantara Heritage (Cultural Reverence)
export const NUSANTARA_HERITAGE: HeritageOffering = {
  eyebrowEn: 'CULTURAL REVERENCE',
  eyebrowId: 'PENGHORMATAN BUDAYA',
  titleEn: 'Nusantara Heritage',
  titleId: 'Nusantara Heritage',
  subtitleEn: 'Traditional Rituals & Blessings',
  subtitleId: 'Ritual Tradisional & Pemberkatan Suci',
  descriptionEn:
    'Embrace the deep spirituality of the Island of the Gods with an authentic Balinese blessing ceremony tailored for international couples.',
  descriptionId:
    'Rasakan spiritualitas mendalam Pulau Dewata dengan upacara pemberkatan adat Bali autentik yang dirancang khusus untuk pasangan internasional maupun domestik.',
  inclusionsEn: [
    'Sacred Balinese blessing conducted by local officiants',
    'Authentic handcrafted Balinese attire & gold crown styling',
    'Traditional gamelan musical soundscapes & flower offerings',
    'Bespoke legal concierge and international documentation',
  ],
  inclusionsId: [
    'Pemberkatan suci adat Bali yang dipimpin oleh pemangku lokal',
    'Busana adat Bali tenun tangan autentik & tata rias mahkota emas',
    'Alunan musik gamelan tradisional & sesaji bunga canang sari',
    'Layanan legal concierge dan pengurusan dokumen internasional',
  ],
  image:
    'https://pub-6f6e9f80a4d14e688e3720657e173fd6.r2.dev/inspire/a-ceremoniously-vibrant-balinese-wedding-at-villa-ambalama-bali/1775717921425-cover/crop-4x5-mobile-cover.webp?v=0.4975_0.4183-g48c0b959',
};

// Page 7: Comprehensive Services (360-Degree Execution)
export const COMPREHENSIVE_SERVICES: ComprehensiveService[] = [
  {
    id: 'srv-legal',
    iconName: 'scale',
    titleEn: 'Legal Concierge',
    titleId: 'Legal Concierge',
    descriptionEn:
      'Complete management of local religious & consular documentation for worldwide legal recognition.',
    descriptionId:
      'Pengurusan lengkap dokumen keagamaan lokal & konsulat kedutaan untuk pengakuan legalitas pernikahan di seluruh dunia.',
  },
  {
    id: 'srv-dining',
    iconName: 'utensils',
    titleEn: 'Gourmet Dining',
    titleId: 'Gourmet Dining',
    descriptionEn:
      'Curated 5-course tasting menus, artisanal canapés, and silver-service catering partnerships.',
    descriptionId:
      'Kurasi menu tasting 5-course, canapé artisanal, dan kemitraan katering silver-service bintang lima.',
  },
  {
    id: 'srv-bridal',
    iconName: 'sparkles',
    titleEn: 'Bridal Artistry',
    titleId: 'Bridal Artistry',
    descriptionEn:
      'HD makeup & humidity-resistant editorial hairstyling with full trial sessions included.',
    descriptionId:
      'Tata rias HD & tata rambut editorial tahan kelembaban tropis, lengkap dengan sesi uji coba (trial session).',
  },
  {
    id: 'srv-painting',
    iconName: 'palette',
    titleEn: 'Live Painting',
    titleId: 'Live Painting',
    descriptionEn:
      'An exclusive heirloom add-on: real-time fine art painting of your key wedding moments.',
    descriptionId:
      'Karya seni warisan eksklusif: lukisan kanvas fine-art langsung (real-time) di momen sakral pernikahan Anda.',
  },
];

// Page 8: Package Comparison (At a Glance)
export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    featureEn: 'Guest Capacity',
    featureId: 'Kapasitas Tamu',
    essential: '10 - 20 Guests',
    artisan: '30 - 50 Guests',
    signature: '60+ Guests',
  },
  {
    featureEn: 'Styling & Florals',
    featureId: 'Penataan Bunga & Dekor',
    essential: 'Signature Bouquets',
    artisan: 'Full Ceremony & Reception Suite',
    signature: 'Master-Level Custom Builds',
  },
  {
    featureEn: 'Media Coverage',
    featureId: 'Dokumentasi Foto & Video',
    essential: 'Optional Add-on',
    artisan: 'Full-Day Photography',
    signature: 'Photo, Video & Drone Cinema',
  },
  {
    featureEn: 'Planning Leads',
    featureId: 'Pimpinan Tim Planner',
    essential: 'Ground Coordinator',
    artisan: 'Dedicated Producer',
    signature: 'Senior Planning Director',
  },
  {
    featureEn: 'Investment Range',
    featureId: 'Kisaran Investasi',
    essential: '$5,000 - $8,000',
    artisan: '$8,000 - $15,000',
    signature: '$15,000+',
  },
];

// Page 9: Decade of Excellence (Proven Track Record)
export const TRACK_RECORD_STATS: TrackRecordStat[] = [
  {
    value: '10+',
    labelEn: 'YEARS OPERATING',
    labelId: 'TAHUN PENGALAMAN',
    descEn: "Deep island mastery and direct connections with Bali's top venues.",
    descId: 'Penguasaan mendalam atas pulau Bali dan koneksi langsung dengan venue terbaik.',
  },
  {
    value: '100%',
    labelEn: 'TRANSPARENT RATES',
    labelId: 'TARIF TRANSPARAN',
    descEn: 'All pricing is nett with no hidden fees or surprise overseas surcharges.',
    descId: 'Semua harga transparan tanpa biaya tersembunyi atau biaya tambahan luar negeri.',
  },
  {
    value: '5.0 ★',
    labelEn: 'CLIENT RATING',
    labelId: 'RATING KLIEN',
    descEn: 'Top-rated by couples across Australia, Europe, the US, and Singapore.',
    descId: 'Diakui dengan rating sempurna oleh pasangan dari Australia, Eropa, AS, dan Singapura.',
  },
];

// Page 10: The Planning Voyage (Seamless Journey)
export const PLANNING_STEPS: PlanningStep[] = [
  {
    stepNumber: 1,
    timeframeId: 'Bulan 12 - 9',
    timeframeEn: 'Month 12 - 9',
    titleId: 'Konsultasi Awal & Konsep',
    titleEn: 'Initial Discovery & Concept Consultation',
    subtitleId: 'Menyelaraskan Visi, Anggaran & Suasana Impian',
    subtitleEn: 'Aligning Vision, Budget & Aesthetic Foundation',
    descId:
      'Sesi eksplorasi mendalam untuk memahami kisah cinta unik Anda, gaya estetika yang diinginkan, dan perkiraan alokasi anggaran. Kami menyusun draft master timeline dan panduan arah kreatif perdana.',
    descEn:
      'An in-depth discovery session exploring your unique love narrative, desired atmosphere, and budget framework. We formulate your custom creative direction guide and preliminary master planning roadmap.',
    deliverablesId: [
      'Konsultasi privat 1-on-1 bersama Lead Wedding Planner (Zoom / In-person)',
      'Penyusunan moodboard konsep estetika & palet warna awal',
      'Struktur alokasi anggaran transparan & master roadmap 12 bulan',
    ],
    deliverablesEn: [
      '1-on-1 private discovery consultation with Lead Wedding Planner',
      'Initial moodboard curation & bespoke color palette design',
      'Transparent budget allocation framework & 12-month master roadmap',
    ],
    iconType: 'compass',
  },
  {
    stepNumber: 2,
    timeframeId: 'Bulan 9 - 6',
    timeframeEn: 'Month 9 - 6',
    titleId: 'Pemilihan Venue & Kurasi Vendor',
    titleEn: 'Venue Lock & Vendor Curation',
    subtitleId: 'Mengamankan Lokasi Ikonik & Tim Ahli Terpilih',
    subtitleEn: 'Securing Iconic Enclaves & Elite Artisanal Partners',
    descId:
      'Kurasi venue privat eksklusif di seluruh Bali (tebing Uluwatu, villa pantai, atau hutan Ubud). Kami melakukan negosiasi kontrak, jadwal site inspection, dan menyaring vendor fotografi, videografi, serta katering terbaik.',
    descEn:
      'Curating and locking your private sanctuary across Bali (cliffside, beachfront, or jungle). We manage site inspections, contract negotiations, and hand-pick the finest photo, video, and culinary partners.',
    deliverablesId: [
      'Inspeksi lokasi & konfirmasi izin venue resmi',
      'Kurasi & negosiasi kontrak vendor utama (Fotografer, MUA, Sound)',
      'Penguncian tanggal & jaminan privasi perayaan Anda',
    ],
    deliverablesEn: [
      'Venue site inspections & official permit confirmation',
      'Curation & contract negotiation of tier-1 creative vendors',
      'Date locking and full privacy guarantees for your celebration',
    ],
    iconType: 'map-pin',
  },
  {
    stepNumber: 3,
    timeframeId: 'Bulan 6 - 3',
    timeframeEn: 'Month 6 - 3',
    titleId: 'Desain Dekorasi & Food Tasting',
    titleEn: 'Design, Styling & Tasting',
    subtitleId: 'Menghidupkan Detail Visual & Pengalaman Rasa',
    subtitleEn: 'Bringing Visual Artistry & Culinary Harmony to Life',
    descId:
      'Detailing desain 3D layout, mock-up instalasi bunga botani, pemilihan tableware mewah, pencahayaan ambiance, serta sesi food & wine tasting privat bersama tim executive chef untuk menyempurnakan jamuan.',
    descEn:
      'Detailing 3D spatial layouts, botanical floral mock-ups, fine tableware rentals, ambient lighting design, and private food & wine tastings with executive chefs to finalize your gourmet banquet.',
    deliverablesId: [
      'Mock-up instalasi bunga, altar janji suci & table setting',
      'Sesi food tasting privat & kurasi pairing wine / signature cocktail',
      'Desain pencahayaan senja hingga malam hari (fairy lights, chandeliers)',
    ],
    deliverablesEn: [
      'Botanical mock-ups, ceremony altar mock-ups & tablescape design',
      'Private menu tasting session & signature cocktail / wine pairings',
      'Ambient lighting choreography (fairy lights, custom chandeliers)',
    ],
    iconType: 'palette',
  },
  {
    stepNumber: 4,
    timeframeId: 'Bulan 3 - 1',
    timeframeEn: 'Month 3 - 1',
    titleId: 'Finalisasi Legalitas & Technical Meeting',
    titleEn: 'Final Legal & Technical Run-Through',
    subtitleId: 'Sinkronisasi Menyeluruh & Ketenangan Dokumen',
    subtitleEn: 'Comprehensive Synchronization & Document Finalization',
    descId:
      'Pengurusan dokumen legal / consular concierge pernikahan lengkap, finalisasi rundown menit-ke-menit (minute-by-minute rundown), dan rapat teknis komprehensif bersama seluruh vendor & tim venue.',
    descEn:
      'Finalizing legal civil and religious documentation, crafting the comprehensive minute-by-minute wedding day rundown, and conducting full-scale technical alignments with all creative vendor partners.',
    deliverablesId: [
      'Verifikasi legalitas catatan sipil / konsuler & pemuka agama',
      'Penyusunan rundown menit-ke-menit (minute-by-minute master rundown)',
      'Rapat teknis gabungan (Technical Meeting) seluruh vendor',
    ],
    deliverablesEn: [
      'Civil/religious legality & consular document clearance',
      'Comprehensive minute-by-minute master wedding rundown',
      'All-hands vendor technical meeting & emergency contingency protocol',
    ],
    iconType: 'file-check',
  },
  {
    stepNumber: 5,
    timeframeId: 'Hari-H / Day-0',
    timeframeEn: 'Wedding Day / Day-0',
    titleId: 'Eksekusi Hari-H Tanpa Stres',
    titleEn: 'The Wedding Day & Full Execution',
    subtitleId: 'Orkestrasi Anggun & Keajaiban Detik Demi Detik',
    subtitleEn: 'Graceful Orchestration & Unforgettable Magic',
    descId:
      'Tim on-site berdedikasi (termasuk personal bride concierge) mengawal kelancaran dari fajar hingga akhir resepsi. Anda dan pasangan hanya perlu menikmati setiap detik kebahagiaan tanpa kekhawatiran logistik apa pun.',
    descEn:
      'Our dedicated on-site team (including private bridal assistants and logistics coordinators) executes every detail silently from dawn till the midnight dance. You immerse purely in the joy and love.',
    deliverablesId: [
      'Personal bridal assistant mendampingi pengantin sejak persiapan pagi',
      'Pengawasan langsung setup dekorasi, sound system, & alur tamu VIP',
      'Eksekusi rundown bebas stres hingga pelepasan kembang api & after-party',
    ],
    deliverablesEn: [
      'Dedicated personal bridal assistant for continuous morning-to-night care',
      'Live oversight of decor build, audiovisual, catering timing, and VIP guests',
      'Flawless, stress-free execution through the golden hour vows to after-party',
    ],
    iconType: 'sparkles',
  },
];

// Page 11: Iconic Backdrops (Visual Inspiration)
export const ICONIC_BACKDROPS: BackdropItem[] = [
  {
    id: 'backdrop-estates',
    titleEn: 'Private Estates',
    titleId: 'Private Estates',
    descEn: 'Exclusive luxury villas in Uluwatu & Canggu.',
    descId: 'Villa mewah eksklusif di kawasan Uluwatu & Canggu.',
    image:
      'https://media.theyoungvillas.com/spio/ret_img,q_cdnize,to_auto,s_webp:avif/www.theyoungvillas.com/wp-content/uploads/2025/06/white-minimalist-villa-design-bali-copy.jpg',
    tagEn: 'Uluwatu & Canggu',
    tagId: 'Uluwatu & Canggu',
  },
  {
    id: 'backdrop-cliff',
    titleEn: 'Oceanfront Cliff',
    titleId: 'Oceanfront Cliff',
    descEn: 'Dramatic views over the Indian Ocean.',
    descId: 'Pemandangan dramatis membentang di atas Samudra Hindia.',
    image:
      'https://www.greatdestinationweddings.com.au/wp-content/uploads/2026/04/royal-santrian-luxury-beach-villas-bali-weddings-beach-ceremony-setup-with-colorful-flowers-1024x683.jpg',
    tagEn: 'Limestone Oceanfront',
    tagId: 'Tebing Samudra Hindia',
  },
  {
    id: 'backdrop-sunset',
    titleEn: 'Golden Sunset',
    titleId: 'Golden Sunset',
    descEn: 'Unforgettable atmosphere for your vows.',
    descId: 'Atmosfer senja keemasan tak terlupakan untuk janji suci Anda.',
    image: 'https://vanara.life/weddings-d.webp',
    tagEn: 'Bali Golden Hour',
    tagId: 'Senja Emas Bali',
  },
];

// Additional rich gallery items for interactive portfolio
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    titleEn: 'Golden Sunset Vows at Uluwatu Cliff',
    titleId: 'Janji Suci Senja Keemasan di Tebing Uluwatu',
    category: 'sunset',
    categoryLabelEn: 'Golden Sunset',
    categoryLabelId: 'Golden Sunset',
    location: 'Uluwatu, Bali',
    image: 'https://vanara.life/weddings-d.webp',
    descriptionEn: 'Unforgettable atmosphere for your sacred vows overlooking the glowing horizon.',
    descriptionId: 'Atmosfer senja magis menghadap cakrawala laut lepas yang berkilau.',
  },
  {
    id: 'gal-2',
    titleEn: 'Oceanfront Botanical Arch Setup',
    titleId: 'Instalasi Altar Bunga Tepi Samudra',
    category: 'cliffside',
    categoryLabelEn: 'Oceanfront Cliff',
    categoryLabelId: 'Oceanfront Cliff',
    location: 'Nusa Dua / Uluwatu, Bali',
    image:
      'https://www.greatdestinationweddings.com.au/wp-content/uploads/2026/04/royal-santrian-luxury-beach-villas-bali-weddings-beach-ceremony-setup-with-colorful-flowers-1024x683.jpg',
    descriptionEn: 'Dramatic floral artistry with vibrant botanical builds facing the Indian Ocean.',
    descriptionId: 'Kemegahan instalasi bunga master-level berpadu dengan deburan ombak tropis.',
  },
  {
    id: 'gal-3',
    titleEn: 'Sacred Balinese Blessing Ceremony',
    titleId: 'Upacara Pemberkatan Adat Bali Nusantara',
    category: 'heritage',
    categoryLabelEn: 'Nusantara Heritage',
    categoryLabelId: 'Nusantara Heritage',
    location: 'Ubud Sanctuary, Bali',
    image:
      'https://pub-6f6e9f80a4d14e688e3720657e173fd6.r2.dev/inspire/a-ceremoniously-vibrant-balinese-wedding-at-villa-ambalama-bali/1775717921425-cover/crop-4x5-mobile-cover.webp?v=0.4975_0.4183-g48c0b959',
    descriptionEn: 'Authentic handcrafted Balinese attire, gamelan soundscapes, and sacred blessings.',
    descriptionId: 'Busana tenun tradisional megah, alunan gamelan, dan doa restu sakral.',
  },
  {
    id: 'gal-4',
    titleEn: 'White Minimalist Villa Sanctuary',
    titleId: 'Villa Privat Minimalis Modern',
    category: 'estates',
    categoryLabelEn: 'Private Estates',
    categoryLabelId: 'Private Estates',
    location: 'Canggu & Uluwatu, Bali',
    image:
      'https://media.theyoungvillas.com/spio/ret_img,q_cdnize,to_auto,s_webp:avif/www.theyoungvillas.com/wp-content/uploads/2025/06/white-minimalist-villa-design-bali-copy.jpg',
    descriptionEn: 'Crisp contemporary architecture surrounded by swaying palms and azure private pools.',
    descriptionId: 'Arsitektur modern tropis yang tenang dan eksklusif untuk perayaan intim.',
  },
  {
    id: 'gal-5',
    titleEn: 'Twilight Reception & Candlelit Banquet',
    titleId: 'Resepsi Senja & Jamuan Lilin Romantis',
    category: 'estates',
    categoryLabelEn: 'Private Estates',
    categoryLabelId: 'Private Estates',
    location: 'Seminyak Luxury Villa, Bali',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
    descriptionEn: 'Curated 5-course gourmet dining beneath ambient starry fairy lights.',
    descriptionId: 'Santap malam mewah 5-course di bawah naungan cahaya gemerlap lilin dan lampu.',
  },
  {
    id: 'gal-6',
    titleEn: 'Editorial Bridal Styling & Tropical Florals',
    titleId: 'Riasan Pengantin Editorial & Bunga Tropis',
    category: 'cliffside',
    categoryLabelEn: 'Oceanfront Cliff',
    categoryLabelId: 'Oceanfront Cliff',
    location: 'Jimbaran Bay, Bali',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    descriptionEn: 'Meticulous details from bespoke bouquets to humidity-resistant artistry.',
    descriptionId: 'Detail sempurna dari buket bunga segar hingga tata rias pengantin berkelas.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    coupleNames: 'Sarah & Alexander',
    origin: 'Sydney, Australia',
    weddingDate: 'June 2025',
    venue: 'Uluwatu Cliffside Villa',
    quoteId:
      'Forever Bali Weddings mewujudkan impian kami dengan luar biasa! Dari kurasi vendor hingga koordinasi hari-H, semuanya berjalan dengan standar internasional yang mulus. Tamu-tamu kami dari Australia sangat terkesima oleh keindahan dan ketenangan yang dihadirkan.',
    quoteEn:
      'Forever Bali Weddings harmonized our entire destination wedding from Australia seamlessly. The Modern Minimalism aesthetic and flawless execution allowed us to truly be present and celebrate.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    coverImage: 'https://vanara.life/weddings-d.webp',
    rating: 5,
  },
  {
    id: 'test-2',
    coupleNames: 'Clarissa & Jonathan',
    origin: 'Singapore',
    weddingDate: 'October 2025',
    venue: 'Ubud River Sanctuary & Canggu Estate',
    quoteId:
      'Sebagai pasangan yang sibuk di Singapura, kami membutuhkan planner yang memiliki standar rasa tinggi dan transparansi 100%. Forever Bali Weddings memberikan ketenangan pikiran total dan dekorasi botanical artistry yang luar biasa.',
    quoteEn:
      'As a discerning couple from Singapore, we valued their transparent rates and impeccable taste. The floral installations and private estate management were beyond expectations.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=800&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 'test-3',
    coupleNames: 'Elena & Marcus',
    origin: 'London, United Kingdom',
    weddingDate: 'April 2025',
    venue: 'Nusa Dua Oceanfront Villa',
    quoteId:
      'Perpaduan antara upacara adat Nusantara Heritage dan resepsi modern kami menjadi momen paling berkesan dalam hidup kami. Tim Forever Bali Weddings bekerja seperti keluarga sendiri dengan profesionalisme tertinggi.',
    quoteEn:
      'The Nusantara Heritage blessing paired with our modern sunset reception was sheer perfection. Every detail was orchestrated with grace and reverence.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
    coverImage:
      'https://www.greatdestinationweddings.com.au/wp-content/uploads/2026/04/royal-santrian-luxury-beach-villas-bali-weddings-beach-ceremony-setup-with-colorful-flowers-1024x683.jpg',
    rating: 5,
  },
];

export const VENUES_DATA: VenueItem[] = [
  {
    id: 'venue-uluwatu',
    category: 'uluwatu',
    nameId: 'Uluwatu Cliffside Estates',
    nameEn: 'Uluwatu Cliffside Estates',
    locationId: 'Tebing Limestone Uluwatu, Bali Selatan',
    locationEn: 'Uluwatu Limestone Clifftop, South Bali',
    capacityId: '50 - 150 Tamu',
    capacityEn: '50 - 150 Guests',
    vibeId: 'Dramatic Ocean View',
    vibeEn: 'Dramatic Ocean View',
    curfewId: 'Hingga 00:00 WITA (Bebas Musik)',
    curfewEn: 'Until 12:00 AM (Music Curfew)',
    priceIndicator: '$$$$$',
    image: 'https://vanara.life/weddings-d.webp',
    badgeId: 'Signature Oceanfront',
    badgeEn: 'Signature Oceanfront',
    descriptionId:
      'Estate bertengger di atas tebing kapur setinggi 150 meter dengan pemandangan 180° Samudra Hindia lepas. Sempurna untuk upacara janji suci berlatar senja keemasan legendaris dan resepsi malam bertabur bintang.',
    descriptionEn:
      'Perched 150 meters above the azure Indian Ocean atop dramatic limestone cliffs. Featuring an expansive clifftop infinity lawn, legendary golden sunsets, and private cliff-edge ceremony decks.',
    featuresId: [
      'Pemandangan 180° panorama Samudra Hindia tanpa batas',
      'Altar janji suci di tepi tebing kapur berlatar senja emas',
      'Rumput resepsi luas untuk jamuan makan malam hingga 150 tamu',
      'Akses helipad privat & area lounge persiapan pengantin VIP',
      'Izin kembang api dan hiburan musik akustik hingga larut',
    ],
    featuresEn: [
      'Unobstructed 180° Indian Ocean panoramic views',
      'Cliff-edge ceremony altar framed by golden hour sunsets',
      'Expansive reception lawn accommodating up to 150 guests',
      'Private helipad access & dedicated VIP bridal dressing suites',
      'Fireworks permit eligibility & live acoustic entertainment allowance',
    ],
    bestForId: 'Pernikahan mewah berskala medium-besar dengan pemandangan laut megah.',
    bestForEn: 'Luxury medium-to-large celebrations seeking dramatic coastal grandeur.',
  },
  {
    id: 'venue-canggu-seminyak',
    category: 'canggu-seminyak',
    nameId: 'Canggu & Seminyak Luxury Villas',
    nameEn: 'Canggu & Seminyak Luxury Villas',
    locationId: 'Enklave Privat Canggu & Seminyak, Bali',
    locationEn: 'Private Villa Enclaves, Canggu & Seminyak',
    capacityId: '20 - 80 Tamu',
    capacityEn: '20 - 80 Guests',
    vibeId: 'Tropical Chic & Intimate',
    vibeEn: 'Tropical Chic & Intimate',
    curfewId: 'Hingga 23:00 WITA (Acoustic)',
    curfewEn: 'Until 11:00 PM (Acoustic)',
    priceIndicator: '$$$',
    image:
      'https://media.theyoungvillas.com/spio/ret_img,q_cdnize,to_auto,s_webp:avif/www.theyoungvillas.com/wp-content/uploads/2025/06/white-minimalist-villa-design-bali-copy.jpg',
    badgeId: 'Modern Minimalist',
    badgeEn: 'Modern Minimalist',
    descriptionId:
      'Kompleks villa arsitektur kontemporer dengan taman tropis rimbun dan kolam renang pirus. Menawarkan privasi mutlak untuk perayaan intim bergaya modern chic, dekat dengan pusat gaya hidup pesisir Bali.',
    descriptionEn:
      'Contemporary architectural villa retreats nestled in lush palm gardens with turquoise pools. Providing absolute seclusion for intimate celebrations infused with effortless tropical chic design.',
    featuresId: [
      'Desain arsitektur modern minimalis dengan estetika bersih',
      'Taman tropis privat dengan kanopi palem dan kolam renang pirus',
      'Opsi panggung upacara akrilik mengapung di atas kolam (floating stage)',
      'Lounge koktail terbuka & area santap malam di bawah gemerlap lilin',
      'Akomodasi menginap mewah untuk keluarga inti & sahabat terdekat',
    ],
    featuresEn: [
      'Clean contemporary minimalist architectural design',
      'Lush secluded tropical courtyard with swaying palms',
      'Custom floating acrylic ceremony stage over the swimming pool',
      'Open-air cocktail lawn and ambient fairy-lit dinner setting',
      'On-site luxury suite accommodations for wedding party & family',
    ],
    bestForId: 'Pernikahan intim dan modern chic dengan atmosfer santai nan elegan.',
    bestForEn: 'Intimate boutique weddings with stylish modern aesthetics & privacy.',
  },
  {
    id: 'venue-nusa-dua',
    category: 'nusa-dua',
    nameId: 'Nusa Dua Beachfront Resorts',
    nameEn: 'Nusa Dua Beachfront Resorts',
    locationId: 'Kawasan Resor Bintang Lima Nusa Dua, Bali',
    locationEn: 'Five-Star Beachfront Enclave, Nusa Dua',
    capacityId: '100+ Tamu',
    capacityEn: '100+ Guests',
    vibeId: 'White Sand Elegance',
    vibeEn: 'White Sand Elegance',
    curfewId: 'Hingga 01:00 WITA (Ballroom/Beach)',
    curfewEn: 'Until 1:00 AM (Ballroom/Beach)',
    priceIndicator: '$$$$',
    image:
      'https://www.greatdestinationweddings.com.au/wp-content/uploads/2026/04/royal-santrian-luxury-beach-villas-bali-weddings-beach-ceremony-setup-with-colorful-flowers-1024x683.jpg',
    badgeId: 'Grand Beachfront',
    badgeEn: 'Grand Beachfront',
    descriptionId:
      'Resor prestisius bintang lima dengan akses langsung ke hamparan pasir putih bersih dan laut tenang Nusa Dua. Menghadirkan fasilitas jamuan internasional berkelas tinggi untuk perayaan skala besar.',
    descriptionEn:
      'Prestigious five-star beachfront estates with direct access to pristine white sand shores and calm azure waters. Boasting world-class culinary curation and expansive outdoor event grounds.',
    featuresId: [
      'Akses langsung ke pantai berpasir putih privat yang tenang',
      'Kapasitas akomodasi & resepsi skala besar hingga ratusan tamu',
      'Pilihan altar tepi pantai atau taman rumput megah berlatar laut',
      'Layanan kuliner gourmet bintang lima & master sommelier',
      'Fasilitas spa mewah, suite pengantin kepresidenan & ruang transit tamu',
    ],
    featuresEn: [
      'Direct private access to tranquil white sand beaches',
      'Expansive capacity comfortably hosting 100+ cherished guests',
      'Choice of barefoot beachfront altar or grand manicured lawn',
      'Five-star executive banquet catering & sommelier beverage curation',
      'Full resort amenities, presidential bridal suites & guest concierge',
    ],
    bestForId: 'Perayaan megah dan resepsi skala besar dengan kenyamanan resor bintang lima.',
    bestForEn: 'Grand destination weddings with extensive guest lists & full resort amenities.',
  },
  {
    id: 'venue-ubud',
    category: 'ubud',
    nameId: 'Ubud Jungle Sanctuaries',
    nameEn: 'Ubud Jungle Sanctuaries',
    locationId: 'Lembah Hutan Sakral Ayung, Ubud, Bali',
    locationEn: 'Sacred Rainforest Valley, Ubud',
    capacityId: '10 - 50 Tamu',
    capacityEn: '10 - 50 Guests',
    vibeId: 'Quiet Luxury & Serenity',
    vibeEn: 'Quiet Luxury & Serenity',
    curfewId: 'Hingga 22:30 WITA (Zen Silence)',
    curfewEn: 'Until 10:30 PM (Zen Silence)',
    priceIndicator: '$$$$',
    image:
      'https://pub-6f6e9f80a4d14e688e3720657e173fd6.r2.dev/inspire/a-ceremoniously-vibrant-balinese-wedding-at-villa-ambalama-bali/1775717921425-cover/crop-4x5-mobile-cover.webp?v=0.4975_0.4183-g48c0b959',
    badgeId: 'Sacred Sanctuary',
    badgeEn: 'Sacred Sanctuary',
    descriptionId:
      'Tempat perlindungan privat yang tersembunyi di tengah kanopi hutan hujan lebat dan lembah Sungai Ayung yang sakral. Menawarkan ketenangan spiritual, keheningan mewah, dan kesakralan alam Bali yang autentik.',
    descriptionEn:
      'Hidden sanctuaries enveloped by ancient rainforest canopies and the sacred Ayung River gorge. Offering supreme tranquility, spiritual depth, and an intimate embrace of Bali’s mystical heartland.',
    featuresId: [
      'Pemandangan kanopi lembah hutan hujan tropis & sungai sakral',
      'Dek kayu terapung eksklusif untuk upacara janji suci yang khidmat',
      'Sangat serasi dipadukan dengan upacara pemberkatan adat Nusantara Heritage',
      'Menu santap organik farm-to-table karya chef artisanal',
      'Paviliun yoga, spa holistik & suasana hening bebas kebisingan',
    ],
    featuresEn: [
      'Breathtaking valley views overlooking lush jungle canopies & riverbeds',
      'Intimate wooden ceremony deck immersed in rainforest flora',
      'Seamlessly pairs with sacred Nusantara Heritage blessing rituals',
      'Artisanal farm-to-table organic dining experiences',
      'Holistic wellness pavilion & serene acoustic privacy',
    ],
    bestForId: 'Pernikahan intim dan spiritual yang mengutamakan ketenangan dan keasrian alam.',
    bestForEn: 'Spiritual, micro-weddings and nature lovers seeking quiet luxury and peace.',
  },
];

export const GUEST_CONCIERGE_SERVICES: GuestConciergeService[] = [
  {
    id: 'concierge-vip-transfer-helicopter',
    titleId: 'VIP Airport Transfer & Helicopter Charter Setup',
    titleEn: 'VIP Airport Transfer & Helicopter Charter Setup',
    subtitleId: 'Fast-Track Imigrasi & Helikopter Privat',
    subtitleEn: 'Immigration Fast-Track & Private Sky Charters',
    badgeId: 'Seamless Arrival',
    badgeEn: 'Seamless Arrival',
    descriptionId:
      'Layanan penjemputan bandara berstandar diplomatik dengan VIP Fast-Track imigrasi Ngurah Rai, armada Alphard/Mercedes eksekutif berpendingin, hingga penerbangan helikopter privat langsung menuju helipad villa di Uluwatu atau Tabanan.',
    descriptionEn:
      'Diplomatic-grade airport arrivals featuring Ngurah Rai VIP immigration fast-track, chilled executive chauffeured fleets (Alphard / Maybach), and scenic private helicopter transfers directly to cliffside and estate helipads.',
    highlightsId: [
      'VIP tarmac & immigration fast-track clearance bebas antrean',
      'Armada mobil mewah eksekutif berpendingin dengan pengemudi profesional',
      'Penerbangan helikopter carter privat antar pulau & panorama tebing',
      'Penanganan kargo bagasi gaun pengantin & peralatan khusus dengan asuransi',
    ],
    highlightsEn: [
      'VIP airport tarmac & immigration fast-track expedited clearance',
      'Chauffeured executive luxury vans & chilled refreshments upon arrival',
      'Scenic private helicopter charters directly to villa & cliff helipads',
      'Dedicated luggage logistics & bridal attire priority care',
    ],
    iconType: 'plane',
    imageUrl:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'concierge-luxury-villa-booking',
    titleId: 'Luxury Villa Booking & Guest Accommodation Management',
    titleEn: 'Luxury Villa Booking & Guest Accommodation Management',
    subtitleId: 'Blok Kamar Resor & Kurasi Villa Privat',
    subtitleEn: 'Resort Room Blocks & Estate Allocation',
    badgeId: 'Hospitality Management',
    badgeEn: 'Hospitality Management',
    descriptionId:
      'Negosiasi tarif grup eksklusif di resor bintang lima, kurasi villa privat multikamar berdekatan dengan venue, serta platform reservasi khusus untuk mempermudah koordinasi seluruh keluarga dan tamu internasional Anda.',
    descriptionEn:
      'Securing preferential group rates across top-tier five-star resorts, curating neighboring multi-bedroom private luxury villas, and overseeing tailored rooming lists and dedicated check-in concierge for your guests.',
    highlightsId: [
      'Negosiasi tarif grup khusus (preferred rate) di jaringan resor bintang lima',
      'Kurasi kompleks villa privat multi-kamar dengan staf & butler pribadi',
      'Welcome pack personal (handcrafted welcome note, artisan snacks, tabir surya)',
      'Manajemen daftar kamar & koordinasi shuttle antar-villa menuju lokasi acara',
    ],
    highlightsEn: [
      'Preferential group contract negotiations with world-class hotel brands',
      'Exclusive buyout curation of luxury multi-bedroom villa compounds',
      'Customized artisanal guest welcome gift baskets & local Bali guidebooks',
      'Rooming list logistics and private guest shuttle transport networks',
    ],
    iconType: 'home',
    imageUrl:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'concierge-sunset-cruise-rehearsal',
    titleId: 'Pre-Wedding Sunset Cruise & Rehearsal Dinner Styling',
    titleEn: 'Pre-Wedding Sunset Cruise & Rehearsal Dinner Styling',
    subtitleId: 'Pelayaran Katamaran & Jamuan Rehearsal',
    subtitleEn: 'Catamaran Charters & Sunset Welcome Dinners',
    badgeId: 'Welcome Celebrations',
    badgeEn: 'Welcome Celebrations',
    descriptionId:
      'Sambut kehadiran para sahabat dan keluarga sebelum hari-H dengan pelayaran katamaran mewah saat matahari terbenam menuju Nusa Lembongan, atau santap malam rehearsal eksklusif dengan tata meja lilin di tepi tebing.',
    descriptionEn:
      'Set the celebratory tone before the big day with private luxury yacht and catamaran sunset cruises along dramatic coastal cliffs, or candlelit seaside rehearsal dinners styled with bespoke tablescapes.',
    highlightsId: [
      'Carter yacht & katamaran privat dengan bar koktail terbuka & canapés',
      'Dekorasi & styling meja makan rehearsal bertema bohemian / tropical chic',
      'Pertunjukan musik akustik live atau pemain saxophone saat sunset',
      'Layanan dokumentasi foto & video estetik selama pelayaran santai',
    ],
    highlightsEn: [
      'Private sunset catamaran sailing with open-bar mixology & gourmet canapés',
      'Bespoke candlelit tablescapes & personalized rehearsal dinner styling',
      'Live acoustic serenades, harpists, or sunset saxophone performances',
      'Dedicated pre-wedding photo & drone highlight capture',
    ],
    iconType: 'ship',
    imageUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'concierge-recovery-brunch-spa',
    titleId: 'Post-Wedding Recovery Brunch & Spa Day Coordination',
    titleEn: 'Post-Wedding Recovery Brunch & Spa Day Coordination',
    subtitleId: 'Floating Brunch & Relaksasi Spa Holistik',
    subtitleEn: 'Floating Brunches & Holistic Wellness Retreats',
    badgeId: 'Post-Wedding Bliss',
    badgeEn: 'Post-Wedding Bliss',
    descriptionId:
      'Akhiri rangkaian perayaan dengan pemulihan relaksasi paripurna: sajian floating brunch di infinity pool villa, sesi yoga privat pagi hari di tepi lembah, dan perawatan pijat holistik Bali khas rempah alami.',
    descriptionEn:
      'Conclude your celebratory weekend in supreme tranquility with relaxed poolside floating brunches, private morning valley yoga sessions, and traditional Balinese holistic flower bath and spa treatments.',
    highlightsId: [
      'Floating breakfast / brunch mewah di kolam renang infinity villa',
      'Sesi yoga pagi hari berpemandangan sawah / lembah dipandu instruktur privat',
      'Paket perawatan spa tradisional Bali, mandi bunga aromaterapi & lulur herbal',
      'Layanan late check-out & pengantaran kepulangan bandara yang tenang',
    ],
    highlightsEn: [
      'Decadent floating champagne brunch setups in private villa infinity pools',
      'Guided sunrise valley yoga & sound-healing meditation sessions',
      'Traditional Balinese herbal body scrubs, deep-tissue massage & flower baths',
      'Flexible late checkout coordination and stress-free departure transfers',
    ],
    iconType: 'coffee',
    imageUrl:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
  },
];

export const ANNIVERSARY_OFFERINGS: AnniversaryOffering[] = [
  {
    id: 'vow-renewal-5-10-year',
    titleId: 'Paket Vow Renewal & Pembaruan Janji Suci',
    titleEn: 'Bespoke Vow Renewal & Milestone Celebrations',
    subtitleId: '5-Year & 10-Year Anniversary Special Edition',
    subtitleEn: '5-Year & 10-Year Anniversary Special Edition',
    badgeId: 'Milestone Special',
    badgeEn: 'Milestone Special',
    milestoneId: 'Spesial 5th & 10th Anniversary',
    milestoneEn: '5th & 10th Milestone Edition',
    descriptionId:
      'Pembaruan janji suci yang intim dan menyentuh di tepi tebing Uluwatu atau pantai berpasir putih Nusa Dua. Dirancang khusus bagi pasangan yang ingin merayakan kembali ikatan cinta dengan suasana yang lebih hening, mendalam, dan elegan.',
    descriptionEn:
      'An intimate and soulful vow renewal ceremony set atop the dramatic cliffs of Uluwatu or the serene sands of Nusa Dua. Thoughtfully curated for couples wishing to recommit their vows in quiet luxury and timeless island intimacy.',
    featuresId: [
      'Upacara pembaruan janji suci privat dipandu Celebrant bilingual berpengalaman',
      'Desain instalasi altar bunga organik minimalis dengan latar sunset laut lepas',
      'Hand-tied bridal bouquet & boutonniere anggrek eksotis atau mawar putih',
      'Pengiring musik biola atau gitar akustik live selama upacara pertukaran cincin',
      'Sesi dokumentasi foto & sinematik 3 jam dengan fotografer editorial senior',
      'Sertifikat seremonial kaligrafi tangan kustom & champagne toast eksklusif',
    ],
    featuresEn: [
      'Private ceremony led by an experienced bilingual celebrant with personalized vows',
      'Minimalist organic floral altar installation framed against the infinite ocean',
      'Bespoke hand-tied bridal bouquet & exotic boutonniere',
      'Live acoustic guitar or solo violin accompaniment during ceremony',
      '3-hour editorial photography & cinematic 4K video session by senior artists',
      'Handcrafted calligraphy commemorative certificate & champagne sunset toast',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'anniversary-trip-planning',
    titleId: 'Perencanaan Perjalanan Anniversary Mewah',
    titleEn: 'Dedicated Anniversary Trip & Romantic Escape',
    subtitleId: 'Kurasi Villa Privat, Dining Eksklusif & Photoshoot',
    subtitleEn: 'Luxury Villa Bookings, Private Dining & Photoshoots',
    badgeId: 'Curated Itinerary',
    badgeEn: 'Curated Itinerary',
    milestoneId: 'Untuk Seluruh Momen Ulang Tahun Pernikahan',
    milestoneEn: 'For All Wedding Anniversary Milestones',
    descriptionId:
      'Rancang liburan ulang tahun pernikahan tanpa repot dengan kurasi villa privat berpemandangan spektakuler, reservasi candlelit dinner di gua tepi pantai atau tepi lembah Ubud, serta sesi photoshoot romantis bergaya editorial.',
    descriptionEn:
      'Experience a seamless anniversary celebration in Bali with secluded cliffside or jungle pool villa reservations, private candlelit cave or river-valley dinners, personalized chauffeur service, and romantic couple portrait sessions.',
    featuresId: [
      'Kurasi & booking villa kolam renang privat mewah dengan layanan butler 24 jam',
      'Private romantic candlelit dinner 5-course di tebing privat / gua pantai rahasia',
      'Sesi photoshoot golden-hour 2 jam dengan styling arahan kreatif profesional',
      'Paket relaksasi spa holistik pasangan (2 jam lulur rempah & mandi kelopak bunga)',
      'Transportasi Alphard privat berpendingin dengan pengemudi pribadi selama trip',
      'Loyalty perk eksklusif untuk Alumni Forever Bali (priority upgrade & concierge)',
    ],
    featuresEn: [
      'Luxury private pool villa booking curation with 24-hour dedicated butler service',
      'Private 5-course candlelit dinner setup on secluded cliff edge or secret beach cave',
      '2-hour romantic golden-hour couple portrait photoshoot with editorial direction',
      'Couples holistic spa ritual (2-hour Balinese herbal scrub & flower aromatherapy bath)',
      'Chauffeured luxury executive vehicle at your disposal throughout your anniversary stay',
      'Exclusive Forever Bali Alumni loyalty privileges (complimentary perks & priority)',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
  },
];

