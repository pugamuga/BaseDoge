import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import EachLetter from "./EachLetter";
import { AnimatePresence, motion as m } from "framer-motion";
import { fakeProgressLoading, glitch } from "../../state/recoilState";

export default function PugamugaText(): JSX.Element {
  const [glitchOn, setGlitchOn] = useRecoilState<boolean>(glitch);
  const [fakeLoader, setfakeLoader] =
    useRecoilState<number>(fakeProgressLoading);
  const [amountLetters, setAmountLetters] = useState<number>(0);
  const [portfolioShow, setPortfolioShow] = useState<boolean>(false);

  const pugamuga = "basedoge";

  useEffect(() => {
    if (amountLetters < Array.from(pugamuga).length) {
      if (fakeLoader == 100) {
        setTimeout(() => {
          setAmountLetters((prev) => prev + 1);
        }, 400);
      }
    }
    if (amountLetters === Array.from(pugamuga).length) {
      setTimeout(() => {
        setPortfolioShow(true);
      }, 400);
    }
  }, [amountLetters, fakeLoader]);

  return (
    <>
      <div
        className=" text-white font-stalinist font-extrabold absolute transform  left-1/2 top-2 md:top-[60px] 
        -translate-x-1/2  text-[34px] md:text-[140px] z-0 select-none flex uppercase  "
      >
        <>
          <AnimatePresence>
            {Array.from(pugamuga)
              .slice(0, amountLetters)
              .map((letter: string, i: number) => {
                return <EachLetter key={i} letter={letter} />;
              })}
          </AnimatePresence>
        </>
        {portfolioShow && (
          <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ duration: 1.4 }}
            className="md:text-lg text-[8px] uppercase  absolute right-0 md:bottom-2 bottom-[-10px] flex items-center "
          >
            Build on Base
              <img
                src="./assets/baseicon.png"
                alt="svg"
                className=" w-4 h-4 md:w-8 md:h-8 ml-2 mb-[1px]"
              />
          </m.div>
        )}
      </div>
    </>
  );
}
