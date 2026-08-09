import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { fetchRoles, homePathForRoles, type AppRole } from "@/lib/auth";
import { becomeSeller } from "@/lib/account.functions";

const PENDING_KEY = "nexa:pending_account_type";

/** Applies a "sign up as seller" intent captured before a Google redirect. */
async function applyPendingSellerIntent(roles: AppRole[]): Promise<AppRole[]> {
  let pending: string | null = null;
  try {
    pending = window.sessionStorage.getItem(PENDING_KEY);
  } catch {
    return roles;
  }
  if (pending !== "seller" || roles.includes("seller") || roles.includes("admin")) {
    try {
      window.sessionStorage.removeItem(PENDING_KEY);
    } catch {
      /* ignore */
    }
    return roles;
  }
  // Clear first: a failed upgrade must not be retried on every auth event
  // (that loop hammered the server fn and kept re-invalidating the router).
  try {
    window.sessionStorage.removeItem(PENDING_KEY);
  } catch {
    /* ignore */
  }
  try {
    await becomeSeller({ data: {} });
    return [...roles, "seller"];
  } catch {
    return roles;
  }
}

export type AuthState = {
  loading: boolean;
  session: Session | null;
  user: User | null;
  roles: AppRole[];
  homePath: string;
  isAuthenticated: boolean;
};

export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async (next: Session | null) => {
      if (!active) return;
      setSession(next);
      let nextRoles: AppRole[] = [];
      if (next?.user) {
        nextRoles = await fetchRoles(next.user.id);
        nextRoles = await applyPendingSellerIntent(nextRoles);
      }
      if (!active) return;
      setRoles(nextRoles);
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => void load(data.session));

    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      // Only identity transitions matter. TOKEN_REFRESHED / INITIAL_SESSION fire
      // often and re-ran the whole role + upgrade cycle, causing reload churn.
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      void load(next);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return {
    loading,
    session,
    user: session?.user ?? null,
    roles,
    homePath: homePathForRoles(roles),
    isAuthenticated: Boolean(session?.user),
  };
}