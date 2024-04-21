"use client";

import React, { useEffect, useState } from "react";

import styles from "./addAuctionForm.module.css";
import AdressSearch from "./AdressSearch";
import DateTimePickerValue from "./DateTimePickerValue";
import EditorComponent from "./EditorComponent";
import PositionedPopper from "./PositionedPopper";
import DatePopper from "./DatePopper";
import { useUser } from "@/app/utils/UserProvider";
import { useAddAuction } from "@/app/utils/AddAuctionsProvider";
import EditorComponentWaring from "./EditorComponentWaring";
import Link from "next/link";

const AddAuctionForm = () => {
  const { userInfo, isLoading } = useUser();
  const {
    Address,
    AuctionInfo,
    WarningInfo,
    Date,
    createAuction,
    Bid,
    setBid,
  } = useAddAuction();
  const [amount, setAmount] = useState();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState({ hours: "", minutes: "" });

  console.log(Bid, Address, AuctionInfo, WarningInfo, Date);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setDatePickerOpen(false); // 날짜를 선택하면 선택기를 닫습니다.
  };

  const handleTimeChange = (field, value) => {
    setSelectedTime({ ...selectedTime, [field]: value });
  };

  const handleFormSubmit = (event: any) => {
    createAuction(Bid, Date, Address, AuctionInfo, WarningInfo);
  };

  const onChangeAmount = (e) => {
    setBid(e.target.value);
  };
  function formatWithComma(number) {
    return number.toLocaleString();
  }
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.parent}>
      <div className={styles.title}>경매 생성하기</div>
      <div className={styles.mainWrapper}>
        <div className={styles.leftWrapper}>
          <div className={styles.title1}>꼭 확인해주세요</div>
          <div className={styles.title2}>최소 입찰 금액</div>
          <div className={styles.title3}>식사 일시</div>
          <div className={styles.title4}>경매 설명</div>
          <div className={styles.title5}>경매 생성 동의</div>
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.content1}>
            <div className={styles.content1Text}>
              본 경매에 대해 불이행 시 모든 책임은 본인에게 있습니다.
              <br />
              본인의 시간을 상품으로서 판매하는 경매입니다. 시간 약속은 청저하게
              지키셔야 하며, 신중하게 경매를 등록하시기 바랍니다. <br />
              낙찰된 경매에 대해 이행 취소 시 VIP자격은 영구 박탈될 수 있습니다.
            </div>
          </div>
          <div className={styles.Bline} />
          <div className={styles.content2}>
            <div className={styles.content2Wrapper}>
              <div className={styles.subTitle}>최소 입찰 금액 </div>
              <div className={styles.content2Content}>
                <input
                  onChange={onChangeAmount}
                  value={amount}
                  required
                  className={styles.content2Input}
                  placeholder="최소 100,000원부터 설정할 수 있어요."
                  type="number"
                />
                <div className={styles.content2Content1}>
                  <span className={styles.content2ContentText}>
                    현재 보유 포인트
                  </span>
                  <span className={styles.content2ContentText2}>
                    {formatWithComma(userInfo.point)} P
                  </span>
                  <div className={styles.border}>
                    최종 낙찰 금액의 70% (VIP의 소득 + 식사비)
                    <br />
                    서비스 제공 수수료 25%
                    <br />
                    기부금 모금 5%
                    <br />
                  </div>
                </div>
              </div>

              <Link href={"/chargepoint"}>
                <div className={styles.contet3}>결제 </div>
              </Link>
            </div>
          </div>
          <div className={styles.Bline} />
          <div className={styles.content3}>
            <div className={styles.content3Wrapper}>
              <div className={styles.subTitle3Wrapper}>
                <div className={styles.subTitle1}>식사 날짜 </div>

                <div className={styles.subTitle3}>식사 장소 </div>
              </div>
              <div className={styles.content3Content}>
                <div className={styles.timeInput}>
                  <DateTimePickerValue />
                </div>
                <div className={styles.conten3subtitle}>
                  낙찰자와 채팅을 통해 변경할 수 있어요.
                </div>
                <div className={styles.timeWaring}>
                  사용자의 귀책 사유로 인해 약속된 최소 만남 시간(n시간)을
                  채우지 못할 경우 <br />
                  VIP : 낙찰금은 사용자에게 전액 환불됩니다.
                </div>
                <AdressSearch />
                <div className={styles.adressSubTitle}>
                  낙찰자와 채팅을 통해 변경할 수 있어요.
                </div>
              </div>
              <div className={styles.thirdpart}></div>
            </div>
          </div>
          <div className={styles.Bline} />
          <div className={styles.content3}>
            <div className={styles.content3Wrapper}>
              <div className={styles.subTitle3Wrapper}>
                <div className={styles.subTitle77}>경매에 대한 소개</div>
                <div className={styles.subTitle77}>경매 수칙 </div>
              </div>
              <div className={styles.content4Content}>
                <div className={styles.TextEditor1}>
                  <EditorComponent />
                </div>

                <div className={styles.TextEditor2}>
                  <EditorComponentWaring />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.Bline} />
          <div className={styles.agree}>
            <div className={styles.AuthCheck}>
              <input type="radio" />
              <span className={styles.AuthCheckText}>
                (필수) 위 내용을 모두 읽고 경매 생성에 동의합니다.
              </span>
              <div className={styles.vlftn}>*</div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.apply} onClick={handleFormSubmit}>
                경매 생성
              </button>
              <button className={styles.cancle}>취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAuctionForm;

// <div className={styles.AddFormContainer}>
//   <div className={styles.AddFormMoneyContainer}>
//     <div>
//       <div className={styles.FeePolicy}>
//         <PositionedPopper />
//       </div>
//     </div>
//     <div className={styles.PointInfo}>
//       <div className={styles.PointInfoInput}>
//         <input
//           type="number"
//           onChange={onChangeAmount}
//           value={amount}
//           required
//         />
//         <div>
//           보유 포인트:
//           {userInfo.point}
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className={styles.AddFormDateContainer}>
//     <DatePopper />
//     <DateTimePickerValue />
//   </div>
//   <div className={styles.AddFormAddressContainer}>
//     <div>식사 장소를 지정해 주세요</div>
//     <div className={styles.PostContainer}>
//
//     </div>
//   </div>
//   <div className={styles.AddFormTextContainer}>
//     <div className={styles.TextEditor}>
//       <div>이 만남은 이런거에요</div>
//       <EditorComponent />
//     </div>
//   </div>
//   <div className={styles.AddFormTextContainer}>
//     <div className={styles.TextEditor}>
//       <div>이것 만큼은 지켜주세요</div>
//       <EditorComponentWaring />
//     </div>
//   </div>
//   <div className={styles.AuthCheck}>
//     <input type="radio" />
//     <span>모든 내용을 이해하였고 동의합니다</span>
//   </div>
//   <div className={styles.ButtonContainer}>
//     <button className="btn-basic" onClick={handleFormSubmit}>
//       경매생성
//     </button>
//     <button className="btn-basic">취소</button>
//   </div>
// </div>;
