"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabaseClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/courses", icon: BookOpen, label: "Courses" },
  { href: "/dashboard/schedule", icon: Calendar, label: "Schedule" },
  { href: "/dashboard/community", icon: MessageSquare, label: "Community" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function DashboardNav() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
      router.push("/");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">DevCamp</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}