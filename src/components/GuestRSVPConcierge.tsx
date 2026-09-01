import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle2,
  Calendar,
  Utensils,
  Hotel,
  Car,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
  Mail,
  Phone,
  Clock,
  Trash2,
  Download,
  Check,
  X,
  ChevronDown,
  UserCheck,
} from 'lucide-react';
import { Language } from '../types';

interface GuestRSVPConciergeProps {
  lang: Language;
}

export interface RSVPRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  invitationCode: string;
  attendanceStatus: 'attending_plus_one' | 'attending_solo' | 'declined';
  plusOneName?: string;
  eventsAttending: string[];
  dietaryPreference: string;
  allergies?: string;
  accommodationNeeds: string;
  transportRequired: boolean;
  specialNotes?: string;
  submittedAt: string;
}

const LOCAL_STORAGE_RSVP_KEY = 'fbw_vvip_guest_rsvps_v1';

const INITIAL_SAMPLE_RSVPS: RSVPRecord[] = [
  {
    id: 'rsvp-1724910000000',
    fullName: 'Lord Alexander Montgomery',
    email: 'alexander@montgomery.co.uk',
    phone: '+44 7700 900077',
    invitationCode: 'FBW-VIP-2026',
    attendanceStatus: 'attending_plus_one',
    plusOneName: 'Lady Catherine Montgomery',
    eventsAttending: ['cocktail', 'ceremony', 'gala'],
    dietaryPreference: 'pescatarian',
    allergies: 'No shellfish',
    accommodationNeeds: 'Partner Luxury Resort (Bulgari Uluwatu 2-Night Suite)',
    transportRequired: true,
    specialNotes: 'Require VIP Sprinter airport chaperone on arrival at DPS.',
    submittedAt: '2026-08-28 14:30',
  },
  {
    id: 'rsvp-1724915000000',
    fullName: 'Putri Raden Ayu Sekar',
    email: 'sekar.kusuma@domain.id',
    phone: '+62 812-3456-7890',
    invitationCode: 'BALI-ROYAL-77',
    attendanceStatus: 'attending_solo',
    eventsAttending: ['ceremony', 'gala'],
    dietaryPreference: 'halal',
    accommodationNeeds: 'Partner Luxury Villa (Alila Uluwatu)',
    transportRequired: true,
    submittedAt: '2026-08-29 09:15',
  },
];

