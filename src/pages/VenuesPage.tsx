import { motion } from 'framer-motion';
import { ArrowRight, MapPin, MessageCircle } from 'lucide-react';

const venues = [
  {
    name: 'Cliffside Estate',
    category: 'Cliff Wedding',
    location: 'Uluwatu',
    capacity: '120 Guests',
    description: 'An architectural retreat with panoramic sea views and a breathtaking sunset backdrop.',
    price: 'From USD 8,500',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Tropical Villa Retreat',
    category: 'Private Villa Wedding',
    location: 'Ubud',
    capacity: '90 Guests',
    description: 'A private villa setting with lush gardens, serene pools and intimate luxury.',
    price: 'From USD 7,200',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Lagoon Beach Resort',
    category: 'Beach Wedding',
    location: 'Seminyak',
    capacity: '180 Guests',
    description: 'A polished beachfront destination for sunlit celebrations and effortless glamour.',
    price: 'From USD 9,800',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Luxury Chapel',
    category: 'Luxury Chapel',
    location: 'Nusa Dua',
    capacity: '80 Guests',
    description: 'A timeless chapel setting with elegant interiors and graceful ceremony flow.',
    price: 'From USD 6,200',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Garden Sanctuary',
    category: 'Tropical Garden',
    location: 'Bali Botanical Garden',
    capacity: '140 Guests',
    description: 'A lush garden environment wrapped in florals, light and romantic atmosphere.',
    price: 'From USD 7,900',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Resort Grand Ballroom',
    category: 'Resort Wedding',
    location: 'Jimbaran',
    capacity: '220 Guests',
    description: 'A grand resort setting combining five-star hospitality with exquisite detail.',
    price: 'From USD 12,500',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function VenuesPage() {
  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80" alt="Luxury Bali wedding venues" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="uppercase tracking-[0.35em] text-champagne">Wedding Venues</p>
            <h1 className="mt-4 font-heading text-5xl sm:text-6xl">Bali venues curated for romance, prestige, and unforgettable atmosphere.</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {venues.map((venue, index) => (
            <motion.article key={venue.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-luxe">
              <img src={venue.image} alt={venue.name} className="h-64 w-full object-cover" />
              <div className="p-7">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.3em] text-champagne">{venue.category}</p>
                  <span className="rounded-full bg-ivory px-3 py-1 text-sm text-charcoal">{venue.capacity}</span>
                </div>
                <h2 className="mt-4 font-heading text-2xl">{venue.name}</h2>
                <p className="mt-3 text-charcoal/70">{venue.description}</p>
                <div className="mt-5 flex items-center gap-3 text-sm text-charcoal/65"><MapPin size={16} /> {venue.location}</div>
                <div className="mt-4 text-sm font-semibold text-charcoal">{venue.price}</div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="https://wa.me/6281370074777" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-champagne hover:text-charcoal"><MessageCircle size={16} /> Ask About This Venue</a>
                  <a href="https://wa.me/6281370074777" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:border-champagne hover:text-champagne">Request Venue <ArrowRight size={16} /></a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
