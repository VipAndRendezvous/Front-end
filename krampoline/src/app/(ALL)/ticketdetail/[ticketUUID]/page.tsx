"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
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

const Page = () => {
  const pathname = usePathname();
  const [currPath, setCurrPath] = useState("");
  const auctionInfoRef = useRef<HTMLDivElement | null>(null);
  const auctionWarningRef = useRef<HTMLDivElement | null>(null);
  const auctionMapRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); //추가
  const [isLoading, setIsLoading] = useState(true);
  const { ticketInfo, setTicketInfo, setglobalTicketUUID } = useUser();
  const [ticketUUID, setTicketUUID] = useState("");

  useEffect(() => {
    setCurrPath(pathname);
    let extractedTicketUUID = pathname.replace("/ticketdetail/", "");
    setTicketUUID(extractedTicketUUID);
    setglobalTicketUUID(extractedTicketUUID); // Update ticketUUID state here
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Extract ticketUUID from pathname
        const extractedTicketUUID = pathname.replace("/ticketdetail/", "");

        // Make API call with extracted ticketUUID
        const token = localStorage.getItem("Authorization");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/ticket/${extractedTicketUUID}`,
          { headers: { Authorization: `Bearer ${token}` } }
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

    fetchData(); // Call fetchData immediately after component mounts
  }, [pathname]); // Run useEffect whenever pathname changes

  const scrollToAuctionInfo = () => {
    if (auctionInfoRef.current) {
      // auctionInfoRef.current가 존재하는지 확인
      auctionInfoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAuctionWarning = () => {
    if (auctionWarningRef.current) {
      // auctionWarningRef.current가 존재하는지 확인
      auctionWarningRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToMapInfo = () => {
    if (auctionMapRef.current) {
      auctionMapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  //----------------------------------------------------------------

  // Modal 스타일
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

  // 검색 클릭
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsOpen(false);
  };
  //----------------------------------------------------------------
  const cancelTicket = async (event) => {
    try {
      const token = localStorage.getItem("Authorization");
      const response = await axios.patch(
        `${process.env.EXT_PUBLIC_NEXT_PUBLIC_BASE_URL}/api/ticket/cancel/${ticketUUID}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
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

  //----------------------------------------------------------------
  return (
    <div>
      <div>
        <AuctionTicketInfo />
      </div>
      <div>
        <div className="AuctionInfo-btn-Container">
          <button className="btn-basic" onClick={scrollToAuctionInfo}>
            이 만남은 이런거에요
          </button>
          <button className="btn-basic" onClick={scrollToAuctionWarning}>
            이것 만큼은 지켜주세요
          </button>
          <button className="btn-basic" onClick={scrollToMapInfo}>
            지도
          </button>
        </div>
        <button className="btn-basic" onClick={cancelTicket}>
          식사권 취소하기
        </button>
      </div>
      <div ref={auctionInfoRef}>
        <Image src={AuctionInfo_Img} alt="AuctionInfo_Img" width={600} />
      </div>
      <div ref={auctionWarningRef}>
        <Image
          src={AuctionInfo_warning}
          alt="AuctionInfo_warning"
          width={600}
        />
      </div>

      <div ref={auctionMapRef}>
        <TicketDetailMap />
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
