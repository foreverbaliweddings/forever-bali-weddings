import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  PenTool,
  Share2,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Link2,
  Check,
  Facebook,
  Twitter,
  Plus,
  Trash2,
  Eye,
  X,
  ShieldCheck,
  ChevronRight,
  Bookmark,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { Language } from '../types';

interface EditorialBlogProps {
  lang: Language;
}

export interface Article {
  id: string;
  titleEn: string;
  titleId: string;
  categoryEn: string;
  categoryId: string;
  excerptEn: string;
  excerptId: string;
  contentEn: string;
  contentId: string;
  image: string;
  author: string;
  authorRoleEn: string;
  authorRoleId: string;
  readTime: string;
  publishedAt: string;
  isCustom?: boolean;
}

// Initial Curated Editorial Articles
const INITIAL_ARTICLES: Article[] = [
  {
    id: 'uluwatu-curfew-guide',
    titleEn: 'The Definitive Uluwatu Clifftop Wedding Guide: Curfews, Banjar Permits & Sunset Logistics',
    titleId: 'Panduan Lengkap Pernikahan Tebing Uluwatu: Jam Malam Adat, Izin Banjar & Logistik Senja',
    categoryEn: 'Venue Logistics',
    categoryId: 'Logistik Venue',
    excerptEn:
      'Everything you need to know about planning a 5-star cliff estate wedding in Uluwatu, from 24:00 WITA noise regulations to golden hour wind patterns and guest shuttles.',
    excerptId:
      'Segala hal yang wajib diketahui saat merencanakan pernikahan tebing di Uluwatu, mulai dari regulasi jam malam adat 24:00 WITA hingga antisipasi angin senja dan akomodasi tamu.',
    contentEn: `Uluwatu stands undisputed as Bali’s most dramatic destination wedding enclave. Perched 150 meters above the roaring Indian Ocean, the limestone cliffs of the Bukit Peninsula offer panoramic sunset vistas that cannot be replicated anywhere in the world.

### 1. Understanding the Banjar & Noise Curfew
Unlike hotel ballrooms, private luxury cliff estates in Uluwatu operate under local village council (Banjar Adat) governance. 
- **Standard Curfew**: Most clifftop estates permit amplified live band and DJ music until 23:00 WITA.
- **Acoustic Extension**: Between 23:00 and 24:00 WITA, sound must transition to acoustic levels or indoor sound-dampened suites.
- **Official Permit Fees**: Banjar contribution fees typically range between IDR 15,000,000 to IDR 35,000,000 (~USD $1,000 – $2,300) and must be arranged directly through licensed luxury wedding directors.

### 2. Golden Hour Horizon Timing
Sunset in Uluwatu occurs reliably between 17:45 and 18:20 WITA year-round. We advise commencing Holy Vow ceremonies strictly at 17:15 WITA. This ensures:
- The harsh midday equatorial heat has subsided.
- The ceremony concludes right as the sky transitions into fiery amber and magenta tones.
- Master photographers capture 30 minutes of natural golden luminescence for family and couple editorial portraits.

### 3. Coastal Clifftop Floral Architecture
Due to sea breezes along the southern coastline, structural floral installations must incorporate reinforced steel internal sub-frames and low center-of-gravity ballast weights disguised in bespoke stone urns.`,
    contentId: `Uluwatu tetap menjadi destinasi paling megah dan dicari untuk pernikahan mewah di Bali. Berada di ketinggian 150 meter di atas deburan ombak Samudera Hindia, tebing kapur Semenanjung Bukit menyuguhkan pemandangan matahari terbenam yang spektakuler.

### 1. Memahami Peran Adat Banjar & Batas Jam Malam
Berbeda dengan ballroom hotel, penyewaan villa privat di Uluwatu berada di bawah naungan desa adat setempat (Banjar Adat).
- **Jam Malam Standar**: Sebagian besar villa mengizinkan musik live band dan DJ dengan pengeras suara hingga pukul 23:00 WITA.
- **Transisi Akustik**: Antara pukul 23:00 hingga 24:00 WITA, volume suara harus diturunkan ke level akustik atau dipindahkan ke ruang tertutup.
- **Biaya Izin Banjar**: Biaya kontribusi adat biasanya berkisar antara Rp 15.000.000 hingga Rp 35.000.000 dan diurus langsung oleh tim perencana pernikahan berlisensi.

### 2. Manajemen Waktu Matahari Terbenam (Golden Hour)
Matahari terbenam di Uluwatu berlangsung stabil antara pukul 17:45 hingga 18:20 WITA sepanjang tahun. Kami merekomendasikan memulai prosesi ikrar suci tepat pada pukul 17:15 WITA. Hal ini memastikan:
- Suhu panas siang hari telah mereda dan berganti angin sejuk.
- Upacara selesai tepat saat langit berubah menjadi warna jingga keemasan.
- Fotografer memiliki waktu optimal 30 menit untuk sesi foto keluarga dan pasangan dengan pencahayaan alami terbaik.

### 3. Ketahanan Arsitektur Bunga Tepi Tebing
Karena hembusan angin laut pesisir selatan, instalasi dekorasi bunga wajib menggunakan rangka baja struktural internal dan pemberat khusus yang disamarkan dalam guci berarsitektur elegan.`,
    image:
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    author: 'Aria',
    authorRoleEn: 'Senior Luxury Destination Director',
    authorRoleId: 'Senior Luxury Destination Director',
    readTime: '5 min read',
    publishedAt: '2026-08-15',
  },
  {
    id: 'quiet-luxury-floral-trends',
    titleEn: 'Quiet Luxury Floral Design: Why Organic Sculptural Monochromes Dominate 2026/2027',
    titleId: 'Tren Bunga Quiet Luxury 2026/2027: Pesona Desain Skulptural Monokrom & Botani Alami',
    categoryEn: 'Design & Aesthetics',
    categoryId: 'Desain & Estetika',
    excerptEn:
      'Moving away from oversized colorful arches, modern high-end couples are embracing organic white orchids, negative space, and architectural botanicals.',
    excerptId:
      'Meninggalkan dekorasi bunga warna-warni yang padat, pasangan modern kini beralih ke kemewahan tenang dengan anggrek putih, ruang bernapas, dan tanaman botani skulptural.',
    contentEn: `The era of ostentatious, overcrowded floral arches has yielded to a more refined visual language: Quiet Luxury. In Bali’s high-end weddings, true sophistication is expressed through intentional negative space, architectural silhouettes, and organic dialogue with the natural landscape.

### 1. The Power of Monochromatic Purity
White Phalaenopsis orchids, white lotus blooms, and imported David Austin garden roses arranged in intentional gradient heights create a feeling of effortless opulence. Rather than fighting Bali’s emerald jungle or turquoise ocean, the monochrome palette frames the horizon with understated grace.

### 2. Incorporating Indigenous Bali Flora
Modern luxury styling pairs imported blooms with indigenous Balinese textures:
- **Sedap Malam (Tuberose)**: Offers an intoxicating, lingering evening fragrance across dinner banquets.
- **Local Monsteras & Wild Ferns**: Provide structural green accents rooted in tropical identity.
- **Terracotta & Lava Stone Urns**: Earthy containers crafted by local Gianyar artisans add rich textural contrast.

### 3. Suspended Cloud Installations
By lifting floral installations off the ground into suspended ceiling clouds over long imperial dining tables, guests enjoy uninterrupted panoramic sea views and seamless conversation without eye-level visual barriers.`,
    contentId: `Era dekorasi bunga warna-warni yang terlalu padat kini telah berganti dengan bahasa visual baru yang lebih anggun: Quiet Luxury. Pada pernikahan mewah di Bali, kemewahan sejati tercermin melalui pemanfaatan ruang bernapas, siluet arsitektural yang tegas, dan keharmonisan dengan alam sekitar.

### 1. Keanggunan Monokromatis Abadi
Anggrek bulan putih (Phalaenopsis), teratai putih, dan mawar David Austin impor yang dirangkai dengan ketinggian berjenjang menghadirkan kesan mewah tanpa berlebihan. Palet warna putih gading dan hijau botani mempertegas keindahan laut dan tebing tanpa mendominasi.

### 2. Perpaduan Flora Khas Nusantara
Dekorasi modern kelas atas memadukan bunga impor dengan elemen botani lokal Bali:
- **Bunga Sedap Malam**: Memberikan keharuman alami yang semerbak di sepanjang meja jamuan makan malam.
- **Monstera & Pakis Hutan**: Memberikan struktur hijau tropis yang kokoh dan berkarakter.
- **Guci Terakota & Batu Lava**: Wadah artistik karya perajin Gianyar yang menambah nilai seni dan kehangatan visual.

### 3. Instalasi Awan Bunga Gantung (Floral Clouds)
Mengangkat rangkaian bunga ke langit-langit menjadi kanopi gantung di atas meja perjamuan memungkinkan para tamu menikmati pemandangan laut lepas tanpa terhalang pandangan saat berbincang.`,
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    author: 'Aria',
    authorRoleEn: 'Senior Luxury Destination Director',
    authorRoleId: 'Senior Luxury Destination Director',
    readTime: '4 min read',
    publishedAt: '2026-08-20',
  },
  {
    id: 'ubud-rainforest-sanctuaries',
    titleEn: 'Ubud Jungle Weddings: How to Host a Sacred Rainforest Celebration by the Ayung River',
    titleId: 'Pernikahan Hutan Tropis Ubud: Menyelenggarakan Selebrasi Sakral di Lembah Sungai Ayung',
    categoryEn: 'Regional Sanctuaries',
    categoryId: 'Suaka Regional',
    excerptEn:
      'A deep dive into Ubud’s misty river ravines, sacred water blessings, acoustic dinner curfews, and eco-silent luxury protocols.',
    excerptId:
      'Ulasan mendalam mengenai ngarai sungai berkabut di Ubud, ritual pemberkatan air suci, tata kelola jam malam ramah lingkungan, dan kemewahan alami.',
    contentEn: `For couples seeking an intimate, soul-stirring communion with nature, Ubud offers an entirely different rhythm from Bali’s coastal beach resorts. Nestled along the sacred Ayung River valley, Ubud represents tranquility, spiritual reverence, and architectural bamboo marvels.

### 1. The Sacred Water Blessing (Melukat)
Many international couples choose to precede their Western vows with an authentic Balinese *Tirta* water cleansing or *Melukat* ritual conducted by a respected local Pemangku (priest). This ceremony fosters a profound spiritual ground for the union.

### 2. Weather & Canopy Considerations
Ubud’s microclimate tends to be 2–3°C cooler than the coast, with occasional refreshing afternoon mountain mists. We recommend:
- Transparent curved marquees for evening dining amidst the rainforest.
- Dehumidified hair & makeup luxury hospitality suites.
- Integrated ambient citronella and botanical mosquito management.

### 3. Curfew & Eco-Silent Protocols
To preserve the sacred resonance of the river valley, Ubud private estates uphold a strict 22:00 WITA sound curfew. Evening receptions thrive with acoustic string quartets, gentle harp melodies, and intimate candlelit dinners.`,
    contentId: `Bagi pasangan yang mendambakan suasana pernikahan yang syahdu dan menyatu dengan alam, Ubud menawarkan keheningan yang berbeda dari resor pantai pesisir Bali. Terletak di sepanjang lembah sungai Ayung yang sakral, Ubud melambangkan ketenangan batin, tradisi spiritual, dan keagungan arsitektur tropis.

### 1. Prosesi Pembersihan Diri Sakral (Melukat)
Banyak pasangan internasional memilih melengkapi ikrar pernikahan dengan prosesi pembersihan diri adat Bali (*Melukat*) yang dipimpin oleh pemangku adat terhormat. Ritual ini memberikan makna spiritual yang mendalam bagi awal perjalanan hidup bersama.

### 2. Antisipasi Cuaca & Iklim Lembah
Iklim mikro Ubud cenderung 2–3°C lebih sejuk dibanding pesisir selatan, dengan kabut sore yang menambah kesan romantis. Kami menyarankan:
- Penggunaan tenda transparan elegan untuk jamuan malam di tengah hutan.
- Ruang rias pengantin dengan pengatur suhu udara dehumidifier.
- Sistem aromaterapi sereh alami untuk kenyamanan tamu di area terbuka.

### 3. Regulasi Jam Malam & Zona Hening Ramah Lingkungan
Demi menjaga ketenangan suaka alam, villa privat di Ubud menerapkan batas suara maksimal pukul 22:00 WITA. Resepsi malam diisi dengan alunan kuartet gesek akustik, petikan harpa, dan makan malam temaram lilin yang sangat intim.`,
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    author: 'Aria',
    authorRoleEn: 'Senior Luxury Destination Director',
    authorRoleId: 'Senior Luxury Destination Director',
    readTime: '6 min read',
    publishedAt: '2026-08-25',
  },
];

