import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/components/ds/auth-layout";
import { FloatingInput } from "@/components/ds/floating-input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Nexa" },
      { name: "description", content: "Get a password reset link sent to your email." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | undefined>();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return setError("Enter a valid email.");
    setError(undefined);
    setSent(true);
  }

  return (
    <AuthLayout
      title={sent ? "Check your inbox" : "Forgot password?"}
      subtitle={
        sent
          ? `We've sent a reset link to ${email}. It may take a minute to arrive.`
          : "Enter the email you registered with and we'll send you a reset link."
      }
      footer={
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-1.5 text-primary hover:underline"
        >
          <ArrowLeft className="size-3.5" /> Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-2xl border border-[color:var(--success)]/30 bg-[color:var(--success)]/10 p-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-[color:var(--success)]" />
          <p className="mt-3 text-sm text-foreground">
            Didn't receive it?{" "}
            <button
              onClick={() => setSent(false)}
              className="font-medium text-primary hover:underline"
            >
              Try another email
            </button>
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <FloatingInput
            label="Email address"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            autoComplete="email"
          />
          <Button type="submit" variant="hero" size="lg" className="w-full">
            Send reset link
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
