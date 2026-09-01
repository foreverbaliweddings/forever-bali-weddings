import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Language, TeamProfile } from '../types';
import { TEAM_PROFILES } from '../data/weddingData';

interface TeamProfilesProps {
  lang: Language;
}

export const TeamProfiles: React.FC<TeamProfilesProps> = ({ lang }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A96E]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A96E]/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          {/* Eyebrow with Icon */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#E5E1D8] bg-[#FDFBF7] mb-6 rounded-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
              {lang === 'ID' ? 'Tim Ahli Kami' : 'Our Expert Team'}
            </span>
          </div>

          {/* Main Title */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#1A2421] tracking-wide mb-4 leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID'
              ? 'Direktori Profesional Teruji'
              : 'Our Curated Professional Directory'}
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#555555] font-light max-w-2xl mx-auto mt-4">
            {lang === 'ID'
              ? 'Setiap anggota tim kami membawa puluhan tahun pengalaman, passion untuk kesempurnaan, dan dedikasi mendalam terhadap setiap perayaan yang kami ciptakan.'
              : 'Each member of our team brings decades of expertise, unwavering passion for excellence, and a deep commitment to orchestrating your unforgettable celebration.'}
          </p>

          <div className="w-12 h-[1px] bg-gradient-to-r from-[#C9A96E] to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TEAM_PROFILES.map((profile: TeamProfile) => (
            <motion.div key={profile.id} variants={itemVariants}>
              <TeamProfileCard profile={profile} lang={lang} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface TeamProfileCardProps {
  profile: TeamProfile;
  lang: Language;
}

const TeamProfileCard: React.FC<TeamProfileCardProps> = ({ profile, lang }) => {
  return (
    <div className="group h-full">
      <div className="relative rounded-lg overflow-hidden border border-[#E5E1D8] bg-[#FDFBF7] shadow-sm hover:shadow-lg transition-all duration-500">
        {/* Image Container */}
        <div className="relative h-72 overflow-hidden bg-gradient-to-b from-[#C9A96E]/10 to-[#FDFBF7]">
          <img
            src={profile.image}
            alt={lang === 'ID' ? profile.nameId : profile.nameEn}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Role Badge - Positioned Absolutely */}
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#C9A96E]/90 backdrop-blur-sm rounded-full">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white">
              {lang === 'ID' ? profile.roleId.split('&')[0] : profile.roleEn.split('&')[0]}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-7">
          {/* Name */}
          <h3
            className="text-lg sm:text-xl font-serif font-light text-[#1A2421] mb-1"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {lang === 'ID' ? profile.nameId : profile.nameEn}
          </h3>

          {/* Role Subtitle */}
          <p className="text-xs uppercase tracking-[0.15em] text-[#C9A96E] font-semibold mb-4">
            {lang === 'ID' ? profile.roleId : profile.roleEn}
          </p>

          {/* Bio */}
          <p className="text-sm text-[#555555] font-light leading-relaxed mb-5 line-clamp-4">
            {lang === 'ID' ? profile.bioId : profile.bioEn}
          </p>

          {/* Specialty Badge */}
          <div className="pt-5 border-t border-[#E5E1D8]">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#C9A96E] font-semibold mb-2">
              {lang === 'ID' ? 'Keahlian' : 'Specialty'}
            </p>
            <p className="text-xs text-[#333333] font-light">
              {lang === 'ID' ? profile.specialtyId : profile.specialtyEn}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
