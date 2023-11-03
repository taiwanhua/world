"use client";

import {
  useRouter as useNextRouter,
  usePathname,
  useSearchParams,
  notFound,
} from "next/navigation";
import queryString from "query-string";
import type { UrlObject } from "query-string";
import { useCallback, useMemo } from "react";

type AppRouterInstance = ReturnType<typeof useNextRouter>;

type Query = NonNullable<UrlObject["query"]>;

export const Modes = ["push", "replace"] as const;
export type Mode = (typeof Modes)[number];
export interface MutateConfig {
  spreadOldQuery?: boolean;
  queryForUpdate?: Query;
  mode?: Mode;
  pathnameForUpdate?: string;
}

export interface Return {
  notFound: () => void;
  router: AppRouterInstance;
  asPath: string;
  pathname: string;
  queryString: string;
  query: Query;
  getQueryByKey: <T>(key: string, defaultValue?: T) => T;
  mutate: (mutateConfig: MutateConfig) => void;
}

export function useRouter(): Return {
  const pathnameFromHook = usePathname();
  const readonlyURLSearchParams = useSearchParams();

  const pathname = pathnameFromHook;
  const query = useMemo<Query>(() => {
    const queryObject = {};
    for (const [key, value] of readonlyURLSearchParams.entries()) {
      queryObject[key] = value;
    }
    return queryObject;
  }, [readonlyURLSearchParams]);

  const router = useNextRouter();

  const mutate = useCallback(
    ({
      queryForUpdate = {},
      spreadOldQuery = true,
      mode = "replace",
      pathnameForUpdate,
    }: MutateConfig) => {
      const oldQuery = spreadOldQuery ? query : {};

      const newQuery = {
        ...(spreadOldQuery ? query : {}),
        ...queryForUpdate,
      };

      const oldUrl = queryString.stringifyUrl({
        url: pathname,
        query: oldQuery,
      });

      const newUrl = queryString.stringifyUrl({
        url: `${pathnameForUpdate ?? pathname}`,
        query: newQuery,
      });

      if (oldUrl === newUrl) {
        return;
      }

      if (mode === "replace") {
        router.replace(newUrl);
      } else {
        router.push(newUrl);
      }
    },
    [query, pathname, router],
  );

  const getQueryByKey = useCallback(
    <T>(key: string, defaultValue?: T) => {
      try {
        return JSON.parse(query[key] as string) as T;
      } catch (error) {
        if (defaultValue) {
          return (query[key] as unknown as T) ?? defaultValue;
        }
        return query[key] as unknown as T;
      }
    },
    [query],
  );

  return {
    notFound,
    router,
    pathname,
    queryString: queryString.stringifyUrl({ url: "", query }),
    asPath: queryString.stringifyUrl({ url: pathname, query }),
    query,
    getQueryByKey,
    mutate,
  };
}
