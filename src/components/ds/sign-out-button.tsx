import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export function SignOutButton({
  variant = "icon",
}: {
  variant?: "icon" | "labelled";
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut();
    navigate({ to: "/auth/login", replace: true });
  }

  if (variant === "labelled") {
    return (
      <Button variant="ghost" size="sm" onClick={handleSignOut}>
        <LogOut className="size-4" /> Sign out
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
      <LogOut className="size-4" />
    </Button>
  );
}