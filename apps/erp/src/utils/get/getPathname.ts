export type ParamNames = (string | number | undefined)[];

export function getPathname(names: ParamNames): string {
  return names
    .filter((name) => {
      return Boolean(name?.toString());
    })
    .join(".");
}
