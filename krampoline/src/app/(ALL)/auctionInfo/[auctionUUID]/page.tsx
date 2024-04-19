"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import AuctionInfo from "../../../_component/Auction/AuctionInfo";
import AuctionInfo_Img from "/public/detailInfo.png";
import AuctionInfo_warning from "/public/warningList.jpeg";
import ScrollToTopButton from "../../../_component/ScrollToTopButton";
import { usePathname } from "next/navigation";
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

const Page = () => {
  const pathname = usePathname();
  const [currPath, setCurrPath] = useState("");
  const [VipInfo, setVipInfo] = useState<UserInfo>();
  const [isLoading, setIsLoading] = useState(true);

  let auctionUUID = currPath;
  if (typeof auctionUUID === "string") {
    auctionUUID = auctionUUID.replace("/auctionInfo/", "");
  }
  console.log(auctionUUID);
  const [auctionDetail, setAuctionDetail] = useState(null);
  const auctionInfoRef = useRef<HTMLDivElement | null>(null);
  const auctionWarningRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrPath(pathname);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (auctionUUID) {
        try {
          const token = localStorage.getItem("Authorization");
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/all/auction/general/${auctionUUID}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.status === 200) {
            setVipInfo(response.data);
            setIsLoading(false);
            console.log(response.data);
          }
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [auctionUUID]);

  const scrollToAuctionInfo = () => {
    if (auctionInfoRef.current) {
      // auctionInfoRef.current가 존재하는지 확인
      auctionInfoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAuctionWarning = () => {
    if (auctionWarningRef.current) {
      // auctionWarningRef.current가 존재하는지 확인
      auctionWarningRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <AuctionInfo VipInfo={VipInfo} ObjectauctionUUID={auctionUUID} />
      </div>
      <div>
        <button className="btn-basic" onClick={scrollToAuctionInfo}>
          이 만남은 이런거에요
        </button>
        <button className="btn-basic" onClick={scrollToAuctionWarning}>
          이것 만큼은 지켜주세요
        </button>
      </div>
      <div style={{ width: 500 }}>
        <div ref={auctionInfoRef}>
          <div dangerouslySetInnerHTML={{ __html: VipInfo.meetingInfoText }} />
        </div>
        <div ref={auctionWarningRef}>
          <div
            dangerouslySetInnerHTML={{ __html: VipInfo.meetingPromiseText }}
          />
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Page;
