"use client";

import axios from "axios";

export async function getUserMyPageRecommends({
  pageParam = 0,
  searchQuery = "",
  sort = "",
}: {
  pageParam?: number;
  searchQuery?: string;
  sort?: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/basic/ticketList?page=${pageParam}&size=10&sortType=${sort}&search=${searchQuery}`;
  const token = localStorage.getItem("Authorization");
  console.log(token);

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
