interface CohortHeaderProps {
    courseTitle: string;
    mentorName: string;
}

export default function CohortHeader({ courseTitle, mentorName }: CohortHeaderProps) {
    return (
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden rounded-3xl">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full"></div>
                <div className="absolute top-20 right-32 w-20 h-20 border border-white/15 rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 border border-white/10 rounded-full"></div>
                <div className="absolute bottom-20 left-32 w-16 h-16 border border-white/15 rounded-full"></div>
                
                {/* Additional decorative circles */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full"></div>
                <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/5 rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-white/10 rounded-full"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        {courseTitle}
                    </h1>
                    
                    <div className="flex items-center justify-center space-x-2 text-lg">
                        <span className="text-blue-100">A Course by {mentorName}</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 