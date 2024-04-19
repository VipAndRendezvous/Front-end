import { ReactNode } from "react";
import Navbar from "../../../_component/Nav/Navbar";
import SideNav from "../../../_component/Nav/SideNav";
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
      <div className={styles.container}>
        <header className={styles.leftSectionWrapper}>
          <section className={styles.leftSection}>
            <div className={styles.leftSectionFixed}>
              <nav>
                <SideNav />
              </nav>
            </div>
          </section>
        </header>
        <div className={styles.rightSectionWrapper}>
          <main className={styles["main-auctionInfo"]}> {children}</main>
        </div>
        {/* {modal} */}
      </div>
    </div>
  );
}
