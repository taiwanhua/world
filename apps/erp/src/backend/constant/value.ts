export const providerTypes = ["GOOGLE"];

export const pageLimits = [10, 50, 100];

export const defaultPageLimit = 10;
export const defaultPageStart = 0;

export const acceptTypes = [".jpg", ".jpeg", ".png"] as const;
export type AcceptTypes = (typeof acceptTypes)[number];

export const defaultUpdateUser = "guest";

/** List current RelevanceType in DB (non-real-time data) */
export enum SystemRelevanceTypeEnum {
  UserRole = "UserRole",
  RoleFunction = "RoleFunction",
  UserFunction = "UserFunction",
  RoleMenu = "RoleMenu",
  UserMenu = "UserMenu",
}
