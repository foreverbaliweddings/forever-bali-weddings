import React, { useState } from 'react';
import { Language } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PackagesSection } from './components/PackagesSection';
import { VenuesSection } from './components/VenuesSection';
import { NusantaraHeritageSection } from './components/NusantaraHeritageSection';
import { ComprehensiveServicesSection } from './components/ComprehensiveServicesSection';
import { CuratedPartnersSection } from './components/CuratedPartnersSection';
import { ComparisonSection } from './components/ComparisonSection';
import { TrackRecordSection } from './components/TrackRecordSection';
import { PlanningVoyageSection } from './components/PlanningVoyageSection';
import { BudgetEstimatorSection } from './components/BudgetEstimatorSection';
import { GuestConciergeSection } from './components/GuestConciergeSection';
import { BackdropsSection } from './components/BackdropsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AnniversarySection } from './components/AnniversarySection';
import { LeadMagnetSection } from './components/LeadMagnetSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ConsultationModal } from './components/ConsultationModal';
import { WeddingGuideModal } from './components/WeddingGuideModal';
import { GuideFloatingBanner } from './components/GuideFloatingBanner';
import VenueCatalog from './components/VenueCatalog';
import { DestinationMatcher } from './components/DestinationMatcher';
import { VisionStudio } from './components/VisionStudio';
import { AtmosphereSimulator } from './components/AtmosphereSimulator';
import { EditorialBlog } from './components/EditorialBlog';
import { CurrencyInvestmentCalculator } from './components/CurrencyInvestmentCalculator';
import { GuestRSVPConcierge } from './components/GuestRSVPConcierge';
import { ItineraryBuilder } from './components/ItineraryBuilder';
import { MoodboardExporter } from './components/MoodboardExporter';
import { CostTransparencyEngine } from './components/CostTransparencyEngine';
import { VipBookingModal } from './components/VipBookingModal';

export default function App() {
  const [lang, setLang] = useState<Language>('ID');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isVipBookingModalOpen, setIsVipBookingModalOpen] = useState(false);
  const [vipModalTier, setVipModalTier] = useState<string>('');
  const [vipModalRegion, setVipModalRegion] = useState<string>('');

  const handleToggleLang = (newLang: Language) => {
    setLang(newLang);
  };

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
  };

  const handleClearSelectedPackage = () => {
    setSelectedPackage('');
  };

  const handleOpenVipBooking = (tier?: string, region?: string) => {
    setVipModalTier(tier || '');
    setVipModalRegion(region || '');
    setIsVipBookingModalOpen(true);
  };

  const handleLockEstimate = (data: any) => {
    const text = `Hello Forever Bali Weddings, I calculated a target budget estimate for ${data.guestCount} guests in ${data.region.toUpperCase()} (${data.tier.toUpperCase()} tier), estimated around $${data.estimatedUSD.toLocaleString()} USD. I would like to confirm venue availability.`;
    const waUrl = `https://wa.me/6281370074777?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#222222] font-sans selection:bg-[#C9A96E]/25 selection:text-[#222222]">
      {/* 1. Header & Navigation */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
      />

      {/* Page 1: Hero Section */}
      <Hero lang={lang} />

      {/* Page 2: Bespoke Hospitality & Executive Leadership - About Our Studio & Team */}
      <AboutSection
        lang={lang}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
      />

      {/* Pages 3, 4, 5: Curated Luxury Packages (Essential, Artisan, Signature Elite) */}
      <PackagesSection
        lang={lang}
        onSelectPackage={handleSelectPackage}
      />

      {/* Interactive Venues & Locations Section */}
      <VenuesSection lang={lang} />

      {/* Curated Off-Market Private Sanctuaries Catalog */}
      <VenueCatalog lang={lang} />

      {/* Interactive Smart Destination Matcher (Aria Concierge) */}
      <DestinationMatcher lang={lang} />

      {/* Interactive Live Wedding Vision Studio */}
      <VisionStudio lang={lang} />

      {/* Time-of-Day Atmosphere Lighting Simulator */}
      <AtmosphereSimulator lang={lang} />

      {/* Interactive Wedding Investment Estimator */}
      <BudgetEstimatorSection lang={lang} onLockEstimate={handleLockEstimate} />

      {/* Interactive Multi-Currency Investment Engine */}
      <CurrencyInvestmentCalculator lang={lang} onOpenVipBooking={handleOpenVipBooking} />

      {/* High-Intent SEO Cost Transparency Engine & 5-Way Allocation */}
      <CostTransparencyEngine lang={lang} onOpenVipBooking={handleOpenVipBooking} />

      {/* Page 6: Cultural Reverence - Nusantara Heritage */}
      <NusantaraHeritageSection lang={lang} />

      {/* Page 7: 360-Degree Execution - Comprehensive Services */}
      <ComprehensiveServicesSection lang={lang} />

      {/* Curated Luxury Artisan Partners (Cosma Florist, Ayu Hairstylist, etc.) */}
      <CuratedPartnersSection
        lang={lang}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
      />

      {/* Page 8: At A Glance - Package Comparison Matrix */}
      <ComparisonSection lang={lang} />

      {/* Page 9: Proven Track Record - Decade of Excellence */}
      <TrackRecordSection lang={lang} />

      {/* Page 10: Seamless Journey - The Planning Voyage */}
      <PlanningVoyageSection lang={lang} />

      {/* Destination Experience & Guest Concierge */}
      <GuestConciergeSection
        lang={lang}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
      />

      {/* VVIP Guest RSVP & Hospitality Concierge */}
      <GuestRSVPConcierge lang={lang} />

      {/* Interactive Multi-Day 3-Day Wedding Itinerary Builder */}
      <ItineraryBuilder lang={lang} />

      {/* VVIP Moodboard & Aesthetic Portfolio Exporter */}
      <MoodboardExporter lang={lang} />

      {/* Page 11: Visual Inspiration - Iconic Backdrops */}
      <BackdropsSection lang={lang} />

      {/* Real Love Stories & Verified Reviews */}
      <TestimonialsSection lang={lang} />

      {/* Forever Couples & Anniversary Celebrations */}
      <AnniversarySection
        lang={lang}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
      />

      {/* Lead Magnet: Download 2026/2027 Luxury Bali Wedding Guide & Pricing */}
      <LeadMagnetSection lang={lang} />

      {/* Editorial Journal & Luxury Wedding Wisdom CMS */}
      <EditorialBlog lang={lang} />

      {/* Page 12: Begin Your Forever - Contact & Consultation Inquiries */}
      <ContactSection
        lang={lang}
        selectedPackage={selectedPackage}
        onClearSelectedPackage={handleClearSelectedPackage}
      />

      {/* Page 13: Main Footer & Official Social Channels (Includes Permanent Aria AI Concierge Engine) */}
      <Footer lang={lang} />

      {/* Floating Instant WhatsApp Button (Positioned clearly on bottom-right z-[1000]) */}
      <FloatingWhatsApp lang={lang} />

      {/* Floating Subtle Wedding Guide Banner (Positioned on bottom-left z-[990]) */}
      <GuideFloatingBanner
        lang={lang}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
      />

      {/* 2026 Bali Luxury Destination Wedding Guide Modal */}
      <WeddingGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        lang={lang}
      />

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        lang={lang}
      />

      {/* VVIP Discovery & Executive Video Consultation Time-Slot Modal */}
      <VipBookingModal
        isOpen={isVipBookingModalOpen}
        onClose={() => setIsVipBookingModalOpen(false)}
        lang={lang}
        initialTier={vipModalTier}
        initialRegion={vipModalRegion}
      />
    </div>
  );
}
