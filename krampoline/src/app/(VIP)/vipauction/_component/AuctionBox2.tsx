"use client";

import styles from "./auctionBox.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Auctions } from "@/models/Auctions";

const AuctionBox = ({ TicketData }: any) => {
  const auction = TicketData;
  const profileImages = [
    "/user/1.jpg",
    "/user/2.jpg",
    "/user/3.jpg",
    "/user/4.jpg",
    "/user/5.jpg",
    "/user/6.jpg",
  ];

  const [randomImage] = useState(
    profileImages[Math.floor(Math.random() * profileImages.length)]
  );

  const auctionEndTime =
    new Date(auction.createdTime || auction.auctionCreatedDate).getTime() +
    3 * 24 * 60 * 60 * 1000;

  const [timeLeft, setTimeLeft] = useState(
    auctionEndTime - new Date().getTime()
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(auctionEndTime - new Date().getTime());

      if (timeLeft <= 0) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [auctionEndTime, timeLeft]);

  const formatTime = (time: number) => {
    if (time < 0) {
      return "0일 00:00:00";
    }
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    return `${days}일 ${hours.toString().padStart(2, "0")}시 ${minutes
      .toString()
      .padStart(2, "0")}분 ${seconds.toString().padStart(2, "0")}초`;
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formattedAuctionCurrentMoney = auction.currentHighestBidAmount
    ? auction.currentHighestBidAmount.toLocaleString()
    : "0";

  return (
    <div className={styles.AuctionWrapper}>
      <div className={styles.AuctionContainer}>
        <div className={styles.AuctionProfile}>
          <Image
            src={
              auction.profileImgUrl.startsWith("http")
                ? auction.profileImgUrl
                : randomImage
            }
            alt="ProfilePic"
            width={268}
            height={268}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.AuctionTitle}>
          {auction.vipNickname || auction.basicUserName}
        </div>

        <div className={styles.AuctionInfo}>
          <div className={styles.TimePart}>
            <div className={styles.AucionText}>만남 시간</div>
            <div className={styles.AucionInfoState}>
              {" "}
              {formatDate(auction.meetDate)}
            </div>
          </div>
          <div className={styles.TimePart}>
            <div className={styles.AucionText}>현재 입찰 금액</div>{" "}
            <div className={styles.AucionInfoState}>
              {formattedAuctionCurrentMoney} 원
            </div>
          </div>
          <div className={styles.TimePart}>
            <div className={styles.AucionText}>입찰 수 </div>
            <div className={styles.AucionInfoState}>
              {auction.bidCount ?? 0} 회
            </div>
          </div>
          <div className={styles.AuctionFigure}>
            <Link href={`/ticketdetail/${auction.ticketUUID}`}>상세보기</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionBox;
