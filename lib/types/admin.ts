export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalEnrollments: number;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  subscription_status: string;
  last_sign_in: string | null;
  created_at: string;
}

export interface AdminSubmission {
  id: string;
  user_id: string;
  assignment_id: string;
  content: string;
  score: number | null;
  feedback: string | null;
  submitted_at: string;
  graded_at: string | null;
  user: {
    username: string;
    email: string;
  };
  assignment: {
    title: string;
    course_id: string;
  };
}