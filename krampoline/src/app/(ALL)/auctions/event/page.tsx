// import AuctionBox from "@/app/_component/Auction/AuctionBox";

import styles from "./page.module.css";
import SearchBar from "@/app/_component/SearchBar";
import Carousel from "@/app/_component/Carousel/Carousel";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <div className={styles.CarouselContainer}>
        <Carousel />
      </div>
      <div className={styles.AuctionListInfo}>
        <h1>이벤트 경매</h1>
        <div>
          <button className="btn-basic">
            <Link href="/addauction">경매 올리기</Link>
          </button>
        </div>
      </div>
      <div className={styles.ListUtil}>
        <SearchBar />
        <div className={styles.ListUtilButton}>
          <button className="btn-basic">인기경매순</button>
          <button className="btn-basic">마감임박순</button>
          <button className="btn-basic">신규경매순</button>
        </div>
      </div>

      <div className={styles.ListWrapper}>
        <div className={styles.VipList}>
          {/* <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox />
          <AuctionBox /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
