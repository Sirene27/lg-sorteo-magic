import { Trophy, Users } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

interface ResultPanelProps {
  prizeName: string;
  isRunning: boolean;
  cascadeNames: string[];
  result: { winners: string[]; substitutes: string[] } | null;
}

export function ResultPanel({ prizeName, isRunning, cascadeNames, result }: ResultPanelProps) {
  if (!isRunning && !result) {
    return (
      <div className="flex-1 flex items-center justify-center relative z-10 animate-speed-in px-4 py-8 sm:p-8">
        <div className="text-center space-y-4 sm:space-y-6 w-full max-w-sm">
          <div className="gradient-border rounded-lg p-1 mx-auto w-fit animate-glow">
            <div className="px-5 py-4 rounded-lg border border-border/30 bg-card/40 flex items-center justify-center backdrop-blur-sm">
              <BrandLogo size="lg" showWordmark={false} />
            </div>
          </div>
          <div className="space-y-2">
            <p
              className="text-brand-muted text-xs uppercase font-display"
              style={{ letterSpacing: "0.25em" }}
            >
              Listo para el podio
            </p>
            <p className="text-muted-foreground text-sm font-body max-w-xs mx-auto">
              Configura los parámetros y ejecuta el algoritmo
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isRunning) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden relative z-10">
        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-1 max-w-xl w-full px-2">
          {cascadeNames.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="font-mono text-sm text-primary/70 animate-cascade truncate skew-x-[-6deg]"
              style={{
                animationDelay: `${(i % 8) * 30}ms`,
                opacity: 0.35 + (i % 5) * 0.12,
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:p-8 space-y-6 sm:space-y-10 relative z-10 animate-speed-in">
      {prizeName && (
        <p
          className="text-xs uppercase text-brand-muted font-display border-b border-border/30 pb-3 px-6"
          style={{ letterSpacing: "0.3em" }}
        >
          {prizeName}
        </p>
      )}

      <div className="space-y-5 text-center">
        <div className="flex items-center justify-center gap-2">
          <Trophy className="w-4 h-4 text-primary" />
          <span
            className="text-xs uppercase font-display font-semibold text-gradient"
            style={{ letterSpacing: "0.3em" }}
          >
            {result!.winners.length > 1 ? "Ganadores" : "Ganador"}
          </span>
        </div>
        <div className="space-y-3">
          {result!.winners.map((name, i) => (
            <div
              key={i}
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient tracking-wide animate-speed-in break-words px-2"
              style={{ animationDelay: `${i * 80}ms`, letterSpacing: "0.05em" }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {result!.substitutes.length > 0 && (
        <div className="space-y-3 text-center pt-4 border-t border-border/20 w-full max-w-md">
          <div className="flex items-center justify-center gap-2 text-brand-muted">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs uppercase font-display" style={{ letterSpacing: "0.25em" }}>
              Suplentes
            </span>
          </div>
          <div className="space-y-1">
            {result!.substitutes.map((name, i) => (
              <div key={i} className="font-body text-lg text-muted-foreground">
                {name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
