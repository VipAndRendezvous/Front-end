"use client";

import React, { useEffect, useState } from "react";
import styles from "./introduce.module.css";
import { useVip } from "@/app/utils/VipProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ProfilePic from "../../../../../public/user.png";
import ReviewBox from "@/app/_component/ReviewBox";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import AuctionBox from "@/app/_component/Auction/AuctionBox";

const Vip_Introduce = () => {
  const { vipIntro, vipIntroAPI } = useVip();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const [currPath, setCurrPath] = useState("");
  const [VipInfo, setVipInfo] = useState<VipInfo | null>(null);
  const [reviews, setReviews] = useState([]);
  const [progressAuctionList, setProgressAuctionList] = useState([]);

  const profileImages = [
    "/user/1.jpg",
    "/user/2.jpg",
    "/user/3.jpg",
    "/user/4.jpg",
    "/user/5.jpg",
    "/user/6.jpg",
  ];

  // useState를 사용하여 컴포넌트가 처음 로딩될 때 한 번만 랜덤 이미지를 선택하도록 합니다.
  const [randomImage, setRandomImage] = useState(
    profileImages[Math.floor(Math.random() * profileImages.length)]
  );

  let vipUUID = currPath;
  if (typeof vipUUID === "string") {
    vipUUID = vipUUID.replace("/vipinfo/", "");
  }
  console.log(vipUUID);

  useEffect(() => {
    setCurrPath(pathname);
  }, []);

  useEffect(() => {
    if (!vipUUID) return;
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // 리뷰 데이터를 가져옵니다.
        const token = localStorage.getItem("Authorization");

        const Allresponse = await HttpAuthInstance.get(
          `/api/all/vipDetail/${vipUUID}`
        );
        if (Allresponse.status === 200) {
          setVipInfo(Allresponse.data);
          setProgressAuctionList(Allresponse.data.progressAuctionList || []);
          setReviews(Allresponse.data.receiveReviewList || []);
          console.log(Allresponse);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vipUUID]);

  //------
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.vipInfoPageContainer}>
      <div className={styles.vipInfoTitleWrapper}>
        <div className={styles.vipInfoNickName}>{VipInfo?.vipNickname}</div>
        <div className={styles.vipInfoTitleRating}>
          <img src="/Star.png" className={styles.star} />
          <div className={styles.starText}>
            {VipInfo?.vipRating ? VipInfo?.vipRating : "🤫"}
          </div>
        </div>
      </div>

      <div className={styles.vipInfoWrapper}>
        <div className={styles.vipInfoPicture}>
          <Image
            src={
              VipInfo?.vipProfileImgUrl
                ? VipInfo?.vipProfileImgUrl
                : randomImage
            }
            alt="ProfilePic"
            width={368}
            height={461}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.vipShowingInfoContainer}>
          <div className={styles.vipJob}>
            <div className={styles.JobTitle}>
              <div className={styles.rectangleDiv} />
              직업
            </div>
            <div className={styles.JobObject}>
              {VipInfo.vipJop
                ? VipInfo.vipJop
                : "VIP가 잆력한 내용이 아직 없습니다🤔"}
            </div>
          </div>
          <div className={styles.vipCareer}>
            <div className={styles.CareerTitle}>
              <div className={styles.rectangleDiv2} />
              경력
            </div>
            <p className={styles.CareerObject}>
              {VipInfo.vipCareer
                ? VipInfo.vipCareer
                : "VIP가 잆력한 내용이 아직 없습니다🤔"}
            </p>
          </div>
          <div className={styles.vipIntro}>
            <div className={styles.IntroTitle}>
              <div className={styles.rectangleDiv} />
              소개글
            </div>
            <div className={styles.IntroObject}>
              {VipInfo.vipIntroduce
                ? VipInfo.vipIntroduce
                : "VIP가 잆력한 내용이 아직 없습니다🤔"}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.vipInfoAuctionWrapper}>
        <div className={styles.SectionTitle}>
          <div className={styles.auctionListText}>경매 리스트</div>
        </div>
        <div
          className={
            progressAuctionList.length > 0
              ? styles.AuctionDefaultList
              : styles.AuctionList
          }
        >
          {progressAuctionList.length > 0 ? (
            progressAuctionList.map((auction) => (
              <div key={auction.auctionUUID} className={styles.listBoxText}>
                <AuctionBox auctionData={auction} />
              </div>
            ))
          ) : (
            <div className={styles.emptyListText}>예정된 경매가 없습니다.</div>
          )}
        </div>
        <div className={styles.SectionTitle}>
          <div className={styles.auctionListText}>식사후기</div>
        </div>
        <div className={styles.AuctionList}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className={styles.listBoxText}>
                <ReviewBox reviewBox={review} />
              </div>
            ))
          ) : (
            <div className={styles.listBoxText}>아직 리뷰가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vip_Introduce;
