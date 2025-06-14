import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section Skeleton */}
            <Skeleton className="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl" />

            {/* Course Info Skeletons */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="space-y-3 flex-1">
                  <Skeleton className="h-10 w-full max-w-md" />
                  <div className="flex flex-wrap gap-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-28" />
                  </div>
                  <Skeleton className="h-6 w-48" />
                </div>
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>

              {/* What You'll Learn Skeleton */}
              <div className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>

              {/* Curriculum Skeleton */}
              <div className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-40" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <Skeleton className="w-8 h-8 rounded-full mr-3" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Enrollment Card Skeleton */}
              <div className="border rounded-lg p-6 space-y-6">
                <div className="text-center space-y-2">
                  <Skeleton className="h-12 w-32 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>

                <Skeleton className="h-12 w-full rounded-lg" />

                <div className="pt-4 border-t space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Instructor Card Skeleton */}
              <div className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>

              {/* Requirements Card Skeleton */}
              <div className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 