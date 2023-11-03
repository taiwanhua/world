export type PageType = "view" | "update" | "create";

export function getCategoryInfoUrl(type: PageType, id?: string) {
  return type === "create"
    ? `/fanloop/category/${type}`
    : `/fanloop/category/${id}/${type}`;
}
