import React from 'react';
import EnrolledCohortCard from './EnrolledCohortCard';
import { Cohort } from '../../../../types/course';

interface RecentlyEnrolledSectionProps {
  cohorts: Cohort[];
  onContinueLearning: (cohortId: string) => void;
  onUnenroll: (cohortId: string) => void;
}

export default function RecentlyEnrolledSection({ 
  cohorts, 
  onContinueLearning,
  onUnenroll
}: RecentlyEnrolledSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Recently Enrolled
      </h2>
      
      {cohorts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No enrolled courses yet</div>
          <div className="text-gray-400 text-sm mt-2">Start learning by enrolling in a course!</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cohorts.map((cohort) => (
            <EnrolledCohortCard
              key={cohort._id}
              cohort={cohort}
              onContinueLearning={onContinueLearning}
              onUnenroll={onUnenroll}
            />
          ))}
        </div>
      )}
    </div>
  );
} 