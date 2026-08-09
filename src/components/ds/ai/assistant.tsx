import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles, ArrowUp, ChevronDown, ChevronUp, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parseQuery, rankProducts, type Ranked } from "@/lib/ai-mock";
import { cn } from "@/lib/utils";

interface Turn {
  id: number;
  role: "you" | "assistant";
  text: string;
  results?: Ranked[];
}

/** Context-aware prompts so the assistant feels part of the page, not a bolted-on chatbot. */
function contextFor(pathname: string) {
  if (pathname.startsWith("/product/")) {
    return {
      label: "Helping you with this product",
      prompts: [
        "Is this worth the price?",
        "What do reviewers complain about?",
        "Show me a cheaper alternative",
      ],
    };
  }
  if (
    pathname.startsWith("/customer/cart") ||
    pathname.startsWith("/customer/checkout") ||
    pathname.startsWith("/customer/payment")
  ) {
    return {
      label: "Reviewing your cart",
      prompts: [
        "Can I get free shipping?",
        "Anything cheaper in my cart?",
        "Do these work together?",
      ],
    };
  }
  if (pathname.startsWith("/customer/orders")) {
    return {
      label: "Tracking your orders",
      prompts: ["Where is my order?", "Can I still change the address?", "Start a return"],
    };
  }
  if (pathname.startsWith("/seller/dashboard")) {
    return {
      label: "Working on your store",
      prompts: [
        "What should I restock?",
        "Write a description for my newest product",
        "Why did sales dip?",
      ],
    };
  }
  if (
    pathname.startsWith("/search") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/categor")
  ) {
    return {
      label: "Narrowing these results",
      prompts: [
        "Only show items under $150",
        "Best rated wireless option",
        "Gift for a coffee lover",
      ],
    };
  }
  return {
    label: "Ready when you are",
    prompts: [
      "Wireless headphones under $200 with great bass",
      "Minimalist watch for daily wear",
      "Everyday running shoes for beginners",
    ],
  };
}

function answerFor(text: string): Turn {
  const parsed = parseQuery(text);
  const results = rankProducts(parsed).slice(0, 3);
  const facets = parsed.facets.map((f) => f.label).join(" · ");
  return {
    id: Date.now() + 1,
    role: "assistant",
    text: `${parsed.interpretation}${facets ? ` Filters applied: ${facets}.` : ""} Here are the three strongest matches:`,
    results,
  };
}

/** Built-in shopping assistant: a persistent page-level helper, docked to the shell. */
export function ShoppingAssistant() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ctx = useMemo(() => contextFor(pathname), [pathname]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [turns, thinking]);

  const ask = (text: string) => {
    const term = text.trim();
    if (!term) return;
    setOpen(true);
    setValue("");
    setTurns((t) => [...t, { id: Date.now(), role: "you", text: term }]);
    setThinking(true);
    window.setTimeout(() => {
      setTurns((t) => [...t, answerFor(term)]);
      setThinking(false);
    }, 700);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 sm:px-6 sm:pb-5">
      <div
        className={cn(
          "pointer-events-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-primary/25 bg-background/90 shadow-[var(--shadow-lg)] backdrop-blur transition-all",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-left"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-lg text-primary-foreground [background-image:var(--gradient-ai)]">
            <Sparkles className="size-3.5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">Shopping assistant</span>
            <span className="block truncate text-xs text-muted-foreground">{ctx.label}</span>
          </span>
          <Badge variant="ai" className="hidden text-[10px] sm:inline-flex">
            Built in
          </Badge>
          {open ? (
            <ChevronDown className="size-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="size-4 text-muted-foreground" />
          )}
        </button>

        {open && (
          <div className="border-t border-border/60">
            <div ref={scroller} className="max-h-[46vh] space-y-4 overflow-y-auto px-4 py-4">
              {turns.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Ask in your own words. I read the page you're on, so you can say things like “is
                  there a cheaper one that's still 4.5★+”.
                </p>
              )}
              {turns.map((turn) =>
                turn.role === "you" ? (
                  <div key={turn.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl bg-primary px-3.5 py-2 text-sm text-primary-foreground">
                      {turn.text}
                    </p>
                  </div>
                ) : (
                  <div key={turn.id} className="space-y-3">
                    <p className="text-sm leading-relaxed text-foreground">{turn.text}</p>
                    {turn.results && (
                      <ul className="space-y-2">
                        {turn.results.map(({ product, score, reason }) => (
                          <li key={product.id}>
                            <Link
                              to="/products/$id"
                              params={{ id: product.id }}
                              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5 transition hover:border-primary/40"
                            >
                              <span
                                className="size-12 shrink-0 rounded-xl bg-cover bg-center"
                                style={{ backgroundImage: `url(${product.image})` }}
                              />
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-2">
                                  <span className="line-clamp-1 text-sm font-semibold">
                                    {product.title}
                                  </span>
                                  <Badge variant="ai" className="shrink-0 text-[10px]">
                                    {score}%
                                  </Badge>
                                </span>
                                <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                                  <Star className="size-3 fill-[color:var(--warning)] text-[color:var(--warning)]" />
                                  {product.rating} · ${product.price.toFixed(2)}
                                </span>
                                <span className="mt-1 line-clamp-2 block text-xs text-muted-foreground">
                                  {reason}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ),
              )}
              {thinking && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="size-4 animate-pulse text-primary" /> Reading listings and
                  reviews...
                </p>
              )}
            </div>

            <div className="border-t border-border/60 px-4 py-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {ctx.prompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => ask(p)}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-3">
                <Sparkles className="size-4 shrink-0 text-primary" />
                <input
                  ref={input}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && ask(value)}
                  placeholder="Ask about anything on this page..."
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                  aria-label="Ask the shopping assistant"
                />
                <Button size="icon" variant="ai" onClick={() => ask(value)} aria-label="Send">
                  <ArrowUp />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
