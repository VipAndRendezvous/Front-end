"use client";

import { useState } from "react";
import styles from "./faq.module.css";

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.FAQSelect} onClick={toggleOpen}>
        <div>{question}</div>
        <div>{isOpen ? "-" : "+"}</div>
      </div>
      {isOpen && <div className={styles.FAQText}>{answer}</div>}
    </>
  );
};

const Faq = () => {
  const faqs = [
    { question: "경매는 어떻게 참여하나요?", answer: "예상 답글 작성 필요" },
    { question: "포인트는 어떻게 충전하나요?", answer: "예상 답글 작성 필요" },
    {
      question: "낙찰 받은 식사권은 어디서 확인하나요?",
      answer: "예상 답글 작성 필요",
    },
  ];

  return (
    <div className={styles.FAQBoard}>
      <div className={styles.FAQContainer}>
        <div className={styles.FAQTitle}>자주 묻는 질문</div>
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
