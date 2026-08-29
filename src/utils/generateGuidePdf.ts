import { jsPDF } from 'jspdf';
import { Language } from '../types';
import { WEDDING_PACKAGES, CONTACT_INFO, VENUES_DATA } from '../data/weddingData';

interface LeadData {
  name: string;
  email: string;
  country?: string;
  whatsapp?: string;
  eventDate?: string;
  guestCount?: string | number;
}

export function generateLuxuryWeddingGuidePDF(lead: LeadData, lang: Language): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Color Palette Constants
  const goldColor = [201, 169, 110]; // #C9A96E
  const darkColor = [34, 34, 34]; // #222222
  const neutralGray = [100, 100, 100];
  const lightBg = [253, 251, 247]; // #FDFBF7

  // ==========================================
  // PAGE 1: COVER & WELCOME
  // ==========================================
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top & Bottom Gold Decorative Borders
  doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.rect(15, 15, pageWidth - 30, 2, 'F');
  doc.rect(15, pageHeight - 17, pageWidth - 30, 2, 'F');

  // Studio Header
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('FOREVER BALI WEDDINGS STUDIO', pageWidth / 2, 35, { align: 'center' });

  doc.setTextColor(neutralGray[0], neutralGray[1], neutralGray[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('BESPOKE DESTINATION WEDDING PLANNING • DENPASAR, BALI', pageWidth / 2, 41, {
    align: 'center',
  });

  // Main Title
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.text('2026 / 2027 LUXURY WEDDING', pageWidth / 2, 70, { align: 'center' });
  doc.text('GUIDE & PRICING CATALOG', pageWidth / 2, 82, { align: 'center' });

  // Subtitle
  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text('Curated Luxury, Quiet Elegance & Timeless Island Celebrations', pageWidth / 2, 94, {
    align: 'center',
  });

  // Divider
  doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 30, 102, pageWidth / 2 + 30, 102);

  // Personalized Client Section
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(25, 115, pageWidth - 50, 42, 2, 2, 'F');
  doc.setDrawColor(229, 225, 216);
  doc.roundedRect(25, 115, pageWidth - 50, 42, 2, 2, 'S');

  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(
    lang === 'ID' ? 'DIPERSIAPKAN KHUSUS UNTUK:' : 'SPECIALLY PREPARED FOR:',
    35,
    125
  );

  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(lead.name || 'Valued Couple', 35, 134);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(neutralGray[0], neutralGray[1], neutralGray[2]);
  doc.text(
    `${lang === 'ID' ? 'Email' : 'Email'}: ${lead.email}   |   ${lang === 'ID' ? 'Negara' : 'Country'}: ${lead.country}`,
    35,
    142
  );
  doc.text(
    `${lang === 'ID' ? 'Tanggal Rilis Dokumen' : 'Document Release Date'}: ${new Date().toLocaleDateString(
      lang === 'ID' ? 'id-ID' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    )}`,
    35,
    149
  );

  // Overview Statement
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  const introText =
    lang === 'ID'
      ? 'Selamat datang di panduan resmi Forever Bali Weddings Studio. Dokumen ini merangkum struktur paket pernikahan kurasi kami, transparansi investasi, enklave lokasi privat paling prestisius di Bali, serta roadmap perencanaan 5 langkah untuk memastikan hari bahagia Anda berlangsung tanpa cela.'
      : 'Welcome to the official Forever Bali Weddings Studio guide. This portfolio outlines our curated collection tiers, transparent investment frameworks, iconic private island sanctuaries, and our structured 5-step voyage designed to grant total peace of mind.';

  const splitIntro = doc.splitTextToSize(introText, pageWidth - 50);
  doc.text(splitIntro, 25, 175);

  // Table of Contents Preview
  doc.setFillColor(247, 244, 238);
  doc.roundedRect(25, 205, pageWidth - 50, 48, 2, 2, 'F');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(lang === 'ID' ? 'DAFTAR ISI PANDUAN' : 'TABLE OF CONTENTS', 35, 216);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(neutralGray[0], neutralGray[1], neutralGray[2]);
  doc.text(lang === 'ID' ? '1. Paket Pernikahan Kurasi (Essential, Artisan, Signature Elite)' : '1. Curated Luxury Packages (Essential, Artisan, Signature Elite)', 35, 224);
  doc.text(lang === 'ID' ? '2. Lokasi & Enklave Ikonik Bali (Uluwatu, Canggu, Nusa Dua, Ubud)' : '2. Curated Venues & Enclaves (Uluwatu, Canggu, Nusa Dua, Ubud)', 35, 231);
  doc.text(lang === 'ID' ? '3. 5-Tahap Roadmap Perjalanan (12 Bulan hingga Hari-H)' : '3. 5-Step Planning Journey (12 Months to Day-0)', 35, 238);
  doc.text(lang === 'ID' ? '4. Kontak Resmi & Booking Discovery Consultation' : '4. Official Contact & Discovery Consultation Booking', 35, 245);

  // Footer Cover Page
  doc.setFontSize(8);
  doc.setTextColor(neutralGray[0], neutralGray[1], neutralGray[2]);
  doc.text('Forever Bali Weddings Studio • www.foreverbaliwedding.com', pageWidth / 2, pageHeight - 22, {
    align: 'center',
  });

  // ==========================================
  // PAGE 2: PACKAGES & PRICING
  // ==========================================
  doc.addPage();
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header Banner
  doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('SECTION 01: PRICING & PACKAGES', 20, 12);

  doc.setTextColor(255, 255, 255);
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.text(
    lang === 'ID' ? 'PAKET PERNIKAHAN MEWAH 2026/2027' : 'CURATED LUXURY PACKAGES 2026/2027',
    20,
    21
  );

  let yPos = 38;

  WEDDING_PACKAGES.forEach((pkg) => {
    // Package Box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(18, yPos, pageWidth - 36, 72, 2, 2, 'F');
    doc.setDrawColor(pkg.isPopular ? goldColor[0] : 229, pkg.isPopular ? goldColor[1] : 225, pkg.isPopular ? goldColor[2] : 216);
    doc.setLineWidth(pkg.isPopular ? 0.8 : 0.4);
    doc.roundedRect(18, yPos, pageWidth - 36, 72, 2, 2, 'S');

    // Title & Badge
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.text(lang === 'ID' ? pkg.nameId : pkg.nameEn, 26, yPos + 10);

    // Price tag
    doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(pkg.priceRange, pageWidth - 26, yPos + 10, { align: 'right' });

    // Meta details: Guest capacity & Category
    doc.setTextColor(neutralGray[0], neutralGray[1], neutralGray[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(
      `${lang === 'ID' ? 'Kapasitas' : 'Capacity'}: ${
        lang === 'ID' ? pkg.guestCountId : pkg.guestCountEn
      }   |   ${lang === 'ID' ? pkg.subtitleId : pkg.subtitleEn}`,
      26,
      yPos + 17
    );

    // Highlight items
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFontSize(8);
    const highlights = lang === 'ID' ? pkg.featuresId.slice(0, 4) : pkg.featuresEn.slice(0, 4);

    highlights.forEach((feat, fIdx) => {
      doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
      doc.text('•', 26, yPos + 26 + fIdx * 6);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.text(feat, 31, yPos + 26 + fIdx * 6);
    });

    // Best For / Description
    doc.setFillColor(247, 244, 238);
    doc.roundedRect(26, yPos + 53, pageWidth - 52, 12, 1, 1, 'F');
    doc.setTextColor(neutralGray[0], neutralGray[1], neutralGray[2]);
    doc.setFontSize(7.5);
    const summaryText = `${lang === 'ID' ? 'Fokus' : 'Focus'}: ${
      lang === 'ID' ? pkg.descriptionId.substring(0, 95) + '...' : pkg.descriptionEn.substring(0, 95) + '...'
    }`;
    doc.text(summaryText, 30, yPos + 60.5);

    yPos += 78;
  });

  // Footer Page 2
  doc.setFontSize(8);
  doc.setTextColor(neutralGray[0], neutralGray[1], neutralGray[2]);
  doc.text('Forever Bali Weddings Studio • Official Pricing Catalog • Page 2', pageWidth / 2, pageHeight - 10, {
    align: 'center',
  });

  // ==========================================
  // PAGE 3: VENUES & ROADMAP & NEXT STEPS
  // ==========================================
  doc.addPage();
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header Banner
  doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('SECTION 02 & 03: VENUES & PLANNING ROADMAP', 20, 12);

  doc.setTextColor(255, 255, 255);
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.text(
    lang === 'ID' ? 'LOKASI PILIHAN & ROADMAP PERENCANAAN' : 'CURATED VENUES & 5-STEP JOURNEY',
    20,
    21
  );

  // Venues 2-column list
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.text(lang === 'ID' ? 'ENKLAVE VENUE PERNIKAHAN BALI' : 'BALI WEDDING ENCLAVES', 20, 38);

  yPos = 46;
  VENUES_DATA.forEach((v, vIdx) => {
    const isLeft = vIdx % 2 === 0;
    const xBox = isLeft ? 20 : pageWidth / 2 + 5;
    const currentY = yPos + Math.floor(vIdx / 2) * 32;

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(xBox, currentY, pageWidth / 2 - 25, 28, 1.5, 1.5, 'F');
    doc.setDrawColor(229, 225, 216);
    doc.roundedRect(xBox, currentY, pageWidth / 2 - 25, 28, 1.5, 1.5, 'S');

    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(lang === 'ID' ? v.nameId : v.nameEn, xBox + 5, currentY + 7);

    doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
    doc.setFontSize(7.5);
    doc.text(
      `${lang === 'ID' ? 'Kapasitas' : 'Capacity'}: ${lang === 'ID' ? v.capacityId : v.capacityEn}`,
      xBox + 5,
      currentY + 14
    );

    doc.setTextColor(neutralGray[0], neutralGray[1], neutralGray[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text(`Vibe: ${lang === 'ID' ? v.vibeId : v.vibeEn}`, xBox + 5, currentY + 20);
  });

  // 5-Step Roadmap Section
  const roadmapY = 120;
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.text(
    lang === 'ID' ? '5 TAHAP ROADMAP PERENCANAAN' : '5-PHASE WEDDING PLANNING ROADMAP',
    20,
    roadmapY
  );

  const stepsList = [
    { num: '01', time: 'Month 12-9', title: lang === 'ID' ? 'Konsultasi Awal & Konsep' : 'Discovery & Concept Consultation' },
    { num: '02', time: 'Month 9-6', title: lang === 'ID' ? 'Pemilihan Venue & Kurasi Vendor' : 'Venue Lock & Vendor Curation' },
    { num: '03', time: 'Month 6-3', title: lang === 'ID' ? 'Desain Dekorasi & Food Tasting' : 'Design, Styling & Menu Tasting' },
    { num: '04', time: 'Month 3-1', title: lang === 'ID' ? 'Finalisasi Legalitas & Technical Run' : 'Final Legal & Technical Run-Through' },
    { num: '05', time: 'Day-0', title: lang === 'ID' ? 'Eksekusi Hari-H Tanpa Stres' : 'The Wedding Day & Full Execution' },
  ];

  stepsList.forEach((s, sIdx) => {
    const sY = roadmapY + 9 + sIdx * 13;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(20, sY, pageWidth - 40, 10, 1, 1, 'F');
    doc.setDrawColor(229, 225, 216);
    doc.roundedRect(20, sY, pageWidth - 40, 10, 1, 1, 'S');

    doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(`Step ${s.num}`, 25, sY + 6.5);

    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFontSize(8);
    doc.text(s.title, 50, sY + 6.5);

    doc.setTextColor(neutralGray[0], neutralGray[1], neutralGray[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(s.time, pageWidth - 25, sY + 6.5, { align: 'right' });
  });

  // Direct Contact & Booking Callout
  const ctaY = 198;
  doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.roundedRect(20, ctaY, pageWidth - 40, 60, 2, 2, 'F');

  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(
    lang === 'ID' ? 'LANGKAH SELANJUTNYA: KONSULTASI DISCOVERY' : 'NEXT STEP: DISCOVERY CONSULTATION',
    pageWidth / 2,
    ctaY + 12,
    { align: 'center' }
  );

  doc.setTextColor(255, 255, 255);
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  const ctaDesc =
    lang === 'ID'
      ? 'Diskusikan visi pernikahan Anda langsung bersama tim perencana kami. Dapatkan saran tanggal terbaik, kuota venue off-market, dan rancangan penawaran custom.'
      : 'Connect directly with our Lead Wedding Planner to discuss your desired date, explore off-market estates, and receive a bespoke proposal.';
  const splitCta = doc.splitTextToSize(ctaDesc, pageWidth - 60);
  doc.text(splitCta, pageWidth / 2, ctaY + 22, { align: 'center' });

  // Contact details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text(`WhatsApp: ${CONTACT_INFO.phoneDisplay}  |  Email: ${CONTACT_INFO.email}`, pageWidth / 2, ctaY + 42, {
    align: 'center',
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text(`${CONTACT_INFO.address}`, pageWidth / 2, ctaY + 50, { align: 'center' });

  // Footer Page 3
  doc.setFontSize(8);
  doc.setTextColor(neutralGray[0], neutralGray[1], neutralGray[2]);
  doc.text('Forever Bali Weddings Studio • Official Pricing Catalog • Page 3', pageWidth / 2, pageHeight - 10, {
    align: 'center',
  });

  // Trigger Save/Download
  const fileName = `Forever_Bali_Weddings_Guide_2026_2027_${lead.name.replace(/\s+/g, '_') || 'Official'}.pdf`;
  doc.save(fileName);
}
