import React, { useEffect, useState } from "react";
import styles from "./vipApplyModal.module.css";
import { useUser } from "@/app/utils/UserProvider";

const VipApplyModal = ({ closeModal }: { closeModal: () => void }) => {
  const { userInfo, vipapplyAPI } = useUser();
  const [vipName, setVipName] = useState(userInfo.nickname || ""); // userInfo.nickname이 기본값이 됩니다.
  const [vipEmail, setVipEmail] = useState("");
  const [vipJob, setVipJob] = useState("");
  const [vipCareer, setVipCareer] = useState("");
  const [vipIntroduce, setVipIntroduce] = useState("");
  const [vipEvidenceUrl, setVipEvidenceUrl] = useState("");
  useEffect(() => {
    // 모달이 열릴 때 body의 스크롤을 비활성화
    document.body.style.overflow = "hidden";

    // 컴포넌트가 언마운트 될 때(모달이 닫힐 때) 원래대로 복구
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행

  console.log(userInfo);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    try {
      const formData = {
        userUUID: userInfo.userUUID, // 여기서 userInfo.uuid는 사용자의 uuid를 의미합니다.
        vipName,
        vipJob,
        vipCareer,
        vipIntroduce,
        vipEvidenceUrl,
      };
      await vipapplyAPI(formData); // API 호출
      closeModal(); // 성공적으로 신청 후 모달 닫기
    } catch (error) {
      console.error(error);
      alert("신청에 실패했습니다.");
    }
  };
  return (
    <div className={styles.vipApplyContainer}>
      <div className={styles.vipApplyTitle}>
        <h1> 안녕하세요,{userInfo.nickname} 님 </h1>
        <div> VIP 신청을 위해서는 아래 정보가 필요해요. </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.vipApplyTitleContainer}>
        <div>
          <div className={styles.vipApplyTitle}>닉네임</div>
          <input placeholder={userInfo.nickname} disabled />
        </div>
        <div>
          <div className={styles.vipApplyTitle}>연락 받을 이메일</div>
          <input placeholder="자주 사용하는 이메일을 입력해주세요." />
        </div>
        <div>
          <div className={styles.vipApplyTitle}>직업</div>
          <input placeholder="현재 직업 또는 경험분야를 입력해주세요." />
        </div>
        <div>
          <div className={styles.vipApplyTitle}>경력</div>
          <textarea placeholder="" />
        </div>

        <div></div>
        <div className={styles["input-group"]}>
          <div className={styles.vipApplyTitle}>나를 소개하는 글</div>
          <div className={styles.vipApplySubTitle}>
            VIP에 대한 소개와, 사용자와의 만남을 통해 추구하는 내용을 가능한
            상세하게 적어주시면 구체적인 안내를 받을 수 있습니다.
          </div>
          <textarea placeholder="" />
        </div>
        <div>
          <div className={styles.vipApplyTitle}>자신을 표현할 수 있는 링크</div>
          <input placeholder="블로그 및 개인 페이지 링크" />
        </div>
        <div className={styles.SubmitButton}>
          <button type="submit" className="btn-basic">
            제출하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default VipApplyModal;
