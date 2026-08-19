'use client';

import { motion } from 'motion/react';
import { Award, History, Landmark, Milk } from 'lucide-react';

const heritageItems = [
  { icon: Award, title: 'Since 1974', subtitle: 'Half a century of tradition' },
  { icon: History, title: 'Traditional Recipes', subtitle: 'Unchanged for generations' },
  { icon: Milk, title: 'Premium Ingredients', subtitle: 'Only the finest quality' },
  { icon: Landmark, title: 'Hyderabadi Heritage', subtitle: 'Authentic taste of the city' },
];

export default function HeritageStrip() {
  return (
    <section
      className="relative py-0"
      style={{
        background: 'linear-gradient(135deg, #4A080B 0%, #7A1015 40%, #4A080B 100%)',
        borderTop: '1px solid rgba(212,166,42,0.3)',
        borderBottom: '1px solid rgba(212,166,42,0.3)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,166,42,0.8), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,166,42,0.8), transparent)' }}
      />

      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-gold/15">
          {heritageItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="flex flex-col items-center text-center py-6 px-4 group"
              >
                <Icon
                  size={30}
                  className="text-brand-gold mb-2 group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                />
                <div className="font-serif font-bold text-brand-cream text-base md:text-lg leading-tight">
                  {item.title}
                </div>
                <div className="text-brand-gold/70 text-xs mt-1 uppercase tracking-wider">
                  {item.subtitle}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
