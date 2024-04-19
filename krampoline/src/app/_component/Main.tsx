"use client";

import Image from "next/image";
import CarouselMain from "./Carousel/CarouselMain";
import styles from "./main.module.css";
import banner from "/public/banner.jpg";
import MainUserInfo from "./MainUserInfo";

const Main = () => {
  return (
    <div className={styles.MainContainer}>
      <div className={styles.MainBannerContainer}>
        <div className={styles.MainBanner}>
          <Image src={banner} alt="banner" priority />
        </div>
      </div>
      <div className={styles.SecondSection}>
        <div className={styles.MainCarousel}>
          <CarouselMain />
        </div>
        <div className={styles.MainUser}>
          <MainUserInfo />
        </div>
      </div>
      <div className={styles.MainAbout}>
        <div>Main 디자인</div>
      </div>
    </div>
  );
};

export default Main;
