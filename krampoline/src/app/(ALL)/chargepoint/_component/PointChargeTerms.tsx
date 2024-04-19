"use client";

import { ChangeEvent, useState } from "react";
import styles from "./pointChargeTerms.module.css";
import { usePoint } from "@/app/utils/ChargePointProvider";

const TermsItem = ({
  question,
  answer,
  onAgree,
}: {
  question: string;
  answer: React.ReactNode;
  onAgree: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen: () => void = () => setIsOpen(!isOpen); // 토글 함수

  return (
    <>
      <div className={styles.AddAuctionSelect} onClick={toggleOpen}>
        <div>{question}</div>
      </div>
      {isOpen && (
        <div className={styles.AddAuctionText}>
          {answer}
          <div>
            <label>
              <input type="radio" name="agree" onChange={() => onAgree(true)} />
              동의합니다
            </label>
          </div>
        </div>
      )}
    </>
  );
};

const PointChargeOption = () => {
  const { onClickPayment } = usePoint();
  const [isAgreed, setIsAgreed] = useState(false);
  const [chargeAmount, setChargeAmount] = useState(0); // 충전 금액 상태 추가

  const handleAgree: () => void = () => {
    setIsAgreed(true); // 동의 시 상태 업데이트
  };

  // 금액 버튼 클릭 시 누적하는 함수. 누적할 때 문자열로 처리
  const handleAddAmount = (amount: number) => {
    setChargeAmount((prev) => prev + amount);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setChargeAmount(value);
    } else {
      setChargeAmount(0);
    }
  };

  const handlePaymentClick = () => {
    if (chargeAmount > 0 && isAgreed) {
      onClickPayment(chargeAmount);
    } else {
      alert("유효한 금액을 입력하고 약관에 동의해주세요.");
    }
  };

  const Terms = [
    {
      question: "포인트에 대한 이용약관",
      answer: (
        <div>
          이 부분은 포인트에 대한 이용약관이 들어갈 예정입니다.
          <br />
          이 부분은 포인트에 대한 이용약관이 들어갈 예정입니다.
          <br />
          이 부분은 포인트에 대한 이용약관이 들어갈 예정입니다.
          <br />
          이 부분은 포인트에 대한 이용약관이 들어갈 예정입니다.
          <br />
          이 부분은 포인트에 대한 이용약관이 들어갈 예정입니다.
          <br />
          이 부분은 포인트에 대한 이용약관이 들어갈 예정입니다.
          <br />
          이 부분은 포인트에 대한 이용약관이 들어갈 예정입니다.
          <br />
          이 부분은 포인트에 대한 이용약관이 들어갈 예정입니다.
          <br />
          이 부분은 포인트에 대한 이용약관이 들어갈 예정입니다.
          <br />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.ChargePointContainer}>
      <h1>포인트 충전하기</h1>
      <div className={styles.ChargePointTermsContainer}>
        {Terms.map((faq, index: number) => (
          <TermsItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            onAgree={handleAgree}
          />
        ))}
      </div>
      <div className={styles.ChargePointInputContainer}>
        <div className={styles.ChargePointInput}>
          <input
            type="number"
            placeholder="충전은 만원 단위로 가능합니다."
            value={chargeAmount}
            onChange={handleInputChange}
          />
          <button
            className="btn-basic"
            disabled={!isAgreed || chargeAmount <= 0}
            onClick={handlePaymentClick}
          >
            충전하기
          </button>
        </div>
        <div className={styles.ChargePointButtonGroup}>
          <button
            className="btn-basic"
            onClick={() => handleAddAmount(1000000)}
          >
            100만원
          </button>
          <button className="btn-basic" onClick={() => handleAddAmount(100000)}>
            10만원
          </button>
          <button className="btn-basic" onClick={() => handleAddAmount(50000)}>
            5만원
          </button>
          <button className="btn-basic" onClick={() => handleAddAmount(10000)}>
            1만원
          </button>
        </div>
      </div>
    </div>
  );
};

export default PointChargeOption;
