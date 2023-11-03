export function concatName(names: (string | number)[]): string {
  return names.filter((name) => name !== "").join(".");
}
