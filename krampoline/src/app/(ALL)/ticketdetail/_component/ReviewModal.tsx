"use client";

import React, { useState } from "react";
import styles from "./ReviewModal.module.css";
import { useUser } from "@/app/utils/UserProvider";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import Image from "next/image";
import ProfilePic from "../../../../../public/user.png";

const ReviewModal = ({ onReViewClose }: { onReViewClose: () => void }) => {
  const [rating, setRating] = useState(0); // 사용자가 선택한 별점을 관리할 상태
  const [review, setReview] = useState(""); // 사용자의 리뷰 텍스트를 관리할 상태
  const { ticketInfo, globalTicketUUID } = useUser();
  const [imgSrc, setImgSrc] = useState(ticketInfo.profile || ProfilePic);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 폼 제출의 기본 동작 방지
    try {
      const token = localStorage.getItem("Authorization");

      // API 요청 부분
      const response = await HttpAuthInstance.post(`/api/ticket/review`, {
        ticketUUID: globalTicketUUID,
        reviewContent: review,
        reviewRating: rating,
      });
      if (response.status === 200) {
        onReViewClose(); // 모달 닫기 함수 호출
      }
    } catch (error) {
      console.error("API submission error:", error);
      onReViewClose(); // 오류 발생 시에도 모달 닫기
    }

    onReViewClose(); // 모달 닫기
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      return (
        <span key={index} onClick={() => handleRating(index + 1)}>
          {rating > index ? (
            <svg
              width="40"
              height="39"
              viewBox="0 0 40 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.1014 2.32381C18.7069 0.495452 21.2931 0.495452 21.8986 2.32381L24.8754 11.3129C25.28 12.5349 26.4192 13.3625 27.7064 13.3698L37.1754 13.4231C39.1014 13.4339 39.9006 15.8936 38.3488 17.0344L30.7195 22.6433C29.6824 23.4058 29.2473 24.7449 29.6382 25.9713L32.5136 34.9934C33.0984 36.8284 31.0061 38.3486 29.4416 37.2253L21.7497 31.7027C20.704 30.9519 19.296 30.9519 18.2503 31.7027L10.5584 37.2253C8.9939 38.3486 6.90156 36.8284 7.48641 34.9934L10.3618 25.9713C10.7527 24.7449 10.3176 23.4058 9.28045 22.6433L1.65119 17.0344C0.0994158 15.8936 0.898617 13.4339 2.82459 13.4231L12.2936 13.3698C13.5808 13.3625 14.72 12.5349 15.1246 11.3129L18.1014 2.32381Z"
                fill="#FFF741"
                stroke="#333333"
              />
            </svg>
          ) : (
            <svg
              width="40"
              height="39"
              viewBox="0 0 40 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.1014 2.32381C18.7069 0.495452 21.2931 0.495452 21.8986 2.32381L24.8754 11.3129C25.28 12.5349 26.4192 13.3625 27.7064 13.3698L37.1754 13.4231C39.1014 13.4339 39.9006 15.8936 38.3488 17.0344L30.7195 22.6433C29.6824 23.4058 29.2473 24.7449 29.6382 25.9713L32.5136 34.9934C33.0984 36.8284 31.0061 38.3486 29.4416 37.2253L21.7497 31.7027C20.704 30.9519 19.296 30.9519 18.2503 31.7027L10.5584 37.2253C8.9939 38.3486 6.90156 36.8284 7.48641 34.9934L10.3618 25.9713C10.7527 24.7449 10.3176 23.4058 9.28045 22.6433L1.65119 17.0344C0.0994158 15.8936 0.898617 13.4339 2.82459 13.4231L12.2936 13.3698C13.5808 13.3625 14.72 12.5349 15.1246 11.3129L18.1014 2.32381Z"
                fill="white"
                stroke="#333333"
              />
            </svg>
          )}
        </span>
      );
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.ReportWrapper}>
          <div className={styles.closeButton} onClick={onReViewClose}>
            <svg
              width="31"
              height="32"
              viewBox="0 0 31 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.88977 23.0347C7.69787 23.2333 7.69787 23.5552 7.88977 23.7538C8.08168 23.9523 8.39282 23.9523 8.58472 23.7538L7.88977 23.0347ZM22.9443 7.45785L7.88977 23.0347L8.58472 23.7538L23.6393 8.17691L22.9443 7.45785Z"
                fill="#333333"
              />
              <path
                d="M22.9443 23.7541C23.1362 23.9526 23.4473 23.9526 23.6393 23.7541C23.8312 23.5555 23.8312 23.2336 23.6393 23.035L22.9443 23.7541ZM23.6393 23.035L8.58472 7.45815L7.88977 8.17721L22.9443 23.7541L23.6393 23.035Z"
                fill="#333333"
              />
            </svg>
          </div>
        </div>
        <div className={styles.ReportHeader}>만남이 만족스러우셨나요?</div>
        <div className={styles.Line} />
        <div className={styles.OriginGroup}>
          <div className={styles.OriginPic}>
            <Image
              src={imgSrc}
              alt="ProfilePic"
              style={{ objectFit: "cover" }}
              width={60}
              height={60}
              onError={() => setImgSrc(ProfilePic)}
            />
          </div>
          <div className={styles.OriginName}>
            {ticketInfo.organizerNickname}
          </div>
          <div className={styles.OriginRating}>
            <div className={styles.star}>
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.53579 1.50591C6.70345 1.08693 7.29655 1.08692 7.46421 1.50591L8.36622 3.76004C8.58062 4.29583 9.08338 4.66111 9.65921 4.69945L12.0817 4.86074C12.532 4.89072 12.7153 5.4548 12.3686 5.74373L10.5036 7.29814C10.0603 7.66762 9.86822 8.25866 10.0097 8.81815L10.6049 11.172C10.7155 11.6095 10.2357 11.9581 9.85379 11.7177L7.79911 10.4242C7.31073 10.1168 6.68927 10.1168 6.20089 10.4242L4.14621 11.7177C3.7643 11.9581 3.28447 11.6095 3.3951 11.172L3.99031 8.81814C4.13178 8.25866 3.93974 7.66762 3.49643 7.29814L1.63136 5.74373C1.28469 5.4548 1.46797 4.89072 1.91826 4.86074L4.3408 4.69945C4.91662 4.66111 5.41938 4.29583 5.63378 3.76004L6.53579 1.50591Z"
                  fill="#FFF741"
                  stroke="#333333"
                />
              </svg>
            </div>
            <div className={styles.Rating}>4.5{/* {ticketInfo.Rating} */}</div>
          </div>
        </div>
        <div className={styles.Line2} />
        <div className={styles.reviewRating}>{renderStars()}</div>
        <textarea
          className={styles.reportDetail}
          placeholder="만남 경험을 다른 분들과 공유해주세요 :)"
          value={review}
          onChange={handleReviewChange}
          maxLength={200}
        />
        <div className={styles.charCount}>{review.length}/200</div>
        <button
          type="submit"
          onClick={handleSubmit}
          className={
            rating > 0 && review ? styles.submitBtnb : styles.submitBtn
          }
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
