"use client";

import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import styles from "./adressSearch.module.css";
import { useAddAuction } from "@/app/utils/AddAuctionsProvider";

const AdressSearch: React.FC = () => {
  const [fullAddress, setFullAddress] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setAddress } = useAddAuction();

  const completeHandler = (data: any) => {
    const address = `${data.roadAddress} ${data.buildingName}`;
    setFullAddress(address);
    setAddress(address);
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "500px",
      height: "600px",
      padding: "0",
      overflow: "hidden",
    },
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setFullAddress(address);
    setAddress(address);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.SearchPostWrapper}>
      <div className={styles.PostInfoContainer}>
        <input
          type="text"
          onChange={changeHandler}
          value={fullAddress}
          placeholder="도로명 주소 + 상세주소"
          className={styles.content2Input}
        />
        <button className={styles.btnbasic} type="button" onClick={toggle}>
          주소 검색
        </button>

        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={customStyles}
        >
          <DaumPostcode onComplete={completeHandler} />
        </Modal>
      </div>
    </div>
  );
};

export default AdressSearch;
