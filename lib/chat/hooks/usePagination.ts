"use client";

import { useState, useCallback } from 'react';

interface UsePaginationProps {
  pageSize: number;
  onLoadMore: (lastId: string) => Promise<void>;
}

export function usePagination({ pageSize, onLoadMore }: UsePaginationProps) {
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async (lastId: string) => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      await onLoadMore(lastId);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, onLoadMore]);

  return {
    hasMore,
    isLoading,
    setHasMore,
    loadMore
  };
}