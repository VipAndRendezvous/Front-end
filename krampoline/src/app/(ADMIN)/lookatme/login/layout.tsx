import { ReactNode } from "react";
import Navbar from "@/app/_component/Nav/Navbar";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className={styles.NavMenuContainer}>
        <nav>
          <Navbar />
        </nav>
      </div>
      <div className={styles["faq-container"]}>
        <main className={styles.main}> {children}</main>
      </div>
    </div>
  );
}
