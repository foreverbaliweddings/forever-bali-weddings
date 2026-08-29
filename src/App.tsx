import React, { useState } from 'react';
import { Language } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PackagesSection } from './components/PackagesSection';
import { VenuesSection } from './components/VenuesSection';
import { NusantaraHeritageSection } from './components/NusantaraHeritageSection';
import { ComprehensiveServicesSection } from './components/ComprehensiveServicesSection';
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

export default function App() {
  const [lang, setLang] = useState<Language>('ID');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const handleToggleLang = (newLang: Language) => {
    setLang(newLang);
  };

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
  };

  const handleClearSelectedPackage = () => {
    setSelectedPackage('');
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

      {/* Page 2: Bespoke Hospitality - About Our Studio */}
      <AboutSection lang={lang} />

      {/* Pages 3, 4, 5: Curated Luxury Packages (Essential, Artisan, Signature Elite) */}
      <PackagesSection
        lang={lang}
        onSelectPackage={handleSelectPackage}
      />

      {/* Interactive Venues & Locations Section */}
      <VenuesSection lang={lang} />

      {/* Curated Off-Market Private Sanctuaries Catalog */}
      <VenueCatalog lang={lang} />

      {/* Interactive Wedding Investment Estimator */}
      <BudgetEstimatorSection lang={lang} onLockEstimate={handleLockEstimate} />

      {/* Page 6: Cultural Reverence - Nusantara Heritage */}
      <NusantaraHeritageSection lang={lang} />

      {/* Page 7: 360-Degree Execution - Comprehensive Services */}
      <ComprehensiveServicesSection lang={lang} />

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

      {/* Page 12: Begin Your Forever - Contact & Consultation Inquiries */}
      <ContactSection
        lang={lang}
        selectedPackage={selectedPackage}
        onClearSelectedPackage={handleClearSelectedPackage}
      />

      {/* Page 13: Main Footer & Official Social Channels */}
      <Footer lang={lang} />

      {/* Floating Instant WhatsApp Button */}
      <FloatingWhatsApp lang={lang} />

      {/* Floating Subtle Wedding Guide Banner */}
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
    </div>
  );
}
