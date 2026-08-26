export type PaginationNavigationProps = {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
};
