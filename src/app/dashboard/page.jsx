"use client";

import React from 'react';
import DashboardLayout from '@/app/dashboard/component/DashboardLayout';
import ActiveProgramsCard from '@/app/dashboard/component/ActiveProgramsCard';
import RecentlyEnrolledSection from '@/app/dashboard/component/RecentlyEnrolledSection';
import Loading from '@/app/dashboard/component/Loading';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function DashboardPage() {
  const { data, loading, error, handleContinueLearning, handleUnenroll } = useDashboardData();

  if (loading) {
    return (
      <DashboardLayout>
        <Loading />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
            <div className="text-gray-600">{error}</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-600">No data available</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Welcome back!
        </h1>
      </div>

      {/* Active Programs Card */}
      <ActiveProgramsCard count={data.activeProgramsCount} />

      {/* Recently Enrolled Section */}
      <RecentlyEnrolledSection 
        cohorts={data.enrolledCohorts}
        onContinueLearning={handleContinueLearning}
        onUnenroll={handleUnenroll}
      />
    </DashboardLayout>
  );
}
