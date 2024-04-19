import React, { useState } from "react";
interface TicketCancelProps {
  onClose: () => void;
}
const FaqItem = ({
  question,
  answer,
  onAgree,
}: {
  question: string;
  answer: React.ReactNode;
  onAgree: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="AddAuctionSelect" onClick={toggleOpen}>
        <div>{question}</div>
        <div>{isOpen ? "-" : "+"}</div>
      </div>
      {isOpen && (
        <div className="AddAuctionText">
          {answer}
          <div>
            <label>
              <input type="radio" name="agree" onChange={() => onAgree(true)} />{" "}
              동의합니다
            </label>
          </div>
        </div>
      )}
    </>
  );
};

const TicketCancel: React.FC<TicketCancelProps> = ({ onClose }) => {
  const [isAgreed, setIsAgreed] = useState(false); // 동의 상태 관리를 위한 상태 추가

  const handleAgree = () => {
    setIsAgreed(true); // 동의 시 상태 업데이트
  };
  const faqs = [
    {
      question: "낙찰 취소 정책",
      answer: (
        <div>
          <li>- 낙찰 취소 정책</li>
          <li>
            - 낙찰 취소시 기본 30% 위약금이 발생합니다.(무분별한 응찰 또는 낙찰
            방지)
          </li>
          <li>
            - 기본 30%는 서비스 제공자, 추가 발생 위약금은 유명인에게 지급
          </li>
          <li>- 낙찰 이후 - 기본 30% </li>
          <li>- 식사 날 기준</li>
          <li>- 식사 21일 ~ 15일 전- 기본 30% + 10%</li>
          <li>- 식사 14일 ~ 8일 전 - 기본 30% + 30%</li>
          <li>- 식사 7일 ~ 1일 전 - 기본 30% + 50%</li>
          <li>- 식사 당일 환불 - 기본 30% + 70%</li>
        </div>
      ),
    },
  ];
  return (
    <div className="AddAuctionBoard">
      <div className="AddAuctionContainer">
        {faqs.map((faq, index) => (
          // FaqItem에 onAgree prop으로 handleAgree 함수 전달
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            onAgree={handleAgree}
          />
        ))}
      </div>
      <div>
        최소를 확정하면 변경할 수 없습니다. <br />
        신중히 경정해 주시길 바랍니다.
      </div>

      <div>반환 예정 금액: 000,000,000,000</div>

      <div>
        {/* isAgreed 상태에 따라 낙찰 취소 버튼 활성화 조건 추가 */}
        <button className="btn-basic" disabled={!isAgreed}>
          낙찰 취소
        </button>
        <button className="btn-basic" onClick={onClose}>
          아니요
        </button>
      </div>
    </div>
  );
};

export default TicketCancel;
