"use client";

import Image from "next/image";
import "./carouselMain.css";
import React, { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import Link from "next/link";

const CarouselMain = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      direction: "horizontal",
      loop: false,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
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

  useEffect(() => {
    fetchBannerData();
  }, []);

  // 배너 데이터 불러오기
  async function fetchBannerData() {
    try {
      const response = await HttpAuthInstance.get(`/api/all/banner`);
      setBannerData(response.data);
    } catch (error) {
      console.error("오류 발생", error);
    }
  }

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {bannerData.map((banner, index) => (
          <div className="swiper-slide" key={index}>
            <Link href={banner.targetUrl} passHref>
              <Image
                src={banner.bannerImgUrl}
                alt={`slide${index + 1}`}
                objectFit="cover" // Adjust as needed; can be 'contain' or 'cover'
                width={1920}
                height={320}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-scrollbar"></div>
    </div>
  );
};

export default CarouselMain;
