import type { PaginationNavigationProps } from "../types/PaginationNavigationProps";

export default function PaginationNavigation({
  page,
  totalPages,
  onNext,
  onPrevious,
}: PaginationNavigationProps) {
  return (
    <section>
      <button
        className="videoGrid__button navBtn"
        disabled={page === 1}
        onClick={() => {
          onPrevious();
        }}
      >
        Previous
      </button>
      <p>
        Page {page} of {totalPages}
      </p>
      <button
        className="videoGrid__button navBtn"
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
