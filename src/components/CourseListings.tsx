"use client"

import { useState, useEffect } from "react"
import CourseCard from "./CourseCard"
import LevelTab from "./LevelTab"
import { Skeleton } from "./ui/skeleton"
import { AlertCircle, Search } from "lucide-react"
import { useSearchContext } from "@/context/SearchContext"
import { Input } from "./ui/input"

type Course = {
  _id: string
  name: string
  description: string
  image: string
  rating?: number
  reviews?: number
  price: number
  mentorName: string
  duration: string
  language: string
  level: string
  isActive: boolean
}

type SearchResult = {
  course: Course
  confidence: number
}

function CourseListings() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState("")

  const { searchQuery, isSearching, setIsSearching } = useSearchContext()

  const levels = ["ALL", "Beginner", "Intermediate", "Advanced"]
  const [selectedLevel, setSelectedLevel] = useState("ALL")

  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectLevel = (level: string) => {
    setSelectedLevel(level)
  }

  const getBaseCourses = () => {
    if (isSearching) {
      return searchResults
    } else {
      return courses.map((course) => ({
        course: course,
        confidence: 1,
      }))
    }
  }

  const getFilteredCourses = () => {
    let coursesData = getBaseCourses();

    if (selectedLevel !== "ALL") {
      coursesData = coursesData.filter((courseData) => courseData.course.level.toLowerCase() === selectedLevel.toLowerCase())
    }
    if (searchTerm.trim() !== "") {
      coursesData = coursesData.filter((courseData) =>
        courseData.course.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return coursesData;
  }

  const filteredCourses = getFilteredCourses()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!isSearching) {
      fetchCourses()
    }
  }, [isSearching])

  // Effect to perform search when searchQuery changes
  useEffect(() => {
    if (searchQuery && isSearching) {
      setLoading(true)
      getCoursesForSearchQuery(searchQuery)
    }
  }, [searchQuery, isSearching])

  // Function to get courses based on search query
  const getCoursesForSearchQuery = async (query: string) => {
    try {
      const response = await fetch(`/api/search/retrieve?query=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error("Failed to fetch courses")
      }
      const data = await response.json()

      // Save search results with confidence scores
      if (Array.isArray(data)) {
        // Check if data contains objects with 'course' property (search results)
        if (data.length > 0 && "course" in data[0]) {
          setSearchResults(data)
        } else {
          // If data is already an array of courses, assign default confidence of 1
          setSearchResults(data.map((course: Course) => ({ course: course, confidence: 1 })))
        }
      }
    } catch (error) {
      setIsError(true)
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function fetchCourses() {
    setLoading(true)
    try {
      const response = await fetch("/api/courses")
      const data = await response.json()
      setCourses(data)
      setIsError(false)
    } catch (error) {
      setIsError(true)
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="course-listings" className="py-6 lg:py-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl mx-auto">
            {isSearching ? "Search Results" : (
              <>
                Launch Your Tech Career with{" "}
                <span className="text-blue-600 relative">
                  Expert 
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 1418 125"
                    className="absolute -bottom-2 sm:-bottom-4 left-0 -z-10 h-[0.58em] w-full scale-110 fill-blue-600 opacity-60"
                  >
                    <path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68Z"></path>
                  </svg>
                </span>
                {" "}Bootcamps
              </>
            )}
          </h2>

          <p className="text-lg text-muted-foreground">
            {isSearching
              ? "Finding the perfect courses for you..."
              : "Discover the most popular online courses worldwide for an amazing learning experience."}
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <Skeleton className="h-8 w-full max-w-[700px] bg-gray-300/70" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
                <Skeleton className="aspect-[4/3] rounded-t-xl bg-gray-300/70" />
                <div className="p-6 pt-0 mt-3 space-y-2">
                  <Skeleton className="h-6 w-3/4 bg-gray-300/70" />
                  <Skeleton className="h-4 w-1/2 bg-gray-300/70" />
                  <Skeleton className="h-4 w-1/3 bg-gray-300/70" />
                </div>
                <div className="flex items-center p-6 pt-0">
                  <Skeleton className="h-6 w-1/4 bg-gray-300/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section id="course-listings" className="py-6 lg:py-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl mx-auto">
            {isSearching ? "Search Results" : (
              <>
                Launch Your Tech Career with{" "}
                <span className="text-blue-600 relative">
                  Expert 
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 1418 125"
                    className="absolute -bottom-2 sm:-bottom-4 left-0 -z-10 h-[0.58em] w-full scale-110 fill-blue-600 opacity-60"
                  >
                    <path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68Z"></path>
                  </svg>
                </span>
                {" "}Bootcamps
              </>
            )}
          </h2>

          <p className="text-lg text-muted-foreground">
            {isSearching
              ? "We encountered a problem with your search."
              : "Discover the most popular online courses worldwide for an amazing learning experience."}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6  mx-auto">
          <div className="flex items-start space-x-4">
            <div className="bg-red-100 rounded-full p-2 mt-1">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-700 mb-1">Unable to load courses</h3>
              <p className="text-red-600 mb-3">We encountered a problem while fetching course data from our servers.</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => fetchCourses()}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Try again
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Contact support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="course-listings" className="py-6 lg:py-16 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl mx-auto">
          {isSearching ? "Search Results" : (
            <>
              Launch Your Tech Career with{" "}
              <span className="text-blue-600 relative">
                Expert 
                <svg
                  aria-hidden="true"
                  viewBox="0 0 1418 125"
                  className="absolute -bottom-2 sm:-bottom-4 left-0 -z-10 h-[0.58em] w-full scale-110 fill-blue-600 opacity-60"
                >
                  <path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68Z"></path>
                </svg>
              </span>
              {" "}Bootcamps
            </>
          )}
        </h2>

        <p className="text-lg text-muted-foreground">
          {isSearching
            ? `Here are the courses that match "${searchQuery}"`
            : "Discover the most popular online courses worldwide for an amazing learning experience."}
        </p>

        {isSearching && (
          <button
            onClick={() => {
              setIsSearching(false)
              setSearchTerm('')
            }}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Back to all courses
          </button>
        )}
      </div>

      <div className="relative w-full max-w-md mx-auto md:mx-0 mb-8">
        <div className="flex items-center w-full rounded-lg border border-input shadow-sm focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 bg-white overflow-hidden">
          <Search className="h-5 w-5 text-muted-foreground ml-3 flex-shrink-0" />
          <Input
            placeholder="Search courses by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-2 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>

      {!isSearching && (
        <div className="flex items-center lg:gap-x-2 gap-x-1.5">
          {levels.map((level) => (
            <LevelTab
              key={level}
              selectedLevel={selectedLevel}
              name={level}
              onClick={handleSelectLevel}
            />
          ))}
        </div>
      )}

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 cursor-pointer">
          {filteredCourses.map((courseData) => (
            <CourseCard key={courseData.course._id} course={courseData.course} confidence={courseData.confidence} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <Search className="h-12 w-12 mx-auto text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">
              We couldn&apos;t find any courses matching your current search criteria.
            </p>
            <div className="text-sm text-gray-600">
              Try adjusting your search or filters to find more learning options.
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CourseListings 