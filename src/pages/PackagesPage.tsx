import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const packages = [
  {
    name: 'Intimate Collection',
    price: 'Starting from USD 2,900',
    overview: 'Perfect for an elopement, small ceremony, or a very personal celebration with up to 10 guests.',
    inclusions: ['Wedding planner', 'Celebrant', 'Photography', 'Bouquet', 'Hair & makeup', 'Decoration'],
    gallery: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Signature Collection',
    price: 'Starting from USD 6,900',
    overview: 'Elegant planning and premium execution for celebrations of 20–50 guests with full-service coordination.',
    inclusions: ['Luxury venue', 'Decoration', 'Photography', 'Videography', 'Reception styling', 'Entertainment'],
    gallery: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Prestige Collection',
    price: 'Starting from USD 12,900',
    overview: 'An extraordinary celebration for 50–150 guests with luxury styling, premium entertainment and elevated hospitality.',
    inclusions: ['Premium flowers', 'Wedding film', 'Luxury dining', 'Live music', 'Premium coordination', 'Guest experience design'],
    gallery: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Bespoke Collection',
    price: 'Fully customized experience',
    overview: 'A true luxury celebration featuring private villas, private chefs, fireworks, yacht or helicopter experiences, and multi-day festivities.',
    inclusions: ['Luxury villas', 'Private chefs', 'Fireworks', 'Yacht experience', 'Helicopter experience', 'Multi-day celebration planning'],
    gallery: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
];

export default function PackagesPage() {
  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80" alt="Luxury wedding packages" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="uppercase tracking-[0.35em] text-champagne">Wedding Packages</p>
            <h1 className="mt-4 font-heading text-5xl sm:text-6xl">Elegant wedding experiences designed around your vision.</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="space-y-8">
          {packages.map((pkg, index) => (
            <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-luxe lg:grid-cols-[0.9fr_1.1fr]">
              <img src={pkg.gallery} alt={pkg.name} className="h-full min-h-[320px] w-full object-cover" />
              <div className="p-8 sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-heading text-3xl">{pkg.name}</h2>
                  <span className="rounded-full bg-champagne/15 px-4 py-2 text-sm font-semibold text-champagne">{pkg.price}</span>
                </div>
                <p className="mt-6 text-lg leading-8 text-charcoal/75">{pkg.overview}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {pkg.inclusions.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-[1rem] border border-beige bg-ivory p-3">
                      <Check size={16} className="text-champagne" />
                      <span className="text-sm text-charcoal/75">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/contact" className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white transition hover:bg-champagne hover:text-charcoal">Book This Package</Link>
                  <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-champagne hover:text-champagne">View Gallery <ArrowRight size={16} /></Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
