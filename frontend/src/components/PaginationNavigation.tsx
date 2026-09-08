import type { PaginationNavigationProps } from "../types/PaginationNavigationProps";

export default function PaginationNavigation({
  page,
  totalPages,
  onNext,
  onPrevious,
}: PaginationNavigationProps) {
  return (
    <section className="pagination">
      <button
        className="pagination__button button"
        disabled={page === 1}
        onClick={() => {
          onPrevious();
        }}
      >
        Previous
      </button>
      <p className="pagination_current">
        Page {page} of {totalPages}
      </p>
      <button
        className="pagination__button button"
        disabled={page >= totalPages}
        onClick={() => {
          onNext();
        }}
      >
        Next
      </button>
    </section>
  );
}
