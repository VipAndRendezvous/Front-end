"use client";

import Link from "next/link";
import CarouselMain from "./Carousel/CarouselMain";
import styles from "./main.module.css";
import MainUserInfo from "./MainUserInfo";
import { useEffect, useRef } from "react";
import { useUser } from "../utils/UserProvider";

const Main = () => {
  const { donation } = useUser();

  const imageRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
          } else {
            entry.target.classList.remove("isVisible");
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.5, // 이미지가 화면의 50%를 차지할 때 효과 발동
      }
    );

    const imageElement = imageRef.current;
    if (imageElement) {
      observer.observe(imageElement);
    }

    return () => {
      if (imageElement) {
        observer.unobserve(imageElement);
      }
    };
  }, []);

  return (
    <div className={styles.MainContainer}>
      <div className={styles.MainPage}>
        <div className={styles.MainBannerContainer}>
          <CarouselMain />
        </div>
        <div className={styles.SecondSection}>
          <div className={styles.TopPart}>
            <div className={styles.leftDonation}>
              <div className={styles.title1}>현재 기부 금액</div>
              <div className={styles.DonationContainer}>
                <div className={styles.DonationText}>
                  {new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(
                    donation.totalDonationPrice
                  )}
                  원
                </div>
              </div>
            </div>
            <div className={styles.rightDonation}>
              <div className={styles.title1}>안녕하세요!</div>
              <div className={styles.MainUser}>
                <MainUserInfo />
              </div>
            </div>
          </div>

          <div className={styles.BottomPart}>
            <div className={styles.Title2}>VIP의 시간 경매에 참여해 보세요</div>
            <div className={styles.Title3}>
              이제까지 경험하지 못한 새롭고 흥미로운 만남의 기회,
              <br />
              “VIP and Rendezvous”와 함께라면 당신의 미래가 새로워 집니다.
            </div>
            <div className={styles.TitleContainer}>
              <div className={styles.Title5}>서비스소개</div>
              <div className={styles.arrow}>
                <svg
                  width="42"
                  height="12"
                  viewBox="0 0 42 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L21.1026 10L41 1"
                    stroke="#666666"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.firstPage}>
        <div className={styles.charlesdeluvioW8m5mcm91ryUnsParent}>
          <img
            className={styles.charlesdeluvioW8m5mcm91ryUnsIcon}
            alt="firstpageimg"
            src="/firstpageimg.png"
          />

          <div className={styles.vipParent}>
            <div className={styles.vip}>VIP 식사권 경매</div>
            <div className={styles.varVip}>
              VAR에서의 VIP는 단순히 유명 인사가 아니라 인생과 업계에서 중요한
              업적을 이룬 이들을 의미합니다. 이들은 자신의 ‘식사권’을 VAR의 경매
              플랫폼에 올리며 이는 여러분에게 그들과를 독점적인 만남의 기회를
              제공합니다. 여러분은 이 경매에 참여해 꿈에 그리던 만남을 실현시킬
              수 있는 기회를 얻게 됩니다.
            </div>
            <div className={styles.wrapper1}>
              <div className={styles.divfist}>서비스의 핵심</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.secondPage}>
        <div className={styles.charlesdeluvioLks7veiEagUnsParent}>
          <img
            className={styles.charlesdeluvioLks7veiEagUnsIcon}
            alt="secondpageimg"
            src="/secondpageimg.png"
          />
          <div className={styles.varParent}>
            <div className={styles.var2}>
              VAR는 단순한 식사 초대 이상의 가치를 제공합니다. 이곳을 통해
              이루어지는 만남은 인생에 중요한 영향을 미치는 특별한 경험이 될 수
              있습니다. VIP와 사용자 간의 식사는 지식, 경험 그리고 삶의 교훈을
              공유하는 뜻깊은 시간이며, 이러한 교류는 참여자 모두에게 영감을
              제공하고 새로운 삶의 방향을 모색하게 합니다.
            </div>
            <div className={styles.divsec}>인생의 중요한 만남</div>
            <div className={styles.wrapper}>
              <div className={styles.divsecond}>변화의 시작</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.thirdPage}>
        <div className={styles.marandaVandergriff7aakzdil4vParent}>
          <img
            className={styles.marandaVandergriff7aakzdil4vIcon}
            alt="thirdpageimg"
            src="/thirdpageimg.png"
          />
          <div className={styles.parentthird}>
            <div className={styles.divthird}>연결을 통한 성장</div>
            <div className={styles.var3}>
              VAR의 궁극적인 목표는 사람들 간의 연결을 통해 개인적, 전문적
              성장을 촉진하는 것입니다. 우리는 이 플랫폼이 지식의 전달, 경험의
              공유 그리고 상호 영감의 장이 되기를 바랍니다. VIP와의 만남을 통해
              여러분은 자신의 꿈을 향해 한 걸음 더 나아갈 수 있는 동기와 지혜를
              얻게 될 것 입니다.
            </div>
            <div className={styles.wrapperthird}>
              <div className={styles.divthirds}>우리의 미션</div>
            </div>
          </div>
          <div className={styles.groupthird}>
            <div className={styles.gotoauction}>
              <Link href="/auctions/original">경매 참여하기</Link>
            </div>
            <div className={styles.arrowrightIcon}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="ArrowRight" clipPath="url(#clip0_2034_1071)">
                  <path
                    id="Vector"
                    d="M2.5 8H13.5"
                    stroke="#333333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M9 3.5L13.5 8L9 12.5"
                    stroke="#333333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2034_1071">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
