"use client";
import styles from "./auctionListTable.module.css";

interface AuctionListData {
  auctionUUID: string;
  vipNickname: string;
  createdTime: string;
  currentHighestBidAmount: BigInteger;
  bidCount: BigInteger;
}

interface AuctionListTableProps {
  pageData: {
    content: AuctionListData[];
    number: number;
    size: number;
  };
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterPress: () => void;
  onApprove: (uuid: string) => void;
}

const AuctionListTable: React.FC<AuctionListTableProps> = ({
  pageData,
  inputValue,
  handleInputChange,
  handleEnterPress,
  onApprove,
}) => {
  return (
    <>
      <h2 className={styles.tableTitle}>경매 조회</h2>
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
            <th>VIP 닉네임</th>
            <th>생성 날짜</th>
            <th>최고 입찰가</th>
            <th>입찰 수</th>
            <th>경매 취소</th>
          </tr>
        </thead>
        <tbody>
          {pageData.content.map((data, index) => (
            <tr key={data.auctionUUID}>
              <td>{pageData.number * pageData.size + index + 1}</td>
              <td>{data.vipNickname}</td>
              <td>{data.createdTime}</td>
              <td>{data.currentHighestBidAmount}</td>
              <td>{data.bidCount}</td>
              <td>
                <button
                  className={styles["refusal-btn"]}
                  onClick={() => onApprove(data.auctionUUID)}
                >
                  취소
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AuctionListTable;
