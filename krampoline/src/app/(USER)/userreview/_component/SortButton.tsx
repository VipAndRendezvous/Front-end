"use client";

import React from "react";
import { useSearch } from "./SearchProvider";
import styles from "./SortButton.module.css";

const SortButton: React.FC = () => {
  const { sort, setSort } = useSearch();

  return (
    <div className={styles.parent}>
      <div
        className={sort === "receive" ? styles.selected : styles.unselected}
        onClick={() => setSort("receive")}
      >
        받은 후기
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
        className={sort === "send" ? styles.selected : styles.unselected}
        onClick={() => setSort("send")}
      >
        내가 쓴 후기
      </div>
    </div>
  );
};

export default SortButton;
