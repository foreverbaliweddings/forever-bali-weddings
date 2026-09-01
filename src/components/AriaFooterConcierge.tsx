import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  MessageCircle,
  Send,
  ArrowUpRight,
  ShieldCheck,
  RotateCcw,
  DollarSign,
  Moon,
  Flower2,
  Bot,
  User,
  Compass,
} from 'lucide-react';
import { Language } from '../types';

interface AriaFooterConciergeProps {
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

export const AriaFooterConcierge: React.FC<AriaFooterConciergeProps> = ({ lang }) => {
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
      labelEn: 'Budget for Uluwatu Villa?',
      labelId: 'Estimasi budget villa Uluwatu?',
      queryEn:
        'What is the estimated budget benchmark for a private villa buyout wedding in Uluwatu for 50 guests?',
      queryId:
        'Berapa estimasi budget untuk pernikahan private villa buyout di Uluwatu untuk 50 tamu?',
      responseEn:
        'For a bespoke Private Villa Celebration in Uluwatu (20–50 guests), benchmark investments range between USD $35,000 – $75,000 (approx. IDR 550M – 1.2B). This comprehensively covers multi-day cliff estate buyout, banjar permits, bespoke floral architecture, 5-course fine dining, premium open bar, master photography/cinematography, and full legal concierge coordination.',
      responseId:
        'Untuk pernikahan Private Villa di tebing Uluwatu (20–50 tamu), tolok ukur investasi berada pada kisaran USD $35.000 – $75.000 (sekitar Rp 550 Juta – 1,2 Miliar). Alokasi ini mencakup sewa privat villa beberapa hari, izin adat Banjar, arsitektur bunga tebing, jamuan fine dining 5-course, open bar premium, tim foto/video master, dan koordinasi legal penuh.',
      waTopic: 'Uluwatu Private Villa Budget Consultation (50 Guests)',
    },
    {
      id: 'banjar_curfew',
      icon: Moon,
      labelEn: 'Banjar Curfew Guidelines',
      labelId: 'Aturan Jam Malam Banjar',
      queryEn:
        'What are the local Banjar Adat curfew rules for sound and music across different Bali regions?',
      queryId:
        'Bagaimana aturan jam malam (curfew) dan musik dari Banjar Adat di berbagai wilayah Bali?',
      responseEn:
        'Banjar Adat music curfews vary strictly by region: Uluwatu & Bukit cliff estates allow outdoor amplified sound until 24:00 WITA (transitioning to acoustic after 23:00); Ubud & Sayan jungle sanctuaries have a strict 22:00 WITA eco-silent zone; Canggu/Pererenan beachfront villas observe 23:00 WITA. Our directorship manages all official permits and seamless silent-disco or indoor afterparty transitions.',
      responseId:
        'Aturan jam malam (curfew) Banjar Adat berbeda per wilayah: Villa tebing Uluwatu mengizinkan musik keras hingga 24:00 WITA (transisi akustik setelah 23:00); Suaka rimba Ubud memiliki batas tenang ketat pukul 22:00 WITA; Kawasan pantai Canggu/Pererenan hingga pukul 23:00 WITA. Tim kami mengurus seluruh perizinan resmi desa adat dan transisi afterparty tanpa kendala.',
      waTopic: 'Banjar Curfew & Afterparty Planning Consultation',
    },
    {
      id: 'quiet_luxury_decor',
      icon: Flower2,
      labelEn: 'Quiet Luxury Styling',
      labelId: 'Konsep Quiet Luxury',
      queryEn:
        'How does Forever Bali Weddings execute the "Quiet Luxury" floral and architectural styling?',
      queryId:
        'Bagaimana Forever Bali Weddings merancang konsep dekorasi dan bunga bertema "Quiet Luxury"?',
      responseEn:
        'We practice intentional restraint over generic excess: suspended botanical canopies, architectural white phalaenopsis orchids, locally forged basalt stone plinths, thousands of real drip candles, and warm 2400K filament bistro lighting that harmonizes with Bali’s natural clifftop and jungle topography.',
      responseId:
        'Kami mengedepankan keanggunan tanpa kesan berlebihan: kanopi botani gantung melayang, anggrek bulan putih arsitektural, tatanan batu basal lokal, ribuan lilin alami, serta tata cahaya filamen hangat 2400K yang menyatu harmonis dengan lansekap tebing dan rimba Bali.',
      waTopic: 'Quiet Luxury Styling & Floral Consultation',
    },
    {
      id: 'best_season',
      icon: Compass,
      labelEn: 'Best Wedding Months',
      labelId: 'Musim Terbaik di Bali',
      queryEn:
        'Which months offer the most reliable weather and clearest sunset light in Bali?',
      queryId:
        'Bulan apa yang paling ideal untuk cuaca cerah dan matahari terbenam terbaik di Bali?',
      responseEn:
        'May through October represents Bali’s dry season, offering minimal rainfall, crisp ocean breezes, and golden clifftop sunsets. July and August feature the coolest evenings, while May, June, and September offer the most exclusive villa availability.',
      responseId:
        'Mei hingga Oktober adalah musim kemarau terbaik di Bali dengan curah hujan sangat rendah, semilir angin laut sejuk, dan pemandangan sunset keemasan. Juli & Agustus memiliki suhu malam paling nyaman, sementara Mei, Juni, dan September sangat ideal untuk ketersediaan villa eksklusif.',
      waTopic: 'Best Season & Calendar Date Check with Aria',
    },
  ];

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Generate WhatsApp escalation URL
  const getWhatsAppUrl = (topic?: string) => {
    const defaultTopic =
      lang === 'ID'
        ? 'Konsultasi Perencanaan Pernikahan Mewah di Bali via Footer Aria Engine'
        : 'Luxury Bali Destination Wedding Planning via Footer Aria Engine';
    const text =
      lang === 'ID'
        ? `Halo Aria (+62 813-7007-4777), saya terhubung melalui AI Concierge di Footer website Forever Bali Weddings untuk berkonsultasi mengenai: ${
            topic || defaultTopic
          }. Mohon info ketersediaan tanggal dan jadwal konsultasi.`
        : `Hello Aria (+62 813-7007-4777), I am connecting via the Footer AI Concierge on the Forever Bali Weddings website regarding: ${
            topic || defaultTopic
          }. Please advise on date availability and scheduling a discovery call.`;
    return `https://wa.me/6281370074777?text=${encodeURIComponent(text)}`;
  };

  // Handle Quick Prompt Click
  const handleQuickPrompt = (prompt: (typeof QUICK_PROMPTS)[0]) => {
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
      const ariaReply: ChatMessage = {
        id: `aria-${Date.now()}`,
        sender: 'aria',
        textEn: prompt.responseEn,
        textId: prompt.responseId,
        suggestedAction: {
          labelEn: 'Consult via VIP WhatsApp Desk',
          labelId: 'Lanjutkan Konsultasi via WhatsApp',
          waTopic: prompt.waTopic,
        },
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, ariaReply]);
      setIsTyping(false);
    }, 600);
  };

  // Handle Custom Message Submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isTyping) return;

    const query = inputQuery.trim();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      textEn: query,
      textId: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyEn = '';
      let replyId = '';
      let waTopic = 'General Inquiry';

      if (
        lower.includes('harga') ||
        lower.includes('biaya') ||
        lower.includes('cost') ||
        lower.includes('budget') ||
        lower.includes('price')
      ) {
        replyEn =
          'Our transparent luxury packages start from USD $18,000 for Intimate Elopements (up to 15 guests), USD $48,000 for Private Villa Buyouts (20–50 guests), up to USD $115,000+ for Full-Scale Royal Galas. Would you like a tailored quote for your specific guest count and preferred region?';
        replyId =
          'Investasi pernikahan luxury kami mulai dari USD $18.000 (Intimate Elopement hingga 15 tamu), USD $48.000 (Private Villa Buyout 20–50 tamu), hingga USD $115.000+ untuk Resepsi Gala Megah. Apakah Anda ingin estimasi khusus sesuai perkiraan jumlah tamu dan lokasi favorit Anda?';
        waTopic = 'Budget Estimation & Custom Pricing Inquiry';
      } else if (
        lower.includes('venue') ||
        lower.includes('villa') ||
        lower.includes('lokasi') ||
        lower.includes('location') ||
        lower.includes('uluwatu') ||
        lower.includes('ubud')
      ) {
        replyEn =
          'We hold direct partnerships with iconic clifftop estates in Uluwatu (e.g. The Cliff Estate, Bulgari, The Edge), jungle sanctuaries along Ubud’s Ayung River, and oceanfront compounds in Pererenan/Canggu. Which aesthetic resonates most with you?';
        replyId =
          'Kami bermitra langsung dengan villa tebing ikonik di Uluwatu (seperti The Cliff Estate, Bulgari, The Edge), suaka rimba di sepanjang Sungai Ayung Ubud, serta villa tepi laut di Pererenan/Canggu. Suasana mana yang paling Anda dambakan?';
        waTopic = 'Venue Availability & Curation Inquiry';
      } else if (
        lower.includes('halal') ||
        lower.includes('menu') ||
        lower.includes('food') ||
        lower.includes('makan')
      ) {
        replyEn =
          'We cater extensively to global culinary requirements: 100% Halal certified fine dining, Wagyu degustations, organic vegan, and strictly separated allergen prep with leading international executive chefs in Bali.';
        replyId =
          'Kami melayani seluruh kebutuhan kuliner khusus: jamuan fine dining 100% bersertifikat Halal, degustasi Wagyu, vegan organik, serta penanganan alergi terpisah yang diawasi langsung oleh chef eksekutif berpengalaman di Bali.';
        waTopic = 'Culinary & Halal Catering Consultation';
      } else {
        replyEn =
          `Thank you for sharing your thoughts regarding "${query}". As your dedicated Wedding Director, I would be delighted to review your specific vision and calendar dates directly with our senior production team.`;
        replyId =
          `Terima kasih atas pertanyaan Anda seputar "${query}". Sebagai Wedding Director Anda, saya siap menelaah visi dan ketersediaan tanggal perayaan Anda bersama tim produksi senior kami.`;
        waTopic = `Inquiry: ${query.slice(0, 40)}`;
      }

      const ariaReply: ChatMessage = {
        id: `aria-${Date.now()}`,
        sender: 'aria',
        textEn: replyEn,
        textId: replyId,
        suggestedAction: {
          labelEn: 'Fast-Track via WhatsApp (+62 813-7007-4777)',
          labelId: 'Lanjutkan via WhatsApp (+62 813-7007-4777)',
          waTopic: waTopic,
        },
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, ariaReply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div
      id="aria-footer-concierge"
      className="p-6 sm:p-8 bg-[#111816] border border-[#C9A96E]/40 rounded-2xl shadow-2xl relative overflow-hidden"
    >
      {/* Subtle Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#C9A96E] text-[#111816] flex items-center justify-center font-serif font-bold text-base shadow-md">
              A
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#111816]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4
                className="text-sm sm:text-base font-serif font-bold text-[#FDFBF7]"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Aria • Senior Wedding Concierge
              </h4>
              <span className="text-[9px] bg-[#C9A96E]/20 text-[#C9A96E] px-2 py-0.5 rounded-xs font-mono font-semibold">
                AI PLANNING ENGINE
              </span>
            </div>
            <p className="text-[11px] text-neutral-300 font-light">
              {lang === 'ID'
                ? 'Konsultasi Perencanaan & Anggaran Pernikahan Mewah Bali 24/7'
                : '24/7 Bespoke Luxury Destination Wedding Planning & Cost Advisory'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
            className="px-3 py-1.5 bg-[#1A2421] hover:bg-white/10 text-neutral-300 text-xs rounded-xs border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset Chat"
          >
            <RotateCcw className="w-3 h-3 text-[#C9A96E]" />
            <span className="text-[11px]">{lang === 'ID' ? 'Reset Sesi' : 'Reset Session'}</span>
          </button>
        </div>
      </div>

      {/* Main Chat Feed */}
      <div className="h-64 sm:h-72 overflow-y-auto p-4 bg-[#1A2421]/90 rounded-xl border border-white/5 space-y-3 text-xs mb-4">
        {messages.map((msg) => {
          const isAria = msg.sender === 'aria';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAria ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-xl leading-relaxed whitespace-pre-line text-xs ${
                  isAria
                    ? 'bg-[#111816] text-[#FDFBF7] border border-white/10 rounded-tl-xs shadow-md'
                    : 'bg-[#C9A96E] text-[#111816] font-medium rounded-tr-xs shadow-md'
                }`}
              >
                {lang === 'ID' ? msg.textId : msg.textEn}
              </div>

              {/* Action Button for Aria's reply */}
              {isAria && msg.suggestedAction && (
                <a
                  href={getWhatsAppUrl(msg.suggestedAction.waTopic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A96E]/20 hover:bg-[#C9A96E]/35 text-[#C9A96E] border border-[#C9A96E]/50 rounded-xs text-[11px] font-semibold transition-all group cursor-pointer"
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

              <span className="text-[9px] text-neutral-500 mt-1 font-mono">{msg.timestamp}</span>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-1.5 p-2.5 max-w-[100px] bg-[#111816] rounded-xl border border-white/10 text-[#C9A96E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-bounce [animation-delay:0.4s]" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#C9A96E] font-semibold mb-2">
          <span>{lang === 'ID' ? 'Pertanyaan Instan Populer:' : 'Curated Instant Inquiries:'}</span>
          <span className="text-neutral-400 font-light text-[9px]">
            {lang === 'ID' ? 'Pilih untuk jawaban instan' : 'Click for instant response'}
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => handleQuickPrompt(prompt)}
              className="whitespace-nowrap px-3 py-1.5 bg-[#1A2421] hover:bg-[#C9A96E]/20 text-neutral-200 hover:text-white border border-white/10 hover:border-[#C9A96E]/50 rounded-xs text-[11px] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <prompt.icon className="w-3 h-3 text-[#C9A96E]" />
              <span>{lang === 'ID' ? prompt.labelId : prompt.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Message Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={
            lang === 'ID'
              ? 'Tanyakan detail anggaran, rekomendasi villa, atau jam malam Banjar...'
              : 'Ask Aria about budgets, villa curation, or Banjar curfews...'
          }
          className="flex-1 px-4 py-3 bg-[#1A2421] border border-white/20 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="px-5 py-3 bg-[#C9A96E] hover:bg-[#B8985D] disabled:opacity-40 text-[#111816] rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-lg"
        >
          <Send className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">{lang === 'ID' ? 'Kirim' : 'Send'}</span>
        </button>
      </form>
    </div>
  );
};
