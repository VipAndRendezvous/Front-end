"use client";

import React, { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./addAuctionForm.module.css";
import AdressSearch from "./AdressSearch";
import DatePicker from "react-datepicker";
import EditorComponent from "./EditorComponent";
import EditorComponentWaring from "./EditorComponentWaring";
import { useUser } from "@/app/utils/UserProvider";
import { useAddAuction } from "@/app/utils/AddAuctionsProvider";
import Link from "next/link";
import CustomMinutePicker from "./CustomMinutePicker";
import CustomHourPicker from "./CustomHourPicker";

const AddAuctionForm = () => {
  const { userInfo, isLoading } = useUser();
  const {
    Address,
    AuctionInfo,
    WarningInfo,
    Date: selectedDate,
    createAuction,
    Bid,
    setBid,
    setDate,
  } = useAddAuction();
  const [amount, setAmount] = useState<number | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHourPicker, setShowHourPicker] = useState(false);
  const [showMinutePicker, setShowMinutePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);

  const hourPickerRef = useRef<HTMLDivElement>(null);
  const minutePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hourPickerRef.current &&
        !hourPickerRef.current.contains(event.target as Node)
      ) {
        setShowHourPicker(false);
      }
      if (
        minutePickerRef.current &&
        !minutePickerRef.current.contains(event.target as Node)
      ) {
        setShowMinutePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (date: Date | null) => {
    setDate(date);
    setShowDatePicker(false); // 날짜 선택 후 DatePicker 숨기기
  };

  const handleHourChange = (hour: number) => {
    setSelectedHour(hour);
    setShowHourPicker(false); // 시간 선택 후 커스텀 시 선택기 숨기기
  };

  const handleMinuteChange = (minute: number) => {
    setSelectedMinute(minute);
    setShowMinutePicker(false); // 분 선택 후 커스텀 분 선택기 숨기기
  };

  const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (selectedDate) {
      const meetingDate = new Date(selectedDate);
      if (selectedHour !== null) {
        meetingDate.setHours(selectedHour);
      }
      if (selectedMinute !== null) {
        meetingDate.setMinutes(selectedMinute);
      }
      // 밀리초와 초를 0으로 설정
      meetingDate.setSeconds(0);
      meetingDate.setMilliseconds(0);
      // 로컬 시간대에서 YYYY-MM-DDTHH:MM:SS 형식으로 변환
      const formattedDate = meetingDate.toISOString().split(".")[0];
      console.log("Formatted Date:", formattedDate); // 출력된 값을 확인합니다.
      createAuction(Bid, formattedDate, Address, AuctionInfo, WarningInfo);
    }
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBid(e.target.value);
  };

  const formatWithComma = (number: number) => {
    return number.toLocaleString();
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 30); // 현재 날짜보다 7일 후

  const getDayClassName = (date: Date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return styles.today; // 오늘 날짜에 대해 특정 클래스를 반환
    }
    return "";
  };

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
                <div className={styles.subTitle2}>식사 시간 </div>

                <div className={styles.subTitle3}>식사 장소 </div>
              </div>
              <div className={styles.content3Content}>
                <div className={styles.content3Controll}>
                  <input
                    required
                    className={styles.content4Input}
                    value={
                      selectedDate
                        ? selectedDate.toLocaleDateString("ko-KR")
                        : ""
                    }
                    readOnly
                    placeholder="날짜를 선택해주세요."
                  />
                  <img
                    src="/CalendarDots.png"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    alt="calendar icon"
                  />
                  {showDatePicker && (
                    <div className={styles.datePickerWrapper}>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        dateFormat="yyyy.MM.dd"
                        minDate={minDate}
                        dayClassName={getDayClassName}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.conten3subtitle}>
                  낙찰자와 채팅을 통해 변경할 수 있어요.
                </div>
                <div className={styles.timeInput}>
                  <div>
                    <input
                      required
                      className={styles.timeInputField}
                      value={
                        // 시간을 12시간 형식으로 표시하고 AM/PM을 추가하는 부분
                        selectedHour !== null
                          ? new Date(0, 0, 0, selectedHour)
                              .toLocaleTimeString([], {
                                hour: "2-digit",
                                hour12: true,
                              })
                              .replace(":00", "")
                          : ""
                      }
                      readOnly
                      onClick={() => setShowHourPicker(true)}
                    />
                    {showHourPicker && (
                      <div
                        className={styles.datePickerWrapper1}
                        ref={hourPickerRef}
                      >
                        <CustomHourPicker
                          selectedHour={selectedHour}
                          onChange={handleHourChange}
                        />
                      </div>
                    )}
                  </div>
                  <span className={styles.spanStyled}>시</span>
                  <div>
                    <input
                      required
                      className={styles.timeInputField}
                      value={
                        selectedMinute !== null ? selectedMinute.toString() : ""
                      }
                      readOnly
                      onClick={() => setShowMinutePicker(true)}
                    />
                    {showMinutePicker && (
                      <div
                        className={styles.datePickerWrapper2}
                        ref={minutePickerRef}
                      >
                        <CustomMinutePicker
                          selectedMinute={selectedMinute}
                          onChange={handleMinuteChange}
                        />
                      </div>
                    )}
                  </div>
                  <span className={styles.spanStyled}>분</span>
                </div>

                <div className={styles.timeWaring}>
                  사용자의 귀책 사유로 인해 약속된 최소 만남 시간(n시간)을
                  채우지 못할 경우 <br />
                  <li> VIP : 낙찰금은 사용자에게 전액 환불됩니다.</li>
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
