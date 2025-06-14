import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function WhatYoullLearn() {
    const learningOutcomes = [
        "Master core concepts and fundamentals",
        "Build real-world projects",
        "Hands-on practical experience",
        "Industry best practices",
        "Certificate of completion",
        "Portfolio-ready projects"
    ];

    return (
        <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <GraduationCap className="h-6 w-6 mr-2 text-blue-500" />
                    What You&apos;ll Learn
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-center">
                            <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                            <span>{outcome}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 