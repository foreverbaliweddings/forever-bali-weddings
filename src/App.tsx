<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PackagesPage from './pages/PackagesPage';
import VenuesPage from './pages/VenuesPage';
import GalleryPage from './pages/GalleryPage';
import RealWeddingsPage from './pages/RealWeddingsPage';
import ServicesPage from './pages/ServicesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/real-weddings" element={<RealWeddingsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
      </Route>
    </Routes>
=======
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

export default function App() {
  const [lang, setLang] = useState<Language>('ID');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const handleToggleLang = (newLang: Language) => {
    setLang(newLang);
  };

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
  };

  const handleClearSelectedPackage = () => {
    setSelectedPackage('');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#222222] font-sans selection:bg-[#C9A96E]/25 selection:text-[#222222]">
      {/* 1. Header & Navigation */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
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

      {/* Interactive Wedding Investment Estimator */}
      <BudgetEstimatorSection lang={lang} />

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

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        lang={lang}
      />
    </div>
>>>>>>> 4404c756fcd28fd93b2537d150df3e179057717b
  );
}
