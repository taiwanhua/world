export type PageType = "view" | "update" | "create";

export function getMetadataInfoUrl(
  resourceType: string,
  type: PageType,
  id?: string,
) {
  return type === "create"
    ? `/fanloop/metadata/${resourceType}/${type}`
    : `/fanloop/metadata/${resourceType}/${id}/${type}`;
}
