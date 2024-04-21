"use client";
import styles from "./bannerEditTable.module.css";

interface BannerEditData {
  bannerUUID: string;
  bannerImgUrl: string;
  targetUrl: string;
}

interface BannerEditTableProps {
  banners: BannerEditData[];
  onAdd: (newBannerImgUrl: string, newTargetUrl: string) => void;
  onDelete: (uuid: string) => void;
  onEdit: (uuid: string, newTargetUrl: string) => void;
}

const BannerEditTable: React.FC<BannerEditTableProps> = ({
  banners = [],
  onAdd,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      <h2 className={styles.tableTitle}>배너 변경</h2>
      <div className={styles.searchBar}></div>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>번호</th>
            <th>파일명</th>
            <th>연결 URL</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((data, index) => (
            <tr key={data.bannerUUID}>
              <td>{index + 1}</td>
              <td>
                <a href={data.bannerImgUrl} target="_blank">
                  {data.bannerImgUrl}
                </a>
              </td>
              <td>{data.targetUrl}</td>
              <td>
                <button
                  className={styles["approval-btn"]}
                  onClick={() => {
                    const newTargetUrl = prompt(
                      "새 URL을 입력하세요",
                      data.targetUrl
                    );
                    if (newTargetUrl) {
                      onEdit(data.bannerUUID, newTargetUrl);
                    }
                  }}
                >
                  수정
                </button>
              </td>

              <td>
                <button
                  className={styles["refusal-btn"]}
                  onClick={() => onDelete(data.bannerUUID)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button
          className={styles["approval-btn"]}
          onClick={() => {
            const newBannerImgUrl = prompt("새 이미지 URL을 입력하세요");
            const newTargetUrl = prompt("새 연결 URL을 입력하세요");
            if (newBannerImgUrl && newTargetUrl) {
              onAdd(newBannerImgUrl, newTargetUrl);
            }
          }}
        >
          + 배너 추가
        </button>
      </div>
    </>
  );
};

export default BannerEditTable;
