import EnrollmentButton from "@/components/EnrollmentButton";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, GraduationCap, Users } from "lucide-react";
import InstructorCard from "./InstructorCard";
import RequirementsCard from "./RequirementsCard";

interface EnrollmentSidebarProps {
    course: {
        _id: string;
        name: string;
        price: number;
        duration: string;
        mentorName: string;
    };
}

export default function EnrollmentSidebar({ course }: EnrollmentSidebarProps) {
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
                {/* Enrollment Card */}
                <Card className="shadow-xl border-0 bg-white">
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            {/* Price */}
                            <div className="text-center">
                                <div className="flex items-center justify-center space-x-2">
                                    <span className="text-4xl font-bold text-gray-900">${course.price.toLocaleString()}</span>
                                    <span className="text-lg text-gray-500 line-through">${(course.price + 20).toLocaleString()}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Limited time offer</p>
                            </div>

                            {/* Enrollment Button */}
                            <EnrollmentButton 
                                price={course.price} 
                                courseName={course.name}
                                courseId={course._id}
                            />

                            {/* Course Includes */}
                            <div className="pt-4 border-t space-y-3">
                                <h3 className="font-semibold text-gray-900">This course includes:</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                                        <span>{course.duration} hours of content</span>
                                    </div>
                                    <div className="flex items-center">
                                        <BookOpen className="h-4 w-4 mr-2 text-green-500" />
                                        <span>Downloadable resources</span>
                                    </div>
                                    <div className="flex items-center">
                                        <GraduationCap className="h-4 w-4 mr-2 text-purple-500" />
                                        <span>Certificate of completion</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-2 text-orange-500" />
                                        <span>Access to community</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Instructor Card */}
                <InstructorCard mentorName={course.mentorName} />

                {/* Requirements */}
                <RequirementsCard />
            </div>
        </div>
    );
} 