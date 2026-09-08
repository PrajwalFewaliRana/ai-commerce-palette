import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  ArrowUp,
  ShoppingCart,
  User,
  Menu,
  Moon,
  Sun,
  Search,
  Laptop,
  Shirt,
  Home as HomeIcon,
  BookOpen,
  Dumbbell,
  Gamepad2,
  Gem,
  Watch,
  MessageSquareText,
  Wand2,
  GitCompareArrows,
  ScrollText,
  ShieldCheck,
  Lock,
  Bot,
  Truck,
  Star,
  Heart,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "@/components/ds/category-card";
import { ProductCard } from "@/components/ds/product-card";
import headphones from "@/assets/product-headphones.jpg";
import watch from "@/assets/product-watch.jpg";
import mug from "@/assets/product-mug.jpg";
import sneakers from "@/assets/product-sneakers.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexa — AI-Powered Multi-Vendor Marketplace" },
      {
        name: "description",
        content:
          "Describe what you need in natural language. Nexa's AI finds the perfect products from thousands of trusted sellers.",
      },
      { property: "og:title", content: "Nexa — AI-Powered Multi-Vendor Marketplace" },
      {
        property: "og:description",
        content:
          "Shop smarter with AI. Natural language search, personalized picks, and instant comparisons.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const suggestions = [
  "Laptop for programming",
  "Phone under Rs.50,000",
  "Gaming chair",
  "Gift for my sister",
  "Running shoes",
  "DSLR for beginners",
];

const aiFeatures = [
  {
    icon: MessageSquareText,
    title: "Natural Language Search",
    desc: "Ask in plain English. Get results that actually match what you meant.",
  },
  {
    icon: Wand2,
    title: "Personalized Recommendations",
    desc: "Picks tuned to your taste, budget, and past purchases — never generic.",
  },
  {
    icon: GitCompareArrows,
    title: "AI Product Comparison",
    desc: "Side-by-side breakdowns of specs, value, and trade-offs in seconds.",
  },
  {
    icon: ScrollText,
    title: "AI Review Summaries",
    desc: "Thousands of reviews distilled into the pros and cons that matter.",
  },
];

const categories = [
  { label: "Electronics", count: 12480, icon: Laptop },
  { label: "Fashion", count: 24310, icon: Shirt },
  { label: "Home", count: 8721, icon: HomeIcon },
  { label: "Books", count: 15230, icon: BookOpen },
  { label: "Sports", count: 5410, icon: Dumbbell },
  { label: "Beauty", count: 6892, icon: Gem },
  { label: "Gaming", count: 3240, icon: Gamepad2 },
  { label: "Accessories", count: 9870, icon: Watch },
];

const products = [
  {
    title: "Studio Wireless Headphones ANC",
    vendor: "Acoustica",
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviews: 1240,
    image: headphones,
    badge: { label: "AI Pick", variant: "ai" as const },
  },
  {
    title: "Minimalist Steel Watch — Slate",
    vendor: "Northline",
    price: 149,
    rating: 4.6,
    reviews: 512,
    image: watch,
    badge: { label: "-24%", variant: "warning" as const },
  },
  {
    title: "Ceramic Pour-Over Mug 350ml",
    vendor: "Kiln & Co.",
    price: 28,
    rating: 4.9,
    reviews: 380,
    image: mug,
  },
  {
    title: "Runner Pro Knit Sneakers",
    vendor: "Stride Lab",
    price: 119,
    originalPrice: 140,
    rating: 4.7,
    reviews: 902,
    image: sneakers,
    badge: { label: "AI Pick", variant: "ai" as const },
  },
];

const whyShop = [
  { icon: ShieldCheck, title: "Verified Sellers", desc: "Every vendor is KYC-verified and rated." },
  { icon: Lock, title: "Secure Payments", desc: "PCI-DSS encryption on every transaction." },
  { icon: Bot, title: "AI Shopping Assistant", desc: "Always-on help from search to checkout." },
  { icon: Truck, title: "Fast Delivery", desc: "Fulfilled in 2–4 days across the country." },
];

