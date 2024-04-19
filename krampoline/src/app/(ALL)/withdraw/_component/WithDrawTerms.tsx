"use client";

import { ChangeEvent, useState } from "react";
import styles from "./withDrawTerms.module.css";
import { useUser } from "@/app/utils/UserProvider";
import { usePoint } from "@/app/utils/ChargePointProvider";

const banks: string[] = [
  "KB국민은행",
  "신한은행",
  "하나은행",
  "우리은행",
  "NH농협은행",
];

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

const WithDrawTerms = () => {
  const { userInfo } = useUser();
  const { withdrawOrder } = usePoint();
  const [isAgreed, setIsAgreed] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(""); // 출금 금액 상태
  const [bank, setBank] = useState(""); // 은행 상태
  const [accountNumber, setAccountNumber] = useState(""); // 계좌번호 상태
  const [accountHolder, setAccountHolder] = useState(""); // 계좌번호 상태

  if (!userInfo) {
    return <div>Loading or not logged in...</div>;
  }

  // 출금할 금액을 누적하는 함수
  const handleAddAmount = (amount: number) => {
    setWithdrawAmount((prev) => {
      const prevAmount = Number(prev) || 0; // 이전 금액이 없으면 0으로 처리
      const newAmount = prevAmount + amount;
      // 새로운 금액이 사용자의 포인트를 초과하지 않도록 검사
      if (newAmount <= userInfo.point) {
        return newAmount.toString(); // 새로운 금액을 문자열로 변환하여 반환
      }
      return prev; // 사용자의 포인트를 초과하는 경우, 이전 금액을 유지
    });
  };

  // "전액" 버튼 클릭 시 사용자 포인트 전체를 출금 금액으로 설정
  const handleFullAmount = () => {
    setWithdrawAmount(userInfo.point.toString());
  };

  const handleWithdrawAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputAmount = Number(e.target.value);
    if (inputAmount <= userInfo.point) {
      // 사용자가 입력한 금액이 사용자의 포인트보다 같거나 작을 때만 상태를 업데이트
      setWithdrawAmount(e.target.value);
    } else {
      setWithdrawAmount(userInfo.point.toString()); // 그렇지 않으면, 사용자의 최대 포인트로 설정
    }
  };

  const handleWithdrawOrder = () => {
    withdrawOrder(bank, accountNumber, accountHolder, withdrawAmount);
  };

  const canSubmit = isAgreed && bank && accountNumber && withdrawAmount;

  const Terms = [
    {
      question: "출금에 대한 이용약관",
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
    <div className={styles.WithDrawContainer}>
      <h1>포인트 출금신청하기</h1>
      <div className={styles.WithDrawTermsContainer}>
        {Terms.map((faq, index: number) => (
          <TermsItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            onAgree={() => setIsAgreed(true)}
          />
        ))}
      </div>
      <div className={styles.WithDrawInputContainer}>
        <div className={styles.WithDrawInfoInput}>
          <div>은행을 선택해주세요</div>
          <select value={bank} onChange={(e) => setBank(e.target.value)}>
            <option value="">은행 선택</option>
            {banks.map((bankName) => (
              <option key={bankName} value={bankName}>
                {bankName}
              </option>
            ))}
          </select>

          <div>예금주을 입력해주세요</div>
          <input
            type="text"
            placeholder="예금주를 입력해주세요"
            value={accountHolder}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAccountHolder(e.target.value)
            }
          />

          <div>계좌번호를 입력해주세요</div>
          <input
            type="number"
            placeholder="계좌번호를 입력해주세요"
            value={accountNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAccountNumber(e.target.value)
            }
          />
          <div>출금 가능한 포인트</div>
          <input
            type="number"
            placeholder="출금 가능한 포인트"
            value={userInfo.point}
            readOnly
          />
          <div>출금할 포인트</div>
          <input
            type="number"
            placeholder="출금할 금액 입력"
            value={withdrawAmount}
            onChange={handleWithdrawAmountChange}
          />
        </div>
        <button
          className="btn-basic"
          disabled={!canSubmit}
          onClick={handleWithdrawOrder}
        >
          출금신청하기
        </button>

        <div className={styles.WithDrawButtonGroup}>
          <button className="btn-basic" onClick={handleFullAmount}>
            전액
          </button>
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

export default WithDrawTerms;
