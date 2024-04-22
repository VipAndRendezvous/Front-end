"use client";

import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import { ApiResponse } from "@/models/UserMyPageAuction";
import axios from "axios";

export async function getVipAuctionRecommends({
  sort,
}: {
  sort?: string;
}): Promise<ApiResponse> {
  const token = localStorage.getItem("Authorization");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    let apiResponse: ApiResponse;

    if (sort.includes("participate")) {
      const { data } = await HttpAuthInstance.get(
        `/api/vip/auction/PROGRESS?page=1&size=12`
      );

      apiResponse = {
        content: data.content,
        pageable: data.pageable,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        last: data.last,
        size: data.size,
        number: data.number,
        sort: data.sort,
        numberOfElements: data.numberOfElements,
        first: data.first,
        empty: data.empty,
      };
    }
    // else if (sort.includes("success")) {
    //   // 'success'에 대한 처리 - 두 API 엔드포인트 호출
    //   const [successBeforeResponse, successAfterResponse] = await Promise.all([
    //     axios.get(
    //       `${baseUrl}/api/vip/auction/SUCCESS/successBefore?page=1&size=10`,
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }
    //     ),
    //     axios.get(
    //       `${baseUrl}/api/vip/auction/SUCCESS/successAfter?page=1&size=10`,
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }
    //     ),
    //   ]);

    //   apiResponse = {
    //     content: [
    //       ...successBeforeResponse.data.content,
    //       ...successAfterResponse.data.content,
    //     ],
    //     pageable: successBeforeResponse.data.pageable, // 페이지 정보는 일반적으로 첫 번째 응답에서 가져옵니다.
    //     totalPages: successBeforeResponse.data.totalPages,
    //     totalElements: successBeforeResponse.data.totalElements,
    //     last: successBeforeResponse.data.last,
    //     size: successBeforeResponse.data.size,
    //     number: successBeforeResponse.data.number,
    //     sort: successBeforeResponse.data.sort,
    //     numberOfElements: successBeforeResponse.data.numberOfElements,
    //     first: successBeforeResponse.data.first,
    //     empty: successBeforeResponse.data.empty,
    //   };
    // } else if (sort.includes("invalidity")) {
    //   const { data } = await axios.get(
    //     `${baseUrl}/api/vip/auction/INVALIDITY?page=1&size=10`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   apiResponse = {
    //     content: data.content,
    //     pageable: data.pageable,
    //     totalPages: data.totalPages,
    //     totalElements: data.totalElements,
    //     last: data.last,
    //     size: data.size,
    //     number: data.number,
    //     sort: data.sort,
    //     numberOfElements: data.numberOfElements,
    //     first: data.first,
    //     empty: data.empty,
    //   };
    // }

    return apiResponse;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch data");
  }
}
