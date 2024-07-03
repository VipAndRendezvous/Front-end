"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./chat.module.css";
import ReportModal from "./ChatReportModal";
import Modal from "react-modal";
import TicketOwnerController from "../../ticketdetail/_component/TicketOwnerController";
import { useUser } from "@/app/utils/UserProvider";
import moment from "moment";

// 환경 변수 한 번만 참조하기
const NEXT_PUBLIC_WS_PROXY = process.env.NEXT_PUBLIC_WS_PROXY;

const useWebSocket = (chatRoomUUID) => {
  const webSocket = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (!chatRoomUUID) {
      console.log("chatRoomUUID is null, not opening WebSocket");
      return;
    }

    const token = localStorage.getItem("Authorization");
    const ws = new WebSocket(`${NEXT_PUBLIC_WS_PROXY}wss/chat`);
    const enterMsg = {
      accessToken: token,
      chatRoomUUID: chatRoomUUID,
      isChatMessage: false,
    };

    ws.onopen = () => {
      console.log("WebSocket Connected");
      ws.send(JSON.stringify(enterMsg));
    };

    ws.onmessage = (event) => {
      const messages = JSON.parse(event.data);
      setChatMessages((prev) => [
        ...prev,
        ...(Array.isArray(messages) ? messages : [messages]),
      ]);
    };

    ws.onclose = () => console.log("WebSocket Disconnected");
    ws.onerror = (error) => console.error("WebSocket Error:", error);

    webSocket.current = ws;

    return () => {
      console.log("Cleanup function called");
      ws.close();
      ws.onmessage = null;
      ws.onclose = null;
      ws.onerror = null;
    };
  }, [chatRoomUUID]);

  const sendMessage = useCallback((message) => {
    if (webSocket.current?.readyState === WebSocket.OPEN) {
      webSocket.current.send(JSON.stringify(message));
      console.log("message sent");
    }
  }, []); // 여기에서 webSocket.current의 변화를 추적할 필요가 없어졌습니다.

  return { chatMessages, sendMessage };
};

const Message = ({ message, isCurrentUser }) => {
  const messageClass = isCurrentUser
    ? styles.currentUserMessage
    : styles.otherUserMessage;

  const formattedTime = moment(message?.sendTime).format("YY-MM-DD HH:mm");
  return (
    <div className={styles.messageWrapper}>
      <div className={styles.messageSender}>
        {isCurrentUser ? "나" : message?.nickname || "Unknown"}
      </div>
      <div className={`${styles.message} ${messageClass}`}>
        <div className={styles.messageContent}>{message?.content || ""}</div>
      </div>
      <span className={styles.messageTime}>{formattedTime}</span>
    </div>
  );
};

const Chat = ({ chatRoomUUID }) => {
  const chatBodyRef = useRef(null);
  const [isOpenReportModal, setIsOpenReportModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [token, setToken] = useState(null);
  const { userInfo, isLoading } = useUser();
  const { chatMessages, sendMessage } = useWebSocket(chatRoomUUID);
  const { ticketInfo } = useUser();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("Authorization");
    setToken(tokenFromStorage);
  }, []);

  // 스크롤 아래로 이동하는 함수
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  // 채팅 메시지가 업데이트될 때마다 스크롤 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  if (isLoading || !chatRoomUUID || !userInfo) {
    return <div>Loading...</div>;
  }

  // 메시지 전송 함수
  const sendMSG = () => {
    if (token) {
      const message = {
        accessToken: token,
        chatRoomUUID: chatRoomUUID,
        message: inputValue,
        isChatMessage: true,
      };
      sendMessage(message);
      setInputValue("");
    } else {
      console.log("토큰이 없습니다. 로그인이 필요합니다.");
    }
  };

  // 다른 컴포넌트로 전환
  if (showChat) {
    return <TicketOwnerController />;
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.back} onClick={() => setShowChat(true)}>
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.512 5.862L5.986 0.402L7.26 1.704L3.102 5.862L7.26 10.034L5.986 11.322L0.512 5.862Z"
              fill="#333333"
            />
          </svg>
        </div>
        <div className={styles.FAQTitle}>
          {ticketInfo?.organizerNickname || "Unknown"} 채팅
        </div>
        <div
          onClick={() => setIsOpenReportModal(true)}
          className={styles.report}
        >
          신고
        </div>
      </div>
      <div className={styles.warningWrapper}>
        <div className={styles.warning}>
          채팅 내용은 상시 모니터링되고 있습니다. 상대에게 모욕감이나 불쾌감을
          줄 경우 제재를 받을 수 있습니다.
        </div>
      </div>
      <div className={styles.chatBody} ref={chatBodyRef}>
        {chatMessages.map((msg, index) => (
          <Message
            key={index}
            message={msg}
            isCurrentUser={msg?.nickname === userInfo?.nickname}
          />
        ))}
      </div>
      <div className={styles.chatFooter}>
        <textarea
          className={styles.messageInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMSG()}
          placeholder="내용을 입력해주세요"
        />
        <button onClick={sendMSG} className={styles.sendButton}>
          전송
        </button>
      </div>
      <Modal
        isOpen={isOpenReportModal}
        onRequestClose={() => setIsOpenReportModal(false)}
        className={styles.modalContent}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
      >
        <ReportModal onReportClose={() => setIsOpenReportModal(false)} />
      </Modal>
    </div>
  );
};

export default Chat;
