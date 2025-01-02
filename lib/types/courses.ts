export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseProgress {
  completed_lessons: number;
  total_lessons: number;
  completion_percentage: number;
  last_activity: string;
}