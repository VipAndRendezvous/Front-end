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
          JSON.stringify(sort) === JSON.stringify(["participate"])
            ? styles.selected
            : styles.unselected
        }
        onClick={() => setSort(["participate"])}
      >
        참여중인 경매
      </div>
      {/* <svg
        width="2"
        height="8"
        viewBox="0 0 2 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 0V8" stroke="#949597" />
      </svg> */}

      {/* <div
        className={
          JSON.stringify(sort) ===
          JSON.stringify(["successBefore", "successAfter"])
            ? styles.selected
            : styles.unselected
        }
        onClick={() => setSort(["successBefore", "successAfter"])}
      >
        낙찰받은 경매
      </div> */}
    </div>
  );
};

export default SortButton;
