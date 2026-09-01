import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Instagram,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Clock,
  ExternalLink,
  X,
  CheckCircle2,
  SlidersHorizontal,
  Flower2,
  Scissors,
  Video,
  UtensilsCrossed,
  Award,
  Eye,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Edit3,
  Upload,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  ArrowLeft,
  Settings,
  Camera,
  Info,
  Loader2,
} from 'lucide-react';
import { Language, CuratedPartner } from '../types';
import { CURATED_PARTNERS as INITIAL_CURATED_PARTNERS, CONTACT_INFO } from '../data/weddingData';

interface CuratedPartnersSectionProps {
  lang: Language;
  onOpenConsultation?: () => void;
}

const STORAGE_KEY = 'FBW_CURATED_PARTNERS_V1';

export const CuratedPartnersSection: React.FC<CuratedPartnersSectionProps> = ({
  lang,
  onOpenConsultation,
}) => {
  // ─── Partners State with Multi-Key LocalStorage Persistence ───
  const [partners, setPartners] = useState<CuratedPartner[]>(() => {
    try {
      let baseList = INITIAL_CURATED_PARTNERS;
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          baseList = parsed;
        }
      }

      // Re-apply individual permanent keys for bulletproof persistence
      return baseList.map((partner) => {
        const individualPhoto = localStorage.getItem(`FBW_PARTNER_PHOTO_${partner.id}`);
        const individualGallery = localStorage.getItem(`FBW_PARTNER_GALLERY_${partner.id}`);
        let updated = { ...partner };
        if (individualPhoto) {
          updated.imageUrl = individualPhoto;
        }
        if (individualGallery) {
          try {
            const parsedGal = JSON.parse(individualGallery);
            if (Array.isArray(parsedGal) && parsedGal.length > 0) {
              updated.galleryImages = parsedGal;
            }
          } catch {}
        }
        return updated;
      });
    } catch (e) {
      console.warn('Failed to load custom partners from localStorage', e);
      return INITIAL_CURATED_PARTNERS;
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPartner, setSelectedPartner] = useState<CuratedPartner | null>(null);
  const [modalLookIndex, setModalLookIndex] = useState<number>(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<{ [partnerId: string]: number }>({});

  // ─── Admin / Interactive Editor State ───
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [editingPartner, setEditingPartner] = useState<CuratedPartner | null>(null);
  const [uploadTarget, setUploadTarget] = useState<{
    partnerId: string;
    mode: 'main' | 'gallery' | 'new-look';
  } | null>(null);
  const [saveToastMessage, setSaveToastMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Per-partner upload tracking state
  const [uploadingPartnerId, setUploadingPartnerId] = useState<string | null>(null);
  const [successPartnerId, setSuccessPartnerId] = useState<string | null>(null);

  // Card-specific file input refs
  const partnerFileInputRefs = useRef<{ [partnerId: string]: HTMLInputElement | null }>({});
  const partnerLookFileInputRefs = useRef<{ [partnerId: string]: HTMLInputElement | null }>({});

  // Global hidden file input ref fallback
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(partners));
    } catch (e) {
      console.warn('Failed to save partners data to localStorage', e);
    }
  }, [partners]);

  // Keep selectedPartner updated if partners array updates
  useEffect(() => {
    if (selectedPartner) {
      const updated = partners.find((p) => p.id === selectedPartner.id);
      if (updated) {
        setSelectedPartner(updated);
      }
    }
  }, [partners, selectedPartner?.id]);

  const showToast = (msg: string) => {
    setSaveToastMessage(msg);
    setTimeout(() => {
      setSaveToastMessage(null);
    }, 4500);
  };

  const categories = [
    {
      id: 'all',
      nameId: 'Semua Mitra',
      nameEn: 'All Artisans',
      icon: <SlidersHorizontal className="w-3.5 h-3.5" />,
    },
    {
      id: 'hair-styling',
      nameId: 'Tata Rambut VVIP',
      nameEn: 'VVIP Bridal Hair',
      icon: <Scissors className="w-3.5 h-3.5" />,
    },
    {
      id: 'floral',
      nameId: 'Haute Floristry',
      nameEn: 'Haute Floristry',
      icon: <Flower2 className="w-3.5 h-3.5" />,
    },
    {
      id: 'cinematography',
      nameId: 'Sinematografi',
      nameEn: 'Cinematography',
      icon: <Video className="w-3.5 h-3.5" />,
    },
    {
      id: 'gastronomy',
      nameId: 'Gastronomi',
      nameEn: 'Haute Gastronomy',
      icon: <UtensilsCrossed className="w-3.5 h-3.5" />,
    },
  ];

  const filteredPartners =
    activeCategory === 'all'
      ? partners
      : partners.filter((p) => p.category === activeCategory);

  // Generate WhatsApp Direct Concierge Booking link for specific partner
  const generatePartnerWhatsAppUrl = (partner: CuratedPartner, specificLookTitle?: string) => {
    const role = lang === 'ID' ? partner.roleId : partner.roleEn;
    const lookNote = specificLookTitle
      ? lang === 'ID'
        ? ` dengan referensi gaya "${specificLookTitle}"`
        : ` with look reference "${specificLookTitle}"`
      : '';
    const text =
      lang === 'ID'
        ? `Halo Aria, saya tertarik untuk menyertakan mitra resmi "${partner.name}" (${role})${lookNote} ke dalam perencanaan pernikahan mewah kami di Bali. Bisakah mohon konfirmasi ketersediaan jadwal dan opsi integrasi paketnya? Terima kasih.`
        : `Hello Aria, I am interested in including your official partner "${partner.name}" (${role})${lookNote} in our luxury Bali wedding celebration. Could you please check their calendar availability and package integration options? Thank you.`;
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleNextGallery = (partnerId: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveGalleryIndex((prev) => ({
      ...prev,
      [partnerId]: ((prev[partnerId] || 0) + 1) % totalImages,
    }));
  };

  const handlePrevGallery = (partnerId: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveGalleryIndex((prev) => ({
      ...prev,
      [partnerId]: ((prev[partnerId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const openLookbookModal = (partner: CuratedPartner, initialIndex = 0) => {
    setSelectedPartner(partner);
    setModalLookIndex(initialIndex);
  };

  // ─── Direct Partner Photo Upload Handler (FileReader Base64 Data URL) ───
  const handlePartnerPhotoUpload = (
    partnerId: string,
    mode: 'main' | 'gallery' | 'new-look',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError(
        lang === 'ID'
          ? 'Format file tidak valid. Harap pilih gambar (JPG, PNG, WebP).'
          : 'Invalid file format. Please select an image (JPG, PNG, WebP).'
      );
      e.target.value = '';
      return;
    }

    // Max 5MB for localStorage safety
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(
        lang === 'ID'
          ? 'Ukuran file terlalu besar (maksimal 5MB).'
          : 'File size too large (maximum 5MB allowed).'
      );
      e.target.value = '';
      return;
    }

    setUploadingPartnerId(partnerId);
    setUploadError(null);

    const reader = new FileReader();

    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (!base64Url) {
        setUploadingPartnerId(null);
        return;
      }

      setPartners((prev) =>
        prev.map((p) => {
          if (p.id !== partnerId) return p;

          if (mode === 'main') {
            return {
              ...p,
              imageUrl: base64Url,
            };
          } else if (mode === 'gallery') {
            return {
              ...p,
              galleryImages: [base64Url, ...(p.galleryImages || [])],
            };
          } else if (mode === 'new-look') {
            const currentLooks = p.portfolioLooks || [];
            const newLook = {
              titleId: `Koleksi Baru #${currentLooks.length + 1}`,
              titleEn: `Bespoke Look #${currentLooks.length + 1}`,
              styleId: 'Penataan editorial kustom yang diunggah oleh studio pengantin.',
              styleEn: 'Custom bespoke editorial styling uploaded by bridal studio.',
              imageUrl: base64Url,
            };
            return {
              ...p,
              galleryImages: [base64Url, ...(p.galleryImages || [])],
              portfolioLooks: [...currentLooks, newLook],
            };
          }
          return p;
        })
      );

      // Also update editingPartner if currently in editor modal
      if (editingPartner && editingPartner.id === partnerId) {
        if (mode === 'main') {
          setEditingPartner((prev) => (prev ? { ...prev, imageUrl: base64Url } : null));
        } else if (mode === 'gallery' || mode === 'new-look') {
          setEditingPartner((prev) =>
            prev
              ? {
                  ...prev,
                  galleryImages: [base64Url, ...(prev.galleryImages || [])],
                }
              : null
          );
        }
      }

      // Also save to individual permanent key for bulletproof storage
      if (mode === 'main') {
        try {
          localStorage.setItem(`FBW_PARTNER_PHOTO_${partnerId}`, base64Url);
        } catch {}
      }

      const targetPartner = partners.find((p) => p.id === partnerId);
      const partnerName = targetPartner ? targetPartner.name : 'Mitra';

      setUploadingPartnerId(null);
      setSuccessPartnerId(partnerId);
      showToast(
        lang === 'ID'
          ? `Foto portofolio "${partnerName}" berhasil diunggah & disimpan!`
          : `Portfolio photo for "${partnerName}" successfully uploaded & saved!`
      );

      setTimeout(() => {
        setSuccessPartnerId(null);
      }, 3500);

      setUploadTarget(null);
      setUploadError(null);
    };

    reader.onerror = () => {
      setUploadingPartnerId(null);
      setUploadError(
        lang === 'ID'
          ? 'Gagal memproses gambar. Silakan coba lagi.'
          : 'Failed to process image. Please try again.'
      );
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const triggerFileUpload = (
    partnerId: string,
    mode: 'main' | 'gallery' | 'new-look',
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    setUploadTarget({ partnerId, mode });
    setUploadError(null);

    if (mode === 'new-look' && partnerLookFileInputRefs.current[partnerId]) {
      partnerLookFileInputRefs.current[partnerId]?.click();
      return;
    }

    if (partnerFileInputRefs.current[partnerId]) {
      partnerFileInputRefs.current[partnerId]?.click();
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!uploadTarget) return;
    handlePartnerPhotoUpload(uploadTarget.partnerId, uploadTarget.mode, e);
  };

  // ─── Reset Data to Official Default ───
  const handleResetToDefault = () => {
    const confirmMsg =
      lang === 'ID'
        ? 'Apakah Anda yakin ingin mengembalikan seluruh katalog mitra artisan ke pengaturan awal studio?'
        : 'Are you sure you want to reset the artisan partner catalog to studio defaults?';

    if (window.confirm(confirmMsg)) {
      INITIAL_CURATED_PARTNERS.forEach((p) => {
        try {
          localStorage.removeItem(`FBW_PARTNER_PHOTO_${p.id}`);
          localStorage.removeItem(`FBW_PARTNER_GALLERY_${p.id}`);
        } catch {}
      });
      localStorage.removeItem(STORAGE_KEY);
      setPartners(INITIAL_CURATED_PARTNERS);
      showToast(
        lang === 'ID'
          ? 'Katalog mitra berhasil dikembalikan ke standar awal.'
          : 'Artisan catalog successfully restored to defaults.'
      );
    }
  };

  // ─── Save Editing Partner from Modal ───
  const handleSavePartnerEdits = () => {
    if (!editingPartner) return;

    setPartners((prev) =>
      prev.map((p) => (p.id === editingPartner.id ? editingPartner : p))
    );

    showToast(
      lang === 'ID'
        ? `Perubahan profil "${editingPartner.name}" berhasil disimpan!`
        : `Profile changes for "${editingPartner.name}" successfully saved!`
    );
    setEditingPartner(null);
  };

  return (
    <section
      id="partners"
      className="py-24 sm:py-32 bg-[#111816] text-[#FDFBF7] relative overflow-hidden border-t border-[#C9A96E]/20"
    >
      {/* Hidden File Input for Direct Local Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/jpg"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Ambient background accents */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[#1A2421] rounded-full blur-3xl pointer-events-none" />

      {/* Toast Notification */}
      {saveToastMessage && (
        <div
          id="partner-save-toast"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1A2421] border border-[#C9A96E] text-[#FDFBF7] px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-lg animate-bounce"
        >
          <div className="w-7 h-7 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm font-medium tracking-wide">{saveToastMessage}</p>
        </div>
      )}

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-900/90 text-white border border-red-500 px-5 py-3 rounded-lg shadow-xl text-xs flex items-center gap-3 backdrop-blur-md">
          <span>{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-white hover:text-red-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dynamic Back Navigation & Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-4 border-b border-white/10">
          {/* Dynamic Back Button */}
          <a
            id="btn-back-to-home-from-partners"
            href="#home"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1A2421] hover:bg-[#202d29] border border-white/10 hover:border-[#C9A96E]/50 text-xs text-[#D4CDC3] hover:text-[#C9A96E] transition-all duration-300 group shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C9A96E] group-hover:-translate-x-1 transition-transform" />
            <span>
              {lang === 'ID'
                ? '← Kembali ke Beranda & Direktori Utama'
                : '← Back to Home & Main Overview'}
            </span>
          </a>

          {/* Quick Admin / Studio Controls Toolbar */}
          <div className="flex items-center gap-2">
            {activeCategory !== 'all' && (
              <button
                type="button"
                id="btn-back-to-all-partners"
                onClick={() => setActiveCategory('all')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-medium hover:bg-[#C9A96E] hover:text-[#111816] transition-colors"
              >
                <span>{lang === 'ID' ? '← Kembali ke Semua Mitra' : '← Back to All Artisans'}</span>
              </button>
            )}

            <button
              type="button"
              id="toggle-partner-admin-mode-btn"
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isAdminMode
                  ? 'bg-[#C9A96E] text-[#111816] border-[#C9A96E] font-bold shadow-md'
                  : 'bg-[#1A2421] text-[#D4CDC3] border-white/10 hover:border-[#C9A96E]/40'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>
                {isAdminMode
                  ? lang === 'ID'
                    ? 'Mode Sunting Aktif'
                    : 'Edit Mode Active'
                  : lang === 'ID'
                  ? 'Panel Kontrol Mitra'
                  : 'Artisan Control Panel'}
              </span>
            </button>

            {isAdminMode && (
              <button
                type="button"
                id="reset-partners-default-btn"
                onClick={handleResetToDefault}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs transition-colors"
                title="Reset to Studio Defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {lang === 'ID' ? 'Reset Default' : 'Reset Defaults'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C9A96E]/40 bg-[#1A2421]/90 rounded-full mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'KURASI MITRA ARTISAN RESMI' : 'BESPOKE ARTISAN COLLECTIVE'}
            </span>
          </div>

          <h2
            id="curated-partners-title"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FDFBF7] font-light tracking-wide mb-6 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID'
              ? 'Mitra Artisan Terkurasi & Kolaborasi Resmi'
              : 'Curated Artisan Partners & Official Collaborations'}
          </h2>

          <div className="w-20 h-[1.5px] bg-[#C9A96E] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#D4CDC3] font-light max-w-2xl mx-auto leading-relaxed">
            {lang === 'ID'
              ? 'Forever Bali Weddings berkolaborasi secara eksklusif dengan para maestro artisan terkemuka berstandar internasional—memastikan mahakarya botani, penataan rambut tahan iklim tropis, sinema layar lebar, dan jamuan gastronomi Anda dieksekusi dengan presisi tanpa kompromi.'
              : 'Forever Bali Weddings proudly collaborates with an elite roster of internationally acclaimed master artisans—guaranteeing monumental botanical architecture, humidity-proof bridal hair artistry, feature-length cinematography, and Michelin-caliber dining tailored to your celebration.'}
          </p>

          {isAdminMode && (
            <div className="mt-4 p-3 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-xl max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-[#C9A96E]">
              <Info className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ID'
                  ? 'Mode Sunting Aktif: Anda dapat mengunggah foto lokal baru dan memperbarui profil Ayu Hairstylist, Cosma Florist, dan mitra lainnya.'
                  : 'Edit Mode Active: You can upload local photos and update profiles for Ayu Hairstylist, Cosma Florist, and other artisans.'}
              </span>
            </div>
          )}
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-partner-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A96E] text-[#111816] font-bold shadow-lg shadow-[#C9A96E]/20 scale-105'
                    : 'bg-[#1A2421]/80 text-[#D4CDC3] hover:text-white hover:bg-[#1A2421] border border-white/10'
                }`}
              >
                {cat.icon}
                <span>{lang === 'ID' ? cat.nameId : cat.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Partners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {filteredPartners.map((partner) => {
            const role = lang === 'ID' ? partner.roleId : partner.roleEn;
            const badge = lang === 'ID' ? partner.badgeId : partner.badgeEn;
            const tagline = lang === 'ID' ? partner.taglineId : partner.taglineEn;
            const description = lang === 'ID' ? partner.descriptionId : partner.descriptionEn;
            const specialty = lang === 'ID' ? partner.specialtyId : partner.specialtyEn;
            const features = lang === 'ID' ? partner.featuresId : partner.featuresEn;
            const leadTime = lang === 'ID' ? partner.leadTimeId : partner.leadTimeEn;

            const allImages = [partner.imageUrl, ...(partner.galleryImages || [])];
            const currentImgIdx = activeGalleryIndex[partner.id] || 0;
            const currentDisplayImg = allImages[currentImgIdx] || partner.imageUrl;

            // Highlight priority partners (Ayu Hairstylist & Cosma Florist)
            const isFeaturedCustomizable =
              partner.id === 'ayu-hairstylist' || partner.id === 'cosma-florist';

            return (
              <div
                key={partner.id}
                id={`partner-card-${partner.id}`}
                className={`bg-[#1A2421] rounded-xl border transition-all duration-500 overflow-hidden flex flex-col group relative shadow-2xl ${
                  partner.isOfficialPartner
                    ? 'border-[#C9A96E]/50 shadow-[#C9A96E]/5 ring-1 ring-[#C9A96E]/30'
                    : 'border-white/10 hover:border-[#C9A96E]/40'
                }`}
              >
                {/* Visual Image Header with Gallery Carousel */}
                <div
                  className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/60 cursor-pointer"
                  onClick={() => openLookbookModal(partner, currentImgIdx)}
                >
                  <img
                    src={currentDisplayImg}
                    alt={partner.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421] via-transparent to-black/50" />

                  {/* Official Partner Badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111816]/90 backdrop-blur-md border border-[#C9A96E] text-[#C9A96E] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] rounded-full shadow-md">
                      <Award className="w-3.5 h-3.5" />
                      {badge}
                    </span>
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-[#D4CDC3] text-[10px] font-mono rounded-full">
                      {partner.pricingIndicator}
                    </span>
                  </div>

                  {/* Top Right Actions: Instagram Link + Fast Photo Upload */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    {/* Unique Hidden File Input for Main Cover Image */}
                    <input
                      ref={(el) => (partnerFileInputRefs.current[partner.id] = el)}
                      id={`partner-file-input-${partner.id}`}
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/jpg"
                      onChange={(e) => handlePartnerPhotoUpload(partner.id, 'main', e)}
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Unique Hidden File Input for Adding New Look */}
                    <input
                      ref={(el) => (partnerLookFileInputRefs.current[partner.id] = el)}
                      id={`partner-look-file-input-${partner.id}`}
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/jpg"
                      onChange={(e) => handlePartnerPhotoUpload(partner.id, 'new-look', e)}
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Direct Local Upload Button (Always accessible or on Admin mode) */}
                    {(isAdminMode || isFeaturedCustomizable) && (
                      <button
                        type="button"
                        id={`btn-upload-photo-${partner.id}`}
                        disabled={uploadingPartnerId === partner.id}
                        onClick={(e) => triggerFileUpload(partner.id, 'main', e)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A96E] hover:bg-[#b5955a] disabled:opacity-60 text-[#111816] font-bold text-[11px] rounded-full backdrop-blur-md shadow-lg transition-all hover:scale-105 cursor-pointer"
                        title={lang === 'ID' ? 'Unggah Foto Utama Baru' : 'Upload New Cover Photo'}
                      >
                        {uploadingPartnerId === partner.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>{lang === 'ID' ? 'Memproses...' : 'Uploading...'}</span>
                          </>
                        ) : successPartnerId === partner.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-900" />
                            <span>{lang === 'ID' ? 'Tersimpan!' : 'Saved!'}</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>
                              {lang === 'ID' ? 'Upload Foto' : 'Upload'}
                            </span>
                          </>
                        )}
                      </button>
                    )}

                    {/* Instagram Quick Link on Image */}
                    <a
                      href={partner.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#833AB4]/80 via-[#FD1D1D]/80 to-[#F56040]/80 hover:from-[#833AB4] hover:to-[#F56040] text-white text-[11px] font-semibold tracking-wider rounded-full backdrop-blur-md border border-white/30 shadow-lg transition-all duration-300 hover:scale-105 group/ig"
                      title={`Visit ${partner.instagramHandle} on Instagram`}
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>{partner.instagramHandle}</span>
                      <ExternalLink className="w-3 h-3 opacity-70 group-hover/ig:opacity-100" />
                    </a>
                  </div>

                  {/* Lookbook Badge Trigger */}
                  <div className="absolute top-16 right-4 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/70 hover:bg-[#C9A96E] hover:text-[#111816] text-[#FDFBF7] text-[10px] uppercase font-bold tracking-widest rounded-md backdrop-blur-md border border-white/20 transition-all shadow">
                      <Eye className="w-3 h-3" />
                      <span>{lang === 'ID' ? 'Buka Lookbook' : 'View Lookbook'}</span>
                    </span>
                  </div>

                  {/* Carousel Indicators & Controls if multiple images */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                      <button
                        type="button"
                        onClick={(e) => handlePrevGallery(partner.id, allImages.length, e)}
                        className="w-7 h-7 rounded-full bg-black/60 hover:bg-[#C9A96E] hover:text-[#111816] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-colors text-xs"
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <span className="text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                        {currentImgIdx + 1}/{allImages.length}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleNextGallery(partner.id, allImages.length, e)}
                        className="w-7 h-7 rounded-full bg-black/60 hover:bg-[#C9A96E] hover:text-[#111816] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-colors text-xs"
                        aria-label="Next image"
                      >
                        ›
                      </button>
                    </div>
                  )}

                  {/* Partner Name Overlay at Bottom of Image */}
                  <div className="absolute bottom-4 left-4 right-20 z-10">
                    <h3
                      className="text-2xl sm:text-3xl font-serif font-light text-[#FDFBF7] tracking-wide drop-shadow-md"
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    >
                      {partner.name}
                    </h3>
                    <p className="text-xs text-[#C9A96E] font-medium tracking-wider uppercase mt-0.5">
                      {role}
                    </p>
                  </div>
                </div>

                {/* Quick Thumbnail Strip for Multi-Image Artisans (e.g., Ayu Hairstylist & Cosma Florist) */}
                {allImages.length > 1 && (
                  <div className="px-6 pt-3 pb-2 bg-[#151e1b] border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none">
                    <span className="text-[10px] text-[#C9A96E] uppercase font-bold tracking-widest shrink-0 mr-1 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      {lang === 'ID' ? 'Koleksi Karya:' : 'Looks:'}
                    </span>
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActiveGalleryIndex((prev) => ({ ...prev, [partner.id]: idx }));
                        }}
                        className={`w-10 h-10 rounded-md overflow-hidden border-2 shrink-0 transition-all ${
                          currentImgIdx === idx
                            ? 'border-[#C9A96E] scale-105 shadow-md'
                            : 'border-white/20 opacity-60 hover:opacity-100'
                        }`}
                        title={`Lihat karya ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${partner.name} look ${idx + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}

                    {/* Quick Add Look Photo Button */}
                    {(isAdminMode || isFeaturedCustomizable) && (
                      <button
                        type="button"
                        onClick={(e) => triggerFileUpload(partner.id, 'new-look', e)}
                        className="w-10 h-10 rounded-md border-2 border-dashed border-[#C9A96E]/50 hover:border-[#C9A96E] bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] flex flex-col items-center justify-center shrink-0 transition-all text-[9px] font-bold"
                        title={lang === 'ID' ? 'Tambah Foto Karya Baru' : 'Add New Portfolio Photo'}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => openLookbookModal(partner, currentImgIdx)}
                      className="text-[11px] text-[#C9A96E] hover:text-white underline ml-auto shrink-0 font-medium cursor-pointer"
                    >
                      {lang === 'ID' ? 'Perbesar Galeri →' : 'Expand Gallery →'}
                    </button>
                  </div>
                )}

                {/* Partner Card Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  {/* Tagline & Description */}
                  <div>
                    <div className="p-3 bg-[#111816]/70 rounded-lg border border-white/5 mb-4">
                      <p className="text-xs sm:text-[13px] font-serif italic text-[#E5DFD5] leading-snug">
                        "{tagline}"
                      </p>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#D4CDC3] font-light leading-relaxed mb-4">
                      {description}
                    </p>

                    {/* Signature Specialty Pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-md text-xs text-[#C9A96E] font-medium mb-6 w-full">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">
                        <strong className="text-white">
                          {lang === 'ID' ? 'Spesialisasi Utama:' : 'Key Specialty:'}
                        </strong>{' '}
                        {specialty}
                      </span>
                    </div>

                    {/* Key Technical Features / Deliverables */}
                    <div className="space-y-2.5 mb-6">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]/90 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {lang === 'ID'
                          ? 'Keunggulan & Standar Eksekusi'
                          : 'Bespoke Capabilities & Standards'}
                      </h4>
                      <ul className="space-y-2">
                        {features.slice(0, 4).map((feat, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-[#E5DFD5] font-light"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Lead Time & Availability Notice */}
                    <div className="flex items-center gap-2 text-[11px] text-[#D4CDC3]/80 bg-black/30 px-3 py-2 rounded-md border border-white/5">
                      <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                      <span>
                        <strong>{lang === 'ID' ? 'Lead Time:' : 'Availability:'}</strong>{' '}
                        {leadTime}
                      </span>
                    </div>
                  </div>

                  {/* Inline Admin Edit Controls Bar on Card */}
                  {(isAdminMode || isFeaturedCustomizable) && (
                    <div className="p-3 bg-[#111816] rounded-lg border border-[#C9A96E]/30 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-[#C9A96E]">
                        <Settings className="w-3.5 h-3.5" />
                        <span className="font-semibold">
                          {lang === 'ID' ? 'Kontrol Artisan' : 'Artisan Controls'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          id={`btn-edit-partner-${partner.id}`}
                          onClick={() => setEditingPartner({ ...partner })}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#C9A96E]/20 hover:bg-[#C9A96E] text-[#C9A96E] hover:text-[#111816] border border-[#C9A96E]/40 rounded-md text-xs font-semibold transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{lang === 'ID' ? 'Sunting Data' : 'Edit Details'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => triggerFileUpload(partner.id, 'main', e)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-black/50 hover:bg-[#C9A96E]/30 text-white border border-white/20 rounded-md text-xs transition-all"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#C9A96E]" />
                          <span>{lang === 'ID' ? 'Ganti Foto' : 'Change Photo'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Interactive Dual Action Buttons */}
                  <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Direct Instagram Profile Link */}
                    <a
                      id={`partner-ig-btn-${partner.id}`}
                      href={partner.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#111816] hover:bg-[#202c28] text-white border border-white/20 hover:border-[#C9A96E] rounded-md text-xs font-semibold tracking-wider transition-all duration-300 group/link shadow-sm"
                    >
                      <Instagram className="w-4 h-4 text-[#E1306C] group-hover/link:scale-110 transition-transform" />
                      <span>{partner.instagramHandle}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                    </a>

                    {/* Direct Concierge WhatsApp Routing Button */}
                    <a
                      id={`partner-book-btn-${partner.id}`}
                      href={generatePartnerWhatsAppUrl(partner)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] font-bold rounded-md text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>
                        {lang === 'ID' ? 'Pesan Lewat Konsier' : 'Inquire via Concierge'}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Forever Bali Curation Standard - 4 Pillars Banner */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#1A2421] via-[#151e1b] to-[#1A2421] border border-[#C9A96E]/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center mb-10">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'STANDAR MUTU FOREVER BALI' : 'THE FOREVER BALI CURATION STANDARD'}
            </span>
            <h3
              className="text-2xl sm:text-3xl font-serif text-[#FDFBF7] font-light mt-2 mb-4"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {lang === 'ID'
                ? 'Mengapa Kami Mengurasi Artisan Terbaik Secara Eksklusif?'
                : 'Why We Curate Only Proven Master Artisans?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#D4CDC3] font-light leading-relaxed max-w-2xl mx-auto">
              {lang === 'ID'
                ? 'Pernikahan destinasi mewah di Bali menuntut keahlian khusus terhadap terik matahari tropis, angin tebing samudera, dan protokol Banjar lokal. Mitra kami melewati uji ketahanan performa tinggi dan sinkronisasi logistik 100% bersama tim sutradara kami.'
                : 'Luxury destination weddings in Bali demand specialized mastery over coastal winds, tropical humidity, and intricate Banjar village protocols. Our official partners are hand-vetted for technical excellence and fully synchronized with our on-site directorial team.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="p-5 rounded-xl bg-black/40 border border-white/10 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/40 text-[#C9A96E] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                {lang === 'ID' ? 'Uji Ketahanan Tropis' : 'Tropical Resilience'}
              </h4>
              <p className="text-[11px] text-[#D4CDC3] font-light leading-relaxed">
                {lang === 'ID'
                  ? 'Bunga segar tahan dehidrasi & styling rambut anti-kelembapan selama 16 jam penuh.'
                  : 'Dehydration-proof floristry & 16-hour humidity-resistant bridal hair anchoring.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/10 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/40 text-[#C9A96E] flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                {lang === 'ID' ? 'Supervisi Sutradara' : 'Directorial Oversight'}
              </h4>
              <p className="text-[11px] text-[#D4CDC3] font-light leading-relaxed">
                {lang === 'ID'
                  ? 'Seluruh artisan dipandu langsung oleh Wedding Director untuk keselarasan konsep.'
                  : 'Seamless aesthetic alignment directed directly by Aria & Senior Producers.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/10 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/40 text-[#C9A96E] flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                {lang === 'ID' ? 'Kunci Jadwal Prioritas' : 'Priority Calendar Lock'}
              </h4>
              <p className="text-[11px] text-[#D4CDC3] font-light leading-relaxed">
                {lang === 'ID'
                  ? 'Akses eksklusif ke slot terbatas kalender artisan favorit tanpa antrean publik.'
                  : 'Guaranteed priority allocation on limited high-demand wedding weekend dates.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/10 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/40 text-[#C9A96E] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                {lang === 'ID' ? 'Faktur Terintegrasi' : 'Unified Billing'}
              </h4>
              <p className="text-[11px] text-[#D4CDC3] font-light leading-relaxed">
                {lang === 'ID'
                  ? 'Satu pintu administrasi kontrak, pembayaran escrow, dan jaminan asuransi vendor.'
                  : 'Single transparent contract, secure escrow handling, and vendor liability coverage.'}
              </p>
            </div>
          </div>

          {/* Bottom Concierge Fast-Track Action */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
            <div>
              <h4 className="text-sm font-serif text-white font-medium">
                {lang === 'ID'
                  ? 'Ingin Menyesuaikan Tim Vendor Khusus untuk Konsep Anda?'
                  : 'Looking for a Custom Tailored Artisan Lineup?'}
              </h4>
              <p className="text-xs text-[#D4CDC3] font-light">
                {lang === 'ID'
                  ? 'Diskusikan moodboard dekorasi dan referensi gaya rambut Anda bersama Aria.'
                  : 'Share your floral moodboard and bridal styling references directly with Aria.'}
              </p>
            </div>

            <a
              id="partners-talk-aria-cta"
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                lang === 'ID'
                  ? 'Halo Aria, saya ingin berkonsultasi mengenai kolaborasi mitra artisan (Cosma Florist, Ayu Hairstylist, dsb) untuk konsep pernikahan kami.'
                  : 'Hello Aria, I would like to consult regarding artisan partner collaborations (Cosma Florist, Ayu Hairstylist, etc.) for our wedding concept.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] font-bold text-xs uppercase tracking-wider rounded-md transition-all duration-300 shadow-md shrink-0 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{lang === 'ID' ? 'Konsultasi Tim Artisan' : 'Consult Artisan Team'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── High-Fashion VIP Lookbook & Portfolio Modal with Dynamic Back Button ─── */}
      {selectedPartner && (
        <div
          id="partner-lookbook-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPartner(null)}
        >
          <div
            className="bg-[#151e1b] border border-[#C9A96E]/40 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Navigation Bar with Dynamic Back Button */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#111816]">
              <div className="flex items-center gap-3">
                {/* Dynamic Back Button */}
                <button
                  type="button"
                  id="btn-back-from-lookbook-modal"
                  onClick={() => setSelectedPartner(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A2421] hover:bg-[#C9A96E] hover:text-[#111816] border border-white/10 text-xs text-[#D4CDC3] transition-all cursor-pointer font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ID'
                      ? '← Kembali ke Katalog Mitra'
                      : '← Back to Artisan Catalog'}
                  </span>
                </button>

                <div className="hidden sm:block h-5 w-[1px] bg-white/10" />

                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm font-serif font-light text-white">
                    {selectedPartner.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30">
                    {lang === 'ID' ? selectedPartner.badgeId : selectedPartner.badgeEn}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Add Look & Close */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-modal-upload-look"
                  onClick={(e) => triggerFileUpload(selectedPartner.id, 'new-look', e)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#C9A96E]/20 hover:bg-[#C9A96E] text-[#C9A96E] hover:text-[#111816] border border-[#C9A96E]/40 rounded-lg text-xs font-medium transition-all"
                  title="Upload New Look"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {lang === 'ID' ? '+ Unggah Foto Baru' : '+ Upload New Look'}
                  </span>
                </button>

                <button
                  id="close-lookbook-modal-btn"
                  type="button"
                  onClick={() => setSelectedPartner(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C9A96E] hover:text-[#111816] text-white flex items-center justify-center transition-colors text-sm"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body with Large Image Preview and Look Details */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Main Photo Stage */}
              <div className="md:col-span-7 flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] max-h-[460px] rounded-xl overflow-hidden bg-black/50 border border-white/10 shadow-lg group">
                  {(() => {
                    const allModalImages = [
                      selectedPartner.imageUrl,
                      ...(selectedPartner.galleryImages || []),
                    ];
                    const activeImg = allModalImages[modalLookIndex] || selectedPartner.imageUrl;
                    return (
                      <>
                        <img
                          src={activeImg}
                          alt={`${selectedPartner.name} look ${modalLookIndex + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Navigation Arrows */}
                        {allModalImages.length > 1 && (
                          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-auto">
                            <button
                              type="button"
                              onClick={() =>
                                setModalLookIndex(
                                  (prev) => (prev - 1 + allModalImages.length) % allModalImages.length
                                )
                              }
                              className="w-8 h-8 rounded-full bg-black/70 hover:bg-[#C9A96E] hover:text-[#111816] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all text-sm shadow-md"
                              aria-label="Previous look"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setModalLookIndex((prev) => (prev + 1) % allModalImages.length)
                              }
                              className="w-8 h-8 rounded-full bg-black/70 hover:bg-[#C9A96E] hover:text-[#111816] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all text-sm shadow-md"
                              aria-label="Next look"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {/* Look Counter Badge */}
                        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md border border-white/20 text-[#D4CDC3] text-[11px] font-mono px-2.5 py-1 rounded-md">
                          {modalLookIndex + 1} / {allModalImages.length}{' '}
                          {lang === 'ID' ? 'Karya Editorial' : 'Editorial Looks'}
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Thumbnails Row */}
                {(() => {
                  const allModalImages = [
                    selectedPartner.imageUrl,
                    ...(selectedPartner.galleryImages || []),
                  ];
                  return (
                    <div className="flex items-center gap-2 mt-3 overflow-x-auto max-w-full pb-1">
                      {allModalImages.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setModalLookIndex(idx)}
                          className={`w-12 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                            modalLookIndex === idx
                              ? 'border-[#C9A96E] ring-2 ring-[#C9A96E]/40 scale-105'
                              : 'border-white/20 opacity-50 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}

                      {/* Add Image directly from Lookbook thumbnail strip */}
                      <button
                        type="button"
                        onClick={(e) => triggerFileUpload(selectedPartner.id, 'new-look', e)}
                        className="w-12 h-14 rounded-lg border-2 border-dashed border-[#C9A96E]/50 hover:border-[#C9A96E] bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] flex flex-col items-center justify-center shrink-0 transition-all text-[10px]"
                        title={lang === 'ID' ? 'Tambah Foto Karya' : 'Add Photo'}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Upload</span>
                      </button>
                    </div>
                  );
                })()}
              </div>

              {/* Look Details & Booking Actions */}
              <div className="md:col-span-5 space-y-4 text-left">
                {(() => {
                  const looks = selectedPartner.portfolioLooks || [];
                  const activeLook = looks[modalLookIndex];
                  const currentLookTitle =
                    activeLook
                      ? lang === 'ID'
                        ? activeLook.titleId
                        : activeLook.titleEn
                      : `${selectedPartner.name} Look #${modalLookIndex + 1}`;
                  const currentLookStyle =
                    activeLook
                      ? lang === 'ID'
                        ? activeLook.styleId
                        : activeLook.styleEn
                      : lang === 'ID'
                      ? selectedPartner.specialtyId
                      : selectedPartner.specialtyEn;

                  return (
                    <>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A96E]">
                          {lang === 'ID' ? 'KURASI GAYA & DIREKSI' : 'STYLING DIRECTION & ESSENCE'}
                        </span>
                        <h4
                          className="text-xl sm:text-2xl font-serif text-white font-normal mt-1 mb-2"
                          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                        >
                          {currentLookTitle}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-[#D4CDC3] leading-relaxed font-light">
                          {currentLookStyle}
                        </p>
                      </div>

                      {/* Technical Standards Box */}
                      <div className="p-3.5 rounded-lg bg-[#111816] border border-white/10 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A96E]">
                          <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                          <span>
                            {lang === 'ID'
                              ? 'Ketahanan Iklim Tropis & Angin Tebing'
                              : 'Ocean-Breeze & Tropical Longevity Barrier'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#E5DFD5]/90 font-light leading-relaxed">
                          {lang === 'ID'
                            ? 'Diformulasikan khusus untuk menjaga tekstur bervolume tetap rapi dari seremoni siang hingga after-party malam tanpa kusut.'
                            : 'Engineered with humidity-resistant locking techniques ensuring styles stay flawless from midday vows to late-night celebrations.'}
                        </p>
                      </div>

                      {/* Deliverables / Features List */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#C9A96E]">
                          {lang === 'ID' ? 'Fasilitas Termasuk' : 'Included Amenities'}
                        </span>
                        <ul className="space-y-1 text-xs text-[#D4CDC3] font-light">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                            <span>
                              {lang === 'ID'
                                ? 'Sesi trial / mock-up eksklusif pra-acara'
                                : 'Exclusive pre-event bridal trial / mockup'}
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                            <span>
                              {lang === 'ID'
                                ? 'Pendampingan on-site touchup terkoordinasi'
                                : 'Dedicated on-site touchup escort'}
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                            <span>
                              {lang === 'ID'
                                ? 'Integrasi ornamen couture & flora presisi'
                                : 'Precision couture & organic flora anchoring'}
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Direct Booking via Concierge CTA */}
                      <div className="pt-2 space-y-2">
                        <a
                          id="modal-book-look-wa-btn"
                          href={generatePartnerWhatsAppUrl(selectedPartner, currentLookTitle)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] font-bold text-xs uppercase tracking-wider rounded-md transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                          <span>
                            {lang === 'ID'
                              ? `Pesan Referensi Ini via Konsier`
                              : `Reserve This Look via Concierge`}
                          </span>
                        </a>

                        <a
                          href={selectedPartner.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-black/40 hover:bg-black/70 text-white border border-white/20 rounded-md text-xs transition-colors"
                        >
                          <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                          <span>{selectedPartner.instagramHandle}</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── VVIP Artisan Profile & Content Editor Modal ─── */}
      {editingPartner && (
        <div
          id="partner-editor-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setEditingPartner(null)}
        >
          <div
            className="bg-[#151e1b] border border-[#C9A96E]/50 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Editor Header with Dynamic Back Button */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#111816]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPartner(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A2421] hover:bg-[#C9A96E] hover:text-[#111816] border border-white/10 text-xs text-[#D4CDC3] transition-all cursor-pointer font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ID'
                      ? '← Kembali ke Profil Mitra'
                      : '← Back to Artisan Profile'}
                  </span>
                </button>
                <div className="hidden sm:block h-5 w-[1px] bg-white/10" />
                <h3 className="text-base sm:text-lg font-serif font-light text-white">
                  {lang === 'ID' ? 'Sunting Data Mitra' : 'Edit Artisan Profile'}:{' '}
                  <span className="text-[#C9A96E]">{editingPartner.name}</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setEditingPartner(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C9A96E] hover:text-[#111816] text-white flex items-center justify-center text-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Editor Form Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs text-[#D4CDC3]">
              {/* Photo Preview & Direct Upload Banner */}
              <div className="p-4 bg-[#111816] rounded-xl border border-white/10 flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={editingPartner.imageUrl}
                  alt={editingPartner.name}
                  className="w-24 h-24 object-cover rounded-lg border border-[#C9A96E]"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-sm font-serif text-white font-medium mb-1">
                    {lang === 'ID' ? 'Foto Utama Profil' : 'Cover Profile Photo'}
                  </h4>
                  <p className="text-[11px] text-[#D4CDC3] mb-3">
                    {lang === 'ID'
                      ? 'Pilih foto beresolusi tinggi dari perangkat Anda untuk mengganti foto utama.'
                      : 'Select a high-resolution image from your local device to replace cover photo.'}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => triggerFileUpload(editingPartner.id, 'main', e)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A96E] hover:bg-[#b8985d] text-[#111816] font-bold rounded-md text-xs transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{lang === 'ID' ? 'Pilih Gambar Lokal' : 'Choose Local Image'}</span>
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#C9A96E] mb-1">
                    {lang === 'ID' ? 'Nama Mitra / Artisan' : 'Artisan Name'}
                  </label>
                  <input
                    type="text"
                    value={editingPartner.name}
                    onChange={(e) =>
                      setEditingPartner({ ...editingPartner, name: e.target.value })
                    }
                    className="w-full bg-[#111816] border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#C9A96E] mb-1">
                    {lang === 'ID' ? 'Username Instagram' : 'Instagram Handle'}
                  </label>
                  <input
                    type="text"
                    value={editingPartner.instagramHandle}
                    onChange={(e) =>
                      setEditingPartner({ ...editingPartner, instagramHandle: e.target.value })
                    }
                    className="w-full bg-[#111816] border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#C9A96E] mb-1">
                    {lang === 'ID' ? 'Peran / Role (Indonesia)' : 'Role Title (ID)'}
                  </label>
                  <input
                    type="text"
                    value={editingPartner.roleId}
                    onChange={(e) =>
                      setEditingPartner({ ...editingPartner, roleId: e.target.value })
                    }
                    className="w-full bg-[#111816] border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#C9A96E] mb-1">
                    {lang === 'ID' ? 'Peran / Role (English)' : 'Role Title (EN)'}
                  </label>
                  <input
                    type="text"
                    value={editingPartner.roleEn}
                    onChange={(e) =>
                      setEditingPartner({ ...editingPartner, roleEn: e.target.value })
                    }
                    className="w-full bg-[#111816] border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#C9A96E] mb-1">
                    {lang === 'ID' ? 'Tagline (Indonesia)' : 'Tagline (ID)'}
                  </label>
                  <input
                    type="text"
                    value={editingPartner.taglineId}
                    onChange={(e) =>
                      setEditingPartner({ ...editingPartner, taglineId: e.target.value })
                    }
                    className="w-full bg-[#111816] border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#C9A96E] mb-1">
                    {lang === 'ID' ? 'Tagline (English)' : 'Tagline (EN)'}
                  </label>
                  <input
                    type="text"
                    value={editingPartner.taglineEn}
                    onChange={(e) =>
                      setEditingPartner({ ...editingPartner, taglineEn: e.target.value })
                    }
                    className="w-full bg-[#111816] border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#C9A96E] mb-1">
                  {lang === 'ID' ? 'Deskripsi Lengkap (Indonesia)' : 'Full Description (ID)'}
                </label>
                <textarea
                  rows={3}
                  value={editingPartner.descriptionId}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, descriptionId: e.target.value })
                  }
                  className="w-full bg-[#111816] border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#C9A96E] mb-1">
                  {lang === 'ID' ? 'Deskripsi Lengkap (English)' : 'Full Description (EN)'}
                </label>
                <textarea
                  rows={3}
                  value={editingPartner.descriptionEn}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, descriptionEn: e.target.value })
                  }
                  className="w-full bg-[#111816] border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#C9A96E] mb-1">
                    {lang === 'ID' ? 'Spesialisasi Utama (ID)' : 'Key Specialty (ID)'}
                  </label>
                  <input
                    type="text"
                    value={editingPartner.specialtyId}
                    onChange={(e) =>
                      setEditingPartner({ ...editingPartner, specialtyId: e.target.value })
                    }
                    className="w-full bg-[#111816] border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#C9A96E] mb-1">
                    {lang === 'ID' ? 'Spesialisasi Utama (EN)' : 'Key Specialty (EN)'}
                  </label>
                  <input
                    type="text"
                    value={editingPartner.specialtyEn}
                    onChange={(e) =>
                      setEditingPartner({ ...editingPartner, specialtyEn: e.target.value })
                    }
                    className="w-full bg-[#111816] border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
              </div>
            </div>

            {/* Editor Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-white/10 flex items-center justify-between bg-[#111816]">
              <button
                type="button"
                onClick={() => setEditingPartner(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs"
              >
                {lang === 'ID' ? 'Batal' : 'Cancel'}
              </button>

              <button
                type="button"
                id="btn-save-partner-edits"
                onClick={handleSavePartnerEdits}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#C9A96E] hover:bg-[#b8985d] text-[#111816] font-bold rounded-md text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                <Check className="w-4 h-4" />
                <span>{lang === 'ID' ? 'Simpan Perubahan' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
