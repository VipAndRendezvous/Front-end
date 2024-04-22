"use client";

import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import axios from "axios";

export async function getVipListRecommends({
  pageParam = 0,
  searchQuery = "",
}: {
  pageParam?: number;
  searchQuery?: string;
}) {
  const encodedSearchQuery = encodeURIComponent(searchQuery);
  const searchPart = encodedSearchQuery ? `&search=${encodedSearchQuery}` : "";
  const token = localStorage.getItem("Authorization");
  const url = `/api/all/vipList?page=${pageParam}&size=10${searchPart}`;

  try {
    const response = await HttpAuthInstance.get(url, {});
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch data");
  }
}
