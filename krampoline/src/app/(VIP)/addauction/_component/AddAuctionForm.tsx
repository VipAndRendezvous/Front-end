"use client";

import React, { useState } from "react";

import styles from "./addAuctionForm.module.css";
import AdressSearch from "./AdressSearch";
import DateTimePickerValue from "./DateTimePickerValue";
import EditorComponent from "./EditorComponent";
import PositionedPopper from "./PositionedPopper";

import DatePopper from "./DatePopper";

const AddAuctionForm = () => {
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    // 폼 제출 로직
  };

  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const [popup, setPopup] = useState(false);

  const handleInput = (e: any) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = (data: any) => {
    setPopup(!popup);
  };

  return (
    <form className={styles.AddFormContainer} onSubmit={handleFormSubmit}>
      <div className={styles.AddFormMoneyContainer}>
        <div>
          <div className={styles.FeePolicy}>
            <PositionedPopper />
          </div>
        </div>
        <div className={styles.PointInfo}>
          <div className={styles.PointInfoInput}>
            <input />
            <div>보유 포인트: 100,000</div>
          </div>
        </div>
      </div>
      <div className={styles.AddFormDateContainer}>
        <DatePopper />
        <DateTimePickerValue />
      </div>
      <div className={styles.AddFormAddressContainer}>
        <div>식사 장소를 지정해 주세요</div>
        <div className={styles.PostContainer}>
          <AdressSearch />
        </div>
      </div>
      <div className={styles.AddFormTextContainer}>
        <div className={styles.TextEditor}>
          <div>이 만남은 이런거에요</div>
          <EditorComponent />
        </div>
      </div>
      <div className={styles.AddFormTextContainer}>
        <div className={styles.TextEditor}>
          <div>이것 만큼은 지켜주세요</div>
          <EditorComponent />
        </div>
      </div>
      <div className={styles.AuthCheck}>
        <input type="radio" />
        <span>모든 내용을 이해하였고 동의합니다</span>
      </div>
      <div className={styles.ButtonContainer}>
        <button className="btn-basic" type="submit">
          경매생성
        </button>
        <button className="btn-basic">취소</button>
      </div>
    </form>
  );
};

export default AddAuctionForm;
