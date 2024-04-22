"use client";
import React from "react";
import "./adminPagination.css";

const AdminPagination = ({
  currentPage,
  totalPage,
  handleBigPrevious,
  handlePrevious,
  handleNext,
  handleBigNext,
  changeCurrentPage,
}) => {
  const renderPageNumbers = () => {
    const pageGroupSize = 5; // 한 번에 보여질 페이지 번호의 수
    const currentGroup = Math.ceil(currentPage / pageGroupSize);

    const startPage = (currentGroup - 1) * pageGroupSize + 1;
    const endPage = Math.min(currentGroup * pageGroupSize, totalPage);

    return Array.from({ length: endPage - startPage + 1 }, (_, offset) => (
      <button
        key={startPage + offset}
        onClick={() => changeCurrentPage(startPage + offset)}
        className={`page-number-button ${
          currentPage === startPage + offset ? "selected" : ""
        }`}
      >
        {startPage + offset}
      </button>
    ));
  };

  return (
    <div className={"trackList-sub-bottom-container"}>
      <div className="pagination">
        <button
          onClick={handleBigPrevious}
          disabled={currentPage <= 1}
          className={"page-big-prev-button"}
        >
          l&lt;
        </button>
        <button
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className={`page-prev-button ${currentPage <= 1 ? "disabled" : ""}`}
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPage}
          className={`page-next-button ${
            currentPage >= totalPage ? "disabled" : ""
          }`}
        >
          &gt;
        </button>
        <button
          onClick={handleBigNext}
          disabled={currentPage >= totalPage}
          className={"page-big-next-button"}
        >
          &gt;l
        </button>
      </div>
    </div>
  );
};

export default AdminPagination;
