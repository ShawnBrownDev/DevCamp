"use client";

import { useState, useMemo } from 'react';
import type { Course } from '@/lib/types/courses';

type CourseLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';

export function useCoursesFilter(courses: Course[]) {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [courses, selectedLevel, searchQuery]);

  return {
    selectedLevel,
    setSelectedLevel,
    searchQuery, 
    setSearchQuery,
    filteredCourses
  };
}