export const isSuperAdmin = (providerId: string): boolean =>
  providerId.startsWith("super-admin");
