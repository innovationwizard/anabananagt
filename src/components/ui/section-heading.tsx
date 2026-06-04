interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({
  tag,
  title,
  description,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-2xl"
      }`}
    >
      {tag && (
        <span
          className={`
            inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4
            ${dark ? "text-accent" : "text-accent-hover"}
          `}
        >
          {tag}
        </span>
      )}
      <h2
        className={`
          font-display text-3xl md:text-4xl lg:text-5xl font-bold
          ${dark ? "text-text-inverse" : "text-primary"}
        `}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`
            mt-4 text-lg leading-relaxed
            ${dark ? "text-text-inverse/60" : "text-text-muted"}
          `}
        >
          {description}
        </p>
      )}
    </div>
  );
}
