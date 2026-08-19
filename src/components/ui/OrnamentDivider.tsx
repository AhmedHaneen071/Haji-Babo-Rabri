'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface OrnamentDividerProps {
  className?: string;
  symbol?: string;
}

export function OrnamentDivider({ className, symbol = 'HBR' }: OrnamentDividerProps) {
  return (
    <div className={cn('flex items-center gap-3 my-2', className)}>
      <motion.div
        className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      />
      <motion.span
        className="text-brand-gold text-xs"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {symbol}
      </motion.span>
      <motion.div
        className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'right' }}
      />
    </div>
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn('h-px w-full', className)}
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(212,166,42,0.6), transparent)',
      }}
    />
  );
}

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(centered ? 'text-center' : '', 'mb-12', className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {badge && (
        <div className={cn('flex mb-4', centered ? 'justify-center' : '')}>
          <span className="badge-gold uppercase tracking-widest text-xs">
            {badge}
          </span>
        </div>
      )}
      <h2 className="section-title mb-4">{title}</h2>
      <OrnamentDivider className={cn('max-w-xs', centered ? 'mx-auto' : '')} />
      {subtitle && (
        <p className="section-subtitle mt-4 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}

interface HeritageBadgeProps {
  text?: string;
  className?: string;
}

export function HeritageBadge({
  text = 'Serving Hyderabad Since 1974',
  className,
}: HeritageBadgeProps) {
  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full gold-border bg-brand-gold/10',
        className
      )}
      initial={{ opacity: 0, scale: 0.9, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span className="text-brand-gold text-sm font-serif">HBR</span>
      <span className="text-brand-gold-light text-xs font-semibold uppercase tracking-widest">
        {text}
      </span>
      <span className="text-brand-gold text-sm font-serif">HBR</span>
    </motion.div>
  );
}
