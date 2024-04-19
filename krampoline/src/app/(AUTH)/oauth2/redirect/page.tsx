"use client";

import { Suspense, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/app/utils/UserProvider";

function Oauth() {
  const params = useSearchParams();
  const router = useRouter();
  const { setKakaoInfo, setIsLoggedIn, fetchUserInfo, followingListAPI } =
    useUser();

  useEffect(() => {
    // URL에서 'code' 파라미터 값을 가져옵니다.
    const codeParam = params.get("code");

    // 받은 코드를 서버로 POST 요청하여 처리하는 함수
    async function postCode(code: string) {
      if (!code) return; // 코드가 없으면 함수 종료

      try {
        // 카카오 OAuth 서버로부터 액세스 토큰을 요청합니다.
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/oauth2/accessKakao`,
          { code },
          { withCredentials: true }
        );
        console.log(response);
        // 로그인 성공 시 로컬 스토리지에 액세스 토큰 저장 후 홈으로 이동
        if (response.data.type === "LOGIN") {
          const authHeader =
            response.headers["Authorization"] ||
            response.headers["authorization"];
          const accessToken = authHeader?.substring("Bearer ".length);
          if (accessToken) {
            localStorage.setItem("Authorization", accessToken);
            setIsLoggedIn(true);
            fetchUserInfo();
            followingListAPI();
            router.replace("/"); // 홈으로 리다이렉트
          }
        } else if (response.data.type === "JOIN") {
          const KakaoInfo = response.data["kakaoUserResDto"];
          setKakaoInfo(KakaoInfo);
          console.log("KakaoInfo:", KakaoInfo);
          router.replace("/signup");
        }
      } catch (error) {
        console.error(error);

        router.replace("/");
      }
    }

    if (codeParam) {
      postCode(codeParam);
    } else {
      router.replace("/");
    }
  }, [params, router]); // 의존성 배열에 params, router 추가

  return <div></div>;
}

const OAuth2RedirectPage = () => {
  // 페이지 컨텐츠는 없으며, OAuth 인증 처리 로직만 수행합니다.
  return (
    <Suspense>
      <Oauth />
    </Suspense>
  );
};

export default OAuth2RedirectPage;
