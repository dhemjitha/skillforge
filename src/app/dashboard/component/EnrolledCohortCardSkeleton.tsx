import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EnrolledCohortCardSkeleton() {
  return (
    <div className="group relative">
      <Card className="overflow-hidden border-0 shadow-lg">
        {/* Course Image Skeleton */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Skeleton className="w-full h-full bg-gray-300" />
          {/* Status Badge Skeleton */}
          <div className="absolute top-3 right-3">
            <Skeleton className="w-12 h-6 rounded-full bg-gray-400" />
          </div>
        </div>
        
        {/* Course Content Skeleton */}
        <CardContent className="p-4 space-y-3">
          <div className="space-y-1.5">
            {/* Title Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-300" />
              <Skeleton className="h-4 w-3/4 bg-gray-300" />
            </div>
            
            {/* Mentor Name Skeleton */}
            <div className="flex items-center space-x-1">
              <Skeleton className="w-3 h-3 rounded-full bg-gray-300" />
              <Skeleton className="h-3 w-24 bg-gray-300" />
            </div>
          </div>
          
          {/* Course Details Skeleton */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-16 bg-gray-300" />
              <Skeleton className="h-3 w-12 bg-gray-300" />
            </div>
            <Skeleton className="h-3 w-20 bg-gray-300" />
          </div>
          
          {/* Button Skeleton */}
          <Skeleton className="h-8 w-full bg-gray-300" />
        </CardContent>
      </Card>
    </div>
  );
} 