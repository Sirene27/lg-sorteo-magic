import { useEffect, useRef, useState } from "react";
import { InputPanel } from "@/components/sorteo/InputPanel";
import { ResultPanel } from "@/components/sorteo/ResultPanel";
import { useSorteo } from "@/hooks/use-sorteo";

const Index = () => {
  const [prizeName, setPrizeName] = useState("");
  const [winnersCount, setWinnersCount] = useState(1);
  const [subsCount, setSubsCount] = useState(2);
  const [candidatesRaw, setCandidatesRaw] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const { isRunning, result, cascadeNames, execute, reset } = useSorteo();

  const candidates = candidatesRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const handleExecute = () => {
    if (candidates.length === 0) return;
    execute(candidates, winnersCount, subsCount);
  };

  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    if ((isRunning || result) && window.matchMedia("(max-width: 1023px)").matches) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isRunning, result]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[100dvh] w-full lg:h-screen lg:overflow-hidden brand-bg speed-lines">
      <div className="w-full lg:w-[40%] lg:min-w-[360px] lg:max-w-md border-b lg:border-b-0 lg:border-r border-border/40 flex flex-col glass-panel relative z-10 shrink-0">
        <InputPanel
          prizeName={prizeName}
          setPrizeName={setPrizeName}
          winnersCount={winnersCount}
          setWinnersCount={setWinnersCount}
          subsCount={subsCount}
          setSubsCount={setSubsCount}
          candidatesRaw={candidatesRaw}
          setCandidatesRaw={setCandidatesRaw}
          candidatesCount={candidates.length}
          isRunning={isRunning}
          hasResult={!!result}
          onExecute={handleExecute}
          onReset={handleReset}
        />
      </div>

      <div
        ref={resultsRef}
        className="flex-1 flex flex-col relative min-h-[45dvh] lg:min-h-0 scroll-mt-4"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(41, 121, 255, 0.08) 0%, transparent 70%)",
          }}
        />
        <ResultPanel
          prizeName={prizeName}
          isRunning={isRunning}
          cascadeNames={cascadeNames}
          result={result}
        />
      </div>
    </div>
  );
};

export default Index;
