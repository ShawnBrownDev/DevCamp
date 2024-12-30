// Common types used across dashboard components
export interface Lesson {
  id: number;
  title: string;
  date: string;
  duration: string;
}

export interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  score?: string;
}

export interface ActivityData {
  day: string;
  hours: number;
}

export interface CourseStats {
  progress: number;
  completedLessons: number;
  remainingLessons: number;
}