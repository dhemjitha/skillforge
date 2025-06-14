import { Clock, Globe, Star, User, Users } from "lucide-react";

interface CourseInfoProps {
    course: {
        name: string;
        mentorName: string;
        duration: string;
        language: string;
        rating?: number;
        reviews?: number;
        description: string;
    };
}

export default function CourseInfo({ course }: CourseInfoProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="space-y-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{course.name}</h1>
                    
                    {/* Course Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        <div className="flex items-center">
                            <User className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="font-medium">{course.mentorName}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-green-500" />
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                            <Globe className="h-5 w-5 mr-2 text-purple-500" />
                            <span>{course.language}</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-orange-500" />
                            <span>{course.reviews?.toLocaleString() ?? "No"} Students Enrolled</span>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    className={`h-5 w-5 ${i < Math.floor(course?.rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                            ))}
                        </div>
                        <span className="font-bold text-lg">{course?.rating ?? "New"}</span>
                        <span className="text-gray-500">
                            ({course.reviews?.toLocaleString() ?? "No"} Reviews)
                        </span>
                    </div>
                </div>
                
                
            </div>

            {/* Description */}
            <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">{course.description}</p>
            </div>
        </div>
    );
} 