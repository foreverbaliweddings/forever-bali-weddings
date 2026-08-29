import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';

const services = [
  { title: 'Wedding Planning', description: 'Full-service planning and strategic coordination for an elevated Bali experience.' },
  { title: 'Wedding Coordination', description: 'A calm, polished approach to timelines, guest management and event flow.' },
  { title: 'Hair & Makeup', description: 'Bridal beauty services designed to complement your wedding styling and photography.' },
  { title: 'Bridal Dress', description: 'Guidance and styling support for the perfect ceremony look and attire selection.' },
  { title: 'Groom Suit', description: 'Tailored aesthetic support for the groom and wedding party presentation.' },
  { title: 'Photography', description: 'Editorial and cinematic photography for timeless memories and refined storytelling.' },
  { title: 'Videography', description: 'Storytelling films that preserve the emotional depth of your celebration.' },
  { title: 'Drone Photography', description: 'Aerial perspectives that beautifully capture the setting and atmosphere.' },
  { title: 'Decoration', description: 'Tailored styling, florals, lighting and design to reflect your aesthetic.' },
  { title: 'Floral Design', description: 'Beautiful blooms and bespoke installations shaped to your vision.' },
  { title: 'Entertainment', description: 'Curated musical experiences and guest atmosphere for a memorable celebration.' },
  { title: 'Live Band', description: 'Elegant performances that bring warmth, energy and luxury to the evening.' },
  { title: 'Wedding Cake', description: 'Custom confectionery and presentation designed to complement the theme.' },
  { title: 'Luxury Transport', description: 'Elegant transfers and guest movement with comfort and reliability.' },
  { title: 'Airport Transfer', description: 'Seamless arrival and departure support for all guests and loved ones.' },
  { title: 'Honeymoon Planning', description: 'Thoughtful post-wedding arrangements for a romantic and relaxing escape.' },
  { title: 'Legal Documentation', description: 'Guidance and support with marriage requirements, certificates and local processes.' },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80" alt="Wedding services" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="uppercase tracking-[0.35em] text-champagne">Services</p>
            <h1 className="mt-4 font-heading text-5xl sm:text-6xl">A complete suite of luxury wedding services for effortless celebration.</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.04 }} className="rounded-[1.75rem] border border-white/70 bg-white p-7 shadow-luxe">
              <div className="mb-4 inline-flex rounded-full bg-champagne/15 p-3 text-champagne"><Check size={18} /></div>
              <h2 className="font-heading text-2xl">{service.title}</h2>
              <p className="mt-3 text-charcoal/70">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="rounded-[2rem] border border-white/70 bg-charcoal px-8 py-12 text-white sm:px-12">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-champagne">Book an Experience</p>
            <h2 className="font-heading text-4xl sm:text-5xl">Let us bring your perfect Bali wedding vision to life.</h2>
          </div>
          <div className="mt-8 flex justify-center">
            <a href="https://wa.me/6281370074777" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-champagne px-7 py-3 font-semibold text-charcoal transition hover:scale-[1.02]"><MessageCircle size={16} /> Start Planning</a>
          </div>
        </div>
      </section>
    </div>
  );
}
