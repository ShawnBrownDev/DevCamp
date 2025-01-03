import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { LoginForm } from "@/components/auth/LoginForm";

import Navbar from '@/components/layout/Navbar'

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <AuthFormWrapper
          title="Welcome back"
          description="Enter your credentials to access your account"
          footer={{
            text: "Don't have an account?",
            linkText: 'Sign up',
            href: '/signup',
          }}
        >
          <LoginForm />
        </AuthFormWrapper>
      </main>
    </div>
  )
}