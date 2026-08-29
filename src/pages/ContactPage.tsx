import { motion } from 'framer-motion';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80" alt="Contact Forever Bali Weddings" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="uppercase tracking-[0.35em] text-champagne">Contact</p>
            <h1 className="mt-4 font-heading text-5xl sm:text-6xl">Begin planning your timeless Bali celebration.</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/70 bg-charcoal p-8 text-white shadow-luxe sm:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-champagne">Visit or Contact Us</p>
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl">We would love to hear about your dream wedding.</h2>
            <p className="mt-6 text-white/75">Schedule a complimentary consultation with our wedding planner today and begin planning a celebration that feels effortless, elegant, and unforgettable.</p>
            <div className="mt-8 space-y-4 text-white/80">
              <div className="flex items-center gap-3"><MapPin size={18} className="text-champagne" /> <span>Forever Bali Weddings<br />Denpasar, Bali, Indonesia</span></div>
              <div className="flex items-center gap-3"><MessageCircle size={18} className="text-champagne" /> <span>WhatsApp<br />+62 813 7007 4777</span></div>
              <div className="flex items-center gap-3"><Mail size={18} className="text-champagne" /> <span>Email<br />foreverbaliwedding@gmail.com</span></div>
            </div>
            <a href="https://wa.me/6281370074777" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:scale-[1.02]">
              <MessageCircle size={16} /> Contact on WhatsApp
            </a>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-luxe sm:p-10">
            <form className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input className="rounded-full border border-beige bg-ivory px-5 py-3 outline-none" placeholder="Name" />
                <input className="rounded-full border border-beige bg-ivory px-5 py-3 outline-none" placeholder="Email" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <input className="rounded-full border border-beige bg-ivory px-5 py-3 outline-none" placeholder="Phone" />
                <input className="rounded-full border border-beige bg-ivory px-5 py-3 outline-none" placeholder="Country" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <input className="rounded-full border border-beige bg-ivory px-5 py-3 outline-none" placeholder="Wedding Date" />
                <input className="rounded-full border border-beige bg-ivory px-5 py-3 outline-none" placeholder="Estimated Guests" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <input className="rounded-full border border-beige bg-ivory px-5 py-3 outline-none" placeholder="Estimated Budget" />
                <input className="rounded-full border border-beige bg-ivory px-5 py-3 outline-none" placeholder="Preferred Venue" />
              </div>
              <textarea className="min-h-[140px] w-full rounded-[1.25rem] border border-beige bg-ivory px-5 py-3 outline-none" placeholder="Tell us about your dream wedding" />
              <button className="rounded-full bg-charcoal px-7 py-3 font-medium text-white transition hover:bg-champagne hover:text-charcoal">Schedule Consultation</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
