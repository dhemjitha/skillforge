import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RequirementsCard() {
    const requirements = [
        "Basic computer knowledge",
        "Willingness to learn",
        "No prior experience needed",
        "Access to a computer/laptop"
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Requirements</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                    {requirements.map((requirement, index) => (
                        <li key={index}>• {requirement}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
} 