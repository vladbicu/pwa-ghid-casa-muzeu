import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AgeGroup, Lang, Stop } from '../types';

const STORAGE_KEY = 'ghid-kids-progress';

interface KidsProgress {
  ageGroup: AgeGroup;
  gender: 'boy' | 'girl';
  explorerName: string;
  language: Lang;
  earnedStopIds: string[];
  startedAt: number;
}

interface KidsProgressContextType {
  progress: KidsProgress | null;
  startAdventure: (ageGroup: AgeGroup, name: string, language: Lang, gender: 'boy' | 'girl') => void;
  earnStamp: (stopId: string) => void;
  resetProgress: () => void;
  getNextStopId: (kidsStops: Stop[]) => string | null;
}

const KidsProgressContext = createContext<KidsProgressContextType | null>(null);

function loadProgress(): KidsProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveProgress(p: KidsProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function KidsProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<KidsProgress | null>(loadProgress);

  const startAdventure = useCallback((ageGroup: AgeGroup, name: string, language: Lang, gender: 'boy' | 'girl') => {
    const p: KidsProgress = {
      ageGroup,
      gender,
      explorerName: name,
      language,
      earnedStopIds: [],
      startedAt: Date.now(),
    };
    saveProgress(p);
    setProgress(p);
  }, []);

  const earnStamp = useCallback((stopId: string) => {
    setProgress(prev => {
      if (!prev || prev.earnedStopIds.includes(stopId)) return prev;
      const updated = { ...prev, earnedStopIds: [...prev.earnedStopIds, stopId] };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(null);
  }, []);

  const getNextStopId = useCallback((kidsStops: Stop[]): string | null => {
    if (!progress) return null;
    const ordered = [...kidsStops]
      .filter(s => s.kids?.include)
      .sort((a, b) => (a.kids!.order) - (b.kids!.order));
    const next = ordered.find(s => !progress.earnedStopIds.includes(s.id));
    return next?.id ?? null;
  }, [progress]);

  return (
    <KidsProgressContext.Provider value={{ progress, startAdventure, earnStamp, resetProgress, getNextStopId }}>
      {children}
    </KidsProgressContext.Provider>
  );
}

export function useKidsProgress() {
  const ctx = useContext(KidsProgressContext);
  if (!ctx) throw new Error('useKidsProgress must be used inside KidsProgressProvider');
  return ctx;
}
