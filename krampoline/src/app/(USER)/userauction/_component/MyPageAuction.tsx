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
      <div className={styles.title}>마이페이지</div>
      <div>
        <MyPageMenu />
      </div>
      <HydrationBoundary>
        <SearchProvider>
          <div className={styles.dinnerTicketContainer}>
            <div className={styles.dinnerTicketFilter}>
              <SortButton />
            </div>
          </div>
          <div className={styles.ListWrapper}>
            <div className={styles.VipList}>
              <UserAuctionRecommends />
            </div>
          </div>
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
