import headphones from "@/assets/product-headphones.jpg";
import watch from "@/assets/product-watch.jpg";
import mug from "@/assets/product-mug.jpg";
import sneakers from "@/assets/product-sneakers.jpg";
import {
  Laptop, Shirt, Home as HomeIcon, BookOpen, Dumbbell, Gamepad2, Gem, Watch,
  type LucideIcon,
} from "lucide-react";

export const productImages = { headphones, watch, mug, sneakers };

export interface Product {
  id: string;
  title: string;
  vendor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: { label: string; variant?: "ai" | "success" | "warning" | "destructive" };
  category: string;
  description: string;
  aiPick?: boolean;
}

export const products: Product[] = [
  { id: "p1", title: "Studio Wireless Headphones ANC", vendor: "Acoustica", price: 189, originalPrice: 249, rating: 4.8, reviews: 1240, image: headphones, badge: { label: "AI Pick", variant: "ai" }, category: "electronics", description: "Studio-grade active noise cancellation, 40h battery, plush memory-foam earcups.", aiPick: true },
  { id: "p2", title: "Minimalist Steel Watch — Slate", vendor: "Northline", price: 149, originalPrice: 199, rating: 4.6, reviews: 512, image: watch, badge: { label: "-24%", variant: "warning" }, category: "accessories", description: "Sapphire crystal, Swiss quartz movement, sandblasted stainless steel case." },
  { id: "p3", title: "Ceramic Pour-Over Mug 350ml", vendor: "Kiln & Co.", price: 28, rating: 4.9, reviews: 380, image: mug, category: "home", description: "Hand-thrown stoneware with a smooth matte glaze. Dishwasher-safe." },
  { id: "p4", title: "Runner Pro Knit Sneakers", vendor: "Stride Lab", price: 119, originalPrice: 140, rating: 4.7, reviews: 902, image: sneakers, badge: { label: "AI Pick", variant: "ai" }, category: "fashion", description: "Featherweight knit upper with responsive foam midsole. Made for daily miles.", aiPick: true },
  { id: "p5", title: "Everyday ANC Earbuds", vendor: "Acoustica", price: 89, rating: 4.5, reviews: 1810, image: headphones, category: "electronics", description: "Compact ANC earbuds with 28h total playtime." },
  { id: "p6", title: "Field Watch — Sand", vendor: "Northline", price: 129, rating: 4.4, reviews: 244, image: watch, category: "accessories", description: "Rugged field watch, 100m water resistance." },
  { id: "p7", title: "Trail Runners v2", vendor: "Stride Lab", price: 139, rating: 4.6, reviews: 401, image: sneakers, category: "fashion", description: "Grippy lugs for wet trails, drainage ports for creek crossings." },
  { id: "p8", title: "Ceramic Espresso Cup Set (4)", vendor: "Kiln & Co.", price: 42, rating: 4.8, reviews: 190, image: mug, category: "home", description: "Set of four hand-glazed espresso cups." },
];

export const findProduct = (id: string) => products.find((p) => p.id === id) ?? products[0];

export interface Category { slug: string; label: string; count: number; icon: LucideIcon; }
export const categories: Category[] = [
  { slug: "electronics", label: "Electronics", count: 12480, icon: Laptop },
  { slug: "fashion", label: "Fashion", count: 24310, icon: Shirt },
  { slug: "home", label: "Home", count: 8721, icon: HomeIcon },
  { slug: "books", label: "Books", count: 15230, icon: BookOpen },
  { slug: "sports", label: "Sports", count: 5410, icon: Dumbbell },
  { slug: "beauty", label: "Beauty", count: 6892, icon: Gem },
  { slug: "gaming", label: "Gaming", count: 3240, icon: Gamepad2 },
  { slug: "accessories", label: "Accessories", count: 9870, icon: Watch },
];

export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);

export interface Order {
  id: string;
  placedOn: string;
  status: "processing" | "shipped" | "out_for_delivery" | "delivered";
  total: number;
  items: { product: Product; qty: number }[];
  eta: string;
  tracking: string;
}

export const orders: Order[] = [
  { id: "NX-10428", placedOn: "Jul 18, 2026", status: "out_for_delivery", total: 217.00, eta: "Tomorrow, by 6pm", tracking: "TRK-889231", items: [{ product: products[0], qty: 1 }, { product: products[2], qty: 1 }] },
  { id: "NX-10402", placedOn: "Jul 12, 2026", status: "shipped", total: 149.00, eta: "Jul 24, 2026", tracking: "TRK-889188", items: [{ product: products[1], qty: 1 }] },
  { id: "NX-10371", placedOn: "Jun 30, 2026", status: "delivered", total: 119.00, eta: "Delivered Jul 3", tracking: "TRK-889044", items: [{ product: products[3], qty: 1 }] },
];

export const findOrder = (id: string) => orders.find((o) => o.id === id) ?? orders[0];

export interface Notification { id: string; title: string; body: string; time: string; type: "order" | "deal" | "ai" | "system"; unread: boolean; }
export const notifications: Notification[] = [
  { id: "n1", type: "order", title: "Order NX-10428 is out for delivery", body: "Arriving tomorrow before 6pm.", time: "10 min ago", unread: true },
  { id: "n2", type: "ai", title: "New AI pick for you", body: "Based on your recent search, Studio Headphones ANC dropped to $189.", time: "1 hr ago", unread: true },
  { id: "n3", type: "deal", title: "Flash sale in Fashion", body: "Up to 40% off on Stride Lab. Ends in 3h.", time: "3 hrs ago", unread: false },
  { id: "n4", type: "system", title: "Password changed", body: "Your account password was updated successfully.", time: "Yesterday", unread: false },
];

export const initialCart = [
  { productId: "p1", qty: 1 },
  { productId: "p3", qty: 2 },
];

export const initialWishlist = ["p2", "p4", "p5"];

export const aiSuggestions = [
  "Wireless headphones under $200 with great bass",
  "Minimalist watch for daily wear",
  "Gift for a coffee lover",
  "Everyday running shoes for beginners",
  "Best noise cancelling earbuds",
];