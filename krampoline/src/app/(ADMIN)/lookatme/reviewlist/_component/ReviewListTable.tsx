"use client";
import styles from "./reviewListTable.module.css";

interface ReviewListData {
  reviewUUID: string;
  writerNickname: string;
  receiverNickname: string;
  reviewContent: string;
  createdTime: string;
  showed: boolean;
}

interface ReviewListTableProps {
  pageData: {
    content: ReviewListData[];
    number: number;
    size: number;
  };
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterPress: () => void;
  onApprove: (uuid: string) => void;
}

const translateShowedStatus = (showed: boolean) => {
  return showed ? "표시" : "숨김";
};

const ReviewListTable: React.FC<ReviewListTableProps> = ({
  pageData,
  inputValue,
  handleInputChange,
  handleEnterPress,
  onApprove,
}) => {
  return (
    <>
      <h2 className={styles.tableTitle}>리뷰 조회</h2>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="검색"
          autoComplete="off"
          spellCheck="false"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEnterPress();
          }}
        />
      </div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>번호</th>
            <th>작성자</th>
            <th>VIP</th>
            <th>리뷰 내용</th>
            <th>작성 날짜</th>
            <th>리뷰 상태</th>
            <th>리뷰 숨김</th>
          </tr>
        </thead>
        <tbody>
          {pageData.content.map((data, index) => (
            <tr key={data.reviewUUID}>
              <td>{pageData.number * pageData.size + index + 1}</td>
              <td>{data.writerNickname}</td>
              <td>{data.receiverNickname}</td>
              <td>{data.reviewContent}</td>
              <td>{data.createdTime}</td>
              <td>{translateShowedStatus(data.showed)}</td>
              <td>
                <button
                  className={styles["refusal-btn"]}
                  onClick={() => onApprove(data.reviewUUID)}
                >
                  숨김
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ReviewListTable;
