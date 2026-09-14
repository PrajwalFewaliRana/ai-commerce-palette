import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth-context";

/** Icon-only sign-out used in dashboard shell headers. */
export function SignOutIconButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Sign out"
      onClick={() => void logout().then(() => navigate({ to: "/" }))}
    >
      <LogOut className="size-4" />
    </Button>
  );
}

/** Labeled sign-out used in the simple DashboardShell. */
export function SignOutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => void logout().then(() => navigate({ to: "/" }))}
    >
      <LogOut className="size-4" /> Sign out
    </Button>
  );
}
