import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
})

export async function GET(req: Request) {
  try {
    const authResult = await auth();
    const userId = authResult.userId;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json({ message: "Missing session ID" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json({ message: "Session not found" }, { status: 404 })
    }

    // Check if the session belongs to this user
    if (session.client_reference_id !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Extract enrollment details from metadata
    const enrollmentDetails = {
      courseId: session.metadata?.courseId,
      courseName: session.metadata?.courseName,
      mentorName: session.metadata?.mentorName,
      duration: session.metadata?.duration,
      level: session.metadata?.level,
      language: session.metadata?.language,
      enrollmentDate: session.metadata?.enrollmentDate,
      amount: (session.amount_total! / 100).toFixed(2),
    }

    // Here you would typically save the cohort enrollment to your database
    // if the payment was successful

    return NextResponse.json({
      status: session.status,
      enrollmentDetails,
    })
  } catch (error: any) {
    console.error("Error checking session status:", error)
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 })
  }
}

