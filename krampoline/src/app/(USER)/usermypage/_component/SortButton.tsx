"use client";

import React from "react";
import { useSearch } from "./SearchProvider";

const SortButton: React.FC = () => {
  const { setSort } = useSearch();

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  return (
    <>
      <button
        className="btn-basic"
        onClick={() => handleSortChange("TIME_DESC")}
      >
        오래된 티켓보기
      </button>
      <button
        className="btn-basic"
        onClick={() => handleSortChange("TIME_ASC")}
      >
        최근 티켓보기
      </button>
    </>
  );
};

export default SortButton;
