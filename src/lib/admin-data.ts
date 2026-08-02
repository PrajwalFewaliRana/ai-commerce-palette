export const gmvSeries = [
  { month: "Feb", gmv: 742000, orders: 8120, refunds: 21000 },
  { month: "Mar", gmv: 810000, orders: 8940, refunds: 24500 },
  { month: "Apr", gmv: 905000, orders: 9810, refunds: 22800 },
  { month: "May", gmv: 988000, orders: 10420, refunds: 26100 },
  { month: "Jun", gmv: 1120000, orders: 11890, refunds: 25400 },
  { month: "Jul", gmv: 1242000, orders: 13120, refunds: 27900 },
];

export const revenueSplit = [
  { name: "Commission", value: 58 },
  { name: "Subscriptions", value: 21 },
  { name: "Ads & promos", value: 14 },
  { name: "Fulfilment", value: 7 },
];

export const cohortRetention = [
  { week: "W1", customer: 100, seller: 100 },
  { week: "W2", customer: 68, seller: 91 },
  { week: "W3", customer: 54, seller: 87 },
  { week: "W4", customer: 46, seller: 84 },
  { week: "W5", customer: 41, seller: 81 },
  { week: "W6", customer: 38, seller: 79 },
];

export const topCategoriesByGmv = [
  { name: "Electronics", gmv: 486000 },
  { name: "Fashion", gmv: 312000 },
  { name: "Home", gmv: 214000 },
  { name: "Accessories", gmv: 148000 },
  { name: "Beauty", gmv: 82000 },
];

export type UserRole = "customer" | "seller" | "admin";
export type UserStatus = "active" | "suspended" | "pending";
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  orders: number;
  spent: number;
  country: string;
}

const FIRST = [
  "Sarah",
  "Marcus",
  "Priya",
  "Jonah",
  "Ava",
  "Leo",
  "Mira",
  "Noah",
  "Elena",
  "Omar",
  "Yuki",
  "Liam",
  "Zara",
  "Ethan",
  "Nina",
  "Diego",
  "Hana",
  "Ivan",
  "Sofia",
  "Tariq",
  "Chloe",
  "Ravi",
  "Lena",
  "Mateo",
  "Ada",
];
const LAST = [
  "Chen",
  "Lee",
  "Shah",
  "Silva",
  "Thompson",
  "Park",
  "Patel",
  "Weber",
  "Rossi",
  "Haddad",
  "Tanaka",
  "Murphy",
  "Ali",
  "Novak",
  "Kowalski",
  "Garcia",
  "Sato",
  "Petrov",
  "Costa",
  "Mansour",
  "Dubois",
  "Iyer",
  "Berg",
  "Alvarez",
  "Okafor",
];
const COUNTRIES = ["US", "UK", "DE", "IN", "JP", "BR", "CA", "FR", "AU", "NG"];
const ROLES: UserRole[] = ["customer", "customer", "customer", "seller", "seller", "admin"];
const STATUSES: UserStatus[] = ["active", "active", "active", "active", "pending", "suspended"];

export const adminUsers: AdminUser[] = Array.from({ length: 96 }, (_, i) => {
  const first = FIRST[i % FIRST.length];
  const last = LAST[(i * 7) % LAST.length];
  const role = ROLES[i % ROLES.length];
  return {
    id: `U-${(1000 + i).toString()}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@nex.co`,
    role,
    status: STATUSES[(i * 5) % STATUSES.length],
    joined: `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][i % 7]} ${(i % 27) + 1}, 2026`,
    orders: role === "customer" ? (i * 13) % 42 : (i * 3) % 9,
    spent: ((i * 137) % 4200) + 40,
    country: COUNTRIES[(i * 3) % COUNTRIES.length],
  };
});

export type VerificationStage = "pending" | "in_review" | "approved" | "rejected";
export interface SellerApplication {
  id: string;
  store: string;
  owner: string;
  email: string;
  country: string;
  submitted: string;
  category: string;
  docs: { id: boolean; tax: boolean; bank: boolean; address: boolean };
  riskScore: number;
  stage: VerificationStage;
  gmvEstimate: number;
}

const STORES = [
  "Acoustica",
  "Northline",
  "Kiln & Co.",
  "Stride Lab",
  "Lumen Home",
  "Vela Beauty",
  "PixelForge",
  "Terra Goods",
  "Nomad Optics",
  "Cobalt Audio",
  "Fern & Field",
  "Atlas Sports",
  "Sable Studio",
  "Junia Toys",
  "Orbit Gaming",
  "Rook Supply",
  "Mesa Ceramics",
  "Halcyon Fit",
];
export const sellerApplications: SellerApplication[] = STORES.map((store, i) => ({
  id: `SA-${2100 + i}`,
  store,
  owner: `${FIRST[(i * 3) % FIRST.length]} ${LAST[(i * 5) % LAST.length]}`,
  email: `owner@${store.toLowerCase().replace(/[^a-z]/g, "")}.com`,
  country: COUNTRIES[(i * 4) % COUNTRIES.length],
  submitted: `Jul ${(i % 28) + 1}, 2026`,
  category: ["Electronics", "Accessories", "Home", "Fashion", "Beauty", "Gaming", "Sports"][i % 7],
  docs: { id: i % 5 !== 0, tax: i % 3 !== 0, bank: i % 4 !== 0, address: i % 7 !== 0 },
  riskScore: ((i * 17) % 80) + 8,
  stage: (
    ["pending", "in_review", "approved", "rejected", "pending", "in_review"] as VerificationStage[]
  )[i % 6],
  gmvEstimate: ((i * 9100) % 120000) + 8000,
}));

