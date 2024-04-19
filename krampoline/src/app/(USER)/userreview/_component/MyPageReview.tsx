import MyPageMenu from "@/app/_component/Menu/MyPageMenu";
import styles from "./myPageReview.module.css";
import UserReviewRecommends from "./UserReviewRecommends";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SearchProvider, useSearch } from "./SearchProvider";
import { getUserReviewRecommends } from "../_lib/getUserReviewRecommends";
import SortButton from "./SortButton";

function MyPageReview() {
  return (
    <div>
      <div>
        <MyPageMenu />
      </div>
      <HydrationBoundary>
        <SearchProvider>
          <div className={styles.ReviewMenu}>
            <div className={styles["Review-btn"]}>
              <SortButton />
            </div>
          </div>
          <UserReviewRecommends />
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
    queryKey: ["UserMyPageReview", sort],
    queryFn: () => getUserReviewRecommends({ sort }),
    initialPageParam: 0,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default MyPageReview;
