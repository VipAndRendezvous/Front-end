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
      <button className="btn-basic" onClick={() => handleSortChange("POPULAR")}>
        인기경매순
      </button>
      <button
        className="btn-basic"
        onClick={() => handleSortChange("CREATE_DESC")}
      >
        마감임박순
      </button>
      <button
        className="btn-basic"
        onClick={() => handleSortChange("CREATE_ASC")}
      >
        신규경매순
      </button>
    </>
  );
};

export default SortButton;
