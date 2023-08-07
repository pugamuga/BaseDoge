import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { useRecoilState } from "recoil";
import {
  fakeProgressLoading,
  heightOfSite,
  userWidthState,
} from "../../state/recoilState";
import Loader from "../Loader";
import MobileMenu from "./MobileMenu";

interface Iprops {
  currentY: number;
}

export default function HomePage({ currentY }: Iprops): JSX.Element {
  const [userWidth, setUserWidth] = useRecoilState<number>(userWidthState);
  const [fakeLoader, setfakeLoader] =
    useRecoilState<number>(fakeProgressLoading);
  const [isDragable, setDragable] = useState<boolean>(false);
  const [heightSite, setHeightSite] = useRecoilState<number>(heightOfSite);

  const dragZones = [
    {
      positions: {
        right: userWidth / 2 - 44,
        left: -userWidth / 2 + 44,
        top: 0,
        bottom: 0,
      },
    },
  ];

  useEffect(() => {
    if (currentY < 90) {
      setDragable(false);
    }
    console.log(heightSite);
  }, [currentY]);

  return (
    <>
      <AnimatePresence>{fakeLoader < 100 && <Loader />}</AnimatePresence>
      {/* <AnimatePresence>
        {currentY > 90 && isDragable && (
          <MobileMenu isDragable={isDragable} currentY={currentY} />
        )}
      </AnimatePresence> */}
      <AnimatePresence>
        {userWidth >= 770 && fakeLoader === 100 ? (
          <>
            <m.div
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              exit={{ y: 0 }}
              transition={{ delay: 3.1, duration: 1.7, easy: "easeOut" }}
              className=" text-white/100 fixed top-0 pt-2 flex items-center w-screen px-[5vw] justify-between border-b border-white/20 pb-2 font-stalinist z-[22000000] bg-black/30
          backdrop-blur-sm
          "
            >
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className="top-btn "
              >
                Home
              </Link>
              <div>
                <Link
                  to="exp"
                  spy={true}
                  smooth={true}
                  offset={125}
                  duration={500}
                  className="top-btn"
                >
                  Experience
                </Link>
              </div>
              <div>
                <Link
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={150}
                  duration={500}
                  className="top-btn"
                >
                  About
                </Link>
              </div>
              <div>
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={1200}
                  duration={500}
                  className="top-btn"
                >
                  Contact
                </Link>
              </div>
              <div
                style={{ width: `${heightSite}%` }}
                className=" absolute h-[1px] left-0 bottom-0  bg-white/50 backdrop-blur-sm"
              />
            </m.div>
          </>
        ) : (
          currentY > 90 &&
          fakeLoader === 100 && (
            <m.div
              onClick={() => {
                setDragable(true);
              }}
              drag
              dragConstraints={dragZones[0].positions}
              style={{ left: userWidth / 2 - 40 }}
              className="fixed  z-[22000000] top-1 "
            >
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, easy: "easeOut" }}
                className=" w-20 h-20 bg-black/30  rounded-full 
            border-[1px] border-white/10 backdrop-blur-sm superflex"
              >
                <div className="text-white font-stalinist text-xs">
                  <Link
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                  >
                    At top
                  </Link>
                </div>
              </m.div>

              {/* {currentY > 90 && isDragable && (
                <m.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 25 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 1.4, easy: "easeOut" }}
                  className=" bg-black/30 backdrop-blur-[2px] w-20 h-20 rounded-full absolute top-0 left-0 pointer-events-none border-[1px] border-white/10"
                ></m.div>
              )} */}
            </m.div>
          )
        )}
      </AnimatePresence>
    </>
  );
}
