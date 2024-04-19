import AuctionBox from "@/app/_component/Auction/AuctionBox";
import styles from "./myPageAuctionBox.module.css";
import { Auctions } from "@/models/Auctions";
import { useAddAuction } from "@/app/utils/AddAuctionsProvider";

type Props = {
  auctionData: Auctions;
};
const MyPageAuctionBox = () => {
  const { auctionData } = useAddAuction();
  return (
    <div>
      <div className={styles.auctionWrapper}>
        <div className={styles.auctionContainer}>
          <AuctionBox auctionData={auctionData} />
        </div>
      </div>
    </div>
  );
};

export default MyPageAuctionBox;
