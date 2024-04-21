"use client";
import styles from "./ticketListTable.module.css";

interface TicketListData {
  ticketUUID: string;
  organizerName: string;
  organizerNickname: string;
  winnerName: string;
  winnerNickname: string;
  meetingDate: string;
  ticketIsOpened: boolean;
}

interface TicketListTableProps {
  pageData: {
    content: TicketListData[];
    number: number;
    size: number;
  };
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterPress: () => void;
  onApprove: (uuid: string) => void;
}

const translateShowedStatus = (showed: boolean) => {
  return showed ? "열림" : "닫힘";
};

const TicketListTable: React.FC<TicketListTableProps> = ({
  pageData,
  inputValue,
  handleInputChange,
  handleEnterPress,
  onApprove,
}) => {
  return (
    <>
      <h2 className={styles.tableTitle}>식사권 조회</h2>
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
            <th>VIP 이름</th>
            <th>VIP 닉네임</th>
            <th>낙찰자 이름</th>
            <th>낙찰자 닉네임</th>
            <th>만남 날짜</th>
            <th>식사권 상태</th>
            <th>식사권 닫기</th>
          </tr>
        </thead>
        <tbody>
          {pageData.content.map((data, index) => (
            <tr key={data.ticketUUID}>
              <td>{pageData.number * pageData.size + index + 1}</td>
              <td>{data.organizerName}</td>
              <td>{data.organizerNickname}</td>
              <td>{data.winnerName}</td>
              <td>{data.winnerNickname}</td>
              <td>{data.meetingDate}</td>
              <td>{translateShowedStatus(data.ticketIsOpened)}</td>
              <td>
                <button
                  className={styles["refusal-btn"]}
                  onClick={() => onApprove(data.ticketUUID)}
                >
                  닫기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TicketListTable;
