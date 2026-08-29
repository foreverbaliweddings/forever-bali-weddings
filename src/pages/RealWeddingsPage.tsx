import { motion } from 'framer-motion';

const stories = [
  {
    couple: 'Isabella & Marcus',
    venue: 'Clifftop Estate',
    style: 'Modern Romance',
    story: 'A candlelit ceremony with ocean views and a breathtaking sunset dinner under the stars.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  },
  {
    couple: 'Charlotte & Ethan',
    venue: 'Private Villa',
    style: 'Minimal Luxury',
    story: 'A serene, intimate celebration defined by delicate florals, natural textures and soft candlelight.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    couple: 'Nadia & Arjun',
    venue: 'Beachfront Resort',
    style: 'Golden Hour',
    story: 'A vibrant multicultural evening celebrating warmth, music and refined Balinese hospitality.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
  },
];

export default function RealWeddingsPage() {
  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80" alt="Real weddings" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="uppercase tracking-[0.35em] text-champagne">Real Weddings</p>
            <h1 className="mt-4 font-heading text-5xl sm:text-6xl">Stories of love told through beauty, luxury and thoughtful detail.</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="space-y-8">
          {stories.map((story, index) => (
            <motion.article key={story.couple} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-luxe lg:grid-cols-[0.9fr_1.1fr]">
              <img src={story.image} alt={story.couple} className="h-full min-h-[300px] w-full object-cover" />
              <div className="p-8 sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-champagne">{story.couple}</p>
                <h2 className="mt-3 font-heading text-3xl">{story.venue}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-charcoal/60">{story.style}</p>
                <p className="mt-6 text-lg leading-8 text-charcoal/75">{story.story}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
