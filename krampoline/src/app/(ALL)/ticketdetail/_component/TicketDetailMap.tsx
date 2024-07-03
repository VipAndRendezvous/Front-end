"use client";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const TicketDetailMap = ({ address }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log("Kakao Maps script loaded");
      window.kakao.maps.load(() => {
        const container = document.getElementById("myMap");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        setMap(map);
      });
    };

    script.onerror = () => {
      console.error("Failed to load the Kakao Maps script");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!map || !address) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    const validAddress = address.match(/^[^0-9]+/)?.[0].trim() || address;

    geocoder.addressSearch(validAddress, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;font-size:10px;">상세주소를 확인하세요</div>`,
        });
        infowindow.open(map, marker);
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  }, [map, address]);

  return (
    <div
      id="myMap"
      style={{
        width: "608px",
        height: "400px",
      }}
    ></div>
  );
};

export default TicketDetailMap;
