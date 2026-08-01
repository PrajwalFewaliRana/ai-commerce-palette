import * as React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, ArrowUp, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { parseQuery } from "@/lib/ai-mock";
import { aiSuggestions } from "@/lib/shop-data";
import { cn } from "@/lib/utils";

/** Natural language search: understands the sentence and shows what it understood, live. */
export function NaturalLanguageSearch({
  defaultValue = "",
  className,
  autoFocus,
}: {
  defaultValue?: string;
  className?: string;
  autoFocus?: boolean;
}) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(defaultValue);
  const parsed = React.useMemo(() => parseQuery(value), [value]);
  const submit = () => {
    const term = value.trim();
    if (term) navigate({ to: "/search", search: { q: term } });
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="group relative flex items-center gap-2 rounded-2xl border border-border/60 bg-card p-1.5 pl-4 shadow-[var(--shadow-card)] transition focus-within:border-primary/50 focus-within:shadow-[var(--shadow-glow)]">
        <Sparkles className="size-5 shrink-0 text-primary" />
        <input
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Describe what you need — 'quiet headphones for flights under $200'"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Describe what you need"
        />
        <button
          type="button"
          onClick={submit}
          aria-label="Search with AI"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground shadow-sm transition hover:brightness-110 [background-image:var(--gradient-ai)]"
        >
          <ArrowUp className="size-4" />
        </button>
      </div>

      {value.trim().length > 2 ? (
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 font-medium text-primary">
            <Wand2 className="size-3.5" /> Understood:
          </span>
          {parsed.facets.length ? (
            parsed.facets.map((f) => (
              <Badge key={f.label} variant={f.kind === "budget" ? "ai" : "secondary"}>
                {f.label}
              </Badge>
            ))
          ) : (
            <span>reading your sentence — add a budget or a use case to sharpen it</span>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {aiSuggestions.slice(0, 4).map((s) => (
            <Link
              key={s}
              to="/search"
              search={{ q: s }}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              {s}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
