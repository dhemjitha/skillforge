import { NextResponse } from 'next/server';
import connectDB from '@/server/infrastructure/db';
import Course from '@/server/infrastructure/schemas/Course';

export async function GET() {
    try {
        await connectDB();
        const courses = await Course.find({});
        return NextResponse.json(courses, { status: 200 });
    } catch (error: unknown) {
        console.error('Error fetching courses:', error);
        return NextResponse.json(
            { error: 'Failed to fetch courses' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();

        console.log("Data is coming properly:", data);

        const { name, description, image, price, mentorName, duration, language, level, isActive } = data;

        const newCourse = new Course({
            name,
            description,
            image,
            price,
            mentorName,
            duration,
            language,
            level,
            isActive: isActive ?? true,
        });

        await newCourse.save();

        return NextResponse.json({ message: "Course created successfully!" }, { status: 201 });
    } catch (error: unknown) {
        console.error("Course Creation Error:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}