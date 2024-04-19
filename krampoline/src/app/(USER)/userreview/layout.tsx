import { ReactNode } from "react";

import styles from "./layout.module.css";
import Navbar from "@/app/_component/Nav/Navbar";
import SideNav from "@/app/_component/Nav/SideNav";

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
          <main className={styles.main}> {children}</main>
        </div>

        {/* {modal} */}
      </div>
    </div>
  );
}
