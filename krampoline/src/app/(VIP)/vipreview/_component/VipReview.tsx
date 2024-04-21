import VipPageMenu from "@/app/_component/Menu/VipPageMenu";
import VipReviewRecommends from "./VipReviewRecommends";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { SearchProvider, useSearch } from "./SearchProvider";
import { getVipReviewRecommends } from "../_lib/getVipReviewRecommends";
import SortButton from "./SortButton";
import styles from "./vipReview.module.css";

function VipReview() {
  return (
    <>
      <HydrationBoundary>
        <SearchProvider>
          <div>
            <VipPageMenu />
          </div>

          <div className={styles.ReviewMenu}>
            <div className={styles["Review-btn"]}>
              <SortButton />
            </div>
          </div>
          <VipReviewRecommends />
        </SearchProvider>
      </HydrationBoundary>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const sort = query.sort || "defaultSort";
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["VIPMyPageReview", sort],
    queryFn: () => getVipReviewRecommends({ sort }),
    initialPageParam: 0,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default VipReview;
