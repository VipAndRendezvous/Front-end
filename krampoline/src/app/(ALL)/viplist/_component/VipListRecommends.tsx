"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import VipListBox from "./VipListBox";
import { ApiResponse, VipBox } from "@/models/VipBox"; // 경로 확인 필요
import { getVipListRecommends } from "../_lib/getVipListRecommends"; // 상대 경로 확인 필요
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearch } from "./SearchProvider";

export default function VipListRecommends() {
  const { ref, inView } = useInView({ threshold: 0, delay: 100 });
  const [showEndMessage, setShowEndMessage] = useState(false);
  const { searchQuery } = useSearch();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<ApiResponse, Error>({
    queryKey: ["VipList", searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      return getVipListRecommends({
        pageParam: pageParam as number,
        searchQuery,
      });
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageable.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },

    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
    if (!hasNextPage && !isFetchingNextPage && inView && !showEndMessage) {
      setShowEndMessage(true);
    }
  }, [
    inView,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    showEndMessage,
  ]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Fragment>
      {data?.pages?.flatMap((group, i) =>
        group.content.map((vipBox: VipBox) => (
          <VipListBox key={`${vipBox.vipUUID}-${i}`} vipBox={vipBox} />
        ))
      )}
      <div ref={ref} style={{ height: 1, margin: "1rem 0" }}>
        {showEndMessage && <div>마지막 페이지에 도달했습니다.</div>}
      </div>
    </Fragment>
  );
}
