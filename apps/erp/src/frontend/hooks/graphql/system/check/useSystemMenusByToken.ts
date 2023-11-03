import type { KeyedMutator, SWRConfiguration } from "swr";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useCallback, useMemo } from "react";
import { isEqual } from "lodash-es";
import type { GraphQLError } from "graphql";
import type { WowgoGraphqlClass } from "@/frontend/hooks/graphql/useWowgoGraphql";
import { useWowgoGraphql } from "@/frontend/hooks/graphql/useWowgoGraphql";
import type {
  QuerySystemMenusByTokenInput,
  SystemMenu,
} from "@/backend/graphql/types";
import type { SystemMenusByTokenQuery } from "@/frontend/graphql/query/system/check/systemMenusByToken.type";
import { generateTree } from "@/utils/generate/generateTree";
import { useMenusByTokenStore } from "@/frontend/hooks/zustand/useMenusByTokenStore";

export type SystemFunctionInMenu = SystemMenu["systemFunctions"][number];

export interface MenuWithChildren extends SystemMenu {
  children: MenuWithChildren[];
}

export type MenuTree = MenuWithChildren[];

export interface InitialValidInfo {
  error: string | null;
  isValidated: boolean;
  currentMenus: MenuTree | undefined;
}

export interface Params {
  immutable?: boolean;
  input: QuerySystemMenusByTokenInput;
}

export interface FetcherParams {
  fetcher: unknown;
  wowgoGraphql: WowgoGraphqlClass;
  input: QuerySystemMenusByTokenInput;
}

async function fetcher({
  wowgoGraphql,
  input,
}: FetcherParams): Promise<SystemMenusByTokenQuery> {
  const response = await wowgoGraphql.query.systemMenusByToken(input);
  return response;
}

export interface Return {
  menusByToken: SystemMenusByTokenQuery | undefined;
  menuIdsByToken: string[];
  menusTreeByToken: MenuTree;
  isValidating: boolean;
  error: GraphQLError;
  mutateMenusByToken: KeyedMutator<SystemMenusByTokenQuery>;
}

export function useSystemMenusByToken({
  immutable = false,
  input,
}: Params): Return {
  const { menusByToken: menusByTokenStore, setMenusByToken } =
    useMenusByTokenStore();

  const onSuccess = useCallback<
    NonNullable<SWRConfiguration<SystemMenusByTokenQuery>["onSuccess"]>
  >(
    (data) => {
      if (
        data.systemMenusByToken.result &&
        !isEqual(menusByTokenStore, data.systemMenusByToken.result)
      ) {
        setMenusByToken(data.systemMenusByToken.result);
      }
    },
    [setMenusByToken, menusByTokenStore],
  );

  // this is not a good practice
  const handle = immutable ? useSWRImmutable : useSWR;
  const { wowgoGraphql } = useWowgoGraphql();
  const { data, isValidating, error, mutate } = handle(
    { fetcher, wowgoGraphql, input },
    fetcher,
    {
      keepPreviousData: true,
      onSuccess,
    },
  );

  const menusTreeByToken = useMemo<MenuTree>(() => {
    if (!data?.systemMenusByToken.result) {
      return [];
    }

    return generateTree(data.systemMenusByToken.result, {
      dataField: null,
    }) as MenuTree;
  }, [data?.systemMenusByToken.result]);

  const menuIdsByToken = useMemo<string[]>(
    () =>
      data?.systemMenusByToken.result
        ? data.systemMenusByToken.result.map((menu) => menu.id)
        : [],
    [data],
  );

  return {
    menusByToken: data,
    menuIdsByToken,
    menusTreeByToken,
    isValidating,
    error,
    mutateMenusByToken: mutate,
  };
}
