"use client";

import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import axios from "axios";

export async function getUserMyPageRecommends({
  pageParam = 0,
  searchQuery = "",
  sort,
}: {
  pageParam?: number;
  searchQuery?: string;
  sort?: string;
}) {
  const url = `/api/basic/ticketList?page=${pageParam}&size=10&sortType=${sort}&search=${searchQuery}`;
  const token = localStorage.getItem("Authorization");
  console.log(token);
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  try {
    const response = await HttpAuthInstance.get(url, {});
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch data");
  }
}
