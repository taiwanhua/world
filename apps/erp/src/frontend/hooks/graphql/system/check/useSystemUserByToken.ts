import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useCallback } from "react";
import { isEqual } from "lodash-es";
import type { GraphQLError } from "graphql";
import type { WowgoGraphqlClass } from "@/frontend/hooks/graphql/useWowgoGraphql";
import { useWowgoGraphql } from "@/frontend/hooks/graphql/useWowgoGraphql";
import type { SystemUserByTokenQuery } from "@/frontend/graphql/query/system/check/systemUserByToken.type";
import { useUserByTokenStore } from "@/frontend/hooks/zustand/useUserByTokenStore";

export interface FetcherParams {
  fetcher: unknown;
  wowgoGraphql: WowgoGraphqlClass;
}

async function fetcher({
  wowgoGraphql,
}: FetcherParams): Promise<SystemUserByTokenQuery> {
  const response = await wowgoGraphql.query.systemUserByToken();
  return response;
}

export interface Params {
  immutable?: boolean;
}

export interface Return {
  userByToken: SystemUserByTokenQuery | undefined;
  isValidating: boolean;
  error: GraphQLError;
  isTokenValid: boolean;
}

export function useSystemUserByToken({ immutable = false }: Params): Return {
  const { userByToken, setUserByToken } = useUserByTokenStore();

  const onSuccess = useCallback<
    NonNullable<SWRConfiguration<SystemUserByTokenQuery>["onSuccess"]>
  >(
    (data) => {
      if (
        data.systemUserByToken.result &&
        !isEqual(userByToken, data.systemUserByToken.result)
      ) {
        setUserByToken(data.systemUserByToken.result);
      }
    },
    [setUserByToken, userByToken],
  );

  // this is not a good practice
  const handle = immutable ? useSWRImmutable : useSWR;
  const { wowgoGraphql } = useWowgoGraphql();
  const { data, isValidating, error } = handle(
    { fetcher, wowgoGraphql },
    fetcher,
    {
      keepPreviousData: true,
      onSuccess,
    },
  );

  return {
    userByToken: data,
    isValidating,
    error,
    isTokenValid: Boolean(data),
  };
}
