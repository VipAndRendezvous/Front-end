import React from "react";
import Image from "next/image";
import styles from "./mainUserInfo.module.css";
import Link from "next/link";
import { useUser } from "../utils/UserProvider";

const MainUserInfo = () => {
  const { userInfo, isLoggedIn, logout } = useUser();

  // profileImages 배열은 항상 동일하게 정의됩니다.
  const profileImages = [
    "/user/1.jpg",
    "/user/2.jpg",
    "/user/3.jpg",
    "/user/4.jpg",
    "/user/5.jpg",
    "/user/6.jpg",
  ];

  // useState를 항상 컴포넌트의 최상위 레벨에서 호출합니다.
  const [randomImage, setRandomImage] = React.useState(
    () => profileImages[Math.floor(Math.random() * profileImages.length)]
  );

  // isLoggedIn이 false일 때의 JSX를 반환하는 부분
  if (!isLoggedIn) {
    return (
      <div className={styles.NonLoginContainer}>
        <b className={styles.NonLoginText}>시간 경매에 참여해보세요!</b>
        <div className={styles.NonLoginwrapper}>
          <Link href="/login">
            <b className={styles.NonLoginBoxText}>로그인 하기</b>
          </Link>
        </div>
      </div>
    );
  }

  // userInfo가 null인 경우 로딩 중이거나 데이터가 없는 경우를 처리합니다.
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  // isLoggedIn이 true이고 userInfo가 존재할 때의 JSX를 반환하는 부분
  return (
    <div className={styles.rectangleParent}>
      <div className={styles.groupChild}>
        <div
          className={styles.signoutIcon}
          onClick={() => {
            logout();
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 13.5C7.5 13.6326 7.44732 13.7598 7.35355 13.8536C7.25979 13.9473 7.13261 14 7 14H3C2.86739 14 2.74021 13.9473 2.64645 13.8536C2.55268 13.7598 2.5 13.6326 2.5 13.5V2.5C2.5 2.36739 2.55268 2.24021 2.64645 2.14645C2.74021 2.05268 2.86739 2 3 2H7C7.13261 2 7.25979 2.05268 7.35355 2.14645C7.44732 2.24021 7.5 2.36739 7.5 2.5C7.5 2.63261 7.44732 2.75979 7.35355 2.85355C7.25979 2.94732 7.13261 3 7 3H3.5V13H7C7.13261 13 7.25979 13.0527 7.35355 13.1464C7.44732 13.2402 7.5 13.3674 7.5 13.5ZM14.3538 7.64625L11.8538 5.14625C11.7599 5.05243 11.6327 4.99972 11.5 4.99972C11.3673 4.99972 11.2401 5.05243 11.1462 5.14625C11.0524 5.24007 10.9997 5.36732 10.9997 5.5C10.9997 5.63268 11.0524 5.75993 11.1462 5.85375L12.7931 7.5H7C6.86739 7.5 6.74021 7.55268 6.64645 7.64645C6.55268 7.74021 6.5 7.86739 6.5 8C6.5 8.13261 6.55268 8.25979 6.64645 8.35355C6.74021 8.44732 6.86739 8.5 7 8.5H12.7931L11.1462 10.1462C11.0524 10.2401 10.9997 10.3673 10.9997 10.5C10.9997 10.6327 11.0524 10.7599 11.1462 10.8538C11.2401 10.9476 11.3673 11.0003 11.5 11.0003C11.6327 11.0003 11.7599 10.9476 11.8538 10.8538L14.3538 8.35375C14.4002 8.30731 14.4371 8.25217 14.4623 8.19147C14.4874 8.13077 14.5004 8.06571 14.5004 8C14.5004 7.93429 14.4874 7.86923 14.4623 7.80853C14.4371 7.74783 14.4002 7.69269 14.3538 7.64625Z"
              fill="#949597"
            />
          </svg>
        </div>
        <div className={styles.maskGroupIcon}>
          <Image
            src={
              userInfo?.profileImgUrl?.startsWith("http")
                ? userInfo.profileImgUrl
                : randomImage
            }
            alt="ProfilePic"
            width={111}
            height={111}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.groupWrapper}>
            <div className={styles.denyday}>{userInfo.nickname}</div>
            <div className={styles.group}>
              <b className={styles.b2}>내 기부 금액</b>
              <div className={styles.donation_price}>
                {userInfo.donation_price} 원
              </div>
            </div>

            <div className={styles.parent}>
              <b className={styles.b1}>보유 포인트</b>
              <div className={styles.p}>{userInfo.point} P</div>
            </div>

            <div className={styles.wrapper}>
              {userInfo && userInfo.userType !== "ROLE_BASIC" && (
                <>
                  <div className={styles.wrapper1}>
                    <Link href="/vipmypage">
                      <b className={styles.b3}>VIP</b>
                    </Link>
                  </div>
                  <div className={styles.wrapper1}>
                    <Link href="/usermypage">
                      <b className={styles.b3}>my</b>
                    </Link>
                  </div>
                </>
              )}
              {userInfo && userInfo.userType === "ROLE_BASIC" && (
                <div className={styles.wrapper2}>
                  <Link href="/usermypage">
                    <b className={styles.b3}>마이페이지</b>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainUserInfo;
