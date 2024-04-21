"use client";
import styles from "./chatReportTable.module.css";

interface ChatReportData {
  chatReportUUID: string;
  chatReportNickname: string;
  chatReportTargetNickname: string;
  chatReportContent: string;
  chatReportStatus: string;
}

interface ChatReportTableProps {
  pageData: {
    content: ChatReportData[];
    number: number;
    size: number;
  };
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterPress: () => void;
  onApprove: (uuid: string) => void;
  onRefuse: (uuid: string) => void;
}

const translateStatus = (status: string): string => {
  switch (status) {
    case "REFUSAL":
      return "반려";
    case "STANDBY":
      return "대기";
    case "APPROVE":
      return "승인";
    default:
      return status;
  }
};

const ChatReportTable: React.FC<ChatReportTableProps> = ({
  pageData,
  inputValue,
  handleInputChange,
  handleEnterPress,
  onApprove,
  onRefuse,
}) => {
  return (
    <>
      <h2 className={styles.tableTitle}>채팅 신고</h2>
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
            <th>신고자</th>
            <th>대상자</th>
            <th>신고 내용</th>
            <th>신고 상태</th>
            <th>승인</th>
            <th>반려</th>
          </tr>
        </thead>
        <tbody>
          {pageData.content.map((data, index) => (
            <tr key={data.chatReportUUID}>
              <td>{pageData.number * pageData.size + index + 1}</td>
              <td>{data.chatReportNickname}</td>
              <td>{data.chatReportTargetNickname}</td>
              <td>{data.chatReportContent}</td>
              <td>{translateStatus(data.chatReportStatus)}</td>
              <td>
                <button
                  className={styles["approval-btn"]}
                  onClick={() => onApprove(data.chatReportUUID)}
                >
                  승인
                </button>
              </td>
              <td>
                <button
                  className={styles["refusal-btn"]}
                  onClick={() => onRefuse(data.chatReportUUID)}
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

export default ChatReportTable;
