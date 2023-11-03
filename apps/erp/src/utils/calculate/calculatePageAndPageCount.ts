import { clamp } from "lodash-es";

export interface Params {
  count: number;
  limit: number;
  start: number;
}

export interface Result {
  page: number;
  pageCount: number;
}

export function calculatePageAndPageCount({
  count,
  limit,
  start,
}: Params): Result {
  if (limit === 0) {
    const resultOfAll = count > 0 ? 1 : 0;
    return {
      page: resultOfAll,
      pageCount: resultOfAll,
    };
  }

  const pageCount = Math.ceil(count / limit);
  const page = Math.floor(start / limit);

  return {
    pageCount,
    page: clamp(page, 0, pageCount),
  };
}
