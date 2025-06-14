'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, User, Calendar, X } from 'lucide-react';
import { Cohort } from '../../../../types/course';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface EnrolledCohortCardProps {
  cohort: Cohort;
  onContinueLearning?: (cohortId: string) => void;
  onUnenroll?: (cohortId: string) => void;
}

export default function EnrolledCohortCard({ 
  cohort, 
  onContinueLearning, 
  onUnenroll 
}: EnrolledCohortCardProps) {
  const router = useRouter();

  const handleContinueLearning = () => {
    // Navigate to the cohort detail page
    router.push(`/dashboard/cohorts/${cohort._id}`);
    onContinueLearning?.(cohort._id);
  };

  const handleUnenroll = () => {
    onUnenroll?.(cohort._id);
  };

  const enrollmentDate = new Date(cohort.enrollmentDate).toLocaleDateString();

  return (
    <div className="group relative h-full">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl h-full flex flex-col">
        {/* Course Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 flex-shrink-0">
          <Image
            src={cohort.courseId.image || '/api/placeholder/400/300'}
            alt={cohort.courseId.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Status Badge */}
          <Badge 
            className={`absolute top-3 right-3 border-0 shadow-lg text-white ${
              cohort.isActive 
                ? 'bg-green-500 hover:bg-green-500' 
                : 'bg-gray-500 hover:bg-gray-500'
            }`}
          >
            {cohort.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        
        {/* Course Content */}
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex-1 space-y-3">
            <div className="space-y-1.5">
              <h3 className="font-bold text-base text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 min-h-[2.5rem]">
                {cohort.courseId.name}
              </h3>
              
              <div className="flex items-center text-blue-600 text-xs font-medium">
                <User className="h-3 w-3 mr-1" />
                <span className="truncate">Course Mentor: {cohort.courseId.mentorName}</span>
              </div>
            </div>
            
            {/* Course Details */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">{cohort.courseId.level}</span>
                <span className="font-semibold text-green-600">${cohort.courseId.price}</span>
              </div>
              <div className="text-xs text-gray-400">
                Enrolled: {enrollmentDate}
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <Button 
            onClick={handleContinueLearning}
            disabled={!cohort.isActive}
            size="sm"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-3"
          >
            {cohort.isActive ? 'Continue Learning' : 'Course Inactive'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 