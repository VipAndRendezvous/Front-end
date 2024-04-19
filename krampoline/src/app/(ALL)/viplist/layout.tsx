import { ReactNode } from "react";
import Navbar from "../../_component/Nav/Navbar";
import styles from "./layout.module.css";

export default function Layout({
  children,
}: // modal,
{
  children: ReactNode;
  // modal: ReactNode;
}) {
  return (
    <div>
      <div className={styles.NavMenuContainer}>
        <nav>
          <Navbar />
        </nav>
      </div>
      <div className={styles["list-container"]}>
        <main className={styles["list-main"]}> {children}</main>
      </div>

      {/* {modal} */}
    </div>
  );
}
