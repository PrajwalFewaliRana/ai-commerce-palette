import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  fetchSession,
  signIn,
  signOut,
  signUp,
  type SignInInput,
  type SignUpInput,
} from "./auth-client";
import type { AuthUser } from "./roles";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (input: SignInInput) => Promise<AuthUser>;
  register: (input: SignUpInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  // Starts true: guards must wait for the session check instead of bouncing
  // an authenticated user to /login on first paint or after a refresh.
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const next = await fetchSession();
    setUser(next);
    return next;
  }, []);

  useEffect(() => {
    let active = true;
    void (async () => {
      const next = await fetchSession();
      if (!active) return;
      setUser(next);
      setIsLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (input: SignInInput) => {
    const next = await signIn(input);
    setUser(next);
    return next;
  }, []);

  const register = useCallback(async (input: SignUpInput) => {
    const next = await signUp(input);
    setUser(next);
    return next;
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
