"use client";

import Image from "next/image";
import ProfilePic from "../../../../public/user.png";
import styles from "./sideNav.module.css";
import FollowContainer from "../Follow/FollowContainer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/utils/UserProvider";
import { FollowingUser } from "@/models/FollowingList";

const SideNav = () => {
  const {
    userInfo,
    isLoggedIn,
    followingList,
    withdrawServiceAPI,
    applyCheck,
    logout,
  } = useUser();
  const router = useRouter();
  //----------------------------------------------------------------날짜 형식

  let dateString = "";
  if (userInfo && userInfo.subscribeExpiration) {
    const expirationDate = new Date(userInfo.subscribeExpiration);
    const year = expirationDate.getFullYear();
    const month = (expirationDate.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해주고, 두 자리로 만듭니다.
    const day = expirationDate.getDate().toString().padStart(2, "0"); // 일도 두 자리로 만듭니다.
    dateString = `${year}.${month}.${day}`; // 결과 형식: "2024.05.20"
  }
  //----------------------------------------------------------------
  const renderApplyCheckMessage = () => {
    if (applyCheck === "STANDBY") {
      return (
        <div className={styles.vipCheck}>
          유명인 심사중입니다.
          <br />
          좋은 결과를 기대해주세요 😉
        </div>
      );
    }
    return null; // applyCheck가 'STANDBY'가 아니면 아무것도 렌더링하지 않습니다.
  };

  //----------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className={styles.MainUserInfoContainer}>
        <p>로그인을 해주세요.</p>
      </div>
    );
  }

  return (
    <div className={styles.sideNavContainer}>
      <div>
        <div className={styles.sideNavProfile}>
          <div className={styles.sideNav1stContainer}>
            <div className={styles.sideNav1st}>
              <div className={styles.profilePic}>
                <Image
                  src={
                    userInfo?.profileImgUrl?.startsWith("http")
                      ? userInfo.profileImgUrl
                      : ProfilePic
                  }
                  alt="ProfilePic"
                  width={88}
                  height={88}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.nomalInfo}>
                <div className={styles.VipCheck}>
                  {userInfo.userType === "ROLE_VIP" ? (
                    <>
                      <div className={styles.Vip}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="8" cy="8" r="8" fill="#FFF741" />
                          <path
                            d="M11.39 4.65L8.85 12.13H7.31L4.58 4.65H5.95L8.06 10.42L10.02 4.65H11.39Z"
                            fill="#333333"
                          />
                        </svg>
                      </div>
                      <div className={styles.nickNameVip}>
                        {userInfo.nickname}
                      </div>
                    </>
                  ) : (
                    <div className={styles.nickName}>{userInfo.nickname}</div>
                  )}
                </div>
                <div className={styles.rating}>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.0355 1.03005C5.4886 -0.343351 7.43136 -0.34335 7.88446 1.03005L8.39062 2.56428C8.59265 3.17668 9.16348 3.59141 9.80834 3.59432L11.4239 3.6016C12.8701 3.60811 13.4704 5.45579 12.3043 6.31112L11.0015 7.26661C10.4815 7.64799 10.2635 8.31905 10.46 8.93324L10.9523 10.472C11.393 11.8494 9.82129 12.9913 8.64747 12.1465L7.33618 11.2028C6.81277 10.8262 6.10718 10.8262 5.58378 11.2028L4.27249 12.1465C3.09866 12.9913 1.52693 11.8494 1.96763 10.472L2.45994 8.93324C2.65645 8.31905 2.43841 7.64799 1.91842 7.26661L0.61569 6.31112C-0.550476 5.45579 0.0498724 3.60811 1.49607 3.6016L3.11162 3.59432C3.75647 3.59141 4.3273 3.17668 4.52934 2.56428L5.0355 1.03005Z"
                      fill="#FFF741"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.44096 2.87758L6.9348 1.34335C6.78377 0.885549 6.13618 0.885551 5.98515 1.34335L5.47899 2.87758C5.14227 3.89824 4.19088 4.58946 3.11613 4.59431L1.50057 4.60159C1.01851 4.60376 0.818394 5.21965 1.20711 5.50476L2.50984 6.46025C3.37649 7.09589 3.73989 8.21431 3.41238 9.23797L2.92007 10.7767C2.77317 11.2358 3.29708 11.6165 3.68836 11.3349L4.99964 10.3912C5.87199 9.76338 7.04797 9.76337 7.92031 10.3912L9.2316 11.3349C9.62288 11.6165 10.1468 11.2358 9.99988 10.7767L9.50758 9.23797C9.18006 8.21432 9.54346 7.09589 10.4101 6.46025L11.7128 5.50476C12.1016 5.21965 11.9014 4.60376 11.4194 4.60159L9.80383 4.59431C8.72907 4.58946 7.77769 3.89824 7.44096 2.87758ZM7.88446 1.03005C7.43136 -0.34335 5.48859 -0.343351 5.0355 1.03005L4.52934 2.56428C4.3273 3.17668 3.75647 3.59141 3.11162 3.59432L1.49607 3.6016C0.0498723 3.60811 -0.550476 5.45579 0.61569 6.31112L1.91842 7.26661C2.43841 7.64799 2.65645 8.31905 2.45994 8.93324L1.96763 10.472C1.52693 11.8494 3.09866 12.9913 4.27249 12.1465L5.58378 11.2028C6.10718 10.8262 6.81277 10.8262 7.33618 11.2028L8.64747 12.1465C9.82129 12.9913 11.393 11.8494 10.9523 10.472L10.46 8.93324C10.2635 8.31905 10.4815 7.64799 11.0015 7.26661L12.3043 6.31112C13.4704 5.4558 12.8701 3.60811 11.4239 3.6016L9.80834 3.59432C9.16348 3.59141 8.59265 3.17668 8.39062 2.56428L7.88446 1.03005Z"
                      fill="#333333"
                    />
                  </svg>
                  {userInfo.rating}
                </div>
              </div>
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
                    fill="#D9D9D9"
                  />
                </svg>
              </div>
            </div>
            <div className={styles.stroke}>
              <svg
                width="228"
                height="2"
                viewBox="0 0 228 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1L228 1.00004" stroke="#D9D9D9" />
              </svg>
            </div>
            <div className={styles.subInfo}>
              <div className={styles.pointsec}>
                <div className={styles.text1}>보유 포인트</div>
                <div className={styles.text2}>{userInfo.point}</div>
              </div>
              <div className={styles.chargepoint}>
                <Link href="/chargepoint">충전하기</Link>
              </div>
            </div>
            <div className={styles.stroke}>
              <svg
                width="228"
                height="2"
                viewBox="0 0 228 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1L228 1.00004" stroke="#D9D9D9" />
              </svg>
            </div>
            <div className={styles.subInfo}>
              <div className={styles.pointsec}>
                <div className={styles.text1}>구독 만료일</div>
                <div className={styles.text2}>
                  {dateString ? dateString : "구독중인 회원이 아닙니다"}
                </div>
              </div>
              <div className={styles.withdraw}>
                <Link href="/withdraw">출금하기 </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cancleAccount}>
          <div className={styles.text3} onClick={(e) => withdrawServiceAPI()}>
            회원탈퇴
          </div>
        </div>
      </div>

      {renderApplyCheckMessage()}
      {/* 
      <div>
        <div className={styles.followContainer}>
          {followingList?.length > 0 ? (
            followingList.map((vip: FollowingUser) => (
              <FollowContainer key={vip.followUUID} vipfollwing={vip} />
            ))
          ) : (
            <p>팔로우 목록이 없습니다.</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default SideNav;
