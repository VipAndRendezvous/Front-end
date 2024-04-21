import MyPageMenu from "@/app/_component/Menu/MyPageMenu";
import styles from "./dinnerTicket.module.css";
import SearchBar from "./SearchBar";
import UserMyPageRecommends from "./UserMyPageRecommends";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { SearchProvider } from "./SearchProvider";
import { getUserMyPageRecommends } from "../_lib/getUserMyPageRecommends";
import SortButton from "./SortButton";

function DinnerTicket({ dehydratedState }: { dehydratedState: any }) {
  return (
    <div>
      <div className={styles.title}>마이페이지</div>
      <div>
        <MyPageMenu />
      </div>
      <HydrationBoundary state={dehydratedState}>
        <SearchProvider>
          <div className={styles.dinnerTicketContainer}>
            <div className={styles.dinnerTicketFilter}>
              <SortButton />
              <SearchBar />
            </div>
            <UserMyPageRecommends />
          </div>
        </SearchProvider>
      </HydrationBoundary>
    </div>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["UserMyPage"],
    queryFn: getUserMyPageRecommends,
    initialPageParam: 0,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default DinnerTicket;
