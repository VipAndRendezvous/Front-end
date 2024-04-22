"use client";

import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import axios from "axios";

export async function getAuctionListRecommends({
  pageParam = 0,
  searchQuery = "",
  sort = "",
}) {
  const url = `/api/all/auction/generalList?page=${pageParam}&size=12&sortType=${sort}&search=${searchQuery}`;

  try {
    const response = await HttpAuthInstance.get(url, {});
    return response.data; // 데이터만 반환
  } catch (error) {
    console.error(error.response || error.message);
    throw new Error("Failed to fetch data");
  }
}
