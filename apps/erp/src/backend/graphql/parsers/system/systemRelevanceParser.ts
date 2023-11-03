import type { system_relevance as PrismaSystemRelevance } from "@prisma/client";
import type { SystemRelevance } from "@/backend/graphql/types";

export function systemRelevanceParser(
  target: PrismaSystemRelevance,
): SystemRelevance {
  return {
    id: target.id,
    memo: target.memo,
    type: target.type,
    firstId: target.first_id,
    secondId: target.second_id,
    thirdId: target.third_id,
    enable: target.enable,
    createdUser: target.created_user,
    createdDate: target.created_date,
    updatedUser: target.updated_user,
    updatedDate: target.updated_date,
  };
}
