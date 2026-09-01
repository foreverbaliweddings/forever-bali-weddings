import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  MapPin,
  Users,
  Moon,
  Music,
  ArrowRight,
  MessageCircle,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Palmtree,
  Waves,
  Mountain,
  Sun,
} from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/weddingData';

interface DestinationMatcherProps {
  lang: Language;
}

interface QuestionOption {
  id: string;
  titleEn: string;
  titleId: string;
  descEn: string;
  descId: string;
  icon: React.ElementType;
  regionWeights: Record<string, number>;
}

interface DestinationResult {
  regionKey: string;
  nameEn: string;
  nameId: string;
  taglineEn: string;
  taglineId: string;
  descEn: string;
  descId: string;
  image: string;
  curfew: string;
  venues: string[];
  vibeTags: string[];
  budgetBenchmark: string;
}

export const DestinationMatcher: React.FC<DestinationMatcherProps> = ({ lang }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // Question Set for Interactive Matching
  const questions: {
    titleEn: string;
    titleId: string;
    subtitleEn: string;
    subtitleId: string;
    options: QuestionOption[];
  }[] = [
    {
      titleEn: 'Atmospheric Scenery & Vision',
      titleId: 'Lansekap & Suasana Impian',
      subtitleEn: 'What visual backdrop speaks most deeply to your wedding romance?',
      subtitleId: 'Pemandangan utama mana yang paling selaras dengan visi pernikahan Anda?',
      options: [
        {
          id: 'cliff',
          titleEn: 'Dramatic Clifftop & Infinite Ocean',
          titleId: 'Tebing Dramatis & Samudera Lepas',
          descEn: '150m limestone edge, panoramic Indian Ocean horizon & golden hour sunsets.',
          descId: 'Tepi tebing kapur 150m, panorama laut biru tak bertepi & matahari terbenam emas.',
          icon: Waves,
          regionWeights: { uluwatu: 4, nusa_dua: 1, canggu: 1, ubud: 0 },
        },
        {
          id: 'jungle',
          titleEn: 'Mystical Rainforest & River Valley',
          titleId: 'Hutan Hujan Mistik & Lembah Sungai',
          descEn: 'Sacred river ravines, mist-shrouded canopies, bamboo architecture & utter zen.',
          descId: 'Lembah sungai Ayung yang suci, pepohonan rimbun berkabut & ketenangan sakral.',
          icon: Mountain,
          regionWeights: { ubud: 5, uluwatu: 0, canggu: 0, nusa_dua: 0 },
        },
        {
          id: 'beach',
          titleEn: 'Bohemian Oceanfront & Black Sand',
          titleId: 'Oceanfront Bohemian & Pasir Eksotis',
          descEn: 'Private beach villa estates, sunset ocean breeze & contemporary aesthetic.',
          descId: 'Villa privat tepi pantai berpasir hitam, angin laut senja & desain arsitektur modern.',
          icon: Palmtree,
          regionWeights: { canggu: 4, nusa_dua: 2, uluwatu: 1, ubud: 0 },
        },
        {
          id: 'resort_lawn',
          titleEn: '5-Star Manicured Ocean Lawns',
          titleId: 'Taman Tepi Pantai Resor Bintang 5',
          descEn: 'Grand pristine beachfront lawns, calm turquoise waters & luxury resort ballrooms.',
          descId: 'Hamparan rumput hijau tepi pantai tenang, fasilitas resor megah & ballroom mewah.',
          icon: Sun,
          regionWeights: { nusa_dua: 5, uluwatu: 2, canggu: 1, ubud: 0 },
        },
      ],
    },
    {
      titleEn: 'Guest Count & Scale of Gathering',
      titleId: 'Jumlah Tamu & Skala Perayaan',
      subtitleEn: 'How intimate or expansive is your destination party?',
      subtitleId: 'Berapa perkiraan jumlah keluarga dan tamu undangan yang hadir?',
      options: [
        {
          id: 'elopement',
          titleEn: 'Intimate Elopement (2 – 15 Guests)',
          titleId: 'Elopement Intim (2 – 15 Tamu)',
          descEn: 'Ultra-exclusive private vows, acoustic violin & private clifftop dinner.',
          descId: 'Ikrar suci sangat privat, alunan biola akustik & jamuan makan malam intim.',
          icon: Users,
          regionWeights: { uluwatu: 3, ubud: 3, canggu: 2, nusa_dua: 1 },
        },
        {
          id: 'villa_buyout',
          titleEn: 'Private Villa Buyout (20 – 60 Guests)',
          titleId: 'Sewa Eksklusif Villa Privat (20 – 60 Tamu)',
          descEn: 'Exclusive multi-day estate buyout with close inner circle & sunset cocktails.',
          descId: 'Penyewaan seluruh villa privat beberapa hari bersama keluarga inti & sahabat.',
          icon: Users,
          regionWeights: { uluwatu: 4, canggu: 4, ubud: 3, nusa_dua: 1 },
        },
        {
          id: 'medium_luxury',
          titleEn: 'Luxury Destination (60 – 120 Guests)',
          titleId: 'Pernikahan Destinasi Mewah (60 – 120 Tamu)',
          descEn: 'Spectacular dining marquee, full sound production & curated guest transit.',
          descId: 'Tenda jamuan makan megah, tata suara profesional & pengaturan akomodasi terpadu.',
          icon: Users,
          regionWeights: { uluwatu: 4, nusa_dua: 4, canggu: 2, ubud: 2 },
        },
        {
          id: 'grand_gala',
          titleEn: 'Grand Bespoke Gala (120 – 250+ Guests)',
          titleId: 'Gala Akbar Spektakuler (120 – 250+ Tamu)',
          descEn: '5-star resort ballroom, fireworks display & comprehensive aviation transfers.',
          descId: 'Resor bintang 5 berkapasitas besar, pertunjukan kembang api & helipad shuttle.',
          icon: Users,
          regionWeights: { nusa_dua: 5, uluwatu: 3, ubud: 1, canggu: 1 },
        },
      ],
    },
    {
      titleEn: 'Evening Afterparty & Curfew Style',
      titleId: 'Gaya Afterparty & Jam Malam Banjar',
      subtitleEn: 'What energy do you envision for your evening reception and dancing?',
      subtitleId: 'Seperti apa suasana resepsi malam dan pesta dansa yang Anda inginkan?',
      options: [
        {
          id: 'midnight',
          titleEn: 'Midnight Dancing & Fireworks (Curfew 24:00 WITA)',
          titleId: 'Pesta Hingga Tengah Malam & Kembang Api (Jam Malam 24:00 WITA)',
          descEn: 'Live DJ beats, cliff fireworks & energetic dancing under starry skies.',
          descId: 'Alunan musik DJ, atraksi kembang api tebing & pesta dansa di bawah langit malam.',
          icon: Music,
          regionWeights: { uluwatu: 5, canggu: 2, nusa_dua: 3, ubud: 0 },
        },
        {
          id: 'serene',
          titleEn: 'Candlelit Zen & Acoustic Resonance (Curfew 22:00 WITA)',
          titleId: 'Suasana Syahdu & Akustik Berkelanjutan (Jam Malam 22:00 WITA)',
          descEn: 'Intimate candlelit dining, string quartets & serene rainforest sounds.',
          descId: 'Jamuan makan temaram lilin, kuartet gesek & keheningan alam rimba yang tenang.',
          icon: Moon,
          regionWeights: { ubud: 5, uluwatu: 1, nusa_dua: 2, canggu: 0 },
        },
        {
          id: 'chic_beach',
          titleEn: 'Chic Sunset Lounge & Poolside Cocktails (Curfew 23:00 WITA)',
          titleId: 'Sunset Lounge Santai & Pesta Tepi Kolam (Jam Malam 23:00 WITA)',
          descEn: 'Saxophone sunset session, craft cocktail bar & bohemian poolside vibes.',
          descId: 'Alunan saksofon saat senja, bar koktail racikan khusus & suasana santai tepi kolam.',
          icon: Palmtree,
          regionWeights: { canggu: 5, uluwatu: 3, nusa_dua: 2, ubud: 1 },
        },
      ],
    },
  ];

  // Destination Profiles
  const destinations: Record<string, DestinationResult> = {
    uluwatu: {
      regionKey: 'uluwatu',
      nameEn: 'Uluwatu & Bukit Peninsula',
      nameId: 'Uluwatu & Semenanjung Bukit',
      taglineEn: 'Dramatic Clifftop Sanctuaries & Majestic Ocean Sunsets',
      taglineId: 'Suaka Tebing Karang Megah & Matahari Terbenam Samudera Hindia',
      descEn:
        'Perched 150 meters above crashing waves, Uluwatu offers Bali’s most iconic, jaw-dropping cliff-edge amphitheaters and ultra-luxury private villa buyouts. Perfect for dramatic sunset vows, open-air banquets, and midnight dancing with full fireworks permits.',
      descId:
        'Bertengger 150 meter di atas tebing samudera, Uluwatu menyuguhkan panggung pernikahan paling ikonis dan prestisius di Bali. Sempurna untuk ikrar senja yang dramatis, perjamuan di bawah bintang, dan pesta tengah malam berizin adat resmi.',
      image:
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      curfew: '24:00 WITA (Acoustic transitions after 23:00)',
      venues: [
        'The Cliff Estate Uluwatu',
        'Bulgari Resort Bali',
        'The Edge Bali',
        'Tirtha Uluwatu',
        'Alila Villas Uluwatu',
      ],
      vibeTags: ['Cliff Amphitheater', 'Sunset Vows', 'Private Villa Buyout', 'Midnight Fireworks'],
      budgetBenchmark: 'USD $35,000 – $150,000+ (20–100 Guests)',
    },
    ubud: {
      regionKey: 'ubud',
      nameEn: 'Ubud & Sayan Valley',
      nameId: 'Ubud & Lembah Sungai Sayan',
      taglineEn: 'Sacred Rainforest Sanctuaries & Riverside Zen Luxury',
      taglineId: 'Suaka Rimba Sakral & Kemewahan Zen Tepi Sungai Ayung',
      descEn:
        'Surrounded by emerald rice terraces and ancient jungle canopies along the holy Ayung River, Ubud is the epitome of soulful, intimate luxury. An ethereal setting for candlelit rainforest dining, floral water arches, and serene cultural blessings.',
      descId:
        'Dikelilingi persawahan terasering hijau dan ngarai sungai Ayung yang sakral, Ubud adalah simbol kemewahan yang tenang dan intim. Pilihan ideal untuk perjamuan berhias lilin di tengah hutan tropis, gapura bunga terapung, dan pemberkatan adat yang khidmat.',
      image:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      curfew: '22:00 WITA (Strict Eco-Silent Sanctuary)',
      venues: [
        'Sayan Valley Jungle Sanctuary',
        'Mandapa, a Ritz-Carlton Reserve',
        'Four Seasons Resort Sayan',
        'Amandari Ubud',
      ],
      vibeTags: ['Jungle Cathedral', 'Riverside Zen', 'Candlelit Forest', 'Eco-Quiet Luxury'],
      budgetBenchmark: 'USD $28,000 – $120,000+ (15–80 Guests)',
    },
    canggu: {
      regionKey: 'canggu',
      nameEn: 'Canggu, Pererenan & Seseh',
      nameId: 'Canggu, Pererenan & Seseh Oceanfront',
      taglineEn: 'Contemporary Bohemian Luxury & Oceanfront Compounds',
      taglineId: 'Kemewahan Bohemian Kontemporer & Kompleks Villa Tepi Pantai',
      descEn:
        'Where high design meets Bali’s exotic black-sand coastline. Expansive private villa lawns right on the beach, craft mixology cocktail receptions, and a relaxed yet exquisitely refined atmosphere for stylish couples.',
      descId:
        'Perpaduan sempurna antara desain arsitektur kontemporer dan eksotisme pantai pasir hitam Bali. Menawarkan halaman villa luas tepat di bibir pantai, bar koktail mewah, serta atmosfer selebrasi yang modis dan tak terlupakan.',
      image:
        'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80',
      curfew: '23:00 WITA (Banjar Curfew)',
      venues: [
        'Pererenan Beachfront Compound',
        'Seseh Oceanfront Villas',
        'Canggu Designer Beach Estate',
      ],
      vibeTags: ['Black Sand Beach', 'Contemporary Chic', 'Sunset Lawn', 'Cocktail Lounge'],
      budgetBenchmark: 'USD $35,000 – $95,000+ (30–80 Guests)',
    },
    nusa_dua: {
      regionKey: 'nusa_dua',
      nameEn: 'Nusa Dua & Jimbaran Bay',
      nameId: 'Nusa Dua & Teluk Jimbaran',
      taglineEn: 'Grand 5-Star Ocean Lawns & Effortless Gala Logistics',
      taglineId: 'Taman Pantai Resor Bintang 5 & Manajemen Gala Tamu 150+',
      descEn:
        'Famous for calm turquoise waters, white sand beaches, and world-class 5-star resort estates. Flawlessly accommodates large destination guest lists with seamless multi-villa room blocks, private beach marquees, and dedicated ballroom afterparties.',
      descId:
        'Terkenal dengan pantai pasir putih yang tenang dan deretan resor bintang lima kelas dunia. Sangat ideal untuk perhelatan berskala besar dengan kemudahan akomodasi ratusan tamu, tenda transparan tepi pantai, dan afterparty mewah tanpa batas.',
      image:
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
      curfew: '24:00+ WITA (Indoor Ballroom Extensions Available)',
      venues: [
        'The St. Regis Bali Resort',
        'The Mulia Resort & Villas',
        'Ayana Estate Jimbaran',
        'The Ritz-Carlton Bali',
      ],
      vibeTags: ['White Sand Lawn', '5-Star Resort Gala', '100+ Guest Capacity', 'Ballroom Afterparty'],
      budgetBenchmark: 'USD $65,000 – $250,000+ (80–200+ Guests)',
    },
  };

  // Option selection handler
  const handleSelectOption = (questionIndex: number, optionId: string) => {
    const updatedAnswers = { ...answers, [questionIndex]: optionId };
    setAnswers(updatedAnswers);

    if (questionIndex < questions.length - 1) {
      setCurrentStep(questionIndex + 1);
    } else {
      setIsCalculated(true);
    }
  };

  // Calculate Match Score
  const calculateTopDestination = (): { result: DestinationResult; score: number } => {
    const scoreMap: Record<string, number> = {
      uluwatu: 0,
      ubud: 0,
      canggu: 0,
      nusa_dua: 0,
    };

    questions.forEach((q, idx) => {
      const selectedId = answers[idx];
      if (selectedId) {
        const option = q.options.find((o) => o.id === selectedId);
        if (option) {
          Object.entries(option.regionWeights).forEach(([reg, weight]) => {
            scoreMap[reg] = (scoreMap[reg] || 0) + weight;
          });
        }
      }
    });

    let topRegion = 'uluwatu';
    let maxScore = -1;
    Object.entries(scoreMap).forEach(([reg, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topRegion = reg;
      }
    });

    return {
      result: destinations[topRegion] || destinations.uluwatu,
      score: Math.min(99, 88 + Math.floor(Math.random() * 10)),
    };
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCalculated(false);
  };

  const topMatch = calculateTopDestination();

  // WhatsApp Routing Pre-filled Link Generator
  const generateWhatsAppLink = () => {
    const matched = topMatch.result;
    const q1Ans = questions[0].options.find((o) => o.id === answers[0]);
    const q2Ans = questions[1].options.find((o) => o.id === answers[1]);

    const scenery = q1Ans ? (lang === 'ID' ? q1Ans.titleId : q1Ans.titleEn) : 'Oceanfront';
    const scale = q2Ans ? (lang === 'ID' ? q2Ans.titleId : q2Ans.titleEn) : 'Villa Buyout';

    let message = '';
    if (lang === 'ID') {
      message =
        `Halo Aria & Forever Bali Weddings,\n\n` +
        `Saya baru saja mencoba fitur Smart Destination Matcher di situs web dan mendapatkan hasil rekomendasi terbaik:\n\n` +
        `• Wilayah Rekomendasi: ${matched.nameId}\n` +
        `• Pilihan Lansekap: ${scenery}\n` +
        `• Skala Tamu: ${scale}\n` +
        `• Estimasi Investasi: ${matched.budgetBenchmark}\n\n` +
        `Saya ingin mengecek ketersediaan tanggal dan katalog venue off-market untuk wilayah ini. Mohon informasinya. Terima kasih.`;
    } else {
      message =
        `Hello Aria & Forever Bali Weddings,\n\n` +
        `I just completed the Smart Destination Matcher on your website and received my top curated match:\n\n` +
        `• Recommended Region: ${matched.nameEn}\n` +
        `• Preferred Scenery: ${scenery}\n` +
        `• Guest Scale: ${scale}\n` +
        `• Budget Benchmark: ${matched.budgetBenchmark}\n\n` +
        `I would love to check calendar availability and receive off-market venue brochures for this sanctuary. Thank you.`;
    }

    return `https://wa.me/6281370074777?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="destination-matcher"
      className="py-20 lg:py-28 bg-[#111816] text-[#FDFBF7] relative overflow-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Background Ambient Luxury Lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#1A2421] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/15 border border-[#C9A96E]/40 rounded-xs mb-4">
            <Compass className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold">
              {lang === 'ID'
                ? 'PENCARI DESTINASI PINTAR ARIA'
                : 'ARIA SMART DESTINATION MATCHER'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FDFBF7] tracking-wide leading-tight mb-4"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? (
              <>
                Temukan Suaka Pernikahan <span className="text-[#C9A96E] italic">Ideal Anda</span> di Bali
              </>
            ) : (
              <>
                Discover Your <span className="text-[#C9A96E] italic">Ideal Sanctuary</span> in Bali
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Jawab 3 preferensi utama Anda untuk mencocokkan lanskap, batas jam malam adat, dan tipe venue eksklusif yang paling sesuai dengan impian pernikahan Anda.'
              : 'Answer 3 refined preference questions to reveal your bespoke regional sanctuary, banjar curfew parameters, and tailored off-market estate portfolio.'}
          </p>
        </div>

        {/* Main Interactive Card */}
        <div className="max-w-4xl mx-auto bg-[#1A2421] border border-[#C9A96E]/30 rounded-xl p-6 sm:p-10 md:p-12 shadow-2xl relative">
          {!isCalculated ? (
            <div>
              {/* Step Navigation & Progress Indicator */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#C9A96E] tracking-widest font-semibold">
                    STEP {currentStep + 1} / {questions.length}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs uppercase tracking-wider text-white/70">
                    {lang === 'ID'
                      ? questions[currentStep].titleId
                      : questions[currentStep].titleEn}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentStep
                          ? 'w-8 bg-[#C9A96E]'
                          : idx < currentStep
                          ? 'w-4 bg-[#C9A96E]/60'
                          : 'w-4 bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Current Question Title */}
              <div className="mb-6">
                <h3
                  className="text-xl sm:text-2xl md:text-3xl text-[#FDFBF7] font-serif mb-2"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {lang === 'ID'
                    ? questions[currentStep].titleId
                    : questions[currentStep].titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light">
                  {lang === 'ID'
                    ? questions[currentStep].subtitleId
                    : questions[currentStep].subtitleEn}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {questions[currentStep].options.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = answers[currentStep] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(currentStep, opt.id)}
                      className={`text-left p-5 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between group relative ${
                        isSelected
                          ? 'bg-[#111816] border-[#C9A96E] ring-1 ring-[#C9A96E] shadow-lg'
                          : 'bg-white/[0.02] border-white/10 hover:border-[#C9A96E]/60 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 mb-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#C9A96E] text-[#111816]'
                              : 'bg-white/5 text-[#C9A96E] group-hover:bg-[#C9A96E]/20'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#FDFBF7] group-hover:text-[#C9A96E] transition-colors leading-snug">
                            {lang === 'ID' ? opt.titleId : opt.titleEn}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-300 font-light leading-relaxed pl-12">
                        {lang === 'ID' ? opt.descId : opt.descEn}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end text-[11px] font-semibold text-[#C9A96E] uppercase tracking-wider gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>{lang === 'ID' ? 'Pilih Ini' : 'Select'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              {currentStep > 0 && (
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    ← {lang === 'ID' ? 'Kembali' : 'Previous Step'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* MATCH RESULT CARD */
            <div className="animate-fadeIn">
              {/* Header Match Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-emerald-500/15 border border-emerald-500/40 rounded-xs mb-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-semibold">
                      {topMatch.score}% MATCH COMPATIBILITY
                    </span>
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl md:text-4xl text-[#C9A96E] font-serif"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {lang === 'ID' ? topMatch.result.nameId : topMatch.result.nameEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1">
                    {lang === 'ID'
                      ? topMatch.result.taglineId
                      : topMatch.result.taglineEn}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-[#C9A96E] text-white/70 hover:text-white rounded-xs text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>{lang === 'ID' ? 'Ulangi Matcher' : 'Recalculate'}</span>
                </button>
              </div>

              {/* Content Grid: Photo + Specifications */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* Visual Image */}
                <div className="lg:col-span-5 relative rounded-lg overflow-hidden border border-[#C9A96E]/30 min-h-[220px]">
                  <img
                    src={topMatch.result.image}
                    alt={topMatch.result.nameEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111816] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {topMatch.result.vibeTags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[9px] uppercase tracking-wider bg-black/70 backdrop-blur-xs text-[#C9A96E] px-2 py-0.5 rounded-xs border border-[#C9A96E]/40 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {lang === 'ID'
                      ? topMatch.result.descId
                      : topMatch.result.descEn}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-[#111816] border border-white/10 rounded-md">
                      <div className="text-[10px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-1 flex items-center gap-1.5">
                        <Moon className="w-3.5 h-3.5" />
                        <span>{lang === 'ID' ? 'Izin Jam Malam Adat' : 'Banjar Curfew'}</span>
                      </div>
                      <p className="text-xs text-[#FDFBF7] font-mono">
                        {topMatch.result.curfew}
                      </p>
                    </div>

                    <div className="p-3 bg-[#111816] border border-white/10 rounded-md">
                      <div className="text-[10px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{lang === 'ID' ? 'Estimasi Investasi' : 'Budget Benchmark'}</span>
                      </div>
                      <p className="text-xs text-[#FDFBF7] font-mono">
                        {topMatch.result.budgetBenchmark}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/50 mb-2">
                      {lang === 'ID'
                        ? 'Contoh Portofolio Venue Unggulan:'
                        : 'Curated Off-Market Sanctuaries:'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topMatch.result.venues.map((v, i) => (
                        <span
                          key={i}
                          className="text-xs bg-white/5 text-neutral-200 px-2.5 py-1 rounded-xs border border-white/10 flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3 text-[#C9A96E]" />
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Routing Footer */}
              <div className="p-5 sm:p-6 bg-[#111816] border border-[#C9A96E]/40 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-[#FDFBF7] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                    <span>
                      {lang === 'ID'
                        ? 'Dapatkan Panduan Lengkap & Cek Ketersediaan'
                        : 'Unlock Off-Market Portfolio & Live Dates'}
                    </span>
                  </h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    {lang === 'ID'
                      ? 'Terhubung langsung dengan Lead Planner Studio (+62 813-7007-4777)'
                      : 'Direct escalation to Aria VIP Concierge Desk (+62 813-7007-4777)'}
                  </p>
                </div>

                <a
                  id="matcher-whatsapp-cta"
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-lg group cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>
                    {lang === 'ID'
                      ? 'KONSULTASI HASIL VIA WHATSAPP'
                      : 'INQUIRE THIS MATCH VIA WHATSAPP'}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
