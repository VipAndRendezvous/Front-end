"use client";

import React from "react";
import { useSearch } from "./SearchProvider";
import styles from "./SortButton.module.css";

const SortButton: React.FC = () => {
  const { sort, setSort } = useSearch();

  return (
    <div className={styles.parent}>
      <div
        className={sort === "PROGRESS" ? styles.selected : styles.unselected}
        onClick={() => setSort("PROGRESS")}
      >
        진행중인 경매
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
        className={
          sort === "successBefore" ? styles.selected : styles.unselected
        }
        onClick={() => setSort("successBefore")}
      >
        낙찰된 경매(만남 전)
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
        className={
          sort === "successAfter" ? styles.selected : styles.unselected
        }
        onClick={() => setSort("successAfter")}
      >
        낙찰된 경매(만남 후)
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
        className={sort === "INVALIDITY" ? styles.selected : styles.unselected}
        onClick={() => setSort("INVALIDITY")}
      >
        유찰된 경매
      </div>
    </div>
  );
};

export default SortButton;
