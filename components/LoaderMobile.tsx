import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  loadingExperienceState,
  onAnimationEndState,
} from "../state/recoilState";

export default function LoaderMobile(): JSX.Element {
  const [loaderMobile, setLoaderMobile] = useState<any>(0);
  const [loadingExpirience, setLoadingExpirience] = useRecoilState(
    loadingExperienceState
  );
  const [animationEnd, setAnimationEnd] = useRecoilState(onAnimationEndState);

  useEffect(() => {
    if (loaderMobile < 100) {
      setTimeout(() => {
        if (loadingExpirience === 100 && loaderMobile < 90) {
          setLoaderMobile(loaderMobile + 10);
        } else {
          if (loaderMobile < 92) {
            setLoaderMobile(loaderMobile + 1);
          } else {
            setTimeout(() => {
              setLoaderMobile(loaderMobile + 1);
            }, 120);
          }
        }
      }, 40);
    }
    if (loaderMobile === 100) {
      setTimeout(() => {
        setAnimationEnd(true);
      }, 500);
    }
  }, [loaderMobile]);

  return (
    <>
      <div className="fixed z-[22000000] w-full h-screen flex flex-col overflow-hidden">
        <div className="w-full h-1/2 flex">
          <AnimatePresence>
            {loaderMobile !== 100 && (
              <m.div
                initial={{ x: 0, y: 0 }}
                animate={{ x: 0, y: 0 }}
                exit={{ x: -300, y: -400 }}
                transition={{ duration: 0.5, easings: "easyIn" }}
                className="bg-black w-1/2 h-full border-r border-b border-white "
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {loaderMobile !== 100 && (
              <m.div
                initial={{ x: 0, y: 0 }}
                animate={{ x: 0, y: 0 }}
                exit={{ x: 300, y: -400 }}
                transition={{ duration: 0.5, easings: "easyIn" }}
                className="bg-black w-1/2 h-full border-l border-b border-white"
              />
            )}
          </AnimatePresence>
        </div>
        <div className="w-full h-1/2 flex">
          <AnimatePresence>
            {loaderMobile !== 100 && (
              <m.div
                initial={{ x: 0, y: 0 }}
                animate={{ x: 0, y: 0 }}
                exit={{ x: -300, y: 400 }}
                transition={{ duration: 0.5, easings: "easyIn" }}
                className="bg-black w-1/2 h-full border-t border-r border-white"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {loaderMobile !== 100 && (
              <m.div
                initial={{ x: 0, y: 0 }}
                animate={{ x: 0, y: 0 }}
                exit={{ x: 300, y: 400 }}
                transition={{ duration: 0.5, easings: "easyIn" }}
                className="bg-black w-1/2 h-full border-t border-l border-white"
              />
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {loaderMobile !== 100 && (
            <m.div
              initial={{ height: 40, opacity: 1 }}
              animate={{ height: 40, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              className="bg-black border-white border-2  p-[2px] w-[200px] absolute mid flex items-start justify-start overflow-hidden whitespace-nowrap"
            >
              <div
                style={{ width: `${loaderMobile * 2}px` }}
                className="h-full bg-white"
              />
              <div className="font-stalinist text-[18px] absolute mid z-10">
                Loading
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
