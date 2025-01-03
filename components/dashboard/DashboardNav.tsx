"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Settings,
  Shield,
  GraduationCap,
  ChevronDown,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAdminCheck } from "@/lib/hooks/useAdminCheck";
import { cn } from "@/lib/utils";
import { supabase } from '@/lib/supabase';

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/courses", icon: BookOpen, label: "Courses" },
  { href: "/dashboard/schedule", icon: Calendar, label: "Schedule" },
  { href: "/dashboard/community", icon: MessageSquare, label: "Community" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const adminItems = [
  { href: "/dashboard/admin", icon: Shield, label: "Dashboard" },
  { href: "/dashboard/admin/grading", icon: GraduationCap, label: "Grading" },
  { href: "/dashboard/admin/courses", icon: BookOpen, label: "Manage Courses" },
];

export function DashboardNav() {
  const router = useRouter();
  const { isAdmin } = useAdminCheck();

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      router.push('/');
    }
  };

  const isActiveLink = (href: string) => router.pathname === href;
  const isActiveAdminSection = adminItems.some(item => router.pathname.startsWith(item.href));

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
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
              isActiveLink(item.href) && "bg-accent text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}

        {isAdmin && (
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex items-center justify-between w-full gap-3 px-3 py-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
                    isActiveAdminSection && "bg-accent text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5" />
                    <span>Admin</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="w-56"
                align="start"
                alignOffset={-5}
              >
                {adminItems.map((item) => (
                  <DropdownMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 w-full",
                        isActiveLink(item.href) && "bg-accent"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
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