"use client";

import React from "react";
import { useSearch } from "./SearchProvider";
import styles from "./SortButton.module.css";

const SortButton: React.FC = () => {
  const { sort, setSort } = useSearch();

  return (
    <div className={styles.parent}>
      <div
        className={
          JSON.stringify(sort) === JSON.stringify("participate")
            ? styles.selected
            : styles.unselected
        }
        onClick={() => setSort("participate")}
      >
        참여중인 경매
      </div>
    </div>
  );
};

export default SortButton;
