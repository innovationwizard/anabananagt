"use client";

import { useState } from "react";
import { Camera, Video, Image as ImageIcon, X } from "lucide-react";

// ---------------------------------------------------------------------------
// PlaceholderMedia — Renders a styled placeholder with a tooltip containing
// production instructions for Ana's media team.
// ---------------------------------------------------------------------------

type Variant = "photo" | "video" | "logo";

interface PlaceholderMediaProps {
  variant?: Variant;
  aspectRatio?: string;
  instructions: string;
  label?: string;
  className?: string;
  dark?: boolean;
}

const icons: Record<Variant, typeof Camera> = {
  photo: Camera,
  video: Video,
  logo: ImageIcon,
};

export function PlaceholderMedia({
  variant = "photo",
  aspectRatio = "16/9",
  instructions,
  label,
  className = "",
  dark = true,
}: PlaceholderMediaProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const Icon = icons[variant];

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg border-2 border-dashed
        flex items-center justify-center cursor-pointer
        transition-colors duration-300
        ${dark
          ? "border-border-dark bg-secondary/50 text-text-inverse/40 hover:border-accent/50"
          : "border-border bg-surface-warm text-text-muted/40 hover:border-accent/50"
        }
        ${className}
      `}
      style={{ aspectRatio }}
      onClick={() => setShowTooltip(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setShowTooltip(true)}
      aria-label={`Placeholder: ${label ?? variant}`}
    >
      <div className="flex flex-col items-center gap-2 p-6 text-center">
        <Icon className="w-10 h-10 opacity-60" strokeWidth={1} />
        {label && (
          <span className="text-xs font-semibold tracking-widest uppercase opacity-60">
            {label}
          </span>
        )}
        <span className="text-[10px] opacity-40 mt-1">
          Click para ver instrucciones de producción
        </span>
      </div>

      {/* --- Production Instructions Tooltip --- */}
      {showTooltip && (
        <div
          className="absolute inset-0 z-20 bg-primary/95 backdrop-blur-sm p-6
                     flex flex-col items-start justify-start overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-3 right-3 text-text-inverse/60 hover:text-accent
                       transition-colors"
            aria-label="Cerrar instrucciones"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
            Instrucciones de Producción
          </span>
          <p className="text-text-inverse/80 text-sm leading-relaxed whitespace-pre-line">
            {instructions}
          </p>
        </div>
      )}
    </div>
  );
}
