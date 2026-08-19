import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata: Metadata = {
  title: {
    default: 'Haji Babo Rabri | Hyderabad Since 1974',
    template: '%s | Haji Babo Rabri',
  },
  description:
    'Authentic Hyderabadi rabri, kheer, ras malai, khoya, desi ghee, and traditional dairy sweets from Haji Babo Rabri.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
