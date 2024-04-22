"use client";
import styles from "./userListTable.module.css";

interface UserListData {
  userUUID: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  point: number;
  userType: string;
  warningCount: BigInteger;
}

interface UserListTableProps {
  pageData: {
    content: UserListData[];
    number: number;
    size: number;
  };
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterPress: () => void;
  onWarning: (uuid: string) => void;
}

const UserListTable: React.FC<UserListTableProps> = ({
  pageData,
  inputValue,
  handleInputChange,
  handleEnterPress,
  onWarning,
}) => {
  return (
    <>
      <h2 className={styles.tableTitle}>회원 조회</h2>
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
            <th>휴대전화</th>
            <th>이메일</th>
            <th>회원등급</th>
            <th>경고 횟수</th>
            <th>경고</th>
          </tr>
        </thead>
        <tbody>
          {pageData.content.map((data, index) => (
            <tr key={data.userUUID}>
              <td>{pageData.number * pageData.size + index + 1}</td>
              <td>{data.name}</td>
              <td>{data.nickname}</td>
              <td>{data.phone}</td>
              <td>{data.email}</td>
              <td>{data.userType}</td>
              <td>{data.warningCount}</td>
              <td>
                <button
                  className={styles["refusal-btn"]}
                  onClick={() => onWarning(data.userUUID)}
                >
                  경고
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserListTable;
