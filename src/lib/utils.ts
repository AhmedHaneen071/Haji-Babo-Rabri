import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | null): string {
  if (price === null) return 'Price on Request';
  return `PKR ${price.toLocaleString('en-PK')}`;
}

export function formatTotal(
  items: { product: { price: number | null }; quantity: number }[]
): number {
  return items.reduce((total, item) => {
    if (item.product.price === null) return total;
    return total + item.product.price * item.quantity;
  }, 0);
}
