"use client";
import styles from "./auctionInfo.module.css";
import Image from "next/image";
import ProfilePic from "../../../../public/user.png";
import AuctionInfo_box from "./AuctionInfo_box";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@/app/utils/UserProvider";

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

const AuctionInfo = ({ VipInfo }) => {
  //----------------------------------------------------------------날짜 형식
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  //----------------------------------------------------------------시간 형식
  const twoHoursInMs = 2 * 60 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState(twoHoursInMs);
  const { userInfo } = useUser();
  userInfo.userType;
  useEffect(() => {
    // 타이머가 마운트되면 시작합니다.
    const timerId = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        const newTime: number = prevTime - 1000;
        if (newTime <= 0) {
          clearInterval(timerId);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  //----------------------------------------------------------------

  return (
    <div className={styles.con}>
      <AuctionInfo_box VipInfo={VipInfo} />
    </div>
  );
};

export default AuctionInfo;
