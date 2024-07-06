"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./auctionPlayModal.module.css";
import { useUser } from "@/app/utils/UserProvider";

type BidMessage = {
  bidderNickname: string;
  bidAmount: number;
  participateBidTime: string;
};

type UserInfo = {
  auctionCreatedTime: string;
  auctionUUID: string;
  currentHighestBidAmount: number;
  meetingDate: string;
  meetingInfoText: string;
  meetingLocation: string;
  meetingPromiseText: string;
  vipNickname: string;
  vipProfileImgUrl: string;
  vipRating: number;
  vipUUID: string;
};

const AuctionPlayModal = ({ closeModal, VipInfo }) => {
  const { userInfo } = useUser();
  const webSocket = useRef<WebSocket | null>(null);
  const [bidMessages, setBidMessages] = useState<BidMessage[]>([]);
  const [HighestBidAmount, setHighestBidAmount] = useState<number>(0);
  const [currentHighestBidAmount, setCurrentHighestBidAmount] =
    useState<number>(() => calculateNewBid(VipInfo.currentHighestBidAmount));

  const baseurl = process.env.NEXT_PUBLIC_WS_PROXY;
  const token = localStorage.getItem("Authorization");

  function calculateNewBid(currentBid: number) {
    if (currentBid < 1000000) {
      return currentBid + 100000;
    } else if (currentBid < 3000000) {
      return currentBid + 100000;
    } else if (currentBid < 5000000) {
      return currentBid + 200000;
    } else if (currentBid < 10000000) {
      return currentBid + 300000;
    } else if (currentBid < 30000000) {
      return currentBid + 500000;
    } else if (currentBid < 50000000) {
      return currentBid + 1000000;
    } else if (currentBid < 100000000) {
      return currentBid + 2000000;
    } else if (currentBid < 200000000) {
      return currentBid + 3000000;
    } else {
      return currentBid + 5000000;
    }
  }

  useEffect(() => {
    const ws = new WebSocket(`${baseurl}wss/bid`);

    const enterMsg = {
      accessToken: token,
      auctionUUID: VipInfo.auctionUUID,
      isBidMessage: false,
    };

    ws.onopen = () => {
      console.log("WebSocket Connected");
      ws.send(JSON.stringify(enterMsg));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.bidLogs) {
        setBidMessages(data.bidLogs.slice(0, 10));
        setHighestBidAmount(data.currentHighestBidAmount);
        setCurrentHighestBidAmount(
          calculateNewBid(data.currentHighestBidAmount)
        );
        if (data.isBidMessage) {
          alert("성공적으로 입찰하셨습니다.");
        }
      } else if (data.code === "2100") {
        alert("입찰 권한이 없습니다.");
      } else {
        console.error("Invalid data received:", data);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    webSocket.current = ws;

    return () => {
      console.log("Cleanup function called");
      ws.close();
    };
  }, [baseurl, token, VipInfo.auctionUUID]);

  const bid = () => {
    console.log("Bid function called");

    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      const bidMsg = {
        accessToken: token,
        auctionUUID: VipInfo.auctionUUID,
        price: currentHighestBidAmount,
        isBidMessage: true,
      };

      webSocket.current.send(JSON.stringify(bidMsg));
      console.log("Bid message sent");
    } else {
      console.error("WebSocket is not open");
    }
  };

  const handleModalClose = () => {
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      webSocket.current.close();
    }
    closeModal();
  };

  function formatNumber(value: number) {
    return value.toLocaleString();
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.close} onClick={handleModalClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
        >
          <path
            d="M6.71743 20.8599C6.52216 21.0551 6.52216 21.3717 6.71743 21.567C6.91269 21.7622 7.22927 21.7622 7.42453 21.567L6.71743 20.8599ZM20.8596 6.71774L6.71743 20.8599L7.42453 21.567L21.5667 7.42484L20.8596 6.71774Z"
            fill="#333333"
          />
          <path
            d="M20.8596 21.5674C21.0548 21.7627 21.3714 21.7627 21.5667 21.5674C21.7619 21.3722 21.7619 21.0556 21.5667 20.8603L20.8596 21.5674ZM21.5667 20.8603L7.42453 6.71818L6.71743 7.42528L20.8596 21.5674L21.5667 20.8603Z"
            fill="#333333"
          />
        </svg>
      </div>
      <div className={styles.header}>VIP {VipInfo.vipNickname}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="468"
        height="2"
        viewBox="0 0 468 2"
        fill="none"
      >
        <path d="M0 1L468 1.00004" stroke="#333333" strokeWidth="2" />
      </svg>
      <div className={styles.nowprice}>
        <div className={styles.text}>현재가</div>
        <div className={styles.point}>{formatNumber(HighestBidAmount)}</div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="468"
        height="2"
        viewBox="0 0 468 2"
        fill="none"
      >
        <path d="M0 1L468 1.00004" stroke="#333333" strokeWidth="2" />
      </svg>
      <div className={styles.havePoint}>
        <div className={styles.text}>보유포인트</div>
        <div className={styles.point}>{formatNumber(userInfo.point)}</div>
      </div>
      <button className={styles.BidButton} onClick={bid}>
        {formatNumber(currentHighestBidAmount)} P 입찰하기
      </button>
      <div className={styles.policy}>
        <li> 응찰하기 버튼을 누르면 취소가 불가능 합니다.</li>
        <li>동시 응찰자 경우 서버 시각(KST) 기준으로 우선순위가 부여됩니다.</li>
      </div>
      <div className={styles.BidLogContainer}>
        <div className={styles.BidLogTitle}>경매 로그</div>

        {bidMessages.length > 0 ? (
          bidMessages.map((msg, index) => (
            <div key={index} className={styles.BidLog}>
              <div className={styles.BidLogWarp}>
                <div className={styles.BidLogPic}></div>
                <div className={styles.BidLogText}>
                  {`${msg.bidderNickname} 님이 ${formatNumber(
                    msg.bidAmount
                  )}P 로 입찰을
                  진행했습니다.`}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.EmptyBidLog}>아직 경매한 사람이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default AuctionPlayModal;
