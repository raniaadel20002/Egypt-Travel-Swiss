export interface JwtPayload {
  nameid?: string;
  email?: string;
  unique_name?: string;
  role?: string | string[];
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
  exp?: number;
}

export function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as JwtPayload;
  } catch {
    return null;
  }
}

export function isJwtExpired(token?: string | null): boolean {
  if (!token) return true;
  const payload = parseJwtPayload(token);
  if (!payload || !payload.exp) return false;
  // Expired if current time in seconds is past or within 5s of expiration
  return Date.now() / 1000 >= payload.exp - 5;
}
