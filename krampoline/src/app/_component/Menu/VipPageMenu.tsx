"use client";

import Link from "next/link";
import styles from "./vipPageMenu.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const VipPageMenu = () => {
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
          isSelected("/vipmypage") ? styles.SelectedButton : styles.Button
        }
      >
        <Link href="/vipmypage">PR</Link>
      </div>

      <div
        className={
          isSelected("/vipreview") ? styles.SelectedButton : styles.Button
        }
      >
        <Link href="/vipreview">식사후기</Link>
      </div>

      <div
        className={
          isSelected("/vipauction") ? styles.SelectedButton : styles.Button
        }
      >
        <Link href="/vipauction">경매</Link>
      </div>
    </div>
  );
};

export default VipPageMenu;
