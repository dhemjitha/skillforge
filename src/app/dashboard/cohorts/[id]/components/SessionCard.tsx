import { Calendar, Clock, Users, PlayCircle, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cohort } from '../../../../../../types/course';

interface Session {
    id: number;
    title: string;
    date: string;
    time: string;
    hasRecording: boolean;
    hasMaterials: boolean;
    hasAssessment: boolean;
}

interface SessionCardProps {
    session: Session;
    cohortId: string;
    cohort: Cohort;
}

export default function SessionCard({ session, cohortId, cohort }: SessionCardProps) {
    const handleJoinSession = () => {
        console.log(`Joining session ${session.id} for cohort ${cohortId}`);
    };

    const handleWatchRecording = () => {
        console.log(`Watching recording for session ${session.id}`);
    };

    const handleViewMaterials = () => {
        console.log(`Viewing materials for session ${session.id}`);
    };

    return (
        <Card className="bg-white border-2 border-gray-200 shadow-md hover:shadow-lg hover:border-blue-200 transition-shadow duration-200">
            <CardContent className="p-6 space-y-4">
                {/* Session Title */}
                <div className="space-y-2">
                    <h3 className="font-bold text-gray-900 text-xl leading-tight">
                        {session.title}
                    </h3>
                </div>

                {/* Date and Time */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    {/* Join Session Button */}
                    <Button
                        onClick={handleJoinSession}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                        size="sm"
                    >
                        <Users className="h-4 w-4 mr-2" />
                        Join Session
                    </Button>

                    {/* Watch Recording Button */}
                    <Button
                        onClick={handleWatchRecording}
                        disabled={!session.hasRecording}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        size="sm"
                    >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Watch Recording
                    </Button>

                    {/* View Materials Button */}
                    <Button
                        onClick={handleViewMaterials}
                        disabled={!session.hasMaterials}
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        size="sm"
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        View Materials
                    </Button>

                    {/* Assessment Button */}
                    <Button
                        disabled={!session.hasAssessment}
                        variant="outline"
                        className="w-full border-gray-200 text-gray-500 bg-gray-50 cursor-not-allowed font-medium py-2.5"
                        size="sm"
                    >
                        <AlertCircle className="h-4 w-4 mr-2" />
                        No Assessment Available
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
} 