import styles from "./vipListBox.module.css";
import ProfilePic from "../../../../../public/user.png";
import Image from "next/image";
import Link from "next/link";
import { VipBox } from "@/models/VipBox";
import { useEffect, useState } from "react";
import { useUser } from "@/app/utils/UserProvider";

type Props = {
  vipBox: VipBox;
};
const VipListBox = ({ vipBox }: Props) => {
  const vip = vipBox;

  const [isFollowed, setIsFollowed] = useState(vipBox.isFollow);
  const { following, unfollowing } = useUser();

  const toggleFollow = async () => {
    if (isFollowed !== null) {
      try {
        const response = await unfollowing(isFollowed);
        setIsFollowed(null);
      } catch (error) {
        console.error("Failed to unfollow:", error);
      }
    } else {
      try {
        const response = await following(vipBox.vipUUID);
        if (response !== null) {
          console.log("response", response);
          setIsFollowed(vipBox.isFollow);
        } else {
          setIsFollowed(response);
        }
      } catch (error) {
        console.error("Failed to follow:", error);
      }
    }
  };

  useEffect(() => {
    // console.log(`isFollowed has changed: ${isFollowed}`);
  }, [isFollowed]);
  return (
    <div className={styles.AuctionWrapper}>
      <div className={styles.AuctionContainer}>
        <div className={styles.AuctionProfile}>
          <Image
            src={
              vip.profileImgUrl.startsWith("http")
                ? vip.profileImgUrl
                : ProfilePic
            }
            alt="ProfilePic"
            width={268}
            height={268}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.AuctionTitle}>{vip.vipNickname}</div>

        <div className={styles.AuctionInfo}>
          <div className={styles.TimePart}>
            {/* <div className={styles.AucionText}>남은 시간</div>
          <div className={styles.AucionInfoState}>{formatTime(timeLeft)}</div> */}
          </div>
          <div className={styles.TimePart}>
            <div className={styles.AucionText}>현재 입찰 금액</div>{" "}
            <div className={styles.AucionInfoState}>
              {/* {formattedAuctionCurrentMoney} 원 */}
            </div>
          </div>
          <div className={styles.TimePart}></div>
          <div
            className={styles.AuctionFigure}
            onClick={(e) => alert("준비중입니다 :)")}
          >
            상세보기
            {/* <Link href={`/vipInfo/${vip.vipUUID}`}>상세보기</Link> */}
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div className={styles.ListBoxContainer}>
    //     <div>
    //       <Link href="/vipinfo">
    //         <Image
    //           src={
    //             vip.profileImgUrl.startsWith("http")
    //               ? vip.profileImgUrl
    //               : ProfilePic
    //           }
    //           alt="ProfilePic"
    //           width={100}
    //           height={100}
    //           style={{ objectFit: "cover" }}
    //         />
    //       </Link>
    //     </div>
    //     <div>{vip.vipNickname}</div>
    //     <div>{vip.vipRate || "미지정"}</div>
    //     {/* <button onClick={toggleFollow} className="btn-basic">
    //       {isFollowed ? "언팔로우" : "팔로우"}
    //     </button> */}
    //   </div>
    // </div>
  );
};

export default VipListBox;
