"use client";

import { useState, useEffect } from 'react';

import type { Lesson } from '@/lib/types/courses'
import { supabase } from '@/lib/supabase'

interface CreateLessonData {
  title: string
  description: string
  content: string
  order_index: number
  duration_minutes: number
}

export function useLessons(courseId: string) {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadLessons() {
      try {
        setLoading(true)
        const { data, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index', { ascending: true })

        if (lessonsError) throw lessonsError
        if (mounted) {
          setLessons(data || [])
          setError(null)
        }
      } catch (err: any) {
        console.error('Error loading lessons:', err)
        if (mounted) {
          setError(err.message)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadLessons()

    return () => {
      mounted = false
    }
  }, [courseId, supabase])

  const createLesson = async (data: CreateLessonData) => {
    try {
      const { error } = await supabase
        .from('lessons')
        .insert([{ ...data, course_id: courseId }])

      if (error) throw error

      // Refresh lessons after creating
      const { data: updatedLessons } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true })

      setLessons(updatedLessons || [])
    } catch (err: any) {
      console.error('Error creating lesson:', err)
      throw err
    }
  }

  const updateLesson = async (
    lessonId: string,
    data: Partial<CreateLessonData>
  ) => {
    try {
      const { error } = await supabase
        .from('lessons')
        .update(data)
        .eq('id', lessonId)

      if (error) throw error

      // Refresh lessons after updating
      const { data: updatedLessons } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true })

      setLessons(updatedLessons || [])
    } catch (err: any) {
      console.error('Error updating lesson:', err)
      throw err
    }
  }

  const deleteLesson = async (lessonId: string) => {
    try {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId)

      if (error) throw error

      // Update local state after deletion
      setLessons((prev) => prev.filter((lesson) => lesson.id !== lessonId))
    } catch (err: any) {
      console.error('Error deleting lesson:', err)
      throw err
    }
  }

  return {
    lessons,
    loading,
    error,
    createLesson,
    updateLesson,
    deleteLesson,
  }
}