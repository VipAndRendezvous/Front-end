"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HttpAuthInstance from "./api/interceptor/axiosConfig";

type UserContextType = {
  onClickPayment: (chargeAmount: number) => Promise<void>;
  onClickAddSub: (chargeAmount: number) => Promise<void>;
  withdrawOrder: (
    bank,
    accountNumber,
    accountHolder,
    withdrawAmount
  ) => Promise<void>;
};
const PointContext = createContext<UserContextType | null>(null);

export function ChargePointProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  //----------------------------------------------------------------결제하기 창 호출하기
  useEffect(() => {
    // jQuery 로드
    const loadScript = (src, id) => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.onload = () => resolve(true);
        script.onerror = () =>
          reject(new Error(`Script load error for ${src}`));
        document.head.appendChild(script);
      });
    };

    (async () => {
      try {
        await loadScript(
          "https://code.jquery.com/jquery-3.6.0.min.js",
          "jquery"
        );
        await loadScript(
          "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js",
          "iamport"
        );
        //@ts-ignore
        window.IMP.init("imp77327220"); // IMP 객체 초기화
      } catch (error) {
        console.error("Script loading failed:", error);
      }
    })();
  }, []);
  //-----------------------------------------------------------------------포인트 충전

  const onClickPayment = async (chargeAmount) => {
    //@ts-ignore
    const IMP = window.IMP; // IMP 객체 초기화
    const data = {
      pg: "kakaopay.TC0ONETIME",
      pay_method: "card",
      merchant_uid: `order_${new Date().getTime()}`,
      name: "포인트 충전",
      amount: chargeAmount,
      buyer_email: null,
      buyer_name: null,
      buyer_tel: null,
      buyer_addr: null,
      buyer_postcode: null,
    };

    IMP.request_pay(data, async (rsp) => {
      const token = localStorage.getItem("Authorization");
      if (rsp.success) {
        try {
          const response = await HttpAuthInstance.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/point`,
            {
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
              paymentAmount: chargeAmount,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "Authorization"
                )}`,
              },
            }
          );
          if (response.status === 200) {
            alert("결제가 성공적으로 처리되었습니다.");
            window.location.href = "/";
          }
        } catch (error) {
          alert(`서버 에러: ${error.response?.data.message || error.message}`);
          console.log(error);
        }
      } else {
        alert(`결제 실패: ${rsp.error_msg}`);
      }
    });
  };

  //-----------------------------------------------------------------------구독

  const onClickAddSub = async (chargeAmount) => {
    //@ts-ignore
    const IMP = window.IMP; // IMP 객체 초기화
    const data = {
      pg: "kakaopay.TC0ONETIME",
      pay_method: "card",
      merchant_uid: `order_${new Date().getTime()}`,
      name: "구독",
      amount: chargeAmount,
      buyer_email: null,
      buyer_name: null,
      buyer_tel: null,
      buyer_addr: null,
      buyer_postcode: null,
    };

    IMP.request_pay(data, async (rsp) => {
      const token = localStorage.getItem("Authorization");
      if (rsp.success) {
        try {
          const response = await HttpAuthInstance.post(
            `/api/payment/subscribe`,
            {
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
              paymentAmount: chargeAmount,
            }
          );
          if (response.status === 200) {
            alert("결제가 성공적으로 처리되었습니다.");
            window.location.href = "/";
          }
        } catch (error) {
          alert(`서버 에러: ${error.response?.data.message || error.message}`);
          console.log(error);
        }
      } else {
        alert(`결제 실패: ${rsp.error_msg}`);
      }
    });
  };

  //-----------------------------------------------------------------------구독
  const withdrawOrder = async (
    bank,
    accountNumber,
    accountHolder,
    withdrawAmount
  ) => {
    const token = localStorage.getItem("Authorization");

    if (token) {
      try {
        const response = await HttpAuthInstance.post(`/api/payment/exchange`, {
          exchangeBank: bank,
          exchangeAccount: accountNumber,
          exchangeAccountHolder: accountHolder,
          exchangePoint: withdrawAmount,
        });
        if (response.status === 200) {
          console.log(response);
          alert(
            "성공적으로 출금 신청이 완료되었습니다. 영업일 기준 3일 이내에 처리될 예정입니다."
          );
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  //-----------------------------------------------------------------------

  return (
    <PointContext.Provider
      value={{ onClickPayment, onClickAddSub, withdrawOrder }}
    >
      {children}
    </PointContext.Provider>
  );
}

export function usePoint() {
  const context = useContext(PointContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
