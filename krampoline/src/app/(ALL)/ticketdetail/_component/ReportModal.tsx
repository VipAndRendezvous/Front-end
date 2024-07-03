"use client";

import React, { useState } from "react";
import styles from "./ReportModal.module.css";
import { useUser } from "@/app/utils/UserProvider";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import Image from "next/image";
import ProfilePic from "../../../../../public/user.png";
import axios from "axios";

const ReportModal = ({ onReportClose }: { onReportClose: () => void }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(""); // S3에서  파일 URL을 저장하기 위한 상태
  const [reportContent, setReportContent] = useState(""); // 사용자가 입력한 신고 내용을 관리할 상태
  const { ticketInfo, globalTicketUUID } = useUser();
  const [imgSrc, setImgSrc] = useState(ticketInfo.profile || ProfilePic);
  const [fileName, setFileName] = useState(""); // 파일 이름을 저장하기 위한 상태

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // 직접 파일 객체 참조
    if (file.size > 5242880) {
      // 5MB 제한
      alert("5MB 이하 파일만 올려주세요, 파일이 너무 큽니다.");
      return;
    }
    setSelectedFile(file);
    setFileName(file.name); // 파일 이름 설정

    if (file) {
      try {
        // 파일 업로드 로직
        const token = localStorage.getItem("Authorization");
        const formData = new FormData();
        formData.append("boardImg", file);
        const response = await HttpAuthInstance.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/s3/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setFileUrl(response.data); // 업로드된 파일의 URL을 상태에 저장
        }
      } catch (error) {
        console.error("File upload error:", error);
        onReportClose(); // 오류 발생 시에도 모달 닫기
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 폼 제출의 기본 동작 방지

    // 파일이 선택되지 않았거나 업로드 URL이 설정되지 않은 경우 함수를 종료합니다.
    if (!selectedFile || !fileUrl) {
      console.error("No file selected or file URL not set.");
      return;
    }

    try {
      const token = localStorage.getItem("Authorization");

      // API 요청 부분
      const response = await HttpAuthInstance.post(`/api/ticket/report`, {
        ticketUUID: globalTicketUUID,
        ticketReportContent: reportContent,
        ticketReportEvidenceUrl: fileUrl,
      });
      if (response.status === 200) {
        onReportClose(); // 모달 닫기 함수 호출
      }
    } catch (error) {
      console.error("API submission error:", error);
      onReportClose(); // 오류 발생 시에도 모달 닫기
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
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
        <div className={styles.ReportHeader}>
          유명인과의 만남이 불편하셨나요?
        </div>
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
        <div className={styles.fileInfoWrapper}>
          <div className={styles.fileInfoHead}>
            증명할 수 있는 사진을 첨부해주세요.
          </div>
          <div className={styles.fileInfoWarning}>(5MB 이내)</div>
        </div>
        <form onSubmit={handleSubmit} className={styles.ReportContainer}>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.fileInput}
            id="fileInput"
          />
          <label htmlFor="fileInput" className={styles.fileInputLabel}>
            + 사진 첨부
          </label>
          <span className={styles.fileName}>{fileName}</span>

          <textarea
            className={styles.reportDetail}
            placeholder="신고 사유를 기입해주세요."
            value={reportContent}
            onChange={handleInputChange}
            maxLength={200}
          />
          <div className={styles.charCount}>{reportContent.length}/200</div>
          <button
            type="submit"
            className={
              fileName && reportContent ? styles.submitBtnb : styles.submitBtn
            }
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
