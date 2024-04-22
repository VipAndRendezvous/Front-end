"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiResponse, MyPage } from "@/models/MyPage";
import { getUserMyPageRecommends } from "../_lib/getUserMyPageRecommends";
import { useState } from "react";
import { useSearch } from "./SearchProvider";
import TicketBox from "@/app/_component/TicketBox";
import styles from "./userMyPageRecommends.module.css";

export default function UserMyPageRecommends() {
  const [currentPage, setCurrentPage] = useState(0);
  const { searchQuery, sort } = useSearch();

  // 여기에 useQuery 호출을 수정합니다.
  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ["UserMyPage", searchQuery, sort, currentPage], // 쿼리 키
    queryFn: async ({ pageParam = 0 }) => {
      return getUserMyPageRecommends({
        pageParam: pageParam as number,
        searchQuery,
        sort: sort as string,
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>잠시후에 다시 시도해주세요</div>;

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
    <>
      <div className={styles["frame-screen"]}>
        {data?.content?.map((ticket: MyPage, index: number) => (
          <TicketBox key={`${ticket.ticketUUID}-${index}`} ticket={ticket} />
        ))}
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
    </>
  );
}
