"use client";

import { useMemo } from 'react';
import type { Course, CourseProgress } from '@/lib/types/courses';

export function useCourseStats(courses: (Course & { progress?: CourseProgress })[]) {
  return useMemo(() => {
    const totalLessons = courses.reduce((sum, course) => 
      sum + (course.progress?.total_lessons || 0), 0);
    
    const completedLessons = courses.reduce((sum, course) => 
      sum + (course.progress?.completed_lessons || 0), 0);
    
    const progress = totalLessons > 0 
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

    const remainingLessons = totalLessons - completedLessons;

    return {
      progress,
      completedLessons,
      remainingLessons,
      totalLessons
    };
  }, [courses]);
}