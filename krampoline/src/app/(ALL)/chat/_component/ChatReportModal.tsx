"use client";

import React, { useState } from "react";
import styles from "./chatReportModal.module.css";
import { useUser } from "@/app/utils/UserProvider";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import Image from "next/image";
import ProfilePic from "../../../../../public/user.png";
const ReportModal = ({ onReportClose }: { onReportClose: () => void }) => {
  // 버튼 선택 상태를 저장하는 상태
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [reportDetails, setReportDetails] = useState<string>("");
  const { ticketInfo, userInfo, globalTicketUUID } = useUser();
  const [imgSrc, setImgSrc] = useState(ticketInfo.profile || ProfilePic);

  console.log(ticketInfo, userInfo, globalTicketUUID);
  // 리포트 이유를 설정하는 함수
  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 폼 제출의 기본 동작 방지
    if (selectedReason && reportDetails) {
      const reportData = {
        chatRoomUUID: ticketInfo.chatRoomUUID,
        chatReportContent: reportDetails,
      };
      try {
        const token = localStorage.getItem("Authorization");
        const response = await HttpAuthInstance.post(
          `/api/chat/report`,
          reportData
        );
        if (response.status === 200) {
          onReportClose(); // 모달 닫기
        } else {
          console.error("Failed to submit report");
        }
      } catch (error) {
        console.error("Error submitting report:", error);
      }
    }
  };

  return (
    <div>
      <div className={styles.ReportWrapper}>
        <div className={styles.closeButton} onClick={onReportClose}>
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
      <div className={styles.ReportHeader}>채팅 신고하기</div>
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
        <div className={styles.OriginName}>{ticketInfo.organizerNickname}</div>
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
      <div className={styles.ReportReason}>신고 사유를 선택해주세요</div>

      <form onSubmit={handleSubmit} className={styles.ReportContainer}>
        <div className={styles.ReportButton}>
          <div
            className={styles.basicBtn}
            onClick={() => handleReasonSelect("abuse")}
          >
            <div
              className={
                selectedReason === "abuse" ? styles.selected : styles.unSelected
              }
            >
              <svg
                className={styles.svgIcon}
                viewBox="0 0 44 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2034_5761)">
                  <path
                    d="M16.1091 26.566C17.2114 26.566 18.105 25.6414 18.105 24.5008C18.105 23.3602 17.2114 22.4355 16.1091 22.4355C15.0067 22.4355 14.1131 23.3602 14.1131 24.5008C14.1131 25.6414 15.0067 26.566 16.1091 26.566Z"
                    fill="#E0E0E0"
                  />
                  <path
                    d="M28.0849 26.566C29.1872 26.566 30.0809 25.6414 30.0809 24.5008C30.0809 23.3602 29.1872 22.4355 28.0849 22.4355C26.9826 22.4355 26.0889 23.3602 26.0889 24.5008C26.0889 25.6414 26.9826 26.566 28.0849 26.566Z"
                    fill="#E0E0E0"
                  />
                  <path
                    d="M22.097 38.9566C30.9157 38.9566 38.0647 31.5595 38.0647 22.4348C38.0647 13.3101 30.9157 5.91309 22.097 5.91309C13.2782 5.91309 6.12921 13.3101 6.12921 22.4348C6.12921 31.5595 13.2782 38.9566 22.097 38.9566Z"
                    stroke="#E0E0E0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.1131 15.5508L22.097 21.058L30.0808 15.5508"
                    stroke="#E0E0E0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.105 32.0731C19.3692 31.204 20.4653 30.6963 22.097 30.6963C23.7287 30.6963 24.8248 31.204 26.0889 32.0731"
                    stroke="#E0E0E0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2034_5761">
                    <rect
                      width="42.5806"
                      height="44.058"
                      fill="white"
                      transform="translate(0.806641 0.40625)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={styles.btnText}>폭언, 욕설</div>
          </div>

          <div
            className={styles.basicBtn}
            onClick={() => handleReasonSelect("transaction")}
          >
            <div
              className={
                selectedReason === "transaction"
                  ? styles.selected
                  : styles.unSelected
              }
            >
              <svg
                width="44"
                className={styles.svgIcon}
                height="45"
                viewBox="0 0 44 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SmileyNervous" clip-path="url(#clip0_2034_5755)">
                  <path
                    id="Vector"
                    d="M21.968 38.9566C30.7868 38.9566 37.9358 31.5595 37.9358 22.4348C37.9358 13.3101 30.7868 5.91309 21.968 5.91309C13.1493 5.91309 6.00031 13.3101 6.00031 22.4348C6.00031 31.5595 13.1493 38.9566 21.968 38.9566Z"
                    stroke="#E0E0E0"
                    stroke-width="2"
                    stroke-miterlimit="10"
                  />
                  <path
                    id="Vector_2"
                    d="M15.9802 21.0582C17.0825 21.0582 17.9761 20.1335 17.9761 18.993C17.9761 17.8524 17.0825 16.9277 15.9802 16.9277C14.8778 16.9277 13.9842 17.8524 13.9842 18.993C13.9842 20.1335 14.8778 21.0582 15.9802 21.0582Z"
                    fill="#E0E0E0"
                  />
                  <path
                    id="Vector_3"
                    d="M27.956 21.0582C29.0583 21.0582 29.952 20.1335 29.952 18.993C29.952 17.8524 29.0583 16.9277 27.956 16.9277C26.8536 16.9277 25.96 17.8524 25.96 18.993C25.96 20.1335 26.8536 21.0582 27.956 21.0582Z"
                    fill="#E0E0E0"
                  />
                  <path
                    id="Vector_4"
                    d="M13.9842 29.3191C15.9802 29.3191 15.9802 26.5654 17.9761 26.5654C19.9721 26.5654 19.9721 29.3191 21.9681 29.3191C23.964 29.3191 23.964 26.5654 25.96 26.5654C27.956 26.5654 27.956 29.3191 29.9519 29.3191"
                    stroke="#E0E0E0"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2034_5755">
                    <rect
                      width="42.5806"
                      height="44.058"
                      fill="white"
                      transform="translate(0.677734 0.40625)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className={styles.btnText}>금전 거래 요청</div>
          </div>

          <div
            className={styles.basicBtn}
            onClick={() => handleReasonSelect("other")}
          >
            <div
              className={
                selectedReason === "other" ? styles.selected : styles.unSelected
              }
            >
              <svg
                className={styles.svgIcon}
                width="44"
                height="45"
                viewBox="0 0 44 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2034_5768)">
                  <path
                    d="M21.8391 38.9566C30.6579 38.9566 37.8069 31.5595 37.8069 22.4348C37.8069 13.3101 30.6579 5.91309 21.8391 5.91309C13.0204 5.91309 5.8714 13.3101 5.8714 22.4348C5.8714 31.5595 13.0204 38.9566 21.8391 38.9566Z"
                    stroke="#E0E0E0"
                    stroke-width="2"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M15.1859 27.9424H28.4924"
                    stroke="#E0E0E0"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.8513 21.0582C16.9536 21.0582 17.8472 20.1335 17.8472 18.993C17.8472 17.8524 16.9536 16.9277 15.8513 16.9277C14.7489 16.9277 13.8553 17.8524 13.8553 18.993C13.8553 20.1335 14.7489 21.0582 15.8513 21.0582Z"
                    fill="#E0E0E0"
                  />
                  <path
                    d="M27.8271 21.0582C28.9294 21.0582 29.823 20.1335 29.823 18.993C29.823 17.8524 28.9294 16.9277 27.8271 16.9277C26.7247 16.9277 25.8311 17.8524 25.8311 18.993C25.8311 20.1335 26.7247 21.0582 27.8271 21.0582Z"
                    fill="#E0E0E0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2034_5768">
                    <rect
                      width="42.5806"
                      height="44.058"
                      fill="white"
                      transform="translate(0.548828 0.40625)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={styles.btnText}>기타</div>
          </div>
        </div>
        <textarea
          className={styles.reportDetail}
          placeholder="신고 사유를 자세히 기입해주세요."
          value={reportDetails}
          onChange={(e) => setReportDetails(e.target.value)}
          maxLength={200}
        />
        <div className={styles.charCount}>{reportDetails.length}/200</div>
        <button
          type="submit"
          className={
            selectedReason && reportDetails
              ? styles.submitBtnb
              : styles.submitBtn
          }
        >
          신고하기
        </button>
      </form>
    </div>
  );
};

export default ReportModal;
