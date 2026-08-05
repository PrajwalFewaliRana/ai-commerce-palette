import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { fetchRoles, homePathForRoles, type AppRole } from "@/lib/auth";

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
      setRoles(next?.user ? await fetchRoles(next.user.id) : []);
      if (active) setLoading(false);
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