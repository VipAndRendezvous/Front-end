"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";
import { useUser } from "@/app/utils/UserProvider";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";

export default function Signup() {
  const router = useRouter();
  const { kakaoInfo } = useUser();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [nicknameValid, setNicknameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [verificationCodeValid, setVerificationCodeValid] = useState(false);
  const [emailDuplicateChecked, setEmailDuplicateChecked] = useState(false);

  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");

  const nicknameRegex = /^[a-z0-9]{8,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    // Validate nickname and update its related states
    if (nickname) {
      if (nicknameRegex.test(nickname)) {
        setNicknameValid(true);
        setNicknameError("");
      } else {
        setNicknameValid(false);
        setNicknameError(
          "닉네임은 영어 소문자, 숫자로 이루어진 8~16 글자로 이루어져야 합니다."
        );
      }
    } else {
      setNicknameValid(false);
    }

    // Validate email and update its related states
    if (email) {
      if (emailRegex.test(email)) {
        setEmailValid(true);
        setEmailError("");
      } else {
        setEmailValid(false);
        setEmailError("이메일 형식이 아닙니다.");
      }
    } else {
      setEmailValid(false);
    }

    // Validate verification code by its length
    setVerificationCodeValid(verificationCode.length === 8);
    if (verificationCode.length > 8) {
      setVerificationCodeError("올바른 인증번호가 아닙니다.");
    } else {
      setVerificationCodeError("");
    }
  }, [nickname, email, verificationCode]);
  const handleVerifyNickname = async () => {
    if (!nicknameValid) return;
    try {
      const response = await HttpAuthInstance.get(
        `/api/all/duplicate/nickname/${nickname}`
      );
      if (response.status === 200) {
        setNicknameError("사용가능한 닉네임입니다");
      }
      console.log("Nickname check result:", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckEmailDuplicate = async () => {
    if (!emailValid) return;
    try {
      const response = await HttpAuthInstance.get(
        `/api/all/duplicate/email/${email}`
      );
      if (response.status === 200) {
        setEmailError("사용가능한 이메일입니다");
        setEmailDuplicateChecked(true); // 중복 검사가 성공적으로 완료되었음을 표시
      } else {
        setEmailError("이메일이 이미 사용중입니다.");
        setEmailDuplicateChecked(false);
      }
    } catch (error) {
      setEmailError("중복 검사 중 오류가 발생했습니다.");
      setEmailDuplicateChecked(false);
      console.error(error);
    }
  };

  const handleSendEmail = async () => {
    if (!emailValid || !emailDuplicateChecked) return;
    try {
      const response = await HttpAuthInstance.post(
        `/api/all/email/sendAuthCode`,
        { email }
      );
      if (response.status === 200) {
        setEmailError("이메일로 인증코드를 전송하였습니다. 확인해주세요");
      } else {
        setEmailError("이메일 전송에 실패하였습니다.");
      }
      console.log("Email send result:", response.data);
    } catch (error) {
      setEmailError("이메일 전송 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCodeValid) return;
    try {
      const response = await HttpAuthInstance.post(
        `/api/all/email/checkAuthCode`,
        {
          email,
          code: verificationCode,
        }
      );
      if (response.status === 200) {
        setVerificationCodeError("인증코드가 인증되었습니다");
      }

      console.log("Verification code result:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nicknameValid || !emailValid || !verificationCodeValid) {
      alert("Please make sure all fields are valid");
      return;
    }

    const body = {
      kakaoId: kakaoInfo.id,
      userName: kakaoInfo.name,
      nickname,
      email,
      phoneNumber: kakaoInfo.phoneNumber,
      profileImgUrl: kakaoInfo.profileImgUrl,
    };

    try {
      const response = await HttpAuthInstance.post("/api/all/signup", body, {
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("🎉환영합니다!🎉 가입이 완료되었습니다🙌");
        router.replace("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------------------------------------
  return (
    <div className={styles["signup-container"]}>
      <div className={styles.SignupBox}>
        <h1 className={styles["signup-title"]}>회원가입</h1>
        <p>환영합니다! 활동에 필요한 회원정보를 입력해주세요</p>
        <form className={styles["signup-form"]} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">이름</label>
          </div>
          <input name="name" defaultValue={kakaoInfo?.name} readOnly />
          <span className={styles.error}></span>
          <label htmlFor="nickname">닉네임</label>
          <div className={styles["input-group"]}>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
            <button
              type="button"
              className={
                nicknameValid
                  ? styles["verify-btn-active-yellow"]
                  : styles["verify-btn"]
              }
              disabled={!nicknameValid} // `nicknameValid`가 참일 때만 버튼 활성화
              onClick={handleVerifyNickname}
            >
              중복확인
            </button>
          </div>

          <span
            className={
              nicknameError === "사용가능한 닉네임입니다"
                ? `${styles.error} ${styles.success}`
                : styles.error
            }
          >
            {nicknameError}
          </span>

          <div>
            <label htmlFor="phone">전화번호</label>
            <input
              name="phoneNumber"
              defaultValue={kakaoInfo?.phoneNumber}
              readOnly
            />
          </div>
          <span className={styles.error}></span>
          <label htmlFor="email">이메일</label>
          <div className={styles["input-group"]}>
            <input
              type="text"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!emailDuplicateChecked ? (
              <button
                type="button"
                className={
                  emailValid
                    ? styles["verify-btn-active-yellow"]
                    : styles["verify-btn"]
                }
                disabled={!emailValid}
                onClick={handleCheckEmailDuplicate}
              >
                중복확인
              </button>
            ) : (
              <button
                type="button"
                className={styles["verify-btn-active-yellow"]}
                onClick={handleSendEmail}
              >
                전송
              </button>
            )}
          </div>
          <span
            className={
              emailError === "사용가능한 이메일입니다" ||
              emailError === "이메일로 인증코드를 전송하였습니다. 확인해주세요"
                ? `${styles.error} ${styles.success}`
                : styles.error
            }
          >
            {emailError}
          </span>
          <label htmlFor="verification">인증 번호 입력</label>
          <div className={styles["input-group"]}>
            <input
              type="text"
              id="verification"
              name="verification"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <button
              type="button"
              className={
                verificationCodeValid
                  ? styles["verify-btn-active-yellow"]
                  : styles["verify-btn"]
              }
              disabled={!verificationCodeValid} // `verificationCodeValid`가 참일 때만 버튼 활성화
              onClick={handleVerifyCode}
            >
              인증
            </button>
          </div>
          <span
            className={
              verificationCodeError === "인증코드가 인증되었습니다"
                ? `${styles.error} ${styles.success}`
                : styles.error
            }
          >
            {verificationCodeError}
          </span>
          <button
            type="submit"
            className={
              !nicknameValid ||
              !emailValid ||
              !verificationCodeValid ||
              !emailDuplicateChecked ||
              verificationCodeError !== "인증코드가 인증되었습니다"
                ? styles["signup-btn"]
                : styles["signup-btn-active"]
            }
            disabled={
              !nicknameValid ||
              !emailValid ||
              !verificationCodeValid ||
              !emailDuplicateChecked ||
              verificationCodeError !== "인증코드가 인증되었습니다"
            }
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
