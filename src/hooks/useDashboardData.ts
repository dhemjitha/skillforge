"use client"

import { useState, useEffect } from 'react';
import { Cohort, DashboardData } from '../../types/course';

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch user cohorts from the API
        const response = await fetch('/api/cohorts/user');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch cohorts: ${response.statusText}`);
        }
        
        const cohorts: Cohort[] = await response.json();
        
        // Filter active cohorts and calculate active programs count
        const activeCohorts = cohorts.filter(cohort => cohort.isActive);
        
        setData({
          activeProgramsCount: activeCohorts.length,
          enrolledCohorts: cohorts
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleContinueLearning = (cohortId: string) => {
    // In a real app, this would navigate to the course
    console.log(`Continuing cohort with ID: ${cohortId}`);
    // You could add navigation logic here:
    // router.push(`/course/${cohortId}`);
  };

  const handleUnenroll = async (cohortId: string) => {
    try {
      const response = await fetch('/api/cohorts/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cohortId }),
      });

      if (!response.ok) {
        throw new Error('Failed to unenroll from course');
      }

      // Refresh the data after successful unenrollment
      setData((prev: DashboardData | null) => prev ? {
        ...prev,
        enrolledCohorts: prev.enrolledCohorts.filter((cohort: Cohort) => cohort._id !== cohortId),
        activeProgramsCount: prev.enrolledCohorts.filter((cohort: Cohort) => 
          cohort._id !== cohortId && cohort.isActive
        ).length
      } : null);

    } catch (err) {
      console.error('Error unenrolling:', err);
      setError(err instanceof Error ? err.message : 'Failed to unenroll from course');
    }
  };

  return {
    data,
    loading,
    error,
    handleContinueLearning,
    handleUnenroll
  };
} 