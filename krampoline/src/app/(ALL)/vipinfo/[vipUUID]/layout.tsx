import { ReactNode } from "react";
import Navbar from "../../../_component/Nav/Navbar";
import Vip_Info_SideNav from "../_component/Vip_Info_SideNav";
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
        <main className={styles.main}> {children}</main>
      </div>
    </div>
  );
}
