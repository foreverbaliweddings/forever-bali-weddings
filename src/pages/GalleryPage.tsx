import { motion } from 'framer-motion';

const images = [
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80', alt: 'Beach wedding celebration' },
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80', alt: 'Luxury chapel wedding' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80', alt: 'Private villa wedding' },
  { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80', alt: 'Sunset ceremony' },
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80', alt: 'Romantic dinner reception' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80', alt: 'Couple portrait and decor details' },
];

export default function GalleryPage() {
  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=80" alt="Luxury wedding gallery" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="uppercase tracking-[0.35em] text-champagne">Gallery</p>
            <h1 className="mt-4 font-heading text-5xl sm:text-6xl">A curated collection of wedding beauty, romance and editorial detail.</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {images.map((image, index) => (
            <motion.img key={image.src + index} whileHover={{ scale: 1.02 }} src={image.src} alt={image.alt} className="mb-5 w-full rounded-[1.5rem] object-cover shadow-luxe" />
          ))}
        </div>
      </section>
    </div>
  );
}
