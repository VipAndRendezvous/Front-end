"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "../../signup/_component/signup.module.css";

export default function AdminLogin() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 방지

    const formData = new FormData(event.target);
    const body = {
      adminLoginId: formData.get("id"),
      adminPassword: formData.get("password"),
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/lookAtMe/login`,
        body,
        {
          withCredentials: true,
        }
      );
      // 관리자 로그인 성공
      if (response.status === 200) {
        const authHeader =
          response.headers["Authorization"] ||
          response.headers["authorization"];
        const accessToken = authHeader?.substring("Bearer ".length);
        if (accessToken) {
          localStorage.setItem("Authorization", accessToken);
          router.push("/lookatme/vipinfo");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles["signup-container"]}>
      <h1 className={styles["signup-title"]}>관리자 로그인</h1>
      <form className={styles["signup-form"]} onSubmit={handleSubmit}>
        <label htmlFor="name">아이디</label>
        <input type="text" id="id" name="id" required />
        <label htmlFor="password">비밀번호</label>
        <input type="text" id="password" name="password" required />
        <button type="submit" className={styles["verify-btn"]}>
          관리자 로그인
        </button>
        {/* <div className={styles.error}>{showMessage(state?.message)}</div> */}
      </form>
    </div>
  );
}

//----------------------------------------------------------------
