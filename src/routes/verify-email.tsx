import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { MailCheck } from "lucide-react";
import { AuthLayout } from "@/components/ds/auth-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify your email — Nexa" },
      {
        name: "description",
        content: "Enter the 6-digit code we sent to your inbox to verify your account.",
      },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function set(i: number, v: string) {
    const clean = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (clean && i < 5) refs.current[i + 1]?.focus();
  }

  function onKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  }

  function onPaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = text.padEnd(6, "").split("");
    setDigits(next);
    refs.current[Math.min(text.length, 5)]?.focus();
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < 6) return setError("Enter all 6 digits.");
    setError(null);
    navigate({ to: "/customer/dashboard" });
  }

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We sent a 6-digit code to your email. Enter it below to activate your account."
      footer={
        <>
          Wrong email?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Start over
          </Link>
        </>
      }
    >
      <div className="mb-6 flex justify-center">
        <div className="grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <MailCheck className="size-6" />
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex justify-between gap-2" onPaste={onPaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              inputMode="numeric"
              maxLength={1}
              className={cn(
                "h-14 w-full min-w-0 rounded-xl border bg-card text-center text-xl font-semibold outline-none transition",
                "focus:border-primary focus:shadow-[var(--shadow-glow)]",
                error ? "border-destructive" : "border-border",
              )}
            />
          ))}
        </div>
        {error && <p className="text-center text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="hero" size="lg" className="w-full">
          Verify & continue
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Didn't get a code?{" "}
          <button type="button" className="font-medium text-primary hover:underline">
            Resend in 30s
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}
