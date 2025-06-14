import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface CourseHeroProps {
    course: {
        image: string;
        name: string;
        level: string;
    };
}

export default function CourseHero({ course }: CourseHeroProps) {
   
    const getBadgeColor = (level: string) => {
        const normalizedLevel = level.toLowerCase();
        switch (normalizedLevel) {
            case 'beginner':
                return 'bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold';
            case 'intermediate':
                return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold';
            case 'advanced':
                return 'bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold';
            default:
                return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm font-semibold';
        }
    };

    return (
        <div className="relative">
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    width={1920}
                    height={1080}
                    src={course.image}
                    alt={course.name}
                    className="absolute w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                

                {/* Course Level Badge */}
                <div className="absolute top-6 left-6">
                    <Badge className={getBadgeColor(course.level)}>
                        {course.level}
                    </Badge>
                </div>
            </div>
        </div>
    );
} 