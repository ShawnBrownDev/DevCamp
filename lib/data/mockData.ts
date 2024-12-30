import { Lesson, Assignment, ActivityData } from '@/lib/types/dashboard';

export const upcomingLessons: Lesson[] = [
  {
    id: 1,
    title: "Advanced React Patterns",
    date: "Today, 2:00 PM",
    duration: "1h 30m"
  },
  {
    id: 2,
    title: "State Management with Redux",
    date: "Tomorrow, 10:00 AM",
    duration: "2h"
  },
  {
    id: 3,
    title: "Building REST APIs",
    date: "Wed, 3:00 PM",
    duration: "1h"
  }
];

export const assignments: Assignment[] = [
  {
    id: 1,
    title: "Build a Todo App",
    dueDate: "Apr 15, 2024",
    status: "completed",
    score: "95/100"
  },
  {
    id: 2,
    title: "Create an E-commerce API",
    dueDate: "Apr 20, 2024",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Implement Authentication",
    dueDate: "Apr 25, 2024",
    status: "upcoming"
  }
];

export const weeklyActivity: ActivityData[] = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 4 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 5 },
  { day: "Fri", hours: 3 },
  { day: "Sat", hours: 1 },
  { day: "Sun", hours: 2 },
];