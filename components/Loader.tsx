import { motion as m, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  browserState,
  fakeProgressLoading,
  progressLoading,
} from "../state/recoilState";
import Browser from "./Browser";

export default function Loader(): JSX.Element {
  const [loading, setLoading] = useRecoilState<number>(progressLoading);
  const [fakeLoader, setfakeLoader] =
    useRecoilState<number>(fakeProgressLoading);
  const [browser, setBrowser] = useRecoilState(browserState);

  const maskHeight: number = Number(((280 / 100) * fakeLoader).toFixed());

  useEffect(() => {
    if (fakeLoader < 100) {
      setTimeout(() => {
        if (loading === 100 && fakeLoader < 90) {
          setfakeLoader(fakeLoader + 10);
        } else {
          if (fakeLoader < 99) {
            setfakeLoader(fakeLoader + 1);
          } else {
            setTimeout(() => {
              setfakeLoader(fakeLoader + 1);
            }, 1000);
          }
        }
      }, 60);
    }
  }, [fakeLoader]);

  return (
    <>
      <Browser />
      {/* {browser !== "none" || "Chrome" ? (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 900, opacity: 0 }}
          transition={{ delay: 0 }}
          className="text-white z-[21000001] fixed max-w-[60vw] font-bold bg-black border-4 py-1 
          transform  left-1/2 -translate-x-1/2 bottom-1/4
            text-sm text-center "
        >
          {" "}
          Use the desktop Chrome browser for better experience
        </m.div>
      ) : null} */}
      <m.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed top-0 left-0 w-screen h-screen z-[21000000] flex items-center justify-center"
      >
        <m.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
          className=" absolute mid  text-white z-30 font-stalinist text-[40px]"
        >
          {fakeLoader}%
        </m.div>
        <>
          <div className=" bg-black/100 w-1/2 h-[50vh] absolute top-0 left-0" />
          <div className=" bg-black/100 w-1/2 h-[50vh] absolute top-0 right-0" />
          <div className="bg-black/100 w-1/2 h-[50vh] absolute bottom-0 left-0" />
          <div className="bg-black/100 w-1/2 h-[50vh] absolute bottom-0 right-0" />
        </>
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="h-1 top-1/2 -translate-y-1/2 w-1/2 bg-white z-10 absolute left-0"
          />

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="h-1 top-1/2 -translate-y-1/2 w-1/2 bg-white z-10 absolute right-0"
          />
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 w-1 h-1/2 bg-white "
          />
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 w-1 h-1/2 bg-white "
          />
        </>
        <>
          <div
            style={{ width: `${15 + (85 / 100) * fakeLoader}vw` }}
            className="h-1 top-1/2 -translate-y-1/2  bg-white z-10 absolute left-1/2 -translate-x-1/2"
          />
          <div
            style={{ height: `${30 + (70 / 100) * fakeLoader}vh` }}
            className="absolute top-1/2 -translate-y-1/2 w-1 bg-white "
          />
        </>
        <m.div
          initial={{ scale: 0.5, rotate: 45 }}
          animate={{ scale: 1, rotate: 45 }}
          exit={{ scale: 10, rotate: 45 }}
          transition={{ duration: 0.7 }}
          className=" h-[200px] w-[200px]  bg-white z-10 "
        >
          <div
            style={{ height: maskHeight }}
            className=" absolute mid  bg-black w-[280px] rotate-[-45deg] "
          />
          <div className=" w-full h-full absolute border-4 border-white" />
        </m.div>
        <m.img
          initial={{ opacity: 1, height: 100 }}
          animate={{ opacity: 1, height: 160 }}
          exit={{ opacity: 0, height: 160 }}
          transition={{ duration: 0.7 }}
          src="./gif_loader/gif_doge.gif"
          className=" absolute mid  z-20"
        />
      </m.div>
    </>
  );
}
