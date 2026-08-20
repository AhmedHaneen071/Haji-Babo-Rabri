export interface Coupon {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  description: string;
  minOrder?: number;
  maxDiscount?: number;
  expiresAt?: string;
}

export const COUPONS: Record<string, Coupon> = {
  WELCOME10: {
    code: 'WELCOME10',
    type: 'percent',
    value: 10,
    description: '10% off your first order',
  },
  EID15: {
    code: 'EID15',
    type: 'percent',
    value: 15,
    description: '15% off festive orders',
    maxDiscount: 5000,
  },
  SAVE200: {
    code: 'SAVE200',
    type: 'fixed',
    value: 200,
    description: 'PKR 200 off your order',
    minOrder: 1500,
  },
};

export function getCoupon(code: string): Coupon | null {
  const normalized = code.trim().toUpperCase();
  return COUPONS[normalized] ?? null;
}

export function couponExpired(coupon: Coupon): boolean {
  if (!coupon.expiresAt) return false;
  return new Date(coupon.expiresAt).getTime() < Date.now();
}

export function calculateDiscount(coupon: Coupon, subtotal: number): number {
  if (coupon.type === 'fixed') return Math.min(coupon.value, subtotal);
  const raw = (subtotal * coupon.value) / 100;
  if (coupon.maxDiscount) return Math.min(raw, coupon.maxDiscount);
  return Math.round(raw);
}