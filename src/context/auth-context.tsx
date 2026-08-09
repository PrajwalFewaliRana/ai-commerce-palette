import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { useAuth as useAuthState } from "@/hooks/use-auth";
import {
  homePathForRoles,
  signInWithEmail,
  signOut as signOutFn,
  signUpWithEmail,
  fetchRoles,
  type AccountType,
  type AppRole,
} from "@/lib/auth";

export type AuthContextValue = {
  user: User | null;
  session: Session | null;
  roles: AppRole[];
  isAuthenticated: boolean;
  isLoading: boolean;
  /** Centralised role → landing path resolution. */
  homePath: string;
  login: (email: string, password: string) => Promise<void>;
  register: (input: {
    email: string;
    password: string;
    accountType: AccountType;
    name: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Single source of truth for auth state in the client. Backed by the real
 * backend session — no mock users, no hardcoded roles.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const state = useAuthState();
  const [extraRoles, setExtraRoles] = useState<AppRole[] | null>(null);

  const roles = extraRoles ?? state.roles;

  const value = useMemo<AuthContextValue>(
    () => ({
      user: state.user,
      session: state.session,
      roles,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.loading,
      homePath: homePathForRoles(roles),
      login: async (email, password) => {
        await signInWithEmail(email, password);
      },
      register: async (input) => {
        await signUpWithEmail(input);
      },
      logout: async () => {
        setExtraRoles(null);
        await signOutFn();
      },
      refreshUser: async () => {
        if (!state.user) return;
        setExtraRoles(await fetchRoles(state.user.id));
      },
    }),
    [state.user, state.session, state.isAuthenticated, state.loading, roles],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside <AuthProvider>.");
  return ctx;
}