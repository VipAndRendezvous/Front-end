"use client";

import Image from "next/image";
import "./carouselMain.css";
import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Img1 from "../../../../public/CarouselImg/1.png";
import Img2 from "../../../../public/CarouselImg/2.png";
import Img3 from "../../../../public/CarouselImg/3.png";
import Img4 from "../../../../public/CarouselImg/4.png";

const CarouselMain = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      direction: "horizontal",
      loop: false,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  }, []);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <Image src={Img1} alt="slide1" priority />
        </div>
        <div className="swiper-slide">
          <Image src={Img2} alt="slide2" priority />
        </div>
        <div className="swiper-slide">
          <Image src={Img3} alt="slide3" priority />
        </div>
        <div className="swiper-slide">
          <Image src={Img4} alt="slide4" priority />
        </div>
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-scrollbar"></div>
    </div>
  );
};
export default CarouselMain;
