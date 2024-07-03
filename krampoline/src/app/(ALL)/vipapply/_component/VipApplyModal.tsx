"use client";

import React, { useEffect, useState } from "react";
import styles from "./vipApplyModal.module.css";
import { useUser } from "@/app/utils/UserProvider";

const VipApplyModal = () => {
  const { userInfo, vipapplyAPI } = useUser();
  const [formData, setFormData] = useState({
    vipEmail: "",
    vipJob: "",
    vipCareer: "",
    vipIntroduce: "",
    vipEvidenceUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.vipEmail.trim() &&
      formData.vipJob.trim() &&
      formData.vipCareer.trim() &&
      formData.vipIntroduce.trim() &&
      formData.vipEvidenceUrl.trim()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("모든 필드를 채워주세요.");
      return;
    }
    const dataToSend = {
      ...formData,
      userUUID: userInfo?.userUUID || "",
      vipName: userInfo?.nickname || "Unknown",
    };

    try {
      await vipapplyAPI(dataToSend);
    } catch (error) {
      console.error("Error during VIP application:", error);
      alert("신청에 실패했습니다.");
    }
  };

  return (
    <div className={styles.vipApplyContainer}>
      <div className={styles.vipApplyTitleFirst}>
        <div> VIP 지원하기 </div>
      </div>
      <div className={styles.vipApplyInfo}>
        <div className={styles.vipApplyText}>VIP 란?</div>
        <div className={styles.vipApplyWaring}>
          <div className={styles.vipApplyWaringText}>
            VAR에서의 ‘VIP’는 단순히 유명인사가 아니라, 인생과 업계에서 중요한
            업적을 이룬 이들을 의미합니다. VIP는 직접 시간 경매를 주최함으로써
            ‘식사권’으로 사용자에게 독점적인 만남의 기회를 제공합니다.
          </div>
        </div>
      </div>

      <div className={styles.vipApplyInfo}>
        <div className={styles.vipApplyText}>지원 정보 </div>
        <div className={styles.vipApplyWaring1}>
          <svg
            width="836"
            height="2"
            viewBox="0 0 968 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1L968 1.00008" stroke="#333333" />
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.vipApplyTitleContainer}>
        <div>
          <div className={styles.vipApplyTitle}>닉네임</div>
          <input placeholder={userInfo?.nickname || "Unknown"} disabled />
        </div>
        <div>
          <div className={styles.vipApplyTitle}>연락 받을 이메일</div>
          <input
            name="vipEmail"
            placeholder="이메일"
            value={formData.vipEmail}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className={styles.vipApplyTitle}>직업</div>
          <input
            name="vipJob"
            placeholder="직업"
            value={formData.vipJob}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className={styles.vipApplyTitle}>경력</div>
          <textarea
            name="vipCareer"
            placeholder="경력"
            value={formData.vipCareer}
            onChange={handleChange}
          />
        </div>

        <div></div>
        <div className={styles["input-group"]}>
          <div className={styles.vipApplyTitle}>나를 소개하는 글</div>
          <div className={styles.vipApplySubTitle}>
            VIP에 대한 소개와, 사용자와의 만남을 통해 추구하는 내용을 가능한
            상세하게 적어주시면 구체적인 안내를 받을 수 있습니다.
          </div>
          <textarea
            name="vipIntroduce"
            placeholder="자기소개"
            value={formData.vipIntroduce}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className={styles.vipApplyTitle}>자신을 표현할 수 있는 링크</div>
          <input
            name="vipEvidenceUrl"
            placeholder="웹사이트 링크"
            value={formData.vipEvidenceUrl}
            onChange={handleChange}
          />
        </div>
        <div className={styles.SubmitButtonWrapper}>
          <div
            className={`${styles.SubmitButton} ${
              isFormValid() ? styles.ActiveButton : ""
            }`}
            onClick={handleSubmit}
            role="button"
          >
            지원하기
          </div>
        </div>
      </form>
    </div>
  );
};

export default VipApplyModal;
