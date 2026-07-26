import headphones from "@/assets/product-headphones.jpg";
import watch from "@/assets/product-watch.jpg";
import mug from "@/assets/product-mug.jpg";
import sneakers from "@/assets/product-sneakers.jpg";

export const revenueSeries = [
  { day: "Mon", revenue: 2400, orders: 24 },
  { day: "Tue", revenue: 1980, orders: 19 },
  { day: "Wed", revenue: 3120, orders: 31 },
  { day: "Thu", revenue: 2740, orders: 27 },
  { day: "Fri", revenue: 4210, orders: 42 },
  { day: "Sat", revenue: 5180, orders: 51 },
  { day: "Sun", revenue: 4620, orders: 46 },
];

export const categoryMix = [
  { name: "Electronics", value: 42 },
  { name: "Accessories", value: 28 },
  { name: "Home", value: 18 },
  { name: "Fashion", value: 12 },
];

export const trafficSources = [
  { source: "AI Search", visits: 4820, conv: 6.2 },
  { source: "Direct", visits: 3140, conv: 4.1 },
  { source: "Social", visits: 2210, conv: 2.8 },
  { source: "Referral", visits: 1490, conv: 3.4 },
  { source: "Email", visits: 980, conv: 8.9 },
];

export type ListingStatus = "active" | "draft" | "out_of_stock" | "archived";
export interface SellerProduct {
  id: string;
  title: string;
  sku: string;
  image: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  status: ListingStatus;
  category: string;
}

export const sellerProducts: SellerProduct[] = [
  { id: "SP-01", title: "Studio Wireless Headphones ANC", sku: "AC-HD-01", image: headphones, price: 189, stock: 42, sold: 812, rating: 4.8, status: "active", category: "Electronics" },
  { id: "SP-02", title: "Everyday ANC Earbuds", sku: "AC-EB-02", image: headphones, price: 89, stock: 128, sold: 1810, rating: 4.5, status: "active", category: "Electronics" },
  { id: "SP-03", title: "Minimalist Steel Watch — Slate", sku: "NL-WT-01", image: watch, price: 149, stock: 0, sold: 512, rating: 4.6, status: "out_of_stock", category: "Accessories" },
  { id: "SP-04", title: "Field Watch — Sand", sku: "NL-WT-02", image: watch, price: 129, stock: 24, sold: 244, rating: 4.4, status: "active", category: "Accessories" },
  { id: "SP-05", title: "Ceramic Pour-Over Mug 350ml", sku: "KL-MG-01", image: mug, price: 28, stock: 210, sold: 380, rating: 4.9, status: "active", category: "Home" },
  { id: "SP-06", title: "Runner Pro Knit Sneakers", sku: "SL-SN-01", image: sneakers, price: 119, stock: 8, sold: 902, rating: 4.7, status: "active", category: "Fashion" },
  { id: "SP-07", title: "Trail Runners v2 (Preview)", sku: "SL-SN-02", image: sneakers, price: 139, stock: 0, sold: 0, rating: 0, status: "draft", category: "Fashion" },
  { id: "SP-08", title: "Ceramic Espresso Cup Set (4)", sku: "KL-ES-04", image: mug, price: 42, stock: 76, sold: 190, rating: 4.8, status: "active", category: "Home" },
];

export type SellerOrderStatus = "pending" | "processing" | "shipped" | "delivered" | "refunded";
export interface SellerOrder {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  items: number;
  status: SellerOrderStatus;
  payment: "paid" | "pending" | "refunded";
}

export const sellerOrders: SellerOrder[] = [
  { id: "NX-10428", customer: "Sarah Chen",   email: "sarah@nex.co",   date: "Jul 22, 2026", total: 217.00, items: 2, status: "processing", payment: "paid" },
  { id: "NX-10427", customer: "Marcus Lee",   email: "marcus@nex.co",  date: "Jul 22, 2026", total: 89.00,  items: 1, status: "pending",    payment: "pending" },
  { id: "NX-10426", customer: "Priya Shah",   email: "priya@nex.co",   date: "Jul 21, 2026", total: 328.00, items: 3, status: "shipped",    payment: "paid" },
  { id: "NX-10425", customer: "Jonah Silva",  email: "jonah@nex.co",   date: "Jul 21, 2026", total: 119.00, items: 1, status: "delivered",  payment: "paid" },
  { id: "NX-10424", customer: "Ava Thompson", email: "ava@nex.co",     date: "Jul 20, 2026", total: 62.00,  items: 2, status: "refunded",   payment: "refunded" },
  { id: "NX-10423", customer: "Leo Park",     email: "leo@nex.co",     date: "Jul 20, 2026", total: 189.00, items: 1, status: "delivered",  payment: "paid" },
  { id: "NX-10422", customer: "Mira Patel",   email: "mira@nex.co",    date: "Jul 19, 2026", total: 447.00, items: 4, status: "shipped",    payment: "paid" },
];

