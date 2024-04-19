"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiResponse, Participate, Success } from "@/models/UserMyPageAuction";

import { getUserAuctionRecommends } from "../_lib/getUserAuctionRecommends";
import { useState } from "react";
import { useSearch } from "./SearchProvider";
import AuctionBox from "@/app/_component/Auction/AuctionBox";

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

  if (isError) return <div>An error occurred: {error?.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && !data?.content?.length)
    return <div>데이터가 없습니다.</div>;

  return (
    <>
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
