const SkeletonCard = () => (
  <div className="rounded-2xl p-5 bg-card shadow-card space-y-4 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="h-4 w-12 rounded bg-muted" />
      <div className="h-5 w-40 rounded bg-muted" />
    </div>
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <div className="h-4 w-16 rounded bg-muted shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-full rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HotelSkeleton = () => (
  <div className="rounded-2xl p-2 bg-card shadow-card animate-pulse">
    <div className="aspect-video rounded-lg bg-muted" />
    <div className="p-3 space-y-2">
      <div className="h-4 w-2/3 rounded bg-muted" />
      <div className="h-3 w-full rounded bg-muted" />
      <div className="h-4 w-1/3 rounded bg-muted" />
      <div className="h-8 w-full rounded-lg bg-muted mt-2" />
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="space-y-8">
    <div className="space-y-2">
      <div className="h-8 w-64 rounded bg-muted animate-pulse" />
      <div className="h-4 w-48 rounded bg-muted animate-pulse" />
    </div>

    <div className="space-y-4">
      <div className="h-5 w-32 rounded bg-muted animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => <HotelSkeleton key={i} />)}
      </div>
    </div>

    <div className="space-y-4">
      <div className="h-5 w-32 rounded bg-muted animate-pulse" />
      {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
    </div>
  </div>
);

export default LoadingSkeleton;
