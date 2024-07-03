"use client";

import styles from "./navbar.module.css";
import Link from "next/link";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import VipApplyModal from "../VipApply/VipApplyModal";
import { useUser } from "@/app/utils/UserProvider";

const Navbar = () => {
  const { isLoggedIn, logout, userInfo, applyCheck } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false); //추가

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrolled = scrollY > 80;

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
    <div
      className={`${styles.property1w} ${isScrolled ? "scrolled" : ""}`}
      style={{
        backgroundColor: isScrolled ? "rgba(51, 51, 51, 0.8)" : "#fff",
        color: isScrolled ? "rgba(255, 255, 255, 0.8)" : "#333",
      }}
    >
      <div className={styles.navContainer}>
        <div className={styles.vipApplyParent}>
          {isLoggedIn && userInfo.userType == "ROLE_BASIC" && !applyCheck && (
            <b className={styles.vipApply}>
              <Link href="/vipapply">VIP Apply </Link>
            </b>
          )}
          <b className={styles.vipApply}>
            <Link href="/auctions/original">Auction </Link>
          </b>
          <b className={styles.membership}>
            <Link href="/membership">Membership</Link>
          </b>
          <b className={styles.membership}>
            <Link href="/chargepoint">Point</Link>
          </b>
          <b className={styles.membership}>
            <Link href="/viplist">VIP List</Link>
          </b>
        </div>
        <div className={styles.myPageParent}>
          <b className={styles.membership}>
            <Link href="/usermypage">My page</Link>
          </b>
          <b className={styles.membership}>
            <Link href="/faq">FAQ</Link>
          </b>
          {isLoggedIn ? (
            <b className={styles.membership} onClick={handleLogout}>
              로그아웃
            </b>
          ) : (
            <b className={styles.membership}>
              <Link href="/login">로그인</Link>
            </b>
          )}
        </div>
        <Link href="/">
          <img
            className={styles.property1wChild}
            alt="logo"
            src={isScrolled ? "/yellowLOGO.png" : "/blackLOGO.png"}
          />
        </Link>
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
    </div>
  );
};

export default Navbar;
