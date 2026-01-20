import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export interface DailyStats {
  date: string;
  speakCount: number;
  quizCount: number;
  reviewCount: number;
  addCount: number;
  listenCount: number;
  reviewedIds: string[];
}

const INITIAL_STATS: DailyStats = {
  date: new Date().toISOString().split('T')[0],
  speakCount: 0,
  quizCount: 0,
  reviewCount: 0,
  addCount: 0,
  listenCount: 0,
  reviewedIds: [],
};

export const useDailyStats = () => {
  const [stats, setStats] = useLocalStorage<DailyStats>('dailyStats', INITIAL_STATS);

  const checkDate = useCallback((currentStats: DailyStats) => {
    const today = new Date().toISOString().split('T')[0];
    if (currentStats.date !== today) {
      return { ...INITIAL_STATS, date: today };
    }
    // Migration for old stats without reviewedIds
    if (!currentStats.reviewedIds) {
        return { ...currentStats, reviewedIds: [] };
    }
    return currentStats;
  }, []);

  const increment = useCallback((key: keyof Omit<DailyStats, 'date' | 'reviewedIds'>, amount = 1, itemId?: string) => {
    setStats(prev => {
      const current = checkDate(prev);
      
      // Prevent duplicate review counts
      if (key === 'reviewCount' && itemId) {
          if (current.reviewedIds.includes(itemId)) {
              return current;
          }
          return {
              ...current,
              reviewCount: current.reviewCount + 1,
              reviewedIds: [...current.reviewedIds, itemId]
          };
      }

      return {
        ...current,
        [key]: (current[key] as number) + amount
      };
    });
  }, [setStats, checkDate]);

  return {
    stats: checkDate(stats),
    increment
  };
};
