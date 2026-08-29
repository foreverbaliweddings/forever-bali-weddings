import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Mia & Daniel',
    country: 'Australia',
    quote: 'Every detail felt effortless, indulgent and deeply personal. Our Bali wedding was beyond extraordinary.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Sophia & Luca',
    country: 'United Kingdom',
    quote: 'The planning experience was incredibly calm and luxurious. We felt completely cared for.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Amelia & Noah',
    country: 'United States',
    quote: 'The venue, design and guest experience surpassed every expectation. It felt truly unforgettable.',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80',
  },
];

export default function TestimonialsPage() {
  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80" alt="Testimonials" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="uppercase tracking-[0.35em] text-champagne">Testimonials</p>
            <h1 className="mt-4 font-heading text-5xl sm:text-6xl">The words of couples who trusted us with their once-in-a-lifetime celebration.</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className="rounded-[1.75rem] border border-white/70 bg-white p-7 shadow-luxe">
              <div className="flex gap-1 text-champagne">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p className="mt-6 text-lg leading-8 text-charcoal/75">“{item.quote}”</p>
              <div className="mt-8 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-charcoal/60">{item.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
