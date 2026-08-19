'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Award, Clock, Milk, ShoppingCart, Sparkles } from 'lucide-react';
import { HeritageBadge, OrnamentDivider } from '@/components/ui/OrnamentDivider';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 60% 40%, #1A7A50 0%, #0D5C3A 35%, #072D1E 65%, #041A12 100%)',
      }}
    >
      {/* Background ornamental pattern */}
      <div className="absolute inset-0 mughal-pattern opacity-100 pointer-events-none" />

      {/* Radial overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(4,26,18,0.6) 100%)',
        }}
      />

      {/* Top decorative border */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A62A, #E8C547, #D4A62A, transparent)' }}
      />

      <motion.div
        className="absolute top-24 left-8 md:left-12 text-brand-gold/20 select-none pointer-events-none hidden lg:block"
        animate={{ opacity: [0.1, 0.3, 0.1], rotate: [0, 20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <Sparkles size={56} />
      </motion.div>
      <motion.div
        className="absolute top-24 right-8 md:right-12 text-brand-gold/20 select-none pointer-events-none hidden lg:block"
        animate={{ opacity: [0.1, 0.3, 0.1], rotate: [0, -20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        aria-hidden="true"
      >
        <Sparkles size={56} />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Heritage badge */}
        <motion.div className="mb-8" variants={item}>
          <HeritageBadge />
        </motion.div>

        {/* Logo emblem */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <motion.div
            className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(circle at 40% 35%, #1A7A50, #0D5C3A)',
              border: '2px solid rgba(212,166,42,0.5)',
              boxShadow: '0 0 40px rgba(212,166,42,0.2), inset 0 0 20px rgba(0,0,0,0.3)',
            }}
          >
            {/* Outer ring */}
            <div
              className="absolute inset-2 rounded-full"
              style={{ border: '1px solid rgba(212,166,42,0.25)' }}
            />
            {/* Inner content */}
            <div className="text-center relative z-10 p-4">
              <div className="text-brand-gold font-serif font-bold text-3xl md:text-4xl leading-none">
                HBR
              </div>
              <div className="text-brand-gold/70 text-[8px] uppercase tracking-widest mt-1 font-semibold">
                Since 1974
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Brand name */}
        <motion.div variants={item}>
          <div className="text-brand-gold/70 font-display text-sm md:text-base uppercase tracking-[0.3em] mb-2">
            The Original
          </div>
          <h1
            className="font-serif font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-brand-cream leading-none mb-1"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
          >
            Haji Babo
          </h1>
          <h1
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #A87B18 0%, #D4A62A 40%, #F0D98A 60%, #D4A62A 80%, #A87B18 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}
          >
            RABRI
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={item} className="mt-5">
          <OrnamentDivider className="max-w-xs mx-auto mb-4" />
          <p
            className="font-display italic text-xl md:text-2xl lg:text-3xl text-brand-cream/90"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            &ldquo;Heritage in every spoon&rdquo;
          </p>
          <OrnamentDivider className="max-w-xs mx-auto mt-4" />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-brand-cream/65 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          Authentic Hyderabadi rabri &amp; traditional dairy delicacies, crafted with
          the taste and tradition we&apos;ve preserved since 1974.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link href="/menu" className="btn-gold text-base px-8 py-4 text-center inline-flex items-center gap-2">
              <ShoppingCart size={18} aria-hidden="true" />
              Order Now
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link href="/menu" className="btn-outline-gold text-base px-8 py-4 text-center inline-block">
              Explore Our Menu
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <WhatsAppButton variant="inline" label="WhatsApp Order" />
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          {[
            { icon: Award, label: 'Since 1974' },
            { icon: Sparkles, label: 'Premium Quality' },
            { icon: Milk, label: 'Pure Ingredients' },
            { icon: Clock, label: 'Open 24 Hours' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-brand-cream/60 text-sm">
              <item.icon size={16} className="text-brand-gold/70" aria-hidden="true" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-brand-gold/40 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-brand-gold/40 to-transparent" />
        </div>
      </motion.div>

      {/* Bottom decorative border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,166,42,0.4), transparent)' }}
      />
    </section>
  );
}
