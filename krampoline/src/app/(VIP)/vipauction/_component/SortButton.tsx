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
      <button
        className="btn-basic"
        onClick={() => handleSortChange("participate")}
      >
        참여중인 경매
      </button>
      <button className="btn-basic" onClick={() => handleSortChange("success")}>
        낙찰받은 경매 및 만료된 경매
      </button>
      <button
        className="btn-basic"
        onClick={() => handleSortChange("invalidity")}
      >
        유찰된 경매
      </button>
    </>
  );
};

export default SortButton;
