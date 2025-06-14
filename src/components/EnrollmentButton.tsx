"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { GraduationCap, BookOpen, Clock, Award } from "lucide-react"

interface EnrollmentButtonProps {
  price: number
  courseName: string
  courseId: string
}

const EnrollmentButton: React.FC<EnrollmentButtonProps> = ({ price, courseName, courseId }) => {
  const router = useRouter()
  const { userId } = useAuth()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(false)

  const handleEnrollmentClick = () => {
    setIsDialogOpen(true)
  }

  const checkUserEnrollment = async () => {
    try {
      const response = await fetch('/api/cohorts/user')
      if (!response.ok) {
        throw new Error('Failed to fetch enrollments')
      }
      
      const cohorts = await response.json()
      
      // Check if user is already enrolled in this course
      const isEnrolled = cohorts.some((cohort: any) => 
        cohort.courseId._id === courseId || cohort.courseId === courseId
      )
      
      return isEnrolled
    } catch (error) {
      console.error('Error checking enrollment:', error)
      return false
    }
  }

  const handleProceedToEnrollment = async () => {
    if (!userId) {
      toast.error("Please sign in to enroll in this course")
      router.push("/sign-in")
      return
    }

    setIsCheckingEnrollment(true)

    try {
      const isAlreadyEnrolled = await checkUserEnrollment()
      
      if (isAlreadyEnrolled) {
        toast.error("You are already enrolled in this course!")
        setIsDialogOpen(false)
        setIsCheckingEnrollment(false)
        return
      }

      const enrollmentDetails = {
        courseId: courseId,
        courseName: courseName,
        price: price,
        enrollmentDate: new Date().toISOString(),
      }

      // Send enrollment details to the server or handle it as needed
      const encodedEnrollmentDetails = btoa(JSON.stringify(enrollmentDetails))

      router.push(`/checkout?price=${price}&enrollment=${encodedEnrollmentDetails}`)
    } catch (error) {
      toast.error("Failed to check enrollment status. Please try again.")
      console.error('Error during enrollment process:', error)
    } finally {
      setIsCheckingEnrollment(false)
    }
  }

  return (
    <div>
      <Button 
        className="w-full text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02]" 
        variant="blue"
        onClick={handleEnrollmentClick}
      >
        Enroll Now - ${price}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
              Enroll in Course
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{courseName}</h3>
              <p className="text-gray-600">You&apos;re about to enroll in this amazing course!</p>
            </div>

            {/* Course Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-gray-800 mb-3">What&apos;s included:</h4>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Lifetime access to course content</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-green-500" />
                  <span>Learn at your own pace</span>
                </div>
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 mr-2 text-purple-500" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center text-sm">
                  <GraduationCap className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Access to community and support</span>
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Course Price:</span>
                <span className="text-2xl font-bold text-blue-600">${price}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">One-time payment • Lifetime access</p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="blue"
              onClick={handleProceedToEnrollment}
              disabled={isCheckingEnrollment}
            >
              {isCheckingEnrollment ? "Checking..." : "Proceed to Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EnrollmentButton 