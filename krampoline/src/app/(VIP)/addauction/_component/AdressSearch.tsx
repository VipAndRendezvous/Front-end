"use client";

import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import styles from "./adressSearch.module.css";
import { useAddAuction } from "@/app/utils/AddAuctionsProvider";

const AdressSearch: React.FC = () => {
  const [zipCode, setZipcode] = useState<string>("");
  const [roadAddress, setRoadAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>(""); // 추가
  const [isOpen, setIsOpen] = useState<boolean>(false); //추가
  const { Address, setAddress } = useAddAuction();

  const completeHandler = (data: any) => {
    setZipcode(data.zonecode);
    setRoadAddress(data.roadAddress);
    setIsOpen(false); //추가
  };

  // Modal 스타일
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

  // 검색 클릭
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // 상세 주소검색 event
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // 도로명 주소와 상세 주소가 변경될 때마다 전체 주소를 업데이트합니다.
    setAddress(roadAddress + " " + detailAddress);
  }, [roadAddress, detailAddress, setAddress]);

  return (
    <div className={styles.SearchPostWrapper}>
      <div className={styles.SearchPostContainer}>
        <input value={zipCode} readOnly placeholder="우편번호" />
        <button className="btn-basic" type="button" onClick={toggle}>
          우편번호 검색
        </button>
      </div>
      <div className={styles.PostInfoContainer}>
        <br />
        <input value={roadAddress} readOnly placeholder="도로명 주소" />
        <br />

        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={customStyles}
        >
          <DaumPostcode onComplete={completeHandler} />
        </Modal>
        <input
          type="text"
          onChange={changeHandler}
          value={detailAddress}
          placeholder="상세주소"
        />
        <br />
      </div>
    </div>
  );
};

export default AdressSearch;
