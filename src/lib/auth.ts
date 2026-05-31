const SESSION_KEY = 'admin_session';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 soat

// Parolni SHA-256 bilan hash qilish
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Login
export async function adminLogin(password: string): Promise<boolean> {
  const expectedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH;
  if (!expectedHash) return false;

  const inputHash = await hashPassword(password);
  if (inputHash !== expectedHash) return false;

  // Session yaratish
  const session = {
    loggedIn: true,
    expiresAt: Date.now() + SESSION_DURATION,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return true;
}

// Session tekshirish
export function isAdminLoggedIn(): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    if (!session.loggedIn) return false;
    if (Date.now() > session.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Logout
export function adminLogout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
