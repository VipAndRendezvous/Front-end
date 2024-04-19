"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { VipIntroduce } from "@/models/VipIntro";

type UserContextType = {
  vipIntro: VipIntroduce | null;
  vipIntroAPI: () => Promise<void>;
  vipEditAPI: (updatedProfile) => Promise<void>;
  setVipIntro: (vipIntro: VipIntroduce | null) => void;
};

const VipContext = createContext<UserContextType | null>(null);

export function VipProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [vipIntro, setVipIntro] = useState<VipIntroduce | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //----------------------------------------------------------------vip 소개 불러오기
  async function vipIntroAPI() {
    const token = localStorage.getItem("Authorization");
    setIsLoading(true); // 데이터 로딩 시작 시 true로 설정
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/vip/info`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setIsLoading(false);
        setVipIntro(response.data);
      } else {
        throw new Error("Failed to fetch following list");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false); // 데이터 로딩이 끝나면 false로 설정
    }
  }
  //----------------------------------------------------------------vip 소개 저장하기
  async function vipEditAPI(updatedProfile: VipIntroduce) {
    const token = localStorage.getItem("Authorization");
    setIsLoading(true); // 데이터 로딩 시작 시 true로 설정
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/vip/editInfo`,
        updatedProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setIsLoading(false);
        console.log(response.data);
        setVipIntro(response.data);
        setIsLoading(false);
      } else {
        throw new Error("Failed to fetch following list");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false); // 데이터 로딩이 끝나면 false로 설정
    }
  }

  //----------------------------------------------------------------
  return (
    <VipContext.Provider
      value={{ vipIntro, vipIntroAPI, vipEditAPI, setVipIntro }}
    >
      {children}
    </VipContext.Provider>
  );
}
export function useVip() {
  const context = useContext(VipContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
