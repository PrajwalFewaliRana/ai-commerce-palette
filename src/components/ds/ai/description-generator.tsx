import { useState } from "react";
import { Wand2, Copy, RefreshCw, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiPanel } from "./ai-panel";
import { generateDescription, type Tone } from "@/lib/ai-mock";

/** AI Description Generator: seller-side copywriting + SEO keywords, inline in the listing flow. */
export function AiDescriptionGenerator({ defaultName = "" }: { defaultName?: string }) {
  const [name, setName] = useState(defaultName);
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState<Tone>("premium");
  const [result, setResult] = useState<ReturnType<typeof generateDescription> | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const run = () => {
    setBusy(true);
    setCopied(false);
    window.setTimeout(() => {
      setResult(generateDescription(name, keywords, tone));
      setBusy(false);
    }, 550);
  };

  const copy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(`${result.description}\n\n${result.bullets.map((b) => `• ${b}`).join("\n")}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AiPanel
      eyebrow="AI Description Generator"
      icon={<Wand2 className="size-5" />}
      title="Write the listing for me"
      subtitle="Product copy, bullet points, SEO title, meta description and keywords."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name (e.g. Studio Wireless Headphones ANC)" />
          <Textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Optional: key features or keywords, comma separated"
            className="min-h-24"
          />
          <Tabs value={tone} onValueChange={(v) => setTone(v as Tone)}>
            <TabsList>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="friendly">Friendly</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="hero" onClick={run} disabled={busy}>
            {busy ? <RefreshCw className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
            {busy ? "Writing..." : result ? "Regenerate" : "Generate copy"}
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          {!result && !busy && (
            <p className="text-sm text-muted-foreground">
              Add a product name and I'll draft the description, bullets and SEO metadata you can paste straight into the listing.
            </p>
          )}
          {busy && (
            <div className="space-y-2">
              {[90, 78, 84, 60].map((w) => (
                <div key={w} className="h-3 animate-pulse rounded-full bg-muted" style={{ width: `${w}%` }} />
              ))}
            </div>
          )}
          {result && !busy && (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">{result.description}</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {result.bullets.map((b) => (
                  <li key={b} className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-[color:var(--success)]" />{b}</li>
                ))}
              </ul>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">SEO keywords</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.keywords.map((k) => <Badge key={k} variant="secondary">{k}</Badge>)}
                </div>
              </div>
              <div className="space-y-1 rounded-xl bg-accent/50 p-3 text-xs">
                <p><span className="font-semibold">SEO title:</span> {result.seoTitle}</p>
                <p className="text-muted-foreground"><span className="font-semibold text-foreground">Meta:</span> {result.metaDescription}</p>
              </div>
              <Button variant="outline" size="sm" onClick={copy}>
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />} {copied ? "Copied" : "Copy copy"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </AiPanel>
  );
}