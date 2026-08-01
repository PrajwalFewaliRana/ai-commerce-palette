import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export const SearchBar = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, placeholder = "Search products, vendors, categories...", ...props }, ref) => (
  <div
    className={cn(
      "flex items-center gap-2 rounded-xl border border-border bg-card px-3 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring/20",
      className,
    )}
  >
    <Search className="size-4 shrink-0 text-muted-foreground" />
    <input
      ref={ref}
      placeholder={placeholder}
      className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
      {...props}
    />
  </div>
));
SearchBar.displayName = "SearchBar";
