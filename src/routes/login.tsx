import { PublicRoute } from "@/guards";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/ds/auth-layout";
import { FloatingInput } from "@/components/ds/floating-input";
import { GoogleButton, OrDivider } from "@/components/ds/social-buttons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { resolveHomePath, signInWithEmail, signInWithGoogle } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Nexa" },
      { name: "description", content: "Sign in to your Nexa account to shop smarter with AI." },
    ],
  }),
  ssr: false,
  component: () => (
    <PublicRoute>
      <LoginPage />
    </PublicRoute>
  ),
});

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, homePath, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"email" | "google" | null>(null);

  // Already signed in → straight to the right dashboard.
  useEffect(() => {
    if (!loading && isAuthenticated) navigate({ to: homePath, replace: true });
  }, [loading, isAuthenticated, homePath, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return setError("Please enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setError(null);
    setBusy("email");
    try {
      const { user } = await signInWithEmail(email, password);
      navigate({ to: user ? await resolveHomePath(user.id) : "/customer/dashboard", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setBusy(null);
    }
  }

  async function onGoogle() {
    setError(null);
    setBusy("google");
    try {
      const result = await signInWithGoogle();
      if ("redirected" in result && result.redirected) return;
      const { data } = await supabase.auth.getUser();
      navigate({
        to: data.user ? await resolveHomePath(data.user.id) : "/customer/dashboard",
        replace: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed.");
      setBusy(null);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your AI-powered shopping experience."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <GoogleButton onClick={onGoogle} loading={busy === "google"} disabled={busy !== null} />
      <OrDivider />
      <form onSubmit={onSubmit} className="space-y-4">
        <FloatingInput
          label="Email address"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <FloatingInput
          label="Password"
          type={show ? "text" : "password"}
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          endAdornment={
            <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password">
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          }
        />

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-muted-foreground">
            <input
              type="checkbox"
              className="size-4 rounded border-border accent-[color:var(--primary)]"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        {error && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={busy !== null}
        >
          {busy === "email" && <Loader2 className="size-4 animate-spin" />} Sign in
        </Button>
        <p className="text-center text-caption text-muted-foreground">
          You'll land on the right dashboard automatically — customer, seller or admin.
        </p>
      </form>
    </AuthLayout>
  );
}
