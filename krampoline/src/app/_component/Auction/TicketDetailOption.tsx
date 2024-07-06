"use client";

import styles from "./ticketDetailOption.module.css";

//----------------------------------------------------------------시간 폼
const TicketDetailOption = ({ user }: any) => {
  // 시간을 hh:mm:ss 형식으로 변환합니다.
  const formatTime = (time: number) => {
    const hours: number = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes: number = Math.floor((time / (1000 * 60)) % 60);
    const seconds: number = Math.floor((time / 1000) % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  //----------------------------------------------------------------돈 단위

  const auctionCurrentBid = user.maxBid; // 낙찰 금액
  const donationAmount = auctionCurrentBid * 0.05; // 기부금액: 낙찰 금액의 5%

  // 낙찰 금액과 기부 금액을 지역화하여 문자열로 변환
  const formattedAuctionCurrentBid = auctionCurrentBid.toLocaleString();
  const formattedDonationAmount = donationAmount.toLocaleString();
  //----------------------------------------------------------------
  //----------------------------------------------------------------
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 복사되었습니다!"); // 성공 시 얼럿 창 표시
    } catch (err) {
      alert("복사에 실패했습니다."); // 실패 시 얼럿 창 표시
    }
  };

  //----------------------------------------------------------------

  return (
    <div>
      <div className={styles.AuctionInfo_TicketBox_Container}>
        <div className={styles.Line} />
        <div className={styles.textWrapper}>
          <div className={styles.first}>일시</div>
          <div className={styles.second}>{user.sub}</div>
        </div>
        <div className={styles.Line} />
        <div
          className={styles.textWrapper}
          onClick={() => copyToClipboard(user.address)}
        >
          <div className={styles.first}>장소</div>
          <div className={styles.second} style={{ cursor: "pointer" }}>
            {user.address}
          </div>
        </div>{" "}
        <div className={styles.notice}>(클릭해서 복사)</div>
        <div className={styles.Line} />
        <div className={styles.textWrapper}>
          <div className={styles.first}>VIP</div>
          <div className={styles.second}>{user.nickname}</div>
        </div>
        <div className={styles.Line} />
        <div className={styles.textWrapper}>
          <div className={styles.first}>낙찰자</div>
          <div className={styles.second}>{user.BidBy}</div>
        </div>
        <div className={styles.Line} />
        <div className={styles.textWrapper}>
          <div className={styles.first}>낙찰금액</div>
          <div className={styles.second}>{formattedAuctionCurrentBid} 원</div>
        </div>
        <div className={styles.Line} />
        <div className={styles.textWrapper}>
          <div className={styles.first}>기부금액</div>
          <div className={styles.second}> {formattedDonationAmount}원</div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailOption;
