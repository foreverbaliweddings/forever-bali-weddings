import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Award,
  Crown,
  Camera,
  Calendar,
  MessageCircle,
  Mail,
  Instagram,
  Edit3,
  Upload,
  Check,
  RotateCcw,
  X,
  Plus,
  Trash2,
  SlidersHorizontal,
  ArrowUpRight,
  ShieldCheck,
  HeartHandshake,
  Briefcase,
  Users,
  Compass,
  FileCheck2,
  Info,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ImageIcon,
} from 'lucide-react';
import { Language, TeamMember } from '../types';
import { INITIAL_TEAM_MEMBERS, CONTACT_INFO } from '../data/weddingData';
import {
  uploadTeamMemberPhotoToSupabase,
  optimizeImageFile,
  resetAllTeamMembersInSupabase,
  resetTeamMemberPhotoInSupabase,
  subscribeTeamMembersFromSupabase,
  fetchTeamMembersFromSupabase,
  runSupabaseDiagnostics,
  SupabaseDiagnosticReport,
  supabaseUrl,
  isSupabaseConfigured,
  TeamMemberCloudRecord,
  UploadPhotoState,
} from '../lib/supabase';

interface TeamPageProps {
  lang: Language;
  onOpenConsultation?: () => void;
}

const STORAGE_KEY = 'FBW_TEAM_MEMBERS_V1';

