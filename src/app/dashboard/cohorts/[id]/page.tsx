'use client';

import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import CohortHeader from "./components/CohortHeader";
import SessionCard from "./components/SessionCard";

interface Cohort {
    _id: string;
    userId: string;
    courseId: {
        _id: string;
        name: string;
        description: string;
        image: string;
        rating?: number;
        reviews?: number;
        price: number;
        mentorName: string;
        duration: string;
        language: string;
        level: string;
        isActive: boolean;
    };
    enrollmentDate: string;
    isActive: boolean;
}

interface Session {
    id: number;
    title: string;
    date: string;
    time: string;
    hasRecording: boolean;
    hasMaterials: boolean;
    hasAssessment: boolean;
}

interface PageProps {
    params: {
        id: string;
    };
}

export default function CohortPage({ params }: PageProps) {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();
    const [cohort, setCohort] = useState<Cohort | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoaded) return;
        
        if (!isSignedIn) {
            router.push('/sign-in');
            return;
        }

        const fetchCohort = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/cohorts/${params.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        notFound();
                        return;
                    }
                    throw new Error(`Failed to fetch cohort: ${response.status}`);
                }

                const cohortData = await response.json();
                setCohort(cohortData);
            } catch (err) {
                console.error('Error fetching cohort:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch cohort');
            } finally {
                setLoading(false);
            }
        };

        fetchCohort();
    }, [isLoaded, isSignedIn, params.id, router]);

    if (!isLoaded || loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading cohort...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error: {error}</p>
                    <button 
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!cohort) {
        notFound();
        return null;
    }

    // Parse duration and create sessions
    const numberOfWeeks = parseInt(cohort.courseId.duration.match(/(\d+)/)?.[1] || '8');
    const sessions = Array.from({ length: numberOfWeeks }, (_, index) => ({
        id: index + 1,
        title: `${cohort.courseId.name} | Session ${index + 1}`,
        date: new Date(Date.now() + index * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        time: "8:00:00 PM",
        hasRecording: false,
        hasMaterials: true,
        hasAssessment: false,
    }));

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-6 lg:px-8">
            <CohortHeader 
                courseTitle={cohort.courseId.name}
                mentorName={cohort.courseId.mentorName}
            />
            
            <div className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sessions.map((session) => (
                        <SessionCard
                            key={session.id}
                            session={session}
                            cohortId={cohort._id}
                            cohort={cohort}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
} 