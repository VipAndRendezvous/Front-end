import styles from "./ticketBox.module.css";
import ProfilePic from "../../../public/user.png";
import { MyPage } from "@/models/MyPage";
import Link from "next/link";
import { useState } from "react";

type Props = {
  ticket: MyPage;
};

const TicketBox = ({ ticket }: Props) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.box}>
      <div className={styles.group}>
        <div className={styles["overlap-group"]}>
          <div className={styles.frame}>
            <div className={styles["text-wrapper"]}>{ticket.userName}</div>
            <div className={styles.div}>
              <div className={styles["text-wrapper-2"]}>
                {ticket.userRating}
              </div>
              <div className={styles.img}>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.0355 1.03005C5.4886 -0.343351 7.43136 -0.34335 7.88446 1.03005L8.39062 2.56428C8.59265 3.17668 9.16348 3.59141 9.80834 3.59432L11.4239 3.6016C12.8701 3.60811 13.4704 5.45579 12.3043 6.31112L11.0015 7.26661C10.4815 7.64799 10.2635 8.31905 10.46 8.93324L10.9523 10.472C11.393 11.8494 9.82129 12.9913 8.64747 12.1465L7.33618 11.2028C6.81277 10.8262 6.10718 10.8262 5.58378 11.2028L4.27249 12.1465C3.09866 12.9913 1.52693 11.8494 1.96763 10.472L2.45994 8.93324C2.65645 8.31905 2.43841 7.64799 1.91842 7.26661L0.61569 6.31112C-0.550476 5.45579 0.0498724 3.60811 1.49607 3.6016L3.11162 3.59432C3.75647 3.59141 4.3273 3.17668 4.52934 2.56428L5.0355 1.03005Z"
                    fill="#FFF741"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.44096 2.87758L6.9348 1.34335C6.78377 0.885549 6.13618 0.885551 5.98515 1.34335L5.47899 2.87758C5.14227 3.89824 4.19088 4.58946 3.11613 4.59431L1.50057 4.60159C1.01851 4.60376 0.818394 5.21965 1.20711 5.50476L2.50984 6.46025C3.37649 7.09589 3.73989 8.21431 3.41238 9.23797L2.92007 10.7767C2.77317 11.2358 3.29708 11.6165 3.68836 11.3349L4.99964 10.3912C5.87199 9.76338 7.04797 9.76337 7.92031 10.3912L9.2316 11.3349C9.62288 11.6165 10.1468 11.2358 9.99988 10.7767L9.50758 9.23797C9.18006 8.21432 9.54346 7.09589 10.4101 6.46025L11.7128 5.50476C12.1016 5.21965 11.9014 4.60376 11.4194 4.60159L9.80383 4.59431C8.72907 4.58946 7.77769 3.89824 7.44096 2.87758ZM7.88446 1.03005C7.43136 -0.34335 5.48859 -0.343351 5.0355 1.03005L4.52934 2.56428C4.3273 3.17668 3.75647 3.59141 3.11162 3.59432L1.49607 3.6016C0.0498723 3.60811 -0.550476 5.45579 0.61569 6.31112L1.91842 7.26661C2.43841 7.64799 2.65645 8.31905 2.45994 8.93324L1.96763 10.472C1.52693 11.8494 3.09866 12.9913 4.27249 12.1465L5.58378 11.2028C6.10718 10.8262 6.81277 10.8262 7.33618 11.2028L8.64747 12.1465C9.82129 12.9913 11.393 11.8494 10.9523 10.472L10.46 8.93324C10.2635 8.31905 10.4815 7.64799 11.0015 7.26661L12.3043 6.31112C13.4704 5.4558 12.8701 3.60811 11.4239 3.6016L9.80834 3.59432C9.16348 3.59141 8.59265 3.17668 8.39062 2.56428L7.88446 1.03005Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles["text-wrapper-3"]}>
            {formatDate(ticket.meetingDate)}
          </div>
          <div className={styles["div-wrapper"]}>
            <div className={styles["text-wrapper-4"]}>만남 예정</div>
          </div>
          <img
            className={styles["mask-group"]}
            alt="Mask group"
            src={ticket.profileImgUrl}
            style={{ objectFit: "cover" }}
          />
          <div className={styles["group-wrapper"]}>
            <div className={styles["group-2"]}></div>
          </div>
          <div className={styles["group-3"]}>
            <div className={styles["group-4"]}>
              <div className={styles["text-wrapper-5"]}>장소</div>
              <div className={styles["text-wrapper-6"]}>
                {ticket.meetingLocation}
              </div>
              <div className={styles["group-5"]}>
                <Link href={`/ticketdetail/${ticket.ticketUUID} `}>
                  <div className={styles["text-wrapper-9"]}>상세보기</div>
                </Link>
                <div className={styles["arrow-right"]}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_356_6363)">
                      <path
                        d="M2.5 8H13.5"
                        stroke="#949597"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 3.5L13.5 8L9 12.5"
                        stroke="#949597"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_356_6363">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketBox;
