import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import Eye from "./Eye";

interface Iprops {
  fakeLoader: number;
  currentY: number;
}

export default function GlassesVR({
  fakeLoader,
  currentY,
}: Iprops): JSX.Element {
  const [turnOn, setTurnOn] = useState<boolean>(false);
  const [run, setRun] = useState<boolean>(false);
  const [showEye, setshowEye] = useState<boolean>(false);

  useEffect(() => {
    if (fakeLoader === 100 && !run) {
      setTimeout(() => {
        setTurnOn(true);
        setRun(true);
      }, 2000);
    }
  }, [fakeLoader]);

  useEffect(() => {
    if (run) {
      setTimeout(() => {
        setTurnOn(false);
        setshowEye(true);
      }, 2050);
    }
  }, [run]);
  return (
    <div className=" relative h-[22px] w-[56px]">
      <AnimatePresence>
        {showEye && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            id="noise"
            style={{ backgroundImage: `url(./assets/noise.png)` }}
            className="bg-slate-600 rounded-sm h-[22px] w-[56px] absolute opacity-40 bg-cover md:flex items-center justify-center  mix-blend-multiply"
          >
            <div className=" flex md:mt-[2px]  space-x-2 mix-blend-screen opacity-50 justify-center items-center">
              {currentY < 300 && (
                <Eye className="opacity-[100%] relative md:w-[28px] w-[24px]  md:h-[28px]  superflex " />
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {turnOn && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" "
          >
            <img
              src="./assets/tv.gif"
              alt="a"
              className="w-[56px] h-[22px] rounded-sm "
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
