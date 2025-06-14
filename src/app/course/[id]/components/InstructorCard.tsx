import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface InstructorCardProps {
    mentorName: string;
}

export default function InstructorCard({ mentorName }: InstructorCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Your Instructor</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {mentorName.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">{mentorName}</h3>
                        <p className="text-gray-600 text-sm">Expert Instructor</p>
                        <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">4.8</span>
                            <span className="text-sm text-gray-500 ml-1">(5,534 reviews)</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 