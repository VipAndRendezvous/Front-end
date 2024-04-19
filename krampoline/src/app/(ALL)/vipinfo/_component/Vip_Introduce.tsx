"use client";

import React, { useEffect, useState } from "react";
import styles from "./introduce.module.css";
import { useVip } from "@/app/utils/VipProvider";

const Vip_Introduce = () => {
  const { vipIntro, vipIntroAPI } = useVip();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // vipIntroAPI가 프로미스를 반환하는 경우 await을 사용
        await vipIntroAPI();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // 데이터 로딩이 끝났을 때 로딩 상태를 변경
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className={styles.IntroduceContainer}>Loading...</div>;
  }

  return (
    <div className={styles.IntroduceContainer}>
      <div className={styles.IntroduceBox}>
        {vipIntro && vipIntro.vipIntroduce
          ? vipIntro.vipIntroduce
          : "소개를 아직 작성하지 않았어요!"}
      </div>
      <div className={styles.IntroduceBox}>
        {vipIntro && vipIntro.vipCareer
          ? vipIntro.vipCareer
          : "경력을 아직 작성하지 않았어요!"}
      </div>
      <div className={styles.IntroduceBox}>
        {vipIntro && vipIntro.vipJob
          ? vipIntro.vipJob
          : "직업을 아직 작성하지 않았어요!"}
      </div>
    </div>
  );
};

export default Vip_Introduce;
