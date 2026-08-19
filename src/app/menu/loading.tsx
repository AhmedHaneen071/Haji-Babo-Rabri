export default function MenuLoading() {
  return (
    <main className="min-h-screen" style={{ background: '#041A12' }}>
      <div className="section-container py-20">
        {/* Header skeleton */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-12 w-64 bg-brand-gold/10 rounded mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-brand-gold/10 rounded mx-auto"></div>
        </div>
        
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-brand-green-dark/30 rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-brand-gold/10"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-brand-gold/10 rounded w-3/4"></div>
                <div className="h-4 bg-brand-gold/10 rounded w-full"></div>
                <div className="h-4 bg-brand-gold/10 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
