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
  const { userInfo, isLoggedIn, followingList, withdrawServiceAPI } = useUser();
  const router = useRouter();
  //----------------------------------------------------------------날짜 형식
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
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
          <div className={styles.sideNav1st}>
            <div>
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
            {userInfo.userType === "ROLE_VIP" && (
              <div className={styles.vipStatus}>VIP</div>
            )}
            <div>별점</div>
          </div>
          <div className={styles.profileInfo}>
            <div>닉네임:{userInfo.nickname}</div>
            <div>보유 포인트:{userInfo.point}</div>
            <div>
              구독 만료 일자:
              {userInfo.subscribeExpiration
                ? userInfo.subscribeExpiration
                : "구독중인 회원이 아닙니다"}
            </div>
            <Link href="/chargepoint">
              <div>충전하기</div>
            </Link>
            <Link href="/membership">
              <div>멤버쉽 구독</div>
            </Link>
          </div>
        </div>
        <div className={styles.sideButton}>
          <Link href="/withdraw">
            <button className="btn-basic" type="button">
              출금하기
            </button>
          </Link>
          {/* <button className="btn-basic" type="button" onClick={onLogout}>
            로그아웃
          </button> */}
          <button
            className="btn-basic"
            type="button"
            onClick={(e) => withdrawServiceAPI()}
          >
            회원탈퇴
          </button>
        </div>
      </div>

      <div className={styles.vipCheck}>
        유명인 심사중입니다.
        <br />
        좋은 결과를 기대해주세요 ^^
      </div>
      <div>
        <div>
          {followingList?.length > 0 ? (
            followingList.map((vip: FollowingUser) => (
              <FollowContainer key={vip.followUUID} vipfollwing={vip} />
            ))
          ) : (
            <p>팔로우 목록이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
