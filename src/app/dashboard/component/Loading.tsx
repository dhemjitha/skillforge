import React from 'react';
import EnrolledCohortCardSkeleton from './EnrolledCohortCardSkeleton';
import { Sparkles } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Header - Static */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Welcome back!
        </h1>
      </div>

      {/* Active Programs Card - Only Count Skeleton */}
      <Card className="bg-white border border-gray-200 shadow-sm max-w-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-4">
          <h3 className="text-sm font-medium text-gray-600">
            Active Programs
          </h3>
          <Sparkles className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <p className="text-2xl font-bold">...</p>
        </CardContent>
      </Card>

      {/* Recently Enrolled Section - Only Cards Skeleton */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Recently Enrolled
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Show 3 skeleton cards */}
          {[...Array(3)].map((_, index) => (
            <EnrolledCohortCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}