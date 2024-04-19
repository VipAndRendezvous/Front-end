"use client";

import VipPageMenu from "@/app/_component/Menu/VipPageMenu";
import styles from "./vipPr.module.css";
import { useState } from "react";

const pr = {
  PrText:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};

const VipPr = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [prContent, setPrContent] = useState(pr.PrText);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // 여기에 필요한 경우 prContent를 서버에 저장하는 로직을 추가할 수 있습니다.
  };

  const handleChange = (event: any) => {
    setPrContent(event.target.value);
  };

  return (
    <div>
      <div>
        <VipPageMenu />
      </div>
      <div className={styles.VipPrContainer}>
        {isEditing ? (
          <textarea
            className={styles.VipPrTextarea}
            value={prContent}
            onChange={handleChange}
          />
        ) : (
          <p className={styles.VipPrText}>{prContent}</p>
        )}
      </div>
      <div className={styles.PrButtonContainer}>
        {isEditing ? (
          <button className="btn-basic" onClick={handleSave}>
            저장
          </button>
        ) : (
          <button className="btn-basic" onClick={handleEdit}>
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default VipPr;
