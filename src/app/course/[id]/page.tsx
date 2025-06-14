import { notFound } from "next/navigation";
import CourseHero from "./components/CourseHero";
import CourseInfo from "./components/CourseInfo";
import WhatYoullLearn from "./components/WhatYoullLearn";
import CourseCurriculum from "./components/CourseCurriculum";
import EnrollmentSidebar from "./components/EnrollmentSidebar";

interface Course {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating?: number;
    reviews?: number;
    mentorName: string;
    duration: string;
    language: string;
    level: string;
    isActive: boolean;
}

async function getCourse(id: string): Promise<Course> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch course: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
    }
}

interface PageProps {
    params: {
        id: string;
    };
}

export default async function CoursePage({ params }: PageProps) {
    try {
        const { id } = params;
        const course = await getCourse(id);

        const curriculum = [
            { title: "Introduction to the Course", duration: "15 min", completed: false },
            { title: "Getting Started with Basics", duration: "45 min", completed: false },
            { title: "Core Concepts", duration: "1h 20min", completed: false },
            { title: "Hands-on Practice", duration: "2h 15min", completed: false },
            { title: "Advanced Techniques", duration: "1h 45min", completed: false },
            { title: "Final Project", duration: "3h", completed: false },
        ];

        return (
            <div className="min-h-screen max-w-7xl mx-auto px-6 lg:px-8 py-8">
                
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <CourseHero course={course} />
                            <CourseInfo course={course} />
                            <WhatYoullLearn />
                            <CourseCurriculum curriculum={curriculum} />
                        </div>

                        <EnrollmentSidebar course={course} />
                    </div>
                
            </div>
        );
    } catch (error) {
        notFound();
    }
} 