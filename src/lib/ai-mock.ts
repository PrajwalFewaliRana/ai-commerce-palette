import { products, type Product } from "@/lib/shop-data";

/** ---------- Natural language query understanding (deterministic mock) ---------- */

export interface QueryFacet {
  kind: "budget" | "category" | "attribute" | "rating" | "intent";
  label: string;
}

const ATTRIBUTE_WORDS: Record<string, string> = {
  wireless: "Wireless",
  bass: "Strong bass",
  anc: "Noise cancelling",
  "noise cancel": "Noise cancelling",
  minimalist: "Minimal design",
  running: "Running use",
  gift: "Gift-worthy",
  coffee: "Coffee gear",
  daily: "Everyday use",
  beginner: "Beginner friendly",
  waterproof: "Water resistant",
  lightweight: "Lightweight",
};

const CATEGORY_WORDS: Record<string, string> = {
  headphone: "electronics",
  earbud: "electronics",
  watch: "accessories",
  mug: "home",
  coffee: "home",
  shoe: "fashion",
  sneaker: "fashion",
  runner: "fashion",
};

export interface ParsedQuery {
  raw: string;
  budget?: number;
  minRating?: number;
  category?: string;
  facets: QueryFacet[];
  interpretation: string;
}

export function parseQuery(raw: string): ParsedQuery {
  const q = raw.toLowerCase();
  const facets: QueryFacet[] = [];

  const priceMatch = q.match(/(?:under|below|less than|<)\s*\$?\s*(\d+)/);
  const budget = priceMatch ? Number(priceMatch[1]) : undefined;
  if (budget) facets.push({ kind: "budget", label: `Under $${budget}` });

  const ratingMatch = q.match(/(\d(?:\.\d)?)\s*\+?\s*star/);
  const minRating = ratingMatch
    ? Number(ratingMatch[1])
    : q.includes("best") || q.includes("top")
      ? 4.5
      : undefined;
  if (minRating) facets.push({ kind: "rating", label: `${minRating}+ rating` });

  let category: string | undefined;
  for (const [word, slug] of Object.entries(CATEGORY_WORDS)) {
    if (q.includes(word)) {
      category = slug;
      break;
    }
  }
  if (category)
    facets.push({ kind: "category", label: category[0].toUpperCase() + category.slice(1) });

  for (const [word, label] of Object.entries(ATTRIBUTE_WORDS)) {
    if (q.includes(word) && !facets.some((f) => f.label === label)) {
      facets.push({ kind: "attribute", label });
    }
  }

  if (q.includes("gift")) facets.push({ kind: "intent", label: "Gifting" });

  const parts: string[] = [];
  parts.push(category ? `You're looking for ${category} products` : "You're looking for products");
  if (budget) parts.push(`with a budget of $${budget}`);
  if (minRating) parts.push(`rated ${minRating}★ or higher`);
  const attrs = facets.filter((f) => f.kind === "attribute").map((f) => f.label.toLowerCase());
  if (attrs.length) parts.push(`prioritising ${attrs.join(", ")}`);

  return {
    raw,
    budget,
    minRating,
    category,
    facets,
    interpretation: `${parts.join(", ")}. I ranked results by how well they match that, not by ad spend.`,
  };
}

export interface Ranked {
  product: Product;
  score: number;
  reason: string;
}

export function rankProducts(parsed: ParsedQuery, pool: Product[] = products): Ranked[] {
  return pool
    .map((product) => {
      let score = 55 + Math.round(product.rating * 6);
      const reasons: string[] = [];

      if (parsed.category && product.category === parsed.category) {
        score += 14;
        reasons.push(`matches the ${parsed.category} category you described`);
      }
      if (parsed.budget) {
        if (product.price <= parsed.budget) {
          score += 12;
          reasons.push(
            `sits $${Math.max(1, parsed.budget - product.price)} under your $${parsed.budget} budget`,
          );
        } else {
          score -= 22;
          reasons.push(`slightly over budget at $${product.price}`);
        }
      }
      if (parsed.minRating && product.rating >= parsed.minRating) {
        score += 6;
        reasons.push(`${product.rating}★ across ${product.reviews.toLocaleString()} reviews`);
      }
      if (product.aiPick) {
        score += 5;
        reasons.push("consistently praised in recent reviews");
      }
      if (product.originalPrice)
        reasons.push(`currently discounted from $${product.originalPrice}`);

      return {
        product,
        score: Math.max(38, Math.min(98, score)),
        reason: reasons.length
          ? `Recommended because it ${reasons.slice(0, 2).join(" and ")}.`
          : `A solid pick from ${product.vendor} with ${product.rating}★ from ${product.reviews.toLocaleString()} buyers.`,
      };
    })
    .sort((a, b) => b.score - a.score);
}

/** ---------- Review understanding ---------- */

export interface ReviewInsight {
  total: number;
  sentiment: { positive: number; neutral: number; negative: number };
  themes: { label: string; mentions: number; tone: "positive" | "negative" | "mixed" }[];
  pros: string[];
  cons: string[];
  verdict: string;
}

