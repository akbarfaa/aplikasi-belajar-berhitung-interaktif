import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "matematikku_progress";

export type WorldProgress = {
  highScore: number;
  totalAnswered: number;
  totalCorrect: number;
  bestCombo: number;
  stars: number; // 0-3
};

export type GlobalProgress = {
  worlds: Record<string, WorldProgress>;
  totalScore: number;
  achievements: string[];
};

const defaultWorldProgress: WorldProgress = {
  highScore: 0,
  totalAnswered: 0,
  totalCorrect: 0,
  bestCombo: 0,
  stars: 0,
};

function loadProgress(): GlobalProgress {
  if (typeof window === "undefined") {
    return { worlds: {}, totalScore: 0, achievements: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as GlobalProgress;
  } catch {
    // corrupt data — reset
  }
  return { worlds: {}, totalScore: 0, achievements: [] };
}

function saveProgress(progress: GlobalProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage full — fail silently
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<GlobalProgress>(loadProgress);

  // Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setProgress(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const getWorldProgress = useCallback(
    (worldId: string): WorldProgress => {
      return progress.worlds[worldId] ?? { ...defaultWorldProgress };
    },
    [progress],
  );

  const updateWorldProgress = useCallback(
    (worldId: string, update: Partial<WorldProgress>) => {
      setProgress((prev) => {
        const current = prev.worlds[worldId] ?? { ...defaultWorldProgress };
        const updated: WorldProgress = {
          highScore: Math.max(current.highScore, update.highScore ?? 0),
          totalAnswered: current.totalAnswered + (update.totalAnswered ?? 0),
          totalCorrect: current.totalCorrect + (update.totalCorrect ?? 0),
          bestCombo: Math.max(current.bestCombo, update.bestCombo ?? 0),
          stars: Math.max(current.stars, update.stars ?? 0),
        };

        // Calculate stars based on high score
        if (updated.highScore >= 200) updated.stars = 3;
        else if (updated.highScore >= 100) updated.stars = 2;
        else if (updated.highScore >= 30) updated.stars = 1;

        const newWorlds = { ...prev.worlds, [worldId]: updated };
        const totalScore = Object.values(newWorlds).reduce((sum, w) => sum + w.highScore, 0);

        // Calculate achievements
        const achievements = new Set(prev.achievements);
        if (totalScore >= 100) achievements.add("pemula");
        if (totalScore >= 500) achievements.add("penjelajah");
        if (totalScore >= 1000) achievements.add("master");
        if (updated.bestCombo >= 3) achievements.add("kombo_kilat");
        if (updated.bestCombo >= 5) achievements.add("kombo_api");
        if (updated.bestCombo >= 10) achievements.add("kombo_legendaris");
        if (updated.totalCorrect >= 50) achievements.add("rajin");
        if (updated.totalCorrect >= 200) achievements.add("tekun");
        if (Object.keys(newWorlds).length >= 3) achievements.add("penjelajah_dunia");
        if (updated.stars >= 3) achievements.add("bintang_sempurna");

        const newProgress: GlobalProgress = {
          worlds: newWorlds,
          totalScore,
          achievements: Array.from(achievements),
        };

        saveProgress(newProgress);
        return newProgress;
      });
    },
    [],
  );

  return { progress, getWorldProgress, updateWorldProgress };
}
