import { ReactNode } from "react";
import Navbar from "../../_component/Nav/Navbar";

import styles from "./ChatLayout.module.css";

export default function Layout({
  children,
}: // modal,
{
  children: ReactNode;
}) {
  return (
    <div>
      <div className={styles.NavMenuContainer}>
        <nav>
          <Navbar />
        </nav>
      </div>
      <div className={styles.container}>
        <header className={styles["Chat-leftSectionWrapper"]}>
          <main className={styles["main-Chat"]}> {children}</main>
        </header>
      </div>
    </div>
  );
}
