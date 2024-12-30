import { useRouter } from 'next/router';
import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { LoginForm } from "@/components/auth/LoginForm";
import { ConnectionStatus } from "@/components/auth/ConnectionStatus";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const { returnUrl, plan, billing } = router.query;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <AuthFormWrapper
          title="Welcome back"
          description="Enter your credentials to access your account"
          footer={{
            text: "Don't have an account?",
            linkText: "Sign up",
            href: "/signup"
          }}
        >
          <ConnectionStatus />
          <LoginForm onSuccess={() => {
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