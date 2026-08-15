import { UserRole } from "@/types/roles";

/**
 * Extracts subdomain from a hostname (e.g., admin.fleet.com -> admin, dispatcher.localhost:3000 -> dispatcher)
 */
export function getSubdomain(hostname: string | null): string | null {
  if (!hostname) return null;

  // Remove port if present
  const host = hostname.split(":")[0].toLowerCase();

  // Handle localhost scenarios (e.g. admin.localhost)
  if (host.includes("localhost")) {
    const parts = host.split(".");
    if (parts.length > 1 && parts[0] !== "localhost" && parts[0] !== "www") {
      return parts[0];
    }
    return null;
  }

  // Handle standard domain names (e.g., admin.smedispatch.com)
  const parts = host.split(".");
  if (parts.length >= 3) {
    const subdomain = parts[0];
    if (subdomain !== "www") {
      return subdomain;
    }
  }

  return null;
}

/**
 * Resolves a UserRole from a subdomain string
 */
export function getRoleFromSubdomain(subdomain: string | null): UserRole | null {
  if (!subdomain) return null;
  const clean = subdomain.toLowerCase().trim();

  if (clean === "admin") return "admin";
  if (clean === "dispatcher" || clean === "dispatch") return "dispatcher";

  return null;
}
