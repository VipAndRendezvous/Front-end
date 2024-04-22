"use client";

import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import axios from "axios";

export async function getUserReviewRecommends({
  sort,
  pageParam = 0,
}: {
  sort?: string;
  pageParam?: number;
}) {
  const url = `/api/user/review/${sort}?page=${pageParam}&size=10`;

  console.log(sort);

  try {
    const response = await HttpAuthInstance.get(url, {});
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch data");
  }
}
