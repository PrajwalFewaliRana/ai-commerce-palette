import { redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export type AccountType = "customer" | "seller";
export type AppRole = "customer" | "seller" | "admin";

export function friendlyAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "That email or password isn't right.";
  if (m.includes("already registered")) return "An account with this email already exists.";
  if (m.includes("pwned") || m.includes("compromised"))
    return "That password has appeared in a data breach. Please choose another.";
  return message;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(friendlyAuthError(error.message));
  return data;
}

export async function signUpWithEmail(input: {
  email: string;
  password: string;
  accountType: AccountType;
  name: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      emailRedirectTo: window.location.origin,
      data: {
        account_type: input.accountType,
        full_name: input.accountType === "seller" ? input.name : input.name,
        store_name: input.accountType === "seller" ? input.name : null,
      },
    },
  });
  if (error) throw new Error(friendlyAuthError(error.message));
  return data;
}

/** Google sign-in through the managed OAuth broker. */
export async function signInWithGoogle(accountType?: AccountType) {
  if (accountType) {
    try {
      window.sessionStorage.setItem("nexa:pending_account_type", accountType);
    } catch {
      /* storage unavailable — default role applies */
    }
  }
  const result = await lovable.auth.signInWithOAuth("google", {
    redirect_uri: window.location.origin,
  });
  if (result.error) throw new Error(friendlyAuthError(result.error.message));
  return result;
}

export async function sendPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });
  if (error) throw new Error(friendlyAuthError(error.message));
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error(friendlyAuthError(error.message));
}

export async function fetchRoles(userId: string): Promise<AppRole[]> {
  const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  if (error) return [];
  return (data ?? []).map((r) => r.role as AppRole);
}

export function homePathForRoles(roles: AppRole[]): string {
  if (roles.includes("admin")) return "/dashboard/admin";
  if (roles.includes("seller")) return "/dashboard/seller";
  return "/dashboard/customer";
}

/** Where a signed-in user belongs, based on their granted roles. */
export async function resolveHomePath(userId: string): Promise<string> {
  return homePathForRoles(await fetchRoles(userId));
}

export async function signOut() {
  await supabase.auth.signOut();
}

/** Use inside a client-only `beforeLoad` on protected routes. */
export async function requireUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw redirect({ to: "/auth/login" });
  return data.user;
}

export async function requireRole(role: AppRole) {
  const user = await requireUser();
  const { data, error } = await supabase.rpc("has_role", { _user_id: user.id, _role: role });
  if (error || !data) {
    throw redirect({ to: await resolveHomePath(user.id) });
  }
  return user;
}