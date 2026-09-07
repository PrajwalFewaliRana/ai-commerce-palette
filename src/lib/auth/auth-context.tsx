import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { parseRole, type Role } from "./roles";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export type LoginInput = { email: string; password: string; role?: Role };
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

/**
 * Preview-only session storage. Lets the role areas be navigated before the
 * backend authentication phase lands. Replaced by real tokens later; nothing
 * here is a security boundary.
 */
const SESSION_KEY = "nexa.preview-session";

function readSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    return parseRole(parsed.role) ? parsed : null;
  } catch {
    return null;
  }
}

function writeSession(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (user) window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else window.localStorage.removeItem(SESSION_KEY);
}

function previewUser(email: string, role: Role): AuthUser {
  const name = email.split("@")[0]?.replace(/[._-]+/g, " ") || "Nexa user";
  return { id: `preview-${role.toLowerCase()}`, email, name, role };
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Session bootstrap. Replaced by a real session/token lookup in the backend
  // authentication phase; today there is no session to restore.
  useEffect(() => {
    setUser(readSession());
    setIsLoading(false);
  }, []);

  const login = useCallback(async (input: LoginInput): Promise<AuthUser> => {
    const next = previewUser(input.email, input.role ?? "CUSTOMER");
    writeSession(next);
    setUser(next);
    return next;
  }, []);

  const register = useCallback(async (input: RegisterInput): Promise<AuthUser> => {
    const next = { ...previewUser(input.email, input.role), name: input.name || input.email };
    writeSession(next);
    setUser(next);
    return next;
  }, []);

  const logout = useCallback(async () => {
    writeSession(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async (): Promise<AuthUser | null> => {
    const next = readSession();
    setUser(next);
    return next;
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
