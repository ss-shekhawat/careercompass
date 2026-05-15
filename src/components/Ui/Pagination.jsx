import React from "react";
import Buttons from "./Buttons";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Pagination = ({
  total,
  page,
  size,
  onPageChange,
  showPagination = true,
}) => {
  const totalPages = Math.ceil(total / size);
  if (!showPagination || totalPages <= 1) return null;

  const handleClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange(newPage);
    }
  };

  const pagesToShow = [page];
  if (page < totalPages) pagesToShow.push(page + 1);
  else if (page > 1) pagesToShow.unshift(page - 1);

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="flex justify-center items-center gap-2 mt-4"
    >
      <Buttons
        onClick={() => handleClick(page - 1)}
        disabled={page === 1}
        className="px-2 py-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        style={{ border: "1px solid #E2E8F0", background: "white" }}
        aria-label="Go to previous page"
      >
        <ChevronLeft
          size={16}
          style={{ color: page === 1 ? "#94A3B8" : "#2563EB" }}
        />
      </Buttons>

      {pagesToShow.map((pageNumber) => {
        const isActive = pageNumber === page;
        return (
          <Buttons
            key={pageNumber}
            onClick={() => handleClick(pageNumber)}
            className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
            style={
              isActive
                ? {
                    background: "#2563EB",
                    color: "white",
                    border: "1px solid #2563EB",
                  }
                : {
                    background: "white",
                    color: "#475569",
                    border: "1px solid #E2E8F0",
                  }
            }
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNumber}
          </Buttons>
        );
      })}

      <Buttons
        onClick={() => handleClick(page + 1)}
        disabled={page >= totalPages}
        className="px-2 py-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        style={{ border: "1px solid #E2E8F0", background: "white" }}
        aria-label="Go to next page"
      >
        <ChevronRight
          size={16}
          style={{ color: page >= totalPages ? "#94A3B8" : "#2563EB" }}
        />
      </Buttons>
    </nav>
  );
};

export default Pagination;
