"use client";

import styles from "./ticketDetailOption.module.css";
import Link from "next/link";
import { StaticImageData } from "next/image";

type Props = {
  user: {
    profile: StaticImageData;
    nickname: string;
    maxBid: number;
    sub: string;
    star: number;
    auctionTime: number;
    period: string;
    address: string;
    BidBy: string;
  };
};

//----------------------------------------------------------------시간 폼
const TicketDetailOption = ({ user }: Props) => {
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

  return (
    <div>
      <div className={styles.AuctionInfo_TicketBox_Container}>
        <div>일시: {user.sub}</div>
        <div>장소: {user.address}</div>
        <div>VIP: {user.nickname}</div>
        <div>낙찰자: {user.BidBy}</div>
        <div>
          낙찰금액:
          {formattedAuctionCurrentBid} 원
        </div>
        <div>
          기부금액:
          {formattedDonationAmount}원
        </div>
      </div>
    </div>
  );
};

export default TicketDetailOption;
