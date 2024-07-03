"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import AuctionInfo_Img from "/public/detailInfo.png";
import AuctionInfo_warning from "/public/warningList.jpeg";
import ScrollToTopButton from "../../../_component/ScrollToTopButton";
import AuctionTicketInfo from "../../../_component/Auction/AuctionTicketInfo";
import TicketDetailMap from "../_component/TicketDetailMap";
import TicketBox from "../../../_component/TicketBox";
import TicketCancel from "../_component/TicketCancel";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useUser } from "@/app/utils/UserProvider";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import styles from "./page.module.css";

const Page = () => {
  const pathname = usePathname();
  const [currPath, setCurrPath] = useState("");
  const auctionInfoRef = useRef<HTMLDivElement | null>(null);
  const auctionWarningRef = useRef<HTMLDivElement | null>(null);
  const auctionMapRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { ticketInfo, setTicketInfo, setglobalTicketUUID } = useUser();
  const [ticketUUID, setTicketUUID] = useState("");
  const [selectedSection, setSelectedSection] = useState<string>("");

  useEffect(() => {
    setCurrPath(pathname);
    let extractedTicketUUID = pathname.replace("/ticketdetail/", "");
    setTicketUUID(extractedTicketUUID);
    setglobalTicketUUID(extractedTicketUUID);
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const extractedTicketUUID = pathname.replace("/ticketdetail/", "");
        const response = await HttpAuthInstance.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/ticket/${extractedTicketUUID}`
        );

        if (response.status === 200) {
          setTicketInfo(response.data);
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pathname]);

  const scrollToAuctionInfo = () => {
    if (auctionInfoRef.current) {
      const offsetTop =
        auctionInfoRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setSelectedSection("auctionInfo");
    }
  };

  const scrollToAuctionWarning = () => {
    if (auctionWarningRef.current) {
      const offsetTop =
        auctionWarningRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setSelectedSection("auctionWarning");
    }
  };

  const scrollToMapInfo = () => {
    if (auctionMapRef.current) {
      const offsetTop =
        auctionMapRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setSelectedSection("mapInfo");
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "500px",
      height: "100%",
      padding: "0",
      overflow: "hidden",
    },
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const cancelTicket = async (event) => {
    try {
      const response = await HttpAuthInstance.patch(
        `/api/ticket/cancel/${ticketUUID}`
      );
      if (response.status === 200) {
        console.log(response);
      } else {
        console.error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };
  console.log("여기", ticketInfo);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className={styles.rectangleParent}>
        <div className={styles.rectangle} />
        <div className={styles.header}>
          <div className={styles.headerWrapper}>
            {ticketInfo.organizerNickname}와의 식사권
            <button className={styles.CancelBtn} onClick={cancelTicket}>
              식사권 취소하기
            </button>
          </div>
        </div>
      </div>
      <div>
        <AuctionTicketInfo />
      </div>

      <div className={styles.MenuContainer}>
        <button
          className={
            selectedSection === "auctionInfo"
              ? styles.selected
              : styles.unselected
          }
          onClick={scrollToAuctionInfo}
        >
          경매 소개
        </button>
        <button
          className={
            selectedSection === "auctionWarning"
              ? styles.selected
              : styles.unselected
          }
          onClick={scrollToAuctionWarning}
        >
          경매 수칙
        </button>
        <button
          className={
            selectedSection === "mapInfo" ? styles.selected : styles.unselected
          }
          onClick={scrollToMapInfo}
        >
          식사 위치
        </button>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.section} ref={auctionInfoRef}>
          <div className={styles.rectangle1} />
          <div className={styles.subtitle}>이 만남은요,</div>
          <div
            dangerouslySetInnerHTML={{ __html: ticketInfo.meetingInfoText }}
          />
        </div>
        <div className={styles.section} ref={auctionWarningRef}>
          <div className={styles.rectangle2} />
          <div className={styles.subtitle}>이것만큼은 꼿 지켜주세요.</div>
          <div
            dangerouslySetInnerHTML={{ __html: ticketInfo.meetingPromiseText }}
          />
        </div>

        <div className={styles.map} ref={auctionMapRef}>
          <div className={styles.rectangle3} />
          <div className={styles.subtitle}>여기서 만나요.</div>
          <div className={styles.address}>{ticketInfo.meetingLocation}</div>
          <TicketDetailMap address={ticketInfo.meetingLocation} />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
      >
        <TicketCancel onClose={closeModal} />
      </Modal>
      <ScrollToTopButton />
    </div>
  );
};

export default Page;
