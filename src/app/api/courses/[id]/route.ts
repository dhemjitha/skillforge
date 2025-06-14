import { NextResponse } from 'next/server';
import connectDB from '@/server/infrastructure/db';
import Course from '@/server/infrastructure/schemas/Course';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const course = await Course.findById(params.id);
        
        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        console.error('Error fetching course:', error);
        return NextResponse.json(
            { error: 'Failed to fetch course' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const body = await request.json();
        
        const course = await Course.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        );

        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        console.error('Error updating course:', error);
        return NextResponse.json(
            { error: 'Failed to update course' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const course = await Course.findByIdAndDelete(params.id);

        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting course:', error);
        return NextResponse.json(
            { error: 'Failed to delete course' },
            { status: 500 }
        );
    }
}
