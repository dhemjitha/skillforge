import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Cohort from "@/server/infrastructure/schemas/Cohort";
import connectDB from "@/server/infrastructure/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Cohort ID is required' },
        { status: 400 }
      );
    }

    // Find the cohort by ID and populate the course details
    const cohort = await Cohort.findById(id)
      .populate('courseId', 'name description image rating reviews price mentorName duration language level isActive');

    if (!cohort) {
      return NextResponse.json(
        { error: 'Cohort not found' },
        { status: 404 }
      );
    }

    // Check if the authenticated user has access to this cohort
    // For security, only allow users to access their own cohorts
    if (cohort.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized', details: 'Access denied to this cohort' },
        { status: 403 }
      );
    }

    return NextResponse.json(cohort, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching cohort:', error);
    
    // Handle specific MongoDB errors
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid cohort ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch cohort', details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
