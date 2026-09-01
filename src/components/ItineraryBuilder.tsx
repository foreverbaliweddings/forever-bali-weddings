import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  MessageCircle,
  ArrowUpRight,
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle2,
  Compass,
  Wine,
  Heart,
  Sun,
  ShieldCheck,
  Edit3,
  Shirt,
} from 'lucide-react';
import { Language } from '../types';

interface ItineraryBuilderProps {
  lang: Language;
}

export interface ItineraryItem {
  id: string;
  time: string;
  titleEn: string;
  titleId: string;
  location: string;
  dressCodeEn: string;
  dressCodeId: string;
  notesEn: string;
  notesId: string;
}

export interface ItineraryDay {
  dayNumber: number;
  dateLabelEn: string;
  dateLabelId: string;
  themeTitleEn: string;
  themeTitleId: string;
  region: string;
  items: ItineraryItem[];
}

const PRESET_TEMPLATES: Record<
  string,
  { nameEn: string; nameId: string; days: ItineraryDay[] }
> = {
  cliff_luxury: {
    nameEn: 'Uluwatu Clifftop 3-Day Odyssey',
    nameId: 'Uluwatu Clifftop 3-Day Odyssey',
    days: [
      {
        dayNumber: 1,
        dateLabelEn: 'Day 1 • The Welcome Gathering',
        dateLabelId: 'Hari 1 • Jamuan Penyambutan Tamu',
        themeTitleEn: 'VIP Arrival & Sunset Oceanfront Cocktail',
        themeTitleId: 'Kedatangan VIP & Koktail Senja Tepi Samudera',
        region: 'Canggu / Pererenan Beachfront',
        items: [
          {
            id: 'item-1-1',
            time: '14:00 WITA',
            titleEn: 'Private Villa Check-in & Chaperone Escort',
            titleId: 'Check-in Villa Privat & Pendampingan Tamu VIP',
            location: 'Exclusive Cliff Estate Suites',
            dressCodeEn: 'Resort Casual',
            dressCodeId: 'Kasual Santai Resor',
            notesEn: 'Welcome drinks and cold towels upon arrival at private villas.',
            notesId: 'Penyambutan minuman kelapa muda segar dan handuk dingin.',
          },
          {
            id: 'item-1-2',
            time: '17:30 WITA',
            titleEn: 'Welcome Golden Hour Sunset Cocktail',
            titleId: 'Koktail Senja Golden Hour & Canapés Gourmet',
            location: 'Sunset Lawn Overlooking Indian Ocean',
            dressCodeEn: 'Boho Chic / Linen Pastels',
            dressCodeId: 'Boho Chic / Busana Linen Pastel',
            notesEn: 'Live acoustic jazz duo with artisanal cocktails and Balinese grazing stations.',
            notesId: 'Alunan saksofon live dengan koktail racikan dan canapés khas Bali.',
          },
        ],
      },
      {
        dayNumber: 2,
        dateLabelEn: 'Day 2 • The Sacred Wedding Day',
        dateLabelId: 'Hari 2 • Hari Pernikahan Sakral',
        themeTitleEn: 'The Sacred Cliff Ceremony & Imperial Gala',
        themeTitleId: 'Upacara Ikrar Tebing & Resepsi Jamuan Imperial',
        region: 'Uluwatu Cliff Estate',
        items: [
          {
            id: 'item-2-1',
            time: '16:30 WITA',
            titleEn: 'Guest Seating & Harp Prelude',
            titleId: 'Penyambutan Tamu & Musik Harpa Klasik',
            location: 'Floating Glass Water Stage',
            dressCodeEn: 'Formal Black Tie / Elegant Neutrals',
            dressCodeId: 'Black Tie / Busana Formal Elegan',
            notesEn: 'Welcome champagne and scented bamboo fans for all guests.',
            notesId: 'Pemberian kipas bambu wangi dan sampanye penyambutan.',
          },
          {
            id: 'item-2-2',
            time: '17:15 WITA',
            titleEn: 'Sacred Vows Exchange at Sunset',
            titleId: 'Pengucapan Ikrar Suci di Batas Senja',
            location: 'Cliff-Edge Floral Amphitheater',
            dressCodeEn: 'Formal Black Tie / Elegant Neutrals',
            dressCodeId: 'Black Tie / Busana Formal Elegan',
            notesEn: 'Aisle petal toss with dramatic cliffside sunset backdrop.',
            notesId: 'Taburan ribuan kelopak mawar putih dengan latar sunset tebing.',
          },
          {
            id: 'item-2-3',
            time: '19:00 WITA',
            titleEn: 'Imperial 5-Course Banquet & Fireworks',
            titleId: 'Jamuan Makan Malam 5-Course & Pesta Kembang Api',
            location: 'Mirrored Pavilion Under 2400K Bistro Lights',
            dressCodeEn: 'Formal Black Tie',
            dressCodeId: 'Formal Black Tie',
            notesEn: 'Michelin-grade dinner, parent toasts, first dance, and midnight pyrotechnics.',
            notesId: 'Makan malam standar Michelin, toast keluarga, dan kembang api tengah malam.',
          },
        ],
      },
      {
        dayNumber: 3,
        dateLabelEn: 'Day 3 • The Farewell Afterglow',
        dateLabelId: 'Hari 3 • Selebrasi Perpisahan',
        themeTitleEn: 'Farewell Poolside Brunch & Sunset Yachting',
        themeTitleId: 'Brunch Tepi Kolam & Pelayaran Sunset Yacht',
        region: 'Seminyak & Jimbaran Bay',
        items: [
          {
            id: 'item-3-1',
            time: '11:00 WITA',
            titleEn: 'Mimosa & Truffle Farewell Brunch',
            titleId: 'Jamuan Brunch Santai, Mimosa & Truffle Pastry',
            location: 'Private Ocean Lawn Lounge',
            dressCodeEn: 'Summer White Linen',
            dressCodeId: 'Linen Putih Musim Panas',
            notesEn: 'Relaxed poolside recovery session with barista coffee bar.',
            notesId: 'Sesi santai tepi kolam renang dengan bar kopi barista.',
          },
          {
            id: 'item-3-2',
            time: '16:00 WITA',
            titleEn: 'Private Catamaran Sunset Cruise (Optional)',
            titleId: 'Pelayaran Kapal Pesiar Sunset Jimbaran (Opsional)',
            location: 'Jimbaran Bay Harbor',
            dressCodeEn: 'Nautical Resort Wear',
            dressCodeId: 'Busana Kasual Pantai / Nautikal',
            notesEn: 'Exclusive yacht sail with bridal party and close family.',
            notesId: 'Pelayaran privat bersama keluarga inti dan pengiring pengantin.',
          },
        ],
      },
    ],
  },
  jungle_sanctuary: {
    nameEn: 'Ubud Jungle Sanctuary 3-Day Retreat',
    nameId: 'Ubud Jungle Sanctuary 3-Day Retreat',
    days: [
      {
        dayNumber: 1,
        dateLabelEn: 'Day 1 • Cultural Welcome',
        dateLabelId: 'Hari 1 • Penyambutan Budaya Adat',
        themeTitleEn: 'Balinese Water Blessing & Sacred Forest Dinner',
        themeTitleId: 'Pemberkatan Air Suci & Jamuan Rimba Ubud',
        region: 'Ayung River Valley, Ubud',
        items: [
          {
            id: 'j-1-1',
            time: '16:00 WITA',
            titleEn: 'Traditional Melukat Water Purification',
            titleId: 'Prosesi Melukat Tradisional Penyucian Diri',
            location: 'Sacred River Spring Sanctuary',
            dressCodeEn: 'Traditional Balinese Sarong (Provided)',
            dressCodeId: 'Sarung Adat Bali (Disediakan)',
            notesEn: 'Intimate spiritual blessing ceremony led by local Mangku priest.',
            notesId: 'Upacara pemberkatan sakral yang dipimpin oleh Pemangku Adat.',
          },
          {
            id: 'j-1-2',
            time: '18:30 WITA',
            titleEn: 'Candlelit Bamboo Pavilion Welcome Dinner',
            titleId: 'Makan Malam Bambu Diterangi Ratusan Lilin',
            location: 'Ayung River Bamboo Terrace',
            dressCodeEn: 'Earthy Smart Casual',
            dressCodeId: 'Smart Casual Bernuansa Alami',
            notesEn: 'Farm-to-table Balinese gastronomy with live Rindik bamboo xylophone.',
            notesId: 'Sajian kuliner organik lokal diiringi alunan lembut gamelan Rindik.',
          },
        ],
      },
      {
        dayNumber: 2,
        dateLabelEn: 'Day 2 • The Sacred Vows',
        dateLabelId: 'Hari 2 • Ikrar Suci Rimba',
        themeTitleEn: 'Mist-Shrouded Canyon Ceremony & Forest Gala',
        themeTitleId: 'Upacara Lembah Berkabut & Resepsi Rimba Suci',
        region: 'Sayan Valley Canyon Estate',
        items: [
          {
            id: 'j-2-1',
            time: '16:00 WITA',
            titleEn: 'Valley View Wedding Ceremony',
            titleId: 'Upacara Pernikahan Pemandangan Lembah Ayung',
            location: 'Lotus Pond Amphitheater',
            dressCodeEn: 'Jungle Black Tie / Botanical Elegance',
            dressCodeId: 'Formal Elegan / Gaun Botani',
            notesEn: 'Dramatic mist ambiance with white orchids and teakwood architecture.',
            notesId: 'Suasana kabut magis dengan tatanan anggrek putih dan kayu jati.',
          },
          {
            id: 'j-2-2',
            time: '18:30 WITA',
            titleEn: 'Starlight Canopy Banquet & Acoustic Lounge',
            titleId: 'Jamuan Kanopi Bintang & Lounge Akustik',
            location: 'Open-Air Teak Dining Pavilion',
            dressCodeEn: 'Formal Black Tie',
            dressCodeId: 'Formal Black Tie',
            notesEn: 'Banjar Adat eco-silent acoustic curfew observed seamlessly at 22:00.',
            notesId: 'Transisi musik akustik tenang sesuai aturan desa adat pukul 22:00 WITA.',
          },
        ],
      },
      {
        dayNumber: 3,
        dateLabelEn: 'Day 3 • The Gentle Farewell',
        dateLabelId: 'Hari 3 • Perpisahan Hangat',
        themeTitleEn: 'Morning Yoga & Farewell Rice Terrace Brunch',
        themeTitleId: 'Yoga Pagi & Jamuan Brunch Terasering Padi',
        region: 'Tegallalang Sanctuary',
        items: [
          {
            id: 'j-3-1',
            time: '09:00 WITA',
            titleEn: 'Morning Sound Bath & Gentle Yoga',
            titleId: 'Sound Bath & Yoga Pemulihan Pagi Hari',
            location: 'Open Yoga Shala Overlooking Canopies',
            dressCodeEn: 'Comfortable Linen / Activewear',
            dressCodeId: 'Pakaian Santai / Linen',
            notesEn: 'Tibetan singing bowl session for bridal party and guests.',
            notesId: 'Sesi relaksasi mangkuk bernyanyi Tibet untuk para tamu.',
          },
          {
            id: 'j-3-2',
            time: '11:30 WITA',
            titleEn: 'Farewell Organic Artisan Brunch',
            titleId: 'Brunch Organik & Ucapan Terima Kasih',
            location: 'Rice Terrace Garden Pavilion',
            dressCodeEn: 'Tropical Resort Chic',
            dressCodeId: 'Busana Kasual Tropis',
            notesEn: 'Closing words, keepsake gift distribution, and VIP airport departures.',
            notesId: 'Pemberian cenderamata eksklusif dan jadwal antar-jemput bandara.',
          },
        ],
      },
    ],
  },
};

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({ lang }) => {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>('cliff_luxury');
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>(
    PRESET_TEMPLATES.cliff_luxury.days
  );
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [coupleNames, setCoupleNames] = useState<string>('Sarah & Marcus');
  const [weddingDate, setWeddingDate] = useState<string>('October 2026');

  // Change Template Preset
  const handleSelectTemplate = (key: string) => {
    setSelectedTemplateKey(key);
    setItineraryDays(JSON.parse(JSON.stringify(PRESET_TEMPLATES[key].days)));
    setActiveDayIndex(0);
  };

  // Add Item to Current Day
  const handleAddItem = () => {
    const newItem: ItineraryItem = {
      id: `custom-item-${Date.now()}`,
      time: '19:30 WITA',
      titleEn: 'Private Evening Celebration',
      titleId: 'Selebrasi Malam Khusus',
      location: 'Cliffside Lounge',
      dressCodeEn: 'Cocktail Attire',
      dressCodeId: 'Busana Koktail Elegan',
      notesEn: 'Live music performance with premium digestifs.',
      notesId: 'Pertunjukan musik langsung dan jamuan minuman penutup.',
    };

    setItineraryDays((prev) => {
      const copy = [...prev];
      copy[activeDayIndex].items.push(newItem);
      return copy;
    });
  };

  // Remove Item
  const handleRemoveItem = (itemId: string) => {
    setItineraryDays((prev) => {
      const copy = [...prev];
      copy[activeDayIndex].items = copy[activeDayIndex].items.filter((it) => it.id !== itemId);
      return copy;
    });
  };

  // Update Item field
  const handleUpdateItem = (
    itemId: string,
    field: keyof ItineraryItem,
    value: string
  ) => {
    setItineraryDays((prev) => {
      const copy = [...prev];
      copy[activeDayIndex].items = copy[activeDayIndex].items.map((it) =>
        it.id === itemId ? { ...it, [field]: value } : it
      );
      return copy;
    });
  };

  // Update Day Title/Region
  const handleUpdateDayMeta = (field: keyof ItineraryDay, value: string) => {
    setItineraryDays((prev) => {
      const copy = [...prev];
      copy[activeDayIndex] = { ...copy[activeDayIndex], [field]: value };
      return copy;
    });
  };

  // Generate WhatsApp Payload Link
  const generateWhatsAppItineraryUrl = () => {
    let text = '';
    const templateName =
      lang === 'ID'
        ? PRESET_TEMPLATES[selectedTemplateKey].nameId
        : PRESET_TEMPLATES[selectedTemplateKey].nameEn;

    if (lang === 'ID') {
      text =
        `Halo Aria & Forever Bali Weddings (+62 813-7007-4777),\n\n` +
        `Saya telah menyusun rancangan Multi-Day Destination Wedding Itinerary melalui Itinerary Builder:\n\n` +
        `• Pasangan Mempelai: ${coupleNames}\n` +
        `• Perkiraan Tanggal: ${weddingDate}\n` +
        `• Konsep Rangkaian: ${templateName}\n\n` +
        `--- RANGKAIAN ACARA 3 HARI ---\n`;

      itineraryDays.forEach((day) => {
        text += `\n[ ${day.dateLabelId} ]\n`;
        text += `Tema: ${day.themeTitleId} (${day.region})\n`;
        day.items.forEach((it) => {
          text += `  • ${it.time} - ${it.titleId} @ ${it.location} (Dress Code: ${it.dressCodeId})\n`;
        });
      });

      text += `\nMohon konfirmasi kelayakan rundown ini, perizinan Banjar adat terkait, dan jadwal konsultasi langsung dengan Aria. Terima kasih.`;
    } else {
      text =
        `Hello Aria & Forever Bali Weddings (+62 813-7007-4777),\n\n` +
        `I have calibrated our bespoke 3-Day Destination Wedding Itinerary using the Itinerary Builder:\n\n` +
        `• Couple Names: ${coupleNames}\n` +
        `• Target Date: ${weddingDate}\n` +
        `• Curated Odyssey: ${templateName}\n\n` +
        `--- 3-DAY CELEBRATION MASTER RUNDOWN ---\n`;

      itineraryDays.forEach((day) => {
        text += `\n[ ${day.dateLabelEn} ]\n`;
        text += `Focus: ${day.themeTitleEn} (${day.region})\n`;
        day.items.forEach((it) => {
          text += `  • ${it.time} - ${it.titleEn} @ ${it.location} (Dress: ${it.dressCodeEn})\n`;
        });
      });

      text += `\nPlease review this master timeline for Banjar Adat curfew compliance and advise on scheduling a direct discovery session. Thank you.`;
    }

    return `https://wa.me/6281370074777?text=${encodeURIComponent(text)}`;
  };

  const currentDay = itineraryDays[activeDayIndex];

  return (
    <section
      id="itinerary-builder"
      className="py-20 lg:py-28 bg-[#111816] text-[#FDFBF7] relative overflow-hidden border-t border-white/5"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Background Subtle Luxury Ambience */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#1A2421] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/15 border border-[#C9A96E]/40 rounded-xs mb-4">
            <Calendar className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold">
              {lang === 'ID'
                ? 'PERENCANA RUNDOWN 3 HARI'
                : '3-DAY DESTINATION ITINERARY BUILDER'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FDFBF7] tracking-wide leading-tight mb-4"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? (
              <>
                Rancang Selebrasi Multi-Hari <span className="text-[#C9A96E] italic">Sesuai Visi Anda</span>
              </>
            ) : (
              <>
                Curate Your Multi-Day <span className="text-[#C9A96E] italic">Bali Wedding Odyssey</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'ID'
              ? 'Susun rangkaian acara pernikahan 3 hari yang terencana sempurna, mulai dari jamuan penyambutan senja, upacara ikrar tebing, hingga brunch santai perpisahan bersama tamu VVIP Anda.'
              : 'Effortlessly blueprint your 3-day destination celebration from sunset arrival cocktails and cliffside vow exchanges to starlight afterparties and farewell ocean brunches.'}
          </p>
        </div>

        {/* Master Control: Couple Details & Preset Archetypes */}
        <div className="bg-[#1A2421] border border-white/10 rounded-2xl p-6 mb-8 max-w-5xl mx-auto shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-white/10 items-center">
            {/* Couple Name Input */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-1.5">
                {lang === 'ID' ? 'Nama Pasangan Mempelai' : 'Couple Names'}
              </label>
              <input
                type="text"
                value={coupleNames}
                onChange={(e) => setCoupleNames(e.target.value)}
                placeholder="e.g. Sarah & Marcus"
                className="w-full px-3.5 py-2 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
              />
            </div>

            {/* Target Wedding Date */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-1.5">
                {lang === 'ID' ? 'Perkiraan Tanggal / Bulan' : 'Target Month / Season'}
              </label>
              <input
                type="text"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                placeholder="e.g. October 2026 / Q3 2027"
                className="w-full px-3.5 py-2 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
              />
            </div>

            {/* Template Preset Selector */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-1.5">
                {lang === 'ID' ? 'Pilih Pola Template' : 'Preset Odyssey Archetype'}
              </label>
              <div className="flex gap-2">
                {Object.keys(PRESET_TEMPLATES).map((key) => {
                  const item = PRESET_TEMPLATES[key];
                  const isSelected = selectedTemplateKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelectTemplate(key)}
                      className={`flex-1 py-2 px-3 rounded-xs text-xs font-semibold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#C9A96E] text-[#111816] border-[#C9A96E] shadow-md'
                          : 'bg-[#111816] text-neutral-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {lang === 'ID'
                        ? key === 'cliff_luxury'
                          ? 'Tebing Uluwatu'
                          : 'Rimba Ubud'
                        : key === 'cliff_luxury'
                        ? 'Uluwatu Cliff'
                        : 'Ubud Jungle'}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3-Day Navigation Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
            {itineraryDays.map((day, idx) => {
              const isActive = activeDayIndex === idx;
              return (
                <button
                  key={day.dayNumber}
                  id={`itinerary-day-tab-${day.dayNumber}`}
                  type="button"
                  onClick={() => setActiveDayIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-[#111816] border-[#C9A96E] ring-2 ring-[#C9A96E]/40 shadow-xl'
                      : 'bg-[#111816]/50 border-white/10 hover:border-white/30 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs ${
                        isActive
                          ? 'bg-[#C9A96E] text-[#111816]'
                          : 'bg-white/10 text-neutral-300'
                      }`}
                    >
                      DAY {day.dayNumber}
                    </span>
                    <span className="text-[10px] text-[#C9A96E] font-mono">
                      {day.items.length} {lang === 'ID' ? 'Acara' : 'Events'}
                    </span>
                  </div>
                  <h4 className="text-xs font-serif font-bold text-white mb-1 truncate">
                    {lang === 'ID' ? day.themeTitleId : day.themeTitleEn}
                  </h4>
                  <span className="text-[10px] text-neutral-400 font-light block truncate">
                    📍 {day.region}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Day Timeline Editor & WhatsApp Sync Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left / Main Editor (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Active Day Meta Card */}
            <div className="bg-[#1A2421] border border-white/10 rounded-xl p-5 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-white/10 gap-2">
                <div>
                  <span className="text-[10px] font-mono text-[#C9A96E] uppercase tracking-widest block">
                    {lang === 'ID' ? currentDay.dateLabelId : currentDay.dateLabelEn}
                  </span>
                  <h3 className="text-base font-serif font-bold text-white">
                    {lang === 'ID' ? currentDay.themeTitleId : currentDay.themeTitleEn}
                  </h3>
                </div>
                <div className="text-xs text-neutral-300 flex items-center gap-1.5 font-light">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>{currentDay.region}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {currentDay.items.map((item, itemIdx) => (
                  <div
                    key={item.id}
                    className="p-4 bg-[#111816] rounded-xl border border-white/10 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between gap-3">
                      {/* Time Input */}
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <input
                          type="text"
                          value={item.time}
                          onChange={(e) =>
                            handleUpdateItem(item.id, 'time', e.target.value)
                          }
                          className="px-2 py-1 bg-[#1A2421] border border-white/15 rounded-xs text-xs font-mono text-[#C9A96E] font-bold w-24 focus:outline-hidden focus:border-[#C9A96E]"
                        />
                      </div>

                      {/* Delete Event Button */}
                      {currentDay.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-neutral-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                          title="Hapus sesi ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Title Input */}
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">
                        {lang === 'ID' ? 'Nama Sesi Acara' : 'Session Title'}
                      </label>
                      <input
                        type="text"
                        value={lang === 'ID' ? item.titleId : item.titleEn}
                        onChange={(e) =>
                          handleUpdateItem(
                            item.id,
                            lang === 'ID' ? 'titleId' : 'titleEn',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 bg-[#1A2421] border border-white/15 rounded-xs text-xs text-white font-serif font-bold focus:outline-hidden focus:border-[#C9A96E]"
                      />
                    </div>

                    {/* Location & Dress Code Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">
                          {lang === 'ID' ? 'Lokasi / Venue' : 'Location / Pavilion'}
                        </label>
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) =>
                            handleUpdateItem(item.id, 'location', e.target.value)
                          }
                          className="w-full px-3 py-1.5 bg-[#1A2421] border border-white/15 rounded-xs text-xs text-neutral-200 focus:outline-hidden focus:border-[#C9A96E]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">
                          {lang === 'ID' ? 'Kode Busana (Dress Code)' : 'Dress Code'}
                        </label>
                        <input
                          type="text"
                          value={lang === 'ID' ? item.dressCodeId : item.dressCodeEn}
                          onChange={(e) =>
                            handleUpdateItem(
                              item.id,
                              lang === 'ID' ? 'dressCodeId' : 'dressCodeEn',
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-1.5 bg-[#1A2421] border border-white/15 rounded-xs text-xs text-neutral-200 focus:outline-hidden focus:border-[#C9A96E]"
                        />
                      </div>
                    </div>

                    {/* Notes Input */}
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">
                        {lang === 'ID' ? 'Catatan Khusus Sesi' : 'Logistics & Styling Notes'}
                      </label>
                      <input
                        type="text"
                        value={lang === 'ID' ? item.notesId : item.notesEn}
                        onChange={(e) =>
                          handleUpdateItem(
                            item.id,
                            lang === 'ID' ? 'notesId' : 'notesEn',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-1.5 bg-[#1A2421] border border-white/15 rounded-xs text-xs text-neutral-300 font-light focus:outline-hidden focus:border-[#C9A96E]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Session Button */}
              <button
                type="button"
                onClick={handleAddItem}
                className="mt-4 w-full py-2.5 bg-[#111816] hover:bg-white/5 border border-dashed border-[#C9A96E]/50 text-[#C9A96E] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ID'
                    ? `Tambah Sesi ke Hari ${currentDay.dayNumber}`
                    : `Add Session to Day ${currentDay.dayNumber}`}
                </span>
              </button>
            </div>
          </div>

          {/* Right Summary & Direct WhatsApp Submission (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-[#1A2421] border-2 border-[#C9A96E] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96E]/10 rounded-full blur-2xl pointer-events-none" />

              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-semibold bg-[#111816] px-2.5 py-1 rounded-xs border border-[#C9A96E]/30 inline-block mb-3">
                {lang === 'ID' ? 'RINGKASAN RUNDOWN' : 'MASTER ITINERARY SUMMARY'}
              </span>

              <h3
                className="text-lg font-serif font-bold text-white mb-2"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {coupleNames || 'Sarah & Marcus'}
              </h3>

              <div className="text-xs text-neutral-300 space-y-1.5 mb-4 pb-4 border-b border-white/10 font-light">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>{weddingDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>
                    {lang === 'ID'
                      ? PRESET_TEMPLATES[selectedTemplateKey].nameId
                      : PRESET_TEMPLATES[selectedTemplateKey].nameEn}
                  </span>
                </div>
              </div>

              {/* 3-Day Quick Checklist */}
              <div className="space-y-2 mb-6">
                {itineraryDays.map((d) => (
                  <div
                    key={d.dayNumber}
                    className="p-2.5 bg-[#111816] rounded-lg border border-white/5 text-xs"
                  >
                    <div className="font-semibold text-white flex items-center justify-between">
                      <span>
                        Day {d.dayNumber}: {lang === 'ID' ? d.themeTitleId : d.themeTitleEn}
                      </span>
                      <span className="text-[10px] text-[#C9A96E] font-mono">
                        {d.items.length} items
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-400 font-light mt-0.5">
                      📍 {d.region}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Action Button */}
              <a
                id="itinerary-send-whatsapp-cta"
                href={generateWhatsAppItineraryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-5 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-xl group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>
                  {lang === 'ID'
                    ? 'KIRIM ITINERARY VVIP KE WHATSAPP'
                    : 'TRANSMIT ITINERARY VIA WHATSAPP'}
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-neutral-400 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>
                  {lang === 'ID'
                    ? 'Review langsung bersama Aria (+62 813-7007-4777)'
                    : 'Direct Lead Director Review (+62 813-7007-4777)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