export const GuestRSVPConcierge: React.FC<GuestRSVPConciergeProps> = ({ lang }) => {
  // RSVP Records State
  const [rsvpList, setRsvpList] = useState<RSVPRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_RSVP_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_SAMPLE_RSVPS;
  });

  // Form State
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [invitationCode, setInvitationCode] = useState<string>('');
  const [attendanceStatus, setAttendanceStatus] = useState<
    'attending_plus_one' | 'attending_solo' | 'declined'
  >('attending_plus_one');
  const [plusOneName, setPlusOneName] = useState<string>('');
  const [eventsAttending, setEventsAttending] = useState<string[]>([
    'cocktail',
    'ceremony',
    'gala',
  ]);
  const [dietaryPreference, setDietaryPreference] = useState<string>('gourmet_standard');
  const [allergies, setAllergies] = useState<string>('');
  const [accommodationNeeds, setAccommodationNeeds] = useState<string>('partner_resort');
  const [transportRequired, setTransportRequired] = useState<boolean>(true);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // UI state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [lastSubmittedRecord, setLastSubmittedRecord] = useState<RSVPRecord | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_RSVP_KEY, JSON.stringify(rsvpList));
    } catch (e) {
      console.warn('Failed to save RSVPs to localStorage', e);
    }
  }, [rsvpList]);

  // Handle Event Selection
  const toggleEvent = (eventId: string) => {
    setEventsAttending((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  // Handle RSVP Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    const newRecord: RSVPRecord = {
      id: `rsvp-${Date.now()}`,
      fullName,
      email,
      phone,
      invitationCode: invitationCode.trim() || 'VIP-GENERAL',
      attendanceStatus,
      plusOneName: attendanceStatus === 'attending_plus_one' ? plusOneName : undefined,
      eventsAttending: attendanceStatus === 'declined' ? [] : eventsAttending,
      dietaryPreference,
      allergies: allergies.trim() || undefined,
      accommodationNeeds,
      transportRequired,
      specialNotes: specialNotes.trim() || undefined,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setRsvpList((prev) => [newRecord, ...prev]);
    setLastSubmittedRecord(newRecord);
    setIsSubmitted(true);
  };

  // Reset form for next guest
  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setInvitationCode('');
    setPlusOneName('');
    setAllergies('');
    setSpecialNotes('');
    setIsSubmitted(false);
    setLastSubmittedRecord(null);
  };

  // Delete an RSVP from Admin list
  const handleDeleteRSVP = (id: string) => {
    if (window.confirm(lang === 'ID' ? 'Hapus data RSVP ini?' : 'Delete this RSVP entry?')) {
      setRsvpList((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Export CSV Data
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Full Name',
      'Email',
      'Phone',
      'Invitation Code',
      'Status',
      'Plus One',
      'Events',
      'Dietary',
      'Allergies',
      'Accommodation',
      'Transport Chaperone',
      'Special Notes',
      'Submitted At',
    ];

    const rows = rsvpList.map((r) => [
      `"${r.id}"`,
      `"${r.fullName}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.invitationCode}"`,
      `"${r.attendanceStatus}"`,
      `"${r.plusOneName || '-'}"`,
      `"${r.eventsAttending.join('; ')}"`,
      `"${r.dietaryPreference}"`,
      `"${r.allergies || '-'}"`,
      `"${r.accommodationNeeds}"`,
      `"${r.transportRequired ? 'Yes' : 'No'}"`,
      `"${r.specialNotes || '-'}"`,
      `"${r.submittedAt}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Forever_Bali_Weddings_VVIP_RSVPs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate WhatsApp Direct Confirmation Link
  const generateWhatsAppConfirmationUrl = (record: RSVPRecord) => {
    const statusText =
      record.attendanceStatus === 'attending_plus_one'
        ? lang === 'ID'
          ? `Hadir Bersama Pasangan (${record.plusOneName || 'Tamu Tambahan'})`
          : `Attending with Plus One (${record.plusOneName || 'Guest'})`
        : record.attendanceStatus === 'attending_solo'
        ? lang === 'ID'
          ? 'Hadir Secara Tunggal (Solo VVIP)'
          : 'Attending Solo VVIP'
        : lang === 'ID'
        ? 'Berhalangan Hadir (Declined)'
        : 'Respectfully Declined';

    let message = '';
    if (lang === 'ID') {
      message =
        `Halo Concierge Desk Forever Bali Weddings (+62 813-7007-4777),\n\n` +
        `Saya telah mengisi formulir konfirmasi kehadiran (VVIP RSVP Concierge):\n\n` +
        `• Nama Tamu: ${record.fullName}\n` +
        `• Kode Undangan: ${record.invitationCode}\n` +
        `• Status Kehadiran: ${statusText}\n` +
        `• Acara Dihadiri: ${record.eventsAttending.join(', ') || 'None'}\n` +
        `• Preferensi Makanan: ${record.dietaryPreference} ${record.allergies ? `(Alergi: ${record.allergies})` : ''}\n` +
        `• Kebutuhan Akomodasi: ${record.accommodationNeeds}\n` +
        `• Bantuan Transportasi VIP: ${record.transportRequired ? 'Ya, Diperlukan' : 'Tidak'}\n` +
        (record.specialNotes ? `• Catatan Khusus: ${record.specialNotes}\n` : '') +
        `\nMohon konfirmasi penerimaan reservasi ini ke pihak Wedding Director. Terima kasih.`;
    } else {
      message =
        `Hello Forever Bali Weddings VIP Concierge Desk (+62 813-7007-4777),\n\n` +
        `I have completed the VVIP RSVP Concierge registration for the upcoming celebration:\n\n` +
        `• Guest Name: ${record.fullName}\n` +
        `• Invitation Code: ${record.invitationCode}\n` +
        `• Status: ${statusText}\n` +
        `• Events Attending: ${record.eventsAttending.join(', ') || 'None'}\n` +
        `• Dietary Preference: ${record.dietaryPreference} ${record.allergies ? `(Allergies: ${record.allergies})` : ''}\n` +
        `• Accommodation: ${record.accommodationNeeds}\n` +
        `• VIP Chaperone Fleet: ${record.transportRequired ? 'Required' : 'Not Required'}\n` +
        (record.specialNotes ? `• Special Requests: ${record.specialNotes}\n` : '') +
        `\nPlease confirm receipt of this RSVP registration with our Lead Director. Thank you.`;
    }

    return `https://wa.me/6281370074777?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="guest-rsvp"
      className="py-20 lg:py-28 bg-[#111816] text-[#FDFBF7] relative overflow-hidden border-t border-white/5"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#1A2421] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/15 border border-[#C9A96E]/40 rounded-xs mb-3">
              <UserCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold">
                {lang === 'ID' ? 'KONFIRMASI KEHADIRAN VVIP' : 'VVIP GUEST RSVP & CONCIERGE'}
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FDFBF7] tracking-wide leading-tight"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {lang === 'ID' ? (
                <>
                  Layanan Kehadiran & <span className="text-[#C9A96E] italic">Concierge Tamu</span>
                </>
              ) : (
                <>
                  Exclusive <span className="text-[#C9A96E] italic">Guest RSVP & Hospitality</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light mt-2 leading-relaxed">
              {lang === 'ID'
                ? 'Konfirmasikan kehadiran Anda, preferensi jamuan kuliner mewah, serta kebutuhan akomodasi dan transportasi privat selama perayaan pernikahan di Bali.'
                : 'Confirm your attendance, bespoke culinary requirements, luxury resort bookings, and VIP transport coordination across Bali.'}
            </p>
          </div>

          {/* Admin RSVP Dashboard Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="rsvp-admin-toggle-btn"
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className={`px-4 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer border ${
                showAdminPanel
                  ? 'bg-[#C9A96E] text-[#111816] border-[#C9A96E] shadow-md'
                  : 'bg-[#1A2421] text-[#C9A96E] border-[#C9A96E]/40 hover:bg-[#C9A96E]/10'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>
                {showAdminPanel
                  ? lang === 'ID'
                    ? 'Tutup Panel Admin'
                    : 'Close Guest Dashboard'
                  : lang === 'ID'
                  ? `Panel Tamu (${rsvpList.length})`
                  : `Guest Dashboard (${rsvpList.length})`}
              </span>
            </button>
          </div>
        </div>

        {/* ADMIN GUEST RSVP DATA TABLE (Expandable) */}
        {showAdminPanel && (
          <div className="mb-12 p-6 sm:p-8 bg-[#1A2421] border border-[#C9A96E] rounded-xl shadow-2xl animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C9A96E] text-[#111816] flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#FDFBF7]">
                    {lang === 'ID'
                      ? 'Daftar Konfirmasi Tamu VVIP (Tersimpan di Browser)'
                      : 'VVIP Guest RSVP Live Manifest'}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-light">
                    {lang === 'ID'
                      ? 'Data tersimpan otomatis di localStorage dan siap diekspor ke format CSV / Excel.'
                      : 'Guest data is persisted in browser storage and ready for instant CSV / Excel export.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-4 py-2 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'ID' ? 'EKSPOR DATA CSV' : 'EXPORT CSV'}</span>
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/15 text-[10px] uppercase font-mono tracking-wider text-[#C9A96E]">
                    <th className="py-3 px-3">Tamu / Guest</th>
                    <th className="py-3 px-3">Kode / Status</th>
                    <th className="py-3 px-3">Acara / Events</th>
                    <th className="py-3 px-3">Dietary & Alergi</th>
                    <th className="py-3 px-3">Akomodasi & Armada</th>
                    <th className="py-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300 font-light">
                  {rsvpList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-neutral-500 font-mono">
                        {lang === 'ID'
                          ? 'Belum ada data konfirmasi kehadiran tamu.'
                          : 'No RSVP records submitted yet.'}
                      </td>
                    </tr>
                  ) : (
                    rsvpList.map((r) => (
                      <tr key={r.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="font-semibold text-white">{r.fullName}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">
                            {r.phone} • {r.email}
                          </div>
                          {r.plusOneName && (
                            <div className="text-[10px] text-[#C9A96E] font-serif">
                              +1: {r.plusOneName}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 rounded-xs text-[#C9A96E] block w-fit mb-1">
                            {r.invitationCode}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-xs font-semibold ${
                              r.attendanceStatus === 'attending_plus_one'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : r.attendanceStatus === 'attending_solo'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-red-500/20 text-red-300'
                            }`}
                          >
                            {r.attendanceStatus === 'attending_plus_one'
                              ? 'Attending (+1)'
                              : r.attendanceStatus === 'attending_solo'
                              ? 'Attending (Solo)'
                              : 'Declined'}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono text-[11px]">
                          {r.eventsAttending.map((ev) => (
                            <span
                              key={ev}
                              className="inline-block mr-1 mb-1 px-1.5 py-0.5 bg-[#111816] border border-white/10 rounded-xs text-[10px]"
                            >
                              {ev}
                            </span>
                          ))}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="text-white capitalize">
                            {r.dietaryPreference.replace('_', ' ')}
                          </div>
                          {r.allergies && (
                            <div className="text-[10px] text-amber-300">
                              Alergi: {r.allergies}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-[11px]">
                          <div>{r.accommodationNeeds}</div>
                          <div className="text-[10px] text-[#C9A96E]">
                            {r.transportRequired ? '• VIP Chaperone Fleet' : '• Transport Mandiri'}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteRSVP(r.id)}
                            className="p-1.5 bg-red-900/60 hover:bg-red-700 text-white rounded-xs transition-colors cursor-pointer"
                            title="Delete RSVP"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MAIN RSVP FORM OR SUCCESS SCREEN */}
        {!isSubmitted ? (
          <div className="max-w-4xl mx-auto bg-[#1A2421] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* Step 1: Guest Identification */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <KeyRound className="w-4 h-4 text-[#C9A96E]" />
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-[#C9A96E]">
                    {lang === 'ID'
                      ? '1. IDENTITAS TAMU & KODE UNDANGAN'
                      : '1. GUEST IDENTIFICATION & INVITATION CODE'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1.5 font-semibold">
                      {lang === 'ID' ? 'Nama Lengkap Tamu *' : 'Full Guest Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Lord Alexander Montgomery / Bapak Hendra"
                      className="w-full px-3.5 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                    />
                  </div>

                  {/* Invitation Code */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1.5 font-semibold">
                      {lang === 'ID' ? 'Kode Undangan VVIP' : 'VVIP Invitation Code'}
                    </label>
                    <input
                      type="text"
                      value={invitationCode}
                      onChange={(e) => setInvitationCode(e.target.value)}
                      placeholder="e.g. FBW-VIP-2026 / BALI-ROYAL-77"
                      className="w-full px-3.5 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white uppercase font-mono placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1.5 font-semibold">
                      {lang === 'ID' ? 'Alamat Email *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="guest@domain.com"
                      className="w-full px-3.5 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1.5 font-semibold">
                      {lang === 'ID' ? 'Nomor WhatsApp / Seluler *' : 'WhatsApp / Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+62 812-xxxx-xxxx / +44 7700..."
                      className="w-full px-3.5 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Attendance Status */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <Users className="w-4 h-4 text-[#C9A96E]" />
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-[#C9A96E]">
                    {lang === 'ID' ? '2. STATUS KEHADIRAN' : '2. ATTENDANCE CONFIRMATION'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setAttendanceStatus('attending_plus_one')}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                      attendanceStatus === 'attending_plus_one'
                        ? 'bg-[#111816] border-[#C9A96E] ring-1 ring-[#C9A96E]'
                        : 'bg-[#111816]/40 border-white/10 text-neutral-400 hover:border-white/30'
                    }`}
                  >
                    <div className="font-semibold text-white text-xs mb-1">
                      {lang === 'ID' ? 'Hadir dengan Pasangan' : 'Attending with Partner (+1)'}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-light">
                      {lang === 'ID' ? 'Konfirmasi untuk 2 orang' : 'Two seats reserved'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendanceStatus('attending_solo')}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                      attendanceStatus === 'attending_solo'
                        ? 'bg-[#111816] border-[#C9A96E] ring-1 ring-[#C9A96E]'
                        : 'bg-[#111816]/40 border-white/10 text-neutral-400 hover:border-white/30'
                    }`}
                  >
                    <div className="font-semibold text-white text-xs mb-1">
                      {lang === 'ID' ? 'Hadir Tunggal (Solo VVIP)' : 'Attending Solo'}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-light">
                      {lang === 'ID' ? 'Konfirmasi untuk 1 orang' : 'One seat reserved'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendanceStatus('declined')}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                      attendanceStatus === 'declined'
                        ? 'bg-[#111816] border-red-500/60 ring-1 ring-red-500/40 text-red-300'
                        : 'bg-[#111816]/40 border-white/10 text-neutral-400 hover:border-white/30'
                    }`}
                  >
                    <div className="font-semibold text-xs mb-1">
                      {lang === 'ID' ? 'Berhalangan Hadir' : 'Respectfully Decline'}
                    </div>
                    <div className="text-[11px] font-light opacity-75">
                      {lang === 'ID' ? 'Mengirim doa restu' : 'Sending warm blessings'}
                    </div>
                  </button>
                </div>

                {/* Plus One Name if attending with partner */}
                {attendanceStatus === 'attending_plus_one' && (
                  <div className="p-4 bg-[#111816] rounded-lg border border-[#C9A96E]/30 animate-fadeIn">
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                      {lang === 'ID' ? 'Nama Lengkap Pasangan (+1) *' : 'Full Name of Plus One (+1) *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={plusOneName}
                      onChange={(e) => setPlusOneName(e.target.value)}
                      placeholder="e.g. Lady Catherine Montgomery / Ibu Ratna"
                      className="w-full px-3 py-2 bg-[#1A2421] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                    />
                  </div>
                )}
              </div>

              {/* Step 3: Event Selection (Only if attending) */}
              {attendanceStatus !== 'declined' && (
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                    <Calendar className="w-4 h-4 text-[#C9A96E]" />
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-[#C9A96E]">
                      {lang === 'ID' ? '3. RANGKAIAN ACARA' : '3. CELEBRATION ITINERARY EVENTS'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: 'cocktail',
                        titleEn: 'Welcome Sunset Cocktail',
                        titleId: 'Koktail Senja Penyambutan',
                        time: 'Day 1 • 17:30 WITA',
                        locEn: 'Cliff Lawn Ocean Lounge',
                        locId: 'Lounge Tepi Tebing',
                      },
                      {
                        id: 'ceremony',
                        titleEn: 'The Sacred Cliff Ceremony',
                        titleId: 'Upacara Ikrar Suci Tebing',
                        time: 'Day 2 • 16:45 WITA',
                        locEn: 'Oceanfront Glass Altar',
                        locId: 'Altar Kaca Tepi Samudera',
                      },
                      {
                        id: 'gala',
                        titleEn: 'Grand Reception & Gala',
                        titleId: 'Resepsi Megah & Jamuan Gala',
                        time: 'Day 2 • 19:00 WITA',
                        locEn: 'Imperial Banquet Pavilion',
                        locId: 'Paviliun Jamuan Imperial',
                      },
                    ].map((ev) => {
                      const isChecked = eventsAttending.includes(ev.id);
                      return (
                        <div
                          key={ev.id}
                          onClick={() => toggleEvent(ev.id)}
                          className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-[#111816] border-[#C9A96E] text-white shadow-md'
                              : 'bg-[#111816]/40 border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono text-[#C9A96E]">
                                {ev.time}
                              </span>
                              <div
                                className={`w-4 h-4 rounded-xs border flex items-center justify-center ${
                                  isChecked
                                    ? 'bg-[#C9A96E] border-[#C9A96E] text-[#111816]'
                                    : 'border-white/30'
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5 font-bold" />}
                              </div>
                            </div>
                            <h4 className="text-xs font-serif font-bold text-white mb-1">
                              {lang === 'ID' ? ev.titleId : ev.titleEn}
                            </h4>
                          </div>
                          <span className="text-[10px] text-neutral-400 font-light mt-2 block">
                            📍 {lang === 'ID' ? ev.locId : ev.locEn}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Dietary & Accommodation Concierge */}
              {attendanceStatus !== 'declined' && (
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                    <Utensils className="w-4 h-4 text-[#C9A96E]" />
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-[#C9A96E]">
                      {lang === 'ID'
                        ? '4. KONSIONER KULINER & AKOMODASI RESOR'
                        : '4. DIETARY & ACCOMMODATION CONCIERGE'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Dietary Preference */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/80 mb-1.5 font-semibold">
                        {lang === 'ID' ? 'Preferensi Menu Makanan' : 'Dietary Preference'}
                      </label>
                      <select
                        value={dietaryPreference}
                        onChange={(e) => setDietaryPreference(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white focus:outline-hidden focus:border-[#C9A96E]"
                      >
                        <option value="gourmet_standard">
                          {lang === 'ID'
                            ? 'Menu Kuliner Standar (Daging / Seafood Gourmet)'
                            : 'Gourmet Standard (Wagyu & Fresh Seafood)'}
                        </option>
                        <option value="halal">
                          {lang === 'ID' ? '100% Halal Certified' : '100% Halal Certified'}
                        </option>
                        <option value="vegetarian">
                          {lang === 'ID' ? 'Vegetarian' : 'Vegetarian'}
                        </option>
                        <option value="vegan">
                          {lang === 'ID' ? 'Vegan Organik' : 'Organic Vegan'}
                        </option>
                        <option value="gluten_free">
                          {lang === 'ID' ? 'Gluten-Free / Celiac Safe' : 'Gluten-Free / Celiac Safe'}
                        </option>
                        <option value="pescatarian">
                          {lang === 'ID' ? 'Pescatarian' : 'Pescatarian'}
                        </option>
                      </select>
                    </div>

                    {/* Allergies / Special Diet */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/80 mb-1.5 font-semibold">
                        {lang === 'ID' ? 'Alergi Makanan Spesifik' : 'Specific Allergies (Nut, Shellfish, Dairy)'}
                      </label>
                      <input
                        type="text"
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                        placeholder={
                          lang === 'ID'
                            ? 'Contoh: Alergi kacang, tanpa udang, dll.'
                            : 'e.g. Severe peanut allergy, lactose intolerant...'
                        }
                        className="w-full px-3.5 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Accommodation needs */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/80 mb-1.5 font-semibold">
                        {lang === 'ID' ? 'Kebutuhan Reservasi Resor' : 'Accommodation Needs'}
                      </label>
                      <select
                        value={accommodationNeeds}
                        onChange={(e) => setAccommodationNeeds(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white focus:outline-hidden focus:border-[#C9A96E]"
                      >
                        <option value="Partner Luxury Resort (Bulgari / Alila / Six Senses)">
                          {lang === 'ID'
                            ? 'Bantuan Reservasi Resor Mitra Mewah (Bulgari/Alila/Six Senses)'
                            : 'Partner Luxury Resort (Bulgari / Alila / Six Senses Block)'}
                        </option>
                        <option value="Private Villa Compound (Uluwatu / Canggu)">
                          {lang === 'ID'
                            ? 'Penyewaan Villa Privat Keluarga'
                            : 'Private Family Villa Compound'}
                        </option>
                        <option value="Self-Arranged Hotel">
                          {lang === 'ID'
                            ? 'Mengatur Hotel Secara Mandiri'
                            : 'Arranging Own Accommodation'}
                        </option>
                      </select>
                    </div>

                    {/* VIP Transport Chaperone */}
                    <div className="flex flex-col justify-end">
                      <div
                        onClick={() => setTransportRequired(!transportRequired)}
                        className="p-3 bg-[#111816] border border-white/20 rounded-xs flex items-center justify-between cursor-pointer hover:border-[#C9A96E]/60 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-[#C9A96E]" />
                          <span className="text-xs text-white font-light">
                            {lang === 'ID'
                              ? 'Butuh Armada Antar-Jemput VIP Bandara?'
                              : 'VIP Airport Chaperone Fleet Required?'}
                          </span>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-xs border flex items-center justify-center ${
                            transportRequired
                              ? 'bg-[#C9A96E] border-[#C9A96E] text-[#111816]'
                              : 'border-white/30'
                          }`}
                        >
                          {transportRequired && <Check className="w-3.5 h-3.5 font-bold" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Special Notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/80 mb-1.5 font-semibold">
                  {lang === 'ID'
                    ? 'Pesan atau Doa Restu Khusus untuk Mempelai'
                    : 'Warm Wishes or Special Notes for the Couple'}
                </label>
                <textarea
                  rows={3}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder={
                    lang === 'ID'
                      ? 'Tuliskan pesan restu atau permintaan khusus Anda di sini...'
                      : 'Leave your warm blessings or special requests...'
                  }
                  className="w-full px-3.5 py-2.5 bg-[#111816] border border-white/20 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#C9A96E]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-light">
                  <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                  <span>
                    {lang === 'ID'
                      ? 'Data tersimpan aman di sistem concierge VIP Forever Bali Weddings'
                      : 'Data encrypted & handled directly by Aria Concierge Directorship'}
                  </span>
                </div>

                <button
                  type="submit"
                  id="submit-vvip-rsvp-btn"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-xl group cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {lang === 'ID' ? 'KIRIM KONFIRMASI KEHADIRAN' : 'CONFIRM VVIP REGISTRATION'}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* SUCCESS SCREEN AFTER RSVP SUBMISSION */
          <div className="max-w-2xl mx-auto bg-[#1A2421] border-2 border-[#C9A96E] rounded-2xl p-8 sm:p-12 text-center shadow-2xl animate-fadeIn relative">
            <div className="w-16 h-16 rounded-full bg-[#C9A96E] text-[#111816] flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-semibold bg-[#111816] px-3 py-1 rounded-xs border border-[#C9A96E]/30 inline-block mb-3">
              {lang === 'ID' ? 'RESERVASI BERHASIL TERSIMPAN' : 'VVIP REGISTRATION RECEIVED'}
            </span>

            <h3
              className="text-2xl sm:text-3xl font-serif text-[#FDFBF7] mb-3"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {lang === 'ID' ? (
                <>
                  Terima Kasih, <span className="text-[#C9A96E] italic">{lastSubmittedRecord?.fullName}</span>
                </>
              ) : (
                <>
                  Thank You, <span className="text-[#C9A96E] italic">{lastSubmittedRecord?.fullName}</span>
                </>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
              {lang === 'ID'
                ? 'Konfirmasi kehadiran dan preferensi kuliner Anda telah tercatat rapi di sistem concierge kami. Untuk sinkronisasi instan ke Lead Wedding Director, silakan kirim rangkuman via WhatsApp.'
                : 'Your attendance details, dietary requirements, and luxury resort logistics have been safely logged. Click below to synchronize your reservation directly with Aria via VIP WhatsApp.'}
            </p>

            {/* Direct WhatsApp Confirmation Button */}
            {lastSubmittedRecord && (
              <div className="space-y-3 mb-6">
                <a
                  id="whatsapp-rsvp-confirm-cta"
                  href={generateWhatsAppConfirmationUrl(lastSubmittedRecord)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-[#C9A96E] hover:bg-[#B8985D] text-[#111816] text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-xl group cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>
                    {lang === 'ID'
                      ? 'KIRIM KONFIRMASI VIA WHATSAPP (+62 813-7007-4777)'
                      : 'SEND CONFIRMATION VIA WHATSAPP (+62 813-7007-4777)'}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  {lang === 'ID'
                    ? 'Isi Formulir untuk Tamu Lain'
                    : 'Submit RSVP for Another Guest'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
