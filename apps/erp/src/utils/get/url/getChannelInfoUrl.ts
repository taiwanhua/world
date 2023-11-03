export type PageType = "view" | "update" | "create";

export function getChannelInfoUrl(type: PageType, id?: string) {
  return type === "create"
    ? `/fanloop/channel/${type}`
    : `/fanloop/channel/${id}/${type}`;
}
