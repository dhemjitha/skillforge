import { CreateCohortDTO } from "@/server/domain/dtos/cohort";
import Cohort from "../../../server/infrastructure/schemas/Cohort";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/server/infrastructure/db";

export async function POST(req: Request) {
    try {
        await connectDB();
        const authResult = await auth();
        const userId = authResult.userId;
        
        if (!userId) {
            return NextResponse.json(
                { error: 'Authentication required', details: 'User is not authenticated' },
                { status: 401 }
            );
        }

        const requestBody = await req.json();

        const cohort = CreateCohortDTO.safeParse(requestBody);

        if (!cohort.success) {
            console.error('Validation Errors:', cohort.error.errors);

            return NextResponse.json(
                { error: 'Invalid Cohort Data', details: cohort.error.errors },
                { status: 400 }
            );
        }

        // Check if user is already enrolled in this course
        const existingCohort = await Cohort.findOne({
            userId: userId,
            courseId: cohort.data.courseId
        });

        if (existingCohort) {
            return NextResponse.json(
                { error: 'Already enrolled', details: 'User is already enrolled in this course' },
                { status: 409 }
            );
        }

        await Cohort.create({
            userId: userId,
            courseId: cohort.data.courseId,
            enrollmentDate: cohort.data.enrollmentDate,
            isActive: cohort.data.isActive,
        });

        return NextResponse.json({ status: 201, message: 'Successfully enrolled in cohort' });

    } catch (error: unknown) {
        console.error('Error creating cohort:', error);
        return NextResponse.json(
            { error: 'Failed to create cohort', details: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const cohorts = await Cohort.find().populate('courseId', 'name description image price mentorName duration language level');
        return NextResponse.json(cohorts, { status: 200 });
    } catch (error: unknown) {
        console.error('Error fetching cohorts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch cohorts' },
            { status: 500 }
        );
    }
}

