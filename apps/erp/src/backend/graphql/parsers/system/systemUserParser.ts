import type { system_user as PrismaSystemUser } from "@prisma/client";
import type { SystemUser } from "@/backend/graphql/types";

export function systemUserParser(target: PrismaSystemUser): SystemUser {
  return {
    id: target.id,
    providerId: target.provider_id,
    provider: target.provider,
    displayName: target.display_name,
    familyName: target.family_name,
    givenName: target.given_name,
    email: target.email,
    emailVerified: target.email_verified,
    password: target.password,
    language: target.language,
    locale: target.locale,
    picture: target.picture,
    enable: target.enable,
    createdUser: target.created_user,
    createdDate: target.created_date,
    updatedUser: target.updated_user,
    updatedDate: target.updated_date,
  };
}
