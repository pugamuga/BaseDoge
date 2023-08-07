import { motion as m } from "framer-motion";

interface Iprops {
  currentY: number;
}

export default function TextAfterMain({ currentY }: Iprops): JSX.Element {
  return (
    <div
      className="mainSliderText md:h-[90px] h-[40px] md:-mt-4 w-full font-stalinist 
    text-[20px] md:text-[58px] text-white/0 hover:text-white tr-300 select-none z-[20000003]"
    >
      <div className="secondSliderText">
        <span>about</span>
      </div>
      <div className="secondSliderText secondSliderText2">
        <span>about</span>
      </div>
      <div className="secondSliderText secondSliderText3">
        <span>about</span>
      </div>
    </div>
  );
}
