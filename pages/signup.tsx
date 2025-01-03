import { useRouter } from 'next/router';
import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { SignupForm } from '@/components/auth/SignupForm'
import Navbar from "@/components/layout/Navbar";

export default function SignupPage() {
  const router = useRouter();
  const { returnUrl, plan, billing } = router.query;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <AuthFormWrapper
          title="Create an account"
          description="Enter your details below to create your account"
          footer={{
            text: "Already have an account?",
            linkText: "Login",
            href: "/login"
          }}
        >

          <SignupForm onSuccess={() => {
            if (returnUrl && plan && billing) {
              router.push({
                pathname: returnUrl as string,
                query: { plan, billing }
              });
            } else {
              router.push('/dashboard');
            }
          }} />
        </AuthFormWrapper>
      </main>
    </div>
  );
}