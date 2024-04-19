"use client";

import React from "react";
import { useSearch } from "./SearchProvider";

const SortButton: React.FC = () => {
  const { sort, setSort } = useSearch();

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };
  // console.log(sort);
  return (
    <>
      <button className="btn-basic" onClick={() => handleSortChange("receive")}>
        받은 리뷰
      </button>
      <button className="btn-basic" onClick={() => handleSortChange("send")}>
        내가 쓴 리뷰
      </button>
    </>
  );
};

export default SortButton;
