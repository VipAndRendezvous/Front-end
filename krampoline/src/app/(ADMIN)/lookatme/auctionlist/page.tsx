"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminNavbar from "../../_component/AdminNavbar";
import AdminSideNav from "../../_component/AdminSideNav";
import AuctionListTable from "./_component/AuctionListTable";
import AdminPagination from "../../_component/AdminPagination";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";

import styles from "./page.module.css";

interface AuctionListData {
  auctionUUID: string;
  vipNickname: string;
  createdTime: string;
  currentHighestBidAmount: BigInteger;
  bidCount: BigInteger;
}

interface Page<T> {
  content: T[];
  totalPages: number;
  size: number; // 한 페이지에 표시되는 요소의 수
  number: number; // 현재 페이지 번호
}

const Page = () => {
  const [page, setPage] = useState<Page<AuctionListData>>({
    content: [],
    totalPages: 0,
    size: 10,
    number: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchAuctionList();
  }, [currentPage, searchValue]);

  // 서버에서 페이지 데이터 불러오기
  async function fetchAuctionList() {
    try {
      const response = await HttpAuthInstance.get(
        `/api/all/auction/generalList`,
        {
          params: {
            search: inputValue,
            page: currentPage - 1,
          },
        }
      );
      setPage(response.data);
      setTotalPage(response.data.totalPages);
    } catch (error) {
      console.error("오류 발생", error);
    }
  }

  // 경매 취소
  async function handleApproval(uuid: string) {
    if (window.confirm("취소하시겠습니까?")) {
      try {
        const url = `/api/lookAtMe/auction/cancel/${uuid}`;
        await HttpAuthInstance.patch(url, {});
        alert("경매가 취소되었습니다.");
        fetchAuctionList();
      } catch (error) {
        console.error("오류 발생", error);
      }
    }
  }

  //----------------------------------------------------------
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnterPress = () => {
    setSearchValue(inputValue);
    setCurrentPage(1);
  };

  const handleBigPrevious = () => {
    const newPage = Math.max(1, currentPage - 5); // 한 번에 5 페이지씩 이전으로 이동
    setCurrentPage(newPage);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBigNext = () => {
    const newPage = Math.min(totalPage, currentPage + 5); // 한 번에 5 페이지씩 다음으로 이동
    setCurrentPage(newPage);
  };

  const changeCurrentPage = (page) => {
    setCurrentPage(page);
  };

  //----------------------------------------------------------
  return (
    <div className={styles.adminPage}>
      <AdminNavbar />
      <div className={styles.adminContainer}>
        <AdminSideNav />
        <div className={styles.tableContainer}>
          <AuctionListTable
            pageData={{
              content: page.content,
              number: page.number,
              size: page.size,
            }}
            inputValue={inputValue}
            handleInputChange={(e) => setInputValue(e.target.value)}
            handleEnterPress={() => setSearchValue(inputValue)}
            onApprove={handleApproval}
          />
          <AdminPagination
            currentPage={currentPage}
            totalPage={totalPage}
            handleBigPrevious={handleBigPrevious}
            handlePrevious={handlePrevious}
            handleBigNext={handleBigNext}
            handleNext={handleNext}
            changeCurrentPage={changeCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
