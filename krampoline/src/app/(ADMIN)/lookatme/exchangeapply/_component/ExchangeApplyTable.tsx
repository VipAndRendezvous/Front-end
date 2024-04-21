"use client";
import styles from "./exchangeApplyTable.module.css";

interface ExchangeApplyData {
  exchangeUUID: string;
  name: string;
  nickname: string;
  exchangePoint: BigInteger;
  exchangeBank: string;
  exchangeAccount: string;
  exchangeAccountHolder: string;
  createdTime: string;
}

interface ExchangeApplyTableProps {
  pageData: {
    content: ExchangeApplyData[];
    number: number;
    size: number;
  };
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterPress: () => void;
  onApprove: (uuid: string) => void;
  onRefuse: (uuid: string) => void;
}

const ExchangeApplyTable: React.FC<ExchangeApplyTableProps> = ({
  pageData,
  inputValue,
  handleInputChange,
  handleEnterPress,
  onApprove,
  onRefuse,
}) => {
  return (
    <>
      <h2 className={styles.tableTitle}>출금 신청</h2>
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
            <th>이름</th>
            <th>닉네임</th>
            <th>은행명</th>
            <th>계좌</th>
            <th>예금주</th>
            <th>신청 포인트</th>
            <th>신청 날짜</th>
            <th>승인</th>
            <th>반려</th>
          </tr>
        </thead>
        <tbody>
          {pageData.content.map((data, index) => (
            <tr key={data.exchangeUUID}>
              <td>{pageData.number * pageData.size + index + 1}</td>
              <td>{data.name}</td>
              <td>{data.nickname}</td>
              <td>{data.exchangeBank}</td>
              <td>{data.exchangeAccount}</td>
              <td>{data.exchangeAccountHolder}</td>
              <td>{data.exchangePoint}</td>
              <td>{data.createdTime}</td>
              <td>
                <button
                  className={styles["approval-btn"]}
                  onClick={() => onApprove(data.exchangeUUID)}
                >
                  승인
                </button>
              </td>
              <td>
                <button
                  className={styles["refusal-btn"]}
                  onClick={() => onRefuse(data.exchangeUUID)}
                >
                  반려
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ExchangeApplyTable;
