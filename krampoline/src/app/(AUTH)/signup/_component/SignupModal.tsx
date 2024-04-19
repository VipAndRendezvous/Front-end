"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../../../../public/Logo.png";
import styles from "./signup.module.css";
import { useUser } from "@/app/utils/UserProvider";
import axios from "axios";

export default function Signup() {
  const router = useRouter();
  const { kakaoInfo } = useUser();
  const [isNickVerified, setNickVerified] = useState("");
  const [isNickButtonEnabled, setIsNickButtonEnabled] = useState(false);

  const [isEmailVerified, setEmailVerified] = useState("");
  const [isEmailButtonEnabled, setIsEmailButtonEnabled] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationButtonEnabled, setIsVerificationButtonEnabled] =
    useState(false);

  //닉네임 입력 처리 함수
  function handleVerifyNick(event) {
    setNickVerified(event.target.value);
    if (event.target.value) {
      setIsNickButtonEnabled(true);
    } else {
      setIsNickButtonEnabled(false);
    }
  }

  // 이메일 입력 처리 함수
  function handleVerifyEmail(event) {
    setEmailVerified(event.target.value);
    if (event.target.value) {
      setIsEmailButtonEnabled(true);
    } else {
      setIsEmailButtonEnabled(false);
    }
  }

  // 인증번호 입력 처리 함수
  function handleVerificationCodeChange(event) {
    setVerificationCode(event.target.value);
    if (event.target.value) {
      setIsVerificationButtonEnabled(true);
    } else {
      setIsVerificationButtonEnabled(false);
    }
  }

  //----------------------------------------------------------------
  const VerifyNicknameButton = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/all/duplicate/nickname/${isNickVerified}`
      );
      // API 호출 성공 시, 응답 처리
      console.log("API 호출 결과:", response.data);
      // 예: 응답으로 받은 데이터를 사용하여 상태 업데이트 또는 사용자에게 알림 등
    } catch (error) {
      console.error(error);
    }
  };

  const VerifyEmailButton = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/all/email/sendAuthCode`,
        {
          email: isEmailVerified,
        }
      );
      // API 호출 성공 시, 응답 처리
      console.log("API 호출 결과:", response.data);
      // 예: 응답으로 받은 데이터를 사용하여 상태 업데이트 또는 사용자에게 알림 등
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/all/email/checkAuthCode`,
        {
          email: isEmailVerified,
          code: verificationCode,
        }
      );

      console.log("API 호출 결과:", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 방지

    const formData = new FormData(event.target);
    const body = {
      kakaoId: kakaoInfo.id,
      userName: kakaoInfo.name,
      nickname: formData.get("nickname"),
      email: formData.get("email"),
      phoneNumber: kakaoInfo.phoneNumber,
      profileImgUrl: kakaoInfo.profileImgUrl,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/all/signup`,
        data: body,
        withCredentials: true,
      });

      if (response.status === 200) {
        router.replace("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------------------------------------
  return (
    <div className={styles["signup-container"]}>
      <div className={styles["logo-container"]}>
        <Image src={Logo} alt="logo" width={120} height={120} />
      </div>
      <h1 className={styles["signup-title"]}>회원가입</h1>
      <form className={styles["signup-form"]} onSubmit={handleSubmit}>
        <label htmlFor="name">이름</label>
        <input name="name" defaultValue={kakaoInfo?.name} readOnly />
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={isNickVerified}
          onChange={handleVerifyNick}
          required
        />
        <button
          type="button"
          className={
            isNickButtonEnabled
              ? styles["verify-btn-active"]
              : styles["verify-btn"]
          }
          disabled={!isNickButtonEnabled}
          onClick={VerifyNicknameButton}
        >
          닉네임 중복
        </button>
        <label htmlFor="phone">전화번호</label>
        <input
          name="phoneNumber"
          defaultValue={kakaoInfo?.phoneNumber}
          readOnly
        />
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          value={isEmailVerified}
          onChange={handleVerifyEmail}
        />
        <button
          type="button"
          className={
            isEmailButtonEnabled
              ? styles["verify-btn-active"]
              : styles["verify-btn"]
          }
          disabled={!isEmailButtonEnabled}
          onClick={VerifyEmailButton}
        >
          이메일 인증
        </button>
        <label htmlFor="verification">이메일 인증 번호</label>
        <input
          type="text"
          id="verification"
          name="verification"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          required
        />
        <button
          type="button"
          className={
            isVerificationButtonEnabled
              ? styles["verify-btn-active"]
              : styles["verify-btn"]
          }
          disabled={!isVerificationButtonEnabled}
          onClick={handleVerifyCode}
        >
          인증 번호
        </button>
        <button type="submit" className={styles["verify-btn"]}>
          회원가입
        </button>
        {/* <div className={styles.error}>{showMessage(state?.message)}</div> */}
      </form>
    </div>
  );
}
