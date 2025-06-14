import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface ActiveProgramsCardProps {
  count: number;
}

export default function ActiveProgramsCard({ count }: ActiveProgramsCardProps) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm max-w-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-4">
        <CardTitle className="text-sm font-medium text-gray-600">
          Active Programs
        </CardTitle>
        <Sparkles className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-2xl font-bold text-gray-900">
          {count}
        </div>
      </CardContent>
    </Card>
  );
} 