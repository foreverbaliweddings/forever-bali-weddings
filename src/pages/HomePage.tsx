import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Camera, ChevronDown, Compass, Crown, HeartHandshake, MessageCircle, Phone, Sparkles, Star, Trees, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Trusted by Couples Worldwide', value: '900+' },
  { label: 'Years Experience', value: '23+' },
  { label: 'Luxury Venues', value: '40+' },
  { label: 'Countries Served', value: '20+' },
];

const packages = [
  { title: 'Intimate Collection', description: 'A refined elopement or intimate ceremony for up to 10 guests with elegant essentials.', price: 'From USD 2,900', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80' },
  { title: 'Signature Collection', description: 'An elevated celebration for 20–50 guests with luxury styling, planning and premium hospitality.', price: 'From USD 6,900', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80' },
  { title: 'Prestige Collection', description: 'A grand design-led experience for 50–150 guests with premium coordination, dining and entertainment.', price: 'From USD 12,900', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80' },
];

const reasons = [
  { icon: Sparkles, title: '23+ Years Experience', text: 'Trusted expertise delivering elegant weddings with confidence and calm.' },
  { icon: Compass, title: 'Professional Team', text: 'A dedicated group of planners, coordinators and designers handling every detail.' },
  { icon: HeartHandshake, title: 'Trusted Vendors', text: 'Handpicked suppliers and premium venues chosen for quality and reliability.' },
  { icon: Trees, title: 'Luxury Venues', text: 'Access to Bali’s most romantic beach, cliff, villa and resort settings.' },
  { icon: Wallet, title: 'Transparent Pricing', text: 'Clarity and honesty from the first consultation through final delivery.' },
  { icon: Phone, title: 'Fast Response', text: 'Responsive support for both planning questions and last-minute needs.' },
];

const signatureExperiences = [
  { title: 'Luxury Villa Wedding', description: 'Private, serene, and architectural with tailored design and intimate luxury.', icon: Crown },
  { title: 'Beach Wedding', description: 'Sunlit celebrations with ocean views, candlelight and effortless romance.', icon: Sparkles },
  { title: 'Cliff Wedding', description: 'Panoramic ceremonies framed by sunset glow and cinematic atmosphere.', icon: Camera },
  { title: 'Private Yacht Wedding', description: 'A floating celebration with champagne, sea breeze and unforgettable views.', icon: BadgeCheck },
];

const journeySteps = [
  { title: 'Discover', text: 'We begin with your vision, guest count, style, and the emotional tone of your celebration.' },
  { title: 'Design', text: 'We shape the venue, aesthetic, and flow with a refined and beautifully detailed plan.' },
  { title: 'Celebrate', text: 'We coordinate every moment so you can fully enjoy your wedding day with calm and confidence.' },
  { title: 'Remember', text: 'Your day remains timeless through curated photography, film, and thoughtful guest experience.' },
];

const featuredPosts = [
  { title: 'Wedding Cost in Bali', excerpt: 'A luxury planning guide to understand budget expectations for destination weddings in Bali.' },
  { title: 'Best Wedding Venues', excerpt: 'Explore the most enchanting Bali wedding locations for beach, villa, cliff and resort celebrations.' },
  { title: 'Legal Wedding Guide', excerpt: 'Everything you need to know about planning a seamless and compliant wedding in Bali.' },
];

const testimonials = [
  { quote: 'Every detail felt effortless, indulgent, and deeply personal. Our Bali wedding was beyond extraordinary.', name: 'Mia & Daniel', country: 'Australia', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
  { quote: 'The planning experience was incredibly calm and luxurious. We felt completely cared for.', name: 'Sophia & Luca', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { quote: 'The venue, design, and guest experience surpassed every expectation.', name: 'Amelia & Noah', country: 'United States', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80' },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
];

export default function HomePage() {
  return (
    <div>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80" alt="Luxury Bali wedding destination" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white lg:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-champagne">Forever Bali Weddings</p>
            <h1 className="font-heading text-5xl leading-tight sm:text-6xl lg:text-7xl">Your Forever Begins in Bali</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">Luxury destination weddings designed with elegance, authenticity, and over 23 years of experience.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/packages" className="rounded-full bg-champagne px-7 py-3 font-medium text-charcoal transition hover:scale-[1.02]">Explore Wedding Packages</Link>
              <Link to="/contact" className="rounded-full border border-white/40 px-7 py-3 font-medium text-white transition hover:border-champagne hover:text-champagne">Book Free Consultation</Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/80">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown className="animate-bounce" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-4 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-luxe sm:grid-cols-2 lg:grid-cols-4 sm:p-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl text-charcoal">{stat.value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-charcoal/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-sm uppercase tracking-[0.35em] text-champagne">Welcome</p>
            <h2 className="mt-4 font-heading text-4xl leading-tight sm:text-5xl">A trusted luxury wedding planner for discerning couples who value emotion, detail, and peace of mind.</h2>
            <p className="mt-6 text-lg leading-8 text-charcoal/75">We create unforgettable destination weddings in Bali with a warm, highly personal approach and flawless execution. From seaside vows to private villa celebrations, every experience is crafted to feel timeless and deeply meaningful.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full border border-beige bg-white/70 px-4 py-2 text-sm text-charcoal/70">Trusted by international couples</div>
              <div className="rounded-full border border-beige bg-white/70 px-4 py-2 text-sm text-charcoal/70">Luxury vendor network</div>
              <div className="rounded-full border border-beige bg-white/70 px-4 py-2 text-sm text-charcoal/70">Seamless planning from abroad</div>
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-champagne hover:text-champagne">Discover Our Story <ArrowRight size={16} /></Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-luxe">
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80" alt="Luxury Bali wedding planning" className="h-[480px] w-full rounded-[1.5rem] object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-luxe sm:p-12">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-champagne">Signature Experiences</p>
            <h2 className="font-heading text-4xl sm:text-5xl">Curated celebrations designed for romance, prestige, and unforgettable atmosphere.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {signatureExperiences.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className="rounded-[1.5rem] border border-beige bg-ivory p-6">
                  <div className="mb-4 inline-flex rounded-full bg-champagne/15 p-3 text-champagne"><Icon size={18} /></div>
                  <h3 className="font-heading text-2xl">{item.title}</h3>
                  <p className="mt-3 text-charcoal/70">{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="rounded-[2rem] border border-white/70 bg-charcoal px-8 py-12 text-white sm:px-12">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-champagne">Why Choose Forever Bali Weddings</p>
            <h2 className="font-heading text-4xl sm:text-5xl">Luxury support, thoughtful planning, and seamless execution from start to finish.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reasons.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} className="rounded-[1.5rem] border border-white/10 bg-white/10 p-7 backdrop-blur">
                  <div className="mb-4 inline-flex rounded-full bg-champagne/15 p-3 text-champagne"><Icon size={20} /></div>
                  <h3 className="font-heading text-2xl">{item.title}</h3>
                  <p className="mt-3 text-white/70">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-luxe sm:p-12">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-champagne">Wedding Planning Journey</p>
            <h2 className="font-heading text-4xl sm:text-5xl">A clear, calm, and beautifully curated planning experience.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {journeySteps.map((step, index) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} className="rounded-[1.5rem] border border-beige bg-ivory p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.3em] text-champagne">0{index + 1}</div>
                <h3 className="mt-4 font-heading text-2xl">{step.title}</h3>
                <p className="mt-3 text-charcoal/70">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-luxe sm:p-12">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-champagne">Featured Wedding Packages</p>
            <h2 className="font-heading text-4xl sm:text-5xl">Tailored experiences for intimate, luxury, and grand celebrations.</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg, index) => (
              <motion.article key={pkg.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} whileHover={{ y: -8, scale: 1.01 }} className="overflow-hidden rounded-[1.75rem] border border-beige bg-ivory shadow-luxe">
                <img src={pkg.image} alt={pkg.title} className="h-56 w-full object-cover" />
                <div className="p-7">
                  <h3 className="font-heading text-2xl">{pkg.title}</h3>
                  <p className="mt-3 text-charcoal/70">{pkg.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-semibold text-champagne">{pkg.price}</span>
                    <Link to="/packages" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-champagne">Explore <ArrowRight size={16} /></Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-champagne">Real Weddings</p>
          <h2 className="font-heading text-4xl sm:text-5xl">Stories of romance, celebration, and timeless design.</h2>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {[
            { couple: 'Isabella & Marcus', venue: 'Clifftop Estate', story: 'A sunset ceremony beneath the sky, framed by candlelight and ocean air.' },
            { couple: 'Charlotte & Ethan', venue: 'Private Villa', story: 'An intimate celebration with editorial styling and calming, modern luxury.' },
            { couple: 'Nadia & Arjun', venue: 'Beachfront Resort', story: 'A vibrant weekend wedding filled with culture, warmth, and unforgettable hospitality.' },
          ].map((wedding, index) => (
            <motion.div key={wedding.couple} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className="rounded-[1.75rem] border border-white/70 bg-white p-7 shadow-luxe">
              <p className="text-sm uppercase tracking-[0.3em] text-champagne">{wedding.couple}</p>
              <h3 className="mt-3 font-heading text-2xl">{wedding.venue}</h3>
              <p className="mt-4 text-charcoal/70">{wedding.story}</p>
              <Link to="/real-weddings" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-champagne">View Story <ArrowRight size={16} /></Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-luxe sm:p-12">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-champagne">Testimonials</p>
            <h2 className="font-heading text-4xl sm:text-5xl">Loved by international couples planning unforgettable celebrations.</h2>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className="rounded-[1.5rem] border border-beige bg-ivory p-7">
                <div className="flex gap-1 text-champagne">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                <p className="mt-4 text-lg leading-8 text-charcoal/75">“{item.quote}”</p>
                <div className="mt-6 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-charcoal/60">{item.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-champagne">Wedding Insights</p>
          <h2 className="font-heading text-4xl sm:text-5xl">Luxury editorial guidance for planning your Bali celebration.</h2>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <motion.article key={post.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className="rounded-[1.75rem] border border-white/70 bg-white p-7 shadow-luxe">
              <p className="text-sm uppercase tracking-[0.3em] text-champagne">Article</p>
              <h3 className="mt-3 font-heading text-2xl">{post.title}</h3>
              <p className="mt-4 text-charcoal/70">{post.excerpt}</p>
              <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-champagne">Read More <ArrowRight size={16} /></Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-champagne">Gallery</p>
          <h2 className="font-heading text-4xl sm:text-5xl">A glimpse into our most beautiful celebrations.</h2>
        </div>
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-4">
          {galleryImages.map((image, index) => (
            <motion.img key={image + index} whileHover={{ scale: 1.02 }} src={image} alt="Luxury wedding photo" className="mb-5 w-full rounded-[1.5rem] object-cover shadow-luxe" />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="rounded-[2rem] border border-white/70 bg-charcoal px-8 py-12 text-white sm:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-champagne">Contact</p>
              <h2 className="mt-4 font-heading text-4xl sm:text-5xl">Begin planning your timeless Bali celebration.</h2>
              <p className="mt-6 text-white/75">Plan with confidence, elegance, and a team that understands luxury destination weddings.</p>
              <div className="mt-8 space-y-3 text-white/80">
                <p>foreverbaliwedding@gmail.com</p>
                <p>+62 813 7007 4777</p>
                <p>Denpasar, Bali, Indonesia</p>
              </div>
              <a href="https://wa.me/6281370074777" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:scale-[1.02]">
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-7 backdrop-blur">
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className="rounded-full border border-white/10 bg-white/10 px-4 py-3 outline-none" placeholder="Name" />
                  <input className="rounded-full border border-white/10 bg-white/10 px-4 py-3 outline-none" placeholder="Email" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className="rounded-full border border-white/10 bg-white/10 px-4 py-3 outline-none" placeholder="Country" />
                  <input className="rounded-full border border-white/10 bg-white/10 px-4 py-3 outline-none" placeholder="Wedding Date" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className="rounded-full border border-white/10 bg-white/10 px-4 py-3 outline-none" placeholder="Estimated Guests" />
                  <input className="rounded-full border border-white/10 bg-white/10 px-4 py-3 outline-none" placeholder="Estimated Budget" />
                </div>
                <textarea className="min-h-[130px] w-full rounded-[1.2rem] border border-white/10 bg-white/10 px-4 py-3 outline-none" placeholder="Tell us about your dream wedding" />
                <button className="rounded-full bg-champagne px-6 py-3 font-semibold text-charcoal">Schedule Consultation</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
