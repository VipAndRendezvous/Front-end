import Link from "next/link";
import styles from "./vipPageMenu.module.css";

const VipPageMenu = () => {
  return (
    <div className={styles.MenuContainer}>
      <Link href="/vipmypage">
        <button className="btn-basic">PR</button>
      </Link>
      <Link href="/vipreview">
        <button className="btn-basic">VIP 리뷰</button>
      </Link>
      <Link href="/vipauction">
        <button className="btn-basic">진행중인 경매</button>
      </Link>
    </div>
  );
};

export default VipPageMenu;
