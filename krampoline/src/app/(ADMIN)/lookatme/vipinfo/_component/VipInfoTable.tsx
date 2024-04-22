"use client";
import styles from "./vipInfoTable.module.css";

interface VipInfoData {
  vipInfoUUID: string;
  vipName: string;
  vipCareer: string;
  vipIntroduce: string;
  vipEvidenceUrl: string;
}

interface VipInfoTableProps {
  pageData: {
    content: VipInfoData[];
    number: number;
    size: number;
  };
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterPress: () => void;
  onDetailRequest: (uuid: string) => void;
  onApprove: (uuid: string) => void;
  onRefuse: (uuid: string) => void;
}

const VipInfoTable: React.FC<VipInfoTableProps> = ({
  pageData,
  inputValue,
  handleInputChange,
  handleEnterPress,
  onDetailRequest,
  onApprove,
  onRefuse,
}) => {
  return (
    <>
      <h2 className={styles.tableTitle}>VIP 신청</h2>
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
            <th>소개</th>
            <th>승인</th>
            <th>반려</th>
          </tr>
        </thead>
        <tbody>
          {pageData.content.map((data, index) => (
            <tr key={data.vipInfoUUID}>
              <td>{pageData.number * pageData.size + index + 1}</td>
              <td>{data.vipName}</td>
              <td>
                <a
                  className={styles["introduce-btn"]}
                  onClick={() => onDetailRequest(data.vipInfoUUID)}
                >
                  {data.vipIntroduce}
                </a>
              </td>
              <td>
                <button
                  className={styles["approval-btn"]}
                  onClick={() => onApprove(data.vipInfoUUID)}
                >
                  승인
                </button>
              </td>
              <td>
                <button
                  className={styles["refusal-btn"]}
                  onClick={() => onRefuse(data.vipInfoUUID)}
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

export default VipInfoTable;
