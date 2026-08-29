import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Palette,
  FileCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { Language, PlanningStep } from '../types';
import { PLANNING_STEPS, CONTACT_INFO } from '../data/weddingData';

interface PlanningVoyageSectionProps {
  lang: Language;
}

export const PlanningVoyageSection: React.FC<PlanningVoyageSectionProps> = ({ lang }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const getStepIcon = (iconType?: string) => {
    switch (iconType) {
      case 'compass':
        return <Compass className="w-5 h-5" />;
      case 'map-pin':
        return <MapPin className="w-5 h-5" />;
      case 'palette':
        return <Palette className="w-5 h-5" />;
      case 'file-check':
        return <FileCheck className="w-5 h-5" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const activeStep = PLANNING_STEPS[activeStepIndex] || PLANNING_STEPS[0];

  const getWhatsAppStepInquiry = (step: PlanningStep) => {
    const title = lang === 'ID' ? step.titleId : step.titleEn;
    const timeframe = lang === 'ID' ? step.timeframeId : step.timeframeEn;
    const message =
      lang === 'ID'
        ? `Halo Forever Bali Weddings Studio, saya ingin menanyakan lebih lanjut mengenai tahapan perencanaan "${title}" (${timeframe}).`
        : `Hello Forever Bali Weddings Studio, I would like to inquire more about the planning phase "${title}" (${timeframe}).`;
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="journey" className="py-24 sm:py-32 bg-[#F7F4EE] relative overflow-hidden">
      {/* Ambient Luxury Background Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#C9A96E]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#E5E1D8] bg-white mb-4 rounded-sm shadow-xs">
            <span className="text-[#C9A96E] font-serif text-sm">✧</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'ROADMAP KLIEN 5 TAHAPAN' : 'THE 5-STEP CLIENT JOURNEY'}
            </span>
          </div>

          <h2
            id="voyage-main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#222222] tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? 'Tahapan Perjalanan Perencanaan' : 'The Wedding Planning Journey'}
          </h2>

          <div className="w-16 h-[1.5px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#555555] font-light font-sans max-w-2xl mx-auto leading-relaxed">
            {lang === 'ID'
              ? 'Roadmap lima tahapan terstruktur yang menghadirkan ketenangan total dan kejelasan mutlak dari konsultasi perdana hingga detik sakral di hari-H.'
              : 'A curated five-phase roadmap designed to deliver total creative clarity, seamless international coordination, and absolute peace of mind.'}
          </p>
        </div>

        {/* Interactive 5-Step Timeline Navigation Bar */}
        <div className="relative mb-12 sm:mb-16">
          
          {/* Subtle Horizontal Connecting Gold Line for Desktop */}
          <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#E5E1D8] via-[#C9A96E] to-[#E5E1D8] z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {PLANNING_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const title = lang === 'ID' ? step.titleId : step.titleEn;
              const timeframe = lang === 'ID' ? step.timeframeId : step.timeframeEn;

              return (
                <button
                  key={step.stepNumber}
                  id={`journey-nav-tab-${step.stepNumber}`}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 sm:p-5 rounded-sm border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                    isActive
                      ? 'bg-[#1A2421] text-white border-[#C9A96E] shadow-xl scale-[1.02]'
                      : 'bg-white text-[#555555] border-[#E5E1D8] hover:border-[#C9A96E]/50 hover:bg-[#FFFDF9]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-serif text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#C9A96E] text-white'
                          : 'bg-[#F7F4EE] text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-white'
                      }`}
                    >
                      0{step.stepNumber}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-mono tracking-wider ${
                        isActive ? 'text-[#C9A96E]' : 'text-[#888888]'
                      }`}
                    >
                      {timeframe}
                    </span>
                  </div>

                  <div
                    className={`text-xs sm:text-sm font-serif font-medium line-clamp-2 leading-snug ${
                      isActive ? 'text-white' : 'text-[#222222] group-hover:text-[#C9A96E]'
                    }`}
                  >
                    {title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Showcase Card */}
        <div className="bg-white rounded-sm border border-[#E5E1D8] shadow-lg overflow-hidden transition-all duration-500 hover:border-[#C9A96E]/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Accent Column (4 cols) */}
            <div className="lg:col-span-4 bg-[#1A2421] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A96E]/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center gap-2 text-[#C9A96E] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                  {getStepIcon(activeStep.iconType)}
                  <span>
                    {lang === 'ID' ? `FASE 0${activeStep.stepNumber}` : `PHASE 0${activeStep.stepNumber}`}
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl font-serif text-white font-normal mb-2 leading-tight"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {lang === 'ID' ? activeStep.titleId : activeStep.titleEn}
                </h3>

                <div className="inline-block px-3 py-1 bg-white/10 text-[#C9A96E] font-mono text-xs rounded-xs mb-4">
                  {lang === 'ID' ? activeStep.timeframeId : activeStep.timeframeEn}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {lang === 'ID' ? activeStep.subtitleId : activeStep.subtitleEn}
                </p>
              </div>

              {/* Progress Indicator dots */}
              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
                  Phase {activeStep.stepNumber} of 5
                </span>
                <div className="flex gap-1.5">
                  {PLANNING_STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2.5 h-1 rounded-full transition-all ${
                        i === activeStepIndex ? 'bg-[#C9A96E] w-6' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Deliverables & Action Column (8 cols) */}
            <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#888888] font-semibold mb-3">
                  {lang === 'ID' ? 'DESKRIPSI & FOKUS EKSEKUSI:' : 'DESCRIPTION & EXECUTION FOCUS:'}
                </h4>
                <p className="text-sm sm:text-base text-[#444444] font-light leading-relaxed mb-6 font-sans">
                  {lang === 'ID' ? activeStep.descId : activeStep.descEn}
                </p>

                <h4 className="text-xs uppercase tracking-[0.2em] text-[#222222] font-semibold mb-4">
                  {lang === 'ID' ? 'HASIL KELUARAN UTAMA (KEY DELIVERABLES):' : 'KEY DELIVERABLES & MILESTONES:'}
                </h4>
                
                <div className="space-y-3">
                  {(lang === 'ID' ? activeStep.deliverablesId : activeStep.deliverablesEn)?.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3 p-3 bg-[#FDFBF7] border border-[#E5E1D8] rounded-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#333333] font-light leading-relaxed">
                        {del}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-6 border-t border-[#E5E1D8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 border border-[#E5E1D8] text-xs font-semibold uppercase tracking-wider text-[#555555] rounded-xs hover:bg-[#F7F4EE] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    {lang === 'ID' ? '← Sebelumnya' : '← Previous'}
                  </button>

                  <button
                    type="button"
                    disabled={activeStepIndex === PLANNING_STEPS.length - 1}
                    onClick={() => setActiveStepIndex((prev) => Math.min(PLANNING_STEPS.length - 1, prev + 1))}
                    className="px-4 py-2 border border-[#E5E1D8] text-xs font-semibold uppercase tracking-wider text-[#222222] rounded-xs hover:bg-[#F7F4EE] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    {lang === 'ID' ? 'Selanjutnya →' : 'Next Step →'}
                  </button>
                </div>

                <a
                  id="journey-whatsapp-inquire-btn"
                  href={getWhatsAppStepInquiry(activeStep)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#C9A96E] hover:bg-[#B8985D] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all rounded-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{lang === 'ID' ? 'Tanya Fase Ini via WhatsApp' : 'Inquire This Phase'}</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
