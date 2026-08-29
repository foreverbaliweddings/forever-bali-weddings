import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  'Over 23 years of experience planning destination weddings across Bali',
  'A deeply personal and international client approach for couples from around the world',
  'Luxury design, meticulous coordination, and premium supplier partnerships',
  'Transparent pricing, stress-free planning, and professional project management',
];

const values = ['Luxury', 'Warmth', 'Trust', 'Precision', 'Elegance'];

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80" alt="About Forever Bali Weddings" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="uppercase tracking-[0.35em] text-champagne">About</p>
            <h1 className="mt-4 font-heading text-5xl sm:text-6xl">Crafting timeless Bali weddings with elegance, intuition, and grace.</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-sm uppercase tracking-[0.35em] text-champagne">Founder Story</p>
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl">A luxury wedding planning studio shaped by experience, trust, and heartfelt service.</h2>
            <p className="mt-6 text-lg leading-8 text-charcoal/75">Forever Bali Weddings was created to offer international couples a beautifully calm, highly refined wedding experience in Bali. Our team combines decades of local knowledge with an elevated sense of style, ensuring every celebration feels elegant, effortless, and deeply personal.</p>
            <div className="mt-8 space-y-4">
              {pillars.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1rem] border border-beige bg-white/70 p-4">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-champagne" />
                  <p className="text-charcoal/75">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-luxe">
            <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80" alt="Luxury wedding planning team" className="h-[480px] w-full rounded-[1.5rem] object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="rounded-[2rem] border border-white/70 bg-charcoal px-8 py-12 text-white sm:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-champagne">Mission & Vision</p>
              <h3 className="mt-4 font-heading text-3xl sm:text-4xl">Creating extraordinary destination weddings with grace, sensitivity, and timeless detail.</h3>
            </div>
            <div className="space-y-4 text-lg leading-8 text-white/75">
              <p>Our mission is to create elegant celebrations that feel as effortless as they are unforgettable. Our vision is to remain Bali’s preferred luxury wedding planner for international couples seeking beauty, trust, and impeccable care.</p>
              <div className="flex flex-wrap gap-3">
                {values.map((value) => (
                  <span key={value} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">{value}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            { title: 'Professional Team', text: 'A gifted team of planners and coordinators working seamlessly behind the scenes.' },
            { title: 'International Clients', text: 'We welcome couples from Australia, Singapore, the US, Europe and beyond.' },
            { title: 'Luxury Vendor Network', text: 'Our trusted relationships ensure quality, elegance and reliable execution.' },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-white/70 bg-white p-7 shadow-luxe">
              <h3 className="font-heading text-2xl">{item.title}</h3>
              <p className="mt-3 text-charcoal/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-champagne">Book a Consultation</p>
          <h2 className="font-heading text-4xl sm:text-5xl">Let us create a wedding experience that feels unmistakably yours.</h2>
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-champagne px-7 py-3 font-semibold text-charcoal transition hover:scale-[1.02]">Start Your Journey <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
