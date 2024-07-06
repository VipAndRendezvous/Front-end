"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/models/UserMyPageAuction";
import { getVipAuctionRecommends } from "../_lib/getVipAuctionRecommends";
import { useState } from "react";
import { useSearch } from "./SearchProvider";
import AuctionBox3 from "./AuctionBox3";
import AuctionBox2 from "./AuctionBox2";
import AuctionBox from "./AuctionBox";
import styles from "./vipAuctionRecommends.module.css";

export default function VipAuctionRecommends() {
  const [currentPage, setCurrentPage] = useState(0);
  const { sort } = useSearch();

  const { data, isLoading, isError } = useQuery<ApiResponse, Error>({
    queryKey: ["VipPageAuction", sort, currentPage],
    queryFn: () => {
      return getVipAuctionRecommends({ sort });
    },
  });

  if (isError) return <div>잠시 에러가 있어요! 잠시 후에 시도해주세요</div>;

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && !data?.content?.length)
    return <div>데이터가 없습니다.</div>;

  const maxPage = data ? data.totalPages : 0;
  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);

  const renderPageNumbers = () => {
    if (pages.length === 1) {
      return (
        <div
          className={currentPage === 0 ? styles.b : styles.div2}
          onClick={() => setCurrentPage(0)}
        >
          {1}
        </div>
      );
    }

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
        {data?.content?.map((auction, index: number) => {
          if (!auction || (!auction.ticketUUID && !auction.auctionUUID)) {
            console.error("Invalid item without UUID", auction);
            return null;
          }

          if (sort === "INVALIDITY") {
            return (
              <AuctionBox
                key={`${auction.auctionUUID}-${index}`}
                auctionData={auction}
              />
            );
          }
          if (sort === "PROGRESS") {
            return (
              <AuctionBox3
                key={`${auction.auctionUUID}-${index}`}
                auctionData={auction}
              />
            );
          } else {
            return (
              <AuctionBox2
                key={`${auction.ticketUUID}-${index}`}
                TicketData={auction}
              />
            );
          }
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
