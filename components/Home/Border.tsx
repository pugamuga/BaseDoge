import { motion as m } from "framer-motion";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Ygol from "./Ygol";

interface Iprops{
    position:string
    isBack:boolean
}

export default function Border({position,isBack}:Iprops): JSX.Element | null {
  return (
    <>
      <m.div
      initial={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0, opacity:0}} transition={{delay:.2, duration:.9, ease:"easeOut"}}
      id="abs" className={` ${isBack?"z-0":"z-[20000001]"} ${position}`}>
        <div className="w-full h-full ">
          <div className="border border-white/10 w-full h-full flex justify-between">
            <div className=" flex flex-col justify-between">
              <Ygol />
              <Ygol className=" rotate-[-90deg]"/>
            </div>
            <div className=" flex flex-col justify-between">
              <Ygol className=" rotate-[90deg]"/>
              <Ygol className=" rotate-[-180deg]"/>
            </div>
          </div>
        </div>
      </m.div>
    </>
  );
}