export interface Coupon {
  code: string;
  type: "percent" | "amount" | "shipping";
  value: number;
  redemptions: number;
  limit: number;
  expiresOn: string;
  status: "active" | "scheduled" | "expired";
}
export const coupons: Coupon[] = [
  { code: "SUMMER25",  type: "percent",  value: 25, redemptions: 412, limit: 1000, expiresOn: "Aug 31, 2026", status: "active" },
  { code: "FREESHIP",  type: "shipping", value: 0,  redemptions: 1210, limit: 5000, expiresOn: "Dec 31, 2026", status: "active" },
  { code: "WELCOME10", type: "amount",   value: 10, redemptions: 88,  limit: 500,  expiresOn: "Sep 15, 2026", status: "active" },
  { code: "BTS15",     type: "percent",  value: 15, redemptions: 0,   limit: 800,  expiresOn: "Sep 01, 2026", status: "scheduled" },
  { code: "SPRING20",  type: "percent",  value: 20, redemptions: 924, limit: 1000, expiresOn: "May 31, 2026", status: "expired" },
];

export interface SellerReview {
  id: string;
  product: string;
  productImage: string;
  author: string;
  rating: number;
  date: string;
  body: string;
  sentiment: "positive" | "neutral" | "negative";
  replied: boolean;
}
export const sellerReviews: SellerReview[] = [
  { id: "R1", product: "Studio Wireless Headphones ANC", productImage: headphones, author: "Sarah C.",  rating: 5, date: "Jul 20", body: "Battery lasts forever and the ANC on planes is incredible. Comfortable for long flights.", sentiment: "positive", replied: false },
  { id: "R2", product: "Runner Pro Knit Sneakers",       productImage: sneakers,   author: "Marcus L.", rating: 4, date: "Jul 19", body: "Great daily runner. Sizing runs a bit narrow — order half up.", sentiment: "positive", replied: true },
  { id: "R3", product: "Minimalist Steel Watch — Slate", productImage: watch,      author: "Priya S.",  rating: 3, date: "Jul 18", body: "Looks premium but the strap is stiff out of the box.", sentiment: "neutral",  replied: false },
  { id: "R4", product: "Everyday ANC Earbuds",           productImage: headphones, author: "Jonah S.",  rating: 2, date: "Jul 17", body: "Right earbud disconnects randomly during calls. Disappointed.", sentiment: "negative", replied: false },
  { id: "R5", product: "Ceramic Pour-Over Mug 350ml",    productImage: mug,        author: "Ava T.",    rating: 5, date: "Jul 15", body: "Perfect weight, keeps coffee warm, beautiful glaze.", sentiment: "positive", replied: true },
];

export interface SellerCustomer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  lastOrder: string;
  tier: "new" | "returning" | "vip";
}
export const sellerCustomers: SellerCustomer[] = [
  { id: "C-001", name: "Sarah Chen",   email: "sarah@nex.co",  orders: 12, spent: 2140, lastOrder: "Jul 22, 2026", tier: "vip" },
  { id: "C-002", name: "Marcus Lee",   email: "marcus@nex.co", orders: 3,  spent: 289,  lastOrder: "Jul 22, 2026", tier: "returning" },
  { id: "C-003", name: "Priya Shah",   email: "priya@nex.co",  orders: 8,  spent: 1420, lastOrder: "Jul 21, 2026", tier: "vip" },
  { id: "C-004", name: "Jonah Silva",  email: "jonah@nex.co",  orders: 1,  spent: 119,  lastOrder: "Jul 21, 2026", tier: "new" },
  { id: "C-005", name: "Ava Thompson", email: "ava@nex.co",    orders: 5,  spent: 612,  lastOrder: "Jul 20, 2026", tier: "returning" },
  { id: "C-006", name: "Leo Park",     email: "leo@nex.co",    orders: 2,  spent: 289,  lastOrder: "Jul 20, 2026", tier: "returning" },
  { id: "C-007", name: "Mira Patel",   email: "mira@nex.co",   orders: 14, spent: 3210, lastOrder: "Jul 19, 2026", tier: "vip" },
];