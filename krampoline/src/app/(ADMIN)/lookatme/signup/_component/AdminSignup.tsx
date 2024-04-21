"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./signup.module.css";

export default function AdminSignup() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 방지
    const formData = new FormData(event.target);
    const body = {
      adminLoginId: formData.get("id"),
      adminPassword: formData.get("password"),
      adminNickname: formData.get("nickname"),
      adminSecretKey: formData.get("secretKey"),
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/lookAtMe/signup`,
        body,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        router.push("/lookatme/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------------------------------------
  return (
    <div className={styles["signup-container"]}>
      <h1 className={styles["signup-title"]}>관리자 회원가입</h1>
      <form className={styles["signup-form"]} onSubmit={handleSubmit}>
        <label htmlFor="name">아이디</label>
        <input type="text" id="id" name="id" required />
        <label htmlFor="password">비밀번호</label>
        <input type="text" id="password" name="password" required />
        <label htmlFor="nickname">닉네임</label>
        <input type="text" id="nickname" name="nickname" required />
        <label htmlFor="password">비밀 키</label>
        <input type="text" id="secretKey" name="secretKey" required />
        <button type="submit" className={styles["verify-btn"]}>
          관리자 회원가입
        </button>
        {/* <div className={styles.error}>{showMessage(state?.message)}</div> */}
      </form>
    </div>
  );
}
