import { useScroll } from "framer-motion";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import HomePage from "../components/Home/HomePage";
import StartPage from "../components/Home/StartPage";
import {
  browserState,
  fakeProgressLoading,
  heightOfSite,
  userWidthState,
} from "../state/recoilState";

const Home: NextPage = () => {
  const [userWidth, setUserWidth] = useRecoilState<number>(userWidthState);
  const [userHeight, setUserHeight] = useState<number>(0);
  const [currentY, setCurrentY] = useState<number>(0);
  const [fakeLoader, setfakeLoader] =
    useRecoilState<number>(fakeProgressLoading);
  const [heightSite, setHeightSite] = useRecoilState<number>(heightOfSite);
  const [browser, setBrowser] = useRecoilState(browserState);

  const [windowSizeForContainer, setWindowSizeForContainer] =
    useState<number>(0);

  const { scrollY } = useScroll();

  const appRef = useRef<any>();
  const scrollContainer = useRef<any>();

  useEffect(() => {
    return scrollY.onChange((latest: number) => {
      setCurrentY(latest);
    });
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      setUserWidth(window.innerWidth);
      setUserHeight(window.innerHeight);
      setHeightSite(
        Number(
          (
            // @ts-ignore
            (Math.floor(scrollY.current) / window.document.body.offsetHeight) *
            100 *
            (window.document.body.offsetHeight /
              (window.document.body.offsetHeight - window.innerHeight))
          ).toFixed()
        )
      );
    };
    setUserHeight(window.innerHeight);
    setUserWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("scroll", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", resizeHandler);
    };
  }, []);

  return (
    <>
      <HomePage currentY={currentY} />
      <StartPage currentY={currentY} />
      {/* {userWidth > 770 ? (
        <>
          <div>
            <div id="home" />
          </div>
        </>
      ) : (
        <>
          <div id="home" className="overflow-hidden">
            <StartPage currentY={currentY} />
          </div>
        </>
      )} */}
    </>
  );
};

export default Home;
