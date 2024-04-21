"user client";
import Image from "next/image";
import Logo from "../../../../public/Logo.png";
import styles from "./adminNavbar.module.css";

const AdminNavbar = () => {
  return (
    <div className={styles.navContainer}>
      <Image src={Logo} alt="Logo" height={60} priority />
    </div>
  );
};

export default AdminNavbar;
