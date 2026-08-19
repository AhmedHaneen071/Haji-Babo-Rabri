import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#041A12' }}
    >
      <div className="text-center max-w-2xl">
        {/* Large 404 */}
        <h1 className="font-serif font-black text-9xl md:text-[12rem] text-brand-gold/20 mb-4">
          404
        </h1>
        
        {/* Title */}
        <h2 className="font-serif font-bold text-3xl md:text-5xl text-brand-cream mb-4">
          Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-brand-cream/70 text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-green-dark font-semibold rounded-lg hover:bg-brand-gold/90 transition-colors"
          >
            <Home size={20} />
            Back to Home
          </Link>
          
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-gold/30 text-brand-cream font-semibold rounded-lg hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-colors"
          >
            <Search size={20} />
            Browse Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
