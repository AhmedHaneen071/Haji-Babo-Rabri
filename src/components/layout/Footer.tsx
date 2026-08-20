'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { GoldDivider, OrnamentDivider } from '@/components/ui/OrnamentDivider';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu & Shop' },
  { href: '/catering', label: 'Catering & Bulk' },
  { href: '/wishlist', label: 'Wishlist' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/checkout', label: 'Checkout' },
];

const products = [
  { href: '/menu?category=rabri', label: 'Plain Rabri' },
  { href: '/menu?category=rabri', label: 'Pista Rabri' },
  { href: '/menu?category=kheer', label: 'Signature Rabri Kheer' },
  { href: '/menu?category=milk-desserts', label: 'Ras Malai' },
  { href: '/menu?category=dairy-products', label: 'Desi Ghee' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #041A12 0%, #020F0A 100%)',
        borderTop: '1px solid rgba(212,166,42,0.2)',
      }}
    >
      {/* Top ornament */}
      <div className="section-container pt-6">
        <OrnamentDivider symbol="" />
      </div>

      {/* Main footer content */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-brand-gold/50 flex items-center justify-center bg-brand-green-dark">
                <span className="text-brand-gold font-serif font-bold text-xl">HBR</span>
              </div>
              <div>
                <div className="font-serif font-bold text-brand-cream text-lg">Haji Babo</div>
                <div className="text-gold-gradient font-display tracking-widest text-sm font-semibold">RABRI</div>
              </div>
            </div>
            <p className="text-brand-cream/50 text-sm leading-relaxed mb-4">
              Heritage in every spoon. Authentic Hyderabadi rabri and traditional dairy
              delicacies, crafted with the taste and tradition preserved since 1974.
            </p>
            <div className="flex items-center gap-2 text-brand-gold/70 text-xs">
              <span className="text-brand-gold" aria-hidden="true">✦</span>
              <span className="uppercase tracking-widest font-semibold">Est. 1974</span>
              <span className="text-brand-gold" aria-hidden="true">✦</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {['facebook', 'instagram', 'twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full border border-brand-gold/25 flex items-center justify-center text-brand-cream/50 hover:text-brand-gold hover:border-brand-gold/50 transition-colors"
                  aria-label={social}
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    {social === 'facebook' && (
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    )}
                    {social === 'instagram' && (
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 4h11A2.5 2.5 0 0120 6.5v11a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 17.5v-11A2.5 2.5 0 016.5 4z" />
                    )}
                    {social === 'twitter' && (
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <h3 className="font-serif font-semibold text-brand-cream text-base mb-4">
              Quick Links
            </h3>
            <GoldDivider className="mb-4 max-w-[60px]" />
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream/55 hover:text-brand-gold text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="text-brand-gold/40 text-xs" aria-hidden="true">▸</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Menu */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            <h3 className="font-serif font-semibold text-brand-cream text-base mb-4">
              Our Menu
            </h3>
            <GoldDivider className="mb-4 max-w-[60px]" />
            <ul className="space-y-2.5">
              {products.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="text-brand-cream/55 hover:text-brand-gold text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="text-brand-gold/40 text-xs" aria-hidden="true">▸</span>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            <h3 className="font-serif font-semibold text-brand-cream text-base mb-4">
              Find Us
            </h3>
            <GoldDivider className="mb-4 max-w-[60px]" />
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-brand-gold mt-0.5 shrink-0" />
                <span className="text-brand-cream/55 text-sm leading-relaxed">
                  Opposite Bombay Bakery, Cantt Board Office, Salahuddin Road,
                  Hyderabad, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-brand-gold shrink-0" />
                <a
                  href="tel:+923122307882"
                  className="text-brand-cream/55 hover:text-brand-gold text-sm transition-colors"
                >
                  +92 312 2307882
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-brand-gold shrink-0" />
                <a
                  href="mailto:hajibaborabri@gmail.com"
                  className="text-brand-cream/55 hover:text-brand-gold text-sm transition-colors"
                >
                  hajibaborabri@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={15} className="text-brand-gold shrink-0" />
                <a
                  href="https://hajibaborabri.com"
                  className="text-brand-cream/55 hover:text-brand-gold text-sm transition-colors"
                >
                  hajibaborabri.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={15} className="text-brand-gold shrink-0" />
                <span className="text-brand-cream/55 text-sm">Open 24 Hours, 7 Days</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-5"
        style={{ borderColor: 'rgba(212,166,42,0.12)' }}
      >
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-cream/35 text-xs text-center">
            © {new Date().getFullYear()} Haji Babo Rabri. All rights reserved.
          </p>
          <p className="text-brand-cream/25 text-xs text-center">
            Serving Hyderabad since 1974  Heritage in every spoon
          </p>
        </div>
      </div>
    </footer>
  );
}
