"use client";

import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import Logo from "../../../../public/Logo.png";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import VipApplyModal from "../VipApply/VipApplyModal";
import { useUser } from "@/app/utils/UserProvider";

const Navbar = () => {
  const { isLoggedIn, logout, userInfo } = useUser();

  const [isOpen, setIsOpen] = useState<boolean>(false); //추가

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    console.log("VIP Apply clicked");
    setIsOpen(!isOpen);
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.NavContainer}>
      <Link href="/">
        <Image src={Logo} alt="Logo" height={40} priority />
      </Link>
      <div className={styles.NavMenu}>
        {isLoggedIn && userInfo.userType == "ROLE_BASIC" && (
          <div onClick={toggle}>VIP Apply</div>
        )}
        <div>
          <Link href="/auctions/original">Auction </Link>
        </div>

        <div>
          <Link href="/viplist">Vip List </Link>
        </div>
      </div>
      <div className={styles.NavMenu2}>
        <div>
          <Link href="/usermypage">My Page </Link>
        </div>

        <div>
          <Link href="/faq">FAQ </Link>
        </div>
        <div>
          {isLoggedIn ? (
            <div onClick={handleLogout} style={{ cursor: "pointer" }}>
              로그아웃
            </div>
          ) : (
            // 로그인 상태가 아닐 때 로그인 버튼 표시
            <Link href="/login">로그인</Link>
          )}
        </div>
      </div>
      <Modal
        className={styles.modalContent}
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalInnerContent}>
          <VipApplyModal closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
