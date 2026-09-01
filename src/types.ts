export type Language = 'ID' | 'EN';

export interface WeddingPackage {
  id: string;
  code: 'essential' | 'artisan' | 'signature-elite';
  eyebrowId: string;
  eyebrowEn: string;
  nameId: string;
  nameEn: string;
  subtitleId: string;
  subtitleEn: string;
  guestCountId: string;
  guestCountEn: string;
  priceRange: string;
  image: string;
  descriptionId: string;
  descriptionEn: string;
  featuresId: string[];
  featuresEn: string[];
  whyChooseTitleId?: string;
  whyChooseTitleEn?: string;
  whyChooseDescId?: string;
  whyChooseDescEn?: string;
  whyChooseNoteId?: string;
  whyChooseNoteEn?: string;
  isPopular?: boolean;
  stars?: string;
}

export interface HeritageOffering {
  eyebrowId: string;
  eyebrowEn: string;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  descriptionId: string;
  descriptionEn: string;
  inclusionsId: string[];
  inclusionsEn: string[];
  image: string;
}

export interface ComprehensiveService {
  id: string;
  iconName: 'scale' | 'utensils' | 'sparkles' | 'palette';
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
}

export interface ComparisonRow {
  featureId: string;
  featureEn: string;
  essential: string;
  artisan: string;
  signature: string;
}

export interface TrackRecordStat {
  value: string;
  labelId: string;
  labelEn: string;
  descId: string;
  descEn: string;
}

export interface PlanningStep {
  stepNumber: number;
  timeframeId: string;
  timeframeEn: string;
  titleId: string;
  titleEn: string;
  subtitleId?: string;
  subtitleEn?: string;
  descId: string;
  descEn: string;
  deliverablesId?: string[];
  deliverablesEn?: string[];
  iconType?: 'compass' | 'map-pin' | 'palette' | 'file-check' | 'sparkles';
}

export interface BackdropItem {
  id: string;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  image: string;
  tagId: string;
  tagEn: string;
}

export interface GalleryItem {
  id: string;
  titleId: string;
  titleEn: string;
  category: 'estates' | 'cliffside' | 'sunset' | 'heritage';
  categoryLabelId: string;
  categoryLabelEn: string;
  location: string;
  image: string;
  descriptionId: string;
  descriptionEn: string;
}

export interface TestimonialItem {
  id: string;
  coupleNames: string;
  origin: string;
  weddingDate: string;
  venue: string;
  quoteId: string;
  quoteEn: string;
  avatar: string;
  coverImage: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  estimatedDate: string;
  guestCount: string;
  preferredPackage: string;
  message: string;
}

export interface VenueItem {
  id: string;
  category: 'uluwatu' | 'canggu-seminyak' | 'nusa-dua' | 'ubud';
  nameId: string;
  nameEn: string;
  locationId: string;
  locationEn: string;
  capacityId: string;
  capacityEn: string;
  vibeId: string;
  vibeEn: string;
  curfewId?: string;
  curfewEn?: string;
  priceIndicator?: '$$$' | '$$$$' | '$$$$$';
  image: string;
  badgeId: string;
  badgeEn: string;
  descriptionId: string;
  descriptionEn: string;
  featuresId: string[];
  featuresEn: string[];
  bestForId?: string;
  bestForEn?: string;
}

export interface GuestConciergeService {
  id: string;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  badgeId: string;
  badgeEn: string;
  descriptionId: string;
  descriptionEn: string;
  highlightsId: string[];
  highlightsEn: string[];
  iconType: 'plane' | 'home' | 'ship' | 'coffee';
  imageUrl: string;
}

export interface AnniversaryOffering {
  id: string;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  badgeId: string;
  badgeEn: string;
  descriptionId: string;
  descriptionEn: string;
  milestoneId: string;
  milestoneEn: string;
  featuresId: string[];
  featuresEn: string[];
  imageUrl: string;
}

export interface CuratedPartnerLook {
  titleId: string;
  titleEn: string;
  styleId: string;
  styleEn: string;
  imageUrl: string;
}

export interface CuratedPartner {
  id: string;
  name: string;
  category: 'floral' | 'hair-styling' | 'cinematography' | 'gastronomy';
  roleId: string;
  roleEn: string;
  badgeId: string;
  badgeEn: string;
  instagramHandle: string;
  instagramUrl: string;
  taglineId: string;
  taglineEn: string;
  descriptionId: string;
  descriptionEn: string;
  specialtyId: string;
  specialtyEn: string;
  featuresId: string[];
  featuresEn: string[];
  imageUrl: string;
  galleryImages: string[];
  portfolioLooks?: CuratedPartnerLook[];
  leadTimeId: string;
  leadTimeEn: string;
  pricingIndicator: '$$$' | '$$$$' | '$$$$$';
  isOfficialPartner: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  roleId: string;
  roleEn: string;
  category: 'executive' | 'management' | 'creative';
  badgeId?: string;
  badgeEn?: string;
  bioId: string;
  bioEn: string;
  quoteId?: string;
  quoteEn?: string;
  imageUrl: string;
  specialtiesId: string[];
  specialtiesEn: string[];
  experienceYears?: number;
  instagram?: string;
  email?: string;
}


