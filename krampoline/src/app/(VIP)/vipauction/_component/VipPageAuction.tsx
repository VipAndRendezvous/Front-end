import Link from "next/link";
import MyPageAuctionBox from "./VipPageAuctionBox";

import styles from "./vipPageAuction.module.css";
import VipPageMenu from "@/app/_component/Menu/VipPageMenu";
import SortButton from "./SortButton";
import { SearchProvider } from "./SearchProvider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getVipAuctionRecommends } from "../_lib/getVipAuctionRecommends";
import VipAuctionRecommends from "./VipAuctionRecommends";

export default function VipPageAuction() {
  return (
    <div>
      <div>
        <VipPageMenu />
      </div>
      <HydrationBoundary>
        <SearchProvider>
          <div className={styles["Auction-menu"]}>
            <div className={styles["Auction-btn"]}>
              <SortButton />
            </div>
          </div>
          <VipAuctionRecommends />
        </SearchProvider>
      </HydrationBoundary>
      <div>페이지 네이션 이동</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const sort = query.sort || "defaultSort";
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["VIPMyPageAuction", sort],
    queryFn: () => getVipAuctionRecommends({ sort }),
    initialPageParam: 0,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
