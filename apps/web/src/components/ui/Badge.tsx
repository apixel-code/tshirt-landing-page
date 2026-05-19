type Variant = "accent" | "neutral" | "success";

interface BadgeProps {
  label: string;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  accent: "bg-accent/10 text-accent",
  neutral: "bg-zinc-100 text-zinc-600",
  success: "bg-green-100 text-green-700",
};

export default function Badge({ label, variant = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-0.5 rounded-full",
        "text-xs font-semibold uppercase tracking-wide",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