export type ModerationState = "flagged" | "pending" | "approved" | "removed";
export interface ModerationItem {
  id: string;
  title: string;
  store: string;
  price: number;
  category: string;
  reason: string;
  aiConfidence: number;
  reports: number;
  state: ModerationState;
  submitted: string;
}

const REASONS = [
  "Possible counterfeit brand claim",
  "Misleading medical claim",
  "Prohibited item category",
  "Image mismatch with title",
  "Duplicate listing",
  "Price manipulation pattern",
  "Restricted keyword in description",
];
export const moderationQueue: ModerationItem[] = Array.from({ length: 42 }, (_, i) => ({
  id: `MOD-${5300 + i}`,
  title:
    [
      "Studio Wireless Headphones ANC",
      "Titanium Sport Watch Pro",
      "Ceramic Pour-Over Mug 350ml",
      "Runner Pro Knit Sneakers",
      "LED Skin Therapy Mask",
      "4K Action Camera Bundle",
      "Organic Sleep Gummies",
      "Mechanical Keyboard TKL",
    ][i % 8] + ` — v${(i % 4) + 1}`,
  store: STORES[(i * 3) % STORES.length],
  price: ((i * 23) % 380) + 19,
  category: ["Electronics", "Accessories", "Home", "Fashion", "Beauty", "Gaming"][i % 6],
  reason: REASONS[i % REASONS.length],
  aiConfidence: ((i * 11) % 45) + 54,
  reports: (i * 5) % 14,
  state: (["flagged", "pending", "flagged", "approved", "removed", "pending"] as ModerationState[])[
    i % 6
  ],
  submitted: `Jul ${(i % 28) + 1}, 2026`,
}));

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  parent: string | null;
  products: number;
  gmv: number;
  commission: number;
  visible: boolean;
}
export const adminCategories: AdminCategory[] = [
  {
    id: "c1",
    name: "Electronics",
    slug: "electronics",
    parent: null,
    products: 12480,
    gmv: 486000,
    commission: 8,
    visible: true,
  },
  {
    id: "c1a",
    name: "Audio",
    slug: "electronics/audio",
    parent: "Electronics",
    products: 3120,
    gmv: 194000,
    commission: 8,
    visible: true,
  },
  {
    id: "c1b",
    name: "Cameras",
    slug: "electronics/cameras",
    parent: "Electronics",
    products: 1840,
    gmv: 96000,
    commission: 9,
    visible: true,
  },
  {
    id: "c2",
    name: "Fashion",
    slug: "fashion",
    parent: null,
    products: 24310,
    gmv: 312000,
    commission: 12,
    visible: true,
  },
  {
    id: "c2a",
    name: "Footwear",
    slug: "fashion/footwear",
    parent: "Fashion",
    products: 6420,
    gmv: 142000,
    commission: 12,
    visible: true,
  },
  {
    id: "c3",
    name: "Home",
    slug: "home",
    parent: null,
    products: 8721,
    gmv: 214000,
    commission: 10,
    visible: true,
  },
  {
    id: "c3a",
    name: "Kitchen",
    slug: "home/kitchen",
    parent: "Home",
    products: 2910,
    gmv: 88000,
    commission: 10,
    visible: true,
  },
  {
    id: "c4",
    name: "Accessories",
    slug: "accessories",
    parent: null,
    products: 9870,
    gmv: 148000,
    commission: 11,
    visible: true,
  },
  {
    id: "c5",
    name: "Beauty",
    slug: "beauty",
    parent: null,
    products: 6892,
    gmv: 82000,
    commission: 14,
    visible: true,
  },
  {
    id: "c6",
    name: "Gaming",
    slug: "gaming",
    parent: null,
    products: 3240,
    gmv: 74000,
    commission: 9,
    visible: false,
  },
  {
    id: "c7",
    name: "Sports",
    slug: "sports",
    parent: null,
    products: 5410,
    gmv: 61000,
    commission: 10,
    visible: true,
  },
  {
    id: "c8",
    name: "Books",
    slug: "books",
    parent: null,
    products: 15230,
    gmv: 38000,
    commission: 6,
    visible: true,
  },
];

