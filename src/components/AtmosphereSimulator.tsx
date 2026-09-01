import React, { useState } from 'react';
import {
  Sun,
  Sunset,
  Moon,
  Sparkles,
  Flame,
  Clock,
  Camera,
  MessageCircle,
  ArrowUpRight,
  Eye,
  Sliders,
  CheckCircle2,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { Language } from '../types';

interface AtmosphereSimulatorProps {
  lang: Language;
}

interface TimePhase {
  id: string;
  timeSlot: string;
  nameEn: string;
  nameId: string;
  taglineEn: string;
  taglineId: string;
  descEn: string;
  descId: string;
  photoAdviceEn: string;
  photoAdviceId: string;
  lightingSpecEn: string;
  lightingSpecId: string;
  image: string;
  icon: React.ElementType;
  gradientOverlay: string;
  accentColor: string;
  timelineLabelEn: string;
  timelineLabelId: string;
}

export const AtmosphereSimulator: React.FC<AtmosphereSimulatorProps> = ({ lang }) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('golden_hour');

  const TIME_PHASES: TimePhase[] = [
    {
      id: 'golden_hour',
      timeSlot: '17:30 WITA',
      nameEn: 'Golden Hour Sunset',
      nameId: 'Golden Hour Sunset',
      taglineEn: 'Dramatic Amber Rays & Luminous Horizon Vows',
      taglineId: 'Pancaran Emas Senja & Ikrar Suci di Cakrawala Samudera',
      descEn:
        'The quintessential Bali sunset window. Low-angled sunlight casts long, romantic shadows and bathes clifftop floral arches and ocean water in warm, flattering tones.',
      descId:
        'Momen senja ikonis Bali saat matahari perlahan menyentuh garis cakrawala. Cahaya keemasan alami menyinari altar ikrar, menghasilkan siluet romantis dan rona kulit yang sempurna.',
      photoAdviceEn:
        'Prime for Holy Vows exchange, veil catching golden wind, and cinematic drone oceanfront panoramas.',
      photoAdviceId:
        'Waktu terbaik untuk pengucapan ikrar pernikahan, foto siluet cadar pengantin, dan rekaman drone cakrawala laut.',
      lightingSpecEn: '100% Natural Solar Diffusion • 2800K Warm Golden Spectrum',
      lightingSpecId: '100% Difusi Cahaya Matahari Alami • Spektrum Hangat 2800K',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      icon: Sun,
      gradientOverlay:
        'from-[#111816] via-[#E0924E]/20 to-[#C9A96E]/20 border-[#E0924E]/40',
      accentColor: '#E0924E',
      timelineLabelEn: 'Holy Matrimony & Sunset Cocktail Hour',
      timelineLabelId: 'Pemberkatan Nikah & Jamuan Koktail Senja',
    },
    {
      id: 'blue_hour',
      timeSlot: '18:30 WITA',
      nameEn: 'Twilight Blue Hour',
      nameId: 'Twilight Blue Hour',
      taglineEn: 'Deep Indigo Sky & Glowing Fairy Light Canopies',
      taglineId: 'Langit Indigo Eksotis & Gemerlap Kanopi Lampu Peri',
      descEn:
        'A magical 30-minute transition where the sky turns deep royal blue and warm architectural lights, bistro bulbs, and candle clusters begin to illuminate the estate.',
      descId:
        'Transisi magis 30 menit ketika langit senja berubah menjadi biru indigo pekat. Lampu gantung peri, lentera kaca, dan pencahayaan panggung mulai berpendar syahdu.',
      photoAdviceEn:
        'Ideal for Champagne toast speeches, table setting editorial captures, and dramatic twilight couple portraits.',
      photoAdviceId:
        'Sangat ideal untuk toast sampanye resepsi, dokumentasi detail dekorasi meja makan, dan potret pengantin berlatar langit biru senja.',
      lightingSpecEn: 'Indigo Skylight + 2400K Warm Filament Bistro Lighting',
      lightingSpecId: 'Cahaya Senja Indigo + Lampu Filamen Hangat 2400K',
      image:
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      icon: Sunset,
      gradientOverlay:
        'from-[#111816] via-[#1E2D3D]/40 to-[#C9A96E]/20 border-[#3B82F6]/40',
      accentColor: '#60A5FA',
      timelineLabelEn: 'Grand Reception Entrance & Dinner Welcome',
      timelineLabelId: 'Prosesi Masuk Resepsi & Pembukaan Makan Malam',
    },
    {
      id: 'candlelit_night',
      timeSlot: '20:00 WITA',
      nameEn: 'Candlelit Night & Gala',
      nameId: 'Candlelit Night & Gala',
      taglineEn: 'Architectural Pin-Spots, Candle Rivers & Starlit Revelry',
      taglineId: 'Temaram Ratusan Lilin, Sorot Arsitektural & Pesta Bintang',
      descEn:
        'Complete nocturnal serenity. Hundreds of glowing candles float across pools and line dining banquets, accented by theatrical spotlighting for the first dance and midnight afterparty.',
      descId:
        'Suasana malam eksklusif dengan ratusan lilin terapung di kolam renang dan meja perjamuan, disempurnakan tata sorot lampu terarah untuk dansa pertama dan pesta dansa.',
      photoAdviceEn:
        'Unmatched for First Dance spotlight moments, cake cutting under stars, sparkler exits, and afterparty fireworks.',
      photoAdviceId:
        'Momen terbaik untuk First Dance romantis, potret pemotongan kue di bawah bintang, kembang api dingin (sparklers), dan afterparty.',
      lightingSpecEn: 'Real Flame Candle Clusters + 2200K Architectural Pin-Spotting',
      lightingSpecId: 'Ratusan Titik Api Lilin Alami + Sorot Arsitektural 2200K',
      image:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      icon: Moon,
      gradientOverlay:
        'from-[#111816] via-[#1A2421]/60 to-[#C9A96E]/15 border-[#C9A96E]/40',
      accentColor: '#C9A96E',
      timelineLabelEn: 'First Dance, Fine Dining Banquet & Afterparty',
      timelineLabelId: 'Dansa Pertama, Jamuan Mewah & Pesta Dansa',
    },
  ];

  const currentPhase =
    TIME_PHASES.find((p) => p.id === selectedPhaseId) || TIME_PHASES[0];

  // Dynamic WhatsApp Inquiry Link
  const generateWhatsAppInquiry = () => {
    const phaseName =
      lang === 'ID' ? currentPhase.nameId : currentPhase.nameEn;
    const timeLabel = currentPhase.timeSlot;

    let message = '';
    if (lang === 'ID') {
      message =
        `Halo Aria & Forever Bali Weddings,\n\n` +
        `Saya tertarik dengan simulasi pencahayaan venue pernikahan pada waktu:\n\n` +
        `• Waktu Pilihan: ${phaseName} (${timeLabel})\n` +
        `• Rekomendasi Sesi: ${currentPhase.timelineLabelId}\n` +
        `• Spesifikasi Tata Lampu: ${currentPhase.lightingSpecId}\n\n` +
        `Saya ingin berkonsultasi mengenai tata kelola waktu (rundown acara) dan integrasi pencahayaan untuk pernikahan kami di Bali. Terima kasih.`;
    } else {
      message =
        `Hello Aria & Forever Bali Weddings,\n\n` +
        `I have explored the Time-of-Day Atmosphere Simulator and love this lighting aesthetic:\n\n` +
        `• Selected Atmosphere: ${phaseName} (${timeLabel})\n` +
        `• Timeline Phase: ${currentPhase.timelineLabelEn}\n` +
        `• Lighting Architecture: ${currentPhase.lightingSpecEn}\n\n` +
        `I would love to discuss structuring our Bali wedding day timeline and lighting design with Aria. Thank you.`;
    }

    return `https://wa.me/6281370074777?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="atmosphere-simulator"
      className="py-20 lg:py-28 bg-[#111816] text-[#FDFBF7] relative overflow-hidden border-t border-white/5"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#1A2421] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/15 border border-[#C9A96E]/40 rounded-xs mb-4">
            <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold">
              {lang === 'ID'
                ? 'SIMULATOR PENCAHAYAAN & WAKTU'
                : 'TIME-OF-DAY ATMOSPHERE SIMULATOR'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FDFBF7] tracking-wide leading-tight mb-4"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? (
              <>
                Simulasi Suasana <span className="text-[#C9A96E] italic">Cahaya & Waktu</span> Selebrasi
              </>
            ) : (
              <>
                Experience Your <span className="text-[#C9A96E] italic">Lighting Atmosphere</span> by Hour
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Pencahayaan adalah jiwa dari pernikahan quiet luxury di Bali. Saksikan transformasi venue Anda dari keemasan senja hingga romansa malam temaram lilin.'
              : 'Lighting defines the emotional resonance of a Bali destination wedding. Transition seamlessly through the three pivotal lighting chapters of your celebration.'}
          </p>
        </div>

        {/* Time Selector Pills (Interactive Switcher) */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 max-w-3xl mx-auto">
          {TIME_PHASES.map((phase) => {
            const Icon = phase.icon;
            const isSelected = selectedPhaseId === phase.id;

            return (
              <button
                key={phase.id}
                id={`time-phase-btn-${phase.id}`}
                type="button"
                onClick={() => setSelectedPhaseId(phase.id)}
                className={`px-5 py-3 rounded-md border text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-md ${
                  isSelected
                    ? 'bg-[#C9A96E] text-[#111816] border-[#C9A96E] ring-2 ring-[#C9A96E]/50'
                    : 'bg-[#1A2421] text-white/80 border-white/10 hover:border-[#C9A96E]/60 hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isSelected ? 'text-[#111816]' : 'text-[#C9A96E]'
                  }`}
                />
                <span>{lang === 'ID' ? phase.nameId : phase.nameEn}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-xs ml-1 ${
                    isSelected
                      ? 'bg-black/20 text-[#111816]'
                      : 'bg-white/10 text-[#C9A96E]'
                  }`}
                >
                  {phase.timeSlot}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Simulation Display Canvas */}
        <div className="bg-[#1A2421] border border-[#C9A96E]/40 rounded-xl overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Canvas Panel (7 Cols) */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] overflow-hidden">
              <img
                src={currentPhase.image}
                alt={currentPhase.nameEn}
                className="w-full h-full object-cover transition-transform duration-1000 scale-100 hover:scale-105"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${currentPhase.gradientOverlay} transition-all duration-700`}
              />

              {/* Time Indicator Floating Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span className="text-xs font-mono font-bold text-[#FDFBF7] tracking-wider">
                  BALI TIME: {currentPhase.timeSlot}
                </span>
              </div>

              {/* Bottom Tagline Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold bg-[#111816]/90 px-3 py-1 rounded-xs inline-block mb-2 border border-[#C9A96E]/30">
                  {lang === 'ID'
                    ? currentPhase.timelineLabelId
                    : currentPhase.timelineLabelEn}
                </span>
                <h3
                  className="text-2xl sm:text-3xl text-white font-serif drop-shadow-md leading-tight"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {lang === 'ID'
                    ? currentPhase.taglineId
                    : currentPhase.taglineEn}
                </h3>
              </div>
            </div>

            {/* Curated Advice & Specification Panel (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 text-left bg-[#1A2421]">
              <div className="space-y-5">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-mono font-semibold mb-1">
                    {lang === 'ID'
                      ? 'DESKRIPSI ATMOSFER CAHAYA'
                      : 'ATMOSPHERE ARCHITECTURE'}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {lang === 'ID' ? currentPhase.descId : currentPhase.descEn}
                  </p>
                </div>

                {/* Photography Advice Box */}
                <div className="p-4 bg-[#111816] border border-white/10 rounded-lg">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FDFBF7] mb-1.5">
                    <Camera className="w-4 h-4 text-[#C9A96E]" />
                    <span>
                      {lang === 'ID'
                        ? 'Rekomendasi Foto & Sinematografi'
                        : 'Master Photography Window'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {lang === 'ID'
                      ? currentPhase.photoAdviceId
                      : currentPhase.photoAdviceEn}
                  </p>
                </div>

                {/* Lighting Architecture Technical Spec */}
                <div className="p-4 bg-[#111816] border border-[#C9A96E]/30 rounded-lg">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A96E] mb-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {lang === 'ID'
                        ? 'Spesifikasi Tata Lampu Studio'
                        : 'Studio Lighting Specifications'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 font-mono">
                    {lang === 'ID'
                      ? currentPhase.lightingSpecId
                      : currentPhase.lightingSpecEn}
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Call-to-Action */}
              <div className="pt-4 border-t border-white/10">
                <a
                  id="atmosphere-whatsapp-cta"
                  href={generateWhatsAppInquiry()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-lg group cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>
                    {lang === 'ID'
                      ? 'KUNCI JADWAL CAHAYA INI VIA WA'
                      : 'LOCK THIS LIGHTING TIMELINE VIA WA'}
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <div className="flex items-center justify-center gap-2 mt-2.5 text-[10px] text-neutral-400 font-light">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>
                    {lang === 'ID'
                      ? 'Diverifikasi langsung oleh Lead Wedding Planner (+62 813-7007-4777)'
                      : 'Live verification with Aria Concierge Desk (+62 813-7007-4777)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
