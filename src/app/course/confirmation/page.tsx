"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2, CheckCircle, AlertCircle, Home, Calendar, User, Clock, Globe, BarChart3, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConfettiFireworks } from "@/components/magicui/ConfettiFireworks"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [enrollmentDetails, setEnrollmentDetails] = useState<any>(null)
  const { userId } = useAuth()
  const isEnrollmentCreated = useRef(false)

  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        const sessionId = searchParams.get("session_id")

        if (!sessionId) {
          setStatus("error")
          return
        }

        const response = await fetch(`/api/payments/check-session-status?session_id=${sessionId}`)

        if (!response.ok) {
          throw new Error("Failed to verify payment")
        }

        const data = await response.json()

        if (data.status === "complete") {
          setStatus("success")
          setEnrollmentDetails(data.enrollmentDetails)
        } else {
          setStatus("error")
        }
      } catch (error) {
        console.error("Error checking session status:", error)
        setStatus("error")
      }
    }

    checkSessionStatus()
  }, [searchParams])

  useEffect(() => {
    const handleCreateEnrollment = async () => {
      try {
        if (!userId) {
          toast.error("User not authenticated")
          return
        }

        const sanitizedEnrollmentDetails = {
          courseId: enrollmentDetails.courseId,
          enrollmentDate: enrollmentDetails.enrollmentDate,
          isActive: true,
        }

        const response = await fetch("/api/cohorts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitizedEnrollmentDetails),
        })

        if (response.ok) {
          toast.success("You are now enrolled in the course")
        } else {
          const errorData = await response.json()
          console.error("Enrollment creation failed:", errorData)
          toast.error("Failed to create enrollment")
        }
      } catch (error) {
        toast.error("Failed to create enrollment")
        console.error(error)
      }
    }

    if (status === "success" && enrollmentDetails && userId && !isEnrollmentCreated.current) {
      isEnrollmentCreated.current = true
      handleCreateEnrollment()
    }
  }, [status, enrollmentDetails, userId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container py-12 flex flex-col items-center justify-center min-h-screen max-w-7xl mx-auto px-6 lg:px-8">

        {status === "loading" && (
          <Card>
            <CardContent className="flex flex-col items-center py-12 px-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-full animate-ping opacity-25"></div>
                <div className="relative bg-blue-500 rounded-full p-4">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-900">Verifying Payment</h2>
              <p className="text-gray-600 text-center leading-relaxed">
                Please wait while we confirm your enrollment and process your payment securely
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
                <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: "70%" }}></div>
              </div>
            </CardContent>
          </Card>
        )}

        {status === "success" && (
          <div className="w-full space-y-8 animate-in fade-in-50 duration-700">
            {/* Success Header */}
            <Card className="text-center shadow-2xl border-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white overflow-hidden">
              <CardContent className="py-12 px-8 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/success-pattern.svg')] opacity-10"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold mb-4">🎉 Enrollment Confirmed!</h1>
                  <p className="text-green-100 text-lg leading-relaxed max-w-2xl mx-auto">
                    Congratulations! Your payment was successful and you're now officially enrolled. 
                    Your learning journey begins today!
                  </p>
                </div>
              </CardContent>
            </Card>

            {enrollmentDetails && (
              <>
                {/* Course Overview Card */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      Course Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {enrollmentDetails.courseName}
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {enrollmentDetails.level}
                        </Badge>
                        <Badge variant="outline" className="border-purple-200 text-purple-700">
                          {enrollmentDetails.language}
                        </Badge>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Mentor</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{enrollmentDetails.mentorName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                            <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{enrollmentDetails.duration}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Enrollment Date</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {new Date(enrollmentDetails.enrollmentDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700">
                          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400">Total Paid</p>
                            <p className="font-bold text-xl text-emerald-700 dark:text-emerald-300">${enrollmentDetails.amount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps Card */}
                <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <CardContent className="py-8 px-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      What's Next?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-xl font-bold">1</span>
                        </div>
                        <h4 className="font-semibold">Check Your Dashboard</h4>
                        <p className="text-blue-100 text-sm">You can access your course materials and start learning</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-xl font-bold">2</span>
                        </div>
                        <h4 className="font-semibold">Meet Your Mentor</h4>
                        <p className="text-blue-100 text-sm">You can schedule your first session with {enrollmentDetails.mentorName}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-xl font-bold">3</span>
                        </div>
                        <h4 className="font-semibold">Start Learning</h4>
                        <p className="text-blue-100 text-sm">You can start your personalized learning journey</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            <ConfettiFireworks />
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                variant="blue" 
                onClick={() => router.push("/")}
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}

        {status === "error" && (
          <Card className="w-full">
            <CardContent className="text-center py-12 px-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">Payment Verification Failed</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md mx-auto">
                We couldn't verify your payment. If you believe this is an error, please contact our customer support team.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-red-800 mb-2">Need Help?</h3>
                <p className="text-red-700 text-sm mb-4">Our support team is here to assist you with any payment issues.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                    Contact Support
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                    View FAQ
                  </Button>
                </div>
              </div>

              <Button 
                size="lg" 
                variant="blue" 
                onClick={() => router.push("/")}
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 