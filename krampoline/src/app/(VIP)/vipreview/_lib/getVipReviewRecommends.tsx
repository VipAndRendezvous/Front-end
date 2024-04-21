"use client";

import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import axios from "axios";

export async function getVipReviewRecommends({ sort }: { sort?: string }) {
  const url = `/api/user/review/${sort}`;
  const token = localStorage.getItem("Authorization");
  console.log(sort);

  try {
    const response = await HttpAuthInstance.get(url, {});
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch data");
  }
}