export type AdminOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "refunded"
  | "disputed";
export interface AdminOrder {
  id: string;
  customer: string;
  store: string;
  date: string;
  total: number;
  items: number;
  status: AdminOrderStatus;
  payment: "card" | "wallet" | "bank" | "cod";
  commission: number;
}
export const adminOrders: AdminOrder[] = Array.from({ length: 78 }, (_, i) => {
  const total = ((i * 71) % 890) + 24;
  return {
    id: `NX-${10500 - i}`,
    customer: `${FIRST[(i * 5) % FIRST.length]} ${LAST[(i * 2) % LAST.length]}`,
    store: STORES[(i * 7) % STORES.length],
    date: `Jul ${28 - (i % 28)}, 2026`,
    total,
    items: (i % 5) + 1,
    status: (
      [
        "processing",
        "pending",
        "shipped",
        "delivered",
        "refunded",
        "disputed",
        "delivered",
        "shipped",
      ] as AdminOrderStatus[]
    )[i % 8],
    payment: (["card", "wallet", "bank", "cod"] as const)[i % 4],
    commission: Math.round(total * 0.1 * 100) / 100,
  };
});

export interface AdminReport {
  id: string;
  name: string;
  type: "Finance" | "Sales" | "Sellers" | "Compliance" | "Traffic";
  range: string;
  generated: string;
  size: string;
  status: "ready" | "generating" | "scheduled";
}
export const adminReports: AdminReport[] = [
  {
    id: "R-901",
    name: "Monthly GMV & commission statement",
    type: "Finance",
    range: "Jul 2026",
    generated: "Jul 31, 2026",
    size: "1.8 MB",
    status: "ready",
  },
  {
    id: "R-902",
    name: "Seller payout reconciliation",
    type: "Finance",
    range: "Jul 2026",
    generated: "Jul 30, 2026",
    size: "920 KB",
    status: "ready",
  },
  {
    id: "R-903",
    name: "Top products by conversion",
    type: "Sales",
    range: "Last 90 days",
    generated: "Jul 29, 2026",
    size: "2.4 MB",
    status: "ready",
  },
  {
    id: "R-904",
    name: "Seller verification audit trail",
    type: "Compliance",
    range: "Q3 2026",
    generated: "—",
    size: "—",
    status: "generating",
  },
  {
    id: "R-905",
    name: "Refund & dispute breakdown",
    type: "Finance",
    range: "Jul 2026",
    generated: "Jul 28, 2026",
    size: "640 KB",
    status: "ready",
  },
  {
    id: "R-906",
    name: "AI search query intent report",
    type: "Traffic",
    range: "Last 30 days",
    generated: "Jul 27, 2026",
    size: "3.1 MB",
    status: "ready",
  },
  {
    id: "R-907",
    name: "New seller cohort performance",
    type: "Sellers",
    range: "Aug 2026",
    generated: "—",
    size: "—",
    status: "scheduled",
  },
];

export interface AdminNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  severity: "critical" | "warning" | "info" | "success";
  channel: "moderation" | "sellers" | "payments" | "system" | "ai";
  unread: boolean;
}
export const adminNotifications: AdminNotification[] = [
  {
    id: "an1",
    title: "12 listings flagged by AI moderation",
    body: "Counterfeit-risk signals detected across 4 stores in Electronics.",
    time: "6 min ago",
    severity: "critical",
    channel: "moderation",
    unread: true,
  },
  {
    id: "an2",
    title: "Seller application needs review",
    body: "Nomad Optics submitted tax documents — bank verification still missing.",
    time: "24 min ago",
    severity: "warning",
    channel: "sellers",
    unread: true,
  },
  {
    id: "an3",
    title: "Payout batch #4821 settled",
    body: "$284,120 disbursed to 318 sellers. 2 payouts failed and were retried.",
    time: "1 hr ago",
    severity: "success",
    channel: "payments",
    unread: true,
  },
  {
    id: "an4",
    title: "Dispute rate above threshold",
    body: "Halcyon Fit dispute rate hit 4.2% (limit 3%). Auto-review scheduled.",
    time: "3 hrs ago",
    severity: "warning",
    channel: "sellers",
    unread: false,
  },
  {
    id: "an5",
    title: "AI search index rebuilt",
    body: "Embeddings refreshed for 128,400 products in 14 minutes.",
    time: "5 hrs ago",
    severity: "info",
    channel: "ai",
    unread: false,
  },
  {
    id: "an6",
    title: "Platform commission rule updated",
    body: "Beauty category commission changed from 12% to 14% by admin@nexa.co.",
    time: "Yesterday",
    severity: "info",
    channel: "system",
    unread: false,
  },
  {
    id: "an7",
    title: "Failed webhook deliveries",
    body: "9 order webhooks to 2 stores failed after 3 retries.",
    time: "Yesterday",
    severity: "critical",
    channel: "system",
    unread: false,
  },
];
