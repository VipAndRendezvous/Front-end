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
        <div className={styles.FAQQuestion}>{question}</div>
        <div>{isOpen ? "-" : "+"}</div>
      </div>
      {isOpen && <div className={styles.FAQText}>{answer}</div>}
    </>
  );
};
const Faq = () => {
  const faqs = [
    { question: "리뷰는 무엇인가요?", answer: "예상 답글 작성 필요" },
    {
      question: "지금까지 경매 낙찰 내역을 확인할 수 있나요?",
      answer: "예상 답글 작성 필요",
    },
    {
      question: "온라인 경매 응찰 방법이 궁금합니다.",
      answer: "예상 답글 작성 필요",
    },
    {
      question: "온라인 경매 응찰 시 주의사항은 무엇인가요?",
      answer: "예상 답글 작성 필요",
    },
    {
      question: "응찰을 잘못 눌렀어요. 철회가 가능한가요?",
      answer: "예상 답글 작성 필요",
    },
    {
      question: "경매 수수료와 기부금은 어떻게 되나요?",
      answer: "예상 답글 작성 필요",
    },
  ];
  const Tabs = ({ title, isActive }) => {
    return (
      <div className={isActive ? styles.tabActive : styles.tab}>{title}</div>
    );
  };
  return (
    <div className={styles.FAQBoard}>
      <div className={styles.FAQContainer}>
        <div className={styles.FAQTitle}>FAQ</div>
        <div className={styles.FAQSubTitle}>
          <span className={styles.FAQHighlight}>궁금한 점</span>이 있으신가요?
        </div>
        <div className={styles.subTitleUnderline}></div>
        <div className={styles.tabs}>
          <Tabs title="전체" isActive={true} />
          <Tabs title="이용 안내" isActive={false} />
          <Tabs title="온라인 경매" isActive={false} />
        </div>
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};
export default Faq;
