import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

const posts = [
  { title: 'Wedding Cost in Bali', excerpt: 'A luxury planning guide to understand budget expectations for destination weddings in Bali.', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80' },
  { title: 'Best Wedding Venues', excerpt: 'Explore the most enchanting Bali wedding locations for beach, villa, cliff and resort celebrations.', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80' },
  { title: 'Legal Wedding Guide', excerpt: 'Everything you need to know about planning a seamless and compliant wedding in Bali.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80' },
  { title: 'Bali Wedding Checklist', excerpt: 'A practical roadmap for planning your celebration with confidence and clarity.', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80' },
  { title: 'Best Time to Get Married in Bali', excerpt: 'Discover the ideal season, weather and atmosphere for your wedding date.', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80' },
  { title: 'Destination Wedding Tips', excerpt: 'Thoughtful advice for planning a beautiful celebration from abroad with ease.', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80' },
];

export default function BlogPage() {
  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=80" alt="Luxury wedding blog" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="uppercase tracking-[0.35em] text-champagne">Blog</p>
            <h1 className="mt-4 font-heading text-5xl sm:text-6xl">Planning inspiration, venue guidance and luxury wedding insight.</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article key={post.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-luxe">
              <img src={post.image} alt={post.title} className="h-56 w-full object-cover" />
              <div className="p-7">
                <h2 className="font-heading text-2xl">{post.title}</h2>
                <p className="mt-3 text-charcoal/70">{post.excerpt}</p>
                <a href="https://wa.me/6281370074777" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-champagne"><MessageCircle size={16} /> Ask Our Planner <ArrowRight size={16} /></a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
