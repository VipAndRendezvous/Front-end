"use client";

import axios from "axios";

export async function getVipReviewRecommends({ sort }: { sort?: string }) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/review/${sort}`;
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
