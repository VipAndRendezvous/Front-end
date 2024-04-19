"use client";

import { useState } from "react";
import styles from "./addAuctionWarning.module.css";

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.AddAuctionSelect} onClick={toggleOpen}>
        <div>{question}</div>
        <div>{isOpen ? "-" : "+"}</div>
      </div>
      {isOpen && <div className={styles.AddAuctionText}>{answer}</div>}
    </>
  );
};

const AddAuction = () => {
  const faqs = [
    {
      question: "경매 생성전 주의 사항",
      answer: (
        <div>
          <li>본 경매에 대해 불이행 시 모든 책임은 본인에게 있습니다.</li>
          <li>본인의 시간을 상품으로서 판매하는 경매입니다.</li>
          <li>
            시간 약속은 철저하게 지키셔야 하며 신중하게 경매를 등록하시기
            바랍니다.
          </li>

          <li>
            낙찰된 경매에 대해 이행 취소 시 VIP자격은 영구 박탈될 수 있습니다.
          </li>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.AddAuctionBoard}>
      <div className={styles.AddAuctionContainer}>
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default AddAuction;