export function reviewInsight(product: Product): ReviewInsight {
  const positive = Math.round((product.rating / 5) * 100) - 4;
  const negative = Math.max(3, 100 - positive - 9);
  return {
    total: product.reviews,
    sentiment: { positive, neutral: 100 - positive - negative, negative },
    themes: [
      { label: "Build quality", mentions: Math.round(product.reviews * 0.34), tone: "positive" },
      { label: "Value for money", mentions: Math.round(product.reviews * 0.28), tone: "positive" },
      { label: "Comfort / fit", mentions: Math.round(product.reviews * 0.21), tone: "mixed" },
      { label: "Packaging", mentions: Math.round(product.reviews * 0.07), tone: "negative" },
    ],
    pros: [
      "Feels a tier above its price point",
      "Holds up well after months of daily use",
      `Buyers repeatedly recommend it over pricier ${product.category} options`,
    ],
    cons: ["Accessories are sold separately", "A handful of reports about slow vendor replies"],
    verdict: `Across ${product.reviews.toLocaleString()} reviews the picture is consistent: people buy the ${product.title} for reliability and keep it for the finish. Complaints cluster around extras, not the product itself.`,
  };
}

/** ---------- Plain-English product explanation ---------- */

export function explainProduct(product: Product) {
  return {
    plain: `In plain English: the ${product.title} is a ${product.category} item from ${product.vendor} at $${product.price}. ${product.description} You'd pick it if you want dependable everyday performance without paying flagship prices.`,
    goodFor: ["Everyday use", "Gifting", `Fans of ${product.vendor}`],
    skipIf: ["You need pro-tier specs", "You already own a newer model"],
    jargon: [
      {
        term: "ANC",
        meaning: "Active noise cancellation — electronically cancels steady background sound.",
      },
      { term: "Sapphire crystal", meaning: "A very scratch-resistant watch glass." },
      {
        term: "Responsive foam",
        meaning: "Midsole that springs back, so it feels less flat over long runs.",
      },
    ],
  };
}

/** ---------- Seller-side generation ---------- */

export type Tone = "premium" | "friendly" | "technical";

export function generateDescription(name: string, keywordsInput: string, tone: Tone) {
  const product = name.trim() || "your product";
  const hooks: Record<Tone, string> = {
    premium: `${product} is built for people who notice the details.`,
    friendly: `Meet ${product} — the easy, everyday upgrade you'll actually use.`,
    technical: `${product}: engineered specs, measured performance, no marketing fluff.`,
  };
  const bodies: Record<Tone, string> = {
    premium:
      "Every surface is finished by hand, every component chosen for longevity. It arrives in recycled packaging and is backed by a one-year vendor warranty.",
    friendly:
      "It sets up in seconds, fits into your routine, and keeps working the way you expect. Free shipping, easy 30-day returns, and real humans on support.",
    technical:
      "Tested across 200 duty cycles with a measured failure rate under 0.4%. Ships with full spec sheet, calibration notes, and a one-year warranty.",
  };
  const seed = keywordsInput
    .split(/[,\n]/)
    .map((k) => k.trim())
    .filter(Boolean);
  const keywords = (
    seed.length ? seed : [product, "best value", "free shipping", "premium finish", "durable"]
  )
    .slice(0, 8)
    .map((k) => k.toLowerCase());

  return {
    description: `${hooks[tone]} ${bodies[tone]}`,
    bullets: [
      "Premium materials with a hand-finished feel",
      "Designed for daily use, tested for the long run",
      "Ships free, returns free within 30 days",
      "One-year vendor-backed warranty",
    ],
    keywords,
    seoTitle: `${product} — Premium Quality, Free Shipping | Nexa`,
    metaDescription: `Shop ${product} on Nexa. ${bodies[tone].slice(0, 96)}...`.slice(0, 155),
  };
}

export interface SellerInsight {
  title: string;
  detail: string;
  impact: string;
  confidence: number;
  tone: "opportunity" | "risk" | "trend";
  action: string;
}

export const sellerInsights: SellerInsight[] = [
  {
    title: "Raise ANC Earbuds price by 6%",
    detail:
      "Demand held steady through two competitor price drops, and 41% of buyers arrived from natural-language searches mentioning ‘best’ rather than ‘cheap’.",
    impact: "+$1,940 / mo",
    confidence: 87,
    tone: "opportunity",
    action: "Apply new price",
  },
  {
    title: "Restock Studio Headphones within 6 days",
    detail:
      "Sell-through accelerated 22% week-over-week. At current velocity you go out of stock before your supplier lead time closes.",
    impact: "Protects $6,300",
    confidence: 92,
    tone: "risk",
    action: "Create purchase order",
  },
  {
    title: "Fashion queries are up 34% for your store",
    detail:
      "Shoppers asking for ‘everyday running shoes for beginners’ land on your Runner Pro but bounce on the size guide.",
    impact: "+1.1% conversion",
    confidence: 78,
    tone: "trend",
    action: "Rewrite size guide",
  },
  {
    title: "Two listings have thin descriptions",
    detail:
      "Both rank below page 2 for their main keyword. Generated copy with structured specs typically recovers position within 10 days.",
    impact: "+320 sessions / mo",
    confidence: 71,
    tone: "opportunity",
    action: "Generate copy",
  },
];
