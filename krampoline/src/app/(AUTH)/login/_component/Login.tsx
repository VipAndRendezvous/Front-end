"use client";

import Image from "next/image";
import Logo from "../../../../../public/Logo.png";
import Kakao from "../../../../../public/kakao_login.png";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
const { NEXT_PUBLIC_BASE_URL } = process.env;

export default function Login() {
  const router = useRouter(); // useRouter 훅 사용
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  console.log(NEXT_PUBLIC_BASE_URL);
  const onClick = () => {
    window.location.href = `${NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <>
      <div className={styles.LoginContainer}>
        <div>
          <Image src={Logo} alt="logo" />
        </div>
        <div onClick={() => onClick()}>
          <Image src={Kakao} alt="logo" />
        </div>
      </div>
    </>
  );
}

//----------------------------------------------------------------
