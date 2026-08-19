export default function ProductLoading() {
  return (
    <main className="min-h-screen" style={{ background: '#041A12' }}>
      <div className="section-container py-20">
        <div className="grid md:grid-cols-2 gap-12 animate-pulse">
          {/* Image skeleton */}
          <div className="aspect-square bg-brand-gold/10 rounded-xl"></div>
          
          {/* Content skeleton */}
          <div className="space-y-6">
            <div className="h-8 bg-brand-gold/10 rounded w-1/4"></div>
            <div className="h-12 bg-brand-gold/10 rounded w-3/4"></div>
            <div className="h-6 bg-brand-gold/10 rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-brand-gold/10 rounded w-full"></div>
              <div className="h-4 bg-brand-gold/10 rounded w-full"></div>
              <div className="h-4 bg-brand-gold/10 rounded w-2/3"></div>
            </div>
            <div className="h-12 bg-brand-gold/10 rounded w-full"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