const LOCAL_STORAGE_KEY = 'fbw_editorial_articles_v10';

export const EditorialBlog: React.FC<EditorialBlogProps> = ({ lang }) => {
  // Articles state with localStorage fallback
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_ARTICLES;
  });

  // UI States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Form State for Author CMS
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Venue Logistics');
  const [newExcerpt, setNewExcerpt] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newImage, setNewImage] = useState<string>(
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
  );
  const [newReadTime, setNewReadTime] = useState<string>('5 min read');
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);

  // Save to localStorage when articles change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
      console.warn('Failed to save articles to localStorage', e);
    }
  }, [articles]);

  // Categories extraction
  const categories = [
    { key: 'all', labelEn: 'All Editorials', labelId: 'Semua Artikel' },
    { key: 'venue', labelEn: 'Venue Logistics', labelId: 'Logistik Venue' },
    { key: 'design', labelEn: 'Design & Aesthetics', labelId: 'Desain & Estetika' },
    { key: 'sanctuary', labelEn: 'Regional Sanctuaries', labelId: 'Suaka Regional' },
  ];

  // Filtered Articles
  const filteredArticles = articles.filter((art) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'venue')
      return (
        art.categoryEn.toLowerCase().includes('venue') ||
        art.categoryId.toLowerCase().includes('venue') ||
        art.categoryId.toLowerCase().includes('logistik')
      );
    if (selectedCategory === 'design')
      return (
        art.categoryEn.toLowerCase().includes('design') ||
        art.categoryId.toLowerCase().includes('desain') ||
        art.categoryEn.toLowerCase().includes('aesthetic')
      );
    if (selectedCategory === 'sanctuary')
      return (
        art.categoryEn.toLowerCase().includes('sanctuary') ||
        art.categoryId.toLowerCase().includes('suaka') ||
        art.categoryEn.toLowerCase().includes('regional')
      );
    return true;
  });

  // Handle Publish New Article
  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newArt: Article = {
      id: `article-${Date.now()}`,
      titleEn: newTitle,
      titleId: newTitle,
      categoryEn: newCategory,
      categoryId: newCategory,
      excerptEn: newExcerpt || newContent.slice(0, 140) + '...',
      excerptId: newExcerpt || newContent.slice(0, 140) + '...',
      contentEn: newContent,
      contentId: newContent,
      image:
        newImage ||
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      author: 'Aria',
      authorRoleEn: 'Senior Luxury Destination Director',
      authorRoleId: 'Senior Luxury Destination Director',
      readTime: newReadTime || '4 min read',
      publishedAt: new Date().toISOString().split('T')[0],
      isCustom: true,
    };

    setArticles([newArt, ...articles]);
    setPublishSuccess(true);

    // Reset Form
    setTimeout(() => {
      setNewTitle('');
      setNewExcerpt('');
      setNewContent('');
      setPublishSuccess(false);
      setIsAdminMode(false);
    }, 1200);
  };

  // Handle Delete Article
  const handleDeleteArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(lang === 'ID' ? 'Hapus artikel ini?' : 'Delete this article?')) {
      const updated = articles.filter((a) => a.id !== id);
      setArticles(updated);
      if (activeArticle?.id === id) {
        setActiveArticle(null);
      }
    }
  };

  // Social Share Handlers
  const handleShareWhatsApp = (art: Article) => {
    const title = lang === 'ID' ? art.titleId : art.titleEn;
    const url = window.location.href;
    const text = `*${title}* | Forever Bali Weddings Editorial\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareFacebook = (art: Article) => {
    const url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  const handleShareTwitter = (art: Article) => {
    const title = lang === 'ID' ? art.titleId : art.titleEn;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
        url
      )}`,
      '_blank'
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  // WhatsApp Inquiry for specific article topic
  const generateArticleInquiry = (art: Article) => {
    const title = lang === 'ID' ? art.titleId : art.titleEn;
    let message = '';
    if (lang === 'ID') {
      message =
        `Halo Aria & Forever Bali Weddings,\n\n` +
        `Saya baru saja membaca artikel jurnal Anda: "${title}"\n\n` +
        `Saya ingin berkonsultasi lebih lanjut mengenai topik ini untuk rencana pernikahan kami di Bali. Mohon informasi ketersediaan konsultasi. Terima kasih.`;
    } else {
      message =
        `Hello Aria & Forever Bali Weddings,\n\n` +
        `I just read your editorial journal article: "${title}"\n\n` +
        `I would love to consult with you on this topic for our upcoming Bali destination wedding. Thank you.`;
    }
    return `https://wa.me/6281370074777?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="editorial-journal"
      className="py-20 lg:py-28 bg-[#111816] text-[#FDFBF7] relative overflow-hidden border-t border-white/5"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#1A2421] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/15 border border-[#C9A96E]/40 rounded-xs mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold">
                {lang === 'ID'
                  ? 'JURNAL & PANDUAN EDITORIAL'
                  : 'EDITORIAL JOURNAL & INSIGHTS'}
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FDFBF7] tracking-wide leading-tight"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {lang === 'ID' ? (
                <>
                  Wawasan Pernikahan <span className="text-[#C9A96E] italic">Quiet Luxury</span> di Bali
                </>
              ) : (
                <>
                  Quiet Luxury <span className="text-[#C9A96E] italic">Wedding Wisdom</span> in Bali
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light mt-2 leading-relaxed">
              {lang === 'ID'
                ? 'Koleksi panduan eksklusif dari Senior Destination Wedding Director kami mengenai logistik tebing, izin jam malam adat, dan estetika perjamuan berkelas.'
                : 'Expert perspectives on clifftop logistics, traditional Banjar curfews, and haute floral architecture curated by Aria and our senior directorship.'}
            </p>
          </div>

          {/* Admin Author CMS Toggle Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`px-4 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer border ${
                isAdminMode
                  ? 'bg-[#C9A96E] text-[#111816] border-[#C9A96E] shadow-md'
                  : 'bg-[#1A2421] text-[#C9A96E] border-[#C9A96E]/40 hover:bg-[#C9A96E]/10'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>
                {isAdminMode
                  ? lang === 'ID'
                    ? 'Tutup Mode Penulis'
                    : 'Close Author Studio'
                  : lang === 'ID'
                  ? 'Tulis Artikel Baru'
                  : 'Author CMS Studio'}
              </span>
            </button>
          </div>
        </div>

        {/* AUTHOR / ADMIN CMS PANEL (Expandable) */}
        {isAdminMode && (
          <div className="mb-12 p-6 sm:p-8 bg-[#1A2421] border border-[#C9A96E] rounded-xl shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C9A96E] text-[#111816] flex items-center justify-center font-bold">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#FDFBF7]">
                    {lang === 'ID'
                      ? 'Studio Penulis & Manajemen Editorial'
                      : 'Author Studio & Editorial CMS'}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-light">
                    {lang === 'ID'
                      ? 'Artikel yang Anda publikasikan tersimpan otomatis di browser (localStorage) dan tampil langsung di halaman utama.'
                      : 'Published articles are saved to browser storage and instantly appear live on the website.'}
                  </p>
                </div>
              </div>

              <span className="text-[10px] uppercase font-mono px-2 py-1 bg-white/10 rounded-xs text-[#C9A96E]">
                AUTHOR: ARIA
              </span>
            </div>

            <form onSubmit={handlePublishArticle} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-semibold">
                    {lang === 'ID' ? 'Judul Artikel *' : 'Article Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={
                      lang === 'ID'
                        ? 'Contoh: Rahasia Menata Meja Jamuan Senja di Villa Canggu...'
                        : 'e.g. The Secrets of Sunset Table Styling in Canggu Villa Estates...'
                    }
                    className="w-full px-3.5 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                  />
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-semibold">
                      {lang === 'ID' ? 'Kategori' : 'Category'}
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white focus:outline-hidden focus:border-[#C9A96E]"
                    >
                      <option value="Venue Logistics">Venue Logistics</option>
                      <option value="Design & Aesthetics">Design & Aesthetics</option>
                      <option value="Regional Sanctuaries">Regional Sanctuaries</option>
                      <option value="Budget & Planning">Budget & Planning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-semibold">
                      {lang === 'ID' ? 'Waktu Baca' : 'Read Time'}
                    </label>
                    <input
                      type="text"
                      value={newReadTime}
                      onChange={(e) => setNewReadTime(e.target.value)}
                      placeholder="4 min read"
                      className="w-full px-3 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white focus:outline-hidden focus:border-[#C9A96E]"
                    />
                  </div>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-semibold flex items-center justify-between">
                  <span>{lang === 'ID' ? 'URL Gambar Sampul' : 'Cover Image URL'}</span>
                  <span className="text-[10px] text-neutral-400 font-normal">
                    (Unsplash URL)
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white focus:outline-hidden focus:border-[#C9A96E]"
                  />
                  {/* Preset Buttons */}
                  <button
                    type="button"
                    onClick={() =>
                      setNewImage(
                        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
                      )
                    }
                    className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-xs text-[10px] text-neutral-300 hover:text-white"
                  >
                    Preset 1 (Floral)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNewImage(
                        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
                      )
                    }
                    className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-xs text-[10px] text-neutral-300 hover:text-white"
                  >
                    Preset 2 (Cliff)
                  </button>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-semibold">
                  {lang === 'ID' ? 'Ringkasan Singkat (Excerpt)' : 'Short Excerpt'}
                </label>
                <textarea
                  rows={2}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder={
                    lang === 'ID'
                      ? 'Ringkasan singkat 1-2 kalimat untuk kartu depan artikel...'
                      : 'A brief 1-2 sentence preview for the editorial card...'
                  }
                  className="w-full px-3.5 py-2 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-semibold">
                  {lang === 'ID' ? 'Isi Lengkap Artikel *' : 'Full Article Content *'}
                </label>
                <textarea
                  rows={6}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={
                    lang === 'ID'
                      ? 'Tuliskan isi artikel Anda di sini (mendukung paragraf dan poin)...'
                      : 'Write your full editorial essay here...'
                  }
                  className="w-full px-3.5 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-[#C9A96E]">
                  {publishSuccess && (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold animate-pulse">
                      <Check className="w-3.5 h-3.5" />
                      {lang === 'ID'
                        ? 'Artikel Berhasil Dipublikasikan!'
                        : 'Article Published Successfully!'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAdminMode(false)}
                    className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                  >
                    {lang === 'ID' ? 'Batal' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] font-bold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>
                      {lang === 'ID' ? 'PUBLIKASIKAN ARTIKEL' : 'PUBLISH ARTICLE'}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                selectedCategory === cat.key
                  ? 'bg-[#C9A96E] text-[#111816] border-[#C9A96E] shadow-sm'
                  : 'bg-[#1A2421] text-white/70 border-white/10 hover:border-[#C9A96E]/50 hover:text-white'
              }`}
            >
              {lang === 'ID' ? cat.labelId : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Articles Grid (Magazine Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredArticles.map((art) => {
            const title = lang === 'ID' ? art.titleId : art.titleEn;
            const category = lang === 'ID' ? art.categoryId : art.categoryEn;
            const excerpt = lang === 'ID' ? art.excerptId : art.excerptEn;

            return (
              <div
                key={art.id}
                id={`article-card-${art.id}`}
                onClick={() => setActiveArticle(art)}
                className="bg-[#1A2421] border border-white/10 hover:border-[#C9A96E]/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Article Image */}
                  <div className="relative h-52 sm:h-56 overflow-hidden">
                    <img
                      src={art.image}
                      alt={title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421] via-transparent to-transparent opacity-80" />

                    {/* Category Pill */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="text-[9px] uppercase tracking-widest font-mono font-bold bg-[#111816]/90 backdrop-blur-xs text-[#C9A96E] px-2.5 py-1 rounded-xs border border-[#C9A96E]/30">
                        {category}
                      </span>
                    </div>

                    {/* Custom user badge or delete trigger if admin */}
                    {art.isCustom && (
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-1">
                        <span className="text-[9px] bg-emerald-500/80 text-black font-bold px-2 py-0.5 rounded-xs">
                          NEW
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteArticle(art.id, e)}
                          className="p-1 bg-red-900/80 hover:bg-red-700 text-white rounded-xs transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-mono mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#C9A96E]" />
                        {art.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C9A96E]" />
                        {art.readTime}
                      </span>
                    </div>

                    <h3
                      className="text-lg sm:text-xl font-serif text-[#FDFBF7] group-hover:text-[#C9A96E] transition-colors leading-snug line-clamp-2 mb-2.5"
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    >
                      {title}
                    </h3>

                    <p className="text-xs text-neutral-300 font-light leading-relaxed line-clamp-3 mb-4">
                      {excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Link & Share Actions */}
                <div className="px-6 py-4 bg-[#111816] border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#C9A96E] uppercase tracking-wider flex items-center gap-1.5 group-hover:underline">
                    <span>{lang === 'ID' ? 'BACA ARTIKEL' : 'READ ESSAY'}</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>

                  <div className="flex items-center gap-2 text-white/50">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareWhatsApp(art);
                      }}
                      className="p-1.5 hover:text-[#25D366] transition-colors"
                      title="Share to WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyLink();
                      }}
                      className="p-1.5 hover:text-[#C9A96E] transition-colors"
                      title="Copy Link"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL ARTICLE READER MODAL */}
      {activeArticle && (
        <div
          id="article-reader-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-[#1A2421] border border-[#C9A96E]/40 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={activeArticle.image}
                alt={
                  lang === 'ID'
                    ? activeArticle.titleId
                    : activeArticle.titleEn
                }
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421] via-black/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold bg-[#C9A96E] text-[#111816] px-2.5 py-1 rounded-xs inline-block mb-2">
                  {lang === 'ID'
                    ? activeArticle.categoryId
                    : activeArticle.categoryEn}
                </span>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#FDFBF7] leading-tight"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {lang === 'ID'
                    ? activeArticle.titleId
                    : activeArticle.titleEn}
                </h2>
              </div>
            </div>

            {/* Author & Share Bar */}
            <div className="px-6 py-4 bg-[#111816] border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C9A96E] text-[#111816] flex items-center justify-center font-serif font-bold text-base">
                  A
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {activeArticle.author}
                  </div>
                  <div className="text-[11px] text-[#C9A96E] font-light">
                    {lang === 'ID'
                      ? activeArticle.authorRoleId
                      : activeArticle.authorRoleEn}
                  </div>
                </div>
              </div>

              {/* Social Share Group */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-neutral-400 font-mono">
                  {lang === 'ID' ? 'BAGIKAN:' : 'SHARE:'}
                </span>

                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(activeArticle)}
                  className="px-2.5 py-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/30 text-[#25D366] rounded-xs border border-[#25D366]/30 flex items-center gap-1 text-[11px] cursor-pointer"
                  title="Share via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleShareFacebook(activeArticle)}
                  className="px-2.5 py-1.5 bg-[#1877F2]/15 hover:bg-[#1877F2]/30 text-[#1877F2] rounded-xs border border-[#1877F2]/30 flex items-center gap-1 text-[11px] cursor-pointer"
                  title="Share to Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleShareTwitter(activeArticle)}
                  className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xs border border-white/20 flex items-center gap-1 text-[11px] cursor-pointer"
                  title="Share to X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-2.5 py-1.5 bg-[#C9A96E]/20 hover:bg-[#C9A96E]/30 text-[#C9A96E] rounded-xs border border-[#C9A96E]/40 flex items-center gap-1 text-[11px] cursor-pointer"
                  title="Copy Link"
                >
                  {copiedNotification ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Link2 className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copiedNotification
                      ? lang === 'ID'
                        ? 'Tersalin!'
                        : 'Copied!'
                      : lang === 'ID'
                      ? 'Salin'
                      : 'Copy'}
                  </span>
                </button>
              </div>
            </div>

            {/* Article Body Content */}
            <div className="p-6 sm:p-8 space-y-4 text-neutral-200 text-sm leading-relaxed whitespace-pre-line font-light">
              {lang === 'ID'
                ? activeArticle.contentId
                : activeArticle.contentEn}
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-6 bg-[#111816] border-t border-[#C9A96E]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                  <span>
                    {lang === 'ID'
                      ? 'Ingin Mendiskusikan Topik Ini?'
                      : 'Discuss This Topic With Aria'}
                  </span>
                </h4>
                <p className="text-xs text-neutral-400 font-light mt-0.5">
                  {lang === 'ID'
                    ? 'Konsultasi privat langsung via VIP WhatsApp (+62 813-7007-4777)'
                    : 'Direct concierge consultation (+62 813-7007-4777)'}
                </p>
              </div>

              <a
                id="article-inquire-cta"
                href={generateArticleInquiry(activeArticle)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-lg group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>
                  {lang === 'ID'
                    ? 'KONSULTASI TOPIK INI VIA WHATSAPP'
                    : 'CONSULT THIS TOPIC VIA WHATSAPP'}
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
