"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styles from "./ticketOwnerController.module.css";
import Meet from "./Meet";
import ReportModal from "./ReportModal";
import ReviewModal from "./ReviewModal";
import Chat from "../../chat/_component/Chat";
import { useUser } from "@/app/utils/UserProvider";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";

const TicketOwnerController = () => {
  const [isOpenMeetModal, setIsOpenMeetModal] = useState<boolean>(false);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<boolean>(false);
  const [isOpenReportModal, setIsOpenReportModal] = useState<boolean>(false);
  const [meetingInProgress, setMeetingInProgress] = useState(false);
  const [showReviewButton, setShowReviewButton] = useState(false);
  const [reviewWritten, setReviewWritten] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { ticketInfo, setTicketInfo, setglobalTicketUUID, globalTicketUUID } =
    useUser();

  const toggleChat = () => {
    setShowChat(true);
  };

  const closeReviewModal = () => {
    setIsOpenReviewModal(false);
  };

  const openReviewModal = () => {
    setIsOpenReviewModal(true);
  };

  const closeMeetModal = () => {
    setIsOpenMeetModal(false);
  };

  const closeReportModal = () => {
    setIsOpenReportModal(false);
  };

  const openMeetModal = () => {
    setIsOpenMeetModal(true);
  };

  const openReportModal = () => {
    setIsOpenReportModal(true);
  };

  const [timeLeft, setTimeLeft] = useState(0);

  const formatTime = (time: number) => {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (meetingInProgress) {
      timerId.current = setInterval(() => {
        setTimeLeft((prevTime: number) => {
          const updatedTime: number = prevTime - 1000;
          if (updatedTime <= 0) {
            setShowReviewButton(true);
            if (timerId.current) clearInterval(timerId.current);
            setMeetingInProgress(false);
            return 0;
          }
          return updatedTime;
        });
      }, 1000);
    }
    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, [meetingInProgress]);

  const handleMetButtonClick = async () => {
    if (!globalTicketUUID) {
      console.error("globalTicketUUID is not available.");
      return;
    }
    setMeetingInProgress(true);
    try {
      const token = localStorage.getItem("Authorization");
      const response = await HttpAuthInstance.post(`/api/ticket/checkTime`, {
        ticketUUID: globalTicketUUID,
      });
      console.log(response);
      if (response.status === 200) {
        setIsOpenMeetModal(false);
        checkMeetingTime();
      } else {
        handleErrors(response);
      }
    } catch (error) {
      console.error("Error starting meeting:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === "6300"
      ) {
        setIsOpenMeetModal(false);
        checkMeetingTime();
      } else {
        handleErrors(error.response);
        setMeetingInProgress(false);
      }
    }
  };

  const checkMeetingTime = async () => {
    try {
      const checkRes = await HttpAuthInstance.get(
        `/api/ticket/checkTime/${globalTicketUUID}`
      );
      if (checkRes.status === 200) {
        console.log(checkRes.data.startMeetingTime);
        const startTime = new Date(checkRes.data.startMeetingTime).getTime(); // Fix this line
        console.log(startTime);
        const endTime = startTime + 2 * 60 * 60 * 1000;
        console.log(endTime);
        const currentTime = Date.now();
        console.log(currentTime);
        const remainingTime = endTime - currentTime;
        console.log(remainingTime);
        setTimeLeft(remainingTime > 0 ? remainingTime : 0);
        console.log(timeLeft);
      }
    } catch (error) {
      console.error("Error checking meeting time:", error);
      handleErrors(error.response);
    }
  };

  const handleEndMeetingClick = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
    }
    setShowReviewButton(true);
    setMeetingInProgress(false);
  };

  const handleWriteReview = () => {
    setReviewWritten(true);
  };

  const handleErrors = (response) => {
    const errorCode = response.data.code;
    switch (errorCode) {
      case "6001":
      case "6002":
        alert("잘못된 형식의 식사권 시작입니다.");
        break;
      case "0101":
        alert("식사권에 대한 권한이 없습니다.");
        break;
      case "6200":
        alert("식사권 정보 조회에 실패했습니다. 잠시 후 다시 시도해주세요.");
        break;
      case "1201":
        alert("사용자 조회에 실패했습니다. 잠시 후 다시 시도해주세요.");
        break;
      case "6201":
        alert(
          "아직 상대방이 만남을 시작하지 않았습니다. 시작 후 다시 시도해주세요."
        );
        break;
      default:
        alert("알 수 없는 에러가 발생했습니다.");
    }
    setMeetingInProgress(false);
  };

  if (showChat) {
    return <Chat chatRoomUUID={ticketInfo.chatRoomUUID} />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.TicketControllerWrapper}>
      <div className={styles.header}>
        <div className={styles.FAQTitle}>안녕</div>
      </div>
      <div className={styles.TicketInfoWrapper}>
        <div className={styles.Ainfo}>
          <div className={styles.title}>
            <div className={styles.emoji}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2034_5485)">
                  <path
                    d="M6 12C6 12.5304 6.21071 13.0391 6.58579 13.4142C6.96086 13.7893 7.46957 14 8 14C8.53043 14 9.03914 13.7893 9.41421 13.4142C9.78929 13.0391 10 12.5304 10 12"
                    stroke="#949597"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.5 1.5C12.4655 2.11607 13.2486 2.97925 13.7681 4"
                    stroke="#949597"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.23193 4C2.75141 2.97925 3.53453 2.11607 4.50006 1.5"
                    stroke="#949597"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.49992 7C3.49992 5.80653 3.97403 4.66193 4.81794 3.81802C5.66186 2.97411 6.80645 2.5 7.99992 2.5C9.1934 2.5 10.338 2.97411 11.1819 3.81802C12.0258 4.66193 12.4999 5.80653 12.4999 7C12.4999 9.23875 13.0187 10.5375 13.4312 11.25C13.475 11.3259 13.4981 11.4119 13.4982 11.4996C13.4982 11.5872 13.4753 11.6733 13.4316 11.7492C13.3879 11.8252 13.3251 11.8883 13.2493 11.9324C13.1735 11.9764 13.0875 11.9997 12.9999 12H2.99992C2.91241 11.9995 2.82657 11.976 2.75098 11.9319C2.67539 11.8878 2.61269 11.8246 2.56916 11.7487C2.52564 11.6728 2.5028 11.5868 2.50293 11.4992C2.50306 11.4117 2.52616 11.3258 2.56992 11.25C2.9818 10.5375 3.49992 9.23813 3.49992 7Z"
                    stroke="#949597"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2034_5485">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={styles.subtitle}>중요한 알림</div>
            <div className={styles.rectangle1} />
          </div>
          <div className={styles.InfoWrapper}>
            <div className={styles.InfoOne}>
              [만났어요] 버튼을 눌러 만남 시간을 정확히 측정해 주세요.
            </div>
            <div className={styles.InfoWarning}>
              버튼을 누르지 않아 발생하는 불이익을 사용자의 책임입니다.
            </div>
          </div>
        </div>
      </div>
      <div className={styles.TicketInfoWrapper}>
        <div className={styles.Ainfo}>
          <div className={styles.title}>
            <div className={styles.emoji}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2034_5471)">
                  <path
                    d="M5.5 8.5L7 10L10.5 6.5"
                    stroke="#949597"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V13C2.5 13.2761 2.72386 13.5 3 13.5H13C13.2761 13.5 13.5 13.2761 13.5 13V3C13.5 2.72386 13.2761 2.5 13 2.5Z"
                    stroke="#949597"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2034_5471">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={styles.subtitle}>유의 사항</div>
            <div className={styles.rectangle2} />
          </div>
          <div className={styles.InfoWrapper}>
            <div className={styles.InfoOne}>사적인 질문은 금지</div>
            <div className={styles.InfoWarning}>
              개인정보를 묻는 질문은 자제해 주세요.
            </div>
            <div className={styles.InfoOne}>금전 요구 금지</div>
            <div className={styles.InfoWarning}>
              금전적 요구를 할 경우, 제재를 받을 수 있습니다.{" "}
            </div>
            <div className={styles.InfoOne}>예의를 지켜주세요</div>
            <div className={styles.InfoWarning}>
              폭언 및 음담패설로 상대방에게 불쾌감을 주는 행동은 제재 받을 수
              있습니다.
            </div>
          </div>
        </div>
      </div>
      <div className={styles.TicketInfoWrapper}>
        <div className={styles.Ainfo}>
          <div className={styles.title}>
            <div className={styles.emoji}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 8L4.2 5.15C4.1379 5.10343 4.0875 5.04303 4.05279 4.97361C4.01807 4.90418 4 4.82762 4 4.75V2.5C4 2.36739 4.05268 2.24021 4.14645 2.14645C4.24021 2.05268 4.36739 2 4.5 2H11.5C11.6326 2 11.7598 2.05268 11.8536 2.14645C11.9473 2.24021 12 2.36739 12 2.5V4.7275C11.9998 4.80459 11.9817 4.88059 11.9472 4.94955C11.9127 5.0185 11.8628 5.07855 11.8013 5.125L8 8Z"
                  stroke="#949597"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8L4.2 10.85C4.1379 10.8966 4.0875 10.957 4.05279 11.0264C4.01807 11.0958 4 11.1724 4 11.25V13.5C4 13.6326 4.05268 13.7598 4.14645 13.8536C4.24021 13.9473 4.36739 14 4.5 14H11.5C11.6326 14 11.7598 13.9473 11.8536 13.8536C11.9473 13.7598 12 13.6326 12 13.5V11.2725C12 11.1952 11.982 11.119 11.9475 11.0498C11.913 10.9806 11.8629 10.9203 11.8013 10.8737L8 8Z"
                  stroke="#949597"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 4H12"
                  stroke="#949597"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={styles.subtitle}>만남 시간 보장 관련 사항</div>
            <div className={styles.rectangle3} />
          </div>
          <div className={styles.InfoWrapper}>
            <div className={styles.InfoOne}>
              사용자의 귀책 사유로 인해 약속된 최소 만남 시간(n시간)을 채우지
              못할 경우
              <ul className={styles.vip}>
                <li className={styles.vip1}>
                  <span>VIP : 낙찰금은 사용자에게 전액 환불됩니다.</span>
                </li>
                <li>
                  <span>
                    사용자 : 해당 시간은 보장되지 않으며 환불이 불가능합니다.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.TicketInfoWrapper}>
        <div className={styles.Ainfo}>
          <div className={styles.title}>
            <div className={styles.emoji}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V13C2.5 13.2761 2.72386 13.5 3 13.5H13C13.2761 13.5 13.5 13.2761 13.5 13V3C13.5 2.72386 13.2761 2.5 13 2.5Z"
                  stroke="#949597"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 6L6 10"
                  stroke="#949597"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L10 10"
                  stroke="#949597"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={styles.subtitle}>경고</div>
            <div className={styles.rectangle4} />
          </div>
          <div className={styles.InfoWrapper1}>
            <div className={styles.InfoOne}>
              <p className={styles.p}>
                [만났어요] 버튼을 허위로 조작할 경우, 법적 조치가 이루어질 수
                있습니다.
              </p>
              <p className={styles.p}>
                허위신고는 강력한 법적 조치가 이루어 집니다.
              </p>
            </div>
            <div className={styles.InfoWarning}>
              현행 법률 상 범법 행위의 경우에는 그 사안에 따라 처벌 받을 수도
              있습니다.
            </div>
          </div>
        </div>
      </div>
      {timeLeft === 0 ? (
        <div className={styles.dma}>만남 시간이 종료되었습니다.</div>
      ) : (
        <div className={styles.dma}>만남 시간 {formatTime(timeLeft)}</div>
      )}
      {!showReviewButton && !reviewWritten && (
        <div
          className={styles.TicketMeetButtonContainer}
          onClick={
            timeLeft === 0
              ? openReportModal
              : meetingInProgress
              ? handleEndMeetingClick
              : handleMetButtonClick
          }
        >
          {timeLeft === 0
            ? "신고할게요"
            : meetingInProgress
            ? "식사 종료하기"
            : "만났어요"}
        </div>
      )}
      <div className={styles.wrapper}>
        <div
          className={styles.chattingWrapper}
          onClick={
            showReviewButton && !reviewWritten ? openReviewModal : toggleChat
          }
        >
          {showReviewButton && !reviewWritten ? "후기 등록하기" : "채팅하기"}
        </div>
      </div>
      <Modal
        isOpen={isOpenReviewModal}
        onRequestClose={closeReviewModal}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <ReviewModal onReViewClose={closeReviewModal} />
      </Modal>
      <Modal
        isOpen={isOpenReportModal}
        onRequestClose={closeReportModal}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <ReportModal onReportClose={closeReportModal} />
      </Modal>
    </div>
  );
};

export default TicketOwnerController;
