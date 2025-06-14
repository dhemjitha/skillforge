import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Course from "@/server/infrastructure/schemas/Course";
import Cohort from "@/server/infrastructure/schemas/Cohort";
import connectDB from "@/server/infrastructure/db";

export async function GET() {
  try {
    await connectDB();
    await Course.exists({});
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const cohorts = await Cohort.find({ userId: user.id })
      .populate('courseId')
      .sort({ enrollmentDate: -1 });

    return NextResponse.json(cohorts);
  } catch (error) {
    console.error('Error fetching user cohorts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cohorts', details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { cohortId } = await request.json();

    const cohort = await Cohort.findById(cohortId);

    if (!cohort) {
      return NextResponse.json(
        { error: 'Cohort not found' },
        { status: 404 }
      );
    }

    if (cohort.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    await cohort.deleteOne();

    return NextResponse.json(
      { message: 'Successfully unenrolled from course' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error unenrolling from course:', error);
    return NextResponse.json(
      { error: 'Failed to unenroll from course', details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}