const testimonials = [
  {
    name: "Ayesha K.",
    role: "Product Designer",
    avatar: "AK",
    quote:
      "I described a desk setup in one sentence and Nexa found everything — the chair, the lamp, even a matching rug.",
    rating: 5,
  },
  {
    name: "Daniel M.",
    role: "Software Engineer",
    avatar: "DM",
    quote:
      "The AI comparison saved me hours picking a laptop. It flagged trade-offs I would have missed.",
    rating: 5,
  },
  {
    name: "Priya R.",
    role: "Small Business Owner",
    avatar: "PR",
    quote: "As a seller, onboarding took ten minutes. My first sale came the same day.",
    rating: 5,
  },
];

const faqs = [
  {
    q: "How does the AI search work?",
    a: "Type what you need in natural language. Our model interprets intent, budget, and constraints, then ranks products from every verified seller by fit.",
  },
  {
    q: "Which payment methods are supported?",
    a: "All major cards, Apple Pay, Google Pay, and local wallets. Every payment is encrypted and PCI-DSS compliant.",
  },
  {
    q: "What is the returns policy?",
    a: "Free returns within 14 days on most items. Individual seller policies are shown on each product page.",
  },
  {
    q: "How do I become a seller?",
    a: "Apply in minutes with basic business details. Once verified, you get a full dashboard, AI listing tools, and payouts twice a month.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use end-to-end encryption, never sell personal data, and let you control what the AI remembers.",
  },
];

