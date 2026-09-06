import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Role } from "./roles";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export type LoginInput = { email: string; password: string };
export type RegisterInput = { email: string; password: string; name: string; role: Role };

export type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
};

/**
 * Message surfaced while the backend authentication phase is not implemented.
 * No mock users are created and nothing is persisted — the provider simply has
 * no session source yet.
 */
export const AUTH_NOT_CONNECTED =
  "Sign-in isn't connected yet. Account access is enabled in the next phase.";

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Session bootstrap. Replaced by a real session/token lookup in the backend
  // authentication phase; today there is no session to restore.
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = useCallback(async (_input: LoginInput): Promise<AuthUser> => {
    throw new Error(AUTH_NOT_CONNECTED);
  }, []);

  const register = useCallback(async (_input: RegisterInput): Promise<AuthUser> => {
    throw new Error(AUTH_NOT_CONNECTED);
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
  }, []);

  const refreshUser = useCallback(async (): Promise<AuthUser | null> => {
    return null;
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      isAuthenticated: user !== null,
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

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>.");
  return ctx;
}
