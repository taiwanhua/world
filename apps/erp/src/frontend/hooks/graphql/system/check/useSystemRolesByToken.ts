import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import type { GraphQLError } from "graphql";
import type { WowgoGraphqlClass } from "@/frontend/hooks/graphql/useWowgoGraphql";
import { useWowgoGraphql } from "@/frontend/hooks/graphql/useWowgoGraphql";
import type { SystemRolesByTokenQuery } from "@/frontend/graphql/query/system/check/systemRolesByToken.type";

export interface FetcherParams {
  fetcher: unknown;
  wowgoGraphql: WowgoGraphqlClass;
}

async function fetcher({
  wowgoGraphql,
}: FetcherParams): Promise<SystemRolesByTokenQuery> {
  const response = await wowgoGraphql.query.systemRolesByToken();
  return response;
}

export interface Params {
  immutable?: boolean;
}

export interface Return {
  rolesByToken: SystemRolesByTokenQuery | undefined;
  isValidating: boolean;
  error: GraphQLError;
}

export function useOaAuthRolesByToken({ immutable = false }: Params): Return {
  // this is not a good practice
  const handle = immutable ? useSWRImmutable : useSWR;
  const { wowgoGraphql } = useWowgoGraphql();
  const { data, isValidating, error } = handle(
    { fetcher, wowgoGraphql },
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  return { rolesByToken: data, isValidating, error };
}
