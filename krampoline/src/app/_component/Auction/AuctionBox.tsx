"use client";

import styles from "./auctionBox.module.css";
import ProfilePic from "../../../../public/user.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Auctions } from "@/models/Auctions";
import { ApiResponse, Participate, Success } from "@/models/UserMyPageAuction";

type Props = {
  auctionData: Auctions;
};

const AuctionBox = ({ auctionData }: Props) => {
  const auction = auctionData;

  const auctionEndTime =
    new Date(auction.createdTime).getTime() + 3 * 24 * 60 * 60 * 1000; // 3일을 밀리초로 계산하여 더합니다.
  const [timeLeft, setTimeLeft] = useState(
    auctionEndTime - new Date().getTime()
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(auctionEndTime - new Date().getTime());

      // 시간이 다 되면 인터벌을 정지합니다.
      if (timeLeft <= 0) {
        clearInterval(timerId);
      }
    }, 1000);

    // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (time: number) => {
    if (time < 0) {
      return "0일 00:00:00"; // 시간이 다 되었다면 0일 00:00:00을 표시합니다.
    }
    const days = Math.floor(time / (1000 * 60 * 60 * 24)); // 전체 날짜 계산
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24); // 남은 시간에서 시간 계산
    const minutes = Math.floor((time / (1000 * 60)) % 60); // 남은 시간에서 분 계산
    const seconds = Math.floor((time / 1000) % 60); // 남은 시간에서 초 계산

    return `${days}일 ${hours.toString().padStart(2, "0")}시 ${minutes
      .toString()
      .padStart(2, "0")}분 ${seconds.toString().padStart(2, "0")}초`;
  };

  // const formattedAuctionCurrentMoney =
  //   auction.currentHighestBidAmount.toLocaleString();
  return (
    <div className={styles.AuctionWrapper}>
      <div className={styles.AuctionContainer}>
        <div className={styles.AuctionProfile}>
          <Image
            src={
              auction.profileImgUrl.startsWith("http")
                ? auction.profileImgUrl
                : ProfilePic
            }
            alt="ProfilePic"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.AuctionTitle}>{auction.vipNickname}</div>
        <hr></hr>
        <div className={styles.AuctionInfo}>
          {/* <div>{user.state}</div> */}
          <div>남은 시간: {formatTime(timeLeft)}</div>
          {/* <div>현재 입찰 금액: {formattedAuctionCurrentMoney} 원</div> */}
          <div>입찰 수: {auction.bidCount} 회</div>
        </div>
        <Link href={`/auctionInfo/${auctionData.auctionUUID}`}>
          <div className={styles.AuctionFigure}>상세보기</div>
        </Link>
      </div>
    </div>
  );
};

export default AuctionBox;
