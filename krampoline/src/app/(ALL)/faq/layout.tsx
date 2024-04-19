import { ReactNode } from "react";
import Navbar from "../../_component/Nav/Navbar";
import SideNav from "../../_component/Nav/SideNav";
import styles from "./layout.module.css";

export default function Layout({
  children,
}: // modal,
{
  children: ReactNode;
  // modal: ReactNode;
}) {
  console.log(styles);
  return (
    <div>
      <div className={styles.NavMenuContainer}>
        <nav>
          <Navbar />
        </nav>
      </div>
      <div className={styles["faq-container"]}>
        <main className="main"> {children}</main>
      </div>

      {/* {modal} */}
    </div>
  );
}
