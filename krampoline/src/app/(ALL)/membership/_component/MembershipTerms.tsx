"use client";

import { ChangeEvent, useState } from "react";
import styles from "./membershipTerms.module.css";
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

  const toggleOpen: () => void = () => setIsOpen(!isOpen);

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
  const { onClickAddSub } = usePoint();
  const [isAgreed, setIsAgreed] = useState(false);
  const [chargeAmount] = useState(5900); // 충전 금액 상태 추가

  const handleAgree: () => void = () => {
    setIsAgreed(true);
  };

  const handlePaymentClick = () => {
    onClickAddSub(chargeAmount);
  };

  const Terms = [
    {
      question: "구독권에 대한 이용약관",
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
    <div className="MembershipContainer">
      <div className="MembershipTitleContainer">
        <h1>수많은 VIP 중</h1>
        <h1>인생의 멘토를 찾아보세요</h1>
        <div>5,900원으로 시작하세요. 해지는 언제든 가능합니다.</div>
        <div>
          VIP와의 식사자리를 차지할 준비가 되셨나요? 멤버십을 등록하거나
          재시작하려면 아래 버튼을 클릭하세요.
        </div>
      </div>
      <div className="MembershipTermsContainer">
        {Terms.map((faq, index: number) => (
          <TermsItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            onAgree={handleAgree}
          />
        ))}
      </div>
      <div className="MembershipInputContainer">
        <div className="MembershipInput">
          <button
            className="btn-basic"
            disabled={!isAgreed}
            onClick={handlePaymentClick}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PointChargeOption;
