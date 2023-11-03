import useSWRImmutable from "swr/immutable";
import { isServer } from "@/utils/is/isServer";

interface QueryVersionResult {
  code: number;
  message: string;
  statusCode: number;
  result: {
    releaseTime: string;
    releaseVersion: string;
  };
}

interface Return {
  error: unknown;
  version: QueryVersionResult | undefined;
  isValidating: boolean;
}

async function fetcher(): Promise<QueryVersionResult | undefined> {
  if (isServer) {
    return undefined;
  }
  const version: QueryVersionResult = await fetch(
    `${window.location.origin}/api`,
  ).then((res) => res.json());

  return version;
}

export function useVersion(): Return {
  const { data, isValidating, error } = useSWRImmutable({ fetcher }, fetcher, {
    revalidateOnFocus: false,
  });

  return { error, version: data, isValidating };
}
