import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  aside,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Form side */}
        <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-16">
          <Link to="/" className="inline-flex items-center gap-2 text-lg font-semibold">
            <span className="grid size-8 place-items-center rounded-lg text-primary-foreground [background-image:var(--gradient-ai)]">
              <Sparkles className="size-4" />
            </span>
            Nexa
          </Link>
          <div className="flex flex-1 items-center justify-center py-10">
            <div className="w-full max-w-md">
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
              <div className="mt-8">{children}</div>
              {footer && (
                <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
              )}
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground lg:text-left">
            © {new Date().getFullYear()} Nexa. AI-powered commerce.
          </p>
        </div>
        {/* Aside side */}
        <div className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-0 [background-image:var(--gradient-ai)] opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,white/20,transparent_60%),radial-gradient(circle_at_80%_60%,white/10,transparent_50%)]" />
          <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
            {aside ?? <DefaultAside />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DefaultAside() {
  return (
    <>
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
        <Sparkles className="size-3.5" /> AI-powered marketplace
      </div>
      <div className="space-y-6">
        <h2 className="text-4xl font-bold leading-tight">
          Discover products the way you think about them.
        </h2>
        <p className="max-w-md text-white/80">
          Describe what you need in plain language. Nexa's AI finds the right products from
          thousands of trusted sellers — no more scrolling through irrelevant results.
        </p>
        <div className="grid max-w-md gap-3 pt-4">
          {[
            "Natural language product search",
            "Personalized AI recommendations",
            "Instant side-by-side comparisons",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-white/90">
              <span className="grid size-5 place-items-center rounded-full bg-white/15">✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-white/60">Trusted by 50,000+ sellers worldwide</p>
    </>
  );
}
