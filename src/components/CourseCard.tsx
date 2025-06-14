import React from 'react'
import { Star, User, Clock, Circle } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

type Course = {
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
}

type CourseCardProps = {
    course: Course;
    confidence?: number;
}


function CourseCard({ course, confidence }: CourseCardProps) {
    // Calculate match percentage for display
    const matchPercentage = confidence ? Math.round(confidence * 100) : null;
    
    return (
        <Link
            href={`/course/${course._id}`}
            key={course._id}
            className="block group relative"
        >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-gray-200">
                <Image
                    width={1920}
                    height={1080}
                    src={course.image}
                    alt={course.name}
                    className="object-cover w-full h-full absolute transition-all duration-300 group-hover:scale-105"
                />
                
                {/* Enrollment status badge */}
                <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-lg ${
                    course.isActive 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                        : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                }`}>
                    <Circle className="w-3 h-3 text-white mr-2" />
                    {course.isActive ? 'Enrollment Open' : 'Enrollment Over'}
                </div>
                
                {/* Confidence badge - positioned at top left, same line as enrollment badge */}
                {matchPercentage && matchPercentage < 100 && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-gray-900 to-black text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-lg">
                        {matchPercentage}% match
                    </div>
                )}
                
                <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                    course.level.toLowerCase() === 'beginner' 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold' 
                        : course.level.toLowerCase() === 'intermediate'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold'
                        : course.level.toLowerCase() === 'advanced'
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm font-semibold'
                }`}>
                    {course.level}
                </div>
            </div>

            <div className="mt-4 space-y-3 px-1">
                <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">{course.name}</h3>
                
                <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm font-medium">Instructor: {course.mentorName}</span>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < Math.floor(course?.rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                            ))}
                        </div>
                        <span className="font-semibold text-gray-900">{course?.rating ?? "New"}</span>
                        <span className="text-gray-500 text-sm">
                            ({course.reviews?.toLocaleString() ?? "No"} Reviews)
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">${course.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 line-through">${(course.price + 20).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                    </div>
                </div>
                
                {/* Enroll button that appears on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02]">
                        Enroll Now
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard 