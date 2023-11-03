import { useMemo } from "react";
import { WowgoGraphqlClass } from "@/frontend/graphql/WowgoGraphql";
import { useSession } from "@/frontend/hooks/nextAuth/useSession";
// import { useLocalToken } from "@/frontend/hooks/browserCache/useLocalToken";

export { WowgoGraphqlClass };

export function useWowgoGraphql(): {
  wowgoGraphql: WowgoGraphqlClass;
} {
  const { data } = useSession({});
  // const { localToken } = useLocalToken();

  const wowgoGraphql = useMemo(
    () =>
      new WowgoGraphqlClass({
        token: data?.token ?? "",
      }),
    [data?.token],
  );
  return { wowgoGraphql };
}
