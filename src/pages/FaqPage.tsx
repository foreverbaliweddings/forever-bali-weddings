import { motion } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  { question: 'How far in advance should we book?', answer: 'Most couples begin planning 9 to 12 months ahead to secure top venues, preferred dates and premium suppliers.' },
  { question: 'Can you help with marriage legalities?', answer: 'Yes, we guide you through the necessary documentation, translation needs and local requirements for a smooth celebration.' },
  { question: 'Do you offer design and styling?', answer: 'Absolutely. We can coordinate florals, lighting, rentals, stationery and every element of the guest experience.' },
  { question: 'Do you welcome international couples?', answer: 'Yes, we specialise in planning luxury weddings for couples from around the world and make the process seamless from abroad.' },
];

export default function FaqPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80" alt="FAQ" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="uppercase tracking-[0.35em] text-champagne">FAQ</p>
            <h1 className="mt-4 font-heading text-5xl sm:text-6xl">Common questions about planning a luxury destination wedding in Bali.</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={item.question} className="rounded-[1.5rem] border border-beige bg-white p-6 shadow-luxe">
              <button className="flex w-full items-center justify-between text-left" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                <span className="font-semibold text-charcoal">{item.question}</span>
                <ChevronDown className={`transition ${activeFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === index && <p className="mt-4 text-charcoal/70">{item.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="rounded-[2rem] border border-white/70 bg-charcoal px-8 py-12 text-center text-white shadow-luxe sm:px-12">
          <p className="text-sm uppercase tracking-[0.35em] text-champagne">Need More Help?</p>
          <h2 className="mt-4 font-heading text-4xl sm:text-5xl">Let us answer your planning questions directly.</h2>
          <a href="https://wa.me/6281370074777" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-champagne px-7 py-3 font-semibold text-charcoal transition hover:scale-[1.02]"><MessageCircle size={16} /> Contact Planner</a>
        </div>
      </section>
    </div>
  );
}
