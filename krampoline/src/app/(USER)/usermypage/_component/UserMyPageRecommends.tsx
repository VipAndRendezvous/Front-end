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
  if (isError) return <div>An error occurred: {error?.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className={styles["frame-screen"]}>
        {data?.content?.map((ticket: MyPage, index: number) => (
          <TicketBox key={`${ticket.ticketUUID}-${index}`} ticket={ticket} />
        ))}
      </div>
      <div>
        <button
          onClick={() => setCurrentPage((old) => Math.max(old - 1, 0))}
          disabled={currentPage === 0}
        >
          이전 페이지
        </button>
        <button
          onClick={() => setCurrentPage((old) => old + 1)}
          disabled={data?.last || false}
        >
          다음 페이지
        </button>
      </div>
    </>
  );
}
