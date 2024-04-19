import styles from "./vipListBox.module.css";
import ProfilePic from "../../../../../public/user.png";
import Image from "next/image";
import Link from "next/link";
import { VipBox } from "@/models/VipBox";
import { useState } from "react";
import { useUser } from "@/app/utils/UserProvider";

type Props = {
  vipBox: VipBox;
};
const VipListBox = ({ vipBox }: Props) => {
  const vip = vipBox;
  const [isFollowed, setIsFollowed] = useState(false); // 팔로우 상태 관리
  const { following, unfollowing } = useUser();
  // 팔로우/언팔로우 토글 핸들러
  // 팔로우/언팔로우 토글 핸들러
  const toggleFollow = () => {
    // 팔로우 상태에 따라 함수 호출
    if (isFollowed) {
      unfollowing(vipBox.vipUUID);
    } else {
      following(vipBox.vipUUID);
    }
    // 팔로우 상태 토글
    setIsFollowed(!isFollowed);
  };
  return (
    <div>
      <div className={styles.ListBoxContainer}>
        <div>
          <Link href="/vipinfo">
            <Image
              src={
                vip.profileImgUrl.startsWith("http")
                  ? vip.profileImgUrl
                  : ProfilePic
              }
              alt="ProfilePic"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div>{vip.vipNickname}</div>
        <div>{vip.vipRate || "미지정"}</div>
        <button onClick={toggleFollow} className="btn-basic">
          {isFollowed ? "언팔로우" : "팔로우"}
        </button>
      </div>
    </div>
  );
};

export default VipListBox;
