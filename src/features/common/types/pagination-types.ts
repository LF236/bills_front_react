export interface PaginationTypeInterface {
  offset: number;
  limit: number;
  total: number;
  next: () => void;
  previous: () => void;
  setLimit: ( limit: number ) => void;
  showPaginationList?: boolean;
  moveByPagination?: (pageNumber: number) => void;
}