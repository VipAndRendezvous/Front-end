"use client";
import styles from "./ticketReportTable.module.css";

interface TicketReportData {
  ticketReportUUID: string;
  ticketReportNickname: string;
  ticketReportContent: string;
  ticketReportEvidenceUrl: string;
  ticketReportStatus: string;
}

interface TicketReportTableProps {
  pageData: {
    content: TicketReportData[];
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

const TicketReportTable: React.FC<TicketReportTableProps> = ({
  pageData,
  inputValue,
  handleInputChange,
  handleEnterPress,
  onApprove,
  onRefuse,
}) => {
  return (
    <>
      <h2 className={styles.tableTitle}>식사권 신고</h2>
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
            <th>신고 내용</th>
            <th>신고 증거</th>
            <th>신고 상태</th>
            <th>승인</th>
            <th>반려</th>
          </tr>
        </thead>
        <tbody>
          {pageData.content.map((data, index) => (
            <tr key={data.ticketReportUUID}>
              <td>{pageData.number * pageData.size + index + 1}</td>
              <td>{data.ticketReportNickname}</td>
              <td>{data.ticketReportContent}</td>
              <td>
                <a href={data.ticketReportEvidenceUrl} target="_blank">
                  {data.ticketReportEvidenceUrl}
                </a>
              </td>
              <td>{translateStatus(data.ticketReportStatus)}</td>
              <td>
                <button
                  className={styles["approval-btn"]}
                  onClick={() => onApprove(data.ticketReportUUID)}
                >
                  승인
                </button>
              </td>
              <td>
                <button
                  className={styles["refusal-btn"]}
                  onClick={() => onRefuse(data.ticketReportUUID)}
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

export default TicketReportTable;
