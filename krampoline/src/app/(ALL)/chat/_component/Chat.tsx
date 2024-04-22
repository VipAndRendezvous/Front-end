"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./chat.module.css";
import ReportModal from "./ChatReportModal";
import Modal from "react-modal";
import TicketOwnerController from "../../ticketdetail/_component/TicketOwnerController";
import { useUser } from "@/app/utils/UserProvider";

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

  return (
    <div className={`${styles.message} ${messageClass}`}>
      <div className={styles.messageSender}>
        {isCurrentUser ? "나" : message.nickname}
      </div>
      <div className={styles.messageContent}>{message.content}</div>
      <div className={styles.messageMetadataTalk}>
        <span>{message.sendTime}</span>
      </div>
    </div>
  );
};

const Chat = () => {
  const chatBodyRef = useRef(null);
  const [isOpenReportModal, setIsOpenReportModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [token, setToken] = useState(null);
  const { globalTicketUUID, userInfo, isLoading } = useUser();
  const { chatMessages, sendMessage } = useWebSocket(
    globalTicketUUID.chatRoomUUID
  );

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
  if (isLoading || !globalTicketUUID || !userInfo) {
    return <div>Loading...</div>;
  }
  // 메시지 전송 함수
  const sendMSG = () => {
    if (token) {
      const message = {
        accessToken: token,
        chatRoomUUID: globalTicketUUID.chatRoomUUID,
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
        <button
          onClick={() => setShowChat(true)}
          className={styles["btn-basic"]}
        >
          뒤로가기
        </button>
        <button
          onClick={() => setIsOpenReportModal(true)}
          className="btn-basic"
        >
          신고하기
        </button>
      </div>
      <div className={styles.chatBody} ref={chatBodyRef}>
        {chatMessages.map((msg, index) => (
          <Message
            key={index}
            message={msg}
            isCurrentUser={msg.nickname === userInfo.nickname}
          />
        ))}
      </div>
      <div className={styles.chatFooter}>
        <input
          type="text"
          className={styles.messageInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMSG()}
        />
        <button onClick={sendMSG} className="btn-basic">
          보내기
        </button>
      </div>
      <Modal
        isOpen={isOpenReportModal}
        onRequestClose={() => setIsOpenReportModal(false)}
        className={styles["modal-content"]}
        overlayClassName={styles["modal-overlay"]}
        ariaHideApp={false}
      >
        <ReportModal onReportClose={() => setIsOpenReportModal(false)} />
      </Modal>
    </div>
  );
};

export default Chat;
