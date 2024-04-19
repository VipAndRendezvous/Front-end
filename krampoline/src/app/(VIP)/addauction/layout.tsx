import { ReactNode } from "react";
import Navbar from "../../_component/Nav/Navbar";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className={styles.NavMenuContainer}>
        <nav>
          <Navbar />
        </nav>
      </div>
      <div className={styles["AddAuction-container"]}>
        <main className={styles["main-AddAuction"]}> {children}</main>
      </div>

      {/* {modal} */}
    </div>
  );
}
