interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

const sizes = {
  sm: { height: 28, text: "text-sm" },
  md: { height: 36, text: "text-base" },
  lg: { height: 48, text: "text-lg" },
};

const LOGO_SRC = "/logo-lg.png";

export function BrandLogo({ size = "md", showWordmark = true }: BrandLogoProps) {
  const { height, text } = sizes[size];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <img
        src={LOGO_SRC}
        alt="LG - Podio"
        height={height}
        className="shrink-0 w-auto object-contain"
        style={{ height }}
        draggable={false}
      />
      {showWordmark && (
        <div className="min-w-0">
          <p className={`font-display font-semibold uppercase text-foreground ${text} tracking-[0.2em] sm:tracking-[0.28em]`}>
            Podio
          </p>
        </div>
      )}
    </div>
  );
}
