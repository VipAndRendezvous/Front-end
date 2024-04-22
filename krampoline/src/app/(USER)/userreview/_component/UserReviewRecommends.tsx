"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiResponse, UserMyPageReview } from "@/models/UserMyPageReview";
import { getUserReviewRecommends } from "../_lib/getUserReviewRecommends";
import { useState } from "react";
import { useSearch } from "./SearchProvider";
import ReviewBox from "@/app/_component/ReviewBox";
import styles from "./UserReviewRecommends.module.css";

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
      {" "}
      <div className={styles["frame-screen"]}>
        {data?.content?.map((reviewBox: UserMyPageReview, index: number) => (
          <ReviewBox
            key={`${reviewBox.reviewUUID}-${index}`}
            reviewBox={reviewBox}
          />
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
