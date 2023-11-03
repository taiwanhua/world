"use client";

import { useMemo } from "react";
import type { PermissionPath } from "@/backend/constant/permission/spec";
import { useMenusByTokenStore } from "@/frontend/hooks/zustand/useMenusByTokenStore";

export interface Params {
  requirePermissionPaths: (PermissionPath | PermissionPath[])[];
}

export type Return = [boolean, string];

export function useAccessFunctionValidate({
  requirePermissionPaths,
}: Params): Return {
  const { functionsByToken: userPermissionPath } = useMenusByTokenStore();

  const isValidated = useMemo<Return>(() => {
    const invalidateErrors: string[] = [];

    requirePermissionPaths.forEach((element) => {
      let target = element;

      if (!Array.isArray(target)) {
        target = [target];
      }

      const isValidatedCheck =
        target.length > 0
          ? target.some((path) => userPermissionPath.includes(path))
          : true;

      if (!isValidatedCheck) {
        invalidateErrors.push(`( ${target.join(" || ")} )`);
      }
    });

    if (invalidateErrors.length === 0) {
      return [true, ""];
    }

    const invalidateError = `To use this function, the current user should at least have : {{ ${invalidateErrors.join(
      " && ",
    )} }}`;

    return [false, invalidateError];
  }, [requirePermissionPaths, userPermissionPath]);

  return isValidated;
}
