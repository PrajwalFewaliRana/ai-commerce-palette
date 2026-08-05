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
  try {
    await becomeSeller({ data: {} });
    window.sessionStorage.removeItem(PENDING_KEY);
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

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
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