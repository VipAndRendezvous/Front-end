"use client";

import { useUser } from "@/app/utils/UserProvider";
import styles from "./page.module.css";
import Carousel from "@/app/_component/Carousel/Carousel";
import Link from "next/link";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AuctionListRecommends from "./_component/AuctionListRecommends";
import { getAuctionListRecommends } from "./_lib/getAuctionListRecommends";
import { SearchProvider } from "./_component/SearchProvider";
import SearchBar from "./_component/SearchBar";
import SortButton from "./_component/SortButton";
import { useEffect } from "react";

export default function Page() {
  const { userInfo } = useUser(); // useUser 훅은 컴포넌트의 최상위에서 호출합니다.
  const queryClient = new QueryClient();

  useEffect(() => {
    async function prefetchData() {
      await queryClient.prefetchInfiniteQuery({
        queryKey: ["OriginalAuction"],
        queryFn: getAuctionListRecommends,
        initialPageParam: 0,
      });
    }
    prefetchData();
  }, []); // useEffect를 사용하여 컴포넌트가 마운트될 때 데이터를 사전에 가져옵니다.

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.AuctionMainPage}>
      <HydrationBoundary state={dehydratedState}>
        <SearchProvider>
          <div className={styles.SearchWrapper}>
            <div className={styles.SearchContainer}>
              <SearchBar />
            </div>
          </div>

          <div className={styles.AuctionListInfo}>
            <h1>진행중인 경매</h1>

            {userInfo && userInfo.userType === "ROLE_VIP" && (
              <Link href="/addauction">
                <div className={styles.addAcution}>경매 올리기</div>
              </Link>
            )}
          </div>
          <div className={styles.DonationContainer}>
            <div className={styles.DonationSubText}>현재 기부 금액</div>
            <div className={styles.DonationText}>4,675,965,000 원</div>
          </div>

          <div className={styles.ListUtil}>
            <div className={styles.ListUtilButton}>
              <SortButton />
            </div>
          </div>

          <div className={styles.ListWrapper}>
            <div className={styles.VipList}>
              <AuctionListRecommends />
            </div>
          </div>
        </SearchProvider>
      </HydrationBoundary>
    </div>
  );
}
