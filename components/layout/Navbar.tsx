import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-16 px-4 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Code2 className="h-8 w-8" />
          <span className="text-xl font-bold">DevCamp</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Enroll Now</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}