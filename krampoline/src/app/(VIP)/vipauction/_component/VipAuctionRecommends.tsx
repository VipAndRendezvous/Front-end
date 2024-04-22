"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiResponse, Participate, Success } from "@/models/UserMyPageAuction";

import { getVipAuctionRecommends } from "../_lib/getVipAuctionRecommends";
import { useState } from "react";
import { useSearch } from "./SearchProvider";
import AuctionBox from "@/app/_component/Auction/AuctionBox";
import styles from "./vipAuctionRecommends.module.css";

export default function VipAuctionRecommends() {
  const [currentPage, setCurrentPage] = useState(0);
  const { searchQuery, sort } = useSearch();

  // 여기에 useQuery 호출을 수정합니다.
  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ["VipPageAuction", searchQuery, sort, currentPage], // 쿼리 키
    queryFn: () => {
      return getVipAuctionRecommends({ sort });
    },
  });

  if (isError) return <div>잠시 에러가 있어요! 잠시후에 시도해주세요 </div>;

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && !data?.content?.length)
    return <div>데이터가 없습니다.</div>;

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
          // auctionUUID 속성이 있는지 확인
          if (!auctionBox || !auctionBox.auctionUUID) {
            // 적절한 처리: 로깅, 건너뛰기, 또는 에러 메시지 표시
            console.error("Invalid item without auctionUUID", auctionBox);
            return null; // 이 항목을 건너뛰고 렌더링하지 않음
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
