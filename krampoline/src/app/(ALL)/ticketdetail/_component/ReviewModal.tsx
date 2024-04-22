import { useUser } from "@/app/utils/UserProvider";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import axios from "axios";
import React, { useState } from "react";

const ReviewModal = ({ onReViewClose, handleWriteReview }) => {
  const [rating, setRating] = useState(0); // 사용자가 선택한 별점을 관리할 상태
  const [review, setReview] = useState(""); // 사용자의 리뷰 텍스트를 관리할 상태
  const { globalTicketUUID } = useUser();

  // 별점을 선택할 때 호출되는 함수
  const handleRating = (rate) => {
    setRating(rate);
  };

  // 리뷰 텍스트가 변경될 때 호출되는 함수
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  // 제출 버튼이 클릭될 때 호출되는 함수
  const handleSubmit = async (event) => {
    handleWriteReview();
    try {
      const token = localStorage.getItem("Authorization");

      // API 요청 부분
      const response = await HttpAuthInstance.post(`/api/ticket/review`, {
        ticketUUID: globalTicketUUID,
        reviewContent: review,
        reviewRating: rating,
      });
      if (response.status === 200) {
        onReViewClose(); // 모달 닫기 함수 호출
      }
    } catch (error) {
      console.error("API submission error:", error);
      onReViewClose(); // 오류 발생 시에도 모달 닫기
    }

    onReViewClose(); // 모달 닫기
  };

  // 별점을 렌더링하는 컴포넌트
  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      return (
        <span key={index} onClick={() => handleRating(index + 1)}>
          {rating > index ? "★" : "☆"}{" "}
          {/* 별점에 따라 채워진 별 혹은 빈 별 표시 */}
        </span>
      );
    });
  };

  return (
    <div className="review-modal">
      <div className="review-rating">{renderStars()}</div>
      <textarea
        value={review}
        onChange={handleReviewChange}
        placeholder="경험을 작성해 주세요..."
      />
      <button className="btn-submit" onClick={handleSubmit}>
        등록하기
      </button>
      {/* <button className="btn-submit" onClick={onReViewClose()}>
        닫기
      </button> */}
    </div>
  );
};

export default ReviewModal;
