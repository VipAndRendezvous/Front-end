"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiResponse, Participate, Success } from "@/models/UserMyPageAuction";

import { getUserAuctionRecommends } from "../_lib/getUserAuctionRecommends";
import { useState } from "react";
import { useSearch } from "./SearchProvider";
import AuctionBox from "@/app/_component/Auction/AuctionBox";
import styles from "./UserAuctionRecommends.module.css";

export default function UserAuctionRecommends() {
  const [currentPage, setCurrentPage] = useState(0);
  const { searchQuery, sort } = useSearch();

  // 여기에 useQuery 호출을 수정합니다.
  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ["UserMyPageAuction", searchQuery, sort, currentPage], // 쿼리 키
    queryFn: () => {
      return getUserAuctionRecommends({ sort });
    },
  });

  if (isError) return <div>잠시후에 다시 시도해주세요</div>;

  if (isLoading) return <div>Loading...</div>;

  const maxPage = data ? data.totalPages : 1;
  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);

  const renderPageNumbers = () => {
    return pages.map((page, index) => (
      <div
        key={index}
        className={currentPage === page - 1 ? styles.b : styles.div2}
        onClick={() => setCurrentPage(page - 1)}
      >
        {page}
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles["frame-screen"]}>
        {data?.content?.map((auctionBox, index: number) => {
          if (!auctionBox || !auctionBox.auctionUUID) {
            console.error("Invalid item without auctionUUID", auctionBox);
            return null;
          }

          // auctionUUID가 있으므로 안전하게 사용
          return (
            <AuctionBox
              key={`${auctionBox.auctionUUID}-${index}`}
              auctionData={auctionBox}
            />
          );
        })}
      </div>
      <div className={styles.parent}>
        <div
          className={styles.arrow1}
          onClick={() => setCurrentPage(0)}
        >{`<<`}</div>
        <div
          className={styles.arrow2}
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
        >{`<`}</div>
        {renderPageNumbers()}
        <div
          className={styles.arrow1}
          onClick={() => setCurrentPage(Math.min(currentPage + 1, maxPage - 1))}
        >{`>`}</div>
        <div
          className={styles.arrow2}
          onClick={() => setCurrentPage(maxPage - 1)}
        >{`>>`}</div>
      </div>
    </div>
  );
}
