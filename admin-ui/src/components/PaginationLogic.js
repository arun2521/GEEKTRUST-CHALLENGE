import React from "react";

function PaginationLogic({ currentPage, totalPage, onPageChange }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

  const renderPageButtons = () => {
    const buttons = [];

    for (let page = 1; page <= totalPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={
            currentPage === page
              ? "pagination-button-active"
              : "pagination-button"
          }
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="pagination-container">
      <div className="button-group">
        <button
          disabled={isFirstPage}
          onClick={() => onPageChange(1)}
          className="pagination-button"
        >
          {"<<"}
        </button>
        <button
          disabled={isFirstPage}
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination-button"
        >
          {"<"}
        </button>
        {renderPageButtons()}
        <button
          disabled={isLastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination-button"
        >
          {">"}
        </button>
        <button
          disabled={isLastPage}
          onClick={() => onPageChange(totalPage)}
          className="pagination-button"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}

export default PaginationLogic;
