import MyPageMenu from "../../../_component/Menu/MyPageMenu";
import styles from "./myPageAuction.module.css";
import UserAuctionRecommends from "./UserAuctionRecommends";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SearchProvider, useSearch } from "./SearchProvider";
import { getUserAuctionRecommends } from "../_lib/getUserAuctionRecommends";
import SortButton from "./SortButton";

export default function MyPageAuction() {
  return (
    <div>
      <div>
        <MyPageMenu />
      </div>
      <HydrationBoundary>
        <SearchProvider>
          <div className={styles["Auction-menu"]}>
            <div className={styles["Auction-btn"]}>
              <SortButton />
            </div>
          </div>
          <UserAuctionRecommends />
        </SearchProvider>
      </HydrationBoundary>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const sort = query.sort || "defaultSort";
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["UserMyPageAuction", sort],
    queryFn: () => getUserAuctionRecommends({ sort }),
    initialPageParam: 0,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
