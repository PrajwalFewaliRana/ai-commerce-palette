import { isRole, type AuthUser, type Role } from "./roles";

/**
 * Session transport boundary.
 *
 * PHASE 1 PLACEHOLDER — there is no backend yet. Every function here is a stub
 * that keeps a session for the current browser tab only (sessionStorage, cleared
 * when the tab closes). Nothing is persisted and no user record is invented
 * beyond the credentials typed into the form.
 *
 * In the backend phase, replace the bodies of these four functions with real
 * calls (session cookie / JWT + `GET /me`). No other file needs to change.
 */

const SESSION_KEY = "nexa.auth.session";

export type Credentials = { email: string; password: string };
export type SignInInput = Credentials & { role: Role };
export type SignUpInput = Credentials & { name: string; role: Role };

function read(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      "id" in parsed &&
      "email" in parsed &&
      "role" in parsed &&
      isRole((parsed as { role: unknown }).role)
    ) {
      return parsed as AuthUser;
    }
    return null;
  } catch {
    return null;
  }
}

function write(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (user) window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else window.sessionStorage.removeItem(SESSION_KEY);
}

/** Replace with `GET /api/auth/me`. */
export async function fetchSession(): Promise<AuthUser | null> {
  return read();
}

/** Replace with `POST /api/auth/login`; the role must come from the server. */
export async function signIn({ email, role }: SignInInput): Promise<AuthUser> {
  const user: AuthUser = {
    id: `pending-${role.toLowerCase()}`,
    email,
    name: email.split("@")[0] ?? email,
    role,
  };
  write(user);
  return user;
}

/** Replace with `POST /api/auth/register`. */
export async function signUp({ email, name, role }: SignUpInput): Promise<AuthUser> {
  const user: AuthUser = { id: `pending-${role.toLowerCase()}`, email, name, role };
  write(user);
  return user;
}

/** Replace with `POST /api/auth/logout`. */
export async function signOut(): Promise<void> {
  write(null);
}
