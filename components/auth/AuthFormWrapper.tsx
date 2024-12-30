"use client";

import Link from "next/link";

interface AuthFormWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footer: {
    text: string;
    linkText: string;
    href: string;
  };
}

export function AuthFormWrapper({ 
  children, 
  title, 
  description, 
  footer 
}: AuthFormWrapperProps) {
  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        {children}

        <p className="text-center text-sm text-muted-foreground">
          {footer.text}{" "}
          <Link 
            href={footer.href} 
            className="text-primary underline-offset-4 hover:underline"
          >
            {footer.linkText}
          </Link>
        </p>
      </div>
    </div>
  );
}