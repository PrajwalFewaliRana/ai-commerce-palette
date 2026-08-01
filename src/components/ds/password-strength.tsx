import { cn } from "@/lib/utils";

export function scorePassword(pw: string): number {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

const labels = ["Too weak", "Weak", "Fair", "Strong", "Excellent"];
const colors = [
  "bg-destructive",
  "bg-destructive",
  "bg-[color:var(--warning)]",
  "bg-primary",
  "bg-[color:var(--success)]",
];

export function PasswordStrength({ value }: { value: string }) {
  if (!value) return null;
  const score = scorePassword(value);
  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < score ? colors[score] : "bg-muted",
            )}
          />
        ))}
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Password strength: <span className="font-medium text-foreground">{labels[score]}</span>
      </p>
    </div>
  );
}
