import { useState, useCallback } from "react";

interface SorteoResult {
  winners: string[];
  substitutes: string[];
}

export function useSorteo() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SorteoResult | null>(null);
  const [cascadeNames, setCascadeNames] = useState<string[]>([]);

  const execute = useCallback(
    (candidates: string[], winnersCount: number, substitutesCount: number) => {
      if (candidates.length === 0 || isRunning) return;

      setResult(null);
      setIsRunning(true);

      const totalNeeded = winnersCount + substitutesCount;
      const pool = [...candidates];

      // Cascade animation phase
      let iteration = 0;
      const maxIterations = 40;

      const interval = setInterval(() => {
        iteration++;
        // Show random names from the pool
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        setCascadeNames(shuffled.slice(0, Math.min(12, pool.length)));

        if (iteration >= maxIterations) {
          clearInterval(interval);

          // Fisher-Yates shuffle for final selection
          const finalPool = [...pool];
          for (let i = finalPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [finalPool[i], finalPool[j]] = [finalPool[j], finalPool[i]];
          }

          const selected = finalPool.slice(0, Math.min(totalNeeded, finalPool.length));
          const winners = selected.slice(0, Math.min(winnersCount, selected.length));
          const subs = selected.slice(winnersCount, winnersCount + substitutesCount);

          setCascadeNames([]);
          setResult({ winners, substitutes: subs });
          setIsRunning(false);
        }
      }, 60 + iteration * 3); // Decelerating
    },
    [isRunning]
  );

  const reset = useCallback(() => {
    setResult(null);
    setCascadeNames([]);
    setIsRunning(false);
  }, []);

  return { isRunning, result, cascadeNames, execute, reset };
}
