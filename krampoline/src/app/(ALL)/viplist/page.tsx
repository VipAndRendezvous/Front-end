// "use client";

import VipListRecommends from "./_component/VipListRecommends";
import { getVipListRecommends } from "./_lib/getVipListRecommends";

import styles from "./page.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SearchBar from "./_component/SearchBar";

import { SearchProvider } from "./_component/SearchProvider";

export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["Vip"],
    queryFn: getVipListRecommends,
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <SearchProvider>
          <div className={styles.ListSearchBar}>
            <SearchBar />
          </div>
          <div className={styles.ListWrapper}>
            <div className={styles.VipList}>
              <VipListRecommends />
            </div>
          </div>
        </SearchProvider>
      </HydrationBoundary>
    </div>
  );
}
