import { isNil } from "lodash-es";

export function isNonNil<T>(target: T): target is Exclude<T, null | undefined> {
  return !isNil(target);
}
