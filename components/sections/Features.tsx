import { Code2, Users, Zap } from "lucide-react";

export default function Features() {
  return (
    <section className="px-4 py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="bg-background p-6 rounded-lg shadow-sm">
          <Code2 className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Intensive Learning</h3>
          <p className="text-muted-foreground">
            Master full-stack development through hands-on projects and daily coding challenges.
          </p>
        </div>
        <div className="bg-background p-6 rounded-lg shadow-sm">
          <Users className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Expert Mentorship</h3>
          <p className="text-muted-foreground">
            Learn from experienced developers and get personalized code reviews and guidance.
          </p>
        </div>
        <div className="bg-background p-6 rounded-lg shadow-sm">
          <Zap className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Career Support</h3>
          <p className="text-muted-foreground">
            Get job-ready with resume workshops, interview prep, and networking opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}