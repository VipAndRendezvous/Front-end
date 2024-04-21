"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminNavbar from "../../_component/AdminNavbar";
import AdminSideNav from "../../_component/AdminSideNav";
import BannerEditTable from "./_component/BannerEditTable";

import styles from "./page.module.css";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";

interface BannerEditData {
  bannerUUID: string;
  bannerImgUrl: string;
  targetUrl: string;
}

const Page = () => {
  const [banners, setBanners] = useState<BannerEditData[]>([]);

  useEffect(() => {
    fetchBannerEdit();
  }, []);

  // 배너 데이터 불러오기
  async function fetchBannerEdit() {
    try {
      const response = await HttpAuthInstance.get(`/api/all/banner`, {});
      setBanners(response.data);
    } catch (error) {
      console.error("오류 발생", error);
    }
  }

  // 배너 추가
  async function handleAdd(newimgUrl: string, newtargetUrl: string) {
    if (newimgUrl && newtargetUrl) {
      if (window.confirm("추가하시겠습니까?")) {
        try {
          const url = `/api/lookAtMe/banner/add`;
          const formData = {
            bannerImgUrl: newimgUrl,
            targetUrl: newtargetUrl,
          };
          await HttpAuthInstance.post(url, formData);
          alert("배너가 추가되었습니다.");
          fetchBannerEdit();
        } catch (error) {
          console.error("오류 발생", error);
        }
      }
    }
  }

  // 배너 삭제
  async function handleDelete(uuid: string) {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        const url = `/api/lookAtMe/banner/delete/${uuid}`;
        await HttpAuthInstance.delete(url, {});
        alert("배너가 삭제되었습니다.");
        fetchBannerEdit();
      } catch (error) {
        console.error("오류 발생", error);
      }
    }
  }

  // 배너 URL 수정
  async function handleEdit(uuid: string, newTargetUrl) {
    if (newTargetUrl) {
      if (window.confirm("수정하시겠습니까?")) {
        try {
          const url = `/api/lookAtMe/banner/edit/${uuid}?targetUrl=${encodeURIComponent(
            newTargetUrl
          )}`;
          await HttpAuthInstance.patch(url, {});
          alert("연결 URL이 수정되었습니다.");
          fetchBannerEdit();
        } catch (error) {
          console.error("오류 발생", error);
        }
      }
    }
  }

  //----------------------------------------------------------
  return (
    <div className={styles.adminPage}>
      <AdminNavbar />
      <div className={styles.adminContainer}>
        <AdminSideNav />
        <div className={styles.tableContainer}>
          <BannerEditTable
            banners={banners}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
