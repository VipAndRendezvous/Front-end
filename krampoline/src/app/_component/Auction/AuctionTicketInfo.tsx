"use client";
import styles from "./auctionTicketInfo.module.css";
import Image from "next/image";
import ProfilePic from "../../../../public/user.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import TicketDetailOption from "./TicketDetailOption";
import { useUser } from "@/app/utils/UserProvider";

// 날짜 형식을 변환하는 함수
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}.${month}.${day} ${hours}시 ${minutes}분`;
}

const AuctionTicketInfo = () => {
  //----------------------------------------------------------------날짜 형식
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  //----------------------------------------------------------------시간 형식
  const twoHoursInMs = 2 * 60 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState(twoHoursInMs);
  const { ticketInfo, setTicketInfo, setglobalTicketUUID } = useUser();

  useEffect(() => {
    // 타이머가 마운트되면 시작합니다.
    const timerId = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        const newTime: number = prevTime - 1000;
        // 시간이 다 되면 인터벌을 정지합니다.
        if (newTime <= 0) {
          clearInterval(timerId);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
    return () => clearInterval(timerId);
  }, []);

  //----------------------------------------------------------------

  const user = {
    profile: ticketInfo.organizerProfileImg,
    nickname: ticketInfo.organizerNickname,
    maxBid: ticketInfo.winningBid,
    sub: formatDate(ticketInfo.meetingDate),
    // star: 4.5,
    address: ticketInfo.meetingLocation,
    // period: "03-05~03-08",
    // auctionTime: ticketInfo.,
    BidBy: ticketInfo.winnerNickname,
  };

  return (
    <div>
      <div className={styles.AuctionInfoContainer}>
        <div className={styles.AuctionInfoInfo}>
          <div className={styles.AuctionInfoPic}>
            <Link href="/vipinfo">
              <Image
                src={user.profile}
                alt="ProfilePic"
                style={{ objectFit: "cover" }}
                width={268}
                height={268}
              />
            </Link>
          </div>
          <article className={styles.AuctionInfoBoxFixed}>
            <TicketDetailOption user={user} />
          </article>
        </div>
      </div>
    </div>
  );
};

export default AuctionTicketInfo;
