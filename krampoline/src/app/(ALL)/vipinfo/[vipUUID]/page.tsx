"use client";

// import AuctionBox from "../../_component/Auction/AuctionBox";
import { useEffect, useState } from "react";
import ReviewBox from "../../../_component/ReviewBox";
import Vip_Introduce from "../_component/Vip_Introduce";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useVip } from "@/app/utils/VipProvider";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";

const Page = () => {
  return (
    <div>
      <Vip_Introduce />
    </div>
  );
};

export default Page;
