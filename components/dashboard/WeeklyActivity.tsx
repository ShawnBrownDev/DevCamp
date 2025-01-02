"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from 'next/dynamic';
import { weeklyActivity } from "@/lib/data/mockData";

// Dynamically import Recharts components to avoid SSR issues
const Charts = dynamic(() => import('./charts/WeeklyActivityChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] flex items-center justify-center">
      <p className="text-muted-foreground">Loading chart...</p>
    </div>
  )
});

export function WeeklyActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <Charts data={weeklyActivity} />
        </div>
      </CardContent>
    </Card>
  );
}