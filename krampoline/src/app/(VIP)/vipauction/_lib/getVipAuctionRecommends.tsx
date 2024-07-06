"use client";

import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import { ApiResponse } from "@/models/UserMyPageAuction";
import axios from "axios";

export async function getVipAuctionRecommends({
  sort,
}: {
  sort?: string;
}): Promise<ApiResponse> {
  try {
    let apiResponse: ApiResponse | null = null;

    switch (sort) {
      case "PROGRESS": {
        const { data } = await HttpAuthInstance.get(
          `/api/vip/auction/${sort}?page=1&size=12`
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
        break;
      }
      case "successAfter":
      case "successBefore": {
        const { data } = await HttpAuthInstance.get(
          `/api/vip/auction/SUCCESS/${sort}?page=1&size=12`
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
        break;
      }
      case "INVALIDITY": {
        const { data } = await HttpAuthInstance.get(
          `/api/vip/auction/${sort}?page=1&size=12`
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
        break;
      }
      default: {
        throw new Error("Invalid sort value");
      }
    }

    if (!apiResponse) {
      throw new Error("Failed to fetch data");
    }

    return apiResponse;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch data");
  }
}
