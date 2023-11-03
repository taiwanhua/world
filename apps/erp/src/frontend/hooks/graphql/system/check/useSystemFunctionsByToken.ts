import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import type { GraphQLError } from "graphql";
import type { WowgoGraphqlClass } from "@/frontend/hooks/graphql/useWowgoGraphql";
import { useWowgoGraphql } from "@/frontend/hooks/graphql/useWowgoGraphql";
import type { SystemFunctionsByTokenQuery } from "@/frontend/graphql/query/system/check/systemFunctionsByToken.type";

export interface FetcherParams {
  fetcher: unknown;
  wowgoGraphql: WowgoGraphqlClass;
}

async function fetcher({
  wowgoGraphql,
}: FetcherParams): Promise<SystemFunctionsByTokenQuery> {
  const response = await wowgoGraphql.query.systemFunctionsByToken();
  return response;
}

export interface Params {
  immutable?: boolean;
}

export interface Return {
  functionsByToken: SystemFunctionsByTokenQuery | undefined;
  isValidating: boolean;
  error: GraphQLError;
}

export function useSystemFunctionsByToken({
  immutable = false,
}: Params): Return {
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

  return { functionsByToken: data, isValidating, error };
}
