"use client";

import axios, { AxiosResponse } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserInfo } from "@/models/UserInfo";
import { KakaoInfo } from "@/models/KakaoInfo";
import { useRouter } from "next/navigation";
import { FollowingListResponse } from "@/models/FollowingList";
import HttpAuthInstance from "./api/interceptor/axiosConfig";
import { TicketInfo } from "@/models/TicketInfo";

type UserContextType = {
  userInfo: UserInfo | null;
  kakaoInfo: KakaoInfo | null;
  isLoggedIn: boolean;
  setKakaoInfo: (kakaoInfo: KakaoInfo | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
  fetchUserInfo: () => Promise<void>;
  following;
  unfollowing;
  followingListAPI: () => Promise<void>;
  followingList: FollowingListResponse | null; // 여기에 추가합니다.
  vipapplyAPI: (formData: {
    userUUID: string;
    vipName: string;
    vipJob: string;
    vipCareer: string;
    vipIntroduce: string;
    vipEvidenceUrl: string;
  }) => Promise<void>;
  vipapply: string;
  isLoading: boolean;
  ticketInfo: TicketInfo;
  setTicketInfo: (ticketInfo) => void;
  applyCheck;
  globalTicketUUID;
  setglobalTicketUUID;
  withdrawServiceAPI: () => Promise<void>;
  DonationAPI();
  donation;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [kakaoInfo, setKakaoInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [followingList, setFollowingList] =
    useState<FollowingListResponse | null>(null);
  const [vipapply, setvipapply] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [ticketInfo, setTicketInfo] = useState();
  const [applyCheck, setApplyCheck] = useState(false);
  const [globalTicketUUID, setglobalTicketUUID] = useState("");
  const [donation, setDonation] = useState("");

  //----------------------------------------------------------------

  //----------------------------------------------------------------마운트시 프로필 정보랑 로그인 유무 판단
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("Authorization");

    if (token) {
      try {
        const response = await HttpAuthInstance.get("/api/user/profile");
        followingListAPI();
        if (response.status === 200) {
          console.log(response);
          setUserInfo(response.data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error.response);
      }
    } else {
    }
    setIsLoading(false); // 로딩 상태를 false로 설정하여 로딩이 완료됨을 나타냅니다.

    if (token) {
      try {
        const applyCheckResponse = await HttpAuthInstance.get(
          "/api/basic/applyCheck"
        );
        if (applyCheckResponse.status === 200) {
          setApplyCheck(applyCheckResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  //----------------------------------------------------------------로그아웃
  const logout = async () => {
    try {
      const response = await HttpAuthInstance.delete("/api/auth/logout");
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUserInfo(null);
        localStorage.removeItem("Authorization");
        router.replace("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------------------------------------팔로잉 하기
  const following = async (followingId) => {
    try {
      const response = await HttpAuthInstance.get(
        `/api/user/follow/${followingId}`
      );

      return response.data;
    } catch (error) {
      console.error("Error during the follow operation:", error);
      throw error;
    }
  };

  //----------------------------------------------------------------언팔로잉 하기
  const unfollowing = async (followingId) => {
    try {
      const response = await HttpAuthInstance.delete(
        `/api/user/unfollow/${followingId}`
      );
    } catch (error) {
      console.error("Error during the unfollow operation:", error);
      throw error;
    }
  };
  //----------------------------------------------------------------팔로잉 리스트 가져오기
  async function followingListAPI() {
    try {
      const response = await HttpAuthInstance.get("/api/user/followingList");
      if (response.status === 200) {
        console.log(response.data);
        setFollowingList(response.data);
      } else {
        throw new Error("Failed to fetch following list");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //----------------------------------------------------------------vip apply

  async function vipapplyAPI(formData: {
    userUUID: string;
    vipName: string;
    vipJob: string;
    vipCareer: string;
    vipIntroduce: string;
    vipEvidenceUrl: string;
  }) {
    const token = localStorage.getItem("Authorization");
    try {
      const response = await HttpAuthInstance.post(
        `/api/basic/applyVip`,
        formData
      );
      if (response.status === 200) {
        alert("👑VIP 신청이 완료되었습니다👑 좋은 결과 기대해주세요!");
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      throw error; // 오류를 던져서 상위 핸들러에서 처리할 수 있도록 합니다.
    }
  }

  useEffect(() => {
    // 사용자 정보와 티켓 정보를 불러옵니다.
    const fetchInitialData = async () => {
      await fetchUserInfo();
      await DonationAPI();
      console.log(donation);
    };

    fetchInitialData();
  }, []);

  //----------------------------------------------------------------

  async function withdrawServiceAPI() {
    const token = localStorage.getItem("Authorization");
    try {
      const response = await HttpAuthInstance.post(`/api/auth/withdrawal`, {});
      if (response.status === 200) {
        localStorage.removeItem("Authorization");
        window.location.href = "/";
      } else {
        throw new Error("Failed to fetch following list");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //----------------------------------------------------------------도네이션 금액 가져오기
  async function DonationAPI() {
    try {
      const response = await HttpAuthInstance.get("/api/all/totalDonation");
      if (response.status === 200) {
        setDonation(response.data);
      } else {
        throw new Error("Failed to fetch following list");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //----------------------------------------------------------------
  return (
    <UserContext.Provider
      value={{
        userInfo,
        isLoggedIn,
        kakaoInfo,
        setKakaoInfo,
        setIsLoggedIn,
        logout,
        fetchUserInfo,
        following,
        unfollowing,
        followingListAPI,
        followingList,
        vipapplyAPI,
        vipapply,
        isLoading,
        ticketInfo,
        setTicketInfo,
        applyCheck,
        globalTicketUUID,
        setglobalTicketUUID,
        withdrawServiceAPI,
        DonationAPI,
        donation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
