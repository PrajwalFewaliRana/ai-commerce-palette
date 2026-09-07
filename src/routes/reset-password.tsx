import { PublicRoute } from "@/components/auth/public-route";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/components/ds/auth-layout";
import { FloatingInput } from "@/components/ds/floating-input";
import { PasswordStrength, scorePassword } from "@/components/ds/password-strength";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — Nexa" },
      { name: "description", content: "Choose a new password for your Nexa account." },
    ],
  }),
  component: () => (
    <PublicRoute>
      <ResetPasswordPage />
    </PublicRoute>
  ),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (scorePassword(password) < 3) next.password = "Choose a stronger password.";
    if (password !== confirm) next.confirm = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setDone(true);
      setTimeout(() => navigate({ to: "/login" }), 1600);
    }
  }

  if (done) {
    return (
      <AuthLayout title="Password updated" subtitle="You'll be redirected to sign in.">
        <div className="rounded-2xl border border-[color:var(--success)]/30 bg-[color:var(--success)]/10 p-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-[color:var(--success)]" />
          <p className="mt-3 text-sm">Your password has been reset successfully.</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
      footer={
        <Link to="/login" className="text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <FloatingInput
            label="New password"
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
        <Button type="submit" variant="hero" size="lg" className="w-full">
          Update password
        </Button>
      </form>
    </AuthLayout>
  );
}
