import React, { useState } from "react";
import AWS from "aws-sdk";
import styles from "./reportModal.module.css";
import axios from "axios";
import { useUser } from "@/app/utils/UserProvider";

const ReportModal = ({ onReportClose, region, keyId, AccessKey}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(""); // S3에서 파일 URL을 저장하기 위한 상태
  const { globalTicketUUID } = useUser();
  const [ticketInfo, setTicketInfo] = useState({
    ticketReportContent: "",
  });

  const REGION = region;
  const ACCESS_KEY = keyId;
  const SECRET_ACCESS_KEY = AccessKey;

  AWS.config.update({
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // 직접 파일 객체 참조
    setSelectedFile(file);

    if (file) {
      try {
        // 파일 업로드 로직
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: "varwonimgbucket",
            Key: `upload/${Date.now()}-${file.name}`, // 파일 이름 설정을 보다 유니크하게 조정
            Body: file,
          },
        });

        const result = await upload.promise();

        setFileUrl(result.Location); // 업로드된 파일의 URL을 상태에 저장
      } catch (error) {
        console.error("File upload error:", error);
        onReportClose(); // 오류 발생 시에도 모달 닫기
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTicketInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 파일이 선택되지 않았거나 업로드 URL이 설정되지 않은 경우 함수를 종료합니다.
    if (!selectedFile || !fileUrl) {
      console.error("No file selected or file URL not set.");
      return;
    }

    try {
      const token = localStorage.getItem("Authorization");

      // API 요청 부분
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ticket/report`,
        {
          ticketUUID: globalTicketUUID,
          ticketReportContent: ticketInfo.ticketReportContent,
          ticketReportEvidenceUrl: fileUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        onReportClose(); // 모달 닫기 함수 호출
      }
    } catch (error) {
      console.error("API submission error:", error);
      onReportClose(); // 오류 발생 시에도 모달 닫기
    }
  };

  return (
    <div className={styles.ReportModal}>
      <div className={styles.ReportHeader}>유명인과의 만남이 불편하셨나요?</div>
      <form onSubmit={handleSubmit} className={styles.ReportContainer}>
        <input
          type="file"
          onChange={handleFileChange}
          className={styles.ReportInput}
        />
        <input
          type="text"
          name="ticketReportContent" // state에 맞는 name 속성 추가
          value={ticketInfo.ticketReportContent} // input 값이 state를 반영하도록 value 속성 추가
          placeholder="추가 정보 입력"
          onChange={handleInputChange} // input 값 변경을 handleInputChange 함수로 처리
          className={styles.ReportInput}
        />
        <button type="submit" className={styles.ReportButton}>
          제출
        </button>
      </form>
      <button onClick={onReportClose} className={styles.ReportCloseButton}>
        닫기
      </button>
    </div>
  );
};

export default ReportModal;
