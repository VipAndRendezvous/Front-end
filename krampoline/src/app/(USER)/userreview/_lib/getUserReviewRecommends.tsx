"use client";

import axios from "axios";

export async function getUserReviewRecommends({
  sort,
  pageParam = 0,
}: {
  sort?: string;
  pageParam?: number;
}) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/review/${sort}?page=${pageParam}&size=10`;
  const token = localStorage.getItem("Authorization");
  console.log(sort);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch data");
  }
}
