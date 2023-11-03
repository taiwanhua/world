import { useEffect, useMemo, useRef } from "react";
import useDidMount from "./useDidMount";
import { useWillUnmount } from "./useWillUnmount";

function useDidUpdate(callback: () => void, conditions?: unknown[]): void {
  const hasMountedRef = useRef<boolean>(false);
  const internalConditions = useMemo(() => {
    if (typeof conditions !== "undefined" && !Array.isArray(conditions)) {
      return [conditions];
    } else if (Array.isArray(conditions) && conditions.length === 0) {
      // eslint-disable-next-line no-console
      console.warn(
        "Using [] as the second argument makes useDidUpdate a noop. The second argument should either be `undefined` or an array of length greater than 0.",
      );
    }

    return conditions;
  }, [conditions]);

  useEffect(() => {
    if (hasMountedRef.current) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, internalConditions);

  useDidMount(() => {
    hasMountedRef.current = true;
  });

  useWillUnmount(() => {
    hasMountedRef.current = false;
  });
}

export { useDidUpdate };
