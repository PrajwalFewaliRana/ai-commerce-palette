import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiDescriptionGenerator } from "@/components/ds/ai/description-generator";

/**
 * Listing form shell shared by the new / edit product routes. Uses the existing
 * design-system primitives only — no new visual language.
 */
export function ProductEditor({
  defaultTitle = "",
  defaultPrice = "",
}: {
  defaultTitle?: string;
  defaultPrice?: string;
}) {
  const [title, setTitle] = useState(defaultTitle);
  const [price, setPrice] = useState(defaultPrice);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="product-title">Product title</Label>
          <Input
            id="product-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Aurora Wireless Headphones"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="product-price">Price (USD)</Label>
          <Input
            id="product-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputMode="decimal"
            placeholder="199"
          />
        </div>
        <Button>Save product</Button>
      </div>
      <AiDescriptionGenerator />
    </div>
  );
}