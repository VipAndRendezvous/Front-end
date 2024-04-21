"use client";
import styles from "./chatListTable.module.css";

interface ChatListData {
  chatRoomUUID: string;
  organizerName: string;
  organizerNickname: string;
  winnerName: string;
  winnerNickname: string;
  meetingDate: string;
  chatRoomIsOpened: boolean;
}

interface ChatListTableProps {
  pageData: {
    content: ChatListData[];
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

const ChatListTable: React.FC<ChatListTableProps> = ({
  pageData,
  inputValue,
  handleInputChange,
  handleEnterPress,
  onApprove,
}) => {
  return (
    <>
      <h2 className={styles.tableTitle}>채팅방 조회</h2>
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
            <th>채팅방 상태</th>
            <th>채팅방 닫기</th>
          </tr>
        </thead>
        <tbody>
          {pageData.content.map((data, index) => (
            <tr key={data.chatRoomUUID}>
              <td>{pageData.number * pageData.size + index + 1}</td>
              <td>{data.organizerName}</td>
              <td>{data.organizerNickname}</td>
              <td>{data.winnerName}</td>
              <td>{data.winnerNickname}</td>
              <td>{data.meetingDate}</td>
              <td>{translateShowedStatus(data.chatRoomIsOpened)}</td>
              <td>
                <button
                  className={styles["refusal-btn"]}
                  onClick={() => onApprove(data.chatRoomUUID)}
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

export default ChatListTable;
