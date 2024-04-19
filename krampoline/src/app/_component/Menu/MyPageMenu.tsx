import Link from "next/link";
import styles from "./myPageMenu.module.css";

const MyPageMenu = () => {
  return (
    <div className={styles.MenuContainer}>
      <Link href="/usermypage">
        <button className="btn-basic">식사권</button>
      </Link>
      <Link href="/userreview">
        <button className="btn-basic">리뷰</button>
      </Link>
      <Link href="/userauction">
        <button className="btn-basic">경매</button>
      </Link>
    </div>
  );
};

export default MyPageMenu;
