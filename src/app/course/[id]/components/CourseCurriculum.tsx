import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";

interface Lesson {
    title: string;
    duration: string;
    completed: boolean;
}

interface CourseCurriculumProps {
    curriculum: Lesson[];
}

export default function CourseCurriculum({ curriculum }: CourseCurriculumProps) {
    const totalMinutes = curriculum.reduce((acc, lesson) => {
        const time = lesson.duration.includes('h') 
            ? parseFloat(lesson.duration) * 60 
            : parseFloat(lesson.duration);
        return acc + time;
    }, 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BookOpen className="h-6 w-6 mr-2 text-purple-500" />
                    Course Curriculum
                </CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{curriculum.length} lessons</span>
                    <span>{totalMinutes} total minutes</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {curriculum.map((lesson, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3">
                                    {index + 1}
                                </div>
                                <span className="font-medium">{lesson.title}</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{lesson.duration}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 