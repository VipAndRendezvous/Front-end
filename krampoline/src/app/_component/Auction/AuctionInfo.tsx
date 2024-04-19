"use client";
import styles from "./auctionInfo.module.css";
import Image from "next/image";
import ProfilePic from "../../../../public/user.png";
import AuctionInfo_box from "./AuctionInfo_box";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

type UserInfo = {
  auctionCreatedTime: string;
  currentHighestBidAmount: number;
  meetingDate: string;
  meetingInfoText: string;
  meetingLocation: string;
  meetingPromiseText: string;
  vipNickname: string;
  vipProfileImgUrl: string;
  vipRating: number;
  vipUUID: string;
};

const AuctionInfo = ({ VipInfo, ObjectauctionUUID }) => {
  //----------------------------------------------------------------날짜 형식
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  //----------------------------------------------------------------시간 형식
  const twoHoursInMs = 2 * 60 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState(twoHoursInMs);

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

  const cancelAuction = async (event) => {
    try {
      const token = localStorage.getItem("Authorization");
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/vip/auction/cancel/${ObjectauctionUUID}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log(response);
      } else {
        console.error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  //----------------------------------------------------------------

  return (
    <div>
      <div className={styles.AuctionInfoContainer}>
        <div className={styles["AuctionInfo-Info"]}>
          <div className={styles["AuctionInfo-Pic"]}>
            <Link href={`/vipinfo/${VipInfo.vipUUID}`}>
              <Image
                src={VipInfo.vipProfileImgUrl || ProfilePic} // Use a default picture if url is not available
                alt="AuctionInfo_Img"
                width={600}
                height={600}
              />
            </Link>
          </div>
          <button
            onClick={(e) => {
              cancelAuction(e);
            }}
          >
            경매 취소하기
          </button>
          <article className={styles.AuctionInfoBoxFixed}>
            <AuctionInfo_box VipInfo={VipInfo} />
          </article>
        </div>
      </div>
    </div>
  );
};

export default AuctionInfo;
