"use client";

import { useState } from "react";
import styles from "./faq.module.css";
import ArrowUp from "../../../../../public/faqArrowUp.png";
import ArrowDown from "../../../../../public/faqArrowDown.png";
import Image from "next/image";

const FaqItem = ({ question, answer }: { question: string; answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const renderAnswer = (answer) => {
    if (typeof answer === "function") return answer();
    return <div className={styles.FAQText}>{answer}</div>;
  };

  return (
    <>
      <div className={styles.FAQBorder}>
        <div className={styles.FAQSelect}>
          <div className={styles.FAQContainer}>
            <div className={styles.FAQQuestion}>{question}</div>
          </div>

          <Image
            src={isOpen ? ArrowUp : ArrowDown}
            alt="Toggle"
            width={24}
            height={24}
            onClick={toggleOpen}
            className={styles.FAQQImage}
          />
        </div>
        {isOpen && renderAnswer(answer)}
      </div>
    </>
  );
};

//----------------------------------------------------------------
const reviewAnswer1 = () => (
  <div className={styles.FAQText}>
    <span>
      리뷰란 경매 참여 회원이 낙찰받은 식사 약속을 이행한 이후 해당 식사 자리에
      대한 후기를 작성할 수 있는 고유한 권리입니다. 작성한 리뷰는 다른 회원들도
      열람할 수 있으며, 이를 통해 VIP는 본인의 활동을 점검할 수 있고 다른 경매
      참여 회원은 VIP에 대한 정보를 얻을 수 있는 자료로 삼을 수 있습니다.
    </span>
    <ul className={styles.ul}>
      <li className={styles.vip}>
        <b>경매 참여자의 경우</b>
      </li>
    </ul>
    <p className={styles.vip}>
      [마이페이지] → [식사권] → [상세보기] → [리뷰 남기기]에서 작성할 수
      있습니다.
    </p>
    <ul className={styles.ul}>
      <li className={styles.vip2}>
        <b>VIP의 경우</b>
      </li>
    </ul>
    <p className={styles.vip}>
      [마이페이지] → [VIP로서 받은 리뷰]에서 리뷰를 확인할 수 있습니다.
    </p>
  </div>
);

//----------------------------------------------------------------
//----------------------------------------------------------------
const reviewAnswer2 = () => (
  <div className={styles.FAQText}>
    <span>
      지금까지 낙찰되거나 참여중인 경매 내역은 [마이페이지]에서 확인하실 수
      있습니다. 참여중인 경매는 기본적으로 최고 입찰자일 경우 우선적으로
      표시됩니다. 낙찰된 경매는 식사 만남 전과 후로 구분되어 표시되며
      [식사권]탭에서 상세 내용 확인이 가능합니다.
    </span>
    <ul className={styles.ul}>
      <li className={styles.vip}>
        <b>경매 참여자의 경우</b>
      </li>
    </ul>
    <p className={styles.vip}>[마이페이지] → [식사권] 및 [경매]</p>
    <ul className={styles.ul}>
      <li className={styles.vip2}>
        <b>VIP의 경우</b>
      </li>
    </ul>
    <p className={styles.vip}>[마이페이지] → [진행중인 경매]</p>
  </div>
);

//----------------------------------------------------------------
//----------------------------------------------------------------
const reviewAnswer3 = () => (
  <div className={styles.FAQText}>
    <span>온라인 경매는 진행 중인 경매 상세 페이지에서 응찰 가능합니다.</span>
  </div>
);

//----------------------------------------------------------------
//----------------------------------------------------------------
const reviewAnswer4 = () => (
  <div className={styles.FAQText}>
    <p>
      1. 경매 마감시간 30분 전에 응찰이 있으면, 자동으로 5분 연장됩니다. (1회){" "}
    </p>
    <p>
      2. 보유 포인트 한도 내에서 응찰이 가능합니다. 미리 포인트를 확인해주세요.{" "}
    </p>
    <p>
      3. 동일 금액의 응찰이 발생하면 서버시각에 따라 먼저 응찰금액을 입력하신
      분에게 우선순위가 주어집니다.
    </p>
  </div>
);

//----------------------------------------------------------------
//----------------------------------------------------------------
const reviewAnswer5 = () => (
  <div className={styles.FAQText}>
    <span>응찰 및 낙찰은 취소가 불가능합니다.</span>
  </div>
);

//----------------------------------------------------------------
//----------------------------------------------------------------
const reviewAnswer6 = () => (
  <div className={styles.FAQText}>
    <p>
      낙찰가의 5%는 기부금, 25%는 수수료로 부가됩니다. 식사 자리가 종료되고 3일
      뒤, 수수료와 기부금을 제한 금액이 VIP에게 전달됩니다.
    </p>
  </div>
);

//----------------------------------------------------------------
const Faq = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const faqs = [
    {
      question: "리뷰는 무엇인가요?",
      answer: reviewAnswer1,
      category: "이용 안내",
    },
    {
      question: "지금까지 경매 낙찰 내역을 확인할 수 있나요?",
      answer: reviewAnswer2,
      category: "이용 안내",
    },
    {
      question: "온라인 경매 응찰 방법이 궁금합니다.",
      answer: reviewAnswer3,
      category: "온라인 경매",
    },
    {
      question: "온라인 경매 응찰 시 주의사항은 무엇인가요?",
      answer: reviewAnswer4,
      category: "온라인 경매",
    },
    {
      question: "응찰을 잘못 눌렀어요. 철회가 가능한가요?",
      answer: reviewAnswer5,
      category: "온라인 경매",
    },
    {
      question: "경매 수수료와 기부금은 어떻게 되나요?",
      answer: reviewAnswer6,
      category: "온라인 경매",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) => activeTab === "전체" || faq.category === activeTab
  );

  const Tabs = ({ title, isActive }) => {
    return (
      <div
        className={isActive ? styles.tabActive : styles.tab}
        onClick={() => setActiveTab(title)}
      >
        {title}
      </div>
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
          <Tabs title="전체" isActive={activeTab === "전체"} />
          <Tabs title="이용 안내" isActive={activeTab === "이용 안내"} />
          <Tabs title="온라인 경매" isActive={activeTab === "온라인 경매"} />
        </div>
        <div className={styles.FaqItems}>
          {filteredFaqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Faq;
