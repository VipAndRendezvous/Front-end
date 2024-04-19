import Image from "next/image";
import styles from "./followContainer.module.css";
import { FollowingUser } from "@/models/FollowingList";
import ProfilePic from "../../../../public/user.png";
import { useUser } from "@/app/utils/UserProvider";
import { useState } from "react";

type Props = {
  vipfollwing: FollowingUser;
};

const FollowContainer = ({ vipfollwing }: Props) => {
  const { following, unfollowing } = useUser();
  const [isFollowed, setIsFollowed] = useState(false); // 팔로우 상태 관리

  const toggleFollow = () => {
    // 팔로우 상태에 따라 함수 호출
    if (isFollowed) {
      unfollowing(vipfollwing.followUUID);
    } else {
      following(vipfollwing.followUUID);
    }
    // 팔로우 상태 토글
    setIsFollowed(!isFollowed);
  };
  return (
    <div className={styles.VIPFallowList}>
      <div className={styles.VIPFallowContainer}>
        <div>
          <Image
            src={
              vipfollwing.profileImgUrl.startsWith("http")
                ? vipfollwing.profileImgUrl
                : ProfilePic
            }
            alt="ProfilePic"
            width={40}
            height={40}
          />
        </div>
        <div>{vipfollwing.nickname}</div>
        <button onClick={toggleFollow} className="btn-basic">
          {isFollowed ? "언팔로우" : "팔로우"}
        </button>
      </div>
      <hr />
    </div>
  );
};

export default FollowContainer;
