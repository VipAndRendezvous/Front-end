import { ReactNode } from "react";
import Navbar from "../../../_component/Nav/Navbar";
// import SideNav from "../_component/Nav/SideNav";
import styles from "./ticketDetaillayout.module.css";
import TicketOwnerController from "../_component/TicketOwnerController";

async function getAWS() {
    const region = process.env.AWS_S3_BUCKET_REGION;
    const keyId = process.env.AWS_S3_BUCKET_ACCESS_KEY_ID;
    const AccessKey = process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY;

    return {region, keyId, AccessKey};
}

export default async function Layout({
  children,
}: // modal,
{
  children: ReactNode;
  // modal: ReactNode;
}) {
    const {region, keyId, AccessKey} = await getAWS()

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
            <TicketOwnerController region={region} keyId={keyId} AccessKey={AccessKey}/>
          </div>
        </header>
      </div>
    </div>
  );
}
