"use client";

import React, { useState } from "react";
import styles from "./chatReportModal.module.css";
import { useUser } from "@/app/utils/UserProvider";
import axios from "axios";
const ReportModal = ({ onReportClose }: { onReportClose: () => void }) => {
  // 버튼 선택 상태를 저장하는 상태
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [reportDetails, setReportDetails] = useState<string>("");
  const { ticketInfo, userInfo, globalTicketUUID } = useUser();

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
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/report`,
          reportData,
          { headers: { Authorization: `Bearer ${token}` } }
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
      <div>유명인과의 만남이 불편하셨나요?</div>
      <form onSubmit={handleSubmit} className={styles.ReportContainer}>
        <div className={styles["Report-Group"]}>
          <button
            type="button"
            className={`btn-basic ${
              selectedReason === "abuse" ? "selected" : ""
            }`}
            onClick={() => handleReasonSelect("abuse")}
          >
            폭언욕설
          </button>
          <button
            type="button"
            className={`btn-basic ${
              selectedReason === "transaction" ? "selected" : ""
            }`}
            onClick={() => handleReasonSelect("transaction")}
          >
            금전거래 요청
          </button>
          <button
            type="button"
            className={`btn-basic ${
              selectedReason === "other" ? "selected" : ""
            }`}
            onClick={() => handleReasonSelect("other")}
          >
            기타
          </button>
        </div>
        <input
          type="text"
          placeholder="상세 내용을 입력해주세요."
          value={reportDetails}
          onChange={(e) => setReportDetails(e.target.value)} // 입력 필드 상태 관리
        />
        <button type="submit" className="btn-basic">
          제출
        </button>
      </form>
    </div>
  );
};

export default ReportModal;
