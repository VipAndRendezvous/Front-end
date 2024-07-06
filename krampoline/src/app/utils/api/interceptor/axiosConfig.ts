"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

// 로컬 스토리지에서 토큰을 가져옵니다.
const getToken = () => {
  return localStorage.getItem("Authorization");
};

const setToken = (token) => {
  localStorage.setItem("Authorization", token);
};

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

const HttpAuthInstance = axios.create({
  baseURL: baseurl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

HttpAuthInstance.interceptors.request.use(
  (config) => {
    // 모든 요청에 토큰을 추가합니다.
    if (config.url !== "/api/auth/refresh") {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HttpAuthInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorCodes = [
      "0100",
      "0101",
      "0102",
      "0103",
      "0104",
      "0105",
      "0106",
      "0107",
      "0108",
      "0109",
    ];

    if (error.response && errorCodes.includes(error.response.data.code)) {
      // 0103 에러 코드에 대한 토큰 갱신 로직을 실행합니다.
      if (error.response.data.code === "0103" && !originalRequest._retry) {
        try {
          originalRequest._retry = true; // 재시도 플래그를 설정합니다.

          // 별도의 Axios 인스턴스를 사용하여 토큰 갱신 요청을 보냅니다.
          const res = await axios.post(
            baseurl + "/api/auth/refresh",
            {},
            { withCredentials: true }
          );

          if (res.status === 200) {
            // 새 토큰을 응답 헤더에서 추출합니다.
            const authHeader =
              res.headers["authorization"] || res.headers["Authorization"];
            if (authHeader) {
              const newToken = authHeader.split(" ")[1]; // 'Bearer' 키워드를 제거합니다.
              setToken(newToken); // 새 토큰을 로컬 스토리지에 저장합니다.
              originalRequest.headers["Authorization"] = "Bearer " + newToken; // 새 토큰을 요청 헤더에 설정합니다.
              return HttpAuthInstance(originalRequest); // 원래 요청을 재시도합니다.
            }
          }
        } catch (refreshError) {
          // 토큰 갱신 실패시 로그아웃 처리 및 리디렉션
          console.error("Token refresh failed: ", refreshError);
          localStorage.removeItem("Authorization");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        // 다른 에러 코드에 대한 처리 로직을 추가합니다.
        switch (error.response.data.code) {
          case "0100": // 인증에 실패하였습니다.
          case "0101": // 잘못된 접근입니다.
          case "0102": // 잘못된 Access Token 입니다.
          case "0104": // 지원하지 않는 Access Token 입니다.
          case "0105": // Claim이 빈 Access Token 입니다.
          case "0106": // 잘못된 Refresh Token 입니다.
          case "0107": // 만료된 Refresh Token 입니다.
          case "0108": // 지원하지 않는 Refresh Token 입니다.
          case "0109": // Claim이 빈 Refresh Token 입니다.
            console.error(error.response.data.description);
            localStorage.removeItem("Authorization");
            window.location.href = "/login";
            break;
          default:
            // 기타 에러는 그대로 반환
            return Promise.reject(error);
        }
      }
    } else {
      // 다른 모든 에러는 그대로 반환합니다.
      return Promise.reject(error);
    }
  }
);

export default HttpAuthInstance;
