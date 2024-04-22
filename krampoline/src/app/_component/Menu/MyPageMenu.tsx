"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./myPageMenu.module.css";
import { usePathname } from "next/navigation";

const MyPageMenu = () => {
  const pathname = usePathname(); // useRouter를 사용하여 현재 라우트 정보를 가져옴
  const [selected, setSelected] = useState(""); // 선택된 메뉴 상태 관리

  useEffect(() => {
    // URL이 변경될 때마다 실행되는 useEffect
    let path = pathname;
    setSelected(path); // 현재 경로를 상태로 설정
  }, [pathname]); // router.pathname이 변경될 때마다 실행

  const isSelected = (path) => {
    return selected === path; // 현재 선택된 경로와 메뉴의 경로가 일치하는지 확인
  };

  return (
    <div className={styles.MenuContainer}>
      <div
        className={
          isSelected("/usermypage") ? styles.SelectedButton : styles.Button
        }
      >
        <Link href="/usermypage">식사권</Link>
      </div>

      <div
        className={
          isSelected("/userreview") ? styles.SelectedButton : styles.Button
        }
      >
        <Link href="/userreview">리뷰</Link>
      </div>

      <div
        className={
          isSelected("/userauction") ? styles.SelectedButton : styles.Button
        }
      >
        <Link href="/userauction">경매</Link>
      </div>
    </div>
  );
};

export default MyPageMenu;
