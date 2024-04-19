"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styles from "./ticketOwnerController.module.css";
import Meet from "./Meet";
import ReportModal from "./ReportModal";
import ReviewModal from "./ReviewModal";
import Link from "next/link";
import Chat from "../../chat/_component/Chat";
import axios from "axios";
import { useUser } from "@/app/utils/UserProvider";
//---------------------------------------------------------------- 알림 열고 닫기
const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.AddAuctionSelect} onClick={toggleOpen}>
        <div>{question}</div>
        <div>{isOpen ? "-" : "+"}</div>
      </div>
      {isOpen && <div className={styles.AddAuctionText}>{answer}</div>}
    </>
  );
};
//----------------------------------------------------------------

const TicketOwnerController = ({region, keyId, AccessKey}) => {
  const [isOpenMeetModal, setIsOpenMeetModal] = useState<boolean>(false); // Meet 모달 상태
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<boolean>(false); // Report 모달 상태
  const [isOpenReportModal, setIsOpenReportModal] = useState<boolean>(false); // Report 모달 상태
  const [meetingInProgress, setMeetingInProgress] = useState(false);
  const [showReviewButton, setShowReviewButton] = useState(false);
  const [reviewWritten, setReviewWritten] = useState(false); // 후기 작성 상태
  const [showChat, setShowChat] = useState(false);
  //----------------------------------------------------------------
  //----------------------------------------------------------------알림 열고 닫기 내용
  const faqs = [
    {
      question: "중요한 알림",
      answer: (
        <div>
          <li>
            &quot;만났어요&quot; 버튼을 눌러 만남 시간을 정확히 측정해 주세요.
          </li>
          <li>버튼을 누르지 않아 발생하는 불이익은 사용자의 책임입니다.</li>
        </div>
      ),
    },
    {
      question: "유의 사항",
      answer: (
        <div>
          <li>사적인 질문 금지</li>
          <li>개인정보를 묻는 질문은 자제해 주세요.</li>
          <li>금전 요구 금지</li>
          <li>금전적 요구를 할 경우, 제재를 받을 수 있습니다.</li>
          <li>예의를 지켜주세요</li>
          <li>
            폭언 및 음담패설로 상대방에게 불쾌감을 주는 행동은 제재 받을 수
            있습니다.
          </li>
        </div>
      ),
    },
    {
      question: "만남 시간 보장 관련",
      answer: (
        <div>
          <li>
            사용자의 귀책 사유로 인해 약속된 최소 만남 시간을 채우지 못할 경우
          </li>
          <li>-VIP: 낙찰금은 사용자에게 전액 환불됩니다.</li>
          <li>-사용자: 해당 시간은 보장되지 않으며, 환불이 불가능합니다.</li>
        </div>
      ),
    },
    {
      question: "경고",
      answer: (
        <div>
          <li>
            &quot;만났어요&quot; 버튼을 허위로 조작할 경우, 법적 조치가 이루어질
            수 있습니다.
          </li>
          <li>허위 신고는 강력한 법적 조치가 이루어집니다.</li>
          <li>
            현행 법률 상 범법 행위의 경우에는 그 사안에 따라 처벌 받을 수도
            있습니다.
          </li>
        </div>
      ),
    },
  ];

  //----------------------------------------------------------------
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

  // Report 모달을 닫는 함수
  const closeReportModal = () => {
    setIsOpenReportModal(false);
  };

  // "만났어요" 버튼 클릭 시 Meet 모달 열기
  const openMeetModal = () => {
    setIsOpenMeetModal(true);
  };

  // "신고" 버튼 클릭 시 Report 모달 열기
  const openReportModal = () => {
    setIsOpenReportModal(true);
  };

  const twoHoursInMs = 10 * 1000;
  const [timeLeft, setTimeLeft] = useState(twoHoursInMs);

  //---------------------- 시간을 hh:mm:ss 형식으로 변환
  const formatTime = (time: number) => {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  //----------------------------------------------------------------

  //----------------------------------------------------------------
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const { globalTicketUUID } = useUser();
  const checkingMeeting = async () => {
    if (!globalTicketUUID) {
      console.error("globalTicketUUID is not available.");
      return;
    }
    try {
      const token = localStorage.getItem("Authorization");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ticket/checkTime/${globalTicketUUID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        startMeeting();
        console.log(response);
      } else {
        console.error("Failed to submit report");
      }
    } catch (error) {
      console.error("'만났어요' 버튼에 대한 API 호출 중 예외 발생:", error);
      setMeetingInProgress(false); // 버튼 활성화 상태 복원
      if (error.response.data.code === "6201") {
        alert(
          "아직 상대방이 만남시작을 하지 않았습니다. 시작하면 새로고침을 해주세요"
        );
      }
    }
  };

  const handleMetButtonClick = async () => {
    if (!globalTicketUUID) {
      console.error("globalTicketUUID is not available.");
      return;
    }
    setMeetingInProgress(true);
    try {
      const token = localStorage.getItem("Authorization");
      const currentIsoTime = new Date().toISOString();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ticket/checkTime`,
        { ticketUUID: globalTicketUUID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        startMeeting();
        console.log(response);
        checkingMeeting();
      } else {
        console.error("Failed to submit report");
      }
    } catch (error) {
      console.error("'만났어요' 버튼에 대한 API 호출 중 예외 발생:", error);
      setMeetingInProgress(false); // 버튼 활성화 상태 복원
    }
  };

  const startMeetingWithTimer = (startMeetingTime) => {
    // 타이머를 시작하는 로직
    const startTime = new Date(startMeetingTime).getTime();
    const currentTime = Date.now();
    const remainingTime = startTime > currentTime ? startTime - currentTime : 0;

    setMeetingInProgress(true);
    setIsOpenMeetModal(false); // 모달 닫기

    // 기존 타이머가 있으면 클리어
    if (timerId.current) {
      clearInterval(timerId.current);
    }

    // 카운트다운 시작
    timerId.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        const updatedTime = prevTime - 1000;
        if (updatedTime <= 0) {
          // 타이머가 0이 되면, 후기 쓰기 버튼을 보이게 하고 타이머 정지
          setShowReviewButton(true);
          clearInterval(timerId.current);
          timerId.current = null;
          setMeetingInProgress(false);
          return 0;
        }
        return updatedTime;
      });
    }, 1000);

    setTimeLeft(remainingTime); // remainingTime으로 타이머 초기 설정
  };
  console.log(globalTicketUUID);

  useEffect(() => {
    if (globalTicketUUID) {
      checkingMeeting();
    }
  }, [globalTicketUUID]);

  const startMeeting = () => {
    setMeetingInProgress(true);
    setIsOpenMeetModal(false); // 모달 닫기

    // 기존 타이머가 있으면 클리어
    if (timerId.current) {
      clearInterval(timerId.current);
    }

    // 카운트다운 시작
    timerId.current = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        const updatedTime: number = prevTime - 1000;
        if (updatedTime <= 0) {
          // 타이머가 0이 되면, 후기 쓰기 버튼을 보이게 하고 타이머 정지
          setShowReviewButton(true);
          if (timerId.current) clearInterval(timerId.current);
          setMeetingInProgress(false);
          return 0;
        }
        return updatedTime;
      });
    }, 1000);
  };

  useEffect(() => {
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, []);

  const handleWriteReview = () => {
    setReviewWritten(true); // 후기 작성 완료 상태로 업데이트
  };
  //----------------------------------------------------------------
  if (showChat) {
    return <Chat region={region} keyId={keyId} AccessKey={AccessKey}/>;
  }
  //----------------------------------------------------------------
  return (
    <div className={styles.TicketControllerWrapper}>
      <div>
        <div>
          <div className={styles.FAQTitle}></div>
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
      <div className={styles.TicketInfoWrapper}>
        <div>
          <div>만남 시간</div>
          <div>{formatTime(timeLeft)}</div>
        </div>
        <div className={styles.TicketInfoButtonContainer}>
          {!showReviewButton && !reviewWritten && (
            <button
              className="btn-basic"
              onClick={handleMetButtonClick}
              disabled={meetingInProgress}
            >
              {meetingInProgress ? "만나는 중..." : "만났어요"}
            </button>
          )}
          {showReviewButton && !reviewWritten && (
            <button className="btn-basic" onClick={openReviewModal}>
              후기 쓰기
            </button>
          )}
          {reviewWritten && (
            <button className="btn-basic" disabled>
              후기 작성 완료
            </button> // 후기 작성 완료 상태를 표시
          )}
          <button className="btn-basic" onClick={openReportModal}>
            신고
          </button>
          <button className="btn-basic" onClick={openReviewModal}>
            후기 쓰기
          </button>
        </div>
        <div>
          <button
            className="btn-basic"
            disabled={reviewWritten}
            onClick={toggleChat}
          >
            채팅하기
          </button>
        </div>

        <Modal
          className={styles["modal-content"]}
          isOpen={isOpenReviewModal}
          onRequestClose={closeReviewModal}
          ariaHideApp={false}
          overlayClassName={styles["modal-overlay"]}
        >
          <div className={styles["modal-inner-content"]}>
            <ReviewModal
              onReViewClose={closeReviewModal}
              handleWriteReview={handleWriteReview}
            />
          </div>
        </Modal>

        <Modal
          className={styles["modal-content"]}
          isOpen={isOpenReportModal}
          onRequestClose={closeReportModal}
          ariaHideApp={false}
          overlayClassName={styles["modal-overlay"]}
        >
          <div className={styles["modal-inner-content"]}>
            <ReportModal onReportClose={closeReportModal}
                         region={region} keyId={keyId} AccessKey={AccessKey}
            />
          </div>
        </Modal>
        <Modal
          className={styles["modal-content"]}
          isOpen={isOpenMeetModal}
          onRequestClose={closeMeetModal}
          ariaHideApp={false}
          overlayClassName={styles["modal-overlay"]}
        >
          <div className={styles["modal-inner-content"]}>
            <Meet onMeetingStart={startMeeting} />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TicketOwnerController;
