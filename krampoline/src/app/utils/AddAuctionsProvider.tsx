"use client";

import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Auctions } from "@/models/Auctions";

type UserContextType = {
  AuctionInfo: string;
  setAuctionInfo: (AuctionInfo) => void;
  WarningInfo: string;
  setWarningInfo: (WarningInfo) => void;
  Address: string;
  setAddress: (Address) => void;
  createAuction: (
    minBidAmount: number,
    meetingDate: string,
    meetingLocation: string,
    meetingInfoText: string,
    meetingPromiseText: string
  ) => Promise<void>;
  Date: string;
  setDate: (Date) => void;
  Bid: number;
  setBid: (Bid) => void;
  auctionData: Auctions;
  setAuctionData: (auctionData) => void;
};
const AddAuctionContext = createContext<UserContextType | null>(null);

export function AddAuctionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [AuctionInfo, setAuctionInfo] = useState("");
  const [WarningInfo, setWarningInfo] = useState("");
  const [Address, setAddress] = useState("");
  const [Date, setDate] = useState("");
  const [Bid, setBid] = useState(0);
  const [auctionData, setAuctionData] = useState();

  //----------------------------------------------------------------경매 생성 요청
  async function createAuction(
    minBidAmount = Bid,
    meetingDate = Date,
    meetingLocation = Address,
    meetingInfoText = AuctionInfo,
    meetingPromiseText = WarningInfo
  ) {
    try {
      const token = localStorage.getItem("Authorization");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/vip/auction/create`,
        {
          minBidAmount,
          meetingDate,
          meetingLocation,
          meetingInfoText,
          meetingPromiseText,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      throw error; // 오류를 던져서 상위 핸들러에서 처리할 수 있도록 합니다.
    }
  }
  //----------------------------------------------------------------

  return (
    <AddAuctionContext.Provider
      value={{
        AuctionInfo,
        setAuctionInfo,
        WarningInfo,
        setWarningInfo,
        Address,
        setAddress,
        createAuction,
        Date,
        setDate,
        Bid,
        setBid,
        auctionData,
        setAuctionData,
      }}
    >
      {children}
    </AddAuctionContext.Provider>
  );
}

export function useAddAuction() {
  const context = useContext(AddAuctionContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
