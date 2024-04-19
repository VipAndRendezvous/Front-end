import Image from "next/image";
import ProfilePic from "../../../../../public/user.png";
import styles from "./sideNav.module.css";
import FollowContainer from "../../../_component/Follow/FollowContainer";

const SideNav = () => {
  //----------------------------------------------------------------날짜 형식
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  //----------------------------------------------------------------

  const user = {
    profile: ProfilePic,
    nickname: "John Ahn",
    point: 50000,
    sub: dateString,
    star: 4.5,
  };

  //----------------------------------------------------------------돈 단위
  const formattedAuctionCurrentPoint = user.point.toLocaleString();
  //----------------------------------------------------------------

  return (
    <div className={styles.SideNavContainer}>
      <div className={styles.SideNavWarp}>
        <div className={styles.SideNavProfile}>
          <div className={styles.SideNav1st}>
            <div>
              {/* <Image src={user.profile} alt="ProfilePic" width={100} /> */}
            </div>
          </div>
          <div className={styles.ProfileInfo}>
            <div>닉네임:{user.nickname}</div>
            <div>별점{user.star}</div>
          </div>
        </div>
        <div className={styles["Following_btn"]}>
          <button className="btn-basic">팔로잉 중</button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
