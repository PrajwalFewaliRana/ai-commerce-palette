import { createFileRoute } from "@tanstack/react-router";
import { Type } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/design-system/typography")({
  head: () => ({
    meta: [
      { title: "Typography Tokens — Nexa Design System" },
      {
        name: "description",
        content:
          "Preview every Nexa typography token — hero, h1 to h6, body, small and caption — side by side in warm light and monochrome dark themes.",
      },
      { property: "og:title", content: "Typography Tokens — Nexa Design System" },
      {
        property: "og:description",
        content:
          "Every Nexa type token previewed in both the Warm Minimal light theme and Monochrome Premium dark theme.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TypographyDocs,
});

type Token = {
  cls: string;
  size: string;
  leading: string;
  tracking: string;
  usage: string;
  display?: boolean;
};

const TOKENS: Token[] = [
  {
    cls: "text-hero",
    size: "3.5rem / 56px",
    leading: "1.08",
    tracking: "-0.03em",
    usage: "Marketing hero headline",
    display: true,
  },
  {
    cls: "text-h1",
    size: "3rem / 48px",
    leading: "1.12",
    tracking: "-0.025em",
    usage: "Page title",
    display: true,
  },
  {
    cls: "text-h2",
    size: "2.25rem / 36px",
    leading: "1.15",
    tracking: "-0.02em",
    usage: "Section heading",
  },
  {
    cls: "text-h3",
    size: "1.875rem / 30px",
    leading: "1.2",
    tracking: "-0.015em",
    usage: "Sub-section heading",
  },
  {
    cls: "text-h4",
    size: "1.5rem / 24px",
    leading: "1.25",
    tracking: "-0.01em",
    usage: "Card / panel title",
  },
  {
    cls: "text-h5",
    size: "1.25rem / 20px",
    leading: "1.3",
    tracking: "-0.01em",
    usage: "Dashboard widget title",
  },
  {
    cls: "text-h6",
    size: "1.125rem / 18px",
    leading: "1.35",
    tracking: "-0.01em",
    usage: "Modal & drawer titles",
  },
  {
    cls: "text-body-lg",
    size: "1.125rem / 18px",
    leading: "1.7",
    tracking: "0",
    usage: "Lead paragraphs",
  },
  { cls: "text-body", size: "1rem / 16px", leading: "1.65", tracking: "0", usage: "Default body" },
  {
    cls: "text-small",
    size: "0.875rem / 14px",
    leading: "1.6",
    tracking: "0",
    usage: "Tables, forms, navigation",
  },
  {
    cls: "text-caption",
    size: "0.75rem / 12px",
    leading: "1.4",
    tracking: "0.01em",
    usage: "Badges, meta, helper text",
  },
];

const SAMPLE = "Discover exactly what you need";

function TokenRow({ token }: { token: Token }) {
  return (
    <li className="grid gap-3 border-b border-border px-5 py-6 last:border-0 md:grid-cols-[13rem_1fr] md:items-baseline">
      <div className="space-y-1">
        <code className="rounded-md bg-muted px-2 py-1 text-caption font-semibold text-foreground">
          {token.cls}
        </code>
        <p className="text-caption text-muted-foreground">
          {token.size} · lh {token.leading} · ls {token.tracking}
        </p>
        <p className="text-caption text-muted-foreground">{token.usage}</p>
      </div>
      <p className={`${token.cls} ${token.display ? "display-title" : ""} text-foreground`}>
        {SAMPLE}
      </p>
    </li>
  );
}

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <section
      className={`${theme === "dark" ? "dark" : "light"} overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-card)]`}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border bg-card px-5 py-4">
        <div>
          <h2 className="text-h5 font-semibold text-foreground">
            {theme === "dark" ? "Monochrome Premium" : "Warm Minimal"}
          </h2>
          <p className="text-caption text-muted-foreground">
            {theme === "dark" ? "Dark mode" : "Light mode"}
          </p>
        </div>
        <Badge variant="secondary" className="capitalize">
          {theme}
        </Badge>
      </header>
      <ul>
        {TOKENS.map((t) => (
          <TokenRow key={t.cls} token={t} />
        ))}
      </ul>
    </section>
  );
}

function TypographyDocs() {
  return (
    <main className="min-h-dvh bg-background px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <Type className="size-3.5" aria-hidden="true" /> Nexa Design System
        </div>
        <h1 className="display-title mt-3 text-h1 text-foreground">Typography tokens</h1>
        <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">
          Manrope carries the entire interface; DM Serif Display is reserved for marketing display
          type. Every token below is defined once in the theme and previewed here in both themes.
        </p>

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <ThemePanel theme="light" />
          <ThemePanel theme="dark" />
        </div>
      </div>
    </main>
  );
}