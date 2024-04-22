import { ReactNode } from "react";
import Navbar from "../../../_component/Nav/Navbar";
// import SideNav from "../_component/Nav/SideNav";
import styles from "./ticketDetaillayout.module.css";
import TicketOwnerController from "../_component/TicketOwnerController";

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
        <header className={styles["Ticket-leftSectionWrapper"]}>
          <main className={styles["main-ticketDetail"]}> {children}</main>
          <div className={styles.rightSectionWrapper}>
            <TicketOwnerController />
          </div>
        </header>
      </div>
    </div>
  );
}
