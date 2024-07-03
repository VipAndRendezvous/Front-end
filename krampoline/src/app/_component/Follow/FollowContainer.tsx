import Image from "next/image";
import styles from "./followContainer.module.css";
import { FollowingUser } from "@/models/FollowingList";
import ProfilePic from "../../../../public/user.png";
import { useUser } from "@/app/utils/UserProvider";
import { useState } from "react";

type Props = {
  vipfollwing: FollowingUser;
  handleUnfollow: (followUUID: string) => void;
};

const FollowContainer = ({ vipfollwing, handleUnfollow }: Props) => {
  const [isFollowed, setIsFollowed] = useState(true); // 팔로우 상태 관리

  const toggleFollow = () => {
    // 팔로우 상태에 따라 함수 호출
    if (isFollowed) {
      handleUnfollow(vipfollwing.followUUID);
      setIsFollowed(false);
    }
  };

  const profileImages = [
    "/user/1.jpg",
    "/user/2.jpg",
    "/user/3.jpg",
    "/user/4.jpg",
    "/user/5.jpg",
    "/user/6.jpg",
  ];

  // useState를 사용하여 컴포넌트가 처음 로딩될 때 한 번만 랜덤 이미지를 선택하도록 합니다.
  const [randomImage, setRandomImage] = useState(
    profileImages[Math.floor(Math.random() * profileImages.length)]
  );

  return (
    <div className={styles.VIPFallowList}>
      <div className={styles.VIPFallowContainer}>
        <div className={styles.followerPic}>
          <Image
            src={
              vipfollwing.profileImgUrl.startsWith("http")
                ? vipfollwing.profileImgUrl
                : randomImage
            }
            alt="ProfilePic"
            width={24}
            height={24}
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
          <div className={styles.followerNickname}>{vipfollwing.nickname}</div>{" "}
        </div>
        <button onClick={toggleFollow} className={styles.followerbutton}>
          {isFollowed ? "언팔로우" : "팔로우"}
        </button>
      </div>
    </div>
  );
};

export default FollowContainer;
