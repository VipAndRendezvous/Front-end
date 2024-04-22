"use client";
import axios from "axios";
import Image from "next/image";
import styles from "./reviewBox.module.css";
import ProfilePic from "../../../public/user.png";
import React, { useEffect, useState } from "react";
import { UserMyPageReview } from "@/models/UserMyPageReview";
import HttpAuthInstance from "../utils/api/interceptor/axiosConfig";

type Props = {
  reviewBox: UserMyPageReview;
};

const ReviewBox = ({ reviewBox }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const reportReview = async () => {
    const token = localStorage.getItem("Authorization");
    try {
      const response = await HttpAuthInstance.post(
        `/api/user/review/report/${reviewBox.reviewUUID}`,
        {}
      );
      if (response.status === 200) {
        alert("신고완료");
      }
    } catch (error) {
      console.error(error);
      throw error; // 오류를 던져서 상위 핸들러에서 처리할 수 있도록 합니다.
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
  };

  const formatAddress = (address) => {
    const parts = address.split(" "); // 주소를 공백 기준으로 분할
    return parts.slice(0, 3).join(" "); // 필요한 부분만 조합하여 반환
  };

  const formatBidAmount = (amount) => {
    return Number(amount).toLocaleString(); // 숫자를 로케일에 맞게 포매팅
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg
          key={i}
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.71531 1.03005C6.1684 -0.343351 8.11117 -0.34335 8.56427 1.03005L9.07043 2.56428C9.27246 3.17668 9.84329 3.59141 10.4881 3.59432L12.1037 3.6016C13.5499 3.60811 14.1502 5.45579 12.9841 6.31112L11.6813 7.26661C11.1614 7.64799 10.9433 8.31905 11.1398 8.93324L11.6321 10.472C12.0728 11.8494 10.5011 12.9913 9.32728 12.1465L8.01599 11.2028C7.49258 10.8262 6.78699 10.8262 6.26359 11.2028L4.9523 12.1465C3.77847 12.9913 2.20674 11.8494 2.64744 10.472L3.13975 8.93324C3.33626 8.31905 3.11822 7.64799 2.59823 7.26661L1.2955 6.31112C0.129333 5.45579 0.729682 3.60811 2.17588 3.6016L3.79143 3.59432C4.43628 3.59141 5.00711 3.17668 5.20915 2.56428L5.71531 1.03005Z"
            fill="#FFF741"
            stroke="black"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div>
      <div className={styles.ReviewContainer}>
        <div
          className={isExpanded ? styles.ReviewBoxExpanded : styles.ReviewBox}
        >
          <div className={styles.fisrt}>
            <div className={styles.rating}>
              {renderStars(reviewBox.reviewRating)}
            </div>
            <div className={styles.meetingDate}>
              {formatDate(reviewBox.meetingDate)}
            </div>
          </div>

          <div className={styles.second}>
            <div className={styles.con1}>
              <div className={styles.vipNickname}>
                {reviewBox.vipNickname} 와의 식사권
              </div>
              <div
                className={isExpanded ? styles.reportExpanded : styles.report}
                onClick={reportReview}
              >
                신고하기
              </div>
            </div>
            <div className={isExpanded ? styles.Info : styles.report}>
              <div className={styles.part}>
                <b className={styles.text}>장소</b>
                <div className={styles.textInfo}>
                  {formatAddress(reviewBox.meetingLocation)}
                </div>
              </div>
              <div className={styles.part}>
                <b className={styles.text}>낙찰금액</b>
                <div className={styles.textInfo}>
                  {formatBidAmount(reviewBox.highestBidAmount)} 원
                </div>
              </div>
            </div>
            <div className={isExpanded ? styles.expanded : styles.collapsed}>
              {reviewBox.reviewContent}
            </div>
          </div>
          <div className={styles.con}>
            <div className={styles.third}>
              <div className={styles.ReviewProfileExpanded}>
                <Image
                  src={reviewBox.writerImgUrl || ProfilePic}
                  alt="ProfilePic"
                  width={24}
                  height={24}
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className={styles.writerNickname}>
                {reviewBox.writerNickname}
              </div>
            </div>
            <div className={styles.fourth}>
              <div className={styles.toggleExpand} onClick={toggleExpand}>
                {isExpanded ? (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2034_4350)">
                      <circle
                        cx="14"
                        cy="14"
                        r="13.5"
                        transform="rotate(-180 14 14)"
                        fill="white"
                        stroke="#FFF741"
                      />
                      <path
                        d="M14 9L20 15.1833L19.2075 16L14 10.65L8.80863 16L8 15.1833L14 9Z"
                        fill="#333333"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2034_4350">
                        <rect
                          width="28"
                          height="28"
                          fill="white"
                          transform="translate(28 28) rotate(-180)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2034_4072)">
                      <circle cx="14" cy="14" r="14" fill="#FFF741" />
                      <path
                        d="M14 19L8 12.8167L8.79245 12L14 17.35L19.1914 12L20 12.8167L14 19Z"
                        fill="#333333"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2034_4072">
                        <rect width="28" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
