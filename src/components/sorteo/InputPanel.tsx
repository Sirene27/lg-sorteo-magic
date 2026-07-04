import { Trophy, Users, Hash, Zap, RotateCcw } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

interface InputPanelProps {
  prizeName: string;
  setPrizeName: (v: string) => void;
  winnersCount: number;
  setWinnersCount: (v: number) => void;
  subsCount: number;
  setSubsCount: (v: number) => void;
  candidatesRaw: string;
  setCandidatesRaw: (v: string) => void;
  candidatesCount: number;
  isRunning: boolean;
  hasResult: boolean;
  onExecute: () => void;
  onReset: () => void;
}

export function InputPanel({
  prizeName,
  setPrizeName,
  winnersCount,
  setWinnersCount,
  subsCount,
  setSubsCount,
  candidatesRaw,
  setCandidatesRaw,
  candidatesCount,
  isRunning,
  hasResult,
  onExecute,
  onReset,
}: InputPanelProps) {
  return (
    <div className="flex flex-col lg:h-full">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-border/50">
        <BrandLogo size="md" />
        <p
          className="text-brand-muted text-xs mt-4 uppercase font-display"
          style={{ letterSpacing: "0.18em" }}
        >
          Sistema de Podio
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 lg:overflow-y-auto p-4 sm:p-6 pb-28 lg:pb-6 space-y-4 sm:space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-display font-medium text-brand-muted uppercase flex items-center gap-2" style={{ letterSpacing: "0.2em" }}>
            <Trophy className="w-3.5 h-3.5 text-primary" />
            Nombre del Premio
          </label>
          <input
            type="text"
            value={prizeName}
            onChange={(e) => setPrizeName(e.target.value)}
            placeholder="Ej: Bono de $500"
            className="w-full input-brand font-display text-base"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-display font-medium text-brand-muted uppercase flex items-center gap-2" style={{ letterSpacing: "0.2em" }}>
              <Hash className="w-3.5 h-3.5 text-primary" />
              Ganadores
            </label>
            <input
              type="number"
              min={1}
              value={winnersCount}
              onChange={(e) => setWinnersCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full input-brand font-mono text-base"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-display font-medium text-brand-muted uppercase flex items-center gap-2" style={{ letterSpacing: "0.2em" }}>
              <Users className="w-3.5 h-3.5 text-primary" />
              Suplentes
            </label>
            <input
              type="number"
              min={0}
              value={subsCount}
              onChange={(e) => setSubsCount(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full input-brand font-mono text-base"
            />
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <label className="text-[10px] font-display font-medium text-brand-muted uppercase flex items-center gap-2 justify-between" style={{ letterSpacing: "0.2em" }}>
            <span className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-primary" />
              Base de candidatos
            </span>
            <span className="text-gradient font-mono text-sm font-bold">{candidatesCount}</span>
          </label>
          <textarea
            value={candidatesRaw}
            onChange={(e) => setCandidatesRaw(e.target.value)}
            placeholder={"Juan Pérez\nMaría García\nCarlos López\n..."}
            rows={6}
            className="w-full input-brand font-body resize-none text-base min-h-[140px] sm:min-h-[220px]"
          />
        </div>
      </div>

      <div className="p-4 sm:p-6 border-t border-border/50 safe-area-bottom sticky bottom-0 z-20 bg-[rgba(10,10,31,0.92)] backdrop-blur-md lg:static lg:bg-transparent lg:backdrop-blur-none">
        {hasResult ? (
          <button
            onClick={onReset}
            className="w-full min-h-[48px] py-3.5 sm:py-4 rounded-sm border border-border/60 bg-secondary/50 text-foreground font-display font-semibold text-xs uppercase flex items-center justify-center gap-3 hover:bg-muted/80 active:scale-[0.98] transition-all duration-150 touch-manipulation"
            style={{ letterSpacing: "0.2em" }}
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar Podio
          </button>
        ) : (
          <button
            onClick={onExecute}
            disabled={isRunning || candidatesCount === 0}
            className="w-full min-h-[48px] py-3.5 sm:py-4 rounded-sm btn-brand flex items-center justify-center gap-3 text-xs active:scale-[0.98] touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            <Zap className="w-4 h-4" />
            {isRunning ? "Procesando..." : "Ejecutar Algoritmo"}
          </button>
        )}
      </div>
    </div>
  );
}
