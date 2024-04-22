"use client";

import AuctionPlayModal from "@/app/(ALL)/auctions/original/_component/AuctionPlayModal";
import styles from "./auctionInfo_box.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useUser } from "@/app/utils/UserProvider";
import Image from "next/image";
import ProfilePic from "../../../../public/user.png";

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
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월을 2자리 숫자로 포맷
      const day = date.getDate().toString().padStart(2, "0"); // 일을 2자리 숫자로 포맷
      return `${year}.${month}.${day}`; // YYYY.MM.DD 형식으로 반환
    };

    return `${format(startDate)} ~ ${format(endDate)}`; // 시작일과 종료일을 포매팅하여 반환
  };
  //----------------------------------------------------------------날짜
  // 날짜를 "20xx년 xx월 xx일" 형식으로 포맷팅하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear(); // 연도 가져오기
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월을 두 자리 숫자로 포맷
    const day = date.getDate().toString().padStart(2, "0"); // 일을 두 자리 숫자로 포맷
    const hours = date.getHours().toString().padStart(2, "0"); // 시를 두 자리 숫자로 포맷
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 분을 두 자리 숫자로 포맷

    return `${year}.${month}.${day} ${hours}:${minutes}`; // "YYYY.MM.DD HH:MM" 형식으로 반환
  };

  //----------------------------------------------------------------

  return (
    <div className={styles.AuctionInfo_box_Container}>
      <div className={styles.AuctionInfo_box_TimeOut}>
        <div className={styles.TimeOutText}>남은 시간</div>
        <div className={styles.TimeOutTime}>{timeLeft}</div>
      </div>
      <div className={styles.AuctionInfo_box_User}>
        <div className={styles["AuctionInfo-Pic"]}>
          <Link href={`/vipinfo/${VipInfo.vipUUID}`}>
            <Image
              src={VipInfo.vipProfileImgUrl || ProfilePic} // Use a default picture if url is not available
              alt="ProfilePic"
              width={88}
              height={88}
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>
        <div className={styles.first}>
          <div className={styles.vipNickname}>{VipInfo.vipNickname}</div>
          <div className={styles.rating}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.0355 1.03005C5.4886 -0.343351 7.43136 -0.34335 7.88446 1.03005L8.39062 2.56428C8.59265 3.17668 9.16348 3.59141 9.80834 3.59432L11.4239 3.6016C12.8701 3.60811 13.4704 5.45579 12.3043 6.31112L11.0015 7.26661C10.4815 7.64799 10.2635 8.31905 10.46 8.93324L10.9523 10.472C11.393 11.8494 9.82129 12.9913 8.64747 12.1465L7.33618 11.2028C6.81277 10.8262 6.10718 10.8262 5.58378 11.2028L4.27249 12.1465C3.09866 12.9913 1.52693 11.8494 1.96763 10.472L2.45994 8.93324C2.65645 8.31905 2.43841 7.64799 1.91842 7.26661L0.61569 6.31112C-0.550476 5.45579 0.0498724 3.60811 1.49607 3.6016L3.11162 3.59432C3.75647 3.59141 4.3273 3.17668 4.52934 2.56428L5.0355 1.03005Z"
                fill="#FFF741"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.44096 2.87758L6.9348 1.34335C6.78377 0.885549 6.13618 0.885551 5.98515 1.34335L5.47899 2.87758C5.14227 3.89824 4.19088 4.58946 3.11613 4.59431L1.50057 4.60159C1.01851 4.60376 0.818394 5.21965 1.20711 5.50476L2.50984 6.46025C3.37649 7.09589 3.73989 8.21431 3.41238 9.23797L2.92007 10.7767C2.77317 11.2358 3.29708 11.6165 3.68836 11.3349L4.99964 10.3912C5.87199 9.76338 7.04797 9.76337 7.92031 10.3912L9.2316 11.3349C9.62288 11.6165 10.1468 11.2358 9.99988 10.7767L9.50758 9.23797C9.18006 8.21432 9.54346 7.09589 10.4101 6.46025L11.7128 5.50476C12.1016 5.21965 11.9014 4.60376 11.4194 4.60159L9.80383 4.59431C8.72907 4.58946 7.77769 3.89824 7.44096 2.87758ZM7.88446 1.03005C7.43136 -0.34335 5.48859 -0.343351 5.0355 1.03005L4.52934 2.56428C4.3273 3.17668 3.75647 3.59141 3.11162 3.59432L1.49607 3.6016C0.0498723 3.60811 -0.550476 5.45579 0.61569 6.31112L1.91842 7.26661C2.43841 7.64799 2.65645 8.31905 2.45994 8.93324L1.96763 10.472C1.52693 11.8494 3.09866 12.9913 4.27249 12.1465L5.58378 11.2028C6.10718 10.8262 6.81277 10.8262 7.33618 11.2028L8.64747 12.1465C9.82129 12.9913 11.393 11.8494 10.9523 10.472L10.46 8.93324C10.2635 8.31905 10.4815 7.64799 11.0015 7.26661L12.3043 6.31112C13.4704 5.4558 12.8701 3.60811 11.4239 3.6016L9.80834 3.59432C9.16348 3.59141 8.59265 3.17668 8.39062 2.56428L7.88446 1.03005Z"
                fill="#333333"
              />
            </svg>
            {VipInfo.vipRating}
          </div>
        </div>
      </div>
      <div className={styles.stroke}>
        <svg
          width="228"
          height="2"
          viewBox="0 0 228 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 1L228 1.00004" stroke="#D9D9D9" />
        </svg>
      </div>
      <div className={styles.second}>
        <b className={styles.secondText}>경매기간</b>
        <div className={styles.secondDate}>{getAuctionPeriod()}</div>
      </div>
      <div className={styles.stroke}>
        <svg
          width="228"
          height="2"
          viewBox="0 0 228 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 1L228 1.00004" stroke="#D9D9D9" />
        </svg>
      </div>
      <div className={styles.second}>
        <b className={styles.secondText}>날짜</b>
        <div className={styles.secondDate}>
          {formatDate(VipInfo.meetingDate)}
        </div>
      </div>
      <div className={styles.stroke}>
        <svg
          width="228"
          height="2"
          viewBox="0 0 228 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 1L228 1.00004" stroke="#D9D9D9" />
        </svg>
      </div>
      <div className={styles.second}>
        <b className={styles.secondText}>장소</b>
        <div className={styles.secondDate}>{VipInfo.meetingLocation}</div>
      </div>
      <div className={styles.stroke}>
        <svg
          width="228"
          height="2"
          viewBox="0 0 228 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 1L228 1.00004" stroke="#D9D9D9" />
        </svg>
      </div>
      <div className={styles.second}>
        <b className={styles.secondText}>최고입찰가</b>
        <div className={styles.secondDate2}>
          {VipInfo.currentHighestBidAmount.toLocaleString()} 원
        </div>
      </div>
      <div className={styles.injoy}>
        {isLoggedIn && (
          <div className={styles.injoyButton} onClick={toggle}>
            경매 참여하기
          </div>
        )}
      </div>

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
