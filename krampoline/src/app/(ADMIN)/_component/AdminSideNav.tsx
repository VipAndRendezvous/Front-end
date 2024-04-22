"use client";

import Link from "next/link";
import styles from "./adminSideNav.module.css";

const AdminSideNav = () => {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.sidebarNav}>
        <ul>
          <li className={styles.navHeader}>
            <span>페이지 관리</span>
          </li>
          <li>
            <Link href="/lookatme/banneredit">
              <div>배너 변경</div>
            </Link>
          </li>
          <li className={styles.navHeader}>
            <span>회원 관리</span>
          </li>
          <li>
            <Link href="/lookatme/userlist">
              <div>회원 조회</div>
            </Link>
          </li>
          <li>
            <Link href="/lookatme/vipinfo">
              <div>VIP 신청</div>
            </Link>
          </li>
          <li>
            <Link href="/lookatme/exchangeapply">
              <div>출금 신청</div>
            </Link>
          </li>
          <li className={styles.navHeader}>
            <span>경매 관리</span>
          </li>
          <li>
            <Link href="/lookatme/auctionlist">
              <div>경매 조회</div>
            </Link>
          </li>
          <li>
            <Link href="/lookatme/ticketlist">
              <div>식사권 조회</div>
            </Link>
          </li>
          <li>
            <Link href="/lookatme/reviewlist">
              <div>리뷰 조회</div>
            </Link>
          </li>
          <li>
            <Link href="/lookatme/chatlist">
              <div>채팅방 조회</div>
            </Link>
          </li>
          <li className={styles.navHeader}>
            <span>신고 관리</span>
          </li>
          <li>
            <Link href="/lookatme/ticketreport">
              <div>식사권 신고 조회</div>
            </Link>
          </li>
          <li>
            <Link href="/lookatme/reviewreport">
              <div>리뷰 신고 조회</div>
            </Link>
          </li>
          <li>
            <Link href="/lookatme/chatreport">
              <div>채팅 신고 조회</div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSideNav;
