"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMapApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
const TicketDetailMap = () => {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KakaoMapApiKey}&autoload=false`;

    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById("map");
        var options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        var map = new window.kakao.maps.Map(container, options);
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, []);

  return (
    <div>
      <main className="w-full flex flex-col items-center justify-center pt-4">
        <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
          <div id="map" style={{ width: "600px", height: "100%" }}></div>
        </div>
      </main>
    </div>
  );
};

export default TicketDetailMap;
