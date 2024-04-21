"use client";

import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import { ApiResponse } from "@/models/UserMyPageAuction";
import axios from "axios";

export async function getUserAuctionRecommends({
  sort,
}: {
  sort?: string[];
}): Promise<ApiResponse> {
  const token = localStorage.getItem("Authorization");

  try {
    let apiResponse: ApiResponse;

    if (sort.includes("participate")) {
      const { data } = await HttpAuthInstance.get(
        `/api/basic/auction/participate?&page=1&size=9`
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
    } else {
      // 다른 sort 값들에 대해 개별 요청
      const responses = await Promise.all(
        sort.map((s) =>
          HttpAuthInstance.get(`/api/basic/auction/${s}?page=1&size=10`, {})
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
