// Auth error messages
export const AUTH_ERRORS = {
  RATE_LIMIT: "Please wait a moment before trying again",
  INVALID_CREDENTIALS: "Invalid email or password",
  CONNECTION_ERROR: "Unable to connect to authentication service",
  DEFAULT: "Something went wrong. Please try again",
} as const;

export function getAuthErrorMessage(error: any): string {
  if (!error) return AUTH_ERRORS.DEFAULT;
  
  // Handle rate limit errors
  if (error.code === "over_email_send_rate_limit") {
    return AUTH_ERRORS.RATE_LIMIT;
  }
  
  // Handle other specific errors here
  if (error.message) {
    return error.message;
  }
  
  return AUTH_ERRORS.DEFAULT;
}