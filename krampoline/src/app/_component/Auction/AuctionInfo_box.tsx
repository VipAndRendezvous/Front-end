"use client";

import AuctionPlayModal from "@/app/(ALL)/auctions/original/_component/AuctionPlayModal";
import styles from "./auctionInfo_box.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useUser } from "@/app/utils/UserProvider";

type Props = {
  auctionCreatedTime: string;
  auctionUUID: string;
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

//----------------------------------------------------------------시간 폼
const AuctionInfo_box = ({ VipInfo }: { VipInfo: Props }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); //추가
  const { isLoggedIn } = useUser();
  // 모달을 닫는 함수
  const closeModal = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const calculateTimeLeft = () => {
    const endTime =
      new Date(VipInfo.auctionCreatedTime).getTime() + 3 * 24 * 60 * 60 * 1000; // 경매 생성 시간으로부터 3일 뒤
    const now = new Date().getTime();
    const timeLeft = endTime - now;

    if (timeLeft > 0) {
      // 남은 시간이 있는 경우
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
      return `${days}일 ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      // 경매가 종료된 경우
      return "경매 종료됨";
    }
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [VipInfo.auctionCreatedTime]);

  //----------------------------------------------------------------경매기간
  // 경매 기간을 계산하는 함수
  const getAuctionPeriod = () => {
    const startDate = new Date(VipInfo.auctionCreatedTime);
    const endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3일 추가

    const format = (date) => {
      return `${date.getMonth() + 1}월${date.getDate()}일`;
    };

    return `${format(startDate)} ~ ${format(endDate)}`;
  };
  //----------------------------------------------------------------날짜
  // 날짜를 "20xx년 xx월 xx일" 형식으로 포맷팅하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  //----------------------------------------------------------------

  return (
    <div className={styles.AuctionInfo_box_Container}>
      <div className={styles.AuctionInfo_box_TimeOut}>
        남은 시간: {timeLeft}
      </div>
      <div className={styles.AuctionInfo_box_User}>
        <div>{VipInfo.vipNickname}</div>
        <div>{VipInfo.vipRating}</div>
      </div>
      <div className={styles.AuctionInfo_box_Info}>
        <div>날짜: {formatDate(VipInfo.meetingDate)}</div>
        <div>장소: {VipInfo.meetingLocation}</div>
        <div>경매기간: {getAuctionPeriod()}</div>
      </div>
      <div className={styles.AuctionInfo_box_MaxBid}>
        현재 최고입찰가: {VipInfo.currentHighestBidAmount} 원
      </div>

      {isLoggedIn && (
        <button className="btn-basic" onClick={toggle}>
          경매 참여하기
        </button>
      )}

      <Modal
        className={styles.modalContent}
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalInnerContent}>
          <AuctionPlayModal closeModal={closeModal} VipInfo={VipInfo} />
        </div>
      </Modal>
    </div>
  );
};

export default AuctionInfo_box;
