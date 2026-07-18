import * as React from "react";
import { Sparkles, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AiSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onAskAi?: (value: string) => void;
}

export const AiSearch = React.forwardRef<HTMLInputElement, AiSearchProps>(
  ({ className, onAskAi, placeholder = "Ask AI: 'wireless headphones under $100 with great bass'", ...props }, ref) => {
    const [value, setValue] = React.useState("");
    return (
      <div
        className={cn(
          "group relative flex items-center gap-2 rounded-2xl border border-border/60 bg-card p-1.5 pl-4 shadow-[var(--shadow-card)] transition focus-within:border-primary/50 focus-within:shadow-[var(--shadow-glow)]",
          className,
        )}
      >
        <Sparkles className="size-5 shrink-0 text-primary" />
        <input
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
          {...props}
        />
        <button
          type="button"
          onClick={() => onAskAi?.(value)}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground shadow-sm transition hover:brightness-110 [background-image:var(--gradient-ai)]"
          aria-label="Ask AI"
        >
          <ArrowUp className="size-4" />
        </button>
      </div>
    );
  },
);
AiSearch.displayName = "AiSearch";