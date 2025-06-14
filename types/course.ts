export interface Course {
  _id: string;
  name: string;
  description: string;
  image: string;
  rating?: number;
  reviews?: number;
  price: number;
  mentorName: string;
  duration: string;
  language: string;
  level: string;
  isActive: boolean;
}

export interface Cohort {
  _id: string;
  userId: string;
  courseId: Course;
  enrollmentDate: string;
  isActive: boolean;
}

export interface DashboardData {
  activeProgramsCount: number;
  enrolledCohorts: Cohort[];
} 