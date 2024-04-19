"use client";

import { ApiResponse } from "@/models/UserMyPageAuction";
import axios from "axios";

export async function getUserAuctionRecommends({
  sort,
}: {
  sort?: string[];
}): Promise<ApiResponse> {
  const token = localStorage.getItem("Authorization");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    let apiResponse: ApiResponse;

    if (sort.includes("participate")) {
      const { data } = await axios.get(
        `${baseUrl}/api/basic/auction/participate?page=1&size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(sort);
      // ApiResponse.content 필드에 API 응답의 content를 직접 할당합니다.
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
    } else {
      // 다른 sort 값들에 대해 개별 요청
      const responses = await Promise.all(
        sort.map((s) =>
          axios.get(`${baseUrl}/api/basic/auction/${s}?page=1&size=10`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );
      apiResponse = {
        content: responses.flatMap((res) => res.data.content),
        pageable: responses[0].data.pageable,
        totalPages: responses[0].data.totalPages,
        totalElements: responses[0].data.totalElements,
        last: responses[0].data.last,
        size: responses[0].data.size,
        number: responses[0].data.number,
        sort: responses[0].data.sort,
        numberOfElements: responses[0].data.numberOfElements,
        first: responses[0].data.first,
        empty: responses[0].data.empty,
      };
    }
    return apiResponse;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch data");
  }
}
