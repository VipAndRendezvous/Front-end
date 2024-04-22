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
    // 리프레쉬 토큰 요청인 경우 토큰을 헤더에 추가하지 않습니다.
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
    // 특정 에러 코드를 확인하여 토큰 갱신 로직을 실행합니다.
    if (
      error.response &&
      error.response.data.code === "0103" &&
      !originalRequest._retry
    ) {
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
        // 토큰 갱신 실패시 로직을 추가합니다.
        console.error("Token refresh failed: ", refreshError);
        // 여기에 로그아웃 처리 로직을 추가할 수 있습니다.
        // 예를 들면:
        // localStorage.removeItem("Authorization");
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    } else {
      // 다른 모든 에러는 그대로 반환합니다.
      return Promise.reject(error);
    }
  }
);

export default HttpAuthInstance;
