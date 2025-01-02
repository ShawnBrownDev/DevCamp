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
    id: string;
    username: string;
    first_name: string | null;
    last_name: string | null;
  };
  assignment: {
    id: string;
    title: string;
    course_id: string;
  };
}