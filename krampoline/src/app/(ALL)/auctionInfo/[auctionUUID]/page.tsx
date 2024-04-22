"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import AuctionInfo from "../../../_component/Auction/AuctionInfo";
import ScrollToTopButton from "../../../_component/ScrollToTopButton";
import { usePathname } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";
import { useUser } from "@/app/utils/UserProvider";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import { useRouter } from "next/navigation";
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
  const [selectedSection, setSelectedSection] = useState("");
  const [userSelected, setUserSelected] = useState(false);
  const { userInfo } = useUser();
  const router = useRouter();

  let auctionUUID = currPath.replace("/auctionInfo/", "");
  console.log(auctionUUID);
  const auctionInfoRef = useRef<HTMLDivElement | null>(null);
  const auctionWarningRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      if (auctionUUID) {
        try {
          const token = localStorage.getItem("Authorization");
          const response = await HttpAuthInstance.get(
            `/api/all/auction/general/${auctionUUID}`
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
  useEffect(() => {
    const handleScroll = () => {
      if (!userSelected) {
        // 사용자가 수동으로 섹션을 선택하지 않았을 경우에만 실행
        const infoPos = auctionInfoRef.current?.getBoundingClientRect().top;
        const warningPos =
          auctionWarningRef.current?.getBoundingClientRect().top;

        let selected = "";
        if (infoPos < 50 && infoPos > -50) {
          selected = "info";
        } else if (warningPos < 50 && warningPos > -50) {
          selected = "warning";
        }

        // 자동 스크롤 변경에 의해서만 섹션 업데이트
        if (selected !== "" && selectedSection !== selected) {
          setSelectedSection(selected);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // 스크롤 이벤트 리스너 제거 시 userSelected 초기화
      setUserSelected(false);
    };
  }, [selectedSection, userSelected]);

  const scrollToAuctionInfo = () => {
    if (auctionInfoRef.current) {
      const elementRect = auctionInfoRef.current.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const top = absoluteElementTop - 80;
      window.scrollTo({
        top,
        behavior: "smooth",
      });

      setUserSelected(true); // 사용자가 직접 선택한 것으로 처리
    }
  };

  const scrollToAuctionWarning = () => {
    if (auctionWarningRef.current) {
      const elementRect = auctionWarningRef.current.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const top = absoluteElementTop - 200;
      window.scrollTo({
        top,
        behavior: "smooth",
      });

      setUserSelected(true); // 사용자가 직접 선택한 것으로 처리
    }
  };

  const cancelAuction = async (event) => {
    try {
      const token = localStorage.getItem("Authorization");
      const response = await HttpAuthInstance.patch(
        `/api/vip/auction/cancel/${auctionUUID}`
      );
      if (response.status === 200) {
        alert("성공적으로 경매를 취소했습니다.");
        router.push("/");
      } else {
        console.error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.MainContainer}>
      <div className={styles.AuctionInfoContainer}>
        <div className={styles.Title}>VIP : {VipInfo.vipNickname}</div>
        {userInfo.userType === "ROLE_VIP" && (
          <div className={styles.cancelAuction} onClick={cancelAuction}>
            경매 취소하기
          </div>
        )}

        <div className={styles.MenuContainer}>
          <div
            className={
              selectedSection === "info" ? styles.SelectedButton : styles.Button
            }
            onClick={() => {
              scrollToAuctionInfo();
              setSelectedSection("info");
            }}
          >
            이 만남은 이런거에요
          </div>

          <div
            className={
              selectedSection === "warning"
                ? styles.SelectedButton
                : styles.Button
            }
            onClick={() => {
              scrollToAuctionWarning();
              setSelectedSection("warning");
            }}
          >
            이것 만큼은 지켜주세요
          </div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.auctionInfoRef}>
            <div ref={auctionInfoRef}>
              <div className={styles.deco} />
              <div className={styles.textStart}>이 만남은요, </div>
              <div
                dangerouslySetInnerHTML={{ __html: VipInfo.meetingInfoText }}
              />
            </div>
          </div>
          <div className={styles.auctionInfoRef}>
            <div ref={auctionWarningRef}>
              <div className={styles.deco2} />
              <div className={styles.textStart}>이것만큼은 꼭 지켜주세요. </div>
              <div
                dangerouslySetInnerHTML={{ __html: VipInfo.meetingPromiseText }}
              />
            </div>
          </div>
        </div>
      </div>
      <AuctionInfo VipInfo={VipInfo} />
      <ScrollToTopButton />
    </div>
  );
};

export default Page;