function LandingPage() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* NAV */}
      <header
        className={`sticky top-0 z-50 border-b border-transparent backdrop-blur transition-all ${scrolled ? "border-border/60 bg-background/80 shadow-[var(--shadow-sm)]" : "bg-background/60"}`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)] [background-image:var(--gradient-ai)]">
              <Sparkles className="size-4" />
            </span>
            <span className="truncate text-lg font-semibold tracking-tight">Nexa</span>
          </Link>
          <nav className="hidden items-center justify-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#home" className="transition hover:text-foreground">
              Home
            </a>
            <a href="#categories" className="transition hover:text-foreground">
              Categories
            </a>
            <a href="#products" className="transition hover:text-foreground">
              Deals
            </a>
            <a href="#seller" className="transition hover:text-foreground">
              Become a Seller
            </a>
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="hidden size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground sm:inline-flex"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild size="sm" variant="hero" className="hidden sm:inline-flex">
              <Link to="/register">Register</Link>
            </Button>
            <button
              className="relative grid size-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground"
              aria-label="Cart"
            >
              <ShoppingCart className="size-4" />
              <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                2
              </span>
            </button>
            <button
              className="grid size-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground md:hidden"
              aria-label="Menu"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:var(--gradient-subtle)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 -z-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full opacity-70 blur-3xl [background-image:var(--gradient-ambient)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <Badge variant="ai" className="mb-6 gap-1.5">
              <Sparkles className="size-3.5" /> AI shopping, reimagined
            </Badge>
            <h1 className="display-title text-balance text-4xl sm:text-hero lg:text-hero-lg">
              Find Exactly What You Need —{" "}
              <span className="bg-clip-text text-transparent [background-image:var(--gradient-ai)]">
                Powered by AI
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-body text-muted-foreground sm:text-body-lg">
              Describe what you're looking for in natural language and let AI recommend the perfect
              products from thousands of sellers.
            </p>
          </div>

          {/* AI Search — focal point */}
          <div className="relative mx-auto mt-10 max-w-3xl animate-fade-in">
            <div
              aria-hidden
              className="absolute -inset-1 rounded-3xl opacity-70 blur-xl [background-image:var(--gradient-ambient)]"
            />
            <div className="relative rounded-3xl border border-border/60 bg-card p-3 shadow-[var(--shadow-lg)]">
              <div className="flex items-center gap-3 rounded-2xl bg-background/60 px-4 py-2">
                <Sparkles className="size-5 shrink-0 text-primary" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="I need a laptop for programming under Rs.120,000"
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground sm:text-base"
                />
                <Button variant="ai" size="lg" className="hidden shrink-0 gap-2 sm:inline-flex">
                  <Sparkles className="size-4" /> Ask AI
                </Button>
                <button
                  className="grid size-10 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)] [background-image:var(--gradient-ai)] sm:hidden"
                  aria-label="Ask AI"
                >
                  <ArrowUp className="size-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 px-2 pb-2 pt-3">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition hover-scale hover:border-primary/40 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-[color:var(--success)]" /> 50,000+ verified sellers
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-[color:var(--success)]" /> 2M+ products
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-[color:var(--success)]" /> AI trained on real reviews
            </span>
          </div>
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeader
          eyebrow="Why AI"
          title="Shopping that understands you"
          desc="Four ways Nexa's AI takes the friction out of finding the right product."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aiFeatures.map((f) => (
            <Card
              key={f.title}
              className="group border-border/60 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
            >
              <CardContent className="p-6">
                <div className="grid size-11 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)] transition group-hover:scale-105 [background-image:var(--gradient-ai)]">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeader
          eyebrow="Explore"
          title="Popular categories"
          desc="Millions of products, curated by AI across every category."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.label} {...c} />
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader
            align="left"
            eyebrow="Featured"
            title="Handpicked by AI"
            desc="Trending products tuned to real buyer intent."
          />
          <a
            href="#"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            View all <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* WHY SHOP */}
      <section className="bg-[color:var(--muted)]/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow="Why Nexa" title="Built for buyers you can trust" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyShop.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
              >
                <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BECOME A SELLER */}
      <section id="seller" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-lg)] sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-70 blur-3xl [background-image:var(--gradient-ambient)]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Badge variant="ai" className="mb-4">
                For sellers
              </Badge>
              <h2 className="display-title text-3xl sm:text-h2">
                Sell smarter with AI on your side
              </h2>
              <p className="mt-4 max-w-xl text-body text-muted-foreground">
                Launch your storefront in minutes. Get AI-generated listings, buyer-intent insights,
                and payouts twice a month.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero" size="lg">
                  Become a Seller
                </Button>
                <Button variant="outline" size="lg">
                  See seller tools
                </Button>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                "AI-generated product descriptions",
                "Real-time demand forecasting",
                "Zero setup fees, 2% per sale",
                "Dedicated growth dashboard",
              ].map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[color:var(--success)]/15 text-[color:var(--success)]">
                    <Check className="size-3.5" />
                  </span>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeader eyebrow="Loved by shoppers" title="What our customers say" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border/60 shadow-[var(--shadow-card)]">
              <CardContent className="p-6">
                <div className="flex gap-1 text-[color:var(--warning)]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {t.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{t.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <Accordion
          type="single"
          collapsible
          className="mt-10 rounded-2xl border border-border bg-card px-2 shadow-[var(--shadow-card)]"
        >
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
              <AccordionTrigger className="px-4 text-left text-sm font-medium hover:no-underline sm:text-base">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-[color:var(--muted)]/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
            <div>
              <Link to="/" className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)] [background-image:var(--gradient-ai)]">
                  <Sparkles className="size-4" />
                </span>
                <span className="text-lg font-semibold tracking-tight">Nexa</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                The AI-powered marketplace where discovery feels effortless.
              </p>
            </div>
            <FooterCol title="Company" links={["About", "Careers", "Press", "Blog"]} />
            <FooterCol title="Support" links={["Help center", "Contact", "Shipping", "Returns"]} />
            <FooterCol title="Legal" links={["Terms", "Privacy", "Cookies", "Security"]} />
            <div>
              <p className="text-sm font-semibold">Get smarter picks weekly</p>
              <p className="mt-2 text-sm text-muted-foreground">
                AI-curated deals in your inbox. No spam.
              </p>
              <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input type="email" placeholder="you@example.com" className="h-10" />
                <Button type="submit" variant="hero">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} Nexa. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground">
                Instagram
              </a>
              <a href="#" className="hover:text-foreground">
                LinkedIn
              </a>
              <a href="#" className="hover:text-foreground">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-caption font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="display-title mt-3 text-3xl sm:text-h2">{title}</h2>
      {desc && <p className="mt-4 text-body text-muted-foreground">{desc}</p>}
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="transition hover:text-foreground">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
