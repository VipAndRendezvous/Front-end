"use client";

import React, { useEffect, useState } from "react";
import styles from "./introduce.module.css";
import { useVip } from "@/app/utils/VipProvider";

const Vip_Introduce = () => {
  const { vipIntro, vipIntroAPI } = useVip();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // vipIntroAPI가 프로미스를 반환하는 경우 await을 사용
        await vipIntroAPI();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // 데이터 로딩이 끝났을 때 로딩 상태를 변경
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className={styles.IntroduceContainer}>Loading...</div>;
  }

  return (
    <>
      <div className={styles.vip02}>
        <div className={styles.vip02Child} />
        <img className={styles.maskGroupIcon} alt="" src="Mask group.png" />
        <div className={styles.parent}>
          <div className={styles.div}>경매 리스트</div>
          <img className={styles.groupChild} alt="" src="Vector 454.svg" />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.membership}>예정된 경매가 없습니다.</div>
        </div>
        <div className={styles.group}>
          <div className={styles.div2}>아이유 (이지은)</div>
          <div className={styles.container}>
            <div className={styles.div3}>4.5</div>
            <img className={styles.groupItem} alt="" src="Star 1.svg" />
          </div>
        </div>
        <div className={styles.groupDiv}>
          <div className={styles.div}>식사 후기</div>
          <img className={styles.groupChild} alt="" src="Vector 454.svg" />
        </div>
        <div className={styles.vip02Inner}>
          <div className={styles.groupParent}>
            <div className={styles.rectangleParent}>
              <div className={styles.rectangleDiv} />
              <div className={styles.div5}>아이유(이지은) 과의 식사권</div>
              <div className={styles.div6}>
                전체적으로 만족스러운 식사였어요! 조언도 많이 해주셔서 덕분에
                힘이 됐습니다 :)
              </div>
              <div className={styles.frameWrapper}>
                <div className={styles.ellipseParent}>
                  <img
                    className={styles.frameChild}
                    alt=""
                    src="Ellipse 1568.png"
                  />
                  <div className={styles.test02}>test02</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.groupContainer}>
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126732.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126733.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126734.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126735.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126736.svg"
                  />
                </div>
              </div>
              <img
                className={styles.frameIcon}
                alt=""
                src="Frame 1542126696.svg"
              />
              <div className={styles.div7}>2024.00.00</div>
            </div>
            <div className={styles.rectangleGroup}>
              <div className={styles.rectangleDiv} />
              <div className={styles.div8}>2024.00.00</div>
              <div className={styles.div9}>아이유(이지은) 과의 식사권</div>
              <div className={styles.div10}>
                전체적으로 만족스러운 식사였어요! 조언도 많이 해주셔서 덕분에
                힘이 됐습니다 :)
              </div>
              <div className={styles.frameDiv}>
                <div className={styles.frameWrapper1}>
                  <div className={styles.ellipseParent}>
                    <img
                      className={styles.frameChild}
                      alt=""
                      src="Ellipse 1568.png"
                    />
                    <div className={styles.test02}>test022</div>
                  </div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.groupContainer}>
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126732.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126733.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126734.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126735.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126736.svg"
                  />
                </div>
              </div>
              <img
                className={styles.frameIcon}
                alt=""
                src="Frame 1542126696.svg"
              />
            </div>
            <div className={styles.rectangleGroup}>
              <div className={styles.rectangleDiv} />
              <div className={styles.div8}>2024.00.00</div>
              <div className={styles.div9}>아이유(이지은) 과의 식사권</div>
              <div className={styles.div10}>
                전체적으로 만족스러운 식사였어요! 조언도 많이 해주셔서 덕분에
                힘이 됐습니다 :)
              </div>
              <div className={styles.frameWrapper3}>
                <div className={styles.frameWrapper4}>
                  <div className={styles.ellipseContainer}>
                    <img
                      className={styles.frameChild}
                      alt=""
                      src="Ellipse 1568.png"
                    />
                    <div className={styles.test02}>test0333</div>
                  </div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.groupContainer}>
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126732.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126733.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126734.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126735.svg"
                  />
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="Group 1542126736.svg"
                  />
                </div>
              </div>
              <img
                className={styles.frameIcon}
                alt=""
                src="Frame 1542126696.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.rectangleParent1}>
          <div className={styles.groupChild5} />
          <div className={styles.div14}>
            <p className={styles.p}>안녕하세요,</p>
            <p className={styles.p}>
              네 가슴 향기로운 풀밭에 엎드리면 나는 가슴이 울어라. 숱한 나무들
              무성히 무성히 우거진 산마루에 금빛 기름진 햇살은 내려오고, 둥둥
              산을 넘어 흰 구름 걷는 자리 씻기는 하늘 사슴도 안 오고 바람도 안
              불고 너멋골 골짜기서 울어 오는 뻐꾸기. 티끌 부는 세상에도 벌레
              같은 세상에도 눈 맑은 가슴 맑은 보고 지운 나의 사람. 달 가고 밤
              가고 눈물도 가고 틔어 올 밝은 하늘 빛난 아침 이르면 향기로운
              이슬밭 푸른 언덕을 총총총 달려도 와 줄 볼이 고운 나의 사람. 혼자서
              철도 없이 난 너만 그리노라. 티끌 부는 세상에도 벌레 같은 세상에도
              눈 맑은 가슴 맑은 보고 지운 나의 사람. 달밤이나 새벽녘 홀로 서서
              눈물 어릴 볼이 고운 나의 사람. 푸른 산 한나절 구름은 가고 고을
              너머 뻐꾸기는 우는데 눈에 어려 흘러가는 물결 같은 사람 속 아우성쳐
              흘러가는 물결 같은 사람 속에 난 그리노라.
            </p>
          </div>
          <div className={styles.groupChild6} />
          <div className={styles.div15}>소개글</div>
          <div className={styles.parent1}>
            <div className={styles.div16}>가수, 배우</div>
            <div className={styles.groupChild7} />
            <div className={styles.div17}>직업</div>
          </div>
          <div className={styles.div18}>
            <p className={styles.p}>
              - 밤이나 새벽녘 홀로 서서 눈물 어릴 볼이 고운 나의 사람.
            </p>
            <p
              className={styles.p}
            >{`- 가슴 향기로운 풀밭에 엎드리면 나는 가슴이 울어라. 혼자서 철도 없이 난 너만 그리노라. `}</p>
            <p className={styles.p}>
              - 밤이나 새벽녘 홀로 서서 눈물 어릴 볼이 고운 나의 사람.
            </p>
            <p
              className={styles.p}
            >{`- 가슴 향기로운 풀밭에 엎드리면 나는 가슴이 울어라. 혼자서 철도 없이 난 너만 그리노라. `}</p>
            <p className={styles.p}>
              - 밤이나 새벽녘 홀로 서서 눈물 어릴 볼이 고운 나의 사람.
            </p>
          </div>
          <div className={styles.groupChild8} />
          <div className={styles.div19}>경력</div>
        </div>
        <div className={styles.gnb}>
          <div className={styles.vipApplyParent}>
            <b className={styles.vipApply}>VIP Apply</b>
            <b className={styles.auctions}>Auctions</b>
            <b className={styles.membership}>Membership</b>
            <b className={styles.membership}>Point</b>
            <b className={styles.membership}>VIP List</b>
          </div>
          <div className={styles.myPageParent}>
            <b className={styles.membership}>My page</b>
            <b className={styles.membership}>FAQ</b>
            <b className={styles.membership}>로그아웃</b>
          </div>
          <img className={styles.gnbChild} alt="" src="Group 155.svg" />
        </div>
      </div>

      <div className={styles.IntroduceContainer}>
        <div className={styles.IntroduceBox}>
          {vipIntro && vipIntro.vipIntroduce
            ? vipIntro.vipIntroduce
            : "소개를 아직 작성하지 않았어요!"}
        </div>
        <div className={styles.IntroduceBox}>
          {vipIntro && vipIntro.vipCareer
            ? vipIntro.vipCareer
            : "경력을 아직 작성하지 않았어요!"}
        </div>
        <div className={styles.IntroduceBox}>
          {vipIntro && vipIntro.vipJob
            ? vipIntro.vipJob
            : "직업을 아직 작성하지 않았어요!"}
        </div>
      </div>
    </>
  );
};

export default Vip_Introduce;
