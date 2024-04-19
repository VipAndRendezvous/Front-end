"use client";

import React, { useEffect, useState } from "react";

import styles from "./addAuctionForm.module.css";
import AdressSearch from "./AdressSearch";
import DateTimePickerValue from "./DateTimePickerValue";
import EditorComponent from "./EditorComponent";
import PositionedPopper from "./PositionedPopper";
import DatePopper from "./DatePopper";
import { useUser } from "@/app/utils/UserProvider";
import { useAddAuction } from "@/app/utils/AddAuctionsProvider";
import EditorComponentWaring from "./EditorComponentWaring";

const AddAuctionForm = ({region, keyId, AccessKey}) => {
  const { userInfo, isLoading } = useUser();
  const {
    Address,
    AuctionInfo,
    WarningInfo,
    Date,
    createAuction,
    Bid,
    setBid,
  } = useAddAuction();
  const [amount, setAmount] = useState();

  console.log(Bid, Address, AuctionInfo, WarningInfo, Date);

  const handleFormSubmit = (event: any) => {
    createAuction(Bid, Date, Address, AuctionInfo, WarningInfo);
  };

  const onChangeAmount = (e) => {
    setBid(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.AddFormContainer}>
      <div className={styles.AddFormMoneyContainer}>
        <div>
          <div className={styles.FeePolicy}>
            <PositionedPopper />
          </div>
        </div>
        <div className={styles.PointInfo}>
          <div className={styles.PointInfoInput}>
            <input
              type="number"
              onChange={onChangeAmount}
              value={amount}
              required
            />
            <div>
              보유 포인트:
              {userInfo.point}
            </div>
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
          <EditorComponent region={region} keyId={keyId} AccessKey={AccessKey}/>
        </div>
      </div>
      <div className={styles.AddFormTextContainer}>
        <div className={styles.TextEditor}>
          <div>이것 만큼은 지켜주세요</div>
          <EditorComponentWaring region={region} keyId={keyId} AccessKey={AccessKey}/>
        </div>
      </div>
      <div className={styles.AuthCheck}>
        <input type="radio" />
        <span>모든 내용을 이해하였고 동의합니다</span>
      </div>
      <div className={styles.ButtonContainer}>
        <button className="btn-basic" onClick={handleFormSubmit}>
          경매생성
        </button>
        <button className="btn-basic">취소</button>
      </div>
    </div>
  );
};

export default AddAuctionForm;
