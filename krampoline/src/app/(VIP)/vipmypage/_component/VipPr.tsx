"use client";

import VipPageMenu from "@/app/_component/Menu/VipPageMenu";
import styles from "./vipPr.module.css";
import { useEffect, useState } from "react";
import { useVip } from "@/app/utils/VipProvider";

const VipPr = () => {
  const { vipIntro, vipIntroAPI, vipEditAPI } = useVip();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    introduction: "",
    career: "",
    job: "",
    url: "",
  });

  useEffect(() => {
    const loadData = async () => {
      await vipIntroAPI();
    };

    loadData();
  }, []);

  useEffect(() => {
    if (vipIntro) {
      setProfile({
        introduction: vipIntro.vipIntroduce || "",
        career: vipIntro.vipCareer || "",
        job: vipIntro.vipJob || "",
        url: vipIntro.vipEvidenceUrl || "",
      });
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // 업데이트할 프로필 정보를 객체로 준비합니다.
    const updatedProfile = {
      vipJob: profile.job !== "" ? profile.job : null,
      vipCareer: profile.career !== "" ? profile.career : null,
      vipIntroduce: profile.introduction !== "" ? profile.introduction : null,
      vipEvidenceUrl: profile.url !== "" ? profile.url : null,
    };

    // vipEditAPI를 호출하여 정보를 업데이트합니다.
    try {
      await vipEditAPI(updatedProfile);
      setIsEditing(false); // 편집 모드 종료
      await vipIntroAPI();
    } catch (error) {
      console.error("Error saving the profile:", error);
      // 오류 처리 로직 추가 가능
    }
  };
  return (
    <div>
      <VipPageMenu />
      <div className={styles.FormContainer}>
        <form>
          <div className={styles.VipPrContainer}>
            소개
            <textarea
              className={styles.VipPrText}
              name="introduction"
              value={profile.introduction}
              placeholder="소개"
              onChange={handleChange}
              disabled={!isEditing} // 편집 모드가 아닐 때 비활성화
            />
            경력
            <textarea
              className={styles.VipPrText}
              name="career"
              value={profile.career}
              placeholder="경력"
              onChange={handleChange}
              disabled={!isEditing} // 편집 모드가 아닐 때 비활성화
            />
            직업
            <input
              className={styles.VipPrInput}
              name="job"
              type="text"
              value={profile.job}
              placeholder="직업"
              onChange={handleChange}
              disabled={!isEditing} // 편집 모드가 아닐 때 비활성화
            />
            포트폴리오
            <input
              className={styles.VipPrInput}
              name="url"
              type="text"
              value={profile.url}
              placeholder="포트폴리오"
              onChange={handleChange}
              disabled={!isEditing} // 편집 모드가 아닐 때 비활성화
            />
          </div>
        </form>
        <div className={styles.PrButtonContainer}>
          {isEditing ? (
            <button className="btn-basic" onClick={handleSave}>
              저장
            </button>
          ) : (
            <button className="btn-basic" onClick={handleEdit}>
              수정
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VipPr;