export const TeamPage: React.FC<TeamPageProps> = ({ lang, onOpenConsultation }) => {
  // ─── Team State with Exact Lazy State Initialization from LocalStorage ───
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return INITIAL_TEAM_MEMBERS.map((initialMember, idx) => {
            const matching = parsed.find((p: any) => p.id === initialMember.id) || parsed[idx];
            if (
              matching &&
              matching.imageUrl &&
              typeof matching.imageUrl === 'string' &&
              matching.imageUrl.trim().length > 10
            ) {
              return {
                ...initialMember,
                ...matching,
                imageUrl: matching.imageUrl,
              };
            }
            return initialMember;
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TEAM_MEMBERS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [saveToastMessage, setSaveToastMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Pending Photo Preview State (Before saving to Supabase)
  const [pendingPhoto, setPendingPhoto] = useState<{
    memberId: string;
    memberName: string;
    originalFile: File;
    optimizedBlob: Blob;
    previewUrl: string;
    currentPhotoUrl: string;
    originalSize: number;
    optimizedSize: number;
    reductionPercent: number;
    format: 'webp' | 'jpeg';
  } | null>(null);

  const [uploadStatus, setUploadStatus] = useState<UploadPhotoState>('idle');
  const [diagnostics, setDiagnostics] = useState<SupabaseDiagnosticReport | null>(null);

  // Per-member upload status states
  const [uploadingMemberId, setUploadingMemberId] = useState<string | null>(null);
  const [successMemberId, setSuccessMemberId] = useState<string | null>(null);

  // Dedicated Map of file input refs per member ID
  const fileInputRefs = useRef<{ [memberId: string]: HTMLInputElement | null }>({});

  // ─── Real-time Supabase Cloud Subscription ───
  useEffect(() => {
    // 1. Initial Cloud Fetch from Supabase
    fetchTeamMembersFromSupabase().then((cloudData) => {
      if (cloudData && Object.keys(cloudData).length > 0) {
        applyCloudPhotos(cloudData);
      }
    });

    // 2. Real-time Subscription to Supabase team_members table
    const unsubscribe = subscribeTeamMembersFromSupabase((cloudData) => {
      applyCloudPhotos(cloudData);
    });

    // 3. Initial Diagnostics probe
    runSupabaseDiagnostics().then(setDiagnostics).catch(() => {});

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRefreshDiagnostics = async () => {
    try {
      const res = await runSupabaseDiagnostics();
      setDiagnostics(res);
      showToast(lang === 'ID' ? 'Diagnostik Supabase diperbarui' : 'Supabase diagnostics refreshed');
    } catch (e) {}
  };

  // Helper to merge cloud photo records with team list
  const applyCloudPhotos = (cloudData: Record<string, TeamMemberCloudRecord>) => {
    setTeamMembers((prev) => {
      const updated = prev.map((member) => {
        const cloudRecord =
          cloudData[member.id] ||
          cloudData[member.id.toLowerCase()] ||
          cloudData[member.id.replace(/-/g, '_')] ||
          cloudData[member.id.replace(/_/g, '-')];

        if (cloudRecord && cloudRecord.photoUrl && cloudRecord.photoUrl.trim().length > 10) {
          return {
            ...member,
            imageUrl: cloudRecord.photoUrl,
            photo: cloudRecord.photoUrl,
            image: cloudRecord.photoUrl,
          } as TeamMember & { photo?: string; image?: string };
        }
        return member;
      });

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const showToast = (msg: string) => {
    setSaveToastMessage(msg);
    setTimeout(() => {
      setSaveToastMessage(null);
    }, 4500);
  };

  // Reset to default
  const handleResetToDefault = async () => {
    const confirmMsg =
      lang === 'ID'
        ? 'Apakah Anda yakin ingin mengembalikan seluruh foto profil ke pengaturan awal resmi studio?'
        : 'Are you sure you want to reset all team photos to original studio defaults?';
    if (window.confirm(confirmMsg)) {
      try {
        await resetAllTeamMembersInSupabase();
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
        setTeamMembers(INITIAL_TEAM_MEMBERS);
        showToast(
          lang === 'ID'
            ? 'Seluruh foto profil tim berhasil dikembalikan ke standar awal studio.'
            : 'All leadership team photos successfully reset to studio defaults.'
        );
      } catch (err) {
        console.error('Reset error:', err);
        setTeamMembers(INITIAL_TEAM_MEMBERS);
        showToast(
          lang === 'ID'
            ? 'Data tim dikembalikan ke standar lokal awal.'
            : 'Team data reset to default.'
        );
      }
    }
  };

  // 1. File Selection Handler: Fast local optimization & instant preview
  const handleFileSelect = async (
    memberId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase()) && !file.type.startsWith('image/')) {
      setUploadError(
        lang === 'ID'
          ? 'Format file tidak didukung. Harap pilih gambar JPG, PNG, atau WebP.'
          : 'Unsupported file format. Please select a JPG, PNG, or WebP image.'
      );
      e.target.value = '';
      return;
    }

    // Validate max file size: 25MB (will be safely resized and compressed)
    if (file.size > 25 * 1024 * 1024) {
      setUploadError(
        lang === 'ID'
          ? 'Ukuran file terlalu besar (maksimal 25MB).'
          : 'File size too large (maximum 25MB allowed).'
      );
      e.target.value = '';
      return;
    }

    const member =
      teamMembers.find((m) => m.id === memberId) ||
      INITIAL_TEAM_MEMBERS.find((m) => m.id === memberId);
    const memberName = member ? member.name : 'Team Member';
    const currentPhoto = member ? member.imageUrl : '';

    setUploadError(null);
    setUploadStatus('preparing');
    setUploadingMemberId(memberId);

    try {
      // Optimize image before upload (<50ms execution)
      const optimized = await optimizeImageFile(file, 1200, 0.85);
      const previewUrl = URL.createObjectURL(optimized.blob);

      setPendingPhoto({
        memberId,
        memberName,
        originalFile: file,
        optimizedBlob: optimized.blob,
        previewUrl,
        currentPhotoUrl: currentPhoto,
        originalSize: optimized.originalSize,
        optimizedSize: optimized.optimizedSize,
        reductionPercent: optimized.reductionPercent,
        format: optimized.format,
      });

      setUploadStatus('idle');
    } catch (err) {
      console.warn('Image optimization fallback:', err);
      const previewUrl = URL.createObjectURL(file);
      setPendingPhoto({
        memberId,
        memberName,
        originalFile: file,
        optimizedBlob: file,
        previewUrl,
        currentPhotoUrl: currentPhoto,
        originalSize: file.size,
        optimizedSize: file.size,
        reductionPercent: 0,
        format: 'jpeg',
      });
      setUploadStatus('idle');
    } finally {
      e.target.value = '';
    }
  };

  // 2. Save Photo to Cloud (Uploads optimized blob to Supabase Storage & updates Supabase Database)
  const handleSavePendingPhoto = async () => {
    if (!pendingPhoto) return;

    const { memberId, memberName, optimizedBlob, previewUrl } = pendingPhoto;

    console.log(
      `[Supabase Pipeline: Save Clicked] Starting upload for member "${memberName}" (${memberId}), Blob Size: ${optimizedBlob.size} bytes`
    );

    setUploadStatus('uploading');
    setUploadingMemberId(memberId);
    setUploadError(null);

    try {
      const result = await uploadTeamMemberPhotoToSupabase(
        memberId,
        memberName,
        optimizedBlob,
        (state) => {
          setUploadStatus(state);
        }
      );

      setUploadStatus('success');

      // Update state immediately with persistent download URL
      setTeamMembers((prev) => {
        const updated = prev.map((m) => {
          if (m.id === memberId) {
            return {
              ...m,
              imageUrl: result.photoUrl,
              photo: result.photoUrl,
              image: result.photoUrl,
            } as TeamMember & { photo?: string; image?: string };
          }
          return m;
        });

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {}
        return updated;
      });

      if (editingMember && editingMember.id === memberId) {
        setEditingMember((prev) => (prev ? { ...prev, imageUrl: result.photoUrl } : null));
      }

      setSuccessMemberId(memberId);
      showToast(
        lang === 'ID'
          ? `Foto profil "${memberName}" berhasil disimpan ke Supabase!`
          : `Photo for "${memberName}" saved successfully to Supabase!`
      );

      setTimeout(() => {
        URL.revokeObjectURL(previewUrl);
        setPendingPhoto(null);
        setUploadStatus('idle');
        setUploadingMemberId(null);
        setSuccessMemberId(null);
      }, 1000);
    } catch (err: any) {
      console.error('[Supabase Upload Pipeline ERROR Caught in TeamPage Component]', err);
      setUploadStatus('error');
      setUploadingMemberId(null);
      setUploadError(
        err?.message ||
          (lang === 'ID'
            ? 'Foto gagal disimpan. Silakan coba lagi.'
            : 'Photo could not be saved. Please try again.')
      );
    }
  };

  const handleCancelPendingPhoto = () => {
    if (pendingPhoto?.previewUrl) {
      URL.revokeObjectURL(pendingPhoto.previewUrl);
    }
    setPendingPhoto(null);
    setUploadStatus('idle');
    setUploadError(null);
  };

  const triggerUploadForMember = (memberId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setUploadError(null);
    const directInput = (document.getElementById(`team-file-input-${memberId}`) ||
      document.getElementById(`file-input-${memberId}`) ||
      fileInputRefs.current[memberId]) as HTMLInputElement | null;

    if (directInput) {
      directInput.click();
    } else {
      console.error(`File input element not found for member: ${memberId}`);
    }
  };

  // Save Modal Member Edits
  const handleSaveMemberEdit = (updated: TeamMember) => {
    setTeamMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    setEditingMember(null);
    showToast(
      lang === 'ID'
        ? `Profil ${updated.name} berhasil diperbarui!`
        : `Profile for ${updated.name} successfully updated!`
    );
  };

  // Categories
  const categories = [
    {
      id: 'all',
      nameId: 'Semua Direksi & Manajer',
      nameEn: 'All Directors & Managers',
      icon: <Users className="w-3.5 h-3.5" />,
    },
    {
      id: 'executive',
      nameId: 'Pimpinan Eksekutif',
      nameEn: 'Executive Leadership',
      icon: <Crown className="w-3.5 h-3.5" />,
    },
    {
      id: 'management',
      nameId: 'Operasional & Perencana',
      nameEn: 'Operations & Planning',
      icon: <Briefcase className="w-3.5 h-3.5" />,
    },
    {
      id: 'creative',
      nameId: 'Kreatif & Sinema',
      nameEn: 'Creative & Visual Masters',
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
  ];

  const filteredMembers =
    activeCategory === 'all'
      ? teamMembers
      : teamMembers.filter((m) => m.category === activeCategory);

  return (
    <section id="team" className="py-24 sm:py-32 bg-[#111816] text-[#FDFBF7] relative overflow-hidden">
      {/* Toast Notification */}
      {saveToastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#1A2421] text-[#FDFBF7] border border-[#C9A96E] px-4 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-fadeIn">
          <Check className="w-4 h-4 text-[#C9A96E]" />
          <span className="text-xs font-medium">{saveToastMessage}</span>
          <button
            onClick={() => setSaveToastMessage(null)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="fixed top-20 right-6 z-50 bg-red-950/90 text-red-200 border border-red-500/50 px-4 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-xs font-medium">{uploadError}</span>
          <button
            onClick={() => setUploadError(null)}
            className="text-red-300 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,169,110,0.15),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#C9A96E]/30 bg-[#1A2421] mb-4 rounded-sm">
            <Crown className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'DEWAN DIREKSI & MANAJEMEN INTI' : 'EXECUTIVE DIRECTORS & CORE MASTERS'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FDFBF7] tracking-wide mb-4"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID'
              ? 'Arsitek di Balik Mahakarya Anda'
              : 'The Masters Behind Your Celebration'}
          </h2>

          <div className="w-16 h-[1.5px] bg-[#C9A96E] mx-auto mb-5" />

          <p className="text-sm sm:text-base text-[#D4CDC3] font-light leading-relaxed">
            {lang === 'ID'
              ? 'Enam direktur eksekutif dan manajer berdedikasi yang menggabungkan presisi logistik, penguasaan adat Banjar Bali, dan estetika visual kelas dunia.'
              : 'Six dedicated executive directors and operational commanders harmonizing logistical precision, Balinese Banjar protocols, and world-class visual artistry.'}
          </p>

          {/* Admin & Customization Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              id="team-btn-toggle-edit-mode"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                isEditMode
                  ? 'bg-[#C9A96E] text-[#111816] shadow-md ring-2 ring-[#C9A96E]/50'
                  : 'bg-[#1A2421] hover:bg-[#25322E] text-[#D4CDC3] border border-[#C9A96E]/30'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>
                {isEditMode
                  ? lang === 'ID'
                    ? 'Selesai Kustomisasi'
                    : 'Done Customizing'
                  : lang === 'ID'
                  ? 'Mode Kustomisasi Foto / Profil'
                  : 'Customize Photos / Profiles'}
              </span>
            </button>

            <button
              type="button"
              id="team-btn-reset-defaults"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1A2421] hover:bg-[#25322E] text-[#A89E90] hover:text-[#FDFBF7] border border-white/10 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer"
              title={lang === 'ID' ? 'Kembalikan Foto & Data Awal' : 'Reset to Default Photos'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ID' ? 'Reset Standar Awal' : 'Reset Defaults'}</span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#C9A96E] text-[#111816] shadow-lg scale-105'
                  : 'bg-[#1A2421] text-[#D4CDC3] border border-white/10 hover:border-[#C9A96E]/50 hover:text-white'
              }`}
            >
              {cat.icon}
              <span>{lang === 'ID' ? cat.nameId : cat.nameEn}</span>
              <span className="text-[10px] opacity-75 px-1.5 py-0.5 rounded-full bg-black/20">
                {cat.id === 'all'
                  ? teamMembers.length
                  : teamMembers.filter((m) => m.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Team Members Grid (The 6 Members) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              id={`team-page-card-${member.id}`}
              className="bg-[#1A2421] rounded-sm border border-[#C9A96E]/20 hover:border-[#C9A96E] transition-all duration-500 overflow-hidden group shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Member Portrait Box */}
                <div className="relative h-[420px] sm:h-[440px] w-full overflow-hidden bg-gradient-to-b from-[#111816] to-[#1A2421]">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fallback = INITIAL_TEAM_MEMBERS.find((m) => m.id === member.id);
                      if (fallback && (e.target as HTMLImageElement).src !== fallback.imageUrl) {
                        (e.target as HTMLImageElement).src = fallback.imageUrl;
                      }
                    }}
                    className={`w-full h-full ${
                      member.id === 'luh-putu-sariani' || member.id === 'gede-arsel-aria-chrisna'
                        ? 'object-cover object-[center_15%]'
                        : 'object-cover object-[center_20%]'
                    } group-hover:scale-105 transition-transform duration-700`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421] via-[#1A2421]/20 to-black/20" />

                  {/* Hidden file input per member */}
                  <input
                    ref={(el) => {
                      fileInputRefs.current[member.id] = el;
                    }}
                    id={`team-file-input-${member.id}`}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={(e) => handleFileSelect(member.id, e)}
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Top Right Quick Camera Upload Button */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                    {member.experienceYears && (
                      <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-[#D4CDC3] text-[10px] font-mono rounded-full">
                        {member.experienceYears}+ {lang === 'ID' ? 'Thn' : 'Yrs'} Exp
                      </span>
                    )}

                    <button
                      type="button"
                      id={`team-quick-upload-btn-${member.id}`}
                      disabled={uploadingMemberId === member.id}
                      onClick={(e) => triggerUploadForMember(member.id, e)}
                      className="p-2 bg-[#111816]/90 hover:bg-[#C9A96E] text-[#C9A96E] hover:text-[#111816] border border-[#C9A96E]/50 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
                      title={
                        lang === 'ID'
                          ? `Ganti foto untuk ${member.name} dari komputer`
                          : `Change photo for ${member.name} from computer`
                      }
                    >
                      {uploadingMemberId === member.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : successMemberId === member.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Edit Mode Overlay */}
                  {isEditMode && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-6 z-20 animate-fadeIn">
                      <span className="text-xs font-semibold text-[#C9A96E] uppercase tracking-widest">
                        {lang === 'ID' ? 'Kustomisasi Profil' : 'Profile Customization'}
                      </span>

                      <button
                        type="button"
                        id={`team-page-btn-upload-photo-${member.id}`}
                        disabled={uploadingMemberId === member.id}
                        onClick={(e) => triggerUploadForMember(member.id, e)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C9A96E] hover:bg-[#B8985D] disabled:opacity-50 text-[#111816] font-bold text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer shadow-lg hover:scale-105"
                      >
                        {uploadingMemberId === member.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{lang === 'ID' ? 'Memproses Foto...' : 'Processing Photo...'}</span>
                          </>
                        ) : successMemberId === member.id ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-900" />
                            <span>{lang === 'ID' ? 'Foto Tersimpan!' : 'Photo Saved!'}</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>{lang === 'ID' ? 'Pilih Foto dari Komputer' : 'Choose Photo File'}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingMember(member)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#111816] hover:bg-[#1A2421] text-[#FDFBF7] border border-[#C9A96E]/50 font-semibold text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>{lang === 'ID' ? 'Sunting Biodata' : 'Edit Bio & Role'}</span>
                      </button>
                    </div>
                  )}

                  {/* Bottom Name & Role Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3
                      className="font-serif text-xl sm:text-2xl font-light text-[#FDFBF7] tracking-wide"
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-medium mt-1">
                      {lang === 'ID' ? member.roleId : member.roleEn}
                    </p>
                  </div>
                </div>

                {/* Member Details */}
                <div className="p-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111816] border border-[#C9A96E]/30 rounded-sm mb-4">
                    <Sparkles className="w-3 h-3 text-[#C9A96E]" />
                    <span className="text-[11px] font-medium tracking-wide text-[#E8DCC4]">
                      {lang === 'ID' ? member.badgeId : member.badgeEn}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-[#C4BDB2] font-light leading-relaxed mb-5">
                    {lang === 'ID' ? member.bioId : member.bioEn}
                  </p>

                  {/* Directorial Specialties */}
                  <div className="space-y-1.5 pt-4 border-t border-white/10 mb-5">
                    <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-semibold block mb-2">
                      {lang === 'ID' ? 'Fokus Keahlian Utama' : 'Core Directorial Focus'}
                    </span>
                    {(lang === 'ID' ? member.specialtiesId : member.specialtiesEn).map(
                      (spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center gap-2 text-[11px] text-[#A89E90]"
                        >
                          <div className="w-1 h-1 rounded-full bg-[#C9A96E]" />
                          <span>{spec}</span>
                        </div>
                      )
                    )}
                  </div>

                  {/* Philosophy Quote */}
                  {member.quoteId && (
                    <div className="p-3.5 bg-[#111816]/70 border-l-2 border-[#C9A96E] text-xs font-serif italic text-[#D4CDC3] leading-relaxed">
                      "{lang === 'ID' ? member.quoteId : member.quoteEn}"
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                <div className="flex items-center gap-2 pt-4">
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-white/5 hover:bg-[#C9A96E] text-gray-400 hover:text-[#111816] transition-colors"
                      title="Instagram Studio"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1.5 rounded-full bg-white/5 hover:bg-[#C9A96E] text-gray-400 hover:text-[#111816] transition-colors"
                      title={member.email}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={(e) => triggerUploadForMember(member.id, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111816] hover:bg-[#C9A96E] text-[#D4CDC3] hover:text-[#111816] border border-[#C9A96E]/30 rounded text-[11px] font-medium tracking-wide transition-all cursor-pointer"
                  >
                    <Camera className="w-3 h-3 text-[#C9A96E]" />
                    <span>{lang === 'ID' ? 'Ganti Foto' : 'Change Photo'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── DEDICATED PHOTO PREVIEW & CONFIRMATION MODAL ─── */}
      {pendingPhoto && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#111816] text-[#FDFBF7] border border-[#C9A96E] rounded-md max-w-lg w-full p-6 sm:p-7 shadow-2xl relative my-8">
            <button
              onClick={handleCancelPendingPhoto}
              disabled={uploadStatus === 'uploading' || uploadStatus === 'saving'}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#C9A96E]/20">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className="font-serif text-lg sm:text-xl font-light text-[#FDFBF7]"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {lang === 'ID' ? 'Pratinjau Foto Profil Baru' : 'New Profile Photo Preview'}
                </h3>
                <p className="text-xs text-[#C9A96E] font-medium mt-0.5">
                  {pendingPhoto.memberName}
                </p>
              </div>
            </div>

            {/* Comparison / Preview View */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Current Photo */}
                <div className="bg-[#1A2421] p-3 rounded border border-white/10 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#A89E90] block mb-2 font-medium">
                    {lang === 'ID' ? 'Foto Saat Ini:' : 'Current Photo:'}
                  </span>
                  <div className="h-44 w-full rounded overflow-hidden bg-black/40 border border-white/10 relative flex items-center justify-center">
                    {pendingPhoto.currentPhotoUrl ? (
                      <img
                        src={pendingPhoto.currentPhotoUrl}
                        alt="Current"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* New Preview Photo */}
                <div className="bg-[#1A2421] p-3 rounded border border-[#C9A96E]/50 text-center relative ring-1 ring-[#C9A96E]/30">
                  <span className="text-[10px] uppercase tracking-wider text-[#C9A96E] block mb-2 font-semibold">
                    {lang === 'ID' ? 'Foto Baru (Pratinjau):' : 'New Photo (Preview):'}
                  </span>
                  <div className="h-44 w-full rounded overflow-hidden bg-black/40 border border-[#C9A96E]/40 relative flex items-center justify-center">
                    <img
                      src={pendingPhoto.previewUrl}
                      alt="New Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#C9A96E] text-[#111816] text-[9px] font-bold rounded">
                      NEW
                    </div>
                  </div>
                </div>
              </div>

              {/* File Info */}
              <div className="bg-[#1A2421]/70 p-3 rounded border border-white/10 text-xs text-[#D4CDC3] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{lang === 'ID' ? 'Nama File:' : 'File Name:'}</span>
                  <span className="font-mono text-white truncate max-w-[200px]">
                    {pendingPhoto.originalFile.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{lang === 'ID' ? 'Ukuran Asli:' : 'Original Size:'}</span>
                  <span className="font-mono text-gray-300">
                    {(pendingPhoto.originalSize / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{lang === 'ID' ? 'Ukuran Teroptimasi:' : 'Optimized Size:'}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#C9A96E] font-semibold">
                      {pendingPhoto.optimizedSize > 1024 * 1024
                        ? `${(pendingPhoto.optimizedSize / (1024 * 1024)).toFixed(2)} MB`
                        : `${Math.round(pendingPhoto.optimizedSize / 1024)} KB`}
                    </span>
                    {pendingPhoto.reductionPercent > 0 && (
                      <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-400 text-[10px] font-mono rounded border border-emerald-500/40">
                        -{pendingPhoto.reductionPercent}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{lang === 'ID' ? 'Format & Resolusi:' : 'Format & Resolution:'}</span>
                  <span className="font-mono text-[#C9A96E] uppercase text-[11px]">
                    {pendingPhoto.format} (Max 1200px)
                  </span>
                </div>
              </div>

              {/* Upload Status & Progress */}
              {uploadStatus === 'preparing' && (
                <div className="p-3 bg-[#1A2421] border border-[#C9A96E]/30 rounded flex items-center justify-between text-xs text-[#C9A96E]">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{lang === 'ID' ? 'Mengoptimalkan foto lokal (~30 KB WebP)...' : 'Optimizing photo locally (~30 KB WebP)...'}</span>
                  </span>
                </div>
              )}

              {uploadStatus === 'uploading' && (
                <div className="p-3 bg-[#1A2421] border border-[#C9A96E]/30 rounded flex items-center justify-between text-xs text-[#C9A96E]">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{lang === 'ID' ? 'Mengunggah ke Supabase Storage (team-photos)...' : 'Uploading to Supabase Storage (team-photos)...'}</span>
                  </span>
                </div>
              )}

              {uploadStatus === 'saving' && (
                <div className="p-3 bg-[#1A2421] border border-[#C9A96E]/30 rounded flex items-center justify-between text-xs text-[#C9A96E]">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{lang === 'ID' ? 'Menyimpan metadata ke database Supabase (team_members)...' : 'Saving metadata to Supabase database (team_members)...'}</span>
                  </span>
                </div>
              )}

              {uploadStatus === 'success' && (
                <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'ID' ? 'Foto profil berhasil disimpan.' : 'Photo saved successfully.'}</span>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="p-3.5 bg-red-950/80 border border-red-500/60 rounded space-y-3 text-xs text-red-200">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="font-semibold text-red-300">
                        {lang === 'ID' ? 'Koneksi Supabase Terkendala' : 'Supabase Operation Failed'}
                      </p>
                      <p className="font-mono text-[11px] leading-relaxed text-red-200 break-words">
                        {uploadError || 'Operation failed. Please check connection.'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-red-500/30 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-gray-400">
                      {lang === 'ID' ? 'Coba simpan ulang ke Supabase?' : 'Retry save to Supabase?'}
                    </span>
                    <button
                      type="button"
                      onClick={handleSavePendingPhoto}
                      className="px-3.5 py-1.5 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] font-bold text-[11px] uppercase tracking-wider rounded transition-colors cursor-pointer"
                    >
                      {lang === 'ID' ? 'Coba Lagi' : 'Retry Save'}
                    </button>
                  </div>
                </div>
              )}

              {/* Administrator Connection Diagnostic Panel (Supabase Free) */}
              <div className="p-3 bg-black/50 border border-white/10 rounded space-y-2 text-[11px]">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-gray-300 font-semibold">
                  <span className="text-[10px] uppercase tracking-wider text-[#C9A96E]">
                    Supabase Storage & Database Status
                  </span>
                  <button
                    type="button"
                    onClick={handleRefreshDiagnostics}
                    className="text-[10px] text-gray-400 hover:text-[#C9A96E] underline cursor-pointer"
                  >
                    {lang === 'ID' ? 'Tes Koneksi' : 'Probe Supabase'}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                  <div className="col-span-2">
                    <span className="text-gray-500 block text-[10px]">Supabase URL:</span>
                    <span className="font-mono text-white text-[11px] truncate block">
                      {diagnostics?.supabaseUrl || supabaseUrl || 'VITE_SUPABASE_URL'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Storage Bucket:</span>
                    <span className="font-mono text-white text-[11px] truncate block">
                      team-photos
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Storage Status:</span>
                    <span
                      className={`font-bold ${
                        diagnostics?.storageStatus === 'CONNECTED'
                          ? 'text-emerald-400'
                          : diagnostics?.storageStatus === 'PENDING_CONFIG'
                          ? 'text-amber-400'
                          : 'text-red-400'
                      }`}
                    >
                      {diagnostics?.storageStatus || (isSupabaseConfigured ? 'CONNECTED' : 'PENDING_CONFIG')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Database Table:</span>
                    <span className="font-mono text-white text-[11px] truncate block">
                      team_members
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Database Status:</span>
                    <span
                      className={`font-bold ${
                        diagnostics?.databaseStatus === 'CONNECTED'
                          ? 'text-emerald-400'
                          : diagnostics?.databaseStatus === 'PENDING_CONFIG'
                          ? 'text-amber-400'
                          : 'text-red-400'
                      }`}
                    >
                      {diagnostics?.databaseStatus || (isSupabaseConfigured ? 'CONNECTED' : 'PENDING_CONFIG')}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500 block text-[10px]">Authentication:</span>
                    <span
                      className={`font-bold ${
                        diagnostics?.authStatus === 'SIGNED IN' ? 'text-emerald-400' : 'text-gray-400'
                      }`}
                    >
                      {diagnostics?.authStatus || 'ANONYMOUS / PUBLIC'}
                      {diagnostics?.authUserEmail ? ` (${diagnostics.authUserEmail})` : ''}
                    </span>
                  </div>
                </div>
                {diagnostics?.lastStorageError && (
                  <div className="pt-1.5 border-t border-white/5 text-amber-300 font-mono text-[10px] break-words">
                    <span className="text-gray-500 block">Storage Note:</span>
                    {diagnostics.lastStorageError}
                  </div>
                )}
                {diagnostics?.lastDatabaseError && (
                  <div className="pt-1.5 border-t border-white/5 text-amber-300 font-mono text-[10px] break-words">
                    <span className="text-gray-500 block">Database Note:</span>
                    {diagnostics.lastDatabaseError}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  id="team-btn-cancel-pending-photo"
                  onClick={handleCancelPendingPhoto}
                  disabled={uploadStatus === 'uploading' || uploadStatus === 'saving'}
                  className="px-4 py-2.5 bg-transparent hover:bg-white/5 text-gray-300 rounded text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {lang === 'ID' ? 'Batal' : 'Cancel'}
                </button>

                <button
                  type="button"
                  id="team-btn-save-pending-photo"
                  onClick={handleSavePendingPhoto}
                  disabled={uploadStatus === 'preparing' || uploadStatus === 'uploading' || uploadStatus === 'saving' || uploadStatus === 'success'}
                  className="px-5 py-2.5 bg-[#C9A96E] hover:bg-[#B8985D] disabled:opacity-50 text-[#111816] font-bold text-xs uppercase tracking-wider rounded-sm shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  {uploadStatus === 'preparing' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{lang === 'ID' ? 'Menyiapkan foto...' : 'Preparing photo...'}</span>
                    </>
                  ) : uploadStatus === 'uploading' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{lang === 'ID' ? 'Mengunggah ke Supabase...' : 'Uploading photo...'}</span>
                    </>
                  ) : uploadStatus === 'saving' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{lang === 'ID' ? 'Menyimpan foto...' : 'Saving photo...'}</span>
                    </>
                  ) : uploadStatus === 'success' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'ID' ? 'Foto Tersimpan' : 'Photo Saved'}</span>
                    </>
                  ) : uploadStatus === 'error' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'ID' ? 'Coba Simpan Lagi' : 'Retry Save'}</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'ID' ? 'Simpan Foto' : 'Save Photo'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Edit Modal for Team Member Details ─── */}
      {editingMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#1A2421] text-[#FDFBF7] border border-[#C9A96E]/50 rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setEditingMember(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-light text-[#FDFBF7]">
                  {lang === 'ID' ? 'Sunting Profil Anggota Tim' : 'Edit Team Member Profile'}
                </h3>
                <p className="text-xs text-[#C9A96E]">
                  {editingMember.name} • {editingMember.roleId}
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveMemberEdit(editingMember);
              }}
              className="space-y-4 text-xs font-sans"
            >
              <div>
                <label className="block text-[#C9A96E] uppercase tracking-wider font-semibold mb-1">
                  {lang === 'ID' ? 'Nama Lengkap' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, name: e.target.value })
                  }
                  className="w-full bg-[#111816] border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C9A96E] uppercase tracking-wider font-semibold mb-1">
                    {lang === 'ID' ? 'Jabatan (Bahasa Indonesia)' : 'Role Title (ID)'}
                  </label>
                  <input
                    type="text"
                    value={editingMember.roleId}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, roleId: e.target.value })
                    }
                    className="w-full bg-[#111816] border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#C9A96E] uppercase tracking-wider font-semibold mb-1">
                    {lang === 'ID' ? 'Jabatan (Bahasa Inggris)' : 'Role Title (EN)'}
                  </label>
                  <input
                    type="text"
                    value={editingMember.roleEn}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, roleEn: e.target.value })
                    }
                    className="w-full bg-[#111816] border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#C9A96E] uppercase tracking-wider font-semibold mb-1">
                  {lang === 'ID' ? 'Bio & Pengalaman (Indonesia)' : 'Bio / Narrative (ID)'}
                </label>
                <textarea
                  rows={3}
                  value={editingMember.bioId}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, bioId: e.target.value })
                  }
                  className="w-full bg-[#111816] border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#C9A96E] uppercase tracking-wider font-semibold mb-1">
                  {lang === 'ID' ? 'Kutipan Filosofis' : 'Philosophy Quote'}
                </label>
                <input
                  type="text"
                  value={editingMember.quoteId}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, quoteId: e.target.value })
                  }
                  className="w-full bg-[#111816] border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 bg-transparent hover:bg-white/10 text-gray-300 rounded font-semibold uppercase tracking-wider"
                >
                  {lang === 'ID' ? 'Batal' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] font-bold rounded uppercase tracking-wider shadow-lg"
                >
                  {lang === 'ID' ? 'Simpan Perubahan' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
