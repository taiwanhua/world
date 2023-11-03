// import { v4 as uuidv4 } from "uuid";
import type {
  Prisma,
  system_relevance as SystemRelevance,
} from "@prisma/client";
import { isNil } from "lodash-es";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import { defaultPageLimit, defaultPageStart } from "@/backend/constant/value";
import type { QuerySystemRelevanceSummaryInput } from "@/backend/graphql/types";

export interface Params {
  args: QuerySystemRelevanceSummaryInput;
  locals: Locals;
}

export interface Return {
  data: SystemRelevance[];
  count: number;
}

export async function systemRelevanceSummary({
  locals,
  args,
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    // never in, no permission
    return { data: [], count: 0 };
  }

  const { type, enable, firstId, secondId, thirdId, limit, start } = args;

  const countArgs: Prisma.system_relevanceCountArgs = {
    where: {
      type,
      first_id: firstId ?? undefined,
      second_id: secondId ?? undefined,
      third_id: thirdId ?? undefined,
      enable: { equals: isNil(enable) ? undefined : enable },
    },
  };

  const findManyArgs: Prisma.system_relevanceFindManyArgs = {
    ...(countArgs as Prisma.system_relevanceFindManyArgs),
    take: limit === 0 ? undefined : limit ?? defaultPageLimit,
    skip: start ?? defaultPageStart,
  };

  const [systemRelevances, count] = await prisma.$transaction([
    prisma.system_relevance.findMany(findManyArgs),
    prisma.system_relevance.count(countArgs),
  ]);

  return { data: systemRelevances, count };
}
