import React, { useEffect } from "react";
import ProfilePic from "../../../public/user.png";
import Image from "next/image";
import styles from "./mainUserInfo.module.css";
import Link from "next/link";
import { useUser } from "../utils/UserProvider";

const MainUserInfo = () => {
  const { userInfo, isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return (
      <div className={styles.MainUserInfoContainer}>
        <p>로그인을 해주세요.</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.MainUserInfoContainer}>
        <div className={styles.ProfilePicContainer}>
          <Image
            src={
              userInfo?.profileImgUrl?.startsWith("http")
                ? userInfo.profileImgUrl
                : ProfilePic
            }
            alt="ProfilePic"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.UserInfoContainer}>
          <div>{userInfo.nickname}</div>
          <div>내 기부금액:{userInfo.donation_price}</div>
          <div className={styles.PointContainer}>
            <div>보유 포인트:{userInfo.point}</div>
            <div>충전하기</div>
          </div>
          <div className={styles.UserOptionContainer}>
            {userInfo.userType !== "ROLE_BASIC" && (
              <Link href="/vipmypage">
                <div>VIP 페이지</div>
              </Link>
            )}
            <div>User 페이지</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainUserInfo;
