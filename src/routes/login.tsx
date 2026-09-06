import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ShoppingBag, Store, ShieldCheck } from "lucide-react";
import { AuthLayout } from "@/components/ds/auth-layout";
import { FloatingInput } from "@/components/ds/floating-input";
import { GoogleButton, OrDivider } from "@/components/ds/social-buttons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Nexa" },
      { name: "description", content: "Sign in to your Nexa account to shop smarter with AI." },
    ],
  }),
  component: LoginPage,
});

type Role = "customer" | "seller" | "admin";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("customer");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return setError("Please enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setError(null);
    navigate({ to: `/dashboard/${role}` });
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
      <GoogleButton />
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

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Sign in as</p>
          <RoleTabs value={role} onChange={setRole} />
        </div>

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

        <Button type="submit" variant="hero" size="lg" className="w-full">
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
}

function RoleTabs({ value, onChange }: { value: Role; onChange: (r: Role) => void }) {
  const options: { id: Role; label: string; icon: typeof ShoppingBag }[] = [
    { id: "customer", label: "Customer", icon: ShoppingBag },
    { id: "seller", label: "Seller", icon: Store },
    { id: "admin", label: "Admin", icon: ShieldCheck },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 rounded-xl border border-border bg-muted/50 p-1">
      {options.map((o) => {
        const Icon = o.icon;
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium transition",
              active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
