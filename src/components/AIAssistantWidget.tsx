import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  MessageCircle,
  X,
  Send,
  ArrowUpRight,
  ShieldCheck,
  RotateCcw,
  Compass,
  DollarSign,
  Moon,
  Flower2,
  ChevronRight,
  Bot,
  User,
} from 'lucide-react';
import { Language } from '../types';

interface AIAssistantWidgetProps {
  lang: Language;
}

interface ChatMessage {
  id: string;
  sender: 'aria' | 'user';
  textEn: string;
  textId: string;
  suggestedAction?: {
    labelEn: string;
    labelId: string;
    waTopic?: string;
  };
  timestamp: string;
}

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'aria',
      textEn:
        'A warm welcome to Forever Bali Weddings. I am Aria, Senior Luxury Destination Wedding Director. How may I assist in orchestrating your bespoke celebration across Bali today?',
      textId:
        'Selamat datang di Forever Bali Weddings. Saya Aria, Senior Luxury Destination Wedding Director. Suatu kehormatan bagi kami untuk mendampingi dan merancang perayaan pernikahan istimewa Anda di Bali.',
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick Prompt definitions
  const QUICK_PROMPTS = [
    {
      id: 'budget_uluwatu',
      icon: DollarSign,
      labelEn: 'Budget for Uluwatu Private Villa?',
      labelId: 'Estimasi budget private villa di Uluwatu?',
      queryEn: 'What is the estimated budget benchmark for a private villa buyout wedding in Uluwatu for 50 guests?',
      queryId: 'Berapa estimasi budget untuk pernikahan private villa buyout di Uluwatu untuk 50 tamu?',
      responseEn:
        'For a bespoke Private Villa Celebration in Uluwatu (20–50 guests), benchmark investments range between USD $35,000 – $75,000 (approx. IDR 550M – 1.2B). This comprehensively covers multi-day cliff estate buyout, banjar permits, bespoke floral architecture, 5-course fine dining, premium open bar, master photography/cinematography, and full legal concierge coordination.',
      responseId:
        'Untuk pernikahan Private Villa di tebing Uluwatu (20–50 tamu), tolok ukur investasi berada pada kisaran USD $35.000 – $75.000 (sekitar Rp 550 Juta – 1,2 Miliar). Alokasi ini mencakup sewa privat villa beberapa hari, izin adat Banjar, arsitektur bunga tebing, jamuan fine dining 5-course, open bar premium, tim foto/video master, dan koordinasi legal penuh.',
      waTopic: 'Uluwatu Private Villa Budget Consultation (50 Guests)',
    },
    {
      id: 'banjar_curfew',
      icon: Moon,
      labelEn: 'Banjar curfew & noise rules in Bali?',
      labelId: 'Aturan jam malam banjar di Bali?',
      queryEn: 'How do village Banjar curfews and music regulations work for Bali weddings?',
      queryId: 'Bagaimana aturan jam malam banjar dan batas musik untuk pernikahan di Bali?',
      responseEn:
        'Private wedding estates operate under local Banjar Adat governance: \n• Uluwatu & Bukit: Amplified music permitted until 23:00 WITA, transitioning to acoustic/indoor suites until 24:00 WITA.\n• Canggu & Pererenan: Curfew at 23:00 WITA.\n• Ubud & Sayan: Strict Eco-Silent curfew at 22:00 WITA to preserve river sanctuary tranquility. \nOur studio directly manages all official Banjar permits and village contributions for seamless compliance.',
      responseId:
        'Villa privat di Bali berada di bawah naungan desa adat (Banjar Adat):\n• Uluwatu & Bukit: Musik pengeras suara diizinkan hingga 23:00 WITA, transisi akustik/indoor hingga 24:00 WITA.\n• Canggu & Pererenan: Jam malam pukul 23:00 WITA.\n• Ubud & Sayan: Zona hening ramah lingkungan ketat pukul 22:00 WITA.\nTim kami mengurus seluruh perizinan resmi Banjar dan donasi adat agar acara Anda berlangsung tanpa kendala.',
      waTopic: 'Banjar Curfew & Sound Permit Clarification',
    },
    {
      id: 'quiet_luxury_decor',
      icon: Flower2,
      labelEn: 'Quiet Luxury decor for 50 guests?',
      labelId: 'Rekomendasi dekorasi Quiet Luxury 50 tamu?',
      queryEn: 'What are the recommended Quiet Luxury floral & styling trends for a 50-guest celebration?',
      queryId: 'Apa rekomendasi dekorasi dan gaya bunga Quiet Luxury untuk 50 tamu?',
      responseEn:
        'For 50 guests, Quiet Luxury centers on architectural restraint and negative space: \n• Palette: Forest Obsidian, brushed champagne gold, and pure ivory silks.\n• Botanicals: Phalaenopsis orchids, white lotus, and native wild ferns in Gianyar terracotta vessels.\n• Layout: Floating suspended floral clouds over imperial banquet tables to maintain unobstructed sunset ocean horizons.',
      responseId:
        'Untuk 50 tamu, konsep Quiet Luxury mengedepankan keanggunan ruang bernapas:\n• Palet: Forest Obsidian, emas sampanye, dan sutra putih gading.\n• Botani: Anggrek bulan putih, teratai putih, dan pakis hutan dalam guci terakota karya perajin Gianyar.\n• Tata Letak: Kanopi awan bunga gantung di atas meja jamuan panjang agar pemandangan laut senja tetap terbuka luas.',
      waTopic: 'Quiet Luxury Styling & Decor Inquiry for 50 Guests',
    },
    {
      id: 'weather_seasons',
      icon: Compass,
      labelEn: 'Best months to marry in Bali?',
      labelId: 'Bulan terbaik menikah di Bali?',
      queryEn: 'Which months offer the most reliable weather for a Bali destination wedding?',
      queryId: 'Bulan apa yang paling bagus cuacanya untuk menikah di Bali?',
      responseEn:
        'The peak dry season runs from May through October, offering crisp sunny skies, minimal humidity, and breathtaking golden hour sunsets. April and November also provide lush tropical foliage with pleasant conditions. For cliff and beach weddings, our directorship always integrates climate-controlled bridal suites and contingency marquees.',
      responseId:
        'Musim kering terbaik berlangsung dari Mei hingga Oktober, dengan langit cerah, kelembapan sejuk, dan matahari terbenam emas yang spektakuler. Bulan April dan November juga sangat indah dengan pemandangan alam yang hijau segar. Tim kami selalu menyiapkan opsi ruang rias berpendingin dan tenda cadangan berarsitektur transparan.',
      waTopic: 'Seasonal Timing & Weather Advisory',
    },
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Handle Quick Prompt Click
  const handleQuickPrompt = (prompt: typeof QUICK_PROMPTS[0]) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      textEn: prompt.queryEn,
      textId: prompt.queryId,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const ariaMsg: ChatMessage = {
        id: `aria-${Date.now()}`,
        sender: 'aria',
        textEn: prompt.responseEn,
        textId: prompt.responseId,
        suggestedAction: {
          labelEn: 'Continue Discussion with Lead Planner on WhatsApp',
          labelId: 'Lanjutkan Diskusi dengan Lead Planner via WhatsApp',
          waTopic: prompt.waTopic,
        },
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, ariaMsg]);
      setIsTyping(false);
    }, 850);
  };

  // Handle Custom Input Submit
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      textEn: userText,
      textId: userText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Knowledge-based response matching
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let responseEn =
        'Thank you for sharing your vision. As each destination celebration is uniquely bespoke, I would be delighted to review specific date availability and prepare an off-market sanctuary proposal tailored to your requirements.';
      let responseId =
        'Terima kasih telah berbagi visi pernikahan Anda. Karena setiap perayaan memiliki keunikan tersendiri, saya akan dengan senang hati mengecek ketersediaan tanggal dan menyiapkan proposal venue off-market yang disesuaikan khusus untuk Anda.';
      let waTopic = `Custom Inquiry: "${userText.slice(0, 40)}..."`;

      if (lower.includes('budget') || lower.includes('harga') || lower.includes('cost') || lower.includes('biaya')) {
        responseEn =
          'Our bespoke wedding investments range from Intimate Elopements (USD $12k–$28k), Private Villa Buyouts (USD $35k–$75k), to Grand Bespoke Galas (USD $75k–$150k+). We provide 100% transparent 5-way financial allocations with no hidden markups.';
        responseId =
          'Investasi pernikahan kami berkisar dari Intimate Elopement (USD $12k–$28k / Rp 190M–450M), Private Villa Buyout (USD $35k–$75k / Rp 550M–1.2B), hingga Grand Bespoke Gala (USD $75k–$150k+ / Rp 1.2B–2.4B) dengan transparansi anggaran 5 pilar tanpa biaya tersembunyi.';
        waTopic = 'Budget & Financial Benchmark Inquiry';
      } else if (lower.includes('venue') || lower.includes('lokasi') || lower.includes('villa') || lower.includes('uluwatu') || lower.includes('ubud')) {
        responseEn =
          'We hold private directorship access to Bali’s most coveted off-market cliff estates in Uluwatu, riverside jungle sanctuaries in Sayan/Ubud, and oceanfront compounds in Pererenan and Nusa Dua.';
        responseId =
          'Kami memiliki akses langsung ke portofolio villa tebing privat off-market di Uluwatu, suaka hutan sungai di Sayan/Ubud, serta kompleks villa pantai eksklusif di Pererenan dan Nusa Dua.';
        waTopic = 'Off-Market Venue Portfolio & Availability Check';
      } else if (lower.includes('legal') || lower.includes('nikah') || lower.includes('dokumen') || lower.includes('syarat')) {
        responseEn =
          'Our legal concierge team manages full civil and religious documentation in Bali, including embassy CNI liaisons, bilingual legal celebrants, and certified translations for seamless international recognition.';
        responseId =
          'Tim concierge legal kami menangani seluruh prosesi catatan sipil dan agama resmi di Bali, pengurusan CNI kedutaan besar, penghulu/pastur dwibahasa, serta legalisasi dokumen resmi internasional.';
        waTopic = 'Legal Marriage Registration & Document Concierge';
      }

      const ariaMsg: ChatMessage = {
        id: `aria-${Date.now()}`,
        sender: 'aria',
        textEn: responseEn,
        textId: responseId,
        suggestedAction: {
          labelEn: 'Continue Discussion with Lead Planner on WhatsApp',
          labelId: 'Lanjutkan Diskusi dengan Lead Planner via WhatsApp',
          waTopic: waTopic,
        },
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, ariaMsg]);
      setIsTyping(false);
    }, 1000);
  };

  // Generate WhatsApp Routing Link
  const getWhatsAppUrl = (topic?: string) => {
    const topicText = topic || 'General AI Concierge Inquiry';
    let message = '';
    if (lang === 'ID') {
      message =
        `Halo Aria & Forever Bali Weddings,\n\n` +
        `Saya sedang berdiskusi melalui Floating AI Concierge di situs web mengenai: "${topicText}".\n\n` +
        `Saya ingin melanjutkan konsultasi privat dengan Lead Wedding Planner untuk tanggal dan konsep pernikahan kami di Bali. Terima kasih.`;
    } else {
      message =
        `Hello Aria & Forever Bali Weddings,\n\n` +
        `I was just consulting with Aria via the Floating AI Concierge on your website regarding: "${topicText}".\n\n` +
        `I would love to continue the private discovery session with your Lead Wedding Director. Thank you.`;
    }
    return `https://wa.me/6281370074777?text=${encodeURIComponent(message)}`;
  };

  return (
    <aside aria-label="AI Concierge Assistant" className="fixed bottom-6 right-6 z-50 font-sans">
      {/* FLOATING TRIGGER BUTTON (When Closed) */}
      {!isOpen && (
        <button
          type="button"
          id="aria-ai-floating-trigger"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 bg-[#111816] text-[#FDFBF7] border border-[#C9A96E]/60 rounded-full shadow-2xl hover:border-[#C9A96E] hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-md"
        >
          {/* Subtle pulsating luxury aura */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#C9A96E]/40 to-[#1A2421]/60 blur-xs opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />

          <div className="relative w-8 h-8 rounded-full bg-[#C9A96E] text-[#111816] flex items-center justify-center font-serif font-bold text-sm shadow-md">
            <Sparkles className="w-4 h-4 text-[#111816]" />
          </div>

          <div className="relative text-left pr-1 hidden sm:block">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#C9A96E] font-semibold leading-none mb-0.5">
              ARIA • CONCIERGE AI
            </div>
            <div className="text-[10px] text-neutral-300 font-light leading-none">
              {lang === 'ID' ? 'Tanyakan Seputar Pernikahan Bali' : 'Live Luxury Advisory'}
            </div>
          </div>
        </button>
      )}

      {/* CHAT MODAL WINDOW (When Open) */}
      {isOpen && (
        <div
          id="aria-ai-chat-window"
          className="w-[92vw] sm:w-[410px] h-[560px] max-h-[85vh] bg-[#111816] border border-[#C9A96E]/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn backdrop-blur-xl"
        >
          {/* Modal Header */}
          <div className="px-5 py-4 bg-[#1A2421] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#C9A96E] text-[#111816] flex items-center justify-center font-serif font-bold text-base shadow-sm">
                  A
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#111816]" />
              </div>
              <div>
                <h3
                  className="text-sm font-serif font-semibold text-[#FDFBF7] flex items-center gap-1.5"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  <span>Aria</span>
                  <span className="text-[9px] bg-[#C9A96E]/20 text-[#C9A96E] px-1.5 py-0.5 rounded-xs font-mono font-normal">
                    AI CONCIERGE
                  </span>
                </h3>
                <p className="text-[10px] text-neutral-300 font-light">
                  {lang === 'ID'
                    ? 'Forever Bali Weddings Directorship'
                    : 'Forever Bali Weddings Directorship'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  setMessages([
                    {
                      id: 'welcome-reset',
                      sender: 'aria',
                      textEn:
                        'Session refreshed. How may I assist with your Bali celebration inquiries?',
                      textId:
                        'Sesi diperbarui. Ada hal lain yang ingin Anda konsultasikan seputar pernikahan di Bali?',
                      timestamp: 'Just now',
                    },
                  ])
                }
                className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title="Close Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-[#111816]/95">
            {/* Direct WhatsApp Callout Pill */}
            <div className="p-2.5 rounded-lg bg-[#1A2421]/90 border border-[#C9A96E]/30 flex items-center justify-between text-[11px]">
              <span className="text-neutral-300">
                {lang === 'ID'
                  ? 'Perlu tanggapan instan dari planner?'
                  : 'Prefer direct human planner?'}
              </span>
              <a
                href={getWhatsAppUrl('Instant Escalation from Header Pill')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A96E] hover:underline font-semibold flex items-center gap-1"
              >
                <span>WhatsApp Desk</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Render Conversation */}
            {messages.map((msg) => {
              const isAria = msg.sender === 'aria';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isAria ? 'items-start' : 'items-end'
                  }`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-xl leading-relaxed whitespace-pre-line ${
                      isAria
                        ? 'bg-[#1A2421] text-[#FDFBF7] border border-white/10 rounded-tl-xs shadow-md'
                        : 'bg-[#C9A96E] text-[#111816] font-medium rounded-tr-xs shadow-md'
                    }`}
                  >
                    {lang === 'ID' ? msg.textId : msg.textEn}
                  </div>

                  {/* Suggested WhatsApp Escalation Button on Aria replies */}
                  {isAria && msg.suggestedAction && (
                    <a
                      href={getWhatsAppUrl(msg.suggestedAction.waTopic)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A96E]/15 hover:bg-[#C9A96E]/30 text-[#C9A96E] border border-[#C9A96E]/40 rounded-xs text-[11px] font-semibold transition-all group"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>
                        {lang === 'ID'
                          ? msg.suggestedAction.labelId
                          : msg.suggestedAction.labelEn}
                      </span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}

                  <span className="text-[9px] text-neutral-500 mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 max-w-[120px] bg-[#1A2421] rounded-xl border border-white/10 text-[#C9A96E]">
                <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2.5 bg-[#1A2421] border-t border-white/10">
            <div className="text-[10px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-1.5 px-1 flex items-center justify-between">
              <span>{lang === 'ID' ? 'Pertanyaan Cepat:' : 'Curated Inquiries:'}</span>
              <span className="text-neutral-400 text-[9px] font-normal">
                {lang === 'ID' ? 'Klik untuk respon instan' : 'Click for instant answers'}
              </span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="whitespace-nowrap px-2.5 py-1.5 bg-[#111816] hover:bg-[#C9A96E]/20 text-neutral-200 hover:text-white border border-white/10 hover:border-[#C9A96E]/50 rounded-xs text-[11px] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <prompt.icon className="w-3 h-3 text-[#C9A96E]" />
                  <span>{lang === 'ID' ? prompt.labelId : prompt.labelEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#111816] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                lang === 'ID'
                  ? 'Tanyakan apa saja kepada Aria...'
                  : 'Ask Aria about venues, curfews, budget...'
              }
              className="flex-1 px-3.5 py-2.5 bg-[#1A2421] border border-white/20 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="w-9 h-9 rounded-lg bg-[#C9A96E] hover:bg-[#B8985D] disabled:opacity-40 text-[#111816] flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-md"
              title="Send Message"
            >
              <Send className="w-4 h-4 fill-current" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};
