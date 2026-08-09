import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ShoppingBag, Store, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/ds/auth-layout";
import { FloatingInput } from "@/components/ds/floating-input";
import { GoogleButton, OrDivider } from "@/components/ds/social-buttons";
import { PasswordStrength, scorePassword } from "@/components/ds/password-strength";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resolveHomePath, signInWithGoogle, signUpWithEmail } from "@/lib/auth";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      { title: "Create your account — Nexa" },
      {
        name: "description",
        content: "Join Nexa as a customer or seller. Discover products with AI.",
      },
    ],
  }),
  ssr: false,
  component: RegisterPage,
});

type Role = "customer" | "seller";

function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<"email" | "google" | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.includes("@")) next.email = "Enter a valid email.";
    if (scorePassword(password) < 3) next.password = "Choose a stronger password.";
    if (password !== confirm) next.confirm = "Passwords do not match.";
    if (!agreed) next.agreed = "You must accept the terms.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setBusy("email");
    try {
      const { user } = await signUpWithEmail({
        email,
        password,
        accountType: role,
        name: name.trim(),
      });
      navigate({
        to: user ? await resolveHomePath(user.id) : `/dashboard/${role}`,
        replace: true,
      });
    } catch (err) {
      setErrors({ email: err instanceof Error ? err.message : "Could not create your account." });
    } finally {
      setBusy(null);
    }
  }

  async function onGoogle() {
    setBusy("google");
    try {
      const result = await signInWithGoogle(role);
      // Full-page flow: the browser is already navigating away.
      if ("redirected" in result && result.redirected) return;
      const { data } = await supabase.auth.getUser();
      navigate({
        to: data.user ? await resolveHomePath(data.user.id) : `/dashboard/${role}`,
        replace: true,
      });
    } catch (err) {
      setErrors({ email: err instanceof Error ? err.message : "Google sign-up failed." });
      setBusy(null);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start shopping or selling on Nexa in under a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-border bg-muted/50 p-1">
        {(["customer", "seller"] as Role[]).map((r) => {
          const Icon = r === "customer" ? ShoppingBag : Store;
          const active = role === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {r === "customer" ? "I'm shopping" : "I'm selling"}
            </button>
          );
        })}
      </div>

      <GoogleButton
        label="Sign up with Google"
        onClick={onGoogle}
        loading={busy === "google"}
        disabled={busy !== null}
      />
      <OrDivider />

      <form onSubmit={onSubmit} className="space-y-4">
        <FloatingInput
          label={role === "seller" ? "Store name" : "Full name"}
          icon={User}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <FloatingInput
          label="Email address"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <div>
          <FloatingInput
            label="Password"
            type={show ? "text" : "password"}
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="new-password"
            endAdornment={
              <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password">
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
          />
          <PasswordStrength value={password} />
        </div>
        <FloatingInput
          label="Confirm password"
          type={show ? "text" : "password"}
          icon={Lock}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
          success={confirm.length > 0 && confirm === password}
          autoComplete="new-password"
        />

        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 size-4 rounded border-border accent-[color:var(--primary)]"
          />
          <span>
            I agree to Nexa's{" "}
            <a className="text-primary hover:underline" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="text-primary hover:underline" href="#">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.agreed && <p className="text-xs text-destructive">{errors.agreed}</p>}

        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy !== null}>
          {busy === "email" && <Loader2 className="size-4 animate-spin" />} Create account
        </Button>
      </form>
    </AuthLayout>
  );
}
