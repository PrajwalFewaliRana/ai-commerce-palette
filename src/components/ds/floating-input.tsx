import * as React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  success?: boolean;
  endAdornment?: React.ReactNode;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, icon: Icon, error, success, endAdornment, id, type = "text", ...props }, ref) => {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    return (
      <div className={cn("w-full", className)}>
        <div
          className={cn(
            "group relative rounded-xl border bg-card transition",
            "focus-within:border-primary focus-within:shadow-[var(--shadow-glow)]",
            error ? "border-destructive" : success ? "border-[color:var(--success)]" : "border-border",
          )}
        >
          {Icon && (
            <Icon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            placeholder=" "
            className={cn(
              "peer h-14 w-full rounded-xl bg-transparent px-3.5 pt-5 pb-1.5 text-sm outline-none placeholder-transparent",
              Icon && "pl-10",
              endAdornment && "pr-10",
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all",
              "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary",
              "peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs",
              Icon && "left-10 peer-focus:left-3.5 peer-[:not(:placeholder-shown)]:left-3.5",
            )}
          >
            {label}
          </label>
          {endAdornment && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{endAdornment}</div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);
FloatingInput.displayName = "FloatingInput";