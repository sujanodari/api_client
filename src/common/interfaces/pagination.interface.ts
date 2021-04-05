export interface IPagination {
  limit: number;
  offset: number;
  total: number;
}

export interface IPaging {
  hasNextPage: boolean;
  endIndex: number;
  total: number;
  startIndex: number;
}

export interface IPaginationResponse<T> {
  data: Array<T>;
  paging: IPaging;
}
