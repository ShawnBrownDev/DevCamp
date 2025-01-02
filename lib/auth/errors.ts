// Auth error messages
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: {
    code: "invalid_credentials",
    message: "Invalid email or password"
  },
  USER_NOT_FOUND: {
    code: "user_not_found",
    message: "No user found with this email"
  },
  RATE_LIMIT: {
    code: "too_many_requests",
    message: "Too many attempts. Please try again later",
    retryAfterSeconds: 60
  },
  DEFAULT: {
    message: "An error occurred. Please try again"
  }
} as const;

export function getAuthErrorMessage(error: any): string {
  if (!error) return AUTH_ERRORS.DEFAULT.message;

  // Handle specific Supabase error codes
  switch (error.code) {
    case "invalid_credentials":
    case "invalid_grant":
      return AUTH_ERRORS.INVALID_CREDENTIALS.message;
    case "user_not_found":
      return AUTH_ERRORS.USER_NOT_FOUND.message;
    case "too_many_requests":
      return AUTH_ERRORS.RATE_LIMIT.message;
    default:
      return error.message || AUTH_ERRORS.DEFAULT.message;
  }
}