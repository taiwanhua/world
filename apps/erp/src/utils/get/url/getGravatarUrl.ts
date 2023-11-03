import md5 from "md5";
import queryString from "query-string";

export interface Params {
  key: string;
  size: number;
  type?:
    | "mp"
    | "identicon"
    | "monsterid"
    | "wavatar"
    | "retro"
    | "robohash"
    | "blank";
}

export function getGravatarUrl({ key, size, type = "retro" }: Params): string {
  return queryString.stringifyUrl({
    url: `https://www.gravatar.com/avatar/${md5(key)}`,
    query: {
      d: type,
      s: size,
    },
  });
}
