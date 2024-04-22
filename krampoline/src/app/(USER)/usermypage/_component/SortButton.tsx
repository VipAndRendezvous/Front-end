"use client";

import React from "react";
import { useSearch } from "./SearchProvider";
import styles from "./SortButton.module.css";

const SortButton: React.FC = () => {
  const { sort, setSort } = useSearch();

  return (
    <div className={styles.parent}>
      <div
        className={sort === "TIME_DESC" ? styles.selected : styles.unselected}
        onClick={() => setSort("TIME_DESC")}
      >
        신규 경매순
      </div>
      <svg
        width="2"
        height="8"
        viewBox="0 0 2 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 0V8" stroke="#949597" />
      </svg>

      <div
        className={sort === "TIME_ASC" ? styles.selected : styles.unselected}
        onClick={() => setSort("TIME_ASC")}
      >
        인기 경매순
      </div>
    </div>
  );
};

export default SortButton;
