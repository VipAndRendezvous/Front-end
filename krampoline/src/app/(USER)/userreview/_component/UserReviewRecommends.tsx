"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiResponse, UserMyPageReview } from "@/models/UserMyPageReview";
import { getUserReviewRecommends } from "../_lib/getUserReviewRecommends";
import { useState } from "react";
import { useSearch } from "./SearchProvider";
import ReviewBox from "@/app/_component/ReviewBox";

export default function UserReviewRecommends() {
  const [currentPage, setCurrentPage] = useState(0);
  const { searchQuery, sort } = useSearch();

  // 여기에 useQuery 호출을 수정합니다.
  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ["UserMyPageReview", searchQuery, sort, currentPage], // 쿼리 키
    queryFn: async ({ pageParam = 0 }) => {
      return getUserReviewRecommends({
        sort: sort as string,
        pageParam: pageParam as number,
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred: {error?.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {data?.content?.map((reviewBox: UserMyPageReview, index: number) => (
        <ReviewBox
          key={`${reviewBox.reviewUUID}-${index}`}
          reviewBox={reviewBox}
        />
      ))}
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
