'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, MapPin, ShoppingCart, Menu, X, Phone, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/catering', label: 'Catering' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-brand-green-deep/95 backdrop-blur-md shadow-lg border-b border-brand-gold/20'
            : 'bg-transparent'
        )}
        style={{ backgroundColor: scrolled ? 'rgba(4,26,18,0.95)' : 'transparent' }}
      >
        {/* Top strip */}
        <div
          className="hidden md:block text-center py-1.5 text-xs text-brand-gold/80 border-b border-brand-gold/10"
          style={{ backgroundColor: 'rgba(4,26,18,0.6)' }}
        >
          <span className="inline-flex items-center gap-1.5 justify-center">
            <Phone size={12} aria-hidden="true" />
            +92 312 2307882
          </span>
          <span className="mx-3 text-brand-gold/30">|</span>
          <span className="inline-flex items-center gap-1.5 justify-center">
            <Clock size={12} aria-hidden="true" />
            Open 24 Hours
          </span>
          <span className="mx-3 text-brand-gold/30">|</span>
          <span className="inline-flex items-center gap-1.5 justify-center">
            <MapPin size={12} aria-hidden="true" />
            Opposite Bombay Bakery, Salahuddin Road, Hyderabad
          </span>
        </div>

        <nav className="section-container">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="Haji Babo Rabri Home">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-brand-gold/60 flex items-center justify-center bg-brand-green-dark group-hover:border-brand-gold transition-colors">
                  <span className="text-brand-gold font-serif font-bold text-sm leading-none">HBR</span>
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-bold text-brand-cream text-base md:text-lg tracking-wide leading-none">
                  Haji Babo
                </span>
                <span className="text-gold-gradient font-display font-semibold text-sm tracking-widest leading-none">
                  RABRI
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'px-4 py-2 rounded text-sm font-medium transition-colors duration-200',
                      pathname === link.href
                        ? 'text-brand-gold'
                        : 'text-brand-cream/80 hover:text-brand-cream'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="tel:+923122307882"
                className="btn-ghost text-sm hidden lg:flex items-center gap-1.5"
              >
                <Phone size={14} />
                Call Now
              </a>
              <Link
                href="/wishlist"
                className="relative p-2 text-brand-cream/80 hover:text-brand-cream transition-colors"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <motion.span
                    key="wishlist-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-maroon text-brand-cream text-[10px] font-bold rounded-full flex items-center justify-center border border-brand-gold/30"
                  >
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </motion.span>
                )}
              </Link>
              <button
                onClick={openCart}
                className="relative p-2 text-brand-cream/80 hover:text-brand-cream transition-colors"
                aria-label={`Cart (${cartCount} items)`}
              >
                <ShoppingCart size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key="cart-count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-maroon text-brand-cream text-[10px] font-bold rounded-full flex items-center justify-center border border-brand-gold/30"
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <Link href="/menu" className="btn-gold text-sm py-2 px-4 hidden lg:inline-flex">
                Order Now
              </Link>
            </div>

            {/* Mobile Right */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={openCart}
                className="relative p-2 text-brand-cream/80 hover:text-brand-cream"
                aria-label={`Cart (${cartCount} items)`}
              >
                <ShoppingCart size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key="cart-count-mobile"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-maroon text-brand-cream text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-brand-cream/80 hover:text-brand-cream"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            className="fixed top-0 left-0 bottom-0 z-40 w-72 md:hidden overflow-y-auto"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(160deg, #072D1E, #041A12)',
              borderRight: '1px solid rgba(212,166,42,0.2)',
            }}
          >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-gold/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-brand-gold/60 flex items-center justify-center bg-brand-green-dark">
              <span className="text-brand-gold font-serif font-bold text-[10px]">HBR</span>
            </div>
            <div>
              <div className="font-serif font-bold text-brand-cream text-sm">Haji Babo</div>
              <div className="text-gold-gradient font-display text-xs tracking-widest">RABRI</div>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 text-brand-cream/60 hover:text-brand-cream"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Links */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30'
                      : 'text-brand-cream/80 hover:bg-white/5 hover:text-brand-cream'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-3">
            <Link
              href="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded border border-brand-gold/30 text-brand-gold text-sm font-semibold"
            >
              <Heart size={16} aria-hidden="true" />
              Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ''}
            </Link>
            <Link href="/menu" onClick={() => setMobileOpen(false)} className="btn-gold w-full justify-center text-sm py-3">
              <ShoppingCart size={16} aria-hidden="true" />
              Order Now
            </Link>
            <a
              href="https://wa.me/923122307882"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-sm font-semibold"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Order
            </a>
          </div>
        </nav>

        {/* Mobile Contact */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-brand-gold/15">
          <p className="text-xs text-brand-cream/40 text-center">
            Salahuddin Road, Hyderabad
          </p>
          <p className="text-xs text-brand-gold/60 text-center mt-1">Open 24 Hours | Since 1974</p>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
